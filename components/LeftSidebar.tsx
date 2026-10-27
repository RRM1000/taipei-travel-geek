import type { TaxonomyTerm } from "@/lib/content";
import { WiseAffiliate } from "@/components/WiseAffiliate";
import { KlookSidebarWidget } from "@/components/KlookSidebarWidget";

type LeftSidebarProps = {
  categories: TaxonomyTerm[];
  /** Off for pages that opt out of "klookDeals" in GENERIC_UNIT_OPT_OUTS (lib/content.ts). */
  showKlookDeals?: boolean;
};

export function LeftSidebar({ categories, showKlookDeals = true }: LeftSidebarProps) {
  return (
    <aside className="article-left-sidebar" aria-label="Klook travel deals">
      {showKlookDeals && <KlookSidebarWidget amount="5" />}

      <WiseAffiliate />

      {categories.length > 0 && (
        <section className="sidebar-section">
          <p className="sidebar-kicker">Categories</p>
          <div className="sidebar-topics">
            {categories.map((cat) => (
              <a key={cat.slug} href={`/category/${cat.slug}`}>
                {cat.name}
              </a>
            ))}
          </div>
        </section>
      )}
    </aside>
  );
}
