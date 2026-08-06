"use client";

import { useEffect, useState } from "react";

type KlookSidebarWidgetProps = {
  amount: string;
};

/**
 * Klook's fetch-iframe-init.js (loaded once by <KlookAffiliate/>) scans the
 * page after load and replaces this widget's children (an <ins> containing
 * a plain <a>) with an <iframe>. That's a legitimate third-party DOM
 * mutation, but if the <ins>...<a> markup is present during the initial
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
 */
export function KlookSidebarWidget({ amount }: KlookSidebarWidgetProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
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
    >
      <a href="//www.klook.com/">Klook.com</a>
    </ins>
  );
}
