import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { RightSidebar } from "@/components/RightSidebar";
import { RelatedGuides } from "@/components/RelatedGuides";
import { KlookAffiliate } from "@/components/KlookAffiliate";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { AuthorBio } from "@/components/AuthorBio";
import { SunsetTimes } from "@/components/SunsetTimes";
import { DinTaiFungQueue } from "@/components/DinTaiFungQueue";
import { NextTrainBoards } from "@/components/NextTrain";
import { DiagramLightbox } from "@/components/DiagramLightbox";
import { WalkRouteMap } from "@/components/WalkRouteMap";
import { getWalk, insertWalkRoute } from "@/lib/walks";
import heroImageSizes from "@/lib/hero-images.json";
import {
  calculateReadingTime,
  enhanceAffiliateLinks,
  enhanceChoiceGuideImages,
  enhanceContentHeadings,
  enhanceContentImages,
  enhanceResponsiveImages,
  enhanceHotelCtaButtons,
  enhanceInlineAffiliateCTAs,
  enhanceLazyKlookWidgets,
  enhancePerfectForSection,
  enhanceProsCons,
  enhanceRecommendedReading,
  enhanceTables,
  enhanceVenueFacts,
  enhanceThreeImageGalleries,
  enhanceYoutubeEmbeds,
  formatDate,
  generateArticleSchema,
  generateBreadcrumbSchema,
  getPost,
  getRelatedPosts,
  hasAffiliateLinks,
  isGenuinelyReviewed,
  fillQueueMarker,
  insertNearbyGuides,
  nonEditorialSlugs,
  posts,
  type ContentPost,
  renderNearbyGuidesSection,
  showsGenericUnit,
} from "@/lib/content";

type PageProperties = { params: Promise<{ slug: string }> };

/**
 * Posts where people are specifically going to watch the sunset, and so want
 * tonight's actual time rather than "around 6pm". Keyed by slug because it's
 * a handful of pages, not a per-post content field worth adding.
 */
const SUNSET_SPOTS: Record<
  string,
  { latitude: number; longitude: number; place: string; advice?: string }
> = {
  "taipei-101": {
    latitude: 25.0339,
    longitude: 121.5645,
    place: "Taipei 101",
    advice:
      "Arrive about an hour before this to get daylight, golden hour and the lit-up city on one ticket. It's the busiest slot of the day, and booking online only skips the ticket queue - you'll still queue for the lift unless you've paid for Fast-Track, so allow at least 30 minutes for that on top.",
  },
  tamsui: {
    latitude: 25.1677,
    longitude: 121.4406,
    place: "the Tamsui waterfront",
    advice:
      "The waterfront and Fisherman's Wharf both face west down the river mouth. Aim to be in place 20 minutes early, and note the last ferries back fill up quickly afterwards.",
  },
};

const legacySlugRedirects: Record<string, string> = {
  "danshui": "best-day-trips-from-taipei",
  "best-taipei-shopping-malls": "best-shopping-malls-in-taipei",
  "best-brunches-in-taipei": "best-brunch-in-taipei",
  "legacy": "legacy-taipei",
  "da-an-forest-park": "daan-forest-park",
  "taipei-botanical-gardens": "taipei-botanical-garden",
  "taipei-events": "taipei-annual-events",
  "thai-elephant-%e8%b1%a1%e5%bb%9a%e6%b3%b0%e5%bc%8f%e6%96%99%e7%90%86": "thai-elephant",
  "thai-elephant-象廚泰式料理": "thai-elephant",
  "home-izakaya-%e9%a5%9e%e9%a3%9f%e5%9d%8a": "home-izakaya",
  "home-izakaya-饞食坊": "home-izakaya",
  // Folded into the Xinbeitou district guide as sections - three ~300-word
  // stubs covering one small area competed with each other rather than
  // ranking. The fragment survives the redirect, so old links land on the
  // right section.
  "beitou-hot-spring-museum": "xinbeitou#hot-spring-museum",
  "thermal-valley": "xinbeitou#thermal-valley",
  // Published as a trip-cost guide, then broadened the same week into a
  // general money guide (cash vs card, ATMs, banks, carrying cash safely),
  // which the old slug only described a third of.
  "taipei-trip-cost": "taipei-money-guide",
  // Syntrend is one of the two buildings in the Technology District, and the
  // two posts overlapped almost entirely (same location, same map). Folded
  // into the district guide as a section rather than kept as a sibling post.
  "syntrend-creative-park": "taipei-technology-district#syntrend",
  // A ~275-word listicle covering four houses that the rewritten buildings
  // guide now covers properly, alongside everything else. The two competed
  // for the same search rather than complementing each other.
  "ancestral-houses-with-charm-in-abundance": "best-buildings-in-taipei#qing",
};

