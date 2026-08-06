import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));

function apply(slug, edits) {
  const post = posts.find((p) => p.slug === slug);
  if (!post) { console.error(`NOT FOUND: ${slug}`); process.exit(1); }
  for (const { from, to, label } of edits) {
    if (!post.content.includes(from)) { console.error(`NOT FOUND on ${slug}: ${label}`); process.exit(1); }
    post.content = post.content.replace(from, to);
    console.log(`OK: ${slug} - ${label}`);
  }
  post.modified = "2026-08-05 22:00:00";
}

apply("taiwan-high-speed-rail-hsr-discounts-klook", [
  {
    label: "remove dangling 'step-by-step guide' sentence + broken gallery shortcode",
    from: `<p>I've added a step-by-step guide for purchasing tickets from these machines:</p>



[Best_Wordpress_Gallery id="90" gal_title="HSR Ticket Machine - Step by Step"]



`,
    to: "",
  },
]);

apply("din-tai-fung", [
  {
    label: "remove empty 'Menu' heading + broken gallery shortcode",
    from: `<h3 id="Menu">Menu</h3>



[Best_Wordpress_Gallery id="119" gal_title="Din Tai Fung Menu"]



`,
    to: "",
  },
  {
    label: "remove dead 'Menu' entry from the on-page TOC",
    from: `<li><a href="#Menu">Menu</a></li>`,
    to: "",
  },
]);

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log("Saved.");
