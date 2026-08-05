import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const idx = posts.findIndex((p) => p.slug === "taiwan-sim-cards");
const post = posts[idx];

const oldTable = `<table class="wp-block-table"><thead><tr bgcolor="#d6d6d6"><th>Length</th><th>Price (NT$)</th><th>Klook (NT$)</th><th>Comments</th></tr></thead><tbody><tr><td>3 days</td><td>300</td><td>280</td><td>NT$100 free voice + text</td></tr><tr><td>5 days</td><td>300</td><td>285</td><td>NT$50 free voice + text </td></tr><tr><td>7 days</td><td>500</td><td>470</td><td>NT$150 free voice + text </td></tr><tr><td>10 days</td><td>500</td><td>470</td><td>NT$100 free voice + text  </td></tr><tr><td>15 days</td><td>700</td><td>-</td><td>NT$250 free voice + text   </td></tr><tr><td>15 days</td><td>-</td><td>700 </td><td>NT$100 free voice + text  </td></tr><tr><td>30 days</td><td>1,000</td><td>980</td><td>NT$430 free voice + text   </td></tr></tbody></table>`;

if (!post.content.includes(oldTable)) {
  console.error("Table not found — aborting without changes.");
  process.exit(1);
}

// - Merged the two duplicate "15 days" rows (a leftover data glitch from the
//   original migration) into one, keeping both original comments rather than
//   guessing which is current.
// - Added an eSIM (Unlimited/day) column using the verified figures from the
//   eSIM section above. No 10-day data point was given, so that cell is left
//   as "-" rather than guessed/interpolated.
// - Price (NT$) / Klook (NT$) figures intentionally left unchanged per request.
const newTable = `<table class="wp-block-table"><thead><tr bgcolor="#d6d6d6"><th>Length</th><th>Price (NT$)</th><th>Klook (NT$)</th><th>eSIM (NT$, Unlimited/day)</th><th>Comments</th></tr></thead><tbody><tr><td>3 days</td><td>300</td><td>280</td><td>148</td><td>NT$100 free voice + text</td></tr><tr><td>5 days</td><td>300</td><td>285</td><td>241</td><td>NT$50 free voice + text </td></tr><tr><td>7 days</td><td>500</td><td>470</td><td>331</td><td>NT$150 free voice + text </td></tr><tr><td>10 days</td><td>500</td><td>470</td><td>-</td><td>NT$100 free voice + text  </td></tr><tr><td>15 days</td><td>700</td><td>700</td><td>668</td><td>NT$250 free voice + text (regular) / NT$100 free voice + text (Klook)</td></tr><tr><td>30 days</td><td>1,000</td><td>980</td><td>1,309</td><td>NT$430 free voice + text   </td></tr></tbody></table>



<p><em>eSIM figures are for the Unlimited, Data-per-day plan and are data-only (no free voice/text). See the <a href="#eSIM">eSIM Options section above</a> for how the pricing works and how to activate it.</em></p>



<div class="article-klook-cta">
  <a href="https://www.klook.com/en-US/activity/132311-esim-taiwan-with-high-speed-and-stable-internet-connection/?aid=8733" target="_blank" rel="noopener noreferrer" aria-label="Order Taiwan eSIM on Klook">📶 Skip the Counter &ndash; Order a Chunghwa eSIM on Klook</a>
</div>`;

post.content = post.content.replace(oldTable, newTable);
post.modified = "2026-08-05 10:45:00";

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log("Chunghwa price table updated with eSIM column + CTA.");
