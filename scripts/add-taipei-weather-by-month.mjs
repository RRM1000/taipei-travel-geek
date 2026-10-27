// New guide: Taipei weather by month, and typhoon season.
//
// WHY THIS PAGE. /best-time-to-visit-taipei is built around events and gives
// rounded temperature ranges with no source. Readers searching for "Taipei
// weather in <month>" or "Taipei typhoon season" want the actual figures,
// what a typhoon does to a trip, and what to pack. This page is the
// weather reference; best-time stays the events guide, and the two link to
// each other.
//
// SOURCING (checked 28 Oct 2026).
// - Climate: Central Weather Administration (CWA) Monthly Mean, 1991-2020
//   normals, Taipei station (and Zhuzihu for Yangmingshan):
//   https://www.cwa.gov.tw/V8/E/C/Statistics/monthlymean.html
//   Items used: Mean Maximum / Mean Minimum Temperature, Precipitation,
//   Number of Days with Precipitation >= 0.1 mm, Days with Max >= 30 C,
//   Relative Humidity, Sunshine Duration.
// - Typhoons: CWA FAQ for Typhoon, Q14 (382 typhoons affected Taiwan
//   1911-2025; peak August, then July and September):
//   https://www.cwa.gov.tw/V8/E/K/Encyclopedia/typhoon/typhoon_list02.html
// - Typhoon days off: DGPA "Work and class status during natural
//   disasters" (English): https://www.dgpa.gov.tw/typh/daily/ndse.html
// - MRT and gondola: Taipei Metro statements reported in Taiwan News and
//   Focus Taiwan (above-ground sections suspended in high winds; gondola
//   halts at set wind speeds or under a land warning).
//
// PHOTOS. Wikimedia Commons, licence-checked in
// scratchpad/downloaded-photos/new-posts/credits.json, copied to
// public/media/2026/10/taipei-weather-by-month/. The hero is named with a
// -2400x1800 suffix so lib/content.ts can read its size. It also appears
// in the body (after the first h2, so withoutDuplicateLeadImage leaves it)
// to carry its credit. The red maple photo was taken in April, so it is not
// captioned as autumn colour. Not used: the three uncredited 2026/08 photos
// and the 621px rainfall chart; /media/2026/08/taipei-hydrangeas.jpg (it
// shows pentas) is left out.
//
// FAQ: yes (main guide). Perfect For: no.
//
// ALSO: adds one guarded paragraph to /best-time-to-visit-taipei linking
// here, just before its January section.
//
// POSTS_PATH=<file> writes to a copy instead of content/posts.json.

import fs from "fs";
import path from "path";

const SLUG = "taipei-weather-by-month";
const TODAY = "2026-10-28 12:00:00";
const MEDIA = `/media/2026/10/${SLUG}`;
const HERO = `${MEDIA}/taipei-101-summer-sunset-skyline-2400x1800.jpg`;

const ext = (href, text) => `<a href="${href}" target="_blank" rel="noreferrer noopener">${text}</a>`;
const CWA_NORMALS = "https://www.cwa.gov.tw/V8/E/C/Statistics/monthlymean.html";
const CWA_TYPHOON_FAQ = "https://www.cwa.gov.tw/V8/E/K/Encyclopedia/typhoon/typhoon_list02.html";
const CWA_TY_WARN = "https://www.cwa.gov.tw/V8/E/P/Typhoon/TY_WARN.html";
const CWA_HOME = "https://www.cwa.gov.tw/V8/E/";
const DGPA = "https://www.dgpa.gov.tw/typh/daily/ndse.html";

// ---- Climate normals, CWA, Taipei station, 1991-2020 ----------------------
// [month, mean max C, mean min C, precipitation mm, days with >= 0.1 mm]
const CLIMATE = [
  ["January", 19.4, 14.2, 90.5, 13.5],
  ["February", 20.3, 14.4, 143.2, 12.9],
  ["March", 22.7, 16.0, 157.2, 14.5],
  ["April", 26.4, 19.3, 152.5, 14.4],
  ["May", 29.7, 22.6, 239.9, 14.8],
  ["June", 32.7, 25.1, 345.0, 15.6],
  ["July", 34.8, 26.6, 226.1, 12.0],
  ["August", 34.2, 26.4, 337.8, 14.6],
  ["September", 31.5, 25.0, 315.2, 13.4],
  ["October", 27.6, 22.4, 150.2, 12.7],
  ["November", 24.8, 19.7, 83.2, 12.3],
  ["December", 21.0, 16.0, 88.7, 12.6],
];
const YEAR = { max: 27.1, min: 20.6, rain: 2329.5, days: 163.3 };

