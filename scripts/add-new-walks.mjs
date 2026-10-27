// Three new self-guided walks, in the same shape as the five existing ones:
//
//   /wanhua-heritage-walk          Ximen to Longshan Temple and Huaxi Street
//   /dadaocheng-dihua-street-walk  North Gate up Dihua Street to the wharf at
//                                  sunset, then Ningxia Night Market
//   /xinbeitou-hot-springs-walk    Xinbeitou MRT to Thermal Valley
//
// The post bodies are in data/walks-posts/<slug>.json; the stops and map data
// in data/walks-input/ and data/walks/ (scripts/build-walks.mjs). Facts were
// checked live on 27 Oct 2026, with sources in data/research/<slug>.md.
//
// The script also makes the corrections that research turned up on existing
// stop pages (the Hot Spring Museum closes for restoration from 9 November
// 2026; a wrong MRT exit at the Red House and Huaxi Street; Yuan Fang
// Guabao's and Ningxia's hours; Thermal Valley's temperature), and links the
// walks from their stop pages and from the walks they meet.
//
// Every find must match exactly once, every internal link and #anchor in the
// new posts must resolve, and every image must exist, or nothing is written.

import fs from "fs";
import path from "path";

const DATE = "2026-10-27 12:00:00";
const SLUGS = ["wanhua-heritage-walk", "dadaocheng-dihua-street-walk", "xinbeitou-hot-springs-walk"];
const W = { wanhua: "/wanhua-heritage-walk", dadaocheng: "/dadaocheng-dihua-street-walk", xinbeitou: "/xinbeitou-hot-springs-walk" };

// A closing "Carry on walking" section for each new walk, as on London's walks.
const CARRY_ON = {
  "wanhua-heritage-walk":
    `\n\n<h2 id="Carry-On">Carry On Walking</h2>\n\n<p>The <a href="${W.dadaocheng}">Dadaocheng and Dihua Street walk</a> starts at the North Gate, one stop from Ximen on the Green line or a 15-minute walk north, and the <a href="/zhongzheng-walking-route">Zhongzheng walking route</a> finishes at 228 Peace Memorial Park, a similar distance east. Every walk is listed under <a href="/category/routes">Routes</a>.</p>`,
  "dadaocheng-dihua-street-walk":
    `\n\n<h2 id="Carry-On">Carry On Walking</h2>\n\n<p>For the older streets south of here, the <a href="${W.wanhua}">Wanhua heritage walk</a> runs from Ximen, one stop from Beimen on the Green line, down to Longshan Temple. The <a href="/datong-walking-route">Datong walking routes</a> cover the temples and museums further north around Yuanshan. Every walk is listed under <a href="/category/routes">Routes</a>.</p>`,
  "xinbeitou-hot-springs-walk":
    `\n\n<h2 id="Carry-On">Carry On Walking</h2>\n\n<p>Back in the city, the <a href="/datong-walking-route">Datong walking routes</a> start at Yuanshan, on the same Red line you'll take home, and every other walk is listed under <a href="/category/routes">Routes</a>.</p>`,
};

// Corrections from the three research files (each checked to match once).
const FIXES = {
  "the-red-house-ximending": [
    ["Closest MRT: Ximen Station (blue/green lines - exit 2)", "Closest MRT: Ximen Station (blue/green lines - exit 1)"],
  ],
  "huaxi-street-night-market": [
    ["You'll find it at No. 17-2 Huaxi Street, open from 12:00 to 22:00.", "You'll find it at No. 17-2 Huaxi Street, open from 11:30 to 20:00 and closed on Mondays."],
    ["Closest MRT: Longshan Temple Station (blue line - exit 2)", "Closest MRT: Longshan Temple Station (blue line - exit 1)"],
  ],
  "michelin-food-stands-at-night-markets": [
    ["Open <strong>17:00</strong> &ndash; <strong>01:00</strong>", "Open <strong>17:00</strong> &ndash; <strong>23:30</strong>"],
  ],
  xinbeitou: [
    ["The <strong>Beitou Hot Spring Museum</strong> and <strong>Beitou Library</strong> are just two of the fine buildings you'll walk past, and both are open most days.",
     "The <strong>Beitou Hot Spring Museum</strong> and <strong>Beitou Library</strong> are just two of the fine buildings you'll walk past. The library is open daily; the museum, however, closes on 9 November 2026 for restoration and should reopen in late 2027."],
    ["closed on Mondays and on days the government closes offices. You'll swap",
     "closed on Mondays and on days the government closes offices. <strong>Note that it shuts on 9 November 2026 for a restoration expected to run until October 2027.</strong> You'll swap"],
    ["It's a ten-minute walk from Xinbeitou MRT (exit 4).", "It's a ten-minute walk from Xinbeitou MRT."],
    ["water temperatures can range from 60°c to almost 100°c", "water temperatures range from 80°C to 100°C"],
  ],
  "taipei-hot-springs": [
    ["Shoes off and into slippers at the door. It is free, and it makes the rest of the walk make sense.",
     "Shoes off and into slippers at the door. It is free, and it makes the rest of the walk make sense &ndash; though the building closes on 9 November 2026 for a year-long restoration."],
    ["NT$150&ndash;200 at the older bathhouses", "NT$150 at Longnaitang, the oldest bathhouse"],
    ["The works were due to finish in late September 2026, with the reopening date still to be announced, so check before making a special trip.",
     "The works were scheduled to end in 2026, yet by late October there was still no word on when it will reopen, so check before making a special trip."],
  ],
  "best-museums-in-taipei": [
    ["is free and occupies the old Japanese public bathhouse from 1913",
     "is free (but shut for restoration between 9 November 2026 and around October 2027) and occupies the old Japanese public bathhouse from 1913"],
  ],
};

