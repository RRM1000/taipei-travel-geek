import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const idx = posts.findIndex((p) => p.slug === "taiwan-sim-cards");
const post = posts[idx];
let content = post.content;

// 1. Update the Chunghwa price table with the confirmed live Klook prices,
//    plus a tip about the 3/5/7-day flat-rate quirk.
const oldTable = `<table class="wp-block-table"><thead><tr bgcolor="#d6d6d6"><th>Length</th><th>Price (NT$)</th><th>Klook (NT$)</th><th>eSIM (NT$, Unlimited/day)</th><th>Comments</th></tr></thead><tbody><tr><td>3 days</td><td>300</td><td>280</td><td>148</td><td>NT$100 free voice + text</td></tr><tr><td>5 days</td><td>300</td><td>285</td><td>241</td><td>NT$50 free voice + text </td></tr><tr><td>7 days</td><td>500</td><td>470</td><td>331</td><td>NT$150 free voice + text </td></tr><tr><td>10 days</td><td>500</td><td>470</td><td>-</td><td>NT$100 free voice + text  </td></tr><tr><td>15 days</td><td>700</td><td>700</td><td>668</td><td>NT$250 free voice + text (regular) / NT$100 free voice + text (Klook)</td></tr><tr><td>30 days</td><td>1,000</td><td>980</td><td>1,309</td><td>NT$430 free voice + text   </td></tr></tbody></table>`;

if (!content.includes(oldTable)) {
  console.error("Old table not found — aborting table update.");
  process.exit(1);
}

const newTable = `<table class="wp-block-table"><thead><tr bgcolor="#d6d6d6"><th>Length</th><th>Price (NT$)</th><th>Klook (NT$)</th><th>Klook Free Calls</th><th>eSIM (NT$, Unlimited/day)</th></tr></thead><tbody><tr><td>3 days</td><td>300</td><td>276</td><td>NT$50</td><td>148</td></tr><tr><td>5 days</td><td>300</td><td>276</td><td>NT$100</td><td>241</td></tr><tr><td>7 days</td><td>500</td><td>276</td><td>NT$150</td><td>331</td></tr><tr><td>10 days</td><td>500</td><td>920</td><td>NT$200</td><td>-</td></tr><tr><td>15 days</td><td>700</td><td>1,104</td><td>NT$200</td><td>668</td></tr><tr><td>30 days</td><td>1,000</td><td>1,472</td><td>NT$200</td><td>1,309</td></tr></tbody></table>



<blockquote class="wp-block-quote"><p><strong>Klook tip:</strong> the 3, 5 and 7-day Klook Chunghwa SIMs are all the same price (NT$276). If you're staying anywhere from 3 to 7 days, book the 7-day option &ndash; you get more days and more free call credit for exactly the same price.</p></blockquote>`;

content = content.replace(oldTable, newTable);
console.log("Table updated with confirmed Klook prices.");

// 2. Add a "quick answer" summary box right before the table of contents.
const tocMarker = `<details class="article-toc-block">`;
if (!content.includes(tocMarker)) {
  console.error("TOC marker not found — aborting summary insert.");
  process.exit(1);
}

const quickSummary = `<blockquote class="wp-block-quote"><p><strong>Quick answer &ndash; the best way to get a SIM in Taiwan:</strong></p><p>If your phone supports <strong>eSIM</strong> (most iPhone XS+, Pixel 3+, Galaxy S20+), get one online before you fly &ndash; it's the cheapest and most convenient option for almost any trip length, installs in minutes via QR code, and you're connected the second you land. See the <a href="#eSIM">eSIM section</a>.</p><p>If you need a physical SIM (for a local phone number, or an incompatible device), pre-order a <strong>Chunghwa Telecom</strong> SIM through Klook and collect it at the airport &ndash; Chunghwa has the best network coverage in Taiwan, Klook is usually cheaper than walking up to the counter, and the booth stays open later than the others.</p><p>Either way, avoid buying in the city: prices are similar or higher, English support is patchy, and most city SIMs come with capped data instead of the unlimited plans sold at the airport.</p></blockquote>



`;

content = content.replace(tocMarker, quickSummary + tocMarker);
console.log("Quick summary added.");

post.content = content;
post.modified = "2026-08-05 11:15:00";

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log("Saved.");
