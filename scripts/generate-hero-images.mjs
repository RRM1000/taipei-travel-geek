// Builds lib/hero-images.json: for every post's featured image (and the
// homepage hero slides), the best file to use as a full-width hero, with its
// real width and height.
//
// WordPress saved featured images at "-1024x725" and similar sizes, and that
// 1024px copy is what posts.json points at. Stretched across a 1440px+ hero it
// looks soft. Where a larger copy of the same photo survived the migration
// (the unsuffixed original, or a -1600x/-2048x size) the hero uses that
// instead - capped at MAX_WIDTH and MAX_BYTES so a 6000px camera original
// never becomes the LCP image.
//
// The site runs on Cloudflare Workers, where the page can't look at the file
// system, so this is worked out ahead of time. Re-run it after adding posts:
//   node scripts/generate-hero-images.mjs
// A post missing from the file still renders; it just keeps the posts.json
// image and reads its size off the filename.
import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";

const root = process.cwd();
const publicDir = path.join(root, "public");
const posts = JSON.parse(fs.readFileSync(path.join(root, "content", "posts.json"), "utf8"));

const MAX_WIDTH = 2400;
const MAX_BYTES = 1_200_000;

// Images used by the homepage hero (app/page.tsx), which aren't featured images.
const extraImages = [
  "/images/taipei-skyline.webp",
  "/media/2019/08/Shilin-Night-Market.jpg",
  "/media/2019/08/Chiang-Kai-Shek-8.jpg",
  "/media/2023/02/Xinyi-Shopping-District-2-edited.jpg",
  "/media/2026/08/dihua/20200116_152209.webp",
  "/media/2023/02/Xinbeitou-1-edited-scaled.jpg",
  "/media/2019/04/din-tai-fung.jpg",
];

function measure(webPath) {
  const file = path.join(publicDir, webPath);
  if (!fs.existsSync(file)) return null;
  try {
    const { width, height } = imageSize(fs.readFileSync(file));
    if (!width || !height) return null;
    return { src: webPath, width, height, bytes: fs.statSync(file).size };
  } catch {
    return null;
  }
}

/** Every size WordPress kept of the same photo, the original included. */
function variantsOf(webPath) {
  const sized = /^(.*)-\d+x\d+(\.\w+)$/.exec(webPath);
  const base = sized ? sized[1] : webPath.replace(/(\.\w+)$/, "");
  const ext = sized ? sized[2] : path.extname(webPath);
  const dir = path.posix.dirname(base);
  const stem = path.posix.basename(base);
  const absDir = path.join(publicDir, dir);
  if (!fs.existsSync(absDir)) return [];
  return fs
    .readdirSync(absDir)
    .filter((name) => {
      if (!name.endsWith(ext)) return false;
      if (name === stem + ext) return true;
      const middle = name.slice(stem.length, -ext.length);
      return name.startsWith(stem) && /^-\d+x\d+$/.test(middle);
    })
    .map((name) => `${dir}/${name}`);
}

function bestFor(webPath) {
  const current = measure(webPath);
  if (!current) return null;
  const ratio = current.width / current.height;
  const candidates = variantsOf(webPath)
    .map(measure)
    .filter(Boolean)
    // Same photo, not a WordPress crop to a different shape.
    .filter((c) => Math.abs(c.width / c.height - ratio) < 0.03)
    .filter((c) => c.width <= MAX_WIDTH && c.bytes <= MAX_BYTES);
  const best = [current, ...candidates].sort((a, b) => b.width - a.width)[0];
  return { src: best.src, width: best.width, height: best.height };
}

// Walk posts don't use a legacy route-map featured image as the hero (see
// walkHeroImage in app/[slug]/page.tsx); they fall back to an early photo in
// the post, so those are measured too.
const isWalk = (post) => /-(walking-route|walk|walking-tour)$/.test(post.slug) || post.content.includes("data-walk-route");
const walkPhotos = posts
  .filter(isWalk)
  .flatMap((post) => [...post.content.matchAll(/<img\b[^>]*\bsrc="(\/media\/[^"]+)"/g)].slice(0, 4).map((m) => m[1]));

const out = {};
const sources = new Set([...posts.map((post) => post.featuredImage).filter(Boolean), ...extraImages, ...walkPhotos]);
let upgraded = 0;
for (const src of [...sources].sort()) {
  const best = bestFor(src);
  if (!best) continue;
  out[src] = best;
  if (best.src !== src) upgraded++;
}

fs.writeFileSync(path.join(root, "lib", "hero-images.json"), `${JSON.stringify(out, null, 0).replace(/\},"/g, '},\n"')}\n`);
console.log(`Wrote ${Object.keys(out).length} hero images (${upgraded} upgraded to a larger file).`);
