// Home-screen icon and a slimmer SVG favicon, from the transparent logo mark.
//
//   node scripts/build-icons.mjs
//
// public/apple-touch-icon.png (180x180) is the red mark on the navy of the
// redesigned header (#132230), for phones' "add to home screen". iOS rounds
// the corners itself, so the square is left square. The browser-tab favicon
// (favicon.ico, icon-192.png) stays red on white, which reads better at 16px.
//
// public/favicon.svg embedded a 300px PNG inside the SVG (31 KB); it now
// embeds a 128px one, which is all a tab ever needs.

import fs from "node:fs";
import sharp from "sharp";

const MARK = "public/images/ttg-mark-transparent.png";
const NAVY = { r: 19, g: 34, b: 48, alpha: 1 };

// Apple touch icon: mark at about 70% of the tile, centred.
const tile = 180;
const markSize = Math.round(tile * 0.7);
const mark = await sharp(MARK).resize(markSize, markSize, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
await sharp({ create: { width: tile, height: tile, channels: 4, background: NAVY } })
  .composite([{ input: mark, gravity: "centre" }])
  .png({ compressionLevel: 9 })
  .toFile("public/apple-touch-icon.png");

// Slimmer SVG favicon: same circle clip, smaller embedded PNG.
const svg = fs.readFileSync("public/favicon.svg", "utf8");
const m = svg.match(/data:image\/png;base64,([A-Za-z0-9+/=]+)/);
if (!m) throw new Error("favicon.svg: no embedded PNG found");
const small = await sharp(Buffer.from(m[1], "base64")).resize(128, 128).png({ compressionLevel: 9, palette: true }).toBuffer();
fs.writeFileSync("public/favicon.svg", svg.replace(m[1], small.toString("base64")));

console.log(`apple-touch-icon.png ${fs.statSync("public/apple-touch-icon.png").size} bytes; favicon.svg ${fs.statSync("public/favicon.svg").size} bytes`);
