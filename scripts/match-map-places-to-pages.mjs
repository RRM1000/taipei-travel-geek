// Work out which page on the site each map pin belongs to.
//
//   node scripts/match-map-places-to-pages.mjs            print the report
//   node scripts/match-map-places-to-pages.mjs --write    write data/maps/links.json
//
// Two of the 51 maps carry the destination URL in the pin description, so
// those come across exactly. The other 49 were built without descriptions -
// their style ids literally end "-nodesc" - so 538 pins have a name and
// nothing else, and the only way to reach a page from them is to match on
// that name.
//
// Name matching is guesswork with a confidence attached, so this reports
// before it writes and grades every match:
//
//   exact   the pin name normalises to a page title or slug. Safe.
//   strong  one name contains the other and the shorter is substantial.
//   weak    most words overlap. Needs a human eye.
//   none    no candidate.
//
// Only exact and strong are written out. Weak matches are listed so they can
// be promoted by hand, because the failure mode here is a confident link to
// the wrong restaurant, which is worse than no link at all.

import fs from "node:fs";
import path from "node:path";

const MAPS_DIR = path.resolve("data/maps");
const write = process.argv.includes("--write");

const posts = JSON.parse(fs.readFileSync(path.resolve("content/posts.json"), "utf8"));
const index = JSON.parse(fs.readFileSync(path.join(MAPS_DIR, "index.json"), "utf8"));

// Strip the things that differ between a map pin and a post title without
// changing which place is meant: case, accents, punctuation, and the filler
// words that a title adds and a pin does not.
const STOP = new Set(["the", "a", "an", "in", "at", "of", "and", "taipei", "taiwan", "best", "to"]);
const norm = (s) =>
  (s || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
const tokens = (s) => norm(s).split(" ").filter((w) => w && !STOP.has(w));

const pages = posts.map((p) => ({
  slug: p.slug,
  title: p.title,
  n: norm(p.title),
  nSlug: norm(p.slug),
  t: new Set(tokens(p.title)),
}));
const bySlug = new Map(pages.map((p) => [p.slug, p]));

function match(name) {
  const n = norm(name);
  if (!n) return { grade: "none" };

  for (const p of pages) if (p.n === n || p.nSlug === n) return { grade: "exact", slug: p.slug, title: p.title };

  const nt = new Set(tokens(name));
  if (!nt.size) return { grade: "none" };

  let best = null;
  for (const p of pages) {
    // Containment, guarded so "art" does not swallow "Museum of Art".
    if (n.length >= 8 && (p.n.includes(n) || p.nSlug.includes(n.replace(/ /g, "")))) {
      return { grade: "strong", slug: p.slug, title: p.title };
    }
    const shared = [...nt].filter((w) => p.t.has(w)).length;
    if (!shared) continue;
    const score = shared / Math.max(nt.size, p.t.size);
    if (!best || score > best.score) best = { score, slug: p.slug, title: p.title };
  }
  if (best && best.score >= 0.75) return { grade: "strong", ...best };
  if (best && best.score >= 0.4) return { grade: "weak", ...best };
  return { grade: "none" };
}

const tally = { fromKml: 0, exact: 0, strong: 0, weak: 0, none: 0 };
const weak = [];
const resolved = {};

for (const entry of index.maps) {
  const map = JSON.parse(fs.readFileSync(path.join(MAPS_DIR, `${entry.mid}.json`), "utf8"));
  const links = [];
  for (const layer of map.layers) {
    for (const place of layer.places) {
      if (place.type !== "point") continue;

      if (place.url) {
        const slug = place.url.replace(/^\//, "").split(/[#?]/)[0].replace(/\/$/, "");
        if (bySlug.has(slug)) {
          tally.fromKml++;
          links.push({ name: place.name, layer: layer.name, slug, via: "kml" });
          continue;
        }
        // Dead URL in the map - fall through and try to match by name instead.
      }

      const m = match(place.name);
      tally[m.grade]++;
      if (m.grade === "exact" || m.grade === "strong") {
        links.push({ name: place.name, layer: layer.name, slug: m.slug, via: m.grade });
      } else if (m.grade === "weak") {
        weak.push({ map: map.name, mid: map.mid, place: place.name, guess: m.slug, title: m.title, score: +m.score.toFixed(2) });
      }
    }
  }
  resolved[entry.mid] = { name: map.name, usedOn: map.usedOn, links };
}

const total = Object.values(tally).reduce((a, b) => a + b, 0);
const linked = tally.fromKml + tally.exact + tally.strong;

console.log("Matching map pins to pages\n");
console.log(`  from the map's own link   ${String(tally.fromKml).padStart(4)}`);
console.log(`  exact name match          ${String(tally.exact).padStart(4)}`);
console.log(`  strong name match         ${String(tally.strong).padStart(4)}`);
console.log(`  weak - needs review       ${String(tally.weak).padStart(4)}`);
console.log(`  no candidate              ${String(tally.none).padStart(4)}`);
console.log(`  ${"-".repeat(30)}`);
console.log(`  linkable                  ${String(linked).padStart(4)} of ${total}  (${Math.round((linked / total) * 100)}%)\n`);

if (weak.length) {
  console.log(`Weak matches, not written (${weak.length}) - promote by hand if right:\n`);
  for (const w of weak.slice(0, 25)) {
    console.log(`  ${String(w.score).padEnd(5)} "${w.place}"`);
    console.log(`        -> /${w.guess}  (${w.title})   [${w.map}]`);
  }
  if (weak.length > 25) console.log(`  ...and ${weak.length - 25} more`);
}

if (write) {
  fs.writeFileSync(
    path.join(MAPS_DIR, "links.json"),
    JSON.stringify({ generatedAt: new Date().toISOString(), tally, maps: resolved, weak }, null, 2) + "\n",
  );
  console.log(`\nWritten to ${path.join(MAPS_DIR, "links.json")}`);
} else {
  console.log("\nRe-run with --write to save the resolved links.");
}
