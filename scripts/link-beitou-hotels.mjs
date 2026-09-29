// Link the new /beitou-hot-spring-hotels page from the where-to-stay #Beitou
// section, the Xinbeitou guide and the hot springs guide (whose "hotels
// guide" link pointed at the general where-to-stay page).

import fs from "fs";
import path from "path";

const MODIFIED = "2026-09-29 12:00:00";
const XB = `<p>There are numerous hotels around the streets, all taking advantage of the hot springs, many with private baths filled with the thermal spring water.</p>`;

const EDITS = {
  "best-areas-and-hotels-to-stay": [
    [`<blockquote class="wp-block-quote"><p>Not staying overnight? You don't have to.`,
     `<p>Those two are just the best known. Our <a href="/beitou-hot-spring-hotels">Beitou hot spring hotels guide</a> covers a dozen more at every price, with the spring each one uses, which shared baths are nude and how old children need to be.</p>\n\n<blockquote class="wp-block-quote"><p>Not staying overnight? You don't have to.`],
  ],
  "taipei-hot-springs": [
    [`href="/best-areas-and-hotels-to-stay">hotels guide</a> if you would rather stay`,
     `href="/beitou-hot-spring-hotels">hotels guide</a> if you would rather stay`],
  ],
  xinbeitou: [
    [XB, XB.replace(/<\/p>$/, ` If you'd like to stay over, our <a href="/beitou-hot-spring-hotels">Beitou hot spring hotels guide</a> sorts them by budget and says how far each is from the station.</p>`)],
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
