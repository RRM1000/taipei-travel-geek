import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));

const slugs = [
  "taiwan-tourist-tax-refund",
  "taipei-annual-events",
  "taoyuan-airport-mrt",
  "mrt",
  "christmas-dinners",
  "christmas-lights-2019",
  "taipei-101-fireworks-new-years-eve",
];

const widgetPattern = /<ins class="klk-aff-widget"\s*data-adid="642139"[^>]*>.*?<\/ins>\n*/g;

for (const slug of slugs) {
  const post = posts.find((p) => p.slug === slug);
  if (!post) { console.error(`NOT FOUND: ${slug}`); continue; }
  const before = post.content.length;
  post.content = post.content.replace(widgetPattern, "");
  const removed = before !== post.content.length;
  console.log(`${slug}: ${removed ? "removed" : "NOT FOUND / no change"}`);
}

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log("Done.");