const f = (c) => Math.round((c * 9) / 5 + 32);
const t = (c) => `${c.toFixed(1)}&nbsp;°C (${f(c)}&nbsp;°F)`;

const TABLE = `<figure class="wp-block-table is-style-stripes"><table><caption>Taipei climate averages, 1991&ndash;2020 (CWA, Taipei station)</caption><thead><tr><th scope="col">Month</th><th scope="col">Average high</th><th scope="col">Average low</th><th scope="col">Rainfall</th><th scope="col">Rain days</th></tr></thead><tbody>
${CLIMATE.map(([m, hi, lo, mm, d]) => `<tr><th scope="row">${m}</th><td>${t(hi)}</td><td>${t(lo)}</td><td>${mm.toFixed(1)}&nbsp;mm</td><td>${d.toFixed(1)}</td></tr>`).join("\n")}
<tr><th scope="row">Year</th><td>${t(YEAR.max)}</td><td>${t(YEAR.min)}</td><td>${YEAR.rain.toLocaleString("en-GB", { minimumFractionDigits: 1 })}&nbsp;mm</td><td>${YEAR.days.toFixed(1)}</td></tr>
</tbody></table></figure>`;

// Simple bar chart of monthly rainfall, drawn from the same numbers.
const chart = () => {
  const W = 640, H = 300, left = 44, right = 8, top = 24, bottom = 36;
  const plotH = H - top - bottom, plotW = W - left - right;
  const maxMm = 400;
  const slot = plotW / 12, barW = slot * 0.62;
  const y = (mm) => top + plotH - (mm / maxMm) * plotH;
  const grid = [0, 100, 200, 300, 400]
    .map((v) => `<line x1="${left}" x2="${W - right}" y1="${y(v).toFixed(1)}" y2="${y(v).toFixed(1)}" stroke="var(--line)" stroke-width="1"/><text x="${left - 6}" y="${(y(v) + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="var(--muted)">${v}</text>`)
    .join("");
  const bars = CLIMATE.map(([m, , , mm], i) => {
    const x = left + i * slot + (slot - barW) / 2;
    const yy = y(mm);
    return `<rect x="${x.toFixed(1)}" y="${yy.toFixed(1)}" width="${barW.toFixed(1)}" height="${(top + plotH - yy).toFixed(1)}" rx="3" fill="var(--navy)"><title>${m}: ${mm.toFixed(1)} mm</title></rect>` +
      `<text x="${(x + barW / 2).toFixed(1)}" y="${(yy - 5).toFixed(1)}" text-anchor="middle" font-size="10.5" fill="var(--ink-body)">${Math.round(mm)}</text>` +
      `<text x="${(x + barW / 2).toFixed(1)}" y="${H - bottom + 18}" text-anchor="middle" font-size="11.5" fill="var(--muted)">${m.slice(0, 3)}</text>`;
  }).join("");
  return `<figure class="wp-block-image size-large weather-chart"><svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-labelledby="rain-chart-title rain-chart-desc" style="width:100%;height:auto;font-family:var(--font-sans)"><title id="rain-chart-title">Average monthly rainfall in Taipei, in millimetres</title><desc id="rain-chart-desc">Rainfall is lowest in November (83 mm), December (89 mm) and January (91 mm), and highest in June (345 mm), August (338 mm) and September (315 mm). The figures are the same as in the table above.</desc>${grid}${bars}<text x="${left}" y="14" font-size="11" fill="var(--muted)">mm</text></svg><figcaption>Average monthly rainfall in Taipei, 1991&ndash;2020. Data: ${ext(CWA_NORMALS, "Central Weather Administration")}.</figcaption></figure>`;
};

// ---- Photos (Wikimedia Commons) -------------------------------------------
const photo = (file, w, h, alt, caption, page, author, licence, licenceUrl) =>
  `<figure class="wp-block-image size-large"><img width="${w}" height="${h}" src="${file.startsWith("/") ? file : `${MEDIA}/${file}`}" alt="${alt}" loading="lazy"/><figcaption>${caption} Photo: <a href="${page}">${author}</a>, <a href="${licenceUrl}">${licence}</a></figcaption></figure>`;

