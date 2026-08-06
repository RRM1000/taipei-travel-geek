import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const post = posts.find((p) => p.slug === "taipei-101");
if (!post) { console.error("Post not found"); process.exit(1); }
let content = post.content;

// Both of these are ticket options within the same Klook activity as "Standard"
// (1659-taipei-101-taipei), not separate listings.
const standardUrl = "https://www.klook.com/en-GB/activity/1659-taipei-101-taipei/?aid=8733";

const oldAddon = `<tr><td>101 Floor Add-on</td><td>+380</td><td>Adds 101F access on top of the standard ticket (total NT$980)</td></tr>`;
const newAddon = `<tr><td><a href="${standardUrl}" target="_blank" rel="noreferrer noopener">101 Floor Add-on</a></td><td>+380</td><td>Adds 101F access on top of the standard ticket (total NT$980)</td></tr>`;

const oldFastTrack = `<tr><td>Fast-Track</td><td>1,200</td><td>Skip the queue</td></tr>`;
const newFastTrack = `<tr><td><a href="${standardUrl}" target="_blank" rel="noreferrer noopener">Fast-Track</a></td><td>1,200</td><td>Skip the queue</td></tr>`;

if (!content.includes(oldAddon)) { console.error("101 Floor Add-on row not found — aborting."); process.exit(1); }
if (!content.includes(oldFastTrack)) { console.error("Fast-Track row not found — aborting."); process.exit(1); }

content = content.replace(oldAddon, newAddon);
content = content.replace(oldFastTrack, newFastTrack);

post.content = content;
post.modified = "2026-08-06 15:00:00";

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log("Linked 101 Floor Add-on and Fast-Track rows in the taipei-101 price table.");
