"use client";

import { useEffect } from "react";

const affiliateId = "8733";
const widgetScript = "https://affiliate.klook.com/widget/fetch-iframe-init.js";

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

    if (document.querySelector(`script[src="${widgetScript}"]`)) return;
    const script = document.createElement("script");
    script.src = widgetScript;
    script.async = true;
    script.dataset.klookWidgets = "true";
    document.body.appendChild(script);
  }, []);

  return null;
}
