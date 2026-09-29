// New guide: hotels in Daan.
//
// WHY THIS PAGE. Fifth in the hotel series after Taipei Main Station,
// Ximending, Taipei 101 and Zhongshan. The where-to-stay guide names five
// Daan hotels; readers who have already chosen the district want a wider
// field, the right station and exit, and current facts (SOGO Dunhua has
// closed, HOME HOTEL Da-An is now EPISODE, the Howard Plaza is mid-works).
//
// SOURCING. data/research/hotels-in-daan.md. A consensus count of English
// and Taiwanese editorial pages, then each hotel checked against its
// official site, walked in Google Maps from its exit, and priced on
// Booking.com for Wednesday 11 and Saturday 14 November 2026. That is why
// several walking times and prices differ from the where-to-stay page.
//
// SCOPE. Hotels in Da'an District nearest Zhongxiao Fuxing, Zhongxiao
// Dunhua, Daan, Xinyi Anhe, Daan Park, Dongmen, Zhongxiao Xinsheng,
// Technology Building and Liuzhangli. Nothing on the Taipei 101 page is
// repeated, and hotels on the Zhongzheng side of Xinyi Road (Chaiin, ARK)
// are left out. The Howard Plaza is left out while it is being renovated.
//
// NOT A COPY. No eight-word run is shared with the where-to-stay page, the
// districts guide, the East District and Yongkang Street posts or the other
// hotel guides (checked before publishing).
//
// AFFILIATE LINKS. Every hotel links to its own Klook hotel page (each URL
// opened and its address checked on 29 Sep 2026) and carries
// data-hotel="<key>" so the lot can switch to Agoda by key. The keys match
// the photo folders in data/hotel-photos.json (star-hostel-taipei-east, not
// star-hostel, which is the Main Station branch).
//
// No FAQ block (FAQs are kept to the main guides) and no Perfect For box.
//
// POSTS_PATH=<file> writes to a copy instead of content/posts.json.

import fs from "fs";
import path from "path";

const SLUG = "hotels-in-daan";
const TODAY = "2026-09-29 12:00:00";

const KLOOK = {
  "kimpton-da-an-hotel": "https://www.klook.com/en-GB/hotels/detail/451655-kimpton-da-an-hotel/?aid=8733",
  "shangri-la-far-eastern-taipei": "https://www.klook.com/en-GB/hotels/detail/254139-shangri-la-far-eastern-taipei/?aid=8733",
  "hotel-proverbs-taipei": "https://www.klook.com/en-GB/hotels/detail/281397-hotel-proverbs-taipei/?aid=8733",
  "park-taipei-hotel": "https://www.klook.com/en-GB/hotels/detail/99379-park-taipei-hotel/?aid=8733",
  "mgh-mitsui-garden-taipei-zhongxiao": "https://www.klook.com/en-GB/hotels/detail/588082-mgh-mitsui-garden-hotel-taipei-zhongxiao/?aid=8733",
  "madison-taipei": "https://www.klook.com/en-GB/hotels/detail/432606-madison-taipei-a-tribute-portfolio-hotel/?aid=8733",
  "episode-daan-taipei": "https://www.klook.com/en-GB/hotels/detail/1411891-episode-daan-taipei-jdv-by-hyatt/?aid=8733",
  "hotel-eclat-taipei": "https://www.klook.com/en-GB/hotels/detail/409080-hotel-eclat-taipei/?aid=8733",
  "dandy-hotel-daan-park": "https://www.klook.com/en-GB/hotels/detail/422778-dandy-hotel-daan-park-branch/?aid=8733",
  "chez-nous-hotel-taipei": "https://www.klook.com/en-GB/hotels/detail/280671-chez-nous-hotel-taipei/?aid=8733",
  "taipei-fullerton-south": "https://www.klook.com/en-GB/hotels/detail/272825-taipei-fullerton-hotelfuxing-south/?aid=8733",
  "green-world-zhongxiao": "https://www.klook.com/en-GB/hotels/detail/449002-green-world-zhongxiao/?aid=8733",
  "eastin-taipei-hotel": "https://www.klook.com/en-GB/hotels/detail/408981-eastin-taipei-hotel/?aid=8733",
  "star-hostel-taipei-east": "https://www.klook.com/en-GB/hotels/detail/266667-star-hostel-taipei-east/?aid=8733",
  "dongmen-3-hostel": "https://www.klook.com/en-GB/hotels/detail/258441-dongmen-3-capsule-inn--hostel/?aid=8733",
};

