# VERIFIED research: Hotels Near Taipei Main Station (second pass)

Checked 27 September 2026. This file is research, not article copy. It replaces the unverified parts of `hotels-near-taipei-main-station.md` (first pass). Nothing in `content/posts.json` has been changed.

**How this was checked**
- **Official sites first.** I checked the official hotel and brand sites, the Taiwan Tourism Administration hotel register (taiwanstay.net.tw), Taoyuan Metro (tymetro.com.tw), Taipei Metro, TRA (railway.gov.tw) and Taipei City Government pages. Pages were opened, not read from search snippets. Anything taken from a snippet only is marked "(snippet)".
- **Pages that could not be opened.** hilton.com and marriott.com returned HTTP 403. metro.taipei's station pages are JavaScript-rendered and would not load. Where a fact depends on those, it is flagged.
- **Walking times.** These come from Google Maps walking directions, run live on 27 Sep 2026, from two fixed points:
  - "A1": the Taoyuan Airport MRT A1 station, 25.04861, 121.51417 (Google resolves it to No. 8 Zhengzhou Rd, B2).
  - "Station": the TRA/HSR station building, 25.0478, 121.5170 (Google resolves it to Beiping W. Rd No. 3).
  - These are street-level routes from the middle of each building, so they are conservative. The hotels' own "X minutes from exit Y" figures are usually shorter, and both are given.
- **Prices.** All prices were checked on 27 Sep 2026 for **Wednesday 11 to Thursday 12 November 2026, 1 night, 2 adults** (1 adult for dorm beds).
  - Two sources were used: Klook (en-GB, which showed GBP and would not switch currency) and Booking.com (with TWD selected).
  - Klook's GBP prices are converted at **£1 = NT$42.08** (open.er-api.com, updated 27 Sep 2026 00:02 UTC).
  - Star Hostel would not sell a single night, so it was priced for 2 nights (11 to 13 Nov) and halved.
  - A Saturday check (14 to 15 Nov) was run for four hotels to test the "weekend rates jump" claim.
  - Booking-site prices are only a snapshot of one date. They are not editorial evidence.
- **Editorial counting.** Booking engines, aggregators, OTA mirrors, PTT/forums and social media are not counted.
  - **Taiwan Obsessed and nickkembel.com are one publisher** (Nick Kembel), written "TO/NK".
  - The **same author's mirrors are counted once**: vivianexplore.tw = vivianjourney.tw; boniutravel.com = nikitarh.pixnet.net; gowithmarkhazyl.com = markandhazyl.com.
- **Sources for the station owner's text.** The site's own where-to-stay page (`best-areas-and-hotels-to-stay`) is treated as a first-hand source. Where the checks contradict it, this is noted in section 4.

---

## 1. Summary

**127 factual claims** were extracted from the draft, sentence by sentence (editorial opinions with no checkable content are excluded).

| Verdict | Count |
|---|---|
| VERIFIED (some with a wording caveat) | 85 |
| CORRECTED | 35 |
| UNVERIFIABLE | 7 |

**What changed versus the first pass**

1. **The underground-access story was the wrong way round.**
   - **Palais de Chine** shares a building with Q Square, but its entrance is separate and "can't be reached from the mall's elevators" (Taiwan Obsessed, 28 Jul 2026). You come up at exit Y5 or Y7 and walk under 100 m at street level. Its lobby is on 6F.
   - **Caesar Park** is the hotel with a true underground link. The official site says it is directly connected to MRT exit M6, with a lift from B1 to the lobby.
2. **Prices were mostly stale.** For a November weekday:
   - Roaders Plus is about NT$4,100–4,300, not NT$3,000.
   - citizenM is about NT$3,650–3,700, not "from NT$3,100". That figure was a converted £75 from Taiwanderers.
   - Hotel Resonance is the dearest hotel in the guide at about NT$10,250. The draft gives no price for it.
3. **The Roaders Plus paragraph is wrong in three places.**
   - There are no single rooms. The windowless room is the Standard Double.
   - The Executive Double has no bathtub.
   - The building sits beside exit **Z8**, not Z4. Z4 and Z2 are the exits with lifts.
   - It is also called "Roaders Hotel" throughout the draft. That is a different sibling hotel, Roaders Hotel Zhonghua.
