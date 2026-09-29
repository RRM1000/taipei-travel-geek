// Corrections from the Beitou and Zhongshan hotel research
// (data/research/beitou-hot-spring-hotels.md section 5 and
// data/research/hotels-in-zhongshan.md section 6), approved by the owner.
//
// Left for the owner: the "Beitou Public Bath around NT$40" line (no current
// bath of that name and price could be found), and Gloria Residence's
// terrace / 24-hour reception / induction hob and Tango ChangAn's jacuzzis,
// which couldn't be confirmed but may be first-hand.

import fs from "fs";
import path from "path";

const MODIFIED = "2026-09-29 12:00:00";

const EDITS = {
  "best-areas-and-hotels-to-stay": [
    // Beitou: Spring City price, and Grand View's shuttle runs from Beitou MRT
    ["<td>NT$3,800</td><td>Xinbeitou + shuttle</td>", "<td>NT$6,200</td><td>Xinbeitou + shuttle</td>"],
    ["at roughly a third of the price", "at roughly half the price"],
    ["<td>NT$12,500</td><td>Xinbeitou + shuttle</td>", "<td>NT$12,600</td><td>Beitou + shuttle</td>"],
    // Zhongshan: Tango count, walking times, prices
    ["There are four Tango hotels in Taipei; ", "There are seven Tango hotels in Taipei, three of them in Zhongshan; "],
    ["<td>NT$5,000</td><td>5 mins (Red)</td>", "<td>NT$7,500</td><td>10 mins (Red/Orange)</td>"],
    ["<td>from NT$5,000</td><td>5 mins (Red)</td>", "<td>from NT$7,500</td><td>10 mins (Red/Orange)</td>"],
    ["<td>NT$4,000</td><td>6 mins (Red/Green)</td>", "<td>NT$4,000</td><td>9 mins (Red/Green)</td>"],
    ["<td>NT$9,000</td><td>2 mins (Red/Green)</td>", "<td>NT$8,000</td><td>3 mins (Red/Green)</td>"],
    ["it's about 14 minutes' walk to Ningxia Night Market with Xingtian Temple nearby", "it's about 18 minutes' walk to Ningxia Night Market"],
  ],
  xinbeitou: [
    ["open <strong>09:00–17:00</strong>, closed on Mondays and national holidays unless they fall at a weekend",
     "open <strong>10:00–18:00</strong> (last entry 17:45), closed on Mondays and on days the government closes offices"],
    ["Minibus S15 runs there directly from Beitou", "Minibus S9 runs there directly from Beitou MRT station"],
  ],
  "yangmingshan-national-park": [
    ["Minibus <strong>S15 from Beitou</strong> is a handy alternative", "Minibus <strong>S9 from Beitou</strong> is a handy alternative"],
    ["then minibus S15 or a short taxi down to", "then minibus S9 or a short taxi down to"],
  ],
  "taipei-hot-springs": [
    ["It closes for maintenance periods, so it is worth checking before making a special trip for it alone.",
     "It has been closed for a rebuild since January 2025. The works were due to finish in late September 2026, with the reopening date still to be announced, so check before making a special trip."],
    ["runs to roughly NT$150&ndash;200", "costs NT$150 a session and closes on Wednesdays"],
  ],
  "where-to-go-when-raining": [
    ["so you can walk the entire 2km length to the many malls located next to this MRT station",
     "so you can walk its entire 815m length to the malls beside Zhongshan station"],
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
