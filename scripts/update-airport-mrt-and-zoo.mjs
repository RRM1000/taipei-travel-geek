// Content updates for /taoyuan-airport-mrt and /taipei-zoo, from actions 4 and 7
// in data/research/existing-posts-improvement-plan.md (and its top-20 table).
//
// /taoyuan-airport-mrt
//   - "Cost" H2 becomes "Tickets: Contactless, EasyCard, Tokens or Klook", with a
//     ticket-type table, the joint and day passes, discounts, and the free rides
//     between T1, T2 and A14a (plus the landside Skytrain closure of 1 Jul 2026).
//   - New H2 "Operating Hours: First and Last Trains" for both ends of the line.
//   - Commuter last-train time, the Extended Express list (now eight a day) and
//     the A3 in-town check-in suspension (27 Oct 2026) corrected.
//   - A five-question FAQ (it is a main guide).
// /taipei-zoo
//   - The Quick Verdict moves above the hero photo; the Klook widget (625213)
//     moves up from below the Monday table to just under the tickets H2.
//   - "Tickets & Opening Hours" becomes "Tickets, Entrance Fee & Opening Hours",
//     with the official child, student and group rates.
//   - New H2 "Taipei Zoo Map (English)", linking the official map page rather
//     than copying it, and the zoo's existing map photo moved into it.
//
// Facts checked live on 27 Oct 2026: tymetro.com.tw (timetables for A1, A12,
// A13; fare planner; ticket-type pages; ITCI notice), taoyuan-airport.com
// (Skytrain, shuttle bus and terminal transit pages), english.zoo.gov.taipei
// and www.zoo.gov.taipei (tickets, ticket rules, opening hours, map).
//
// Title and excerpt are not touched. Every find must match exactly once, or
// nothing is written. An edit whose result is already in place is skipped.
//
// Usage: node scripts/update-airport-mrt-and-zoo.mjs
//        POSTS_PATH=/path/to/copy.json node scripts/update-airport-mrt-and-zoo.mjs

import fs from "fs";
import path from "path";

const MODIFIED = "2026-10-28 12:00:00";
const ext = `target="_blank" rel="noreferrer noopener"`;

// ---------------------------------------------------------------- airport MRT

const AIR_TICKETS = `<h3 id="Ticket-Types">Ticket types and prices</h3>



<p>Whichever way you pay, a ride between Taipei Main and either terminal costs the same NT$160. What changes is the convenience, plus a couple of passes that only make sense if you ride a lot.</p>



<figure class="wp-block-table"><table><thead><tr><th>Ticket</th><th>Taipei Main &harr; airport</th><th>Where and how</th></tr></thead><tbody><tr><td><strong>Contactless bank card or phone</strong></td><td>NT$160</td><td>Nothing to buy: tap in and out with the same card or phone</td></tr><tr><td><strong>EasyCard, iPASS or icash 2.0</strong></td><td>NT$160</td><td>The card itself is NT$100 extra, from the service counters or the station machines</td></tr><tr><td><strong>Single-journey token</strong></td><td>NT$160</td><td>Token machines or the information counter. Valid only on the day you buy it; the exit gate keeps it</td></tr><tr><td><strong>One Day Pass</strong></td><td>NT$320</td><td>Information counter. Unlimited rides on any train until the end of service that day</td></tr><tr><td><strong>Round trip + Taipei Metro 48-hour pass</strong></td><td>NT$520</td><td>Sold at A1 Taipei Main, A12 Terminal 1 and A13 Terminal 2</td></tr><tr><td><strong>Round trip + Taipei Metro 72-hour pass</strong></td><td>NT$600</td><td>The same three stations</td></tr><tr><td><strong>Klook QR ticket</strong></td><td>Varies</td><td>Bought online before you fly; single or 60-day return</td></tr></tbody></table></figure>



<p>The One Day Pass is exactly two full fares, so it only pays off on a day when you make three or more trips along the line.</p>



<p>The joint tickets are the better buy for most visitors. Two Airport MRT rides are worth NT$320 on their own, which leaves you paying NT$200 or NT$280 for two or three days of unlimited travel on the city <a href="/mrt">Taipei MRT</a>. Each of the two airport rides can be between any pair of Airport MRT stations, and the Taipei Metro clock only starts the first time you enter one of its stations.</p>



`;

