// Actions 2 and 3 of data/research/existing-posts-improvement-plan.md.
//
//   /mrt
//     1. The MRT map moves from below the Quick Verdict and the Taipei Main
//        photo to directly under the intro, so it matches "taipei mrt map"
//        image and web searches. Same image file and anchor (#MRT-Map).
//     2. New H2 "What's New on the MRT in 2026": the red line extension to
//        Guangci/Fengtian Temple (30 Aug 2026), bank cards and phones at every
//        gate (1 Jul 2026), QR single-journey tickets in the Taipei Metro Go
//        app (18 Mar 2026). Checked on metro.taipei press releases, 27 Oct 2026.
//     3. The app paragraphs left behind get their own H2.
//     4. Two corrections: blue tokens have not been withdrawn (QR single
//        tickets come from the app), and the NT$8 bus transfer discount
//        needs a stored-value card, not a bank card.
//     5. Links the HSR mention to the THSR guide (plan, action 3).
//
//   /taiwan-high-speed-rail-hsr-discounts-klook
//     1. New H2s "THSR Timetable: First & Last Trains and How Often" and
//        "Journey Times from Taipei", from the official THSR timetable search
//        (en.thsrc.com.tw) for Wed 4 and Sat 7 Nov 2026, checked 27 Oct 2026.
//     2. One FAQ on last trains (the page already has a FAQ).
//     3. The fastest Taipei-Kaohsiung time corrected to about 1 hr 35 min.
//   Title, meta description and Klook links are untouched.
//
// Every find must match exactly once, or nothing is written.
//
// Usage:
//   POSTS_PATH=/path/to/posts.json node scripts/update-mrt-and-hsr.mjs

import fs from "node:fs";
import path from "node:path";

if (!process.env.POSTS_PATH) {
  console.error("Set POSTS_PATH to the posts.json file to update.");
  process.exit(1);
}
const filePath = path.resolve(process.env.POSTS_PATH);
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const MODIFIED = "2026-10-28 12:00:00";

// ---------------------------------------------------------------- /mrt

const MAP_FIGURE_OLD = `<figure class="wp-block-image aligncenter size-large article-diagram"><a href="/media/2023/01/Taipei-MRT-Map-New.png"><img width="764" height="1179" src="/media/2023/01/Taipei-MRT-Map-New-764x1024.png" alt="Taipei MRT map for 2026, showing all six metro lines - Wenhu (brown), Tamsui-Xinyi (red), Songshan-Xindian (green), Zhonghe-Xinlu (orange), Bannan (blue) and Circular (yellow) - plus the Taoyuan Airport MRT, Danhai and Ankeng light rail and the Maokong Gondola."/></a><figcaption>The 2026 Taipei MRT network. Tap the map to open it full size. The red line was extended on 30 August 2026 and now runs one stop past Xiangshan, to Guangci/Fengtian Temple.</figcaption></figure>`;

const MAP_FIGURE_NEW = MAP_FIGURE_OLD.replace(
  "<figcaption>The 2026 Taipei MRT network. Tap the map to open it full size. The red line was extended on 30 August 2026 and now runs one stop past Xiangshan, to Guangci/Fengtian Temple.</figcaption>",
  "<figcaption>The 2026 Taipei MRT map in English, with the red line's new terminus at Guangci/Fengtian Temple (R01), opened on 30 August 2026. Tap the map to open it full size.</figcaption>"
);

const INTRO = `<p>Taipei's underground public transportation system, the Mass Rapid Transit (MRT) is one of the most reliable and clean public underground services in the world.</p>`;