4. **CityInn.**
   - Branch I is on the **south** side (No. 7 Huaining St).
   - Branches II and III are **next door to each other** (Nos. 81 and 77 Chang'an W. Rd). They are no nearer Zhongshan MRT than Taipei Main Station: the official figure is about 10 minutes / 800 m to either.
   - The "no children" claim is contested and is not on any official page.
5. **Hotel Relax.**
   - There are four Relax hotels near the station (I, II, III and V), not two.
   - Relax III officially accepts children.
   - The box breakfast is unconfirmed and possibly discontinued.
6. **Station facts.**
   - Only two Metro lines stop at Taipei Main Station, not "every Metro line".
   - The express train to the airport takes 35–39 minutes, not 35–37.
   - In-town check-in also covers **Mandarin Airlines and Uni Air**.
   - The locker prices were a mix of three different systems.
7. **Hotel Resonance.** Time Out praises its location, not its "room size and soundproofing". Those come from other reviewers.
8. **Sheraton.** Its "five-star" status has no official rating behind it on the Tourism Administration register. The outdoor pool is real, but it closes in January and February.
9. **Chinese-language coverage (12 roundups plus about 40 single-hotel blogs) changes the ranking.**
   - Palais de Chine is named in 8 of 12 Chinese roundups.
   - citizenM is named in only 4, so it is "most recommended" only among English sources.
   - Two strong candidates are missing from the draft: **Cosmos Hotel** (5 of 12) and **OwlStay Flip Flop Hostel** (8 of 12).
10. **Construction.** The **Taipei Twin Towers** site is directly above and beside A1 and Q Square, with completion due in 2027. A **TRA station-hall refit** starts in December 2026. The draft mentions neither.

---

## 2. Claim-by-claim table (section F)

Date = the publication or update date of the source. "Official, undated" = an official page with no date, accessed 27 Sep 2026. GM = Google Maps walking directions, 27 Sep 2026.

### 2a. Intro and Quick Verdict

| # | Claim (draft wording) | Verdict | Correct fact / note | Source(s) | Source date |
|---|---|---|---|---|---|
| 1 | "Every Metro line, the high speed rail and the airport train all meet here" | CORRECTED | Only **two** of Taipei Metro's lines stop here: Red, Tamsui–Xinyi (R10), and Blue, Bannan (BL12). TRA, THSR and the Airport MRT (A1) also meet here. Green (Beimen) is a separate station nearby. | gov.taipei Y/Z exits FAQ (n=EEC70A4186D4C828); en.wikipedia.org/wiki/Taipei_Main_Station (snippet) | FAQ updated 31 Aug 2024 |
| 2 | "reach almost anywhere in the city without a change" | CORRECTED | Only true along the Red and Blue lines. Suggest "most of the city in one change". | as #1 | – |
| 3 | "hotels and hostels within about ten minutes' walk" | CORRECTED (scope) | Resonance is 15 min / 1.0 km and the Sheraton 12 min / 850 m from the station building (GM). From A1 they are 20 and 17 min. The draft already frames them as "one stop east", but the intro should allow for that. | GM | 27 Sep 2026 |
| 4 | "the best hostel in Taipei" (Star) | VERIFIED as attributed opinion | Nick Kembel: "my most recommended hostel not just in this area but in all of Taipei". It won HOSCAR awards in 2017 and 2018. Attribute it rather than state it as fact. | nickkembel.com/where-to-stay-in-taipei/; starhostel.com.tw/about-tw | 19 Feb 2026; official, undated |
| 5 | citizenM "the most widely recommended hotel in the area" | CORRECTED | True among **English** sources only (6 confirmed domains). With Chinese sources included, Palais de Chine is the most widely covered: about 17 domains and 8 of 12 Chinese roundups, against about 14 domains and 4 of 12 for citizenM. Suggest "the most widely recommended hotel in English-language guides". | see section 3 coverage counts | 2018–2026 |
| 6 | citizenM "about five minutes from the Airport MRT" | VERIFIED (range) | Taiwanderers (first-hand): "about 6 minutes door to door". iwandered (2018): "a mere 3 minute walk". GM from the A1 centre gives 11 min / 700 m by street. "About five to ten minutes" is the safest wording. | taiwanderers.com/taipei-main-station-hotels/; iwandered.net/citizenm-taipei-north-gate-review/; GM | upd 3 Aug 2026; 4 Feb 2018 |
| 7 | Palais de Chine "connected to the station underground" | CORRECTED | Same building as Q Square, but "its entrance is separate from the mall and can't be reached from the mall's elevators". Use exit Y5 or Y7, then walk under 100 m. The only below-ground link is the B4/B5 car-park lifts. | taiwanobsessed.com/palais-de-chine-taipei-review/; palaisdechinehotel.com/pdc-en/pages/53/0/271 | 28 Jul 2026; official, undated |
| 8 | "Sociable mid-range: Roaders Hotel" | CORRECTED | The official name is **Roaders PLUS Hotel – Taipei Station** (路徒PLUS行旅-站前館). "Roaders Hotel" is the sibling Roaders Hotel Zhonghua in Ximending. The price is now about NT$4,100–4,300 on a weekday, i.e. upper mid-range. | roadersplushotel.com/en/; zhonghua.roadershotel.com; Klook/Booking prices | 2026; priced 27 Sep 2026 for 11 Nov 2026 |
| 9 | Star Hostel "dorms and private rooms a few minutes from the airport train" | VERIFIED | GM A1 → Star is 5 min / 350 m. Hostelworld: "5-minute walk from Air Port MRT". | GM; hostelworld.com/hostels/p/85980 | 27 Sep 2026; current |
| 10 | "Arriving late with luggage? Stay on the north side, nearest the Airport MRT exits" | CORRECTED (qualify) | Being at the **west** end matters more than north or south. GM from A1: Roaders Plus 4 min (south side), Star 5 min, Palais 6 min, CityInn I 7 min, Meander 8 min. Two late-arrival catches on the north side: Meander's reception closes at 22:00, and Star's front desk runs 07:00–23:00 (self check-in after that). | GM; staymeander.com/meander1948/zh/faq; starhostel.com.tw/faq | 27 Sep 2026; official, undated |

### 2b. "Why Stay" and "North side or south side"

| # | Claim | Verdict | Correct fact / note | Source(s) | Source date |
|---|---|---|---|---|---|
| 11 | Blocks around the station are "offices, bus bays and chain restaurants" | VERIFIED (owner's first-hand text) | The owner's page says "busy and functional rather than characterful". | best-areas-and-hotels-to-stay (site's own page) | current |
| 12 | "two Metro lines stop underneath" | VERIFIED | R10 and BL12. This contradicts claim #1 in the same draft. | as #1 | – |
| 13 | High speed rail makes day trips to Taichung or Tainan straightforward | VERIFIED (secondary) | Taichung about 47 min on the fastest train; Tainan about 1 h 45 min. The thsrc.com.tw timetable is a form and could not be queried. | Klook / taiwanese-secrets (snippet) | 2026 |
| 14 | Ximending "close enough to walk to for dinner" | VERIFIED | The owner's page says 5–10 min. Nick Kembel says citizenM is "roughly halfway between Taipei Main Station and Ximending". | owner's page; taiwanobsessed.com/taipei-main-station-hotels/ | 12 Feb 2026 |
| 15 | Airport MRT terminal "a separate station about 250 m west of the main building, linked to it underground" | VERIFIED | "Roughly 250 metres west", joined by a 115 m walkway. Taoyuan Metro's A1 page gives 5–10 min to TRA/THSR and **10–15 min to the Metro Red/Blue lines**. | en.wikipedia.org/wiki/Taipei_Main_Station_(Taoyuan_Metro); tymetro.com.tw/tymetro-new/tw/_pages/travel-guide/A1 | undated |
| 16 | "Express trains reach Taoyuan Airport in about 35–37 minutes" | CORRECTED | **35 min to T1 (A12), 39 min to T2 (A13).** Express trains run about every 15 min in the daytime (Taoyuan City: "every 15~30 minutes"). The fare is NT$160 flat. The NT$10 e-ticket discount ended on 2 Jan 2025. | travel.tycg.gov.tw/en/traffic/airportmrt; xinmedia.com/article/301038; tymetro news show-2038-1 (snippet) | undated; 23 Feb 2026; 16 Oct 2024 |
| 17 | In-town check-in for "China Airlines, EVA Air, Cathay Pacific and STARLUX passengers" | CORRECTED | The official list is China Airlines, **Mandarin Airlines**, EVA Air, **Uni Air**, Cathay Pacific and STARLUX. Check-in is on B1 of A1. | tymetro.com.tw/tymetro-new/en/_pages/checkin/index.php | official, undated (fetched 27 Sep 2026) |
| 18 | Check-in open "06:00–21:30" | VERIFIED | "06:00 ~ 21:30" | as #17 | as #17 |
| 19 | "at least three hours before a same-day flight" | VERIFIED | "3 hours before your flight taking off", for "Flights departing from Taoyuan International Airport on the same day" | as #17 | as #17 |
| 20 | South side, along Zhongxiao W. Rd, has the biggest cluster of hotels and restaurants and is closest to Ximending | VERIFIED | | taiwanobsessed.com/taipei-main-station-hotels/; nickkembel.com/where-to-stay-in-taipei/ | 12 Feb 2026; 2026 |
| 21 | North side (Huayin St / Taiyuan Rd) is where the hostels are, nearer the A1 exits, Ningxia and Dihua St | VERIFIED | Star is 350 m from A1 and Meander 550 m (GM). | as #20; GM | 2026 |
| 22 | "the north side saves the longest underground walk" | CORRECTED (qualify) | See #10. Roaders Plus (260 m / 4 min) and CityInn I (450 m / 7 min) on the south-west side are as close to A1 as the north-side hostels. | GM | 27 Sep 2026 |

### 2c. Comparison table

Prices are for Wed 11 to Thu 12 Nov 2026, checked 27 Sep 2026. K = Klook (GBP × 42.08), B = Booking.com (TWD).

| # | Claim | Verdict | Correct fact / note | Source(s) | Source date |
|---|---|---|---|---|---|
| 23 | Palais: "Linked underground" | CORRECTED | See #7. Suggest "3 min from exit Y5/Y7". | as #7 | 2026 |
| 24 | Palais: "Upscale" | VERIFIED | Lowest double **NT$6,700–7,300** (K £159–171; B NT$7,333). | Klook 411990; booking.com/hotel/tw/palais-de-chine | 27 Sep 2026 |
| 25 | citizenM: "From around NT$3,100" | CORRECTED | **NT$3,650–3,700** (K £87.09 ≈ NT$3,665; B NT$3,700 King Room). Saturday 14 Nov: NT$5,000+ (B). NT$3,100 was Taiwanderers' "£75 … (NT$3,100)", stay date not given. | Klook 436433; booking.com/hotel/tw/citizenm-taipei-north-gate | 27 Sep 2026 |
| 26 | Caesar Park: "Opposite, linked underground" | VERIFIED | "Directly connected to Exit M6 of MRT station"; "take the elevator from B1 to the reception hall". | taipei.caesarpark.com.tw/en/about/ and /en/about/traffic_information/ | official, undated |
| 27 | Caesar Park: "Upper mid-range" | VERIFIED | **NT$3,100–3,700** (K £74.01 ≈ NT$3,115; B NT$3,661). Note it costs the same as citizenM. | Klook 410943; booking.com/hotel/tw/caesarpark-taipei | 27 Sep 2026 |
| 28 | Roaders Plus: "4 mins" | VERIFIED | GM: 6 min / 400 m from the station building; 4 min / 260 m from A1. The building is beside exit Z8. | GM; bloggers (see #75) | 27 Sep 2026 |
| 29 | Roaders Plus: "NT$3,000" | CORRECTED | Cheapest on sale: Superior Double **NT$4,140–4,280** (K £98.46; B NT$4,280). The windowless Standard Double was not on sale for this date. | Klook 760314; booking.com/hotel/tw/roaders-plus | 27 Sep 2026 |
| 30 | Relax III: "About 5 mins" | VERIFIED | GM: 8 min / 550 m from the station building. Blogs say 5 min from the Z exits. | GM; retrievertrip.com; angelala.tw | 2026; 2018 |
| 31 | Relax III: "Budget" | VERIFIED | Standard Double **NT$2,640–3,230** (K £62.76; B NT$3,229). The official booking engine shows from NT$2,184 for Sep 2026. | Klook 254746; booking.com/hotel/tw/relax-iii; booking.taiwantravelmap.com m=348 | 27 Sep 2026 |
| 32 | CityInn: "1–5 mins" | CORRECTED | **3–10 min.** Branch I: official "about 3 min" from the MRT; GM 6 min. Branches II and III: official "5 min" from exits Y13/Y7, "about 10 min" from the station; GM 8 min. | c1/c2/c3.cityinn.com.tw location pages; GM | official, undated; 27 Sep 2026 |
| 33 | CityInn: "NT$2,500" | CORRECTED (range) | Branches II and III, windowless Standard: **NT$2,210–2,400** (K £52.55; B NT$2,400). Branch I, windowless Standard: **NT$2,840–3,590** (K £67.39; B NT$3,591). Saturday 14 Nov, Branch III: NT$6,600 (B). | Klook 267240 / 422703 / 269372; booking.com cityinn-1/-2/-3 | 27 Sep 2026 |
| 34 | Star Hostel: "5 mins" | VERIFIED | GM: 5 min from A1, 8 min from the station building. The official homepage says "about 10 minutes" from Taipei Main Station. | GM; starhostel.com.tw | 27 Sep 2026 |
| 35 | Star Hostel: "NT$2,700 room, NT$900 bunk" | CORRECTED | 2-night stay 11 to 13 Nov (B), per night: 8-bed female dorm NT$995; 8-bed mixed NT$1,112; 6-bed NT$1,170; Double NT$3,042. On 18 to 20 Nov: Single NT$2,399, Small Twin NT$3,218. Klook showed no availability. **Bunks about NT$1,000–1,200, private rooms about NT$2,400–3,200.** Other published figures: dorms "from NT$650" (retrievertrip, Jan 2026) and NT$775 (Ms Travel Solo, stay undated). | booking.com/hotel/tw/star-hostel-taipei-main-station; retrievertrip.com; mstravelsolo.com | 27 Sep 2026; 2026 |
| 36 | Meander 1948: "About 5–7 mins" | VERIFIED | Official: "approximately 7 minutes on foot". GM: 8 min from A1, 9 min from the station building. Blogs: 1–2 min from exit Y13. | 1948.staymeander.com; GM; drbackpacker.com | © 2026; 27 Sep 2026; 13 Oct 2020 |
| 37 | Meander 1948: "Dorm beds from around NT$725" | VERIFIED as a floor | Official "from $22 USD/day" (about NT$700). For 11 Nov: **NT$1,070–1,080** (K £25.43, discounted; B NT$1,080). Shared-bath double NT$3,000 (K and B). Balcony double NT$4,800 (B). | 1948.staymeander.com; Klook 447739; booking.com/hotel/tw/meander-1948 | 27 Sep 2026 |
| 38 | Taiwan Youth Hostel & Capsule: "1 min" | VERIFIED | Official: "roughly 2 minutes from MRT Station M8 exit". GM from the station building centre is 10 min / 700 m, but M8 is the south-east exit of the Metro station. | taiwanyh.com/contact_t/ | official, undated |
| 39 | TYH: "NT$1,600 room, NT$800 bunk" | VERIFIED | B: single-bed dorm NT$855–900; double-size bunk NT$1,125–1,215; Double Room (shared bath) **NT$1,665–1,800**. K: double-size bunk £28.46 (≈ NT$1,200); Quad £42.33 (≈ NT$1,780). Official: "from NT$650". | booking.com/hotel/tw/tai-wan-qing-lu; Klook 576278; taiwanyh.com | 27 Sep 2026 |
| 40 | "Prices are typical weekday rates and swing a lot at weekends" | VERIFIED | Sat 14 Nov vs Wed 11 Nov (B): Roaders NT$8,080 vs 4,280; CityInn III NT$6,600 vs 2,400; citizenM NT$5,000 vs 3,700. | booking.com | 27 Sep 2026 |

### 2d. Luxury: Palais de Chine and Caesar Park

| # | Claim | Verdict | Correct fact / note | Source(s) | Source date |
|---|---|---|---|---|---|
| 41 | Palais: "the most widely recommended luxury hotel at the station" | VERIFIED | English domains: 6 (Michelin, TO/NK, Taiwanderers, Travel Codex, Two by the World, arosieworld). Named in 8 of 12 Chinese roundups, plus 5 first-hand Chinese blogs. | section 3 | 2020–2026 |
| 42 | "the only one connected to it underground as well as to Q Square mall above the bus station" | CORRECTED | It is in the Q Square building but has no underground connection from the mall. Caesar Park is the directly connected hotel. | as #7 and #26 | 2026 |
| 43 | "close to the Airport MRT" | VERIFIED | GM: 6 min / 400 m from A1. rainieis.tw: "機捷A1步行3分鐘" (3 min from A1). The hotel also runs a **free shuttle from A1, daily 11:00–16:00, booking required**. | GM; rainieis.tw/palais-de-chine-hotel-taipei/; palaisdechinehotel.com/pdc-en/pages/53/0/271 | 27 Sep 2026; 18 Nov 2023; official |
| 44 | "neo-classical European interiors are dark and ornate – not everyone's taste" | VERIFIED (reviewer opinion) | TO: "Dark interiors may not appeal to everyone". Michelin hotel page describes it as neo-classical. | taiwanobsessed.com/palais-de-chine-taipei-review/; guide.michelin.com/us/en/hotels-stays/taipei/palais-de-chine-7560 | 28 Jul 2026 |
| 45 | "standard rooms are on the compact side, though the bathrooms are big" | VERIFIED (attribute to Travel Codex) | "How small the room seemed at first glance" and "the bathroom is palatial" (stay 26–28 Jan 2024). Superior rooms are officially **30 m²**, generous by Taipei standards, so "compact" is one reviewer's impression. | travelcodex.com/review-palais-de-chine-hotel-taipei/; palaisdechinehotel.com/pdc-en/rooms/25/7 | stay Jan 2024, page upd 7 Aug 2026 |
| 46 | "Le Palais … holds three Michelin stars" | VERIFIED | Three stars in the MICHELIN Guide Taiwan 2026, announced 21 Jul 2026. It is the ninth consecutive year. | guide.michelin.com/en/taipei-region/taipei/restaurant/le-palais; palaisdechinehotel.com/pdc_en/pages/31/33/265 | 21 Jul 2026 |
| 47 | "There's no pool" | VERIFIED | There is no pool on the official facilities lists (EN or ZH), and TO lists "No swimming pool". The Michelin hotel page's amenity feed wrongly lists a seasonal pool. | official facilities pages; taiwanobsessed.com | 2026 |
| 48 | "the entrance is surprisingly hard to find from the underground passages" | VERIFIED | "the station's maze of underground passageways makes the hotel surprisingly difficult to find on your first visit" | taiwanobsessed.com/palais-de-chine-taipei-review/ | 28 Jul 2026 |
| 49 | Caesar: "Directly opposite the station and linked underground" | VERIFIED | as #26 | as #26 | official |
| 50 | "It's an older hotel, so the higher, renovated floors are the ones to ask for" | CORRECTED | Opened 1973 as the Hilton Taipei and became Caesar Park in 2003. Renovated in 2012, unevenly by room type. **Superior rooms were redone from Dec 2020.** No source says renovation runs by floor: a 2020 guest found 7F unrenovated. Say "ask for a renovated room". | en.wikipedia.org/wiki/Caesar_Park_Taipei; taipei.caesarpark.com.tw/en/; rainieis.tw/caesar-park-taipei/ | 2020–2021 |
| 51 | "Reviewers mention free luggage storage" | VERIFIED (reviewers, not official) | Taiwanderers: "luggage storage service is available free of charge". rainieis.tw says the same. | taiwanderers.com/taipei-main-station-hotels/; rainieis.tw | 26 Apr 2025; 20 Oct 2021 |

### 2e. One stop east: Hotel Resonance and the Sheraton

| # | Claim | Verdict | Correct fact / note | Source(s) | Source date |
|---|---|---|---|---|---|
| 52 | "Two of the best-reviewed hotels in the area" | UNVERIFIABLE | Subjective. Resonance appears in 3 of 12 Chinese roundups and the Sheraton in 2 of 12. Both have several first-hand reviews. | section 3 | – |
| 53 | "about ten minutes' walk east" | CORRECTED | GM from the station building: Sheraton **12 min / 850 m**, Resonance **15 min / 1.0 km**. From the east M exits it is about 6–8 min. "10–15 minutes" is accurate. | GM; rome2rio (550 m/6 min to Sheraton, snippet) | 27 Sep 2026 |
| 54 | "beside Shandao Temple MRT – one stop on the Blue line" | VERIFIED | Sheraton is at exit 2 and Resonance at exits 3 or 4, about 1 min. **Exit 3 has the lift.** | mimigo.tw; havefunday.com; timeout.com | 2024–2026 |
| 55 | Resonance is "part of Hilton's Tapestry Collection" | VERIFIED | It was the first Tapestry Collection hotel in Asia Pacific. It opened in Dec 2020 with 175 rooms. | stories.hilton.com/apac/releases/apac-welcomes-hotel-resonance-taipei-tapestry; taiwanstay.net.tw hohi_id=28176 | 2 Dec 2020 |
| 56 | "the only station-area hotel on Time Out's Taipei list" | VERIFIED | "11 Best Hotels in Taipei" by Ken Chao. None of the other 10 hotels is within about 10 min of the station. | timeout.com/taipei/hotels/best-hotels-in-taipei | 17 Sep 2024 |
| 57 | "praised for room size and soundproofing" | CORRECTED (attribution) | Time Out praises only location ("one of the most convenient hotels in Taipei") and nearby food. **Room size** is praised by Head for Points ("very spacious at 30 sqm") and Kinda Boring Travels ("the room was enormous"). **Soundproofing** comes only from vivianexplore.tw ("隔音佳", good soundproofing) and user reviews. | timeout.com; headforpoints.com/2023/11/18/review-hotel-resonance-taipei/; kindaboringtravels.com/2024/11/02/review-hotel-resonance-taipei/; vivianexplore.tw | 2024; 18 Nov 2023; 2 Nov 2024; Jul 2026 |
| 58 | Sheraton "is a full-service" hotel | VERIFIED | 9 restaurants (including The Guest House, 1 Michelin star), spa, sauna, gym and executive lounge. 683 rooms per the official site (615 + 68 suites); 688 per the register and Michelin. | sheratongrandtaipei.com; taiwanstay.net.tw hohi_id=9474 | 2026 |
| 59 | Sheraton "five-star" | UNVERIFIABLE | The Tourism Administration register shows no star rating, and it is not in the list of officially rated five-star hotels. It is widely called five-star informally. Suggest "luxury" or "international five-star". | taiwanstay.net.tw hohi_id=9474; zh.wikipedia five-star category | 2026 |
| 60 | "with an outdoor pool" | VERIFIED | **Rooftop outdoor pool on 18F**, 07:00–20:00 with breaks. **Closed in January and February.** | sheratongrandtaipei.com/websev?lang=zh-tw&ref=pages&cat=3&id=26; Agoda property text | official, 2026 |
| 61 | "a few minutes from Fuhang Soy Milk" | VERIFIED | GM Sheraton → Fu Hang Soy Milk (2F, No. 108, Sec. 1, Zhongxiao E. Rd): **4 min / 300 m**. | GM | 27 Sep 2026 |
| 62 | Fuhang is "the city's most famous breakfast" | VERIFIED (widely held opinion) | Taiwan Obsessed: "Taipei's Most Famous Breakfast Shop". Still open 05:30–12:30, **closed Mondays**. Note: it **lost its Bib Gourmand in 2023**. The draft doesn't claim the Bib, but the linked /fuhang-soy-milk page should be checked. | taiwanobsessed.com; momoblog.tw; travel.ettoday.net/article/2566973.htm | 23 Feb 2024; 14 Jul 2026; 23 Aug 2023 |
| 63 | "Neither is a walk you'd want with big luggage from the airport train" | VERIFIED | GM from A1: Sheraton **17 min / 1.2 km**, Resonance **20 min / 1.4 km**. Nick Kembel: "from the Airport MRT, just take a taxi". | GM; nickkembel.com/where-to-stay-in-taipei/ | 27 Sep 2026; 2026 |
| 64 | "take the MRT one stop or a short taxi" | CORRECTED (advice) | Taking the MRT still means walking **10–15 min** inside the complex from A1 to the Blue line (Taoyuan Metro's figure). The taxi from the A1 B1 rank (Metropolitan Satellite Taxi) is the better luggage advice. | tymetro.com.tw …/travel-guide/A1 | official, undated |

### 2f. Mid-range: citizenM and Roaders Plus

| # | Claim | Verdict | Correct fact / note | Source(s) | Source date |
|---|---|---|---|---|---|
| 65 | citizenM "the hotel with the broadest support of any near the station" | CORRECTED | English-only; see #5. | section 3 | – |
| 66 | "seven separate publications recommend it" | CORRECTED | **Six confirmed:** Michelin, Wallpaper, Taiwanderers, TO/NK, P.S. I'm On My Way, iwandered. liveloveran.com returned HTTP 525 twice and could not be checked. Adding Chinese blogs gives more (section 3), so "six English-language guides" or "a dozen guides and blogs" are both defensible. | pages listed in section 3 | 2018–2026 |
| 67 | "from the Michelin Guide to Wallpaper" | VERIFIED (with caveats) | Michelin lists it with **no MICHELIN Key**, so it is a listing, not an award, and the page wrongly places it in "Zhongshan District". The Wallpaper piece is from **2022**. | guide.michelin.com/en/hotels-stays/zhongshan-district/citizenm-taipei-north-gate-17044; wallpaper.com/travel/taiwan/taipei/hotels/citizenm-north-gate | undated; 25 Jul 2022 |
| 68 | "handy for Ximending and Beimen too" | VERIFIED | Beimen MRT 300 m / about 4 min (Klook location data); 3 min (bobowin 2024, vivianexplore 2026). | Klook; bobowin.blog/citizen-m-taipei/; vivianexplore.tw/citizenm-taipei-north-gate/ | 2024–2026 |
| 69 | "Rooms are compact, mostly bed and window" | VERIFIED | About 15 m² (Klook lists 15 m²), one XL bed and a full-width window. No windowless rooms. Shower only. | Klook; iwandered; bobowin | 2018–2026 |
| 70 | "city views from the upper floors" | VERIFIED | "often with excellent city views from higher floors" | taiwanobsessed.com/taipei-main-station-hotels/ | 12 Feb 2026 |
| 71 | "the 24-hour canteen" | VERIFIED | "canteenM is the 24/7 bar-restaurant". Breakfast is 06:00–11:00. | marriott.com/en-us/hotels/tpecm-citizenm-taipei-north-gate/dining/ (opened by one checker; 403 for others) | 27 Sep 2026 |
| 72 | "One reviewer paid around NT$3,100 for a king room with a city view" | VERIFIED | "we paid £75 a night for a King room city view without breakfast (NT$3,100 or $97 USD)". The stay date is not given. | taiwanderers.com/taipei-main-station-hotels/ | upd 3 Aug 2026 |
| 73 | Roaders Plus "occupies the 24th to 35th floors" | VERIFIED | "位於24樓至35樓 共128間房" (24F–35F, 128 rooms). The **lobby is on 4F.** The sister Roaders PLUS Theme hotel (路徒PLUS行旅-主題館) is on 5F–12F of the same building. | roadersplushotel.com; fawn-group.com/brand.php?ID=12 | 2026 |
| 74 | "of a tower on Zhongxiao West Road" | VERIFIED | No. 80, Sec. 1, Zhongxiao W. Rd (基泰忠孝大樓, the Ji-Tai Zhongxiao Building). | roadersplushotel.com; yenliving.com | 2026; Nov 2021 |
| 75 | "three to five minutes from exit Z4" | CORRECTED | Five blog stays put the building **beside exit Z8** (Huaining St, stairs). Z2 has a lift ("Z8 exit (stairs) or Z2 exit (elevator)"). Nick Kembel recommends Z4 for its lift. | from20smoretravel.blog/roadersplushotel/; katesfunzone.com; gowithmarkhazyl.com; taiwanobsessed.com | 18 May 2026; 26 Sep 2021; 21 Jan 2026; 12 Feb 2026 |
| 76 | "so even the cheaper rooms come with a view over the station" | CORRECTED | The cheapest type, the **Standard Double (15 m²), has no window**: official "站前館-標準雙人房 … 無窗". | roadersplushotel.com/en/ | 2026 |
| 77 | "The shared lounge … games, a projector and space to spread out" | VERIFIED | Table football, darts, projector and happy-hour snacks. Coin laundry costs NT$50. | from20smoretravel.blog; gowithmarkhazyl.com; roadersplushotel.com/en/ | 2026 |
| 78 | Families "get family rooms and a kids' play area" | VERIFIED | Family Room 30 m² and Deluxe Family 40 m² (official). Kids' playroom with a slide, 09:00–21:00. | roadersplushotel.com/en/; gowithmarkhazyl.com/roaders-plus-hotel-taipei-station/ | 2026; 21 Jan 2026 |
| 79 | "Singles start around NT$2,000 but have no window" | CORRECTED | **There are no single rooms** (10 room types, all doubles or larger). The windowless type is the Standard Double. Cheapest on sale for 11 Nov 2026 was the Superior Double at about NT$4,140–4,280. | roadersplushotel.com/en/; Klook; Booking | 27 Sep 2026 |
| 80 | "the executive doubles, around NT$4,000, have a bath" | CORRECTED | The Executive Double (Taipei 101 view, 17 m²) has **no bathtub** and costs NT$4,480–4,580. Bathtubs start with the **Deluxe Double with Bathtub** (22 m²) at NT$5,360–5,480. The Luxury Double, Triple and Family rooms also have baths. | roadersplushotel.com/en/; Klook (£106.42 / £127.34); Booking (NT$4,580 / 5,480) | 27 Sep 2026 |
| 81 | "Expect weekend rates to jump" | VERIFIED | Sat 14 Nov: Superior Double NT$8,080, against NT$4,280 on Wed 11 Nov (B). | booking.com | 27 Sep 2026 |

### 2g. Budget hotels: CityInn and Hotel Relax III

| # | Claim | Verdict | Correct fact / note | Source(s) | Source date |
|---|---|---|---|---|---|
| 82 | CityInn is "a reliable Taiwanese budget chain with three branches around the station" | VERIFIED | Taipei Inn Group (台北旅店集團) runs 6 CityInn hotels, 3 of them at Taipei Station. | cityinn.com.tw; taipeiinn.com.tw/co/ci.html | official, undated |
| 83 | "Branch 1 … beside the station itself" | CORRECTED | It is at **No. 7 Huaining St, south side**, by Shin Kong Mitsukoshi. Officially "about 3 minutes" from the MRT; GM 6 min / 450 m from the station building and 7 min / 450 m from A1. Say "a three-minute walk south of the station". | c1.cityinn.com.tw/tw/location-t/; GM | official; 27 Sep 2026 |
| 84 | "a handful of its rooms have balconies" (Branch 1) | VERIFIED | Deluxe room: "房間面積：19m²～28m²(含陽台)" (area includes a balcony). The number of such rooms is not published. | booking.taipeiinngroup.com room_detail hid=103&rid=59 | official, undated |
| 85 | "Branch 3 is a couple of blocks north on Chang'an West Road" | VERIFIED | No. 77 Chang'an W. Rd (register: 77/79, floors 1–7), 66 rooms. | c3.cityinn.com.tw; taiwanstay hohi_id=17029 | official |
| 86 | "the quieter side" | UNVERIFIABLE | No source compares noise levels. | – | – |
| 87 | "nearer Zhongshan MRT" | CORRECTED | CityInn gives "about 10 min / about 800 m" from Zhongshan Exit 1, the **same** as from Taipei Main Station. The nearest access is exit **Y7** of Taipei City Mall, 5 min. | c3.cityinn.com.tw/tw/location-t/ | official, undated |
| 88 | "Branch 2 is a similar five-minute walk" | VERIFIED | Officially 5 min from exit Y13. **It is next door to Branch 3** (No. 81 vs No. 77 Chang'an W. Rd). 50 rooms. There is a room-renovation notice (25 Jun), and 7F rooms are being worked on from 31 Mar to 31 Dec 2026 (snippet). | c2.cityinn.com.tw; taiwanstay hohi_id=20348; Klook address | official; 2026 |
| 89 | "The cheapest rooms are windowless at all three" | VERIFIED | Branch I: "※ 標準客房皆為無窗房型 ※" (all standard rooms are windowless). Branch II: "本房型皆無窗". Branch III: "本房型皆無窗戶" (both: none of this room type has windows). Booking and Klook both label them "No Window". | booking.taipeiinngroup.com hid=103 rid=31 / hid=106 rid=57 / hid=107 rid=41; Booking; Klook | official; 27 Sep 2026 |
| 90 | "pay the small step up if daylight matters" | VERIFIED | Branches II and III: windowed Standard NT$2,880 vs windowless NT$2,400 (B), a step of about NT$480–640. | Booking; Klook | 27 Sep 2026 |
| 91 | "CityInn doesn't accept them [children]" | UNVERIFIABLE (contested) | No official CityInn page mentions a child policy. Every room page says "no extra bed". **For "no kids":** TO ("kids are no longer allowed", 12 Feb 2026), nickkembel ("None allow kids"), and Booking.com for Branches I and II (snippet). **Against:** Trip.com Branch III ("歡迎所有年齡的兒童入住", children of all ages welcome). Branch III also sells a "Family room" (B, NT$5,400). The same claim is in the owner's where-to-stay page. | taiwanobsessed.com; nickkembel.com; tw.trip.com | 2026 |
| 92 | Relax III has a "24-hour front desk" | VERIFIED | "The front desk is open 24 hours a day" | relax3.hotelrelaxclub.com/en/facility/content/1507 | official, undated |
| 93 | Relax III has "free snacks" | VERIFIED (partly) | Official: free 24-hour coffee, cocoa and milk tea, and a microwave. Snacks are mentioned by Nick Kembel ("free snacks") and angelala (2018). | relax3 …/facility/content/1494; nickkembel.com | 2018–2026 |
| 94 | "a beer voucher on arrival" | VERIFIED | Official room pages: "Welcome drink/ Buckskin Beer". TO: "a voucher for a free beer at a nearby restaurant". | relax3 /en/room/content/2046; taiwanobsessed.com | 2026 |
| 95 | "Rooms are small" | VERIFIED | Standard Double 16 m² (Klook). Taiwanderers: "the rooms can be quite small". | Klook; taiwanderers.com | 2026 |
| 96 | "breakfast comes as a box from reception" | UNVERIFIABLE (possibly outdated) | The official site does not mention breakfast. retrievertrip (2 Jan 2026) says no breakfast is included. The box breakfast is mentioned only by Taiwanderers (stay year not given) and mrhost (2024). | retrievertrip.com; taiwanderers.com; zh.blog.mrhost.com.tw/16058/relax-series/ | 2024–2026 |
| 97 | "one of two small Relax hotels near the station" | CORRECTED | There are **four**: Relax I (No. 8 Guanqian Rd, 10–11F), II (No. 15, Sec. 1, Hankou St), III (No. 34 Huaining St) and V (No. 20, Sec. 1, Chongqing S. Rd). | mrhost blog; relax5.hotelrelaxclub.com; taiwanstay hohi_id=16534 | 2024–2026 |

### 2h. Hostels

| # | Claim | Verdict | Correct fact / note | Source(s) | Source date |
|---|---|---|---|---|---|
| 98 | Star is "on the fourth floor of a building on Huayin Street" | VERIFIED | 4F, No. 50 Huayin St, Datong. (The 5F dorms are reached by stairs only.) | starhostel.com.tw/about-tw, /faq, /share-rooms | official, undated |
| 99 | "about three minutes from exit Y7" | CORRECTED | The hostel's own map routes you from A1 through Y16U to **exit Y13** (Taiyuan Rd / Huayin St), then round the corner. Y7 (on Chengde Rd) is Nick Kembel's figure. Suggest "a couple of minutes from exit Y13". | STAR-MAP.pdf (static1.squarespace.com …/STAR-MAP.pdf); taiwanobsessed.com/best-taipei-hostels/ | map Mar 2018; TO 15 Jan 2026 |
| 100 | "one of the shortest walks in this guide from the Airport MRT" | VERIFIED | GM: 5 min / 350 m, second only to Roaders Plus (4 min / 260 m). | GM | 27 Sep 2026 |
| 101 | "recommended more than any other hostel in the area" | VERIFIED | 6 English domains and 8 Chinese. OwlStay Flip Flop is named in more Chinese roundups (8 of 12 vs 6 of 12). | section 3 | 2021–2026 |
| 102 | "bright, plant-filled lounge" | VERIFIED | "high ceilings, large windows… indoor plants" | starhostel.com.tw/about-tw | official |
| 103 | "private rooms, for one to four people" | VERIFIED | Single, Double, Twin, Triple, Family (4) and Friend Bunk. | starhostel.com.tw/rooms | official |
| 104 | "Breakfast is included" | VERIFIED | "Free breakfast & fresh brewed coffee everyday from 8am - 10am", plus early-bird toast from 6am. | starhostel.com.tw/facilities | official |
| 105 | "served in time slots" | UNVERIFIABLE | Not on the official pages; seen only in a Trivago snippet. Say "served 8–10am". | (snippet) | – |
| 106 | "there's luggage storage for late flights" | VERIFIED | The luggage room is open 07:00–23:00 and is free before check-in and after check-out. | starhostel.com.tw/faq | official |
| 107 | "The catch is the two-night minimum" | VERIFIED (with nuance) | "There is a minimum requirement of booking 2 nights (same room type)". Single weekday nights are released at 14:00 on the 1st of each month; single Fri/Sat nights at 14:00 on the Monday of that week. Booking.com had no 1-night availability for 11 Nov. | starhostel.com.tw/faq ("From Jan. 1st 2023"); Booking | policy dated 1 Jan 2023; 27 Sep 2026 |
| 108 | "weekends fill weeks ahead" | UNVERIFIABLE | Ms Travel Solo says only that it is "challenging to book last minute". | mstravelsolo.com/where-to-stay-in-taipei/ | 30 May 2026 |
| 109 | Meander is "just across the street from Star Hostel" | VERIFIED | GM Star → Meander: **56 m, 1 min**. Both are at the Huayin St / Taiyuan Rd corner (the streets are perpendicular). | GM; thisremotecorner.com/best-hostels-in-taipei/ | 27 Sep 2026; 21 Sep 2026 |
| 110 | "in a building from the 1940s" | VERIFIED | Built 1948 as the headquarters of the Shilin Paper Company. | sllifetrip.com; drbackpacker.com | 13 Jan 2021; 13 Oct 2020 |
| 111 | "breakfast vouchers for local eateries" | VERIFIED | NT$80 voucher usable at six nearby shops. Not on the official site. | hostelworld.com; bigsharkgogogo.tw | current; 5 Feb 2025 |
| 112 | "free walking tours" | VERIFIED | "free guided tours you can sign up for downstairs" | 1948.staymeander.com | © 2026 |
| 113 | "some private rooms with balconies" | VERIFIED | Balcony Double and Deluxe Balcony Double. | 1948.staymeander.com | © 2026 |
| 114 | "Reception runs 08:00–22:00, so a late arrival needs arranging in advance" | VERIFIED | "櫃檯服務時間為08:00-22:00" (front desk hours 08:00–22:00); arrivals after 22:00 must tell the hostel in advance. | staymeander.com/meander1948/zh/faq | official |
| 115 | TYH is "the closest bed to the station on the east side" | CORRECTED | It is **south-east**: B1, No. 11 Qingdao W. Rd, at the corner of Gongyuan Rd, below Zhongxiao W. Rd. TO: "south of the station". | taiwanyh.com/contact_t/; taiwanobsessed.com/best-taipei-hostels/ | official; 15 Jan 2026 |
| 116 | "exit M8 leaves you a minute from the door on Qingdao West Road" | VERIFIED | "roughly 2 minutes from MRT Station M8 exit" | taiwanyh.com/contact_t/ | official |
| 117 | "The capsules are roomier than most" | VERIFIED | 130 cm H × 120 cm W × 270 cm L | taiwanyh.com | official |
| 118 | "each with an electronic locker" | VERIFIED | Hostelworld: "modern electronic safe". Blogs describe card-locked storage. | hostelworld; sunnypoen101.pixnet.net | current; 25 Aug 2025 |
| 119 | "the crowd is young" | VERIFIED | "Expect to meet teens and 20-somethings" | taiwanobsessed.com/best-taipei-hostels/ | 15 Jan 2026 |
| 120 | "the one place in this guide with no windows anywhere, because it's in a basement" | VERIFIED | B1, "沒有窗戶" (no windows). It is the only property with **no** windowed rooms. Roaders, CityInn and Meander (Standard Double) also sell windowless rooms, so keep the "anywhere" wording. | taiwanyh.com; shaoshao.home.blog | official; 18 Nov 2018 (upd 2020) |

### 2i. Getting Around the Station

| # | Claim | Verdict | Correct fact / note | Source(s) | Source date |
|---|---|---|---|---|---|
| 121 | "three stations joined by a maze of underground malls" | VERIFIED | The three stations: TRA/THSR (shared building), Taipei Metro, and Airport MRT A1. They are joined by four malls: Taipei City Mall (Y), Station Front Metro Mall (Z), Zhongshan Metro Mall (R) and K Mall. | gov.taipei FAQ n=EEC70A4186D4C828 | upd 31 Aug 2024 |
| 122 | "Y exits run north-west through Taipei City Mall, towards the Airport MRT, Star Hostel and Meander" | CORRECTED | Taipei City Mall (Y1–Y28) runs **west under Civic Boulevard** for about 825 m to Beimen, linking to A1. The odd-numbered exits are on the north side. Say "run west under Civic Boulevard". | zh.wikipedia 台北地下街; tcma.gov.taipei | 2024 |
| 123 | "Z and M exits come up on Zhongxiao West Road, the south side, where Caesar Park and most of the hotels are" | VERIFIED | Station Front Metro Mall (Z1–Z10) runs 343 m under Zhongxiao W. Rd. M exits belong to the Metro station. | zh.wikipedia 站前地下街 | – |
| 124 | "R exits run north along the Zhongshan underground street" | VERIFIED | Zhongshan Metro Mall: 815 m to Shuanglian, under the linear park, open 11:00–22:00. | metro.taipei/cp.aspx?n=1DE23B423CA113D2 | undated |
| 125 | "coin and EasyCard lockers near the rail gates on B1 cost about NT$10 an hour" | CORRECTED | This mixes two systems. **Taipei Metro lockers:** NT$10/hr (small), NT$20/hr (large). **TRA station lockers (B1, near the TRA/THSR gates):** NT$40–70 per 3 hours by size. | gov.taipei news s=9E67C12B3E5D127E; railway.gov.tw locker PDF | 26 Dec 2024; upd 25 Sep 2025 |
| 126 | "the Airport MRT station has larger lockers from NT$40 for three hours" | CORRECTED | OWLocker at A1: small (42×58×42 cm) NT$40 and large (42×58×84 cm) NT$60, per 3 hours. They are **not larger** than the TRA lockers (up to 90 cm tall). Drop "larger". | tymetro.com.tw …/travel-guide/A1 | official, undated |
| 127 | "the Taipei Station Baggage Service Center a block east takes bags for the day (08:00–20:00)" | VERIFIED (hours from secondary sources) | This is TRA's luggage office (台北車站行李託運中心), tel 02-2314-1223. It is on Beiping W. Rd, about 50 m east of East Gate 東三門. 08:00–20:00. NT$30/50/70 per day by size. TRA lists the office but not the hours. | railway.gov.tw viewStaInfo/1000; frameless-tw.com/2025taipeistationluggagedeposit | 24 Feb 2025 |

---

## 3. Per-hotel verified fact sheets (A–E)

Prices: Wed 11 to Thu 12 Nov 2026, 2 adults (dorms 1 adult), checked 27 Sep 2026. K = Klook (converted at £1 = NT$42.08), B = Booking.com.

Walks: A1 = from the Airport MRT A1 station; Stn = from the TRA station building. All GM walks were run on 27 Sep 2026.

"Coverage" counts distinct editorial domains (fh = first-hand stay).

### 3.1 Palais de Chine Hotel (君品酒店台北)

**A. Official facts**
- **Name and address:** Palais de Chine Hotel Taipei. No. 3, Sec. 1, Chengde Rd, Datong Dist.
- **Floors:**
  - 1F: service centre
  - 6F: lobby
  - 7–16F: rooms
  - 17F: Le Palais, Le Salon lounge and Vite Gym
- **Rooms:** 286 (Michelin; not stated officially). Superior rooms are 30 m². Balconies in most or all rooms (Michelin, rainieis, Travel Codex).
- **Opened:** 2010.
- **Check-in / out:** 15:00 / 11:00.
- **Facilities:**
  - No pool.
  - **Le Salon** (17F, 10:30–22:30): executive-floor guests only, age 12+.
  - Kids' playroom on 10F (rainieis 2023; not official).
  - Free parking on B4/B5.
  - Free **A1 shuttle**, 11:00–16:00, booking required.
- **Sources:** palaisdechinehotel.com (…/rooms/25/7, …/rooms/28/8/49, …/pages/53/0/271). Official, undated.

**B. Walks**
- **Official directions:** "Exit Taipei Main Station via Exit Y5, turn right onto Chengde Road".
- **GM:** A1 6 min / 400 m; Stn 6 min / 400 m.
- **rainieis.tw:** 3 min from A1.

**C. Price**
- **NT$6,700–7,300.** K £159.43–170.72; B Superior Double NT$7,333.

**D. Windows**
- Not a budget hotel; balconies are standard.

**E. Coverage: 6 English + 11 Chinese domains = 17**
- **English:**
  - guide.michelin.com (hotel page, no Key)
  - TO/NK (fh hosted stay, 28 Jul 2026)
  - taiwanderers.com (26 Apr 2025)
  - travelcodex.com (fh paid, Jan 2024)
  - twobytheworld.com (one line, 2025)
  - arosieworld.com (fh, undated)
- **Chinese, first-hand:**
  - nigi33.tw (fh, Feb 2023)
  - rainieis.tw (fh stay Dec 2020, published Nov 2023)
  - shin.tw (fh 2020, updated Sep 2026)
  - boniutravel.com (fh, Sep 2023)
- **Chinese roundups:**
  - bobbytravel.tw (Aug 2026, "實住", i.e. claims a real stay; contains errors)
  - vivianexplore.tw (fh, Jun 2026)
  - wkitty.tw (Aug 2026)
  - gowithmarkhazyl.com (Mar 2026)
  - followtotravel.com (Jan/Mar 2026)
  - mimigo.tw (Aug/Sep 2026)
  - momoblog.tw (Aug 2026)
- **Not counted:** ptt.cc (forum, first-hand, Apr 2023).

### 3.2 Caesar Park Hotel Taipei (台北凱撒大飯店)

**A. Official facts**
- **Address:** No. 38, Sec. 1, Zhongxiao W. Rd, Zhongzheng.
- **Rooms:** 478. 20 storeys.
- **History:** Opened 1973 as the Hilton; renamed 2003. Renovated 2012; Superior rooms redone from Dec 2020.
- **Check-in / out:** 15:00 / 12:00.
- **Facilities:**
  - 6F: Health Club and **coin laundry**
  - 21F: roof garden
  - Starbucks on 1F
  - Spa
  - No pool, no club lounge.
- **Sources:** taipei.caesarpark.com.tw (/en/about/, /en/facilities/, /en/room-detail/SuperiorRoom/). Official, undated.
- **Unconfirmed:** 24-hour reception.

**B. Walks**
- **Official:** "directly connected to Exit M6"; B1 lift to the lobby. From A1, go via the K-area mall to exit K12.
- **GM:** A1 8 min / 550 m; Stn 7 min / 400 m (street route).

**C. Price**
- **NT$3,100–3,700.** K £74.01; B NT$3,661.

**D. Windows**
- Not an issue (no windowless types listed).

**E. Coverage: 2 English + 10 Chinese = 12**
- **English:** TO/NK (Feb 2026, "notably dated"); taiwanderers.com (Apr 2025).
  - oyster.com is not counted (TripAdvisor-owned).
- **Chinese, first-hand:**
  - rainieis.tw (fh, stay Dec 2020, published Oct 2021)
  - wisely.tw (fh, Jun 2025)
  - adontrip.com (May 2021, Jan 2024)
  - followmii.tw (fh, Aug 2020)
  - walkerland.com.tw (fh, sponsored, Apr 2023)
- **Chinese roundups:** bobbytravel.tw (fh, 2026), wkitty.tw, gowithmarkhazyl.com, mimigo.tw, momoblog.tw (all 2026).

### 3.3 Hotel Resonance Taipei, Tapestry Collection by Hilton (臺北時代寓所)

**A. Official facts**
- **Address:** No. 7, Linsen S. Rd, Zhongzheng.
- **Rooms:** 175. 14 floors.
- **Opened:** 2 Dec 2020.
- **Facilities:**
  - 24-hour gym (3F)
  - Free guest laundry (3F; one 2024 source says coin-operated)
  - BEING SPA (2F)
  - No pool, no restaurant or bar (Starbucks downstairs serves breakfast).
- **Check-in / out:** 15:00 / 12:00 (bloggers; hilton.com returned 403).
- **Sources:** stories.hilton.com release (2 Dec 2020); taiwanstay hohi_id=28176.

**B. Walks**
- **Shandao Temple MRT:** exit 3 or 4, about 1 min.
- **GM:** Stn 15 min / 1.0 km; A1 20 min / 1.4 km.

**C. Price**
- **NT$10,250.** K Twin £243.61 ≈ NT$10,251; B Twin NT$10,248.
- **The most expensive hotel in the guide.**

**D. Windows**
- n/a (Klook lists "With window").

**E. Coverage: 5–6 English + 7 Chinese = about 12**
- **English:**
  - timeout.com (17 Sep 2024)
  - headforpoints.com (fh, 18 Nov 2023)
  - hotelsandairlines.blog (fh, 22 Mar 2022)
  - planebetter.com (fh, 29 Oct 2023)
  - kindaboringtravels.com (fh, 2 Nov 2024)
  - supertravelme.com (unreachable; snippet)
- **Chinese, first-hand:** yama.tw (Apr 2021), mimigo.tw (Jul 2026), vivianexplore.tw (Jul 2026), lexie.tw (Feb 2023).
- **Chinese roundups:** followtotravel.com, momoblog.tw, hk01.com (HK media, 9 Sep 2026).

### 3.4 Sheraton Grand Taipei Hotel (台北寒舍喜來登大飯店)

**A. Official facts**
- **Address:** No. 12, Sec. 1, Zhongxiao E. Rd.
- **Rooms:** 683 (official site: 615 + 68 suites); 688 on the register and Michelin.
- **History:** Opened 1981; 16 storeys; refurbished 2005.
- **Facilities:**
  - **Outdoor rooftop pool on 18F, closed in January and February**
  - Gym 17–18F
  - Sauna (age 15+)
  - Spa
  - Executive lounge
  - 9 restaurants
- **Check-in / out:** 15:00 / 12:00 (blogger; marriott.com returned 403).
- **No official star rating** on the register.
- **Closures:** Ladies' sauna closed 7–11 Sep 2026; no other closure.
- **Sources:** sheratongrandtaipei.com; taiwanstay hohi_id=9474.

**B. Walks**
- **Shandao Temple MRT:** exit 2, about 2 min (exit 3 has the lift).
- **GM:** Stn 12 min / 850 m; A1 17 min / 1.2 km. Fu Hang Soy Milk 4 min / 300 m.

**C. Price**
- **About NT$8,500.**
  - K Superior King £202.06 ≈ NT$8,503.
  - Agoda: "from £202", the same supply as Klook, so not independent.
  - Booking.com did not list the property under any URL tried.
  - **Only one effective source.**

**D. Windows**
- n/a.

**E. Coverage: 4 English + 5 Chinese = 9**
- **English:** guide.michelin.com (undated); TO/NK (nickkembel 2026); taiwanderers.com (Aug 2026); afoodieworld.com (fh, 11 Nov 2025).
- **Chinese:**
  - vivianexplore.tw (fh, Jul 2026)
  - ajtravel.tw (fh; date unclear, 2022/2026)
  - havefunday.com (fh, undated)
  - bobbytravel.tw (fh, 2026)
  - mimigo.tw (2026)

### 3.5 citizenM Taipei North Gate (台北北門世民酒店)

**A. Official facts**
- **Address:** No. 3, Sec. 1, Zhonghua Rd, **Zhongzheng** (Michelin wrongly says Zhongshan).
- **Size:** 26 floors. **265 rooms** (Marriott snippet, Michelin, Klook); 267 per Wallpaper 2022.
- **Brand:** Now booked through Marriott. The acquisition completed 23 Jul 2025, and citizenm.com redirects to Marriott.
- **Facilities:**
  - canteenM is 24/7; breakfast 06:00–11:00. Lounge on 2F.
  - One room type, about 15 m², XL bed, shower only. No windowless rooms.
  - No gym and no laundry found.
- **Check-in / out:** 14:00 / 11:00 (blogger).
- **Children:** age 10 and under free if sharing beds (vivianexplore, Jul 2026).
- **Sources:** marriott.com dining/rooms pages (partly 403); news.marriott.com (23 Jul 2025).

**B. Walks**
- **Official directions:** none found.
- **Taiwanderers:** A1 "about 6 minutes door to door".
- **iwandered (2018):** "3 minute walk".
- **TO:** from Z Mall exit Z10, "a bit of a trek".
- **GM:** A1 11 min / 700 m; Stn 14 min / 1.0 km; Beimen MRT 300 m.

**C. Price**
- **NT$3,650–3,700.** K £87.09; B King NT$3,700.
- **Saturday 14 Nov:** NT$5,000 (B).

**D. Windows**
- All rooms have windows.

**E. Coverage: 6 English + 8 Chinese = 14**
- **English:**
  - guide.michelin.com (listing, no Key)
  - wallpaper.com (Jul 2022)
  - taiwanderers.com (fh, Aug 2026)
  - TO/NK (Feb 2026)
  - psimonmyway.com (Jul 2026, not fh)
  - iwandered.net (fh, Feb 2018)
  - Not counted: liveloveran.com (unreachable, HTTP 525).
- **Chinese, first-hand:**
  - vivianexplore.tw (fh, Jul 2026)
  - bobowin.blog (fh, Jan 2024)
  - ciaotw.com (Aug 2024, likely media)
  - acisni2146.pixnet.net (fh, Oct 2018)
  - kuolife.com (fh, 2025/26)
- **Chinese roundups:** wkitty.tw, gowithmarkhazyl.com, followtotravel.com (2026).
- **Other Pixnet stays** from 2018–19 were seen in snippets only and not counted.

### 3.6 Roaders PLUS Hotel – Taipei Station (路徒PLUS行旅-站前館)

**A. Official facts**
- **Address:** No. 80, Sec. 1, Zhongxiao W. Rd. Lobby on 4F; rooms on 24F–35F.
- **Rooms:** 128. Opened 2021.
- **Room types:** 10.
  - Standard Double: **no window**
  - Superior Double
  - Premium Double
  - Premium Twin
  - Executive Double (101 view): no bathtub
  - Deluxe Double w/ Bathtub
  - Luxury Double
  - Deluxe Triple
  - Family
  - Deluxe Family
  - **No single rooms.**
- **Facilities:**
  - 24-hour reception and luggage storage (official)
  - Kids' playroom 09:00–21:00
  - Coin laundry NT$50
  - Table football, darts and projector
- **Check-in / out:** 15:00 / 11:00 (blogger).
- **Children:** accepted and family-oriented. The lead guest must be 18+ (Trip.com snippet).
- **Sister hotel:** Roaders PLUS **Theme** is on 5F–12F of the same building. Make sure readers book "Taipei Station".
- **Sources:** roadersplushotel.com/en/; fawn-group.com/brand.php?ID=12.

**B. Walks**
- **Exits:** beside exit **Z8** (stairs); Z2 or Z4 have lifts.
- **GM:** A1 **4 min / 260 m** (the closest hotel in the guide to A1); Stn 6 min / 400 m.

**C. Price**
- **Superior Double NT$4,140–4,280.** K £98.46; B NT$4,280.
- **Executive Double:** NT$4,480–4,580.
- **Deluxe Double with bathtub:** NT$5,360–5,480.
- **Saturday 14 Nov:** NT$8,080 (B).

**D. Windows**
- The **cheapest type (Standard Double) is windowless**. It was not on sale for the date checked.

**E. Coverage: 1 English + 7 Chinese = 8**
- **English:** TO/NK only (fh favourite, Feb 2026).
  - Taiwanderers reviews **Roaders Hotel Zhonghua**, not this hotel. The first pass rightly didn't count it.
- **Chinese:**
  - katesfunzone.com (fh, Sep 2021)
  - dalang.tw (sponsored, Oct 2021)
  - yenliving.com (sponsored, Nov 2021)
  - gowithmarkhazyl.com (fh, Jan 2026)
  - from20smoretravel.blog (fh, May 2026)
  - momoblog.tw (Aug 2026)
  - hk01.com (Sep 2026)
  - Not counted: hippolife.tw (Nov 2025) reviewed the Theme branch.

### 3.7 Hotel Relax III (旅樂序精品旅館站前三館)

**A. Official facts**
- **Address:** No. 34 Huaining St, Zhongzheng.
- **Rooms:** 41, floors 1–8, opened 2015 (mrhost blog, 2024).
- **Official services:**
  - 24-hour desk
  - Free luggage storage for 72 hours
  - Coin laundry NT$50
  - Free 24-hour drinks
  - "Welcome drink/ Buckskin Beer"
- **Breakfast:** not mentioned officially.
- **Children:** accepted. Ages 0–5 free without an extra bed; 5+ pay NT$880 (notice page) or NT$1,000 (Q&A page). The site contradicts itself.
- **Sister hotels near the station:** Relax I, II and V.
- **Sources:** relax3.hotelrelaxclub.com (/en/notice, /en/facility/content/1507, /1494, /en/room/content/2046).

**B. Walks**
- **Official:** names K12 as the nearest exit for the Airport MRT, with no time.
- **TO:** exits Z4/Z6, "walk 1-2 blocks south". retrievertrip says Z8.
- **GM:** A1 8 min / 550 m; Stn 8 min / 550 m.

**C. Price**
- **NT$2,640–3,230.** K Standard Double £62.76; B NT$3,229.
- **Official engine:** from NT$2,184 (Sep 2026).
- **Saturday:** B showed no availability.

**D. Windows**
- The engine lists "經典雙人房(無窗)" (Classic Double, windowless).
- The cheapest Standard Double is **not** labelled windowless. Whether it has a window is unverified.

**E. Coverage: 2 English + 3–4 Chinese = 5–6**
- **English:** TO/NK (fh, Feb 2026); taiwanderers.com (fh; stay year not given; updated Aug 2026).
- **Chinese:**
  - angelala.tw (fh, Jan 2018; old)
  - retrievertrip.com (Jan 2026)
  - gowithmarkhazyl.com (Mar 2026)
  - mrhost blog (2024; host company, weak)
- **Roundups naming other branches only:** bobbytravel, mimigo and momoblog name 二館 (Branch II); followtotravel names 五館 (Branch V); hk01 names 一館 (Branch I). Not counted for III.

### 3.8 CityInn Hotel Taipei Station Branches I, II and III (新驛旅店台北車站一館/二館/三館)

**A. Official facts**
- **Branch I:**
  - Address: No. 7 Huaining St, Zhongzheng (south side).
  - 51 rooms (register), renovated Oct 2018 (snippet).
  - Standard rooms windowless; Deluxe includes a balcony.
  - Free laundry, 2F drinks bar, instant noodles after 22:00.
- **Branch II:**
  - Address: No. 81 Chang'an W. Rd, Datong (the register says No. 83).
  - 50 rooms.
  - 7F renovation from 31 Mar to 31 Dec 2026 (snippet).
  - Free laundry and 24-hour snacks (official).
- **Branch III:**
  - Address: No. 77 Chang'an W. Rd.
  - 66 rooms.
  - No breakfast (McDonald's delivery can be ordered).
  - 24/7 front desk (Trip.com).
  - Check-in 15:00, check-out 12:00.
- **All branches:** no extra beds.
- **Child policy:** see claim #91; contested.
- **Sources:** c1/c2/c3.cityinn.com.tw; booking.taipeiinngroup.com room pages; taiwanstay hohi_id=11647 / 20348 / 17029.

**B. Walks**
- **Branch I:** official "about 3 min" from the MRT. GM: A1 7 min / 450 m; Stn 6 min / 450 m.
- **Branch II:** official 5 min from Y13. GM: A1 8 min / 550 m; Stn 8 min / 550 m.
- **Branch III:** official 5 min from Y7. GM: A1 7 min / 500 m; Stn 8 min / 550 m.

**C. Price**

| Branch | Windowless Standard | Windowed Standard |
|---|---|---|
| I | NT$2,840–3,590 (K £67.39; B NT$3,591) | – |
| II | NT$2,210–2,400 (K £52.55; B NT$2,400) | NT$2,850–2,880 |
| III | NT$2,210–2,400 (same as II) | NT$2,850–2,880 |

- **Saturday 14 Nov, Branch III:** NT$6,600 (B).

**D. Windows**
- The cheapest room at every branch is windowless (official wording is in claim #89).

**E. Coverage: 1 English + 10 Chinese = 11**
- **English:** TO/NK (Feb 2026). Taiwanderers does **not** mention CityInn; the first pass said it did in passing.
- **Chinese, first-hand:**
  - shin.tw (Branch I, fh 2019, updated Sep 2026)
  - minako.tw (fh, Sep 2024; branch unclear)
- **Chinese roundups:**
  - retrievertrip.com (Branch II, Jan 2025)
  - bobbytravel.tw (II)
  - wkitty.tw (I)
  - gowithmarkhazyl.com (III)
  - followtotravel.com (II)
  - mimigo.tw (II)
  - momoblog.tw (I)
  - hk01.com (I)
  - All 2026.

### 3.9 Star Hostel Taipei Main Station (信星青年旅館)

**A. Official facts**
- **Address:** 4F, No. 50 Huayin St, Datong. Opened 2014. HOSCAR winner 2017 and 2018.
- **Hours:**
  - Front desk 07:00–23:00, with self check-in after 23:00.
  - Check-in 15:00, check-out 11:00.
- **Minimum stay:** 2 nights (single nights released later).
- **Age:** dorms 18+.
- **Breakfast:** 8–10am, plus early-bird toast from 6am.
- **Luggage:** room open 07:00–23:00, free.
- **Rooms:**
  - Dorms: 8-bed (5F, stairs only) and 6-bed.
  - Private rooms for 1–4.
- **Facilities:** coin laundry (24h), kitchen, rooftop garden.
- **Sources:** starhostel.com.tw (/faq, /facilities, /rooms, /share-rooms, /about-tw).

**B. Walks**
- **Hostel map:** A1 → Y16U → exit **Y13**.
- **Hostelworld:** 5 min from A1, 7 min from the station.
- **GM:** A1 5 min / 350 m; Stn 8 min / 550 m.

**C. Price** (2 nights, per night)
- **Dorm bed NT$995–1,170** (B).
- **Double NT$3,042**; Single NT$2,399 (18 Nov).
- Klook: no availability.

**D. Windows**
- Standard dorms have skylights. The lounge has large windows.
- Windowless private rooms: none found.

**E. Coverage: 6 English + 8 Chinese = 14**
- **English:**
  - TO/NK (fh, Jan/Feb 2026)
  - taiwanderers.com (Aug 2026)
  - mstravelsolo.com (fh twice, stays undated; page May 2026)
  - hostelgeeks.com (May 2026)
  - roadaffair.com (Dec 2023)
  - thisremotecorner.com (Sep 2026)
- **Chinese:**
  - yama.tw (fh, Apr 2021)
  - monkeywalker.com (fh, Jan 2023)
  - vocus.cc (fh, undated)
  - retrievertrip.com (2026)
  - vivianexplore.tw (2026)
  - gowithmarkhazyl.com (2026)
  - followtotravel.com (2026)
  - hk01.com (2026)

### 3.10 MEANDER 1948 (漫步1948)

**A. Official facts**
- **Address:** No. 42 Taiyuan Rd, Datong. On the corner with Huayin St, above a 7-Eleven.
- **Building:** built 1948 (Shilin Paper Co. HQ); a hostel since 2019 (snippet).
- **Hours:**
  - Front desk 08:00–22:00.
  - Check-in 15:00–22:00, check-out 11:00.
- **Luggage:** room open 08:00–22:00. Overnight storage NT$100 per bag.
- **Rooms:**
  - Dorms: 4-bed and 8-bed mixed, 8-bed female.
  - Privates: Standard Double (**no window**), Superior Double, Balcony and Deluxe Balcony Doubles, shared-bath doubles and twins, triple, quads.
- **Facilities:** free tours; 4F lounge, kitchen and coin laundry.
- **Breakfast:** NT$80 voucher (Hostelworld and a 2025 blog; not on the official site).
- **Unknown:** age limit and minimum stay.
- **Domain warning:** **the official site is now 1948.staymeander.com.** meander.com.tw serves gambling spam; do not link it.

**B. Walks**
- **Official:** "approximately 7 minutes on foot".
- **drbackpacker:** 1 min from Y13.
- **GM:** A1 8 min / 550 m; Stn 9 min / 600 m. Star Hostel is 56 m away.

**C. Price**
- **Dorm NT$1,070–1,080.** K £25.43; B NT$1,080.
- **Shared-bath double** NT$3,000.
- **Windowless Standard Double** NT$3,600 (B).
- **Balcony Double** NT$4,800 (B).
- Official "from US$22" per dorm bed.

**D. Windows**
- The Standard Double is windowless (official: "With no window, enjoy total solitude").

**E. Coverage: 2–3 English + 10 Chinese = about 12**
- **English:**
  - mstravelsolo.com (fh, undated stay)
  - thisremotecorner.com (Sep 2026)
  - hostelgeeks.com: mixed, "a beautiful boutique hostel, yet not very social!". It advises choosing Meander Ximen instead.
- **Chinese, first-hand:**
  - sllifetrip.com (fh, Jan 2021)
  - drbackpacker.com (fh, Oct 2020)
  - bigsharkgogogo.tw (fh, Feb 2025)
- **Chinese roundups:**
  - retrievertrip.com (Jan 2026)
  - vivianexplore.tw
  - gowithmarkhazyl.com
  - followtotravel.com
  - mimigo.tw
  - lifeinpocket.com (undated)
  - hk01.com

### 3.11 Taiwan Youth Hostel & Capsule Hotel (台灣青旅膠囊旅店)

**A. Official facts**
- **Address:** B1, No. 11 Qingdao W. Rd, Zhongzheng, at the corner of Gongyuan Rd.
- **Licence:** Taipei hotel licence No. 584.
- **Reception:** 24 hours. Check-in 15:00–23:00.
- **Rooms:**
  - Capsules 130 × 120 × 270 cm, single or double-size, with lockers.
  - Women-only area.
  - Private 獨立雅房 room (shared bathroom).
- **Facilities:** kitchen, laundry, AV room and PS4.
- **Breakfast:** probably **no longer served** (fh blog, Aug 2025).
- **Sources:** taiwanyh.com (/contact_t/); Hostelworld.

**B. Walks**
- **Official:** about 2 min from exit M8.
- **GM:** Stn centre 10 min / 700 m; A1 13 min / 850 m.
- **Not close to A1.** It suits arrivals by Metro or HSR.

**C. Price**
- **Dorm NT$855–900** (B); double-size bunk NT$1,125–1,215 (B), about NT$1,200 (K).
- **Double room** NT$1,665–1,800 (B).
- Official "from NT$650".

**D. Windows**
- **No windows at all** (basement).

**E. Coverage: 3 English + 6 Chinese = 9**
- **English:**
  - TO/NK (Jan 2026)
  - roadaffair.com (Dec 2023)
  - hostelgeeks.com (May 2026; its "free breakfast" is probably out of date)
- **Chinese, first-hand:**
  - shaoshao.home.blog (fh, 2018/2020)
  - mq2.tw (fh, Jun 2018)
  - bksuger.com (fh, Sep 2018)
  - sunnypoen101.pixnet.net (fh, **Aug 2025**, the only recent first-hand stay)
- **Chinese roundups:** wkitty.tw (2026); lifeinpocket.com (undated).
- **Caveat:** most first-hand evidence is from 2018.

### 3.12 Chinese-language roundups used (section E)

Twelve distinct roundup articles, excluding booking engines, aggregators and funtime.com.tw (a price-comparison site):

| # | Domain | Date |
|---|---|---|
| 1 | bobbytravel.tw | 25 Aug 2026 |
| 2 | vivianexplore.tw | 16 Jun 2026 |
| 3 | wkitty.tw | 1 Aug 2026 |
| 4 | gowithmarkhazyl.com | 12 Mar 2026 |
| 5 | followtotravel.com | Jan / Mar 2026 |
| 6 | mimigo.tw | Aug / Sep 2026 |
| 7 | momoblog.tw | 1 Aug 2026 |
| 8 | retrievertrip.com | 2 Jan 2026 |
| 9 | kuolife.com (hostels) | Apr 2025 / Jan 2026 |
| 10 | kuolife.com (cheap hotels) | Apr 2025 / Jan 2026 |
| 11 | lifeinpocket.com | undated |
| 12 | hk01.com | 9 Sep 2026 |

- The two kuolife.com articles (#9 and #10) are from **one publisher**. That makes 11 distinct publishers.
- travel.yam.com (2023) named no hotel in this guide.

**Mentions per hotel across the 12 articles:**

| Hotel | Articles naming it |
|---|---|
| Palais de Chine | 8 |
| **OwlStay Flip Flop** (not in the draft) | 8 |
| CityInn | 7 |
| Meander 1948 | 7 |
| Relax (any branch) | 6 |
| Star Hostel | 6 |
| Caesar Park | 5 |
| **Cosmos** (not in the draft) | 5 |
| citizenM | 4 |
| **Via Hotel 丰居北車館** (not in the draft) | 4 |
| Resonance | 3 |
| Roaders Plus Station | 2 |
| Sheraton | 2 |
| Taiwan Youth Hostel | 2 |

---

## 4. Recommended corrections to the draft (exact change lines)

**Intro and Quick Verdict**
1. Change "Every Metro line, the high speed rail and the airport train all meet here, so you can drop your bags within minutes of stepping off the train and reach almost anywhere in the city without a change." to "Two Metro lines, the regular and high speed railways and the airport train all meet here, so you can drop your bags within minutes of stepping off the train and reach most of the city in one change at most."
2. Change "This guide covers the hotels and hostels within about ten minutes' walk" to "This guide covers hotels and hostels within about ten minutes' walk, plus two a short hop east".
3. Change "from station-linked luxury to the best hostel in Taipei" to "from station-side luxury to what many rate as the best hostel in Taipei".
4. Change "citizenM Taipei North Gate – the most widely recommended hotel in the area, about five minutes from the Airport MRT." to "citizenM Taipei North Gate – the most recommended hotel in English-language guides, five to ten minutes from the Airport MRT."
5. Change "Palais de Chine, connected to the station underground." to "Palais de Chine, a few minutes from the Airport MRT, with a Michelin three-star restaurant."
6. Change "Sociable mid-range: Roaders Hotel." to "Sociable mid-range: Roaders PLUS Hotel – Taipei Station." Rename the link text and the h3 "Roaders Hotel" to "Roaders Plus" throughout.
7. Change "Arriving late with luggage? Stay on the north side, nearest the Airport MRT exits." to "Arriving with heavy luggage? Stay at the west end of the station, nearest the Airport MRT – Roaders Plus, Star Hostel and Palais de Chine are all within about five minutes."

**Why Stay**
8. Change "Express trains reach Taoyuan Airport in about 35–37 minutes." to "Express trains reach Taoyuan Airport in 35 minutes (Terminal 1) or 39 minutes (Terminal 2)."
9. Change "China Airlines, EVA Air, Cathay Pacific and STARLUX passengers" to "China Airlines, Mandarin Airlines, EVA Air, Uni Air, Cathay Pacific and STARLUX passengers".
10. Change "With big bags and a late arrival, the north side saves the longest underground walk." to "With big bags, what matters is being at the west end, near the Airport MRT; note that Meander's reception closes at 22:00."

**Comparison table**
11. Palais row: change "Linked underground" to "3 mins (exit Y5)", and "Upscale" to "From around NT$7,000".
12. citizenM row: change "From around NT$3,100" to "From around NT$3,700".
13. Caesar Park row: change "Upper mid-range" to "From around NT$3,100–3,700". Keep "Opposite, linked underground".
14. Roaders row: change "Roaders Hotel" to "Roaders Plus", and "NT$3,000" to "From around NT$4,200".
15. Relax III row: change "Budget" to "From around NT$2,600–3,200".
16. CityInn row: change "1–5 mins" to "3–10 mins", and "NT$2,500" to "From around NT$2,200 (windowless)".
17. Star Hostel row: change "NT$2,700 room, NT$900 bunk" to "NT$2,400–3,000 room, NT$1,000–1,200 bunk".
18. Meander row: change "Dorm beds from around NT$725" to "Dorm beds around NT$700–1,100".
19. Add a Resonance/Sheraton row, or a line under the table: "Hotel Resonance from around NT$10,000; Sheraton Grand from around NT$8,500."
20. Change "Prices are typical weekday rates and swing a lot at weekends and around holidays." to "Prices are weekday rates checked in September 2026 for a November stay; Saturday rates are often close to double."

**Palais de Chine**
21. Change "and the only one connected to it underground as well as to Q Square mall above the bus station. It's close to the Airport MRT, which matters with heavy bags." to "It's in the same building as Q Square mall above the bus station, and three minutes from exit Y5. It's close to the Airport MRT, which matters with heavy bags, and runs a free shuttle from the Airport MRT station (11:00–16:00, book ahead). Check-in is at the 6th-floor lobby."
22. Change "standard rooms are on the compact side, though the bathrooms are big" to "one reviewer found the standard rooms (30 m², most with balconies) smaller than expected, though the bathrooms are big".

**Caesar Park**
23. Change "Directly opposite the station and linked underground, which makes it hard to beat on location." to "Directly opposite the station and the only hotel here with a genuine underground link – a lift from exit M6 takes you up to reception – which makes it hard to beat on location."
24. Change "so the higher, renovated floors are the ones to ask for" to "so ask for one of the renovated rooms".
25. Optional add: "There's a coin laundry on the 6th floor."

**One stop east**
26. Change "sit about ten minutes' walk east" to "sit ten to fifteen minutes' walk east".
27. Change "is the only station-area hotel on Time Out's Taipei list, praised for room size and soundproofing" to "is the only station-area hotel on Time Out's Taipei list, and reviewers praise its big rooms. It's also the priciest hotel in this guide, and has no restaurant or pool."
28. Change "is a full-service five-star with an outdoor pool" to "is a full-service luxury hotel with a rooftop outdoor pool (closed in January and February)".
29. Change "take the MRT one stop or a short taxi" to "take a taxi from the rank on the Airport MRT's B1 level – the Metro route still involves a long walk underground".

**citizenM**
30. Change "The hotel with the broadest support of any near the station – seven separate publications recommend it, from the Michelin Guide to Wallpaper." to "The most recommended hotel near the station in English-language guides – from the Michelin Guide to Wallpaper."
31. Change "It's about five minutes from the Airport MRT" to "It's five to ten minutes from the Airport MRT".

**Roaders Plus**
32. Change "three to five minutes from exit Z4, so even the cheaper rooms come with a view over the station" to "right by exit Z8 (use Z2 or Z4 for a lift), and almost every room has a view over the station".
33. Change "Singles start around NT$2,000 but have no window; the executive doubles, around NT$4,000, have a bath." to "Doubles start around NT$4,200 on weekdays; the cheapest standard doubles have no window, and you need a deluxe double (around NT$5,400) or bigger for a bath. Book the Taipei Station hotel (24th–35th floors), not the Roaders Plus Theme hotel lower in the same building."

**CityInn**
34. Change "Branch 1 is the one for heavy luggage, beside the station itself, and a handful of its rooms have balconies." to "Branch 1 is on the south side, three minutes' walk from the station, and its deluxe rooms have balconies."
35. Change "Branch 3 is a couple of blocks north on Chang'an West Road, the quieter side, nearer Zhongshan MRT; Branch 2 is a similar five-minute walk." to "Branches 2 and 3 are next door to each other a couple of blocks north on Chang'an West Road, five minutes from exits Y7 and Y13."
36. Change "Travelling with children? CityInn doesn't accept them – look at the family rooms at Roaders instead." to "Travelling with children? Several booking sites say CityInn no longer takes them, so check with the hotel – or look at the family rooms at Roaders Plus, or at Hotel Relax, which does take children." The same line on best-areas-and-hotels-to-stay ("Note that CityInn doesn't accept children") should get the same softening.

**Hotel Relax III**
37. Change "free snacks and a beer voucher on arrival. Rooms are small and breakfast comes as a box from reception" to "free drinks round the clock and a welcome beer. Rooms are small and breakfast isn't reliably included".
38. Change "and one of two small Relax hotels near the station" to "and one of four small Relax hotels near the station".

**Star Hostel**
39. Change "about three minutes from exit Y7" to "a couple of minutes from exit Y13".
40. Change "Breakfast is included, served in time slots" to "Breakfast is included (8–10am)".
41. Change "The catch is the two-night minimum, and weekends fill weeks ahead." to "The catch is the two-night minimum (single nights are released nearer the date), and weekends fill up early. Dorms are 18+."

**Meander 1948**
42. Change "Just across the street from Star Hostel, in a building from the 1940s" to "Just across the street from Star Hostel, in a 1948 building". Optional add: "The cheapest double has no window."
43. Link the official site as https://1948.staymeander.com, **never** meander.com.tw (now a gambling spam page).

**Taiwan Youth Hostel**
44. Change "The closest bed to the station on the east side" to "The closest bed to the station on the south-east side". Optional add: "It's a long walk from the Airport MRT, so it suits Metro or rail arrivals."

**Getting Around the Station**
45. Change "Y exits run north-west through Taipei City Mall" to "Y exits run west under Civic Boulevard through Taipei City Mall".
46. Change "coin and EasyCard lockers near the rail gates on B1 cost about NT$10 an hour, the Airport MRT station has larger lockers from NT$40 for three hours" to "Metro lockers cost NT$10–20 an hour, the railway lockers on B1 NT$40–70 for three hours, and the Airport MRT station has lockers from NT$40 for three hours".
47. Change "the Taipei Station Baggage Service Center a block east" to "the railway's baggage office on Beiping West Road, just outside the East Gate,".

**New content to consider (see section 5)**
48. Add a note that the Taipei Twin Towers site beside the Airport MRT station and Q Square is under construction until about 2027, and that the TRA station hall is being refitted from December 2026.

---

## 5. Remaining gaps and things the draft omits (section G)

**Omissions a traveller would want to know**
- **Construction.**
  - The Taipei Twin Towers (台北雙星, C1/D1) at No. 8 Zhengzhou Rd, directly above and beside A1 and next to Q Square / Palais de Chine, have been under construction since Nov 2022. C1 steel reached about floor 41 around Apr–May 2026. Completion is due Dec 2027 and opening 2029 (snippet).
  - No official A1 entrance closures were found, but expect hoardings and noise on the north-west side.
  - Sources: nownews.com/news/6637943 (21 Jan 2025); chinatimes (28 Apr and 8 May 2026); zh.wikipedia 台北雙星.
- **TRA station hall refit.** Shin Kong Mitsukoshi is leading a refit of over NT$1 billion. Phase 1 (1F hall) runs from Dec 2026 to about Apr 2027; phases 2–3 (2F and B1) start in June 2027. At least 70% of the station stays open. Source: cna.com.tw/news/ahel/202609120083.aspx (12 Sep 2026). Please confirm, because one summary misdated this as Dec 2025.
- **A1 to the Metro lines is 10–15 minutes on foot** (Taoyuan Metro). This matters for the "take the MRT one stop" advice.
- **Omitted hotels with better support than some included ones:**
  - **OwlStay Flip Flop Hostel** (故事所夾腳拖的家). Named in 8 of 12 Chinese roundups, more than Star Hostel. The first pass kept it as a candidate but it isn't in the draft. There are two branches (Garden at No. 122 Chang'an W. Rd, and "Station"); the Station branch address is still unconfirmed.
  - **Cosmos Hotel Taipei** (天成大飯店). No. 43, Sec. 1, Zhongxiao W. Rd, beside exit M3, 226 rooms, opened 1979. Named in 5 of 12 Chinese roundups, the same as Caesar Park. A 2025 official five-star rating is reported only by zh.wikipedia and is not confirmed on the register.
  - **Via Hotel 丰居旅店北車館.** Named in 4 of 12. The first pass rejected it as borderline.
  - **Holiday Inn Express Taipei Train Station** (臺北車站智選假日酒店, IHG). No. 73, Sec. 1, Chongqing N. Rd. 150 rooms, opened 2025, about 8 min north. Named by momoblog only (plus ihg.com, snippet).
  - **PORTRAIT Hotel 鉑萃酒店.** No. 1, Lane 2, Zhongshan S. Rd, 3 min from exit M8. 80 rooms, due to open **mid-September 2026**. Opening not yet confirmed. Sources: travel.ettoday.net/article/3125837.htm; bella.tw.
- **Useful facts the draft leaves out:**
  - Caesar Park and Hotel Resonance: guest laundry (coin and free respectively).
  - Palais de Chine: free A1 shuttle and a 6F lobby.
  - Relax III: accepts children.
  - Star Hostel: dorms 18+ and 5F dorms by stairs only.
  - Meander: the cheapest double is windowless.
  - Taiwan Youth Hostel: 24-hour reception and (probably) no breakfast.
  - Sheraton: pool closed Jan–Feb.
- **Airport MRT fare.** NT$160, and the NT$10 discount ended in Jan 2025. Fix this in the first-pass notes and anywhere else on the site that quotes NT$150.
- **Fuhang Soy Milk** lost its Bib Gourmand in 2023 and is closed on Mondays. Check the site's /fuhang-soy-milk page for a stale "Michelin" mention (not checked here).

**Gaps not closed**
- **Official Hilton and Marriott pages** (Resonance, Sheraton, citizenM) returned 403. Check-in times and some facilities there come from 2026 bloggers.
- **metro.taipei exit maps** would not render. The exit letters come from hotel sites, the gov.taipei FAQ, Wikipedia and bloggers, not from Taipei Metro's own map.
- **CityInn child policy:** no official wording exists online. A phone or email query to the hotel is the only way to settle it.
- **Relax III:** whether the cheapest Standard Double has a window, and whether breakfast is still given, are unresolved.
- **Sheraton price:** only one effective source (Klook, with Agoda on the same supply). Booking.com listing not found.
- **Star Hostel "time slots"** and "weekends fill weeks ahead": unverifiable.
- **"Quieter side"** for CityInn II/III: unverifiable.
- **Walking times** are Google Maps street routes from building centres. Underground routes via the Y and Z malls may be shorter or longer, and are not measured. A site walk with a stopwatch from the A1 gates would settle the key three: citizenM, Palais and Star.
- **liveloveran.com** (citizenM) was unreachable. **supertravelme.com** (Resonance) refused connections.
- **Age and recency of evidence.** Taiwan Youth Hostel's first-hand coverage is mostly 2018, with one 2025 post. For Caesar Park and Palais, the strongest Chinese first-hand posts date from stays in 2020–2023. Both have changed little, but treat the details (breakfast, amenities) as possibly dated.
- **Owner's first-hand text contradicted.** The owner's where-to-stay page says Roaders rooms run "from windowless singles around NT$2,000 to executive doubles with baths at NT$4,000". Current official room types and prices contradict that: there are no singles, and the Executive Double has no bath. The page also says CityInn "doesn't accept children" (contested; see #91). Those lines on `best-areas-and-hotels-to-stay` need the same fixes as the new guide.
