// Three changes to the where-to-stay guide, none of which wait on Agoda.
//
// TITLE. Nearly all the hotel search reaching the site is one intent - "best
// area / district / neighbourhood to stay in Taipei", in a dozen wordings at
// positions 6-22 - and it lands here. The page-one results for "where to stay
// in taipei" mostly carry a year and a count ("9 Best Areas & Places in
// 2026"). Hotel prices are genuine freshness intent, so the year belongs; the
// count is the seven district sections the page actually has.
//
// HEADINGS. "Zhongzheng - Best for a First Trip" means nothing to a visitor
// who knows the area as Taipei Main Station, and nobody arriving thinks of
// Ximending as "Wanhua". Each district now carries the landmark people know
// it by, which also matches the "hotel near taipei 101 / xinyi / ximending"
// searches already reaching the page. Anchor ids are unchanged, so every
// existing #link still lands.
//
// FAMILY FAQ. Page one includes a "where to stay in Taipei with kids" result
// and this FAQ had nothing for families. The answer is built only from what
// the page already says - the Main Station base, the family apartments in the
// serviced-apartment section, Grand View Resort in Beitou - rather than new
// claims.

import fs from "fs";
import path from "path";

const SLUG = "best-areas-and-hotels-to-stay";
const TITLE_FROM = "Where to Stay in Taipei: Best Areas & Hotels";
const TITLE_TO = "Where to Stay in Taipei (2026): 7 Best Areas & Hotels";
const MODIFIED = "2026-09-27 12:00:00";

const REPLACEMENTS = [
  ['<h2 id="Zhongzheng">Zhongzheng &ndash; Best for a First Trip</h2>',
   '<h2 id="Zhongzheng">Zhongzheng (Taipei Main Station) &ndash; Best for a First Trip</h2>'],
  ['<h2 id="Xinyi">Xinyi &ndash; Best for Shopping &amp; Luxury</h2>',
   '<h2 id="Xinyi">Xinyi (Taipei 101) &ndash; Best for Shopping &amp; Luxury</h2>'],
  ['<h2 id="Daan">Daan &ndash; Best for Food &amp; Neighbourhood Feel</h2>',
   '<h2 id="Daan">Daan (Yongkang Street) &ndash; Best for Food &amp; Neighbourhood Feel</h2>'],
  ['<h2 id="Wanhua">Wanhua &ndash; Best for Budget</h2>',
   '<h2 id="Wanhua">Wanhua (Ximending) &ndash; Best for Budget</h2>'],
  [
    `<p>Anything beyond about a week, take the apartment. A kitchen and a washing machine change how a long trip feels, and the per-night rate usually drops on weekly bookings.</p>`,
    `<p>Anything beyond about a week, take the apartment. A kitchen and a washing machine change how a long trip feels, and the per-night rate usually drops on weekly bookings.</p>

<h3>Where should I stay in Taipei with kids?</h3>

<p>Somewhere central on the MRT, so every journey stays short &ndash; <a href="#Zhongzheng">Zhongzheng, around Taipei Main Station</a>, is the easiest base. For more than a few nights, a <a href="#Long-Stay">serviced apartment</a> gives you the space and a kitchen, and the family apartments are often larger than hotel suites at a similar rate. For a treat, Grand View Resort in <a href="#Beitou">Beitou</a> is family-friendly, with large rooms that have their own hot spring baths. For what to do once you're there, see <a href="/best-places-to-keep-kids-amused">where to keep kids amused in Taipei</a>.</p>`,
  ],
];

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const post = posts.find((p) => p.slug === SLUG);
const fail = (m) => { console.error(`${m} - aborting, nothing written.`); process.exit(1); };

if (!post) fail(`/${SLUG} not found`);
if (post.title !== TITLE_FROM) fail(`title is "${post.title}"`);
if (TITLE_TO.length > 60) fail(`new title is ${TITLE_TO.length} chars`);

let content = post.content;
for (const [from, to] of REPLACEMENTS) {
  const n = content.split(from).length - 1;
  if (n !== 1) fail(`"${from.slice(0, 50)}..." matched ${n} times`);
  content = content.replace(from, () => to);
}

post.title = TITLE_TO;
post.content = content;
post.modified = MODIFIED;
fs.writeFileSync(filePath, JSON.stringify(posts, null, 2) + "\n");

console.log(`/${SLUG}`);
console.log(`  title: ${TITLE_TO} (${TITLE_TO.length})`);
console.log(`  ${REPLACEMENTS.length - 1} headings given landmarks, family FAQ added`);
