// New guide: Taipei hotels with a swimming pool.
//
// WHY THIS PAGE. The area stay guides mention pools hotel by hotel, but a
// reader who wants a swim (in summer, or with children) has to piece the
// rules together across eight pages. The useful facts are the ones the
// area guides skip: which pools shut in winter, who demands a swim cap,
// which pools sell entry to non-guests, and the children's rules.
//
// SOURCING. data/research/taipei-hotels-with-pools.md, checked 3 Oct 2026.
// Pool facts come from each hotel's official pool or facilities page where
// it could be opened. Where the research rests on press reports or an
// excluded source, the copy attributes and hedges it: Renaissance's winter
// closure (hk01, yam), the Grand Hyatt's hours (hyatt.com blocked), Capella's
// heating and hours (Mr & Mrs Smith snippet), the Marriott's heating (hk01)
// and the Grand Hotel's heating (old listing). Prices are a single
// Booking.com snapshot (Wed 11 Nov 2026, 2 adults) pulled on 3 Oct 2026.
//
// LEFT OUT. Howard Plaza (no pool on its official facilities page), Hotel
// Royal Nikko (no pool on its official page despite a 2018 list) and Aloft
// Taipei Zhongshan (no pool on marriott.com). One line says why.
//
// AFFILIATE LINKS. Every hotel links to its Klook hotel page and carries
// data-hotel="<key>" (keys match the photo folders; renaissance-taipei-
// shihlin, grand-mayfull-taipei, miramar-garden-taipei, caesar-metro-taipei
// and hilton-taipei-sinban are new and have no photos yet; taipei-marriott
// and sheraton-grand-taipei already exist as keys without photos). Spring
// City's outdoor pools are also sold as a Klook activity (7950), linked
// with data-activity.
//
// No FAQ block (FAQs are kept to the main guides) and no Perfect For box.
//
// POSTS_PATH=<file> writes to a copy instead of content/posts.json.

import fs from "fs";
import path from "path";

const SLUG = "taipei-hotels-with-pools";
const TODAY = "2026-10-03 12:00:00";

const KLOOK = {
  "shangri-la-far-eastern-taipei": "https://www.klook.com/en-GB/hotels/detail/254139-shangri-la-far-eastern-taipei/?aid=8733",
  "grand-hyatt-taipei": "https://www.klook.com/en-GB/hotels/detail/425808-grand-hyatt-taipei/?aid=8733",
  "w-taipei": "https://www.klook.com/en-GB/hotels/detail/142088-w-taipei/?aid=8733",
  "okura-prestige-taipei": "https://www.klook.com/en-GB/hotels/detail/279384-the-okura-prestige-taipei/?aid=8733",
  "regent-taipei": "https://www.klook.com/en-GB/hotels/detail/255449-regent-taipei/?aid=8733",
  "mandarin-oriental-taipei": "https://www.klook.com/en-GB/hotels/detail/434580-mandarin-oriental-taipei/?aid=8733",
  "capella-taipei": "https://www.klook.com/en-GB/hotels/detail/1769829-capella-taipei/?aid=8733",
  "humble-house-taipei": "https://www.klook.com/en-GB/hotels/detail/254548-humble-house-taipei-curio-collection-by-hilton/?aid=8733",
  "renaissance-taipei-shihlin": "https://www.klook.com/en-GB/hotels/detail/310788-renaissance-taipei-shihlin-hotel/?aid=8733",
  "taipei-marriott": "https://www.klook.com/en-GB/hotels/detail/268708-taipei-marriott-hotel/?aid=8733",
  "the-grand-hotel-taipei": "https://www.klook.com/en-GB/hotels/detail/409425-the-grand-hotel/?aid=8733",
  "sheraton-grand-taipei": "https://www.klook.com/en-GB/hotels/detail/399225-sheraton-grand-taipei-hotel/?aid=8733",
  "grand-mayfull-taipei": "https://www.klook.com/en-GB/hotels/detail/247164-grand-mayfull-hotel-taipei/?aid=8733",
  "miramar-garden-taipei": "https://www.klook.com/en-GB/hotels/detail/398660-miramar-garden-taipei/?aid=8733",
  "caesar-metro-taipei": "https://www.klook.com/en-GB/hotels/detail/268366-caesar-metro-taipei/?aid=8733",
  "le-meridien-taipei": "https://www.klook.com/en-GB/hotels/detail/409169-le-meridien-taipei/?aid=8733",
  "gloria-residence-taipei": "https://www.klook.com/en-GB/hotels/detail/113738-gloria-residence/?aid=8733",
  "hotel-proverbs-taipei": "https://www.klook.com/en-GB/hotels/detail/281397-hotel-proverbs-taipei/?aid=8733",
  "parkview-taipei": "https://www.klook.com/en-GB/hotels/detail/424671-parkview-taipei/?aid=8733",
  "humble-boutique-hotel-taipei": "https://www.klook.com/en-GB/hotels/detail/750652-humble-boutique-hotel/?aid=8733",
  "hilton-taipei-sinban": "https://www.klook.com/en-GB/hotels/detail/438991-hilton-taipei-sinban/?aid=8733",
  "asia-pacific-hotel-beitou": "https://www.klook.com/en-GB/hotels/detail/561660-asia-pacific-hotel-beitou/?aid=8733",
  "spring-city-resort-beitou": "https://www.klook.com/en-GB/hotels/detail/452608-spring-city-resort/?aid=8733",
  "grand-view-resort-beitou": "https://www.klook.com/en-GB/hotels/detail/270152-grand-view-resort-beitou/?aid=8733",
};

