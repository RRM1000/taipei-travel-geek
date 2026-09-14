// Four retitles, each for a different reason.
//
// QUIRKY. "15 Quirky, Cool or Fun Things to Try in Taipei" hedged its promise
// three ways and said "try" where people search "do". Its own words ranked
// nowhere - "fun things to do in taipei" at 76, "fun places to go in taipei"
// at 67 - because that term belongs to the big travel sites. "Unusual things
// to do" is a real and far less crowded search, the page already sits at 45
// for it, and the content genuinely delivers it: a poo-themed restaurant,
// betel nuts, a restaurant on a bus. The slug stays; renaming it would throw
// away what little standing the page has.
//
// TAIPEI 101, DIN TAI FUNG, XIMENDING. Drafted alongside the five year-title
// changes but held back, because appending "(2026)" pushed each past the
// ~60 characters Google renders. Each loses a word instead:
//   Taipei 101   keeps "Observatory" - "taipei 101 observatory" is its own
//                query, at position 24.8 - and drops "to Visit".
//   Din Tai Fung "Queue Times" becomes "Queues", keeping all three topics.
//   Ximending    leads with the place. The bare query "ximending" carries
//                5,943 impressions; "things to do in ximending" carries 34.
//
// Modified dates are left alone, as with the earlier year titles: all four
// were genuinely revised in August or September 2026, so the year is already
// true, and moving the date for a title-only edit would claim a review that
// did not happen.

import fs from "fs";
import path from "path";

const MAX = 60;

const CHANGES = [
  {
    slug: "quirky-cool-fun-things",
    from: "15 Quirky, Cool or Fun Things to Try in Taipei",
    to: "Unusual Things to Do in Taipei: 15 Quirky Experiences (2026)",
  },
  {
    slug: "taipei-101",
    from: "Taipei 101 Observatory: Tickets, Prices & Best Time to Visit",
    to: "Taipei 101 Observatory: Tickets, Prices & Best Time (2026)",
  },
  {
    slug: "din-tai-fung",
    from: "Din Tai Fung Taipei: Queue Times, Branches & What to Order",
    to: "Din Tai Fung Taipei: Queues, Branches & What to Order (2026)",
  },
  {
    slug: "ximending",
    from: "30 Best Things to Do in Ximending: Food, Culture & Nightlife",
    to: "Ximending: 30 Best Things to Do, Food & Nightlife (2026)",
  },
];

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));

// Check everything before changing anything, so a surprise in the fourth post
// does not leave the first three half-applied.
for (const c of CHANGES) {
  const post = posts.find((p) => p.slug === c.slug);
  if (!post) {
    console.error(`/${c.slug} not found - aborting, nothing written.`);
    process.exit(1);
  }
  if (post.title !== c.from) {
    console.error(`/${c.slug} title is "${post.title}", expected "${c.from}" - aborting, nothing written.`);
    process.exit(1);
  }
  if (c.to.length > MAX) {
    console.error(`/${c.slug} new title is ${c.to.length} chars, over ${MAX} - aborting, nothing written.`);
    process.exit(1);
  }
}

for (const c of CHANGES) posts.find((p) => p.slug === c.slug).title = c.to;
fs.writeFileSync(filePath, JSON.stringify(posts, null, 2) + "\n");

console.log(`Retitled ${CHANGES.length} posts:\n`);
for (const c of CHANGES) {
  console.log(`  /${c.slug}`);
  console.log(`    was: ${c.from}  (${c.from.length})`);
  console.log(`    now: ${c.to}  (${c.to.length})\n`);
}
