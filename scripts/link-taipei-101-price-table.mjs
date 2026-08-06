import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const post = posts.find((p) => p.slug === "taipei-101");
if (!post) { console.error("Post not found"); process.exit(1); }
let content = post.content;

const standardUrl = "https://www.klook.com/en-GB/activity/1659-taipei-101-taipei/?aid=8733";
const skylineUrl = "https://www.klook.com/en-GB/activity/23966-101-skyline-460-skip-the-line-ticket-taipei/?aid=8733";

const oldStandard = `<tr><td>Standard</td><td>600</td><td>88F - 91F</td></tr>`;
const newStandard = `<tr><td><a href="${standardUrl}" target="_blank" rel="noreferrer noopener">Standard</a></td><td>600</td><td>88F - 91F</td></tr>`;

const oldSkyline = `<tr><td>Skyline 460</td><td>3,000</td><td>Reservation only. Outdoor 101F platform + 88F-91F. Min. height 145cm, weight 30-120kg, ages 12-75</td></tr>`;
const newSkyline = `<tr><td><a href="${skylineUrl}" target="_blank" rel="noreferrer noopener">Skyline 460</a></td><td>3,000</td><td>Reservation only. Outdoor 101F platform + 88F-91F. Min. height 145cm, weight 30-120kg, ages 12-75</td></tr>`;

if (!content.includes(oldStandard)) { console.error("Standard row not found — aborting."); process.exit(1); }
if (!content.includes(oldSkyline)) { console.error("Skyline 460 row not found — aborting."); process.exit(1); }

content = content.replace(oldStandard, newStandard);
content = content.replace(oldSkyline, newSkyline);

post.content = content;
post.modified = "2026-08-06 14:15:00";

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log("Linked Standard and Skyline 460 rows in the taipei-101 price table.");
