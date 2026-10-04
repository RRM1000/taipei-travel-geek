// Fills the internal-link gaps to the weakest hotel guides: the NYE view hotels from
// the where-to-stay hub, pools from the area guides, hostels from Ximending and Main
// Station, and the airport hotels from the itinerary.
// Usage: node scripts/link-hotel-guide-gaps.cjs content/posts.json [--write]
const fs = require("fs");
const [file, write] = process.argv.slice(2);
const posts = JSON.parse(fs.readFileSync(file, "utf8"));
const POOLS = '<a href="/taipei-hotels-with-pools">';
const HOSTELS = '<a href="/best-hostels-in-taipei">';
const E = [
  ["best-areas-and-hotels-to-stay",
   `<a href="/hotels-near-taipei-101">hotels near Taipei 101</a> compares fifteen places to stay, from hostels to five-stars, with the nearest exit and November prices for each.</p>`,
   `<a href="/hotels-near-taipei-101">hotels near Taipei 101</a> compares fifteen places to stay, from hostels to five-stars, with the nearest exit and November prices for each. Coming for the New Year's Eve fireworks? Rooms facing the tower are sold as the hotels' own packages, mostly with a two-night minimum, and our guide to <a href="/taipei-101-view-hotels-new-years-eve">Taipei 101 view hotels for New Year's Eve</a> compares this year's prices and cancellation terms.</p>`],
  ["hotels-in-daan",
   `is open all year apart from that month.</li>`,
   `is open all year apart from that month. Our guide to ${POOLS}Taipei hotels with a pool</a> compares it with the other rooftop pools in the city.</li>`],
  ["hotels-in-zhongshan",
   `with a heated rooftop pool and a bathtub in every room.</li>`,
   `with a heated rooftop pool and a bathtub in every room. Our guide to ${POOLS}Taipei hotels with a pool</a> covers it, the Regent's rooftop pool and the cheaper pools nearby.</li>`],
  ["beitou-hot-spring-hotels",
   `The hot springs guide explains the bathing routine.</li>`,
   `The hot springs guide explains the bathing routine, and our guide to ${POOLS}Taipei hotels with a pool</a> compares these pools with the swimming pools at city hotels.</li>`],
  ["aparthotels-serviced-apartments-taipei",
   `a 24-hour service centre. There is no gym.`,
   `a 24-hour service centre. There is no gym. Our guide to ${POOLS}Taipei hotels with a pool</a> has the pool's session times and other places to swim.`],
  ["hotels-near-ximending",
   `the Ximending hostel English-language guides name most often.</li>`,
   `the Ximending hostel English-language guides name most often; our guide to the ${HOSTELS}best hostels in Taipei</a> compares it with dorms across the city.</li>`],
  ["hotels-near-taipei-main-station",
   `and <a href="/dihua-street-dadaocheng-guide">Dihua Street</a>. With big bags,`,
   `and <a href="/dihua-street-dadaocheng-guide">Dihua Street</a>; our guide to the ${HOSTELS}best hostels in Taipei</a> compares them with dorms elsewhere in the city. With big bags,`],
  ["taipei-itinerary-3-5-days",
   `<a href="/taoyuan-airport-mrt">Taoyuan Airport MRT</a> - it's the fastest and cheapest option.</li>`,
   `<a href="/taoyuan-airport-mrt">Taoyuan Airport MRT</a> - it's the fastest and cheapest option. Landing after the last train or flying out before the first? See <a href="/hotels-near-taoyuan-airport">hotels near Taoyuan Airport</a>.</li>`],
];
let ok = true;
for (const [slug, find, rep] of E) {
  const p = posts.find((x) => x.slug === slug);
  const n = p.content.split(find).length - 1;
  const all = posts.reduce((t, x) => t + (x.content || "").split(find).length - 1, 0);
  console.log(`${slug}: ${n} in page, ${all} across posts`);
  if (n !== 1 || all !== 1) { ok = false; continue; }
  p.content = p.content.replace(find, () => rep);
}
if (!ok) { console.error("not every find matched exactly once - nothing written"); process.exit(1); }
if (write) fs.writeFileSync(file, JSON.stringify(posts, null, 2) + "\n");
