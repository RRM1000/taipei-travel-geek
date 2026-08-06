import sharp from "sharp";
import path from "path";

const scratchpad = "C:\\Users\\rober\\AppData\\Local\\Temp\\claude\\C--Users-rober-Projects-taipei-travel-geek\\02a97632-607a-4923-9f0a-4472fb7e0663\\scratchpad";
const outDir = path.resolve("public/media/2026/08");

const jobs = [
  { src: path.join(scratchpad, "Geopark (1).jpg"), out: "Jiufen-Geopark-1" },
  { src: path.join(scratchpad, "Geopark (2).jpg"), out: "Jiufen-Geopark-2" },
];

for (const { src, out } of jobs) {
  const img = sharp(src).rotate(); // auto-orient from EXIF
  const meta = await img.metadata();
  const targetWidth = 1024;
  const targetHeight = Math.round((meta.height / meta.width) * targetWidth);
  const outPath = path.join(outDir, `${out}-${targetWidth}x${targetHeight}.jpg`);
  await img.resize(targetWidth).jpeg({ quality: 82 }).toFile(outPath);
  console.log(`Saved ${outPath} (${targetWidth}x${targetHeight})`);
}
