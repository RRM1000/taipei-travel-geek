// New guide: hotels near Taipei 101 (Xinyi).
//
// WHY THIS PAGE. Third in the "hotels near..." series after Taipei Main
// Station and Ximending. The where-to-stay guide names four hotels in Xinyi;
// readers who have already chosen the district want the wider field, the
// right station and exit, and an honest idea of what a room costs midweek
// against a Saturday.
//
// SOURCING. data/research/hotels-near-taipei-101.md. A consensus count of 28
// English publishers and 13 Taiwanese round-ups, then each hotel checked
// against its official site, the Tourism Administration register and dated
// reviews, walked in Google Maps from its exit, and priced on Booking.com for
// a November 2026 Wednesday and Saturday. That is why Le Méridien, Hanns
// House and Formosa 101 are in, why Space Inn (closed) and the unopened
// Four Seasons, Park Hyatt and Andaz are not, and why the Home Hotel, W and
// Humble House details differ from the where-to-stay page.
//
// NOT A COPY. No eight-word run is shared with the where-to-stay page, the
// Taipei 101 and Xinyi shopping guides, the two other hotel guides or any
// other post (checked before publishing).
//
// WHERE-TO-STAY PAGE. Not touched by this script. The discrepancies found
// there are listed in the research file, section 5.
//
// AFFILIATE LINKS. Every hotel links to its own Klook hotel page (each URL
// opened and its address checked on 29 Sep 2026) and carries
// data-hotel="<key>" so the lot can switch to Agoda by key.
//
// No FAQ block (FAQs are kept to the main guides) and no Perfect For box.
//
// POSTS_PATH=<file> writes to a copy instead of content/posts.json.

import fs from "fs";
import path from "path";

const SLUG = "hotels-near-taipei-101";
const TODAY = "2026-09-29 12:00:00";

const KLOOK = {
  "grand-hyatt-taipei": "https://www.klook.com/en-GB/hotels/detail/425808-grand-hyatt-taipei/?aid=8733",
  "w-taipei": "https://www.klook.com/en-GB/hotels/detail/142088-w-taipei/?aid=8733",
  "le-meridien-taipei": "https://www.klook.com/en-GB/hotels/detail/409169-le-meridien-taipei/?aid=8733",
  "humble-house-taipei": "https://www.klook.com/en-GB/hotels/detail/254548-humble-house-taipei-curio-collection-by-hilton/?aid=8733",
  "eslite-hotel-taipei": "https://www.klook.com/en-GB/hotels/detail/440618-eslite-hotel/?aid=8733",
  "hanns-house-taipei": "https://www.klook.com/en-GB/hotels/detail/391766-hanns-house/?aid=8733",
  "home-hotel-xinyi": "https://www.klook.com/en-GB/hotels/detail/570574-home-hotel/?aid=8733",
  "pacific-business-hotel": "https://www.klook.com/en-GB/hotels/detail/416969-pacific-business-hotel/?aid=8733",
  "tango-hotel-taipei-xinyi": "https://www.klook.com/en-GB/hotels/detail/434797-the-tango-taipei-xinyi/?aid=8733",
  "taipei-101-sparkle-hotel": "https://www.klook.com/en-GB/hotels/detail/405692-taipei-101-sparkle-hotel/?aid=8733",
  "members-hotel-taipei-101": "https://www.klook.com/en-GB/hotels/detail/448663-members-hotel-at-taipei-101/?aid=8733",
  "check-inn-taipei-xinyi": "https://www.klook.com/en-GB/hotels/detail/423368-check-inn-taipei-xinyi/?aid=8733",
  "just-inn-xinyi": "https://www.klook.com/en-GB/hotels/detail/576321-just-inn-taipei-xin-yi/?aid=8733",
  "formosa-101-hostel": "https://www.klook.com/en-GB/hotels/detail/281421-formosa101--hostel/?aid=8733",
  "work-inn-101": "https://www.klook.com/en-GB/hotels/detail/46939-work-inn-101/?aid=8733",
};

