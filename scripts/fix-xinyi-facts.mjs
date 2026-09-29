// Corrections from the Taipei 101 hotels research
// (data/research/hotels-near-taipei-101.md), approved by the owner.
//
// - Where-to-stay #Xinyi: table prices were well below November weekday rates
//   (Booking.com, Wed 11 Nov 2026); Home Hotel is 6 minutes from Xiangshan,
//   and its gym is a free partner gym next door; Humble House's pool opens
//   April-October only; W's Woobar is on the 10th-floor lobby level.
// - Xiangshan is on the red line, not the blue, and since the 30 Aug 2026
//   extension it is no longer the end of the line.
// - Le Meridien's "more than half the rooms face Taipei 101" rests on one blog.

import fs from "fs";
import path from "path";

const MODIFIED = "2026-09-29 12:00:00";

const EDITS = {
  "best-areas-and-hotels-to-stay": [
    [`Klook</a>]</sup></td><td>NT$8,000</td><td>6 mins (Red)</td></tr><tr><td>W Taipei`,
     `Klook</a>]</sup></td><td>NT$11,500</td><td>6 mins (Red)</td></tr><tr><td>W Taipei`],
    [`<td>NT$13,000</td><td>3 mins (Blue)</td>`, `<td>NT$16,500</td><td>3 mins (Blue)</td>`],
    [`<td>NT$7,500</td><td>5 mins (Blue)</td>`, `<td>NT$9,500</td><td>5 mins (Blue)</td>`],
    [`<td>NT$5,500</td><td>5 mins (Red)</td>`, `<td>NT$7,500</td><td>6 mins (Red)</td>`],
    [`minimalist rooms, an on-site gym, and a focus`, `minimalist rooms, free use of a large gym next door, and a focus`],
    [`and Woobar downstairs mixing`, `and Woobar on the 10th-floor lobby level mixing`],
    [`an outdoor pool overlooking Taipei 101, a sixth-floor garden and a gallery of 600 original artworks`,
     `an outdoor pool overlooking Taipei 101 (open April to October), a sixth-floor garden and more than 600 original artworks`],
  ],
  "best-districts-and-areas": [
    [`The last blue line stop in the district is Xiangshan`, `The last red line stop in the district is Xiangshan`],
  ],
  "taipei-101": [
    [`<strong>Xiangshan MRT station</strong> at the end of the red line &ndash; one stop past Taipei 101.`,
     `<strong>Xiangshan MRT station</strong> on the red line, one stop past Taipei 101.`],
  ],
  "taipei-101-fireworks-new-years-eve": [
    [`where more than half the rooms face Taipei 101.`, `where many rooms face Taipei 101.`],
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
  console.log(`/${slug}: ${edits.length} fix${edits.length > 1 ? "es" : ""}`);
}

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2) + "\n");