const AIR_DISCOUNTS = `<h3 id="Discounts">Discounts: who pays less</h3>



<ul><li><strong>Under-6s ride free</strong> with a fare-paying adult. Staff may ask for ID for a child taller than 115cm.</li><li><strong>Groups:</strong> the official fare planner prices a group ticket for ten people at NT$1,280 between Taipei Main and the airport, so NT$128 each. Ask at the information counter.</li><li><strong>Multi-ride ticket:</strong> a paper ticket giving 12 rides for the price of 10 (NT$1,600 between Taipei Main and the airport), to be used within 90 days. It's aimed at regular commuters rather than holidaymakers.</li><li><strong>Senior and child concessions</strong> do exist, but they need Taiwanese documents, such as a residence certificate for the over-65 half fare. Most visitors pay the full fare.</li></ul>



<h3 id="Free-Terminal-Transfer">Free rides between Terminal 1, Terminal 2 and the Airport Hotel</h3>



<p>Journeys between <strong>A12 Terminal 1, A13 Terminal 2 and A14a Airport Hotel</strong> cost nothing if you use an electronic ticket: an EasyCard or other transport card, a contactless bank card, or your phone. You still tap through the gates, but no fare is taken. The offer doesn't cover tokens or the multi-ride ticket, which pay the normal NT$25.</p>



<p>This has become more useful since <strong>1 July 2026</strong>, when the landside <strong>Skytrain between T1 and T2 stopped running</strong> to make room for the Terminal 3 works. The airside Skytrain, used by passengers connecting between flights, carries on as normal. Landside, the Airport MRT hop between the terminals takes about two minutes. The other free option is the inter-terminal shuttle bus, which stops by meeting points 4&ndash;5 on Terminal South Road at T1, and at stop 10 on the south-east side of the T2 arrivals hall.</p>



`;

const AIR_HOURS = `<h2 id="Operating-Hours">Operating Hours: First and Last Trains</h2>



<p>The express tables above cover most of the day. At either end of it, though, the slower commuter trains matter more: they start a few minutes after the first express, and they keep going for around 40 minutes after the last one.</p>



<figure class="wp-block-table"><table><thead><tr><th>From</th><th>First express</th><th>First commuter</th><th>Last express</th><th>Last train</th></tr></thead><tbody><tr><td><strong>Terminal 1 (A12) to Taipei</strong></td><td>05:58</td><td>06:07</td><td>22:58</td><td>23:37</td></tr><tr><td><strong>Terminal 2 (A13) to Taipei</strong></td><td>05:55</td><td>06:04</td><td>22:55</td><td>23:35</td></tr><tr><td><strong>Taipei Main (A1) to the airport</strong></td><td>05:30</td><td>06:08</td><td>23:00</td><td>23:38</td></tr></tbody></table></figure>



<p>After the 23:08 from Taipei Main, the remaining two trains are airport-bound commuters. They call at every station, stop at Terminal 1 and finish at Terminal 2, so the 23:38 gets there at around half past midnight.</p>



<p>Between the two terminals, trains carry on a little later still. The last one from Terminal 2 to Terminal 1 leaves at 00:22, and the last from Terminal 1 to Terminal 2 at 00:28. If you're sleeping at the Airport Hotel (A14a) or further down the line, the last train from Terminal 2 in that direction is at 00:00.</p>



<p><strong>Arriving late:</strong> passport control and the baggage belt take time, so a flight landing well after 22:30 leaves little margin for the last commuter into Taipei. After that, your choices are the 24-hour 1819 bus, a taxi, or a bed at one of the <a href="/hotels-near-taoyuan-airport">hotels near Taoyuan Airport</a>.</p>



<p><strong>Flying early:</strong> the first express pulls out of Taipei Main at 05:30, arriving at Terminal 1 around 06:05. Taoyuan Metro reminds passengers to be at their airline's counter two to three hours before departure, so for a flight before about 08:00, the first train is already tight.</p>



`;

