// New guide: Shifen & Pingxi day trip (sky lanterns, waterfall, Pingxi line).
//
// WHY THIS PAGE. Shifen is mentioned on /jiufen and /best-day-trips-from-
// taipei only as a tour stop. Readers doing it by train need the things those
// pages skip: the Pingxi line pass and its real price, the last trains back,
// the 795 bus, the waterfall's hours, and the fact that launching a lantern
// on the track is still an offence.
//
// SOURCING. data/research/shifen-pingxi-day-trip.md, checked 27-28 Oct 2026.
// Pass price and sale stations from the TRA tourist-ticket page (NT$120 since
// 23 June 2025; most blogs and /taiwan-railway still give older prices).
// Fares and times from the TRA timetable query for Wed 4 and Sat 7 Nov 2026.
// Waterfall hours from New Taipei City Travel. Lantern prices from PTS News
// (April 2025), with the single-colour price hedged. Track rules from United
// Daily News (30 July 2026). 2027 festival dates not announced.
//
// AFFILIATE LINKS. Three Klook day tours, each opened on 27 Oct 2026 and
// checked to include Shifen: 76306, 93318 and 90073. Klook 98800 (night
// Jiufen and Shifen), linked from /jiufen, now redirects to Klook's home page
// and is not used.
//
// PHOTOS. Nine Wikimedia Commons photos in public/media/2026/10/shifen-
// pingxi-day-trip/, each credited in its figcaption (author, licence).
//
// LINKS IN. Guarded paragraphs are added to /jiufen (Combining section) and
// /best-day-trips-from-taipei (after the Heping Island tour), only if each
// marker is found exactly once and the page doesn't already link here.
//
// Main guide, so it has an FAQ. No Perfect For block.
//
// POSTS_PATH=<file> writes to a copy instead of content/posts.json.

import fs from "fs";
import path from "path";

const SLUG = "shifen-pingxi-day-trip";
const TODAY = "2026-10-28 12:00:00";
const MEDIA = "/media/2026/10/shifen-pingxi-day-trip";

const KLOOK = {
  "yehliu-jiufen-shifen-golden-waterfall": "https://www.klook.com/en-GB/activity/76306-yehliu-jiufen-shifen-golden-waterfall-day-tour/?aid=8733",
  "yehliu-jiufen-shifen-waterfall": "https://www.klook.com/en-GB/activity/93318-yehliu-jiufen-shifen-shifen-waterfall-day-tour/?aid=8733",
  "yehliu-jiufen-shifen-hotel-pickup": "https://www.klook.com/en-GB/activity/90073-yeliou-jiufen-sifen-carpool-tour/?aid=8733",
};
const tour = (key, text) =>
  `<a href="${KLOOK[key]}" data-activity="${key}" target="_blank" rel="noreferrer noopener">${text}</a>`;

