import importedPosts from "@/content/posts.json";
import importedCategories from "@/content/categories.json";

export type TaxonomyTerm = { name: string; slug: string };

export type ContentPost = {
  id: number;
  authorId: number;
  date: string;
  modified: string;
  slug: string;
  title: string;
  excerpt: string;
  type: "post" | "page";
  parentId: number;
  content: string;
  featuredImage?: string | null;
  categories: TaxonomyTerm[];
  tags: TaxonomyTerm[];
};

export const posts = [...(importedPosts as ContentPost[])].sort((a, b) => b.date.localeCompare(a.date));
export const categories = importedCategories as TaxonomyTerm[];
export const tags = Array.from(
  new Map(posts.flatMap((post) => post.tags).map((tag) => [tag.slug, tag])).values(),
);

export function getPost(slug: string) {
  const decodedSlug = decodeURIComponent(slug);
  return posts.find((post) => {
    if (post.slug === slug || post.slug === decodedSlug) return true;
    try {
      return decodeURIComponent(post.slug) === decodedSlug;
    } catch {
      return false;
    }
  });
}

export function getTag(slug: string) {
  return tags.find((tag) => tag.slug === slug);
}

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function plainText(value: string) {
  return value.replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").trim();
}

/**
 * Builds a lazy-loaded <img> for generated markup, carrying intrinsic
 * dimensions wherever they can be recovered.
 *
 * These matter for more than layout shift. Because the images are lazy, one
 * with no dimensions reserves 0px until it loads. A smooth-scrolled jump from
 * the contents list animates *through* those placeholders, they expand
 * mid-flight, and every heading below shifts down - which is why the first
 * jump on a freshly loaded page used to land short while later ones were fine.
 *
 * The media library follows WordPress's "-WIDTHxHEIGHT" filename convention,
 * so most numbers can be read straight off the src. The originals that predate
 * that convention are listed in IMAGE_SIZES below, measured off the files in
 * public/. Only images used as a featuredImage need to be there; anything
 * unlisted falls back to rendering without dimensions, as before.
 */
const IMAGE_SIZES: Record<string, [number, number]> = {
  "/images/taipei-skyline.webp": [2400, 1414],
  "/media/2019/04/Taipei101.jpg": [1600, 1085],
  "/media/2019/04/easy-card.jpg": [410, 307],
  "/media/2019/05/Profile.jpg": [2417, 2351],
  "/media/2019/05/Taipei-Map.jpg": [817, 587],
  "/media/2019/05/Traditional-Theatre-Centre-3.jpg": [973, 647],
  "/media/2019/05/Yong-He-Soy-Milk-King-1-e1557286055443.jpg": [1600, 1200],
  "/media/2019/12/taiwan-fun-pass.jpg": [800, 502],
  "/media/2019/12/taiwan-tax-refund.png": [776, 494],
  "/media/2020/02/Golden-Horse-Film-Festival.png": [750, 400],
  "/media/2022/12/Raohe-Night-Market-6-edited.jpg": [1608, 1071],
  "/media/2023/02/Xinyi-Shopping-District-2-edited.jpg": [1920, 1279],
  "/media/2023/04/Lin-Family-Mansion-9-edited-scaled.jpg": [1600, 1067],
  "/media/2023/04/tourist_shuttle_bus.jpg": [871, 554],
  "/media/2026/08/dihua/20200116_152209.webp": [1600, 1200],
  "/media/2026/08/sinchao-rice-shoppe-pork-belly-cucumber.jpg": [1024, 662],
  "/media/2026/08/taipei-cherry-blossoms.webp": [860, 571],
  "/media/2026/08/taipei-districts-view-hero.webp": [1024, 636],
  "/media/2026/08/taipei-fireworks.jpg": [683, 911],
  "/media/2026/08/taiwan-lucky-land-banner.png": [514, 234],
};

function imgTag(src: string | undefined, alt: string) {
  if (!src) return "";
  const path = src.split("?")[0];
  const dims = /-(\d{2,5})x(\d{2,5})\.(?:jpe?g|png|webp|gif)$/i.exec(path);
  const known = IMAGE_SIZES[path];
  const sizeAttrs = dims
    ? ` width="${dims[1]}" height="${dims[2]}"`
    : known
      ? ` width="${known[0]}" height="${known[1]}"`
      : "";
  return `<img src="${escapeHtml(src)}"${sizeAttrs} alt="${escapeHtml(alt)}" loading="lazy"/>`;
}

export function enhanceRecommendedReading(content: string, fallbackImage?: string | null) {
  const sectionPattern = /<h([1-6])\b[^>]*>\s*(?:<[^>]+>\s*)*Recommended Reading:\s*(?:<\/[^>]+>\s*)*<\/h\1>((?:\s*<h[4-6]\b[^>]*>[\s\S]*?<\/h[4-6]>)+)/gi;

  return content.replace(sectionPattern, (fullMatch, level: string, items: string) => {
    const links = [...items.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)];
    if (!links.length) return fullMatch;

    const cards = links.map((link) => {
      const href = link[1];
      const slug = href.replace(/^\/+|\/+$/g, "").split("#")[0];
      const related = slug ? getPost(slug) : undefined;
      const title = related?.title || plainText(link[2]);
      const image = related?.featuredImage || fallbackImage;
      const imageMarkup = image
        ? imgTag(image, title)
        : `<span class="recommended-card-placeholder" aria-hidden="true"></span>`;

      return `<a class="recommended-card" href="${escapeHtml(href)}">${imageMarkup}<span class="recommended-card-body"><span class="recommended-card-label">Recommended guide</span><strong>${escapeHtml(title)}</strong><span class="recommended-card-arrow" aria-hidden="true">→</span></span></a>`;
    }).join("");

    return `<section class="recommended-reading"><div class="recommended-reading-heading"><span>Keep exploring</span><h${level}>Recommended reading</h${level}></div><div class="recommended-reading-grid">${cards}</div></section>`;
  });
}

