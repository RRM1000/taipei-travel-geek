import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const idx = posts.findIndex((p) => p.slug === "taipei-guide");
const post = posts[idx];

const anchor = `<p>I would recommend visiting these areas, found within central Taipei and to the north:</p>`;

if (!post.content.includes(anchor)) {
  console.error("Anchor paragraph not found — aborting.");
  process.exit(1);
}

const newParagraph = `${anchor}



<p>For a full breakdown of every district in Taipei, not just these highlights, <a href="/best-districts-and-areas">I have a dedicated guide to every area and what it's known for</a>.</p>`;

post.content = post.content.replace(anchor, newParagraph);
post.modified = "2026-08-05 13:15:00";

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log("Link to best-districts-and-areas added to Areas section.");
