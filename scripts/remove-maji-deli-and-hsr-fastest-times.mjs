// Owner decisions from the improvement plan (27 Oct 2026):
// - Maji Deli comes out of the supermarkets and delis list;
// - the HSR guide's Taichung, Tainan and Kaohsiung headings show the fastest
//   journey times, matching the timetable table on the same page (47 min,
//   1 hr 22 min, 1 hr 34 min) instead of 52, 88 and 97.

import fs from "fs";
import path from "path";

const MODIFIED = "2026-10-28 12:00:00";

const filePath = path.resolve(process.env.POSTS_PATH || "content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const fail = (m) => { console.error(`${m} - aborting, nothing written.`); process.exit(1); };
const get = (slug) => posts.find((p) => p.slug === slug) || fail(`/${slug} not found`);
const once = (post, from, to) => {
  const n = post.content.split(from).length - 1;
  if (n !== 1) fail(`/${post.slug}: "${from.slice(0, 50)}" matched ${n} times`);
  post.content = post.content.replace(from, () => to);
};

const deli = get("best-supermarkets-and-delis-with-western-produce");
const start = deli.content.indexOf('<h2 id="Maji">');
const END = "it's all top-grade stuff.</p>";
const end = deli.content.indexOf(END, start);
if (start < 0 || end < 0) fail("/best-supermarkets...: Maji Deli section not found");
if (deli.content.indexOf("<h2", start + 5) >= 0 && deli.content.indexOf("<h2", start + 5) < end) fail("Maji section spans another heading");
deli.content = deli.content.slice(0, start).replace(/\s+$/, "\n\n\n\n") + deli.content.slice(end + END.length).replace(/^\s+/, "");
const EXCERPT_FROM = "the IKEA food market, Maji Deli and Addiction Aquatic Development's deli.";
if (deli.excerpt.split(EXCERPT_FROM).length !== 2) fail("/best-supermarkets...: excerpt not matched");
deli.excerpt = deli.excerpt.replace(EXCERPT_FROM, () => "the IKEA food market and Addiction Aquatic Development's deli.");
if (JSON.stringify(deli).includes("Maji")) fail("Maji still mentioned");
deli.modified = MODIFIED;

const hsr = get("taiwan-high-speed-rail-hsr-discounts-klook");
once(hsr, '<h3 id="Taichung">Taichung (52 minutes)</h3>', '<h3 id="Taichung">Taichung (47 minutes)</h3>');
once(hsr, '<h3 id="Tainan">Tainan (88 minutes)</h3>', '<h3 id="Tainan">Tainan (82 minutes)</h3>');
once(hsr, '<h3 id="Kaohsiung">Kaohsiung (97 minutes)</h3>', '<h3 id="Kaohsiung">Kaohsiung (94 minutes)</h3>');
hsr.modified = MODIFIED;

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2) + "\n");
console.log("Maji Deli removed; HSR headings set to fastest times");
