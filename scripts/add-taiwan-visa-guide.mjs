import fs from "fs";
import path from "path";

const postsPath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(postsPath, "utf8"));

if (posts.some((p) => p.slug === "taiwan-visa-entry-requirements")) {
  console.error("taiwan-visa-entry-requirements already exists — aborting.");
  process.exit(1);
}

const content = fs.readFileSync(path.resolve("scripts/_content-taiwan-visa.html"), "utf8");
const maxId = Math.max(...posts.map((p) => p.id));

const today = new Date().toISOString().slice(0, 10) + " 08:00:00";

const newPost = {
  id: maxId + 1,
  authorId: 2,
  date: today,
  modified: today,
  slug: "taiwan-visa-entry-requirements",
  title: "Taiwan Visa & Entry Requirements - Do You Need a Visa? (2026 Guide)",
  excerpt:
    "Who needs a visa for Taiwan, how the 90-day visa-exempt entry works, and how to fill in the online arrival card before you fly so you skip the queues at the airport.",
  type: "post",
  parentId: 0,
  content,
  featuredImage: "/media/2019/08/Taipei-Airport-Express-3-1024x689.jpg",
  categories: [{ name: "Visit", slug: "visit" }],
  tags: [{ name: "Essential", slug: "essential" }],
};

posts.push(newPost);
fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
console.log(`Inserted taiwan-visa-entry-requirements as id ${newPost.id}. Total posts: ${posts.length}`);
