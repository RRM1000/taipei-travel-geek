// Adds up to two photos per hotel to the where-to-stay guide and the hotels
// near Taipei Main Station page - a room, or a room and its bathroom, where
// one was available. The picks (file, size, alt, caption) live in
// data/hotel-photos.json; the source images sit in
// scratchpad/downloaded-photos/<page>/<hotel>/ and are copied into
// public/media/2026/09/hotels/.
//
// Each hotel's photos go straight after the paragraph that introduces it, so
// the picture sits next to the description rather than in a gallery at the
// end. Aborts without writing if any anchor is missing or matches twice, or
// if the photos are already in.

import fs from "fs";
import path from "path";

const MODIFIED = "2026-09-28 12:00:00";
const MEDIA_DIR = "public/media/2026/09/hotels";
const MEDIA_URL = "/media/2026/09/hotels";
const SRC_DIR = "scratchpad/downloaded-photos";

// folder -> exact link text of the hotel's first descriptive paragraph
const WHERE_TO_STAY = {
  "roaders-plus": "Roaders Plus",
  "cityinn-hotel": "CityInn 1",
  "taiwan-youth-hostel-capsule-hotel": "Youth Hostel &amp; Capsule Hotel",
  "star-hostel": "Star Hostel",
  "grand-hyatt-taipei": "Grand Hyatt Taipei",
  "w-taipei": "W Taipei",
  "humble-house-taipei": "Humble House",
  "home-hotel-xinyi": "Home Hotel",
  "madison-taipei": "Madison Taipei",
  "hotel-eclat-taipei": "Hotel Eclat",
  "kimpton-da-an-hotel": "Kimpton Da An",
  "shangri-la-far-eastern-taipei": "Shangri-La Far Eastern",
  "chez-nous-hotel-taipei": "Chez Nous",
  "okura-prestige-taipei": "Okura Prestige",
  "regent-taipei": "Regent Taipei",
  "gloria-residence-taipei": "Gloria Residence",
  "tango-hotel-taipei-changan": "Tango Changan",
  "goldinn-hotel-taipei": "Goldinn Hotel",
  "hotel-papa-whale": "Papa Whale",
  "energy-inn-taipei": "Energy Inn",
  "meander-taipei-hostel": "Meander Taipei",
  "cho-hotel-ximen": "Cho Hotel 1 and 3",
  "dan-hostel-taipei": "Dan Hostel",
  "capella-taipei": "Capella Taipei",
  "mandarin-oriental-taipei": "Mandarin Oriental",
  "eslite-hotel-taipei": "Eslite Hotel",
  "tango-hotel-taipei-fuhsing": "Tango Fuhsing",
  "artree-hotel-taipei": "arTree Hotel",
  "grand-view-resort-beitou": "Grand View Resort Beitou",
  "spring-city-resort-beitou": "Spring City Resort",
  "hotel-indigo-taipei-north": "Hotel Indigo Taipei North",
  "the-grand-hotel-taipei": "The Grand Hotel",
  "hotel-cham-cham-taipei": "Hotel Cham Cham",
  "volando-urai-spring-spa-resort": "Volando Urai Spring Spa &amp; Resort",
};

// folder -> [photo folder page, anchor]. An h3 anchor places the photos after
// the first paragraph under that heading.
const MAIN_STATION = {
  "palais-de-chine": ["hotels-near-taipei-main-station", { h3: "palais-de-chine" }],
  "caesar-park-hotel": ["hotels-near-taipei-main-station", { h3: "caesar-park" }],
  "cosmos-hotel": ["hotels-near-taipei-main-station", { h3: "cosmos" }],
  "hotel-resonance": ["hotels-near-taipei-main-station", { h3text: "One stop east: Hotel Resonance and the Sheraton" }],
  "sheraton-grand-taipei": ["hotels-near-taipei-main-station", { h3text: "One stop east: Hotel Resonance and the Sheraton" }],
  "citizenm-taipei-north-gate": ["hotels-near-taipei-main-station", { h3: "citizenm-north-gate" }],
  "roaders-plus": ["best-areas-and-hotels-to-stay", { h3: "roaders-plus" }],
  "cityinn-hotel": ["best-areas-and-hotels-to-stay", { h3text: "CityInn Hotel" }],
  "hotel-relax-iii": ["hotels-near-taipei-main-station", { h3: "hotel-relax-3" }],
  "star-hostel": ["best-areas-and-hotels-to-stay", { h3: "star-hostel" }],
  "meander-1948": ["hotels-near-taipei-main-station", { h3: "meander-1948" }],
  "owlstay-flip-flop-hostel-garden": ["hotels-near-taipei-main-station", { h3: "flip-flop-garden" }],
  "taiwan-youth-hostel-capsule-hotel": ["best-areas-and-hotels-to-stay", { h3: "taiwan-youth-hostel" }],
};

