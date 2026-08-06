import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const post = posts.find((p) => p.slug === "taipei-101");
if (!post) { console.error("Post not found"); process.exit(1); }
let content = post.content;

const pricesIdx = content.indexOf('id="Prices"');
if (pricesIdx === -1) { console.error("Prices heading not found"); process.exit(1); }

const oldWidget = `<ins class="klk-aff-widget" data-adid="658097" data-lang="" data-currency="" data-cardh="126" data-padding="92" data-lgh="470" data-edgevalue="655" data-prod="static_widget" data-amount="3"><a href="//www.klook.com/">Klook.com</a></ins>`;
const newWidget = `<ins class="klk-aff-widget" data-adid="658097" data-lang="" data-currency="" data-cardh="126" data-padding="92" data-lgh="470" data-edgevalue="655" data-prod="static_widget" data-amount="3"><a href="//www.klook.com/">Klook.com</a></ins>`;

// Find the specific occurrence of the widget that comes after the Prices heading (there's an
// identical-looking one earlier in the post, in the Fun Pass section, which must stay untouched).
const widgetIdxAfterPrices = content.indexOf(oldWidget, pricesIdx);
if (widgetIdxAfterPrices === -1) { console.error("Widget after Prices not found"); process.exit(1); }

content =
  content.slice(0, widgetIdxAfterPrices) +
  newWidget +
  content.slice(widgetIdxAfterPrices + oldWidget.length);

post.content = content;
post.modified = "2026-08-06 15:10:00";

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log("Updated the Klook widget below the Prices table on taipei-101.");
