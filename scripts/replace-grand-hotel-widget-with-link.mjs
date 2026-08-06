import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const post = posts.find((p) => p.slug === "the-grand-hotel");
if (!post) { console.error("Post not found"); process.exit(1); }
let content = post.content;

const hotelUrl = "https://www.klook.com/en-GB/hotels/detail/409425-the-grand-hotel/?aid=8733";

const oldWidget = `<ins class="klk-aff-widget"  data-adid="642062" data-lang="" data-currency="" data-cardH="126" data-padding="92" data-lgH="470" data-edgeValue="655" data-prod="static_widget" data-amount="1"><a href="//www.klook.com/">Klook.com</a></ins>`;

const newLink = `<blockquote class="wp-block-quote"><p><a href="${hotelUrl}" target="_blank" rel="noreferrer noopener">Check rates and availability for The Grand Hotel on Klook</a></p></blockquote>`;

if (!content.includes(oldWidget)) { console.error("Widget not found — aborting."); process.exit(1); }
content = content.replace(oldWidget, newLink);

post.content = content;
post.modified = "2026-08-06 18:00:00";

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log("Replaced the broken hotel widget with a direct Klook link.");
