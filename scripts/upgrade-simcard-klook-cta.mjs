import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const postIndex = posts.findIndex((p) => p.slug === "taiwan-sim-cards");

if (postIndex === -1) {
  console.error("Post taiwan-sim-cards not found!");
  process.exit(1);
}

const post = posts[postIndex];

const oldBlock =
  '<blockquote class="wp-block-quote"><p><strong><a rel="noreferrer noopener" aria-label=" (opens in a new tab)" href="https://www.klook.com/en-GB/activity/95592-4g-5g-sim-taiwan/?aid=8733" target="_blank">Click here to get a Taiwan Mobile SIM from Klook</a></strong></p></blockquote>';

const newBlock =
  '<div class="article-klook-cta"><a href="https://www.klook.com/en-GB/activity/95592-4g-5g-sim-taiwan/?aid=8733" target="_blank" rel="noopener noreferrer"><span>📶</span> Pre-Order a Taiwan SIM or eSIM on Klook</a></div>';

if (!post.content.includes(oldBlock)) {
  console.error("Expected block not found — aborting without changes.");
  process.exit(1);
}

post.content = post.content.replace(oldBlock, newBlock);
post.modified = "2026-08-05 00:05:00";

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log("Upgraded taiwan-sim-cards Klook CTA to styled button.");
