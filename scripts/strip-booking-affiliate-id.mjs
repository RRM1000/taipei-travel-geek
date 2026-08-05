import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const postIndex = posts.findIndex((p) => p.slug === "best-areas-and-hotels-to-stay");

if (postIndex === -1) {
  console.error("Post best-areas-and-hotels-to-stay not found!");
  process.exit(1);
}

const post = posts[postIndex];
const before = (post.content.match(/aid=7970190/gi) || []).length;

// Remove the dead affiliate id param. Handles both "?aid=..&amp;" and a
// trailing "&amp;aid=.." just in case, without touching the rest of the query string.
post.content = post.content
  .replace(/([?&])aid=7970190&amp;/gi, "$1")
  .replace(/[?&]aid=7970190\b/gi, "");

const after = (post.content.match(/aid=7970190/gi) || []).length;
const remainingBookingLinks = (post.content.match(/booking\.com/gi) || []).length;

console.log(`aid=7970190 occurrences: ${before} -> ${after}`);
console.log(`booking.com mentions still present (untouched, links still live): ${remainingBookingLinks}`);

post.modified = "2026-08-05 00:00:00";
fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log("Done.");
