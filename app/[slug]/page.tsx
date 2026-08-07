import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { LeftSidebar } from "@/components/LeftSidebar";
import { KlookSidebarWidget } from "@/components/KlookSidebarWidget";
import { RightSidebar } from "@/components/RightSidebar";
import { KlookAffiliate } from "@/components/KlookAffiliate";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AuthorBio } from "@/components/AuthorBio";
import { PostFooterNav } from "@/components/PostFooterNav";
import {
  calculateReadingTime,
  enhanceChoiceGuideImages,
  enhanceContentHeadings,
  enhanceInlineAffiliateCTAs,
  enhanceKlookDealsWidget,
  enhanceRecommendedReading,
  enhanceTables,
  enhanceThreeImageGalleries,
  enhanceYoutubeEmbeds,
  formatDate,
  generateArticleSchema,
  generateBreadcrumbSchema,
  getPost,
  getRelatedPosts,
  hasManualRecommendedReading,
  nonEditorialSlugs,
  posts,
  renderHotelDealsWidget,
  renderRecommendedReadingSection,
  shouldShowHotelDealsWidget,
} from "@/lib/content";

type PageProperties = { params: Promise<{ slug: string }> };

// Every post carried over from the WordPress migration has a `modified` date
// no later than this. Anything modified after it reflects a genuine,
// post-migration content review - not just a leftover import timestamp. Used
// to decide whether the "Updated" date is honest to show a reader.
const CONTENT_REVIEW_CUTOFF = new Date("2023-05-01T00:00:00Z");

function isGenuinelyReviewed(modified: string | undefined, date?: string) {
  const target = modified || date;
  if (!target) return false;
  const parsed = new Date(`${target.replace(" ", "T")}Z`);
  return !Number.isNaN(parsed.getTime()) && parsed >= CONTENT_REVIEW_CUTOFF;
}

const legacySlugRedirects: Record<string, string> = {
  "danshui": "best-day-trips-from-taipei",
  "best-taipei-shopping-malls": "best-shopping-malls-in-taipei",
  "best-brunches-in-taipei": "best-brunch-in-taipei",
  "legacy": "legacy-taipei",
  "da-an-forest-park": "daan-forest-park",
  "taipei-botanical-gardens": "taipei-botanical-garden",
  "taipei-events": "taipei-annual-events",
};