const P = {
  hero: photo(HERO, 2400, 1800,
    "Taipei 101 and the city skyline under a blue summer evening sky",
    "Taipei 101 on a clear July evening: summer days often start bright before cloud builds in the afternoon.",
    "https://commons.wikimedia.org/wiki/File:Taipei_101_sunset_skyline_2015.jpg", "中岑 范姜", "CC BY-SA 2.0", "https://creativecommons.org/licenses/by-sa/2.0"),
  umbrellas: photo("ximending-umbrellas-rain.jpg", 2400, 1589,
    "Shoppers with colourful umbrellas crowding a rainy street in Ximending",
    "Umbrellas up on Hanzhong Street, Ximending, on a wet June afternoon.",
    "https://commons.wikimedia.org/wiki/File:People_with_Umbrellas_Walking_into_Hanzhong_Street,_Taipei_20160610.jpg", "玄史生", "CC0", "http://creativecommons.org/publicdomain/zero/1.0/deed.en"),
  xinyi: photo("rainy-xinyi-road.jpg", 2400, 1676,
    "A rain-soaked Xinyi Road with a cyclist in a rain cape",
    "Xinyi Road on a wet October evening. A rain cape, sold in every convenience store, is how locals cycle through it.",
    "https://commons.wikimedia.org/wiki/File:2016-10-13_Rainy_Xinyi_Road.jpg", "Francisco Anzola", "CC BY 2.0", "https://creativecommons.org/licenses/by/2.0"),
  typhoon: photo("taipei-skyline-typhoon-clouds.jpg", 2400, 1381,
    "Dark typhoon clouds gathering over the Taipei skyline and Taipei 101",
    "Storm clouds massing over the city as a typhoon approached in July 2015.",
    "https://commons.wikimedia.org/wiki/File:Cityscape_of_Taipei_Taiwan_during_typhoon_2015.jpg", "ynes95", "CC BY-SA 2.0", "https://creativecommons.org/licenses/by-sa/2.0"),
  cloud101: photo("taipei-101-shrouded-in-cloud.jpg", 2400, 1800,
    "Taipei 101 with its upper floors hidden in low cloud",
    "The top of Taipei 101 lost in low cloud on a November evening. Check the sky before paying for the observatory.",
    "https://commons.wikimedia.org/wiki/File:Taipei_101_skyscraper_shrouded_by_cloud,_on_12_November_2015.jpg", "Gavin Anderson", "CC BY-SA 2.0", "https://creativecommons.org/licenses/by-sa/2.0"),
  cherry: photo("yangmingshan-cherry-blossom.jpg", 2400, 1800,
    "A pink cherry blossom tree in flower in Yangmingshan National Park",
    "Cherry blossom in Yangmingshan National Park in mid-March.",
    "https://commons.wikimedia.org/wiki/File:Cherry_Blossoms_in_Yangmingshan_National_Park,_New_Taipei_City,_Taiwan_2018-03-13.jpg", "燈火闌珊處", "CC BY-SA 4.0", "https://creativecommons.org/licenses/by-sa/4.0"),
  maple: photo("yangmingshan-red-maple-leaves.jpg", 2400, 1800,
    "Bright red maple leaves on a branch in the Yangmingshan hills",
    "Red maple leaves in the Yangmingshan hills, photographed in April.",
    "https://commons.wikimedia.org/wiki/File:Red_Leaves_%E7%B4%85%E8%91%89_-_panoramio.jpg", "lienyuan lee", "CC BY 3.0", "https://creativecommons.org/licenses/by/3.0"),
  hydrangea: photo("zhuzihu-hydrangeas-june.jpg", 2400, 1800,
    "Blue and white hydrangeas filling a flower farm at Zhuzihu in Yangmingshan",
    "Hydrangeas at a Zhuzihu flower farm at the start of June.",
    "https://commons.wikimedia.org/wiki/File:%E7%AB%B9%E5%AD%90%E6%B9%96%E7%B9%A1%E7%90%83%E8%8A%B1%E6%B5%B7_Zhuzihu_Hydrangea_Flower_Field_-_panoramio.jpg", "lienyuan lee", "CC BY 3.0", "https://creativecommons.org/licenses/by/3.0"),
  ice: photo("qixingshan-snow-ice-pellets-january.jpg", 2400, 1800,
    "Ground white with ice pellets on Qixingshan during a winter cold snap",
    "A rare sight: ice pellets on Qixingshan, Yangmingshan, during the cold surge of January 2021.",
    "https://commons.wikimedia.org/wiki/File:20210108_%E6%AD%90%E4%BA%9E%E5%A4%A7%E9%99%B8%E5%AF%92%E6%BD%AE%E6%99%82%E7%A9%8D%E5%86%B0%E9%9C%B0%E7%9A%84%E4%B8%83%E6%98%9F%E5%B1%B1%E5%85%AC%E5%9C%92.jpg", "Junyu-K", "CC BY-SA 4.0", "https://creativecommons.org/licenses/by-sa/4.0"),
};

