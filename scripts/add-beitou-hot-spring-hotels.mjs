// New guide: Beitou hot spring hotels.
//
// WHY THIS PAGE. Fourth in the hotels series after Taipei Main Station,
// Ximending and Taipei 101. The where-to-stay guide names two Beitou hotels;
// readers who have already decided to spend a night there want the wider
// field, which spring each hotel uses, who can use the shared baths and how
// to get from the station to a hotel halfway up Youya Road.
//
// SCOPE. Where to stay only. The public baths, bathing etiquette and the
// Xinbeitou sights live in taipei-hot-springs and xinbeitou, and this page
// links to them rather than repeating them.
//
// SOURCING. data/research/beitou-hot-spring-hotels.md. A consensus count of
// 12 English publishers and 10 Taiwanese round-ups, then each hotel checked
// against its official site and dated reviews, and priced for a November 2026
// Wednesday and Saturday (Booking.com, or Klook / Trip.com where a hotel is
// not on Booking). That is why the Millennium pool is described as shut, why
// Kagaya is white sulphur only (its green-sulphur annex closed in July 2025),
// why Hotel Royal is white rather than green, why Spring City's outdoor pools
// are swimwear rather than nude, and why Marshal Zen Garden (no rooms) and
// Whispering Pines (reported closed) are left out.
//
// NOT A COPY. No eight-word run is shared with the where-to-stay page, the
// hot springs, Xinbeitou and Yangmingshan guides, the three other hotel
// guides or any other post (checked before publishing).
//
// OTHER PAGES. Not touched by this script. The discrepancies found in them
// are listed in the research file, section 5.
//
// AFFILIATE LINKS. Every hotel with a confirmed Klook page links to it (each
// URL opened and its address checked on 29 Sep 2026) and carries
// data-hotel="<key>" so the lot can switch to Agoda by key. Villa 32 has no
// Klook listing, so it is an unlinked span with the same key.
//
// No FAQ block (FAQs are kept to the main guides) and no Perfect For box.
//
// POSTS_PATH=<file> writes to a copy instead of content/posts.json.

import fs from "fs";
import path from "path";

const SLUG = "beitou-hot-spring-hotels";
const TODAY = "2026-09-29 12:00:00";

const KLOOK = {
  "grand-view-resort-beitou": "https://www.klook.com/en-GB/hotels/detail/270152-grand-view-resort-beitou/?aid=8733",
  "spring-city-resort-beitou": "https://www.klook.com/en-GB/hotels/detail/452608-spring-city-resort/?aid=8733",
  "radium-kagaya-beitou": "https://www.klook.com/en-GB/hotels/detail/422386-radium-kagaya-taipei/?aid=8733",
  "gaia-hotel-beitou": "https://www.klook.com/en-GB/hotels/detail/435262-the-gaia-hotel-taipei/?aid=8733",
  "wellspring-by-silks-beitou": "https://www.klook.com/en-GB/hotels/detail/1732687-wellspring-by-silks-beitou/?aid=8733",
  "hotel-royal-beitou": "https://www.klook.com/en-GB/hotels/detail/81225-hotel-royal-beitou/?aid=8733",
  "asia-pacific-hotel-beitou": "https://www.klook.com/en-GB/hotels/detail/561660-asia-pacific-hotel-beitou/?aid=8733",
  "beitou-hot-spring-resort": "https://www.klook.com/en-GB/hotels/detail/428789-beitou-hot-spring-resort/?aid=8733",
  "water-house-beitou": "https://www.klook.com/en-GB/hotels/detail/275688-water-house/?aid=8733",
  "sweetme-hot-spring-resort-beitou": "https://www.klook.com/en-GB/hotels/detail/268454-beitou-sweetme-hotspring-resort/?aid=8733",
  "phoenix-pavilion-beitou": "https://www.klook.com/en-GB/hotels/detail/446431-phoenix-pavilion-hot-spring-hotel-beitou/?aid=8733",
  "golden-hot-spring-hotel-beitou": "https://www.klook.com/en-GB/hotels/detail/436867-golden-hot-spring-hotel/?aid=8733",
  "chyuan-du-spring-resort-beitou": "https://www.klook.com/en-GB/hotels/detail/56014-chyuan-du-spring-resort/?aid=8733",
};

