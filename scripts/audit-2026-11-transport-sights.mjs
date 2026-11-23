// November 2026 audit of the practical and attraction pages, checked on
// 23 November 2026:
// - mrt: the FAQ still said an EasyCard "takes 20% off every fare". Taipei
//   Metro's frequent rider page lists a 5% / 10% / 15% rebate for 11-20,
//   21-40 and 41+ rides a month instead (metro.taipei/cp.aspx?n=AB56163F79ECB2C2;
//   the cut from 10-30% to 5-15% is reported at focustaiwan.tw/society/202411300009).
// - taipei-annual-events: Christmasland in New Taipei City runs
//   13 November to 27 December 2026, not to 3 January 2027
//   (christmasland.ntpc.gov.tw, "2026.11.13 - 12.27"). The Lamigo Monkeys
//   are now the Rakuten Monkeys (樂天桃猿), one of six CPBL teams
//   (cpbl.com.tw team list; renamed December 2019).
// - christmas-lights-2019: title, excerpt and Banqiao dates still said 2025;
//   now the 2026 dates from christmasland.ntpc.gov.tw. Tamsui Old Street
//   plaza (淡水老街廣場) is one of the 2026 satellite light zones on the same
//   site. Xinyi and Nanxi dates were generic, so they are relabelled "Usual
//   Dates"; the German market keeps its labelled 2025 dates.
// - best-time-to-visit-taipei: the month links pointed readers at past
//   2026 events; January to October now go to the 2027 anchors that already
//   exist on /taipei-annual-events (#January-2027 etc.).
// - xinbeitou, taipei-hot-springs, taipei-itinerary-3-5-days,
//   xinbeitou-hot-springs-walk: the Beitou Hot Spring Museum closure on
//   9 November 2026 (hotspringmuseum.taipei notice id=605, checked
//   27 October 2026 for scripts/fix-beitou-museum-and-other-errors.mjs) has
//   now happened, so the future tense ("closes on 9 November", "worth a look
//   until 8 November") is changed to say it is shut.

import fs from "fs";
import path from "path";

