import type { TaxonomyTerm } from "@/lib/content";

type PostFooterNavProps = {
  categories: TaxonomyTerm[];
};

const usefulGuides = [
  { href: "/first-time-in-taipei", label: "First time in Taipei" },
  { href: "/taipei-1-day-itineraries", label: "One-day itineraries" },
  { href: "/taiwan-easycard", label: "Getting around with EasyCard" },
  { href: "/taipei-fun-pass", label: "Taipei Fun Pass" },
];

export function PostFooterNav({ categories }: PostFooterNavProps) {
  const topics = [
    ...categories,
    { name: "EAT", slug: "eat" },
    { name: "VISIT", slug: "visit" },
    { name: "CULTURE", slug: "culture" },
    { name: "EVENTS", slug: "events" },
    { name: "AREAS", slug: "areas" },
  ]
    .filter((topic, index, all) => all.findIndex((item) => item.slug.toLowerCase() === topic.slug.toLowerCase()) === index)
    .slice(0, 5);

  return (
    <div className="post-footer-nav mobile-only-footer-nav">
      {/* 1. Useful Section after Post (Mobile Only) */}
      <section className="post-footer-section sidebar-useful">
        <p className="sidebar-kicker">Useful Guides</p>
        <ul className="sidebar-guide-list">
          {usefulGuides.map((guide) => (
            <li key={guide.href}>
              <a href={guide.href}>
                {guide.label}
                <span aria-hidden="true">→</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* 2. Explore More Section after Post (Mobile Only) */}
      {topics.length > 0 && (
        <section className="post-footer-section">
          <p className="sidebar-kicker">Explore More</p>
          <div className="sidebar-topics">
            {topics.map((topic) => (
              <a key={`${topic.slug}-${topic.name}`} href={`/category/${topic.slug}`}>
                {topic.name}
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
