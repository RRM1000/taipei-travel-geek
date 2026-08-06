import Link from "next/link";
import type { TaxonomyTerm } from "@/lib/content";
import { RightSidebarContentsWidget, type HeadingItem } from "@/components/StickyContentsGuide";

type RightSidebarProps = {
  headings: HeadingItem[];
  categories: TaxonomyTerm[];
};

const usefulLinks = [
  { href: "/taipei-essentials-guide", label: "First time in Taipei" },
  { href: "/one-day-itineraries", label: "One-day itineraries" },
  { href: "/taiwan-easycard", label: "Getting around with EasyCard" },
  { href: "/taipei-fun-pass", label: "Taipei Fun Pass" },
];

const topicPills = [
  { href: "/category/eat", label: "EAT" },
  { href: "/category/visit", label: "VISIT" },
  { href: "/category/culture", label: "CULTURE" },
  { href: "/category/events", label: "EVENTS" },
  { href: "/category/areas", label: "AREAS" },
];

export function RightSidebar({ headings }: RightSidebarProps) {
  return (
    <aside className="article-right-sidebar" aria-label="Article navigation and topics">
      <RightSidebarContentsWidget headings={headings} />

      <section className="sidebar-section sidebar-klook-search">
        <p className="sidebar-kicker">Search Klook</p>
        <ins
          className="klk-aff-widget"
          data-wid="8733"
          data-height="340px"
          data-adid="1371574"
          data-lang=""
          data-prod="search_vertical"
          data-currency=""
        >
          <a href="//www.klook.com/?aid=8733">Klook.com</a>
        </ins>
      </section>

      {/* Useful Guides (Desktop Sidebar) */}
      <section className="sidebar-section sidebar-useful desktop-sidebar-useful">
        <h3 className="sidebar-kicker">USEFUL GUIDES</h3>
        <ul className="sidebar-useful-list">
          {usefulLinks.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>
                <span>{item.label}</span>
                <span className="sidebar-arrow" aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Explore More (Desktop Sidebar) */}
      <section className="sidebar-section sidebar-topics desktop-sidebar-topics">
        <h3 className="sidebar-kicker">EXPLORE MORE</h3>
        <div className="sidebar-pill-wrap">
          {topicPills.map((pill) => (
            <Link key={pill.href} href={pill.href} className="sidebar-pill">
              {pill.label}
            </Link>
          ))}
        </div>
      </section>
    </aside>
  );
}