const hotel = (key, name) =>
  KLOOK[key]
    ? `<a href="${KLOOK[key]}" data-hotel="${key}" target="_blank" rel="noreferrer noopener">${name}</a>`
    : `<span data-hotel="${key}">${name}</span>`;

const CONTENT = `
<p><strong>Beitou</strong> is where Taipei's volcanic water comes to the surface, and nearly every hotel in the valley pipes it straight into the rooms. Most visitors come for an afternoon, soak once and ride the Metro back into town. Spending the night is a different experience: a tub of your own that you can fill at midnight and again before breakfast, the shared baths after the day crowds leave, and a quiet evening in streets that smell faintly of sulphur. This guide covers fourteen hotels, from a five-room retreat with a MICHELIN Key to a tatami inn charging under NT$3,000, with November 2026 prices, the spring each one draws on and how to reach it from the station. For the public baths and how to use them, see our <a href="/taipei-hot-springs">Taipei hot springs guide</a>; for the museum, the library and Thermal Valley, see the <a href="/xinbeitou">Xinbeitou guide</a>.</p>

<div class="quick-verdict"><p class="quick-verdict-title">💡 The Quick Verdict: Beitou Hot Spring Hotels</p><ul><li><strong>Best all-round luxury:</strong> ${hotel("grand-view-resort-beitou", "Grand View Resort Beitou")} &ndash; 66 rooms of 50&nbsp;m² or more, each with a balcony and a stone hot spring pool, plus a free shuttle from Beitou station.</li>
<li><strong>The splurge:</strong> ${hotel("villa-32-beitou", "Villa 32")}, five rooms and the only hotel here offering green sulphur water as well as white. Over-16s only.</li>
<li><strong>For families:</strong> ${hotel("asia-pacific-hotel-beitou", "Asia Pacific Hotel")} for its indoor pool and games room, or ${hotel("spring-city-resort-beitou", "Spring City Resort")} for outdoor swimsuit pools that take children of any age.</li>
<li><strong>Closest to the station:</strong> ${hotel("hotel-royal-beitou", "Hotel Royal Beitou")}, about a minute from exit 1 of Xinbeitou.</li>
<li><strong>Cheapest night:</strong> ${hotel("phoenix-pavilion-beitou", "Phoenix Pavilion")}, an old tatami inn with stone tubs in the rooms.</li></ul></div>



<h2 id="Why-Stay">Stay the Night or Come for the Day?</h2>

<p>A day trip is easy. Xinbeitou is about half an hour from Taipei Main Station by Metro, and almost every hotel in this guide rents private bath rooms by the hour to people who aren't staying. If all you want is one good soak, an afternoon visit and a 90-minute private room will cost less than a night in any of the hotels below.</p>

<p>An overnight stay makes more sense if you want to bathe more than once, if you're a couple looking for a treat, or if you're travelling with children and want a hotel pool that accepts them. It also suits the first or last night of a trip, when a long bath is more appealing than another museum, and anyone heading up to <a href="/yangmingshan-national-park">Yangmingshan</a> early the next morning, since the buses leave from Beitou station. Beitou is a poor base for seeing the rest of the city, though: it sits near the top of the Red line, and every trip to the centre and back costs you an hour.</p>

<p>Hotels treat October to March or April as their high season, because the baths are most pleasant when the air is cold; the weather month by month is in <a href="/best-time-to-visit-taipei">our best time to visit guide</a>. Most charge weekend rates on Friday and Saturday nights and on the eve of public holidays, although Kagaya counts only Saturday. One change for anyone planning around the cheap public pool: the Millennium Hot Spring in Beitou Park (the NT$60 open-air pool) has been <strong>shut for a rebuild since 24 January 2025</strong>. The works were due to finish on 26 September 2026, but no reopening date had been announced on 29 September, so a hotel is currently the surest way to bathe outdoors.</p>



<h2 id="What-To-Look-For">What to Look For When You Book</h2>

<ul>
<li><strong>An in-room bath.</strong> Every hotel in this guide has a hot spring tub in each room, but they vary a lot, from a single stone basin in a small windowless bathroom to separate hot and cold pools on a balcony. Check the photos of the exact room type before you pay.</li>
<li><strong>The spring.</strong> Beitou has three kinds of water. White sulphur (<em>baihuang</em>) is milky, mildly acidic (around pH 3&ndash;5) and comes down from Sulphur Valley; it's what all fourteen hotels use. Green sulphur (<em>qinghuang</em>) rises at Thermal Valley, is far more acidic (pH 1&ndash;2) and is offered by only one hotel here, Villa 32. Some Taiwanese blogs name iron sulphur as a third type, but none of these hotels uses it. Kagaya's green-sulphur annex, Xinxiuge, <strong>closed permanently on 4 July 2025</strong>, so reviews that mention it are out of date.</li>
<li><strong>Nude or swimwear.</strong> Shared indoor and open-air baths at Beitou hotels are usually nude and split by sex, with phones banned at several. Mixed pools need a swimsuit and a swimming cap: that applies to Spring City's outdoor pools, Grand View's outdoor pool and Asia Pacific's indoor pool. The hot springs guide explains the bathing routine.</li>
<li><strong>Age limits.</strong> These differ more than you might expect. Villa 32 takes no one under 16 anywhere on the property. Grand View, Gaia and Asia Pacific keep under-12s out of their nude baths; Tian Yue Quan's bath is for anyone 140&nbsp;cm or taller, Sweetme's for 120&nbsp;cm and up, and Hotel Royal's from age four. Spring City's swimsuit pools have no minimum.</li>
<li><strong>Tattoos.</strong> We searched the bath rules of Grand View, Kagaya, Gaia, Asia Pacific and Hotel Royal and found no tattoo policy at any of them, in English or Chinese. That isn't a guarantee either way. If it worries you, rely on the tub in your room or book a private bath room.</li>
<li><strong>Day-use "rest" packages.</strong> Hotels sell private rooms by the session, usually 90 minutes for two people. On current published prices that runs from NT$1,400 on a weekday at Tian Yue Quan (walk-in only) and NT$1,980 at Waterhouse to NT$2,000&ndash;2,800 plus service at Kagaya and NT$2,500&ndash;3,500 at Grand View, whose autumn and winter offer adds lunch for two for NT$5,260 in total.</li>
</ul>

<figure class="wp-block-table is-style-stripes"><table><thead><tr><th>Hotel</th><th>Wednesday price</th><th>Spring</th><th>Bath in every room?</th><th>From the Metro</th></tr></thead><tbody>
<tr><td>${hotel("villa-32-beitou", "Villa 32")}</td><td>From NT$18,800 (summer rate)</td><td>White and green</td><td>Yes</td><td>10 mins' walk from Xinbeitou</td></tr>
<tr><td>${hotel("grand-view-resort-beitou", "Grand View Resort")}</td><td>From about NT$12,600</td><td>White</td><td>Yes</td><td>Free shuttle from Beitou</td></tr>
<tr><td>${hotel("wellspring-by-silks-beitou", "Wellspring by Silks")}</td><td>From about NT$11,700</td><td>White</td><td>Yes</td><td>3 mins from Xinbeitou</td></tr>
<tr><td>${hotel("radium-kagaya-beitou", "Radium Kagaya")}</td><td>About NT$11,200 (room only)</td><td>White</td><td>Yes</td><td>5&ndash;10 mins from Xinbeitou, or shuttle from Beitou</td></tr>
<tr><td>${hotel("gaia-hotel-beitou", "The Gaia Hotel")}</td><td>From about NT$10,500</td><td>White</td><td>Yes</td><td>8&ndash;10 mins from Xinbeitou, or shuttle</td></tr>
<tr><td>${hotel("hotel-royal-beitou", "Hotel Royal Beitou")}</td><td>From about NT$8,700</td><td>White</td><td>Yes</td><td>1 min from Xinbeitou</td></tr>
<tr><td>${hotel("asia-pacific-hotel-beitou", "Asia Pacific Hotel")}</td><td>From about NT$8,300</td><td>White</td><td>Yes</td><td>Shuttle on request, or about 15 mins</td></tr>
<tr><td>${hotel("spring-city-resort-beitou", "Spring City Resort")}</td><td>About NT$6,200</td><td>White</td><td>Yes</td><td>Free shuttle loop from both stations</td></tr>
<tr><td>${hotel("sweetme-hot-spring-resort-beitou", "Sweetme")}</td><td>From about NT$5,700</td><td>White</td><td>Yes</td><td>3 mins from Xinbeitou</td></tr>
<tr><td>${hotel("beitou-hot-spring-resort", "Tian Yue Quan")}</td><td>From about NT$5,600</td><td>White</td><td>Yes, plus a steam room</td><td>2&ndash;3 mins from Xinbeitou</td></tr>
<tr><td>${hotel("water-house-beitou", "Waterhouse")}</td><td>From about NT$5,400</td><td>White</td><td>Yes</td><td>8&ndash;10 mins from Xinbeitou</td></tr>
<tr><td>${hotel("golden-hot-spring-hotel-beitou", "Golden Hot Spring")}</td><td>About NT$4,500 (windowless)</td><td>White</td><td>Yes, per reviews</td><td>5&ndash;6 mins from Xinbeitou</td></tr>
<tr><td>${hotel("chyuan-du-spring-resort-beitou", "Chyuan Du")}</td><td>From about NT$3,000</td><td>White</td><td>Reported</td><td>2 mins from Xinbeitou</td></tr>
<tr><td>${hotel("phoenix-pavilion-beitou", "Phoenix Pavilion")}</td><td>From about NT$2,800</td><td>White</td><td>Yes</td><td>About 15 mins, or shuttle on request</td></tr>
</tbody></table></figure>

<p><em>Prices are for two adults sharing on Wednesday 11 November 2026, checked on 29 September and including tax. Most come from Booking.com. Kagaya and Spring City are not listed there, so their figures are Klook's, converted from pounds; Golden Hot Spring's is from Trip.com; Grand View's is the hotel's own winter bed-and-breakfast rate. Villa 32 had not published its winter prices. Walking times are the hotels' own or those of travel bloggers, not our own timings. Treat every figure as a snapshot.</em></p>



<h2 id="Luxury">Luxury Hotels</h2>

<h3>${hotel("villa-32-beitou", "Villa 32")}</h3>

<p>With five rooms, membership of Relais &amp; Châteaux and a MICHELIN One Key awarded in September 2026, this is the most exclusive place to sleep in Beitou. It stands at 32 Zhongshan Road beside Thermal Valley, about 780 metres or ten minutes on foot from Xinbeitou according to Travels with Elle; no shuttle is listed. The hotel's own site names both white and green sulphur, which makes it the only choice in this guide for trying the sharper green water in private. Two rooms are Japanese in style and three European, and each has its own spring-fed bath. Guests can use the shared baths as often as they like (no phones allowed); afterthirtytravel, writing in May 2026, describes them as nude and separated by sex, though the hotel doesn't say so. <strong>No one under 16 is admitted.</strong> Summer half-board packages ran from NT$18,800 to NT$25,800 a night for two until 30 September; winter rates had not appeared when we looked, and the hotel isn't bookable on Klook, so enquire directly.</p>

<h3>${hotel("grand-view-resort-beitou", "Grand View Resort Beitou")}</h3>

<p>The most widely recommended hotel in Beitou, and the one we'd point most people to first. It's at 30 Youya Road on the hillside above the park, with 66 rooms of at least 50&nbsp;m², every one with a private balcony and a bathing area built from Guanyin stone, with separate hot and cold pools and a hinoki bucket. The white sulphur water is piped from a source about a kilometre away. Guests get two sets of shared baths free: a nude open-air bath, split by sex and closed to under-12s, and a mixed outdoor pool with two hot pools where a swimsuit and cap are required and children may join an adult. The hotel says its Taiwanese restaurant is recommended by MICHELIN. Its own winter bed-and-breakfast rate for a mountain-view room is NT$12,600 Sunday to Thursday and NT$13,860 on Friday and Saturday; on our Saturday check, Booking.com had only a four-person room left at about NT$24,900. The free shuttle leaves from the right-hand side of exit 1 at Beitou station, every half hour from 10:00 to 18:00 and then hourly until 22:00, with no booking needed. Children under six stay free if they skip breakfast.</p>

<h3>${hotel("wellspring-by-silks-beitou", "Wellspring by Silks Beitou")}</h3>

<p>The newest big hotel in the valley, opened in 2024 by the Silks group, which also runs the Regent in Taipei. Its main draw is location: it faces Xinbeitou station across Quanyuan Road, three minutes on foot. There are 100 rooms, and according to the blog mimigo more than nine in ten have twin hot and cold pools; Supertaste reports semi-open-air tubs in some garden rooms and outdoor pools in the view suites. The same reports describe nude shared baths with a steam room, a hinoki sauna and three pools at different temperatures, and there's an outdoor swimming pool and a children's playroom. The MICHELIN Guide lists the hotel (without a Key) and notes that children aged six and over pay the adult rate and that there are no cots or extra beds. The official site wouldn't fully load for us, so these details rest on press and blog reports. Booking.com had a midweek deal at about NT$11,700 against a usual NT$16,500, and about NT$15,100 on the Saturday.</p>

<h3>${hotel("radium-kagaya-beitou", "Radium Kagaya")}</h3>

<p>A Japanese-style hotel on Guangming Road, facing the Hot Spring Museum, with a kaiseki restaurant and rooms that combine a Japanese sitting area with a private bath; the larger categories add a semi-open-air tub and balcony, and split-level rooms sleep up to six. The fourth-floor shared bath is nude, separated by sex and open to guests from 07:00 to 23:00. Kagaya now offers <strong>white sulphur only</strong>: its green-sulphur annex closed for good in July 2025, and the hotel says its water is settled to remove the sediment and much of the smell. Xinbeitou exit 1 is five to ten minutes away on foot, or there's a shuttle from Beitou exit 1 for up to eight people, which has to be booked the day before on 02-2891-1238. Kagaya isn't on Booking.com and doesn't publish its package prices; Klook's cheapest midweek option was a room without breakfast at about NT$11,200, and its Saturday price with breakfast was close to NT$24,500. The restaurant has several maintenance closures in November 2026, so check the dates before booking dinner. Children under 100&nbsp;cm stay free.</p>

<h3>${hotel("gaia-hotel-beitou", "The Gaia Hotel")}</h3>

<p>A large hotel at 1 Qiyan Road, eight to ten minutes' walk from Xinbeitou by the hotel's reckoning, with a free shuttle from both stations. Every room has a white sulphur pool. The nude shared baths are limited to 20 people at a time and to guests aged 12 and over, with an indoor pool, a cold pool, an outdoor pool, a sauna, a steam room and a machine that makes artificial snow; they close on Thursdays from 11:00 to 15:00. Several bloggers mention a library of some 20,000 books, which the hotel's site doesn't quantify, and there are Chinese, Western and shabu-shabu restaurants, a gym and a Muslim-friendly room type. On Booking.com a twin room with breakfast was about NT$10,500 midweek and NT$12,100 on the Saturday.</p>



<h2 id="Mid-Range">Mid-Range Hotels</h2>

<h3>${hotel("hotel-royal-beitou", "Hotel Royal Beitou")}</h3>

<p>The easiest hotel here to reach, about a minute from Xinbeitou exit 1 on Zhonghe Street. The interiors are by the Dutch firm Mecanoo, the hotel markets itself as Taiwan's first wellness hotel, and guests can join free fitness classes. Every room has white sulphur water (pH 4&ndash;5, according to the hotel's room page); one Taiwanese blog calls it green sulphur, but the hotel's own description says otherwise. The top-floor baths are nude and split by sex, with a sauna and a steam room; children must be at least four, and under-12s have to go in with a parent of the same sex. The baths shut on the first Wednesday of each month, which is 4 November in 2026. Booking.com showed a double with breakfast at about NT$8,700 midweek and NT$11,400 on the Saturday.</p>

<h3>${hotel("asia-pacific-hotel-beitou", "Asia Pacific Hotel Beitou")}</h3>

<p>The best-equipped hotel here for children. It's at 31 Youya Road, opposite Grand View, and its 140 rooms are all at least 10 ping (about 33&nbsp;m²), each with its own spring pool and a stone basin of cold water. Downstairs is a 20-metre indoor pool with a 60&nbsp;cm children's pool beside it (swimsuit and cap required), and families can use a VR games room, craft classes and board games. The nude shared baths, by contrast, don't admit under-12s. Check-in is not until 16:00. The walk from the station takes about 15 minutes according to Travels with Elle, but the hotel runs a free shuttle from exit 1 of either Beitou or Xinbeitou if you phone 20 minutes ahead on 02-2898-3088; minibus S25 also stops nearby. A tatami double with breakfast was about NT$8,300 midweek on Booking.com, and a standard double about NT$10,500 on the Saturday.</p>

<h3>${hotel("spring-city-resort-beitou", "Spring City Resort")}</h3>

<p>Grand View's neighbour at 18 Youya Road, and roughly half its price in November. Every room has a Guanyin-stone tub of white sulphur water, according to the hotel, even though Klook's room tags only mention it for some categories. The big attraction is the garden of nine outdoor pools, including hot, cold and splash pools, which are mixed and <strong>require a swimsuit and cap</strong>. Unlike most shared baths in Beitou, they take children of any age, and under-110&nbsp;cm is free. The nude baths are in a separate members' club for over-18s, which guests on the autumn and winter package can enter once for NT$800. A free shuttle loops between the hotel, Xinbeitou exit 1 and Beitou exit 1; the timetable is only posted as an image, so ask at the desk. Spring City isn't on Booking.com for these dates. On Klook, a double with breakfast was about NT$6,200 midweek and NT$8,000 on the Saturday, and the hotel's own winter half-board deal for two, with a set dinner, comes to NT$6,380 on weekdays, with NT$2,000 extra on Friday and Saturday nights.</p>

<h3>${hotel("sweetme-hot-spring-resort-beitou", "Sweetme Hot Spring Resort")}</h3>

<p>A compact resort at 224 Guangming Road, three minutes' walk from Xinbeitou, with a hot spring pool in every room; standard rooms are small, at 19&ndash;26&nbsp;m². The shared bath is nude and split by sex, bans phones and admits children from 120&nbsp;cm, with under-12s accompanied by an adult. Note that staying here gives you two free visits to that bath, not unlimited use, and that it opens at noon on Thursdays. Children up to five stay free, and extra beds are only possible in the tatami rooms. A twin with breakfast cost about NT$5,700 midweek on Booking.com, down from NT$7,250, and a double about NT$6,800 on the Saturday.</p>

<h3>${hotel("beitou-hot-spring-resort", "Beitou Hot Spring Resort (Tian Yue Quan)")}</h3>

<p>Known in Chinese as Tian Yue Quan, and now signed with the extra name Nanfeng, this hotel is at 3 Zhongshan Road, across from Beitou Park and two to three minutes from Xinbeitou. Its rooms pair a white sulphur pool with a private steam room. The shared nude bath covers almost 400 ping (roughly 1,300&nbsp;m²), has no time limit and is only for those 140&nbsp;cm and taller; it closes on the first Monday of each month, which falls on 2 November this year. Its walk-in private rooms, at NT$1,400 for two on weekdays, are among the cheapest in Beitou. Booking.com listed a double with breakfast at about NT$5,600 midweek; nothing was available on the Saturday we checked, which may mean it had sold out.</p>

<h3>${hotel("water-house-beitou", "Waterhouse")}</h3>

<p>A small suite hotel opened in 2019, whose official address is 99 Wenquan Road but whose entrance, the hotel says, is at 248 Guangming Road. It's eight to ten minutes from Xinbeitou through Beitou Park, and minibus S25 stops outside. All five suite types have a bath with a view, and the Tangliu suite looks over Beitou Creek. There's also a shared nude bath, which Nick Kembel lists among Beitou's single-sex baths, and a Western breakfast is included. The catch is check-in: from April to September it's 15:00 on weekdays but 18:00 on Fridays and Saturdays, and from October to March <strong>the hotel sets the time on the day</strong>, depending on demand. Booking.com had an economy double with breakfast at about NT$5,400 midweek and NT$6,000 on the Saturday; the creek-facing suite is NT$6,480 on winter weekdays at the hotel's own rate.</p>



<h2 id="Budget">Budget Hotels</h2>

<h3>${hotel("golden-hot-spring-hotel-beitou", "Golden Hot Spring Hotel")}</h3>

<p>Opened at the end of 2010 at 240 Guangming Road, opposite the Hot Spring Museum and next to the Beitou Library, five or six minutes on foot from Xinbeitou. Travel blogs and recent guest reviews say every room has its own hot spring tub. Be aware that the cheapest room on Trip.com, the 23&nbsp;m² Standard Classic, <strong>has no window</strong>; the 39&nbsp;m² Deluxe does. The blog bobbytravel mentions free parking and complimentary snacks and drinks. Trip.com priced the Standard Classic with breakfast at about NT$4,500 for our Wednesday. The hotel's website was down when we checked on 29 September, but guest reviews dated September 2026 show it's operating.</p>

<h3>${hotel("chyuan-du-spring-resort-beitou", "Chyuan Du Spring Resort")}</h3>

<p>The nearest hotel to the station, about two minutes from Xinbeitou at 220 Guangming Road, looking onto Beitou Park. It has no shared bath, so the tub in your room is the whole experience; it's reported to have around 60 rooms, all with a hot spring bath, and Kembel mentions saunas in some rooms, though we couldn't confirm either on the hotel's site, which was offline on 29 September. The Taipei hot spring association still listed it as open in May 2026, and it was taking bookings for November. On Booking.com a standard room with breakfast was about NT$3,000 midweek and NT$4,000 on the Saturday. There are two indoor car parks.</p>

<h3>${hotel("phoenix-pavilion-beitou", "Phoenix Pavilion")}</h3>

<p>The cheapest room in this guide, in a building the owners say is more than 70 years old and dates from Beitou's era of banquet houses and <em>nakashi</em> street musicians. It's at 106-1 Wenquan Road, beside the Catholic church near Thermal Valley. There are eight room types, including tatami rooms for four or six people and rooms with a semi-open-air tub, all with stone baths of white sulphur water; there's no shared bath. The house rules are worth reading first: <strong>there's no lift</strong>, prams and wheelchairs aren't allowed on the tatami, and check-in isn't until 17:00 on weekdays and 19:00 at weekends. A free shuttle runs from Xinbeitou between 09:00 and 22:00 if you phone on arrival; otherwise the walk takes about 15 minutes. A budget double without breakfast was about NT$2,800 midweek on Booking.com and NT$3,700 on the Saturday. Booking direct means paying a deposit by bank transfer.</p>



<h2 id="Getting-There">Getting to Beitou</h2>

<ul>
<li><strong>From Taipei Main Station:</strong> take the Red line towards Tamsui as far as Beitou, then change to the short branch line for the single stop to Xinbeitou. The Metro puts the journey at about 28 minutes including the change, plus waiting time, and the fare is NT$35. For hotels with a shuttle from Beitou itself (Grand View, Kagaya, Spring City and Asia Pacific), get off there instead: about 22 minutes, NT$30. Our <a href="/mrt">Metro guide</a> and <a href="/taiwan-easycard">EasyCard guide</a> cover tickets.</li>
<li><strong>From Taoyuan airport:</strong> the Airport MRT express reaches A1 Taipei Main in 35 minutes from Terminal 1 and 39 from Terminal 2, for NT$160. Allow 10&ndash;15 minutes to walk through to the Red line platforms, then continue as above. See the <a href="/taoyuan-airport-mrt">Airport MRT guide</a>. Grand View and Asia Pacific both put a taxi from the airport at around NT$1,200.</li>
<li><strong>Hotel shuttles:</strong> Grand View runs from Beitou exit 1 without booking; Spring City loops between both stations; Asia Pacific collects from either station if you call 20 minutes before; Kagaya needs a reservation the day before; Gaia serves both stations; and Phoenix Pavilion picks up at Xinbeitou when you phone. None of the others lists a shuttle.</li>
<li><strong>By bus:</strong> minibus S25 runs from Beitou station through Xinbeitou and past Thermal Valley to Youya Road, which helps with the uphill hotels. Our <a href="/taipei-public-transport">public transport guide</a> explains how the buses work.</li>
<li><strong>On to Yangmingshan:</strong> from Beitou station, the S9 <a href="/taiwan-tourist-shuttle-bus">Taiwan Tourist Shuttle</a> climbs to Yangmingshan and Zhuzihu, and bus 230 runs to the Yangmingshan bus station.</li>
</ul>

<blockquote class="wp-block-quote"><p>Still weighing up Beitou against the rest of the city? Each district is set side by side in <a href="/best-areas-and-hotels-to-stay">where to stay in Taipei</a>, and <a href="/hotels-near-taipei-main-station">hotels near Taipei Main Station</a> are the handiest for the airport. For a hot spring hotel in the mountains instead, Wulai is covered in our <a href="/best-day-trips-from-taipei">day trips from Taipei</a>.</p></blockquote>
`;