const AIR_FAQ = `<h2 id="FAQ">Common Questions</h2>



<h3>How much is a Taoyuan Airport MRT ticket to Taipei Main Station?</h3>



<p>NT$160 one way from either terminal, whether you tap a bank card, use an EasyCard or buy a token. The station sells no discounted return, but the NT$520 joint ticket bundles two Airport MRT rides with a 48-hour pass for the Taipei MRT.</p>



<h3>How long does it take from Taoyuan Airport to Taipei Main Station?</h3>



<p>35 minutes by express from Terminal 1, or 39 from Terminal 2. The commuter train, which stops at every station, takes about 50 minutes.</p>



<h3>Can I pay with a credit card or Apple Pay?</h3>



<p>Yes. The gates accept contactless Visa, Mastercard, JCB and UnionPay cards, plus Apple Pay, Google Pay and Samsung Pay. Tap the same card or phone on the way in and on the way out.</p>



<h3>What time is the last train from the airport to Taipei?</h3>



<p>The last express leaves Terminal 2 at 22:55 and Terminal 1 at 22:58. The final commuter trains to Taipei Main leave Terminal 2 at 23:35 and Terminal 1 at 23:37.</p>



<h3>Is the Airport MRT free between Terminal 1 and Terminal 2?</h3>



<p>Yes, as long as you use an EasyCard, a contactless bank card or a phone rather than a token. The same goes for the Airport Hotel station, A14a. With the landside Skytrain closed since 1 July 2026, the MRT is the quickest way between the terminals.</p>



`;

const AIR = [
  [
    `<h2 id="Express-cost">Cost</h2>`,
    `<h2 id="Express-cost">Tickets: Contactless, EasyCard, Tokens or Klook</h2>`,
  ],
  [
    `<strong>contactless credit or debit card</strong> - Visa, Mastercard or JCB - or your phone`,
    `<strong>contactless credit or debit card</strong> - Visa, Mastercard, JCB or UnionPay - or your phone`,
  ],
  [
    `An <a href="/taiwan-easycard">EasyCard</a> works on the Airport MRT too, at the same price as a token.</p>\n\n\n\n`,
    `An <a href="/taiwan-easycard">EasyCard</a> works on the Airport MRT too, at the same price as a token.</p>\n\n\n\n${AIR_TICKETS}`,
  ],
  [
    `<a href="//www.klook.com/">Klook.com</a></ins>\n\n\n\n\n<h2 id="Taoyuan-Taipei">`,
    `<a href="//www.klook.com/">Klook.com</a></ins>\n\n\n\n${AIR_DISCOUNTS}\n<h2 id="Taoyuan-Taipei">`,
  ],
  [
    `roughly every 15 minutes until about 23:35.`,
    `roughly every 15 minutes, with the last leaving Terminal 2 at 23:35 and Terminal 1 at 23:37.`,
  ],
  [
    `handy if you're connecting to the high speed rail rather than going into Taipei, though only three morning trains from Taipei (06:15, 07:00 and 08:00) run this way.`,
    `handy if you're connecting to the <a href="/taiwan-high-speed-rail-hsr-discounts-klook">high speed rail</a> rather than going into Taipei. Eight a day run this way from Taipei: 06:15, 07:00 and 08:00 in the morning, then 16:00, 17:00, 18:00, 18:45 and 19:00.`,
  ],
  [
    `And STARLUX and Cathay Pacific are the other way round.</p>`,
    `And STARLUX and Cathay Pacific are the other way round.</p>



<p><strong>Update, 27 October 2026:</strong> Taoyuan Metro has suspended in-town check-in at A3 because of a system fault on the airport company's side, and asks passengers with bags to check in at the airport instead. Look at the notice on the <a href="https://www.tymetro.com.tw/tymetro-new/en/_pages/checkin/index.php" ${ext}>Taoyuan Metro site</a> before you count on A3.</p>`,
  ],
  [
    `</blockquote>\n\n\n\n\n\n<h2 id="Other">`,
    `</blockquote>\n\n\n\n${AIR_HOURS}<h2 id="Other">`,
  ],
  [
    `<div style="height:72px" aria-hidden="true" class="wp-block-spacer"></div>`,
    `${AIR_FAQ}<div style="height:72px" aria-hidden="true" class="wp-block-spacer"></div>`,
  ],
];

// ----------------------------------------------------------------------- zoo

