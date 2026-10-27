import importedPosts from "@/content/posts.json";
import importedCategories from "@/content/categories.json";
import { AFFILIATE_HOSTS } from "@/lib/affiliates";
import mediaManifest from "@/lib/media-manifest.json";

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

/**
 * Station names as written across 186 hand-authored `location-line` blocks,
 * mapped to one canonical label each. The same station turns up as "City
 * Hall" and "Taipei City Hall", with and without a trailing "Station", and
 * occasionally under its full signage name ("Taipei 101 / World Trade
 * Center") - without folding those together the nearby-guides list splits
 * one station into three near-empty ones.
 */
const stationAliases = new Map<string, string>([
  ["city hall", "Taipei City Hall"],
  ["taipei city hall", "Taipei City Hall"],
  ["taipei 101 / world trade center", "Taipei 101"],
  ["taipei 101/world trade center", "Taipei 101"],
  ["da-an", "Daan"],
  ["da'an", "Daan"],
  ["daan park", "Daan Park"],
  ["ntu hospital", "NTU Hospital"],
  ["taipei main", "Taipei Main Station"],
  ["xinbeitou", "Xinbeitou"],
  ["tamsui", "Tamsui"],
  ["danshui", "Tamsui"],
]);

/**
 * Pulls the MRT station(s) out of a post's `location-line`. Posts covering a
 * chain list one "Closest MRT:" per branch, so this returns every match
 * rather than the first - a four-branch post genuinely sits near four
 * stations and should surface at each of them.
 */
