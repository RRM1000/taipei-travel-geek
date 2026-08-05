import type { TaxonomyTerm } from "@/lib/content";
import { WiseAffiliate } from "@/components/WiseAffiliate";

type ArticleSidebarProps = {
  categories: TaxonomyTerm[];
};

const usefulGuides = [
  { href: "/taipei-guide", label: "First time in Taipei" },
  { href: "/one-day-itineraries", label: "One-day itineraries" },
  { href: "/taiwan-easycard", label: "Getting around with EasyCard" },
  { href: "/taipei-fun-pass", label: "Taipei Fun Pass" },
];

export function ArticleSidebar({ categories }: ArticleSidebarProps) {
  const topics = [...categories, { name: "Eat", slug: "eat" }, { name: "Visit", slug: "visit" }, { name: "Culture", slug: "culture" }, { name: "Events", slug: "events" }, { name: "Areas", slug: "areas" }]
    .filter((topic, index, all) => all.findIndex((item) => item.slug === topic.slug) === index)
    .slice(0, 6);

  return (
    <aside className="article-sidebar" aria-label="Related guides">
      <section className="sidebar-section sidebar-useful">
        <p className="sidebar-kicker">Useful</p>
        <ul className="sidebar-guide-list">
          {usefulGuides.map((guide) => <li key={guide.href}><a href={guide.href}>{guide.label}<span aria-hidden="true">→</span></a></li>)}
        </ul>
      </section>

      {topics.length > 0 && (
        <section className="sidebar-section">
          <p className="sidebar-kicker">Explore more</p>
          <div className="sidebar-topics">
            {topics.map((topic) => <a key={`${topic.slug}-${topic.name}`} href={`/category/${topic.slug}`}>{topic.name}</a>)}
          </div>
        </section>
      )}

      <section className="sidebar-section sidebar-klook">
        <p className="sidebar-kicker">Klook deals</p>
        <ins className="klk-aff-widget" data-adid="625035" data-lang="" data-currency="" data-cardh="126" data-padding="92" data-lgh="470" data-edgevalue="655" data-cid="19" data-tid="-1" data-amount="6" data-prod="dynamic_widget">
          <a href="https://www.klook.com/?aid=8733">Browse Taipei experiences</a>
        </ins>
      </section>

      <WiseAffiliate />

      <section className="sidebar-trip">
        <p className="sidebar-kicker">Plan your trip</p>
        <p>Build an easy, memorable Taipei itinerary with our practical starter guide.</p>
        <a href="/taipei-guide">Start planning <span aria-hidden="true">→</span></a>
      </section>
    </aside>
  );
}
