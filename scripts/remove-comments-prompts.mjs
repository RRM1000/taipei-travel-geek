import fs from "node:fs";
import path from "node:path";

const file = path.join(process.cwd(), "content", "posts.json");
const posts = JSON.parse(fs.readFileSync(file, "utf8"));
const guide = posts.find((post) => post.slug === "taipei-annual-events");

if (!guide) throw new Error("Annual events guide not found.");

guide.content = guide.content.replace(/\s*<p><em>Do you have any other suggestions for annual events\? Let me know in the comments!<\/em><\/p>\s*/i, "\n");
fs.writeFileSync(file, `${JSON.stringify(posts, null, 2)}\n`);
console.log("Removed annual events comments prompt.");
