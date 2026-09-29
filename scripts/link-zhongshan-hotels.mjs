// Link the new /hotels-in-zhongshan page from the where-to-stay #Zhongshan
// section, the districts guide (section and FAQ, which also picks up the
// Beitou hotels guide), Ningxia Night Market and the nightlife guide's
// Tiaotong paragraph.

import fs from "fs";
import path from "path";

const MODIFIED = "2026-09-29 12:00:00";

const EDITS = {
  "best-areas-and-hotels-to-stay": [
    [`with generally large rooms, cheaper windowless options, a small gym and laundry.</p>`,
     `with generally large rooms, cheaper windowless options, a small gym and laundry.</p>\n\n<p>Settled on Zhongshan? Our guide to <a href="/hotels-in-zhongshan">hotels in Zhongshan</a> covers fourteen places to stay, from capsule hostels to the Okura, with the nearest exit and November prices for each.</p>`],
  ],
  "best-districts-and-areas": [
    [`with a dense run of bars, including a lot of karaoke.</p>`,
     `with a dense run of bars, including a lot of karaoke. For places to stay, see our guide to <a href="/hotels-in-zhongshan">hotels in Zhongshan</a>.</p>`],
    [`<a href="/hotels-near-taipei-main-station">Taipei Main Station</a>, <a href="/hotels-near-ximending">Ximending</a> and <a href="/hotels-near-taipei-101">Taipei 101</a>.</p>`,
     `<a href="/hotels-near-taipei-main-station">Taipei Main Station</a>, <a href="/hotels-near-ximending">Ximending</a>, <a href="/hotels-near-taipei-101">Taipei 101</a>, <a href="/hotels-in-zhongshan">Zhongshan</a> and <a href="/beitou-hot-spring-hotels">Beitou</a>.</p>`],
  ],
  "ningxia-night-market": [
    [`but the variety on offer more than makes up for it.</p>`,
     `but the variety on offer more than makes up for it.</p>\n\n<p>Want to stay within walking distance? Several of the <a href="/hotels-in-zhongshan">hotels in Zhongshan</a> are 10&ndash;20 minutes away on foot.</p>`],
  ],
  "taipei-nightlife": [
    [`removes minimum spends across several local establishments.</p>`,
     `removes minimum spends across several local establishments.</p>\n\n<p>To stay near the Tiaotong lanes, see our guide to <a href="/hotels-in-zhongshan">hotels in Zhongshan</a>.</p>`],
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
  console.log(`/${slug}: ${edits.length} link${edits.length > 1 ? "s" : ""}`);
}

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2) + "\n");
