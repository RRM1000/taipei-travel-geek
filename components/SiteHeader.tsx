"use client";

import { useEffect, useRef, useState } from "react";
import { SiteSearch } from "@/components/SiteSearch";
import { WeatherStrip } from "@/components/WeatherStrip";

type MegaCard = { slug: string; title: string; image: string; excerpt: string };
type PrimaryKey = "Eat" | "Drink" | "Visit" | "Transport" | "TopPicks" | "Lists";
type MenuKey = PrimaryKey | "Explore" | "Information";

const primaryNavigation: PrimaryKey[] = ["Eat", "Drink", "Visit", "Transport"];

const megaMenuMeta: Record<PrimaryKey, { blurb: string; label: string; viewAllHref: string; viewAllLabel: string }> = {
  Eat: { blurb: "Night markets, local favourites and the city's best tables.", label: "Eat", viewAllHref: "/category/eat", viewAllLabel: "View all Eat guides" },
  Drink: { blurb: "Coffee, cocktails and the best rooftop views.", label: "Drink", viewAllHref: "/category/drink", viewAllLabel: "View all Drink guides" },
  Visit: { blurb: "Sights, day trips and neighbourhoods worth your time.", label: "Visit", viewAllHref: "/category/visit", viewAllLabel: "View all Visit guides" },
  Transport: { blurb: "Everything you need to get around with confidence.", label: "Transport", viewAllHref: "/category/transport", viewAllLabel: "View all Transport guides" },
  TopPicks: { blurb: "Our personal favourites - the guides we send friends to first.", label: "Top Picks", viewAllHref: "/tag/top-pick", viewAllLabel: "View every Top Pick" },
  Lists: { blurb: "Every ‘best of’ round-up on the site, all in one place.", label: "Lists", viewAllHref: "/tag/lists", viewAllLabel: "View every Best of Taipei list" },
};

const megaMenuCards: Record<PrimaryKey, MegaCard[]> = {
  Eat: [
    { slug: "michelin-food-stands-at-night-markets", title: "Every Michelin Food Stand at Every Night Market", image: "/media/2022/12/Raohe-Night-Market-6-edited.jpg", excerpt: "Every Bib Gourmand stall, mapped by market." },
    { slug: "best-famous-restaurants", title: "Famous Local Restaurants Worth Queuing For", image: "/media/2019/08/Jin-Feng-Braised-Pork-Rice-12-1024x768.jpg", excerpt: "The best-known local spots, and when to beat the queue." },
    { slug: "best-brunch-in-taipei", title: "The 8 Hippest Brunch Places in Taipei", image: "/media/2019/05/The-Antipodean-Specialty-Coffee-6-e1569909545917-1024x724.jpg", excerpt: "Where Taipei goes for a lazy weekend brunch." },
    { slug: "din-tai-fung", title: "How to Avoid the Queues at Din Tai Fung", image: "/media/2019/10/Din-Tai-Fung-7-1024x712.jpg", excerpt: "The world-famous xiaolongbao, without the wait." },
  ],
  Drink: [
    { slug: "best-bars-in-taipei", title: "The Best Expat Bars in Taipei", image: "/media/2019/06/On-Tap-2-1024x692.jpg", excerpt: "Happy hour times included." },
    { slug: "best-cafes-to-work", title: "Cafes Ideal for Taking Your Laptop", image: "/media/2019/12/Out-of-Office-1024x658.jpg", excerpt: "WiFi, plugs and seating, rated." },
    { slug: "best-cocktail-bars-in-taipei", title: "Taipei's Best Cocktail Bars", image: "/media/2026/08/Cocktail-Bar-Bartender-Pouring-6-1024x1365.jpg", excerpt: "Asia's 50 Best winners, speakeasies and rooftops." },
    { slug: "ximen-outdoor-drinking", title: "Ximending Outdoor Drinking Area", image: "/media/2020/01/Ximending-Outdoor-Drinking-3-1024x716.jpg", excerpt: "The largest and best area in Taipei for drinking outside." },
  ],
  Visit: [
    { slug: "best-districts-and-areas", title: "A Guide to Every District in Taipei", image: "/media/2023/01/Taipei-1024x678.jpg", excerpt: "All 12 districts, and where to base yourself." },
    { slug: "best-day-trips-from-taipei", title: "The Best Day Trips Within 90 Minutes of Taipei", image: "/media/2022/11/Jiufen2-1024x691.jpg", excerpt: "Jiufen, Shifen and the rest of the North Coast." },
    { slug: "one-day-itineraries", title: "24 Hours in Taipei: Itineraries", image: "/media/2019/12/Chiang-Kai-Shek-Memorial-Hall-Flag-Ceremony3-1024x699.jpg", excerpt: "The best of Taipei, planned out for you." },
    { slug: "huashan-1914-creative-park", title: "Huashan 1914 Creative Park", image: "/media/2019/07/Huashan-1914-Creative-Park-18-e1562031248271-1024x768.jpg", excerpt: "Converted warehouses full of galleries, shops and cafes." },
  ],
  Transport: [
    { slug: "taipei-public-transport", title: "Public Transport - A Guide to Every Type in Taipei", image: "/media/2019/08/Taipei-Airport-Express-2-1024x688.jpg", excerpt: "MRT, buses, YouBikes and everything between." },
    { slug: "taiwan-easycard", title: "EasyCard - Make it Your First Purchase in Taiwan", image: "/media/2019/04/easy-card.jpg", excerpt: "The single most useful card you'll own here." },
    { slug: "taipei-youbike", title: "Full Guide for Hiring and Riding a YouBike", image: "/media/2019/09/YouBike-Taipei-6-1024x726.jpg", excerpt: "How to unlock, ride and return the city's bikes." },
    { slug: "mrt", title: "Taipei MRT - Full Guide & Tips", image: "/media/2019/05/Taipei-Main-1024x717.jpg", excerpt: "Taiwan's fast, spotless underground network." },
  ],
  TopPicks: [
    { slug: "national-palace-museum", title: "National Palace Museum", image: "/media/2019/07/National-Palace-Museum-8-1024x694.jpg", excerpt: "The world's largest collection of Chinese artefacts." },
    { slug: "chiang-kai-shek-memorial-hall", title: "Chiang Kai-Shek Memorial Hall", image: "/media/2019/08/Chiang-Kai-Shek-7-1024x700.jpg", excerpt: "One of Taipei's most iconic landmarks." },
    { slug: "taipei-101", title: "Taipei 101 - Cheap Tickets & Best Times to Visit", image: "/media/2020/12/Taipei-101-Fireworks-Mountain-1-1024x619.jpg", excerpt: "How to skip the queue and the crowds." },
    { slug: "ximending", title: "Ximending - Full Guide and Map", image: "/media/2019/05/Ximen-10-1024x738.jpg", excerpt: "Taipei's pedestrian-only youth culture hub." },
  ],
  Lists: [
    { slug: "best-museums-in-taipei", title: "7 Very Different Museums to Visit", image: "/media/2019/07/Miniatures-Museum-of-Taiwan-13-1024x725.jpg", excerpt: "Something for everyone, adults and kids alike." },
    { slug: "best-markets-in-taipei", title: "The 5 Best Night (and Day) Markets in Taipei", image: "/media/2019/08/Shilin-Night-Market-1024x725.jpg", excerpt: "Taipei's best markets, day and night." },
    { slug: "quirky-cool-fun-things", title: "14 Quirky, Cool or Fun Things to Try", image: "/media/2023/04/Lin-Family-Mansion-9-edited-scaled.jpg", excerpt: "Unusual things worth making time for." },
    { slug: "taipei-on-a-budget", title: "Taipei on a Budget: 14 Free or Cheap Things", image: "/media/2019/08/Chiang-Kai-Shek-8-1024x689.jpg", excerpt: "Great days out that won't dent your wallet." },
  ],
};

