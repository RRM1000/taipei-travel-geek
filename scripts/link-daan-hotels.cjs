// Proposed (NOT applied) link edits for /hotels-in-daan. Guarded: each find must match exactly once in its post.
// Usage: node links-daan.cjs <posts.json> [--apply]
const fs = require("fs");
const [file, flag] = process.argv.slice(2);
const posts = JSON.parse(fs.readFileSync(file, "utf8"));
const EDITS = [
  ["best-areas-and-hotels-to-stay",
   "though even the small ones beat most Taipei equivalents.</p>",
   "though even the small ones beat most Taipei equivalents.</p>\n\n<p>Settled on Daan? Our guide to <a href=\"/hotels-in-daan\">hotels in Daan</a> compares fifteen places to stay, from a capsule hostel by Yongkang Street to the Kimpton, with the nearest exit and November prices for each.</p>"],
  ["best-districts-and-areas",
   "is here too &ndash; small, but packed with good food stands.</p>",
   "is here too &ndash; small, but packed with good food stands.</p>\n\n<p>To pick somewhere to stay, see our guide to <a href=\"/hotels-in-daan\">hotels in Daan</a>, which gives the nearest MRT exit for each.</p>"],
  ["best-districts-and-areas",
   "<a href=\"/hotels-in-zhongshan\">Zhongshan</a> and <a href=\"/beitou-hot-spring-hotels\">Beitou</a>.</p>",
   "<a href=\"/hotels-in-zhongshan\">Zhongshan</a>, <a href=\"/hotels-in-daan\">Daan</a> and <a href=\"/beitou-hot-spring-hotels\">Beitou</a>.</p>"],
  ["yongkang-street",
   "Daan Forest Park and Chiang Kai-shek Memorial Hall are each a quarter of a kilometre away, or one stop either side on the MRT.</p>",
   "Daan Forest Park and Chiang Kai-shek Memorial Hall are each a quarter of a kilometre away, or one stop either side on the MRT.</p>\n\n<p>Want to stay close by? DONGMEN 3 Hostel is right outside Dongmen exit 3, and our guide to <a href=\"/hotels-in-daan\">hotels in Daan</a> covers fourteen more places nearby.</p>"],
  ["taipei-east-district-dongqu",
   "<p class=\"location-line\">📍 Closest MRT: Zhongxiao Dunhua Station (blue line) </p>",
   "<p class=\"location-line\">📍 Closest MRT: Zhongxiao Dunhua Station (blue line) </p>\n\n<p>Staying in the area? Our guide to <a href=\"/hotels-in-daan\">hotels in Daan</a> lists the options near Zhongxiao Fuxing and Zhongxiao Dunhua, from the Kimpton to a hostel off Zhongxiao East Road.</p>"],
];
let ok = true;
for (const [slug, find, repl] of EDITS) {
  const p = posts.find((x) => x.slug === slug);
  const n = p ? p.content.split(find).length - 1 : -1;
  const site = posts.reduce((a, x) => a + ((x.content || "").split(find).length - 1), 0);
  console.log(`${slug}: ${n} in post, ${site} site-wide`);
  if (n !== 1) ok = false;
  else if (flag === "--apply") p.content = p.content.replace(find, repl);
}
if (!ok) { console.error("a find string did not match exactly once - nothing written"); process.exit(1); }
if (flag === "--apply") { fs.writeFileSync(file, JSON.stringify(posts, null, 2) + "\n"); console.log("applied"); }
