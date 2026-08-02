import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { ArticleSidebar } from "@/components/ArticleSidebar";
import { KlookAffiliate } from "@/components/KlookAffiliate";
import { enhanceChoiceGuideImages, enhanceRecommendedReading, enhanceYoutubeEmbeds, formatDate, getPost, posts } from "@/lib/content";

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

function withoutDuplicateLeadImage(content: string, image: string | null) {
  if (!image) return content;

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

  return {
    title: post.title,
    description: post.excerpt || `A Taipei Travel Geek guide to ${post.title}.`,
  };
}

export default async function ArticlePage({ params }: PageProperties) {
  const { slug } = await params;
  const replacement = legacySlugRedirects[slug];
  if (replacement) permanentRedirect(`/${replacement}`);

  const post = getPost(slug);
  if (!post) notFound();
  const heroImage = post.type === "post" ? post.featuredImage : null;
  const articleContent = enhanceYoutubeEmbeds(enhanceRecommendedReading(enhanceChoiceGuideImages(withoutDuplicateLeadImage(post.content, heroImage), post.slug), heroImage));

  return (
    <div className="article-shell">
      <SiteHeader />

      <main>
        <section className={`article-hero${heroImage ? " article-hero-with-image" : ""}`}>
          {heroImage && <img className="article-hero-image" src={heroImage} alt="" />}
          {heroImage && <div className="article-hero-scrim" />}
          <div className="wrap article-hero-content">
            <div className="article-heading-meta">
              {post.categories[0] && <a className="eyebrow article-category" href={`/category/${post.categories[0].slug}`}>{post.categories[0].name}</a>}
              <span>Travel guide</span>
            </div>
            <h1 className="article-title">{post.title}</h1>
            {post.excerpt && <p className="article-dek">{post.excerpt}</p>}
            <p className="article-date">Updated {formatDate(post.modified || post.date)}</p>
          </div>
        </section>

        <div className="wrap article-layout">
          <article className="article-content" dangerouslySetInnerHTML={{ __html: articleContent }} />
          <ArticleSidebar categories={post.categories} />
        </div>
        <KlookAffiliate />
      </main>
      <SiteFooter />
    </div>
  );
}
