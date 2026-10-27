// Swap the five walk posts from Google My Maps embeds to our own route maps.
//
//   node scripts/convert-walks-to-route-maps.mjs           dry run
//   node scripts/convert-walks-to-route-maps.mjs --write   apply it
//
// Run scripts/build-walks.mjs first: this reads data/walks/ for the stop
// numbering. For each walk it
//
//   1. replaces the My Maps iframe, and the "Every place on this map" list
//      underneath it, with <div data-walk-route="slug"></div> - lib/walks.ts
//      renders the route map, Google Maps link and stop table there;
//   2. renumbers the step-by-step. The posts lettered their stops [A]-[I]
//      after the My Maps directions tool; the new map numbers them 1-9 the way
//      London Travel Geek's walks do, so "[C]" becomes a numbered badge
//      carrying the id the map's "Read about this stop" links jump to. The
//      wording around them is unchanged.
//
// Datong has two routes, each lettered from A, so its step-by-step is
// renumbered per section: everything up to the "West Route" heading is the
// east route, everything after it the west route.

import fs from "node:fs";
import path from "node:path";

const POSTS = path.resolve("content/posts.json");
const WALKS_DIR = path.resolve("data/walks");
const write = process.argv.includes("--write");

const posts = JSON.parse(fs.readFileSync(POSTS, "utf8"));

const EMBED =
  /(?:<p>\s*)?<iframe[^>]*src="https:\/\/www\.google\.com\/maps\/d\/(?:u\/\d+\/)?embed\?mid=([A-Za-z0-9_-]+)[^"]*"[^>]*><\/iframe>(?:\s*<\/p>)?(?:\s*<div class="map-places" data-mid="\1">[\s\S]*?<\/div>)?/;

const letterNumber = (letter) => letter.charCodeAt(0) - 64;

/** Renumber one stretch of step-by-step text for one route. */
function renumber(html, routeId, multi, extraClass, stopCount) {
  const seen = new Set();
  const badge = (letter) => {
    const number = letterNumber(letter);
    if (number > stopCount) throw new Error(`[${letter}] is past the last stop of ${routeId}`);
    const id = multi ? `${routeId}-stop-${number}` : `stop-${number}`;
    const first = !seen.has(number);
    seen.add(number);
    return `<strong class="walk-stop${extraClass}"${first ? ` id="${id}"` : ""}>${number}</strong>`;
  };
  return html
    .replace(/<strong>\s*((?:\[[A-I]\])+)\s*<\/strong>\s*/g, (_, letters) =>
      [...letters.matchAll(/\[([A-I])\]/g)].map((m) => badge(m[1])).join("") + " ",
    )
    .replace(/\[([A-I])\]/g, (_, letter) => badge(letter));
}

let changed = 0;
for (const file of fs.readdirSync(WALKS_DIR).filter((f) => f.endsWith(".json"))) {
  const walk = JSON.parse(fs.readFileSync(path.join(WALKS_DIR, file), "utf8"));
  const post = posts.find((p) => p.slug === walk.slug);
  if (!post) throw new Error(`No post ${walk.slug}`);
  if (post.content.includes(`data-walk-route="${walk.slug}"`)) {
    console.log(`${walk.slug}: already converted`);
    continue;
  }

  const embed = post.content.match(EMBED);
  if (!embed || embed[1] !== walk.source.mid) throw new Error(`${walk.slug}: could not find the ${walk.source.mid} embed`);
  const markerAt = embed.index;
  const before = post.content.slice(0, markerAt);
  let after = post.content.slice(markerAt + embed[0].length);

  const multi = walk.routes.length > 1;
  if (multi) {
    const split = after.indexOf("<h3>West Route</h3>");
    if (split === -1) throw new Error(`${walk.slug}: no West Route heading`);
    const [east, west] = walk.routes;
    let westText = renumber(after.slice(split), west.id, true, " walk-stop--second", west.stops.length);
    // The west route's start is in the text but was never lettered.
    westText = westText.replace(
      "<li>From Yuanshan MRT, cross the road",
      `<li><strong class="walk-stop walk-stop--second" id="${west.id}-stop-1">1</strong> From Yuanshan MRT, cross the road`,
    );
    if (!westText.includes(`id="${west.id}-stop-1"`)) throw new Error(`${walk.slug}: could not number the west route's start`);
    after = renumber(after.slice(0, split), east.id, true, "", east.stops.length) + westText;
  } else {
    after = renumber(after, walk.routes[0].id, false, "", walk.routes[0].stops.length);
  }

  post.content = `${before}<div data-walk-route="${walk.slug}"></div>${after}`;
  const badges = (post.content.match(/class="walk-stop[^"]*" id=/g) || []).length;
  const expected = walk.routes.reduce((n, r) => n + r.stops.length, 0);
  console.log(`${walk.slug}: map swapped, ${badges}/${expected} stops numbered in the text`);
  if (badges !== expected) throw new Error(`${walk.slug}: numbered ${badges} stops, expected ${expected}`);
  changed++;
}

if (write && changed) fs.writeFileSync(POSTS, JSON.stringify(posts, null, 2) + "\n");
console.log(`\n${write ? "Converted" : "Would convert"} ${changed} posts.`);
