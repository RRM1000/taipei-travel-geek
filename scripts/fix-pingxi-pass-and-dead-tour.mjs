// Two problems found while writing the Shifen and Pingxi day trip guide:
// - /taiwan-railway put the Pingxi Line day pass at "about NT$52"; TRA has
//   sold it at NT$120 (NT$60 concession) since 23 June 2025, at 12 stations;
// - Klook activity 98800 (night Jiufen and Shifen), which had its own tour
//   section on /jiufen, now redirects to Klook's home page, so that section
//   (heading to spacer) comes out.

import fs from "fs";
import path from "path";

const MODIFIED = "2026-10-28 12:00:00";

const filePath = path.resolve(process.env.POSTS_PATH || "content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const fail = (m) => { console.error(`${m} - aborting, nothing written.`); process.exit(1); };
const get = (slug) => posts.find((p) => p.slug === slug) || fail(`/${slug} not found`);

const rail = get("taiwan-railway");
const PASS_FROM = "An <strong>all-day pass costs about NT$52</strong> and is sold at Ruifang, Houtong, Shifen, Pingxi and Jingtong. Single fares run from roughly NT$15 to NT$50, so the pass pays for itself once you make about four hops - which most people do, since hopping on and off is the whole point of the line.";
const PASS_TO = "An <strong>all-day pass costs NT$120</strong> (NT$60 concession) and is sold at the line's stations, Ruifang, Houtong, Shifen, Pingxi and Jingtong among them. Bought separately, the classic Ruifang, Shifen, Pingxi, Jingtong and back loop comes to roughly NT$117, so the pass only earns its keep if you add extra stops such as Houtong or Lingjiao.";
if (rail.content.split(PASS_FROM).length !== 2) fail("/taiwan-railway: day pass paragraph not matched exactly once");
rail.content = rail.content.replace(PASS_FROM, () => PASS_TO);
rail.modified = MODIFIED;

const jiufen = get("jiufen");
const start = jiufen.content.indexOf('<h3 id="Tour-Night">');
if (start < 0 || jiufen.content.indexOf('<h3 id="Tour-Night">', start + 1) >= 0) fail("/jiufen: Tour-Night heading not found exactly once");
const SPACER = '<div style="height:40px" aria-hidden="true" class="wp-block-spacer"></div>';
const spacerAt = jiufen.content.indexOf(SPACER, start);
if (spacerAt < 0) fail("/jiufen: spacer after the night tour not found");
const end = spacerAt + SPACER.length;
const removed = jiufen.content.slice(start, end);
if ((removed.match(/<h[23]/g) || []).length !== 1) fail("/jiufen: night tour section would remove more than one heading");
jiufen.content = (jiufen.content.slice(0, start) + jiufen.content.slice(end)).replace(/\n{5,}/g, "\n\n\n\n");
if (jiufen.content.includes("98800") || jiufen.content.includes("Tour-Night")) fail("/jiufen: night tour still referenced");
jiufen.modified = MODIFIED;

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2) + "\n");
console.log("/taiwan-railway: day pass fixed\n/jiufen: dead night tour section removed");
