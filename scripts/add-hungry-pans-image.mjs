import fs from "node:fs";
import path from "node:path";

const file = path.join(process.cwd(), "content", "posts.json");
const posts = JSON.parse(fs.readFileSync(file, "utf8"));
const guide = posts.find((post) => post.slug === "taipei-guide");

if (!guide) throw new Error("Taipei guide not found.");

const image = '<figure class="wp-block-image inline-guide-image"><img src="/media/2019/10/Hungry-Pans-12-1-1024x808.jpg" alt="A Hungry Pans salad in Taipei" loading="lazy"/></figure>';
guide.content = guide.content.replace(/(<h2 id="Hungry-Pans">Hungry Pans<\/h2>)(?!\s*<figure class="wp-block-image inline-guide-image">)/, `$1\n${image}`);
fs.writeFileSync(file, `${JSON.stringify(posts, null, 2)}\n`);
console.log("Added Hungry Pans image to Taipei guide.");
