import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const post = posts.find((p) => p.slug === "taipei-fun-pass");
if (!post) { console.error("Post not found"); process.exit(1); }
let content = post.content;

// 1. Remove the TOC entry
const oldToc = `<li><a href="#Klook">Klook Pass Taipei</a></li>`;
if (!content.includes(oldToc)) { console.error("TOC entry not found — aborting."); process.exit(1); }
content = content.replace(oldToc, "");

// 2. Remove the entire "Klook Pass Taipei" section - it's the last section in the
// post, so this removes everything from its leading separator to the end of content.
const sectionStart = content.indexOf('<h2 id="Klook">');
if (sectionStart === -1) { console.error("Klook Pass Taipei section not found — aborting."); process.exit(1); }
// Back up to the <hr> that leads into this section, so we don't leave a dangling divider.
const hrStart = content.lastIndexOf("<hr", sectionStart);
if (hrStart === -1) { console.error("Leading <hr> not found — aborting."); process.exit(1); }
content = content.slice(0, hrStart).trimEnd();

post.content = content;
post.modified = "2026-08-06 18:20:00";

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log("Removed the Klook Pass Taipei section and its TOC entry from taipei-fun-pass.");