// One-line links to the new walks. "loc" = after the page's location line;
// "h2" = after the first paragraph of that section; "end" = appended.
const LINKS = [
  ["the-red-house-ximending", { loc: true }, `<p>The Red House is the second stop on our <a href="${W.wanhua}">Wanhua heritage walk</a>, which carries on south to Bopiliao and Longshan Temple.</p>`],
  ["longshan-temple", { loc: true }, `<p>To see the temple as part of an afternoon on foot, our <a href="${W.wanhua}">Wanhua heritage walk</a> arrives here from Ximending by way of Bopiliao.</p>`],
  ["bopiliao-historical-block", { loc: true }, `<p>Bopiliao is a stop on our <a href="${W.wanhua}">Wanhua heritage walk</a>, between Ximending and Longshan Temple.</p>`],
  ["huaxi-street-night-market", { loc: true }, `<p>The market is where our <a href="${W.wanhua}">Wanhua heritage walk</a> finishes, so it's a natural place for dinner after the temple.</p>`],
  ["ximending", { h2: "History &amp; Landmarks" }, `<p>For a self-guided route from the Red House down to Longshan Temple, see our <a href="${W.wanhua}">Wanhua heritage walk</a>.</p>`],
  ["dihua-street-dadaocheng-guide", { h2: "The History of Dadaocheng: From Tea Port to Commercial Hub" }, `<p>To see it all in one afternoon, follow our <a href="${W.dadaocheng}">Dadaocheng and Dihua Street walk</a>, timed to reach the wharf for sunset.</p>`],
  ["ningxia-night-market", { loc: true }, `<p>Ningxia is the last stop on our <a href="${W.dadaocheng}">Dadaocheng and Dihua Street walk</a>, which ends here after sunset at the wharf.</p>`],
  ["xinbeitou", { loc: true }, `<p>For a stop-by-stop route from the station to Thermal Valley, with a map, see our <a href="${W.xinbeitou}">Xinbeitou hot springs walk</a>.</p>`],
  ["taipei-hot-springs", { h2: "Beitou: The Main Event" }, `<p>Our <a href="${W.xinbeitou}">Xinbeitou hot springs walk</a> links the park, the library and Thermal Valley into a two-to-three-hour loop with a soak at the end.</p>`],
  ["best-areas-for-walking", { h2: "Xinbeitou" }, `<p>There's a mapped route for this one: our <a href="${W.xinbeitou}">Xinbeitou hot springs walk</a>.</p>`],
  ["zhongzheng-walking-route", { end: true }, `\n\n<h2 id="Carry-On">Carry On Walking</h2>\n\n<p>From 228 Peace Memorial Park, Ximen is about 15 minutes' walk west for the <a href="${W.wanhua}">Wanhua heritage walk</a>, and the North Gate a similar distance north-west for the <a href="${W.dadaocheng}">Dadaocheng and Dihua Street walk</a>.</p>`],
  ["datong-walking-route", { end: true }, `\n\n<h2 id="Carry-On">Carry On Walking</h2>\n\n<p>Dadaocheng, Datong's old riverside trading quarter, is a few MRT stops south of Yuanshan; our <a href="${W.dadaocheng}">Dadaocheng and Dihua Street walk</a> covers it from the North Gate to Ningxia Night Market.</p>`],
];