const exploreLinks = [
  { label: "Shop", href: "/category/shop", desc: "Souvenirs, markets & where to shop" },
  { label: "Culture", href: "/category/culture", desc: "Temples, museums & local traditions" },
  { label: "Events", href: "/category/events", desc: "Festivals and what's on in the city" },
  { label: "Areas", href: "/category/areas", desc: "Browse every guide by district" },
];

const informationLinks = [
  { href: "/taiwan-easycard", label: "EasyCard" },
  { href: "/taiwan-sim-cards", label: "Taiwan SIM cards" },
  { href: "/taipei-trip-cost", label: "Trip costs & money" },
  { href: "/taipei-fun-pass", label: "Taipei Fun Pass" },
  { href: "/taiwan-visa-entry-requirements", label: "Visa & entry requirements" },
  { href: "/taiwan-tourist-tax-refund", label: "Tourist tax refund" },
  { href: "/sports-centre-gym", label: "Sports centre gyms" },
  { href: "/taipei-laundrettes", label: "Launderettes" },
  { href: "/maps", label: "Map" },
  { href: "/taipei-suggested-routes", label: "Routes" },
];

const explorePromo = { title: "Lists", desc: "Every ‘best of’ list on the site, gathered in one place.", image: "/images/taipei-skyline.jpg", href: "/tag/lists" };
const informationPromo = { title: "The Taipei Guide", desc: "New here? Start with the essentials before anything else.", image: "/media/2023/01/Taipei-1024x678.jpg", href: "/taipei-guide" };

