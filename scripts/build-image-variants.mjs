// Builds smaller WebP copies of every photo in public/media and public/images,
// into public/sized/, and lists them in lib/image-variants.json.
//
// Why: the site runs on a Cloudflare Worker with no image resizing (the
// /_vinext/image route needs an IMAGES binding the host does not have), so
// phones were being sent the full 1024-2400px JPEGs for 330px-wide cards.
// lib/responsive-images.ts reads the JSON and turns it into srcset, so each
// browser picks the smallest copy that is still sharp at its screen width.
//
// What gets made, per photo (one set per photo, from its largest copy on
// disk - WordPress's "-1024x768" copies share a set with their original):
//   - 400w and 800w WebP for everything (cards, thumbnails, article images)
//   - 1200w and 1600w as well for photos used full-width: post featured
//     images and the hero images in lib/hero-images.json
//   - a copy at the photo's own width where the original is heavy (see
//     FULL_COPY_MAX below)
// Never wider than the source. GIFs are left alone (some are animated).
//
// It is incremental: a photo whose source file is unchanged (same file, same
// byte size) and whose copies are all on disk is skipped, so a run with
// nothing new takes a second or two. Copies for photos that no longer exist
// are deleted. It runs as part of `npm run build`; commit public/sized/ and
// lib/image-variants.json along with any new images, so the Cloudflare build
// has nothing to make.
//
// If sharp cannot be loaded, nothing is generated and the JSON keeps only the
// copies already on disk - pages then fall back to the original files.
//
// Usage: node scripts/build-image-variants.mjs
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { cpus } from "node:os";
import { dirname, join, relative, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const PUBLIC = join(ROOT, "public");
const SOURCE_DIRS = ["media", "images"];
const OUT_DIR = join(PUBLIC, "sized");
const MANIFEST = join(ROOT, "lib", "image-variants.json");
const POSTS = join(ROOT, "content", "posts.json");
const HERO_IMAGES = join(ROOT, "lib", "hero-images.json");

const BASE_WIDTHS = [400, 800];
const LARGE_WIDTHS = [400, 800, 1200, 1600];
// A large source a little over 1200px (1600x1067 is common) gets one copy at
// its own width too, so wide screens are not sent the heavy original JPEG.
// So does any PNG or poorly compressed JPEG (over HEAVY_BYTES_PER_PIXEL): a
// 634px photo saved as a 500 KB PNG is a 60 KB WebP at the same size.
const FULL_COPY_MAX = 1700;
const HEAVY_BYTES_PER_PIXEL = 0.35;
const NAME = /^(.*?)(-(\d+)x(\d+))?\.(jpe?g|png|webp)$/i;

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) walk(path, out);
    else out.push(path);
  }
  return out;
}

const toWeb = (path) => "/" + relative(PUBLIC, path).split("\\").join("/");
const variantUrl = (stem, width) => `/sized${stem}-${width}w.webp`;
const variantPath = (stem, width) => join(PUBLIC, variantUrl(stem, width).slice(1));

/** "/media/2019/08/Shilin-Night-Market-1024x725.jpg" -> its group's stem and extension. */
function parse(web) {
  const slash = web.lastIndexOf("/");
  const m = NAME.exec(web.slice(slash + 1));
  if (!m) return null;
  return { stem: web.slice(0, slash + 1) + m[1], ext: m[5].toLowerCase(), sized: Boolean(m[2]), w: Number(m[3] || 0) };
}

function stemOf(web) {
  return web ? parse(web.split("?")[0])?.stem : undefined;
}

// Photos shown full-width somewhere, which need the larger copies.
const large = new Set();
try {
  for (const post of JSON.parse(readFileSync(POSTS, "utf8"))) {
    const stem = stemOf(post.featuredImage);
    if (stem) large.add(stem);
  }
} catch (error) {
  console.warn(`image variants: could not read ${POSTS} (${error.message}); only base sizes for featured images`);
}
try {
  for (const [key, value] of Object.entries(JSON.parse(readFileSync(HERO_IMAGES, "utf8")))) {
    for (const web of [key, value?.src]) {
      const stem = stemOf(web);
      if (stem) large.add(stem);
    }
  }
} catch (error) {
  console.warn(`image variants: could not read ${HERO_IMAGES} (${error.message})`);
}

// Group every copy of the same photo; the source is the unsuffixed original if
// there is one (WordPress never made a copy larger than it), else the widest.
const groups = new Map();
for (const dir of SOURCE_DIRS) {
  for (const path of walk(join(PUBLIC, dir))) {
    const web = toWeb(path);
    const info = parse(web);
    if (!info) continue;
    const group = groups.get(info.stem) ?? [];
    group.push({ ...info, path, web });
    groups.set(info.stem, group);
  }
}

