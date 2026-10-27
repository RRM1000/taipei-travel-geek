// New Year's Eve fireworks guide: action 1 in
// data/research/existing-posts-improvement-plan.md.
//
// - Adds a "What Time Do the Fireworks Start? (Schedule)" section near the top:
//   start time, length, the 2025/26 timetable (concert, MRT, exits, road
//   closures, free stations, shuttles) and when to arrive. The 2026/27 details
//   were not announced when checked on 27 Oct 2026, so the 2025/26 pattern is
//   given as the guide.
// - Works the head terms ("taipei 101 fireworks", times, best spots) into the
//   intro, the Quick Verdict and the free-spots heading.
// - Fixes the Sun Yat-sen Memorial Hall reopening claim (closed into 2027; the
//   plaza and park stay open).
// - Adds one inbound link from each of the 7 pages named in section 4 of the plan.
//
// Title and meta description are left alone (owned elsewhere). No FAQ (the page
// has none) and no Perfect For block.
//
// Sources: data/research/taipei-101-view-hotels-new-years-eve.md (section 6) and
// Business Today 202512300019 (30 Dec 2025), travel.taipei event 66774 and
// Taipei 101's fireshow page, re-opened on 27 Oct 2026.
//
// Every find must match exactly once, or nothing is written.
// Usage: POSTS_PATH=path/to/posts.json node scripts/update-fireworks-guide.mjs

import fs from "fs";
import path from "path";

if (!process.env.POSTS_PATH) {
  console.error("Set POSTS_PATH to the posts.json to edit - aborting, nothing written.");
  process.exit(1);
}

const SLUG = "taipei-101-fireworks-new-years-eve";
const MODIFIED = "2026-10-28 12:00:00";
const LINK = `/${SLUG}`;

const SCHEDULE = `<h2 id="Schedule">What Time Do the Fireworks Start? (Schedule)</h2>

<p>The Taipei 101 fireworks start at <strong>midnight exactly</strong>, as 31 December turns into 1 January, and last <strong>five to six minutes</strong>. Taipei 101 gave the 2025/26 show as 300 seconds, while Taiwan's Central News Agency reported six minutes on the night. In 2026 New Year's Eve falls on a <strong>Thursday</strong>, and the New Year holiday runs from Friday 1 to Sunday 3 January 2027.</p>

<p>The 2026/27 details are not out yet. At the end of October 2026 Taipei 101 had not announced its show, and the city's tourism site listed the Taipei New Year's Eve Party for 31 December at City Hall, with six hours of performances but no running order. The last show was announced in December, so until this year's arrives, treat the 2025/26 timings below as the guide.</p>

<figure class="wp-block-table is-style-stripes"><table><thead><tr><th>Time on 31 Dec</th><th>What happened in 2025/26</th></tr></thead><tbody>
<tr><td>06:00</td><td>The MRT began 42 hours of non-stop running, until midnight at the end of 1 January (except the Xiaobitan and Xinbeitou branches)</td></tr>
<tr><td>09:00</td><td>No parking from now until 03:00 in the streets around City Hall and Taipei 101</td></tr>
<tr><td>17:00</td><td>Blue line trains every 2&ndash;3 minutes and Red line trains every 3 (bikes were barred from the MRT from 16:00)</td></tr>
<tr><td>19:00</td><td>The countdown concert started on City Hall Plaza; cars could leave the streets around City Hall but not enter</td></tr>
<tr><td>20:00</td><td>Closures spread to Yixian Road and Ren'ai Road, and car parks inside the area shut completely</td></tr>
<tr><td>21:30</td><td>City Hall station: exit 2 and the bus station shutters closed</td></tr>
<tr><td>22:00</td><td>No vehicles at all, until 03:00, inside Zhongxiao East Road, Songde Road, Xinyi and Zhuangjing Roads and Guangfu South Road. Taipei 101/World Trade Center exit 4 and City Hall's passages to Uni-President and Breeze Xinyi closed</td></tr>
<tr><td>22:30</td><td>Free MRT entry at Nanjing Sanmin and Taipei Arena, until 06:00</td></tr>
<tr><td>Just before midnight</td><td>A light show on the tower, then the countdown on its facade</td></tr>
<tr><td>00:00</td><td>The fireworks, for five to six minutes</td></tr>
<tr><td>00:00&ndash;01:30</td><td>Four free shuttle buses to Zhongxiao Xinsheng, Gongguan, Nanjing Sanmin and the Muzha area</td></tr>
<tr><td>01:00</td><td>The concert ended</td></tr>
<tr><td>About 01:30</td><td>The last late-running buses through Xinyi</td></tr>
<tr><td>03:00</td><td>Roads reopened to traffic</td></tr>
</tbody></table></figure>

<h3 id="When-to-Arrive">When to arrive</h3>

<p>For a place near the stage on City Hall Plaza, come in the afternoon: CNA counted about 65,000 people on the plaza by 22:20 in 2025/26. For the street spots in Xinyi, early evening is the latest that makes sense. If you are being dropped off by taxi, or checking into a hotel inside the closed area, get there <strong>before 19:00</strong>, because cars cannot get in after that, and a car parked inside cannot leave until 03:00.</p>

<p>Coming by MRT, get off at <strong>Taipei City Hall</strong> or <strong>Xinyi Anhe</strong>. In 2025/26 the metro warned that trains might run straight through Sun Yat-Sen Memorial Hall and Taipei 101/World Trade Center when their platforms got too full.</p>

<hr class="wp-block-separator has-css-opacity"/>

`;

