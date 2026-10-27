// Quick metadata fixes from section 2 of
// data/research/existing-posts-improvement-plan.md (October 2026).
//
// The meta description is `excerpt` (app/[slug]/page.tsx generateMetadata and
// the JSON-LD in lib/content.ts); the same text is shown on the page as the dek.
// Only `title`, `excerpt` and `modified` are touched. Post bodies are not.
//
// Guarded: every slug's current title and excerpt must equal the expected old
// values, or the script aborts without writing anything.
//
// Deliberately not here:
// - /mrt: its title changed on 17 Oct; leave it until mid-November.
// - /taiwan-sim-cards: title only, description kept.
// - /michelin-bib-gourmand-taiwanese-small-eats-taipei: title only; the plan
//   says rewrite the description once the stalls are checked against the 2026 list.
//
// Usage: node scripts/update-titles-and-meta.mjs
// POSTS_PATH=<file> writes to a copy instead of content/posts.json.

import fs from "node:fs";
import path from "node:path";

const MODIFIED = "2026-10-28 12:00:00";
const filePath = path.resolve(process.env.POSTS_PATH || "content/posts.json");

// newTitle / newExcerpt omitted = keep the current value (still guarded).
const updates = [
  {
    slug: "taipei-101-fireworks-new-years-eve",
    oldTitle: "The Best Spots to See the Taipei 101 NYE Fireworks 2026/2027",
    newTitle: "Taipei 101 Fireworks 2026/27: Best Places to Watch on NYE",
    oldExcerpt:
      "Where to watch the Taipei 101 New Year's Eve fireworks - free viewpoints, rooftop bars, hotel rooms, and how to get home afterwards.",
    newExcerpt:
      "Where to watch the Taipei 101 New Year's Eve fireworks in 2026/27: free viewpoints, rooftop bars, hotel rooms with a view, start time and getting home after.",
  },
  {
    slug: "taoyuan-airport-mrt",
    oldTitle: "Taoyuan Airport MRT: Times, Prices and Tips (2026)",
    oldExcerpt:
      "Using the Taoyuan Airport MRT (also known as the Airport Express) to travel to and from Taoyuan airport",
    newExcerpt:
      "Taoyuan Airport MRT to Taipei Main: NT$160 and 35–39 minutes by express. Tap a contactless card or phone at the gate. Last trains, tickets, in-town check-in.",
  },
  {
    slug: "taiwan-high-speed-rail-hsr-discounts-klook",
    oldTitle: "Taiwan High Speed Rail (THSR): Tickets, Prices & Deals",
    newTitle: "Taiwan High Speed Rail: Timetable, Prices & Klook Deals",
    oldExcerpt:
      "How to pay less for Taiwan High Speed Rail: early-bird and buy-one-get-one fares, Klook's foreign-visitor deals, fares from Taipei and journey times.",
    newExcerpt:
      "Taiwan High Speed Rail timetable and journey times from Taipei, fares, and how to pay less with early-bird tickets (up to 35% off) and Klook visitor deals.",
  },
  {
    slug: "ximending",
    oldTitle: "Ximending: 30 Best Things to Do, Food & Nightlife (2026)",
    newTitle: "Ximending Walking District: 30 Best Things to Do",
    oldExcerpt:
      "The 30 best things to do in Ximending, from Michelin noodles and blow-torched beef to a 300-year-old temple, Japanese-era ruins and Taipei's best street art.",
  },
  {
    slug: "taiwan-tourist-tax-refund",
    oldTitle: "Taiwan Tourist Tax Refund - Full Guide and Locations (2026)",
    newTitle: "Taiwan Tax Refund for Tourists (2026): Rate & How to Claim",
    oldExcerpt:
      "Anyone spending over NT$2,000 at designated stores will be entitled to a full VAT rebate of 5%.",
    newExcerpt:
      "Spend NT$2,000 in one store in a day and you can claim Taiwan's 5% VAT back, about 4% after the handling fee. How to claim in store, in town or at the airport.",
  },
  {
    slug: "sun-yat-sen-memorial-hall",
    oldTitle: "Sun Yat-Sen Memorial Hall: Closed Until Late 2026",
    newTitle: "Sun Yat-Sen Memorial Hall: Closed Into 2027, What's Open",
    oldExcerpt:
      "The main hall is shut for renovation until late 2026, so the guard ceremony and galleries are off - but the park, Emerald Pond and the Taipei 101 views are open and free. What to see now, and what's inside when it returns.",
    newExcerpt:
      "The main hall is closed for renovation into 2027, so the guard ceremony and galleries are off, but the park, Emerald Pond and Taipei 101 views are free.",
  },
  {
    slug: "taiwan-sim-cards",
    oldTitle: "Taiwan SIM Card for Tourists: 2026 Airport & eSIM Prices",
    newTitle: "Taiwan SIM Card & eSIM for Tourists: 2026 Prices",
    oldExcerpt:
      "Airport and Klook prices compared for 4G, 5G and eSIM, from 3 days to a year. Which to buy, what you need to bring, and where the cheap options stop.",
  },
  {
    slug: "yongkang-street",
    oldTitle: "25 Best Things to Do on Yongkang Street: Food, Gifts & Old Taipei",
    newTitle: "Yongkang Street, Taipei: 25 Things to Eat, Do & Shop",
    oldExcerpt:
      "The 25 best things to do on Yongkang Street, from the original Din Tai Fung and sixty-year-old beef noodles to mango shaved ice, gift shops and the Japanese-era lanes behind it.",
    newExcerpt:
      "The 25 best things on Yongkang Street, Taipei's best food and shopping street: the original Din Tai Fung, beef noodles, mango shaved ice and gift shops.",
  },
  {
    slug: "tamsui",
    oldTitle: "Tamsui Guide: 20 Best Things to Do, Plus Taiwan's Best Sunset",
    newTitle: "Tamsui, Taipei: 20 Best Things to Do & the Best Sunset",
    oldExcerpt:
      "A local's guide to Tamsui: the 20 best things to do, what to eat (A-gei and iron eggs were invented here), the ferries, and where to watch the best sunset in Taiwan.",
    // Plan says keep, but the current text is 165 characters; trimmed to fit.
    newExcerpt:
      "A local's guide to Tamsui: the 20 best things to do, what to eat (A-gei and iron eggs were invented here), the ferries, and the best sunset spot in Taiwan.",
  },
  {
    slug: "best-cinemas-in-taipei",
    oldTitle: "The Best Cinemas in Taipei (with Links to Showtimes)",
    newTitle: "Best Cinemas in Taipei: English Films, IMAX & Showtimes",
    oldExcerpt:
      "Whether your preference is for blockbusters or art house, these are the best multiplex and independent cinemas in Taipei. ",
    newExcerpt:
      "The best cinemas in Taipei for English-language films, from IMAX multiplexes to art-house screens and private MTV rooms, with links to each one's showtimes.",
  },
  {
    slug: "din-tai-fung",
    oldTitle: "Din Tai Fung Taipei: Queues, Branches & What to Order (2026)",
    oldExcerpt:
      "Din Tai Fung takes no reservations, so timing is everything. Live queue times for all nine Taipei branches, what to order, and how to skip the queue.",
    newExcerpt:
      "Din Tai Fung takes no reservations, so timing is everything. Queue times for all nine Taipei branches, including Taipei 101, and which dishes to order.",
  },
  {
    slug: "taipei-youbike",
    oldTitle: "Full Guide for Hiring and Riding a YouBike",
    newTitle: "YouBike Taipei 2026: How to Rent, Prices & Cycle Paths",
    oldExcerpt:
      "The Taipei Bike Sharing System, or YouBike, is a public bicycle sharing service in Taipei",
    newExcerpt:
      "How to rent a YouBike in Taipei without a local number: single rental in the app, the free first 30 minutes, NT$20 e-bike rides, the insurance rule and maps.",
  },
  {
    slug: "yong-he-soy-milk-king",
    oldTitle: "Yong He Soy Milk King: 24-Hour Breakfast & What to Order",
    newTitle: "Yong He Soy Milk King: What to Order & Opening Hours",
    oldExcerpt:
      "A Taiwanese breakfast institution open around the clock, apart from a Sunday clean, known for what might be the best fried dough sticks in Taipei. What to order.",
    newExcerpt:
      "A classic Taipei breakfast spot near Daan MRT, known for its fried dough sticks and soy milk. What to order, the current opening hours and how to get there.",
  },
  {
    slug: "taipei-101",
    oldTitle: "Taipei 101 Observatory: Tickets, Prices & Best Time (2026)",
    oldExcerpt:
      "Everything you need to visit the Taipei 101 observatory - current ticket prices, opening hours, the best time of day to go, and whether it beats the free view from Elephant Mountain.",
    newExcerpt:
      "Taipei 101 observatory tickets from NT$600, hours, the ticket desk's new spot (Office Tower 1F), the best time to go and the free Elephant Mountain view.",
  },
  {
    slug: "taiwan-railway",
    oldTitle: "Taiwan Railway (TRA): Trains, Tickets & the East Coast",
    newTitle: "Taiwan Railway (TRA): Puyuma, Tze-Chiang & Tickets",
    oldExcerpt:
      "How to use Taiwan Railway - the network that reaches Hualien, Taroko and the east coast, which the High Speed Rail does not. Train classes, EasyCard rules and booking.",
    // Plan says keep, but the current text is 167 characters; trimmed to fit.
    newExcerpt:
      "How to use Taiwan Railway, which reaches Hualien, Taroko and the east coast where the High Speed Rail does not. Train classes, EasyCard rules and booking.",
  },
  {
    slug: "best-shopping-malls-in-taipei",
    oldTitle: "7 Best Shopping Malls in Taipei with that 'Wow' Factor",
    newTitle: "7 Best Shopping Malls in Taipei Worth Visiting",
    oldExcerpt:
      "Seven Taipei malls worth a visit, including the Xinyi district that packs 13 into one neighbourhood. What each is good for, and where to eat inside.",
  },
  {
    slug: "where-to-go-when-raining",
    oldTitle: "Where to Go When the Rain is Pouring in Taipei",
    oldExcerpt: "Where to Go When the Rain is Pouring in Taipei",
    newExcerpt:
      "What to do in Taipei on a rainy day: museums, cinemas, cultural parks, VR, hot springs in Xinbeitou, massages, metro malls, live music and the restaurant bus.",
  },
  {
    slug: "taipei-technology-district",
    oldTitle: "Taipei Technology District: Syntrend Creative Park & Guanghua Digital Plaza",
    newTitle: "Taipei Tech District: Syntrend & Guanghua Digital Plaza",
    oldExcerpt:
      "Everything on Taipei's Technology District: Syntrend Creative Park floor by floor, Guanghua Digital Plaza's cheaper stalls, opening hours and tips for buying tech to take home.",
    newExcerpt:
      "Taipei Technology District: Syntrend Creative Park floor by floor, Guanghua Digital Plaza's cheaper stalls, opening hours and tips for buying tech to take home.",
  },
  {
    slug: "best-bubble-tea-in-taipei",
    oldTitle: "The Best Bubble Tea in Taipei: The Original Teahouse & the Chains Locals Love",
    newTitle: "Best Bubble Tea in Taipei: The Original & Local Favourites",
    oldExcerpt:
      "Where to drink bubble tea in the city that popularised it - the original teahouse, the brown sugar specialists, and the everyday chains locals actually use. From NT$35 a cup.",
    newExcerpt:
      "Where to drink bubble tea in the city that popularised it: the original teahouse, the brown sugar specialists and the chains locals use. From NT$35 a cup.",
  },
  {
    slug: "michelin-bib-gourmand-taiwanese-small-eats-taipei",
    oldTitle: "Michelin Bib Gourmand Taiwanese Small Eats in Taipei: The Complete Guide",
    newTitle: "Michelin Bib Gourmand Taiwanese Snacks in Taipei",
    oldExcerpt:
      "Explore the top Michelin Bib Gourmand awarded Taiwanese small eats (Xiao Chi) in Taipei City, featuring iconic fried rice, scallion pancakes, pork belly bao, and traditional broths.",
  },
  {
    slug: "taipei-convenience-stores",
    oldTitle: "Convenience Stores in Taipei: 9 Worth a Special Trip",
    oldExcerpt:
      "Taiwan has the world's second-highest convenience store density - what 7-Eleven, Family Mart and the others actually offer beyond snacks, plus nine themed branches worth the detour.",
    newExcerpt:
      "What 7-Eleven, FamilyMart and Taipei's other convenience stores sell beyond snacks, how the kiosk machines work, and nine themed branches worth the detour.",
  },
  {
    slug: "maokong-gondola",
    oldTitle: "Maokong Gondola: Tickets, Times & Crystal Cabins (2026)",
    oldExcerpt:
      "Fares, opening times and the Monday and annual maintenance closures that catch people out - plus how to skip the Crystal Cabin queue, what to do at Zhinan Temple and which way to walk in Maokong.",
    newExcerpt:
      "Maokong Gondola fares, hours and the Monday and maintenance closures, how to skip the Crystal Cabin queue, Zhinan Temple and where to walk in Maokong.",
  },
];