const sources = new Map();
for (const [stem, files] of groups) {
  // Two different photos can share a stem (photo.jpg and photo.png). Keep the
  // extension of the largest; the other one simply gets no smaller copies.
  const byExt = new Map();
  for (const f of files) byExt.set(f.ext, [...(byExt.get(f.ext) ?? []), f]);
  let best = null;
  for (const list of byExt.values()) {
    const original = list.find((f) => !f.sized);
    const pick = original ?? list.reduce((a, b) => (b.w > a.w ? b : a));
    const bytes = statSync(pick.path).size;
    if (!best || bytes > best.bytes) best = { ...pick, bytes };
  }
  sources.set(stem, best);
}

function wantedWidths(stem, ext, bytes, width, height) {
  const isLarge = large.has(stem);
  const widths = (isLarge ? LARGE_WIDTHS : BASE_WIDTHS).filter((w) => w < width);
  const heavy = ext === "png" || bytes / (width * height) > HEAVY_BYTES_PER_PIXEL;
  const uncovered = width > (widths.at(-1) ?? 0);
  if (uncovered && width <= FULL_COPY_MAX && ((isLarge && width > 1200) || heavy)) widths.push(width);
  return widths;
}

let previous = {};
try {
  previous = JSON.parse(readFileSync(MANIFEST, "utf8"));
} catch {
  // First run, or an unreadable file: everything is (re)checked below.
}

let sharp = null;
try {
  sharp = (await import("sharp")).default;
  sharp.cache(false);
} catch (error) {
  console.warn(`image variants: sharp is not available (${error.message}); keeping existing copies only`);
}

// Manifest row: [ext, source suffix, source bytes, width, height, ...variant widths]
const manifest = {};
const jobs = [];
for (const [stem, src] of [...sources].sort(([a], [b]) => a.localeCompare(b))) {
  const suffix = src.web.slice(stem.length);
  const old = previous[stem];
  const same = old && old[0] === src.ext && old[1] === suffix && old[2] === src.bytes;
  if (same) {
    const widths = old.slice(5);
    const wanted = wantedWidths(stem, old[0], old[2], old[3], old[4]);
    const onDisk = widths.every((w) => existsSync(variantPath(stem, w)));
    if (onDisk && wanted.length === widths.length && wanted.every((w, i) => w === widths[i])) {
      manifest[stem] = old;
      continue;
    }
  }
  if (!sharp) {
    // Can't make anything: keep whatever valid copies are already there.
    if (same) {
      const kept = old.slice(5).filter((w) => existsSync(variantPath(stem, w)));
      if (kept.length) manifest[stem] = [...old.slice(0, 5), ...kept];
    }
    continue;
  }
  jobs.push({ stem, src, suffix });
}

let made = 0;
let failed = 0;
async function run({ stem, src, suffix }) {
  try {
    const input = readFileSync(src.path);
    const meta = await sharp(input).metadata();
    // EXIF orientations 5-8 are quarter turns: the upright image is h x w.
    const turned = (meta.orientation ?? 1) >= 5;
    const width = turned ? meta.height : meta.width;
    const height = turned ? meta.width : meta.height;
    if (!width || !height) throw new Error("no dimensions");
    const widths = wantedWidths(stem, src.ext, src.bytes, width, height);
    const quality = src.ext === "png" ? 85 : 72;
    for (const w of widths) {
      const out = variantPath(stem, w);
      mkdirSync(dirname(out), { recursive: true });
      await sharp(input)
        .rotate()
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality, effort: 5, smartSubsample: true })
        .toFile(out);
      made++;
    }
    manifest[stem] = [src.ext, suffix, src.bytes, width, height, ...widths];
  } catch (error) {
    failed++;
    console.warn(`image variants: skipped ${src.web} (${error.message})`);
  }
}

const queue = [...jobs];
const workers = Array.from({ length: Math.max(1, Math.min(8, cpus().length - 1)) }, async () => {
  while (queue.length) await run(queue.shift());
});
await Promise.all(workers);

// Delete copies nothing points at any more (a photo removed or replaced).
const keep = new Set();
for (const [stem, row] of Object.entries(manifest)) {
  for (const w of row.slice(5)) keep.add(variantPath(stem, w));
}
let removed = 0;
if (sharp) {
  for (const path of walk(OUT_DIR)) {
    if (!keep.has(path)) {
      rmSync(path);
      removed++;
    }
  }
}

const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
const json = "{\n" + Object.entries(sorted).map(([k, v]) => `${JSON.stringify(k)}:${JSON.stringify(v)}`).join(",\n") + "\n}\n";
const before = existsSync(MANIFEST) ? readFileSync(MANIFEST, "utf8") : "";
if (json !== before) writeFileSync(MANIFEST, json);

const files = Object.values(sorted).reduce((n, row) => n + row.length - 5, 0);
console.log(
  `image variants: ${Object.keys(sorted).length} photos, ${files} copies` +
    ` (${made} made, ${removed} removed${failed ? `, ${failed} failed` : ""}) -> ${relative(ROOT, MANIFEST)}`,
);
