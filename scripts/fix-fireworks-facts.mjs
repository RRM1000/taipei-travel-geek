// Corrections to the New Year's Eve fireworks guide from the Taipei 101 view
// hotels research (data/research/taipei-101-view-hotels-new-years-eve.md):
// view rooms now go on sale in late August and September, not mid-November;
// room prices on the night; the value picks; the concert start time; the
// free-entry stations; Le Meridien's fireworks rooms; the show length.
//
// Left for the owner: "Taipei Dome" in the walk-a-stop list (Taipei Arena
// is about 2.5 km from Xinyi, so it may not belong there).

import fs from "fs";
import path from "path";

const SLUG = "taipei-101-fireworks-new-years-eve";
const MODIFIED = "2026-10-03 12:00:00";

const EDITS = [
  ["Bar tickets and hotel view rooms go on sale mid-November and disappear fast.",
   "Hotel view rooms now go on sale in late August and September, and bar tickets from October &ndash; most are gone well before December."],
  ["<strong>Packages typically go on sale from mid-November</strong>", "<strong>Packages now go on sale from September or October</strong>"],
  ["New Year packages are released from mid-November to early December and the view rooms go almost immediately.",
   "New Year packages now go on sale in late August and September, and by mid-September 2026 the Grand Hyatt had sold 60% of its view rooms and Le Méridien 80%."],
  ["where many rooms face Taipei 101", "where 77 of its 160 rooms are sold as fireworks rooms"],
  ["<strong>Humble House</strong> and <strong>Eslite Hotel</strong> are the value picks.",
   "<strong>Eslite Hotel</strong> and the <strong>United Hotel</strong> by the Dome are the better-value picks."],
  ["goes for <strong>NT$10,000&ndash;30,000 or more on the 31st</strong>", "goes for <strong>NT$20,000&ndash;40,000 or more on the 31st</strong>"],
  ["usually gets going around <strong>18:30</strong> and carries on past 01:00", "usually gets going at <strong>19:00</strong> and runs until about 01:00"],
  ["entry at Nanjing Sanmin and Taipei Dome free between 22:30 and 06:00", "entry at Nanjing Sanmin and Taipei Arena free between 22:30 and 06:00"],
  ["Recent shows have run about <strong>six minutes</strong>", "Recent shows have run <strong>five to six minutes</strong>"],
];

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const fail = (m) => { console.error(`${m} - aborting, nothing written.`); process.exit(1); };
const post = posts.find((p) => p.slug === SLUG);
if (!post) fail(`/${SLUG} not found`);
for (const [from, to] of EDITS) {
  const n = post.content.split(from).length - 1;
  if (n !== 1) fail(`"${from.slice(0, 50)}..." matched ${n} times`);
  post.content = post.content.replace(from, () => to);
}
post.modified = MODIFIED;
fs.writeFileSync(filePath, JSON.stringify(posts, null, 2) + "\n");
console.log(`/${SLUG}: ${EDITS.length} fixes`);