const hotel = (key, name) =>
  KLOOK[key]
    ? `<a href="${KLOOK[key]}" data-hotel="${key}" target="_blank" rel="noreferrer noopener">${name}</a>`
    : `<span data-hotel="${key}">${name}</span>`;

const CONTENT = `
<p><strong>Xinyi</strong> is where Taipei keeps its tallest tower, its densest cluster of malls and most of its big international hotels. Rooms here cost more than anywhere else in the city, so it pays to choose carefully. This guide covers fifteen places to stay within reach of <a href="/taipei-101">Taipei 101</a> &ndash; six upscale hotels, four in the middle, three cheaper hotels and two hostels &ndash; with the station and exit for each, how long the walk to the tower takes, and what a November night costs on a Wednesday compared with a Saturday.</p>

<div class="quick-verdict"><p class="quick-verdict-title">💡 The Quick Verdict: Hotels Near Taipei 101</p><ul><li><strong>Closest luxury:</strong> ${hotel("grand-hyatt-taipei", "Grand Hyatt Taipei")} &ndash; linked to the Taipei 101 mall by a covered skybridge, with a heated pool that stays open all winter.</li>
<li><strong>For nightlife and design:</strong> ${hotel("w-taipei", "W Taipei")}, a minute from City Hall station, and the district's only Forbes Four-Star hotel.</li>
<li><strong>For space:</strong> ${hotel("hanns-house-taipei", "Hanns House")} &ndash; apartment-style rooms from 30&nbsp;m², each with a fridge and microwave.</li>
<li><strong>Mid-range:</strong> ${hotel("pacific-business-hotel", "Pacific Business Hotel")}, where every room has a full-height window and some have a balcony.</li>
<li><strong>Cheapest bed:</strong> ${hotel("formosa-101-hostel", "Formosa 101")}, the one Xinyi hostel with real support among travel writers.</li></ul></div>



<h2 id="Why-Stay">Should You Base Yourself in Xinyi?</h2>

<p>It makes sense if the modern city is what you came for. The observatory, the mall-to-mall skybridges, the rooftop bars and the clubs around ATT 4 FUN are all walkable, and the district has the best choice of large hotels with pools, gyms and proper views. It also suits a first night or two if your flight lands late and you just want a comfortable room: Airport Bus 1960 pulls up at the Grand Hyatt and the City Hall bus station. The hike up Elephant Mountain starts about ten minutes on foot from Xiangshan station. For the shops themselves, see our <a href="/xinyi-shopping-district">Xinyi shopping guide</a>.</p>

<p>Look elsewhere if budget or old Taipei comes first. Xinyi has very few cheap beds, and the ones it has are often windowless or in a basement. It is also at the eastern end of the Metro network: Taipei Main Station is 10&ndash;14 minutes away by train, Ximending about 13&ndash;20, and the Airport MRT only starts at Taipei Main, so each trip to Taoyuan airport begins with a cross-town ride. Temples, Dadaocheng and the night markets of the west side mean a trip across town every time. Our guide to <a href="/best-areas-and-hotels-to-stay">where to stay in Taipei</a> compares the districts.</p>

<p>Two things surprised us on the price checks. First, <strong>the cheapest hotels in Xinyi double or triple in price on Saturdays</strong>. On three November Saturdays we checked, CHECK inn's least expensive room went from about NT$2,400 on a Wednesday to NT$5,600&ndash;6,600, Members Hotel from NT$2,600 to NT$5,300&ndash;7,100, and a bunk at Work Inn 101 from NT$470 to as much as NT$1,900. The five-star hotels rose by only 5&ndash;25%, so at weekends a luxury room can be better value than it looks. Second, <strong>the low starting prices usually mean no window</strong>. At Taipei 101 Sparkle, The Tango and CHECK inn, the entry-level rooms have no outside window; see the hotel notes for which room types to book instead.</p>

<h3 id="Which-Station">Which station, which side?</h3>

<p>Five Metro stations serve the district, and which one you want depends on the part of Xinyi you'll spend your time in:</p>

<ul>
<li><strong>Taipei 101/World Trade Center (Red line, R03)</strong> is the south side. Exit 4 runs through an underground passage into the tower, and exit 5 on Shifu Road has a street lift. Exits 1 and 2 at the World Trade Center end are closest to the cheaper hotels on Keelung Road and Wuxing Street.</li>
<li><strong>Taipei City Hall (Blue line, BL18)</strong> is the north side, on Zhongxiao East Road. Exit 2 opens beside the City Hall bus station and the W, and exit 3 leads into the Breeze Xinyi underground link towards the Shin Kong Mitsukoshi strip. This is the better station for Taipei Main, Ximending and Songshan Airport.</li>
<li><strong>Xiangshan (Red line, R02)</strong>, one stop east of Taipei 101, is best for Home Hotel and the Elephant Mountain trail. Since 30 August 2026 the Red line carries on one more stop, to Guangci/Fengtian Temple.</li>
<li><strong>Yongchun (Blue line, BL19)</strong>, one stop east of City Hall, is quieter and cheaper, with The Tango two minutes from exit 1.</li>
<li><strong>Sun Yat-sen Memorial Hall (Blue line, BL17)</strong> is the west side, by Songshan Cultural Park and the Taipei Dome, and the station for eslite hotel.</li>
</ul>

<p>The two main stations are about a kilometre apart and there's no direct covered link between them yet; the malls in between are joined by skybridges, and a new bridge to City Hall is planned for around 2028. Allow 10&ndash;15 minutes on foot.</p>

<figure class="wp-block-table is-style-stripes"><table><thead><tr><th>Hotel</th><th>Type</th><th>Wednesday price</th><th>Station and exit</th><th>Walk to Taipei 101</th></tr></thead><tbody>
<tr><td>${hotel("w-taipei", "W Taipei")}</td><td>Luxury</td><td>From about NT$16,700</td><td>City Hall exit 2, 1 min</td><td>12 mins</td></tr>
<tr><td>${hotel("le-meridien-taipei", "Le Méridien")}</td><td>Luxury</td><td>From about NT$13,900</td><td>City Hall exit 3, 5 mins</td><td>9 mins</td></tr>
<tr><td>${hotel("grand-hyatt-taipei", "Grand Hyatt")}</td><td>Luxury</td><td>From about NT$11,700</td><td>Taipei 101 exit 5, 3&ndash;5 mins</td><td>4 mins (skybridge)</td></tr>
<tr><td>${hotel("humble-house-taipei", "Humble House")}</td><td>Luxury</td><td>From about NT$9,900</td><td>City Hall exit 3, 4 mins</td><td>10 mins</td></tr>
<tr><td>${hotel("eslite-hotel-taipei", "eslite hotel")}</td><td>Luxury</td><td>From about NT$9,500</td><td>Sun Yat-sen Memorial Hall exit 5, 9 mins</td><td>22 mins</td></tr>
<tr><td>${hotel("hanns-house-taipei", "Hanns House")}</td><td>Upscale</td><td>From about NT$8,800</td><td>City Hall exit 2, 4 mins</td><td>11 mins</td></tr>
<tr><td>${hotel("home-hotel-xinyi", "Home Hotel")}</td><td>Design hotel</td><td>From about NT$7,700</td><td>Xiangshan exit 1, 6 mins</td><td>5 mins</td></tr>
<tr><td>${hotel("pacific-business-hotel", "Pacific Business Hotel")}</td><td>Mid-range</td><td>From about NT$4,200</td><td>Taipei 101 exit 1, 8 mins</td><td>11 mins</td></tr>
<tr><td>${hotel("taipei-101-sparkle-hotel", "Taipei 101 Sparkle")}</td><td>Mid-range</td><td>From about NT$3,700 (windowless)</td><td>Taipei 101 exit 2, 2 mins</td><td>3 mins</td></tr>
<tr><td>${hotel("tango-hotel-taipei-xinyi", "The Tango Xinyi")}</td><td>Mid-range</td><td>From about NT$3,700 (windowless)</td><td>Yongchun exit 1, 2 mins</td><td>21 mins</td></tr>
<tr><td>${hotel("members-hotel-taipei-101", "Members Hotel at Taipei 101")}</td><td>Budget</td><td>From about NT$2,600</td><td>Taipei 101 exit 2, 6 mins</td><td>10 mins</td></tr>
<tr><td>${hotel("check-inn-taipei-xinyi", "CHECK inn Taipei Xinyi")}</td><td>Budget</td><td>From about NT$2,400 (windowless)</td><td>Taipei 101 exit 2, 4 mins</td><td>8 mins</td></tr>
<tr><td>${hotel("just-inn-xinyi", "Just Inn Xin Yi")}</td><td>Budget</td><td>From about NT$1,900</td><td>City Hall exit 2, 4 mins</td><td>16 mins</td></tr>
<tr><td>${hotel("formosa-101-hostel", "Formosa 101 Hostel")}</td><td>Hostel</td><td>Beds about NT$480&ndash;550</td><td>Taipei 101 exit 1, 11 mins</td><td>15 mins</td></tr>
<tr><td>${hotel("work-inn-101", "Work Inn 101")}</td><td>Hostel</td><td>Beds about NT$470&ndash;640</td><td>Taipei 101 exit 2, 7 mins</td><td>11 mins</td></tr>
</tbody></table></figure>

<p><em>Prices are Booking.com rates for a room for two (a single bed in the hostels) on Wednesday 11 November 2026, looked up on 29 September; they are a snapshot, not a promise. Walking times are Google Maps street routes from the exit, and from the hotel to the tower's entrance. On Saturday 14 November Humble House, Pacific and The Tango had nothing left on Booking.com, and eslite only had suites.</em></p>



<h2 id="Luxury">Luxury Hotels</h2>

<h3>${hotel("grand-hyatt-taipei", "Grand Hyatt Taipei")}</h3>

<p>The obvious choice if being next to the tower matters most. The Grand Hyatt opened in 1990 on Songshou Road, has 850 rooms and connects to the Taipei 101 mall by a covered skybridge; bloggers put exit 5 of Taipei 101 station three to five minutes away. Nick Kembel of Taiwan Obsessed calls it his top recommendation near Taipei 101, though he also points out that only one side of the building looks at the tower &ndash; Forbes says it's the eastern wing, so ask for a 101 View room. It's the family pick among the big hotels: the heated fifth-floor pool is open all year and has a shallow children's section, and Taiwanese reviewers say under-12s stay free using the existing beds. One blog reports that the basic Grand room has a shower but no bath. Our check found Saturday rates about NT$2,700 above the midweek price, and the 1960 airport bus stops at the door.</p>

<h3>${hotel("w-taipei", "W Taipei")}</h3>

<p>Of the fifteen, this was the most expensive in our November price check, and the one with the most going on after dark. It occupies the upper floors of the tower above the City Hall bus station, so exit 2 of City Hall station is about a minute away, much of it under cover. All 405 rooms were refreshed in a project reported complete in February 2025; the smallest are 43&nbsp;m², and every room has a bath. Only certain categories face Taipei 101, so book a Spectacular room or one of the view suites if you want the tower in your window. The heated WET pool and WOOBAR share the 10th-floor lobby level, with DJs in the evenings, and The Points Guy found the crowd young and inclined to party. Forbes rates it Four-Star, the only hotel in Xinyi to hold that rating.</p>

<h3>${hotel("le-meridien-taipei", "Le Méridien Taipei")}</h3>

<p>A 160-room hotel on Songren Road opened in 2010, five minutes from City Hall exit 3 and a short walk from the ATT 4 FUN strip. Taiwanese round-ups name it as often as Home Hotel, but English-language guides mostly overlook it. Standard rooms are a generous 38&nbsp;m², and the hotel's fitness club has an indoor heated pool, a hot pool and saunas, which is useful in winter. One blogger reports that more than half the rooms look at Taipei 101; the hotel doesn't give a figure. Baths are not universal: the register says most room types have one, and a family blog found the 101-facing Deluxe rooms had a shower only. It is popular with families, with children up to 11 staying free in existing beds, according to a 2026 review.</p>

<h3>${hotel("humble-house-taipei", "Humble House Taipei")}</h3>

<p>An art-filled hotel on Songgao Road, four minutes from City Hall exit 3, among the department stores on the north side of the district. It opened in 2013, was renamed in July 2023 and has been part of Hilton's Curio Collection since December 2023. The seventh-floor outdoor pool looks straight at Taipei 101, but <strong>it closes from November to March</strong>, so winter guests miss the hotel's best feature. Deluxe rooms are 26&nbsp;m², smaller than at the other big hotels, and 101 views come only with the Landmark View rooms and some suites. The Terrace bar on the sixth floor has been closed since July 2026. The Ranting Panda, reviewing a December 2025 stay, liked the location but found the service disappointing.</p>

<h3>${hotel("eslite-hotel-taipei", "eslite hotel")}</h3>

<p>This one's on the far side of Xinyi from the tower: the hotel sits inside the Songshan Cultural Park complex, nine minutes from Sun Yat-sen Memorial Hall exit 5 and 22 minutes on foot from Taipei 101. What you get instead is calm, space and a bookshop downstairs. Rooms start at around 36&ndash;43&nbsp;m², depending on how the balcony is counted, and every room above the third floor has one &ndash; ETtoday says that makes it one of the few hotels where you can step outside to watch the New Year fireworks. According to Kembel, only the higher rooms at the front see Taipei 101. There's a 24-hour gym but no pool or spa. The where-to-stay guide lists it under Songshan, and the <a href="/songshan-cultural-and-creative-park">park guide</a> covers what's around it.</p>

<h3>${hotel("hanns-house-taipei", "Hanns House")}</h3>

<p>An apartment-style hotel on Keelung Road opened around 2020, four minutes from City Hall exit 2. Its 120 rooms all come with a fridge and a microwave, which makes it a good base for a longer stay or a family that wants to eat in. The official site sells whole 101 View room and suite categories, starting from 30&nbsp;m², so Kembel's older note that only the President Suite sees the tower seems out of date. Only the suites have a bath; the rooms have showers. There's no pool. It is in the MICHELIN Guide's hotel selection without a Key, as are the Grand Hyatt, W and Humble House, and no Xinyi hotel holds a Key in 2026.</p>



<h2 id="Mid-Range">Mid-Range Hotels</h2>

<h3>${hotel("home-hotel-xinyi", "Home Hotel")}</h3>

<p>A 121-room design hotel on Songren Road, built around Taiwanese-made furniture, ceramics and toiletries &ndash; the brand says it works with more than 100 local makers. It's five minutes from the tower and six from Xiangshan exit 1. The Original rooms are about 27&nbsp;m² and shower-only; for a freestanding tub, go up to a Marvelous Suite. There's no gym on site, but guests can use a large gym in the building next door for free. The drawback is noise. The hotel stands opposite the ATT 4 FUN clubs, and Taiwanese bloggers and many guests say the bass and crowds carry until 3&ndash;4am at weekends, so ask for a room high up.</p>

<h3>${hotel("pacific-business-hotel", "Pacific Business Hotel")}</h3>

<p>A 48-room hotel spread over several floors of an office tower on Guangfu South Road, eight minutes from Taipei 101 exit 1. Rooms are big for the price &ndash; the Standard is 26&nbsp;m² &ndash; and the official site shows a full-height window in every one. The city-side Business rooms add a balcony, and a 2024 reviewer on walkerland could see Taipei 101 from theirs. Family rooms take four adults, children up to 11 stay free, and parking and lounge snacks are free. Baths aren't listed for any room.</p>

<h3>${hotel("taipei-101-sparkle-hotel", "Taipei 101 Sparkle Hotel")}</h3>

<p>Closer to the tower than anything but the Grand Hyatt, two minutes from Taipei 101 exit 2 &ndash; but all 45 rooms are in the basement. The standard rooms, around 17&nbsp;m² with a shower, <strong>have no window</strong>. The "O2" rooms (about 26&nbsp;m², with a large bath) have a floor-to-ceiling window onto a sunken lightwell, though they cost about 50% more. Bloggers say ventilation is good and that being underground makes it very quiet. Of all the hotels here, it had the biggest weekend jump in our checks: about NT$3,700 on a Wednesday, NT$7,700 on a Saturday.</p>

<h3>${hotel("tango-hotel-taipei-xinyi", "The Tango Taipei Xinyi")}</h3>

<p>A good-value option on the quieter east side, two minutes from Yongchun exit 1 on Zhongxiao East Road, though Taipei 101 is a 20-minute walk. Even the entry-level Deluxe room is about 40&nbsp;m², and Taiwanese reviewers mention jacuzzi baths, a free minibar and snacks in the lounge. The catch: the official site calls the cheapest Deluxe rooms and the Majesty Suites "interior" rooms, meaning <strong>no outside window</strong>; the Executive rooms have full-height glass. The hotel's own FAQ says it provides no extra beds or cots, so families should look elsewhere. Check-in is from 4pm.</p>



<h2 id="Budget">Budget Hotels</h2>

<h3>${hotel("members-hotel-taipei-101", "Members Hotel at Taipei 101")}</h3>

<p>A small hotel of about 25 rooms on the fifth floor of a building at the corner of Keelung Road and Wuxing Street, six minutes from Taipei 101 exit 2. Booking sites still use its old name in their web addresses, which suggests it used to be Good Hotel at Taipei 101. Doubles and quads are reasonably priced midweek; the cheapest quad has no window. Bathrooms are shower-only, and there are no cots or extra beds. One blogger who stayed in 2020 could hear guests on other floors.</p>

<h3>${hotel("check-inn-taipei-xinyi", "CHECK inn Taipei Xinyi")}</h3>

<p>A chain hotel on the third floor of 468 Xinyi Road Section 4, four minutes from Taipei 101 exit 2, in the premises of the former AT Boutique hotel. It had the lowest midweek price of any hotel in this guide apart from Just Inn, but <strong>three room types have no window</strong>: the Joyful Double, the Superior Twin and the accessible double, all about 12&ndash;13&nbsp;m². For a few hundred dollars more, the 101-view rooms (15&ndash;18&nbsp;m²) have tall windows looking at the tower. The Double Suite is the only room with a bath, and breakfast comes as a voucher for the Louisa Coffee chain.</p>

<h3>${hotel("just-inn-xinyi", "Just Inn Xin Yi")}</h3>

<p>An 18-room hotel in an old building on Keelung Road, four minutes from City Hall exit 2, which makes it the cheapest private room on the station side of the district, with singles as well as doubles. Rooms are small and shower-only, and the lift only goes to the seventh floor. Soundproofing is the common complaint: bobbytravel (August 2026) found it weak, and the hotel hands out earplugs.</p>



<h2 id="Hostels">Hostels</h2>

<h3>${hotel("formosa-101-hostel", "Formosa 101 Hostel")}</h3>

<p>The Xinyi hostel that English-language guides recommend most, named by six publishers. It's on Keelung Road Section 2, opposite the Linjiang Street (<a href="/tonghua-night-market">Tonghua</a>) night market, eleven minutes from Taipei 101 exit 1. Dorms include women-only rooms, there are private rooms with and without their own bathroom, and breakfast is free. Kembel notes that the private rooms with bathrooms mostly face Taipei 101 while the shared ones don't, and one reader told him the walls were thin. Booking.com lists it as cash-only and says it doesn't take children. The reception is open 24 hours.</p>

<h3>${hotel("work-inn-101", "Work Inn 101")}</h3>

<p>The alternative near the World Trade Center, seven minutes from Taipei 101 exit 2. The biggest room is a 20-bed mixed dorm, with the option of a double bed; there are also men's and women's dorms and single rooms with shared bathrooms. Guests share a kitchen, a terrace and coin-operated laundry. Oliver of Girl on a Zebra, who stayed a few nights, liked the small restaurants and cafés around it. On Booking.com it accepts guests aged 18 to 80 only, and check-in runs from 3pm to 9.30pm, so let the hostel know if you'll arrive later.</p>



<h2 id="Getting-Around">Getting Around from Xinyi</h2>

<ul>
<li><strong>To Taoyuan airport by train:</strong> take the Red line from Taipei 101 (about 14 minutes) or the Blue line from City Hall (about 10) to Taipei Main Station, then walk to the Airport MRT terminal, A1. The express reaches Terminal 1 in 35 minutes and Terminal 2 in 39; the full trip costs NT$185 and takes about an hour to an hour and ten minutes. See the <a href="/taoyuan-airport-mrt">Airport MRT guide</a>.</li>
<li><strong>By bus:</strong> Airbus 1960 runs from the City Hall bus station (NT$200) and the Grand Hyatt (NT$190) to both terminals. It no longer runs every half hour: since July 2025 there have been 15 departures a day, one to two hours apart, so check the timetable.</li>
<li><strong>Songshan Airport:</strong> about 15&ndash;18 minutes, changing to the Brown line at Zhongxiao Fuxing or Daan, for NT$25. See our <a href="/songshan-airport">Songshan Airport guide</a>.</li>
<li><strong>Taipei Main Station and Ximending:</strong> City Hall to Taipei Main takes about 10 minutes, and to Ximen about 13, both direct on the Blue line. From Taipei 101 it's about 14 minutes to Taipei Main, or a change at Chiang Kai-shek Memorial Hall for Ximen. Every one of these trips costs NT$25.</li>
<li><strong>Elephant Mountain:</strong> from Xiangshan exit 2 it's about ten minutes to the trailhead, then 15&ndash;20 minutes of steep steps to the first viewing platform. Our <a href="/taipei-101#Worth-It">Taipei 101 guide</a> compares it with the observatory, and <a href="/best-hikes-in-taipei#Hushan">Hushan</a> next door is quieter.</li>
<li><strong>Raohe Night Market:</strong> Songshan station (Green line) exit 1 is at its east gate; from City Hall, the easiest route is two stops east on the Blue line to Houshanpi and a 12&ndash;15 minute walk. See the <a href="/raohe-night-market-foody-heaven">Raohe guide</a>.</li>
</ul>

<p><strong>New Year's Eve</strong> is Xinyi's busiest night. For the 2025/26 fireworks the Grand Hyatt charged from about NT$20,000 for a single night and was 97% full, while Humble House asked NT$47,000 plus service for a two-night fireworks-view package; minimum stays are the norm. Traffic control starts in the evening and widens until the whole core is closed to cars; the City Hall bus station shut at 9.30pm, and several exits at City Hall and Taipei 101 stations closed from 9.30pm or 10pm. Our <a href="/taipei-101-fireworks-new-years-eve">fireworks guide</a> has the viewing spots and the way home.</p>

<p>New to the Metro? Our <a href="/mrt">Taipei Metro guide</a> explains tickets and the <a href="/taiwan-easycard">EasyCard</a>, and <a href="/taipei-nightlife">Taipei nightlife</a> lists the clubs around ATT 4 FUN.</p>

<blockquote class="wp-block-quote"><p>Not sure Xinyi is right for you? Compare the districts in <a href="/best-areas-and-hotels-to-stay">where to stay in Taipei</a>, or look at <a href="/hotels-near-taipei-main-station">hotels near Taipei Main Station</a> for the easiest airport connection and <a href="/hotels-near-ximending">hotels near Ximending</a> for cheaper rooms.</p></blockquote>
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

const title = "Hotels Near Taipei 101 (2026): Where to Stay in Xinyi";
if (title.length > 60) fail(`title is ${title.length} chars`);

posts.push({
  id: Math.max(...posts.map((p) => p.id || 0)) + 1,
  authorId: 2,
  date: TODAY,
  modified: TODAY,
  slug: SLUG,
  title,
  excerpt:
    "Fifteen hotels and hostels near Taipei 101 in Xinyi, with the station exit for each, the walk to the tower, November prices and which rooms have no window.",
  type: "post",
  parentId: 0,
  content: CONTENT,
  categories: [{ name: "Areas", slug: "areas" }],
  tags: [{ name: "Lists", slug: "lists" }],
  featuredImage: "/media/2023/02/Xinyi-Shopping-District-2-edited-1024x682.jpg",
});

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2) + "\n");

console.log(`Added /${SLUG} to ${filePath}`);
console.log(`  title: ${title} (${title.length})`);
console.log(`  ${CONTENT.length} chars, ${Object.keys(KLOOK).length} hotels linked on Klook`);
