import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));

let totalReplaced = 0;
for (const post of posts) {
  if (!post.content || !post.content.includes('bgcolor="#fff28c"')) continue;
  const before = (post.content.match(/bgcolor="#fff28c"/gi) || []).length;
  post.content = post.content.replace(/<tr bgcolor="#fff28c">/gi, "<tr>");
  const after = (post.content.match(/bgcolor="#fff28c"/gi) || []).length;
  console.log(`${post.slug}: removed ${before - after} yellow highlight(s)`);
  totalReplaced += before - after;
  post.modified = "2026-08-05 10:15:00";
}

if (totalReplaced === 0) {
  console.error("No yellow table highlights found.");
  process.exit(1);
}

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log(`Done. Total removed: ${totalReplaced}`);
