import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const post = posts.find((p) => p.slug === "taiwan-sim-cards");
if (!post) { console.error("Post not found"); process.exit(1); }
let content = post.content;

// 625041 ("Sim Cards") -> 638410. Leave data-amount as-is on each widget.
const before625041 = (content.match(/data-adid="625041"/g) || []).length;
content = content.replace(/data-adid="625041"/g, 'data-adid="638410"');

// 638416 ("FarEasTone") -> 638410
const before638416 = (content.match(/data-adid="638416"/g) || []).length;
content = content.replace(/data-adid="638416"/g, 'data-adid="638410"');

// 625042 ("Wifi Router") is left untouched per explicit instruction.

console.log(`Replaced ${before625041} instance(s) of 625041 and ${before638416} instance(s) of 638416 with 638410.`);

post.content = content;
post.modified = "2026-08-06 17:20:00";

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log("Done.");