const WHATS_NEW = `<h2 id="MRT-2026">What's New on the MRT in 2026</h2>

<p>Three changes this year matter to visitors: the red line now goes one stop further east, every gate takes bank cards and phones, and single tickets can be bought in an app.</p>

<h3 id="Guangci-Fengtian-Temple">Red line extended to Guangci/Fengtian Temple</h3>

<p>The Xinyi Line East Extension opened at 14:00 on <strong>30 August 2026</strong>. It adds one station, <strong>Guangci/Fengtian Temple (R01)</strong>, beyond Xiangshan, which is now numbered R02. The network now has 118 stations and 132.5km of route.</p>

<ul>
<li>Full-length red line trains run from Tamsui to Guangci/Fengtian Temple. The shorter Beitou&ndash;Daan trains still turn back at Daan, except at peak times, when they carry on to the new terminus.</li>
<li>Peak service on the line is unchanged: a train every 6 minutes, and every 3 minutes on the central section that both patterns share.</li>
<li>Travel on the new section was free for the first month. Since 29 September it has been charged at the normal distance-based fare.</li>
</ul>

<p>For Elephant Mountain and Taipei 101, you still get off at Xiangshan or Taipei 101/World Trade Center. Only the platform signs have changed: follow Guangci/Fengtian Temple, not Xiangshan.</p>

<h3 id="Bank-Cards-2026">Bank cards and phones at every gate</h3>

<p>Since <strong>1 July 2026</strong> every Taipei Metro gate has accepted contactless bank cards (Visa, Mastercard, JCB, UnionPay, Diners Club and Discover, credit or debit), as well as Apple Pay, Google Pay and Samsung Pay. Apple Pay's Express Mode works too, so an iPhone doesn't need unlocking at the gate.</p>

<p>There is a catch. A bank card can't store your ride history, so it <strong>doesn't earn the frequent rider rebate or the bus transfer discount</strong>, and a TPASS can't be loaded onto one. An EasyCard still gets both.</p>

<h3 id="QR-Single-Tickets">QR single-journey tickets in the app</h3>

<p>Since 18 March 2026 you can buy a single-journey ticket as a QR code in Taipei Metro's own <strong>Taipei Metro Go</strong> app and scan your phone at the gate. The blue plastic tokens sold by station machines have not been withdrawn, so both work.</p>

<blockquote class="wp-block-quote"><p><a href="https://www.metro.taipei/News.aspx?n=30CCEFD2A45592BF&amp;sms=72544237BBE4C5F6" target="_blank" rel="noreferrer noopener">Taipei Metro press releases (in Chinese)</a></p><cite>The source for the opening date, the new station and the bank card rules</cite></blockquote>



<h2 id="MRT-App">Taipei Metro App: Journey Times and Fares</h2>`;

const mrtEdits = [
  // 1. Map to the top, directly under the intro.
  {
    find: `${INTRO}\n\n\n\n<div class="quick-verdict">`,
    replace: `${INTRO}\n\n\n\n<h2 id="MRT-Map">Taipei MRT Map (2026)</h2>\n\n\n\n${MAP_FIGURE_NEW}\n\n\n\n<div class="quick-verdict">`,
  },
  // 2 + 3. Old map spot becomes the 2026 section and the app heading.
  {
    find: `<h2 id="MRT-Map">Map of Taipei MRT</h2>\n\n\n\n${MAP_FIGURE_OLD}`,
    replace: WHATS_NEW,
  },
  // 4. Corrections.
  {
    find: `Single-journey tickets from the machines are now issued as QR codes, so hold the code about 4&ndash;5cm from the scanner instead</li>`,
    replace: `Blue single-journey tokens go on the same sensor; a QR ticket from the Taipei Metro Go app is held up to the scanner instead</li>`,
  },
  {
    find: `Tap onto the Metro with the same card shortly afterwards and you get <strong>NT$8 knocked off</strong> the fare`,
    replace: `Tap onto the Metro with the same EasyCard or iPASS shortly afterwards and you get <strong>NT$8 knocked off</strong> the fare (bank cards don't qualify)`,
  },
  // 5. Link the HSR mention.
  {
    find: `connects the MRT to the Airport Express, the Taiwan High Speed Rail (THSR) and the Bus Station.</p>`,
    replace: `connects the MRT to the Airport Express, the <a href="/taiwan-high-speed-rail-hsr-discounts-klook">Taiwan High Speed Rail (THSR)</a> and the Bus Station.</p>`,
  },
];

// ---------------------------------------------------------------- /taiwan-high-speed-rail-hsr-discounts-klook

const THSR_SEARCH = "https://en.thsrc.com.tw/ArticleContent/a3b630bb-1066-4352-a1ef-58c7b4e8ef7c";

