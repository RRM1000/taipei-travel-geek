"use client";

import { useEffect, useRef, useState } from "react";
import { observeKlookWidgets } from "@/components/KlookAffiliate";

type KlookSidebarWidgetProps = {
  amount: string;
};

/**
 * The left rail only shows above 1200px (see .article-left-sidebar in
 * globals.css). Below that it is display:none, but a widget rendered there
 * still loaded its Klook iframe on every phone, so the widget is only
 * rendered at all when the rail is actually on screen.
 */
const RAIL_QUERY = "(min-width: 1201px)";

/**
 * Klook's iframe-init script replaces this widget's children (an <ins>
 * containing a plain <a>) with an <iframe>. That's a legitimate third-party
 * DOM mutation, but if the <ins>...<a> markup is present during the initial
 * server render, React hydrates against it and then throws a "Hydration
 * failed" error the moment the script swaps in the iframe -
 * suppressHydrationWarning doesn't cover this because the child *element
 * type* changes (a -> iframe), not just text/attributes, and that only
 * gets caught one level deep.
 *
 * Rendering nothing until after mount sidesteps the problem entirely: the
 * server and the initial client render both produce the same "not yet
 * mounted" output, so hydration has nothing to disagree about. The widget
 * markup - and the third-party mutation that follows it - only appears
 * after hydration has already finished, as an ordinary post-mount update.
 *
 * The <ins> starts as data-rendered="lazy", like the in-body widgets, and is
 * handed to observeKlookWidgets once it exists.
 */
export function KlookSidebarWidget({ amount }: KlookSidebarWidgetProps) {
  const [showRail, setShowRail] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const query = window.matchMedia(RAIL_QUERY);
    const update = () => setShowRail(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (showRail && ref.current) observeKlookWidgets(ref.current);
  }, [showRail]);

  if (!showRail) return null;

  return (
    <section className="sidebar-section sidebar-klook" ref={ref}>
      <p className="sidebar-kicker">Klook deals</p>
      <ins
        className="klk-aff-widget"
        data-adid="1371607"
        data-lang=""
        data-currency=""
        data-cardh="126"
        data-padding="92"
        data-lgh="470"
        data-edgevalue="655"
        data-amount={amount}
        data-prod="static_widget"
        data-rendered="lazy"
      >
        <a href="//www.klook.com/">Klook.com</a>
      </ins>
    </section>
  );
}
