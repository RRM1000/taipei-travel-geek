// Pull every Google My Maps embed on the site out of Google and into the repo.
//
//   node scripts/export-my-maps.mjs             fetch all maps, write data/maps/
//   node scripts/export-my-maps.mjs --list      list the embeds, fetch nothing
//   node scripts/export-my-maps.mjs --mid <id>  fetch one map
//
// WHY. 54 embeds across the site, 51 distinct maps, and every pin inside them
// is invisible to search: an embed is a cross-origin iframe, so the place
// names, descriptions and links in it are Google's content on our page, not
// ours. /maps is a 650-character page for exactly this reason - all of its
// substance is inside the frame. Getting the pins into the repo is the first
// step whatever we do next, whether that is rendering our own map or simply
// listing the places underneath the existing embed.
//
// HOW. My Maps will hand back the whole map as KML, no auth, if you ask with
// forcekml=1 - without it you get KMZ, which is the same thing zipped. The
// descriptions already carry the destination URL on our own site, so the
// pin-to-page mapping comes across for free.
//
// The output is one JSON file per map plus an index, all version controlled,
// so a map changing under us shows up as a diff rather than a surprise.

import fs from "node:fs";
import path from "node:path";
import { XMLParser } from "fast-xml-parser";

const OUT_DIR = path.resolve("data/maps");
const POSTS = path.resolve("content/posts.json");
const SITE = "https://www.taipeitravelgeek.com";
const DELAY_MS = 600; // 51 sequential requests; no reason to hammer Google

const args = process.argv.slice(2);
const onlyMid = args.includes("--mid") ? args[args.indexOf("--mid") + 1] : null;
const listOnly = args.includes("--list");

// ------------------------------------------------------- find the embeds ---
function findEmbeds() {
  const posts = JSON.parse(fs.readFileSync(POSTS, "utf8"));
  const found = new Map();
  for (const post of posts) {
    const re = /maps\/d\/(?:u\/\d+\/)?embed\?mid=([A-Za-z0-9_-]+)/g;
    for (const m of (post.content || "").matchAll(re)) {
      if (!found.has(m[1])) found.set(m[1], []);
      const slugs = found.get(m[1]);
      if (!slugs.includes(post.slug)) slugs.push(post.slug);
    }
  }
  return found;
}

// ------------------------------------------------------------- parse KML ---
// The node names are deliberately the "#"-prefixed defaults: KML has its own
// <text> element, and naming the text node "text" makes the parser reject the
// document outright with "Invalid tag name: text".
const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@",
  cdataPropName: "#cdata",
  textNodeName: "#text",
});

const asArray = (v) => (v == null ? [] : Array.isArray(v) ? v : [v]);

/** KML descriptions are HTML, and My Maps puts our own link in as bare text. */
function splitDescription(raw) {
  const html = raw == null ? "" : String(raw);
  const urlMatch = html.match(new RegExp(`${SITE.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(/[A-Za-z0-9/_-]*)`));
  const text = html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(new RegExp(`${SITE.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\S*`, "g"), "")
    .replace(/\s+/g, " ")
    .trim();
  return { description: text, url: urlMatch ? urlMatch[1] : null };
}

const textOf = (node) => {
  if (node == null) return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  return String(node["#cdata"] ?? node["#text"] ?? "");
};

const coords = (str) =>
  String(str)
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((triple) => {
      const [lng, lat] = triple.split(",").map(Number);
      return [lng, lat];
    });

function readPlacemark(pm) {
  const { description, url } = splitDescription(textOf(pm.description));
  // My Maps encodes the pin colour in the style id: #icon-1804-558B2F
  const style = textOf(pm.styleUrl);
  const colour = (style.match(/-([0-9A-F]{6})(?:-|$)/i) || [])[1] || null;

  const place = { name: textOf(pm.name), description, url, colour: colour ? `#${colour}` : null };

  if (pm.Point?.coordinates != null) {
    const [c] = coords(textOf(pm.Point.coordinates));
    if (!c || Number.isNaN(c[0])) return null;
    return { ...place, type: "point", lng: c[0], lat: c[1] };
  }
  if (pm.LineString?.coordinates != null) {
    return { ...place, type: "line", path: coords(textOf(pm.LineString.coordinates)) };
  }
  if (pm.Polygon != null) {
    const ring = pm.Polygon?.outerBoundaryIs?.LinearRing?.coordinates;
    if (ring != null) return { ...place, type: "polygon", path: coords(textOf(ring)) };
  }
  return null; // ground overlays and anything else we do not use
}

