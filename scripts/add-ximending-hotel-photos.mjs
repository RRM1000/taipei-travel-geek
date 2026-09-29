// Photos for every hotel on the hotels near Ximending page. The owner's five
// picks first went in with scripts/fix-wanhua-hotels-and-ximending-photos.mjs,
// reusing the where-to-stay photos; this replaces that set with one list for
// the whole page, from data/hotel-photos.json ("hotels-near-ximending").
//
// Each entry either names a file already in public/media/2026/09/hotels/
// (reused from the where-to-stay page) or one in
// scratchpad/downloaded-photos/hotels-near-ximending/<folder>/, which is
// copied in. Cho 1 and Cho 3 share a heading, so they get one photo each.
//
// Existing hotel photos on the page are stripped first, so this can be re-run
// after changing the picks.

import fs from "fs";
import path from "path";

const SLUG = "hotels-near-ximending";
const MODIFIED = "2026-09-28 12:00:00";
const MEDIA_DIR = "public/media/2026/09/hotels";
const MEDIA_URL = "/media/2026/09/hotels";
const SRC_DIR = "scratchpad/downloaded-photos/hotels-near-ximending";

// data-hotel key on the page -> photo folders, in display order
const HOTELS = {
  "sotetsu-ximen": ["sotetsu-ximen"],
  "solaria-ximen": ["solaria-ximen"],
  "westgate": ["westgate"],
  "amba-ximending": ["amba-ximending"],
  "just-sleep-ximending": ["just-sleep-ximending"],
  "roaders-zhonghua": ["roaders-zhonghua"],
  "cho-hotel": ["cho-hotel-ximen", "cho-hotel-3"],
  "energy-inn": ["energy-inn-taipei"],
  "cityinn-plus-ximending": ["cityinn-plus-ximending"],
  "papa-whale": ["papa-whale", "hotel-papa-whale"],
  "artotel-ximending": ["artotel-ximending"],
  "meander-taipei": ["meander-taipei-hostel"],
  "oani": ["oani"],
  "dan-hostel": ["dan-hostel", "dan-hostel-taipei"],
};

const fail = (m) => { console.error(`${m} - aborting, nothing written.`); process.exit(1); };
const esc = (s) => s.replace(/&(?!amp;|ndash;|#)/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function gallery(photos) {
  const fig = (ph, inGrid) =>
    `<figure class="wp-block-image"${inGrid ? ' style="margin: 0;"' : ""}>\n  <img width="${ph.width}" height="${ph.height}" src="${MEDIA_URL}/${ph.file}" alt="${esc(ph.alt)}" loading="lazy"${inGrid ? ' style="width: 100%; height: 260px; object-fit: cover; border-radius: 8px;"' : ""} />\n  <figcaption style="text-align: center; font-size: 0.875rem; color: #666; margin-top: 0.5rem;">${esc(ph.caption)}</figcaption>\n </figure>`;
  if (photos.length === 1) return `\n\n${fig(photos[0], false)}`;
  return `\n\n<div class="wp-block-gallery columns-2" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin: 1.5rem 0;">\n ${photos.map((p) => fig(p, true)).join("\n ")}\n</div>`;
}

const picks = JSON.parse(fs.readFileSync("data/hotel-photos.json", "utf8"))[SLUG];
if (!picks) fail(`no "${SLUG}" picks in data/hotel-photos.json`);

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const post = posts.find((p) => p.slug === SLUG);
if (!post) fail(`/${SLUG} not found`);

// Strip any hotel photos already on the page.
let content = post.content
  .replace(/\n\n<div class="wp-block-gallery columns-2"[^\n]*\n(?: <figure[\s\S]*?<\/figure>\n?)+\n?<\/div>/g, (m) => (m.includes(MEDIA_URL) ? "" : m))
  .replace(/\n\n<figure class="wp-block-image">\n  <img [^\n]*\n  <figcaption[^\n]*\n <\/figure>/g, (m) => (m.includes(MEDIA_URL) ? "" : m));
if (content.includes(MEDIA_URL)) fail("could not strip the existing hotel photos cleanly");

const copies = new Map();
const spots = [];
let total = 0;
for (const [key, folders] of Object.entries(HOTELS)) {
  // First folder with picks wins, except a shared heading (Cho) takes the
  // best photo from each folder.
  const lists = folders.map((f) => [f, picks[f] || []]).filter(([, l]) => l.length);
  if (!lists.length) continue;
  const shared = key === "cho-hotel";
  const photos = (shared ? lists.map(([f, l]) => [f, l[0]]) : lists[0][1].slice(0, 2).map((ph) => [lists[0][0], ph])).map(([folder, ph]) => {
    const dest = path.join(MEDIA_DIR, ph.file);
    if (!fs.existsSync(dest)) {
      const src = path.join(SRC_DIR, folder, ph.file);
      if (!fs.existsSync(src)) fail(`missing ${src}`);
      copies.set(dest, src);
    }
    return ph;
  });
  const hits = [...content.matchAll(new RegExp(`^<h3>[^\\n]*data-hotel="${key}"`, "gm"))];
  if (hits.length !== 1) fail(`heading for ${key} matched ${hits.length} times`);
  const end = content.indexOf("</p>", content.indexOf("<p>", hits[0].index));
  spots.push([end + 4, gallery(photos)]);
  total += photos.length;
}
spots.sort((a, b) => b[0] - a[0]);
for (const [at, html] of spots) content = content.slice(0, at) + html + content.slice(at);

post.content = content;
post.modified = MODIFIED;
for (const [dest, src] of copies) fs.copyFileSync(src, dest);
fs.writeFileSync(filePath, JSON.stringify(posts, null, 2) + "\n");
console.log(`/${SLUG}: ${total} photos across ${spots.length} hotels, ${copies.size} new files copied`);
