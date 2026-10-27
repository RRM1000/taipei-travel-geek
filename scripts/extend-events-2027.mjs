// Extends the annual events calendar (taipei-annual-events) through 2027 to match
// content/events.json: fixes the 2026 entries that were wrong (book fair, charity
// marathon, COMPUTEX, Ghost Month, Taipei Lantern Festival, the golf event's name),
// adds the year to the January-July headings, and appends a full 2027 calendar.
// Each find must occur exactly once in the page, or nothing is written.
// Usage: node scripts/extend-events-2027.mjs content/posts.json [--write]
import fs from "node:fs";

const [file, write] = process.argv.slice(2);
if (!file) { console.error("usage: node scripts/extend-events-2027.mjs content/posts.json [--write]"); process.exit(1); }
const posts = JSON.parse(fs.readFileSync(file, "utf8"));
const SLUG = "taipei-annual-events";
const post = posts.find((p) => p.slug === SLUG);
if (!post) { console.error(`${SLUG} not found - nothing written`); process.exit(1); }

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const li = (name, desc, when) => ` <li><strong>${name}</strong> – ${desc} – <strong>${when}</strong></li>`;
const ul = (...items) => `<ul>\n${items.join("\n")}\n</ul>`;
const month = (m, ...items) => `\n\n\n\n<h2 id="${m}-2027">${m} 2027</h2>\n\n${ul(...items)}`;
const TBC = "(2027 dates TBC)";

const grid2027 = `<div class="calendar-month-grid" aria-label="Jump to a month in 2027">\n${MONTHS.map((m) => ` <a href="#${m}-2027" class="calendar-month-card">
  <div class="calendar-card-header">${m.slice(0, 3).toUpperCase()}</div>
  <div class="calendar-card-body">
   <span class="month-title">${m}</span>
   <span class="calendar-card-arrow">↓</span>
  </div>
 </a>`).join("\n")}\n</div>`;

