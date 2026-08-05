import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const idx = posts.findIndex((p) => p.slug === "taipei-guide");
const post = posts[idx];

const oldSentence = `<p>Because the eligible countries (and day allowances) change from time to time, I've moved the full breakdown, the online arrival card process, and what happens at immigration into its own dedicated guide, which I'll keep updated as the rules change.</p>`;

if (!post.content.includes(oldSentence)) {
  console.error("Sentence not found — aborting.");
  process.exit(1);
}

const newSentence = `<p>See my full guide below for more details.</p>`;

post.content = post.content.replace(oldSentence, newSentence);
post.modified = "2026-08-05 13:20:00";

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log("Visa sentence simplified.");
