// Point the area and transport guides at the two new hotel pages. Until now
// only the where-to-stay guide linked to /hotels-near-taipei-main-station and
// /hotels-near-ximending, so neither had a way in from the pages people read
// before choosing a hotel: the districts guide, the Ximending guide and the
// Airport MRT guide (about 1,100 views a month, most of them arriving with
// luggage at Main Station).

import fs from "fs";
import path from "path";

const MODIFIED = "2026-09-28 12:00:00";

const EDITS = {
  "best-districts-and-areas": [
    [`a practical base if you're weighing up <a href="/best-areas-and-hotels-to-stay">where to stay</a>.</p>`,
     `a practical base if you're weighing up <a href="/best-areas-and-hotels-to-stay">where to stay</a>. For somewhere within a few minutes of the station, see the <a href="/hotels-near-taipei-main-station">hotels near Taipei Main Station</a>.</p>`],
    [`which are where to go for the older, quieter side of Wanhua.</p>`,
     `which are where to go for the older, quieter side of Wanhua.</p>\n\n<p>Staying here? These are the <a href="/hotels-near-ximending">best hotels near Ximending</a>, from Japanese chain hotels to hostels.</p>`],
    [`There's a full breakdown in the <a href="/best-areas-and-hotels-to-stay">where to stay guide</a>.</p>`,
     `There's a full breakdown in the <a href="/best-areas-and-hotels-to-stay">where to stay guide</a>, with hotel-by-hotel lists for <a href="/hotels-near-taipei-main-station">Taipei Main Station</a> and <a href="/hotels-near-ximending">Ximending</a>.</p>`],
  ],
  ximending: [
    [`one of the most convenient <a href="/best-areas-and-hotels-to-stay">areas to stay in Taipei</a>.</p>`,
     `one of the most convenient <a href="/best-areas-and-hotels-to-stay">areas to stay in Taipei</a> &ndash; see my pick of the <a href="/hotels-near-ximending">best hotels near Ximending</a>.</p>`],
  ],
  "taoyuan-airport-mrt": [
    [`which is located 2 levels down from the arrival halls.</p>`,
     `which is located 2 levels down from the arrival halls.</p>\n\n\n\n<p>Staying near the station? The guide to <a href="/hotels-near-taipei-main-station">hotels near Taipei Main Station</a> shows which are closest to the Airport MRT exit &ndash; the thing that matters most with big bags.</p>`],
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