const DIHUA = '<a href="/dihua-street-dadaocheng-guide">Dihua Street</a>';
const cal2027 = `\n\n\n\n<h2 id="2027">Taipei Events Calendar 2027</h2>

<p>Lunar New Year falls early in 2027, on February 6, so the Lantern Festival, Pingxi's sky lanterns and the Taiwan Lantern Festival all move to the second half of February. The lunar festivals and public holidays below are fixed. Most organisers haven't announced their 2027 dates yet, so those events are marked TBC with their usual timing, and I'll update them as the dates are confirmed.</p>

${grid2027}`
+ month("January",
  li("Standard Chartered Taipei Charity Marathon (渣打臺北公益馬拉松)", "Charity road race through the city streets, with full, half, 12km and 3km courses", "Sunday, January 10, 2027"),
  li("Taipei Game Show (台北國際電玩展)", "One of Asia's biggest video game expos, with new releases to play and an indie games zone, at Nangang Exhibition Center", "Thursday, January 21 – Sunday, January 24, 2027"),
  li("Taipei Lunar New Year Festival (Dihua Street Market)", `Festive holiday market selling traditional snacks, dried fruits, teas and red decorations along historic ${DIHUA}`, "Late January to early February 2027 (dates TBC – it usually runs for the two weeks before Lunar New Year's Eve)"),
  li("Pingjing Street 42 Cherry Blossoms", "The earliest cherry blossom bloom in the Taipei area, located in Yangmingshan", "Usually late January to mid-February (2027 bloom TBC)"),
  li("Presidential Building &amp; Guest House Open Days", "Rare opportunity to tour the historic Japanese-era interior of the Presidential Office Building", "Check official schedule"),
  li("Beitou &amp; Wulai Winter Hot Spring Season", "Peak season to relax in natural sulphur and sodium bicarbonate hot spring baths", "All January"),
)
+ month("February",
  li("Lunar New Year (Year of the Goat)", "Taiwan's biggest annual holiday. Expect family reunions, temple incense offerings and quiet streets, with many shops and restaurants closed for the first few days", "Saturday, February 6, 2027 (public holiday Thursday, February 4 – Wednesday, February 10)"),
  li("Taipei Lantern Festival", "Spectacular light installations, giant themed lanterns and cultural shows in the west of the city", `Mid-February to early March 2027 ${TBC}`),
  li("Pingxi Sky Lantern Festival", "Thousands of glowing sky lanterns released over Pingxi", "Around the Lantern Festival on Saturday, February 20, 2027 (release dates TBC)"),
  li("Taiwan Lantern Festival 2027 (Miaoli)", "The nationwide Lantern Festival, hosted by Miaoli County in 2027, with the lantern area planned around the Miaoli high-speed rail station – under an hour from Taipei by HSR", "February 20 – March 7, 2027 (provisional)"),
  li("LOHAS Park Night Cherry Blossom Festival (Neihu)", "Illuminated pink cherry trees along the Neihu River trail, open for evening strolls", `Usually February ${TBC}`),
  li("Yangmingshan Flower Festival", 'Cherry blossoms, azaleas and camellias blooming across <a href="/yangmingshan-national-park">Yangmingshan National Park</a>', `Usually mid-February to mid-March ${TBC}`),
  li('Tianyuan Temple Tri-Colour Cherry Blossoms (<a href="/tamsui">Tamsui</a>)', "Hundreds of cherry trees on the hillside behind Wuji Tianyuan Temple, lit up in the evenings during the festival", `Usually late January to mid-February ${TBC}`),
  li("Taipei International Book Exhibition (TIBE)", "Major international publishing fair held at the Taipei World Trade Center", "Late January or February 2027 (dates TBC – it moves around Lunar New Year)"),
)
+ month("March",
  li('<a href="/lamigos-at-taoyuan-baseball-stadium">Taiwan Baseball League season begins</a>', "Watch the CPBL at grounds across the city and in Taoyuan", "March to late September 2027 (schedule TBC)"),
  li('<a href="/taiwan-lpga-golf-championship">Taiwan Foxconn Ladies Golf Tournament</a>', "A JLPGA Tour event with a US$2 million purse in 2026, at Orient Golf &amp; Country Club in Taoyuan", "Mid-March in 2026 (2027 dates TBC)"),
  li("Zhuzihu Calla Lily Festival", "Sea of white calla lilies filling the volcanic fields of Zhuzihu in Yangmingshan, with hand-picking", `Usually mid-March to late April ${TBC}`),
  li("Taipei Azalea Festival", "Celebrating Taipei's official city flower with concerts, picnic markets and floral art around Daan Forest Park &amp; NTU campus", `Usually March ${TBC}`),
  li('Tianyuan Temple Yoshino Cherry Blossoms (<a href="/tamsui">Tamsui</a>)', "The second, later bloom at Tianyuan Temple, with Yoshino cherries surrounding the round Tiantan hall. Busiest at weekends and worth going early", "Usually mid-March to mid-April (2027 bloom TBC)"),
  li("Dalongdong Baoan Temple Cultural Festival", "Traditional Taiwanese temple rituals, folk opera performances and lion dances", `Usually late March to April ${TBC}`),
)
+ month("April",
  li("Qingming Festival (Tomb Sweeping Day Holiday)", "Spring public holiday with traditional family outings and spring hikes", "Monday, April 5, 2027 (four-day weekend Saturday, April 3 – Tuesday, April 6)"),
  li("Baosheng Emperor Cultural Festival", 'Grand temple procession, fire-walking rituals and traditional performing arts at <a href="/dalongdong-baoan-temple-and-gardens">Dalongdong Baoan Temple</a> – in April this year, as the lunar birthday falls earlier than in 2026', "Around the Baosheng Emperor's birthday on Wednesday, April 21, 2027 (programme TBC)"),
  li("Wulai &amp; Muzha Firefly Festival", "Guided evening walks to see thousands of fireflies glowing along mountain trails", `Usually mid-April to May ${TBC}`),
  li("Zhuzihu Calla Lily Season", "Continuing peak season for picking calla lilies in Yangmingshan", "Through April 2027"),
  li("Urban Spring Hiking Season", "Ideal mild spring weather for hiking Elephant Mountain, Four Beasts and Xiangshan trails", "All April"),
)
+ month("May",
  li("Zhuzihu Hydrangea Festival", "Fields of blue, purple and pink hydrangeas blooming across Yangmingshan's mountain terraces", `Usually May to June ${TBC}`),
  li("Taipei Outdoor Live Concert Season", "Spring music events and outdoor acoustic sessions across Taipei Music Center and Huashan 1914", "May 2027"),
)
+ month("June",
  li("Dragon Boat Festival (Duanwu Festival)", "International dragon boat races along the Keelung River at Dajia Riverside Park, with traditional rice dumplings (zongzi)", "Wednesday, June 9, 2027 (midweek, so no long weekend)"),
  li("Fresh Taiwanese Mango Season", 'Peak harvest season for sweet Irwin mangoes, piled onto shaved ice across <a href="/yongkang-street">Yongkang Street</a>', "June to August 2027"),
  li("COMPUTEX Taipei", "One of the world's leading technology and hardware expos, at Nangang Exhibition Center and the World Trade Center", "Tuesday, June 1 – Friday, June 4, 2027"),
)
+ month("July",
  li("Dadaocheng Summer Festival", "Weekly Wednesday night fireworks over the Tamsui River, food trucks and live music at Yanping Riverside Park", `Usually mid-July to late August ${TBC}`),
  li("Taipei Film Festival", "The city's main summer film festival, strong on independent cinema and Taiwanese filmmakers", `Usually late June to mid-July ${TBC}`),
  li("Summer Water Park Season", "Water activities and splash events at Taipei Water Park in Gongguan", "July to August 2027"),
)
+ month("August",
  li("Ghost Month (Hungry Ghost Festival / 中元節)", "Traditional month-long folk festival with temple incense offerings and spirit rituals", "August 2 – August 31, 2027 (Ghost Festival Main Day: Monday, August 16, 2027)"),
  li("Qixi Festival (Chinese Valentine's Day / 七夕)", "Evening celebrations and romantic events", "Sunday, August 8, 2027"),
  li("Dadaocheng Summer Festival Fireworks", "Weekly Wednesday fireworks along the Tamsui River, building to a grand finale weekend", `Usually through August ${TBC}`),
  li("New Taipei River &amp; Ocean Music Festival (新北市河海音樂季)", "Free outdoor indie rock, reggae and beach concerts along the waterfront at Tamsui Fisherman's Wharf", `Usually early to mid-August ${TBC}`),
  li("Creative Expo Taiwan (臺灣文博會)", "Taiwan's premier design, illustration, character IP and cultural goods exhibition at Nangang Exhibition Center", `Usually mid to late August ${TBC}`),
  li("Taipei Fringe Festival (台北藝穗節)", "Indie theatre, music, dance, comedy and performance art across non-traditional venues", `Usually late August to September ${TBC}`),
  li("Taipei Burger Carnival (台北漢堡狂歡節)", "City-wide burger festival with participating restaurants competing for the title, and set menus across the month", `Usually August ${TBC}`),
  li("NTCH Summer Jazz Outdoor Party (兩廳院夏日爵士戶外派對)", "Free open-air jazz on the plaza at the National Theater &amp; Concert Hall", "Usually a Saturday in mid-August (2027 date TBC)"),
  li("Trendy Taipei (台北時尚週)", "City-wide shopping and design event, with pop-ups and promotions across the main retail districts", `Usually late August to early September ${TBC}`),
  li("Taipei Children's Arts Festival (台北兒童藝術節)", "Theatre, puppetry and hands-on workshops aimed squarely at families, much of it free", `Usually late August to early September ${TBC}`),
  li("Herbal Party (青草派對)", 'Herbal medicine, tea and craft market through the old streets of <a href="/dihua-street-dadaocheng-guide">Dadaocheng</a>', `Usually late August ${TBC}`),
  li("Jam Jam Asia Music Festival (亞洲音樂節)", "Asian pop, indie and electronic acts from Taiwan, Japan, Korea and Southeast Asia at Taipei Music Center", `Usually late August ${TBC}`),
)
+ month("September",
  li("Taipei Night Market Festival (台北夜市嘉年華)", 'City-wide street food celebration with voting for top food stalls and discount vouchers across Ningxia, Raohe, <a href="/shilin-night-market">Shilin</a> and Huaxi markets', `Usually September to October ${TBC}`),
  li("Mid-Autumn Moon Festival (Zhongqiu Festival / 中秋節)", "Major national holiday famous for street barbecues, mooncakes and pomelos", "Wednesday, September 15, 2027 (midweek, so no long weekend this year)"),
  li("Confucius Birthday &amp; Teachers' Day (教師節)", 'A 6am dawn ceremony with traditional eight-row dance at the <a href="/confucius-temple">Taipei Confucius Temple</a>', "Tuesday, September 28, 2027"),
  li("Taipei Arts Festival (臺北藝術節)", "The city's flagship contemporary performing arts festival, from theatre to dance across multiple venues", `Usually September ${TBC}`),
)
+ month("October",
  li("Double Tenth National Day (國慶日)", 'Flag ceremonies, cultural performances and parades at the <a href="/presidential-office-building">Presidential Office Building</a>', "Sunday, October 10, 2027 (long weekend Saturday, October 9 – Monday, October 11)"),
  li("Taipei International Beef Noodle Festival (台北國際牛肉麵節)", "Chefs compete for the city's best braised and creative beef noodles, with public tasting stalls", `Usually early to mid-October ${TBC}`),
  li('<a href="/taipei-jazz-festival">Taipei Jazz Festival (台北爵士音樂節)</a>', "Free outdoor live jazz on the main stage at Daan Forest Park", `Usually late October ${TBC}`),
  li("Art Taipei (台北國際藝術博覽會)", "Asia's premier international art fair at the Taipei World Trade Center", `Usually late October ${TBC}`),
  li("Taiwan LGBT+ Pride Parade (台灣同志遊行)", "The largest Pride celebration in Asia, marching through central Taipei to Ximending", "Usually the last Saturday of October: Saturday, October 30, 2027 (TBC)"),
  li("Taipei Autumn Running Season", "Trail and road races in quick succession, including the Northernmost Point Trail, Maokong Night Trail and Pocari Sweat Run", "Usually October (2027 races TBC)"),
  li("Taipei Hakka Yimin Festival (台北客家義民嘉年華)", "Hakka culture, food stalls and the striking neon-lit sacrificial pig parade", `Usually late October ${TBC}`),
)
+ month("November",
  li("WBSC Premier12 (世界12強棒球賽)", "Taiwan, the 2024 champions, play the opening round at home, with the opening and second rounds at the Taipei Dome. The Super Round and medal games are in Tokyo", "Monday, November 8 – Monday, November 15, 2027 (Taipei rounds)"),
  li("Nuit Blanche Taipei (白晝之夜)", "All-night 12-hour arts festival from 6pm to 6am across a chosen Taipei district", "Early November in 2026 (2027 date TBC)"),
  li('Taipei Hot Spring Season (台北溫泉季)', 'Celebrating Beitou\'s thermal bath culture with Mikoshi shrine parades, cultural tours and hot spring pass discounts in <a href="/xinbeitou">Xinbeitou</a>', `Usually late October to early November ${TBC}`),
  li("Taipei Wine &amp; Spirits Festival (台北國際酒展)", "Taiwan's largest drinks expo, with wine, craft beer and sake tastings at Nangang Exhibition Center", `Usually mid-November ${TBC}`),
  li("Ultra Taiwan (Ultra 台灣獨立電子音樂節)", "Huge international EDM festival with top-ranked DJs at Dajia Riverside Park", "Mid-November in 2026 (2027 dates TBC)"),
  li("Christmasland in New Taipei City (新北歡樂耶誕城)", "Huge 3D light projection show and holiday markets at Banqiao Station Plaza", `Usually mid-November to early January ${TBC}`),
  li("Golden Horse Film Festival &amp; Awards (金馬影展)", "Asia's most prestigious Chinese-language film festival", "Usually November, with the awards late in the month (2027 dates TBC)"),
  li("Shilin Residence Chrysanthemum Show (士林官邸菊展)", 'Grand floral topiary and outdoor music at the <a href="/chiang-kai-shek-shilin-residence">Chiang Kai-shek Shilin Residence</a>', `Usually late November to mid-December ${TBC}`),
)
+ month("December",
  li("Christmasland in New Taipei City", "Holiday light displays, pop concerts and winter markets through the month", "All December 2027 into early January 2028 (dates TBC)"),
  li("Shilin Residence Chrysanthemum Show", "Continuing floral exhibition", "Usually into mid-December (2027 dates TBC)"),
  li("Taipei Marathon (台北馬拉松)", "Taiwan's flagship international marathon", "Usually the third Sunday of December: Sunday, December 19, 2027 (TBC)"),
  li("Taipei Illustration Fair (台北插畫藝術節)", 'Independent prints and zines at <a href="/songshan-cultural-and-creative-park">Songshan Cultural and Creative Park</a>', `Usually mid-December ${TBC}`),
  li('<a href="/taipei-101-fireworks-new-years-eve">Taipei 101 New Year\'s Eve Fireworks</a> &amp; Countdown Concert (台北最High新年城)', "Countdown concert at City Hall and midnight fireworks off Taipei 101", "Friday, December 31, 2027 (a public holiday this year, as New Year's Day falls on a Saturday)"),
);

