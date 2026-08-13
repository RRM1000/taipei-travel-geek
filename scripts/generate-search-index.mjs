import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const posts = JSON.parse(fs.readFileSync(path.join(root, "content", "posts.json"), "utf8"));

// Keep in sync with `unlistedSlugs` in lib/content.ts - posts hidden from
// every on-site discovery path while pending a content refresh. Currently
// empty there, so nothing is excluded here either: this list had drifted and
// was hiding taipei-annual-events from search only, which was unintended.
const unlistedSlugs = new Set([]);

const plainText = (html) => html.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
// Closed venues stay searchable - someone looking for a place by name should
// find out it has shut - but they must not outrank live guides. Keyed off the
// "(Permanently Closed)" title suffix rather than the closure-notice CSS
// class, because that class is also used for non-closure warnings (the Taroko
// earthquake access notice, an expired giveaway).
const isClosed = (post) => /\(permanently closed\)/i.test(post.title || "");
const index = posts.filter((post) => !unlistedSlugs.has(post.slug)).map((post) => ({
  slug: post.slug, title: post.title, excerpt: post.excerpt || plainText(post.content).slice(0, 220), image: post.featuredImage,
  categories: post.categories.map((category) => category.name),
  tags: post.tags.map((tag) => tag.name),
  closed: isClosed(post),
  searchText: `${post.title} ${post.excerpt} ${post.categories.map((category) => category.name).join(" ")} ${post.tags.map((tag) => tag.name).join(" ")} ${plainText(post.content).slice(0, 1400)}`.toLowerCase(),
}));
fs.writeFileSync(path.join(root, "public", "search-index.json"), `${JSON.stringify(index)}\n`);
console.log(`Wrote ${index.length} search entries.`);
