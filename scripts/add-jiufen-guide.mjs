import fs from "fs";
import path from "path";

const postsPath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(postsPath, "utf8"));

if (posts.some((p) => p.slug === "jiufen")) {
  console.error("jiufen already exists — aborting.");
  process.exit(1);
}

const content = fs.readFileSync(path.resolve("scripts/_content-jiufen.html"), "utf8");
const maxId = Math.max(...posts.map((p) => p.id));

const today = new Date().toISOString().slice(0, 10) + " 08:00:00";

const newPost = {
  id: maxId + 1,
  authorId: 2,
  date: today,
  modified: today,
  slug: "jiufen",
  title: "Jiufen Day Trip from Taipei - Full Guide (Lanterns, Tea Houses & Yin Yang Sea)",
  excerpt:
    "Everything you need for a Jiufen day trip from Taipei - how to get there, when to go to avoid the crowds, the best tea houses, food, and how to combine it with Shifen and the Northeast Coast.",
  type: "post",
  parentId: 0,
  content,
  featuredImage: "/media/2022/11/Jiufen2-1024x691.jpg",
  categories: [
    { name: "Visit", slug: "visit" },
    { name: "Areas", slug: "areas" },
  ],
  tags: [
    { name: "Top Pick", slug: "top-pick" },
    { name: "Walking", slug: "walking" },
    { name: "Great Views", slug: "great-views" },
  ],
};

posts.push(newPost);
fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
console.log(`Inserted jiufen as id ${newPost.id}. Total posts: ${posts.length}`);