export function enhanceYoutubeEmbeds(content: string) {
  const youtubeEmbed = /<figure\b[^>]*class=["'][^"']*wp-block-embed-youtube[^"']*["'][^>]*>[\s\S]*?https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})[^\s<]*[\s\S]*?<\/figure>/gi;

  return content.replace(youtubeEmbed, (_match, videoId: string) => (
    `<figure class="article-video"><div class="article-video-frame"><iframe src="https://www.youtube-nocookie.com/embed/${videoId}" title="Taiwan tourist tax refund guide" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div></figure>`
  ));
}

function relatedGuideForSection(section: string, sourceSlug: string) {
  const links = [...section.matchAll(/href=["']\/([^\/#"']+?)\/?["']/gi)];
  for (const link of links) {
    const related = getPost(link[1]);
    if (related && related.slug !== sourceSlug && related.featuredImage) return related;
  }
  return undefined;
}

// How many *distinct* related posts a section links to. relatedGuideForSection
// only ever returns the first one - fine for a section about one specific
// place, arbitrary and misleading for a section that's really a grab-bag
// covering several (e.g. "Traveller Tips" mentioning three unrelated
// posts in passing). 3+ is the signal used below to skip those.
function distinctRelatedGuideCount(section: string, sourceSlug: string) {
  const links = [...section.matchAll(/href=["']\/([^\/#"']+?)\/?["']/gi)];
  const found = new Set<string>();
  for (const link of links) {
    const related = getPost(link[1]);
    if (related && related.slug !== sourceSlug && related.featuredImage) found.add(related.slug);
  }
  return found.size;
}

// Generic, catch-all heading names used across many posts for exactly the
// kind of multi-topic wrap-up section where picking "the first link
// mentioned" as the illustrative photo reads as arbitrary rather than
// representative (e.g. Taipei 101's "Traveller Tips" surfacing a photo from
// its unrelated NYE fireworks post, ahead of anything about Taipei 101).
//
// Since the feature became opt-in (see CHOICE_GUIDE_SLUGS) this only applies
// to those few posts, but it still earns its place there - they all carry
// planning and wrap-up sections of exactly this kind.
const GENERIC_SECTION_HEADINGS = new Set([
  "traveller tips", "tips", "best deals", "deals", "general tips", "price", "prices",
  "location", "locations", "places of interest", "faq", "overview", "general information",
  "useful information", "useful tips", "how to get there",
  // Trip-planning framing sections rather than a profile of one place: these
  // mention several posts in passing while being about the decision itself.
  "how many days do you need?", "how many days do you need", "how long to stay",
  "when to go and how long to spend", "when to go", "how long to spend",
  "best time to visit", "getting there", "getting around",
  // Leftovers sections at the end of a round-up: a bullet list of odds and ends
  // that happens to link one post, so the photo picked is whatever that post
  // uses - e.g. Ximending's "Also Worth a Look" pulling a Xinyi photo in via a
  // passing nightlife link.
  "also worth a look", "also worth a mention", "honourable mentions",
  // Closing advice sections. These link out to whichever practical guide is
  // relevant to one bullet, so the photo chosen illustrates that guide rather
  // than this post - e.g. Yongkang Street's tips pulling in a banknote photo
  // via a passing link to the money guide.
  "practical tips", "practical information", "good to know", "before you go",
]);

// Opt-in, not opt-out. This used to run on every post with a blacklist of
// slugs and headings to hold it back, which meant a wrong photo could appear
// on any of ~300 posts and stay there until somebody happened to notice. The
// blacklist reached 33 headings and was still growing.
//
// An audit found the value was concentrated in a handful of posts anyway: of
// 44 injected images across 15 posts, the four below accounted for 28, while
// ten posts got only one or two - each an unreviewed guess. So the feature now
// runs only where it has been checked and is wanted. Adding a post here is a
// deliberate act; everywhere else, images are hand-placed.
const CHOICE_GUIDE_SLUGS = new Set([
  "taipei-itinerary-3-5-days",
  "taipei-guide",
  "best-districts-and-areas",
  "best-time-to-visit-taipei",
]);

export function enhanceChoiceGuideImages(content: string, sourceSlug: string) {
  if (!CHOICE_GUIDE_SLUGS.has(sourceSlug)) return content;
  // h2/h3 only: these are genuine "which option" comparison sections (e.g. a
  // district or hotel pick). Small h4/h5 utility subheadings like "Best Time
  // to Visit:" also end in a "read more" link back to the linked post, which
  // used to make this match them too and insert a redundant image between a
  // one-line heading and its one-line answer.
  const sectionPattern = /(<h([23])\b[^>]*>[\s\S]*?<\/h\2>)([\s\S]*?)(?=<h[2-5]\b|$)/gi;
  const sections = [...content.matchAll(sectionPattern)];
  const linkedChoices = sections.filter((section) => relatedGuideForSection(section[3], sourceSlug));

  if (linkedChoices.length < 2) return content;

  // A single "card" (e.g. a district writeup) commonly has its own <h3>
  // sub-heading further down (e.g. "Best For") that ends in the same
  // "read more" link back to the related post, purely because the lookahead
  // above stops at the next h2-h5. That subheading has no image of its own,
  // so without deduping it would independently qualify and get a second,
  // redundant image inserted right under it. Only insert once per related
  // post per document - mark a slug "covered" as soon as ANY section
  // resolves to it, whether that section already had its own hand-placed
  // image (the common case) or we're about to insert one for it, not only
  // when this function is the one adding the image.
  const alreadyCovered = new Set<string>();

  return content.replace(sectionPattern, (match, heading: string, _level: string, section: string) => {
    const related = relatedGuideForSection(section, sourceSlug);
    if (!related || alreadyCovered.has(related.slug)) return match;

    const sectionAlreadyHasImage = /choice-guide-image|<figure\b|<img\b/i.test(section);
    alreadyCovered.add(related.slug);
    if (sectionAlreadyHasImage) return match;

    // Skip sections that are really a grab-bag rather than a profile of one
    // specific place: a generic heading name, or 3+ distinct related posts
    // mentioned in passing. relatedGuideForSection would still arbitrarily
    // pick "the first one" as the illustrative photo, which reads as
    // unrelated/wrong rather than representative in these cases.
    const headingText = heading.replace(/<[^>]+>/g, "").trim().toLowerCase();
    if (GENERIC_SECTION_HEADINGS.has(headingText) || distinctRelatedGuideCount(section, sourceSlug) >= 3) {
      return match;
    }

    // Deliberately not wrapped in a link to the related post - the section
    // text right below always already contains that link (it's the trigger
    // condition above), so a second link on the photo would just be a
    // redundant, visually unmarked click target.
    //
    // Dimensions matter here, not just for CLS: these are lazy-loaded, so
    // without them each one reserves 0px until it loads. A smooth-scrolled
    // jump from the contents list animates *through* them, they expand
    // mid-flight, and every heading below shifts down - so the first jump on
    // a fresh page lands short while later ones are fine.
    const image = `<figure class="choice-guide-image">${imgTag(related.featuredImage, "")}</figure>`;
    return `${heading}${image}${section}`;
  });
}

/**
 * Utility/meta entries that aren't editorial guides, so they should never be
 * suggested as "related reading" nor receive an auto-generated block
 * themselves. Deliberately NOT the same thing as `type === "page"` -
 * several cornerstone guides (taiwan-easycard, taipei-public-transport,
 * mrt, etc.) are typed "page" in this content set but are genuine articles
 * that should both appear in and receive related-post suggestions.
 */
export const nonEditorialSlugs = new Set([
  "about-taipei-traveller",
  "privacy-policy",
  "information",
  "maps",
  "taipei-guide",
  "25-2",
  "taiwan-lucky-land-giveaway",
]);

/**
 * Editorial posts that are known to be significantly out of date and are
 * pending a content refresh. Unlike `nonEditorialSlugs`, these ARE real
 * guides - just temporarily hidden from every on-site discovery path
 * (category/tag archives, search, related-post suggestions, the sitemap)
 * until updated, without touching the page itself. It stays live at its own
 * URL for anyone with a direct link.
 */
export const unlistedSlugs = new Set<string>([]);

/**
 * Replicates the old WordPress "related posts" widget: scores every other
 * post by shared categories (weighted higher) and shared tags, and returns
 * the top matches. Used to auto-append a Recommended Reading block to any
 * post that doesn't already have a hand-authored one, so editors never have
 * to manually curate links for this to work.
 */
export function getRelatedPosts(post: ContentPost, limit = 3): ContentPost[] {
  const scored = posts
    .filter((candidate) => candidate.slug !== post.slug && !nonEditorialSlugs.has(candidate.slug) && !unlistedSlugs.has(candidate.slug))
    .map((candidate) => {
      const sharedCategories = candidate.categories.filter((c) =>
        post.categories.some((pc) => pc.slug === c.slug),
      ).length;
      const sharedTags = candidate.tags.filter((t) =>
        post.tags.some((pt) => pt.slug === t.slug),
      ).length;
      return { candidate, score: sharedCategories * 3 + sharedTags };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || +new Date(b.candidate.date) - +new Date(a.candidate.date));

  return scored.slice(0, limit).map((entry) => entry.candidate);
}

/** Checks whether a post already has a hand-authored "Recommended Reading:" block. */
export function hasManualRecommendedReading(content: string): boolean {
  return /<h[1-6]\b[^>]*>\s*(?:<[^>]+>\s*)*Recommended Reading:?\s*(?:<\/[^>]+>\s*)*<\/h[1-6]>/i.test(content);
}

/** Renders the same card-grid markup as enhanceRecommendedReading, for a computed list of posts. */
export function renderRecommendedReadingSection(related: ContentPost[], heading = "Recommended reading") {
  if (!related.length) return "";

  const cards = related.map((related_) => {
    const imageMarkup = related_.featuredImage
      ? imgTag(related_.featuredImage, related_.title)
      : `<span class="recommended-card-placeholder" aria-hidden="true"></span>`;

    return `<a class="recommended-card" href="/${escapeHtml(related_.slug)}">${imageMarkup}<span class="recommended-card-body"><span class="recommended-card-label">Recommended guide</span><strong>${escapeHtml(related_.title)}</strong><span class="recommended-card-arrow" aria-hidden="true">→</span></span></a>`;
  }).join("");

  return `<section class="recommended-reading"><div class="recommended-reading-heading"><span>Keep exploring</span><h2>${escapeHtml(heading)}</h2></div><div class="recommended-reading-grid">${cards}</div></section>`;
}

/**
 * Slugs that shouldn't get the end-of-post hotel deals widget: the same
 * non-editorial utility pages excluded from Recommended Reading.
 *
 * best-areas-and-hotels-to-stay used to be excluded here because it carried a
 * hand-placed widget near the top of the article. Those hand-placed widgets
 * have been removed - they interrupted the read, and two posts ended up
 * showing the widget twice - so every eligible post now gets exactly one, at
 * the end.
 */
const hotelWidgetExcludedSlugs = new Set([...nonEditorialSlugs]);

export function shouldShowHotelDealsWidget(post: ContentPost): boolean {
  return !hotelWidgetExcludedSlugs.has(post.slug);
}

/** Auto-appended at the end of every eligible post, right after Recommended Reading. */
export function renderHotelDealsWidget(): string {
  return `<section class="end-of-post-hotel-deals"><div class="recommended-reading-heading"><span>Ready to book?</span><h2>Great Taipei hotel deals right now</h2></div><div class="hotel-deals-widget"><ins class="klk-aff-widget" data-aid="8733" data-city_id="19" data-country_id="1014" data-tag_id="0" data-currency="" data-lang="" data-label1="" data-label2="" data-label3="" data-prod="deals_widget" data-total="2"><a href="//www.klook.com/">Klook.com</a></ins></div></section>`;
}

/**
 * Ranking for category and tag archives.
 *
 * These pages used to inherit the global sort, which is purely newest-published
 * first. That buried the substantial guides behind whichever 200-word venue
 * write-up happened to be posted most recently.
 *
 * The weights below are deliberately uneven, and one signal is deliberately
 * weak: `modified` is a poor freshness measure on this site, because 129 of the
 * 264 listable posts carry an August 2026 date from site-wide maintenance
 * passes (mojibake repairs, image dimensions, link rewrites) rather than from
 * anyone reviewing the content. Leaning on it would rank posts by "was this
 * touched by a script", so it only breaks ties.
 *
 * Substance leads instead, capped at 1,500 words - roughly the 90th percentile,
 * so a 4,000-word outlier gets no more credit than a thorough 1,500-word guide.
 */
// Editorial outweighs raw length deliberately. Word count is a proxy for
// substance and a poor one at the margin - a long mediocre round-up would beat
// a sharp 400-word venue review - whereas the Essential and Top Pick tags are
// hand-applied quality judgements. So substance dropped from 0.40 to 0.30 and
// editorial rose from 0.15 to 0.25.
const RANK_WEIGHTS = { substance: 0.3, published: 0.3, editorial: 0.25, updated: 0.15 };
const SUBSTANCE_CAP = 1500;
const PUBLISHED_HALF_LIFE_DAYS = 365 * 3;
const UPDATED_HALF_LIFE_DAYS = 365 * 2;

const wordCounts = new Map<string, number>(
  posts.map((post) => [post.slug, post.content.replace(/<[^>]*>/g, " ").split(/\s+/).filter(Boolean).length]),
);

function ageInDays(value: string | undefined, now: number) {
  if (!value) return Number.POSITIVE_INFINITY;
  const parsed = new Date(`${value.replace(" ", "T")}Z`).getTime();
  if (Number.isNaN(parsed)) return Number.POSITIVE_INFINITY;
  return Math.max(0, (now - parsed) / 86_400_000);
}

const decay = (days: number, halfLife: number) => (Number.isFinite(days) ? 2 ** (-days / halfLife) : 0);

/**
 * Posts that should sit near the back of every archive on editorial grounds,
 * regardless of how they score. Kept as an explicit list rather than by
 * backdating `modified`, because that field is shown to readers as the
 * "Updated" date and is only worth 0.15 of the score anyway - it could never
 * push something reliably to the back, and it would lie to the reader to try.
 */
const DEMOTED_SLUGS = new Set<string>([
  "tgi-fridays",
]);

/**
 * Posts that are only useful in certain months, keyed to the months (1-12)
 * they belong in. Out of season they sink; in season they surface again, which
 * is the part a permanent demotion could never do - nobody wants the Christmas
 * lights guide buried in December.
 */
const SEASONAL_MONTHS: Record<string, number[]> = {
  "christmas-lights-2019": [11, 12, 1],
  "christmas-dinners": [11, 12],
  "taipei-101-fireworks-new-years-eve": [12, 1],
};

const DEMOTION_FACTOR = 0.15;
const OUT_OF_SEASON_FACTOR = 0.3;
const IN_SEASON_BOOST = 1.25;

function editorialFactor(slug: string, month: number) {
  if (DEMOTED_SLUGS.has(slug)) return DEMOTION_FACTOR;
  const months = SEASONAL_MONTHS[slug];
  if (!months) return 1;
  return months.includes(month) ? IN_SEASON_BOOST : OUT_OF_SEASON_FACTOR;
}

function archiveScore(post: ContentPost, now: number) {
  const substance = Math.min(wordCounts.get(post.slug) ?? 0, SUBSTANCE_CAP) / SUBSTANCE_CAP;
  const published = decay(ageInDays(post.date, now), PUBLISHED_HALF_LIFE_DAYS);
  const updated = decay(ageInDays(post.modified || post.date, now), UPDATED_HALF_LIFE_DAYS);
  // Clamped to 1 so the editorial component never spends more than its 0.15
  // share of the score, however many of these a post carries. "lists" is the
  // smallest of the three: a round-up answers a broader question than a single
  // venue, so it earns a nudge rather than a promotion.
  const tagSlugs = new Set(post.tags.map((t) => t.slug));
  const editorial = Math.min(
    1,
    (tagSlugs.has("essential") ? 0.6 : 0) +
      (tagSlugs.has("top-pick") ? 0.4 : 0) +
      (tagSlugs.has("lists") ? 0.25 : 0),
  );

  const base =
    RANK_WEIGHTS.substance * substance +
    RANK_WEIGHTS.published * published +
    RANK_WEIGHTS.editorial * editorial +
    RANK_WEIGHTS.updated * updated;

  return base * editorialFactor(post.slug, new Date(now).getUTCMonth() + 1);
}

function byArchiveRank(a: ContentPost, b: ContentPost) {
  const now = Date.now();
  const diff = archiveScore(b, now) - archiveScore(a, now);
  // Stable, explicable fallback so equal scores never order arbitrarily.
  return diff !== 0 ? diff : b.date.localeCompare(a.date);
}

/**
 * Posts per page on category and tag archives.
 *
 * Twelve rather than ten because the grid is three columns on desktop, and ten
 * leaves the last row as 3+3+3+1. Twelve divides cleanly by three, by two at
 * the 1100px breakpoint, and by one on a phone.
 *
 * This lives here because it was previously declared in three places -
 * CategoryArchive, the Lists pagination route, and the tag pagination route,
 * the last two hardcoding the number inline. generateStaticParams and the
 * render path both derive page counts from it, so any disagreement produced
 * paginated URLs that either 404 or render empty.
 */
export const ARCHIVE_PAGE_SIZE = 12;

export function getPostsByCategory(category: string) {
  return posts
    .filter((post) => isListable(post) && post.categories.some((item) => item.slug === category))
    .sort(byArchiveRank);
}

export function getPostsByTag(tag: string) {
  const matches = posts
    .filter((post) => isListable(post) && post.tags.some((item) => item.slug === tag))
    .sort(byArchiveRank);
  // Top Picks combines the broader top-pick pool with the smaller, more curated
  // Essential pool - Essential posts are weighted to the front so the list leads
  // with the must-see guides rather than burying them among the wider picks.
  if (tag === "top-pick") {
    return [...matches].sort((a, b) => {
      const aWeight = a.tags.some((item) => item.slug === "essential") ? 0 : 1;
      const bWeight = b.tags.some((item) => item.slug === "essential") ? 0 : 1;
      return aWeight - bWeight;
    });
  }
  return matches;
}

/** A post is browsable if it isn't unlisted and isn't a closed venue. */
function isListable(post: ContentPost) {
  return !unlistedSlugs.has(post.slug) && !post.content.includes("closure-notice");
}

/**
 * Tags with the number of browsable posts behind each, for the sidebar index.
 *
 * Tags had no browsing surface at all before this - no index page, and no way
 * to find one except spotting a chip at the foot of a post. Categories already
 * have the navbar and the Explore section, so this covers the other axis:
 * categories say what kind of place something is, tags say what it's like.
 *
 * minPosts exists because a tag with one or two posts is a dead end once
 * clicked. At 3 it drops a dozen one-offs (Moroccan, Teppanyaki, LGBT and so
 * on) that are still perfectly valid tags on the posts themselves.
 */
export function getTagsWithCounts(minPosts = 3) {
  const counts = new Map<string, { term: TaxonomyTerm; count: number }>();
  for (const post of posts) {
    if (!isListable(post)) continue;
    for (const term of post.tags) {
      const entry = counts.get(term.slug);
      if (entry) entry.count += 1;
      else counts.set(term.slug, { term, count: 1 });
    }
  }
  return [...counts.values()]
    .filter((entry) => entry.count >= minPosts)
    .sort((a, b) => a.term.name.localeCompare(b.term.name));
}

/**
 * Categories with browsable post counts, biggest first. Generated rather than
 * hand-listed so a new category can't quietly go missing from the sidebar the
 * way Restaurants (62 posts) and Buildings (33) previously did.
 */
export function getCategoriesWithCounts(minPosts = 1) {
  const counts = new Map<string, { term: TaxonomyTerm; count: number }>();
  for (const post of posts) {
    if (!isListable(post)) continue;
    for (const term of post.categories) {
      const entry = counts.get(term.slug);
      if (entry) entry.count += 1;
      else counts.set(term.slug, { term, count: 1 });
    }
  }
  return [...counts.values()]
    .filter((entry) => entry.count >= minPosts)
    .sort((a, b) => b.count - a.count || a.term.name.localeCompare(b.term.name));
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(`${date.replace(" ", "T")}Z`),
  );
}

// Every post carried over from the WordPress migration has a `modified` date no
// later than this. Anything modified after it reflects a genuine,
// post-migration content review - not just a leftover import timestamp. Used to
// decide whether the "Updated" date is honest to show a reader.
const CONTENT_REVIEW_CUTOFF = new Date("2023-05-01T00:00:00Z");

export function isGenuinelyReviewed(modified: string | undefined, date?: string) {
  const target = modified || date;
  if (!target) return false;
  const parsed = new Date(`${target.replace(" ", "T")}Z`);
  return !Number.isNaN(parsed.getTime()) && parsed >= CONTENT_REVIEW_CUTOFF;
}

/**
 * What to print on a card or byline.
 *
 * A 2019 publish date on a guide that was rewritten last week reads as
 * abandoned, which costs clicks on travel content. But silently swapping in
 * `modified` would be worse: for most of the library that field is a WordPress
 * import timestamp, not a review. So show "Updated <date>" only where the
 * modification post-dates the migration, and otherwise fall back to the
 * publication date.
 */
export function displayDate(post: Pick<ContentPost, "date" | "modified">) {
  return isGenuinelyReviewed(post.modified, post.date)
    ? { label: "Updated", date: formatDate(post.modified || post.date) }
    : { label: "", date: formatDate(post.date) };
}

export type HeadingItem = {
  id: string;
  text: string;
  level: number;
};

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#039;/gi, "'")
    .replace(/&nbsp;/gi, " ");
}