// [find, replace] pairs for the fireworks guide.
const PAGE_EDITS = [
  // Intro: lead with the head term and the start time.
  [
    "<p>Taipei 101 has closed out the year with fireworks fired from the length of the tower since 2004, and it remains the biggest night in the city's calendar. Hundreds of thousands of people fill Xinyi for a display that is over in about six minutes.</p>",
    "<p>The Taipei 101 fireworks have closed out the year since 2004, fired from the length of the tower, and New Year's Eve remains the biggest night in the city's calendar. Hundreds of thousands of people fill Xinyi for a display that starts at midnight and is over in five to six minutes.</p>",
  ],
  // Quick Verdict, first bullet: consistent length, pointer to the schedule.
  [
    "<strong>The fireworks go off at midnight</strong> and last around six minutes. Everything else on the night is build-up.",
    "<strong>The fireworks go off at midnight</strong> and last five to six minutes. Everything else on the night is build-up &ndash; the <a href=\"#Schedule\">schedule below</a> has the times for the concert, the MRT and the road closures.",
  ],
  // Schedule section goes in before "The Fireworks Themselves".
  [
    "<h2 id=\"Fireworks\">The Fireworks Themselves</h2>",
    `${SCHEDULE}<h2 id="Fireworks">The Fireworks Themselves</h2>`,
  ],
  // Heading aimed at "best spots".
  [
    "<h2 id=\"Free\">Free Viewing Spots</h2>",
    "<h2 id=\"Free\">Best Free Spots to Watch the Fireworks</h2>",
  ],
  // Sun Yat-sen: closed into 2027; plaza and park open.
  [
    "for the largest renovation in its history, with reopening expected in the last quarter of 2026. <strong>The plaza and the surrounding Zhongshan Park stay open throughout</strong>, so the spot still works &ndash; but check the state of the hoardings before you commit to a position on the steps.",
    "for the largest renovation in its history, and it is not expected to reopen before 2027. <strong>The plaza and the surrounding Zhongshan Park stay open throughout</strong> &ndash; markets and outdoor events are still being held there this autumn &ndash; so the spot still works, but check the state of the hoardings before you commit to a position on the steps.",
  ],
];

