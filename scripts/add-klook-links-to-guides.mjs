// Adds verified Klook activity links to 30 of the busiest travel guides that
// had no affiliate links in the post body (GSC clicks from data/analytics and
// data/research/existing-posts-improvement-plan.md). One to three links per
// post, placed in the paragraph that already discusses the thing, plus a
// "Check availability and book on Klook" button on five posts where one
// activity is central (Yangmingshan, Dihua Street, Fort San Domingo, Ningxia,
// Astronomical Museum). Every activity page was opened on 27 Oct 2026 and
// confirmed live; ratings in the text are as shown then. See
// data/research/klook-links-for-guides.md.
//
// Guarded: each `from` must match exactly once in that post, or nothing is
// written. Honours POSTS_PATH.

import fs from "fs";
import path from "path";

const MODIFIED = "2026-10-28 12:00:00";
const AID = "aid=8733";
const url = (a) => `https://www.klook.com/en-GB/activity/${a}/?${AID}`;
const K = (a, text) => `<a href="${url(a)}" target="_blank" rel="sponsored noopener noreferrer">${text}</a>`;
const CTA = (a) => `\n\n<p><a href="${url(a)}" target="_blank" rel="sponsored noopener noreferrer"><strong>Check availability and book on Klook</strong></a></p>`;

const T101 = "1659-taipei-101-taipei";
const NORTH = "76306-yehliu-jiufen-shifen-golden-waterfall-day-tour";
const NORTH_PICKUP = "90073-yeliou-jiufen-sifen-carpool-tour";
const AIRPORT_MRT = "11346-taoyuan-airport-mrt-ticket-taipei";
const ESIM = "132311-esim-taiwan-with-high-speed-and-stable-internet-connection";
const EASYCARD = "5777-public-transport-easycard-taipei";
const YMS = "83266-beitou-yangmingshan-day-tour-taipei";
const YMS2 = "150857-yangminsan-beitou-day-tour";
const CITY = "78950-taipei-city-day-tour-experience";
const DADAOCHENG = "77221-walking-tour-taipei-dadaocheng-in-depth-cultural-tour";
const LUNGSHAN = "83882-longshan-temple-walking-tour";
const LONGSHAN_WALK = "113726-taipei-s-origin-longshan-temple-taiwan-cultural-free-walking-tour";
const FOOD = "6362-night-market-tour-taipei";
const BIB = "99416-taipei-michelin-food";
const NINGXIA = "84323-street-food-walking-tour-taipei";
const SHILIN = "22392-shilin-night-market-walking-tour-taipei";
const TAMSUI = "27150-tamsui-historical-museum-ticket-taipei";
const SPRING_CITY = "7950-spring-city-resort-beitou-hot-spring-spa-taipei";
const MAOKONG = "16000-maokong-gondola-combo-ticket-taipei";
const ASTRO = "46487-taipei-astronomical-museum-ticket";
const LANTERN = "90102-sky-lantern-experience-new-taipei";
const PINGXI_PASS = "121840-taiwan-railway-taiwan-railway-pingxi-day-pass-pingxi-sky-lantern-experience";
const HOUTONG = "85628-houtong-jiufen-day-tour";
const CYCLE = "84478-cycling-tour-taipei";

// [from, to]: `to` always contains `from` unchanged plus the new text.
const after = (from, add) => [from, from + add];

