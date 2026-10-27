# Existing posts: improvement plan (October 2026)

Research only. No content or code was changed.

## Data used

- **Fresh GA4 + Search Console pull, 27 Sep – 24 Oct 2026** (compared with 30 Aug – 26 Sep). Run with the unchanged `scripts/pull-analytics.mjs` from a scratch folder, so the repo's `data/analytics/latest.json` (28 Sep pull) was not overwritten.
- **Extra read-only Search Console queries** (web search type, `\bnear\s?(?:me|by)\b` rows removed: 1,246 page/query rows):
  - page × query for both windows
  - the same window last year (28 Sep – 25 Oct 2025)
  - weekly trends for the main pages
  - a before/after split around the 17 Oct title rewrites
  - These used the same credential path as the pull script. Output is in the session scratchpad, not the repo.
- **Content** from `content/posts.json`: titles, excerpts, H2s, FAQ questions, word counts, in-content links between posts, Klook links and widgets, and year mentions.
- **Research files**: `data/research/*-refresh.md`, `wanhua-heritage-walk.md`, `dadaocheng-dihua-street-walk.md` and `xinbeitou-hot-springs-walk.md`. Each error was re-checked against the current posts.json.

### Caveats

- **GA4 only starts on 3 Aug 2026**, so the year-on-year comparison uses Search Console only.
- **Many titles were rewritten on 17 Oct** (`TITLE-REWRITES.md`, commit a179151), including the MRT, THSR, zoo, Fuhang, laundrettes, Maji, Jin Feng and Ay Chung pages. They have only 8 days of data. For those pages I only recommend a title change where the query data is clear-cut.
- **Several pages are new or were rewritten recently**, so they are judged on early signals only:
  - the hotel guides (29 Sep onwards)
  - the walks (27 Oct)
  - SIM cards (27 Sep)
  - where-to-stay (27 Sep)
  - the Quick Verdict and hotel-button affiliate changes (27 Oct)
- **Inbound link counts** are in-content links from other posts. The header menus and footer are not counted.
- **Titles render as `<title> | Taipei Travel Geek`.** The 60-character limit below applies to the post title itself.

### Site-level context

- **Search clicks are down 57% year on year:** 6,108 in the same 28 days of 2025, against 2,645 now. Impressions fell from 764k to 257k.
  - The drop came in **January 2026**: monthly clicks went from about 6,300 to about 2,600, then fell to about 1,900–2,000 a month in May and June.
  - They have recovered to about 640 a week since August.
  - So the YoY losses below are a long-running change, not something the September and October edits caused.
- **The previous window was inflated by a short spike.** On /mrt and /taiwan-easycard, clicks spiked in the weeks of 31 Aug and 7 Sep, when the Xinyi Line East Extension opened on 30 Aug 2026. Some of the "decline" against that window is the spike ending.

---

## 1. Top 20 actions

Ordered by expected impact × confidence. Position is the impressions-weighted Search Console average for the page. "YoY" is the same 28 days in 2025.

