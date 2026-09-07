// Two FAQ entries on the Ximending guide, plus one factual fix.
//
// Search Console shows the page taking 12,149 impressions and 55 clicks over
// 28 days, and Google's People-also-ask box for "ximending" asks four
// questions. The guide already answered two of them. It said nothing about
// shopping - despite "ximending shopping district" sitting at position 8.3 -
// and nothing about Taipei 101, which people evidently assume is walkable.
//
// The existing "how do I get there" answer put Ximen two MRT stops from
// Taipei Main Station. It is one, on the blue line, which is also the first
// leg of the Taipei 101 route - so the two answers would have contradicted
// each other. Corrected here rather than left to sit under a new entry
// repeating the right number.

import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const post = posts.find((p) => p.slug === "ximending");

if (!post) {
  console.error("Post ximending not found!");
  process.exit(1);
}

let content = post.content;
const before = content;

// --- 1. Shopping, placed after the food answer so the two sit together ----
const foodAnswer =
  "<p>Very. It's one of the strongest areas in the city for street snacks and cheap sit-down meals, and unlike a night market it runs all day.</p>";

const shoppingFaq = `

<h3>Is Ximending good for shopping, and what's worth buying?</h3>

<p>Good for browsing rather than bargains. The main streets are chains you'll recognise from home &ndash; the shops worth finding are down the alleys, where it's small fashion labels, gift shops and accessory stalls. For things to take home, the reliable stops are the four-storey Pop Mart for blind-box collectibles, Don Don Donki for Japanese snacks and cosmetics at any hour, and the themed 7-Elevens. There's also an underground mall running from the MRT station full of K-pop and anime shops. See <a href="/where-to-shop-in-taipei">where to shop in Taipei</a> for how it compares with the rest of the city.</p>`;

if (!content.includes(foodAnswer)) {
  console.error("Food answer not found - the FAQ block has changed, aborting.");
  process.exit(1);
}
content = content.replace(foodAnswer, foodAnswer + shoppingFaq);

// --- 2. Taipei 101 proximity, at the end beside the other nearby answer ---
const nearbyAnswer =
  '<p><a href="/longshan-temple">Longshan Temple</a> is one MRT stop away, <a href="/bopiliao-historical-block">Bopiliao Historical Block</a> is a short walk, and <a href="/huaxi-street-night-market">Huaxi Street Night Market</a> is close by &ndash; enough for a full day in Wanhua.</p>';

const taipei101Faq = `

<h3>Is Ximending near Taipei 101?</h3>

<p>No &ndash; they sit at opposite ends of central Taipei, about 20 minutes apart. Take the blue line one stop from Ximen to Taipei Main Station, change to the red line, and stay on it to <a href="/taipei-101">Taipei 101</a>/World Trade Center. They make a reasonable two halves of a day, but it is not a walk.</p>`;

if (!content.includes(nearbyAnswer)) {
  console.error("Nearby answer not found - the FAQ block has changed, aborting.");
  process.exit(1);
}
content = content.replace(nearbyAnswer, nearbyAnswer + taipei101Faq);

// --- 3. Ximen is one stop from Taipei Main Station, not two ---------------
const wrongStops = "It's two stops from Taipei Main Station.";
const rightStops = "It's one stop from Taipei Main Station on the blue line.";

if (!content.includes(wrongStops)) {
  console.error("Stop-count sentence not found - check it by hand, aborting.");
  process.exit(1);
}
content = content.replace(wrongStops, rightStops);

if (content === before) {
  console.error("Nothing changed - aborting rather than bumping the date.");
  process.exit(1);
}

post.content = content;
post.modified = "2026-09-07 09:00:00";

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2) + "\n");

console.log("Ximending guide updated:");
console.log("  + FAQ: Is Ximending good for shopping, and what's worth buying?");
console.log("  + FAQ: Is Ximending near Taipei 101?");
console.log("  ~ Fixed: Taipei Main Station is one stop from Ximen, not two");
console.log(`  content ${before.length} -> ${content.length} chars`);