export function SiteHeader() {
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
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
    clearCloseTimer();
    clearOpenTimer();
    setActiveMenu(key);
  };

  const openMenuOnHover = (key: MenuKey) => {
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
      if (!target.closest(".desktop-nav")) setActiveMenu(null);
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

  const triggerProps = (key: MenuKey) => ({
    onMouseEnter: () => openMenuOnHover(key),
    onMouseLeave: scheduleClose,
    onFocus: () => openMenu(key),
    "aria-expanded": activeMenu === key,
    "aria-haspopup": "true" as const,
  });

  return (
    <header className="site-header">
      <div className="header-brand-row">
        <a className="brand" href="/" aria-label="Taipei Travel Geek home">
          <img src="/images/ttg-mark.png" alt="Taipei Travel Geek Logo" />
          <span className="brand-text">
            <b className="brand-navy">TAIPEI</b> <b className="brand-red">TRAVEL</b> <b className="brand-navy">GEEK</b>
          </span>
        </a>
        <div className="header-weather"><WeatherStrip /></div>
        <div className="header-search"><SiteSearch /></div>
        <details className="mobile-menu">
          <summary aria-label="Open navigation"><span className="mobile-menu-icon" aria-hidden="true"><i></i><i></i><i></i></span></summary>
          <nav aria-label="Mobile navigation">
            <div className="mobile-menu-heading"><span>Explore Taipei</span><p>Independent guides for a more curious visit.</p><WeatherStrip /></div>
            <div className="mobile-menu-utility"><SiteSearch /></div>
            <a className="mobile-plan-link" href="/taipei-guide">Plan your trip <span aria-hidden="true">→</span></a>
            {primaryNavigation.map((item) => <a key={item} href={`/category/${item.toLowerCase()}`}>{item}<span aria-hidden="true">→</span></a>)}
            <a href="/tag/top-pick">Top Picks<span aria-hidden="true">→</span></a>
            <a href="/tag/lists">Lists<span aria-hidden="true">→</span></a>
            <details className="mobile-explore-menu"><summary>Explore <span aria-hidden="true"></span></summary>{exploreLinks.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}</details>
            <details className="mobile-information-menu"><summary>Information <span aria-hidden="true"></span></summary>{informationLinks.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</details>
          </nav>
        </details>
      </div>
      <nav className="desktop-nav" aria-label="Main navigation" onMouseLeave={scheduleClose}>
        <div className="nav-links-wrap">
          {primaryNavigation.map((item) => (
            <a key={item} href={`/category/${item.toLowerCase()}`} {...triggerProps(item)}>{item} <span className="nav-caret" aria-hidden="true" /></a>
          ))}
          <a href="/tag/top-pick" {...triggerProps("TopPicks")}>Top Picks <span className="nav-caret" aria-hidden="true" /></a>
          <a href="/tag/lists" {...triggerProps("Lists")}>Lists <span className="nav-caret" aria-hidden="true" /></a>
          <button type="button" {...triggerProps("Explore")}>Explore <span className="nav-caret" aria-hidden="true" /></button>
          <button type="button" {...triggerProps("Information")}>Information <span className="nav-caret" aria-hidden="true" /></button>
        </div>
        <a className="nav-cta" href="/taipei-guide">Plan your trip <span aria-hidden="true">→</span></a>

        <div
          className={`mega-menu-panel${activeMenu ? " is-open" : ""}`}
          onMouseEnter={clearCloseTimer}
          onMouseLeave={scheduleClose}
        >
          <div className="mega-menu-inner">
            {(["Eat", "Drink", "Visit", "Transport", "TopPicks", "Lists"] as PrimaryKey[]).map((key) => (
              <div key={key} className="mega-menu-content" hidden={activeMenu !== key}>
                <div className="mega-menu-header">
                  <p className="mega-menu-blurb">{megaMenuMeta[key].blurb}</p>
                  <a className="mega-menu-viewall" href={megaMenuMeta[key].viewAllHref}>{megaMenuMeta[key].viewAllLabel} <span aria-hidden="true">→</span></a>
                </div>
                <div className="mega-menu-cards">
                  {megaMenuCards[key].map((card) => (
                    <a key={card.slug} className="mega-menu-card" href={`/${card.slug}`}>
                      <span className="mega-menu-card-image"><img src={card.image} alt="" loading="lazy" /></span>
                      <span className="mega-menu-card-title">{card.title}</span>
                      <span className="mega-menu-card-excerpt">{card.excerpt}</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}

            <div className="mega-menu-content" hidden={activeMenu !== "Explore"}>
              <div className="mega-menu-links-layout">
                <div className="mega-menu-link-grid">
                  {exploreLinks.map((item) => (
                    <a key={item.label} className="mega-menu-link-card" href={item.href}>
                      <span className="mega-menu-link-title">{item.label}</span>
                      <span className="mega-menu-link-desc">{item.desc}</span>
                    </a>
                  ))}
                </div>
                <a className="mega-menu-promo" href={explorePromo.href}>
                  <span className="mega-menu-promo-image"><img src={explorePromo.image} alt="" loading="lazy" /></span>
                  <span className="mega-menu-promo-title">{explorePromo.title}</span>
                  <span className="mega-menu-promo-desc">{explorePromo.desc}</span>
                </a>
              </div>
            </div>

            <div className="mega-menu-content" hidden={activeMenu !== "Information"}>
              <div className="mega-menu-links-layout">
                <div className="mega-menu-link-list">
                  {informationLinks.map((item) => (
                    <a key={item.href} href={item.href}>{item.label}</a>
                  ))}
                </div>
                <a className="mega-menu-promo" href={informationPromo.href}>
                  <span className="mega-menu-promo-image"><img src={informationPromo.image} alt="" loading="lazy" /></span>
                  <span className="mega-menu-promo-title">{informationPromo.title}</span>
                  <span className="mega-menu-promo-desc">{informationPromo.desc}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
