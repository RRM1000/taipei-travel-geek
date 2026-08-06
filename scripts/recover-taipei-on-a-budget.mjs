import fs from "fs";
import path from "path";

const rawPath = path.resolve("scripts/_raw-taipei-on-a-budget-extracted.html");
let content = fs.readFileSync(rawPath, "utf8");

// 1. Strip the "Contextual Related Posts" plugin widget ("Other Topics")
//    embedded mid-article between the Hike and Temple sections. It's
//    auto-generated WordPress boilerplate, not original content, and the
//    site now has its own auto-related-reading engine that supersedes it.
{
  const startTag = '<h3 class="crp-list-title">';
  const start = content.indexOf(startTag);
  if (start === -1) throw new Error("crp-list-title marker not found - widget shape may have changed");

  const divOpenTag = '<div class="crp-list">';
  const divStart = content.indexOf(divOpenTag, start);
  let i = divStart + divOpenTag.length;
  let depth = 1;
  while (depth > 0 && i < content.length) {
    const nextOpen = content.indexOf("<div", i);
    const nextClose = content.indexOf("</div>", i);
    if (nextClose === -1) break;
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      i = nextOpen + 4;
    } else {
      depth--;
      i = nextClose + 6;
    }
  }
  content = content.slice(0, start) + content.slice(i);
}

// 2. Replace the old "Jump To" box with the site's current TOC block format.
content = content.replace(
  /<div style="background-color:#f2f1dc;border:1px dashed black">[\s\S]*?<\/ul><\/div>/,
  '<details class="article-toc-block"><summary>On this page</summary><nav aria-label="On this page"><ul>' +
    '<li><a href="#Tour">Book a Free Half-Day Guided Tour</a></li>' +
    '<li><a href="#Ximen">See the Street Art and Performers in Ximending</a></li>' +
    '<li><a href="#Bus">Take a Tourist Shuttle Bus to Yangmingshan</a></li>' +
    '<li><a href="#Zoo">Spend the Day at Taipei Zoo</a></li>' +
    '<li><a href="#Costume">Rent a Free Vintage Costume</a></li>' +
    '<li><a href="#Hall">Visit a Memorial Hall</a></li>' +
    '<li><a href="#Market">Go Bargain Hunting at a Day or Night Market</a></li>' +
    '<li><a href="#Park">Be at One with Nature in a Garden or Park</a></li>' +
    '<li><a href="#Cycle">Cycle to Danshui to See the Sunset</a></li>' +
    '<li><a href="#Museum">Visit a Cheap Museum or Art Gallery</a></li>' +
    '<li><a href="#Hike">Go Hiking in the Mountains</a></li>' +
    '<li><a href="#Temple">Admire a Beautiful Temple</a></li>' +
    '<li><a href="#NTU">Stroll Around the Huge NTU Campus</a></li>' +
    '<li><a href="#Coffee">Grab a Cheap Coffee at a Café or 7-11</a></li>' +
    "</ul></nav></details>",
);

// 3a. A handful of images are wrapped as <div class="wp-block-image"><figure
//     ...>...</figure></div> instead of the more common bare <figure>. Unwrap
//     these first so every image block has a single, matching pair of tags -
//     otherwise the strip-figure step below (which drops images with no
//     migrated equivalent) only consumes the inner </figure> and leaves a
//     dangling, unmatched </div> behind.
content = content.replace(
  /<div class="wp-block-image">\s*<figure\b([^>]*)>([\s\S]*?)<\/figure>\s*<\/div>/g,
  (_match, figureAttrs, inner) => `<figure${figureAttrs}>${inner}</figure>`,
);

// 3b. Collapse every lazyloaded <figure>...<img ...><noscript>...</noscript></figure>
//    (and the couple of <div class="wp-block-image"><figure>...</figure></div>
//    variants) down to a single plain <img>, resolving the real filename from
//    data-src. wp-content/uploads/YYYY/MM/name(-edited)?(-scaled)?.ext ->
//    look up the equivalent already-migrated file under /media.
const imageSubstitutions = {
  "2019/05/Ximen-6.jpg": "/media/2019/05/Ximen-4-1024x768.jpg",
  "2020/01/Danshui-Sunset-5.jpg": "/media/2019/10/Danshui-Sunset-3-1024x642.jpg",
  "2023/02/Jianguo-Flower-Market-2-edited.jpg": "/media/2019/07/Jianguo-Flower-Market-2-1024x754.jpg",
  "2023/07/Confucius-Temple-3-e1558421199613-edited-scaled.jpg": "/media/2019/05/Confucius-Temple-3-e1558421199613-1024x768.jpg",
  "2023/07/National-Taiwan-University-16-edited-scaled.jpg": "/media/2019/06/National-Taiwan-University-16-1024x768.jpg",
  "2023/07/Taipei-Convenience-Stores-2-edited.jpg": "/media/2019/05/Taipei-Convenience-Stores-2-1024x806.jpg",
};
// These never made it into the /media migration and have no equivalent -
// drop the whole figure rather than point at a 404.
const noEquivalent = [
  "2023/06/20191113_162414-edited.jpg", // guided tour lead photo
  "2023/07/20180507_164938-edited.jpg", // Yangmingshan bus lead photo
  "2023/07/Yuanshan-Scenic-Area-8.jpg", // cycling to Danshui
  "2023/07/vintage-costume.jpg", // costume rental
];

