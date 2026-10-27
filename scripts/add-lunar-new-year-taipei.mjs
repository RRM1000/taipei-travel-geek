// New guide: Lunar New Year and the Lantern Festival in Taipei, 2027.
//
// WHY THIS PAGE. The site mentions the New Year in passing (the Dihua guide,
// the Longshan guide, the events calendar), but nothing tells a visitor what
// the holiday actually does to a trip: which days the city shuts, when the
// trains sell out, what the temples do, and where the lantern festivals are.
//
// SOURCING. data/research/lunar-new-year-taipei.md, checked 27-28 Oct 2026.
// - 2027 dates: DGPA 116 calendar (Executive Yuan approved, ETtoday 21 May
//   2026); lunar dates read off Xingtian Temple's official calendar.
// - Dihua market 2026 dates: Business Today, 30 Jan 2026. 2027 not announced.
// - Taipei Lantern Festival 2026/2025: PTS, Taiwan News. 2027 not announced.
// - Taiwan Lantern Festival 2027 (Miaoli, provisional 20 Feb - 7 Mar): CNA,
//   17 Mar 2026.
// - Pingxi 2026: Taiwan News, NOWNEWS. 2027 not announced.
// - Closures: Kembel (taiwanobsessed.com, attributed), Taipei Metro via
//   NOWNEWS, Longshan and Xingtian official notices.
// - Trains: People News 9 Jan 2026, Business Today 15 Jan 2026.
// - Hotels: Commercial Times, 25 Feb 2026.
// Anything not announced for 2027 is given as the 2026 pattern and hedged.
//
// PHOTOS. Commons files from scratchpad/downloaded-photos/new-posts/
// lunar-new-year/ (credits.json) are copied by this script into
// public/media/2026/10/lunar-new-year-taipei/. The hero carries a
// -2400x1799 suffix so lib/content.ts can read its size, and it also
// appears in the body, after the first h2, to carry its credit. Three of
// the owner's own Dihua photos are used from /media/2026/08/dihua/ (no
// credit needed). Not used: the three uncredited 2026/08 photos.
//
// AFFILIATE LINKS. Three Klook activities, each opened on 27 Oct 2026:
// 76306 (Yehliu/Jiufen/Shifen day tour), 121840 (Pingxi line day pass +
// lantern) and 90102 (Shifen lantern). 98800 (night Jiufen & Shifen) is
// dead and is not used.
//
// FAQ: yes (main guide). Perfect For: no.
//
// ALSO: guarded link paragraphs added to /dadaocheng-dihua-street-walk,
// /longshan-temple and /best-time-to-visit-taipei. Each edit needs its
// anchor text to appear exactly once, and is skipped if the post already
// links here.
//
// POSTS_PATH=<file> writes to a copy instead of content/posts.json. Photos
// are copied into public/ either way (copying is idempotent).

import fs from "fs";
import path from "path";

const SLUG = "lunar-new-year-taipei";
const TODAY = "2026-10-28 12:00:00";
const MEDIA = `/media/2026/10/${SLUG}`;
const SRC_DIR = "scratchpad/downloaded-photos/new-posts/lunar-new-year";

// [source file, published file name]
const COPIES = [
  ["taiwan-lantern-festival-taipei-2023-dragon-gate.jpg", "taiwan-lantern-festival-taipei-2023-dragon-gate-2400x1799.jpg"],
  ["taipei-lantern-festival-2024-dragon-tunnel.jpg", "taipei-lantern-festival-dragon-tunnel.jpg"],
  ["pingxi-sky-lanterns-night-sky.jpg", "pingxi-sky-lanterns.jpg"],
  ["longshan-temple-lantern-festival-display.jpg", "longshan-temple-lantern-festival.jpg"],
  ["songshan-ciyou-temple-new-year-lanterns.jpg", "songshan-ciyou-temple-new-year-lanterns.jpg"],
  ["chinese-new-year-decorations-for-sale-taipei.jpg", "new-year-decorations-for-sale-taipei.jpg"],
];
const HERO = `${MEDIA}/${COPIES[0][1]}`;
const img = (i) => `${MEDIA}/${COPIES[i][1]}`;

const credit = (filePage, author, licenceUrl, licence) =>
  `Photo: <a href="${filePage}">${author}</a>, <a href="${licenceUrl}">${licence}</a>`;
