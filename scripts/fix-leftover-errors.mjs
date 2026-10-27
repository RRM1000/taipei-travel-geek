// Two leftovers from scripts/fix-known-errors.mjs:
// - the 3-5 day itinerary still sent readers to the changing of the guard at
//   Sun Yat-Sen Memorial Hall, which is suspended while the hall is closed
//   for renovation into 2027;
// - /media/2026/08/taipei-hydrangeas.jpg shows pentas, not hydrangeas (found
//   by the photo search for the new posts), so its alt text and captions said
//   the wrong flower. The captions no longer claim a place either.

import fs from "fs";
import path from "path";

const MODIFIED = "2026-10-28 12:00:00";
const EDITS = {
  "taipei-itinerary-3-5-days": [
    ["that route starts at Sun Yat-Sen Memorial Hall instead, if you'd like to see the changing of the guard there before continuing on to Songshan and Xinyi",
     "that route starts in the grounds of Sun Yat-Sen Memorial Hall instead (the hall itself, and its guard ceremony, are closed for renovation into 2027) before continuing on to Songshan and Xinyi"],
  ],
  "best-time-to-visit-taipei": [
    ['alt="Vibrant Hydrangeas and Flowers Blooming in Taipei"/><figcaption>Vibrant pink and white hydrangea blossoms filling Taipei\'s gardens in late spring</figcaption>',
     'alt="Pink and white pentas flowers in bloom in Taipei"/><figcaption>Pentas in flower in Taipei. For hydrangeas, head to Zhuzihu on Yangmingshan in May and June</figcaption>'],
  ],
  "taipei-annual-events": [
    ['alt="Vibrant Hydrangea Blossoms in Taipei"/><figcaption>Vibrant pink and purple hydrangea fields blooming in Yangmingshan during May</figcaption>',
     'alt="Pink pentas flowers in bloom in Taipei"/><figcaption>Pentas in flower in Taipei; the hydrangea fields are up at Zhuzihu on Yangmingshan</figcaption>'],
  ],
};

const filePath = path.resolve(process.env.POSTS_PATH || "content/posts.json");
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
  console.log(`/${slug}: fixed`);
}
fs.writeFileSync(filePath, JSON.stringify(posts, null, 2) + "\n");