const hotel = (key, name) =>
  KLOOK[key]
    ? `<a href="${KLOOK[key]}" data-hotel="${key}" target="_blank" rel="noreferrer noopener">${name}</a>`
    : `<span data-hotel="${key}">${name}</span>`;

const CONTENT = `
<p><strong>Daan</strong> (Da'an) is the residential heart of central Taipei: a district of tree-lined boulevards, office towers and quiet lanes, with the <a href="/taipei-east-district-dongqu">East District</a> shopping streets along its northern edge and the city's biggest park in the middle. This guide covers fifteen places to stay there &ndash; four at the top of the range, four mid-range hotels, five cheaper hotels and two hostels &ndash; giving the closest Metro exit, the walk from it, and the lowest rate we found for a weekday and a weekend night this November.</p>

<div class="quick-verdict"><p class="quick-verdict-title">💡 The Quick Verdict: Hotels in Daan</p><ul><li><strong>Top of the range:</strong> ${hotel("kimpton-da-an-hotel", "Kimpton Da An")} &ndash; the one Daan hotel holding a MICHELIN Key, two minutes from Zhongxiao Fuxing.</li>
<li><strong>For a pool:</strong> ${hotel("shangri-la-far-eastern-taipei", "Shangri-La Far Eastern")}, whose 43rd-floor rooftop pool reopens on 1 October 2026 after its annual maintenance closure.</li>
<li><strong>Best mid-range value:</strong> ${hotel("hotel-eclat-taipei", "Hotel Eclat")}, a small art-filled hotel on Dunhua South Road whose rates barely rise at weekends.</li>
<li><strong>By the park:</strong> ${hotel("dandy-hotel-daan-park", "Dandy Hotel Daan Park")}, a minute from Daan Park station, with free breakfast and free strollers.</li>
<li><strong>Cheapest bed:</strong> ${hotel("dongmen-3-hostel", "DONGMEN 3 Hostel")}, capsule beds half a minute from Dongmen exit 3 and a short stroll from Yongkang Street.</li></ul></div>



<h2 id="Why-Stay">Who Daan Suits</h2>

<p>It works best for travellers who plan their days around eating. <a href="/yongkang-street">Yongkang Street</a>, which starts at Dongmen exit 5 beside the original <a href="/din-tai-fung">Din Tai Fung</a>, packs noodle shops, dumpling counters, cafés and gift shops into a few short blocks. Further south, the streets around National Taiwan Normal University make up the Shida area; its night market lost many of its food stalls to clothing and beauty shops after the city enforced zoning rules from 2012, according to Taiwanese press reports, so treat it as a place for snacks and browsing rather than a full night-market meal. On the eastern side, <a href="/tonghua-night-market">Linjiang Street Night Market</a> is six minutes' walk from Xinyi Anhe exit 4.</p>

<p>Shopping is concentrated in the East District, between Zhongxiao Fuxing and Zhongxiao Dunhua, where department stores give way to side streets of boutiques, bars and small restaurants, with the East Metro Mall running underground between the two stations. <strong>Note that SOGO's Dunhua store closed on 14 December 2025</strong>, after 31 years; SOGO Zhongxiao and SOGO Fuxing are the two branches still trading there. Our <a href="/where-to-shop-in-taipei">shopping guide</a> covers the rest.</p>

<p>For green space, <a href="/daan-forest-park">Daan Forest Park</a> covers almost 26 hectares between Xinyi Road and Heping East Road and has its own station on the Red line. Away from the main roads, much of the district is apartment blocks, schools and neighbourhood cafés, so it feels calmer after dark than Ximending or Xinyi's mall district.</p>

<p>It suits families and longer stays for the same reasons. It is a weaker fit if you want temples and old streets on the doorstep (Wanhua and Dadaocheng do that better), clubs and rooftop bars (those cluster in Xinyi), or the quickest possible run to Taoyuan airport, which means changing at Taipei Main Station or catching the airport bus. The <a href="/best-areas-and-hotels-to-stay">where-to-stay guide</a> compares the districts, and hotels just east of here, in Xinyi, have their own page: <a href="/hotels-near-taipei-101">hotels near Taipei 101</a>.</p>

<p>One pattern stood out from the November price checks: weekends cost much more. Park Taipei rose by about 60% and EPISODE by about 70% between the Wednesday and the Saturday, and several of the cheapest hotels and both hostels had nothing left on the November Saturdays we tried. Hotel Eclat was the exception, moving by only a few hundred dollars.</p>

<h3 id="Which-Station">Which station?</h3>

<p>Daan is served by five Metro lines, and its stations are spread across the district. The one to aim for depends on whether you want the shops, the park or Yongkang Street:</p>

<ul>
<li><strong>Zhongxiao Fuxing (Blue line BL15, Brown line BR10)</strong> is the western gateway to the East District and the most useful interchange in the area: the Blue line runs straight to Taipei Main Station and Ximending, and the Brown line runs north to Songshan Airport. SOGO Fuxing sits on top of it. Kimpton, Proverbs, EPISODE and Eastin are all within about five minutes' walk.</li>
<li><strong>Zhongxiao Dunhua (Blue line BL16)</strong> is one stop east, at the Dunhua South Road junction, and is the stop for the densest part of the East District's lanes. Green World, Eastin and Star Hostel Taipei East are each a few minutes from it.</li>
<li><strong>Daan (Red line R05, Brown line BR09)</strong>, at the Xinyi Road and Fuxing South Road crossing, links the Red line to Taipei 101 with the Brown line. Park Taipei is next to exit 6, and Chez Nous and the Fullerton are a few minutes away. The Brown line is elevated along Fuxing South Road here, so street-facing rooms on that road overlook the tracks.</li>
<li><strong>Xinyi Anhe (Red line R04)</strong> is the station for the Dunhua South Road hotels, Madison and Eclat, and for Linjiang Street Night Market.</li>
<li><strong>Daan Park (Red line R06)</strong> opens directly on to the park; exits 4, 5 and 6 have lifts, and exit 6 is by the <a href="/jianguo-flower-market">Jianguo Holiday Flower Market</a>. Dandy is a minute from exit 1.</li>
<li><strong>Dongmen (Red line R07, Orange line O06)</strong> is the station for Yongkang Street, and the Red line takes you one stop west to Chiang Kai-shek Memorial Hall. DONGMEN 3 Hostel is right outside exit 3.</li>
<li><strong>Zhongxiao Xinsheng (Blue line BL14, Orange line O07)</strong> is on the district's western edge, one stop from Zhongxiao Fuxing, and is the stop for Mitsui Garden and for <a href="/huashan-1914-creative-park">Huashan 1914</a>.</li>
<li><strong>Technology Building (BR08) and Liuzhangli (BR07)</strong>, further south on the Brown line, are the nearest stations to the Shangri-La, though it is still a walk of 9&ndash;11 minutes.</li>
</ul>

<figure class="wp-block-table is-style-stripes"><table><thead><tr><th>Hotel</th><th>Type</th><th>Midweek rate</th><th>Closest MRT exit</th><th>Walk</th></tr></thead><tbody>
<tr><td>${hotel("hotel-proverbs-taipei", "Hotel Proverbs")}</td><td>Luxury boutique</td><td>About NT$13,300</td><td>Zhongxiao Fuxing exit 4</td><td>4 mins</td></tr>
<tr><td>${hotel("kimpton-da-an-hotel", "Kimpton Da An")}</td><td>Luxury boutique</td><td>About NT$11,000</td><td>Zhongxiao Fuxing exit 3</td><td>2 mins</td></tr>
<tr><td>${hotel("park-taipei-hotel", "Park Taipei Hotel")}</td><td>Upscale</td><td>About NT$9,900</td><td>Daan exit 6</td><td>1 min</td></tr>
<tr><td>${hotel("shangri-la-far-eastern-taipei", "Shangri-La Far Eastern")}</td><td>Luxury</td><td>About NT$8,900</td><td>Liuzhangli</td><td>9 mins</td></tr>
<tr><td>${hotel("mgh-mitsui-garden-taipei-zhongxiao", "Mitsui Garden Zhongxiao")}</td><td>Upscale</td><td>About NT$8,600</td><td>Zhongxiao Xinsheng exit 3</td><td>1 min</td></tr>
<tr><td>${hotel("madison-taipei", "Madison Taipei")}</td><td>Upscale boutique</td><td>About NT$8,100</td><td>Xinyi Anhe exit 1</td><td>7 mins</td></tr>
<tr><td>${hotel("episode-daan-taipei", "EPISODE Daan")}</td><td>Upscale</td><td>About NT$7,200</td><td>Zhongxiao Fuxing exit 2</td><td>4 mins</td></tr>
<tr><td>${hotel("hotel-eclat-taipei", "Hotel Eclat")}</td><td>Boutique</td><td>About NT$5,000</td><td>Xinyi Anhe exit 1</td><td>7 mins</td></tr>
<tr><td>${hotel("dandy-hotel-daan-park", "Dandy Hotel Daan Park")}</td><td>Mid-range</td><td>About NT$4,600 (windowless)</td><td>Daan Park exit 1</td><td>1 min</td></tr>
<tr><td>${hotel("chez-nous-hotel-taipei", "Chez Nous")}</td><td>Boutique</td><td>About NT$4,300 (15&nbsp;m² room)</td><td>Daan exit 1</td><td>4 mins</td></tr>
<tr><td>${hotel("taipei-fullerton-south", "Taipei Fullerton South")}</td><td>Mid-range</td><td>About NT$4,000</td><td>Daan exit 4</td><td>3 mins</td></tr>
<tr><td>${hotel("green-world-zhongxiao", "Green World ZhongXiao")}</td><td>Budget</td><td>About NT$3,200 (windowless)</td><td>Zhongxiao Dunhua exit 3</td><td>1 min</td></tr>
<tr><td>${hotel("eastin-taipei-hotel", "Eastin Taipei")}</td><td>Budget</td><td>About NT$2,600 (windowless); singles with shared bathroom NT$1,360</td><td>Zhongxiao Dunhua exit 6</td><td>4 mins</td></tr>
<tr><td>${hotel("star-hostel-taipei-east", "Star Hostel Taipei East")}</td><td>Hostel</td><td>Beds from NT$700 (hostel's own rate)</td><td>Zhongxiao Dunhua exit 7</td><td>1 min</td></tr>
<tr><td>${hotel("dongmen-3-hostel", "DONGMEN 3 Hostel")}</td><td>Capsule hostel</td><td>Beds about NT$630</td><td>Dongmen exit 3</td><td>Under 1 min</td></tr>
</tbody></table></figure>

<p><em>Rates are the lowest Booking.com price for two adults (a single bed at the hostels) for one night, Wednesday 11 November 2026, as shown on 29 September 2026; Star Hostel Taipei East had nothing on Booking.com, so its figure is the hostel's own starting price. Use them to compare hotels, not as a quote. Walking times come from Google Maps, measured from the exit at street level to the hotel entrance; where a hotel quotes a different time, the hotel entry says so.</em></p>



<h2 id="Luxury">Luxury and Upscale Hotels</h2>

<h3>${hotel("kimpton-da-an-hotel", "Kimpton Da An")}</h3>

<p>A 129-room IHG hotel on a quiet lane off Ren'ai Road, one block south of Zhongxiao East Road and two minutes from Zhongxiao Fuxing exit 3. It is the only hotel in Daan with a MICHELIN Key, awarded in 2025 and kept in the 2026 selection, and it had more support across the guides we checked than any other Daan hotel; Away to the City, who stayed, called it their second-favourite place to stay in Taipei. According to a June 2026 review on mimigo, entry rooms are about 32&nbsp;m² and shower-only, Premium rooms about 38&nbsp;m² (some with balconies, one type with a separate bath), and the suites have tubs. mimigo says every room has a window. There's a gym but no pool; The Tavernist restaurant and terrace are on the 12th floor, and a free wine hour runs from 5.30pm to 6.30pm, according to the same review. Pets of any size stay free, two per room. It was the priciest midweek hotel after Proverbs, at about NT$11,000; on Saturday 14 November only Premium rooms were left, from about NT$18,100.</p>

<h3>${hotel("hotel-proverbs-taipei", "Hotel Proverbs Taipei")}</h3>

<p>A 42-room boutique hotel on Daan Road, run by the Gloria group and designed by Ray Chen, four minutes from Zhongxiao Fuxing exit 4 (the hotel says about five). Go Ask a Local, Time Out and Taiwanderers all name it for the East District. Rooms run from 33&nbsp;m² to 49&nbsp;m², and the hotel says every type has a separate bathtub apart from one accessible room; the minibar is free. There is a small outdoor rooftop pool for hotel guests, open 6.30am to 9pm, and the ground floor holds an Italian grill and EAST END, a bar the hotel says has appeared on the Asia's 50 Best Bars list. It is a hotel for couples: Booking.com shows no extra beds and a minimum check-in age of 20, although cots, baby baths and bottle sterilisers can be requested. As a Design Hotels member, it can also be booked through Marriott Bonvoy. A room was about NT$13,300 on the Wednesday and NT$15,000 on the Saturday.</p>

<h3>${hotel("shangri-la-far-eastern-taipei", "Shangri-La Far Eastern, Taipei")}</h3>

<p>The big five-star of southern Daan, with 420 rooms on the upper floors of a 43-storey tower on Dunhua South Road. <strong>Its heated rooftop pool on the 43rd floor has been closed for annual maintenance since 31 August and reopens on 1 October 2026</strong>; a second, outdoor pool on the seventh floor opens only in summer. Superior rooms are 36&nbsp;m² with a marble bathroom, a bath and a separate shower. For families there are 56&nbsp;m² Grand Deluxe Family Rooms and pairs of interconnecting rooms, babysitting is offered, and on member bookings up to two children aged six and under eat free at the buffet; Travel Lemming picks it for families. The catch is the walk: Google Maps puts it nine minutes from Liuzhangli and 11 from Technology Building exit 1, both on the Brown line, and 12 from Xinyi Anhe on the Red line. The airport bus (1960) stops outside. Rooms were about NT$8,900 on the Wednesday and NT$14,200 on the Saturday.</p>

<h3>${hotel("park-taipei-hotel", "Park Taipei Hotel")}</h3>

<p>A 143-room hotel on Fuxing South Road right beside Daan station exit 6, so it is the most convenient of the bigger hotels for the Red and Brown lines. All rooms have a bathtub and a separate shower, according to the hotel, and some have a balcony or a Taipei 101 view. There's a gym and a terrace but no pool. The elevated Brown line runs past the front of the building, so ask for a room on the far side if you're a light sleeper. Family options are limited: the hotel caps most rooms at two adults and one child under six, and Booking.com lists no cots or extra beds. Go Ask a Local, Eating in Taipei and Tara O'Reilly all recommend it. It showed one of the biggest weekend jumps we saw, from about NT$9,900 on the Wednesday to NT$16,000 on the Saturday.</p>



<h2 id="Mid-Range">Mid-Range Hotels</h2>

<h3>${hotel("mgh-mitsui-garden-taipei-zhongxiao", "MGH Mitsui Garden Hotel Taipei Zhongxiao")}</h3>

<p>The first Mitsui Garden Hotel outside Japan, opened in 2020 on Zhongxiao East Road Section 3, a minute from Zhongxiao Xinsheng exit 3. It sits at the western tip of Daan, so it's closer to Huashan 1914 and Taipei Main Station than to the East District. The draw is the free, gender-separated public bath on the 17th floor, open from 3pm to midnight and again from 6am to 10am. Rooms are compact, from 21&nbsp;m² to 35&nbsp;m², and there are triples; there's also a 24-hour coin laundry and a guest lounge, and parking is free for guests. Booking.com lists no extra beds. It was named by four of the Taiwanese round-ups we read, and Away to the City, who stayed, rated it their favourite hotel in Taipei. Rooms were about NT$8,600 on the Wednesday and NT$10,800 on the Saturday.</p>

<h3>${hotel("madison-taipei", "Madison Taipei")}</h3>

<p>A 124-room hotel in Marriott's Tribute Portfolio, run by Cathay Hospitality, on the tree-lined Dunhua South Road. The hotel quotes five minutes to Daan exit 4 or Xinyi Anhe exit 1; Google Maps makes it seven from Xinyi Anhe and ten from Daan. It was a MICHELIN-recommended hotel from 2018 to 2020 and is still listed on the Michelin hotel site, without a Key. The entry Classic rooms (about 30&nbsp;m²) have a marble shower rather than a bath, and the hotel doesn't put extra beds in Classic or Madison rooms, so families should look at the larger types. There's a gym, an Italian restaurant and a whisky bar, but no pool. A Classic room was about NT$8,100 on the Wednesday and NT$11,000 on the Saturday.</p>

<h3>${hotel("episode-daan-taipei", "EPISODE Daan Taipei, JdV by Hyatt")}</h3>

<p><strong>This is the former HOME HOTEL Da-An</strong>, renamed and relaunched under Hyatt's JdV label in May 2024 at the same Fuxing South Road address, so some older guides still list it under the old name. (HOME HOTEL Xinyi still trades under its own name.) It's four minutes from Zhongxiao Fuxing exit 2. The 136 rooms follow a music theme, with CD or vinyl players; Premium rooms have a balcony and a bathtub, according to its Klook listing, and there are rooms with two double beds and corner rooms with a sofa bed. Texas Roadhouse occupies the ground floor and serves breakfast, and there's a bar with jazz and DJ nights. Booking.com sets a minimum check-in age of 20. The building faces the elevated Brown line; we found no reviews complaining of train noise, but it is worth asking for a room away from the road. It was about NT$7,200 on the Wednesday and NT$12,200 on the Saturday.</p>

<h3>${hotel("hotel-eclat-taipei", "Hotel Eclat Taipei")}</h3>

<p>A 60-room boutique hotel facing Madison across Dunhua South Road, seven minutes from Xinyi Anhe exit 1. It is a member of Small Luxury Hotels of the World and listed by Michelin, and its public areas hold an art collection that includes works by Dalí. A September 2026 review on itravelblog lists Bang &amp; Olufsen speakers, Nespresso machines, a free minibar and Dyson hairdryers in the rooms. The Deluxe rooms (about 25&nbsp;m²) have no bath; Premier 9 rooms and the suite have a jacuzzi. We found no gym or pool. Booking.com charges children from six as adults. It was the best-value hotel of this group in our check, at about NT$5,000 on the Wednesday and NT$5,400 on the Saturday.</p>



<h2 id="Budget">Cheaper Hotels</h2>

<h3>${hotel("dandy-hotel-daan-park", "Dandy Hotel Daan Park")}</h3>

<p>A 73-room hotel on the third to tenth floors of a building on Xinyi Road Section 3, facing Daan Forest Park, a minute from Daan Park exit 1. Breakfast is included, and Away to the City mentions free snacks, drinks and self-service laundry; Nick Kembel notes free strollers for families. The cheapest Economy and some Deluxe rooms have <strong>no window</strong>, while the Elite and park-view rooms look over the trees, and there's a Family Triple. Yongkang Street is about 13 minutes on foot. The windowless double was about NT$4,600 and a standard double about NT$5,300 on the Wednesday; on the Saturday they were about NT$7,500 and NT$7,900.</p>

<h3>${hotel("chez-nous-hotel-taipei", "Chez Nous")}</h3>

<p>A small hotel of around 28 rooms in a lane off Xinyi Road Section 3, between the park and Daan station, four minutes from Daan exit 1. Room sizes vary widely, from a Small Double of about 15&nbsp;m² to the 38&nbsp;m² Grande and an 80&nbsp;m² penthouse (sizes from listings; the hotel's site doesn't give them). Nick Kembel mentions a rooftop patio, and Travel Lemming also recommends it. The Small Double was about NT$4,300 on the Wednesday; on the Saturday only the Grande was left, at about NT$9,000.</p>

<h3>${hotel("taipei-fullerton-south", "Taipei Fullerton Hotel &ndash; Fuxing South")}</h3>

<p>A 95-room hotel at the corner of Fuxing South Road and Xinyi Road, three minutes from Daan exit 4, renovated in 2019. Rooms range from 23&nbsp;m² Business rooms to Deluxe Triples, and there's a gym and free coffee and tea in the lobby. Some listings describe a sauna with hot and cold pools and a steam room, but the hotel's own English site doesn't mention one, so check before counting on it. Go Ask a Local names it in its Daan Park section. A Superior Double was about NT$4,000 on the Wednesday; it was sold out on Saturdays 14 and 21 November, but a Fullerton Room cost about NT$5,600 on Saturday 7 November.</p>

<h3>${hotel("green-world-zhongxiao", "Green World ZhongXiao")}</h3>

<p>A 150-room hotel opened in 2016 on Zhongxiao East Road Section 4, a minute from Zhongxiao Dunhua exit 3 and in the thick of the East District. The cheapest Standard King and the family room have <strong>no window</strong>; Classic and Executive rooms do. A September 2026 mimigo post describes a bathtub with a separate shower and free parking. Sources disagree on children: mimigo says two under-12s stay free in family rooms, while Booking.com charges from age six, so confirm before booking. A windowless king was about NT$3,200 and a Classic room about NT$3,600 on the Wednesday; every Saturday we checked in November was fully booked.</p>

<h3>${hotel("eastin-taipei-hotel", "Eastin Taipei Hotel")}</h3>

<p>An 81-room hotel on the upper floors of an office block on Zhongxiao East Road, with its lobby on the 14th floor, four minutes from Zhongxiao Dunhua exit 6 (or five from Zhongxiao Fuxing exit 3). It's unusual in offering single rooms for men and for women with a shared bathroom, at about NT$1,360, alongside a windowless double at about NT$2,600 and quads at about NT$4,000. There's a terrace looking towards Taipei 101, a gym and laundry, but no parking. Like Green World, it had no rooms on any of the November Saturdays we checked.</p>



<h2 id="Hostels">Hostels</h2>

<h3>${hotel("star-hostel-taipei-east", "Star Hostel Taipei East")}</h3>

<p>The eastern branch of the Star Hostel at Main Station (see our <a href="/hotels-near-taipei-main-station">Main Station hotel list</a>), on the third floor of a converted building in Lane 147 off Zhongxiao East Road. From Zhongxiao Dunhua exit 7 it's about a minute's walk. There are dorms and private doubles, twins and quads, a common area with a kitchen, and breakfast is included. Listings mention a female-only dorm on its own floor. Reception is open 7am to 11pm, there's no curfew, quiet hours start at 10pm, and payment is in cash unless the bill tops NT$3,000. Under-18s are not recommended in the dorms. Go Ask a Local and Hostel Geeks both pick it. It had no availability on Booking.com for any November date we tried; the hostel's own site quotes dorm beds from NT$700 and private rooms from NT$2,000.</p>

<h3>${hotel("dongmen-3-hostel", "DONGMEN 3 Hostel")}</h3>

<p>A capsule hostel on the south side of Xinyi Road Section 2, about 30&nbsp;m from Dongmen exit 3 and around three minutes from the start of Yongkang Street. Beds are capsules and bunks in mixed and women-only dorms, with a lamp, desk, locker and socket in each, and shared bathrooms; there are also double capsules and a four-bed room. Breakfast is free, as are coffee and tea around the clock, and there's a rooftop terrace, a kitchen and laundry. Nick Kembel, who stayed, and Taiwanderers both recommend it. Guests must be 18 or over to check in. A single capsule was about NT$630 on the Wednesday, and no beds were left on 7, 14 or 21 November.</p>

<p><strong>Left out:</strong> the Howard Plaza on Ren'ai Road, named by two English guides, because it is mid-renovation, with its gym moved into a guest room, its children's room closed and its car park suspended.</p>



<h2 id="Getting-Around">Getting Around from Daan</h2>

<ul>
<li><strong>Taoyuan airport by bus:</strong> Airbus 1960 is the simplest option for many Daan hotels. Towards the airport it calls at the Shangri-La (the Far Eastern stop on Dunhua South Road) and the Howard Plaza on Ren'ai Road; coming from the airport it also stops at Zhongxiao Fuxing and Technology Building stations. The fare from Daan is NT$175, and there are about 15 departures a day in each direction, so check the timetable.</li>
<li><strong>Taoyuan airport by Airport MRT:</strong> take the Blue line to Taipei Main Station (about 5 minutes from Zhongxiao Fuxing, 7 from Zhongxiao Dunhua) or the Red line from Daan, Daan Park or Dongmen, then allow 5&ndash;10 minutes to walk through to A1. Express trains reach Terminal 1 in 35 minutes (Terminal 2 in 39) and cost NT$160; our <a href="/taoyuan-airport-mrt">Taoyuan Airport MRT page</a> has the details.</li>
<li><strong>Songshan Airport:</strong> the Brown line runs there directly from Zhongxiao Fuxing, three stops and about six minutes; from Daan it's one stop more, and from Technology Building two. No change is needed. The Brown line serves Songshan only, not Taoyuan. More on our <a href="/songshan-airport">Songshan Airport page</a>.</li>
<li><strong>Taipei Main Station and Ximending:</strong> the Blue line from Zhongxiao Fuxing reaches Taipei Main in about 5 minutes and Ximen in about 8. From Dongmen the Red line takes about 7 minutes to Taipei Main.</li>
<li><strong>Taipei 101:</strong> two stops on the Red line from Daan, about 3&ndash;4 minutes, or about 5 from Daan Park. From Zhongxiao Fuxing, change to the Red line at Daan (about 8&ndash;10 minutes in all).</li>
<li><strong>Fares:</strong> most trips from Daan to the stations above cost NT$20&ndash;25. Taxis start at NT$85, with a NT$20 surcharge from 11pm to 6am.</li>
</ul>

<p>First time on the Taipei Metro? Our <a href="/mrt">MRT guide</a> covers tickets and passes, and the <a href="/taiwan-easycard">EasyCard page</a> explains the stored-value card. The <a href="/daan-walking-route">Daan walking route</a> runs from the weekend flower market through the park and Yongkang Street to Chiang Kai-shek Memorial Hall.</p>

<blockquote class="wp-block-quote"><p>Still weighing up Daan? The <a href="/best-areas-and-hotels-to-stay">where-to-stay overview</a> compares every district, and there are similar hotel lists for <a href="/hotels-in-zhongshan">Zhongshan</a>, <a href="/hotels-near-taipei-101">Taipei 101</a>, <a href="/hotels-near-ximending">Ximending</a> and <a href="/hotels-near-taipei-main-station">Taipei Main Station</a>.</p></blockquote>
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

const title = "Hotels in Daan, Taipei (2026): Best Picks by Budget";
if (title.length > 60) fail(`title is ${title.length} chars`);

posts.push({
  id: Math.max(...posts.map((p) => p.id || 0)) + 1,
  authorId: 2,
  date: TODAY,
  modified: TODAY,
  slug: SLUG,
  title,
  excerpt:
    "Fifteen hotels and hostels in Daan, from the Kimpton to a capsule hostel by Yongkang Street, with the MRT exit and walk for each and November prices.",
  type: "post",
  parentId: 0,
  content: CONTENT,
  categories: [{ name: "Areas", slug: "areas" }, { name: "Hotels", slug: "hotels" }],
  tags: [{ name: "Lists", slug: "lists" }],
  featuredImage: "/media/2020/01/Fuxing-Dunhua-1024x699.jpg",
});

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2) + "\n");

console.log(`Added /${SLUG} to ${filePath}`);
console.log(`  title: ${title} (${title.length})`);
console.log(`  ${CONTENT.length} chars, ${Object.keys(KLOOK).length} hotels linked on Klook`);