/**
 * Retired in favour of an existing archive that does the same job and stays
 * current on its own.
 */
const retiredToArchive: Record<string, string> = {
  "taipei-suggested-routes": "/category/routes",
};

type HeroImage = { src: string; width?: number; height?: number };

const heroSizes = heroImageSizes as Record<string, { src: string; width: number; height: number }>;

/**
 * The file to show as a full-width hero. posts.json points at WordPress's
 * 1024px copy, which looks soft stretched across a wide screen; where a
 * larger copy of the same photo exists, lib/hero-images.json (built by
 * scripts/generate-hero-images.mjs) names it, with its real size. Anything
 * not in the file keeps its own src and reads its size off the filename.
 */
function heroImageFor(src: string): HeroImage {
  const known = heroSizes[src];
  if (known) return known;
  const sized = /-(\d{2,5})x(\d{2,5})\.\w+$/.exec(src.split("?")[0]);
  return sized ? { src, width: Number(sized[1]), height: Number(sized[2]) } : { src };
}

/** The 2019 Google-Maps-style route screenshots, with lettered A-E pins. */
const LEGACY_ROUTE_IMAGE = /(route|map|zhongzheng-district)[^/]*$/i;

function isWalkPost(post: ContentPost) {
  return /-(walking-route|walk|walking-tour)$/.test(post.slug) || post.content.includes("data-walk-route");
}

/**
 * Walk posts must not lead with the legacy route screenshot: its lettered
 * A-E pins contradict the numbered stops on the live map below. Those posts
 * lead with the first real photo in the post instead (and with no image at
 * all if there isn't one). Walks whose featured image is already a photo
 * keep it.
 */