const EDITS = {
  "taiwan-tourist-tax-refund": [
    after("You will need to use this desk if you want to take advantage of the In-Town Check-In (it will save a lot of hassle at the airport!).</p>",
      `\n\n<p>If you haven't arrived yet, the return leg can be sorted in advance: Klook's ${K(AIRPORT_MRT, "Airport MRT ticket")} comes as a single or a return, and you collect it at Taoyuan when you land.</p>`),
  ],
  "taipei-annual-events": [
    ["Around the Lantern Festival on Saturday, February 20, 2027 (release dates TBC)</strong>",
     `Around the Lantern Festival on Saturday, February 20, 2027 (release dates TBC)</strong>. If your dates miss it, Klook's ${K(LANTERN, "Shifen sky lantern experience")} (rated 4.9 from about 2,400 reviews) lets you release your own lantern at Shifen year-round`],
    ["<strong>Usually mid-February to mid-March (2027 dates TBC)</strong>",
     `<strong>Usually mid-February to mid-March (2027 dates TBC)</strong>. Without a car, the ${K(YMS, "Beitou and Yangmingshan day tour")} on Klook handles the mountain roads for you`],
  ],
  "xinyi-shopping-district": [
    ["If possible, try to time your visit an hour before sunset.</p>",
     `If possible, try to time your visit an hour before sunset. Tickets can be bought ahead on Klook, where the ${K(T101, "Taipei 101 Observatory ticket")} is rated 4.7 from almost 42,000 reviews.</p>`],
  ],
  "taipei-money-guide": [
    ["enough for your first few days of transport.</li>",
     `enough for your first few days of transport. To skip the airport queue, ${K(EASYCARD, "pre-order one on Klook")} and collect it when you land.</li>`],
    ["The <a href=\"/taiwan-sim-cards\">SIM card guide</a> compares every option.</p>",
     `The <a href="/taiwan-sim-cards">SIM card guide</a> compares every option. Klook's ${K(ESIM, "Taiwan Mobile 5G eSIM")} is sent to you as soon as you book, so you can install it before you leave home.</p>`],
  ],
  "sun-yat-sen-memorial-hall": [
    after("get too close and it disappears behind everything else.</p>",
      `\n\n<p>For the reverse view, from the top of the tower looking back over the city, the ${K(T101, "Taipei 101 Observatory ticket")} can be booked ahead on Klook.</p>`),
  ],
  "chiang-kai-shek-memorial-hall": [
    after("exit 4 for the Gate of Integrity)</p>",
      `\n\n<p>Prefer to see it with a guide? This ${K(CITY, "Taipei city day tour")} on Klook stops here as well as at the National Palace Museum, Longshan Temple and Taipei 101, and is rated 4.7 from 175 reviews.</p>`),
  ],
  "taiwan-visa-entry-requirements": [
    ["see the Airport MRT guide linked below for the quickest way into central Taipei.</p>",
     `see the Airport MRT guide linked below for the quickest way into central Taipei. You can buy the ${K(AIRPORT_MRT, "Airport MRT ticket on Klook")} before you fly and pick it up at the airport, and a ${K(ESIM, "Taiwan Mobile eSIM")} bought at home means you have data before you reach the train.</p>`],
  ],
  "best-time-to-visit-taipei": [
    ["mass sky lantern releases in the Pingxi valley.</li>",
     `mass sky lantern releases in the Pingxi valley. To launch one yourself, Klook has a ${K(PINGXI_PASS, "Pingxi day pass and sky lantern bundle")} covering the train and the lantern.</li>`],
    ["Qingtiangang Meadow on Yangmingshan into golden waves.</li>",
     `Qingtiangang Meadow on Yangmingshan into golden waves. The ${K(YMS2, "Yangmingshan and Beitou day trip")} on Klook stops at Qingtiangang and Xiaoyoukeng, and is rated 4.9 from 212 reviews.</li>`],
  ],
  "songshan-xinyi-walking-tour": [
    ["so head there, or book online beforehand</li>",
     `so head there, or ${K(T101, "book online beforehand")}</li>`],
  ],
  "dihua-street-dadaocheng-guide": [
    after("timed to reach the wharf for sunset.</p>",
      `\n\n<p>For a guided version, the ${K(DADAOCHENG, "Dadaocheng historical walking tour")} on Klook spends two hours among the district's old shops and long-established stores and ends at Dadaocheng Wharf. It is rated 4.6 from 74 reviews.</p>` + CTA(DADAOCHENG)),
  ],
  "yangmingshan-national-park": [
    after("see the <a href=\"/driving-in-taiwan\">driving in Taiwan guide</a>.</p>",
      `\n\n<p>If you would rather not juggle buses, the ${K(YMS, "Beitou Hot Spring and Yangmingshan Nature Day Tour")} on Klook is a guided small-group day out from Taipei Main Station. It's a Klook's Choice pick, rated 4.8 from 2,300 reviews, and its main route covers Xiaoyoukeng, Lengshuikeng and Qingtiangang before heading down to Beitou's Thermal Valley.</p>` + CTA(YMS)),
  ],
  "longshan-temple": [
    after("arrives here from Ximending by way of Bopiliao.</p>",
      `\n\n<p>For a guided visit, Klook's English-language ${K(LONGSHAN_WALK, "Longshan Temple culture and history walking tour")} explains the deities and how worship works, then takes in Bopiliao and the herbal medicine lane of Qingcao Alley. It's rated 4.8 from 55 reviews.</p>`),
  ],
  "tamsui": [
    ["so read my full guide before you go.</p>",
     `so read my full guide before you go. The same ticket is sold ahead on Klook as the ${K(TAMSUI, "Tamsui Historical Museum ticket")}, rated 4.9 from 286 reviews.</p>`],
  ],
  "fort-san-domingo": [
    after("It's included in the ticket you have already bought, so there's no reason not to walk up.</p>",
      `\n\n<p>You can pay on the day or buy in advance on Klook, where the ${K(TAMSUI, "Tamsui Historical Museum ticket")} covers the same three sites and has a 4.9 rating from 286 reviews.</p>` + CTA(TAMSUI)),
  ],
  "taipei-guide": [
    ["Go up to the observation deck, or visit the mall at the base.</li>",
     `Go up to the observation deck (${K(T101, "tickets can be booked ahead on Klook")}), or visit the mall at the base.</li>`],
    ["to one of the many beautiful scenic areas and townships around Taipei</li>",
     `to one of the many beautiful scenic areas and townships around Taipei. The most popular organised option is the ${K(NORTH, "Yehliu, Jiufen and Shifen coach tour")}, rated 4.9 from over 50,000 reviews</li>`],
    ["There are deals in the city but they're generally not as good and harder to find.</p>",
     `There are deals in the city but they're generally not as good and harder to find. One option is the ${K(ESIM, "Taiwan Mobile 5G eSIM")} sold on Klook, rated 4.8 by more than 9,000 buyers.</p>`],
  ],
  "taipei-itinerary-3-5-days": [
    ["book tickets online in advance to skip the line entirely",
     `${K(T101, "book tickets online in advance")} to skip the line entirely`],
    ["or as a guided tour that picks you up and drops you back in the city.</p>",
     `or as a ${K(NORTH_PICKUP, "guided tour that picks you up")} and drops you back in the city.</p>`],
    ["with views back over Taipei.</p>",
     `with views back over Taipei. Klook's ${K(MAOKONG, "Maokong Gondola ticket package")} lets you sort the ride before you go.</p>`],
  ],
  "taipei-food-guide": [
    ["Go hungry, start with the longest queue, and share everything.</p>",
     `Go hungry, start with the longest queue, and share everything. Or let a local guide do the ordering: Klook's ${K(FOOD, "Taipei food tour")} covers eight classic Taiwanese dishes around Wanhua in two hours, and is rated 4.6 from 156 reviews.</p>`],
  ],
  "michelin-bib-gourmand-taiwanese-small-eats-taipei": [
    after("giving you essential details on signature dishes, pricing, locations, and insider tips for visiting.</p>",
      `\n\n<p>If you'd rather have someone else plan the route, Klook sells a ${K(BIB, "Michelin Bib Gourmand food tour")} that spends four hours eating its way round the city by bus from Taipei Main Station.</p>`),
  ],
  "ningxia-night-market": [
    after("but the variety on offer more than makes up for it.</p>",
      `\n\n<p>For a guided first visit, the ${K(NINGXIA, "Ningxia Night Market food walking tour")} on Klook takes two hours and includes ten foods. It's rated 4.6 from 76 reviews.</p>` + CTA(NINGXIA)),
  ],
  "wanhua-heritage-walk": [
    after("when the temple is lit up and the market is open.</p>",
      `\n\n<p>If you'd like to eat your way through the district with a guide instead, Klook's two-hour ${K(FOOD, "Taipei food tour that starts at Longshan Temple")} works through eight Taiwanese staples, with a convenience store stop along the way.</p>`),
  ],
  "xinbeitou-hot-springs-walk": [
    ["Spring City NT$800 for its outdoor swimsuit-and-cap pools.",
     `Spring City NT$800 for its outdoor swimsuit-and-cap pools (Spring City's day entry can also be ${K(SPRING_CITY, "booked ahead on Klook")}).`],
  ],
  "best-temples-in-taipei": [
    after("<strong>Free. MRT Longshan Temple, blue line.</strong></p>",
      `\n\n<p>To go round with a guide, Klook's ${K(LUNGSHAN, "Lungshan Temple half-day guided tour")} runs in English and Chinese at 10:00 and 19:00, lasts two hours and includes Bopiliao.</p>`),
  ],
  "taipei-astronomical-museum": [
    after("are located within the vicinity.</p>",
      `\n\n<p>Klook sells tickets for the museum, with the Science Education Center offered on the same ${K(ASTRO, "Astronomical Museum ticket page")}; you scan the QR code at the entrance. It's rated 4.9 from 1,300 reviews.</p>` + CTA(ASTRO)),
  ],
  "national-taiwan-science-education-center": [
    after("are located within the vicinity.</p>",
      `\n\n<p>If you're making a day of it, Klook lists ${K(ASTRO, "tickets for this centre and the Astronomical Museum")} together on one page.</p>`),
  ],
  "best-buildings-in-taipei": [
    ["is the largest of its kind open to the public.</p>",
     `is the largest of its kind open to the public. Observatory tickets are ${K(T101, "sold on Klook")} if you want to sort them before you go.</p>`],
  ],
  "taipei-essentials-guide": [
    ["you get both versions for one ticket.</p>",
     `you get both versions for one ticket. That ticket can be ${K(T101, "bought in advance on Klook")}.</p>`],
    ["now reachable direct from Ximen on the tourist shuttle bus. <a href=\"/tamsui\">",
     `now reachable direct from Ximen on the tourist shuttle bus, or on Klook's ${K(HOUTONG, "Jiufen and Houtong day tour")}, which rides the Pingxi line to the cat village too. <a href="/tamsui">`],
  ],
  "songshan-airport": [
    ["your only option here is a Chunghwa Telecom SIM &ndash; see the <a href=\"/taiwan-sim-cards\">SIM Card guide</a> for details.</p>",
     `your only option here is a Chunghwa Telecom SIM &ndash; see the <a href="/taiwan-sim-cards">SIM Card guide</a> for details. Alternatively, install an eSIM before you fly; Klook's ${K(ESIM, "Taiwan Mobile 5G eSIM")} arrives straight after booking.</p>`],
  ],
  "taiwan-railway": [
    ["so the pass only earns its keep if you add extra stops such as Houtong or Lingjiao.</p>",
     `so the pass only earns its keep if you add extra stops such as Houtong or Lingjiao. Klook also sells the pass bundled with a sky lantern release as a ${K(PINGXI_PASS, "Pingxi day pass and lantern package")}, rated 4.8 from 28 reviews.</p>`],
  ],
  "shilin-night-market": [
    ["pick a direction, follow the queues, and accept that you'll double back.</p>",
     `pick a direction, follow the queues, and accept that you'll double back. If you'd rather be steered to the right stalls, Klook's two-hour ${K(SHILIN, "Shilin Night Market food walking tour")} is rated 4.5 from 99 reviews.</p>`],
  ],
  "taipei-youbike": [
    after("It does though feel safe riding these in the city.</p>",
      `\n\n<p>To ride with a guide first, Klook's ${K(CYCLE, "Taipei cycling tour")} is a two-and-a-half-hour ride from Chiang Kai-shek Memorial Hall through the back streets, with stops for food. It's rated 5.0, though from only eight reviews so far.</p>`),
  ],
};

