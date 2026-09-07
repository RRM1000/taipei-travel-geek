// Put the year in the title of the five guides where the searcher plainly
// wants current information - fares, ticket prices, opening times, refund
// thresholds, which stalls are still there.
//
// Not a blanket change. Two of the three pages outranking us for "ximending"
// carry 2026 in their titles, and ours was updated more recently than either
// without saying so. But a year on a restaurant review is padding: nobody
// searching "fuhang soy milk" cares which year the review is from, and the
// site would just look like it stamps dates on everything.
//
// These five append cleanly inside the ~60-character budget Google renders.
// Taipei 101, Din Tai Fung, Ximending and the THSR guide all need a word
// dropped or reordered instead, so they are deliberately not here.
//
// The modified date is NOT bumped. All five were genuinely revised in August
// 2026, so the year in the title is already true; moving the date to today
// for a title-only edit would claim a review that did not happen.

import fs from "fs";
import path from "path";

const YEAR = "2026";
const MAX = 60; // what Google renders before truncating, roughly

const TARGETS = [
  "taoyuan-airport-mrt",
  "taiwan-tourist-tax-refund",
  "taipei-zoo",
  "shilin-night-market",
  "maokong-gondola",
];

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));

let changed = 0;
const report = [];

for (const slug of TARGETS) {
  const post = posts.find((p) => p.slug === slug);
  if (!post) {
    console.error(`Post ${slug} not found - aborting without writing.`);
    process.exit(1);
  }
  if (/20\d\d/.test(post.title)) {
    report.push([slug, post.title, "already carries a year, skipped"]);
    continue;
  }

  const next = `${post.title} (${YEAR})`;
  if (next.length > MAX) {
    console.error(`${slug}: "${next}" is ${next.length} chars, over the ${MAX} budget - aborting.`);
    process.exit(1);
  }

  report.push([slug, post.title, next]);
  post.title = next;
  changed++;
}

if (!changed) {
  console.error("Nothing to change - aborting rather than rewriting the file.");
  process.exit(1);
}

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2) + "\n");

console.log(`Retitled ${changed} guide${changed === 1 ? "" : "s"}:\n`);
for (const [slug, from, to] of report) {
  console.log(`  /${slug}`);
  console.log(`    was: ${from}  (${from.length})`);
  console.log(`    now: ${to}  (${to.length})\n`);
}
