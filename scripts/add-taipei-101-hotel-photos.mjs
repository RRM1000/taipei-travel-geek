// Photos for every hotel on the hotels near Taipei 101 page, from
// data/hotel-photos.json ("hotels-near-taipei-101"). The owner's five Xinyi
// picks reuse the where-to-stay photos unless a better shot turned up in the
// new folder; the other ten come from
// scratchpad/downloaded-photos/hotels-near-taipei-101/<hotel>/ and are copied
// into public/media/2026/09/hotels/. An entry's optional "source" names the
// file to copy when it's saved under a different name (to avoid clashing with
// an older file of the same name).
//
// Existing hotel photos on the page are stripped first, so this can be re-run
// after changing the picks.

import fs from "fs";
import path from "path";

const SLUG = "hotels-near-taipei-101";
const MODIFIED = "2026-09-29 12:00:00";
const MEDIA_DIR = "public/media/2026/09/hotels";
const MEDIA_URL = "/media/2026/09/hotels";
const SRC_DIR = "scratchpad/downloaded-photos/hotels-near-taipei-101";

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

let content = post.content
  .replace(/\n\n<div class="wp-block-gallery columns-2"[^\n]*\n(?: <figure[\s\S]*?<\/figure>\n?)+\n?<\/div>/g, (m) => (m.includes(MEDIA_URL) ? "" : m))
  .replace(/\n\n<figure class="wp-block-image">\n  <img [^\n]*\n  <figcaption[^\n]*\n <\/figure>/g, (m) => (m.includes(MEDIA_URL) ? "" : m));
if (content.includes(MEDIA_URL)) fail("could not strip the existing hotel photos cleanly");

// Folder names match the page's data-hotel keys.
const copies = new Map();
const spots = [];
let total = 0;
for (const [key, list] of Object.entries(picks)) {
  const photos = list.slice(0, 2);
  if (!photos.length) continue;
  for (const ph of photos) {
    const dest = path.join(MEDIA_DIR, ph.file);
    if (fs.existsSync(dest)) continue;
    const src = path.join(SRC_DIR, key, ph.source || ph.file);
    if (!fs.existsSync(src)) fail(`missing ${src}`);
    copies.set(dest, src);
  }
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