const hotel = (key, name) =>
  KLOOK[key]
    ? `<a href="${KLOOK[key]}" data-hotel="${key}" target="_blank" rel="noreferrer noopener">${name}</a>`
    : `<span data-hotel="${key}">${name}</span>`;

// Spring City's nine outdoor pools are sold to non-guests as a Klook activity.
const SPRING_CITY_POOLS_URL = "https://www.klook.com/en-GB/activity/7950-spring-city-resort-beitou-hot-spring-spa-taipei/?aid=8733";
const springCityPools = (name) =>
  `<a href="${SPRING_CITY_POOLS_URL}" data-activity="spring-city-resort-pools" target="_blank" rel="noreferrer noopener">${name}</a>`;

const CONTENT = `
<p>Taipei's summer is long, hot and sticky, and an afternoon swim between sights does more for a tired family than another air-conditioned mall. Plenty of the city's upmarket hotels have a pool, from a 50-metre outdoor one at the Grand Hotel to a heated tank 43 floors up at the Shangri-La, but few hotels below the luxury level have one, and the rules differ more than you might expect. The catch for anyone travelling between November and March is that several rooftop pools close for the cooler months. This guide covers twenty hotels, pool by pool: when each is open, whether it is heated, who may use it and what a room cost when we checked.</p>

<div class="quick-verdict"><p class="quick-verdict-title">💡 The Quick Verdict: Taipei Hotels with a Pool</p><ul><li><strong>Highest pool:</strong> ${hotel("shangri-la-far-eastern-taipei", "Shangri-La Far Eastern")}, a heated pool on the 43rd floor that is open through the winter and also sells single entries to non-guests.</li>
<li><strong>Biggest pool:</strong> ${hotel("the-grand-hotel-taipei", "The Grand Hotel")}, whose Olympic-size outdoor pool comes with a separate shallow pool for children in the warmer months.</li>
<li><strong>Infinity edge:</strong> ${hotel("renaissance-taipei-shihlin", "Renaissance Taipei Shihlin")}, a 25-metre rooftop pool looking towards Yangmingshan.</li>
<li><strong>Best value:</strong> ${hotel("miramar-garden-taipei", "Miramar Garden")}, with a heated outdoor pool at about NT$5,400 for a midweek night in November.</li>
<li><strong>Cheapest:</strong> ${hotel("caesar-metro-taipei", "Caesar Metro")} in Wanhua, about NT$3,300 midweek, but its pool is unheated and shut in January and February.</li></ul></div>



<h2 id="Before-You-Book">Before You Book</h2>

<p><strong>Pack a swim cap.</strong> The official pool rules at Humble House, the Okura, Miramar Garden, Caesar Metro and Gloria Residence all ask for one, as do the mixed swimsuit pools in Beitou and the city's public pools. None of the hotel pages we read says whether caps are sold or lent at the poolside, so bring your own.</p>

<p><strong>Check the season.</strong> These are the closures published by the hotels, plus two that are only reported:</p>

<ul>
<li><strong>Humble House:</strong> the 7th-floor pool shuts from November to March.</li>
<li><strong>Sheraton Grand:</strong> the rooftop pool closes in January and February.</li>
<li><strong>Caesar Metro:</strong> open March to December only, and not heated.</li>
<li><strong>Renaissance Shihlin:</strong> Taiwanese travel sites (hk01 in 2023, yam) report a winter closure; Marriott's own page gives no months, so ask the hotel before booking for November to March.</li>
<li><strong>The Grand Hotel:</strong> the main pool runs all year on shorter winter hours, but the children's pool is open only from May to October.</li>
<li><strong>Grand Mayfull:</strong> a few weeks of annual maintenance in mid-winter (19 January to 13 February in 2026) and a closure from 15:00 on the second Monday of every month.</li>
<li><strong>Shangri-La:</strong> the 43rd-floor pool closes for a month each year for maintenance; in 2026 that ran from 31 August to 30 September, and the pool reopened in October. Its second pool, on the 7th floor, is summer-only.</li>
<li><strong>Monthly or weekly days off:</strong> Miramar Garden shuts on the first Monday of the month, Gloria Residence every Monday, and the Grand Hyatt lists wet-area maintenance on certain Mondays (2 November is the next one in 2026).</li>
</ul>

<p>Outdoor pools at the Okura, Humble House, the Sheraton, Grand Mayfull and Caesar Metro also close for typhoons and thunderstorms.</p>

<p><strong>Most pools are for residents only.</strong> Humble House, Caesar Metro, Hotel Proverbs, Capella and Gloria Residence keep their pools for staying guests, and Le Méridien and the Sheraton add club members. The clear exception is the Shangri-La, whose health club sells a single swim to non-guests: NT$2,000 from age 12, or NT$1,000 for under-12s with an adult. Showers are included but parking is not. In Beitou, Spring City and Grand View both charge walk-in visitors for their mixed outdoor pools. We found no swimming-pool day pass for a Taipei City hotel on Klook.</p>

<p><strong>Children.</strong> Every hotel sets its own line for when a child needs an adult in the water: under 120 cm at the Okura, under 140 cm at the Regent, under 14 at Grand Mayfull, and under 12 at the Shangri-La, Humble House and Gloria Residence. The Sheraton asks for an adult aged 20 or over with under-12s or anyone shorter than 130 cm, and limits inflatables to 60 × 60 cm. The Grand Hotel bans rubber rings outright.</p>

<p><strong>Tattoos.</strong> None of the hotels we checked publishes a tattoo rule for its pool, and we found no Japanese-style ban in Taipei. That is not a promise; if it matters to you, ask before you book.</p>

<p><strong>A cheaper swim.</strong> The city's district sports centres have pools at roughly NT$110 a session for adults, and they follow the same cap rule. Our <a href="/sports-centre-gym">sports centre guide</a> explains how they work.</p>



<h2 id="Compare">Comparison Table</h2>

<figure class="wp-block-table is-style-stripes"><table><thead><tr><th>Hotel</th><th>Area / MRT</th><th>Pool</th><th>Heated</th><th>Open</th><th>Midweek price</th></tr></thead><tbody>
<tr><td>${hotel("shangri-la-far-eastern-taipei", "Shangri-La")}</td><td>Da'an / Liuzhangli</td><td>43F rooftop</td><td>Yes</td><td>All year except maintenance month</td><td>NT$8,940</td></tr>
<tr><td>${hotel("okura-prestige-taipei", "Okura Prestige")}</td><td>Zhongshan / Zhongshan</td><td>21F rooftop</td><td>Yes</td><td>All year</td><td>NT$9,005*</td></tr>
<tr><td>${hotel("capella-taipei", "Capella")}</td><td>Songshan / Taipei Arena</td><td>14F outdoor, 101 view</td><td>Reported</td><td>Not published</td><td>NT$33,500</td></tr>
<tr><td>${hotel("humble-house-taipei", "Humble House")}</td><td>Xinyi / City Hall</td><td>7F outdoor, 101 view</td><td>Not stated</td><td>April&ndash;October</td><td>NT$9,875</td></tr>
<tr><td>${hotel("renaissance-taipei-shihlin", "Renaissance Shihlin")}</td><td>Shilin / Shilin</td><td>Rooftop infinity, 25 m</td><td>Not stated</td><td>Reported closed in winter</td><td>NT$10,064</td></tr>
<tr><td>${hotel("w-taipei", "W Taipei")}</td><td>Xinyi / City Hall</td><td>10F outdoor, swim-up bar</td><td>Yes</td><td>All year</td><td>NT$17,903</td></tr>
<tr><td>${hotel("regent-taipei", "Regent")}</td><td>Zhongshan / Zhongshan</td><td>Rooftop</td><td>Yes</td><td>All year</td><td>NT$16,781</td></tr>
<tr><td>${hotel("taipei-marriott", "Taipei Marriott")}</td><td>Dazhi / Jiannan Rd</td><td>19F rooftop</td><td>Reported</td><td>All year (Marie Claire)</td><td>NT$7,928</td></tr>
<tr><td>${hotel("grand-hyatt-taipei", "Grand Hyatt")}</td><td>Xinyi / Taipei 101</td><td>5F outdoor</td><td>Yes</td><td>All year</td><td>NT$11,746</td></tr>
<tr><td>${hotel("mandarin-oriental-taipei", "Mandarin Oriental")}</td><td>Songshan / Taipei Arena</td><td>6F outdoor, garden</td><td>Yes</td><td>All year</td><td>NT$13,745</td></tr>
<tr><td>${hotel("le-meridien-taipei", "Le Méridien")}</td><td>Xinyi / City Hall</td><td>3F indoor</td><td>Not stated</td><td>All year</td><td>NT$15,015</td></tr>
<tr><td>${hotel("gloria-residence-taipei", "Gloria Residence")}</td><td>Zhongshan / Shuanglian</td><td>Indoor</td><td>Yes</td><td>All year, not Mondays</td><td>NT$7,040</td></tr>
<tr><td>${hotel("caesar-metro-taipei", "Caesar Metro")}</td><td>Wanhua / Longshan Temple</td><td>8F outdoor</td><td>No</td><td>March&ndash;December</td><td>NT$3,330</td></tr>
<tr><td>${hotel("miramar-garden-taipei", "Miramar Garden")}</td><td>Zhongshan / Zhongxiao Xinsheng</td><td>Outdoor, 2F</td><td>Yes</td><td>All year</td><td>NT$5,444</td></tr>
<tr><td>${hotel("parkview-taipei", "Parkview")}</td><td>Zhongshan / Songjiang Nanjing</td><td>Rooftop pool garden</td><td>Not known</td><td>Not known</td><td>NT$6,200</td></tr>
<tr><td>${hotel("the-grand-hotel-taipei", "The Grand Hotel")}</td><td>Yuanshan / Jiantan</td><td>50 m outdoor + kids' pool</td><td>Not stated</td><td>All year; kids' pool May&ndash;October</td><td>Not on Booking.com</td></tr>
<tr><td>${hotel("sheraton-grand-taipei", "Sheraton Grand")}</td><td>Zhongzheng / Shandao Temple</td><td>18F rooftop</td><td>Not stated</td><td>March&ndash;December</td><td>NT$9,988</td></tr>
<tr><td>${hotel("grand-mayfull-taipei", "Grand Mayfull")}</td><td>Dazhi / Jiannan Rd</td><td>4F outdoor, 25 m</td><td>Yes</td><td>All year except mid-winter maintenance</td><td>NT$8,350</td></tr>
<tr><td>${hotel("asia-pacific-hotel-beitou", "Asia Pacific Beitou")}</td><td>Beitou / shuttle</td><td>Indoor + kids' pool</td><td>Not stated</td><td>Not stated</td><td>NT$8,250</td></tr>
<tr><td>${hotel("spring-city-resort-beitou", "Spring City")}</td><td>Beitou / shuttle</td><td>Nine outdoor spa pools</td><td>Hot spring</td><td>Not stated</td><td>About NT$6,200 (Klook)</td></tr>
</tbody></table></figure>

<p><em>Prices: cheapest Booking.com room for two adults on Wednesday 11 November 2026, as shown on 3 October 2026, and will change. *The Okura had nothing on that date; the figure is for Wednesday 18 November. Spring City is not on Booking.com, so its figure is a Klook rate from 29 September converted from sterling. "Not stated" means the hotel's own pool page doesn't say; "Reported" means a press or review source says so but the hotel doesn't.</em></p>



<h2 id="Rooftop">Rooftop and View Pools</h2>

<p>For the classic city-skyline swim, these are the hotels to look at. For their walking times and room types, see our guides to <a href="/hotels-near-taipei-101">hotels near Taipei 101</a>, <a href="/hotels-in-daan">hotels in Daan</a> and <a href="/hotels-in-zhongshan">hotels in Zhongshan</a>.</p>

<h3>${hotel("shangri-la-far-eastern-taipei", "Shangri-La Far Eastern, Taipei")}</h3>

<p>The pool on the top floor of the Shangri-La's 43-storey tower on Dunhua South Road is heated, has a round whirlpool beside it and, according to the hotel, stays open all year. Hours are 06:00 to 21:00, extended to 22:00 on Fridays, Saturdays and the evening before holidays. Its annual month of maintenance ended on 30 September, and the pool reopened in October. There is also a summer-only pool on the 7th floor. It is also the one hotel pool in the city with a published price for outsiders (see above), and hotel guests can bring a friend for NT$1,000 on weekdays or NT$1,500 at weekends. On 31 December the 43rd-floor pool closes at 15:00 because the hotel's New Year party moves up to the pool deck for midnight; our <a href="/taipei-101-view-hotels-new-years-eve">New Year's Eve hotel guide</a> has the details. Liuzhangli on the Brown line is about a nine-minute walk.</p>

<h3>${hotel("okura-prestige-taipei", "The Okura Prestige Taipei")}</h3>

<p>On the roof of the Okura, on the 21st floor near Zhongshan station, is an open-air heated pool with an Aqua Bar that serves from 10:00 to 20:00. The pool opens 06:00 to 22:00, with last entry at 21:30. The hotel asks swimmers to wear a cap to keep the water clean, and children under 120 cm must be with an adult. It closes in typhoons, heavy rain and thunder. The Okura was fully booked on our November weekday and weekend dates; a King room on Wednesday 18 November was NT$9,005.</p>

<h3>${hotel("capella-taipei", "Capella Taipei")}</h3>

<p>Capella, on Dunhua North Road and Taipei's most expensive hotel at well over NT$30,000 a night, has an outdoor pool on a 14th-floor garden deck with an open view of Taipei 101, according to the hotel and Taiwanese press. The deck is part of a lounge reserved for guests. A Mr &amp; Mrs Smith listing describes the pool as heated and open from 07:00 to 19:00, but the hotel's own page gives neither, so treat both as unconfirmed. Its top suite has a private heated lap pool.</p>

<h3>${hotel("humble-house-taipei", "Humble House Taipei")}</h3>

<p>Humble House, on Songgao Road in Xinyi, has a 1.15-metre-deep outdoor pool on a wooden deck on the 7th floor with Taipei 101 in view. The season is short: April to October only, 06:00 to 22:00, with a cleaning break from 12:00 to 13:30. The hotel rules say the pool is for staying guests only, children under 12 need an adult, caps are compulsory and snorkels are not allowed. The garden on the same floor stays open all year.</p>

<h3>${hotel("renaissance-taipei-shihlin", "Renaissance Taipei Shihlin")}</h3>

<p>Five of the publications we read, four of them Taiwanese, single out this 104-room Marriott hotel in Shilin, which opened in 2018, for what they describe as the city's only rooftop infinity pool. Marie Claire and Supertaste give it as 25 metres long and 1.0 to 1.5 metres deep, looking out to Yangmingshan. Marriott lists the pool with a lifeguard and towels, open 07:00 to 12:00 and 14:00 to 21:00 every day. hk01 reported in 2023 that it does not open in winter and keeps shorter hours in spring and autumn; Marriott's page gives no season, so if you are travelling between November and March, check with the hotel first. Shilin station is about six minutes away, which also makes it handy for <a href="/shilin-night-market">Shilin Night Market</a> and the <a href="/national-palace-museum">National Palace Museum</a>.</p>

<h3>${hotel("w-taipei", "W Taipei")}</h3>

<p>The W's WET deck on the 10th floor, by City Hall station, is the party pool of the list: heated and outdoors, with a swim-up bar, a lifeguard and, according to Nick Kembel and Time Out, DJs and pool parties. Marriott gives the hours as 06:00 to 22:00 daily. Don't book it for a swim with a view of 101; Kembel notes that neighbouring buildings mostly block it from the pool.</p>

<h3>${hotel("regent-taipei", "Regent Taipei")}</h3>

<p>The Regent on Zhongshan North Road keeps a heated rooftop pool next to its Wellspring spa, open 07:00 to 22:00 (last entry 21:30); children under 140 cm must swim with an adult. The basement sauna is closed for works until 30 November 2026, but the pool is not affected. On our midweek date only Club rooms were for sale, which pushes the price up.</p>

<h3>${hotel("taipei-marriott", "Taipei Marriott Hotel")}</h3>

<p>Over by the Keelung River at Dazhi, the Marriott has an outdoor pool on its 19th floor, with a lifeguard and towels and hours from 06:00 to 22:00, according to marriott.com. Marie Claire describes it as open all year with views of the hills and the Miramar Ferris wheel, and hk01 calls it heated, though the hotel's page doesn't mention heating. It is a nine-minute walk from Jiannan Road on the Brown line.</p>

<p><strong>Also:</strong> ${hotel("hotel-proverbs-taipei", "Hotel Proverbs")} near Zhongxiao Fuxing has a small rooftop pool for guests, open 06:30 to 21:00. ${hotel("humble-boutique-hotel-taipei", "Humble Boutique Hotel")} by Songjiang Nanjing has a heated 10th-floor pool that has to be reserved, but showed no rooms on any November date we tried.</p>



<h2 id="Indoor-Heated">Indoor and Heated: Good in Winter</h2>

<p>From November to March, Taipei can be cool and damp. These pools are either indoors or heated outdoor pools that the hotels say stay open all year.</p>

<h3>${hotel("le-meridien-taipei", "Le Méridien Taipei")}</h3>

<p>The only indoor hotel pool in Xinyi on this list is on Le Méridien's 3rd floor: proper lanes under a glass roof, open 06:00 to 22:30 for guests and members, with a hot pool and saunas alongside. The hotel's facilities page doesn't say the pool is heated, although our earlier research on the area found it described that way. Rooms were slightly cheaper on our Saturday date than midweek.</p>

<h3>${hotel("gloria-residence-taipei", "Gloria Residence")}</h3>

<p>These serviced apartments in Zhongshan have an indoor heated pool, 18 metres long, beside windows onto a garden. It is open all year but not on Mondays, in three sessions a day (07:00 to 10:00, 14:00 to 17:00 and 18:00 to 21:00 on weekdays; mornings start an hour later at weekends). Only residents may use it, under-12s need a parent, and caps are required. Our <a href="/aparthotels-serviced-apartments-taipei">serviced apartments guide</a> covers the rest of the building.</p>

<h3>${hotel("grand-hyatt-taipei", "Grand Hyatt Taipei")}</h3>

<p>Beside Taipei 101, the Grand Hyatt's 5th-floor outdoor pool is heated, runs through the winter and has a 100 cm section for children. We could not open Hyatt's site to settle the hours: earlier research found 06:00 to 22:30, while the hotel's Club Oasis page, as shown in search results, gives 06:00 to 21:30 and lists maintenance Mondays, including 2 November 2026. Plan on early morning to mid-evening. Club Oasis also has a 24-hour gym and a sauna.</p>

<h3>${hotel("mandarin-oriental-taipei", "Mandarin Oriental, Taipei")}</h3>

<p>The Mandarin's heated outdoor pool sits in a garden reached through the 6th-floor spa, open 07:00 to 20:00. Kembel describes it as 20 metres long with art-deco mosaics, and Taiwan Scene mentions changing rooms with underfloor heating, which helps on a cold day. People booking a spa treatment can use some facilities, but the hotel doesn't sell pool entry on its own. Taipei Arena is about nine minutes on foot.</p>



<h2 id="Cheaper">Cheaper Hotels with a Pool</h2>

<p>Hotel pools are uncommon at the lower end of the Taipei market. These are the exceptions we found.</p>

<h3>${hotel("caesar-metro-taipei", "Caesar Metro Taipei")}</h3>

<p>In the twin towers beside Wanhua railway station, about six minutes from <a href="/longshan-temple">Longshan Temple</a> station, Caesar Metro was NT$3,330 for a double on our Wednesday, the cheapest room here by a distance. On every November Saturday we tried, though, Booking.com showed only rooms at NT$15,400 or more, so check the weekend rate carefully. The outdoor pool is on the 8th floor, through the gym and down a flight of stairs. It opens 07:00 to 21:00 with two breaks for disinfection, runs from March to December and has no heating, which makes it a summer pool in practice. It is for guests only, and swimsuits and caps are compulsory. There is also a children's playroom with a camping-tent corner and board games.</p>

<h3>${hotel("miramar-garden-taipei", "Miramar Garden Taipei")}</h3>

<p>On Civic Boulevard, ten minutes' walk from Zhongxiao Xinsheng, Miramar Garden has a heated outdoor pool laid out like a back garden with a poolside bar, at the level of its 2nd-floor health club. It opens 06:00 to 21:00 and closes on the first Monday of every month (2 November in 2026). Swimsuits and caps are required. The gym and sauna are for over-16s, but younger swimmers can use the pool and change in a room beside it. At NT$5,444 midweek it is the cheapest heated pool in central Taipei we found.</p>

<h3>${hotel("parkview-taipei", "Parkview Taipei")}</h3>

<p>Five minutes from Songjiang Nanjing station, Parkview has a rooftop pool garden. We could not find its hours, rules or whether it is heated, so ask before booking if the pool is the reason you are staying. A midweek room was NT$6,200.</p>

<p><strong>Over the river:</strong> ${hotel("hilton-taipei-sinban", "Hilton Taipei Sinban")} in Banqiao, New Taipei, three minutes from Banqiao station (Blue line, railway and high-speed rail), has a 32nd-floor rooftop infinity pool lined with palms, according to Supertaste in July 2026. We could not check its rules. A midweek room was NT$5,890.</p>



<h2 id="Families">Best for Families</h2>

<p>For things to do between swims, see our round-up of <a href="/best-places-to-keep-kids-amused">things for children to do in Taipei</a>.</p>

<h3>${hotel("the-grand-hotel-taipei", "The Grand Hotel")}</h3>

<p>Run by the Yuan Shan Club next door to the <a href="/the-grand-hotel">Grand Hotel</a>, this is an Olympic-size outdoor pool, 50 by 25 metres and 1.2 to 5 metres deep, with a separate children's pool only 0.5 to 0.6 metres deep. Hotel guests swim free from noon on the day they arrive until 11:00 on the day they leave. From May to October the main pool opens 06:00 to 22:00, in April 06:00 to 20:00, and from November to March 06:30 to 20:00. The children's pool opens only from May to October. Freediving gear, mermaid tails and rubber rings are banned, as is outside food. The club doesn't say whether the pool is heated; one old listing says it is not and puts the winter water at about 20&nbsp;°C. The hotel sits on a hill about 14 minutes' walk from Jiantan station, and its rooms were not listed on Booking.com.</p>

<h3>${hotel("sheraton-grand-taipei", "Sheraton Grand Taipei")}</h3>

<p>Two minutes from Shandao Temple station, the Sheraton's 18th-floor rooftop pool opens 07:00 to 20:00, with an hour off at 12:00 and again at 17:00, and closes in January and February. Its rules are among the most detailed for families: under-12s or children under 130 cm must be with an adult aged 20 or over, and inflatables can be no larger than 60 by 60 cm. The hotel also has a play area for children. Its forecourt is under works until 30 October 2026.</p>

<h3>${hotel("grand-mayfull-taipei", "Grand Mayfull Hotel Taipei")}</h3>

<p>Near the Marriott in Dazhi, Grand Mayfull's 4th-floor outdoor pool is 25 metres long, heated year-round in the hotel's words, and decorated with Roman columns, a mosaic floor and a large outdoor screen, with a poolside bar. It opens 06:00 to 22:00 (last entry 21:00). Under-14s must swim with a parent. It closes from 15:00 on the second Monday of each month (9 November in 2026), for an annual maintenance break in mid-winter, and for typhoons, thunder or private events. Jiannan Road station is about ten minutes' walk.</p>



<h2 id="Beitou">Hot Spring Pools in Beitou</h2>

<p>Some Beitou hot spring hotels add a swimsuit pool to their baths. Swimsuits and caps are required in all of them. Our <a href="/beitou-hot-spring-hotels">Beitou hot spring hotel guide</a> covers the private baths and nude public pools.</p>

<h3>${hotel("asia-pacific-hotel-beitou", "Asia Pacific Hotel Beitou")}</h3>

<p>A real swimming pool rather than a soaking pool: indoor, 20 by 5 metres and 1.2 metres deep, plus a 60 cm children's pool. Weekday hours are 09:00 to 19:00, and under-12s or children shorter than 130 cm need a parent. The hotel runs a free shuttle from Beitou and Xinbeitou stations.</p>

<h3>${hotel("spring-city-resort-beitou", "Spring City Resort")}</h3>

<p>Spring City's nine outdoor hot spring pools, including a children's splash pool, a cold plunge and a waterfall pool, are for soaking rather than swimming lengths. They are mixed, open 09:00 to 22:00 and free for guests. Non-guests pay NT$800, or NT$550 for children 110 to 140 cm tall, and under-110 cm go free; you can also buy entry as a ${springCityPools("Klook day pass")}. ${hotel("grand-view-resort-beitou", "Grand View Resort")} nearby has a similar mixed outdoor pool with two hot pools, open to walk-in visitors.</p>

<p><strong>Not included:</strong> Howard Plaza, Hotel Royal Nikko Taipei and Aloft Taipei Zhongshan sometimes appear in older or OTA lists of pool hotels, but none of them shows a pool on its own website or brand page as of October 2026.</p>
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

const title = "Taipei Hotels with a Pool (2026): Rooftop, Indoor & Family";
if (title.length > 60) fail(`title is ${title.length} chars`);

posts.push({
  id: Math.max(...posts.map((p) => p.id || 0)) + 1,
  authorId: 2,
  date: TODAY,
  modified: TODAY,
  slug: SLUG,
  title,
  excerpt:
    "Twenty Taipei hotels with a swimming pool, from rooftop and infinity pools to heated indoor ones, with winter closures, swim cap and children's rules, day passes and prices.",
  type: "post",
  parentId: 0,
  content: CONTENT,
  categories: [{ name: "Areas", slug: "areas" }, { name: "Hotels", slug: "hotels" }],
  tags: [{ name: "Lists", slug: "lists" }],
  featuredImage: "/media/2026/09/hotels/shangri-la-far-eastern-taipei-2.jpg",
});

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2) + "\n");

console.log(`Added /${SLUG} to ${filePath}`);
console.log(`  title: ${title} (${title.length})`);
console.log(`  ${CONTENT.length} chars, ${Object.keys(KLOOK).length} hotels linked on Klook`);
