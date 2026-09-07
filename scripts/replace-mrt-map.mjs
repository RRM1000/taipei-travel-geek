// Swap in the current Taipei MRT network map.
//
// The map on the guide was the April 2023 edition and showed Xiangshan as
// the Tamsui-Xinyi terminus. The Xinyi Line East Extension opened on
// 2026-08-30 and the line now runs one stop further, to Guangci/Fengtian
// Temple. The 2023 map also predates the Sanying Line and the Ankeng LRT.
//
// WRITTEN OVER THE EXISTING FILENAMES ON PURPOSE. This image pulls 23,803
// impressions a month in image search, and both paths are what Google has
// indexed - a new filename would throw that away for no gain. The side
// effect is that "-764x1024" is now nominal: the new map is a different
// shape (1280x1975 rather than 960x1286), so the resized variant is
// 764x1179. Nothing parses the dimensions out of the name; the markup
// carries the real ones.

import fs from "fs";
import path from "path";
import sharp from "sharp";

const SOURCE = "C:/Users/rober/Downloads/mrt-map.png";
const FULL = path.resolve("public/media/2023/01/Taipei-MRT-Map-New.png");
const VARIANT = path.resolve("public/media/2023/01/Taipei-MRT-Map-New-764x1024.png");
const VARIANT_WIDTH = 764;

if (!fs.existsSync(SOURCE)) {
  console.error(`Source map not found at ${SOURCE}`);
  process.exit(1);
}

const meta = await sharp(SOURCE).metadata();
console.log(`Source: ${meta.width} x ${meta.height}, ${(fs.statSync(SOURCE).size / 1024).toFixed(0)} KB`);

if (meta.width < 1000) {
  console.error("Source map is under 1000px wide - too small to zoom into. Aborting.");
  process.exit(1);
}

// Full size, recompressed. palette: true quantises to a colour palette,
// which suits a flat schematic diagram far better than a photo and cuts the
// file roughly in half with no visible loss on line art.
await sharp(SOURCE).png({ compressionLevel: 9, palette: true }).toFile(FULL + ".tmp");
fs.renameSync(FULL + ".tmp", FULL);

await sharp(SOURCE)
  .resize({ width: VARIANT_WIDTH, withoutEnlargement: true })
  .png({ compressionLevel: 9, palette: true })
  .toFile(VARIANT + ".tmp");
fs.renameSync(VARIANT + ".tmp", VARIANT);

for (const f of [FULL, VARIANT]) {
  const m = await sharp(f).metadata();
  console.log(`  ${path.basename(f)}: ${m.width} x ${m.height}, ${(fs.statSync(f).size / 1024).toFixed(0)} KB`);
}

const v = await sharp(VARIANT).metadata();
console.log(`\nUse width="${v.width}" height="${v.height}" in the markup.`);
