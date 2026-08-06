import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const post = posts.find((p) => p.slug === "taipei-itinerary-3-5-days");
if (!post) { console.error("Post not found"); process.exit(1); }

const before = post.tags.length;
post.tags = post.tags.filter((t) => t.slug !== "essential");
if (post.tags.length === before) { console.error("essential tag not found — no change made."); process.exit(1); }

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log("Removed 'essential' tag from taipei-itinerary-3-5-days.");
console.log("Remaining tags:", JSON.stringify(post.tags));
