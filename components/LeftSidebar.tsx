import type { TaxonomyTerm } from "@/lib/content";
import { WiseAffiliate } from "@/components/WiseAffiliate";
import { KlookSidebarWidget } from "@/components/KlookSidebarWidget";

type LeftSidebarProps = {
  categories: TaxonomyTerm[];
};

export function LeftSidebar({ categories }: LeftSidebarProps) {
  return (
    <aside className="article-left-sidebar" aria-label="Klook travel deals">
      <section className="sidebar-section sidebar-klook">
        <p className="sidebar-kicker">Klook deals</p>
        <KlookSidebarWidget amount="5" />
      </section>

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
