// Two follow-ups from the Ximending hotels research
// (data/research/hotels-near-ximending.md).
//
// WHERE-TO-STAY #Wanhua. The research checked each hotel in this section
// against the hotels' own sites and November weekday prices. Corrected:
// the "Three" link went to Cho Hotel 1's page; Cho 1 and 3 face each other
// across the street rather than sitting next door, neither has singles, and
// only Cho 1 has quads; Energy Inn's cheap rooms are small doubles, not
// singles; Papa Whale is almost entirely windowless; walking times were 1-3
// minutes short; and the prices had moved.
//
// XIMENDING PHOTOS. The owner's five Ximending picks already have photos on
// the where-to-stay page (scripts/add-hotel-photos.mjs). The same files go on
// the new Ximending page, after the first paragraph under each hotel's
// heading.

import fs from "fs";
import path from "path";

const MODIFIED = "2026-09-28 12:00:00";
const MEDIA_URL = "/media/2026/09/hotels";
const fail = (m) => { console.error(`${m} - aborting, nothing written.`); process.exit(1); };

const WANHUA = [
  ['<td>NT$3,000</td><td>8 mins (Green/Blue)</td>', '<td>From NT$2,800</td><td>10 mins (Green/Blue)</td>'],
  ['<td>NT$3,000</td><td>5 mins (Green/Blue)</td>', '<td>From NT$3,500</td><td>6 mins (Green/Blue)</td>'],
  ['<td>NT$2,000 room<br>NT$600 bunk</td><td>6 mins (Green/Blue)</td>', '<td>From NT$3,000 room<br>NT$850&ndash;950 bunk</td><td>8 mins (Green/Blue)</td>'],
  ['rel="noreferrer noopener">One</a> <a href="https://www.klook.com/en-GB/hotels/detail/269163-cho-hotel/?aid=8733"',
   'rel="noreferrer noopener">One</a> <a href="https://www.klook.com/en-GB/hotels/detail/285820-cho-hotel-3/?aid=8733"'],
  ['<td>NT$3,000</td><td>4 mins (Green/Blue)</td>', '<td>From NT$3,600</td><td>6 mins (Green/Blue)</td>'],
  ['<td>NT$900 bunk</td>', '<td>NT$400&ndash;700 bunk (more at weekends)</td>'],
  ['cosy rooms, many windowless.', 'cosy rooms, almost all of them windowless.'],
  ['cheap windowless singles, rooms with Japanese-style tubs', 'small windowless doubles at the cheap end, rooms with Japanese-style tubs'],
  ['sit next door to one another and between them cover singles, deluxe rooms with tubs and quadruples.',
   "face each other across the street. Between them you get doubles, rooms with a tub (Cho 1's Executive Double or Cho 3's Deluxe Double) and, at Cho 1 only, quadruples."],
];

// folder in data/hotel-photos.json -> data-hotel key on the Ximending page
const XIMENDING_PHOTOS = {
  "cho-hotel-ximen": "cho-hotel",
  "energy-inn-taipei": "energy-inn",
  "hotel-papa-whale": "papa-whale",
  "meander-taipei-hostel": "meander-taipei",
  "dan-hostel-taipei": "dan-hostel",
};

const esc = (s) => s.replace(/&(?!amp;|ndash;|#)/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
function gallery(photos) {
  const fig = (ph, inGrid) =>
    `<figure class="wp-block-image"${inGrid ? ' style="margin: 0;"' : ""}>\n  <img width="${ph.width}" height="${ph.height}" src="${MEDIA_URL}/${ph.file}" alt="${esc(ph.alt)}" loading="lazy"${inGrid ? ' style="width: 100%; height: 260px; object-fit: cover; border-radius: 8px;"' : ""} />\n  <figcaption style="text-align: center; font-size: 0.875rem; color: #666; margin-top: 0.5rem;">${esc(ph.caption)}</figcaption>\n </figure>`;
  if (photos.length === 1) return `\n\n${fig(photos[0], false)}`;
  return `\n\n<div class="wp-block-gallery columns-2" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin: 1.5rem 0;">\n ${photos.map((p) => fig(p, true)).join("\n ")}\n</div>`;
}

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const picks = JSON.parse(fs.readFileSync("data/hotel-photos.json", "utf8"))["best-areas-and-hotels-to-stay"];

const hub = posts.find((p) => p.slug === "best-areas-and-hotels-to-stay");
if (!hub) fail("where-to-stay post not found");
for (const [from, to] of WANHUA) {
  const n = hub.content.split(from).length - 1;
  if (n !== 1) fail(`"${from.slice(0, 50)}..." matched ${n} times`);
  hub.content = hub.content.replace(from, () => to);
}
hub.modified = MODIFIED;

const xim = posts.find((p) => p.slug === "hotels-near-ximending");
if (!xim) fail("Ximending hotels post not found");
if (xim.content.includes(MEDIA_URL)) fail("Ximending page already has hotel photos");
const spots = [];
for (const [folder, key] of Object.entries(XIMENDING_PHOTOS)) {
  const photos = (picks[folder] || []).slice(0, 2);
  if (!photos.length) continue;
  for (const ph of photos) if (!fs.existsSync(path.join("public", MEDIA_URL, ph.file))) fail(`missing ${ph.file}`);
  const hits = [...xim.content.matchAll(new RegExp(`^<h3>[^\\n]*data-hotel="${key}"`, "gm"))];
  if (hits.length !== 1) fail(`heading for ${key} matched ${hits.length} times`);
  const end = xim.content.indexOf("</p>", xim.content.indexOf("<p>", hits[0].index));
  spots.push([end + 4, gallery(photos), photos.length]);
}
spots.sort((a, b) => b[0] - a[0]);
let n = 0;
for (const [at, html, k] of spots) { xim.content = xim.content.slice(0, at) + html + xim.content.slice(at); n += k; }
xim.modified = MODIFIED;

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2) + "\n");
console.log(`#Wanhua: ${WANHUA.length} fixes; Ximending page: ${n} photos across ${spots.length} hotels`);
