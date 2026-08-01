"use client";

import { useEffect } from "react";
import { SiteSearch } from "@/components/SiteSearch";

const primaryNavigation = ["Eat", "Drink", "Visit"];
const exploreLinks = ["Shop", "Culture", "Events", "Areas"];
const informationLinks = [
  { href: "/taipei-guide", label: "Guide to Taipei" }, { href: "/taipei-public-transport", label: "Public transport" }, { href: "/taiwan-easycard", label: "EasyCards" }, { href: "/taipei-fun-pass", label: "Taipei Fun Pass" }, { href: "/taiwan-sim-cards", label: "Taiwan SIM cards" }, { href: "/taiwan-tourist-tax-refund", label: "Tourist tax refund" }, { href: "/sports-centre-gym", label: "Sports centre gyms" }, { href: "/taipei-laundrettes", label: "Launderettes" }, { href: "/maps", label: "Map" }, { href: "/taipei-suggested-routes", label: "Routes" },
];

export function SiteHeader() {
  useEffect(() => {
    const closeMenus = (except?: HTMLDetailsElement) => {
      document.querySelectorAll<HTMLDetailsElement>(".site-header details[open]").forEach((menu) => {
        if (menu !== except) menu.open = false;
      });
    };
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Element;
      if (!target.closest(".explore-menu, .information-menu, .mobile-menu")) closeMenus();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenus();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const closeOtherMenus = (menu: HTMLDetailsElement) => {
    if (!menu.open) return;
    document.querySelectorAll<HTMLDetailsElement>(".site-header details[open]").forEach((openMenu) => {
      if (openMenu !== menu) openMenu.open = false;
    });
  };

  return <header className="site-header">
    <a className="brand" href="/" aria-label="Taipei Travel Geek home"><img src="/images/ttg-mark.png" alt="" /><span><b>Taipei</b> Travel Geek</span></a>
    <nav className="desktop-nav" aria-label="Main navigation">
      {primaryNavigation.map((item) => <a key={item} href={`/category/${item.toLowerCase()}`}>{item}</a>)}
      <details className="explore-menu" onToggle={(event) => closeOtherMenus(event.currentTarget)}><summary>Explore <span aria-hidden="true">⌄</span></summary><div className="explore-panel">{exploreLinks.map((item) => <a key={item} href={`/category/${item.toLowerCase()}`}>{item}</a>)}</div></details>
      <details className="information-menu" onToggle={(event) => closeOtherMenus(event.currentTarget)}><summary>Information <span aria-hidden="true">⌄</span></summary><div className="information-panel">{informationLinks.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</div></details>
      <SiteSearch />
      <a className="nav-cta" href="/taipei-guide">Plan your trip <span aria-hidden="true">→</span></a>
    </nav>
    <details className="mobile-menu"><summary>Menu</summary><nav aria-label="Mobile navigation"><a href="/taipei-guide">Plan your trip</a><SiteSearch />{primaryNavigation.map((item) => <a key={item} href={`/category/${item.toLowerCase()}`}>{item}</a>)}<details className="mobile-explore-menu"><summary>Explore</summary>{exploreLinks.map((item) => <a key={item} href={`/category/${item.toLowerCase()}`}>{item}</a>)}</details><details className="mobile-information-menu"><summary>Information</summary>{informationLinks.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</details></nav></details>
  </header>;
}
