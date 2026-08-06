import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));

const essentialPosts = posts.filter((p) => (p.tags || []).some((t) => t.slug === "essential"));
console.log(`Found ${essentialPosts.length} posts tagged 'essential'.`);

let added = 0;
for (const post of essentialPosts) {
  const hasTopPick = post.tags.some((t) => t.slug === "top-pick");
  if (hasTopPick) {
    console.log(`  already has top-pick: ${post.slug}`);
    continue;
  }
  post.tags.push({ name: "Top Pick", slug: "top-pick" });
  added++;
  console.log(`  added top-pick to: ${post.slug}`);
}

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log(`Done. Added 'top-pick' tag to ${added} posts.`);