function heroSourceFor(post: ContentPost): string | null {
  const featured = post.featuredImage || null;
  if (!featured || !isWalkPost(post) || !LEGACY_ROUTE_IMAGE.test(featured)) return featured;
  const photos = [...post.content.matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["']/gi)].map((m) => m[1]);
  return photos.find((src) => !LEGACY_ROUTE_IMAGE.test(src) && !/\.png$/i.test(src)) ?? null;
}

/**
 * The compact booking card readers see on a phone. In the one-column layout
 * the sidebar's "Book in Taipei" card is hidden (it would land at the foot of
 * the page), so the same unit goes into the article itself, where it is seen:
 * straight after the Quick Verdict, or after the first two paragraphs when a
 * post has none. Hidden above 52rem, where the sidebar card shows instead, so
 * the hidden copy never intersects and never loads its iframe (it is marked
 * lazy by enhanceLazyKlookWidgets like every other body widget).
 *
 * This replaces enhanceMobileKlookWidget's "in-post-klook" copy of the same
 * widget (1371607), so there is only ever one per page. data-placement feeds
 * the affiliate_click tracker in app/layout.tsx.
 */
const MOBILE_BOOKING_CARD =
  `<aside class="mobile-booking-card" data-placement="mobile-inline" aria-label="Book in Taipei">` +
  `<p class="booking-card-kicker">Book in Taipei</p>` +
  `<ins class="klk-aff-widget" data-adid="1371607" data-lang="" data-currency="" data-cardh="126" data-padding="92" data-lgh="470" data-edgevalue="655" data-amount="2" data-prod="static_widget"><a href="//www.klook.com/">Klook.com</a></ins>` +
  `<a class="booking-card-link" href="https://www.klook.com/en-GB/search/result/?query=Taipei&amp;aid=8733" target="_blank" rel="sponsored noopener noreferrer">Browse Taipei tours on Klook <span aria-hidden="true">→</span></a>` +
  `</aside>`;

/** Index just after the div that opens at `start`, counting nested divs. */
function endOfDiv(html: string, start: number): number {
  const tag = /<(\/?)div\b[^>]*>/gi;
  tag.lastIndex = start;
  let depth = 0;
  for (let m = tag.exec(html); m; m = tag.exec(html)) {
    depth += m[1] ? -1 : 1;
    if (depth === 0) return m.index + m[0].length;
  }
  return -1;
}

function insertMobileBookingCard(html: string, show: boolean): string {
  if (!show) return html;

  const verdict = html.search(/<div\b[^>]*class=["'][^"']*\bquick-verdict\b/i);
  if (verdict !== -1) {
    const end = endOfDiv(html, verdict);
    if (end !== -1) return html.slice(0, end) + MOBILE_BOOKING_CARD + html.slice(end);
  }

  // After the second paragraph at the top level of the body - not one inside
  // a box, list or figure.
  const blockTag = /<(\/?)(div|figure|ul|ol|table|section|blockquote|aside|details|nav)\b[^>]*>|<\/p>/gi;
  let depth = 0;
  let paragraphs = 0;
  for (let m = blockTag.exec(html); m; m = blockTag.exec(html)) {
    if (m[0].toLowerCase() === "</p>") {
      if (depth === 0 && ++paragraphs === 2) {
        const at = m.index + m[0].length;
        return html.slice(0, at) + MOBILE_BOOKING_CARD + html.slice(at);
      }
    } else {
      depth = Math.max(0, depth + (m[1] ? -1 : 1));
    }
  }
  const firstH2 = html.search(/<h2\b/i);
  return firstH2 === -1 ? html + MOBILE_BOOKING_CARD : html.slice(0, firstH2) + MOBILE_BOOKING_CARD + html.slice(firstH2);
}

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
  return [
    ...posts.map((post) => ({ slug: post.slug })),
    // Retired slugs still need a built route, or the redirect never runs.
    ...Object.keys(legacySlugRedirects).map((slug) => ({ slug })),
    ...Object.keys(retiredToArchive).map((slug) => ({ slug })),
  ];
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

  const archive = retiredToArchive[slug];
  if (archive) permanentRedirect(archive);

  const post = getPost(slug);
  if (!post) notFound();

  const heroImage = heroSourceFor(post);
  const hero = heroImage ? heroImageFor(heroImage) : null;
  const isPage = post.type === "page";
  const rawContent = enhanceThreeImageGalleries(
    enhanceTables(
      enhanceYoutubeEmbeds(
        enhanceRecommendedReading(
          enhanceInlineAffiliateCTAs(
            enhanceVenueFacts(
              enhanceProsCons(
                enhancePerfectForSection(enhanceChoiceGuideImages(withoutDuplicateLeadImage(post.content, heroImage, isPage), post.slug))
              )
            ),
            post.slug
          ),
          post.featuredImage || null
        )
      )
    )
  );

  const sunsetSpot = SUNSET_SPOTS[post.slug];

  const { enhancedContent, headings } = enhanceContentHeadings(rawContent);

  // "Also near this station" sits under the location map, so it has to go
  // into the body HTML rather than render as a sibling - and it must be
  // placed before Recommended Reading is appended, so it lands above it.
  const withNearbyGuides = insertNearbyGuides(enhancedContent, renderNearbyGuidesSection(post));

  // Related guides used to be auto-appended to the body here as a
  // "Recommended reading" box. They now render as the full-width band after
  // the article on every screen size (RelatedGuides), so they aren't
  // repeated. Guides a post already links to by hand are skipped there.
  const related = nonEditorialSlugs.has(post.slug)
    ? []
    : getRelatedPosts(post, 12)
        .filter((candidate) => !post.content.includes(`href="/${candidate.slug}"`))
        .slice(0, 3);
  const showKlookDeals = showsGenericUnit(post.slug, "klookDeals");

  // The auto-appended hotel deals widget (renderHotelDealsWidget, since deleted) used to go
  // here, after Recommended Reading on every eligible post. Klook's own
  // numbers for September 2026: 6,206 impressions, 7 clicks, no bookings - a
  // generic deals box at the very bottom of the page, where nobody is choosing
  // a hotel. Product widgets placed where the reader is deciding convert
  // instead (the zoo ticket widget: 8 clicks, 7 bookings), so the space is
  // left to those.
  // Tag monetised outbound links last, so inline CTAs are covered as well as
  // links written into the post body.
  // Walk posts carry a marker where the route map goes; it is filled last so
  // none of the table/link enhancers above restyle the walk block.
  // The hotel "Check prices" buttons go in before enhanceAffiliateLinks, so
  // they get the same rel/target treatment as every other affiliate link, and
  // the Klook widgets are marked lazy last, once every widget is in place.
  const walk = getWalk(post.slug);
  const finalContent = insertWalkRoute(fillQueueMarker(enhanceResponsiveImages(enhanceContentImages(enhanceLazyKlookWidgets(enhanceAffiliateLinks(enhanceHotelCtaButtons(insertMobileBookingCard(
    withNearbyGuides,
    showKlookDeals
  ))))))), walk);

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
        <section className={`article-hero${hero ? " article-hero-with-image" : ""}`}>
          {hero && (
            <img
              className="article-hero-image"
              src={hero.src}
              alt={post.title}
              width={hero.width}
              height={hero.height}
              fetchPriority="high"
              decoding="async"
            />
          )}
          {hero && <div className="article-hero-scrim" />}
          <div className="wrap article-hero-content">
            <Breadcrumbs items={breadcrumbItems} />
            <div className="article-heading-meta">
              {primaryCategory && (
                <a className="eyebrow article-category" href={`/category/${primaryCategory.slug}`}>
                  {primaryCategory.name}
                </a>
              )}
              <span>Travel guide</span>
              <span className="reading-time-badge">{readingTime} min read</span>
            </div>
            <h1 className="article-title">{post.title}</h1>
            {post.excerpt && <p className="article-dek">{post.excerpt}</p>}
            {isGenuinelyReviewed(post.modified, post.date) && (
              <p className="article-date">Updated {formatDate(post.modified || post.date)}</p>
            )}
          </div>
        </section>

        <div className="wrap article-grid">
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
            {hasAffiliateLinks(finalContent) && <AffiliateDisclosure />}
            {sunsetSpot && (
              <SunsetTimes
                latitude={sunsetSpot.latitude}
                longitude={sunsetSpot.longitude}
                place={sunsetSpot.place}
                advice={sunsetSpot.advice}
              />
            )}
            <article className="article-content" dangerouslySetInnerHTML={{ __html: finalContent }} />
            {/* These two portal into markers inside the body above, so they
                must be rendered after it - see NextTrain.tsx and
                DinTaiFungQueue.tsx. */}
            {finalContent.includes("data-dtf-queue") && <DinTaiFungQueue />}
            {finalContent.includes("data-next-train") && <NextTrainBoards />}
            {finalContent.includes("article-diagram") && <DiagramLightbox />}
            {walk && finalContent.includes("data-walk-map") && <WalkRouteMap walk={walk} />}
            <AuthorBio />
          </div>
          <RightSidebar
            headings={headings}
            showKlookDeals={showKlookDeals}
            showWise={showsGenericUnit(post.slug, "wise")}
          />
        </div>
        <RelatedGuides related={related} />
        <KlookAffiliate />
      </main>
      <SiteFooter />
    </div>
  );
}




