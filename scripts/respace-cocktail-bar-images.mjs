import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const post = posts.find((p) => p.slug === "best-cocktail-bars-in-taipei");
if (!post) { console.error("Post not found"); process.exit(1); }
let content = post.content;

// 1. Remove the two bunched galleries added last time.
const galleryA = `<figure class="wp-block-gallery has-nested-images columns-default is-cropped">
<figure class="wp-block-image"><img src="/media/2026/08/Cocktail-Bar-Two-Drinks-Cherry-2-1024x1365.jpg" alt="Two cocktails at a Taipei bar"/></figure>
<figure class="wp-block-image"><img src="/media/2026/08/Cocktail-Bar-Rosemary-Orange-5-1024x1365.jpg" alt="Cocktail garnished with rosemary and orange"/></figure>
<figure class="wp-block-image"><img src="/media/2026/08/Cocktail-Bar-Hanging-Glass-7-1024x1365.jpg" alt="Cocktail served in a hanging glass orb"/></figure>
<figure class="wp-block-image"><img src="/media/2026/08/Cocktail-Bar-Pink-Flower-Cocktail-8-1024x1369.jpg" alt="Pink cocktail with a flower garnish"/></figure>
</figure>

`;
const galleryB = `<figure class="wp-block-gallery has-nested-images columns-default is-cropped">
<figure class="wp-block-image"><img src="/media/2026/08/Cocktail-Bar-Martini-Glass-1-1024x1365.jpg" alt="Martini glass at a Taipei bar"/></figure>
<figure class="wp-block-image"><img src="/media/2026/08/Cocktail-Bar-Coconut-Shell-3-1024x768.jpg" alt="Tropical cocktail served in a coconut shell"/></figure>
<figure class="wp-block-image"><img src="/media/2026/08/Cocktail-Bar-Orange-Slice-4-1024x1365.jpg" alt="Cocktail garnished with a dried orange slice"/></figure>
</figure>

`;
if (!content.includes(galleryA)) { console.error("galleryA not found — aborting."); process.exit(1); }
if (!content.includes(galleryB)) { console.error("galleryB not found — aborting."); process.exit(1); }
content = content.replace(galleryA, "").replace(galleryB, "");

// Side-by-side pair helper: uses flex with height:auto on each image, so both
// keep their own natural aspect ratio - no forced aspect-ratio/object-fit
// crop like the site's usual multi-image gallery transform applies.
const pair = (srcA, altA, srcB, altB) => `<div style="display:flex; gap:20px; margin:36px 0; flex-wrap:wrap;">
<img src="${srcA}" alt="${altA}" style="flex:1; min-width:220px; width:100%; height:auto; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.08);" loading="lazy"/>
<img src="${srcB}" alt="${altB}" style="flex:1; min-width:220px; width:100%; height:auto; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.08);" loading="lazy"/>
</div>

`;

// 2. Standalone landscape shot, right after the intro (before the TOC).
const landscapeFigure = `<figure class="wp-block-image size-large"><img src="/media/2026/08/Cocktail-Bar-Coconut-Shell-3-1024x768.jpg" alt="Tropical cocktail served in a coconut shell at a Taipei bar"/></figure>

`;
const tocAnchor = `<details class="article-toc-block">`;
if (!content.includes(tocAnchor)) { console.error("TOC anchor not found — aborting."); process.exit(1); }
content = content.replace(tocAnchor, `${landscapeFigure}${tocAnchor}`);

// 3. Three pairs, spread one per main section, right after each section's
// intro paragraph (before the first bar write-up).
const section1Anchor = `<p>For connoisseurs who appreciate meticulous craftsmanship, rare single-estate spirits, and world-renowned bartenders, these elite establishments set the global standard for craft cocktails.</p>`;
if (!content.includes(section1Anchor)) { console.error("Section 1 anchor not found — aborting."); process.exit(1); }
content = content.replace(
  section1Anchor,
  `${section1Anchor}\n\n${pair(
    "/media/2026/08/Cocktail-Bar-Two-Drinks-Cherry-2-1024x1365.jpg", "Two cocktails at a Taipei bar",
    "/media/2026/08/Cocktail-Bar-Rosemary-Orange-5-1024x1365.jpg", "Cocktail garnished with rosemary and orange"
  )}`
);

const section2Anchor = `<p>If your ideal night includes jaw-dropping city skylines, glamorous rooftop terraces, or visually stunning presentation, these photogenic spots guarantee an unforgettable night out.</p>`;
if (!content.includes(section2Anchor)) { console.error("Section 2 anchor not found — aborting."); process.exit(1); }
content = content.replace(
  section2Anchor,
  `${section2Anchor}\n\n${pair(
    "/media/2026/08/Cocktail-Bar-Hanging-Glass-7-1024x1365.jpg", "Cocktail served in a hanging glass orb",
    "/media/2026/08/Cocktail-Bar-Pink-Flower-Cocktail-8-1024x1369.jpg", "Pink cocktail with a flower garnish"
  )}`
);

const section3Anchor = `<p>For curious drinkers who want to taste authentic Taiwanese terroir, quirky ingredients, or playful thematic bar concepts, these innovative spots are not to be missed.</p>`;
if (!content.includes(section3Anchor)) { console.error("Section 3 anchor not found — aborting."); process.exit(1); }
content = content.replace(
  section3Anchor,
  `${section3Anchor}\n\n${pair(
    "/media/2026/08/Cocktail-Bar-Martini-Glass-1-1024x1365.jpg", "Martini glass at a Taipei bar",
    "/media/2026/08/Cocktail-Bar-Orange-Slice-4-1024x1365.jpg", "Cocktail garnished with a dried orange slice"
  )}`
);

post.content = content;
post.modified = "2026-08-07 11:20:00";

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log("Respaced cocktail bar images: standalone landscape near top, 3 uncropped pairs spread through the sections.");
