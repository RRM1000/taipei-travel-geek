// Content-side affiliate fixes from data/research/affiliate-improvements.md
// (actions Q1, Q2 and the data-hotel tagging part of Q6), approved 27 Oct 2026:
//
//   1. /taipei-101-fireworks-new-years-eve: the Quick Verdict's "Anything
//      bookable sells out" line now points to the NYE view-hotels guide and to
//      the CÉ LA VI 31 December 2026 party on Klook (activity 133103).
//   2. The Quick Verdict on six big practical guides links the purchase it
//      names to the specific Klook product. Clicks inside .quick-verdict are
//      already reported as placement "quick_verdict" by the click listener in
//      app/layout.tsx, so no extra attribute is needed.
//   3. /best-areas-and-hotels-to-stay: every Klook hotel link gets a
//      data-hotel key, matching the hotel guides and data/hotel-photos.json.
//
// Every product was opened on Klook on 27 Oct 2026 and was on sale.
//
// Every find must match exactly once, or nothing is written. An edit whose
// result is already in place is skipped, so a second run is a no-op.
//
// Usage: node scripts/affiliate-content-updates.mjs
//        POSTS_PATH=/path/to/copy.json node scripts/affiliate-content-updates.mjs

import fs from "fs";
import path from "path";

const AID = "aid=8733";
const klook = (p) => `https://www.klook.com/en-GB/${p}?${AID}`;
const ext = `target="_blank" rel="noreferrer noopener"`;

const P = {
  ceLaVi: klook("activity/133103-new-years-eve-at-ce-la-vi-taipei/"),
  easycard: klook("activity/5777-public-transport-easycard-taipei/"),
  esim: klook("activity/132311-esim-taiwan-with-high-speed-and-stable-internet-connection/"),
  tpeTransfer: klook("airport-transfers/service/tpe-taiwan-taoyuan-international-airport/"),
  zooTicket: klook("activity/34262-maokong-gondola-taipei-zoo-tickets/"),
  gondolaPass: klook("activity/16000-maokong-gondola-combo-ticket-taipei/"),
};

// [find, replace] pairs, each find checked to match exactly once.
const EDITS = {
  "taipei-101-fireworks-new-years-eve": [
    [
      "and bar tickets from October &ndash; most are gone well before December.</li></ul></div>",
      `and bar tickets from October &ndash; most are gone well before December. For a room that looks straight at the tower, start with our <a href="/taipei-101-view-hotels-new-years-eve">101 view hotels for New Year's Eve</a>. For a party instead, <a href="${P.ceLaVi}" data-activity="ce-la-vi-taipei-nye" ${ext}>CÉ LA VI's 31 December night</a>, 48 floors up in Breeze Nanshan, is NT$2,999 until 15 November, then NT$3,500.</li></ul></div>`,
    ],
  ],
  "taiwan-easycard": [
    [
      "or pre-order online for instant pickup.</li></ul></div>",
      `or <a href="${P.easycard}" ${ext}>pre-order online for instant pickup</a> at the airport.</li></ul></div>`,
    ],
  ],
  "taiwan-sim-cards": [
    [
      "Buy a <strong>data-only eSIM</strong> online before you fly.",
      `Buy a <a href="${P.esim}" ${ext}><strong>data-only eSIM</strong> online</a> before you fly.`,
    ],
  ],
  "taoyuan-airport-mrt": [
    [
      "worth it outside MRT hours, or with a group and lots of luggage.</li></ul></div>",
      `worth it outside MRT hours, or with a group and lots of luggage. A <a href="${P.tpeTransfer}" ${ext}>pre-booked private transfer</a> fixes the fare before you fly, and the driver tracks your flight.</li></ul></div>`,
    ],
  ],
  mrt: [
    [
      "Get a physical EasyCard as well.</li></ul></div>",
      `Get a <a href="${P.easycard}" ${ext}>physical EasyCard</a> as well.</li></ul></div>`,
    ],
  ],
  "taipei-zoo": [
    [
      "<li><strong>NT$100 for adults</strong>, NT$50 concession,",
      `<li><strong>NT$100 for adults</strong> at the gate or <a href="${P.zooTicket}" ${ext}>on Klook</a>, NT$50 concession,`,
    ],
  ],
  "maokong-gondola": [
    [
      "<li><strong>NT$180 one way, or NT$300 for a day pass</strong>",
      `<li><strong>NT$180 one way, or NT$300 for a <a href="${P.gondolaPass}" ${ext}>day pass</a></strong>`,
    ],
  ],
};

