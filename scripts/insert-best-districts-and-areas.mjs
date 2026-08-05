import fs from "fs";
import path from "path";

const postsPath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(postsPath, "utf8"));

if (posts.some((p) => p.slug === "best-districts-and-areas")) {
  console.error("best-districts-and-areas already exists — aborting.");
  process.exit(1);
}

const content = fs.readFileSync(path.resolve("scripts/_cleaned-best-districts.html"), "utf8");
const maxId = Math.max(...posts.map((p) => p.id));

const newPost = {
  id: maxId + 1,
  authorId: 2,
  date: "2023-06-29 10:00:00",
  modified: "2026-08-05 08:00:00",
  slug: "best-districts-and-areas",
  title: "A Guide to Every District in Taipei: Best Areas and Attractions in Each",
  excerpt: "A breakdown of Taipei's 12 main districts, with the best areas, attractions and walking routes to explore in each.",
  type: "post",
  parentId: 0,
  content,
  featuredImage: "/media/2023/01/Taipei-1024x678.jpg",
  categories: [
    { name: "Areas", slug: "areas" },
    { name: "Visit", slug: "visit" },
  ],
  tags: [{ name: "Lists", slug: "lists" }],
};

posts.push(newPost);
fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
console.log(`Inserted best-districts-and-areas as id ${newPost.id}. Total posts: ${posts.length}`);