const ext = (href, text) => `<a href="${href}" target="_blank" rel="noreferrer noopener">${text}</a>`;

const KLOOK = {
  "yehliu-jiufen-shifen-day-tour": "https://www.klook.com/en-GB/activity/76306-yehliu-jiufen-shifen-golden-waterfall-day-tour/?aid=8733",
  "pingxi-day-pass-sky-lantern": "https://www.klook.com/en-GB/activity/121840-taiwan-railway-taiwan-railway-pingxi-day-pass-pingxi-sky-lantern-experience/?aid=8733",
  "shifen-sky-lantern": "https://www.klook.com/en-GB/activity/90102-sky-lantern-experience-new-taipei/?aid=8733",
};
const activity = (key, text) =>
  `<a href="${KLOOK[key]}" data-activity="${key}" target="_blank" rel="noreferrer noopener">${text}</a>`;

const CONTENT = `
<p>Lunar New Year is the one week when Taipei empties out. Offices close, a large share of the city's residents head home to their families elsewhere in Taiwan, and many small restaurants pull down their shutters for several days. In 2027 New Year's Eve falls on Friday 5 February, and the seven days off last from Thursday 4 to Wednesday 10 February. The weeks either side are among the liveliest of the year: the Dihua Street market beforehand, the temples at midnight, and then the lantern festivals around the fifteenth day, Saturday 20 February. This guide sets out the 2027 dates, what is worth doing, what shuts and how to get around while the rest of the country is on the move.</p>

<div class="quick-verdict"><p class="quick-verdict-title">💡 The Quick Verdict: Lunar New Year in Taipei</p><ul><li><strong>Key dates:</strong> New Year's Eve is Friday 5 February 2027, New Year's Day Saturday 6 February, and the Lantern Festival Saturday 20 February. See the <a href="#Key-Dates">full table</a>.</li>
<li><strong>Best for atmosphere:</strong> the fortnight before the Eve, when Dihua Street turns into a giant New Year market.</li>
<li><strong>Hardest days:</strong> the Eve and the first two days, when much of Taipei is closed. Convenience stores, department stores and the big temples stay open.</li>
<li><strong>Lanterns:</strong> the Taiwan Lantern Festival is in Miaoli in 2027 (provisionally 20 February to 7 March, beside the high-speed rail station); Taipei and Pingxi run their own events, with 2027 dates still to come.</li>
<li><strong>Book early:</strong> intercity train and high-speed rail seats for the holiday went on sale about four weeks ahead in 2026, and popular trains go quickly. Hotels in Taipei are busier than usual but not wildly dearer.</li></ul></div>



<h2 id="Key-Dates">2027 Key Dates</h2>

<p>2027 is the Year of the Goat. The holiday dates below are from the government's official 2027 calendar, which the Executive Yuan approved in May 2026. New Year's Day and the second day fall on a Saturday and Sunday, so Tuesday 9 and Wednesday 10 February are given as make-up days off. Event dates marked "not announced" were checked on 28 October 2026; we will update them when the organisers publish.</p>

<figure class="wp-block-table is-style-stripes"><table><thead><tr><th>What</th><th>2027 date</th><th>Status</th></tr></thead><tbody>
<tr><td>Dihua Street New Year market</td><td>Probably late January to Thursday 4 February</td><td>Not announced; ran 31 January to 15 February in 2026</td></tr>
<tr><td>Public holiday begins</td><td>Thursday 4 February</td><td>Confirmed</td></tr>
<tr><td>New Year's Eve (reunion dinner)</td><td>Friday 5 February</td><td>Confirmed</td></tr>
<tr><td>New Year's Day (first day)</td><td>Saturday 6 February</td><td>Confirmed</td></tr>
<tr><td>Fifth day (God of Wealth)</td><td>Wednesday 10 February</td><td>Calendar date</td></tr>
<tr><td>Last day of the holiday</td><td>Wednesday 10 February</td><td>Confirmed</td></tr>
<tr><td>Lantern Festival (fifteenth day)</td><td>Saturday 20 February</td><td>Calendar date</td></tr>
<tr><td>Taiwan Lantern Festival, Miaoli</td><td>20 February to 7 March</td><td>Provisional</td></tr>
<tr><td>Taipei Lantern Festival</td><td>Around the Lantern Festival</td><td>Not announced; ran 25 February to 15 March in 2026</td></tr>
<tr><td>Pingxi Sky Lantern Festival</td><td>Around the Lantern Festival</td><td>Not announced; 27 February and 3 March in 2026</td></tr>
</tbody></table></figure>

<p>For the rest of the year's festivals, see our <a href="/taipei-annual-events#February-2027">events calendar for 2027</a>.</p>



<h2 id="Dihua-Market">The Dihua Street New Year Market</h2>

<figure class="wp-block-image size-large"><img width="1600" height="1200" src="/media/2026/08/dihua/20200116_152209.webp" alt="Crowds shopping under red lanterns at the Dihua Street Lunar New Year market" loading="lazy"/><figcaption>Red lanterns strung over Dihua Street during the New Year market.</figcaption></figure>

<p>For about two weeks before the Eve, Taipei's oldest wholesale street turns into the Taipei Lunar New Year Festival (年貨大街), where locals stock up on the snacks, dried goods and decorations for the holiday. In 2026 it ran from Saturday 31 January to Sunday 15 February, finishing the day before the Eve. The stalls covered Dihua Street Section 1 between Nanjing West Road and Guisui Street, plus Minsheng West Road from Yanping North Road to Huanhe North Road. Published hours differed between listings, but stalls traded from late morning until midnight.</p>

<p>The 2027 dates have not been announced. If the market follows the 2026 pattern, expect it to run from late January to Thursday 4 February. Expect samples of nuts, dried fruit, mullet roe and jerky pressed on you as you walk, as well as red couplets, lanterns and envelopes. Weekends are the most crowded; a weekday, soon after the stalls open, is calmer. The nearest MRT stations are Beimen and Daqiaotou, each eight to ten minutes' walk away. Once the market closes, the street goes quiet and many of its shops shut for the holiday itself.</p>

<p>Our <a href="/dihua-street-dadaocheng-guide#lunar-new-year">Dihua Street guide</a> covers the shops and what to buy, and the <a href="/dadaocheng-dihua-street-walk">Dadaocheng walk</a> is a route through the district that takes in the temple below.</p>



<h2 id="Temples">Temple Visits</h2>

<p>Temples are where Taipei celebrates. Families go to pray for the year ahead on the night of the Eve and on the first few days, and many people register a light (光明燈) or ask for protection if their zodiac sign clashes with the new year (安太歲). Visitors are welcome, but these are the busiest days the temples have.</p>

<figure class="wp-block-image size-large"><img width="2400" height="1600" src="${img(3)}" alt="Lantern Festival lanterns and crowds in the courtyard of Longshan Temple" loading="lazy"/><figcaption>Lanterns in the courtyard of Longshan Temple for the Year of the Dog in 2018. ${credit("https://commons.wikimedia.org/wiki/File:Mengjia_Longshan_Temple%E7%8B%97%E5%B9%B4%E5%85%83%E5%AE%B5%E5%AE%AE%E7%87%882018.jpg", "Taiwankengo", "https://creativecommons.org/licenses/by-sa/4.0", "CC BY-SA 4.0")}</figcaption></figure>

<h3>Longshan Temple</h3>

<p><a href="/longshan-temple">Longshan Temple</a> in Wanhua is the city's best-known temple and draws the biggest New Year crowds. Over the 2026 holiday it suspended its guided tours from 14 to 22 February because of the numbers. Visitors no longer burn incense here, so people pray with their hands. Registration for the year's lights opens well before the holiday (on 15 December in the run-up to 2026), and the lanterns hung for the new year stay up beyond the fifteenth day. Our <a href="/wanhua-heritage-walk">Wanhua walk</a> starts at Ximen and ends at the temple.</p>

<h3>Xiahai City God Temple and the Old Man Under the Moon</h3>

<figure class="wp-block-image size-large"><img width="1600" height="1200" src="/media/2026/08/dihua/20200116_152717.jpg" alt="Giant yellow deity lanterns outside Xiahai City God Temple on Dihua Street" loading="lazy"/><figcaption>Giant lanterns of the City God and Yue Lao outside the temple at New Year.</figcaption></figure>

<p>The small Taipei Xiahai City God Temple on Dihua Street dates from 1859. Most visitors come for Yue Lao (月下老人), whose name means the Old Man Under the Moon. He is believed to tie a red thread between people who are meant to marry. Singles buy an offering set at the counter (incense, paper money, red thread and sweets) and follow the order of prayer posted inside, in several languages. Two points of etiquette: only a blood relative may pray for someone else's match, and couples who marry often come back with wedding cakes as thanks. The temple's holiday hours aren't published online, so go early in the day. <a href="/dihua-street-dadaocheng-guide#city-god-temple">More on the temple</a>.</p>

<p>Don't confuse it with the Songshan Xiahai City God Temple on Bade Road, which is a separate temple. On the fifth day it hands out "prosperity money" for the God of Wealth, and in 2026 the queue stretched one to two kilometres back towards Songshan station.</p>

<h3>Xingtian Temple</h3>

<p>Xingtian Temple, near Xingtian Temple MRT station, is dedicated to Guan Gong and has no incense burners. Its official calendar for 2026 showed the temple open all night on the Eve, with fortune slips, the blessing ritual known as shoujing (收驚) and its other services suspended from the Eve to the fifth day and resuming on the sixth. On normal days it opens from 04:00 to 21:00. If you want to see the blue-robed volunteers perform shoujing, go after the holiday.</p>

<figure class="wp-block-image size-large"><img width="2400" height="1350" src="${img(4)}" alt="Colourful zodiac lanterns and red paper lanterns at Songshan Ciyou Temple for Lunar New Year" loading="lazy"/><figcaption>Year of the Snake lanterns at Songshan Ciyou Temple, beside Raohe Night Market, in January 2025. ${credit("https://commons.wikimedia.org/wiki/File:Songshan_Ciyou_Temple_Lunar_new_year_2025-01-29.jpg", "玄史生", "http://creativecommons.org/publicdomain/zero/1.0/deed.en", "CC0")}</figcaption></figure>

<h3>Temple etiquette</h3>

<ul>
<li>Dress as you would for any place of worship, and keep your voice down.</li>
<li>Step aside for people praying, and don't use flash near them.</li>
<li>The kneeling cushions are for prayer, not for resting on.</li>
<li>Expect to queue, and keep small children close in the crowds around midnight on the Eve.</li>
<li>Throwing the crescent moon blocks (jiaobei) and drawing a fortune stick is free at Longshan; at Xingtian, fortune slips are suspended over the holiday (see above).</li>
</ul>



<h2 id="Customs">Red Envelopes and New Year Food</h2>

<figure class="wp-block-image size-large"><img width="1600" height="1200" src="/media/2026/08/dihua/20200116_154249.jpg" alt="Red envelopes printed with gold lucky phrases for sale on Dihua Street" loading="lazy"/><figcaption>Red envelopes for sale at the New Year market.</figcaption></figure>

<p><strong>Red envelopes (紅包, hongbao).</strong> Money in a red envelope is the main New Year gift. Older relatives give them to children, and adults who earn give them to their parents and grandparents. The rules are about luck: use an even amount, avoid anything with a four in it (the word sounds like "death"), use new banknotes and leave the envelope unsealed. Taiwan News gave NT$600, NT$1,200, NT$2,200 and NT$3,600 as common sums in 2026. As a visitor you won't be expected to hand any out, unless you are staying with a Taiwanese family, in which case a small envelope for each child is a kind gesture.</p>

<p><strong>The reunion dinner.</strong> On the Eve, families gather for a long dinner at home, called weilu (圍爐, "around the stove"). Several dishes carry a wish for the year:</p>

<ul>
<li><strong>Fish:</strong> the word for fish sounds like the word for surplus, so a whole fish is served and some is left over.</li>
<li><strong>Long-year greens (長年菜):</strong> mustard greens cooked without cutting, for a long life.</li>
<li><strong>Radish cake:</strong> radish is <em>caitou</em> in Taiwanese, which sounds like "good omen".</li>
<li><strong>Fa gao (發糕):</strong> a steamed cake whose name suggests getting rich; the more it splits on top, the better.</li>
</ul>

<p>Most small restaurants close for the evening, so if you want to eat out on the Eve, a hotel restaurant is the usual choice. Book ahead.</p>

<figure class="wp-block-image size-large"><img width="2400" height="1600" src="${img(5)}" alt="Red and gold Chinese New Year decorations hanging for sale in a Taipei shop" loading="lazy"/><figcaption>Decorations on sale in a Taipei shop a few weeks before New Year. ${credit("https://commons.wikimedia.org/wiki/File:2016-12-30_Chinese_New_Year_decorations_for_sale_in_Taipei.jpg", "Jin Kemoole", "https://creativecommons.org/licenses/by/2.0", "CC BY 2.0")}</figcaption></figure>



<h2 id="Lanterns">The Lantern Festivals</h2>

<p>The New Year season ends on the fifteenth day of the first lunar month, the Lantern Festival (元宵節), which falls on Saturday 20 February 2027. Three separate events mark it near Taipei.</p>

<h3>Taiwan Lantern Festival: Miaoli, 2027</h3>

<figure class="wp-block-image size-large"><img width="2400" height="1799" src="${HERO}" alt="A giant illuminated dragon gate lantern at the Taiwan Lantern Festival in Taipei" loading="lazy"/><figcaption>A dragon gate at the 2023 Taiwan Lantern Festival, the last time the national event came to Taipei. ${credit("https://commons.wikimedia.org/wiki/File:2023_Taiwan_Lantern_Festival_in_Taipei.jpg", "HC Lin", "https://creativecommons.org/licenses/by/2.0", "CC BY 2.0")}</figcaption></figure>

<p>The national Lantern Festival moves to a different county each year. In 2027 it is the turn of Miaoli County, which has set provisional dates of 20 February to 7 March. Its single lantern area, about 30 hectares, is planned around the high-speed rail station in Houlong, so it is a day trip from Taipei by HSR. The theme is mountains and sea. Expect the official programme and opening hours to be published nearer the time.</p>

<h3>Taipei Lantern Festival</h3>

<figure class="wp-block-image size-large"><img width="2400" height="1602" src="${img(1)}" alt="Visitors walking through a glowing orange dragon tunnel at the Taipei Lantern Festival" loading="lazy"/><figcaption>A dragon tunnel at the 2024 Taipei Lantern Festival. ${credit("https://commons.wikimedia.org/wiki/File:%E5%8F%B0%E5%8C%97%E7%87%88%E6%9C%83-%E9%BE%8D%E6%98%A0%E8%BA%AB.jpg", "簡賜郎", "https://creativecommons.org/licenses/by-sa/4.0", "CC BY-SA 4.0")}</figcaption></figure>

<p>Taipei's city government puts on its own festival every year, and its timing varies. In 2025 it ran from 2 to 16 February across four zones between Ximen and Beimen MRT stations. In 2026 it ran from 25 February to 15 March, in two zones, one in Ximending and one at Expo Park in Yuanshan. Lights came on at 17:00 and went off at 22:00, with earlier openings at weekends and on holidays. The 2027 dates and sites haven't been announced; look for an official site under travel.taipei.</p>

<h3>Pingxi Sky Lantern Festival</h3>

<figure class="wp-block-image size-large"><img width="1734" height="1000" src="${img(2)}" alt="Glowing sky lanterns drifting into the dark sky over Pingxi" loading="lazy"/><figcaption>A mass release at the Pingxi Sky Lantern Festival. ${credit("https://commons.wikimedia.org/wiki/File:SkyLanternFestivalPic.jpg", "Mathgeek1978", "https://creativecommons.org/licenses/by/4.0", "CC BY 4.0")}</figcaption></figure>

<p>In the hills east of Taipei, New Taipei City releases paper sky lanterns in timed waves. Last time it ran over two evenings, one at the school in Pingxi and one at Shifen Square on Lantern Festival night, with 100 to 150 lanterns going up in each wave. Launch tickets cost nothing but went fast, either online in advance or at the venue on the morning. The 2027 dates haven't been announced, but expect one or two nights close to 20 February. For the train line, lantern rules and waterfall, see <a href="/shifen-pingxi-day-trip">our Shifen and Pingxi day trip</a>.</p>

<p>Getting there on a festival night takes planning. In 2026, private cars and scooters needed a pass to enter from 10:00 and were banned completely from 16:00 to 23:00. Extra Pingxi line trains and special festival buses filled the gap. The simplest route is the train to Ruifang and then the Pingxi branch line; the Tourist Shuttle bus 795 also runs from Muzha MRT station.</p>

<p>On any other day of the year you can release a lantern of your own at Shifen Old Street. Klook sells a ${activity("shifen-sky-lantern", "Shifen sky lantern experience")} that you redeem at a lantern shop on the street, and a ${activity("pingxi-day-pass-sky-lantern", "Pingxi line day pass with a lantern")}, collected at Ruifang station. The ${activity("yehliu-jiufen-shifen-day-tour", "Yehliu, Jiufen and Shifen day tour")} from Taipei also stops at Shifen for a lantern. Our <a href="/jiufen">Jiufen day trip guide</a> covers the rest of that coast.</p>



<h2 id="What-Closes">What Closes Over New Year</h2>

<p>The pattern is roughly the same every year, though each business sets its own days, so check anywhere you particularly want to visit.</p>

<ul>
<li><strong>The days before the Eve:</strong> normal opening, with markets busy with New Year shopping.</li>
<li><strong>The Eve (Friday 5 February 2027):</strong> the quietest day. Most independent restaurants and bars close. In his 2026 guide, Nick Kembel of Taiwan Obsessed listed the National Palace Museum, Taipei Zoo, the Maokong Gondola and the Children's Amusement Park as closed on the Eve, Taipei 101's observatory on shorter hours and no changing of the guard at Chiang Kai-shek Memorial Hall. The zoo normally closes on the Eve and no other day. The Palace Museum has in some years opened until 16:00 instead, so check its notice.</li>
<li><strong>Days one to three:</strong> department stores, chains, the big sights and the temples are open, and crowded. Many family-run restaurants and small shops stay shut. Night markets officially keep trading, but expect many stalls to be missing.</li>
<li><strong>Days four to six:</strong> more places reopen each day, and most are back by the end of the holiday. Some small businesses take an extra few days.</li>
<li><strong>Always open:</strong> 7-Eleven, FamilyMart and the other convenience stores, which are where to find a hot meal, an ATM and an EasyCard top-up on the Eve.</li>
</ul>

<p>If you are in Taipei for the whole holiday, plan the Eve around your hotel and the nearest convenience store.</p>



<h2 id="Getting-Around">Getting Around</h2>

<p><strong>The MRT</strong> keeps running throughout. In 2026 every line ran a holiday timetable for the nine-day break, with trains every 2.5 to 9.5 minutes on the main lines, about every 12 minutes late at night and every 10 to 20 minutes on the Xinbeitou and Xiaobitan branches. Service at Longshan Temple, Tamsui and Taipei Zoo stations was adjusted to the crowds. Unlike on 31 December, we found no all-night service announced for Lunar New Year's Eve. Our <a href="/taipei-public-transport#mrt">transport guide</a> covers fares and passes.</p>

<p><strong>Intercity trains are the problem.</strong> Much of the country travels home before the Eve and back on the last days, and seats on popular trains go quickly once sales open. In 2026, Taiwan Railway opened bookings for its holiday period (12 to 23 February) at midnight on 13 January for the eastern line and 14 January for the western line, about a month ahead. On the western line, unreserved seating on the new EMU3000 trains was replaced by 250 standing tickets per train, sold on the day. The high-speed rail opened its holiday bookings at midnight on 16 January and added 395 trains between 13 and 23 February. The 2027 booking dates haven't been announced; on the 2026 pattern, expect them in early January 2027. See our guide to <a href="/taipei-public-transport#Beyond-Taipei">trains beyond Taipei</a>.</p>

<p>Tips if you need to leave the city:</p>

<ul>
<li>Travel against the flow: out of Taipei on the first or second day, and back a day or two before the holiday ends.</li>
<li>Set an alarm for the opening minute of sales, and have the booking site or app ready.</li>
<li>Expect motorway jams at the start and end of the holiday, which slow coaches as well as cars.</li>
<li>Stay in Taipei for the Eve. It is a quiet, family night everywhere, so there is little to gain from being elsewhere.</li>
</ul>



<h2 id="Booking-Ahead">Booking Ahead</h2>

<p><strong>Hotels.</strong> New Year is normally a quiet season for Taipei hotels, since so many residents leave. In 2026 that changed somewhat, with more visitors from Hong Kong, Macau and South Korea. The Commercial Times reported occupancy of about 80% and an average rate of NT$7,200 at the Regent over the nine days, up 4% on the year before, and 95% occupancy at the Caesar Park hotels in Taipei and Banqiao. Average rates rose by only a few per cent. For the Dihua market and the temples, stay in <a href="/hotels-in-zhongshan">Zhongshan</a> or around <a href="/hotels-near-ximending">Ximending</a>, which in recent years has also hosted part of the Taipei Lantern Festival. If you are taking the train to Miaoli or elsewhere, <a href="/hotels-near-taipei-main-station">hotels near Taipei Main Station</a> make it easy. For a comparison of the main areas, see <a href="/best-areas-and-hotels-to-stay">where to stay in Taipei</a>.</p>

<p><strong>Trains:</strong> book the day sales open (see above). <strong>Restaurants:</strong> book well ahead for dinner on the Eve. <strong>Lantern tours:</strong> the Klook products above run all year, but the festival nights themselves need no ticket beyond the free release tickets.</p>

<p>If you are still deciding when to go, our <a href="/best-time-to-visit-taipei#February">month-by-month guide</a> weighs February against the rest of the year.</p>



<h2 id="FAQ">Lunar New Year FAQ</h2>

<h3>When is Lunar New Year in 2027?</h3>

<p>New Year's Day is Saturday 6 February 2027 and the Eve is Friday 5 February. Government offices are closed from Thursday 4 to Wednesday 10 February, and most businesses follow.</p>

<h3>Is it a good time to visit Taipei?</h3>

<p>It depends on what you want. The run-up, with the Dihua market and the decorations, is a lively time to be in the city. The Eve and the first two days are quiet, with many restaurants closed, but the temples are at their busiest. Avoid the holiday if you want to travel around Taiwan by train, since seats are hard to get.</p>

<h3>Will restaurants be open?</h3>

<p>Hotel restaurants, chains, department store food courts and convenience stores stay open. Many small, family-run places close on the Eve and for at least the first two or three days.</p>

<h3>Does the MRT run over New Year?</h3>

<p>Yes, every day, on a holiday timetable. We found no all-night service announced for the Eve, unlike on 31 December.</p>

<h3>When is the Lantern Festival in 2027?</h3>

<p>The Lantern Festival itself is Saturday 20 February 2027. The national festival in Miaoli is provisionally 20 February to 7 March. Taipei's and Pingxi's events haven't announced dates yet.</p>

<h3>Do I need to give red envelopes?</h3>

<p>No, not as a visitor. If you are staying with a Taiwanese family, a red envelope with an even amount of crisp new notes for each child is a kind gesture. Avoid amounts containing a four.</p>

<h3>Can I visit temples at New Year?</h3>

<p>Yes, and many people do. Expect crowds at midnight on the Eve and on the first day. Be patient, give worshippers space, and remember that some services, such as fortune slips at Xingtian Temple, are paused for the holiday.</p>
`;