export function enhanceContentHeadings(content: string): {
  enhancedContent: string;
  headings: HeadingItem[];
} {
  const cleanContent = content.replace(/<details\b[^>]*class=["'][^"']*article-toc-block[^"']*["'][^>]*>[\s\S]*?<\/details>/gi, "");

  const headings: HeadingItem[] = [];
  let index = 0;

  // Guards against two headings landing on the same id - either because the
  // WordPress export carried a duplicate id over (leftover TinyMCE ids like
  // mce_0 were only ever unique within one editing session, not across a
  // whole document), or because two headings share the same plain text (a
  // "Best For" or "Website" sub-heading repeated once per venue in a
  // round-up post, each auto-slugified to the same fallback id). Either way
  // React's sidebar TOC list breaks on the resulting duplicate key, so every
  // id assigned here - explicit or generated - is forced unique by suffixing
  // -2, -3, etc. on a repeat.
  const seenIds = new Set<string>();
  const dedupeId = (candidate: string): string => {
    if (!seenIds.has(candidate)) {
      seenIds.add(candidate);
      return candidate;
    }
    let n = 2;
    while (seenIds.has(`${candidate}-${n}`)) n++;
    const unique = `${candidate}-${n}`;
    seenIds.add(unique);
    return unique;
  };

  const enhancedContent = cleanContent.replace(/<h([23])\b([^>]*)>([\s\S]*?)<\/h\1>/gi, (match, levelStr, attrs, innerHtml) => {
    const level = parseInt(levelStr, 10);
    const plainText = decodeHtmlEntities(innerHtml.replace(/<[^>]*>/g, "").trim());
    if (!plainText) return match;

    const idMatch = attrs.match(/id=["']([^"']+)["']/i);
    let id = idMatch ? idMatch[1] : "";

    if (!id) {
      id = plainText
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      if (!id) id = `section-${++index}`;
      id = dedupeId(id);
      attrs = `${attrs} id="${id}"`;
    } else {
      const deduped = dedupeId(id);
      if (deduped !== id) {
        attrs = attrs.replace(/id=["'][^"']+["']/i, `id="${deduped}"`);
        id = deduped;
      }
    }

    headings.push({ level, id, text: plainText });
    return `<h${level}${attrs}>${innerHtml}</h${level}>`;
  });

  return { enhancedContent, headings };
}

export function enhanceTables(content: string): string {
  return content.replace(/<table\b([\s\S]*?)<\/table>/gi, (match) => {
    return `<div class="table-responsive">${match}</div>`;
  });
}

/**
 * Turn a "Perfect For" heading + plain bullet list into a row of tag pills.
 *
 * The old WordPress markup was inconsistent (some posts used <h2>, some <h4>)
 * and rendered as a bare bulleted list. Running this before
 * enhanceContentHeadings also means it stops showing up as a spurious entry
 * in the table-of-contents sidebar on the posts that used <h2>.
 */
export function enhancePerfectForSection(content: string): string {
  return content.replace(
    /<h[234]\b[^>]*>\s*Perfect For\s*<\/h[234]>\s*<ul>([\s\S]*?)<\/ul>(?:\s*<div[^>]*class="wp-block-spacer"[^>]*>\s*<\/div>|\s*<hr[^>]*class="wp-block-separator[^"]*"[^>]*\/?>|\s*<br\s*\/?>)*/gi,
    (match, listInner: string) => {
      const items = [...(listInner as string).matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)].map((m) => m[1].trim());
      if (items.length === 0) return match;
      const tags = items.map((item) => `<li>${item}</li>`).join("");
      return `<div class="perfect-for"><span class="perfect-for-label">Perfect For</span><ul class="perfect-for-tags">${tags}</ul></div>`;
    }
  );
}

/**
 * Rebuild the Pros/Cons block as a pair of cards.
 *
 * WordPress left these as a bare two-column layout: two h3s and two bullet
 * lists, visually identical to the rest of the article, so the reader has to
 * read the headings to work out which column is which. The markup is uniform
 * across all 161 posts that carry one - always `<h3>Pros</h3>` - so this can be
 * a render-time transform rather than an edit to every post.
 *
 * Only the columns block that actually contains a Pros heading is touched; a
 * dozen posts use wp-block-columns for other things.
 */
export function enhanceProsCons(content: string): string {
  const columnsBlock = /<div\b[^>]*class="[^"]*wp-block-columns[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/gi;

  return content.replace(columnsBlock, (match, inner: string) => {
    if (!/<h3\b[^>]*>\s*Pros\s*<\/h3>/i.test(inner)) return match;

    const column = /<h3\b[^>]*>\s*(Pros|Cons)\s*<\/h3>\s*((?:<ul>[\s\S]*?<\/ul>)?)/gi;
    const found = new Map<string, string>();
    for (const m of inner.matchAll(column)) {
      const label = m[1].toLowerCase();
      const items = [...m[2].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)].map((li) => `<li>${li[1].trim()}</li>`);
      if (items.length) found.set(label, items.join(""));
    }
    if (!found.size) return match;

    const card = (key: "pros" | "cons") => {
      const items = found.get(key);
      if (!items) return "";
      // A label on a card, not a document section - emitting an h3 here put
      // "Pros" and "Cons" into the contents sidebar of every post using the
      // pattern, as if they were places you could navigate to.
      return `<div class="pros-cons-card pros-cons-${key}"><p class="pros-cons-heading">${key === "pros" ? "Pros" : "Cons"}</p><ul>${items}</ul></div>`;
    };
    return `<div class="pros-cons">${card("pros")}${card("cons")}</div>`;
  });
}