const ZOO_WIDGET = `<ins class="klk-aff-widget" data-adid="625213" data-lang="" data-currency="" data-cardh="126" data-padding="92" data-lgh="470" data-edgevalue="655" data-prod="static_widget" data-amount="2"><a href="//www.klook.com/">Klook.com</a></ins>`;
const ZOO_HERO = `<figure class="wp-block-image"><img width="1024" height="717" src="/media/2020/01/Taipei-Zoo-6-1024x717.jpg" alt="The main entrance to Taipei Zoo"/></figure>`;
const ZOO_QV_END = `<strong>Allow 4&ndash;5 hours</strong> for the main zones, or a full day with the gondola.</li></ul></div>`;
const ZOO_MAP_IMG = `<figure class="wp-block-image is-resized"><a href="/media/2020/01/Taipei-Zoo-Map.jpg"><img src="/media/2020/01/Taipei-Zoo-Map-724x1024.jpg" alt="Map of Taipei Zoo" width="842" height="1191"/></a><figcaption>Click to enlarge the zoo map</figcaption></figure>`;
const ZOO_MAP_URL = "https://english.zoo.gov.taipei/News_Content.aspx?n=9129E819DD99D6B4&amp;sms=F6417076988132FF&amp;s=63180DDF6A3C4C61";

const ZOO_MAP = `<h2 id="Map">Taipei Zoo Map (English)</h2>

<p>The zoo publishes its own <a href="${ZOO_MAP_URL}" ${ext}>official English map</a>, last updated in July 2026. Open it on your phone or save a copy before you set off: the grounds are large, and the map is the easiest way to see how far apart the houses are. For something more interactive, the zoo also runs a web guide called <a href="https://zooguide.gov.taipei/home/" ${ext}>Intelligent Zoo Guided Navigation</a>.</p>

<p>The official map counts <strong>8 outdoor areas and 7 indoor houses</strong>. From the main gate by MRT exit 1, they climb the hillside in roughly this order:</p>

<figure class="wp-block-table is-style-stripes"><table><thead><tr><th>Part of the zoo</th><th>Outdoor areas</th><th>Indoor houses</th></tr></thead><tbody><tr><td><strong>By the main gate</strong> (lowest)</td><td>Formosan Animal Area, Children's Zoo</td><td>Giant Panda House, Koala House, Insectarium, Education Center (the dinosaur museum)</td></tr><tr><td><strong>The middle</strong></td><td>Tropical Rainforest Area, Desert Animal Area, Australian Animal Area</td><td>Pangolin Dome (the indoor rainforest)</td></tr><tr><td><strong>The far end</strong> (highest)</td><td>African Animal Area, Temperate Zone Animal Area, Bird World</td><td>Penguin House, Amphibian &amp; Reptile House</td></tr></tbody></table></figure>

<p>Two landmarks make the map easier to read. The shuttle train has just three stops &ndash; Koala House, Maokong Gondola South Station and Bird World &ndash; and the gondola station sits high on the hill above the African and Temperate areas. Start your visit from the gondola and you're reading the map from top to bottom, which is the downhill route described below.</p>

${ZOO_MAP_IMG.replace("Click to enlarge the zoo map", "Click to enlarge. For the current layout, use the official English map linked above")}

<div style="height:40px" aria-hidden="true" class="wp-block-spacer"></div>

`;

