"use client";

import { useEffect, useRef, useState } from "react";
import { SiteSearch } from "@/components/SiteSearch";
import type { Menu, MenuKey } from "@/components/site-menus";

/**
 * The header bar, mega menus and mobile menu. The menus themselves are in
 * components/site-menus.ts; SiteHeader adds their photos' srcset.
 */
export function SiteHeaderClient({ menus }: { menus: Menu[] }) {
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
  // Menus whose card photos have been added to the page. The closed panel is
  // only visibility: hidden, so the browser counts its 20 photos as on screen
  // and loading="lazy" never holds them back: every page used to fetch them
  // all, about 3 MB, phones included, where the panel never opens. A menu's
  // photos are added the moment its trigger is hovered or focused instead.
  const [primed, setPrimed] = useState<ReadonlySet<MenuKey>>(() => new Set());
  const prime = (key: MenuKey) => setPrimed((set) => (set.has(key) ? set : new Set(set).add(key)));
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const clearOpenTimer = () => {
    if (openTimer.current) {
      clearTimeout(openTimer.current);
      openTimer.current = null;
    }
  };

  const openMenu = (key: MenuKey) => {
    prime(key);
    clearCloseTimer();
    clearOpenTimer();
    setActiveMenu(key);
  };

  const openMenuOnHover = (key: MenuKey) => {
    prime(key);
    clearCloseTimer();
    if (activeMenu !== null) {
      clearOpenTimer();
      setActiveMenu(key);
      return;
    }
    clearOpenTimer();
    openTimer.current = setTimeout(() => setActiveMenu(key), 150);
  };

  const scheduleClose = () => {
    clearOpenTimer();
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setActiveMenu(null), 200);
  };

  useEffect(() => {
    const closeMobileMenus = () => {
      document.querySelectorAll<HTMLDetailsElement>(".mobile-menu details[open]").forEach((menu) => {
        menu.open = false;
      });
    };
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Element;
      if (!target.closest(".desktop-nav, .mega-menu-panel")) setActiveMenu(null);
      if (!target.closest(".mobile-menu")) closeMobileMenus();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveMenu(null);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      clearCloseTimer();
      clearOpenTimer();
    };
  }, []);

  // The bar slides away while the reader scrolls down and comes back as soon
  // as they scroll up, as on City Break Geek. The state lives on <html>
  // (header-hidden) so the sticky sidebar can move up with it - see
  // --sticky-top in app/styles/layout.css. It never hides while a mega menu,
  // the mobile menu or search is open, or within its own height of the top.
  const headerRef = useRef<HTMLElement>(null);
  const menuOpenRef = useRef(false);

  useEffect(() => {
    menuOpenRef.current = activeMenu !== null;
    if (activeMenu) document.documentElement.classList.remove("header-hidden");
  }, [activeMenu]);

  useEffect(() => {
    const root = document.documentElement;
    let lastY = window.scrollY;

    // Runs straight from the scroll event: it only compares two numbers and
    // flips a class, so there is nothing worth deferring to a frame.
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      const header = headerRef.current;
      const height = header?.offsetHeight ?? 64;
      const busy =
        menuOpenRef.current ||
        !!header?.querySelector(".mobile-menu[open]") ||
        !!document.querySelector(".search-overlay");

      if (busy || y <= height) {
        root.classList.remove("header-hidden");
        lastY = y;
        return;
      }
      if (Math.abs(delta) < 8) return;
      root.classList.toggle("header-hidden", delta > 0);
      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      root.classList.remove("header-hidden");
    };
  }, []);

  const triggerProps = (key: MenuKey) => ({
    onMouseEnter: () => openMenuOnHover(key),
    onMouseLeave: scheduleClose,
    onFocus: () => openMenu(key),
    "aria-expanded": activeMenu === key,
    "aria-haspopup": "true" as const,
  });

  return (
    <header className="site-header" ref={headerRef}>
      {/* One navy bar: logo, five menus and a search icon. The mega-menu
          panel is positioned against the whole header, not the nav, so it
          still spans the full width. */}
      <div className="header-bar">
        <a className="brand" href="/" aria-label="Taipei Travel Geek home">
          <img src="/images/ttg-mark-transparent.png" alt="" width={40} height={40} />
          <span className="brand-text">
            <b className="brand-navy">TAIPEI</b> <b className="brand-red">TRAVEL</b> <b className="brand-navy">GEEK</b>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation" onMouseLeave={scheduleClose}>
          <div className="nav-links-wrap">
            {menus.map((menu) => (
              <a key={menu.key} href={menu.href} {...triggerProps(menu.key)}>{menu.label} <span className="nav-caret" aria-hidden="true" /></a>
            ))}
          </div>
        </nav>
        <div className="header-tools">
          <div className="header-search"><SiteSearch /></div>
        </div>
        <details className="mobile-menu">
          <summary aria-label="Open navigation"><span className="mobile-menu-icon" aria-hidden="true"><i></i><i></i><i></i></span></summary>
          <nav aria-label="Mobile navigation">
            <div className="mobile-menu-heading"><span>Explore Taipei</span><p>Independent guides for a more curious visit.</p></div>
            <div className="mobile-menu-utility"><SiteSearch /></div>
            {menus.map((menu) => (
              <details key={menu.key} className="mobile-menu-section">
                <summary>{menu.label} <span aria-hidden="true"></span></summary>
                <a href={menu.viewAllHref}>{menu.viewAllLabel}</a>
                {menu.cards.map((card) => <a key={card.slug} href={`/${card.slug}`}>{card.title}</a>)}
                {menu.links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
              </details>
            ))}
          </nav>
        </details>
      </div>
      <div
        className={`mega-menu-panel${activeMenu ? " is-open" : ""}`}
        onMouseEnter={clearCloseTimer}
        onMouseLeave={scheduleClose}
      >
        <div className="mega-menu-inner">
          {menus.map((menu) => (
            <div
              key={menu.key}
              className={`mega-menu-content${activeMenu === menu.key ? " is-active" : ""}`}
              aria-hidden={activeMenu !== menu.key}
              inert={activeMenu !== menu.key}
            >
              <div className="mega-menu-header">
                <p className="mega-menu-blurb">{menu.blurb}</p>
                <a className="mega-menu-viewall" href={menu.viewAllHref}>{menu.viewAllLabel} <span aria-hidden="true">→</span></a>
              </div>
              <div className="mega-menu-split">
                <div className="mega-menu-cards">
                  {menu.cards.map((card) => (
                    <a key={card.slug} className="mega-menu-card" href={`/${card.slug}`}>
                      <span className="mega-menu-card-image">{primed.has(menu.key) && <img src={card.image} srcSet={card.imageSrcSet} sizes={card.imageSrcSet ? "(max-width: 1400px) 240px, 300px" : undefined} alt="" decoding="async" />}</span>
                      <span className="mega-menu-card-title">{card.title}</span>
                      <span className="mega-menu-card-excerpt">{card.excerpt}</span>
                    </a>
                  ))}
                </div>
                <div className="mega-menu-side">
                  <ul className="mega-menu-quick-links">
                    {menu.links.map((link) => (
                      <li key={link.href}><a href={link.href}>{link.label}</a></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