const filePath = path.resolve(process.env.POSTS_PATH || "content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const fail = (m) => { console.error(`${m} - aborting, nothing written.`); process.exit(1); };
const klookUrls = (s) => s.match(/https:\/\/www\.klook\.com\/[^"]*/g) || [];

for (const [slug, edits] of Object.entries(EDITS)) {
  const post = posts.find((p) => p.slug === slug);
  if (!post) fail(`/${slug} not found`);
  let added = 0;
  for (const [from, to] of edits) {
    if (klookUrls(to).length <= klookUrls(from).length) fail(`/${slug}: edit adds no Klook link`);
    const n = post.content.split(from).length - 1;
    if (n !== 1) fail(`/${slug}: "${from.slice(0, 60)}..." matched ${n} times`);
    const before = klookUrls(from).length;
    const urls = klookUrls(to);
    for (const u of urls) {
      if (!u.includes(AID)) fail(`/${slug}: Klook URL without ${AID}: ${u}`);
    }
    for (const tag of to.match(/<a href="https:\/\/www\.klook\.com[^>]*>/g) || []) {
      if (!tag.includes('target="_blank"') || !tag.includes('rel="sponsored noopener noreferrer"')) fail(`/${slug}: link missing target/rel: ${tag}`);
    }
    added += urls.length - before;
    post.content = post.content.replace(from, () => to);
  }
  post.modified = MODIFIED;
  console.log(`/${slug}: ${edits.length} edit(s), ${added} Klook link(s) added`);
}
fs.writeFileSync(filePath, JSON.stringify(posts, null, 2) + "\n");