const NYE_2026 = ` <li><strong>Taipei 101 New Year's Eve Fireworks &amp; Countdown Concert (台北最High新年城)</strong> – World-famous countdown concert at City Hall and midnight fireworks off Taipei 101 – <strong>Thursday, December 31, 2026</strong></li>\n</ul>`;
const BEITOU_2026 = ` <li><strong>Beitou &amp; Wulai Winter Hot Spring Season</strong> – Peak season to relax in natural sulfur and sodium bicarbonate hot spring baths – <strong>All January</strong></li>`;
const TIANYUAN_2026 = ` <li><strong>Tianyuan Temple Tri-Colour Cherry Blossoms (<a href="/tamsui">Tamsui</a>)</strong> – Hundreds of cherry trees on the hillside behind Wuji Tianyuan Temple, lit up in the evenings during the festival. Free, and the rear garden opens from 06:00 – <strong>January 29 to February 11, 2026</strong></li>`;
const TIBE_MARCH = `\n <li><strong>Taipei International Book Exhibition (TIBE)</strong> – Major international publishing fair held at the Taipei World Trade Center – <strong>Early March 2026</strong></li>`;
const SC_NOV = `\n <li><strong>Standard Chartered Taipei Marathon</strong> – Charity road race through Taipei city streets – <strong>Sunday, November 8, 2026</strong></li>`;
const LPGA = ` <li><strong><a href="/taiwan-lpga-golf-championship">Taiwan LPGA golf championship</a></strong> – One of the best women's golf events in the world, about 90 minutes from Taipei – <strong>March 12–15, 2026</strong></li>`;
const TPE_LANTERN = ` <li><strong>Taipei Lantern Festival</strong> – Spectacular light installations, giant themed lanterns, and cultural shows around Ximending and the North Gate – <strong>Late February to March 8, 2026</strong></li>`;