// ---- Guarded link paragraphs in related posts -----------------------------
const LINKS = [
  {
    slug: "dadaocheng-dihua-street-walk",
    find: "and the market normally runs for about two weeks before it.</p>",
    replace: `and the market normally runs for about two weeks before it. For the rest of the holiday, from temple visits to what shuts, see our <a href="/${SLUG}">guide to Lunar New Year in Taipei</a>.</p>`,
  },
  {
    slug: "longshan-temple",
    find: "Avoid Lunar New Year and the birthdays of the major deities unless crowds are the point &ndash; those are the busiest days of the year here.</p>",
    replace: `Avoid Lunar New Year and the birthdays of the major deities unless crowds are the point &ndash; those are the busiest days of the year here. If you do want to see the temple at New Year, our <a href="/${SLUG}">Lunar New Year guide</a> has the 2027 dates and what to expect.</p>`,
  },
  {
    slug: "best-time-to-visit-taipei",
    find: `<p><a href="/taipei-annual-events#February">See exact 2026 dates for February's events &rarr;</a></p>`,
    replace: `<p>Lunar New Year falls on 6 February in 2027. For the holiday dates, the lantern festivals and what closes, see <a href="/${SLUG}">Lunar New Year in Taipei</a>.</p>\n\n<p><a href="/taipei-annual-events#February">See exact 2026 dates for February's events &rarr;</a></p>`,
  },
];

