// New guide: hotels near Ximending.
//
// WHY THIS PAGE. Second in the "hotels near..." series after Taipei Main
// Station. The where-to-stay guide names five places in Ximending; the
// district has far more, and readers who have already picked it want to
// know which exit, which side and what they'll pay.
//
// SOURCING. data/research/hotels-near-ximending.md. Two passes: a consensus
// count of 26 English publishers and 14 Taiwanese round-ups, then every
// hotel checked against its official site and the Tourism Administration
// register, walked in Google Maps from its exit, and priced on Booking.com
// for a November 2026 weekday and Saturday. That is why Ximen WOW (closed,
// now Meow Day Hostel) is missing, why Oani is in, and why the Cho Hotel,
// Energy Inn and Papa Whale details differ from the where-to-stay page.
//
// NOT A COPY. No eight-word run is shared with the where-to-stay page, the
// Ximending area guide or the Main Station guide (checked before publishing).
//
// WHERE-TO-STAY PAGE. Not touched by this script. The discrepancies found
// there are listed in the research file, section 5.
//
// AFFILIATE LINKS. Every hotel links to its own Klook hotel page (each URL
// opened and its address checked on 28 Sep 2026) and carries
// data-hotel="<key>" so the lot can switch to Agoda by key.
//
// No FAQ block (FAQs are kept to the main guides) and no Perfect For box.
//
// POSTS_PATH=<file> writes to a copy instead of content/posts.json.

import fs from "fs";
import path from "path";

const SLUG = "hotels-near-ximending";
const TODAY = "2026-09-28 12:00:00";

const KLOOK = {
  "sotetsu-ximen": "https://www.klook.com/en-GB/hotels/detail/1308576-sotetsu-grand-fresa-taipei-ximen/?aid=8733",
  "solaria-ximen": "https://www.klook.com/en-GB/hotels/detail/1231636-solaria-nishitetsu-hotel-taipei-ximen/?aid=8733",
  "westgate": "https://www.klook.com/en-GB/hotels/detail/283055-westgate-hotel/?aid=8733",
  "amba-ximending": "https://www.klook.com/en-GB/hotels/detail/572261-amba-taipei-ximending/?aid=8733",
  "just-sleep-ximending": "https://www.klook.com/en-GB/hotels/detail/249160-just-sleep-ximending/?aid=8733",
  "roaders-zhonghua": "https://www.klook.com/en-GB/hotels/detail/251554-roaders-hotel-zhonghua/?aid=8733",
  "cho-hotel": "https://www.klook.com/en-GB/hotels/detail/269163-cho-hotel/?aid=8733",
  "cho-hotel-3": "https://www.klook.com/en-GB/hotels/detail/285820-cho-hotel-3/?aid=8733",
  "energy-inn": "https://www.klook.com/en-GB/hotels/detail/296386-energy-inn/?aid=8733",
  "cityinn-plus-ximending": "https://www.klook.com/en-GB/hotels/detail/433316-cityinn-hotel-plus-ximending-branch/?aid=8733",
  "papa-whale": "https://www.klook.com/en-GB/hotels/detail/251905-hotel-papa-whale/?aid=8733",
  "artotel-ximending": "https://www.klook.com/en-GB/hotels/detail/420441-artotel-ximending-taipei/?aid=8733",
  "meander-taipei": "https://www.klook.com/en-GB/hotels/detail/233515-meander-taipei/?aid=8733",
  "oani": "https://www.klook.com/en-GB/hotels/detail/2170320-oani/?aid=8733",
  "dan-hostel": "https://www.klook.com/en-GB/hotels/detail/534581-dan-hostel/?aid=8733",
};

const hotel = (key, name) =>
  KLOOK[key]
    ? `<a href="${KLOOK[key]}" data-hotel="${key}" target="_blank" rel="noreferrer noopener">${name}</a>`
    : `<span data-hotel="${key}">${name}</span>`;

