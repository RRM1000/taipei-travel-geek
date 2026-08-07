import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const posts = JSON.parse(fs.readFileSync(path.join(root, "content", "posts.json"), "utf8"));

// Keep in sync with `unlistedSlugs` in lib/content.ts - posts hidden from
// every on-site discovery path while pending a content refresh.
const unlistedSlugs = new Set(["taipei-annual-events"]);

const plainText = (html) => html.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
const index = posts.filter((post) => !unlistedSlugs.has(post.slug)).map((post) => ({
  slug: post.slug, title: post.title, excerpt: post.excerpt || plainText(post.content).slice(0, 220), image: post.featuredImage,
  categories: post.categories.map((category) => category.name),
  tags: post.tags.map((tag) => tag.name),
  searchText: `${post.title} ${post.excerpt} ${post.categories.map((category) => category.name).join(" ")} ${post.tags.map((tag) => tag.name).join(" ")} ${plainText(post.content).slice(0, 1400)}`.toLowerCase(),
}));
fs.writeFileSync(path.join(root, "public", "search-index.json"), `${JSON.stringify(index)}\n`);
console.log(`Wrote ${index.length} search entries.`);
