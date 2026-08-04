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

export const posts = importedPosts as ContentPost[];
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
  const sectionPattern = /(<h([2-5])\b[^>]*>[\s\S]*?<\/h\2>)([\s\S]*?)(?=<h[2-5]\b|$)/gi;
  const sections = [...content.matchAll(sectionPattern)];
  const linkedChoices = sections.filter((section) => relatedGuideForSection(section[3], sourceSlug));

  if (linkedChoices.length < 2) return content;

  return content.replace(sectionPattern, (match, heading: string, _level: string, section: string) => {
    const related = relatedGuideForSection(section, sourceSlug);
    if (!related || /choice-guide-image|<figure\b|<img\b/i.test(section)) return match;

    const image = `<figure class="choice-guide-image"><a href="/${escapeHtml(related.slug)}"><img src="${escapeHtml(related.featuredImage || "")}" alt="" loading="lazy"/></a></figure>`;
    return `${heading}${image}${section}`;
  });
}

export function getPostsByCategory(category: string) {
  return posts.filter((post) => post.categories.some((item) => item.slug === category));
}

export function getPostsByTag(tag: string) {
  return posts.filter((post) => post.tags.some((item) => item.slug === tag));
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

        // Avoid cropping maps or plans
        const isMap = src.toLowerCase().includes("map") || alt.toLowerCase().includes("map") || src.toLowerCase().includes("kiln");
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