const CONTENT = `
<p><strong>Ximending</strong> suits travellers who want the city's busiest pedestrian streets on the doorstep and a Metro station in the middle of them. Ximen station is served by both the Blue and Green lines, one stop from Taipei Main Station, and no other part of Taipei squeezes as many small hotels and hostels into so few blocks. This guide covers fifteen of them, all within about ten minutes on foot of the station &ndash; from two new Japanese-run hotels to dorm beds under NT$1,000 &ndash; with November prices and the exit to use for each.</p>

<div class="quick-verdict"><p class="quick-verdict-title">💡 The Quick Verdict: Hotels Near Ximending</p><ul><li><strong>Upscale:</strong> ${hotel("sotetsu-ximen", "Sotetsu Grand Fresa")} &ndash; opened in 2024, a minute from exit 3, and no room smaller than 30&nbsp;m².</li>
<li><strong>Best all-rounder:</strong> ${hotel("amba-ximending", "amba Taipei Ximending")} &ndash; above Eslite on the car-free cinema street, with free guest laundry.</li>
<li><strong>With children:</strong> ${hotel("just-sleep-ximending", "Just Sleep")} or ${hotel("roaders-zhonghua", "Roaders Hotel Zhonghua")}, both with playrooms and family rooms.</li>
<li><strong>Cheap and central:</strong> ${hotel("cityinn-plus-ximending", "CityInn Hotel Plus")} &ndash; one minute from exit 3, most rooms windowless.</li>
<li><strong>Hostel:</strong> ${hotel("meander-taipei", "Meander Taipei")}, the Ximending hostel English-language guides name most often.</li></ul></div>



<h2 id="Why-Stay">Is Ximending the Right Base?</h2>

<p>Stay here if your evenings matter more than your mornings. Food stalls, bubble tea, cinemas and late bars are all on the doorstep, prices are lower than in Da'an or Xinyi, and the two Metro lines make most of central Taipei a short ride. It's also a handy base for the older side of the city: <a href="/longshan-temple">Longshan Temple</a>, <a href="/bopiliao-historical-block">Bopiliao</a> and <a href="/huaxi-street-night-market">Huaxi Street Night Market</a> are one stop west, and <a href="/the-red-house-ximending">the Red House</a> is beside exit 1. The <a href="/ximending">Ximending guide</a> has the full list of what to do.</p>

<p>Think twice if you sleep lightly. The pedestrian zone is busy until late: buskers have had to switch off their amplifiers at 9pm since September 2024, but the bars around the Red House plazas carry on into the small hours, and Zhonghua Road is a busy main road. The hotels reviewers call quietest are the ones whose rooms start several floors up &ndash; amba and Solaria. It's also worth knowing that at the cheaper end the <strong>entry-level room is usually windowless</strong> &ndash; true at CityInn Plus, Cho, Energy Inn, Roaders and Art'otel, while Papa Whale is windowless almost throughout. And if your trip centres on Xinyi and <a href="/taipei-101">Taipei 101</a>, you'll spend 15&ndash;20 minutes and a change of line getting there each time.</p>

<h3>Which exit, which side?</h3>

<p>Ximen station's six exits split the district in two, and the right one can save you a walk with bags:</p>

<ul>
<li><strong>Exits 1 and 6</strong> surface on the west side, where Hanzhong Street crosses Chengdu Road. Exit 6 opens straight into the pedestrian zone and has a street lift; exit 1 comes up by the Red House and is quicker for the lanes south of Chengdu Road.</li>
<li><strong>Exits 2 to 5</strong> line Zhonghua Road on the east side. Exit 3 (Baoqing Road) is the one for Sotetsu, CityInn Plus and Oani; exit 4 (Hengyang Road) has the other street lift; exit 5 (Zhongshan Hall), the northernmost, is reached through the underground mall that reopened in January 2026 as UNDERCITY: XIMEN, and is best for Just Sleep and Roaders.</li>
<li><strong>Further west</strong>, around Kunming Street and Kangding Road, is where the cheaper hotels cluster &ndash; Cho, Energy Inn, Papa Whale and Meander are six to ten minutes out, on streets that are calmer after dark.</li>
</ul>

<figure class="wp-block-table is-style-stripes"><table><thead><tr><th>Hotel</th><th>Type</th><th>Walk to MRT</th><th>Nightly cost</th></tr></thead><tbody>
<tr><td>${hotel("sotetsu-ximen", "Sotetsu Grand Fresa")}</td><td>Upscale</td><td>1 min (exit 3)</td><td>From around NT$6,900</td></tr>
<tr><td>${hotel("solaria-ximen", "Solaria Nishitetsu")}</td><td>Upscale</td><td>5 mins (exit 6)</td><td>From around NT$7,300</td></tr>
<tr><td>${hotel("westgate", "Westgate Hotel")}</td><td>Upscale</td><td>2 mins (exit 6)</td><td>Around NT$8,400*</td></tr>
<tr><td>${hotel("amba-ximending", "amba Taipei Ximending")}</td><td>Design hotel</td><td>6 mins (exit 6)</td><td>From around NT$4,500</td></tr>
<tr><td>${hotel("just-sleep-ximending", "Just Sleep Ximending")}</td><td>Mid-range</td><td>3&ndash;5 mins (exit 5)</td><td>From around NT$5,800</td></tr>
<tr><td>${hotel("roaders-zhonghua", "Roaders Hotel Zhonghua")}</td><td>Mid-range</td><td>About 5 mins (exit 5)</td><td>From around NT$3,300 (windowless)</td></tr>
<tr><td>${hotel("cho-hotel", "Cho Hotel")} / ${hotel("cho-hotel-3", "Cho Hotel 3")}</td><td>Mid-range</td><td>5&ndash;6 mins (exit 1)</td><td>From around NT$3,600 (windowless)</td></tr>
<tr><td>${hotel("energy-inn", "Energy Inn")}</td><td>Mid-range</td><td>6 mins (exit 6)</td><td>From around NT$3,500 (windowless)</td></tr>
<tr><td>${hotel("cityinn-plus-ximending", "CityInn Hotel Plus")}</td><td>Budget</td><td>1 min (exit 3)</td><td>From around NT$3,300</td></tr>
<tr><td>${hotel("papa-whale", "Hotel PaPa Whale")}</td><td>Budget</td><td>9&ndash;10 mins (exit 6)</td><td>From around NT$2,800</td></tr>
<tr><td>${hotel("artotel-ximending", "Art'otel Ximending")}</td><td>Budget</td><td>9 mins (exit 6)</td><td>From around NT$2,300 (windowless)</td></tr>
<tr><td>${hotel("oani", "Oani")}</td><td>Hostel</td><td>1 min (exit 3)</td><td>Bunks around NT$1,200, doubles around NT$6,000</td></tr>
<tr><td>${hotel("meander-taipei", "Meander Taipei")}</td><td>Hostel</td><td>7&ndash;9 mins (exit 6)</td><td>Bunks around NT$850&ndash;950, rooms from NT$3,000</td></tr>
<tr><td>${hotel("dan-hostel", "DAN Hostel")}</td><td>Hostel</td><td>2 mins (exit 1)</td><td>Beds around NT$400&ndash;700</td></tr>
</tbody></table></figure>

<p><em>Prices are for a Wednesday night in November 2026, two adults (one for dorm beds), checked in late September. Saturdays cost far more: Sotetsu went from about NT$6,900 to NT$11,300 on the same check, and Oani's bunks from NT$1,200 to NT$3,600. *Only Westgate's larger rooms were on sale for that date.</em></p>



<h2 id="Upscale">Upscale Hotels</h2>

<h3>${hotel("sotetsu-ximen", "Sotetsu Grand Fresa Taipei Ximen")}</h3>

<p>The newest big hotel in Ximending, opened by the Japanese Sotetsu group in February 2024 on the east side of Zhonghua Road, a minute from exit 3 and looking across at the pedestrian zone. Its selling point is space: every one of its 200 rooms is at least 30&nbsp;m², generous for this part of town, and children under 12 stay free using the existing beds. Standard rooms have showers; the two big family rooms add a bathtub. Two things to know: in January 2025 the hotel warned of daytime building noise from a construction site next door, affecting the rooms on that side, and one reviewer found that people could see into rooms on the lower floors. Ask for a high floor.</p>

<h3>${hotel("solaria-ximen", "Solaria Nishitetsu Hotel Taipei Ximen")}</h3>

<p>Another Japanese arrival (August 2023), in one of the tallest towers at the edge of the district, five minutes from exit 6 with its entrance on Hankou Street. The lobby is on the 6th floor and the 298 rooms stack above it, which is why reviewers keep describing it as quiet; ask for a north-facing room for the view over the Tamsui River. Rooms are Japanese-sized &ndash; the standard ones are 21&nbsp;m², some with a bath &ndash; and breakfast is only included on some rates.</p>

<h3>${hotel("westgate", "Westgate Hotel")}</h3>

<p>A smart hotel named in almost every Taiwanese round-up, two minutes from exit 6 on Zhonghua Road. It has a gym, a coin laundry and a restaurant on the ground floor, and families are well catered for: two room types sleep four, children under six stay free, and toys can be borrowed. Only the Premier Dual Queen and the Grand Suite have a bathtub, and the entry-level Cozy room has no window. It was the dearest hotel in this guide on our check date, though only its bigger rooms were left.</p>



<h2 id="Mid-Range">Mid-Range Hotels</h2>

<h3>${hotel("amba-ximending", "amba Taipei Ximending")}</h3>

<p>The Ximending hotel with the widest support across English and Chinese guides, and one Nick Kembel of Taiwan Obsessed counts among his favourites in the city. It fills the 5th to 10th floors above the Eslite store on Wuchang Street, the car-free cinema strip, six minutes from exit 6. Rooms run from 22&nbsp;m² to 60&nbsp;m², with the 41&nbsp;m² Loft room taking four adults, and up to two children aged 12 or under stay free without an extra bed. Guest laundry is free. Rooms have rain showers rather than baths.</p>

<h3>${hotel("just-sleep-ximending", "Just Sleep Ximending")}</h3>

<p>The hotel named in more Taiwanese round-ups than any other, run by the group behind the Regent Taipei. It occupies the 5th to 9th floors of a block on Zhonghua Road, above the Hello Kitty 7-Eleven, three to five minutes from exit 5. It's popular with families for the playroom on the 8th floor and the free snacks served from lunchtime until midnight; bloggers who stayed in 2022&ndash;2026 all found the laundry free too. Bathrooms are shower only, and breakfast comes with most rates.</p>

<h3>${hotel("roaders-zhonghua", "Roaders Hotel Zhonghua")}</h3>

<p>The Ximending sister of Roaders Plus at Taipei Main Station, on Yanping South Road at the northern edge of the district &ndash; about five minutes from exit 5, the last stretch at street level. Children are the focus: there's a playroom, a basketball game and arcade machines, family rooms can be set up with a teepee, and snacks and laundry are free. The cheapest Roaders Double and Traveller Single rooms have no window, and several Chinese-language reviewers say the walls are thin.</p>

<h3>${hotel("cho-hotel", "Cho Hotel")} and ${hotel("cho-hotel-3", "Cho Hotel 3")}</h3>

<p>Two hotels facing each other across Kunming Street, five or six minutes west of exit 1 &ndash; the original at No.&nbsp;119 and Cho Hotel 3 at No.&nbsp;142, next to the Ambassador Theatre. The original is the one with the extras: free snacks, drinks and ice cream, free laundry and a children's playroom on the 2nd floor. It also has quad rooms, and its Executive Double is the room with a bathtub. Cho Hotel 3 has somewhat bigger rooms, including a Deluxe Double with a window and a bath, but its laundry is coin-operated. At both, the Standard Double has no window; The Ordinary Katalog, which stayed in the original's, called it one of the smallest rooms they'd had. Reviews of the soundproofing are mixed. One child up to six stays free.</p>

<h3>${hotel("energy-inn", "Energy Inn")}</h3>

<p>A small hotel on a lane off Kangding Road, six minutes from exit 6. Breakfast is included and room types cover a wide spread: the cheapest is a windowless 12&nbsp;m² double, while the larger family room and the 35&nbsp;m² Energy Suite come with Japanese hinoki-wood tubs. Groups of up to five can book a bunk room of their own with a private bathroom &ndash; a useful halfway point between a hostel and a hotel. There are no singles.</p>



<h2 id="Budget">Budget Hotels</h2>

<h3>${hotel("cityinn-plus-ximending", "CityInn Hotel Plus Ximending")}</h3>

<p>Hard to beat for location at the price: the door is about 90&nbsp;m from exit 3, on Baoqing Road. There's a basement lounge with free coffee and tea, free laundry with detergent, and bloggers report free instant noodles late in the evening &ndash; but no breakfast. Standard, twin and triple rooms are all windowless; for daylight you need the Family room or the Deluxe Street View room, both of which also have a bath. Unlike the CityInn branches at Taipei Main Station, where some booking sites say children aren't accepted, this one takes children, and under-fives stay free.</p>

<h3>${hotel("papa-whale", "Hotel PaPa Whale")}</h3>

<p>An industrial-styled hotel on Kunming Street, nine or ten minutes north-west of exit 6 and also within walking distance of Beimen station. It's big &ndash; 335 rooms across a basement and three upper floors &ndash; and cheap, but the rooms are windowless; reviewers describe backlit panels standing in for windows upstairs and none at all in the basement. Family rooms sleep up to six, and the hotpot breakfast at the attached restaurant only comes with breakfast rates. <a href="/driftwood">Driftwood</a>, the Taihu craft beer bar on the ground floor, is still pouring.</p>

<h3>${hotel("artotel-ximending", "Art'otel Ximending")}</h3>

<p>A 29-room hotel on the 4th floor of an older building on Wuchang Street, beside Taipei Cinema Park, nine minutes from exit 6. It had the cheapest private room in this guide on our check date, and the laundry is free. The catch is size and light: the entry-level doubles are around 15&nbsp;m² with no window, so pay more for one of the view rooms. Four-person rooms have a bunk bed. Showers only.</p>



<h2 id="Hostels">Hostels</h2>

<h3>${hotel("meander-taipei", "Meander Taipei")}</h3>

<p>The hostel English-language guides mention most for Ximending, named by ten separate publishers. It's on Chengdu Road, seven to nine minutes west of exit 6, with a kitchen, a rooftop terrace and a busy calendar of tours and events. Dorms have four, six or eight beds with privacy curtains, and there are female-only dorms. The private rooms range from 10&nbsp;m² doubles to quads; note that the Standard Twin and the ensuite Triple have no window. Sources disagree on reception hours, so tell the hostel in advance if you'll arrive after 11pm.</p>

<h3>${hotel("oani", "Oani")}</h3>

<p>The newest hostel in the area, opened in December 2025 by the Meander group in a former securities office a minute from exit 3. It's a step up from a standard hostel &ndash; curtained bunks, a floor reserved for women with its own showers, free ice lollies in the afternoon and Taiwan Beer in the evening &ndash; and priced like it, especially at weekends, when our Saturday check showed bunks at three times the weekday rate. There are private doubles, twins and family rooms too. Children must be four or older.</p>

<h3>${hotel("dan-hostel", "DAN Hostel")}</h3>

<p>A small dorms-only hostel on Hanzhong Street, two minutes from exit 1 and a short stroll from the Red House bars and the <a href="/ximen-outdoor-drinking">outdoor drinking spots</a> around them. Rooms have two to eight beds, with a women-only floor. It was the cheapest bed in this guide midweek, though prices rise steeply on Saturdays. Reception closes at 10pm, so plan a late arrival in advance, and it reportedly takes adults only.</p>



<h2 id="Getting-Around">Getting Around from Ximen</h2>

<ul>
<li><strong>To and from the airport:</strong> the easiest route with bags is the Green line one stop north to Beimen, which connects underground to the Airport MRT's Taipei terminal (A1). Changing at Taipei Main Station instead means a 10&ndash;15 minute walk between the Blue line and the airport train. Express trains take 35 minutes to Terminal 1 and 39 to Terminal 2, for NT$160 &ndash; see our <a href="/taoyuan-airport-mrt">Airport MRT guide</a>. The Airbus 1961 coach also stops at Ximen station, but it's slower and less frequent.</li>
<li><strong>Taipei Main Station:</strong> one stop east on the Blue line, about two minutes, NT$20.</li>
<li><strong>Taipei 101:</strong> Green line two stops to Chiang Kai-shek Memorial Hall, then the Red line four stops to Taipei 101/World Trade Center. Allow 15&ndash;20 minutes; the fare is NT$25.</li>
<li><strong>Longshan Temple:</strong> one stop west on the Blue line, or a 15&ndash;20 minute walk through Wanhua.</li>
<li><strong>By bike:</strong> there are YouBike docks by exits 2, 3 and 5. Metro lockers are near exits 2 and 5 if you need to leave bags after checking out.</li>
</ul>

<p>New to the system? Our <a href="/mrt">Taipei Metro guide</a> covers tickets and the <a href="/taiwan-easycard">EasyCard</a>.</p>

<blockquote class="wp-block-quote"><p>Weighing Ximending against the rest of the city? See <a href="/best-areas-and-hotels-to-stay">where to stay in Taipei</a>, or the guide to <a href="/hotels-near-taipei-main-station">hotels near Taipei Main Station</a> if being next to the airport train matters more.</p></blockquote>
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

const title = "Hotels Near Ximending (2026): Best Picks by Budget";
if (title.length > 60) fail(`title is ${title.length} chars`);

posts.push({
  id: Math.max(...posts.map((p) => p.id || 0)) + 1,
  authorId: 2,
  date: TODAY,
  modified: TODAY,
  slug: SLUG,
  title,
  excerpt:
    "Fifteen hotels and hostels within ten minutes' walk of Ximen MRT, with November prices, which exit to use, and which rooms have no window.",
  type: "post",
  parentId: 0,
  content: CONTENT,
  categories: [{ name: "Areas", slug: "areas" }],
  tags: [{ name: "Lists", slug: "lists" }],
  featuredImage: "/media/2019/05/Ximen-4-1024x768.jpg",
});

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2) + "\n");

console.log(`Added /${SLUG} to ${filePath}`);
console.log(`  title: ${title} (${title.length})`);
console.log(`  ${CONTENT.length} chars, ${Object.keys(KLOOK).length} hotels linked on Klook`);
