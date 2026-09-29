// Link the new /best-hostels-in-taipei page from the where-to-stay FAQ on
// hostels and the money guide's daily-spend section.

import fs from "fs";
import path from "path";

const MODIFIED = "2026-09-29 12:00:00";

const EDITS = {
  "best-areas-and-hotels-to-stay": [
    [`Most have private rooms too, which often undercut budget hotels.</p>`,
     `Most have private rooms too, which often undercut budget hotels. See our guide to the <a href="/best-hostels-in-taipei">best hostels in Taipei</a>.</p>`],
  ],
  "taipei-money-guide": [
    [`<p>Per person, per day. Accommodation figures are for a room or bed, so a couple sharing a mid-range hotel effectively halves that line.</p>`,
     `<p>Per person, per day. Accommodation figures are for a room or bed, so a couple sharing a mid-range hotel effectively halves that line. For dorm beds and where to find them, see our <a href="/best-hostels-in-taipei">best hostels in Taipei</a> guide.</p>`],
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
