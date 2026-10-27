// Two fixes on the existing walks.
//
// SONGSHAN/XINYI. The walk sent readers to the changing of the guard in
// Sun Yat-sen Memorial Hall, but the main hall has been closed for renovation
// since 26 February 2024. The memorial hall's own notice gives completion as
// Q4 2026 and no reopening date has been announced (checked 27 Oct 2026), and
// the guard ceremony is suspended until the building reopens. The grounds and
// plaza stay open, so the stop stays; the guard and the exhibition rooms go.
// The intro's "Songhsan" typo is fixed on the way.
//
// DATONG. The intro said the East route is best in the evening, but the
// West Route section - temples open to 21:00 and Dalong Street Night Market -
// is the one marked "Best taken during the evening". The intro now agrees.

import fs from "fs";
import path from "path";

const MODIFIED = "2026-10-27 12:00:00";

const EDITS = {
  "songshan-xinyi-walking-tour": [
    ["You'll start off at the impressive Sun Yat-sen Memorial Hall, see the changing of the guard there, then make your way to the Songhsan Cultural Park.",
     "You'll start off in the grounds of the impressive Sun Yat-sen Memorial Hall, then make your way to the Songshan Cultural Park."],
    ["<li>Wait for the changing of the guard in Central Hall (on the hour every hour from 09:00 - 17:00)</li><li>Visit the Dr. Sun Exhibition rooms and some of the galleries</li>",
     "<li>The main hall has been closed for renovation since February 2024, with completion due in late 2026, so there's no changing of the guard and the exhibition rooms are shut until it reopens &ndash; the gardens and plaza are open as normal. Our <a href=\"/sun-yat-sen-memorial-hall\">Sun Yat-sen Memorial Hall guide</a> has the latest.</li>"],
  ],
  "datong-walking-route": [
    ["You could spend more time at the market, and only choose either the East or West route. The East route is best taken during the evening.",
     "You could spend more time at the market, and only choose either the East or West route. The West route, with its temples and the Dalong Street Night Market, is the one to take in the evening."],
  ],
};

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const fail = (m) => { console.error(`${m} - aborting, nothing written.`); process.exit(1); };

for (const [slug, edits] of Object.entries(EDITS)) {
  const post = posts.find((p) => p.slug === slug);
  if (!post) fail(`/${slug} not found`);
  for (const [from, to] of edits) {
    const n = post.content.split(from).length - 1;
    if (n !== 1) fail(`/${slug}: "${from.slice(0, 50)}..." matched ${n} times`);
    post.content = post.content.replace(from, () => to);
  }
  post.modified = MODIFIED;
  console.log(`/${slug}: ${edits.length} fix${edits.length > 1 ? "es" : ""}`);
}

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2) + "\n");
