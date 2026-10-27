// Walking routes: the numbered route map, "Open in Google Maps" link and stop
// table on each walk post, in the style of London Travel Geek's walks.
//
// The data is built by scripts/build-walks.mjs - one file per walk in
// data/walks/, from the My Maps exports or, for newer walks, the hand-written
// stops in data/walks-input/. A post opts in with a marker where its map
// goes:
//
//   <div data-walk-route="daan-walking-route"></div>
//
// insertWalkRoute() swaps that marker for the static part (map frame, key,
// Google Maps link, stop table) as HTML, so the stops are in the page for
// readers without JavaScript and for crawlers. components/WalkRouteMap.tsx
// then draws the street map into the frame on the client.

import daan from "@/data/walks/daan-walking-route.json";
import dadaocheng from "@/data/walks/dadaocheng-dihua-street-walk.json";
import datong from "@/data/walks/datong-walking-route.json";
import gongguan from "@/data/walks/gongguan-walking-route.json";
import songshanXinyi from "@/data/walks/songshan-xinyi-walking-tour.json";
import wanhua from "@/data/walks/wanhua-heritage-walk.json";
import xinbeitou from "@/data/walks/xinbeitou-hot-springs-walk.json";
import zhongzheng from "@/data/walks/zhongzheng-walking-route.json";

export type WalkStop = {
  number: number;
  name: string;
  url?: string;
  lat: number;
  lng: number;
  /** Metres walked from the stop before, along the route line. */
  legMetres?: number;
};

export type WalkExtra = { name: string; url?: string; lat: number; lng: number };

export type WalkRoute = {
  id: string;
  /** Only set where one post has more than one route (Datong). */
  label?: string;
  duration?: string;
  distanceMetres: number;
  stops: WalkStop[];
  /** The walking path as [lat, lng] pairs, first stop to last. */
  path: [number, number][];
};

export type Walk = {
  slug: string;
  /** Completes "Numbered map of ...". */
  title: string;
  duration?: string;
  routes: WalkRoute[];
  /** Pins the post mentions that are not numbered stops. */
  extras: WalkExtra[];
};

// JSON imports type paths as number[][], not pairs - the build script guarantees the shape.
const walks = [daan, dadaocheng, datong, gongguan, songshanXinyi, wanhua, xinbeitou, zhongzheng] as unknown as Walk[];
const walksBySlug = new Map(walks.map((walk) => [walk.slug, walk]));

export const walkCount = walks.length;

export function getWalk(slug: string): Walk | undefined {
  return walksBySlug.get(slug);
}

/** The id the step-by-step text gives each stop, and the map links to. */
export function stopAnchor(walk: Walk, route: WalkRoute, number: number): string {
  return walk.routes.length > 1 ? `${route.id}-stop-${number}` : `stop-${number}`;
}

/**
 * Google Maps walking directions through every stop in order. The Maps URL
 * API takes up to nine waypoints between origin and destination, and no walk
 * here has more than nine stops in all, so nothing is dropped - but cap it
 * anyway rather than produce a link Google silently truncates.
 */
export function googleMapsWalkingUrl(stops: WalkStop[]): string {
  const coord = (stop: WalkStop) => `${stop.lat.toFixed(6)},${stop.lng.toFixed(6)}`;
  const first = stops[0];
  const last = stops[stops.length - 1];
  const waypoints = stops.slice(1, -1).slice(0, 9).map(coord).join("%7C");
  return (
    "https://www.google.com/maps/dir/?api=1" +
    `&origin=${coord(first)}` +
    `&destination=${coord(last)}` +
    (waypoints ? `&waypoints=${waypoints}` : "") +
    "&travelmode=walking"
  );
}

export function formatDistance(metres: number): string {
  if (metres < 1000) return `${Math.max(10, Math.round(metres / 10) * 10)} m`;
  const km = Math.round(metres / 100) / 10;
  return `${Number.isInteger(km) ? km.toFixed(0) : km.toFixed(1)} km`;
}

const NUMBER_WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];
const inWords = (n: number) => NUMBER_WORDS[n] ?? String(n);

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

const routeClass = (index: number) => (index === 0 ? "" : " walk-marker--second");