const CONTENT = `
<p>Taipei is warm, humid and wet. The city averages about 2,330&nbsp;mm of rain a year, more than three times London's total, and some rain falls on around 163 days. What changes through the year is the kind of rain: cold drizzle in winter, long grey spells in May and June, short violent downpours on summer afternoons, and the occasional typhoon between July and September. This guide sets out the official averages month by month, explains how typhoon season affects a trip, and covers what to pack and what to do when the weather turns.</p>

<p>The figures are the 1991&ndash;2020 climate normals for the Taipei weather station, published by Taiwan's ${ext(CWA_NORMALS, "Central Weather Administration")} (CWA). Averages smooth out a lot: any given week can be hotter, colder or drier, so check the forecast a few days before you travel.</p>

<div class="quick-verdict"><p class="quick-verdict-title">💡 The Quick Verdict: Taipei Weather</p><ul><li><strong>Best weather:</strong> late October and November, with highs of 25&ndash;28&nbsp;°C, the lowest rainfall of the year in November and the typhoon risk mostly past.</li>
<li><strong>Wettest:</strong> June (345&nbsp;mm, the plum rains), then August and September, when typhoons and thunderstorms add to the total.</li>
<li><strong>Hottest:</strong> July and August, with average highs near 35&nbsp;°C and about 30 days a month at 30&nbsp;°C or more.</li>
<li><strong>Coolest:</strong> January and February, around 14&ndash;20&nbsp;°C and often damp and overcast. It does not snow in the city.</li>
<li><strong>Typhoons:</strong> July to September, peaking in August. Build a spare day into a summer trip and buy travel insurance when you book.</li></ul></div>

<p>For festivals and events in each month, see <a href="/best-time-to-visit-taipei">when to visit Taipei</a>, our month-by-month events guide.</p>



<h2 id="Climate-Table">Taipei Climate by Month: The Numbers</h2>

${TABLE}

<p><em>Source: ${ext(CWA_NORMALS, "CWA Monthly Mean")}, 1991&ndash;2020 normals for the Taipei station. "Rain days" counts days with at least 0.1&nbsp;mm, so it includes days with only a passing shower.</em></p>

${chart()}

<p>Three things the table doesn't show:</p>

<ul>
<li><strong>Humidity is high all year.</strong> CWA's average relative humidity for Taipei sits between about 71% and 78% in every month, which is why 33&nbsp;°C in July feels heavier than the number suggests, and why 15&nbsp;°C in January feels colder.</li>
<li><strong>Winter is grey.</strong> Taipei averages around 76 hours of sunshine in January, against about 180 in July and August.</li>
<li><strong>The mountains get their own weather.</strong> At CWA's Zhuzihu station on Yangmingshan, October averages 650&nbsp;mm of rain over 19 days, four times the city's figure, and January highs are about 15&nbsp;°C. Autumn and winter can be fine in town and wet and foggy on the hills.</li>
</ul>



<h2 id="Winter">Winter: December to February</h2>

<p>Winter in Taipei is mild by European standards but rarely crisp. Average highs run from 21&nbsp;°C in December down to about 19&ndash;20&nbsp;°C in January and February, with lows around 14&ndash;16&nbsp;°C. Totals are low in December and January (under 100&nbsp;mm), but rain falls on 13 days or so a month, often as slow drizzle under a flat sky carried in by the northeast monsoon. February is wetter, at 143&nbsp;mm.</p>

<p>Cold surges from the Asian mainland arrive a few times each winter and can push night-time lows below 10&nbsp;°C for several days. Many homes, older hotels and restaurants have air conditioning but no heating, so a cold snap can feel colder indoors than the temperature implies. On the highest peaks of Yangmingshan, a strong surge occasionally brings frost, ice pellets or a dusting of snow, which draws crowds up the mountain roads.</p>

${P.ice}

<p><strong>Highlights.</strong> Winter is the best time for a soak: Beitou, Yangmingshan and Wulai are compared in our <a href="/taipei-hot-springs">Taipei hot springs guide</a>, and the <a href="/beitou-hot-spring-hotels">Beitou hot spring hotels</a> page covers rooms with private baths. The year ends with the <a href="/taipei-101-fireworks-new-years-eve">Taipei 101 New Year's Eve fireworks</a>, where the main risk is low cloud hiding the top of the tower.</p>

<p><strong>Lunar New Year.</strong> In 2027 Lunar New Year's Day falls on Saturday 6 February, and the public holiday runs from Thursday 4 to Wednesday 10 February. In the weeks before, the New Year market fills <a href="/dihua-street-dadaocheng-guide">Dihua Street</a>. Over the holiday itself, many small restaurants and independent shops close for several days, trains and buses out of Taipei are busy, and big attractions and chain restaurants mostly stay open. The weather is usually cool and damp, so plan indoor fallbacks. Dates for the lantern festivals that follow are on our <a href="/taipei-annual-events#February-2027">events calendar</a>.</p>



<h2 id="Spring">Spring: March and April</h2>

<p>Spring is changeable. Highs climb from about 23&nbsp;°C in March to 26&nbsp;°C in April, and both months bring around 150&nbsp;mm of rain spread over 14 or 15 days. A warm, bright week can be followed by a cool, drizzly one, so pack for both.</p>

<p><strong>Cherry blossom.</strong> The blossom season on Yangmingshan runs from late January into March, depending on the variety, with the park's flower festival usually held from February to mid-March. Weekends are crowded and the mountain buses fill up, so go on a weekday if you can. Our <a href="/yangmingshan-national-park">Yangmingshan National Park guide</a> covers the routes and buses.</p>

${P.cherry}

<p><strong>Calla lilies.</strong> From March into April, and often into May, the flower farms at Zhuzihu, in an old volcanic basin on Yangmingshan, open their calla lily fields for picking. Zhuzihu is several degrees cooler than the city and often in cloud, so bring a layer and shoes you don't mind getting muddy.</p>

${P.maple}

<p>April is also the start of firefly season in the hills around the city, and the last month for comfortable long hikes before the heat builds; our <a href="/best-hikes-in-taipei">Taipei hikes guide</a> has the trails.</p>



<h2 id="Plum-Rains">Early Summer: May and June, the Plum Rains</h2>

<p>From around mid-May to mid-June, a slow-moving weather front stalls over Taiwan and brings the <em>meiyu</em>, or plum rains: days of low cloud, persistent rain and heavy bursts that can flood streets for an hour or two. Rainfall jumps from 240&nbsp;mm in May to 345&nbsp;mm in June, the wettest month in the CWA averages, and June has the most rain days of the year (15.6). It is also getting hot: June's average high is close to 33&nbsp;°C.</p>

${P.umbrellas}

<p>The plum rains don't mean constant rain. Mornings are often dry, and a front can clear for several days at a time. Keep outdoor plans flexible, carry a compact umbrella, and choose sandals or quick-drying shoes over canvas trainers.</p>

<p><strong>Hydrangeas.</strong> The rain suits the hydrangea farms at Zhuzihu, which flower from about mid-May to late June. Blue, white and purple flowers cover the terraces, and the farms charge a small entry fee. A dry weekday morning is the time to go.</p>

${P.hydrangea}

<p>The Dragon Boat Festival falls on Wednesday 9 June in 2027; see the <a href="/taipei-annual-events#June-2027">events calendar</a> for the races and other June events.</p>



<h2 id="Summer">Summer: July to September</h2>

<p>July and August are properly hot. CWA's average high is 34.8&nbsp;°C in July and 34.2&nbsp;°C in August, nights stay around 26&nbsp;°C, and an average July has about 30 days at 30&nbsp;°C or more. Summer is also the sunniest season. The usual pattern is a bright, hot morning, cloud building after lunch, and a short, heavy thunderstorm in the late afternoon that clears by evening. Rainfall stays high (338&nbsp;mm in August) because of those storms and typhoons, not because it rains all day.</p>

${P.hero}

<p>How to cope: do outdoor sightseeing before 11:00 or after 17:00, use museums, malls and cafés in the middle of the day, drink more than you think you need, and carry sun cream and a hat as well as an umbrella. Air conditioning inside is often set very cold, so a light layer helps. Night markets come into their own, and a hotel with a pool is worth considering; see our <a href="/taipei-hotels-with-pools">Taipei hotels with pools</a> guide.</p>

<p>September is a transition month. The heat eases slightly (an average high of 31.5&nbsp;°C), but typhoon risk is still high and the month averages 315&nbsp;mm of rain, so it is not yet the settled autumn weather people expect.</p>



<h2 id="Autumn">Autumn: October and November</h2>

<p>This is the season to aim for. October's average high is 27.6&nbsp;°C and November's 24.8&nbsp;°C, the humidity eases a little, and rainfall drops to 150&nbsp;mm in October and 83&nbsp;mm in November, the driest month in the city. Typhoons are less common after September, though October still sees one in some years.</p>

<p>The catch is that the northeast monsoon returns in October. It brings little rain to central Taipei but plenty to north-facing hills: Yangmingshan, Keelung and the northeast coast around <a href="/jiufen">Jiufen</a> can be wet and foggy while the city is dry. For hikes, look at the forecast for the mountain, not just the city. Late October to December is also silvergrass season on Yangmingshan's ridges.</p>

${P.cloud101}

<p>Autumn's mild evenings suit outdoor events such as the free <a href="/taipei-jazz-festival">jazz festival</a> held each October at <a href="/daan-forest-park">Daan Forest Park</a>. December gets cooler and greyer again; see the winter section above.</p>



<h2 id="Typhoons">Typhoon Season in Taipei</h2>

<p>According to the ${ext(CWA_TYPHOON_FAQ, "CWA")}, 382 typhoons hit or seriously affected Taiwan between 1911 and 2025, a little over three a year on average. August has the most, followed by July and September, so the CWA describes the typhoon season as roughly July to September. Typhoons have also affected Taiwan as early as April and as late as December, and October and November see a few.</p>

${P.typhoon}

<p>Most typhoons do not hit Taipei directly; many pass to the south or east, or weaken over the mountains first. When one does come close, expect a day or two of strong wind and very heavy rain, and sometimes nothing worse than a wet, gusty day. The day after a typhoon is often clear and hot.</p>

<h3>Typhoon days off</h3>

<p>When a storm is forecast to bring dangerous weather, each city and county government decides whether to suspend work and classes. The decision is usually announced the evening before or early in the morning, and the ${ext(DGPA, "Directorate-General of Personnel Administration")} lists it for every area in English. On a typhoon day, offices and schools close, many shops and restaurants close or open late, and museums, parks and attractions usually shut. Convenience stores generally stay open. Stock up on water and snacks the evening before and plan to stay in your hotel while the storm passes.</p>

<h3>Flights</h3>

<p>Flights into and out of Taoyuan and Songshan airports are delayed or cancelled when a typhoon is close. Airlines usually announce changes a day or more in advance and often offer free rebooking for affected dates, but each airline sets its own rules, so check directly with yours. If you have a typhoon-season flight home, it is worth leaving a buffer day before any onward connection. The <a href="/taoyuan-airport-mrt">airport MRT guide</a> covers getting to Taoyuan.</p>

<h3>The MRT and other transport</h3>

<p>Taipei's MRT usually keeps running on typhoon days, sometimes at reduced frequency. Taipei Metro has said it may slow or suspend service on above-ground and elevated sections when winds reach its limits, and the Brown (Wenhu) line has been stopped in past storms while the underground lines kept going. The <a href="/maokong-gondola">Maokong Gondola</a> stops at much lower wind speeds and is usually closed under a land typhoon warning. Intercity trains and buses can also be disrupted, especially on the east coast; see our <a href="/taipei-public-transport">public transport guide</a> for the network.</p>

<h3>Following CWA warnings in English</h3>

<p>The CWA's ${ext(CWA_HOME, "English website")} has a ${ext(CWA_TY_WARN, "typhoon warnings page")} with the storm's track, forecast cone and which areas are covered. It issues a sea warning first and a land warning when its strong winds are expected to reach land, usually around 18 hours ahead. Phones on Taiwanese networks also receive government emergency alerts. Having mobile data makes it easy to keep checking; see our <a href="/taiwan-sim-cards">Taiwan SIM and eSIM guide</a>.</p>

<h3>Travel insurance</h3>

<p>If you are travelling between June and October, buy travel insurance when you book rather than just before you fly. Most policies treat a storm as a known event once it has been named or forecast, and stop covering it for anyone who buys after that. Read what the policy says about travel delay, missed connections, extra nights' accommodation and cancellation for natural disasters, as cover varies a lot between policies. Airline rebooking and hotel flexibility often matter more in practice, so refundable rates are worth considering for peak typhoon weeks.</p>



<h2 id="What-to-Pack">What to Pack for Taipei Weather</h2>

<figure class="wp-block-table is-style-stripes"><table><caption>Packing by season</caption><thead><tr><th scope="col">Months</th><th scope="col">Clothes</th><th scope="col">Extras</th></tr></thead><tbody>
<tr><th scope="row">December&ndash;February</th><td>Layers: long sleeves, a warm jumper or fleece, a waterproof jacket; a warmer coat for cold surges</td><td>Umbrella, warm socks, swimsuit for mixed hot springs</td></tr>
<tr><th scope="row">March&ndash;April</th><td>T-shirts plus a light jumper and a waterproof layer</td><td>Umbrella, shoes with grip for muddy trails and flower farms</td></tr>
<tr><th scope="row">May&ndash;June</th><td>Light, quick-drying clothes</td><td>Compact umbrella, sandals or quick-drying shoes, a spare pair of socks</td></tr>
<tr><th scope="row">July&ndash;September</th><td>The lightest clothes you own, in breathable fabrics</td><td>Sun cream, hat, refillable water bottle, umbrella for storms, a thin layer for cold air conditioning</td></tr>
<tr><th scope="row">October&ndash;November</th><td>T-shirts and a light jacket for evenings and the hills</td><td>Umbrella for the mountains and the coast</td></tr>
</tbody></table></figure>

<p>An umbrella is the one item worth carrying in every month. Cheap ones are sold in every convenience store if you forget, and many shops and hotels have bags or stands for wet umbrellas at the door. Rain capes are sold in the same places and are useful for YouBike rides.</p>



<h2 id="Rainy-Days">What to Do When It Rains</h2>

<p>Rain is part of most Taipei trips, so it pays to have a list ready. Our full guide to <a href="/where-to-go-when-raining">where to go when it rains in Taipei</a> has more ideas; the quick version:</p>

<ul>
<li><strong>Museums:</strong> the <a href="/national-palace-museum">National Palace Museum</a> can fill half a day, and there are plenty more in our <a href="/best-museums-in-taipei">best museums in Taipei</a> round-up.</li>
<li><strong>Malls and food halls:</strong> the Xinyi malls around Taipei 101 are linked by covered walkways, and the <a href="/best-shopping-malls-in-taipei">best shopping malls</a> guide covers the rest.</li>
<li><strong>Hot springs:</strong> a soak in Beitou is pleasant in drizzle; see the <a href="/taipei-hot-springs">hot springs guide</a>.</li>
<li><strong>Cinemas:</strong> see the <a href="/best-cinemas-in-taipei">best cinemas in Taipei</a>.</li>
</ul>

${P.xinyi}

<p>Skip high viewpoints on low-cloud days. The Taipei 101 observatory and the Maokong Gondola are both poor value when the top of the tower is in cloud.</p>



<h2 id="FAQ">Common Questions</h2>

<h3>What is the best month to visit Taipei for weather?</h3>

<p>November, closely followed by late October. November has the lowest average rainfall in the city (83&nbsp;mm), highs around 25&nbsp;°C and little typhoon risk. Expect the hills to be wetter than the city.</p>

<h3>When is typhoon season in Taipei?</h3>

<p>Roughly July to September, with the peak in August, according to the CWA. Storms are possible from May to November, but they are much less common outside the main season.</p>

<h3>Should I cancel my trip if a typhoon is forecast?</h3>

<p>Usually not. Most typhoons cause a day or two of disruption, and many miss Taipei or weaken first. Follow the CWA track, check with your airline about flights, and plan indoor days. If a storm is forecast for the day you fly, contact the airline before going to the airport.</p>

<h3>Which is the rainiest month in Taipei?</h3>

<p>June, with an average of 345&nbsp;mm during the plum rains, followed closely by August (338&nbsp;mm) and September (315&nbsp;mm).</p>

<h3>Does it snow in Taipei?</h3>

<p>Not in the city, where January lows average about 14&nbsp;°C. During strong cold surges, the highest peaks of Yangmingshan occasionally get frost, ice pellets or a little snow.</p>

<h3>Do I need a coat in winter?</h3>

<p>A warm jumper or fleece and a waterproof jacket are enough most of the time. Bring a warmer coat if a cold surge is forecast, or if you are heading up into the mountains.</p>
`;

