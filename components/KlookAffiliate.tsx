"use client";

import { useEffect } from "react";

const affiliateId = "8733";
const widgetScript = "https://affiliate.klook.com/widget/fetch-iframe-init.js";

/** Start loading a widget this far before it scrolls into view. */
const LAZY_MARGIN = "600px 0px";

let observer: IntersectionObserver | null = null;
let scriptQueued = false;

/**
 * Klook's loader scans the page once, when it runs, and turns every
 * `ins.klk-aff-widget` without a `data-rendered` attribute into an iframe.
 * Running it again later picks up only the widgets released since (the ones
 * it has done carry data-rendered="true", and its postMessage handling is
 * keyed to each iframe's own window, so repeat runs don't cross wires).
 * Widgets released in the same moment share one run.
 */
function runKlookScript() {
  if (scriptQueued) return;
  scriptQueued = true;
  window.setTimeout(() => {
    scriptQueued = false;
    const script = document.createElement("script");
    script.src = widgetScript;
    script.async = true;
    script.dataset.klookWidgets = "true";
    document.body.appendChild(script);
  }, 50);
}

function release(widget: Element) {
  if (widget instanceof HTMLElement && widget.dataset.rendered === "lazy") {
    delete widget.dataset.rendered;
  }
}

/**
 * Watch every lazy Klook widget under `root` (data-rendered="lazy", set by
 * enhanceLazyKlookWidgets in lib/content.ts, or by KlookSidebarWidget) and
 * load each one only when it comes near the viewport. A widget hidden with
 * display:none never intersects, so it never loads. Safe to call repeatedly:
 * observing an element twice is a no-op.
 */
export function observeKlookWidgets(root: ParentNode = document) {
  const widgets = root.querySelectorAll('ins.klk-aff-widget[data-rendered="lazy"]');
  if (!widgets.length) return;

  if (typeof IntersectionObserver === "undefined") {
    widgets.forEach(release);
    runKlookScript();
    return;
  }

  observer ??= new IntersectionObserver(
    (entries) => {
      let released = false;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer?.unobserve(entry.target);
        release(entry.target);
        released = true;
      }
      if (released) runKlookScript();
    },
    { rootMargin: LAZY_MARGIN }
  );

  widgets.forEach((widget) => observer?.observe(widget));
}

export function KlookAffiliate() {
  useEffect(() => {
    document.querySelectorAll<HTMLAnchorElement>('a[href*="klook.com"]').forEach((link) => {
      const href = link.getAttribute("href");
      if (!href) return;

      const url = new URL(href, window.location.href);
      if (!url.searchParams.has("aid")) url.searchParams.set("aid", affiliateId);
      link.href = url.toString();
      link.target = "_blank";
      link.rel = "sponsored noopener noreferrer";
    });

    observeKlookWidgets();
  }, []);

  return null;
}
