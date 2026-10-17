// Titles and meta descriptions for the pages Search Console shows on page one
// (or just off it) with a poor click-through rate, from the pull of 28 Sep 2026
// (data/analytics/latest.json). Most are WordPress-era titles that never say
// "Taipei" or the thing people search for ("menu", "hours", "map"). Also gives
// the six posts with no excerpt a real description, adds a Ximending FAQ for
// "ximending night market", and fixes a station name on Maji Square.
// See TITLE-REWRITES.md for the before/after table.
// Usage: node scripts/rewrite-quick-win-titles.cjs content/posts.json [--write]
const fs = require("fs");
const [file, write] = process.argv.slice(2);
const posts = JSON.parse(fs.readFileSync(file, "utf8"));

// [slug, new title or null to keep, new excerpt or null to keep]
const META = [
  ["mrt",
   "Taipei MRT Map & Guide (2026): Fares, Hours & Lines",
   "Taipei MRT map and guide: fares from NT$20, trains from 06:00 to midnight, paying by EasyCard or contactless card, last-train times and all six lines."],
  ["maps",
   "Taipei Map: Every Sight, Area & Route on One Map",
   "An interactive map of Taipei with every sight, neighbourhood and walking route we cover pinned and linked to its guide. Switch layers on and off to plan your days."],
  ["taipei-laundrettes",
   "Taipei Laundromats & Launderettes: How to Use Them",
   "How Taipei's self-service laundrettes work: NT$10 coins only, washes from NT$40 to NT$120, typical opening hours, 24-hour branches and detergent machines."],
  ["best-cafes-to-work",
   "Best Cafes to Work From in Taipei: WiFi, Plugs & Seats",
   "Taipei cafes where you can actually get work done, with enough seats, plugs and reliable WiFi, from Youmoutoohana near Yongkang Street to the best Louisa branches."],
  ["cheap-breakfast-taipei",
   "Best Cheap Breakfast in Taipei: 6 Places to Start the Day",
   "Where to eat a cheap breakfast in Taipei: Fuhang's Michelin-listed soy milk, Yong He Soy Milk King, grilled toast, scallion pancakes and a proper full English."],
  ["fumu-come-to-mama",
   "FuMu Taipei: Full English Breakfast by Day, Bar by Night",
   "A proper full English breakfast in Taipei, in normal and jumbo sizes, from the 'Mama' side of FuMu before it turns into a bar at night. Near Nanjing Fuxing MRT."],
  ["best-salads-in-taipei",
   "Best Salads in Taipei: 4 Places for a Fresh Salad",
   "Where to get a good salad in Taipei: build-your-own bowls at Hungry Pans, Miacucina's vegetarian menu, Gonna's Mediterranean salads and TGI Fridays Songgao."],
  ["chinitas-cubano",
   "Chinita's Cubano: Taipei's Authentic Cuban Sandwich",
   "The only place in Taipei doing an authentic Cubano: pulled pork and ham on Cuban bread with cheese, pickles and mustard. The three sandwiches, and where to find it."],
  ["taipei-souvlaki",
   "Taipei Souvlaki: Greek Pita Gyros & Souvlaki in Dunhua",
   null],
  ["best-indian-restaurants",
   "Best Indian Restaurants in Taipei: 6 Worth Trying",
   null],
  ["thai-elephant",
   "Thai Elephant, Taipei: Cheap Thai Food Near City Hall",
   null],
  ["yong-he-soy-milk-king",
   "Yong He Soy Milk King: 24-Hour Breakfast & What to Order",
   "A Taiwanese breakfast institution open around the clock, apart from a Sunday clean, known for what might be the best fried dough sticks in Taipei. What to order."],
  ["maji-square",
   "Maji Square, Taipei: Bars, Food Stalls & Live Music",
   "A covered outdoor square in Taipei Expo Park with a dozen bars and restaurants, Taiwanese food stalls and live music at weekends. Near Yuanshan MRT exit 1."],
  ["where-to-have-lunch",
   "Where to Eat Lunch in Taipei: Food Courts to Buffets",
   "Lunch ideas in Taipei, from mall food courts and conveyor-belt sushi to Din Tai Fung without the dinner queue, pub lunches, buffets and set-lunch deals."],
  ["expo-farmers-market",
   "Expo Farmers Market, Taipei: Hours & What to Buy",
   "Taipei's weekend farmers market at Expo Park, open Saturday and Sunday 10:00 to 18:00, with 120 stands of produce from Hualien, Yilan and Miaoli. Yuanshan MRT."],
  ["healthy-restaurants-that-taste-great",
   "Healthy Restaurants in Taipei That Still Taste Great",
   "Healthy places to eat in Taipei that don't skimp on flavour: Sugar Pea Cafe's grain bowls, Gonna's Mediterranean salads, Miacucina and Tamed Fox."],
  ["yong-kang-beef-noodles",
   "Yong Kang Beef Noodles: Menu, Queues & Is It the Best?",
   null],
  ["ay-chung-flour-rice-noodles",
   "Ay Chung Flour Rice Noodles, Ximending: Price & Queue",
   "Ximending's famous one-dish stall: silky flour rice noodles from NT$60, with a surprise in the bowl. How fast the queue moves, and whether it's worth the wait."],
  ["best-supermarkets-and-delis-with-western-produce",
   "Western Supermarkets & Delis in Taipei: Where to Shop",
   "Where to buy Western food in Taipei: City Super, Mia C'bon (formerly Jason's), the IKEA food market, Maji Deli and Addiction Aquatic Development's deli."],
  ["cheap-coffee",
   "Cheap Coffee in Taipei: Louisa, 7-Eleven & More",
   "Where to get good, cheap coffee in Taipei: Louisa and Unicofa lattes from NT$65, two small cafes and why 7-Eleven's coffee is better than you'd expect."],
  ["texas-roadhouse",
   "Texas Roadhouse Taipei: Branches, Steaks & Is It Good?",
   null],
  ["best-places-to-drink-craft-beer-taipei",
   "Best Craft Beer Bars in Taipei: Taprooms & Tap Lists",
   null],
  ["fuhang-soy-milk",
   "Fuhang Soy Milk: Menu, Queue Times & When to Go",
   "Taipei's most famous breakfast, Michelin-listed and serving since 1958. The menu, weekday and weekend queue times, and when to arrive. Closed on Mondays."],
  ["jin-feng-braised-pork-rice",
   "Jin Feng Braised Pork Rice: Menu, Prices & Queue",
   null],
  ["taipei-zoo",
   "Taipei Zoo: Opening Hours, Tickets & Pandas (2026)",
   "Taipei Zoo opens 09:00 to 17:00 with last entry at 16:00, and adults pay NT$100. The Monday and June closures, the giant pandas and which zones to see first."],
  ["xinyi-shopping-district",
   null,
   "All 13 malls in Taipei's Xinyi Shopping District, next to Taipei 101, compared: what each is good for, the food halls and bars, and opening hours."],
  ["taiwan-high-speed-rail-hsr-discounts-klook",
   "Taiwan High Speed Rail (THSR): Tickets, Prices & Deals",
   "How to pay less for Taiwan High Speed Rail: early-bird and buy-one-get-one fares, Klook's foreign-visitor deals, fares from Taipei and journey times."],
  ["cronutt",
   null,
   "Cronutt, the Dunhua cronut shop, has permanently closed. What it sold, and where to go instead if you're craving a cross between a croissant and a doughnut."],
  ["about-taipei-traveller",
   null,
   "Who is behind Taipei Travel Geek: Rob, from the UK, who moved to Taipei in 2017 and writes about the food, sights and events he has found since."],
];

