// Link the new /hotels-near-taipei-101 page from the pages Xinyi visitors
// read first: the where-to-stay #Xinyi section, the Taipei 101 guide, the
// Xinyi shopping guide and the districts guide (section and FAQ). Same
// guarded find/replace as scripts/link-hotel-guides.mjs.

import fs from "fs";
import path from "path";

const MODIFIED = "2026-09-29 12:00:00";

const EDITS = {
  "best-areas-and-hotels-to-stay": [
    [`but you can walk to a great deal.</p>`,
     `but you can walk to a great deal.</p>\n\n<p>Settled on Xinyi? Our guide to <a href="/hotels-near-taipei-101">hotels near Taipei 101</a> compares fifteen places to stay, from hostels to five-stars, with the nearest exit and November prices for each.</p>`],
  ],
  "taipei-101": [
    [`before or after your visit.</p>`,
     `before or after your visit.</p>\n\n<p>Want to stay within walking distance? See our pick of <a href="/hotels-near-taipei-101">hotels near Taipei 101</a>, with the walking time from each one to the tower.</p>`],
  ],
  "xinyi-shopping-district": [
    [`if shopping is your priority.</p>`,
     `if shopping is your priority.</p>\n\n<p>For specific hotels, from the Grand Hyatt to a hostel by the Linjiang Street market, see <a href="/hotels-near-taipei-101">hotels near Taipei 101</a>.</p>`],
  ],
  "best-districts-and-areas": [
    [`and holds many of the city's best hotels.</p>`,
     `and holds many of the city's best hotels &ndash; compared in the guide to <a href="/hotels-near-taipei-101">hotels near Taipei 101</a>.</p>`],
    [`<a href="/hotels-near-taipei-main-station">Taipei Main Station</a> and <a href="/hotels-near-ximending">Ximending</a>.</p>`,
     `<a href="/hotels-near-taipei-main-station">Taipei Main Station</a>, <a href="/hotels-near-ximending">Ximending</a> and <a href="/hotels-near-taipei-101">Taipei 101</a>.</p>`],
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
  console.log(`/${slug}: ${edits.length} link${edits.length > 1 ? "s" : ""} added`);
}

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2) + "\n");