/**
 * Turn the Price and Level of English headings into one facts strip.
 *
 * These are two `<h4>`s carrying a label and a value, which is neither a
 * heading nor a readable pair - they render as two shouty uppercase lines. 100
 * posts have both, adjacent, with Price first in 99 of them. Other h4 labels
 * (Best For, Best Time to Visit, Location) are deliberately not matched.
 */
export function enhanceVenueFacts(content: string): string {
  const pair = /<h4\b[^>]*>\s*(Price|Level of English)\s*:\s*([\s\S]*?)<\/h4>(\s*)<h4\b[^>]*>\s*(Price|Level of English)\s*:\s*([\s\S]*?)<\/h4>/gi;

  return content.replace(pair, (match, labelA: string, valueA: string, _gap, labelB: string, valueB: string) => {
    if (labelA.toLowerCase() === labelB.toLowerCase()) return match;
    const clean = (s: string) => s.replace(/<\/?strong>/gi, "").trim();
    const row = (label: string, value: string) =>
      `<div class="venue-fact"><dt>${label}</dt><dd>${clean(value)}</dd></div>`;
    return `<dl class="venue-facts">${row(labelA, valueA)}${row(labelB, valueB)}</dl>`;
  });
}

/**
 * Defer offscreen images.
 *
 * Content images were all loading eagerly, so a post like shilin-night-market
 * fired 68 requests before first paint. The first content image is left eager
 * because it can be the LCP element on posts without a hero; everything after
 * it is deferred.
 */