// ---------------------------------------------------------------------------
const filePath = path.resolve(process.env.POSTS_PATH || "content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const fail = (m) => { console.error(`${m} - aborting, nothing written.`); process.exit(1); };

if (posts.some((p) => p.slug === SLUG)) fail(`/${SLUG} already exists`);

// Photos: every source must exist before anything is copied.
for (const [src] of COPIES) if (!fs.existsSync(path.resolve(SRC_DIR, src))) fail(`missing source photo ${SRC_DIR}/${src}`);

// Internal links: the post must exist, and any #anchor must be an id in it.
const bySlug = new Map(posts.map((p) => [p.slug, p]));
const hasId = (html, id) => new RegExp(`id=["']${id}["']`).test(html);
for (const [, s, anchor] of CONTENT.matchAll(/href="\/([^"#?]+)(?:#([^"]+))?"/g)) {
  const target = bySlug.get(s);
  if (!target) fail(`internal link /${s} has no post`);
  if (anchor && !hasId(target.content, anchor)) fail(`/${s}#${anchor} has no matching id`);
}
for (const [, anchor] of CONTENT.matchAll(/href="#([^"]+)"/g)) {
  if (!hasId(CONTENT, anchor)) fail(`#${anchor} has no matching id in the new post`);
}
// Every Klook link must carry the affiliate id.
const klookLinks = [...CONTENT.matchAll(/href="(https:\/\/www\.klook\.com[^"]+)"/g)].map((m) => m[1]);
for (const u of klookLinks) if (!u.endsWith("?aid=8733")) fail(`Klook link without aid: ${u}`);

// Every image needs width and height; site photos must already exist; every
// photo from this post's Commons folder must be credited in its figcaption.
for (const [tag, src] of CONTENT.matchAll(/<img\b[^>]*src="([^"]+)"[^>]*>/g)) {
  if (!/\bwidth="\d+"/.test(tag) || !/\bheight="\d+"/.test(tag)) fail(`image without dimensions: ${src}`);
  if (!src.startsWith(MEDIA) && !fs.existsSync(path.resolve("public" + src))) fail(`missing image file public${src}`);
}
const figures = CONTENT.match(/<figure class="wp-block-image[^"]*"><img[\s\S]*?<\/figure>/g) || [];
for (const fig of figures) {
  if (fig.includes(`src="${MEDIA}/`) && !/Photo: <a href="https:\/\/commons\.wikimedia\.org\/[^"]+">[^<]+<\/a>, <a href="https?:\/\/creativecommons\.org\//.test(fig)) {
    fail(`uncredited Commons figure: ${fig.slice(0, 120)}`);
  }
}
if (!CONTENT.includes(`src="${HERO}"`)) fail("hero is not in the body, so its credit is missing");
if (CONTENT.indexOf(`src="${HERO}"`) < CONTENT.indexOf("<h2")) fail("hero must come after the first h2");