const ZOO = [
  // Quick Verdict above the hero photo.
  [`</p>\n\n${ZOO_HERO}\n\n<div class="quick-verdict">`, `</p>\n\n<div class="quick-verdict">`],
  [ZOO_QV_END, `${ZOO_QV_END}\n\n${ZOO_HERO}`],
  // Tickets H2, entrance fee sentence and the widget moved up under it.
  [
    `<h2 id="Prices">Tickets &amp; Opening Hours</h2>\n\n`,
    `<h2 id="Prices">Tickets, Entrance Fee &amp; Opening Hours</h2>

<p>The Taipei Zoo entrance fee is <strong>NT$100 for adults</strong>, NT$50 for children aged 6&ndash;11 and for students with a valid student card or ISIC, and free for under-6s of any nationality. The zoo's own online ticket sales are suspended for now, so you either pay at the gate or book ahead on Klook:</p>

${ZOO_WIDGET}

`,
  ],
  [`combined trip entirely.</p>\n\n${ZOO_WIDGET}\n\n`, `combined trip entirely.</p>\n\n`],
  [
    `<tr><td><strong>Taipei City residents</strong> (with ID)</td><td>NT$60</td></tr><tr><td><strong>Students</strong> (with valid or ISIC card)</td><td>NT$50</td></tr><tr><td><strong>Preschool children</strong></td><td>Free</td></tr>`,
    `<tr><td><strong>Taipei City residents</strong> (with ID)</td><td>NT$60</td></tr><tr><td><strong>Groups of 30 or more</strong></td><td>NT$70 each</td></tr><tr><td><strong>Children aged 6&ndash;11, and students</strong> (student card or ISIC)</td><td>NT$50</td></tr><tr><td><strong>Children under 6</strong></td><td>Free</td></tr>`,
  ],
  // Map section before Planning Your Route, taking the existing map photo with it.
  [`${ZOO_MAP_IMG}\n\n`, ``],
  [`<h2 id="Planning">Planning Your Route</h2>`, `${ZOO_MAP}<h2 id="Planning">Planning Your Route</h2>`],
  // FAQ.
  [
    `<h3>How much is Taipei Zoo?</h3>\n\n<p>NT$100 for adults, NT$50 concession, free for preschool children.`,
    `<h3>How much is the Taipei Zoo entrance fee?</h3>\n\n<p>NT$100 for adults, NT$50 for children aged 6&ndash;11 and students, and free for under-6s.`,
  ],
  [
    `<h3>How long do you need?</h3>`,
    `<h3>Is there a Taipei Zoo map in English?</h3>

<p>Yes. The zoo's <a href="${ZOO_MAP_URL}" ${ext}>official English map</a> is on its website, and the <a href="#Map">map section</a> above sets out which areas and houses sit where.</p>

<h3>How long do you need?</h3>`,
  ],
];

// --------------------------------------------------------------------- apply

const filePath = path.resolve(process.env.POSTS_PATH || "content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const fail = (m) => { console.error(`${m} - aborting, nothing written.`); process.exit(1); };
const count = (s, sub) => s.split(sub).length - 1;
let changes = 0;

// A page that already has its new H2 has been done: skip it whole, since some
// replacements contain their own find text and can't be detected one by one.
const PAGES = [
  ["taoyuan-airport-mrt", AIR, `<h2 id="Operating-Hours">`],
  ["taipei-zoo", ZOO, `<h2 id="Map">`],
];

for (const [slug, edits, marker] of PAGES) {
  const matches = posts.filter((p) => p.slug === slug);
  if (matches.length !== 1) fail(`/${slug} found ${matches.length} times`);
  const post = matches[0];
  if (post.content.includes(marker)) {
    console.log(`/${slug}: already updated, skipped`);
    continue;
  }
  const before = { title: post.title, excerpt: post.excerpt };
  let n = 0;
  for (const [from, to] of edits) {
    const c = count(post.content, from);
    if (c !== 1) fail(`/${slug}: "${from.slice(0, 70).replace(/\n/g, "\\n")}..." matched ${c} times`);
    post.content = post.content.replace(from, () => to);
    n++;
  }
  if (post.title !== before.title || post.excerpt !== before.excerpt) fail(`/${slug}: title or excerpt changed`);
  if (n) {
    post.modified = MODIFIED;
    changes += n;
  }
  console.log(`/${slug}: ${n} of ${edits.length} edits applied`);
}

// Sanity checks on the result.
const zoo = posts.find((p) => p.slug === "taipei-zoo").content;
if (count(zoo, ZOO_WIDGET) !== 2) fail("/taipei-zoo: expected the 625213 widget exactly twice");
if (zoo.indexOf(ZOO_WIDGET) > zoo.indexOf(`<h3 id="Opening-Hours">`)) fail("/taipei-zoo: widget is not above the opening hours");
if (zoo.indexOf(`<div class="quick-verdict">`) > zoo.indexOf(ZOO_HERO)) fail("/taipei-zoo: Quick Verdict is not above the hero photo");
if (count(zoo, ZOO_MAP_IMG.slice(0, 80)) !== 1) fail("/taipei-zoo: map photo should appear once");
const air = posts.find((p) => p.slug === "taoyuan-airport-mrt").content;
if (count(air, `<h2 id="FAQ">`) !== 1) fail("/taoyuan-airport-mrt: expected one FAQ H2");

if (!changes) {
  console.log("Nothing to do: every edit is already in place.");
  process.exit(0);
}
fs.writeFileSync(filePath, JSON.stringify(posts, null, 2) + "\n");
console.log(`${changes} edits written to ${filePath}`);
