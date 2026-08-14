import fs from "fs";
import path from "path";

const postsPath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(postsPath, "utf8"));

const slug = "taipei-on-a-budget";
if (posts.some((p) => p.slug === slug)) {
  console.error(`${slug} already exists — aborting.`);
  process.exit(1);
}

const content = fs.readFileSync(path.resolve("scripts/_cleaned-taipei-on-a-budget.html"), "utf8");
const maxId = Math.max(...posts.map((p) => p.id));

const today = new Date().toISOString().slice(0, 10) + " 08:00:00";

const newPost = {
  id: maxId + 1,
  authorId: 2,
  date: "2023-07-08 00:00:00",
  modified: today,
  slug,
  title: "Taipei on a Budget: 16 Free or Cheap Things to Try",
  excerpt:
    "Some ideas for visitors with a limited budget, including cheap museums, free costume hire and cheap coffee.",
  type: "post",
  parentId: 0,
  content,
  featuredImage: "/media/2019/08/Chiang-Kai-Shek-8-1024x689.jpg",
  categories: [{ name: "Visit", slug: "visit" }],
  tags: [
    { name: "Budget", slug: "budget" },
    { name: "Free", slug: "free" },
    { name: "Lists", slug: "lists" },
  ],
};

posts.push(newPost);
fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
console.log(`Recovered ${slug} from the Wayback Machine as id ${newPost.id}. Total posts: ${posts.length}`);
