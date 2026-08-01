import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const posts = JSON.parse(fs.readFileSync(path.join(projectRoot, "content", "posts.json"), "utf8"));
const uploadsRoot = path.resolve(projectRoot, "..", "wp-content", "uploads");
const destinationRoot = path.join(projectRoot, "public", "media");
const copyFiles = process.argv.includes("--copy");
const references = new Set();

for (const post of posts) {
  if (post.featuredImage?.startsWith("/media/")) references.add(post.featuredImage);
  for (const match of post.content.matchAll(/(?:src|href)=["'](\/media\/[^"'#?]+)[^"']*["']/gi)) {
    references.add(decodeURIComponent(match[1]));
  }
}

let totalBytes = 0;
let found = 0;
const missing = [];

for (const reference of references) {
  const relativePath = reference.replace(/^\/media\//, "");
  const sourcePath = path.join(uploadsRoot, relativePath);

  if (!fs.existsSync(sourcePath)) {
    missing.push(relativePath);
    continue;
  }

  found += 1;
  totalBytes += fs.statSync(sourcePath).size;

  if (copyFiles) {
    const destinationPath = path.join(destinationRoot, relativePath);
    fs.mkdirSync(path.dirname(destinationPath), { recursive: true });
    fs.copyFileSync(sourcePath, destinationPath);
  }
}

const summary = {
  mode: copyFiles ? "copied" : "dry-run",
  referencedFiles: references.size,
  found,
  missing: missing.length,
  totalMB: Math.round((totalBytes / 1024 / 1024) * 10) / 10,
};

console.log(JSON.stringify(summary, null, 2));
if (missing.length) console.log(`Missing media sample: ${missing.slice(0, 12).join(", ")}`);
