"use client";

import { useEffect } from "react";
import type { Walk } from "@/lib/walks";

/**
 * Draws a walk's street map into the frame insertWalkRoute() put in the post
 * body: OpenStreetMap tiles, the walking path, and a numbered pin per stop in
 * walking order, the same approach as London Travel Geek's walks.
 *
 * The frame, key, Google Maps link and stop table are already in the page as
 * HTML, so this only adds the map. Leaflet (and its stylesheet) is imported
 * on demand, so it only loads on the five walk pages. If it fails, the frame
 * says so and points at the numbered stops below - the walk still works.
 */

/** Route colours, from the site tokens. A second route (Datong) is navy. */
const ROUTE_COLOURS = [
  ["--red-dark", "#d92e2a"],
  ["--navy", "#132230"],
] as const;

function routeColour(index: number) {
  const [token, fallback] = ROUTE_COLOURS[Math.min(index, ROUTE_COLOURS.length - 1)];
  return getComputedStyle(document.documentElement).getPropertyValue(token).trim() || fallback;
}

export function WalkRouteMap({ walk }: { walk: Walk }) {
  useEffect(() => {
    const element = document.querySelector<HTMLElement>(
      `[data-walk-route="${walk.slug}"] [data-walk-map]`,
    );
    if (!element || element.dataset.mapReady === "true") return;
    element.dataset.mapReady = "true";

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      try {
        const [{ default: L }] = await Promise.all([
          import("leaflet"),
          import("leaflet/dist/leaflet.css"),
        ]);
        if (cancelled) return;
        element.replaceChildren();

        const map = L.map(element, { scrollWheelZoom: false });
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        const positions: [number, number][] = [];
        const multi = walk.routes.length > 1;

        walk.routes.forEach((route, index) => {
          if (route.path.length > 1) {
            L.polyline(route.path, {
              color: routeColour(index),
              weight: 4,
              opacity: 0.75,
              lineJoin: "round",
            }).addTo(map);
            positions.push(...route.path);
          }

          for (const stop of route.stops) {
            positions.push([stop.lat, stop.lng]);
            const anchor = multi ? `${route.id}-stop-${stop.number}` : `stop-${stop.number}`;

            const content = document.createElement("div");
            content.className = "walk-map-popup";
            const name = document.createElement("strong");
            name.textContent = `${stop.number}. ${stop.name}`;
            content.append(name);
            if (route.label) {
              const which = document.createElement("span");
              which.textContent = route.label;
              content.append(which);
            }
            const links = document.createElement("span");
            const jump = document.createElement("a");
            jump.href = `#${anchor}`;
            jump.textContent = "Read about this stop";
            links.append(jump);
            if (stop.url) {
              const guide = document.createElement("a");
              guide.href = stop.url;
              guide.textContent = "Our guide";
              links.append(guide);
            }
            content.append(links);

            const icon = L.divIcon({
              className: "walk-marker-wrap",
              html: `<span class="walk-marker${index === 0 ? "" : " walk-marker--second"}">${stop.number}</span>`,
              iconSize: [28, 28],
              iconAnchor: [14, 14],
              popupAnchor: [0, -16],
            });
            // A loop (Datong's west route) ends where it starts - put the
            // finishing pin underneath so the "1" stays readable.
            const isRepeat =
              stop.number > 1 &&
              route.stops.some((other) => other.number < stop.number && other.lat === stop.lat && other.lng === stop.lng);
            L.marker([stop.lat, stop.lng], {
              icon,
              title: stop.name,
              alt: stop.name,
              zIndexOffset: (isRepeat ? -1000 : 0) + (walk.routes.length - index) * 100 - stop.number,
            })
              .addTo(map)
              .bindPopup(content);
          }
        });

        for (const extra of walk.extras) {
          positions.push([extra.lat, extra.lng]);
          const content = document.createElement("div");
          content.className = "walk-map-popup";
          const name = document.createElement("strong");
          name.textContent = extra.name;
          const note = document.createElement("span");
          note.textContent = "Off the numbered route";
          content.append(name, note);
          if (extra.url) {
            const guide = document.createElement("a");
            guide.href = extra.url;
            guide.textContent = "Our guide";
            content.append(guide);
          }
          const icon = L.divIcon({
            className: "walk-marker-wrap",
            html: '<span class="walk-marker walk-marker--alt">+</span>',
            iconSize: [22, 22],
            iconAnchor: [11, 11],
            popupAnchor: [0, -13],
          });
          L.marker([extra.lat, extra.lng], { icon, title: extra.name, alt: extra.name, zIndexOffset: -500 })
            .addTo(map)
            .bindPopup(content);
        }

        map.fitBounds(L.latLngBounds(positions), { padding: [30, 30], maxZoom: 16 });

        const shell = element.closest("details");
        const onToggle = () => {
          if (shell?.open) window.setTimeout(() => map.invalidateSize(), 0);
        };
        shell?.addEventListener("toggle", onToggle);
        cleanup = () => {
          shell?.removeEventListener("toggle", onToggle);
          map.remove();
        };
      } catch {
        if (cancelled) return;
        const message = document.createElement("p");
        message.textContent =
          "The map could not load. The stops are numbered in walking order in the table and the step-by-step below.";
        element.replaceChildren(message);
        delete element.dataset.mapReady;
      }
    })();

    return () => {
      cancelled = true;
      cleanup?.();
      delete element.dataset.mapReady;
    };
  }, [walk]);

  return null;
}
