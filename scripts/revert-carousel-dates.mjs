import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));

const originalDates = {
  "kaikai-dessert": "2019-12-20 08:48:51",
  "best-places-to-drink-craft-beer-taipei": "2019-06-12 08:33:00",
  "taipei-east-district-dongqu": "2019-07-02 02:34:42",
};

for (const [slug, date] of Object.entries(originalDates)) {
  const post = posts.find((p) => p.slug === slug);
  if (!post) { console.error(`NOT FOUND: ${slug}`); continue; }
  post.date = date;
  console.log(`${slug}: date reverted to ${date} (modified kept as-is: ${post.modified})`);
}

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log("Done.");
