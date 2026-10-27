import { Card } from "@/components/Card";
import { getCategoriesWithCounts, getTagsWithCounts, type ContentPost } from "@/lib/content";

type RelatedGuidesProps = {
  related: ContentPost[];
};

const usefulLinks = [
  { href: "/taipei-essentials-guide", label: "First time in Taipei" },
  { href: "/one-day-itineraries", label: "One-day itineraries" },
  { href: "/taiwan-easycard", label: "Getting around with EasyCard" },
  { href: "/taipei-fun-pass", label: "Taipei Fun Pass" },
];

// Derived from the content rather than hand-written, so nothing can silently
// go missing (these used to live in the right sidebar).
const categoryPills = getCategoriesWithCounts();
const tagIndex = getTagsWithCounts(3);

/**
 * The full-width band after every article, on every screen size: three
 * related guides as cards, then the browsing links that used to fill the
 * sidebar (useful guides, every category, every tag, write for us). Modelled
 * on City Break Geek's "Keep planning" row, but inside .wrap so it keeps the
 * page gutters (CBG's own row sits flush against the left edge).
 */
export function RelatedGuides({ related }: RelatedGuidesProps) {
  return (
    <section className="related-guides" aria-labelledby="related-guides-heading">
      <div className="wrap related-guides-inner">
        {related.length > 0 && (
          <>
            <div className="related-guides-head">
              <p className="eyebrow">Keep planning</p>
              <h2 id="related-guides-heading">More Taipei guides</h2>
            </div>
            <div className="related-guides-grid">
              {related.map((post) => (
                <Card
                  key={post.slug}
                  href={`/${post.slug}`}
                  title={post.title}
                  image={post.featuredImage}
                  eyebrow={post.categories[0]?.name}
                  excerpt={post.excerpt}
                  more="Read guide"
                />
              ))}
            </div>
          </>
        )}

        <div className="related-guides-browse">
          {related.length === 0 && <h2 id="related-guides-heading" className="related-guides-browse-title">Keep exploring Taipei</h2>}
          <section className="related-browse-col">
            <p className="related-browse-kicker">Useful guides</p>
            <ul className="related-useful-list">
              {usefulLinks.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label} <span aria-hidden="true">→</span></a>
                </li>
              ))}
            </ul>
          </section>
          <section className="related-browse-col">
            <p className="related-browse-kicker">Explore by category</p>
            <div className="related-pill-wrap">
              {categoryPills.map((entry) => (
                <a
                  key={entry.term.slug}
                  href={`/category/${entry.term.slug}`}
                  className="related-pill"
                  aria-label={`${entry.term.name}, ${entry.count} guides`}
                >
                  {entry.term.name}
                  <span aria-hidden="true">{entry.count}</span>
                </a>
              ))}
            </div>
          </section>
          <section className="related-browse-col related-browse-tags">
            <p className="related-browse-kicker">Browse by tag</p>
            <div className="related-pill-wrap">
              {tagIndex.map((entry) => (
                <a
                  key={entry.term.slug}
                  href={`/tag/${entry.term.slug}`}
                  className="related-pill related-pill--tag"
                  aria-label={`${entry.term.name}, ${entry.count} guides`}
                >
                  {entry.term.name}
                  <span aria-hidden="true">{entry.count}</span>
                </a>
              ))}
            </div>
          </section>
          <section className="related-browse-col related-write">
            <p className="related-browse-kicker">Write for us</p>
            <p>
              Love Taipei&rsquo;s restaurant and bar scene? We&rsquo;d love your help writing for the site.{" "}
              <a href="mailto:taipeitravelgeek@gmail.com">Get in touch</a>.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