const E = [
  ["<p>Here is your complete guide to the major annual events in Taipei for 2026, organized by month.</p>",
   `<p>Here is your complete guide to the major annual events in Taipei for 2026 and 2027, organized by month. The <a href="#2027">2027 calendar</a> follows on from December 2026; most 2027 festival dates haven't been announced yet, so those are marked TBC with their usual timing.</p>`],
  ...MONTHS.slice(0, 7).map((m) => [`<h2 id="${m}">${m}</h2>`, `<h2 id="${m}">${m} 2026</h2>`]),
  [BEITOU_2026, `${BEITOU_2026}\n <li><strong>Standard Chartered Taipei Charity Marathon (渣打臺北公益馬拉松)</strong> – Charity road race through Taipei city streets – <strong>Sunday, January 11, 2026</strong></li>`],
  [TIANYUAN_2026, `${TIANYUAN_2026}\n <li><strong>Taipei International Book Exhibition (TIBE)</strong> – Major international publishing fair held at the Taipei World Trade Center – <strong>February 3–8, 2026</strong></li>`],
  [TPE_LANTERN, TPE_LANTERN.replace("Late February to March 8, 2026", "February 25 to March 15, 2026")],
  [TIBE_MARCH, ""],
  [LPGA, ` <li><strong><a href="/taiwan-lpga-golf-championship">Taiwan Foxconn Ladies Golf Tournament</a></strong> – A JLPGA Tour event with a US$2 million purse, at Orient Golf &amp; Country Club in Taoyuan – <strong>March 12–15, 2026</strong></li>`],
  ["<strong>Early June 2026</strong>", "<strong>June 2–5, 2026</strong>"],
  ["August 13 – September 11, 2026", "August 13 – September 10, 2026"],
  [SC_NOV, ""],
  [NYE_2026, NYE_2026 + cal2027],
];

let ok = true;
let content = post.content;
for (const [find, rep] of E) {
  const n = content.split(find).length - 1;
  console.log(`${n === 1 ? "ok " : "BAD"} ${n}x  ${find.trim().slice(0, 70)}`);
  if (n !== 1) { ok = false; continue; }
  content = content.replace(find, () => rep);
}
if (!ok) { console.error("not every find matched exactly once - nothing written"); process.exit(1); }

post.content = content;
post.title = "Taipei Annual Events Calendar 2026–2027";
post.excerpt = "A complete month-by-month guide to major annual events, festivals, cherry blossom seasons, fireworks, and cultural celebrations in Taipei during 2026 and 2027.";
post.modified = "2026-10-27 12:00:00";
if (write) {
  fs.writeFileSync(file, JSON.stringify(posts, null, 2) + "\n");
  console.log("written");
} else {
  console.log("dry run - pass --write to save");
}
