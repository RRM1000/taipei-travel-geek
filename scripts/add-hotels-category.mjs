// Bring back the Hotels category. It was retired (redirected to Areas) when it
// held one or two posts; with the where-to-stay guide and the three area
// hotel guides it now has four, and a /category/hotels archive gives them a
// home in the Explore menu. Areas stays on each post as well.

import fs from "fs";
import path from "path";

const HOTELS = { name: "Hotels", slug: "hotels" };
const SLUGS = [
  "best-areas-and-hotels-to-stay",
  "hotels-near-taipei-main-station",
  "hotels-near-ximending",
  "hotels-near-taipei-101",
];
const fail = (m) => { console.error(`${m} - aborting, nothing written.`); process.exit(1); };

const catPath = path.resolve("content/categories.json");
const categories = JSON.parse(fs.readFileSync(catPath, "utf8"));
if (categories.some((c) => c.slug === HOTELS.slug)) fail("Hotels category already exists");
categories.push(HOTELS);
categories.sort((a, b) => a.name.localeCompare(b.name));

const postsPath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(postsPath, "utf8"));
for (const slug of SLUGS) {
  const post = posts.find((p) => p.slug === slug);
  if (!post) fail(`/${slug} not found`);
  if (post.categories.some((c) => c.slug === HOTELS.slug)) fail(`/${slug} already in Hotels`);
  post.categories.push({ ...HOTELS });
}

fs.writeFileSync(catPath, JSON.stringify(categories, null, 1) + "\n");
fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2) + "\n");
console.log(`Hotels category added to ${SLUGS.length} posts`);
