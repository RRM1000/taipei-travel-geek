import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const post = posts.find((p) => p.slug === "taiwan-easycard");
if (!post) { console.error("Post not found"); process.exit(1); }
let content = post.content;

const oldSection = `<h2 id="Easycard-Top-Up">How to Top Up</h2>

<p>You can top up your EasyCard with cash at:</p>
<ul>
  <li><strong>MRT Top-Up Machines &amp; Information Counters:</strong> Insert notes or coins at any station.</li>
  <li><strong>Convenience Stores:</strong> Hand your card and cash to the cashier at any 7-Eleven, FamilyMart, Hi-Life, or OK Mart.</li>
</ul>`;

if (!content.includes(oldSection)) {
  console.error("How to Top Up section not found — aborting without changes.");
  process.exit(1);
}

const newSection = `<h2 id="Easycard-Top-Up">How to Top Up</h2>

<figure class="wp-block-image aligncenter"><img src="/media/2026/08/easycard-topup.jpg" alt="EasyCard Top-Up Machine at MRT Station" class="wp-image-8456"/></figure>

<p>You can top up your EasyCard with cash at:</p>
<ul>
  <li><strong>MRT Top-Up Machines &amp; Information Counters:</strong> Insert notes or coins at any station. The machine will display your current balance and ask how much you want to add. It accepts notes and coins.</li>
  <li><strong>Convenience Stores:</strong> Hand your card and cash to the cashier at any 7-Eleven, FamilyMart, Hi-Life, or OK Mart. Tell them how much you want to add and they'll load it instantly.</li>
</ul>`;

content = content.replace(oldSection, newSection);
post.content = content;
post.modified = "2026-08-06 10:20:00";

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log("Added top-up machine image to taiwan-easycard.");
