// Three retitles: one for freshness intent, two for a missing city name.
//
// CHIANG KAI-SHEK MEMORIAL HALL. Its queries are almost entirely hours and
// tickets - "opening hours" at position 1.9, "best time to visit" at 2.8,
// "tickets" at 8.5, "changing of guards" at 8.4 - the same shape as the five
// pages already dated (zoo, gondola, night market, HSR, tax refund). "&
// Tickets" replaces "& What to See" rather than sitting alongside it, since
// appending "(2026)" to the original pushed it to 63 characters, over the
// ~60 Google renders - and "tickets" is a query people actually type,
// "what to see" is not.
//
// THE TWO SHOPPING PAGES. Neither title said Taipei at all, and both were
// losing to bare-city queries as a result: "taipei shopping mall" at
// position 12.7, "malls in taipei" at 8.6, "best mall in taipei" at 6.6.
// This is a different problem to the year question - a page can be perfectly
// fresh and still be unfindable because its own city is missing from its
// title - so it is fixed on its own terms, not by adding a year.
//
// best-shopping-malls-in-taipei gets both "Best" and "Taipei" added: three
// separate query variants ("best shopping mall/mall/malls in taipei") show
// "Best" matters as much as the city name here. The personal voice - "Wow
// Factor" - stays; it is the one thing a results page cannot supply and is
// exactly what should survive a retitle built around search terms.
//
// xinyi-shopping-district's own bare term already ranks well (8.1) without
// Taipei in the title, so it is not restructured - Taipei is added as a
// qualifier after the place name, which additionally matches "taipei xinyi
// shopping district" at position 3.3.

import fs from "fs";
import path from "path";

const MAX = 60;

const CHANGES = [
  {
    slug: "chiang-kai-shek-memorial-hall",
    from: "Chiang Kai-Shek Memorial Hall: Guard Times & What to See",
    to: "Chiang Kai-Shek Memorial Hall: Guard Times & Tickets (2026)",
  },
  {
    slug: "best-shopping-malls-in-taipei",
    from: "7 Shopping Malls with that 'Wow' Factor",
    to: "7 Best Shopping Malls in Taipei with that 'Wow' Factor",
  },
  {
    slug: "xinyi-shopping-district",
    from: "Xinyi Shopping District: All 13 Malls Compared",
    to: "Xinyi Shopping District, Taipei: All 13 Malls Compared",
  },
];

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));

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
