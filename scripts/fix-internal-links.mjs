import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const postsPath = path.join(root, "content", "posts.json");
const posts = JSON.parse(fs.readFileSync(postsPath, "utf8"));

const replacements = {
  "/danshui": "/best-day-trips-from-taipei",
  "/best-taipei-shopping-malls": "/best-shopping-malls-in-taipei",
  "/best-brunches-in-taipei": "/best-brunch-in-taipei",
  "/legacy": "/legacy-taipei",
  "/da-an-forest-park": "/daan-forest-park",
  "/taipei-botanical-gardens": "/taipei-botanical-garden",
  "/taipei-events": "/taipei-annual-events",
  "/taipei-public-transport#HSR": "/taipei-public-transport#taiwan-high-speed-rail",
};

for (const post of posts) {
  for (const [from, to] of Object.entries(replacements)) {
    post.content = post.content.replaceAll(`href="${from}"`, `href="${to}"`);
    post.content = post.content.replaceAll(`href='${from}'`, `href='${to}'`);
  }

  // Cafe Doux no longer has a corresponding section on this guide.
  post.content = post.content.replace(/<li><a href=["']#Doux["'][^>]*>[^<]*<\/a><\/li>/gi, "");
}

fs.writeFileSync(postsPath, `${JSON.stringify(posts, null, 2)}\n`);
