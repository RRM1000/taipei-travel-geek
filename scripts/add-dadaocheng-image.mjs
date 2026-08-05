import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const post = posts.find((p) => p.slug === "best-districts-and-areas");

const anchor = "<h3>Datong</h3>";
if (!post.content.includes(anchor)) {
  console.error("Anchor not found");
  process.exit(1);
}

const image = `<h3>Datong</h3>



<figure class="wp-block-image size-large"><img src="/media/2026/08/Dihua-Street-Arcade-1024x768.jpg" alt="Covered arcade on Dihua Street, Dadaocheng" class="wp-image-dihua-arcade"/></figure>`;

post.content = post.content.replace(anchor, image);
post.modified = "2026-08-05 16:00:00";

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log("Dadaocheng/Dihua Street image added to Datong section.");
