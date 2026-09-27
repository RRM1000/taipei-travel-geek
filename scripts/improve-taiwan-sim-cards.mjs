// Push /taiwan-sim-cards/ back towards page one.
//
// WHERE IT STANDS. In autumn 2025 the page sat at position 6-7 for the four
// queries that carried it - "taiwan sim card price" (2,410 impressions a
// quarter), "taiwan sim card airport" (2,762), "taiwan sim card for tourist"
// (2,438) and bare "taiwan sim card" (2,811 at 9.4). The December 2025 core
// update took it to 14-17 by July 2026; the August rebuild has it back to
// about 12 in September. It is an affiliate earner, so the last few places
// matter more here than on most pages.
//
// WHAT THE QUERIES SAY. The price and airport queries still rank close
// ("taiwan sim card price" 9.7, "for tourist price" 8.5, "how much is sim
// card in taiwan" 4.2), but the broad and "where to buy" ones do not - "where
// to buy sim card in taiwan" 29, "how to buy" 34, "best sim card in taiwan"
// 26, "taiwan sim card unlimited data" 23. Nothing on the page is headed for
// where to buy, and it never says the airport SIMs come with unlimited data -
// only the eSIM and the router did. The competing page-one results (Holafly,
// trifa, mstravelsolo, taiwanesim.com) all title themselves "for tourists"
// and "where to buy"; this page's title said neither.
//
// WHAT CHANGES.
//   - Title leads with the singular head term and adds "for Tourists" and
//     "Airport", the two modifiers the page ranked for before the update.
//   - The opening line was a claim of experience with no answer in it. It
//     keeps the experience and now answers price, where and what you get.
//   - A short "Where to Buy" section, built only from hours and locations
//     already on the page, linking down to the detailed sections.
//   - Airport SIMs are said to include unlimited data. Chunghwa's published
//     tourist-plan page states every day pass is unlimited.
//   - The Chunghwa prices were re-checked against cht.com.tw's tourist
//     prepaid plans on 14 September 2026 and every price and call credit
//     matched, so the verification note says so - while still saying the
//     Taiwan Mobile and FarEasTone figures come from the 2025 counter boards.
//     That page also lists higher-credit 5-day and 15-day plans the table
//     left out, now noted, and sets the minimum age at 18.
//   - The 2019 speed tests stay - they are first-hand - but are dated, and the
//     "50mb/s average" presented as current is gone. The FarEasTone sentence
//     was ungrammatical.
//   - One FAQ answer contradicted the page ("online is almost always
//     cheaper", when the page says the counter wins past 30 days). Fixed, and
//     a price question added to match the "how much" queries.
//
// Every replacement must match exactly once, or nothing is written.

import fs from "fs";
import path from "path";

const SLUG = "taiwan-sim-cards";
const MAX_TITLE = 60;
const TITLE_FROM = "Taiwan SIM Cards & eSIMs - 2026 Price Comparison";
const TITLE_TO = "Taiwan SIM Card for Tourists: 2026 Airport & eSIM Prices";
const MODIFIED = "2026-09-27 12:00:00";

const WHERE_TO_BUY = `<h2 id="Where-To-Buy">Where to Buy a SIM Card in Taiwan</h2>

<p>There are four places to get connected, and which one suits you depends mostly on when you land and whether you want a Taiwanese number.</p>

<table class="wp-block-table">
<thead><tr><th>Where</th><th>What you get</th><th>Hours</th></tr></thead>
<tbody>
<tr><td><strong>Online, before you fly</strong></td><td>Data-only eSIM, no ID needed</td><td>Any time</td></tr>
<tr><td><strong><a href="#Klook">Klook counter</a></strong>, Taoyuan T1 and T2</td><td>Pre-ordered physical SIM or carrier eSIM, 8% under the counter price</td><td>05:30&ndash;01:00</td></tr>
<tr><td><strong><a href="#Mobile-Operators">Carrier counters</a></strong>, Taoyuan arrivals</td><td>Chunghwa, Taiwan Mobile or FarEasTone SIM with a phone number</td><td>From 07:00, closing 22:00&ndash;24:00 by terminal</td></tr>
<tr><td><strong><a href="#City-Locations-Chunghwa">Chunghwa city stores</a></strong></td><td>The same tourist plans as the airport, at a few stores</td><td>Store hours</td></tr>
</tbody>
</table>

<p><strong>Songshan airport</strong> has a Chunghwa counter (07:00&ndash;23:00) and a Klook pick-up desk, but no Taiwan Mobile or FarEasTone. Whichever counter you use, bring your passport, a second ID and cash in New Taiwan Dollars &ndash; see the <a href="#What-You-Need">requirements</a> below.</p>



`;

