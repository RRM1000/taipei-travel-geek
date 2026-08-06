import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const post = posts.find((p) => p.slug === "huashan-1914-creative-park");
if (!post) { console.error("Post not found"); process.exit(1); }
let content = post.content;

const oldWidget = `<ins class="klk-aff-widget" data-adid="658162" data-lang="" data-currency="" data-cardh="126" data-padding="92" data-lgh="470" data-edgevalue="655" data-prod="static_widget" data-amount="1"><a href="//www.klook.com/">Klook.com</a></ins>

`;
if (!content.includes(oldWidget)) { console.error("Widget not found — aborting."); process.exit(1); }
content = content.replace(oldWidget, "");

post.content = content;
post.modified = "2026-08-06 18:30:00";

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log("Removed the dead 658162 widget from huashan-1914-creative-park.");
