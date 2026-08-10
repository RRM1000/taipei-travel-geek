import Link from "next/link";
import { getCategoriesWithCounts, getTagsWithCounts, type TaxonomyTerm } from "@/lib/content";
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

// Both lists are derived from the content rather than hand-written, so nothing
// can silently go missing. This section previously listed five categories out
// of twenty, omitting Restaurants and Buildings - the second and fourth
// largest on the site.
const categoryPills = getCategoriesWithCounts();
const tagIndex = getTagsWithCounts(3);

export function RightSidebar({ headings }: RightSidebarProps) {
  return (
    <aside className="article-right-sidebar" aria-label="Article navigation and topics">
      <RightSidebarContentsWidget headings={headings} />

      <section className="sidebar-section sidebar-contribute-card">
        <p className="sidebar-kicker">WRITE FOR US</p>
        <p className="contribute-title">
          Love exploring the restaurant and bar scene in Taipei? We’d love your help writing articles for our blog!
        </p>
        <p className="contribute-action">
          Please <a href="mailto:taipeitravelgeek@gmail.com" className="contribute-email-link">contact me</a>.
        </p>
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
          {categoryPills.map((entry) => (
            <Link
              key={entry.term.slug}
              href={`/category/${entry.term.slug}`}
              className="sidebar-pill"
              aria-label={`${entry.term.name}, ${entry.count} guides`}
            >
              {entry.term.name}
              <span className="sidebar-pill-count" aria-hidden="true">{entry.count}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Browse by tag. Last in the sidebar deliberately - it's the deepest
          level of browsing, and only reached by readers who scroll for it. */}
      <section className="sidebar-section sidebar-tags desktop-sidebar-tags">
        <h3 className="sidebar-kicker">BROWSE BY TAG</h3>
        <div className="sidebar-tag-wrap">
          {tagIndex.map((entry) => (
            <Link
              key={entry.term.slug}
              href={`/tag/${entry.term.slug}`}
              className="sidebar-tag"
              aria-label={`${entry.term.name}, ${entry.count} guides`}
            >
              {entry.term.name}
              <span className="sidebar-tag-count" aria-hidden="true">{entry.count}</span>
            </Link>
          ))}
        </div>
      </section>
    </aside>
  );
}
