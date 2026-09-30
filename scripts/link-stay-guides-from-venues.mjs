// Add a one-line "staying nearby?" link from the venue and practical guides
// readers use before picking a base, to the matching hotel guide. Until now
// most hotel guides were linked only from the where-to-stay hub, the
// districts guide and each other.
//
// Each line is placed after the page's location line, or after the first
// paragraph of a named section, before a named section (the walking routes,
// whose sections open with lists), or after the first paragraph that mentions
// a phrase. Every sentence is worded differently, so no text repeats across
// pages. Aborts if an anchor can't be found or a page already links there.

import fs from "fs";
import path from "path";

const MODIFIED = "2026-09-30 12:00:00";
const a = (slug, text) => `<a href="/${slug}">${text}</a>`;

const LINKS = [
  // Ximending
  ["ximen-outdoor-drinking", { loc: true }, "hotels-near-ximending",
    `<p>Want to be able to stumble home? Our guide to ${a("hotels-near-ximending", "hotels near Ximending")} lists the closest beds, from hostels to Japanese chain hotels.</p>`],
  ["the-red-house-ximending", { loc: true }, "hotels-near-ximending",
    `<p>Several of the ${a("hotels-near-ximending", "hotels near Ximending")} are within five minutes' walk of the Red House, if you'd like to base yourself here.</p>`],
  ["longshan-temple", { h2: "Getting There" }, "hotels-near-ximending",
    `<p>The temple is one MRT stop from Ximen, so the ${a("hotels-near-ximending", "hotels around Ximending")} make an easy base for an early visit before the crowds.</p>`],
  // Taipei 101
  ["taipei-101-fireworks-new-years-eve", { h2: "Watching from a Hotel Room" }, "hotels-near-taipei-101",
    `<p>Rooms facing the tower sell out months ahead. For prices, which rooms look at 101 and the walk from each hotel, see our guide to ${a("hotels-near-taipei-101", "hotels near Taipei 101")}.</p>`],
  ["songshan-xinyi-walking-tour", { beforeH2: "Step-By-Step" }, "hotels-near-taipei-101",
    `<p>If you're staying on this side of the city, our ${a("hotels-near-taipei-101", "Taipei 101 hotels guide")} covers the options near the start and end of this walk.</p>`],
  // Daan
  ["daan-forest-park", { loc: true }, "hotels-in-daan",
    `<p>For somewhere to stay within walking distance of the park, see our guide to ${a("hotels-in-daan", "hotels in Daan")}.</p>`],
  ["tonghua-night-market", { loc: true }, "hotels-in-daan",
    `<p>Staying close by? Both our ${a("hotels-in-daan", "Daan hotels guide")} and ${a("hotels-near-taipei-101", "Taipei 101 hotels guide")} include places a short walk from the market.</p>`],
  ["daan-walking-route", { beforeH2: "Step-By-Step" }, "hotels-in-daan",
    `<p>To make this your neighbourhood for a few days, our guide to ${a("hotels-in-daan", "hotels in Daan")} gives the nearest MRT exit for every hotel on it.</p>`],
  // Zhongshan
  ["dihua-street-dadaocheng-guide", { h2: "Practical Information &amp; Getting There", close: "</div>" }, "hotels-in-zhongshan",
    `<p>Dadaocheng has few hotels of its own; most visitors stay a short walk east, around Zhongshan station. See our guide to ${a("hotels-in-zhongshan", "hotels in Zhongshan")}.</p>`],
  ["addiction-aquatic-development", { loc: true }, "hotels-in-zhongshan",
    `<p>The nearest good base is the Zhongshan area, a short Brown or Orange line ride away; our ${a("hotels-in-zhongshan", "Zhongshan hotels guide")} has the details.</p>`],
  // Beitou
  ["yangmingshan-national-park", { loc: true }, "beitou-hot-spring-hotels",
    `<p>A night in Beitou puts you at the foot of the mountain for an early start, with a hot spring bath to come back to. See our pick of ${a("beitou-hot-spring-hotels", "Beitou hot spring hotels")}.</p>`],
  ["taiwan-tourist-shuttle-bus", { contains: "Beitou" }, "beitou-hot-spring-hotels",
    `<p>Planning to stay over in Beitou first? Our guide to ${a("beitou-hot-spring-hotels", "Beitou hot spring hotels")} covers where to sleep and which have a tub in the room.</p>`],
  // Main Station and the airport
  ["mrt", { h2: "MRT Stations" }, "hotels-near-taipei-main-station",
    `<p>Taipei Main Station is the best-connected stop on the network, which makes it an easy base; see our guide to ${a("hotels-near-taipei-main-station", "hotels near Taipei Main Station")}.</p>`],
  ["taipei-public-transport", { h2: "Getting To and From the Airports" }, "hotels-near-taoyuan-airport",
    `<p>Arriving after the last train or leaving before the first? Our guides to ${a("hotels-near-taoyuan-airport", "hotels near Taoyuan Airport")} and ${a("hotels-near-taipei-main-station", "hotels near Taipei Main Station")} cover both ends of the Airport MRT.</p>`],
  ["taiwan-sim-cards", { h2: "Klook Airport Locations" }, "hotels-near-taoyuan-airport",
    `<p>If you land too late to head into the city, our guide to ${a("hotels-near-taoyuan-airport", "hotels near Taoyuan Airport")} lists the beds closest to arrivals.</p>`],
  ["taiwan-visa-entry-requirements", { h2: "What Happens at Immigration", close: "</ul>" }, "hotels-near-taoyuan-airport",
    `<p>Transit passengers should note that Taoyuan has no airside hotel: the capsule hotel in Terminal 2 is after immigration. More in our guide to ${a("hotels-near-taoyuan-airport", "hotels near Taoyuan Airport")}.</p>`],
  // Hostels and apartments
  ["taipei-on-a-budget", { first: true }, "best-hostels-in-taipei",
    `<p>The biggest saving is usually where you sleep: a dorm bed midweek costs a fraction of a hotel room. See our guide to the ${a("best-hostels-in-taipei", "best hostels in Taipei")}.</p>`],
  ["taipei-guide", { h2: "Where to Stay", close: "</ul>" }, "best-hostels-in-taipei",
    `<p>On a tight budget, start with the ${a("best-hostels-in-taipei", "best hostels in Taipei")}; staying a week or more, compare ${a("aparthotels-serviced-apartments-taipei", "serviced apartments")}, which come with a kitchen and washing machine.</p>`],
  ["taipei-laundrettes", { first: true }, "aparthotels-serviced-apartments-taipei",
    `<p>On a longer trip, a room with its own washing machine saves the walk. Our guide to ${a("aparthotels-serviced-apartments-taipei", "serviced apartments in Taipei")} lists licensed places that have one.</p>`],
  ["best-cafes-to-work", { first: true }, "aparthotels-serviced-apartments-taipei",
    `<p>Working from Taipei for a few weeks? Our guide to ${a("aparthotels-serviced-apartments-taipei", "serviced apartments and aparthotels")} covers places you can book by the night or the month.</p>`],
];

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const fail = (m) => { console.error(`${m} - aborting, nothing written.`); process.exit(1); };