export function enhanceContentImages(content: string): string {
  let seen = 0;
  return content.replace(/<img\b[^>]*>/gi, (tag) => {
    seen++;
    let out = tag;
    if (!/\bdecoding=/i.test(out)) out = out.replace(/\s*\/?>$/, ' decoding="async"$&');
    if (seen > 1 && !/\bloading=/i.test(out)) out = out.replace(/\s*\/?>$/, ' loading="lazy"$&');
    return out;
  });
}

/** Hosts we earn commission from. Links to these must carry rel="sponsored". */
const AFFILIATE_HOSTS = ["klook.com", "kkday.com", "wise.com", "agoda.com", "booking.com", "trip.com", "getyourguide.com"];

export function hasAffiliateLinks(content: string): boolean {
  return AFFILIATE_HOSTS.some((host) => content.includes(`//${host}`) || content.includes(`//www.${host}`));
}

/**
 * Tag monetised outbound links server-side.
 *
 * KlookAffiliate.tsx does this in a useEffect, which means the attribute only
 * exists after hydration - crawlers reading raw HTML see an untagged link, and
 * it only ever covered klook.com. Doing it here puts rel="sponsored" in the
 * markup for every affiliate host, and leaves the client script to handle the
 * `aid` parameter.
 */
export function enhanceAffiliateLinks(content: string): string {
  return content.replace(/<a\b([^>]*?)href="(https?:\/\/[^"]+)"([^>]*?)>/gi, (whole, pre, href, post) => {
    const host = href.replace(/^https?:\/\//, "").split("/")[0].replace(/^www\./, "");
    if (!AFFILIATE_HOSTS.includes(host)) return whole;

    const attrs = `${pre} ${post}`;
    const relMatch = attrs.match(/rel="([^"]*)"/i);
    const existing = relMatch ? relMatch[1].split(/\s+/).filter(Boolean) : [];
    for (const token of ["sponsored", "noopener", "noreferrer"]) {
      if (!existing.includes(token)) existing.push(token);
    }
    const rel = existing.join(" ");

    let out = whole
      .replace(/\s*rel="[^"]*"/i, "")
      .replace(/\s*target="[^"]*"/i, "")
      .replace(/>$/, ` target="_blank" rel="${rel}">`);
    // collapse any double spaces introduced by the strips above
    out = out.replace(/<a\s+/, "<a ").replace(/\s{2,}/g, " ");
    return out;
  });
}

