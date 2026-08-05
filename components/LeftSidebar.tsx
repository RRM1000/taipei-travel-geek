import type { TaxonomyTerm } from "@/lib/content";
import { WiseAffiliate } from "@/components/WiseAffiliate";

type LeftSidebarProps = {
  categories: TaxonomyTerm[];
};

export function LeftSidebar({ categories }: LeftSidebarProps) {
  return (
    <aside className="article-left-sidebar" aria-label="Klook travel deals">
      <section className="sidebar-section sidebar-klook">
        <p className="sidebar-kicker">Klook deals</p>
        <ins
          className="klk-aff-widget"
          data-adid="625035"
          data-lang=""
          data-currency=""
          data-cardh="126"
          data-padding="92"
          data-lgh="470"
          data-edgevalue="655"
          data-cid="19"
          data-tid="-1"
          data-amount="5"
          data-prod="dynamic_widget"
        >
          <a href="https://www.klook.com/?aid=8733">Browse Taipei experiences</a>
        </ins>
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