// One inbound link per page, each a single new sentence.
const LINK_EDITS = [
  [
    "taipei-zoo",
    "<li><strong>Check the June closure</strong> before planning a late-June visit, and remember the gondola shuts around then too.</li>",
    `<li><strong>Check the June closure</strong> before planning a late-June visit, and remember the gondola shuts around then too.</li><li><strong>Here on 31 December?</strong> The zoo shuts at 17:00, which leaves plenty of time to reach the <a href="${LINK}">New Year's Eve fireworks at Taipei 101</a>: take the brown line to Daan and change to the red line for Xinyi Anhe.</li>`,
  ],
  [
    "chiang-kai-shek-memorial-hall",
    "<li><strong>It's a stop on the <a href=\"/taipei-sightseeing-bus\">sightseeing bus</a></strong> if you're covering several sights in a day.</li>",
    `<li><strong>It's a stop on the <a href="/taipei-sightseeing-bus">sightseeing bus</a></strong> if you're covering several sights in a day.</li><li><strong>In town for New Year's Eve?</strong> The red line runs direct from Chiang Kai-Shek Memorial Hall station to Xinyi, so an afternoon here works well before the <a href="${LINK}">Taipei 101 fireworks</a> at midnight.</li>`,
  ],
  [
    "best-time-to-visit-taipei",
    "watch the world-famous fireworks launch off the sides of <a href=\"/taipei-101\">Taipei 101</a> at midnight.</li>",
    `watch the world-famous fireworks launch off the sides of <a href="/taipei-101">Taipei 101</a> at midnight. Our <a href="${LINK}">guide to watching the fireworks</a> has the timings, the best spots and the way home.</li>`,
  ],
  [
    "best-areas-and-hotels-to-stay",
    "<li><strong>Holidays.</strong> New Year and Lunar New Year add roughly <strong>30&ndash;60%</strong> per night.</li>",
    `<li><strong>Holidays.</strong> New Year and Lunar New Year add roughly <strong>30&ndash;60%</strong> per night. The exception is the night of the <a href="${LINK}">Taipei 101 fireworks</a>, when some budget hotels in Xinyi charge around ten times their usual rate.</li>`,
  ],
  [
    "xinyi-shopping-district",
    "where they'll be live musical performances or even events like B-Boy competitions.</p>",
    `where they'll be live musical performances or even events like B-Boy competitions.</p>\n\n<p>On New Year's Eve the whole district becomes one big viewing area for the <a href="${LINK}">Taipei 101 fireworks</a>, and its roads are closed to traffic from the evening.</p>`,
  ],
  [
    "taipei-guide",
    "This is the best window if you want to avoid rain and don't mind the occasional chilly day.</p>",
    `This is the best window if you want to avoid rain and don't mind the occasional chilly day. It also takes in New Year's Eve, when crowds pack Xinyi at midnight for the <a href="${LINK}">Taipei 101 New Year fireworks</a>.</p>`,
  ],
  [
    "taipei-nightlife",
    "After this, you will need to rely on yellow taxis or the highly reliable and cheap Uber app to travel.</li>",
    `After this, you will need to rely on yellow taxis or the highly reliable and cheap Uber app to travel. New Year's Eve is the one night it keeps going: in recent years trains have run right through to carry the crowds home from the <a href="${LINK}">fireworks at Taipei 101</a>.</li>`,
  ],
];

const filePath = path.resolve(process.env.POSTS_PATH);
const raw = fs.readFileSync(filePath, "utf8");
const posts = JSON.parse(raw);
const fail = (m) => { console.error(`${m} - aborting, nothing written.`); process.exit(1); };

const apply = (post, from, to) => {
  const n = post.content.split(from).length - 1;
  if (n !== 1) fail(`/${post.slug}: "${from.slice(0, 60)}..." matched ${n} times`);
  post.content = post.content.replace(from, () => to);
};

const page = posts.find((p) => p.slug === SLUG);
if (!page) fail(`/${SLUG} not found`);
if (/id="FAQ"|Common Questions/.test(page.content)) fail(`/${SLUG} already has an FAQ; recheck the plan`);
for (const [from, to] of PAGE_EDITS) apply(page, from, to);
page.modified = MODIFIED;

for (const [slug, from, to] of LINK_EDITS) {
  const post = posts.find((p) => p.slug === slug);
  if (!post) fail(`/${slug} not found`);
  if (post.content.includes(`href="${LINK}"`)) fail(`/${slug} already links the fireworks guide`);
  apply(post, from, to);
}

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2) + "\n");
console.log(`/${SLUG}: ${PAGE_EDITS.length} edits, modified ${MODIFIED}`);
console.log(`Inbound links added from: ${LINK_EDITS.map(([s]) => "/" + s).join(", ")}`);
