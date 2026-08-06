import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const post = posts.find((p) => p.slug === "best-areas-and-hotels-to-stay");

const anchor = `<details class="article-toc-block">`;
if (!post.content.includes(anchor)) {
  console.error("Anchor not found");
  process.exit(1);
}

const widget = `<div class="hotel-deals-widget">
<ins class="klk-aff-widget" data-aid="8733" data-city_id="19" data-country_id="1014" data-tag_id="0" data-currency="" data-lang="" data-label1="" data-label2="" data-label3="" data-prod="deals_widget" data-total="2"><a href="//www.klook.com/">Klook.com</a></ins>
</div>



`;

post.content = post.content.replace(anchor, widget + anchor);
post.modified = "2026-08-05 18:00:00";

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log("2-hotel deals widget added near the top of best-areas-and-hotels-to-stay.");
