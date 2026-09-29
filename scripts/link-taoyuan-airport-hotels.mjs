// Link the new /hotels-near-taoyuan-airport page from the Airport MRT guide
// (where it gives the last trains), the Main Station hotels page and the
// where-to-stay guide's Further Afield section.

import fs from "fs";
import path from "path";

const MODIFIED = "2026-09-29 12:00:00";

const EDITS = {
  "taoyuan-airport-mrt": [
    [`roughly every 15 minutes until about 23:35.</p>`,
     `roughly every 15 minutes until about 23:35. If your flight lands too late even for that, or leaves before the first train, see our guide to <a href="/hotels-near-taoyuan-airport">hotels near Taoyuan Airport</a>.</p>`],
  ],
  "hotels-near-taipei-main-station": [
    [`rather than which side of the tracks you're on.</p>`,
     `rather than which side of the tracks you're on.</p>\n\n<p>Landing after the last Airport MRT train, or flying out before the first? A bed by the terminals makes more sense; see <a href="/hotels-near-taoyuan-airport">hotels near Taoyuan Airport</a>.</p>`],
  ],
  "best-areas-and-hotels-to-stay": [
    [`<p>Worth considering if location matters less than character or price.</p>`,
     `<p>Worth considering if location matters less than character or price. For a late arrival or a dawn flight, our guide to <a href="/hotels-near-taoyuan-airport">hotels near Taoyuan Airport</a> covers the capsule hotel in Terminal 2 and the shuttle hotels nearby.</p>`],
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
  console.log(`/${slug}: linked`);
}

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2) + "\n");
