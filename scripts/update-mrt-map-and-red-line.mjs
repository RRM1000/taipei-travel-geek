// Point the MRT guide at the new network map and correct the red line.
//
// The image files were swapped in by replace-mrt-map.mjs; this updates the
// markup around them and the line table that had gone stale with them.
//
// THREE THINGS.
//
// 1. The figure gets `article-diagram`, which opts it out of the
//    max-height/object-fit cap on article images and makes it tappable to
//    expand. That cap is right for a portrait photo and ruinous for a map -
//    at 764x1179 in a 480px box it was showing the middle third and dropping
//    both ends of every line.
//
// 2. The dimensions change because the new map is a different shape
//    (764x1179, was 764x1024). Wrong width/height attributes mean the browser
//    reserves the wrong space and the page jumps as the image loads.
//
// 3. Tamsui-Xinyi no longer terminates at Xiangshan. The Xinyi Line East
//    Extension opened on 2026-08-30 and runs one stop further to
//    Guangci/Fengtian Temple. The new map's own legend gives the two service
//    patterns as Tamsui-Guangci/Fengtian Temple and Beitou-Daan, which is
//    what the bracket convention in this table encodes.

import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const post = posts.find((p) => p.slug === "mrt");

if (!post) {
  console.error("Post mrt not found!");
  process.exit(1);
}

let content = post.content;
const before = content;

// --- 1. The map figure ----------------------------------------------------
const oldFigure = `<figure class="wp-block-image aligncenter size-large"><a href="/media/2023/01/Taipei-MRT-Map-New.png"><img width="764" height="1024" src="/media/2023/01/Taipei-MRT-Map-New-764x1024.png" alt="Taipei MRT Map"/></a><figcaption>Taipei MRT Map</figcaption></figure>`;

const newFigure = `<figure class="wp-block-image aligncenter size-large article-diagram"><a href="/media/2023/01/Taipei-MRT-Map-New.png"><img width="764" height="1179" src="/media/2023/01/Taipei-MRT-Map-New-764x1024.png" alt="Taipei MRT map for 2026, showing all six metro lines - Wenhu (brown), Tamsui-Xinyi (red), Songshan-Xindian (green), Zhonghe-Xinlu (orange), Bannan (blue) and Circular (yellow) - plus the Taoyuan Airport MRT, Danhai and Ankeng light rail and the Maokong Gondola."/></a><figcaption>The 2026 Taipei MRT network. Tap the map to open it full size &ndash; the red line now runs east to Guangci/Fengtian Temple, one stop past Xiangshan, which opened on 30 August 2026.</figcaption></figure>`;

if (!content.includes(oldFigure)) {
  console.error("Map figure not found - aborting.");
  process.exit(1);
}
content = content.replace(oldFigure, newFigure);

// --- 2. The red line's eastern terminus -----------------------------------
const oldTerminus = "<td>Xiangshan<br>(Daan)</td>";
const newTerminus = "<td>Guangci/Fengtian Temple<br>(Daan)</td>";

if (!content.includes(oldTerminus)) {
  console.error("Red line terminus cell not found - aborting.");
  process.exit(1);
}
content = content.replace(oldTerminus, newTerminus);

if (content === before) {
  console.error("Nothing changed - aborting.");
  process.exit(1);
}

post.content = content;
post.modified = "2026-09-07 11:00:00";

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2) + "\n");

console.log("MRT guide updated:");
console.log("  ~ Map figure now article-diagram (uncropped, tap to expand)");
console.log("  ~ Dimensions corrected 764x1024 -> 764x1179");
console.log("  ~ Alt text and caption describe the 2026 network");
console.log("  ~ Red line terminus Xiangshan -> Guangci/Fengtian Temple");
