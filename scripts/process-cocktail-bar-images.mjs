import sharp from "sharp";
import path from "path";
import fs from "fs";

const srcDir = "C:/Users/rober/Downloads/Photos-1-001 (2)";
const outDir = path.resolve("public/media/2026/08");
fs.mkdirSync(outDir, { recursive: true });

// orientation:6 files get auto-corrected by sharp().rotate() (reads EXIF).
// 20181215_195359.jpg has no EXIF orientation tag despite being stored
// sideways, so it needs an explicit manual rotation instead.
const files = [
  { src: "20171229_202500.jpg", base: "Cocktail-Bar-Martini-Glass-1", manualRotate: null },
  { src: "20181215_195115.jpg", base: "Cocktail-Bar-Two-Drinks-Cherry-2", manualRotate: null },
  { src: "20181215_195359.jpg", base: "Cocktail-Bar-Coconut-Shell-3", manualRotate: 90 },
  { src: "20190112_193520.jpg", base: "Cocktail-Bar-Orange-Slice-4", manualRotate: null },
  { src: "20191222_184359.jpg", base: "Cocktail-Bar-Rosemary-Orange-5", manualRotate: null },
  { src: "20200105_190608.jpg", base: "Cocktail-Bar-Bartender-Pouring-6", manualRotate: null },
  { src: "20200115_203228.jpg", base: "Cocktail-Bar-Hanging-Glass-7", manualRotate: null },
  { src: "IMG_20160710_004817.jpg", base: "Cocktail-Bar-Pink-Flower-Cocktail-8", manualRotate: null },
];

(async () => {
  for (const f of files) {
    const input = sharp(path.join(srcDir, f.src));
    const pipeline = f.manualRotate ? input.rotate(f.manualRotate) : input.rotate();
    const buffer = await pipeline.resize({ width: 1024, withoutEnlargement: true }).jpeg({ quality: 85 }).toBuffer();
    const meta = await sharp(buffer).metadata();
    const filename = `${f.base}-${meta.width}x${meta.height}.jpg`;
    fs.writeFileSync(path.join(outDir, filename), buffer);
    console.log(filename, "->", meta.width, "x", meta.height);
  }
})();