const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const errors = [];

// Pass 1: check everything before touching anything.
for (const u of updates) {
  const matches = posts.filter((p) => p.slug === u.slug);
  if (matches.length !== 1) {
    errors.push(`${u.slug}: expected 1 post, found ${matches.length}`);
    continue;
  }
  const post = matches[0];
  if (post.title !== u.oldTitle) {
    errors.push(`${u.slug}: title is ${JSON.stringify(post.title)}, expected ${JSON.stringify(u.oldTitle)}`);
  }
  if (post.excerpt !== u.oldExcerpt) {
    errors.push(`${u.slug}: excerpt is ${JSON.stringify(post.excerpt)}, expected ${JSON.stringify(u.oldExcerpt)}`);
  }
  if (!u.newTitle && !u.newExcerpt) errors.push(`${u.slug}: nothing to change`);
  if (u.newTitle && u.newTitle.length > 60) {
    errors.push(`${u.slug}: new title is ${u.newTitle.length} characters (max 60)`);
  }
  if (u.newExcerpt && (u.newExcerpt.length < 150 || u.newExcerpt.length > 160)) {
    errors.push(`${u.slug}: new excerpt is ${u.newExcerpt.length} characters (want 150-160)`);
  }
}

if (errors.length) {
  console.error(`Aborted, nothing written to ${filePath}:\n- ${errors.join("\n- ")}`);
  process.exit(1);
}

// Pass 2: apply.
for (const u of updates) {
  const post = posts.find((p) => p.slug === u.slug);
  if (u.newTitle) post.title = u.newTitle;
  if (u.newExcerpt) post.excerpt = u.newExcerpt;
  post.modified = MODIFIED;
  console.log(
    `${u.slug}: ${u.newTitle ? `title (${u.newTitle.length})` : "title kept"}, ${
      u.newExcerpt ? `excerpt (${u.newExcerpt.length})` : "excerpt kept"
    }`,
  );
}

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2) + "\n");
console.log(`Updated ${updates.length} posts in ${filePath}`);