const filePath = path.resolve(process.env.POSTS_PATH || "content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const fail = (m) => { console.error(`${m} - aborting, nothing written.`); process.exit(1); };
const bySlug = new Map(posts.map((p) => [p.slug, p]));

// 1. The new posts.
let nextId = Math.max(...posts.map((p) => p.id)) + 1;
const added = [];
for (const slug of SLUGS) {
  if (bySlug.has(slug)) fail(`/${slug} already exists`);
  const draft = JSON.parse(fs.readFileSync(path.resolve(`data/walks-posts/${slug}.json`), "utf8"));
  if (!fs.existsSync(path.resolve(`data/walks/${slug}.json`))) fail(`no map data for ${slug} - run scripts/build-walks.mjs`);
  if (!draft.content.includes(`<div data-walk-route="${slug}"></div>`)) fail(`${slug}: no map marker`);
  if (draft.title.length > 60) fail(`${slug}: title is ${draft.title.length} chars`);
  const post = {
    id: nextId++,
    authorId: 2,
    date: DATE,
    modified: DATE,
    slug,
    title: draft.title,
    excerpt: draft.excerpt,
    type: "post",
    parentId: 0,
    content: draft.content.trimEnd() + CARRY_ON[slug] + "\n",
    categories: [{ name: "Areas", slug: "areas" }, { name: "Routes", slug: "routes" }],
    tags: [{ name: "Walking", slug: "walking" }],
    featuredImage: draft.featuredImage,
  };
  posts.push(post);
  bySlug.set(slug, post);
  added.push(post);
}

// 2. Check every internal link, #anchor and image in the new posts.
const exists = (url) => fs.existsSync(path.resolve("public" + decodeURI(url)));
for (const post of added) {
  if (!exists(post.featuredImage)) fail(`${post.slug}: featured image ${post.featuredImage} missing`);
  for (const [, src] of post.content.matchAll(/<img [^>]*src="([^"]+)"/g)) if (src.startsWith("/") && !exists(src)) fail(`${post.slug}: image ${src} missing`);
  for (const [, href] of post.content.matchAll(/href="(\/[^"]*)"/g)) {
    if (href.startsWith("/media/")) { if (!exists(href)) fail(`${post.slug}: ${href} missing`); continue; }
    const [pathPart, anchor] = href.split("#");
    const target = pathPart.replace(/^\/|\/$/g, "");
    if (target.startsWith("category/")) continue;
    const page = bySlug.get(target);
    if (!page) fail(`${post.slug}: link to ${href} - no such page`);
    if (anchor && !page.content.includes(`id="${anchor}"`)) fail(`${post.slug}: link to ${href} - no #${anchor} on that page`);
  }
}

// 3. Corrections.
for (const [slug, edits] of Object.entries(FIXES)) {
  const post = bySlug.get(slug);
  if (!post) fail(`/${slug} not found`);
  for (const [from, to] of edits) {
    const n = post.content.split(from).length - 1;
    if (n !== 1) fail(`/${slug}: "${from.slice(0, 50)}..." matched ${n} times`);
    post.content = post.content.replace(from, () => to);
  }
  post.modified = DATE;
}

// 4. Links in.
for (const [slug, where, html] of LINKS) {
  const post = bySlug.get(slug);
  if (!post) fail(`/${slug} not found`);
  const c = post.content;
  let out;
  if (where.end) {
    out = c.trimEnd() + html + "\n";
  } else {
    let at;
    if (where.loc) {
      const m = c.match(/<p class="location-line">[^\n]*?<\/p>/);
      if (!m) fail(`/${slug}: no location line`);
      at = m.index + m[0].length;
    } else {
      const hits = [...c.matchAll(/<h2[^>]*>([^<]*)<\/h2>/g)].filter((h) => h[1] === where.h2);
      if (hits.length !== 1) fail(`/${slug}: h2 "${where.h2}" matched ${hits.length} times`);
      const end = c.indexOf("</p>", c.indexOf("<p", hits[0].index));
      if (end < 0) fail(`/${slug}: no paragraph under "${where.h2}"`);
      at = end + 4;
    }
    out = c.slice(0, at) + `\n\n${html}` + c.slice(at);
  }
  post.content = out;
  post.modified = DATE;
}

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2) + "\n");
console.log(`Added ${added.map((p) => `/${p.slug} (${p.id})`).join(", ")}`);
console.log(`${Object.values(FIXES).flat().length} corrections on ${Object.keys(FIXES).length} pages; ${LINKS.length} links in`);