// Name is legacy - this now handles every WordPress gallery size, not just
// three-image ones. Galleries of 5+ images used to fall through untouched,
// leaving the raw <ul class="wp-block-gallery columns-3"> markup in the page.
// That collided with two things: Tailwind ships a real `columns-3` utility
// (CSS multi-column layout), which scattered the images into a newspaper-style
// flow instead of a grid, and the site's generic `.article-content ul` rule
// puts a red bullet marker on every <li>, since nothing told it these <li>s
// were gallery items rather than a normal bullet list. Routing every gallery
// through this same custom-markup path (as 2/3/4-image galleries already were)
// sidesteps both issues at once - see national-taiwan-university and friends.
export function enhanceThreeImageGalleries(content: string): string {
  let result = content;
  let searchIdx = 0;

  while (true) {
    const match = result.slice(searchIdx).match(/<(figure|ul)\b[^>]*class=["'][^"']*wp-block-gallery[^"']/i);
    if (!match) {
      break;
    }

    const matchedTag = match[1]; // "figure" or "ul"
    const startOffset = searchIdx + match.index!;
    
    // Find the end of the opening tag >
    let afterOpenTagIdx = startOffset + match[0].length;
    while (afterOpenTagIdx < result.length && result[afterOpenTagIdx - 1] !== '>') {
      afterOpenTagIdx++;
    }

    let depth = 1;
    let endIdx = afterOpenTagIdx;
    const openTagPattern = new RegExp(`<${matchedTag}\\b`, 'i');
    const closeTagPattern = new RegExp(`</${matchedTag}>`, 'i');

    while (depth > 0 && endIdx < result.length) {
      const remaining = result.slice(endIdx);
      const nextOpen = remaining.match(openTagPattern);
      const nextClose = remaining.match(closeTagPattern);

      const openIdx = nextOpen && nextOpen.index !== undefined ? nextOpen.index : -1;
      const closeIdx = nextClose && nextClose.index !== undefined ? nextClose.index : -1;

      if (closeIdx === -1) {
        break;
      }

      if (openIdx !== -1 && openIdx < closeIdx) {
        depth++;
        endIdx += openIdx + nextOpen[0].length;
      } else {
        depth--;
        endIdx += closeIdx + nextClose[0].length;
      }
    }

    if (depth > 0) {
      searchIdx = afterOpenTagIdx;
      continue;
    }

    const fullBlock = result.substring(startOffset, endIdx);
    const innerHtml = result.substring(afterOpenTagIdx, endIdx - `</${matchedTag}>`.length);

    const imgRegex = /<img\b[^>]+>/gi;
    const imgs = innerHtml.match(imgRegex);

    // A gallery can arrive here with fewer images than it was written with,
    // because withoutDuplicateLeadImage removes whichever figure duplicates the
    // hero image before this runs. Left alone, a two-image gallery reduced to
    // one rendered as a half-empty row with a hole where the hero used to be
    // (9 posts), and a one-image gallery reduced to none rendered as an empty
    // bordered box (2 posts). Unwrap those rather than leaving the wrapper.
    if (!imgs || imgs.length === 0) {
      result = result.slice(0, startOffset) + result.slice(endIdx);
      searchIdx = startOffset;
      continue;
    }

    if (imgs.length === 1) {
      const single = `<figure class="wp-block-image">${imgs[0]}</figure>`;
      result = result.slice(0, startOffset) + single + result.slice(endIdx);
      searchIdx = startOffset + single.length;
      continue;
    }

    if (imgs.length >= 2) {
      const imgCount = imgs.length;
      // 4-and-up galleries render as a CSS grid (maxItemWidth 100% fills the
      // grid cell); 2 and 3 render as a non-wrapping flex row instead.
      const isGrid = imgCount >= 4;
      const maxItemWidth = isGrid ? "100%" : (imgCount === 3 ? "32%" : "48%");
      const aspect = imgCount === 3 ? "1" : "4/3";

      const items = imgs.map(imgHtml => {
        const srcMatch = imgHtml.match(/src=["']([^"']+)["']/i);
        const altMatch = imgHtml.match(/alt=["']([^"']*)["']/i);
        const classMatch = imgHtml.match(/class=["']([^"']+)["']/i);

        const src = srcMatch ? srcMatch[1] : "";
        const alt = altMatch ? altMatch[1] : "";
        const cls = classMatch ? classMatch[1] : "";

        // Check if this image has an associated link inside the gallery block
        const escapedImgHtml = imgHtml.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const aWrapRegex = new RegExp(`<a\\b([^>]*?)>\\s*${escapedImgHtml}\\s*<\\/a>|<a\\b([^>]*?)>\\s*<figure[^>]*>\\s*${escapedImgHtml}\\s*<\\/figure>\\s*<\\/a>`, "i");
        const aMatch = innerHtml.match(aWrapRegex);

        let wrapperStart = "";
        let wrapperEnd = "";
        if (aMatch) {
          const aAttrs = aMatch[1] || aMatch[2] || "";
          wrapperStart = `<a ${aAttrs} style="display: block; width: 100%; text-align: center;">`;
          wrapperEnd = `</a>`;
        }

        // Avoid cropping maps, plans, or chart/graph images - a hard aspect-ratio
        // crop clips titles and axis labels that sit close to the image edges.
        const isMap =
          src.toLowerCase().includes("map") ||
          alt.toLowerCase().includes("map") ||
          src.toLowerCase().includes("kiln") ||
          /rainfall|temperature|chart|graph/i.test(src) ||
          /rainfall|temperature|chart|graph/i.test(alt);
        const fitMode = isMap ? "contain" : "cover";
        const bgStyle = isMap ? "background-color: #fafafa; border: 1px solid #eee;" : "";

        const imgStyle = `width: 100%; height: auto; aspect-ratio: ${aspect}; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); display: block; object-fit: ${fitMode}; ${bgStyle} margin: 0 auto;`;

        return `<div style="flex: 1; max-width: ${maxItemWidth}; min-width: 0; display: flex; justify-content: center; align-items: center;">${wrapperStart}<img src="${src}" alt="${alt}" class="${cls}" style="${imgStyle}" loading="lazy" />${wrapperEnd}</div>`;
      }).join("");

      let replacedBlock = "";
      if (isGrid) {
        // 4 images reads best as 2x2; 5+ (WordPress originally tagged these
        // "columns-3") wraps into a 3-wide grid instead of a fixed 2x2 that
        // would leave an oddly proportioned last row.
        const gridColumns = imgCount === 4 ? 2 : 3;
        replacedBlock = `<div class="custom-grid-gallery" style="display: grid; grid-template-columns: repeat(${gridColumns}, 1fr); gap: 16px; margin: 2em auto; width: 100%; box-sizing: border-box;">${items}</div>`;
      } else {
        const gap = imgCount === 3 ? "12px" : "16px";
        replacedBlock = `<div class="custom-multi-image-gallery" style="display: flex; gap: ${gap}; justify-content: center; align-items: center; margin: 2em auto; width: 100%; flex-wrap: nowrap; box-sizing: border-box;">${items}</div>`;
      }
      
      result = result.substring(0, startOffset) + replacedBlock + result.substring(endIdx);
      searchIdx = startOffset + replacedBlock.length;
    } else {
      searchIdx = endIdx;
    }
  }

  return result;
}





