// Lead the hub guide with the phrase people actually search.
//
// "Discover Taipei in 2026: Your Ultimate Travel Guide" put four words
// between "Taipei" and "Guide", which is why the page sat at position 93.6
// for "taipei guide" while /best-districts-and-areas - titled "Taipei
// Districts Guide" - took ninth. Six pages on this site compete for
// trip-planning intent; the hub should be the one whose title says so.
import fs from "fs";
import path from "path";
const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const post = posts.find((p) => p.slug === "taipei-guide");
const from = "Discover Taipei in 2026: Your Ultimate Travel Guide";
const to = "Taipei Travel Guide 2026: Everything to Know Before You Go";
if (post.title !== from) { console.error(`Title is "${post.title}", not what was expected - aborting.`); process.exit(1); }
post.title = to;
fs.writeFileSync(filePath, JSON.stringify(posts, null, 2) + "\n");
console.log(`was: ${from}  (${from.length})`);
console.log(`now: ${to}  (${to.length})`);