// Link paragraphs: dry-run every edit first so nothing is half-applied.
const edits = [];
for (const { slug, find, replace } of LINKS) {
  const post = bySlug.get(slug);
  if (!post) fail(`/${slug} not found`);
  if (post.content.includes(`href="/${SLUG}"`)) { console.log(`  /${slug} already links here - left alone`); continue; }
  const n = post.content.split(find).length - 1;
  if (n !== 1) fail(`/${slug}: expected the anchor text once, found ${n}`);
  edits.push([post, find, replace]);
}

const title = "Lunar New Year in Taipei 2027: Dates, Lanterns & Closures";
if (title.length > 60) fail(`title is ${title.length} chars`);

// All checks passed: copy photos, apply edits, add the post.
const destDir = path.resolve("public" + MEDIA);
fs.mkdirSync(destDir, { recursive: true });
for (const [src, dest] of COPIES) fs.copyFileSync(path.resolve(SRC_DIR, src), path.join(destDir, dest));

for (const [post, find, replace] of edits) {
  post.content = post.content.replace(find, () => replace);
  post.modified = TODAY;
}

posts.push({
  id: Math.max(...posts.map((p) => p.id || 0)) + 1,
  authorId: 2,
  date: TODAY,
  modified: TODAY,
  slug: SLUG,
  title,
  excerpt:
    "Lunar New Year 2027 in Taipei: the holiday dates, the Dihua Street market, temple visits and customs, the Taipei, Pingxi and Miaoli lantern festivals, what closes and how to get around.",
  type: "post",
  parentId: 0,
  content: CONTENT,
  categories: [{ name: "Events", slug: "events" }, { name: "Festivals", slug: "festivals" }],
  tags: [{ name: "Essential", slug: "essential" }, { name: "Free", slug: "free" }],
  featuredImage: HERO,
});

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2) + "\n");

console.log(`Added /${SLUG} to ${filePath}`);
console.log(`  title: ${title} (${title.length})`);
console.log(`  ${CONTENT.length} chars, ${figures.length} photos (${COPIES.length} copied to public${MEDIA}), ${klookLinks.length} Klook links`);
for (const [post] of edits) console.log(`  linked from /${post.slug}`);