for (const [slug, where, target, html] of LINKS) {
  const post = posts.find((p) => p.slug === slug);
  if (!post) fail(`/${slug} not found`);
  const c = post.content;
  if (c.includes(`href="/${target}"`)) fail(`/${slug} already links to /${target}`);
  let at;
  if (where.beforeH2) {
    const hits = [...c.matchAll(/<h2[^>]*>([^<]*)<\/h2>/g)].filter((h) => h[1] === where.beforeH2);
    if (hits.length !== 1) fail(`/${slug}: h2 "${where.beforeH2}" matched ${hits.length} times`);
    post.content = c.slice(0, hits[0].index) + `${html}\n\n` + c.slice(hits[0].index);
    post.modified = MODIFIED;
    console.log(`/${slug} -> /${target}`);
    continue;
  }
  if (where.loc) {
    const m = c.match(/<p class="location-line">[^\n]*?<\/p>/);
    if (!m) fail(`/${slug}: no location line`);
    at = m.index + m[0].length;
  } else {
    let from = 0;
    if (where.h2) {
      const hits = [...c.matchAll(/<h2[^>]*>([^<]*)<\/h2>/g)].filter((h) => h[1] === where.h2);
      if (hits.length !== 1) fail(`/${slug}: h2 "${where.h2}" matched ${hits.length} times`);
      from = hits[0].index;
    } else if (where.contains) {
      const ps = [...c.matchAll(/<p>[\s\S]*?<\/p>/g)].filter((m) => m[0].includes(where.contains));
      if (!ps.length) fail(`/${slug}: no paragraph mentions "${where.contains}"`);
      from = ps[0].index;
    }
    if (where.close) {
      const end = c.indexOf(where.close, from);
      if (end < 0) fail(`/${slug}: no ${where.close} after the anchor`);
      at = end + where.close.length;
    } else {
      const pStart = c.indexOf("<p", from);
      const end = c.indexOf("</p>", pStart);
      if (pStart < 0 || end < 0) fail(`/${slug}: no paragraph to follow`);
      at = end + 4;
    }
  }
  post.content = c.slice(0, at) + `\n\n${html}` + c.slice(at);
  post.modified = MODIFIED;
  console.log(`/${slug} -> /${target}`);
}

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2) + "\n");
