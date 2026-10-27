// Factual fixes from section 3 ("Factual fixes") of
// data/research/existing-posts-improvement-plan.md, with the detail taken from
// the zhongzheng, gongguan, datong, songshan-xinyi and wanhua research files.
//
// Every find string must match exactly once in its post's content, or the
// script aborts and nothing is written. Body text only: titles and excerpts
// are left to the metadata pass. Pages owned by other scripts
// (taipei-101-fireworks-new-years-eve, mrt, taiwan-high-speed-rail-hsr-discounts-klook,
// taoyuan-airport-mrt, taipei-zoo, ximending, taiwan-tourist-tax-refund) are
// not touched here.
//
// Where the right value could not be confirmed, the new text hedges
// ("check before you go") rather than giving a firm figure.
//
// Usage: POSTS_PATH=path/to/posts.json node scripts/fix-known-errors.mjs
// (defaults to content/posts.json)

import fs from "fs";
import path from "path";

const MODIFIED = "2026-10-28 12:00:00";

const EDITS = {
  // --- Zhongzheng research ---------------------------------------------
  "jin-feng-braised-pork-rice": [
    ["<p>Long opening times (08:00 to 01:00) every day.</p>",
     "<p>Recent listings give Tuesday to Saturday 11:00 to 01:00, Sunday 11:00 to 23:00, and closed on Mondays. Some sources still disagree, so check before you go.</p>"],
  ],
  "peace-park": [
    ["<p><strong>Taipei 228 Memorial Hall</strong><br>10:00 - 17:00<br>Closed on Mondays</p>",
     "<p><strong>Taipei 228 Memorial Hall</strong><br>Tuesday to Sunday 10:00 - 17:00<br>Closed on Mondays</p>"],
    ["<p><strong>Taipei 228 Memorial Hall</strong><br>NT$20<br>Free for those under 12 or over 65 </p>",
     "<p><strong>Taipei 228 Memorial Hall</strong><br>Free for everyone (the entry charge was scrapped in September 2024)</p>"],
  ],
  "best-museums-in-taipei": [
    ["<a href=\"/peace-park#Museum\">Taipei 228 Memorial Hall</a></strong> (NT$20).",
     "<a href=\"/peace-park#Museum\">Taipei 228 Memorial Hall</a></strong> (free)."],
  ],
  "taipei-on-a-budget": [
    ["<a href=\"/peace-park\">Taipei 228 Memorial Museum</a></strong> (NT$20)",
     "<a href=\"/peace-park\">Taipei 228 Memorial Museum</a></strong> (free)"],
  ],
  "presidential-office-building": [
    ["<p>The Presidential Palace is partially open to the public on weekend mornings. It is fully open (and the <a href=\"/taipei-guest-house\">Taipei Guest House</a>) on certain dates each year - see Opening Hours section below.</p>",
     "<p>The Presidential Palace is partially open to the public on weekday mornings. It is fully open on selected Saturdays each year, some of which it shares with the <a href=\"/taipei-guest-house\">Taipei Guest House</a> - see Opening Hours section below.</p>"],
    ["between 09:00 and 12:00. Last entry 11:30<br>(I'm not exactly sure what partially open means)</p>",
     "between 09:00 and 12:00. Last entry 11:30<br>(on weekdays you can see the ground-floor exhibition rooms and corridors only)</p>\n\n<p><strong>Fully open</strong> on selected Saturdays, 09:00 - 16:00. Two are left in 2026, on 7 November and 5 December, and in 2027 they fall on 1 January, 27 February, 13 March, 10 April, 8 May, 5 June, 3 July, 7 August, 18 September, 16 October, 6 November and 4 December. Closed on public holidays and typhoon days.</p>"],
    ["<p>The&nbsp;<a href=\"/taipei-guest-house\">Taipei Guest House</a>&nbsp;is also open on the same weekend dates, located within walking distance.</p>",
     "<p>The&nbsp;<a href=\"/taipei-guest-house\">Taipei Guest House</a>, within walking distance, also opens on selected Saturdays, but only some of its dates match. Both are open on 7 November and 5 December 2026.</p>"],
  ],
  "taipei-guest-house": [
    ["It's open on the same dates as the Presidential Building located just 10 minutes walk away, so it's definitely worth visiting both.",
     "Some of its open days fall on the same Saturdays as the Presidential Building, just 10 minutes walk away, so pick one of those and you can see both."],
    ["<h3>Opening Hours</h3>\n\n\n\n\n\n\n\n<h3>Price</h3>",
     "<h3>Opening Hours</h3>\n\n\n\n<p>Selected Saturdays, 09:00 - 16:00 (no entry after 15:30)</p>\n\n\n\n<p>Only 7 November and 5 December remain in 2026, and no 2027 calendar is out yet. Closed on public holidays and typhoon days, and no booking is needed.</p>\n\n\n\n<h3>Price</h3>"],
    ["<a href=\"/presidential-office-building\">Presidential Office Building</a> is also open on the same dates, located within walking distance</p>",
     "<a href=\"/presidential-office-building\">Presidential Office Building</a>, within walking distance, is also fully open on some Saturdays. In 2026 the two share 7 November and 5 December</p>"],
  ],
  "national-taiwan-museum": [
    ["<p>Children aged between 6-12 years and senior citizens over 65 years can enter for half price at both. </p>",
     "<p>Children aged between 6-12 years enter for half price. Over-65s get into the main building and the Paleontology Hall free on weekdays and for half price at weekends.</p>"],
    ["<h3>Opening Times</h3>\n\n\n\n<p>09:30 - 17:00</p>",
     "<h3>Opening Times</h3>\n\n\n\n<p>09:30 - 17:00 (ticket sales stop at 16:30)</p>"],
    ["Formally home to the state-owned Land Bank of Taiwan, it was later restored and renovated into the museum.</p>",
     "Formally home to the state-owned Land Bank of Taiwan, it was later restored and renovated into the museum. The museum now calls it the Paleontology Hall (古生物館).</p>"],
  ],

  // --- Gongguan research -----------------------------------------------
  "treasure-hill": [
    ["<h3>Opening Hours</h3>\n\n\n\n<p>11:00 – 21:00</p>\n\n\n\n<p>Closed on Mondays</p>",
     "<h3>Opening Hours</h3>\n\n\n\n<p>Outdoor areas: Tuesday to Sunday 11:00 – 22:00<br>Indoor spaces: Tuesday to Sunday 11:00 – 18:00</p>\n\n\n\n<p>Closed on Mondays</p>"],
  ],
  "see-the-drinking-water-museum-at-taipei-water-park": [
    ["<p>The amusement arcade reference comes from <strong>Road Castle</strong>, which is a children's water park and costs extra to enter.",
     "<p>The amusement arcade reference comes from the old children's water park, which has since closed. The summer water play area is now called <strong>親水樂園</strong>."],
    ["<h3>Opening Hours</h3>\n\n\n\n<p>09:00 - 18:00</p>\n\n\n\n<p><strong>Closed every Monday</strong></p>",
     "<h3>Opening Hours</h3>\n\n\n\n<p>September 1st - June 30th<br>09:00 - 17:00, with last tickets sold at 16:00</p>\n\n\n\n<p>July 1st - August 31st<br>09:00 - 18:00, with last tickets sold at 17:00</p>\n\n\n\n<p><strong>Closed every Monday</strong>, unless the Monday is part of a long holiday weekend</p>"],
    ["📍 Closest MRT: Gongguan (green line - exit 1) </p>",
     "📍 Closest MRT: Gongguan (green line) - use exit 4 </p>"],
  ],
  "gongguan": [
    ["<p>For kids, there are plenty of amusement arcades, and a water park called Road Castle with water slides and pools.</p>",
     "<p>For kids, there are plenty of amusement arcades. The old water park in the Taipei Water Park has closed, though a summer water play area runs there instead.</p>"],
  ],
  "yong-he-soy-milk-king": [
    ["<p>Actually it's not solely a breakfast restaurant as it's open 24 hours a day, 6.5 days a week (only closing it's doors on Sunday after midday for 12 hours so they can give the place a thorough clean).</p>",
     "<p>It used to be open 24 hours a day for six and a half days a week. The most recent report (June 2026) says it now runs from roughly 5am until 2pm, with Mondays off, because it's short of staff. Older listings still say 24 hours, so check before you go.</p>"],
    ["<p>Open 24 hours except on Sunday afternoons.</p>",
     "<p>Latest reported hours: 05:00 - 14:00, closed Mondays. These have changed more than once, so check before you go.</p>"],
  ],
  "best-famous-restaurants": [
    ["Open 24/7 except for Sunday afternoon when they give the place a thorough clean, you've no excuse not to give them a try.</p>",
     "It no longer opens around the clock, though: the latest report has it closing at 14:00 and shut on Mondays, so check before you go.</p>"],
  ],
  "cheap-breakfast-taipei": [
    ["<p>Open almost 24/7 (closing only on Sunday afternoons), Yong He Soy Milk King has built up",
     "<p>Once open almost around the clock, and now reported as serving only until mid-afternoon with Mondays off (check before you go), Yong He Soy Milk King has built up"],
  ],
  "lan-jia-traditional-taiwanese-snack": [
    ["they've even found a place on the Bib Gourmand Selection in the <a aria-label=\"Taipei Michelin Guide\" href=\"https://guide.michelin.com/tw/en/taipei-region/taipei/restaurant/lan-chia-guabao\" target=\"_blank\" rel=\"noreferrer noopener\">Taipei Michelin Guide</a>. </p>",
     "the Taipei Michelin Guide gave them a Bib Gourmand in 2019, although the stand isn't on the 2026 Bib Gourmand list. </p>"],
  ],
  "michelin-food-stands-at-night-markets": [
    ["<p class=\"stand-name\"><span class=\"bib-badge\">Bib Gourmand</span>Lan Chia Guabao</p>",
     "<p class=\"stand-name\"><span class=\"bib-badge\">Bib Gourmand 2019</span>Lan Chia Guabao</p>"],
  ],
  "national-taiwan-university": [
    ["roughly 115 hectare (1.15 km squared) campus",
     "roughly 110 hectare (1.1 km squared) campus"],
  ],
  "the-diner": [
    ["<a href=\"https://inline.app/booking/-KJJSvnMqP2ZECa6JwWY/-KJJSvnMqP2ZECa6JxWZ\" target=\"_blank\" rel=\"noreferrer noopener\">Xinyi branch</a> &nbsp;·&nbsp; ",
     ""],
  ],

  // --- Datong research -------------------------------------------------
  "taipei-story-house": [
    ["which alone makes it an odd, interesting little detour.</p>",
     "which alone makes it an odd, interesting little detour. Since 2021 it has been run by ACME under the name <strong>MAISON ACME 圓山別邸</strong>.</p>"],
    ["<h3>Opening Hours</h3>\n\n\n\n<p>10:00 - 17:30</p>\n\n\n\n<p>Closed on Mondays and during national holidays</p>",
     "<h3>Opening Hours</h3>\n\n\n\n<p>Recent reports give 11:00 - 17:00, closed on Mondays. There are no official hours online, so check before you go.</p>"],
  ],
  "dalongdong-baoan-temple-and-gardens": [
    ["<p>Tuesday to Saturday&nbsp;09:00 - 21:00<br>Sunday&nbsp;09:00 - 17:00</p>\n\n\n\n<p><strong>Closed on Mondays</strong></p>",
     "<p>Daily&nbsp;06:00 - 21:00</p>\n\n\n\n<p><strong>Open on Mondays</strong>, and free to enter. It's about 15 minutes on foot from Yuanshan MRT exit 2.</p>"],
  ],
  "maji-square": [
    ["there are a dozen or so restaurants and bars, plus some nice craft shops.</p>",
     "there are a dozen or so restaurants and bars. The shops have gone: the operator dropped retail after the pandemic, so it's food and drink only now.</p>"],
    ["<p>The best bars and restaurants in this area are</p>",
     "<p>The best bars and restaurants here when we visited were the ones below. Tenants change, so check the current line-up on MAJI's own site before you go.</p>"],
    ["<p>Adjacent to this area are some nice craft shops and a great little deli-style supermarket selling both local and international produce.</p>",
     "<p>The craft shops and the deli-style supermarket that used to sit next to this area have closed.</p>"],
    ["<p>Come at the weekend when the <strong>Farmer's Market</strong> is at the Expo and it's livelier. </p>",
     "<p>MAJI opens every day, 11:00 - 21:00, and some bars keep serving after midnight at weekends.</p>\n\n\n\n<p>Come at the weekend when the <strong>Farmer's Market</strong> is at the Expo and it's livelier. </p>"],
  ],
  "xinsheng-park": [
    ["over 700 varieties across more than a hectare",
     "over 800 varieties across more than a hectare"],
  ],
  "lin-an-tai-ancestral-house": [
    ["<p>09:00 - 17:00 (extended to 18:00 during July and August)</p>\n\n\n\n<p>Closed on Mondays and during national holidays</p>",
     "<p>Tuesday to Sunday 09:00 - 17:00, last entry 16:45 (extended to 18:00 during July and August)</p>\n\n\n\n<p>Closed Mondays. It also shuts for Lunar New Year, Tomb Sweeping Day, the Dragon Boat Festival and the Mid-Autumn Festival</p>"],
  ],
  "confucius-temple": [
    ["<p>You can try your hand at archery, or try the 4D theatre which shows two films in rotation about the life and times of Confucius. Although these are in Chinese, they do have English subtitles.</p>",
     "<p>Minglun Hall has a small theatre with a 3D screen that shows films about the life and times of Confucius. Screening times aren't published, so ask at the visitor centre.</p>"],
    ["<p><strong>Free, open 08:30 to 21:00, and closed on Mondays</strong> &ndash; the one temple on this side of the city where the day of the week matters. The 4D theatre runs films from 10:00 to 16:00 daily.</p>",
     "<p><strong>Free, open Tuesday to Sunday 08:30 to 21:00 (public holidays included), and closed on Mondays</strong> &ndash; the one temple on this side of the city where the day of the week matters. There are free guided tours three times a day (10:30, 14:30 and 15:30), starting from the visitor centre.</p>"],
    ["<p>Allow twenty minutes, or an hour if you watch a film and try the archery.",
     "<p>Allow twenty minutes, or an hour if you join a tour or catch a film."],
  ],
  "expo-farmers-market": [
    // The old taipeimarket.ehosting.com.tw page is dead and so is
    // expofarmersmarket.gov.taipei. The Department of Economic Development's
    // market page was live on 27 Oct 2026 and mentions its events.
    ["<a href=\"http://taipeimarket.ehosting.com.tw/news.php?year=\" target=\"_blank\" rel=\"noreferrer noopener\" aria-label=\"viewed here\">viewed here</a>",
     "<a href=\"https://doed.gov.taipei/cp.aspx?n=9B42671D451BC352\" target=\"_blank\" rel=\"noreferrer noopener\">viewed here</a>"],
  ],

  // --- Songshan-Xinyi research: Sun Yat-sen Memorial Hall -------------
  // The hall's director now gives Q3 2027 for completion. No reopening date
  // has been announced.
  "sun-yat-sen-memorial-hall": [
    ["for the largest renovation in its history, with reopening expected in the <strong>final quarter of 2026</strong>.",
     "for the largest renovation in its history. <strong>Don't expect it to reopen before 2027</strong>."],
    ["<strong>The building is shut until late 2026.</strong>",
     "<strong>The building is shut until at least 2027.</strong>"],
    ["<td>Closed until late 2026</td>",
     "<td>Closed into 2027</td>"],
    ["<p>Reopening is expected in the <strong>fourth quarter of 2026</strong>. Construction schedules move,",
     "<p>No reopening date has been announced. The works were first due to finish in late 2026, but the hall's director now gives the <strong>third quarter of 2027</strong>. Construction schedules move,"],
    ["<p>All of the following is closed until late 2026, but",
     "<p>All of the following is closed until at least 2027, but"],
    ["<p>The main building is closed for renovation until late 2026 &ndash; it has been shut since February 2024.",
     "<p>The main building has been shut for renovation since February 2024, and the work now runs into 2027."],
    ["Reopening is expected in Q4 2026 but construction dates can slip.",
     "The latest target for finishing the works is Q3 2027, and the date has slipped once already."],
  ],
  "chiang-kai-shek-memorial-hall": [
    ["<strong>closed for major renovation since February 2024</strong>, with reopening expected around the end of 2026.",
     "<strong>closed for major renovation since February 2024</strong>, with the work now running into 2027."],
  ],
  "martyrs-shrine": [
    ["<a href=\"/sun-yat-sen-memorial-hall\">Sun Yat-Sen</a> hall is closed until late 2026.",
     "<a href=\"/sun-yat-sen-memorial-hall\">Sun Yat-Sen</a> hall is shut for renovation, with no reopening expected before 2027."],
    ["<td>Suspended &ndash; hall closed until late 2026</td>",
     "<td>Suspended &ndash; hall closed into 2027</td>"],
  ],
  "best-buildings-in-taipei": [
    ["for the largest renovation in its history, with reopening expected late in 2026;",
     "for the largest renovation in its history, which now looks set to run into 2027;"],
    ["<figcaption>Sun Yat-Sen Memorial Hall - the main hall is closed until late 2026.</figcaption>",
     "<figcaption>Sun Yat-Sen Memorial Hall - the main hall is closed until at least 2027.</figcaption>"],
  ],
  "best-districts-and-areas": [
    ["Note the main hall is closed for renovation until late 2026, though the park stays open.",
     "Note the main hall is closed for renovation until at least 2027, though the park stays open."],
  ],

  // --- Songshan-Xinyi research: Taipei 101 and Songshan park ----------
  // Official ticket page: the general ticket lists 89F and 88F, 91F is for
  // group tickets and weather-dependent, and since 1 Jul 2026 the
  // observatory ticket counter is temporarily on the Office Tower 1F.
  "taipei-101": [
    ["<li><strong>Standard ticket is NT$600</strong> for floors 88&ndash;91, including the open-air 91st floor.",
     "<li><strong>Standard ticket is NT$600</strong> for floors 88 and 89. The official ticket page lists the open-air 91st floor for group tickets only, and only in good weather."],
    ["<td>600</td><td>88F &ndash; 91F</td>",
     "<td>600</td><td>88F &ndash; 89F</td>"],
    ["<p>Tickets can be bought at the counter on the 5th floor, but",
     "<p>Tickets can be bought at the observatory ticket counter (moved to Office Tower 1F in July 2026), but"],
    ["<p>Easily missed, and the best part of the standard ticket. The open-air viewing area",
     "<p>The official ticket page lists this floor for group tickets only, and only when the weather allows, so ask at the counter whether it's open to you. The open-air viewing area"],
    ["<p>The entrance to the express lifts is on the <strong>5th floor of the shopping mall</strong>, reachable either from certain lifts on the first floor, or via the escalators in the large open area on the 4th floor. The ticket booth is just past the TWG Tea store.</p>",
     "<p>Since 1 July 2026 the observatory ticket counter has been temporarily on the <strong>1st floor of the Office Tower</strong>, and the official ticket page sends visitors there rather than to the mall. Before the move it was on the mall's 5th floor, up the escalators from the 4th-floor atrium, so follow the signs on the day in case it moves back.</p>"],
    ["<li><strong>Don't miss the 91st floor.</strong> The stairs up from the 89th are easy to walk straight past, and the open-air deck is the best bit of the standard ticket.</li>",
     "<li><strong>Ask about the 91st floor.</strong> The open-air deck is up the stairs from the 89th, but the official site lists it for group tickets only and it shuts in bad weather.</li>"],
    ["<p>Yes. The 91st floor open-air deck is included in the standard ticket, though it closes in high winds.",
     "<p>Not always. The 91st floor has an open-air deck, but the official ticket page lists it for group tickets only, and it closes in high winds."],
  ],
  "one-day-itineraries": [
    ["Locate the Taipei 101 Observation Deck entrance of the 5th floor (see",
     "Head for the observatory ticket desk, which moved to the ground floor (1F) of the Office Tower in July 2026 (see"],
  ],
  "songshan-cultural-and-creative-park": [
    ["<li><strong>Outdoor areas never close.</strong> Indoor spaces run 09:00&ndash;18:00, and Eslite until 22:00",
     "<li><strong>Open 08:00&ndash;22:00 daily</strong>, according to the city's official tourism site, and Eslite until 22:00"],
    ["<p>The <strong>outdoor areas are open 24 hours</strong>. Indoor spaces run <strong>09:00&ndash;18:00</strong>, Eslite Spectrum",
     "<p>The city's official tourism site gives <strong>08:00&ndash;22:00 every day</strong>. Individual galleries set their own hours, so check before you go. Eslite Spectrum"],
  ],

  // --- Wanhua research -------------------------------------------------
  "huaxi-street-night-market": [
    ["<p>The whole market was awarded a Michelin Guide Bib Gourmand in 2019, and one stall in particular has its own individual recognition:",
     "<p>Several of its stalls have appeared in the Michelin Guide's Bib Gourmand list, and one in particular is worth seeking out:"],
  ],
  "ay-chung-flour-rice-noodles": [
    ["<p>Opens until 23:00</p>",
     "<p>Reported as open 10:00 - 22:30, and until 23:00 on Sundays. Check before you go.</p>"],
  ],

  // --- Found in the audit ----------------------------------------------
  "taiwan-sim-cards": [
    ["Taiwan Mobile and FarEasTone prices are from the Taoyuan counter boards, August 2025.",
     "Taiwan Mobile and FarEasTone prices are from the Taoyuan counter boards, August 2025, so check the boards when you land in case they have changed."],
    ["<p>In my own tests it has been consistently quick, in the city and out of it.</p>",
     "<p>In my own tests it has been consistently quick, in the city and out of it. The speed tests on this page date from 2019, so treat them as a rough guide rather than today's speeds.</p>"],
  ],
};

const filePath = path.resolve(process.env.POSTS_PATH || "content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const fail = (m) => { console.error(`${m} - aborting, nothing written.`); process.exit(1); };

let total = 0;
for (const [slug, edits] of Object.entries(EDITS)) {
  const post = posts.find((p) => p.slug === slug);
  if (!post) fail(`/${slug} not found`);
  for (const [from, to] of edits) {
    const n = post.content.split(from).length - 1;
    if (n !== 1) fail(`/${slug}: "${from.slice(0, 60)}..." matched ${n} times`);
    post.content = post.content.replace(from, () => to);
  }
  post.modified = MODIFIED;
  total += edits.length;
  console.log(`/${slug}: ${edits.length} fix${edits.length > 1 ? "es" : ""}`);
}

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2) + "\n");
console.log(`${total} fixes across ${Object.keys(EDITS).length} posts written to ${filePath}`);
