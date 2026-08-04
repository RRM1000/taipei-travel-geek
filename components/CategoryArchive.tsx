import type { ContentPost, TaxonomyTerm } from "@/lib/content";
import { formatDate, generateBreadcrumbSchema, getPostsByCategory } from "@/lib/content";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const pageSize = 10;

function pageHref(basePath: string, page: number) {
  return page === 1 ? basePath : `${basePath}/page/${page}`;
}

function pageNumbers(currentPage: number, totalPages: number) {
  const start = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
  const end = Math.min(totalPages, start + 4);
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

export function categoryPageCount(category: TaxonomyTerm) {
  return Math.max(1, Math.ceil(getPostsByCategory(category.slug).length / pageSize));
}

function ArticleCard({ article }: { article: ContentPost }) {
  return (
    <article className="archive-card">
      <a className="archive-card-image" href={`/${article.slug}`}>
        <img src={article.featuredImage || "/images/taipei-skyline.jpg"} alt={article.title} />
        {article.categories[0] && <span>{article.categories[0].name}</span>}
      </a>
      <div className="archive-card-copy">
        <p>{formatDate(article.date)}</p>
        <h2><a href={`/${article.slug}`}>{article.title}</a></h2>
        {article.excerpt && <p className="archive-card-excerpt">{article.excerpt}</p>}
        <a className="text-link" href={`/${article.slug}`}>Read guide <span aria-hidden="true">→</span></a>
      </div>
    </article>
  );
}

export function CategoryArchive({
  category,
  currentPage,
  articles: suppliedArticles,
  basePath,
  description,
}: {
  category: TaxonomyTerm;
  currentPage: number;
  articles?: ContentPost[];
  basePath?: string;
  description?: string;
}) {
  const articles = suppliedArticles || getPostsByCategory(category.slug);
  const archivePath = basePath || `/category/${category.slug}`;
  const totalPages = Math.max(1, Math.ceil(articles.length / pageSize));
  const start = (currentPage - 1) * pageSize;
  const pageArticles = articles.slice(start, start + pageSize);

  const breadcrumbJsonLd = generateBreadcrumbSchema([
    { name: "Home", item: "https://www.taipeitravelgeek.com" },
    { name: category.name, item: `https://www.taipeitravelgeek.com/category/${category.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <main className="category-page">
        <SiteHeader />

        <section className="category-heading wrap">
          <Breadcrumbs items={[{ label: category.name }]} />
          <p className="eyebrow">Taipei guides</p>
          <h1>{category.name}</h1>
          <p>{description || "Local recommendations, practical tips and places worth your time in Taipei."}</p>
        </section>

        <section className="wrap archive-grid" aria-label={`${category.name} guides`}>
          {pageArticles.map((article) => <ArticleCard article={article} key={article.id} />)}
        </section>

        {totalPages > 1 && (
          <nav className="wrap pagination" aria-label="Category pages">
            {currentPage > 1 && <a href={pageHref(archivePath, currentPage - 1)}>← Previous</a>}
            <div>
              {pageNumbers(currentPage, totalPages).map((page) => (
                <a href={pageHref(archivePath, page)} aria-current={page === currentPage ? "page" : undefined} key={page}>{page}</a>
              ))}
            </div>
            {currentPage < totalPages && <a href={pageHref(archivePath, currentPage + 1)}>Next →</a>}
          </nav>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