function placeLink(place: { name: string; url?: string }) {
  const name = escapeHtml(place.name);
  return place.url ? `<a href="${escapeHtml(place.url)}">${name}</a>` : name;
}

function routeSummary(route: WalkRoute, duration?: string) {
  return [
    `${route.stops.length} stops`,
    `about ${formatDistance(route.distanceMetres)}`,
    ...(duration ? [duration] : []),
  ].join(" · ");
}

function renderStopTable(walk: Walk, route: WalkRoute, index: number, withExtras: boolean) {
  const rows = route.stops.map((stop) => {
    const leg = stop.legMetres == null ? "Start" : `About ${formatDistance(stop.legMetres)}`;
    return (
      `<tr><td><a class="walk-marker${routeClass(index)}" href="#${stopAnchor(walk, route, stop.number)}" ` +
      `aria-label="Stop ${stop.number} in the step-by-step">${stop.number}</a></td>` +
      `<td>${placeLink(stop)}</td><td>${leg}</td></tr>`
    );
  });

  if (withExtras && walk.extras.length) {
    rows.push(
      `<tr class="walk-stops-extras"><td><span class="walk-marker walk-marker--alt" aria-hidden="true">+</span></td>` +
        `<td>Also on the map: ${walk.extras.map(placeLink).join(", ")}</td><td>Off the numbered route</td></tr>`,
    );
  }

  return (
    `<div class="walk-stops-wrap"><table class="walk-stops">` +
    `<thead><tr><th scope="col">#</th><th scope="col">${escapeHtml(route.label ?? "Stop")}</th>` +
    `<th scope="col">Walk from the last stop</th></tr></thead>` +
    `<tbody>${rows.join("")}</tbody></table></div>`
  );
}

export function renderWalkRoute(walk: Walk): string {
  const multi = walk.routes.length > 1;
  const summary = multi
    ? walk.routes.map((route) => `${route.label}: ${routeSummary(route, route.duration)}`).join(" | ")
    : routeSummary(walk.routes[0], walk.duration ?? walk.routes[0].duration);

  const legend = [
    ...walk.routes.map(
      (route, index) =>
        `<span><i class="walk-marker${routeClass(index)}" aria-hidden="true">1</i> ${
          multi ? `${escapeHtml(route.label ?? "")}, in walking order` : "On the route, in walking order"
        }</span>`,
    ),
    ...(walk.extras.length
      ? ['<span><i class="walk-marker walk-marker--alt" aria-hidden="true">+</i> Also on the map</span>']
      : []),
  ].join("");

  const openLinks = walk.routes
    .map((route) => {
      const which = multi ? `the ${escapeHtml((route.label ?? "").toLowerCase())}` : "the whole route";
      return (
        `<p class="walk-route-open"><strong><a href="${googleMapsWalkingUrl(route.stops)}" target="_blank" rel="noopener noreferrer">` +
        `Open ${which} in Google Maps →</a></strong> — all ${inWords(route.stops.length)} stops in walking order, ` +
        `set to walking directions, which is the version to put on your phone.</p>`
      );
    })
    .join("");

  const tables = walk.routes
    .map((route, index) => renderStopTable(walk, route, index, index === walk.routes.length - 1))
    .join("");

  return (
    `<div class="walk-route" data-walk-route="${escapeHtml(walk.slug)}">` +
    `<details class="walk-map-shell" open>` +
    `<summary><span>Map of the ${multi ? "walks" : "walk"}, numbered in walking order</span><small>${escapeHtml(summary)}</small></summary>` +
    `<div class="walk-map" data-walk-map role="region" aria-label="Numbered map of ${escapeHtml(walk.title)}"><p>Loading the map…</p></div>` +
    `<div class="walk-map-legend" aria-label="Map key">${legend}</div>` +
    `<noscript><p class="walk-map-noscript">The map needs JavaScript. Every stop is numbered in walking order in the table and the step-by-step below.</p></noscript>` +
    `</details>` +
    openLinks +
    tables +
    `</div>`
  );
}

/** Swap the post's walk marker for the route block. Posts without one are untouched. */
export function insertWalkRoute(content: string, walk: Walk | undefined): string {
  if (!walk) return content;
  const marker = new RegExp(`<div data-walk-route="${walk.slug}"></div>`);
  return content.replace(marker, () => renderWalkRoute(walk));
}
