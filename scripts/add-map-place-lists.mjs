// Put each map's pins into the page as HTML, underneath the embed.
//
//   node scripts/add-map-place-lists.mjs           dry run, prints what it would do
//   node scripts/add-map-place-lists.mjs --write   apply it
//   node scripts/add-map-place-lists.mjs --remove  take the blocks back out
//
// WHY. A My Maps embed is a cross-origin iframe, so every place name and
// description inside it is Google's content sitting on our page rather than
// ours. /maps is a 650-character page holding 186 places for exactly that
// reason. Writing the pins into the page as ordinary HTML makes them
// indexable, and links them to the pages they belong to.
//
// NOT EVERY MAP. Where an article already names the places its own map
// contains, a list underneath restates the article and helps nobody -
// /best-areas-for-walking already names 85% of its pins in prose, and
// /where-to-shop-in-taipei 75%. Those are skipped. The maps worth doing are
// the ones carrying information the prose does not: /maps at 0%, the
// sightseeing bus route at 8%, the sports centres at 0%.

import fs from "node:fs";
import path from "node:path";

const MAPS_DIR = path.resolve("data/maps");
const POSTS = path.resolve("content/posts.json");
const MARKER = "map-places";
const MAX_IN_PROSE = 0.5; // above this the list is mostly restating the article

const write = process.argv.includes("--write");
const remove = process.argv.includes("--remove");

const posts = JSON.parse(fs.readFileSync(POSTS, "utf8"));
const index = JSON.parse(fs.readFileSync(path.join(MAPS_DIR, "index.json"), "utf8"));
const links = JSON.parse(fs.readFileSync(path.join(MAPS_DIR, "links.json"), "utf8"));

