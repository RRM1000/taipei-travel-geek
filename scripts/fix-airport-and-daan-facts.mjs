// Corrections from the Taoyuan Airport and Daan hotel research
// (data/research/hotels-near-taoyuan-airport.md and hotels-in-daan.md,
// section 6 of each), approved by the owner.
//
// Airport MRT guide: taxi fare is the airport taxi fleet's own NT$1,200-1,900
// estimate (so it matches the new airport hotels page); commuter trains take
// about 50 minutes and stop at 22 stations.
// Daan: where-to-stay table walks and prices; SOGO Dunhua closed on 14 Dec
// 2025; Coffee Lover's Planet moved to Far Eastern Garden City by the Taipei
// Dome in 2026; Daan's MRT lines include the Green line.
//
// Left for the owner: Madison's "floor-to-ceiling windows and rainfall
// showers" and Eclat's "Taiwanese-owned" (unconfirmed but may be first-hand),
// and the coffee-lovers-planet post's nearest MRT exit (not yet verified).

import fs from "fs";
import path from "path";

const MODIFIED = "2026-09-29 12:00:00";
const CLP_LI = `\n <li><strong><a href="/coffee-lovers-planet">Coffee Lover's Planet</a></strong> – serious single-origin coffee and gourmet sandwiches.</li>`;

const EDITS = {
  "taoyuan-airport-mrt": [
    ["Taxi/Uber (NT$1,000-1,200, ~45 min)", "Taxi/Uber (about NT$1,200-1,900, ~45 min)"],
    ["<td>NT$1,000 - 1,200</td>", "<td>NT$1,200 - 1,900</td>"],
    ["between <strong>NT$1,000&ndash;1,200</strong>", "between <strong>NT$1,200&ndash;1,900</strong> plus tolls"],
    ["about an hour instead of 35-39 minutes", "about 50 minutes instead of 35-39 minutes"],
    ["taking around an hour", "taking about 50 minutes to the airport"],
    ["The commuter train stops at all 21 stations, which is why it takes an hour",
     "The commuter train stops at all 22 stations, which is why it takes about 50 minutes to the airport"],
    ["handy if you're connecting to the high speed rail rather than going into Taipei.",
     "handy if you're connecting to the high speed rail rather than going into Taipei, though only three morning trains from Taipei (06:15, 07:00 and 08:00) run this way."],
  ],
  "best-areas-and-hotels-to-stay": [
    ["<td>NT$6,700</td><td>6 mins (Brown)</td>", "<td>NT$9,000</td><td>9 mins (Brown)</td>"],
    ["<td>NT$6,500</td><td>5 mins (Red)</td>", "<td>NT$8,000</td><td>7 mins (Red)</td>"],
    ["<td>NT$8,000</td><td>6 mins (Red)</td>", "<td>NT$5,000</td><td>7 mins (Red)</td>"],
    ["<td>NT$8,000</td><td>2 mins (Blue)</td>", "<td>NT$11,000</td><td>2 mins (Blue/Brown)</td>"],
    ["<td>NT$4,000</td><td>5 mins (Red)</td>", "<td>NT$4,300</td><td>4 mins (Red/Brown)</td>"],
  ],
  "taipei-east-district-dongqu": [
    ["There are also three large SOGO malls in the district if you prefer something more high-end.",
     "There are also two large SOGO malls in the district, Zhongxiao and Fuxing, if you prefer something more high-end (the Dunhua store closed in December 2025)."],
    [CLP_LI, ""],
  ],
  "where-to-shop-in-taipei": [
    ["The district also has 3 SOGO malls and an underground mall", "The district also has 2 SOGO malls and an underground mall"],
  ],
  "taiwan-tourist-tax-refund": [
    ["<tr><td>SOGO</td><td>Dunhua</td><td>4</td></tr>", ""],
  ],
  "coffee-lovers-planet": [
    ["Set in the basement of one of the SOGO shopping malls in Taipei's East District, it's also",
     "Now at the Far Eastern Garden City mall by the Taipei Dome (it moved from SOGO Dunhua in 2026), it's also"],
  ],
  "best-coffee-shops-in-taipei": [
    ["Serious single-origin coffee tucked into the basement of a SOGO shopping mall - an unglamorous location for a genuinely serious cup, plus",
     "Serious single-origin coffee, now in the Far Eastern Garden City mall by the Taipei Dome, plus"],
  ],
  "best-districts-and-areas": [
    ["<td>Restaurants, bars, Yongkang Street, the big park</td><td>Red, Blue, Brown, Orange</td>",
     "<td>Restaurants, bars, Yongkang Street, the big park</td><td>Red, Blue, Brown, Orange, Green</td>"],
    ["<td><strong>MRT Lines</strong></td><td>Red, Blue, Brown, Orange</td>",
     "<td><strong>MRT Lines</strong></td><td>Red, Blue, Brown, Orange, Green</td>"],
  ],
};

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const fail = (m) => { console.error(`${m} - aborting, nothing written.`); process.exit(1); };

for (const [slug, edits] of Object.entries(EDITS)) {
  const post = posts.find((p) => p.slug === slug);
  if (!post) fail(`/${slug} not found`);
  for (const [from, to] of edits) {
    const n = post.content.split(from).length - 1;
    if (n !== 1) fail(`/${slug}: "${from.slice(0, 50)}..." matched ${n} times`);
    post.content = post.content.replace(from, () => to);
  }
  post.modified = MODIFIED;
  console.log(`/${slug}: ${edits.length} fix${edits.length > 1 ? "es" : ""}`);
}

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2) + "\n");
