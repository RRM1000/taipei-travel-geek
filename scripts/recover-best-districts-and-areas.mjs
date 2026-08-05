import fs from "fs";
import path from "path";

const scratchPath = path.resolve(
  process.env.SCRATCH_HTML_PATH ||
    "C:/Users/rober/AppData/Local/Temp/claude/C--Users-rober-Projects-taipei-travel-geek/7eeb2e72-ce98-4d05-9fc1-25da077848d0/scratchpad/raw-best-districts.html"
);

let content = fs.readFileSync(scratchPath, "utf8");

// 1. Drop the outer wprt-container wrapper div.
content = content.replace(/^<div class="wprt-container">\n/, "").replace(/\n<\/div>\n?$/, "");

// 2. Clean up lazyloaded <figure> images: drop the noscript duplicate, pull the
//    real URL from data-src, rewrite to the site's local /media path, and strip
//    all the lazyload/srcset cruft down to the plain <img> format used elsewhere
//    in posts.json.
content = content.replace(
  /<figure class="wp-block-image([^"]*)"><img[^>]*alt="([^"]*)"[^>]*data-src="(?:https?:)?\/\/(?:www\.)?taipeitravelgeek\.com\/wp-content\/uploads\/([^"]+)"[^>]*class="(wp-image-\d+)[^"]*"[^>]*><noscript>.*?<\/noscript><\/figure>/gs,
  (_match, sizeClass, alt, mediaPath, wpImageClass) => {
    return `<figure class="wp-block-image${sizeClass}"><img src="/media/${mediaPath}" alt="${alt}" class="${wpImageClass}"/></figure>`;
  }
);

// 3. Unwrap tables: enhanceTables() adds the table-responsive wrapper at render
//    time, so the stored content should just have the bare <table>.
content = content.replace(
  /<figure class="wp-block-table"><div class="table-responsive wprt_style_display">(<table[\s\S]*?<\/table>)<\/div><\/figure>/g,
  "$1"
);

// 4. Convert absolute internal links to relative, site-relative paths.
content = content.replace(
  /href="https?:\/\/(?:www\.)?taipeitravelgeek\.com\/([^"]*)"/g,
  (_match, slugPath) => `href="/${slugPath}"`
);

// 5. Three images from the archive never made it into the /media migration.
//    Two have an equivalent still on disk; the third (a generic, alt="" lead
//    shot for the "Other Districts" section) has no equivalent at all, so
//    that whole <figure> is dropped rather than pointing at a 404.
content = content.replace(
  '<img src="/media/2023/02/Xinbeitou-1-edited-1024x683.jpg" alt="Xinbeitou" class="wp-image-9937"/>',
  '<img src="/media/2023/02/Xinbeitou-1-edited-scaled.jpg" alt="Xinbeitou" class="wp-image-9937"/>'
);
content = content.replace(
  '<img src="/media/2020/01/Danshui-Sunset-5-1024x703.jpg" alt="Danshui Sunset" class="wp-image-7922"/>',
  '<img src="/media/2019/10/Danshui-Sunset-3-1024x642.jpg" alt="Danshui Sunset" class="wp-image-7922"/>'
);
content = content.replace(
  '<figure class="wp-block-image size-large"><img src="/media/2023/06/20191113_162414-edited.jpg" alt="" class="wp-image-10538"/></figure>\n\n\n\n',
  ""
);

const unresolvedAbsolute = content.match(/taipeitravelgeek\.com/g);
if (unresolvedAbsolute) {
  console.warn(`Warning: ${unresolvedAbsolute.length} remaining taipeitravelgeek.com reference(s) left unconverted.`);
}
const remainingLazyload = content.match(/lazyload|data-src=/g);
if (remainingLazyload) {
  console.warn(`Warning: ${remainingLazyload.length} remaining lazyload/data-src reference(s) — an image figure didn't match the cleanup regex.`);
}

fs.writeFileSync(path.resolve("scripts/_cleaned-best-districts.html"), content);
console.log("Cleaned content written to scripts/_cleaned-best-districts.html");
console.log("Length:", content.length);