const INLINE_KLOOK_CTA = `<div class="article-inline-cta article-klook-cta" data-auto-cta="klook"><a href="https://www.klook.com/en-GB/search/result/?query=Taipei&amp;aid=8733" target="_blank" rel="sponsored noopener noreferrer">Browse Taipei Tours &amp; Activities on Klook</a></div>`;

const INLINE_WISE_CTA = `<div class="article-inline-cta article-wise-cta" data-auto-cta="wise"><a href="https://wise.com/invite/ecac/robertrichardm17" target="_blank" rel="sponsored noopener noreferrer">Get the Real Exchange Rate with Wise</a></div>`;

/**
 * Injects the same generic Klook + Wise CTAs into the article body itself,
 * at a couple of section breaks. This exists because the sidebar widgets
 * (LeftSidebar) collapse to the very bottom of the page on mobile, where
 * almost nobody scrolls to see them. Skips a provider if that post already
 * has a hand-placed CTA for it, so pages like taiwan-easycard or
 * taiwan-sim-cards don't end up with a duplicate.
 */
export function enhanceInlineAffiliateCTAs(content: string): string {
  const hasKlookCta = /article-klook-cta/i.test(content);
  const hasWiseCta = /wise\.com/i.test(content);
  if (hasKlookCta && hasWiseCta) return content;

  const h2Positions = [...content.matchAll(/<h2\b[^>]*>/gi)].map((match) => match.index!);

  const insertions: { index: number; html: string }[] = [];

  if (!hasKlookCta && h2Positions.length >= 2) {
    insertions.push({ index: h2Positions[1], html: INLINE_KLOOK_CTA });
  }

  if (!hasWiseCta && h2Positions.length >= 4) {
    const targetIdx = Math.min(h2Positions.length - 1, Math.floor(h2Positions.length * 0.65));
    insertions.push({ index: h2Positions[targetIdx], html: INLINE_WISE_CTA });
  }

  if (!insertions.length) return content;

  insertions.sort((a, b) => b.index - a.index);
  let result = content;
  for (const { index, html } of insertions) {
    result = result.slice(0, index) + html + result.slice(index);
  }
  return result;
}

