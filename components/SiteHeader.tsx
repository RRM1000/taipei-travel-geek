"use client";

import { useEffect } from "react";
import { SiteSearch } from "@/components/SiteSearch";

const primaryNavigation = ["Eat", "Drink", "Visit", "Transport"];
const exploreLinks = ["Shop", "Culture", "Events", "Areas"];
const informationLinks = [
  { href: "/taipei-guide", label: "Guide to Taipei" },
  { href: "/taipei-public-transport", label: "Public transport" },
  { href: "/taiwan-easycard", label: "EasyCards" },
  { href: "/taiwan-lucky-land-giveaway", label: "NT$5,000 Lucky Land" },
  { href: "/taipei-fun-pass", label: "Taipei Fun Pass" },
  { href: "/taiwan-sim-cards", label: "Taiwan SIM cards" },
  { href: "/taiwan-tourist-tax-refund", label: "Tourist tax refund" },
  { href: "/sports-centre-gym", label: "Sports centre gyms" },
  { href: "/taipei-laundrettes", label: "Launderettes" },
  { href: "/maps", label: "Map" },
  { href: "/taipei-suggested-routes", label: "Routes" },
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
    <div className="header-brand-row">
      <a className="brand" href="/" aria-label="Taipei Travel Geek home">
        <img src="/images/ttg-mark.png" alt="Taipei Travel Geek Logo" />
        <span className="brand-text">
          <b className="brand-navy">TAIPEI</b> <b className="brand-red">TRAVEL</b> <b className="brand-navy">GEEK</b>
        </span>
      </a>
      <div className="header-search"><SiteSearch /></div>
      <details className="mobile-menu">
        <summary aria-label="Open navigation"><span className="mobile-menu-icon" aria-hidden="true"><i></i><i></i><i></i></span></summary>
        <nav aria-label="Mobile navigation">
          <div className="mobile-menu-heading"><span>Explore Taipei</span><p>Independent guides for a more curious visit.</p></div>
          <div className="mobile-menu-utility"><SiteSearch /></div>
          <a className="mobile-plan-link" href="/taipei-guide">Plan your trip <span aria-hidden="true">→</span></a>
          {primaryNavigation.map((item) => <a key={item} href={`/category/${item.toLowerCase()}`}>{item}<span aria-hidden="true">→</span></a>)}
          <details className="mobile-explore-menu"><summary>Explore <span aria-hidden="true"></span></summary>{exploreLinks.map((item) => <a key={item} href={`/category/${item.toLowerCase()}`}>{item}</a>)}</details>
          <details className="mobile-information-menu"><summary>Information <span aria-hidden="true"></span></summary>{informationLinks.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</details>
        </nav>
      </details>
    </div>
    <nav className="desktop-nav" aria-label="Main navigation">
      <div className="nav-links-wrap">
        {primaryNavigation.map((item) => <a key={item} href={`/category/${item.toLowerCase()}`}>{item}</a>)}
        <details className="explore-menu" onToggle={(event) => closeOtherMenus(event.currentTarget)}>
          <summary>Explore <span aria-hidden="true">⌄</span></summary>
          <div className="explore-panel">
            {exploreLinks.map((item) => <a key={item} href={`/category/${item.toLowerCase()}`}>{item}</a>)}
          </div>
        </details>
        <details className="information-menu" onToggle={(event) => closeOtherMenus(event.currentTarget)}>
          <summary>Information <span aria-hidden="true">⌄</span></summary>
          <div className="information-panel">
            {informationLinks.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
          </div>
        </details>
      </div>
      <a className="nav-cta" href="/taipei-guide">Plan your trip <span aria-hidden="true">→</span></a>
    </nav>
  </header>;
}


