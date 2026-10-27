// One data-hotel key per hotel, site-wide, so the Agoda switch (a single
// hotel-key -> link map) catches every link. Four hotels had picked up two
// keys as the guides were written; each keeps the key used on the
// where-to-stay hub and the hostels guide:
//
//   taiwan-youth-hostel -> taiwan-youth-hostel-capsule-hotel  (Klook 576278)
//   meander-taipei      -> meander-taipei-hostel               (Klook 233515)
//   dan-hostel          -> dan-hostel-taipei                   (Klook 534581)
//   flip-flop-garden    -> owlstay-flip-flop-hostel-garden     (Klook 487854)
//
// Only data-hotel attributes change; idempotent.

import fs from "fs";
import path from "path";

const RENAMES = {
  "taiwan-youth-hostel": "taiwan-youth-hostel-capsule-hotel",
  "meander-taipei": "meander-taipei-hostel",
  "dan-hostel": "dan-hostel-taipei",
  "flip-flop-garden": "owlstay-flip-flop-hostel-garden",
};

const filePath = path.resolve(process.env.POSTS_PATH || "content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
let changed = 0;
for (const post of posts) {
  let c = post.content;
  for (const [from, to] of Object.entries(RENAMES)) {
    c = c.replaceAll(`data-hotel="${from}"`, () => { changed++; return `data-hotel="${to}"`; });
  }
  post.content = c;
}

// Every Klook hotel id must now map to exactly one key.
const keysById = new Map();
for (const post of posts) {
  for (const [tag] of post.content.matchAll(/<a\b[^>]*>/g)) {
    const key = (tag.match(/data-hotel="([^"]+)"/) || [])[1];
    const id = (tag.match(/hotels\/detail\/(\d+)/) || [])[1];
    if (!key || !id) continue;
    if (!keysById.has(id)) keysById.set(id, new Set());
    keysById.get(id).add(key);
  }
}
const clashes = [...keysById].filter(([, keys]) => keys.size > 1);
if (clashes.length) {
  console.error(`Still more than one key for: ${clashes.map(([id, k]) => `${id} (${[...k].join(", ")})`).join("; ")} - aborting, nothing written.`);
  process.exit(1);
}

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2) + "\n");
console.log(`${changed} data-hotel attributes renamed; ${keysById.size} hotels, one key each`);