export function parseStations(content: string): string[] {
  const line = content.match(/<p class="location-line">([\s\S]*?)<\/p>/);
  if (!line) return [];

  const plain = line[1]
    .replace(/<[^>]+>/g, " ")
    .replace(/&ndash;|&mdash;/g, "-")
    .replace(/\s+/g, " ");

  const found = new Set<string>();
  // Both spellings appear; the lookahead stops at the line/exit detail.
  for (const match of plain.matchAll(/(?:Closest|Nearest)\s+MRT:?\s*([^(,\n]+)/gi)) {
    let name = (match[1] || "").trim();
    name = name.replace(/\s+Station\b.*$/i, "").replace(/\s*-\s*exit.*$/i, "").trim();
    // "Between X (red line) and Y" - too ambiguous to attribute, skip.
    if (!name || /^between\b/i.test(name) || name.length > 40) continue;
    found.add(stationAliases.get(name.toLowerCase()) ?? name);
  }
  return [...found];
}

/**
 * Other guides sitting at the same MRT station. This is the one navigation
 * axis the site can offer that isn't derivable from categories or tags:
 * "what else is near where I'm standing" is how people actually use a
 * travel guide once they're in the city.
 */
export function getNearbyPosts(post: ContentPost, limit = 6): { station: string; posts: ContentPost[] }[] {
  // A round-up has no single location of its own. It cites whatever stations
  // its entries happen to sit at, so the block would anchor to an arbitrary
  // one of them and claim a neighbourhood the post doesn't actually have.
  // Same reasoning that keeps round-ups out of the candidate list below.
  if (post.tags.some((tag) => tag.slug === "lists")) return [];

  const stations = parseStations(post.content);
  if (!stations.length) return [];

  return stations
    .map((station) => ({
      station,
      posts: posts
        .filter(
          (candidate) =>
            candidate.slug !== post.slug &&
            isListable(candidate) &&
            !nonEditorialSlugs.has(candidate.slug) &&
            // Round-ups cite one station in their location-line but cover the
            // whole city, so they'd otherwise surface as "nearby" at every
            // station they happen to name - crowding out the actual
            // single-venue neighbours this block exists to show.
            !candidate.tags.some((tag) => tag.slug === "lists") &&
            parseStations(candidate.content).includes(station),
        )
        .sort(byArchiveRank)
        .slice(0, limit),
    }))
    .filter((group) => group.posts.length > 0);
}

/**
 * Server-rendered placeholder for the live Din Tai Fung queue board.
 *
 * The board is a client component that portals into the marker in the
 * article body, so from server render until hydration completes the marker
 * is an empty div - a blank gap sitting under a heading that promises a
 * board. Filling it server-side means the section is never empty, and the
 * component clears this placeholder out when it takes over.
 *
 * Classes match the component's own skeleton so both share one set of CSS.
 */
const QUEUE_SKELETON_BRANCHES = [
  "Taipei 101",
  "Xinsheng",
  "A4",
  "A13",
  "Nanxi",
  "Fuxing",
  "Tienmu",
  "Banqiao",
];

export function fillQueueMarker(content: string): string {
  if (!content.includes("<div data-dtf-queue></div>")) return content;

  const rows = QUEUE_SKELETON_BRANCHES.map(
    (name) =>
      `<li class="dtf-queue-item tone-loading"><span class="dtf-queue-branch">${name}</span>` +
      `<span class="dtf-queue-skeleton" aria-hidden="true"></span></li>`,
  ).join("");

  const skeleton =
    `<aside class="dtf-queue is-loading" aria-busy="true" aria-label="Loading live Din Tai Fung queue times">` +
    `<div class="dtf-queue-head"><p class="dtf-queue-label">` +
    `<span class="dtf-queue-dot" aria-hidden="true"></span>Live queue times</p>` +
    `<p class="dtf-queue-updated">Checking all branches&hellip;</p></div>` +
    `<ul class="dtf-queue-list">${rows}</ul>` +
    `<p class="dtf-queue-foot">Reading Din Tai Fung&rsquo;s live queue&hellip;</p></aside>`;

  return content.replace("<div data-dtf-queue></div>", `<div data-dtf-queue>${skeleton}</div>`);
}

/**
 * Server-rendered markup for the nearby-guides block.
 *
 * Returned as an HTML string rather than a React component so it can be
 * spliced into the article body - it belongs directly under the location map
 * (where a reader is already thinking about where they are), which sits
 * inside the content HTML and can't be reached from a sibling component.
 */
export function renderNearbyGuidesSection(post: ContentPost): string {
  const groups = getNearbyPosts(post, 6);
  if (!groups.length) return "";

  const blocks = groups
    .map((group) => {
      const items = group.posts
        .map((nearby) => `<li><a href="/${nearby.slug}">${nearby.title}</a></li>`)
        .join("");
      return (
        `<div class="nearby-guides-group">` +
        `<p class="nearby-guides-title"><span class="nearby-guides-pin" aria-hidden="true">🚇</span>Also near ${group.station}</p>` +
        `<ul class="nearby-guides-list">${items}</ul>` +
        `</div>`
      );
    })
    .join("");

  return `\n\n<section class="nearby-guides" aria-label="Other guides near this station">${blocks}</section>\n\n`;
}

/**
 * Places the nearby-guides block directly after the last location map, which
 * is where the "what else is around here" question naturally arises. Posts
 * without a map fall back to the end of the body, so it still lands above
 * the auto-appended Recommended Reading block either way.
 */
export function insertNearbyGuides(content: string, section: string): string {
  if (!section) return content;

  // Only location maps count - the page also carries Klook widget iframes.
  const maps = [...content.matchAll(/<iframe[^>]*src="[^"]*google\.com\/maps[^"]*"[^>]*><\/iframe>/gi)];
  if (!maps.length) return content + section;

  const last = maps[maps.length - 1];
  let cut = (last.index ?? 0) + last[0].length;

  // The map is usually wrapped in a <p> or <figure>; step past the closing
  // tag so the block lands after the whole figure rather than inside it.
  const after = content.slice(cut, cut + 40);
  const closer = after.match(/^\s*<\/(p|figure)>/i);
  if (closer) cut += closer[0].length;

  return content.slice(0, cut) + section + content.slice(cut);
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

/**
 * A post is browsable if it isn't unlisted and isn't a closed venue.
 *
 * Keyed off the "(Permanently Closed)" title suffix rather than the
 * `closure-notice` CSS class. That class carries any standing warning, not
 * just a closure - the Sun Yat-Sen Memorial Hall renovation, the Taroko
 * earthquake access notice, an expired giveaway - so testing for it hid two
 * of the site's biggest attractions from every category page, tag page and
 * related-posts block while they were merely under repair.
 *
 * generate-search-index.mjs already draws the line this way; this keeps the
 * two in step.
 */
function isListable(post: ContentPost) {
  return !unlistedSlugs.has(post.slug) && !/\(permanently closed\)/i.test(post.title || "");
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

// The named entities the WordPress-era content actually uses, plus numeric
// ones. Without &ndash; and friends the contents list showed headings like
// "Zhongzheng (Taipei Main Station) &ndash; Best for a First Trip".
const NAMED_ENTITIES: Record<string, string> = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  ndash: "–", mdash: "—", hellip: "…",
  lsquo: "‘", rsquo: "’", ldquo: "“", rdquo: "”",
};

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec: string) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&([a-z]+);/gi, (match, name: string) => NAMED_ENTITIES[name.toLowerCase()] ?? match);
}

