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

export const posts = (importedPosts as ContentPost[]).sort((a, b) => b.date.localeCompare(a.date));
export const categories = importedCategories as TaxonomyTerm[];
export const tags = Array.from(
  new Map(posts.flatMap((post) => post.tags).map((tag) => [tag.slug, tag])).values(),
);

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
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
        ? `<img src="${escapeHtml(image)}" alt="" loading="lazy"/>`
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

export function enhanceChoiceGuideImages(content: string, sourceSlug: string) {
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

    // Deliberately not wrapped in a link to the related post - the section
    // text right below always already contains that link (it's the trigger
    // condition above), so a second link on the photo would just be a
    // redundant, visually unmarked click target.
    const image = `<figure class="choice-guide-image"><img src="${escapeHtml(related.featuredImage || "")}" alt="" loading="lazy"/></figure>`;
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
export const unlistedSlugs = new Set([
  "taipei-annual-events",
]);

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
      ? `<img src="${escapeHtml(related_.featuredImage)}" alt="" loading="lazy"/>`
      : `<span class="recommended-card-placeholder" aria-hidden="true"></span>`;

    return `<a class="recommended-card" href="/${escapeHtml(related_.slug)}">${imageMarkup}<span class="recommended-card-body"><span class="recommended-card-label">Recommended guide</span><strong>${escapeHtml(related_.title)}</strong><span class="recommended-card-arrow" aria-hidden="true">→</span></span></a>`;
  }).join("");

  return `<section class="recommended-reading"><div class="recommended-reading-heading"><span>Keep exploring</span><h2>${escapeHtml(heading)}</h2></div><div class="recommended-reading-grid">${cards}</div></section>`;
}

/**
 * Slugs that shouldn't get the end-of-post hotel deals widget: the hotel
 * guide itself (already has one placed manually near the top) plus the same
 * non-editorial utility pages excluded from Recommended Reading.
 */
const hotelWidgetExcludedSlugs = new Set(["best-areas-and-hotels-to-stay", ...nonEditorialSlugs]);

export function shouldShowHotelDealsWidget(post: ContentPost): boolean {
  return !hotelWidgetExcludedSlugs.has(post.slug);
}

/** Auto-appended at the end of every eligible post, right after Recommended Reading. */
export function renderHotelDealsWidget(): string {
  return `<section class="end-of-post-hotel-deals"><div class="recommended-reading-heading"><span>Ready to book?</span><h2>Great Taipei hotel deals right now</h2></div><div class="hotel-deals-widget"><ins class="klk-aff-widget" data-aid="8733" data-city_id="19" data-country_id="1014" data-tag_id="0" data-currency="" data-lang="" data-label1="" data-label2="" data-label3="" data-prod="deals_widget" data-total="2"><a href="//www.klook.com/">Klook.com</a></ins></div></section>`;
}

export function getPostsByCategory(category: string) {
  return posts.filter((post) => !unlistedSlugs.has(post.slug) && post.categories.some((item) => item.slug === category));
}

export function getPostsByTag(tag: string) {
  const matches = posts.filter((post) => !unlistedSlugs.has(post.slug) && post.tags.some((item) => item.slug === tag));
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

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(`${date.replace(" ", "T")}Z`),
  );
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
      attrs = `${attrs} id="${id}"`;
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

    if (imgs && (imgs.length === 2 || imgs.length === 3 || imgs.length === 4)) {
      const imgCount = imgs.length;
      const maxItemWidth = imgCount === 4 ? "100%" : (imgCount === 3 ? "32%" : "48%");
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
      if (imgCount === 4) {
        replacedBlock = `<div class="custom-grid-gallery" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin: 2em auto; width: 100%; box-sizing: border-box;">${items}</div>`;
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





const INLINE_KLOOK_CTA = `<div class="article-inline-cta article-klook-cta" data-auto-cta="klook"><a href="https://www.klook.com/en-GB/search/result/?query=Taipei&amp;aid=8733" target="_blank" rel="sponsored noopener noreferrer"><span>🎟️</span> Browse Taipei Tours &amp; Activities on Klook</a></div>`;

const INLINE_WISE_CTA = `<div class="article-inline-cta article-wise-cta" data-auto-cta="wise"><a href="https://wise.com/invite/ecac/robertrichardm17" target="_blank" rel="sponsored noopener noreferrer"><span>💱</span> Get the Real Exchange Rate with Wise</a></div>`;

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
        <span class="klook-deal-rating">⭐ 4.8 (20,000+ reviews)</span>
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
        <span class="klook-deal-rating">⭐ 4.7 (10,000+ reviews)</span>
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
        <span class="klook-deal-rating">⭐ 4.6 (5,000+ reviews)</span>
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

