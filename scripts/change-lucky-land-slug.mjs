import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));

// 1. Change slug of Lucky Land post to taiwan-lucky-land-giveaway
const luckyPost = posts.find(
  (p) => p.slug === "taiwan-lucky-land" || p.slug === "taiwan-lucky-land-giveaway"
);

if (luckyPost) {
  luckyPost.slug = "taiwan-lucky-land-giveaway";
  console.log("Updated Lucky Land post slug to: taiwan-lucky-land-giveaway");
} else {
  console.error("Lucky land post not found!");
}

// 2. Update link inside taiwan-easycard post
const easyPost = posts.find((p) => p.slug === "taiwan-easycard");
if (easyPost) {
  easyPost.content = easyPost.content.replace(
    /\/taiwan-lucky-land/g,
    "/taiwan-lucky-land-giveaway"
  );
  console.log("Updated links in taiwan-easycard to /taiwan-lucky-land-giveaway");
}

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log("Successfully updated slug and links in posts.json!");
