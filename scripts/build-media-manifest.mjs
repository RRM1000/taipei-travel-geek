// Builds lib/media-manifest.json: which sizes of each /media image exist on
// disk, with their pixel dimensions and file size.
//
// The site runs on a Cloudflare Worker, so the article renderer cannot look at
// public/media at request time. lib/content.ts imports this manifest instead to
// add srcset (from the WordPress "-WIDTHxHEIGHT" copies that actually exist)
// and to fill in width/height on images whose filename carries no size.
//
// Only the entries the renderer can use are kept: every group with more than
// one size, and every unsuffixed original (whose size is not in its name).
// A group with a single "-1024x768" file needs no entry - its size is in the
// filename. Images added later simply render without srcset until this is
// re-run, so a stale manifest degrades gracefully.
//
// Usage: node scripts/build-media-manifest.mjs
import { readdirSync, readFileSync, statSync, writeFileSync, openSync, readSync, closeSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const MEDIA = join(ROOT, "public", "media");
const OUT = join(ROOT, "lib", "media-manifest.json");
const NAME = /^(.*?)(-(\d+)x(\d+))?\.(jpe?g|png|webp|gif)$/i;

function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) walk(path, out);
    else out.push(path);
  }
  return out;
}

function head(path, bytes) {
  const fd = openSync(path, "r");
  try {
    const buffer = Buffer.alloc(bytes);
    const read = readSync(fd, buffer, 0, bytes, 0);
    return buffer.subarray(0, read);
  } finally {
    closeSync(fd);
  }
}

// Pixel size from the file header. JPEG needs a scan for the SOF marker,
// which can sit after a large EXIF block, so it falls back to the whole file.
function dimensions(path) {
  let b = head(path, 64 * 1024);
  if (b[0] === 0x89 && b.toString("ascii", 1, 4) === "PNG") return [b.readUInt32BE(16), b.readUInt32BE(20)];
  if (b.toString("ascii", 0, 3) === "GIF") return [b.readUInt16LE(6), b.readUInt16LE(8)];
  if (b.toString("ascii", 0, 4) === "RIFF" && b.toString("ascii", 8, 12) === "WEBP") {
    const chunk = b.toString("ascii", 12, 16);
    if (chunk === "VP8X") return [1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3)];
    if (chunk === "VP8L") {
      const bits = b.readUInt32LE(21);
      return [(bits & 0x3fff) + 1, ((bits >> 14) & 0x3fff) + 1];
    }
    if (chunk === "VP8 ") return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff];
    return null;
  }
  if (b[0] === 0xff && b[1] === 0xd8) {
    for (let pass = 0; pass < 2; pass++) {
      let i = 2;
      while (i + 9 < b.length) {
        if (b[i] !== 0xff) { i++; continue; }
        const marker = b[i + 1];
        if (marker === 0xff) { i++; continue; }
        const length = b.readUInt16BE(i + 2);
        const isSof = marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
        if (isSof) return [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)];
        i += 2 + length;
      }
      if (pass === 0) b = readFileSync(path);
    }
  }
  return null;
}

const groups = new Map();
for (const path of walk(MEDIA)) {
  const rel = "/media/" + path.slice(MEDIA.length + 1).split("\\").join("/");
  const file = rel.slice(rel.lastIndexOf("/") + 1);
  const m = NAME.exec(file);
  if (!m) continue;
  const stem = rel.slice(0, rel.length - file.length) + m[1];
  const suffix = rel.slice(stem.length);
  const sized = Boolean(m[2]);
  const kb = Math.round(statSync(path).size / 1024);
  if (!groups.has(stem)) groups.set(stem, []);
  groups.get(stem).push({ path, suffix, sized, w: sized ? Number(m[3]) : 0, h: sized ? Number(m[4]) : 0, kb });
}

const manifest = {};
let measured = 0;
for (const [stem, entries] of [...groups].sort(([a], [b]) => a.localeCompare(b))) {
  const hasOriginal = entries.some((e) => !e.sized);
  if (entries.length < 2 && !hasOriginal) continue;
  const rows = [];
  for (const e of entries) {
    if (!e.sized) {
      const dims = dimensions(e.path);
      if (!dims) continue;
      [e.w, e.h] = dims;
      measured++;
    }
    rows.push([e.suffix, e.w, e.h, e.kb]);
  }
  rows.sort((a, b) => a[1] - b[1]);
  if (rows.length) manifest[stem] = rows;
}

writeFileSync(OUT, JSON.stringify(manifest) + "\n");
console.log(`media manifest: ${Object.keys(manifest).length} groups, ${measured} originals measured -> ${OUT}`);
