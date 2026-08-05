import fs from "fs";
import path from "path";

const postsPath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(postsPath, "utf8"));

const slug = "taipei-itinerary-3-5-days";
if (posts.some((p) => p.slug === slug)) {
  console.error(`${slug} already exists — aborting.`);
  process.exit(1);
}

const content = fs.readFileSync(path.resolve("scripts/_content-taipei-itinerary.html"), "utf8");
const maxId = Math.max(...posts.map((p) => p.id));

const today = new Date().toISOString().slice(0, 10) + " 08:00:00";

const newPost = {
  id: maxId + 1,
  authorId: 2,
  date: today,
  modified: today,
  slug,
  title: "3-5 Day Taipei Itinerary - The Perfect First-Time Trip Plan",
  excerpt:
    "A detailed day-by-day Taipei itinerary for 3 to 5 days, grouped by district so you're never criss-crossing the city - temples, night markets, Taipei 101, museums and day trips, with full guides linked for every stop.",
  type: "post",
  parentId: 0,
  content,
  featuredImage: "/media/2023/01/Taipei-1024x678.jpg",
  categories: [
    { name: "Visit", slug: "visit" },
    { name: "Areas", slug: "areas" },
  ],
  tags: [
    { name: "Top Pick", slug: "top-pick" },
    { name: "Lists", slug: "lists" },
    { name: "Essential", slug: "essential" },
  ],
};

posts.push(newPost);
fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
console.log(`Inserted ${slug} as id ${newPost.id}. Total posts: ${posts.length}`);