/** [start, end) offsets of each "Every place on this map" block, whose h3s stay out of the contents. */
function mapPlacesRanges(content: string): [number, number][] {
  const ranges: [number, number][] = [];
  for (const m of content.matchAll(/<div\b[^>]*class=["'][^"']*\bmap-places\b[^"']*["'][^>]*>/gi)) {
    const end = content.indexOf("</div>", m.index);
    ranges.push([m.index, end < 0 ? content.length : end]);
  }
  return ranges;
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

  const skip = mapPlacesRanges(cleanContent);
  const enhancedContent = cleanContent.replace(/<h([23])\b([^>]*)>([\s\S]*?)<\/h\1>/gi, (match, levelStr, attrs, innerHtml, offset: number) => {
    const level = parseInt(levelStr, 10);
    const plainText = decodeHtmlEntities(innerHtml.replace(/<[^>]*>/g, "").trim());
    if (!plainText) return match;
    if (skip.some(([start, end]) => offset > start && offset < end)) return match;

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

/**
 * Wrap every table for horizontal scrolling, and mark narrow ones (three
 * columns or fewer, with a header row) to stack into cards on phones, as City
 * Break Geek does: each cell gets a data-label from its column header, which
 * the mobile CSS shows in front of the value. The header row is the <thead>,
 * or else a first row that is all <th> or all bold <td> - the WordPress
 * tables mostly use the latter.
 */
const STACK_MAX_COLUMNS = 3;

export function enhanceTables(content: string): string {
  return content.replace(/<table\b([^>]*)>([\s\S]*?)<\/table>/gi, (match, attrs: string, inner: string) => {
    const rows = [...inner.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)];
    const cellsOf = (row: string) => [...row.matchAll(/<t([hd])\b[^>]*>([\s\S]*?)<\/t\1>/gi)];
    const first = rows[0] ? cellsOf(rows[0][1]) : [];
    const isHeader =
      first.length > 1 &&
      first.every(([, kind, html]) => kind.toLowerCase() === "h" || /^\s*<strong>[\s\S]*<\/strong>\s*$/i.test(html));
    if (!isHeader || first.length > STACK_MAX_COLUMNS || /colspan|rowspan/i.test(inner)) {
      return `<div class="table-responsive">${match}</div>`;
    }

    const labels = first.map(([, , html]) => decodeHtmlEntities(html.replace(/<[^>]*>/g, "").trim()).replace(/"/g, "&quot;"));
    let rowIndex = 0;
    const labelled = inner.replace(/<tr\b([^>]*)>([\s\S]*?)<\/tr>/gi, (rowMatch, rowAttrs: string, rowInner: string) => {
      if (rowIndex++ === 0) return `<tr${rowAttrs} class="table-stack-head">${rowInner}</tr>`;
      let col = 0;
      const cells = rowInner.replace(/<td\b([^>]*)>/gi, (_cell, cellAttrs: string) => {
        const label = labels[col++];
        return label ? `<td${cellAttrs} data-label="${label}">` : `<td${cellAttrs}>`;
      });
      return `<tr${rowAttrs}>${cells}</tr>`;
    });
    const classed = /class=["']/i.test(attrs)
      ? attrs.replace(/class=(["'])/i, "class=$1table--stack ")
      : `${attrs} class="table--stack"`;
    return `<div class="table-responsive"><table${classed}>${labelled}</table></div>`;
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

/**
 * Every WordPress gallery becomes one "photo row" (the City Break Geek
 * `.photo-row` pattern; styles in app/styles/media.css).
 *
 * The content carries four generations of gallery markup, and each used to
 * render differently:
 *   - `<ul class="wp-block-gallery columns-N is-cropped">` with
 *     `<li class="blocks-gallery-item"><figure><img>` items (2018-19 posts)
 *   - `<figure class="wp-block-gallery has-nested-images columns-N">` with a
 *     nested `<figure class="wp-block-image">` per photo (2020 on)
 *   - the same without has-nested-images, and `aligncenter` variants
 *   - `<div class="wp-block-gallery columns-2" style="display:grid...">`, the
 *     hotel photo pairs written by scripts/add-*photos*.mjs, which carry
 *     inline grid, 260px-height and caption styles on every element
 * The raw `ul` form also collided with Tailwind's real `columns-3` utility and
 * with the red bullets on `.article-content ul`, which is why every gallery is
 * rebuilt here rather than styled in place.
 *
 * The rebuild keeps what matters - src, alt, width/height, the link around the
 * image (most link to the full-size file, some to a related guide) and the
 * caption - and drops the rest: inline styles, wp-image classes, the data-id/
 * data-link attachment ids, and the figure-inside-figure framing.
 *
 * Name is legacy (it once only handled three-image galleries). It now runs on
 * every gallery, whatever the image count.
 */
type GalleryItem = { img: string; link: string; caption: string };

const GALLERY_OPEN = /<(figure|ul|div)\b[^>]*class=["'][^"']*\bwp-block-gallery\b[^"']*["'][^>]*>/i;

// Maps, plans and charts are cropped by object-fit: cover, which slices off
// titles and axis labels; they are letterboxed instead.
const UNCROPPABLE = /map|kiln|rainfall|temperature|chart|graph|plan\b|timetable|menu/i;

function attr(tag: string, name: string): string | null {
  const m = tag.match(new RegExp(`\\s${name}=(["'])([\\s\\S]*?)\\1`, "i"));
  return m ? m[2] : null;
}

function stripStyles(html: string): string {
  return html.replace(/\s+style=(["'])[\s\S]*?\1/gi, "");
}

/** Finds the end of the element opened at `start`, counting nested tags of the same name. */
function elementEnd(html: string, start: number, tagName: string): number {
  const tags = new RegExp(`<(/?)${tagName}\\b[^>]*>`, "gi");
  tags.lastIndex = start;
  let depth = 0;
  let m: RegExpExecArray | null;
  while ((m = tags.exec(html))) {
    depth += m[1] ? -1 : 1;
    if (depth === 0) return m.index + m[0].length;
  }
  return -1;
}

function galleryItems(inner: string): GalleryItem[] {
  const imgs = [...inner.matchAll(/<img\b[^>]*>/gi)];
  return imgs.map((m, i) => {
    const start = m.index ?? 0;
    const end = start + m[0].length;
    const prevEnd = i > 0 ? (imgs[i - 1].index ?? 0) + imgs[i - 1][0].length : 0;
    const nextStart = i + 1 < imgs.length ? imgs[i + 1].index ?? inner.length : inner.length;

    // The link is the last <a> opened before this image and not yet closed.
    const before = inner.slice(prevEnd, start);
    const opens = [...before.matchAll(/<a\b[^>]*>/gi)];
    const lastOpen = opens.at(-1);
    const link = lastOpen && !/<\/a>/i.test(before.slice((lastOpen.index ?? 0) + lastOpen[0].length))
      ? lastOpen[0]
      : "";

    const after = inner.slice(end, nextStart);
    const caption = after.match(/<figcaption\b[^>]*>([\s\S]*?)<\/figcaption>/i)?.[1]?.trim() ?? "";

    return { img: m[0], link, caption };
  });
}

function photoRowImage(img: string, sizes: string): string {
  const src = attr(img, "src") ?? "";
  const alt = attr(img, "alt") ?? "";
  const width = attr(img, "width");
  const height = attr(img, "height");
  const dims = width && height ? ` width="${width}" height="${height}"` : "";
  return `<img src="${src}" alt="${alt}"${dims} sizes="${sizes}" loading="lazy" decoding="async"/>`;
}

function photoRowFigure(item: GalleryItem, className: string, sizes: string): string {
  const src = attr(item.img, "src") ?? "";
  const alt = attr(item.img, "alt") ?? "";
  const contain = UNCROPPABLE.test(src) || UNCROPPABLE.test(alt);
  const cls = contain ? `${className} ${className}--contain` : className;
  let body = photoRowImage(item.img, sizes);
  if (item.link) {
    const href = attr(item.link, "href");
    // Keep the link's own attributes (target, rel, data-*), minus any inline style.
    body = href ? `${stripStyles(item.link)}${body}</a>` : body;
  }
  const caption = item.caption ? `<figcaption>${stripStyles(item.caption)}</figcaption>` : "";
  return `<figure class="${cls}">${body}${caption}</figure>`;
}

// Column count on desktop: pairs side by side, four as 2x2, three and five-
// plus three across. Phones get a swipeable strip instead (see media.css).
function photoRowColumns(count: number): number {
  if (count === 2 || count === 4) return 2;
  return 3;
}

const PHOTO_ROW_SIZES: Record<number, string> = {
  2: "(max-width: 640px) 82vw, 360px",
  3: "(max-width: 640px) 82vw, 240px",
};
const SINGLE_IMAGE_SIZES = "(max-width: 760px) calc(100vw - 32px), 720px";

// Photo pairs written in 2026 as a bare inline-flex div of images (bubble tea,
// cocktail bars, Yangmingshan) are galleries in all but name.
const INLINE_FLEX_IMAGE_ROW = /<div style="display:\s*flex[^"]*">((?:\s*(?:<a\b[^>]*>)?\s*<img\b[^>]*>\s*(?:<\/a>)?)+\s*)<\/div>/gi;

function isPortrait(img: string): boolean {
  const width = Number(attr(img, "width"));
  const height = Number(attr(img, "height"));
  return width > 0 && height > width;
}

export function enhanceThreeImageGalleries(content: string): string {
  let result = content.replace(INLINE_FLEX_IMAGE_ROW, (_whole, inner: string) => `<div class="wp-block-gallery">${inner}</div>`);
  let searchFrom = 0;

  while (true) {
    const rest = result.slice(searchFrom);
    const open = rest.match(GALLERY_OPEN);
    if (!open || open.index === undefined) break;

    const start = searchFrom + open.index;
    const end = elementEnd(result, start, open[1]);
    if (end === -1) {
      searchFrom = start + open[0].length;
      continue;
    }

    const items = galleryItems(result.slice(start + open[0].length, end));
    let replacement = "";

    // A gallery can arrive with fewer images than it was written with, because
    // withoutDuplicateLeadImage removes whichever figure duplicates the hero
    // before this runs. None left: drop the empty wrapper. One left: render it
    // as an ordinary single image rather than a half-empty row.
    if (items.length === 1) {
      replacement = photoRowFigure(items[0], "wp-block-image", SINGLE_IMAGE_SIZES);
    } else if (items.length > 1) {
      const columns = photoRowColumns(items.length);
      const figures = items.map((item) => photoRowFigure(item, "photo-row__item", PHOTO_ROW_SIZES[columns])).join("");
      // A row of portrait shots (drinks, signs, temple doors) keeps a 4:5
      // frame; cropping those to 3:2 would leave only their middle third.
      const portrait = items.every((item) => isPortrait(item.img)) ? " photo-row--portrait" : "";
      replacement = `<div class="photo-row photo-row--${columns}${portrait}" data-count="${items.length}">${figures}</div>`;
    }

    result = result.slice(0, start) + replacement + result.slice(end);
    searchFrom = start + replacement.length;
  }

  return normaliseImageFigures(result);
}

/**
 * Single-image figures: strip the inline styles the older posts and import
 * scripts left on the figure, image and caption, so media.css styles them all
 * the same way (one radius, no frame, a small muted caption underneath).
 */
export function normaliseImageFigures(content: string): string {
  return content.replace(
    /<(figure|div)\b([^>]*class=["'][^"']*\bwp-block-image\b[^"']*["'][^>]*)>([\s\S]*?)<\/\1>/gi,
    (whole, tag: string, attrs: string, inner: string) => {
      // Only plain image figures; anything holding a table, iframe or list is left alone.
      if (/<(table|iframe|ul|ol|div)\b/i.test(inner) || !/<img\b/i.test(inner)) return whole;
      return `<${tag}${stripStyles(attrs)}>${inner.replace(/<(img|figure|figcaption|a)\b([^>]*)>/gi, (t, name: string, a: string) => `<${name}${stripStyles(a)}>`)}</${tag}>`;
    }
  );
}

/**
 * Responsive images for the article body.
 *
 * lib/media-manifest.json (built by scripts/build-media-manifest.mjs, because
 * the Worker cannot read public/ at request time) lists the sizes of each
 * /media image that exist on disk. From it this pass:
 *   - adds srcset when a picture exists in more than one size with the same
 *     aspect ratio (most of the library holds only the one 1024px copy
 *     WordPress embedded, so most images get no srcset, which is correct)
 *   - adds sizes, by context: a photo-row sets its own, recommended-reading
 *     cards are small, everything else is the reading column
 *   - fills in width/height where they are missing, from the filename's
 *     "-WIDTHxHEIGHT" suffix or the measured original, so lazy images reserve
 *     their space and do not shift the page as they load
 * The hero is not part of the body HTML and is not touched.
 */
type MediaRow = [suffix: string, width: number, height: number, kb: number];
const MEDIA_MANIFEST = mediaManifest as unknown as Record<string, MediaRow[]>;
const MEDIA_FILE = /^(\/media\/.*?)(-(\d+)x(\d+))?\.(jpe?g|png|webp|gif)$/i;
const CARD_SIZES = "(max-width: 640px) 90vw, 300px";
// Larger copies than this are left out of srcset: a few originals are heavy
// PNGs or barely-compressed camera JPEGs, and sharper is not worth 1 MB.
const MAX_CANDIDATE_KB = 700;

type MediaInfo = { width: number; height: number; srcset: string };
const mediaInfoCache = new Map<string, MediaInfo | null>();

function mediaInfo(src: string): MediaInfo | null {
  const cached = mediaInfoCache.get(src);
  if (cached !== undefined) return cached;

  let info: MediaInfo | null = null;
  const m = MEDIA_FILE.exec(src);
  if (m) {
    const stem = m[1];
    const suffix = src.slice(stem.length);
    const rows = MEDIA_MANIFEST[stem] ?? [];
    const own = rows.find((row) => row[0] === suffix);
    const width = m[3] ? Number(m[3]) : own?.[1] ?? 0;
    const height = m[4] ? Number(m[4]) : own?.[2] ?? 0;
    let srcset = "";
    if (width && height && own && !/[\s,]/.test(src)) {
      const ratio = width / height;
      const seen = new Set<number>();
      const candidates = rows
        .filter((row) => row[1] >= 300 && Math.abs(row[1] / row[2] - ratio) / ratio < 0.02)
        .filter((row) => row[0] === suffix || row[3] <= MAX_CANDIDATE_KB)
        .filter((row) => !seen.has(row[1]) && seen.add(row[1]));
      if (candidates.length > 1) srcset = candidates.map((row) => `${stem}${row[0]} ${row[1]}w`).join(", ");
    }
    if (width && height) info = { width, height, srcset };
  }

  mediaInfoCache.set(src, info);
  return info;
}

export function enhanceResponsiveImages(content: string): string {
  return content.replace(/<img\b[^>]*>/gi, (tag, offset: number) => {
    const src = attr(tag, "src");
    if (!src || !src.startsWith("/media/")) return tag;
    const info = mediaInfo(src);
    if (!info) return tag;

    const add: string[] = [];
    const width = attr(tag, "width");
    const height = attr(tag, "height");
    if (!width && !height) {
      add.push(`width="${info.width}"`, `height="${info.height}"`);
    } else if (width && !height && Number(width)) {
      add.push(`height="${Math.round((Number(width) * info.height) / info.width)}"`);
    } else if (!width && height && Number(height)) {
      add.push(`width="${Math.round((Number(height) * info.width) / info.height)}"`);
    }

    if (info.srcset && !/\ssrcset=/i.test(tag)) {
      add.push(`srcset="${info.srcset}"`);
      if (!/\ssizes=/i.test(tag)) {
        const before = content.slice(Math.max(0, offset - 400), offset);
        const inCard = /<a class="recommended-card"[^>]*>\s*$/.test(before);
        add.push(`sizes="${inCard ? CARD_SIZES : SINGLE_IMAGE_SIZES}"`);
      }
    }

    if (!add.length) return tag;
    return tag.replace(/\s*\/?>$/, ` ${add.join(" ")}$&`);
  });
}

/**
 * Per-page opt-outs for the generic, auto-inserted affiliate units.
 *
 * Every article gets these by default:
 *   - "klookSearch": the inline "Browse Taipei Tours & Activities on Klook"
 *     button (INLINE_KLOOK_CTA, a klook.com search link)
 *   - "klookDeals": the 5-card Klook "deals" widget, adid 1371607 - the
 *     left-rail copy on desktop (LeftSidebar) and the in-post copy on mobile
 *     (enhanceMobileKlookWidget). One key turns off both.
 *   - "wise": the inline "Get the Real Exchange Rate with Wise" button
 *     (INLINE_WISE_CTA)
 *
 * A page listed here does NOT get the units named against it. Use it for
 * pages that sell their own specific product, so the reader isn't shown a
 * generic zoo ticket or a Klook search box 600px below the eSIM, airport
 * train or hotel they came for. A page not listed keeps all three, so this
 * is the one place to change when a page gains (or loses) its own product.
 *
 * The automatic skips still apply on top of this: no Klook search button
 * where the post hand-places an `article-klook-cta`, and no Wise button where
 * the post already links to wise.com.
 */
export type GenericUnit = "klookSearch" | "klookDeals" | "wise";

const HOTEL_GUIDE_OPT_OUTS: GenericUnit[] = ["klookSearch", "klookDeals"];
const PRODUCT_PAGE_OPT_OUTS: GenericUnit[] = ["klookSearch", "klookDeals"];

const GENERIC_UNIT_OPT_OUTS: Record<string, readonly GenericUnit[]> = {
  // Hotel guides: the product is the hotel, with a "Check prices" button
  // under each one (enhanceHotelCtaButtons).
  "best-areas-and-hotels-to-stay": HOTEL_GUIDE_OPT_OUTS,
  "hotels-near-taipei-main-station": HOTEL_GUIDE_OPT_OUTS,
  "hotels-near-ximending": HOTEL_GUIDE_OPT_OUTS,
  "hotels-near-taipei-101": HOTEL_GUIDE_OPT_OUTS,
  "beitou-hot-spring-hotels": HOTEL_GUIDE_OPT_OUTS,
  "hotels-in-zhongshan": HOTEL_GUIDE_OPT_OUTS,
  "hotels-near-taoyuan-airport": HOTEL_GUIDE_OPT_OUTS,
  "hotels-in-daan": HOTEL_GUIDE_OPT_OUTS,
  "aparthotels-serviced-apartments-taipei": HOTEL_GUIDE_OPT_OUTS,
  "best-hostels-in-taipei": HOTEL_GUIDE_OPT_OUTS,
  "taipei-101-view-hotels-new-years-eve": HOTEL_GUIDE_OPT_OUTS,
  "taipei-hotels-with-pools": HOTEL_GUIDE_OPT_OUTS,
  // Product pages with their own hand-placed Klook product widgets. The Wise
  // button stays on the SIM page, where it fits the arrival checklist.
  "taiwan-sim-cards": PRODUCT_PAGE_OPT_OUTS,
  "taoyuan-airport-mrt": PRODUCT_PAGE_OPT_OUTS,
  "taiwan-high-speed-rail-hsr-discounts-klook": PRODUCT_PAGE_OPT_OUTS,
  "taipei-fun-pass": PRODUCT_PAGE_OPT_OUTS,
  "taipei-zoo": PRODUCT_PAGE_OPT_OUTS,
  "maokong-gondola": PRODUCT_PAGE_OPT_OUTS,
  "taipei-101": PRODUCT_PAGE_OPT_OUTS,
  "jiufen": PRODUCT_PAGE_OPT_OUTS,
  "best-day-trips-from-taipei": PRODUCT_PAGE_OPT_OUTS,
  "the-best-guided-tours-in-taipei": PRODUCT_PAGE_OPT_OUTS,
  "taipei-sightseeing-bus": PRODUCT_PAGE_OPT_OUTS,
  "taipei-public-transport": PRODUCT_PAGE_OPT_OUTS,
};

export function showsGenericUnit(slug: string, unit: GenericUnit): boolean {
  return !GENERIC_UNIT_OPT_OUTS[slug]?.includes(unit);
}

const INLINE_KLOOK_CTA = `<div class="article-inline-cta article-klook-cta" data-auto-cta="klook"><a href="https://www.klook.com/en-GB/search/result/?query=Taipei&amp;aid=8733" target="_blank" rel="sponsored noopener noreferrer">Browse Taipei Tours &amp; Activities on Klook</a></div>`;

const INLINE_WISE_CTA = `<div class="article-inline-cta article-wise-cta" data-auto-cta="wise"><a href="https://wise.com/invite/ecac/robertrichardm17" target="_blank" rel="sponsored noopener noreferrer">Get the Real Exchange Rate with Wise</a></div>`;

/**
 * Injects the same generic Klook + Wise CTAs into the article body itself,
 * at a couple of section breaks. This exists because the sidebar widgets
 * (LeftSidebar) collapse to the very bottom of the page on mobile, where
 * almost nobody scrolls to see them. Skips a provider if that post already
 * has a hand-placed CTA for it, so pages like taiwan-easycard or
 * taiwan-sim-cards don't end up with a duplicate, or if the page opts out of
 * it in GENERIC_UNIT_OPT_OUTS.
 */
export function enhanceInlineAffiliateCTAs(content: string, slug: string): string {
  const skipKlook = /article-klook-cta/i.test(content) || !showsGenericUnit(slug, "klookSearch");
  const skipWise = /wise\.com/i.test(content) || !showsGenericUnit(slug, "wise");
  if (skipKlook && skipWise) return content;

  const h2Positions = [...content.matchAll(/<h2\b[^>]*>/gi)].map((match) => match.index!);

  const insertions: { index: number; html: string }[] = [];

  if (!skipKlook && h2Positions.length >= 2) {
    insertions.push({ index: h2Positions[1], html: INLINE_KLOOK_CTA });
  }

  if (!skipWise && h2Positions.length >= 4) {
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
 * sidebar copy remains the only one shown there. (Being lazy - see
 * enhanceLazyKlookWidgets - the hidden desktop copy never loads its iframe.)
 *
 * Placed at a later heading than enhanceInlineAffiliateCTAs uses (h2 index 1)
 * so the two don't land on top of each other.
 */
const IN_POST_KLOOK_WIDGET = `<div class="in-post-klook" aria-label="Klook travel deals"><p class="sidebar-kicker">Klook deals</p><ins class="klk-aff-widget" data-adid="1371607" data-lang="" data-currency="" data-cardh="126" data-padding="92" data-lgh="470" data-edgevalue="655" data-amount="3" data-prod="static_widget"><a href="//www.klook.com/">Klook.com</a></ins></div>`;

export function enhanceMobileKlookWidget(content: string, slug: string): string {
  if (content.includes("in-post-klook") || !showsGenericUnit(slug, "klookDeals")) return content;

  const h2Positions = [...content.matchAll(/<h2\b[^>]*>/gi)].map((match) => match.index!);
  if (h2Positions.length < 3) return content;

  // Roughly a third of the way in, but never the first two headings.
  const target = h2Positions[Math.max(2, Math.floor(h2Positions.length / 3))];
  return content.slice(0, target) + IN_POST_KLOOK_WIDGET + content.slice(target);
}

/**
 * Hold every Klook iframe widget in the body back until it nears the screen.
 *
 * Klook's iframe-init script renders every `ins.klk-aff-widget` on the page
 * the moment it runs, including ones far down the page and ones hidden by
 * CSS (the mobile in-post copy on desktop). It skips any element that already
 * carries `data-rendered`, so marking them `data-rendered="lazy"` here keeps
 * them inert; KlookAffiliate.tsx removes the mark when the element comes
 * within reach of the viewport and runs the script again. Hidden widgets
 * never intersect, so they never load. Without JavaScript the widget's
 * fallback "Klook.com" link still shows, as before.
 */
export function enhanceLazyKlookWidgets(content: string): string {
  return content.replace(/<ins\b([^>]*\bclass="[^"]*\bklk-aff-widget\b[^"]*"[^>]*)>/gi, (whole, attrs: string) =>
    /\bdata-rendered=/i.test(attrs) ? whole : `<ins${attrs} data-rendered="lazy">`
  );
}

/**
 * A "Check prices & availability" button under each hotel in the hotel
 * guides.
 *
 * Each hotel is an <h3> holding an <a data-hotel="key" href="...">, followed
 * by its description paragraph. The hotel name was the only link, which reads
 * as a heading rather than something to click. The button goes after that
 * first paragraph, with the same href and data-hotel key, so a future
 * re-pointing of the hotel links (Agoda) by data-hotel covers it too.
 * Hotels with no booking link (<h3><span data-hotel>) are skipped.
 *
 * data-placement="hotel-button" is read by the affiliate_click tracker in
 * app/layout.tsx, so these clicks are reported separately from the name links.
 */
export function enhanceHotelCtaButtons(content: string): string {
  if (!content.includes("data-hotel=")) return content;
  return content.replace(
    /(<h3\b[^>]*>\s*<a\b([^>]*)>[\s\S]*?<\/h3>\s*<p\b[^>]*>[\s\S]*?<\/p>)/gi,
    (whole, _block, anchorAttrs: string) => {
      const hotel = anchorAttrs.match(/\bdata-hotel="([^"]+)"/i)?.[1];
      const href = anchorAttrs.match(/\bhref="(https?:\/\/[^"]+)"/i)?.[1];
      if (!hotel || !href) return whole;
      return `${whole}\n<p class="hotel-cta"><a class="hotel-cta-button" href="${href}" data-hotel="${hotel}" data-placement="hotel-button" target="_blank" rel="sponsored noopener noreferrer">Check prices &amp; availability</a></p>`;
    }
  );
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