// [slug, find, replace] body edits, same guard as the link scripts.
const BODY = [
  ["ximending",
   `<h3>When's the best time to go?</h3>`,
   `<h3>Is there a night market in Ximending?</h3>

<p>Not a formal one. The street food is spread through the lanes off the pedestrian streets, and the closest thing to a night market strip is the <a href="#Lane-50">Lane 50 food alley</a> near exit 6, with around twenty stalls open from early afternoon until late. For a traditional night market, <a href="/huaxi-street-night-market">Huaxi Street Night Market</a> is close by in Wanhua.</p>

<h3>When's the best time to go?</h3>`],
  ["maji-square",
   `Closest MRT: Juanshan Station`,
   `Closest MRT: Yuanshan Station`],
];

let ok = true;
const bySlug = (slug) => posts.find((x) => x.slug === slug);
for (const [slug, title, excerpt] of META) {
  const p = bySlug(slug);
  if (!p) { console.error(`${slug}: no such post`); ok = false; continue; }
  if (title && title.length > 60) { console.error(`${slug}: title ${title.length} chars`); ok = false; }
  if (excerpt && (excerpt.length < 110 || excerpt.length > 165)) { console.error(`${slug}: excerpt ${excerpt.length} chars`); ok = false; }
  console.log(`${slug}: title ${title ? title.length : "kept"}, excerpt ${excerpt ? excerpt.length : "kept"}`);
  if (title) p.title = title;
  if (excerpt) p.excerpt = excerpt;
}
for (const [slug, find, rep] of BODY) {
  const p = bySlug(slug);
  const n = p.content.split(find).length - 1;
  console.log(`${slug}: ${n} match(es) for body edit`);
  if (n !== 1) { ok = false; continue; }
  p.content = p.content.replace(find, () => rep);
}
if (!ok) { console.error("checks failed - nothing written"); process.exit(1); }
if (write) fs.writeFileSync(file, JSON.stringify(posts, null, 2) + "\n");