/**
 * The Klook deals widget that lives in the left sidebar on desktop, injected
 * into the article body for mobile.
 *
 * Below 880px the left sidebar is hidden outright, so mobile readers never saw
 * it. Stacking it above the article instead just pushed the actual writing
 * ~2,000px down the page. Dropping it at a section break puts it where someone
 * is already reading, and the wrapper is display:none on desktop so the
 * sidebar copy remains the only one shown there.
 *
 * Placed at a later heading than enhanceInlineAffiliateCTAs uses (h2 index 1)
 * so the two don't land on top of each other.
 */
const IN_POST_KLOOK_WIDGET = `<div class="in-post-klook" aria-label="Klook travel deals"><p class="sidebar-kicker">Klook deals</p><ins class="klk-aff-widget" data-adid="1371607" data-lang="" data-currency="" data-cardh="126" data-padding="92" data-lgh="470" data-edgevalue="655" data-amount="3" data-prod="static_widget"><a href="//www.klook.com/">Klook.com</a></ins></div>`;

export function enhanceMobileKlookWidget(content: string): string {
  if (content.includes("in-post-klook")) return content;

  const h2Positions = [...content.matchAll(/<h2\b[^>]*>/gi)].map((match) => match.index!);
  if (h2Positions.length < 3) return content;

  // Roughly a third of the way in, but never the first two headings.
  const target = h2Positions[Math.max(2, Math.floor(h2Positions.length / 3))];
  return content.slice(0, target) + IN_POST_KLOOK_WIDGET + content.slice(target);
}

export function enhanceKlookDealsWidget(content: string): string {
  const placeholder = /\[KlookDealsWidget\]/g;
  if (!placeholder.test(content)) return content;

  const widgetHtml = `<div class="klook-deals-widget-grid">
  <!-- Deal 1: Taipei 101 -->
  <div class="klook-deal-card">
    <div class="klook-deal-image-wrapper">
      <img src="/media/2019/04/Taipei101.jpg" alt="Taipei 101 Observatory Ticket" loading="lazy" />
    </div>
    <div class="klook-deal-info">
      <h4 class="klook-deal-title">Taipei 101 Observatory Ticket</h4>
      <div class="klook-deal-meta">
        <span class="klook-deal-rating">4.8/5 (20,000+ reviews)</span>
        <span class="klook-deal-price">From NT$ 600</span>
      </div>
      <a href="https://www.klook.com/en-US/activity/1659-taipei-101-taipei/?aid=8733" target="_blank" rel="noopener noreferrer" class="klook-deal-button">Book on Klook</a>
    </div>
  </div>
  <!-- Deal 2: Taipei Metro Day Pass -->
  <div class="klook-deal-card">
    <div class="klook-deal-image-wrapper">
      <img src="/media/2026/08/klook-taipei-mrt-pass.png" alt="Taipei Metro Day Pass & EasyCard" loading="lazy" />
    </div>
    <div class="klook-deal-info">
      <h4 class="klook-deal-title">Taipei Metro Day Pass & EasyCard</h4>
      <div class="klook-deal-meta">
        <span class="klook-deal-rating">4.7/5 (10,000+ reviews)</span>
        <span class="klook-deal-price">From NT$ 190</span>
      </div>
      <a href="https://www.klook.com/en-US/activity/91567-taipei-metro-day-pass/?aid=8733" target="_blank" rel="noopener noreferrer" class="klook-deal-button">Book on Klook</a>
    </div>
  </div>
  <!-- Deal 3: National Palace Museum -->
  <div class="klook-deal-card">
    <div class="klook-deal-image-wrapper">
      <img src="/media/2019/07/National-Palace-Museum-8-1024x694.jpg" alt="National Palace Museum Ticket" loading="lazy" />
    </div>
    <div class="klook-deal-info">
      <h4 class="klook-deal-title">National Palace Museum Ticket</h4>
      <div class="klook-deal-meta">
        <span class="klook-deal-rating">4.6/5 (5,000+ reviews)</span>
        <span class="klook-deal-price">From NT$ 350</span>
      </div>
      <a href="https://www.klook.com/en-US/activity/10136-national-palace-museum-ticket-package-taipei/?aid=8733" target="_blank" rel="noopener noreferrer" class="klook-deal-button">Book on Klook</a>
    </div>
  </div>
</div>`;

  return content.replace(placeholder, widgetHtml);
}


export function calculateReadingTime(content: string): number {

  const words = plainText(content).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}






export function generateArticleSchema(post: ContentPost) {
  const primaryCat = post.categories[0]?.name || "Travel";
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt || `A Taipei Travel Geek guide to ${post.title}.`,
    "image": post.featuredImage ? [`https://www.taipeitravelgeek.com${post.featuredImage}`] : ["https://www.taipeitravelgeek.com/og.png"],
    "datePublished": post.date,
    "dateModified": post.modified || post.date,
    "articleSection": primaryCat,
    "author": {
      "@type": "Organization",
      "name": "Taipei Travel Geek",
      "url": "https://www.taipeitravelgeek.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Taipei Travel Geek",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.taipeitravelgeek.com/images/ttg-mark.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.taipeitravelgeek.com/${post.slug}`
    }
  };
}

export function generateBreadcrumbSchema(items: { name: string; item?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((crumb, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": crumb.name,
      ...(crumb.item ? { "item": crumb.item } : {})
    }))
  };
}

