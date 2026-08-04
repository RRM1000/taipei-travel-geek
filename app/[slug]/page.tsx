import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { LeftSidebar } from "@/components/LeftSidebar";
import { RightSidebar } from "@/components/RightSidebar";
import { KlookAffiliate } from "@/components/KlookAffiliate";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AuthorBio } from "@/components/AuthorBio";
import { PostFooterNav } from "@/components/PostFooterNav";
import {
  calculateReadingTime,
  enhanceChoiceGuideImages,
  enhanceContentHeadings,
  enhanceRecommendedReading,
  enhanceTables,
  enhanceThreeImageGalleries,
  enhanceYoutubeEmbeds,
  formatDate,
  generateArticleSchema,
  generateBreadcrumbSchema,
  getPost,
  posts,
} from "@/lib/content";

type PageProperties = { params: Promise<{ slug: string }> };

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
  const leadFigure = new RegExp(`<figure\\b[^>]*>[\\s\\S]*?<img\\b[^>]*src=["']${escapedImage}["'][^>]*>[\\s\\S]*?<\\/figure>`, "i");
  return content.replace(leadFigure, "");
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
  const rawContent = enhanceThreeImageGalleries(
    enhanceTables(
      enhanceYoutubeEmbeds(
        enhanceRecommendedReading(
          enhanceChoiceGuideImages(withoutDuplicateLeadImage(post.content, heroImage, isPage), post.slug),
          heroImage
        )
      )
    )
  );

  const { enhancedContent, headings } = enhanceContentHeadings(rawContent);

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
            <p className="article-date">Updated {formatDate(post.modified || post.date)}</p>
          </div>
        </section>

        <div className="wrap article-3col-layout">
          <LeftSidebar categories={post.categories} />
          <div className="article-main-column">
            <article className="article-content" dangerouslySetInnerHTML={{ __html: enhancedContent }} />
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




