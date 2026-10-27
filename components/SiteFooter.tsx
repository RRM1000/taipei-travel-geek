/**
 * Navy footer, the same colour as the header bar, so the site is framed by
 * one brand colour top and bottom (City Break Geek does the same with its
 * chrome colour). Link groups follow how readers plan a trip rather than the
 * category list, which the header menus and the after-article band already
 * cover.
 */
const linkGroups: { heading: string; links: { href: string; label: string }[] }[] = [
  {
    heading: "Eat & drink",
    links: [
      { href: "/category/eat", label: "Food guides" },
      { href: "/best-famous-restaurants", label: "Famous local restaurants" },
      { href: "/best-markets-in-taipei", label: "Night markets" },
      { href: "/din-tai-fung", label: "Din Tai Fung" },
      { href: "/category/drink", label: "Bars & cafes" },
    ],
  },
  {
    heading: "See & do",
    links: [
      { href: "/category/visit", label: "Sights" },
      { href: "/best-day-trips-from-taipei", label: "Day trips" },
      { href: "/best-museums-in-taipei", label: "Museums" },
      { href: "/category/routes", label: "Walking routes" },
      { href: "/where-to-go-when-raining", label: "Rainy days" },
    ],
  },
  {
    heading: "Where to stay",
    links: [
      { href: "/best-areas-and-hotels-to-stay", label: "Best areas & hotels" },
      { href: "/best-districts-and-areas", label: "Every district" },
      { href: "/category/hotels", label: "Hotel guides" },
      { href: "/tag/top-pick", label: "Top picks" },
      { href: "/tag/lists", label: "Every list" },
    ],
  },
  {
    heading: "Plan",
    links: [
      { href: "/taipei-guide", label: "Taipei travel guide" },
      { href: "/taipei-public-transport", label: "Getting around" },
      { href: "/taiwan-easycard", label: "EasyCard" },
      { href: "/taipei-money-guide", label: "Money & costs" },
      { href: "/taiwan-visa-entry-requirements", label: "Visas & entry" },
      { href: "/maps", label: "Map" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-intro">
            <a className="brand footer-brand" href="/" aria-label="Taipei Travel Geek home">
              <img src="/images/ttg-mark-transparent.png" alt="" width={44} height={44} loading="lazy" />
              <span className="brand-text">
                <b className="brand-navy">TAIPEI</b> <b className="brand-red">TRAVEL</b> <b className="brand-navy">GEEK</b>
              </span>
            </a>
            <p>
              Independent, first-hand guides to Taipei&rsquo;s food, sights and neighbourhoods,
              written by people who live here and updated regularly.
            </p>
            <a className="footer-plan" href="/taipei-guide">Start planning <span aria-hidden="true">→</span></a>
          </div>
          <nav className="footer-groups" aria-label="Footer">
            {linkGroups.map((group) => (
              <div key={group.heading} className="footer-group">
                <p className="footer-heading">{group.heading}</p>
                <ul>
                  {group.links.map((link) => (
                    <li key={link.href}><a href={link.href}>{link.label}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="footer-base">
          <p>&copy; {new Date().getFullYear()} Taipei Travel Geek</p>
          <p className="footer-disclosure">
            Some links earn us a commission if you book, at no extra cost to you. Recommendations are never paid for.
          </p>
          <p className="footer-base-links">
            <a href="/about-taipei-traveller">About</a>
            <a href="mailto:taipeitravelgeek@gmail.com">Write for us</a>
            <a href="/privacy-policy">Privacy</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
