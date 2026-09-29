// New guide: aparthotels and serviced apartments in Taipei.
//
// WHY THIS PAGE. The where-to-stay guide's #Long-Stay section names one
// property, Gloria Residence. Families, remote workers and anyone staying a
// week or more want the wider field, and they need the legal picture:
// nightly flats in ordinary Taipei blocks are almost always unlicensed, and
// the fines went up in April 2025.
//
// SOURCING. data/research/aparthotels-serviced-apartments-taipei.md. English
// editorial coverage of the category is close to nil (one English pick,
// Gloria), so most entries rest on official sites, Taiwanese blog reviews
// and the Tourism Development Act and hotel regulations. Walks are Google
// Maps from the exit; prices are Booking.com for Wednesday 11 and Saturday
// 14 November 2026, checked 29 September 2026.
//
// SCOPE. Two groups, because the law splits them: licensed aparthotels that
// can be booked by the night (each with a Taipei hotel registration number),
// and monthly-only serviced apartments (30 nights or more). Airbnb flats,
// hostels with shared kitchens and hotels with a single kitchen suite are
// left out. Unverified monthly leads (The Denizen, Hi-Lai Residence, sáv,
// Lamaison and others) are left out.
//
// NOT A COPY. No eight-word run is shared with the where-to-stay page or the
// other hotel guides (checked before publishing).
//
// AFFILIATE LINKS. Only properties whose Klook page was opened and matched
// on address are linked, with aid=8733. EverStar (Klook still shows the old
// Astar Hotel), Jolley (Klook gives No. 566 against the official No. 568;
// unconfirmed), AJ Residence (no Klook page), The Corner House (markets
// itself as monthly-only) and the other monthly apartments are unlinked
// <span data-hotel> so they can be switched on by key later. Keys match the
// photo folders in data/hotel-photos.json where they exist.
//
// No FAQ block (FAQs are kept to the main guides) and no Perfect For box.
//
// POSTS_PATH=<file> writes to a copy instead of content/posts.json.

import fs from "fs";
import path from "path";

const SLUG = "aparthotels-serviced-apartments-taipei";
const TODAY = "2026-09-29 12:00:00";

const KLOOK = {
  "gloria-residence-taipei": "https://www.klook.com/en-GB/hotels/detail/113738-gloria-residence/?aid=8733",
  "leofoo-residences-taipei": "https://www.klook.com/en-GB/hotels/detail/436171-leofoo-residences/?aid=8733",
  "urban-abode-taipei": "https://www.klook.com/en-GB/hotels/detail/588350-urban-abode-apartment-1/?aid=8733",
  "hanns-house-taipei": "https://www.klook.com/en-GB/hotels/detail/391766-hanns-house/?aid=8733",
  "tianmu-star-urban-living": "https://www.klook.com/en-GB/hotels/detail/657372-tianmu-star-hotel/?aid=8733",
};

const hotel = (key, name) =>
  KLOOK[key]
    ? `<a href="${KLOOK[key]}" data-hotel="${key}" target="_blank" rel="noreferrer noopener">${name}</a>`
    : `<span data-hotel="${key}">${name}</span>`;