const TIMETABLE = `<h2 id="Timetable">THSR Timetable: First &amp; Last Trains and How Often</h2>

<p>The current THSR timetable took effect on <strong>2 February 2026</strong>, with separate timetables for some public holidays. On an ordinary day the first train south leaves Nangang at 06:15 and Taipei at 06:26, and the last trains reach their destinations just before midnight.</p>

<div class="table-responsive"><table><thead><tr><th>Route</th><th>First train</th><th>Last train</th><th>Trains a day (weekday / Saturday)</th></tr></thead><tbody>
<tr><td>Taipei to Taichung</td><td>06:26</td><td>23:00</td><td>72 / 86</td></tr>
<tr><td>Taipei to Tainan</td><td>06:26</td><td>22:16</td><td>54 / 64</td></tr>
<tr><td>Taipei to Zuoying (Kaohsiung)</td><td>06:26</td><td>22:16</td><td>68 / 79</td></tr>
<tr><td>Taichung to Taipei</td><td>06:05</td><td>23:03</td><td>74 / 81</td></tr>
<tr><td>Tainan to Taipei</td><td>06:03</td><td>22:23</td><td>54 / 61</td></tr>
<tr><td>Zuoying (Kaohsiung) to Taipei</td><td>05:50</td><td>22:10</td><td>68 / 75</td></tr>
</tbody></table></div>

<p><em>From the official timetable search for Wednesday 4 and Saturday 7 November 2026, checked on 27 October 2026.</em></p>

<p><strong>How often?</strong> Between 07:00 and 22:00 on a weekday there are three to six trains an hour from Taipei to Taichung and to Zuoying, and two to five to Tainan. The late afternoon is the busiest time. Saturdays add extra trains, mostly between 08:00 and 15:00, and after 22:00 it drops to one or two an hour.</p>

<p>The last southbound train to Zuoying gets in at 23:59, so if you need an onward connection that night, aim for an earlier train.</p>

<h2 id="Journey-Times">Journey Times from Taipei</h2>

<div class="table-responsive"><table><thead><tr><th>Taipei to</th><th>Fastest train</th><th>Slowest train</th></tr></thead><tbody>
<tr><td>Taichung</td><td>47 min</td><td>1 hr 6 min</td></tr>
<tr><td>Tainan</td><td>1 hr 22 min</td><td>2 hr</td></tr>
<tr><td>Zuoying (Kaohsiung)</td><td>1 hr 34 min</td><td>2 hr 14 min</td></tr>
</tbody></table></div>

<p>The gap comes down to how many stations a train calls at. In the official search, click a train number to see its stops before you reserve a seat on it.</p>

<blockquote class="wp-block-quote"><p><a href="${THSR_SEARCH}" target="_blank" rel="noreferrer noopener">Search exact train times on the official THSR timetable</a></p><cite>Choose your stations and date. The timetable PDFs are at the bottom of the same page</cite></blockquote>

<div style="height:35px" aria-hidden="true" class="wp-block-spacer"></div>



`;

const hsrEdits = [
  {
    find: `For a more detailed look at the THSR route, visit the <a href="#Destinations">Destinations</a> section below.</p></blockquote>\n\n\n\n<div style="height:35px" aria-hidden="true" class="wp-block-spacer"></div>\n\n\n\n\n\n<h2 id="Carriages">`,
    replace: `For a more detailed look at the THSR route, visit the <a href="#Destinations">Destinations</a> section below.</p></blockquote>\n\n\n\n<div style="height:35px" aria-hidden="true" class="wp-block-spacer"></div>\n\n\n\n${TIMETABLE}<h2 id="Carriages">`,
  },
  {
    find: `Taipei to Kaohsiung takes roughly 90 minutes on the fastest services.</p>`,
    replace: `Taipei to Kaohsiung (Zuoying) takes about 1 hour 35 minutes on the fastest services.</p>

<h3>What time is the last high speed train from Taipei?</h3>

<p>On an ordinary day the last train to Tainan and Zuoying (Kaohsiung) leaves Taipei at 22:16, and the last to Taichung at 23:00. Going the other way, the last train from Zuoying to Taipei leaves at 22:10. Holiday timetables can differ, so check the <a href="#Timetable">timetable section</a> above.</p>`,
  },
];

// ---------------------------------------------------------------- apply

const jobs = [
  { slug: "mrt", edits: mrtEdits },
  { slug: "taiwan-high-speed-rail-hsr-discounts-klook", edits: hsrEdits },
];

const count = (hay, needle) => hay.split(needle).length - 1;
const problems = [];
const updated = new Map();

for (const { slug, edits } of jobs) {
  const post = posts.find((p) => p.slug === slug);
  if (!post) {
    problems.push(`${slug}: post not found`);
    continue;
  }
  let content = post.content;
  edits.forEach(({ find, replace }, i) => {
    const n = count(content, find);
    if (n !== 1) {
      problems.push(`${slug} edit ${i + 1}: find matched ${n} times`);
      return;
    }
    content = content.replace(find, () => replace);
  });
  updated.set(slug, content);
}

if (problems.length) {
  console.error("Nothing written:\n  " + problems.join("\n  "));
  process.exit(1);
}

for (const [slug, content] of updated) {
  const post = posts.find((p) => p.slug === slug);
  post.content = content;
  post.modified = MODIFIED;
  console.log(`Updated ${slug}`);
}

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2) + "\n");
console.log(`Wrote ${filePath}`);