const MODIFIED = "2026-11-23 12:00:00";
// [from, to, field] - field defaults to "content".
const EDITS = {
  "mrt": [
    ['An <a href="/taiwan-easycard">EasyCard</a> takes 20% off every fare automatically.',
     'An <a href="/taiwan-easycard">EasyCard</a> pays the same fare as a token or bank card; the old flat 20% discount has gone, and regulars instead get a 5-15% rebate once they make 11 or more trips in a month.'],
    ["because it discounts fares and works on buses, YouBike and in convenience stores",
     "because it counts towards the monthly rebate and works on buses, YouBike and in convenience stores"],
  ],
  "taipei-annual-events": [
    ["Watch the Lamigo Monkeys and the rest of the CPBL at grounds across the city",
     "Watch the Rakuten Monkeys (the former Lamigo Monkeys) and the league's five other teams at grounds across the city"],
    ["<strong>Friday, November 13, 2026 – Sunday, January 3, 2027</strong>",
     "<strong>Friday, November 13 – Sunday, December 27, 2026</strong>"],
    ["Full month of holiday light displays, pop concerts, and winter markets – <strong>All December 2026 – January 3, 2027</strong>",
     "Holiday light displays, pop concerts, and winter markets, finishing before New Year this time – <strong>Until Sunday, December 27, 2026</strong>"],
  ],
  "christmas-lights-2019": [
    ["Taipei Christmas Lights & Markets 2025", "Taipei Christmas Lights & Markets 2026", "title"],
    ["Guide to the best places to see the 2025 Christmas Lights in Taipei.",
     "Guide to the best places to see the 2026 Christmas Lights in Taipei.", "excerpt"],
    ['<h3 id="banqiao-dates">2025 Dates</h3>', '<h3 id="banqiao-dates">2026 Dates</h3>'],
    ["<p>11th November until 2nd January</p>",
     "<p>13 November until 27 December 2026 - it wraps up before New Year this time</p>"],
    ['<h3 id="xinyi-dates">2025 Dates</h3>', '<h3 id="xinyi-dates">Usual Dates</h3>'],
    ['<h3 id="nanxi-dates">2025 Dates</h3>', '<h3 id="nanxi-dates">Usual Dates</h3>'],
    ["I'm unsure of the exact dates these will be lit up, but the 2018 lights were from mid November until January.",
     "In 2026 the plaza on Tamsui Old Street is one of Christmasland's satellite light zones, so it's lit up while the main Banqiao show runs."],
  ],
  "best-time-to-visit-taipei": [
    [">See the full 2026 Taipei Annual Events Calendar<",
     ">See the full 2026&ndash;27 Taipei Annual Events Calendar<"],
    ...["January", "February", "March", "April", "May", "June", "July", "August", "September", "October"].map((m) => [
      `<a href="/taipei-annual-events#${m}">See exact 2026 dates for ${m}'s events &rarr;</a>`,
      `<a href="/taipei-annual-events#${m}-2027">See what's on in ${m} 2027 &rarr;</a>`,
    ]),
  ],
  "xinbeitou": [
    ["the museum, however, closes on 9 November 2026 for restoration and should reopen in late 2027.",
     "the museum, however, has been shut for restoration since 9 November 2026 and should reopen in late 2027."],
    ["The museum is <strong>free</strong> and open <strong>10:00–18:00</strong>",
     "The museum is <strong>free</strong> and, when open, runs <strong>10:00–18:00</strong>"],
    ["<strong>Note that it shuts on 9 November 2026 for a restoration expected to run until October 2027.</strong>",
     "<strong>It has been closed since 9 November 2026 for a restoration expected to run until October 2027.</strong>"],
  ],
  "taipei-hot-springs": [
    ["though the building closes on 9 November 2026 for a year-long restoration.",
     "once it reopens. A year-long restoration began on 9 November 2026, so until late 2027 you can only admire the outside."],
  ],
  "taipei-itinerary-3-5-days": [
    ["on the way is worth a look until 8 November 2026; after that it is shut until roughly October 2027, and the Ketagalan Culture Center",
     "on the way has been closed for restoration since 9 November 2026 and should reopen around October 2027; until then the Ketagalan Culture Center"],
  ],
  "xinbeitou-hot-springs-walk": [
    ["The <strong>Beitou Hot Spring Museum shuts for restoration from 9 November 2026</strong> until about late October 2027, so after that date you can only see it from outside.",
     "The <strong>Beitou Hot Spring Museum has been shut for restoration since 9 November 2026</strong>, and until about late October 2027 you can only see it from outside."],
    ["To see the museum inside, go before it closes on 9 November 2026. After that, the walk still works for the park, library and Thermal Valley",
     "With the museum shut until about late October 2027, the walk is still worth doing for the park, library and Thermal Valley"],
    ["It is open Tuesday to Sunday until 8 November 2026. From 9 November 2026 it is closed for restoration, with reopening planned for late October 2027.",
     "No. It closed for restoration on 9 November 2026, and reopening is planned for late October 2027."],
  ],
};

const filePath = path.resolve(process.env.POSTS_PATH || "content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const fail = (m) => { console.error(`${m} - aborting, nothing written.`); process.exit(1); };
for (const [slug, edits] of Object.entries(EDITS)) {
  const post = posts.find((p) => p.slug === slug);
  if (!post) fail(`/${slug} not found`);
  for (const [from, to, field = "content"] of edits) {
    const n = (post[field] || "").split(from).length - 1;
    if (n !== 1) fail(`/${slug} ${field}: "${from.slice(0, 50)}..." matched ${n} times`);
    post[field] = post[field].replace(from, () => to);
  }
  post.modified = MODIFIED;
  console.log(`/${slug}: fixed`);
}
fs.writeFileSync(filePath, JSON.stringify(posts, null, 2) + "\n");