// Venues the site has already marked as gone. Posts carry a "Permanent
// Closure Notice" block, so the closure list is derived from that rather than
// kept separately - mark one closed in the usual way and rerunning this drops
// it from the maps too. Matched by the slug a pin links to and by name, since
// a pin is often named slightly differently to its post ("Crush Brunch" for
// Crush, "Tulip TimeOut" for TimeOut Danish Hot Dogs).
const closedBySlug = new Map();
const closedByName = new Map();
for (const post of posts) {
  const text = (post.content || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
  const m = text.match(/Please note:\s*(.+?)\s+has permanently closed/i);
  if (!m) continue;
  closedBySlug.set(post.slug, m[1]);
  closedByName.set(m[1].toLowerCase().replace(/[^a-z0-9]+/g, " ").trim(), m[1]);
}
const closureOf = (place) => {
  const slug = place.url && place.url.replace(/^\//, "").split(/[#?]/)[0].replace(/\/$/, "");
  if (slug && closedBySlug.has(slug)) return closedBySlug.get(slug);
  return closedByName.get((place.name || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim()) ?? null;
};

const esc = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
const norm = (s) => (s || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

// --------------------------------------------------------------- remove ---
if (remove) {
  let touched = 0;
  const block = new RegExp(`\\n*<div class="${MARKER}"[^>]*>[\\s\\S]*?</div>\\n*`, "g");
  for (const post of posts) {
    if (!post.content?.includes(`class="${MARKER}"`)) continue;
    post.content = post.content.replace(block, "\n\n\n\n");
    touched++;
  }
  if (write) fs.writeFileSync(POSTS, JSON.stringify(posts, null, 2) + "\n");
  console.log(`${write ? "Removed" : "Would remove"} the block from ${touched} posts.`);
  process.exit(0);
}

// ---------------------------------------------------------------- build ---
const dropped = [];

function renderList(map, resolved) {
  const bySlug = new Map(resolved.links.map((l) => [l.name, l.slug]));
  const parts = [`<div class="${MARKER}" data-mid="${map.mid}">`, `<h3>Every place on this map</h3>`];
  const multi = map.layers.filter((l) => l.places.some((p) => p.type === "point")).length > 1;

  for (const layer of map.layers) {
    const points = layer.places.filter((p) => p.type === "point" && p.name).filter((p) => {
      const closed = closureOf(p);
      if (closed) dropped.push({ map: map.name, mid: map.mid, pin: p.name, closed });
      return !closed;
    });
    if (!points.length) continue;
    if (multi) parts.push(`<h4>${esc(layer.name)}</h4>`);
    parts.push("<ul>");
    for (const place of points) {
      const slug = bySlug.get(place.name);
      const name = slug ? `<a href="/${slug}">${esc(place.name)}</a>` : esc(place.name);
      parts.push(`<li>${name}${place.description ? ` &ndash; ${esc(place.description)}` : ""}</li>`);
    }
    parts.push("</ul>");
  }
  parts.push("</div>");
  return parts.join("\n");
}

/** Insert after the embed's own wrapper, not in the middle of it. */
function insertAfterEmbed(content, mid, block) {
  const iframeAt = content.search(new RegExp(`<iframe[^>]*mid=${mid}`));
  if (iframeAt < 0) return null;
  let cursor = content.indexOf("</iframe>", iframeAt);
  if (cursor < 0) return null;
  cursor += "</iframe>".length;
  // Step past whatever closes immediately after it - </p>, </figure>, </div>.
  for (;;) {
    const rest = content.slice(cursor);
    const close = rest.match(/^\s*<\/(p|figure|div)>/i);
    if (!close) break;
    cursor += close[0].length;
  }
  return content.slice(0, cursor) + "\n\n\n\n" + block + content.slice(cursor);
}

const applied = [];
const skipped = [];

for (const entry of index.maps) {
  const map = JSON.parse(fs.readFileSync(path.join(MAPS_DIR, `${entry.mid}.json`), "utf8"));
  const resolved = links.maps[entry.mid];
  const points = map.layers
    .flatMap((l) => l.places.filter((p) => p.type === "point" && p.name))
    .filter((p) => !closureOf(p));
  if (!points.length) {
    skipped.push({ map: map.name, why: "no named pins" });
    continue;
  }

  for (const slug of map.usedOn) {
    const post = posts.find((p) => p.slug === slug);
    if (!post) continue;
    // Per map, not per post: several posts here embed more than one map -
    // best-areas-and-hotels-to-stay has seven, one per district - and each
    // needs its own list under its own embed.
    if (post.content.includes(`data-mid="${entry.mid}"`)) {
      skipped.push({ map: map.name, slug, why: "already has a list" });
      continue;
    }

    const body = norm(post.content.replace(/<[^>]+>/g, " "));
    const inProse = points.filter((p) => p.name.length > 4 && body.includes(norm(p.name))).length;
    const share = inProse / points.length;
    if (share > MAX_IN_PROSE) {
      skipped.push({ map: map.name, slug, why: `${Math.round(share * 100)}% already in the prose` });
      continue;
    }

    const next = insertAfterEmbed(post.content, entry.mid, renderList(map, resolved));
    if (!next) {
      skipped.push({ map: map.name, slug, why: "could not find the embed" });
      continue;
    }
    post.content = next;
    applied.push({
      slug,
      map: map.name,
      places: points.length,
      linked: resolved.links.length,
      inProse: Math.round(share * 100),
    });
  }
}

if (write) fs.writeFileSync(POSTS, JSON.stringify(posts, null, 2) + "\n");

console.log(`${write ? "Added" : "Would add"} a place list to ${applied.length} posts:\n`);
console.log("  places  linked  in prose  post");
for (const a of applied.sort((x, y) => y.places - x.places)) {
  console.log(
    `  ${String(a.places).padStart(6)}  ${String(a.linked).padStart(6)}  ${String(a.inProse + "%").padStart(8)}  /${a.slug}`,
  );
}
const totalPlaces = applied.reduce((a, b) => a + b.places, 0);
console.log(`\n  ${totalPlaces} places written into the pages.`);

if (dropped.length) {
  const seen = new Map();
  for (const d of dropped) if (!seen.has(d.pin)) seen.set(d.pin, d);
  console.log(`
Left out ${seen.size} pins for venues the site marks permanently closed:`);
  for (const d of seen.values()) console.log(`  ${d.pin.padEnd(34)} [${d.map}]`);
  console.log("  Delete these in Google My Maps too - the pins are not in this repo.");
}

const byReason = skipped.reduce((acc, s) => ((acc[s.why.replace(/^\d+%/, "N%")] ??= 0), acc[s.why.replace(/^\d+%/, "N%")]++, acc), {});
console.log(`\nSkipped ${skipped.length}:`);
for (const [why, n] of Object.entries(byReason)) console.log(`  ${String(n).padStart(3)}  ${why}`);
if (!write) console.log("\nRe-run with --write to apply.");