function withoutDuplicateLeadImage(content: string, image: string | null, isPage: boolean) {
  if (!image || isPage) return content;

  const escapedImage = image.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // The gap between <figure> and <img> must be whitespace-only (optionally
  // with a leading <figcaption>) - NOT `[\s\S]*?`. An unbounded gap lets this
  // match start at any earlier, unrelated <figure> in the post (e.g. a price
  // table) and swallow everything up to the real duplicate image, deleting
  // whole sections in between. Requiring the image to be the figure's own
  // near-immediate child scopes the match to the one figure that's actually
  // a duplicate of the hero image.
  const leadFigure = new RegExp(`<figure\\b[^>]*>\\s*<img\\b[^>]*src=["']${escapedImage}["'][^>]*>[\\s\\S]*?<\\/figure>`, "i");
  const match = leadFigure.exec(content);
  if (!match) return content;

  // Only strip it if the match is actually in the lead-in area, before the
  // article's first real section heading. Otherwise this is a legitimate
  // inline image deep in the body that just happens to reuse the featured
  // image (e.g. a specific night market's photo also being the post's hero
  // image) - removing that would silently delete real content.
  const firstH2Index = content.search(/<h2\b/i);
  if (firstH2Index !== -1 && match.index >= firstH2Index) return content;

  return content.slice(0, match.index) + content.slice(match.index + match[0].length);
}

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProperties): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};

  const title = post.title;
  const description = post.excerpt || `A Taipei Travel Geek guide to ${post.title}.`;
  const url = `https://www.taipeitravelgeek.com/${post.slug}`;
  const ogImage = post.featuredImage
    ? `https://www.taipeitravelgeek.com${post.featuredImage}`
    : "https://www.taipeitravelgeek.com/og.png";

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      siteName: "Taipei Travel Geek",
      images: [{ url: ogImage, alt: title }],
      publishedTime: post.date,
      modifiedTime: post.modified || post.date,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function ArticlePage({ params }: PageProperties) {
  const { slug } = await params;
  const replacement = legacySlugRedirects[slug];
  if (replacement) permanentRedirect(`/${replacement}`);

  const post = getPost(slug);
  if (!post) notFound();

  const heroImage = post.featuredImage || null;
  const isPage = post.type === "page";
  const rawContent = enhanceKlookDealsWidget(
    enhanceThreeImageGalleries(
      enhanceTables(
        enhanceYoutubeEmbeds(
          enhanceRecommendedReading(
            enhanceInlineAffiliateCTAs(
              enhanceChoiceGuideImages(withoutDuplicateLeadImage(post.content, heroImage, isPage), post.slug)
            ),
            heroImage
          )
        )
      )
    )
  );

  const { enhancedContent, headings } = enhanceContentHeadings(rawContent);

  // If this post doesn't already hand-author a "Recommended Reading:" block,
  // auto-append one based on shared categories/tags - replicates the old
  // WordPress related-posts widget without needing per-post curation.
  const withRecommendedReading = (nonEditorialSlugs.has(post.slug) || hasManualRecommendedReading(post.content))
    ? enhancedContent
    : enhancedContent + renderRecommendedReadingSection(getRelatedPosts(post, 3));

  // Auto-append a small hotel deals widget after Recommended Reading on every
  // eligible post, so it isn't limited to a single hand-placed page.
  const finalContent = shouldShowHotelDealsWidget(post)
    ? withRecommendedReading + renderHotelDealsWidget()
    : withRecommendedReading;

  const readingTime = calculateReadingTime(post.content);
  const primaryCategory = post.categories[0];

  const breadcrumbItems = [
    ...(primaryCategory
      ? [{ label: primaryCategory.name, href: `/category/${primaryCategory.slug}` }]
      : []),
    { label: post.title },
  ];

  const articleJsonLd = generateArticleSchema(post);
  const breadcrumbJsonLd = generateBreadcrumbSchema([
    { name: "Home", item: "https://www.taipeitravelgeek.com" },
    ...(primaryCategory
      ? [{ name: primaryCategory.name, item: `https://www.taipeitravelgeek.com/category/${primaryCategory.slug}` }]
      : []),
    { name: post.title, item: `https://www.taipeitravelgeek.com/${post.slug}` },
  ]);

  return (
    <div className="article-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SiteHeader />

      <main>
        <section className={`article-hero${heroImage ? " article-hero-with-image" : ""}`}>
          {heroImage && <img className="article-hero-image" src={heroImage} alt={post.title} />}
          {heroImage && <div className="article-hero-scrim" />}
          <div className="wrap article-hero-content">
            <Breadcrumbs items={breadcrumbItems} />
            <div className="article-heading-meta">
              {primaryCategory && (
                <a className="eyebrow article-category" href={`/category/${primaryCategory.slug}`}>
                  {primaryCategory.name}
                </a>
              )}
              <span>Travel guide</span>
              <span className="reading-time-badge">⏱️ {readingTime} min read</span>
            </div>
            <h1 className="article-title">{post.title}</h1>
            {post.excerpt && <p className="article-dek">{post.excerpt}</p>}
            {isGenuinelyReviewed(post.modified, post.date) && (
              <p className="article-date">Updated {formatDate(post.modified || post.date)}</p>
            )}
          </div>
        </section>

        <div className="wrap article-3col-layout">
          <LeftSidebar categories={post.categories} />
          <div className="article-main-column">
            {post.tags.length > 0 && (
              <div className="article-tags" aria-label="Tags for this article">
                {post.tags.map((tag) => (
                  <a key={tag.slug} className="article-tag" href={`/tag/${tag.slug}`}>
                    {tag.name}
                  </a>
                ))}
              </div>
            )}
            <section className="sidebar-section sidebar-klook mobile-klook-widget" aria-label="Klook travel deals">
              <p className="sidebar-kicker">Klook deals</p>
              <KlookSidebarWidget amount="5" />
            </section>
            <article className="article-content" dangerouslySetInnerHTML={{ __html: finalContent }} />
            <AuthorBio />
            <PostFooterNav categories={post.categories} />
          </div>
          <RightSidebar headings={headings} categories={post.categories} />
        </div>
        <KlookAffiliate />
      </main>
      <SiteFooter />
    </div>
  );
}