| # | Page | The numbers | Problem | Fix | Expected impact |
|---|---|---|---|---|---|
| 1 | /taipei-101-fireworks-new-years-eve/ | 6,033 imp, pos 6.4, 3.56% CTR, 215 clicks (up from 100); 447 views. Last year 27 Oct – 4 Jan: about 1,070 clicks, with 456 in the final week alone | Peak season starts now.<br>"taipei 101 fireworks" gets 178 imp at pos 6.2 with a 0.6% CTR. The title leads with "The Best Spots", not the head term.<br>The page says the Sun Yat-sen hall reopens "in the last quarter of 2026"<br>"taipei 101 fireworks schedule" gets 42 imp at pos 7.1 | Title → **Taipei 101 Fireworks 2026/27: Best Places to Watch on NYE** (57).<br>Add an H2 "What Time Do the Fireworks Start? (Schedule)" near the top.<br>Fix the Sun Yat-sen sentence (see section 3).<br>Add links in from /chiang-kai-shek-memorial-hall, /best-time-to-visit-taipei, /xinyi-shopping-district and /taipei-guide (section 4) | Moving from 6.4 to 4–5 through December is worth roughly +200–400 clicks over the season, and feeds the NYE view-hotels guide (53 of 137 affiliate clicks) |
| 2 | /mrt/ | 16,838 imp, pos 4.9 (was 2.7), 0.55% CTR; 92 clicks (was 383, YoY 567); 530 views, 28.8 s engaged, 34% engagement rate | The map queries show position 1–2 with almost no clicks: "mrt map taipei" 2,302 imp at pos 1.9, 2 clicks; "mrt taipei" 820 at pos 2.3, 1 click. That pattern is typical of an image-pack placement rather than the blue link. Those impressions fell from 3,937 a week to 160–611 while the position stayed at 1.1–2.4.<br>"taipei mrt map" fell from 3,517 imp at pos 1.1 with 221 clicks to 465 imp at pos 4.<br>Weekly position: 2.2 before August, 4.0–4.5 in October, 6.2 in the week of 19 Oct.<br>Image-search impressions landing on /mrt fell from about 5,700 to 2,470 a week.<br>On the page, the map sits below a generic intro, the Quick Verdict and a Taipei Main Station photo | Move the **map to directly under the H1**, with a one-line caption: "The 2026 Taipei MRT map in English, including the Xinyi extension to Guangci/Fengtian Temple".<br>Add a short H2 "What's New on the MRT in 2026" covering the Xinyi extension, Sanying line and Ankeng LRT, aimed at "taipei mrt map 2026" (148 imp at pos 4.9).<br>Optional title → **Taipei MRT Map 2026 (English): Lines, Fares & Hours** (51). Wait until mid-November, since it changed on 17 Oct.<br>Keep the image filename: the commit says image search relies on it | Getting back to pos 2–3 on "taipei mrt" and "taipei metro" (891 imp combined) is worth about +40–80 clicks per 4 weeks. The map-pack clicks are largely out of the page's control |
| 3 | /taiwan-high-speed-rail-hsr-discounts-klook/ | 6,204 imp, pos 12.4 (YoY 5.8), 0.18% CTR; 11 clicks (YoY 194); 129 views; 3 affiliate clicks | The two biggest queries are about the timetable, and the page has no timetable section: "taiwan hsr schedule" 406 imp at pos 6.5, 0 clicks; "taiwan high speed rail schedule" 231 at pos 9.1; "jadwal kereta thsr taiwan" 251 at pos 2.6; "bullet train taiwan schedule" 36.<br>Head term "taiwan high speed rail" is at pos 30.5 | Add H2s **"THSR Timetable: First & Last Trains and How Often"** and "Journey Times from Taipei" (a table by station).<br>Title → **Taiwan High Speed Rail: Timetable, Prices & Klook Deals** (55)<br>Link to it from /taoyuan-airport-mrt and /mrt, which mention the HSR without linking | The most valuable fix on the list per click: Klook THSR passes are higher-value than MRT tickets. Pos 6.5 → 4 on the schedule queries is worth about +30–60 clicks per 4 weeks, plus recovery on the head term |
| 4 | /taoyuan-airport-mrt/ | 27,312 imp, pos 6.4, 0.91% CTR, 248 clicks (YoY 653); 817 views, the site's top page | Weakest meta description of any top page: "Using the Taoyuan Airport MRT (also known as the Airport Express) to travel to and from Taoyuan airport". It has no price or times.<br>"taoyuan airport mrt ticket" gets 187 imp at pos 15.1; "taoyuan airport to taipei main station" 116 at pos 10.4.<br>Only 5 H2s and no FAQ | New description (section 2).<br>Add H2s **"Tickets: Contactless, EasyCard, Tokens or Klook"** and **"Operating Hours: First and Last Trains"**. The content already exists in the body (NT$160, 35–39 min, last commuter train about 23:35).<br>Add a FAQ: it is a main guide | CTR from 0.9% to 1.3% is worth **+100–110 clicks per 4 weeks** on the biggest page, which carries the new Klook private-transfer link |
| 5 | /ximending/ | 19,478 imp, pos 9.4, 0.60% CTR, 116 clicks; 291 views; 0 Klook links | Google started testing the page for the head term this month: "ximending" went from 3 to 5,127 imp, at pos 10.5 with 14 clicks.<br>"ximending walking district" gets 1,097 imp at pos 9, but the phrase is not on the page ("pedestrian" is used instead).<br>"ximen" 521 at pos 9.2; "xi men ding" 271 at pos 11.3, 0 clicks | Title → **Ximending Walking District: 30 Best Things to Do** (48).<br>Use "Ximending Walking District" and "Ximen" in the intro and an H2.<br>Add a small district map with the Ximen exits.<br>Keep the existing FAQ | Moving from pos 10 to 6–7 on "ximending" alone is about +80–150 clicks per 4 weeks |
| 6 | /taiwan-tourist-tax-refund/ | 7,969 imp, pos 6.1, 1.22% CTR, 97 clicks (YoY 709, with impressions 24,344 → 7,969 at a similar position); 280 views; 983 words | The queries ask "how much": "taiwan tax refund rate" 122 at pos 6.6; "how much is tax refund in taiwan" 92 at pos 6.4 (+36 and +31 on variants). The page has no section that answers it.<br>The intro and description say "full VAT rebate of 5%", while the page's own Useful Information says a 20% handling fee leaves about 4%.<br>"taiwan tax refund" 194 at pos 15.5.<br>No FAQ | Add H2 **"How Much Will You Get Back?"** with a worked example and the fee, near the top.<br>Add a FAQ.<br>Fix the 5% claim (section 3).<br>Title → **Taiwan Tax Refund for Tourists (2026): Rate & How to Claim** (58) | The YoY loss is likely AI Overviews answering the rate. A direct answer is what gets cited. Expect about +30–60 clicks per 4 weeks. Add links from the 8 high-traffic pages that mention tax refunds (section 4) |
| 7 | /taipei-zoo/ | 7,304 imp, pos 8.4, 0.53% CTR; 39 clicks (was 68); 151 views (was 237, -36%) | "taipei zoo" gets 2,985 imp at pos 10.1 with 2 clicks (up from 516 imp).<br>"taipei zoo map" 511 at pos 2.1, 4 clicks; "…map english" 47; "…map 2026" 31. The only map on the page is a "Click to enlarge" image inside Planning Your Route.<br>"taipei zoo entrance fee" 139 at pos 9.2, but the phrase is not used | Add H2 **"Taipei Zoo Map (English)"** with the map and the zone order.<br>Rename "Tickets & Opening Hours" to "Tickets, Entrance Fee & Opening Hours".<br>Leave the 17 Oct title alone.<br>Move the zoo ticket widget (8 clicks, 7 bookings earlier) up to the tickets H2 | Head-term entry at pos 10 is fragile. Better map coverage should hold or lift it: +20–40 clicks per 4 weeks, on a page whose affiliate link actually converts |
| 8 | /sun-yat-sen-memorial-hall/ | 1,596 imp, pos 8.6 (was 11.9); 66 views; **10.4 s engaged per session**, the lowest of the top 40 pages | The title says "Closed Until Late 2026". Research shows it will not reopen before 2027 (director's target is Q3 2027).<br>The same claim appears on 5 more pages | Title → **Sun Yat-Sen Memorial Hall: Closed Into 2027, What's Open** (56).<br>New description (section 2).<br>Fix every mention (section 3) | Accuracy first. It will also stop the title looking stale in January |
| 9 | /taipei-101/ | 2,340 imp, pos 9.0 (YoY 6.7); 11 clicks (YoY 149); 76 views | "taipei 101 observatory" 116 imp at pos 37.7; "taipei 101 tickets" 56 at pos 33.8.<br>Stale facts: tickets are said to be sold "at the counter on the 5th floor" and the standard ticket is said to cover "floors 88–91". The ticket desk has been on Office Tower 1F since 1 Jul 2026, and the general ticket covers 88F–89F | Fix the facts (section 3).<br>Add H2 "Where to Buy Tickets (Office Tower 1F)".<br>Shorten the 182-character description | Fixes a factual error on a money page (Klook widgets 658097 and 625152). Recovering positions on the ticket queries is the long-term prize |
| 10 | /taiwan-sim-cards/ | 3,195 imp, pos 14.3 (prev 11.5, YoY 7.1); 63 clicks (YoY 245); 305 views, 71 s engaged; **13 affiliate clicks (3rd on the site)** | Since the 27 Sep rewrite, the weekly position has gone 10.8 → 14.5 → 14.8 → **19.5**.<br>"taiwan sim card" 85 imp at pos 39.7 (was 23.7); "sim card taiwan" at pos 49 | **Early signal, but the trend is down.** Don't rewrite again yet.<br>Title → **Taiwan SIM Card & eSIM for Tourists: 2026 Prices** (48), so the head term leads.<br>If it is still below pos 15 by mid-November, diff the H1, H2s and intro against the pre-rewrite version (`git show d4a97b4^:content/posts.json`) | Protects the third-best affiliate page |
| 11 | /yongkang-street/ | 4,255 imp, pos 8.3 (YoY 6.9); 44 clicks (YoY 235) | The title is 65 characters, over the limit.<br>"yongkang street taipei" fell from pos 7.6 to 10.1; "yongkang shopping district" 273 imp at pos 9.2; "yong kang shopping district" 103 | Title → **Yongkang Street, Taipei: 25 Things to Eat, Do & Shop** (52).<br>Use "Yongkang shopping district" once in the intro | +15–30 clicks per 4 weeks |
| 12 | /tamsui/ | 5,021 imp (+62%), pos 9.7 (YoY 6.4), 0.48% CTR; 70 views; 0 Klook links | The title is 61 characters.<br>"tamsui" 2,433 imp at pos 10.9.<br>"tamsui fisherman's wharf" 161 at pos 10.9.<br>The page has no "getting there" section: "tamsui from taipei" 42 and "taipei to tamsui" 34 | Title → **Tamsui, Taipei: 20 Best Things to Do & the Best Sunset** (54).<br>Add H2 **"Getting to Tamsui from Taipei"** (MRT red line, fare and time from Taipei Main).<br>Add a FAQ (an area guide).<br>Consider a Tamsui river cruise or a north coast day tour link | +20–50 clicks per 4 weeks |
| 13 | /best-cinemas-in-taipei/ | 1,688 imp, pos 10.9 (was 8.6); 10 clicks (was 42, YoY 118); 82 views, 19.9 s engaged | Top query: "cinema taipei english" 36 at pos 10.8; "english cinema taipei" 13.<br>The page says "English" once.<br>The description is generic | Add a body section **"Are Films Shown in English?"**. No FAQ: it is a listicle.<br>Title → **Best Cinemas in Taipei: English Films, IMAX & Showtimes** (55).<br>New description | Recover the 4-week loss: +20–30 clicks |
| 14 | /din-tai-fung/ | 8,837 imp, pos 7.2, 1.03% CTR; 230 views; **0 affiliate clicks** | "din tai fung taipei 101" 555 imp at pos 7.7, 0.2% CTR; "din tai fung 101" 137; "…101 reservation" 92 + 50.<br>The Taipei 101 observatory widget sits at about 19,000 px | Add H2 **"Din Tai Fung Taipei 101: Queue, Reservations & Floor"** high on the page.<br>Move the Taipei 101 ticket widget into it.<br>Description → mention Taipei 101 | +20–40 clicks and the first affiliate clicks on a 230-view page |
| 15 | /taipei-youbike/ | 3,085 imp, pos 5.8, 0.97% CTR; 90 views | Generic, WordPress-era metadata: the title "Full Guide for Hiring and Riding a YouBike" has no "Taipei", and the 89-character description has no prices.<br>"youbike map" 84 imp at pos 3.7, 0 clicks; "ubike map" 55 at pos 4.9 | Metadata in section 2.<br>Add H2 "YouBike Station Map" (link the official live map) | CTR 1% → 2% is +30 clicks per 4 weeks |
| 16 | /taiwan-visa-entry-requirements/ | 1,209 imp, pos 15.5 (was 23); 171 views, 47 s engaged; 4 inbound links | "visa exempt include tac meaning" 108 imp at pos 6.7, 0 clicks; "visa-exempt(include tac)" 24 + 14.<br>The page names the option once but never explains it.<br>Head terms are at pos 60–69 | Add H3/FAQ **"What does 'Visa-Exempt (include TAC)' mean?"** (TAC = Travel Authorization Certificate; confirm the wording on the NIA site).<br>Link from /taoyuan-airport-mrt, /taiwan-easycard, /taiwan-sim-cards and /taipei-money-guide (they mention visas without linking).<br>Travel-insurance fit (SafetyWing, per affiliate-improvements.md) | Small click gain. The links matter more, to lift the page from pos 15 |
| 17 | /best-districts-and-areas/ | 3,473 imp, pos 6.4, **2.04% CTR**; 71 clicks (was 112, YoY 521); 230 views; **5 inbound links** | The CTR is healthy; the problem is reach.<br>The page is the gateway to 7 hotel guides, but /mrt, /ximending, /taiwan-sim-cards, the fireworks page and others mention districts without linking | Internal links (section 4).<br>Leave the title (changed 14 Sep) | Feeds the hotel guides, the main revenue source |
| 18 | /yong-he-soy-milk-king/ | 3,494 imp, pos 7.6; 74 views; **422 words** | The title says "24-Hour Breakfast". Research says it now opens about 05:00–14:00 and closes on Mondays.<br>"yong he soy milk menu" 137 imp at pos 4.3, 0 clicks; "…reviews" 69; "…daan" 45 | Fix the hours (section 3).<br>Title → **Yong He Soy Milk King: Menu, Prices & Opening Hours** (51).<br>Add a menu-with-prices section and the address/MRT. No FAQ: it is a venue review | The factual fix comes first, then +10–20 clicks |
| 19 | /taipei-laundrettes/ | 3,623 imp, pos 7.2; **1 inbound link**; no H2s | The 17 Oct retitle is working: CTR went from 0.37% to 0.83%.<br>"laundry service taipei" 30 + 34 for "taipei laundry service"; "how to use washing machine in taiwan" 13 at pos 4.8 | Add H2s ("How to Use a Taipei Laundromat", "Prices", "24-Hour Laundromats", "Laundry Services That Wash for You").<br>Link from the 7 hotel and hostel guides that mention laundry (section 4) | +15–25 clicks. A useful page for long-stay readers of the apartment guide |
| 20 | /maps/ | 920 imp, pos 10 (was 6.2); 5 clicks (was 17); **0 in-content links** | Weekly position swings between 5 and 37.<br>"taipei map" fell from 1,503 imp at pos 4.9 to 457 at pos 10.6 | Link /maps from /mrt, /best-districts-and-areas, /taipei-guide, /ximending and /din-tai-fung, wherever "map" appears in a sentence.<br>Add a short text intro naming the layers | Stabilises the page. Low cost |

**Not worth the effort:**
- **/texas-roadhouse/**: "texas roadhouse" brings 2,197 imp and 0 clicks from US brand searches. They cannot be won.
- **/taiwan-lucky-land-giveaway/**: the campaign is over, and CTR fell honestly with "(Campaign Ended)" in the title. Leave both.
- **/tap-bistro-zhangmen/** (closed, 1,333 imp, 23 clicks): leave it. Optionally add a link to a rooftop-bars page.

### Early signals on new or rewritten pages (judge again in December)

| Page | Signal |
|---|---|
| /taipei-101-view-hotels-new-years-eve/ | Best affiliate page: 53 clicks from 107 views. Pos 6.4, 3.19% CTR. Only 5 inbound links. It needs links from /taipei-annual-events, /best-time-to-visit-taipei and /chiang-kai-shek-memorial-hall (section 4) |
| /aparthotels-serviced-apartments-taipei/ | Pos 9.1, 3.58% CTR, 14 affiliate clicks. Healthy |
| /hotels-near-taoyuan-airport/ | 1,178 imp in its first 4 weeks at pos 19.3. The head queries ("hotels near taipei airport", "hotel near taoyuan airport") are at pos 36–40. 11 affiliate clicks |
| /beitou-hot-spring-hotels/, /taipei-hotels-with-pools/, /hotels-near-taipei-101/, /hotels-near-taipei-main-station/, /hotels-near-ximending/ | Pos 16–35. Normal for 4-week-old commercial pages. /hotels-near-ximending/ has only 20.6 s engaged per session; check the top of that page on mobile |
| /best-areas-and-hotels-to-stay/ | Pos 42.9, 64 imp. Too early |
| Walks | No search data yet. /xinbeitou-hot-springs-walk/, /gongguan-walking-route/ and /songshan-xinyi-walking-tour/ have only 3 inbound links each (section 4) |
| 17 Oct retitles (8 days) | Better so far: laundrettes (0.37% → 0.83%), Fuhang (0.76% → 1.01%), cheap coffee, cafes to work. Worse or flat: zoo (pos 7.7 → 9.2, which coincides with head-term testing), Ay Chung, Thai Elephant, supermarkets. **Recheck all of them in the week of 16 Nov before changing anything** |

---

## 2. Quick metadata fixes

All titles are 60 characters or fewer, before " | Taipei Travel Geek". Descriptions are 120–160 characters and use facts already on the page, unless section 3 changes them.

| Page | New title | New meta description (excerpt) | Why |
|---|---|---|---|
| /taipei-101-fireworks-new-years-eve/ | Taipei 101 Fireworks 2026/27: Best Places to Watch on NYE | Where to watch the Taipei 101 New Year's Eve fireworks in 2026/27: free viewpoints, rooftop bars, hotel rooms with a view, start time and getting home after. | Leads with "taipei 101 fireworks" (178 imp, 0.6% CTR) |
| /taoyuan-airport-mrt/ | *(keep)* Taoyuan Airport MRT: Times, Prices and Tips (2026) | Taoyuan Airport MRT to Taipei Main: NT$160 and 35–39 minutes on the express. Tap a contactless card or phone at the gate. Last trains, tickets, in-town check-in. | The current description has no facts; 27k imp at 0.9% CTR |
| /taiwan-high-speed-rail-hsr-discounts-klook/ | Taiwan High Speed Rail: Timetable, Prices & Klook Deals | Taiwan High Speed Rail timetable, first and last trains and journey times from Taipei, plus fares and how to pay less with early-bird and Klook visitor deals. | Schedule queries: 406 + 231 + 251 imp. Add the timetable section first |
| /ximending/ | Ximending Walking District: 30 Best Things to Do | *(keep current)* | "ximending walking district" gets 1,097 imp |
| /taiwan-tourist-tax-refund/ | Taiwan Tax Refund for Tourists (2026): Rate & How to Claim | Spend NT$2,000 in one store in a day and you can claim Taiwan's 5% VAT back, about 4% after the handling fee. How to claim in store, in town or at the airport. | Rate queries, and the 5% vs 4% contradiction (section 3) |
| /sun-yat-sen-memorial-hall/ | Sun Yat-Sen Memorial Hall: Closed Into 2027, What's Open | The main hall is closed for renovation into 2027, so the guard ceremony and galleries are off, but the park, Emerald Pond and Taipei 101 views are free. | Out of date, and the current description is 222 characters |
| /taiwan-sim-cards/ | Taiwan SIM Card & eSIM for Tourists: 2026 Prices | *(keep current)* | Puts the head term first while the page is sliding |
| /yongkang-street/ | Yongkang Street, Taipei: 25 Things to Eat, Do & Shop | The 25 best things on Yongkang Street, Taipei's best food and shopping street: the original Din Tai Fung, beef noodles, mango shaved ice and gift shops. | The title is 65 characters; the description is 177 |
| /tamsui/ | Tamsui, Taipei: 20 Best Things to Do & the Best Sunset | *(keep current)* | 61 → 54 characters |
| /best-cinemas-in-taipei/ | Best Cinemas in Taipei: English Films, IMAX & Showtimes | The best cinemas in Taipei for English-language films, from IMAX multiplexes to art-house screens and private MTV rooms, with links to each one's showtimes. | "cinema taipei english" is the top query |
| /din-tai-fung/ | *(keep)* | Din Tai Fung takes no reservations. Queue times for all nine Taipei branches, including Taipei 101, what to order, and how to skip the wait. | "din tai fung taipei 101" gets 555 imp at a 0.2% CTR |
| /taipei-youbike/ | YouBike Taipei 2026: How to Rent, Prices & Station Map | How to rent a YouBike in Taipei without a local number: single rental in the app, the free first 30 minutes, e-bike prices, the insurance rule and station maps. | Generic title and 89-character description; pos 5.8, under 1% CTR |
| /yong-he-soy-milk-king/ | Yong He Soy Milk King: Menu, Prices & Opening Hours | A classic Taipei breakfast, known for its fried dough sticks and soy milk. What to order, what it costs, the current opening hours and how to get there. | The "24-Hour" claim is out of date (section 3) |
| /taipei-101/ | *(keep)* | Taipei 101 observatory tickets from NT$600, opening hours, the ticket desk's new spot (Office Tower 1F), the best time to go and the free Elephant Mountain view. | Fixes the stale fact; current description is 182 characters |
| /taiwan-railway/ | Taiwan Railway (TRA): Puyuma, Tze-Chiang & Tickets | *(keep current)* | "puyuma express" gets 102 imp at pos 5.5, 0 clicks |
| /best-shopping-malls-in-taipei/ | 7 Best Shopping Malls in Taipei, Including the Biggest | *(keep)* + add one line on the page naming the biggest mall | "biggest mall in taipei" gets 180 imp at pos 8.6; the page never says "biggest" or "largest" |
| /where-to-go-when-raining/ | *(keep)* | What to do in Taipei on a rainy day: museums, cinemas, cultural parks, VR, hot springs in Xinbeitou, massages, metro malls, live music and the restaurant bus. | The current description is the title repeated (46 characters) |
| /taipei-technology-district/ | Taipei Tech District: Syntrend & Guanghua Digital Plaza | *(shorten current to ≤160)* | 75-character title |
| /best-bubble-tea-in-taipei/ | Best Bubble Tea in Taipei: The Original & Local Favourites | *(trim current to ≤160)* | 77-character title |
| /michelin-bib-gourmand-taiwanese-small-eats-taipei/ | Michelin Bib Gourmand Taiwanese Snacks in Taipei | *(rewrite once checked against the 2026 list)* | 72-character title. Lan Chia is no longer on the list (section 3) |
| /taipei-convenience-stores/ | *(keep)* | Shorten to ≤160: "What 7-Eleven, FamilyMart and Taipei's other convenience stores sell beyond snacks, how the kiosk machines work, and nine themed branches worth the detour." | 181 characters |
| /maokong-gondola/ | *(keep)* | Shorten to ≤160: "Maokong Gondola fares, hours and the Monday and maintenance closures, how to skip the Crystal Cabin queue, Zhinan Temple and where to walk in Maokong." | 195 characters; "maokong gondola price" gets 228 imp at pos 7.2 |

---

## 3. Factual fixes

Each fix below was checked against the current `content/posts.json` on 27 Oct 2026 and is **still present** unless marked. Sources are in the named research file.

### From the Zhongzheng walk research (`zhongzheng-walking-route-refresh.md`)

| Page | Wrong now | Correct |
|---|---|---|
| /jin-feng-braised-pork-rice/ | "Long opening times (08:00 to 01:00) every day" | Recent listings: **Tue–Sat 11:00–01:00, Sun 11:00–23:00, closed Mondays**. Sources conflict (some say no closing day), so hedge with "check before you go" |
| /peace-park/ | "Taipei 228 Memorial Hall NT$20 / Free for those under 12 or over 65" | **Free for everyone.** The fee standard was repealed on 11 Sep 2024. Tue–Sun 10:00–17:00, closed Mondays |
| /presidential-office-building/ | Intro: "partially open to the public on weekend mornings" | **Weekday mornings, Mon–Fri 09:00–12:00, last entry 11:30** (the page's own Opening Hours section already says weekdays). Only the ground-floor exhibitions and corridors are open on weekdays |
| /presidential-office-building/ and /taipei-guest-house/ | "open on the same (weekend) dates" | The full-opening Saturdays **only partly overlap**: both on 7 Nov and 5 Dec 2026, but the Presidential Office opened 17 Oct and the Guest House 24 Oct (cancelled for a typhoon) |
| /taipei-guest-house/ | The "Opening Hours" heading is empty | **Selected Saturdays, 09:00–16:00, last entry 15:30.** Remaining 2026 dates: 7 Nov and 5 Dec. The 2027 dates are not out yet. Free, no booking |
| /national-taiwan-museum/ | Hours omit the ticket cut-off; over-65 concession wrong | Ticket sales stop at **16:30**. Over-65s are **free on weekdays and half price at weekends**. The Land Bank building is now the **Paleontology Hall (古生物館)** |

### From the Gongguan walk research (`gongguan-walking-route-refresh.md`)

| Page | Wrong now | Correct |
|---|---|---|
| /treasure-hill/ | "Opening Hours 11:00 – 21:00, Closed on Mondays" | **Outdoors Tue–Sun 11:00–22:00; indoors Tue–Sun 11:00–18:00; closed Mondays** |
| /see-the-drinking-water-museum-at-taipei-water-park/ | "09:00 - 18:00" all year; "Gongguan (green line - exit 1)"; "Road Castle" | **Sep–Jun 09:00–17:00 (last entry 16:00); Jul–Aug 09:00–18:00 (last 17:00).** Closed Mondays, but open when a Monday falls in a long weekend. **Gongguan exit 4** for the museum entrance. The old water play park is closed; the summer area is now 親水樂園 |
| /yong-he-soy-milk-king/ (and its title) | "open 24 hours a day, 6.5 days a week" | **Now reported as about 05:00–14:00, closed Mondays** (June 2026 report; older listings conflict, so hedge). Change the title (section 2) |
| /lan-jia-traditional-taiwanese-snack/ | "found a place on the Bib Gourmand Selection" | **Given a Bib Gourmand in 2019; not on the 2026 Taipei Bib Gourmand list** |
| /michelin-food-stands-at-night-markets/ #Gongguan | Lan Chia Guabao labelled "Bib Gourmand" | Remove the label, or say "Bib Gourmand 2019". Hsiung Chi Scallion Pancake is on the 2026 list |
| /national-taiwan-university/ | 115 ha | Visitor centre figure: **110 ha** |
| /the-diner/ | One inline.app booking link | **Returns 404.** Replace or remove it |

### From the Datong walk research (`datong-walking-route-refresh.md`)

| Page | Wrong now | Correct |
|---|---|---|
| /taipei-story-house/ | "Opening Hours 10:00 - 17:30, Closed on Mondays and during national holidays"; old name | Run by ACME since 2021 as **MAISON ACME 圓山別邸**. Two recent sources give **11:00–17:00, closed Mondays, free** (unconfirmed officially, so tell readers to check) |
| /dalongdong-baoan-temple-and-gardens/ | "Tuesday to Saturday 09:00 - 21:00, Sunday 09:00 - 17:00, Closed on Mondays" | **Open daily 06:00–21:00, including Mondays** (travel.taipei). Free. About 15 min from Yuanshan exit 2 |
| /maji-square/ | "plus some nice craft shops"; deli and supermarket; bar list | The operator has **dropped retail**: it is now restaurants and bistros only. **Open daily 11:00–21:00**; bars run past midnight at weekends. Recheck the named bars (The Three Lions Inn, Blue Rooster…) against the current tenant list |
| /xinsheng-park/ | "over 700 varieties" | **Over 800 varieties** (2026 Rose Festival press) |
| /lin-an-tai-ancestral-house/ | "Closed on Mondays and during national holidays" | **Closed Mondays, Lunar New Year, Tomb Sweeping Day, Dragon Boat and Mid-Autumn**, not all national holidays. Tue–Sun 09:00–17:00, last entry 16:45, to 18:00 in July–August |
| /confucius-temple/ | "try your hand at archery, or try the 4D theatre which shows two films in rotation…" | **Neither could be confirmed.** The theatre hours found are rental hours. Drop archery; say "ask at the visitor centre about film screenings". Add the verified facts: **Tue–Sun 08:30–21:00 including public holidays, closed Mondays, free; free guided tours at 10:30, 14:30 and 15:30** |
| /expo-farmers-market/ | Outbound link `http://taipeimarket.ehosting.com.tw/news.php?year=` | **Dead.** It did not resolve on 27 Oct 2026, and nor does the official expofarmersmarket.gov.taipei. Remove the link, or point it to the travel.taipei listing. Sat–Sun 10:00–18:00 is still right |

### From the Songshan–Xinyi walk research (`songshan-xinyi-walking-tour-refresh.md`)

**Sun Yat-sen Memorial Hall will not reopen in late 2026.**
- The hall's director gave **Q3 2027** for completion. The official site gives no date.
- Say **"closed for renovation since February 2024; not expected to reopen before 2027"** everywhere.

| Page | Text to change |
|---|---|
| /sun-yat-sen-memorial-hall/ | Title "Closed Until Late 2026"; the description; the Quick Verdict "shut until late 2026"; the status table "Closed until late 2026"; "reopening expected in the final quarter of 2026"; "Reopening is expected in the fourth quarter of 2026"; "Inside the Hall (When It Reopens)… closed until late 2026"; FAQ "closed for renovation until late 2026"; Traveller Tips "Reopening is expected in Q4 2026" |
| /taipei-101-fireworks-new-years-eve/ | "with reopening expected in the last quarter of 2026" |
| /chiang-kai-shek-memorial-hall/ | "with reopening expected around the end of 2026" |
| /martyrs-shrine/ | "the Sun Yat-Sen hall is closed until late 2026" (twice: intro and comparison table) |
| /best-buildings-in-taipei/ | "the main hall is closed until late 2026" and "with reopening expected late in 2026" |

**Other fixes from the same research:**

| Page | Wrong now | Correct |
|---|---|---|
| /taipei-101/ | "Tickets can be bought at the counter on the 5th floor"; the route via "escalators… on the 4th floor" | Since **1 Jul 2026 the observatory ticket desk is temporarily on the Office Tower 1F** (the official ticket page says so) |
| /taipei-101/ | "Standard ticket is NT$600 for floors 88–91, including the open-air 91st floor" | The official general ticket lists **88F and 89F**. 91F is listed for group tickets only and depends on the weather. NT$600 adult, NT$540 concession, NT$1,200 priority pass, 101F +NT$380 |
| /songshan-cultural-and-creative-park/ | "Outdoor areas never close. Indoor spaces run 09:00-18:00" | travel.taipei: **08:00–22:00 daily**. Neither original figure could be confirmed |

### From the Wanhua walk research (`wanhua-heritage-walk.md`)

| Page | Wrong now | Correct |
|---|---|---|
| /huaxi-street-night-market/ | "The whole market was awarded a Michelin Guide Bib Gourmand in 2019, and one stall…" | Michelin gives Bib Gourmands to eateries, not markets. Replace with **"Several of its stalls have appeared in the Michelin Guide's Bib Gourmand list, and one…"** (find string occurs once). *The Yuan Fang hours and MRT exit fixes from the same file are already applied.* |
| /ay-chung-flour-rice-noodles/ | "Opens until 23:00" | True only on Sundays: 10:00–22:30, Sun to 23:00 (one secondary source). Low priority |

### Found in this audit

| Page | Wrong now | Correct |
|---|---|---|
| /taiwan-tourist-tax-refund/ | The intro says "entitled to a full VAT rebate of 5%". The Quick Verdict says "claim your 5% back". The description says "full VAT rebate of 5%" | The page's own Useful Information says **a 20% handling fee is deducted, so the net refund is about 4%**. Make the intro, Quick Verdict and description match, after checking the current fee on the Ministry of Finance page |
| /taiwan-sim-cards/ | "Chunghwa, Taiwan Mobile and FarEasTone prices are from the Taoyuan counter boards, August 2025"; 4G speed tests dated 2019 | Recheck the airport counter prices (they are 14 months old on a "2026 prices" page). Re-run or drop the 2019 speed tests |

### Already fixed (no action)

- /michelin-food-stands-at-night-markets/ Ningxia hours (now 17:00–23:30)
- /the-red-house-ximending/ exit 1
- /huaxi-street-night-market/ Yuan Fang hours and exit
- /xinbeitou/, /taipei-hot-springs/ and /best-museums-in-taipei/ Hot Spring Museum closure from 9 Nov 2026

---

## 4. Internal linking

"Mentions, no link" means the source page talks about the topic in body text but does not link the target. Source GA4 views (27 Sep – 24 Oct) are in brackets.

| Target (inbound now) | Why it matters | Add links from |
|---|---|---|
| /taipei-101-fireworks-new-years-eve/ (5) | Seasonal peak; 447 views | /taipei-zoo (151), /chiang-kai-shek-memorial-hall (93), /best-time-to-visit-taipei (37), /best-areas-and-hotels-to-stay (51), /xinyi-shopping-district (73), /taipei-guide (125), /taipei-nightlife (40) |
| /taipei-101-view-hotels-new-years-eve/ (5) | Best affiliate page (53 clicks) | /taipei-annual-events (89; it already links the fireworks page), /best-time-to-visit-taipei, /chiang-kai-shek-memorial-hall, /xinyi-shopping-district, /taipei-nightlife |
| /taiwan-tourist-tax-refund/ (10) | 7,969 imp; YoY clicks -86% | /taiwan-easycard (765), /mrt (530), /ximending (291), /din-tai-fung (230), /best-shopping-malls-in-taipei (103), /xinyi-shopping-district (73), /taipei-sightseeing-bus (139) |
| /taiwan-high-speed-rail-hsr-discounts-klook/ (10) | High-value product; pos 12.4 | /taoyuan-airport-mrt (817; mentions the HSR transfer), /mrt (530), /taipei-fun-pass (85), /hotels-near-taipei-main-station (66), /best-areas-and-hotels-to-stay (51), /jiufen |
| /best-districts-and-areas/ (5) | Gateway to 7 hotel guides | /mrt (530), /taipei-101-fireworks-new-years-eve (447), /taiwan-sim-cards (305), /ximending (291), /taipei-sightseeing-bus (139), /best-shopping-malls-in-taipei (103) |
| /taiwan-visa-entry-requirements/ (4) | Pos 15.5; insurance fit | /taoyuan-airport-mrt (817), /taiwan-easycard (765), /taiwan-sim-cards (305), /taiwan-tourist-tax-refund (280), /taipei-money-guide (163) |
| /hotels-near-taipei-101/ (14) | Pos 35 | /mrt, /din-tai-fung (230), /maokong-gondola (151), /taipei-sightseeing-bus, /taipei-guide. All mention Taipei 101 without linking the guide |
| /hotels-near-taoyuan-airport/ (7) | 1,178 imp in its first month | /taiwan-sim-cards (already links), /taiwan-tourist-tax-refund (airport section), /taipei-money-guide (airport section), /taiwan-visa-entry-requirements |
| /best-bars-in-taipei/ (3) | 2,659 imp, pos 9.3 | /ximending (291), /yongkang-street (164), /best-districts-and-areas (230), /taipei-101-fireworks-new-years-eve (bars section), /taipei-nightlife |
| /best-shopping-malls-in-taipei/ (5) | 2,995 imp, pos 9.2 | /ximending, /taiwan-tourist-tax-refund, /din-tai-fung (mall branches), /best-districts-and-areas, /where-to-go-when-raining |
| /taipei-youbike/ (9) | 3,085 imp, pos 5.8 | /mrt (530), /tamsui (70), /hotels-near-ximending (73), /dihua-street-dadaocheng-guide, /taipei-itinerary-3-5-days |
| /taiwan-railway/ (2) | "puyuma express" gets 102 imp | /taiwan-easycard (765; mentions TRA), /taipei-fun-pass, /taroko-national-park, /jiufen |
| /taipei-laundrettes/ (1) | 3,623 imp | /hotels-near-ximending, /hotels-near-taipei-main-station, /best-areas-and-hotels-to-stay, /hotels-near-taipei-101, /best-hostels-in-taipei, /hotels-in-zhongshan, /hotels-in-daan. All mention laundry |
| /cheap-breakfast-taipei/ (2) | 3,542 imp | /fuhang-soy-milk, /yong-he-soy-milk-king, /ximending, /taipei-money-guide, /taipei-guide |
| /maps/ (0) | 920 imp; unstable | /mrt, /best-districts-and-areas, /taipei-guide, /ximending, /taipei-zoo |
| /sports-centre-gym/ (1), /skyline-film/ (1) | 1,270 and 1,161 imp; pos 6–8; good CTR (2.8%, 3.3%) | Gym: from /aparthotels-serviced-apartments-taipei and /hotels-in-daan. Skyline Film: from /taipei-nightlife, /best-cinemas-in-taipei and /where-to-go-when-raining |
| /xinbeitou-hot-springs-walk/ (3) | New walk | /beitou-hot-spring-hotels, /yangmingshan-national-park, /best-day-trips-from-taipei |
| /gongguan-walking-route/ (3) | New walk | /treasure-hill, /see-the-drinking-water-museum-at-taipei-water-park, /national-taiwan-university, /lan-jia-traditional-taiwanese-snack, /gongguan-night-market |
| /songshan-xinyi-walking-tour/ (3) | Refreshed walk | /sun-yat-sen-memorial-hall, /songshan-cultural-and-creative-park, /xinyi-shopping-district, /taipei-101 |
| /dadaocheng-dihua-street-walk/ (5) | New walk | /best-temples-in-taipei (Xiahai Temple section) |

---

## 5. Suggested order of work

1. **This week, before December:**
   - the fireworks page: title, schedule H2, Sun Yat-sen fix and inbound links
   - the six Sun Yat-sen mentions
   - the Taipei 101 ticket desk and floors
   - the tax refund 5% vs 4% contradiction
2. **Factual fixes** in section 3, done as one find/replace batch, since most of them are exact strings from the research files.
3. **Content sections:**
   - THSR timetable
   - Airport MRT tickets and hours, plus its description
   - Ximending walking district
   - Taipei Zoo map
   - tax refund "How much"
   - Din Tai Fung Taipei 101
4. **Section 2 metadata** for pages not retitled on 17 Oct.
5. **Internal links** in section 4.
6. **Week of 16 Nov:** recheck the 17 Oct retitles and the SIM card page. Decide then whether to touch the /mrt/ title.
