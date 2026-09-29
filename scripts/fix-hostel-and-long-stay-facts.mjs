// Corrections from the hostels and serviced apartments research
// (data/research/best-hostels-in-taipei.md section 6 and
// aparthotels-serviced-apartments-taipei.md), approved by the owner.
//
// - Main Station is on the Red and Blue lines, not Green (the whole
//   Zhongzheng table said Green); Star and Taiwan Youth Hostel prices.
// - Hostel beds: midweek NT$700-800 is the typical figure now, and Saturdays
//   often cost two to three times as much.
// - Star Hostel East's dorms are women-only; Taipei Discover is now 18+.
// - Gloria Residence: the pool closes on Mondays; the "family apartments at
//   a similar rate" claim had no price behind it, so name the two-bedroom
//   Oasis instead.
//
// Left for the owner: Gloria's induction hob and terrace (unconfirmed, but
// may be first-hand).

import fs from "fs";
import path from "path";

const MODIFIED = "2026-09-29 12:00:00";

const EDITS = {
  "best-areas-and-hotels-to-stay": [
    ["<td>4 mins (Blue/Green)</td>", "<td>4 mins (Red/Blue)</td>"],
    ["<td>NT$1,600 room<br>NT$800 bunk</td><td>1 min (Blue/Green)</td>", "<td>NT$1,700 room<br>NT$850&ndash;900 bunk</td><td>1 min (Red/Blue)</td>"],
    ["<td>NT$2,700 room<br>NT$900 bunk</td><td>5 mins (Blue/Green/Red)</td>", "<td>NT$3,000 room<br>NT$1,000 bunk</td><td>5 mins (Red/Blue)</td>"],
    ["Very. Star Hostel near Main Station is as good as any hostel in Asia, and dorm beds run NT$600&ndash;900.",
     "Very. Star Hostel near Main Station is as good as any hostel in Asia, and dorm beds run NT$600&ndash;900 midweek, though Saturdays often cost two to three times as much and the best hostels sell out weeks ahead."],
    ["a hostel bed runs about NT$600 a night against NT$6,000 or more for a boutique hotel",
     "a hostel bed runs about NT$700&ndash;800 a night against NT$6,000 or more for a boutique hotel"],
    ["<tr><td><strong>Hostels</strong></td><td>NT$500&ndash;1,500</td>", "<tr><td><strong>Hostels</strong></td><td>NT$400&ndash;1,200 (more at weekends)</td>"],
    ["There's an indoor pool, a terrace,", "There's an indoor pool (closed on Mondays), a terrace,"],
    ["the family apartments are larger than most Taipei hotel suites at a similar rate",
     "the two-bedroom Oasis apartment (85&nbsp;m², two bathrooms, sleeps four) is larger than most Taipei hotel suites"],
    ["the family apartments are often larger than hotel suites at a similar rate", "the family apartments are often larger than hotel suites"],
  ],
  "taipei-guide": [
    ["a hostel bed is about NT$600 a night against roughly NT$6,000 for a boutique hotel",
     "a hostel bed is about NT$700&ndash;800 a night against roughly NT$6,000 for a boutique hotel"],
  ],
  "taipei-money-guide": [
    ["a hostel bed is about NT$600 against roughly NT$6,000 for a boutique hotel",
     "a hostel bed is about NT$700&ndash;800 against roughly NT$6,000 for a boutique hotel"],
  ],
  "hotels-in-daan": [
    ["Listings mention a female-only dorm on its own floor.",
     "Its dorms are women-only (eight-bed rooms on a female-only floor), so men can book only the private rooms."],
  ],
  "hotels-in-zhongshan": [
    ["no curfew and quiet hours from 10pm, and guests must be 16 or over.", "no curfew and quiet hours from 10pm, and guests must be 18 or over."],
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
