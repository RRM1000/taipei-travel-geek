import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const post = posts.find((p) => p.slug === "best-cocktail-bars-in-taipei");
if (!post) { console.error("Post not found"); process.exit(1); }

// Hero: the bartender-in-action shot - best "establishing" scene for a cocktail bars guide.
post.featuredImage = "/media/2026/08/Cocktail-Bar-Bartender-Pouring-6-1024x1365.jpg";

const galleryA = `<figure class="wp-block-gallery has-nested-images columns-default is-cropped">
<figure class="wp-block-image"><img src="/media/2026/08/Cocktail-Bar-Two-Drinks-Cherry-2-1024x1365.jpg" alt="Two cocktails at a Taipei bar"/></figure>
<figure class="wp-block-image"><img src="/media/2026/08/Cocktail-Bar-Rosemary-Orange-5-1024x1365.jpg" alt="Cocktail garnished with rosemary and orange"/></figure>
<figure class="wp-block-image"><img src="/media/2026/08/Cocktail-Bar-Hanging-Glass-7-1024x1365.jpg" alt="Cocktail served in a hanging glass orb"/></figure>
<figure class="wp-block-image"><img src="/media/2026/08/Cocktail-Bar-Pink-Flower-Cocktail-8-1024x1369.jpg" alt="Pink cocktail with a flower garnish"/></figure>
</figure>`;

const galleryB = `<figure class="wp-block-gallery has-nested-images columns-default is-cropped">
<figure class="wp-block-image"><img src="/media/2026/08/Cocktail-Bar-Martini-Glass-1-1024x1365.jpg" alt="Martini glass at a Taipei bar"/></figure>
<figure class="wp-block-image"><img src="/media/2026/08/Cocktail-Bar-Coconut-Shell-3-1024x768.jpg" alt="Tropical cocktail served in a coconut shell"/></figure>
<figure class="wp-block-image"><img src="/media/2026/08/Cocktail-Bar-Orange-Slice-4-1024x1365.jpg" alt="Cocktail garnished with a dried orange slice"/></figure>
</figure>`;

const anchor = `<details class="article-toc-block">`;
if (!post.content.includes(anchor)) { console.error("TOC anchor not found — aborting."); process.exit(1); }

post.content = post.content.replace(anchor, `${galleryA}\n\n${galleryB}\n\n${anchor}`);
post.modified = "2026-08-07 11:00:00";

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log("Added hero + gallery images to best-cocktail-bars-in-taipei.");