function parseKml(xml, mid, slugs) {
  const doc = parser.parse(xml)?.kml?.Document;
  if (!doc) throw new Error("no <Document> in the KML");

  const layers = [];
  const collect = (container, layerName) => {
    const places = asArray(container.Placemark).map(readPlacemark).filter(Boolean);
    if (places.length) layers.push({ name: layerName, places });
    for (const folder of asArray(container.Folder)) collect(folder, textOf(folder.name));
  };
  collect(doc, textOf(doc.name) || "Untitled layer");

  return {
    mid,
    name: textOf(doc.name),
    embed: `https://www.google.com/maps/d/embed?mid=${mid}`,
    usedOn: slugs,
    fetchedAt: new Date().toISOString(),
    counts: {
      layers: layers.length,
      places: layers.reduce((a, l) => a + l.places.length, 0),
      linked: layers.reduce((a, l) => a + l.places.filter((p) => p.url).length, 0),
    },
    layers,
  };
}

// ----------------------------------------------------------------- main ---
async function fetchMap(mid, slugs) {
  const url = `https://www.google.com/maps/d/kml?mid=${mid}&forcekml=1`;
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const xml = await res.text();
  if (!xml.includes("<kml")) throw new Error("response was not KML (map private or deleted?)");
  return parseKml(xml, mid, slugs);
}

const embeds = findEmbeds();

if (listOnly) {
  console.log(`${embeds.size} distinct maps across the site:\n`);
  for (const [mid, slugs] of embeds) console.log(`  ${mid}  ${slugs.join(", ")}`);
  process.exit(0);
}

const targets = onlyMid ? [[onlyMid, embeds.get(onlyMid) ?? []]] : [...embeds];
fs.mkdirSync(OUT_DIR, { recursive: true });

console.log(`Fetching ${targets.length} map${targets.length === 1 ? "" : "s"} from Google My Maps...\n`);

const index = [];
const failures = [];

for (const [mid, slugs] of targets) {
  try {
    const map = await fetchMap(mid, slugs);
    fs.writeFileSync(path.join(OUT_DIR, `${mid}.json`), JSON.stringify(map, null, 2) + "\n");
    index.push({
      mid,
      name: map.name,
      usedOn: slugs,
      places: map.counts.places,
      linked: map.counts.linked,
      layers: map.counts.layers,
    });
    console.log(
      `  ok    ${String(map.counts.places).padStart(3)} places (${map.counts.linked} linked)  ${map.name}`,
    );
  } catch (e) {
    failures.push({ mid, usedOn: slugs, error: e.message });
    console.log(`  FAIL  ${mid}  ${e.message}  (${slugs.join(", ")})`);
  }
  if (targets.length > 1) await new Promise((r) => setTimeout(r, DELAY_MS));
}

// Pins whose description links to a page that no longer exists. These cannot
// be fixed from here - the pin lives in Google My Maps, not the repo - so the
// export reports them and someone edits the map. Worth having: a reader who
// taps one of these lands on a 404 with no way back.
const siteSlugs = new Set(JSON.parse(fs.readFileSync(POSTS, "utf8")).map((p) => p.slug));
const deadLinks = [];
for (const entry of index) {
  const map = JSON.parse(fs.readFileSync(path.join(OUT_DIR, `${entry.mid}.json`), "utf8"));
  for (const layer of map.layers) {
    for (const place of layer.places) {
      if (!place.url) continue;
      const slug = place.url.replace(/^\//, "").split(/[#?]/)[0].replace(/\/$/, "");
      if (!siteSlugs.has(slug)) deadLinks.push({ map: map.name, mid: map.mid, place: place.name, url: place.url });
    }
  }
}

index.sort((a, b) => b.places - a.places);
fs.writeFileSync(
  path.join(OUT_DIR, "index.json"),
  JSON.stringify({ generatedAt: new Date().toISOString(), maps: index, deadLinks, failures }, null, 2) + "\n",
);

const totalPlaces = index.reduce((a, m) => a + m.places, 0);
const totalLinked = index.reduce((a, m) => a + m.linked, 0);
console.log(
  `\n${index.length} maps, ${totalPlaces} places, ${totalLinked} already linked to a page here.` +
    (failures.length ? `  ${failures.length} failed - see data/maps/index.json.` : ""),
);

if (deadLinks.length) {
  console.log(`\n${deadLinks.length} pins link to a page that no longer exists:`);
  for (const d of deadLinks) console.log(`  ${d.url.padEnd(36)} ${d.place}  [${d.map}]`);
  console.log("  Fix these in Google My Maps - the pin data is not in this repo.");
}

console.log(`\nWritten to ${OUT_DIR}\n`);