const fail = (m) => { console.error(`${m} - aborting, nothing written.`); process.exit(1); };
const esc = (s) => s.replace(/&(?!amp;|ndash;|#)/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

const picks = JSON.parse(fs.readFileSync("data/hotel-photos.json", "utf8"));
const copies = new Map(); // dest -> src

function figures(page, folder) {
  const list = (picks[page]?.[folder] || []).slice(0, 2);
  return list.map((ph) => {
    const src = path.join(SRC_DIR, page, folder, ph.file);
    if (!fs.existsSync(src)) fail(`missing ${src}`);
    return { ...ph, src };
  });
}

function gallery(photos) {
  if (!photos.length) return "";
  for (const ph of photos) copies.set(path.join(MEDIA_DIR, ph.file), ph.src);
  const fig = (ph, inGrid) =>
    `<figure class="wp-block-image"${inGrid ? ' style="margin: 0;"' : ""}>\n  <img width="${ph.width}" height="${ph.height}" src="${MEDIA_URL}/${ph.file}" alt="${esc(ph.alt)}" loading="lazy"${inGrid ? ' style="width: 100%; height: 260px; object-fit: cover; border-radius: 8px;"' : ""} />\n  <figcaption style="text-align: center; font-size: 0.875rem; color: #666; margin-top: 0.5rem;">${esc(ph.caption)}</figcaption>\n </figure>`;
  if (photos.length === 1) return `\n\n${fig(photos[0], false)}`;
  return `\n\n<div class="wp-block-gallery columns-2" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin: 1.5rem 0;">\n ${photos.map((p) => fig(p, true)).join("\n ")}\n</div>`;
}

// Insert html after the end of the paragraph that starts at or before `at`.
function insertAfterParagraph(content, at, html) {
  const end = content.indexOf("</p>", at);
  if (end < 0) fail("no closing </p>");
  return content.slice(0, end + 4) + html + content.slice(end + 4);
}

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
let added = 0;

// Where to stay: work from the bottom up so earlier offsets stay valid.
{
  const post = posts.find((p) => p.slug === "best-areas-and-hotels-to-stay");
  if (!post) fail("where-to-stay post not found");
  if (post.content.includes(MEDIA_URL)) fail("where-to-stay already has hotel photos");
  const spots = [];
  for (const [folder, name] of Object.entries(WHERE_TO_STAY)) {
    const photos = figures("best-areas-and-hotels-to-stay", folder);
    if (!photos.length) continue;
    const re = new RegExp(`<p>[^\\n]*?<a href="https://www\\.klook\\.com[^"]*hotels[^"]*"[^>]*>${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}</a>`, "g");
    const hits = [...post.content.matchAll(re)];
    if (!hits.length) fail(`where-to-stay: no paragraph for ${name}`);
    spots.push([hits[0].index, gallery(photos), photos.length]); // first mention (Gloria appears twice)
  }
  spots.sort((a, b) => b[0] - a[0]);
  for (const [at, html, n] of spots) { post.content = insertAfterParagraph(post.content, at, html); added += n; }
  post.modified = MODIFIED;
}

// Main station: group by anchor so Resonance and the Sheraton share one gallery.
{
  const post = posts.find((p) => p.slug === "hotels-near-taipei-main-station");
  if (!post) fail("main station post not found");
  if (post.content.includes(MEDIA_URL)) fail("main station page already has hotel photos");
  const groups = new Map();
  for (const [folder, [page, anchor]] of Object.entries(MAIN_STATION)) {
    const photos = figures(page, folder);
    if (!photos.length) continue;
    const key = JSON.stringify(anchor);
    groups.set(key, [...(groups.get(key) || []), photos]);
  }
  const spots = [];
  for (const [key, perHotel] of groups) {
    const anchor = JSON.parse(key);
    const needle = anchor.h3 ? `data-hotel="${anchor.h3}"` : `<h3>${anchor.h3text}</h3>`;
    const hits = [];
    for (let i = post.content.indexOf(needle); i >= 0; i = post.content.indexOf(needle, i + 1)) {
      const lineStart = post.content.lastIndexOf("\n", i) + 1;
      if (post.content.startsWith("<h3", lineStart)) hits.push(lineStart);
    }
    if (hits.length !== 1) fail(`main station: ${needle} heading matched ${hits.length} times`);
    // Two hotels sharing a heading: one photo each keeps it to a pair.
    const shown = perHotel.length > 1 ? perHotel.map((list) => list[0]) : perHotel[0];
    spots.push([post.content.indexOf("<p>", hits[0]), gallery(shown), shown.length]);
  }
  spots.sort((a, b) => b[0] - a[0]);
  for (const [at, html, n] of spots) { post.content = insertAfterParagraph(post.content, at, html); added += n; }
  post.modified = MODIFIED;
}

fs.mkdirSync(MEDIA_DIR, { recursive: true });
for (const [dest, src] of copies) fs.copyFileSync(src, dest);
fs.writeFileSync(filePath, JSON.stringify(posts, null, 2) + "\n");
console.log(`${added} photos placed, ${copies.size} files copied to ${MEDIA_DIR}`);