// Commons credits (from scratchpad/downloaded-photos/new-posts/credits.json).
const PHOTOS = {
  hero: { file: "shifen-train-sky-lanterns-old-street.jpg", w: 2400, h: 1456, page: "https://commons.wikimedia.org/wiki/File:TRA_DRC1029_and_Pingxi_Sky_Lanterns_at_Shifen_Old_Street_20171028.jpg", author: "xiquinhosilva", licence: "CC BY 2.0", licenceUrl: "https://creativecommons.org/licenses/by/2.0", alt: "A yellow Pingxi line train edging past sky lantern shops on Shifen Old Street" },
  lanternTrack: { file: "shifen-releasing-sky-lantern-on-track.jpg", w: 2400, h: 1800, page: "https://commons.wikimedia.org/wiki/File:New_Taipei_-_Shifen_Old_Street_%E5%8D%81%E5%88%86%E8%80%81%E8%A1%97_(2025)_-_IMG_01.jpg", author: "Chainwit", licence: "CC BY 4.0", licenceUrl: "https://creativecommons.org/licenses/by/4.0", alt: "Two visitors holding up a written sky lantern on the railway track at Shifen" },
  trainNight: { file: "shifen-train-at-night.jpg", w: 2400, h: 1800, page: "https://commons.wikimedia.org/wiki/File:TRA_DRC1032_on_Pingxi_Line_20170218_night.jpg", author: "陳皓軒（陳好酸）", licence: "CC BY 2.0", licenceUrl: "https://creativecommons.org/licenses/by/2.0", alt: "A Pingxi line train passing the lit shopfronts of Shifen at dusk" },
  waterfallFront: { file: "shifen-waterfall-front-view.jpg", w: 2400, h: 1800, page: "https://commons.wikimedia.org/wiki/File:Shifen_Waterfall_front_view_20200626c.jpg", author: "Solomon203", licence: "CC BY-SA 4.0", licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0", alt: "Shifen Waterfall pouring into a green pool surrounded by forest" },
  waterfallPlatform: { file: "shifen-waterfall-viewing-platform.jpg", w: 2400, h: 1799, page: "https://commons.wikimedia.org/wiki/File:%E5%8D%81%E5%88%86%E7%80%91%E5%B8%83_Shifen_Waterfall_-_panoramio_(1).jpg", author: "lienyuan lee", licence: "CC BY 3.0", licenceUrl: "https://creativecommons.org/licenses/by/3.0", alt: "Shifen Waterfall framed by trees with visitors on the viewing platform" },
  guanpu: { file: "pingxi-line-train-guanpu-bridge.jpg", w: 2400, h: 1600, page: "https://commons.wikimedia.org/wiki/File:TRA_DRC1030_and_Guanpu_Suspension_Bridge_(53566149437).jpg", author: "Takeshi Aida", licence: "CC BY-SA 2.0", licenceUrl: "https://creativecommons.org/licenses/by-sa/2.0", alt: "A Pingxi line train crossing the river beside the Guanpu Suspension Bridge" },
  jingtongTrain: { file: "jingtong-station-train-rain.jpg", w: 2400, h: 1600, page: "https://commons.wikimedia.org/wiki/File:TRA_DRC1032_and_Jingtong_Observatory_Caf%C3%A9_(53566150222).jpg", author: "Takeshi Aida", licence: "CC BY-SA 2.0", licenceUrl: "https://creativecommons.org/licenses/by-sa/2.0", alt: "A yellow Pingxi line train waiting at Jingtong station on a rainy day" },
  jingtongStation: { file: "jingtong-station-building.jpg", w: 2400, h: 1600, page: "https://commons.wikimedia.org/wiki/File:2021_TRA_Jingtong_Station.jpg", author: "Taiwankengo", licence: "CC BY-SA 4.0", licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0", alt: "The wooden Japanese-era Jingtong station building with its tiled roof" },
  festival: { file: "pingxi-sky-lantern-festival-mass-release.jpg", w: 2400, h: 1600, page: "https://commons.wikimedia.org/wiki/File:Pingxi_Sky_Lantern_Festival_2014_in_Taiwan.jpg", author: "Jirka Matousek", licence: "CC BY 2.0", licenceUrl: "https://creativecommons.org/licenses/by/2.0", alt: "Hundreds of glowing sky lanterns rising into the night sky at the Pingxi Sky Lantern Festival" },
};

const img = (p, lazy = true) =>
  `<img width="${p.w}" height="${p.h}" src="${MEDIA}/${p.file}" alt="${p.alt}"${lazy ? ' loading="lazy"' : ""}/>`;
const credit = (p) => `Photo: <a href="${p.page}">${p.author}</a>, <a href="${p.licenceUrl}">${p.licence}</a>`;
const figure = (key, caption, lazy = true) => {
  const p = PHOTOS[key];
  return `<figure class="wp-block-image size-large">${img(p, lazy)}<figcaption>${caption} ${credit(p)}</figcaption></figure>`;
};
const gallery = (items) =>
  `<ul class="wp-block-gallery columns-2 is-cropped">${items
    .map(([key, caption]) => `<li class="blocks-gallery-item"><figure>${img(PHOTOS[key])}<figcaption>${caption} ${credit(PHOTOS[key])}</figcaption></figure></li>`)
    .join("")}</ul>`;

const tourTable = (len, start, price) =>
  `<figure class="wp-block-table aligncenter"><table><tbody><tr><td class="has-text-align-center" data-align="center"><strong>Tour Length</strong></td><td class="has-text-align-center" data-align="center"><strong>Meets</strong></td><td class="has-text-align-center" data-align="center"><strong>From</strong></td></tr><tr><td class="has-text-align-center" data-align="center">${len}</td><td class="has-text-align-center" data-align="center">${start}</td><td class="has-text-align-center" data-align="center">${price}</td></tr></tbody></table></figure>`;

const SPACER = `<div style="height:40px" aria-hidden="true" class="wp-block-spacer"></div>`;

const CONTENT = `
<p>The Pingxi line is a single-track railway that winds 13 kilometres up the Keelung River valley from Ruifang into the hills east of Taipei. It was laid in the 1920s to carry coal; the mines have closed, and the line now carries visitors to a string of small towns. The best known is <strong>Shifen</strong>, where trains pass within arm's reach of the shops and people write wishes on paper sky lanterns and send them up into the valley. A short walk away is <strong>Shifen Waterfall</strong>, and further up the line are the old streets of <strong>Pingxi</strong> and <strong>Jingtong</strong>. All of it fits into one day from Taipei by train, by bus or on a tour, and pairs easily with Jiufen.</p>

${figure("hero", "A Pingxi line train edges along Shifen Old Street between the lantern shops.", false)}

<div class="quick-verdict"><p class="quick-verdict-title">💡 The Quick Verdict: Shifen &amp; Pingxi</p><ul><li><strong>Getting there:</strong> a local train from Taipei Main to Ruifang (NT$73, about 50 minutes), then the Pingxi line, which runs roughly once an hour. Or bus 795 from MRT Muzha.</li>
<li><strong>Last trains:</strong> the final train leaves Jingtong at 20:30 and Shifen at 20:57. After that, the 795 bus towards Muzha runs later in the evening, or it's a taxi.</li>
<li><strong>The day pass</strong> now costs NT$120, not the NT$80 many guides still quote, and it only saves money if you stop at four or more stations.</li>
<li><strong>Sky lanterns</strong> cost about NT$250 for four colours. Launch from the platform or a shop, not the track: walking on the line can bring a fine of NT$10,000 or more.</li>
<li><strong>Shifen Waterfall</strong> is free and open 09:00 to 17:00 from October to May (until 18:00 in summer).</li></ul></div>

${SPACER}

<h2 id="Getting-There">How to Get There from Taipei</h2>

<p>There are three ways in. The train is the classic route and lets you stop at every town; the bus is simpler if you are staying near the Brown line; a tour does the thinking for you but gives you less time in each place.</p>

<figure class="wp-block-table is-style-stripes"><table><thead><tr><th>Route</th><th>Time</th><th>Cost</th><th>Good for</th></tr></thead><tbody>
<tr><td><strong>Train:</strong> Taipei Main to Ruifang, then the Pingxi line</td><td>About 1 hr 20 min to Shifen, plus the change</td><td>NT$73 + NT$29 to Shifen</td><td>Visiting several stations; combining with Jiufen</td></tr>
<tr><td><strong>Bus 795:</strong> MRT Muzha to Pingxi and Shifen</td><td>About 1 hr to Shifen</td><td>NT$45</td><td>Southern Taipei; no change of train</td></tr>
<tr><td><strong>Day tour</strong> (Shifen with Jiufen and Yehliu)</td><td>8&ndash;10 hrs in all</td><td>From about &pound;17 on Klook</td><td>Seeing the headline sights in one go</td></tr>
</tbody></table></figure>

<p><em>Fares are adult single fares on local trains, from Taiwan Railway's timetable search for early November 2026. Tour prices were shown on Klook in October 2026.</em></p>

<h3 id="Train">By Train via Ruifang</h3>

<p>Take any eastbound <strong>Local</strong> or <strong>Fast Local</strong> train from Taipei Main Station to <strong>Ruifang</strong> (瑞芳). Locals take 46 to 57 minutes and cost NT$73; you can tap in with an <a href="/taiwan-easycard">EasyCard</a>, but don't board a fully reserved Tze-Chiang, Puyuma or Taroko with one (our <a href="/taiwan-railway#easycard-warning">railway guide</a> explains the fine). At Ruifang, change to the Pingxi line, which leaves from the same station. Some Pingxi trains start further back, at Badu or Badouzi, so check the destination board for <strong>Jingtong</strong> (菁桐).</p>

<p>From Ruifang it is 27 minutes to Shifen (NT$29) and about 50 minutes to Jingtong at the end of the line (NT$44). The towns in order are Ruifang, Houtong, Sandiaoling, Dahua, <strong>Shifen</strong>, Wanggu, Lingjiao, <strong>Pingxi</strong> and <strong>Jingtong</strong>.</p>

<p><strong>Frequency.</strong> On a weekday in November 2026 there were 16 trains each way, at roughly hourly intervals. Watch for the gaps: nothing leaves Ruifang between 16:54 and 18:33, and nothing leaves Jingtong between 18:05 and 19:27. The first train out of Ruifang is at 05:07.</p>

<p><strong>Last trains back.</strong> The last train down the line leaves <strong>Jingtong at 20:30</strong> and <strong>Shifen at 20:57</strong>, reaching Ruifang at 21:23. From Ruifang there are still trains to Taipei at 21:36, 22:10, 22:29 and 23:29. The line was closed by landslide damage from autumn 2025 until 31 January 2026, so if heavy rain is forecast, check Taiwan Railway's service status before you go.</p>

<h3 id="Day-Pass">The Pingxi Line One-Day Pass</h3>

<p>The <strong>Pingxi / Shen'ao Line One-Day Pass</strong> gives unlimited travel for one day between Badouzi, Ruifang and Jingtong. Taiwan Railway raised the price on 23 June 2025, and it now costs <strong>NT$120</strong> for adults and NT$60 for concessions. It is still on sale, at the ticket windows in Taipei, Songshan, Banqiao, Keelung, Badu, Ruifang, Houtong, Shifen, Pingxi, Jingtong, Yilan and Luodong. It must be used on the day you buy it, and it can't be refunded.</p>

<p>Do the sums before you buy. Ruifang to Shifen, then Pingxi, Jingtong and back to Ruifang adds up to NT$117 in single fares, so the pass only pays off if you add another stop, such as Houtong or Wanggu, or double back. Otherwise simply tap your EasyCard at each station.</p>

${figure("guanpu", "The line follows the Keelung River; this is the crossing by the Guanpu Suspension Bridge, near the waterfall.")}

<h3 id="Bus">By Bus 795 from Muzha</h3>

<p>The <strong>795</strong>, which also runs as the Taiwan Tourist Shuttle's Muzha&ndash;Pingxi route, starts outside <strong>MRT Muzha station</strong> on the Brown line and climbs through Shenkeng and Shiding to Jingtong, Pingxi and Shifen. The fare to Shifen is NT$45, paid by EasyCard, and the ride takes about an hour. Buses run from early morning, roughly hourly in the middle of the day, and the timetable for buses back towards Muzha runs until late evening, later than the last train. It is a good way to do the line in reverse: bus to Jingtong, walk down through the towns by train, and go home from Ruifang. More on the shuttle network is in our <a href="/taiwan-tourist-shuttle-bus">Tourist Shuttle guide</a>.</p>

${SPACER}

<h2 id="Shifen">Shifen Old Street and the Sky Lanterns</h2>

<p>Shifen (十分) is the biggest station on the line and the reason most people come. The old street is a single row of shops on each side of the track, so when a train is due everyone steps back against the shopfronts and it eases through the crowd. Between trains the track fills up again with people posing with lanterns.</p>

<p>The lantern shops all work the same way. You choose a lantern, the staff hang it on a frame and hand you brushes and ink, and you write a wish on each side. Then they light the fuel pad, hold it while it fills with hot air, often take photos on your phone, and let go. Each colour is said to stand for a different kind of wish, and the shops will explain which is which.</p>

<p><strong>Prices.</strong> The shops follow a recommended price agreed by the local business association. According to PTS News, a <strong>four-colour lantern went up to NT$250</strong> in January 2025 and an <strong>eight-colour one is NT$350</strong>. Single-colour lanterns are cheaper, about NT$150 to NT$200 depending on the shop. Bring cash.</p>

${gallery([
  ["lanternTrack", "Posing on the track is common, but it is against the Railway Act."],
  ["trainNight", "Shifen after dark, when the shops are lit."],
])}

<h3 id="Lantern-Rules">The Rules: Stay Off the Track</h3>

<p>Look at almost any photo of Shifen and people are standing on the rails. It is still against the law. Taiwan's Railway Act forbids walking onto the line, and the Railway Bureau fines offenders <strong>NT$10,000 to NT$50,000</strong>. According to United Daily News, more than 60 people were fined on the Pingxi line in five years, some of them after someone reported photos they had posted.</p>

<p>There was a short trial from late November 2025 to 4 January 2026, while trains were suspended, when lanterns could legally be launched from the track. The law was amended in January 2026 to allow exceptions, but Taiwan Railway only takes applications from bodies such as the district office, 30 days ahead, and as of July 2026 none had been approved. So for now: write your lantern by the shop, and launch it from the shop front or the platform side, not from the rails. Do what the staff and the signs tell you.</p>

<h3 id="Lantern-Litter">The Environmental Cost</h3>

<p>Every lantern comes down somewhere: in the forest, on roofs or in the river, with its wire ring. Pingxi's cleaning team pays residents in kind for the paper they collect, swapping five spent lanterns for a rubbish bag and fifty for a bottle of washing-up liquid, and New Taipei has drafted a rule that would make sellers pay a levy per lantern. If you'd rather not add to the litter, the Electronic Sky Lantern Hall at Jingtong (below) offers an LED version you can keep.</p>

${SPACER}

<h2 id="Waterfall">Shifen Waterfall</h2>

${figure("waterfallFront", "Shifen Waterfall, about 40 metres wide, seen from the lower viewing area.")}

<p>Shifen Waterfall (十分瀑布) is a broad curtain of water, roughly 40 metres wide and 20 metres high, where the Keelung River drops over a ledge of tilted rock into a deep green pool. Its shape has earned it the nickname "Taiwan's Niagara", and on a sunny morning the spray throws a rainbow over the pool. It sits in Shifen Waterfall Park, which the city runs.</p>

<ul>
<li><strong>Hours:</strong> 09:00 to 17:00 from October to May, last entry 16:30. From June to September it stays open an hour later, to 18:00 (last entry 17:30). Closed on Lunar New Year's Eve only.</li>
<li><strong>Entry:</strong> free.</li>
<li><strong>Getting there:</strong> from Shifen station allow 20 to 30 minutes on foot. The path starts at the Shifen Visitor Center, and from there it is about 15 minutes along a level riverside trail.</li>
</ul>

<p><strong>The suspension bridges.</strong> Behind the visitor centre the path crosses the Siguangtan Suspension Bridge and then the Guanpu Suspension Bridge, which spans the river where a side stream joins it. Pingxi trains rumble over the railway bridge right next to it, so it's a good spot to wait for one. Along the way you pass the smaller Eyeglass Cave Falls and potholes worn into the riverbed. There are several platforms, at the top of the falls and facing them from below; the lower one gives the classic front view.</p>

${figure("waterfallPlatform", "Visitors on one of the viewing platforms; the falls are fullest after rain.")}

${SPACER}

<h2 id="Pingxi">Pingxi Old Street</h2>

<p>Two stops further up the line, Pingxi (平溪) is quieter than Shifen and feels more like a working village. The railway crosses the main street on a high bridge, so trains pass over your head rather than past your elbow. It was the setting for the lantern scene in the 2011 film <em>You Are the Apple of My Eye</em>, which brought a wave of visitors, and lanterns are sold here too. Look out for the Japanese-era air-raid shelters cut into the hillside, the small Guanyin Temple, and the post box that the city's tourist board describes as the oldest in Taiwan. Food is mostly cheap local street snacks. Pingxi also hosts one of the two evenings of the sky lantern festival (see below).</p>

<h2 id="Jingtong">Jingtong</h2>

${figure("jingtongStation", "Jingtong's wooden station, which opened in 1929.")}

<p>Jingtong (菁桐) is the end of the line, a small town that grew up around coal mining. The <strong>station</strong> opened in 1929 and is one of the few Japanese-style wooden stations still in use; it has been a listed monument since 2003. Along the track and the short old street, <strong>bamboo tubes</strong> with wishes written on them hang from fences and trees, a custom that grew out of the lantern festival. Nearby are a row of old Japanese staff dormitories, a small mining museum and shops selling the miner's lunch box (礦工便當).</p>

<p>At the top of the street stands the glass <strong>Electronic Sky Lantern Hall</strong>, which has toilets, a visitor counter and a viewing deck. According to the city's tourism website, which was last updated in 2022, you can buy an LED "wish lantern" at the Pingxi police station for NT$150. You write on a postcard, it is shown on the big lantern in the plaza during the evening light shows (16:00 to 19:00 on weekdays, to 20:00 on holidays), and you keep the card.</p>

${figure("jingtongTrain", "A train waits at Jingtong on a wet day; the valley gets plenty of rain.")}

${SPACER}

<h2 id="Festival">The Pingxi Sky Lantern Festival 2027</h2>

${figure("festival", "A mass release at the 2014 festival.")}

<p>The festival is held each year around the Lantern Festival, the fifteenth day of the lunar new year, when waves of lanterns are released together after dark. <strong>The 2027 dates had not been announced at the end of October 2026.</strong> The Lantern Festival itself falls on <strong>Saturday 20 February 2027</strong>, so expect events in the week or two around it.</p>

<p>For reference, the 2026 festival had two evenings: <strong>27 February</strong> at Pingxi Junior High School and <strong>3 March</strong> at Shifen Square, each with nine releases between 18:00 and about 21:20. Free launch tickets were booked online (they ran out) or handed out from 10:30 on the day at the information desk. Roads into Pingxi closed to traffic in the afternoon, and shuttle buses ran from Taipei Zoo, Ruifang station and Keelung. Crowds are huge, so if you go, arrive early and plan your way home before you set off. The official dates usually appear on New Taipei's tourism website and Facebook page a few weeks beforehand.</p>

${SPACER}

<h2 id="Jiufen">Combining with Jiufen</h2>

<p>Ruifang is the hub for both places, which makes Shifen and <a href="/jiufen">Jiufen</a> an easy pair. The usual plan is the Pingxi line in the morning, when the lantern streets are quieter, back to Ruifang by mid-afternoon, then a bus up the hill to arrive in Jiufen for dusk, when its red lanterns are lit. Our Jiufen guide covers <a href="/jiufen#Train">the buses from Ruifang</a>. Doing it the other way round works less well: the evening return from Jingtong is thin, with long gaps between trains.</p>

<p>If you only have one day for the whole north-east, the bus tours below do Shifen, Jiufen and the coast at Yehliu in about nine hours. For other ideas, see our <a href="/best-day-trips-from-taipei">round-up of day trips from Taipei</a>.</p>

${SPACER}

<h2 id="Tours">Day Tours That Include Shifen</h2>

<p>All three of these were checked on Klook in October 2026 and include Shifen Old Street with a lantern stop. Prices shown are the lowest Klook listed at the time and change by date. The pages don't make clear whether the lantern itself is included, so check the package details before you book.</p>

<h3 id="Tour-Value">Yehliu, Jiufen, Shifen &amp; Golden Waterfall</h3>

<p>The most booked tour of its kind, with a 4.9 rating from more than 50,000 reviews. A coach leaves from Taipei Main Station's East Gate 3 for Yehliu Geopark, Shifen Old Street (with a lantern launch), the Golden Waterfall and Jiufen; some versions finish in Jiufen after dark. ${tour("yehliu-jiufen-shifen-golden-waterfall", "<strong>See the Yehliu, Jiufen and Shifen tour on Klook</strong>")}</p>

${tourTable("7 hr 15 min &ndash; 9 hr 45 min", "Taipei Main Station", "About &pound;17")}

<h3 id="Tour-Waterfall">Yehliu, Jiufen &amp; Shifen with Shifen Waterfall</h3>

<p>A similar coach day whose listed highlights include Shifen Waterfall as well as the old street, with an optional stop at Tiaoshi, a small station on the Pingxi line. Rated 4.9 from about 15,800 reviews. ${tour("yehliu-jiufen-shifen-waterfall", "<strong>See the Shifen Waterfall tour on Klook</strong>")}</p>

${tourTable("9 hr 15 min &ndash; 10 hr", "Taipei", "About &pound;18.50")}

<h3 id="Tour-Pickup">Yehliu, Yin &amp; Yang Sea, Shifen and Jiufen with Hotel Pick-Up</h3>

<p>A shared car or minibus rather than a big coach, with pick-up from hotels in central Taipei (Zhongzheng, Zhongshan, Datong and Wanhua) or a meeting point at Taipei Main Station's West Gate 3 at 08:30. Rated 4.6 from about 600 reviews. ${tour("yehliu-jiufen-shifen-hotel-pickup", "<strong>See the hotel pick-up tour on Klook</strong>")}</p>

${tourTable("9 &ndash; 10 hr", "Your hotel or Taipei Main", "About &pound;21")}

${SPACER}

<h2 id="When">Best Time to Go</h2>

<ul>
<li><strong>A weekday morning.</strong> Shifen is packed at weekends and on public holidays. An early train from Ruifang (07:12 or 07:55) gets you to Shifen before the shops are busy, though the waterfall park doesn't open until 09:00.</li>
<li><strong>Autumn and spring</strong> are the most comfortable. Summer is hot and humid, with frequent afternoon thunderstorms, but the waterfall is at its fullest and its park stays open later.</li>
<li><strong>October to March</strong> brings the north-east monsoon: low cloud and days of drizzle in the valley. Business owners told PTS News that on monsoon days the street gets a fraction of its usual trade. A light drizzle won't ground a lantern, but heavy rain will.</li>
<li><strong>Typhoons</strong> can stop trains and close parks; check the forecast before setting out between July and October.</li>
</ul>

<p>Month-by-month rainfall and temperatures are in our <a href="/taipei-weather-by-month">Taipei weather guide</a>, and our guide to <a href="/best-time-to-visit-taipei">the best time to visit</a> covers holidays and crowds.</p>

<h2 id="Tips">Tips</h2>

<ul>
<li><strong>Write the last train time down.</strong> 20:30 from Jingtong, 20:57 from Shifen. After that you are relying on the 795 bus or a taxi from the valley.</li>
<li><strong>Carry cash.</strong> Lantern shops and food stalls mostly don't take cards.</li>
<li><strong>Buy a lantern where you'll launch it.</strong> Lanterns are bulky to carry between towns.</li>
<li><strong>Wear shoes with grip.</strong> The waterfall paths and steps are wet for much of the year.</li>
<li><strong>Get mobile data</strong> for the train times: see our <a href="/taiwan-sim-cards">SIM and eSIM guide</a>.</li>
<li><strong>Houtong</strong>, the cat village, is a stop on the way in, between Ruifang and Shifen; an hour there fits easily into a morning.</li>
</ul>

${SPACER}

<h2 id="FAQ">Common Questions</h2>

<h3>Is the Pingxi line day pass worth buying?</h3>

<p>Only if you'll ride a lot. It costs NT$120, and a straightforward Ruifang to Shifen, Pingxi, Jingtong and back comes to NT$117 in single fares. Add Houtong or another stop and it starts to save money; otherwise tap an EasyCard.</p>

<h3>Can you still release sky lanterns at Shifen?</h3>

<p>Yes. The shops sell and launch lanterns every day. What's not allowed is stepping onto the railway to do it, which carries a fine under the Railway Act.</p>

<h3>Shifen or Pingxi for the lanterns?</h3>

<p>Shifen has the most shops and the trains running through the street; Pingxi is calmer and smaller. Both sell lanterns at much the same price.</p>

<h3>How much time should I allow?</h3>

<p>Half a day covers Shifen and the waterfall. A full day lets you add Pingxi and Jingtong, or Jiufen in the evening.</p>

<h3>Is Shifen Waterfall free?</h3>

<p>Yes. The park charges nothing, and it is open daily from 09:00, closing at 17:00 or 18:00 depending on the season.</p>

<h3>Can I do Jiufen and Shifen in one day?</h3>

<p>Yes. Go to Shifen first, come back to Ruifang, and take the bus up to Jiufen for the evening. Or let a tour handle the connections.</p>

<h3>When is the 2027 Sky Lantern Festival?</h3>

<p>Not yet announced. The Lantern Festival is on 20 February 2027, and the Pingxi events are normally held on or near that date.</p>
`;

// ---------------------------------------------------------------------------

const filePath = path.resolve(process.env.POSTS_PATH || "content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const fail = (m) => { console.error(`${m} - aborting, nothing written.`); process.exit(1); };

if (posts.some((p) => p.slug === SLUG)) fail(`/${SLUG} already exists`);

const bySlug = new Map(posts.map((p) => [p.slug, p]));
const ids = (html) => new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
const ownIds = ids(CONTENT);

// Every internal link must point at an existing post, and every #anchor must exist.
for (const [, href] of CONTENT.matchAll(/href="(\/[^"]*|#[^"]+)"/g)) {
  const [pathPart, anchor] = href.split("#");
  if (pathPart) {
    const s = pathPart.replace(/^\/|\/$/g, "");
    if (!bySlug.has(s)) fail(`internal link ${href} has no post`);
    if (anchor && !ids(bySlug.get(s).content).has(anchor)) fail(`anchor #${anchor} not found on /${s}`);
  } else if (!ownIds.has(anchor)) fail(`in-page anchor #${anchor} not found`);
}
// Every Klook link must carry the affiliate id.
for (const [, u] of CONTENT.matchAll(/href="(https:\/\/www\.klook\.com[^"]+)"/g)) {
  if (!u.endsWith("?aid=8733")) fail(`Klook link without aid: ${u}`);
}
// Every image needs width and height, and every Commons photo a credit.
for (const tag of CONTENT.match(/<img [^>]+>/g) || []) {
  if (!/\swidth="\d+"/.test(tag) || !/\sheight="\d+"/.test(tag)) fail(`image without size: ${tag}`);
}
for (const p of Object.values(PHOTOS)) {
  if (!CONTENT.includes(`${MEDIA}/${p.file}`)) fail(`photo ${p.file} not used`);
  if (!CONTENT.includes(`href="${p.page}"`)) fail(`photo ${p.file} not credited`);
  const local = path.resolve("public" + MEDIA, p.file);
  if (!fs.existsSync(local)) fail(`missing file ${local}`);
}

const title = "Shifen & Pingxi Day Trip: Sky Lanterns, Waterfall & Trains";
if (title.length > 60) fail(`title is ${title.length} chars`);

// Guarded link paragraphs on two related pages.
const LINK_INS = [
  {
    slug: "jiufen",
    after: `<li><strong>Shifen</strong> - famous for its waterfall and sky lantern releases, reachable via the Pingxi Branch Line from Ruifang.</li>`,
    // Inserted after the closing </ul> that follows the marker.
    para: `<p>Planning the Shifen half of the day yourself? Our <a href="/${SLUG}">Shifen and Pingxi guide</a> has the Pingxi line times and day pass, the waterfall's opening hours and the rules on launching lanterns.</p>`,
  },
  {
    slug: "best-day-trips-from-taipei",
    after: `After visiting both Jiufen and Shifen old streets, you'll also get to experience the sky lanterns.</p>`,
    para: `<p>Shifen is just as easy to reach on your own by train. Our <a href="/${SLUG}">Shifen and Pingxi day trip guide</a> covers the route via Ruifang, the last trains back, the waterfall and Jingtong at the end of the line.</p>`,
  },
];
const edits = [];
for (const ins of LINK_INS) {
  const p = bySlug.get(ins.slug);
  if (!p) fail(`/${ins.slug} missing`);
  if (p.content.includes(`href="/${SLUG}"`)) { console.log(`  /${ins.slug} already links here, skipped`); continue; }
  const count = p.content.split(ins.after).length - 1;
  if (count !== 1) fail(`marker found ${count} times on /${ins.slug}`);
  let at = p.content.indexOf(ins.after) + ins.after.length;
  if (ins.slug === "jiufen") {
    const close = p.content.indexOf("</ul>", at);
    if (close < 0) fail("no </ul> after the Jiufen marker");
    at = close + "</ul>".length;
  }
  edits.push(() => {
    p.content = p.content.slice(0, at) + `\n\n\n\n${ins.para}` + p.content.slice(at);
    p.modified = TODAY;
  });
}

posts.push({
  id: Math.max(...posts.map((p) => p.id || 0)) + 1,
  authorId: 2,
  date: TODAY,
  modified: TODAY,
  slug: SLUG,
  title,
  excerpt:
    "How to visit Shifen, Pingxi and Jingtong from Taipei: the Pingxi line and bus 795, the NT$120 day pass, last trains, sky lantern prices and track rules, Shifen Waterfall's hours and the 2027 festival.",
  type: "post",
  parentId: 0,
  content: CONTENT,
  categories: [{ name: "Visit", slug: "visit" }, { name: "Areas", slug: "areas" }],
  tags: [{ name: "Nature", slug: "nature" }, { name: "Great Views", slug: "great-views" }, { name: "Walking", slug: "walking" }],
  featuredImage: `${MEDIA}/${PHOTOS.hero.file}`,
});
edits.forEach((e) => e());

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2) + "\n");

console.log(`Added /${SLUG} to ${filePath}`);
console.log(`  title: ${title} (${title.length})`);
console.log(`  ${CONTENT.length} chars, ${Object.keys(PHOTOS).length} photos, ${Object.keys(KLOOK).length} Klook tours`);
console.log(`  link paragraphs added: ${edits.length}`);