// Klook hotel id -> data-hotel key for /best-areas-and-hotels-to-stay. Keys
// are the ones the hotel guides already use; where two guides disagree, or no
// guide has the hotel, the key is the hub's own data/hotel-photos.json key.
const HUB = "best-areas-and-hotels-to-stay";
const HOTEL_KEYS = {
  760314: "roaders-plus",
  267240: "cityinn-1",
  422703: "cityinn-2",
  269372: "cityinn-3",
  576278: "taiwan-youth-hostel-capsule-hotel",
  271049: "star-hostel",
  425808: "grand-hyatt-taipei",
  142088: "w-taipei",
  254548: "humble-house-taipei",
  570574: "home-hotel-xinyi",
  432606: "madison-taipei",
  409080: "hotel-eclat-taipei",
  451655: "kimpton-da-an-hotel",
  254139: "shangri-la-far-eastern-taipei",
  280671: "chez-nous-hotel-taipei",
  279384: "okura-prestige-taipei",
  255449: "regent-taipei",
  113738: "gloria-residence-taipei",
  67944: "tango-hotel-taipei-changan",
  47440: "goldinn-hotel-taipei",
  251905: "papa-whale",
  296386: "energy-inn",
  233515: "meander-taipei-hostel",
  269163: "cho-hotel",
  285820: "cho-hotel-3",
  534581: "dan-hostel-taipei",
  1769829: "capella-taipei",
  434580: "mandarin-oriental-taipei",
  440618: "eslite-hotel-taipei",
  424144: "tango-hotel-taipei-fuhsing",
  83968: "artree-hotel-taipei",
  270152: "grand-view-resort-beitou",
  452608: "spring-city-resort-beitou",
  345235: "hotel-indigo-taipei-north",
  409425: "the-grand-hotel-taipei",
  428356: "hotel-cham-cham-taipei",
  576326: "volando-urai-spring-spa-resort",
};
const HUB_LINKS = 75;

const filePath = path.resolve(process.env.POSTS_PATH || "content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const fail = (m) => { console.error(`${m} - aborting, nothing written.`); process.exit(1); };
const bySlug = new Map(posts.map((p) => [p.slug, p]));
const count = (s, sub) => s.split(sub).length - 1;
let changes = 0;

// 1 and 2. Quick Verdict edits.
for (const [slug, edits] of Object.entries(EDITS)) {
  const post = bySlug.get(slug);
  if (!post) fail(`/${slug} not found`);
  for (const [from, to] of edits) {
    if (count(post.content, to) === 1 && count(post.content, from) === 0) continue; // already applied
    const n = count(post.content, from);
    if (n !== 1) fail(`/${slug}: "${from.slice(0, 60)}..." matched ${n} times`);
    post.content = post.content.replace(from, () => to);
    changes++;
  }
  const qv = post.content.match(/<div class="quick-verdict">[\s\S]*?<\/div>/);
  if (!qv) fail(`/${slug}: no Quick Verdict`);
  for (const [, href] of qv[0].matchAll(/href="([^"]*klook\.com[^"]*)"/g))
    if (!href.includes(AID)) fail(`/${slug}: Quick Verdict Klook link without ${AID}: ${href}`);
}

// 3. data-hotel on the hub's Klook hotel links.
const hub = bySlug.get(HUB);
if (!hub) fail(`/${HUB} not found`);
let tagged = 0, already = 0;
const unmapped = new Set();
const hubOut = hub.content.replace(/<a ([^>]*href="https:\/\/www\.klook\.com\/[^"]*\/hotels\/detail\/(\d+)-[^"]*"[^>]*)>/g, (tag, attrs, id) => {
  if (!attrs.includes(AID)) fail(`/${HUB}: hotel link without ${AID}: ${tag}`);
  const key = HOTEL_KEYS[id];
  if (!key) { unmapped.add(id); return tag; }
  const have = attrs.match(/data-hotel="([^"]*)"/);
  if (have) {
    if (have[1] !== key) fail(`/${HUB}: hotel ${id} already tagged "${have[1]}", expected "${key}"`);
    already++;
    return tag;
  }
  tagged++;
  return `<a data-hotel="${key}" ${attrs}>`;
});
if (unmapped.size) fail(`/${HUB}: no key for Klook hotel id(s) ${[...unmapped].join(", ")}`);
if (tagged + already !== HUB_LINKS) fail(`/${HUB}: found ${tagged + already} Klook hotel links, expected ${HUB_LINKS}`);
const otherKlook = [...hubOut.matchAll(/<a [^>]*href="[^"]*klook\.com[^"]*"[^>]*>/g)].filter((m) => !m[0].includes("data-hotel="));
if (otherKlook.length) fail(`/${HUB}: ${otherKlook.length} Klook link(s) left untagged`);
hub.content = hubOut;
changes += tagged;

if (!changes) {
  console.log("Nothing to do: every edit is already in place.");
  process.exit(0);
}
fs.writeFileSync(filePath, JSON.stringify(posts, null, 2) + "\n");
console.log(`${changes - tagged} Quick Verdict edits on ${Object.keys(EDITS).length} pages; ${tagged} hub hotel links tagged (${already} already tagged)`);
