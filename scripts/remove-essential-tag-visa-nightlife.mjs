import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));

const slugs = ["taiwan-visa-entry-requirements", "taipei-nightlife"];

for (const slug of slugs) {
  const post = posts.find((p) => p.slug === slug);
  if (!post) { console.error(`NOT FOUND: ${slug}`); process.exit(1); }
  const before = post.tags.length;
  post.tags = post.tags.filter((t) => t.slug !== "essential");
  if (post.tags.length === before) {
    console.error(`essential tag not found on ${slug} — no change made.`);
    process.exit(1);
  }
  console.log(`Removed 'essential' from ${slug}. Remaining tags:`, JSON.stringify(post.tags));
}

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