function resolveMediaPath(wpPath) {
  if (imageSubstitutions[wpPath]) return imageSubstitutions[wpPath];
  if (noEquivalent.includes(wpPath)) return null;
  // Already-migrated 1:1 cases (same year/month/filename, just needs the
  // /media prefix and its real migrated size suffix looked up separately).
  return `/media/${wpPath}`;
}

const knownMediaSizes = {
  "2019/05/Taipei-Fine-Arts-Museum-1.jpg": "/media/2019/05/Taipei-Fine-Arts-Museum-1-1024x700.jpg",
  "2019/08/Chiang-Kai-Shek-8.jpg": "/media/2019/08/Chiang-Kai-Shek-8-1024x689.jpg",
  "2020/01/Taipei-Botanical-Garden-2.jpg": "/media/2020/01/Taipei-Botanical-Garden-2-1024x693.jpg",
  "2020/01/Taipei-Zoo-Pangolin-Dome-2.jpg": "/media/2020/01/Taipei-Zoo-Pangolin-Dome-2-1024x702.jpg",
};

const figurePattern = /<(figure|div)\b[^>]*>\s*(?:<figure\b[^>]*>)?<img\b[^>]*?data-src="https?:\/\/(?:www\.)?taipeitravelgeek\.com\/wp-content\/uploads\/([^"]+?)(?:-\d+x\d+)?\.(jpg|png)"[^>]*?(?:alt="([^"]*)")?[^>]*>[\s\S]*?<\/(?:figure|div)>/gi;

content = content.replace(figurePattern, (match, _tag, wpPath, ext, alt) => {
  const key = `${wpPath}.${ext}`;
  const resolved = knownMediaSizes[key] || resolveMediaPath(key);
  if (!resolved) return ""; // no equivalent - drop the figure entirely
  const altText = alt || "";
  const figcaptionMatch = match.match(/<figcaption>([\s\S]*?)<\/figcaption>/);
  const figcaption = figcaptionMatch ? `<figcaption>${figcaptionMatch[1]}</figcaption>` : "";
  return `<figure class="wp-block-image size-large"><img src="${resolved}" alt="${altText}"/>${figcaption}</figure>`;
});

// 3c. Strip the inline <script> that bootstraps the Klook widget-fetch
//     loader. No other post on this site embeds this inline - the loader is
//     already brought in once, globally, by components/KlookAffiliate.tsx.
//     Leaving a raw <script> tag inside dangerouslySetInnerHTML content here
//     caused a hydration mismatch that cascaded into React silently dropping
//     several unrelated sibling sections (Ximen/Bus/Zoo/Costume/Hall) from
//     the rendered DOM, even though the stored content was correct.
content = content.replace(/<script[^>]*>[\s\S]*?<\/script>\s*/gi, "");

// 4. Convert absolute internal links to relative, site-relative paths.
content = content.replace(
  /href="https?:\/\/(?:www\.)?taipeitravelgeek\.com\/([^"]*)"/g,
  (_match, slugPath) => `href="/${slugPath}"`,
);

const unresolvedAbsolute = content.match(/taipeitravelgeek\.com/g);
if (unresolvedAbsolute) {
  console.warn(`Warning: ${unresolvedAbsolute.length} remaining taipeitravelgeek.com reference(s) left unconverted.`);
}
const remainingLazyload = content.match(/lazyload|data-src=/g);
if (remainingLazyload) {
  console.warn(`Warning: ${remainingLazyload.length} remaining lazyload/data-src reference(s) - an image figure didn't match the cleanup regex.`);
}
const remainingCrp = content.match(/crp-list/g);
if (remainingCrp) {
  console.warn(`Warning: ${remainingCrp.length} remaining crp-list reference(s) - widget strip may be incomplete.`);
}

fs.writeFileSync(path.resolve("scripts/_cleaned-taipei-on-a-budget.html"), content);
console.log("Cleaned content written to scripts/_cleaned-taipei-on-a-budget.html");
console.log("Length:", content.length);