const filePath = path.resolve(process.env.POSTS_PATH || "content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const fail = (m) => { console.error(`${m} - aborting, nothing written.`); process.exit(1); };

if (posts.some((p) => p.slug === SLUG)) fail(`/${SLUG} already exists`);

// Every internal link must point at an existing post or page.
const slugs = new Set(posts.map((p) => p.slug));
for (const [, s] of CONTENT.matchAll(/href="\/([^"#?]+)/g)) {
  if (!slugs.has(s)) fail(`internal link /${s} has no post`);
}
// Every Klook link must carry the affiliate id.
for (const [, u] of CONTENT.matchAll(/href="(https:\/\/www\.klook\.com[^"]+)"/g)) {
  if (!u.endsWith("?aid=8733")) fail(`Klook link without aid: ${u}`);
}

const title = "Beitou Hot Spring Hotels (2026): Best Picks by Budget";
if (title.length > 60) fail(`title is ${title.length} chars`);

posts.push({
  id: Math.max(...posts.map((p) => p.id || 0)) + 1,
  authorId: 2,
  date: TODAY,
  modified: TODAY,
  slug: SLUG,
  title,
  excerpt:
    "Fourteen Beitou hot spring hotels by budget, with November prices, which spring each uses, in-room baths, age limits for the shared baths and the shuttles from the MRT.",
  type: "post",
  parentId: 0,
  content: CONTENT,
  categories: [{ name: "Areas", slug: "areas" }, { name: "Hotels", slug: "hotels" }],
  tags: [{ name: "Lists", slug: "lists" }],
  featuredImage: "/media/2022/12/Xinbeitou-16-edited-scaled-1600x1001.jpg",
});

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2) + "\n");

console.log(`Added /${SLUG} to ${filePath}`);
console.log(`  title: ${title} (${title.length})`);
console.log(`  ${CONTENT.length} chars, ${Object.keys(KLOOK).length} hotels linked on Klook`);
