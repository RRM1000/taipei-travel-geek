// Point the planning pages at the main Taipei guide.
//
// WHY. /taipei-guide is the site's hub - 34,432 characters, 104 outbound
// links - and not one of the site's 70 highest-traffic pages links back to
// it. Its three inbound body links all come from low-traffic posts. It sits
// in the header promo, the footer and the sidebar, but boilerplate
// navigation counts for far less than an in-body link from a relevant
// article, and on that measure the hub is one of the weakest pages on the
// site while /taipei-101 and /taiwan-easycard have 28 and 26.
//
// WHY THESE TWELVE. Practical planning pages, where "here is the rest of the
// trip" is genuinely useful to the reader. Restaurant and venue pages are
// deliberately excluded: a link to a general travel guide from a review of a
// soy milk shop helps nobody and is exactly what a mechanical internal-link
// campaign looks like.
//
// Each sentence is written for the page it sits on and the anchor text
// varies. A dozen identical "see our Taipei travel guide" lines would be
// boilerplate wearing a contextual link's clothing.

import fs from "fs";
import path from "path";

const LINKS = {
  "mrt":
    "If this is your first trip, the <a href=\"/taipei-guide\">Taipei travel guide</a> covers the rest of the planning &ndash; when to come, visas, budget, where to stay and how long to give the city.",
  "taoyuan-airport-mrt":
    "Just landed, or still putting the trip together? The <a href=\"/taipei-guide\">complete guide to Taipei</a> covers everything after the airport.",
  "taiwan-easycard":
    "An EasyCard is one of the first things to sort out on arrival &ndash; the <a href=\"/taipei-guide\">Taipei travel guide</a> covers the rest of that list.",
  "taiwan-sim-cards":
    "For everything else worth settling before you fly, see the <a href=\"/taipei-guide\">full Taipei guide</a>.",
  "taiwan-tourist-tax-refund":
    "Shopping is one part of a trip here. The <a href=\"/taipei-guide\">Taipei travel guide</a> covers the rest of it.",
  "taiwan-visa-entry-requirements":
    "Once entry is settled, the <a href=\"/taipei-guide\">guide to visiting Taipei</a> covers when to go, what to budget and how long to stay.",
  "taipei-money-guide":
    "Budget is one piece of the planning; the <a href=\"/taipei-guide\">Taipei travel guide</a> has the rest.",
  "taipei-fun-pass":
    "If you are still working out which attractions are worth the time, start with the <a href=\"/taipei-guide\">Taipei travel guide</a>.",
  "best-districts-and-areas":
    "Planning the whole trip rather than just the neighbourhoods? The <a href=\"/taipei-guide\">Taipei travel guide</a> covers when to come, what to budget and how long to stay.",
  "taipei-on-a-budget":
    "For the wider trip &ndash; when to come, visas, transport and where to stay &ndash; see the <a href=\"/taipei-guide\">Taipei travel guide</a>.",
  "maps":
    "And if you are still planning the trip itself, the <a href=\"/taipei-guide\">Taipei travel guide</a> is the place to start.",
  "taipei-public-transport":
    "Transport is one chapter of a trip here; the <a href=\"/taipei-guide\">complete Taipei guide</a> covers the rest.",
};

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));

const done = [];
const skipped = [];

for (const [slug, sentence] of Object.entries(LINKS)) {
  const post = posts.find((p) => p.slug === slug);
  if (!post) {
    console.error(`Post ${slug} not found - aborting without writing.`);
    process.exit(1);
  }
  if (/href="\/taipei-guide["#]/.test(post.content)) {
    skipped.push(`${slug} (already links to the guide)`);
    continue;
  }

  // End of the intro, immediately before the first section heading. That is
  // where a reader who has not committed to the article is still deciding.
  const firstH2 = post.content.search(/<h2[\s>]/i);
  if (firstH2 < 0) {
    skipped.push(`${slug} (no h2 to anchor against)`);
    continue;
  }

  post.content =
    post.content.slice(0, firstH2) + `<p>${sentence}</p>\n\n\n\n` + post.content.slice(firstH2);
  done.push(slug);
}

if (!done.length) {
  console.error("Nothing to change - aborting rather than rewriting the file.");
  process.exit(1);
}

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2) + "\n");

console.log(`Linked the main guide from ${done.length} planning pages:\n`);
done.forEach((s) => console.log(`  + /${s}`));
if (skipped.length) {
  console.log("\nSkipped:");
  skipped.forEach((s) => console.log(`  - ${s}`));
}
