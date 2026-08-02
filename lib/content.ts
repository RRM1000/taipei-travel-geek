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
