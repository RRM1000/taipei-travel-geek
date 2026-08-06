import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));

let headingRemovedCount = 0;
let shortcodeOnlyCount = 0;
let tocEntriesRemoved = 0;
const touchedSlugs = [];

for (const post of posts) {
  if (!/\[Best_Wordpress_Gallery/.test(post.content || "")) continue;

  let content = post.content;
  let changed = false;

  // Case 1: an empty heading whose only content was the shortcode -
  // e.g. <h3>Menu</h3>\n\n\n\n[Best_Wordpress_Gallery ...]
  const headingBeforePattern = /<h([234])([^>]*)>([^<]*)<\/h\1>\s*\[Best_Wordpress_Gallery[^\]]*\]\s*/;
  const headingMatch = content.match(headingBeforePattern);

  if (headingMatch) {
    const [full, , attrs, headingText] = headingMatch;
    content = content.replace(full, "");
    changed = true;
    headingRemovedCount++;

    // Remove the matching TOC entry, by id if the heading had one, else by
    // matching the visible link text.
    const idMatch = attrs.match(/id=["']([^"']+)["']/);
    if (idMatch) {
      const tocPattern = new RegExp(`<li><a href="#${idMatch[1]}">[^<]*<\\/a></li>`);
      if (tocPattern.test(content)) {
        content = content.replace(tocPattern, "");
        tocEntriesRemoved++;
      }
    } else {
      const escapedText = headingText.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const tocPattern = new RegExp(`<li><a href="#[^"]*">${escapedText}<\\/a></li>`);
      if (tocPattern.test(content)) {
        content = content.replace(tocPattern, "");
        tocEntriesRemoved++;
      }
    }
  } else {
    // Case 2: shortcode sitting inline with no dedicated heading - just
    // remove the shortcode and one block of surrounding blank-line padding.
    const inlinePattern = /\[Best_Wordpress_Gallery[^\]]*\]\s*/;
    if (inlinePattern.test(content)) {
      content = content.replace(inlinePattern, "");
      changed = true;
      shortcodeOnlyCount++;
    }
  }

  if (/Best_Wordpress_Gallery/.test(content)) {
    console.error(`STILL PRESENT after processing: ${post.slug}`);
    process.exit(1);
  }

  if (changed) {
    post.content = content;
    post.modified = "2026-08-05 22:30:00";
    touchedSlugs.push(post.slug);
  }
}

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log(`Posts with heading removed: ${headingRemovedCount}`);
console.log(`Posts with shortcode-only removed: ${shortcodeOnlyCount}`);
console.log(`TOC entries removed: ${tocEntriesRemoved}`);
console.log(`Total posts touched: ${touchedSlugs.length}`);
console.log(touchedSlugs.join(", "));