const REPLACEMENTS = [
  {
    label: "answer-first intro",
    from: `<p>Having travelled to Taiwan on many occasions, I've used many of the pre-paid SIM cards here and believe I'm well placed to write a guide on them.</p>`,
    to: `<p>I've bought prepaid SIM cards in Taiwan on many trips, from all three carriers. The short version: a <strong>tourist SIM card at Taoyuan Airport costs NT$300</strong> for three or five days of <strong>unlimited 4G data</strong>, rising to NT$1,000 for 30 days, and every carrier charges the same. A <strong>data-only eSIM</strong> bought online before you fly is cheaper for short trips &ndash; from NT$147 for three days &ndash; but has no phone number.</p>`,
  },
  {
    label: "where-to-buy section",
    from: `<h2 id="What-You-Need">SIM Card Requirements</h2>`,
    to: `${WHERE_TO_BUY}<h2 id="What-You-Need">SIM Card Requirements</h2>`,
  },
  {
    label: "age requirement",
    from: `<strong>Age:</strong> usually 20 or over for physical airport SIMs, though some plans are sold from 18 &ndash; check before you book. The Chunghwa carrier eSIM is 18+. Data-only eSIMs have no age check.`,
    to: `<strong>Age:</strong> Chunghwa's published terms set the minimum at 18, for both its tourist SIMs and its carrier eSIM. Some other counters have asked for 20, so check before you book. Data-only eSIMs have no age check.`,
  },
  {
    label: "price verification note",
    from: `<p><strong>Prices verified August 2025</strong> from the counter boards at Taoyuan Airport, and cross-checked against three further boards and Chunghwa's published rates. Klook prices checked August 2026.</p>`,
    to: `<p><strong>Chunghwa prices checked September 2026</strong> against its published tourist rates, which still match the counter boards. Taiwan Mobile and FarEasTone prices are from the Taoyuan counter boards, August 2025. Klook prices checked August 2026.</p>`,
  },
  {
    label: "unlimited data stated",
    from: `<p>So price is not how you choose a carrier at the airport. Coverage and queue length are.</p>`,
    to: `<p>So price is not how you choose a carrier at the airport. Coverage and queue length are.</p>

<p>Every one of these day-pass SIMs comes with <strong>unlimited data</strong> for its whole validity, plus some call credit. What you're choosing between is how many days, and whether you want 4G or 5G.</p>`,
  },
  {
    label: "higher-credit plans",
    from: `<em>7-day 4G: NT$100 with FarEasTone, NT$150 with Chunghwa. The data-only eSIM includes no call credit, since it has no phone number.</em>`,
    to: `<em>7-day 4G: NT$100 with FarEasTone, NT$150 with Chunghwa. Chunghwa also sells higher-credit versions of two plans: 5 days for NT$500 with NT$300 credit, and 15 days for NT$800 with NT$250 credit. The data-only eSIM includes no call credit, since it has no phone number.</em>`,
  },
  {
    label: "which-to-buy heading",
    from: `<h3>Which to buy</h3>`,
    to: `<h3>Which Taiwan SIM card is best for your trip?</h3>`,
  },
  {
    label: "Chunghwa speed claim",
    from: `<p>Their internet <strong>download speeds</strong> average around <strong>50mb/s</strong>.</p>`,
    to: `<p>In my own tests it has been consistently quick, in the city and out of it.</p>`,
  },
  {
    label: "Chunghwa speed test caption",
    from: `<figcaption>Speed Test for Chunghwa</figcaption>`,
    to: `<figcaption>My Chunghwa 4G speed test, 2019</figcaption>`,
  },
  {
    label: "Taiwan Mobile speed test caption",
    from: `<figcaption>Speed Test for Taiwan Mobile</figcaption>`,
    to: `<figcaption>My Taiwan Mobile 4G speed test, 2019</figcaption>`,
  },
  {
    label: "FarEasTone speed test caption",
    from: `<figcaption>Speed Test for FarEasTone</figcaption>`,
    to: `<figcaption>My FarEasTone 4G speed test, 2019</figcaption>`,
  },
  {
    label: "FarEasTone speed sentence",
    from: `<p>Even though the speed test is the fastest I've tested, I found the speed worse the all the other networks, probably due to the slow ping rate (latency).</p>`,
    to: `<p>Its speed test was the fastest of the three, yet in everyday use it felt the slowest &ndash; most likely down to its higher ping (latency), which a download test doesn't capture.</p>`,
  },
  {
    label: "FAQ price question",
    from: `<h2 id="FAQ">Common Questions</h2>`,
    to: `<h2 id="FAQ">Common Questions</h2>

<h3>How much is a SIM card in Taiwan?</h3>

<p>At the airport, a tourist SIM with unlimited data costs <strong>NT$300 for 3 or 5 days</strong>, NT$500 for 10 days and NT$1,000 for 30 days on 4G. 5G runs from NT$500 for 3 days to NT$1,600 for 30. A data-only eSIM starts at NT$147 for 3 days. See the <a href="#Airport-Price-Comparisons">full price comparison</a>.</p>`,
  },
  {
    label: "FAQ airport-or-online answer",
    from: `<p>Online is almost always cheaper, and Klook prices generally undercut the airport counters. The airport's advantage is help with setup and a proper local number.</p>`,
    to: `<p>For stays up to a month, online. Pre-ordering the same Chunghwa SIM through Klook saves 8% on the counter price, and a data-only eSIM is cheaper still for trips under two weeks. Past 30 days the airport counter wins, and for 60 days or more it's the only option.</p>`,
  },
];

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const post = posts.find((p) => p.slug === SLUG);

const fail = (msg) => {
  console.error(`${msg} - aborting, nothing written.`);
  process.exit(1);
};

if (!post) fail(`/${SLUG} not found`);
if (post.title !== TITLE_FROM) fail(`title is "${post.title}", expected "${TITLE_FROM}"`);
if (TITLE_TO.length > MAX_TITLE) fail(`new title is ${TITLE_TO.length} chars, over ${MAX_TITLE}`);

let content = post.content;
for (const r of REPLACEMENTS) {
  const count = content.split(r.from).length - 1;
  if (count !== 1) fail(`"${r.label}" matched ${count} times, expected 1`);
  content = content.replace(r.from, () => r.to);
}

post.title = TITLE_TO;
post.content = content;
post.modified = MODIFIED;
fs.writeFileSync(filePath, JSON.stringify(posts, null, 2) + "\n");

console.log(`/${SLUG}`);
console.log(`  was: ${TITLE_FROM}  (${TITLE_FROM.length})`);
console.log(`  now: ${TITLE_TO}  (${TITLE_TO.length})`);
console.log(`  ${REPLACEMENTS.length} content edits applied, modified ${MODIFIED}`);