const CONTENT = `
<p>A flat with its own kitchen changes a Taipei trip once it runs past a few nights. Families can cook simple meals and keep toddlers to their own timetable, remote workers get a table that isn't a hotel desk, and anyone here for a week or longer can do their washing without hunting for a <a href="/taipei-laundrettes">laundrette</a>. This guide lists the places in Taipei City where you get a kitchen or kitchenette, split into licensed aparthotels you can book for a single night and serviced apartments that only take stays of a month or more.</p>

<p>Be warned that the choice is narrower than in Bangkok, Singapore or Tokyo. <strong>The big international serviced-apartment brands have not reached Taipei yet.</strong> We found no Somerset, Citadines, Oakwood or Shama here, and Fraser and Ascott both arrive in 2027 (see <a href="#Coming-Soon">below</a>). What Taipei does have is a handful of locally run apartment hotels, most of them in Zhongshan, plus a group of monthly rental buildings aimed at expats on short postings.</p>

<p>If you only want the headline pick, the <a href="/best-areas-and-hotels-to-stay#Long-Stay">long-stay section of our where-to-stay guide</a> covers Gloria Residence. Travelling with children? Our list of <a href="/best-places-to-keep-kids-amused">places to keep kids amused</a> helps fill the days, and working visitors can find a laptop-friendly table in our <a href="/best-cafes-to-work">guide to cafés for working</a>.</p>



<h2 id="Legal">Is It Legal? Airbnb and Short Lets in Taiwan</h2>

<p>This matters more in Taiwan than in most places, because the law draws a hard line between a hotel stay and a tenancy.</p>

<ul>
<li><strong>Letting by the night or the week needs a licence.</strong> Under Taiwan's hotel regulations, providing rooms to travellers by the day or the week for payment counts as running a hotel, and it needs a hotel licence or a homestay (minsu) licence.</li>
<li><strong>Letting by the month is an ordinary tenancy.</strong> A lease of a month or longer with no hotel services is a normal residential rental. That is why the serviced apartments in the second half of this guide insist on 30 nights or more, and ask for a deposit and a signed lease.</li>
<li><strong>Homestays are barely possible in the city.</strong> Taipei allows minsu only in Yangmingshan National Park, on licensed leisure farms and in designated heritage buildings. A whole flat in an ordinary apartment block, let by the night, is therefore almost certainly unlicensed. (Licensed hotels also advertise on Airbnb, and those listings are fine.)</li>
<li><strong>The fines went up in 2025.</strong> An amendment to the Development of Tourism Act, promulgated on 2 April 2025, set the fine for running unlicensed lodging at NT$100,000&ndash;2,000,000, where the ceiling had been NT$500,000. Advertising an illegal let can cost up to NT$1.5 million, and booking platforms can be fined NT$60,000&ndash;2,000,000 for each illegal listing. Taipei also pays informants 15% of the fine.</li>
</ul>

<p>The fines are aimed at operators and platforms, not at guests. The risks for a guest are practical ones: a booking cancelled at short notice, being asked to leave after a neighbour complains, and a building that has had no fire-safety inspection as a hotel and no hotel insurance.</p>

<h3 id="How-To-Check">How to check a place is licensed</h3>

<p>Taipei's tourism office suggests three steps:</p>

<ol>
<li><strong>Look at the address.</strong> If it's a flat in an ordinary residential block, be suspicious.</li>
<li><strong>Search the official register.</strong> The Tourism Administration's <a href="https://taiwanstay.net.tw/" target="_blank" rel="noreferrer noopener">Taiwan Stay</a> site has an English interface and a search for legal lodging (合法旅宿查詢).</li>
<li><strong>Look for the mark and the number.</strong> A licensed hotel must display its licence and the official hotel mark (旅館業專用標識) somewhere conspicuous; homestays have their own mark (民宿專用標識). Every advert, including the hotel's own website, must show its registration number, written like 臺北市旅館○○○號 (Taipei City Hotel No. ...).</li>
</ol>

<p>Each nightly property in this guide shows one. Gloria Residence is No. 435, Leofoo Residences No. 399, Jolley No. 668, Urban Abode No. 724, AJ Residence No. 757, EverStar No. 816, Hanns House No. 706 and Tianmu Star No. 768-1.</p>

<p>One more practical point: Taipei hotels no longer put out single-use toiletries unless you ask. Leofoo dates the change from 1 January 2025 and Gloria from 1 January 2026, so pack your own or request them at check-in.</p>



<h2 id="Compare">At a Glance</h2>

<figure class="wp-block-table is-style-stripes"><table><thead><tr><th>Property</th><th>Area and MRT</th><th>Kitchen</th><th>Washing machine</th><th>Sleeps</th><th>Price</th><th>Minimum stay</th></tr></thead><tbody>
<tr><td>${hotel("gloria-residence-taipei", "Gloria Residence")}</td><td>Zhongshan; Shuanglian exit 1 or Zhongshan Elementary School exit 2, 9 mins</td><td>Full kitchen, combination microwave oven</td><td>Washer-dryer in each apartment</td><td>2; 4 in the two-bedroom Oasis</td><td>About NT$7,100&ndash;7,400 a night</td><td>1 night</td></tr>
<tr><td>${hotel("leofoo-residences-taipei", "Leofoo Residences")}</td><td>Zhongshan; Zhongshan exit 3, 5 mins</td><td>Full kitchen, double induction hob</td><td>Washer-dryer in each suite</td><td>2, plus a paid extra bed</td><td>About NT$7,700 a night</td><td>1 night</td></tr>
<tr><td>${hotel("jolley-hotel-taipei", "Jolley Hotel")}</td><td>Zhongshan; Zhongshan Elementary School exit 1, 3 mins</td><td>Induction hob, 130-litre fridge</td><td>In some rooms; free shared machines</td><td>Up to 3</td><td>About NT$5,300 a night</td><td>1 night</td></tr>
<tr><td>${hotel("everstar-hotel-taipei", "EverStar Hotel")}</td><td>Zhongshan; Zhongshan exit 2, 8 mins</td><td>Kitchenette, household fridge, microwave</td><td>Washer-dryer in suites only</td><td>2</td><td>About NT$4,700 a night</td><td>1 night</td></tr>
<tr><td>${hotel("urban-abode-taipei", "Urban Abode Apartment 1")}</td><td>Zhongzheng; Taipei Main Station, 6 mins</td><td>Kitchenette with hob</td><td>Listed</td><td>Up to 4</td><td>About NT$3,300 (2 people), NT$4,000 (4)</td><td>1 night</td></tr>
<tr><td>${hotel("aj-residence-taipei", "AJ Residence Taipei")}</td><td>Datong; above Taipei Bus Station, next to Taipei Main Station</td><td>Kitchenette</td><td>Yes</td><td>Up to 5 (three-bedroom)</td><td>No rates found</td><td>1 night</td></tr>
<tr><td>${hotel("hanns-house-taipei", "Hanns House")}</td><td>Xinyi; City Hall exit 2, 4 mins</td><td>Kitchen in three room types only</td><td>Coin laundry (reported)</td><td>2</td><td>About NT$9,300 a night</td><td>1 night</td></tr>
<tr><td>${hotel("tianmu-star-urban-living", "Tianmu Star Urban Living")}</td><td>Shipai; Shipai station, 4 mins</td><td>Kitchenette in "Warm" rooms</td><td>Not confirmed</td><td>2</td><td>About NT$4,500 a night</td><td>1 night</td></tr>
<tr><td>${hotel("park259-jean-residence", "Park259")}</td><td>Zhongzheng, by Yongkang Street; Dongmen exit 5, 4 mins</td><td>Full kitchen, induction hob</td><td>Washer-dryer</td><td>Not stated</td><td>From NT$55,000 a month</td><td>1 month</td></tr>
<tr><td>${hotel("the-corner-house-taipei", "The Corner House")}</td><td>Da'an; Daan Park exit 6, 2 mins</td><td>Simple kitchen (per blog reviews)</td><td>Shared laundry room</td><td>Up to two bedrooms</td><td>Not confirmed</td><td>1 month</td></tr>
<tr><td>${hotel("ch-service-apartment-taipei", "CH Service Apartment")}</td><td>Zhongshan; Minquan W Rd or Zhongshan Elementary School, about 10 mins</td><td>Induction hob, microwave</td><td>Own machine</td><td>Not stated</td><td>NT$102,000 for 30 nights</td><td>30 nights</td></tr>
<tr><td>${hotel("kt-star-apartments-taipei", "KT-Star / KT-Boutique")}</td><td>Zhongshan (Minquan W Rd) and Xinyi (Liuzhangli)</td><td>Kitchenette</td><td>In-room (Zhongshan)</td><td>Up to two bedrooms</td><td>About NT$53,000&ndash;120,000 a month (reported)</td><td>1 month</td></tr>
<tr><td>${hotel("redin-residences-taipei", "REDIN Residences")}</td><td>Xinyi; about 320&nbsp;m from City Hall</td><td>Full kitchen</td><td>Not stated</td><td>53&ndash;159&nbsp;m² units</td><td>NT$98,000&ndash;220,000 a month (2019)</td><td>1 month</td></tr>
</tbody></table></figure>

<p><em>Nightly prices are the lowest Booking.com rate for a unit with a kitchen, two adults, the night of Wednesday 11 November, with prices taken on 29 September 2026; Gloria's lower figure is from its own booking engine. Monthly figures come from the operators, Taiwanese blog reviews or a rental platform, as noted in each entry. Treat them as a guide for comparing places, not a quote. Walking times are from Google Maps, from the named exit at street level.</em></p>

<p>Three patterns stood out. <strong>Weekly discounts exist but are small</strong>: seven nights at Gloria worked out at NT$6,846 a night on Booking.com, roughly 8% below the single-night rate, and none of these places publishes a weekly price list. <strong>Saturdays go early</strong>: Leofoo and Jolley had nothing left on Booking.com for Saturday 14 or 21 November. And <strong>for a full month, the monthly apartments are much cheaper</strong>: CH's 30-night price comes to about NT$3,400 a night, and Park259 starts at around NT$1,800 a day, well below any aparthotel's nightly rate.</p>



<h2 id="Nightly">Nightly Stays (Licensed Aparthotels)</h2>

<p>All of these hold a Taipei City hotel registration, so you can book one night or thirty. They run from the Zhongshan cluster around Linsen North Road to Taipei Main Station, then Xinyi and Shipai. Urban Abode, AJ Residence and Tianmu Star have no editorial reviews that we could find, which each entry notes.</p>

<h3>${hotel("gloria-residence-taipei", "Gloria Residence")}</h3>

<p>The best-known apartment hotel in the city, run by the Gloria group (which also owns Hotel Proverbs) where Linsen North Road meets Minsheng East Road. It is the one Taipei aparthotel we found recommended by an English-language writer, Tara O'Reilly, and it has several Taiwanese blog reviews. Apartments start at 43&nbsp;m² (Abundance) and run to 158&nbsp;m²; for families the <strong>Oasis</strong> has two bedrooms, two bathrooms and a separate living room in 85&nbsp;m², and sleeps four, as does the larger Glory. The official amenity list gives a European-style kitchen and cooker hood, a microwave that doubles as an oven, a dish dryer, crockery and a coffee machine; it doesn't say what kind of hob, and a 2020 review on yama mentions an oven and dishwasher. Each apartment has a washer-dryer on its balcony, detergent included. Downstairs there's an 18-metre heated indoor pool (<strong>closed on Mondays</strong>, and open in set sessions morning, afternoon and evening), a lounge open around the clock and a 24-hour service centre. There is no gym. Dehumidifiers and baby equipment can be borrowed free, cots are free for under-twos, and each apartment has a free parking space. House rules allow no parties and at most four visitors, between 9am and 10pm. Google Maps puts it nine minutes from Shuanglian exit 1 (Red line) or Zhongshan Elementary School exit 2 (Orange line), and <a href="/ningxia-night-market">Ningxia Night Market</a> is an 18-minute walk. The Abundance cost NT$7,440 on Booking.com for the Wednesday and NT$7,840 on the Saturday, and NT$7,068 through Gloria's own site; the Oasis wasn't available for our dates. There's a longer write-up on our <a href="/hotels-in-zhongshan">Zhongshan hotels page</a>.</p>

<h3>${hotel("leofoo-residences-taipei", "Leofoo Residences")}</h3>

<p>A suite-only apartment hotel run by Leofoo Development, facing Linsen Park on Nanjing East Road Section 1, five minutes from Zhongshan exit 3. There are just two types, both one-bedroom suites with a separate living room: the City View Suite (about 60&nbsp;m², with a hot tub, according to a blog review) and the Park View Suite (about 83&nbsp;m², with a balcony). Each has a designer kitchen with a double induction hob, a fridge and a microwave, and an in-unit washer-dryer with detergent pods; one blogger noted pans and crockery for two but no knives or chopping board, so bring your own if you plan to cook properly. Parking is free (mechanical, maximum height 1.90&nbsp;m), there's a rooftop bar in the evenings and a reading lounge open all day, but no gym or pool. Cots are free for babies up to one year old. Some recent reviews mention wear and tear, including mould, so ask for a recently refreshed suite. The Park View Suite was NT$7,700 on the Wednesday; both November Saturdays we tried were sold out, though Saturday 7 November was the same price.</p>

<h3>${hotel("jolley-hotel-taipei", "Jolley Hotel")}</h3>

<p>A 62-room apartment hotel opened in 2018 at the northern end of Linsen North Road, three minutes from Zhongshan Elementary School exit 1 on the Orange line, with a Starbucks at street level. It has the most Taiwanese blog reviews of any place here. The official room lists for the 50&nbsp;m² Deluxe and the 56&nbsp;m² Family Suite (a queen and a single) include an induction hob, a 130-litre fridge, kitchenware and a washer-dryer, and two bloggers also mention an oven; one says only some balconies have a washer, but free washers, dryers and detergent are available on the second floor for everyone. The second-floor lounge serves free drinks and snacks to guests from 10am to 10pm. <strong>Breakfast is no longer included</strong>, whatever older reviews say: it now costs NT$420 a head. A baby kit (bottle warmer and steriliser) can be borrowed, but Booking.com lists no cots. The hotel advertises an extended-stay offer for seven nights or more without publishing the rate, so ask. The Deluxe with a balcony was about NT$5,300 on the Wednesday; there was nothing on either November Saturday we tried.</p>

<h3>${hotel("everstar-hotel-taipei", "EverStar Hotel")}</h3>

<p><strong>This is the old Astar Hotel</strong>, a Linsen North Road name since 1964, which reopened on 29 May 2026 as 亞士都精品酒店 after five years of rebuilding, according to udn. It belongs to the same developer as Jolley. Every room now has a kitchenette with a household-size fridge and a microwave, and the suites add a washer-dryer and a dish dryer; rooms are about 26&ndash;37&nbsp;m², with a balcony, a bidet toilet and separate wet and dry areas in the bathroom. Cots are free for under-twos, but there are no extra beds, so it suits couples or a family with a baby. It is eight minutes from Zhongshan exit 2, on the edge of the Tiaotong lanes, the izakaya and bar quarter covered in our <a href="/taipei-nightlife">nightlife guide</a>; we have seen no reviews on noise yet, but light sleepers may want a room away from the lane. Note that Booking.com still uses the old Chinese name and Klook's page still shows the pre-renovation hotel, so check you're looking at the new rooms. A double was NT$4,700 on the Wednesday and NT$6,100 on the Saturday, and the one-bedroom suite NT$5,800 and NT$7,200.</p>

<h3>${hotel("urban-abode-taipei", "Urban Abode Apartment 1")}</h3>

<p>Our own find, and the best value we came across for a family. It's a licensed apartment hotel on the 24th floor of No. 50 Zhongxiao West Road, the tower opposite Taipei Main Station, about six minutes on foot from the station building at street level. The studios are 34&nbsp;m² with a Taipei 101 view and a kitchenette with a fridge, microwave, hob and crockery, and the family studios sleep four; there's also a two-bedroom apartment. Booking.com lists a washing machine and free cots for children up to three. We found no editorial reviews of it, so its Booking.com score (8.5) is the only guide. Check-out is early, by 11am at the latest. On the Wednesday a studio was about NT$3,300 for two people or NT$4,000 for four; on the Saturday only the two-bedroom apartment was left, at NT$13,557. Our <a href="/hotels-near-taipei-main-station">Main Station hotels page</a> covers the area.</p>

<h3>${hotel("aj-residence-taipei", "AJ Residence Taipei")}</h3>

<p>The one place in this guide with proper multi-bedroom flats: apartments of 83&ndash;145&nbsp;m² on top of the Taipei Bus Station and Q Square complex on Civic Boulevard, ranging from a one-bedroom Business Suite to a three-bedroom family flat with two bathrooms that sleeps four or five. All have a kitchenette, a washing machine, a balcony and heated toilet seats. The operator says it's about three minutes on foot from the MRT through the Zhongshan Metro Mall and Q Square, or five from the Airport MRT at A1; at street level Google Maps makes it seven from the station building. It sells nightly, weekly and monthly stays. The catches: Booking.com offers neither cots nor extra beds and takes cash only, reviews mention no daily towel change, and <strong>we found no availability on any November date we tried</strong>, and no rates on its own site, which takes bookings by member login or phone. Don't confuse it with the closed I.T Service Apartment in the same complex (see <a href="#Closed">below</a>).</p>

<h3>${hotel("hanns-house-taipei", "Hanns House")}</h3>

<p>A 120-room hotel on Keelung Road near Taipei City Hall, four minutes from City Hall exit 2 on the Blue line and about 11 minutes from Taipei 101. It is on this list with a caveat: every room has a fridge and a microwave, but <strong>only three types have a proper kitchen</strong> on Booking.com &ndash; the 33&nbsp;m² Superior King, the 46&nbsp;m² Premier Suite and the 48&nbsp;m² Superior Suite. A Taiwanese blog mentions a coin laundry for long-stay guests. Its Booking.com listing offers neither cots nor extra beds, so it's better for couples and solo remote workers than for families. The Superior King with a kitchen was about NT$9,300 on the Wednesday and NT$10,900 on the Saturday, making it the priciest nightly option here. It also appears on our <a href="/hotels-near-taipei-101">Taipei 101 hotels page</a>.</p>

<h3>${hotel("tianmu-star-urban-living", "Tianmu Star Urban Living")}</h3>

<p>The only licensed kitchenette rooms we found in the north-west, on a lane off Shipai Road four minutes from Shipai station on the Red line, at the edge of Tianmu, where many of Taipei's expat families and international schools are. Only its 30&nbsp;m² "Warm" doubles and twins have a private kitchenette; other room types don't, and we couldn't confirm a washing machine. It has no editorial coverage, so treat it as an option for anyone who needs to be near Tianmu rather than a destination in itself. A Warm room was about NT$4,500 on the Wednesday and NT$5,500 on the Saturday.</p>



<h2 id="Monthly">Monthly Stays (30 Nights or More)</h2>

<p>These are rental businesses rather than hotels, so they take bookings of at least a month; expect to sign a lease and pay a month's deposit. The luxury Shin Kong Jasper Villa towers in Xinyi, managed by the Regent group, need a year, so they aren't covered here.</p>

<h3>${hotel("park259-jean-residence", "Park259 (Jean Residence)")}</h3>

<p>A serviced apartment building at No. 259 Xinyi Road Section 2, four minutes from Dongmen exit 5 and five from Daan Park exit 1, so <a href="/yongkang-street">Yongkang Street</a> and <a href="/daan-forest-park">Daan Forest Park</a> are both on the doorstep. A review on flyblog describes a full kitchen with an induction hob and a combination microwave oven, a wine fridge, a washer-dryer, a bath and a walk-in shower, and an Illy coffee machine; there's a gym on the second floor and a rooftop garden. Rent starts at about NT$55,000 a month and includes utilities, internet, cable, management fees, tax and cleaning twice a week. The minimum is one month, with discounts for six months or more. Nearby hotels are on our <a href="/hotels-in-daan">Daan hotels page</a>.</p>

<h3>${hotel("the-corner-house-taipei", "The Corner House")}</h3>

<p>A seven-storey building on a lane off Xinsheng South Road that calls itself a monthly serviced apartment, two minutes from Daan Park exit 6. Units run from a 27&nbsp;m² Superior to a 60&nbsp;m² two-bedroom Residence Suite, each with a living area and, according to older blog reviews, a simple kitchen with an induction hob and a microwave. Breakfast is free, drinks are available all day, and there's a basement gym and a shared guest laundry rather than machines in the flats. We couldn't confirm the current rent. It still appears on some booking sites, but as it markets itself as monthly-only, check with the building before booking a short stay.</p>

<h3>${hotel("ch-service-apartment-taipei", "CH Service Apartment")}</h3>

<p>Monthly apartments on Nong'an Street in Zhongshan, about ten minutes' walk from either Minquan West Road or Zhongshan Elementary School stations. It sells 30-night stays on Booking.com and signs a rental agreement at check-in; a Deluxe Classic Apartment came to NT$102,000 for 11 November to 11 December. Rent includes management, cleaning, Wi-Fi, cable and water, and each unit has an induction hob, a microwave, a dish dryer and its own washing machine, with a pool and gym in the building, according to listings.</p>

<h3>${hotel("kt-star-apartments-taipei", "KT-Star and KT-Boutique")}</h3>

<p>Two monthly buildings from the same company: KT-Star in Zhongshan, about seven minutes from Minquan West Road station, and KT-Boutique in Xinyi, about six minutes from Liuzhangli. Neither takes daily or weekly stays. A rental platform quotes Zhongshan rents from about NT$53,000 a month for a studio to NT$89,000 for a family room and NT$120,000 for two bedrooms, with a kitchenette and washer in the units; Xinyi starts at about NT$98,000. We couldn't confirm those figures with the operator.</p>

<h3>${hotel("redin-residences-taipei", "REDIN Residences")}</h3>

<p>An upmarket block of 59 apartments on Zhongxiao East Road Section 4, about 320&nbsp;m from Taipei City Hall station, opened in 2019. Units range from about 53&nbsp;m² to 159&nbsp;m², with a living room, dining room and kitchen, and there's a gym, lounge and sky garden. At opening, China Times reported rents of NT$98,000&ndash;220,000 a month; current rates may differ.</p>



<h2 id="Coming-Soon">Coming in 2027</h2>

<ul>
<li><strong>Ascott Nangang Taipei</strong> is due in the first quarter of 2027, with 185 units in Nangang Software Park and a footbridge to Taipei Nangang Exhibition Center station and the LaLaport mall. It is Ascott's first Taipei signing, in partnership with The GAIA Hotel.</li>
<li><strong>Fraser Residence Taipei</strong>, the Fraser group's first property in Taiwan, is planned for 2027 in Beitou, near Tianmu and Shipai stations, with more than 200 one- to three-bedroom suites, a heated pool and a gym. For the hot spring hotels in the same district, see our <a href="/beitou-hot-spring-hotels">Beitou hotels guide</a>.</li>
</ul>

<p id="Closed"><strong>Closed, so ignore old listings:</strong> the Sherwood Taipei closed on 15 February 2022 for redevelopment, and the I.T Service Apartment (京站國際酒店式公寓) at Q Square shut in October 2020, although at least one booking site still shows a live-looking page for it. AJ Residence, in the same complex, is a separate business.</p>

<blockquote class="wp-block-quote"><p>Still choosing a district? The <a href="/best-areas-and-hotels-to-stay">where-to-stay overview</a> compares them all, and there are hotel lists for <a href="/hotels-in-zhongshan">Zhongshan</a>, <a href="/hotels-in-daan">Daan</a>, <a href="/hotels-near-taipei-main-station">Taipei Main Station</a> and <a href="/hotels-near-taipei-101">Taipei 101</a>. For stocking the kitchen, try our <a href="/best-supermarkets-and-delis-with-western-produce">supermarkets and delis guide</a>.</p></blockquote>
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

const title = "Serviced Apartments & Aparthotels in Taipei (2026)";
if (title.length > 60) fail(`title is ${title.length} chars`);

posts.push({
  id: Math.max(...posts.map((p) => p.id || 0)) + 1,
  authorId: 2,
  date: TODAY,
  modified: TODAY,
  slug: SLUG,
  title,
  excerpt:
    "Thirteen places in Taipei with your own kitchen, from nightly aparthotels to monthly serviced apartments, plus how to tell a licensed stay from an illegal short let.",
  type: "post",
  parentId: 0,
  content: CONTENT,
  categories: [{ name: "Areas", slug: "areas" }, { name: "Hotels", slug: "hotels" }],
  tags: [{ name: "Lists", slug: "lists" }],
  featuredImage: "/media/2026/09/hotels/gloria-residence-taipei-3.jpg",
});

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2) + "\n");

console.log(`Added /${SLUG} to ${filePath}`);
console.log(`  title: ${title} (${title.length})`);
console.log(`  ${CONTENT.length} chars, ${Object.keys(KLOOK).length} properties linked on Klook`);