// ---- Link paragraph for /best-time-to-visit-taipei ------------------------
const BEST_TIME = "best-time-to-visit-taipei";
const BEST_TIME_ANCHOR = '<h2 id="January">';
const BEST_TIME_PARA =
  `<p>The temperatures below are a rough guide. For the official monthly averages, including rainfall and rain days, and for what typhoon season means for a trip, see <a href="/${SLUG}">Taipei weather by month</a>.</p>\n\n\n\n`;

// ---------------------------------------------------------------------------
const filePath = path.resolve(process.env.POSTS_PATH || "content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const fail = (m) => { console.error(`${m} - aborting, nothing written.`); process.exit(1); };

if (posts.some((p) => p.slug === SLUG)) fail(`/${SLUG} already exists`);

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

// Every image must exist under public/ and carry width and height.
for (const [tag, src] of CONTENT.matchAll(/<img\b[^>]*src="([^"]+)"[^>]*>/g)) {
  if (!/\bwidth="\d+"/.test(tag) || !/\bheight="\d+"/.test(tag)) fail(`image without dimensions: ${src}`);
  if (!fs.existsSync(path.resolve("public" + src))) fail(`missing image file public${src}`);
}
if (!fs.existsSync(path.resolve("public" + HERO))) fail(`missing hero public${HERO}`);
// Every Commons photo must be credited.
const figures = CONTENT.match(/<figure class="wp-block-image[^"]*"><img[\s\S]*?<\/figure>/g) || [];
for (const fig of figures) if (!/Photo: <a href="https:\/\/commons\.wikimedia\.org\//.test(fig)) fail(`uncredited figure: ${fig.slice(0, 120)}`);

// Guarded link from best-time-to-visit-taipei.
const bestTime = bySlug.get(BEST_TIME);
if (!bestTime) fail(`/${BEST_TIME} not found`);
let linkedBestTime = false;
if (bestTime.content.includes(`href="/${SLUG}"`)) {
  console.log(`  /${BEST_TIME} already links here - left alone`);
} else {
  const at = bestTime.content.indexOf(BEST_TIME_ANCHOR);
  if (at < 0 || bestTime.content.indexOf(BEST_TIME_ANCHOR, at + 1) >= 0) fail(`/${BEST_TIME}: expected exactly one ${BEST_TIME_ANCHOR}`);
  bestTime.content = bestTime.content.slice(0, at) + BEST_TIME_PARA + bestTime.content.slice(at);
  bestTime.modified = TODAY;
  linkedBestTime = true;
}

const title = "Taipei Weather by Month: Rain, Typhoons & What to Pack";
if (title.length > 60) fail(`title is ${title.length} chars`);

posts.push({
  id: Math.max(...posts.map((p) => p.id || 0)) + 1,
  authorId: 2,
  date: TODAY,
  modified: TODAY,
  slug: SLUG,
  title,
  excerpt:
    "Official monthly temperatures, rainfall and rain days for Taipei, when typhoon season runs and what it means for flights and the MRT, plus what to pack and what to do when it rains.",
  type: "post",
  parentId: 0,
  content: CONTENT,
  categories: [{ name: "Visit", slug: "visit" }],
  tags: [{ name: "Essential", slug: "essential" }],
  featuredImage: HERO,
});

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2) + "\n");

console.log(`Added /${SLUG} to ${filePath}`);
console.log(`  title: ${title} (${title.length})`);
console.log(`  ${CONTENT.length} chars, ${figures.length} photos`);
if (linkedBestTime) console.log(`  linked from /${BEST_TIME} (before its January section)`);
