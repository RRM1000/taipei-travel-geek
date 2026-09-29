# Research: Hotels Near Taipei 101 (Xinyi)

Checked 29 September 2026. This file is research, not article copy. The article is written by `scripts/add-hotels-near-taipei-101.mjs`.

**How this was checked**
- **Two passes, as for the Main Station and Ximending guides.**
  - Pass 1 was a consensus count of English and Traditional Chinese editorial sources.
  - Pass 2 verified each hotel against its official site and the Taiwan Tourism Administration register (taiwanstay.net.tw, "register"), then against dated 2024–2026 reviews.
  - Pages were opened, not read from search snippets. Anything taken from a snippet only is marked "(snippet)".
  - hyatt.com, marriott.com and hilton.com refused automated fetches (403). Grand Hyatt and W facts therefore rest on the register, MICHELIN, Forbes and dated blogs.
- **What was excluded from the counts.**
  - Booking engines and OTA content blogs (Klook, KKday, Agoda, Booking, Trip.com, AsiaYo, ezTravel), aggregators, TripAdvisor, Wanderlog, forums, social media and content-farm clones.
  - Also excluded: taipeitourism.org (unofficial, machine-written), hoteluketamo.com (a hotel's own blog), funtime (travel agency) and taiwan17go (directory).
  - One author across several sites counts once:
    - Nick Kembel = taiwanobsessed.com + nickkembel.com.
    - mimigo = mimihan. marktrip's 101 list is a clone of mimigo's and was not counted.
    - vivianexplore = vivianjourney, gowithmarkhazyl = markandhazyl, and kuolife's two lists count once.
- **Walking times.**
  - Google Maps walking directions, run live on 29 Sep 2026. Each route starts from the exit's OpenStreetMap coordinate and ends at the hotel (by address, re-run by place name where the address geocoded badly).
  - "To 101" is the hotel to the Taipei 101 Observatory / Taipei 101 Mall pin.
  - Raw results: scratchpad `t101/gm-results.md`.
- **Prices.**
  - Booking.com, TWD, **Wednesday 11 to Thursday 12 November 2026, 1 night, 2 adults** (1 adult for dorm beds), checked 29 Sep 2026.
  - Saturday 14 November was checked for every hotel. Control Saturdays (7 and 21 Nov) were checked for four hotels, to confirm the weekend jump is not a one-off.
  - Raw results: scratchpad `t101/prices-raw.md`. Prices are a single-source snapshot, not editorial evidence.
- **Station and area facts.** Taipei Metro station map PDFs (R02/R03/R04 May 2026, BL17/BL18/BL19 Jun 2026), the official fare matrix (24 Aug 2026), TRTC running-time open data (effective 30 Aug 2026), airbus.com.tw (1960 stop list, timetable, fares), Business Today / CNA / ctee / udn for NYE 2025/26, att4fun.com.tw and Taiwanderers for Elephant Mountain.
- **Klook.** Each hotel's Klook page was opened on 29 Sep 2026 and its canonical URL and street address checked against the hotel's. All 15 match.
- **Working notes** in the session scratchpad `t101/`: consensus-en.md, consensus-zh.md, area-facts.md, verify-owner.md, verify-B.md, verify-C.md, gm-results.md, prices-raw.md. The key findings are copied here.

---

## 1. Summary: what surprised us

1. **Budget hotels double or triple at weekends; luxury barely moves.**

   | Hotel | Wed 11 Nov | Saturdays in Nov (NT$) |
   |---|---|---|
   | CHECK inn (cheapest room) | 2,420 | 5,639–6,577 |
   | Members Hotel | 2,580 | 5,280–7,080 |
   | Sparkle | 3,710 | 7,700 |
   | Just Inn | 1,898 | 5,043 |
   | Work Inn dorm bed | 470 | 1,480–1,880 |
   | Grand Hyatt | 11,746 | 14,397 |
   | W | 16,748 | 17,903 |
   | Le Méridien | 13,860 | 14,669 |

2. **The cheap starting prices are mostly windowless rooms.**
   - Sparkle is entirely in the basement. Its standard rooms have no window; the O2 rooms look onto a sunken lightwell.
   - The Tango's Deluxe and Majesty Suite are "interior" rooms.
   - CHECK inn has three windowless room types.
3. **Humble House's pool closes from November to March** (official). The owner's text sells the pool without saying so, and our price check is for November. The Terrace bar has also been closed since 1 Jul 2026.
4. **Home Hotel has no gym of its own.** Guests get free use of Fitness Factory in the NEO19 building next door. It is also the Xinyi hotel with the most consistent noise complaints (ATT 4 FUN clubs until 3–4am at weekends).
5. **WOOBAR is on W's 10th-floor lobby level**, not "downstairs".
6. **Home Hotel is thinly covered in English** (2 publishers, no first-hand stay found), though 8 of 13 Taiwanese round-ups name it.
7. **Le Méridien is the owner's biggest omission.** It is named by 8 of 13 Taiwanese round-ups (as many as Home Hotel) and 4 English publishers.
8. **Not open:**
   - Four Seasons (opposite 101), and Park Hyatt and Andaz (The Sky Taipei) are all now targeting 2027.
   - InterContinental Taipei (Taipei Dome) takes bookings for stays from 1 Jan 2027. It is about 20+ min on foot from 101, so it is out of scope.
   - **Space Inn Xinyi has closed**: its URL redirects to an unrelated site and it has gone from Hostelworld.
9. **The brief's station codes were wrong.** Sun Yat-sen Memorial Hall is BL17, City Hall BL18, Yongchun BL19 and Houshanpi BL20.
10. **The Red line no longer ends at Xiangshan.** The extension to Guangci/Fengtian Temple (R01) opened on 30 Aug 2026 (TVBS; TRTC running-time data). The `taipei-101` post still says Xiangshan is "at the end of the red line".
11. **No direct link between City Hall and Taipei 101 stations.** The mall skybridges cover most of the way. A bridge to City Hall is planned for about 2028 (ctee, 24 Jul 2025).
12. **Airbus 1960 is infrequent.** Since 1 Jul 2025 it runs 15 departures a day each way, 60–120 min apart. Fares: NT$200 from City Hall, NT$190 from the Grand Hyatt.
13. **No Xinyi hotel holds a MICHELIN Key (2026).** W is the only Forbes Four-Star in Xinyi. Grand Hyatt and eslite are Forbes "Recommended".
14. **Kembel's "Hanns House: 101 views only from the President Suite" is out of date.** The official site sells whole 101 View room and suite categories.
15. **Work Inn 101 takes guests aged 18–80 only** (Booking.com). Formosa 101 takes no children and is listed as cash only (Booking.com).

---

## 2. Consensus counts

Columns:
- **EN** = distinct English publishers (28 checked).
- **FH** = English first-hand stays.
- **TW13** = how many of 13 Taiwanese round-ups name it.
- **ZH total** = distinct Traditional Chinese domains, including hk01, news and single-hotel reviews.

| Hotel | EN | FH | TW13 | ZH total | In guide? |
|---|---|---|---|---|---|
| Grand Hyatt Taipei 台北君悅 | 12 | 4 | 11 | 11 | Yes (owner) |
| W Taipei 台北W | 10 | 2 (hosted) | 12 | 14 | Yes (owner) |
| Humble House (Curio) 台北艾麗 (ex 寒舍艾麗) | 8 | 3 | 11 | 13+ | Yes (owner) |
| eslite hotel 誠品行旅 | 5 | 1 | 9 | 11 | Yes (owner lists under Songshan) |
| Le Méridien Taipei 台北寒舍艾美 | 4 | 1 (2013) | 8 | 10 | Yes |
| Home Hotel Xinyi | 2 | 0 | 8 | 10 | Yes (owner) |
| Hanns House 瀚寓 | 5 | 0 | 5 | 7 | Yes |
| Pacific Business Hotel 太平洋商旅 | 2 | 0 | 7 | 7 | Yes |
| Just Inn Xin Yi 正旅館 | 3 | 0 | 6 | 6 | Yes |
| Taipei 101 Sparkle 思泊客 | 1 | 0 | 6 | 7 | Yes |
| Members Hotel at Taipei 101 慕居行旅 | 1 | 0 | 5 | 6–7 | Yes |
| Formosa 101 Hostel | 6 | 1 | 0 | 1 (yanshoto) | Yes |
| The Tango Taipei Xinyi 天閣 | 1 | 0 | 3 | 5 | Yes |
| CHECK inn Taipei Xinyi 雀客 (ex 晶璽 AT Boutique) | 2 | 0 | 2 | 3 | Yes |
| WORK INN 101 慕誠青年旅館 | 1 | 1 | 0 (on gowithmarkhazyl's 2026 hostel list) | 2 | Yes |
| M.Taipei 木文陶喜 | 0 | 0 | 2 (one from 2018) | 2 | No |
| Guide Hotel Xinyi (ex Holy Pro) | 0 | 0 | 1 (2018) | 1 | No |
| Place X 謙匯普樂室 | 0 | 0 | 1 (2018) | 2 | No: basement, weak reviews |
| Space Inn Xinyi | 1 (2017) | 1 | 0 | 0 | **No: closed** |
| InterContinental Taipei | 0 | 0 | 1 | 6+ | No: opens 2027 for bookings; out of range |
| Shangri-La Far Eastern, Proverbs, Kimpton, Episode, United, Eastin | — | — | — | — | No: Da'an |

**English publishers:** Kembel, Taiwanderers, Travel Lemming, Away to the City, P.S. I'm On My Way, Girl on a Zebra, Travels with Ingrid, Tara O'Reilly, Time Out, MICHELIN, Forbes, Broke Backpacker, Eternal Arrival, Go Ask A Local, Bobo and ChiChi, Wandertooth, Upgraded Points, The Bulkhead Seat, PointsMiler, One Mile at a Time, The National, The Ranting Panda, Chaibear, Avenue One, The Gay Passport, Yanshoto, Morry Travels, Hostel Geeks. URLs and dates are in consensus-en.md.

**Taiwanese round-ups:**
- wkitty (1 Aug 2026), mimigo (Aug 2026), bigfang (Oct 2025), kuolife (Jan 2026), vivianexplore (May 2026), gowithmarkhazyl (Apr 2026), followtotravel (Mar 2026).
- bobbytravel (Aug 2026), smallchin (Jan 2025), xnfood (2018, old), woohoteltw (2024, affiliate-heavy), pandafishtrip (25 Sep 2026), wendyjourney (Sep 2026).
- HK: hk01 (Jul 2026).

**The owner's four Xinyi picks are all included**, as the brief required: Grand Hyatt, W, Humble House and Home Hotel.

---

## 3. Claim table: area and station facts

| # | Claim used in the article | Verdict | Fact / note | Source | Date |
|---|---|---|---|---|---|
| A1 | R03 has 5 exits; exit 4 leads via an underground passage into Taipei 101; exit 5 (Shifu Rd) has a street lift | VERIFIED | Official labels: 1 World Trade Center, 2 Zhuangjing Rd, 3 Xinyi Elementary, 4 Taipei 101, 5 City Hall Rd | web.metro.taipei 100.pdf | May 2026 |
| A2 | City Hall exit 2 is by the bus station and the W; exit 3 leads into the Breeze Xinyi link | VERIFIED | Exit 2 has the only street lift | 093.pdf; Business Today | Jun 2026; 30 Dec 2025 |
| A3 | Station codes | CORRECTED | BL17 SYS Memorial Hall, BL18 City Hall, BL19 Yongchun, BL20 Houshanpi | 092–095.pdf | Jun 2026 |
| A4 | Red line runs one stop beyond Xiangshan since 30 Aug 2026 | VERIFIED (one news source plus TRTC data) | New terminus Guangci/Fengtian Temple R01 | TVBS 4010084; TRTC running-time data | Aug 2026 |
| A5 | No direct covered link between City Hall and R03; a bridge is planned for about 2028; allow 10–15 min | VERIFIED | About 860 m straight-line. The skybridge network is 2.3 km | ctee 24 Jul 2025; zh.wikipedia | 2025–26 |
| A6 | City Hall to Taipei Main about 10 min; to Ximen about 13 min; R03 to Taipei Main about 14 min; all NT$25 | VERIFIED | On-board time only | TRTC data; fare matrix | Aug 2026 |
| A7 | Airport MRT via A1: 35 min to T1, 39 to T2; about 60–70 min door to door; NT$185 in total | VERIFIED (route and fare); total time estimated | | tymetro.com.tw; fare matrix | 2026 |
| A8 | Airbus 1960 serves City Hall bus station (NT$200) and the Grand Hyatt (NT$190); 15 departures a day since Jul 2025 | VERIFIED | No World Trade Center or 101 stop | airbus.com.tw stop list PDF, timetable, fare news id=205 | 2025–26 |
| A9 | Songshan Airport about 15–18 min, NT$25, changing at Zhongxiao Fuxing or Daan | VERIFIED | | TRTC data; fare matrix | 2026 |
| A10 | Elephant Mountain: Xiangshan exit 2, about 10 min to the trailhead, 15–20 min of steps to the first platform | VERIFIED | Our Google Maps run: 10 min / 700 m | Taiwanderers (1 Nov 2024); GM | 2024–26 |
| A11 | Raohe: Songshan (G19) exit 1 is at the east gate; Houshanpi 2 stops from City Hall, about 12–15 min walk | VERIFIED (distance); time estimated | | OSM; fare matrix | 2026 |
| A12 | ATT 4 FUN clubs run late at weekends (WAVE 22:30–04:30) | VERIFIED | EPB fined the clubs in 2021; closing-time brawl on 28 Sep 2025 | att4fun.com.tw; CNA 16 Mar 2021; EBC | 2021–26 |
| A13 | NYE 2025/26: Grand Hyatt from about NT$20,000 for 1 night, 97% full; Humble House NT$47,000 + 15.5% for 2 nights | VERIFIED | Also: Le Méridien 101-view NT$52,000 + 15.5% for a compulsory 2 nights (2024/25); W's NYE average was about NT$55,000 | ctee 2 Sep 2025; udn 21 Dec 2025; ETtoday 12 Nov 2025 | 2025 |
| A14 | NYE: traffic control widens through the evening; City Hall bus station shut 21:30; exits at City Hall and R03 closed from 21:30/22:00 | VERIFIED | Three stages from 19:00 to 03:00; 42-hour MRT | Business Today, CNA 30 Dec 2025 | 2025 |
| A15 | Linjiang (Tonghua) night market is opposite Formosa 101 | VERIFIED (location) | The market is in Da'an; opening hours not checked | OSM; consensus-en | 2026 |
| A16 | No MICHELIN Key hotel in Xinyi (2026); W is Forbes Four-Star | VERIFIED | | guide.michelin.com Keys article; forbestravelguide.com | Sep 2026 |

---

## 4. Per-hotel fact sheets

Walks: GM = Google Maps, run 29 Sep 2026 (see method).

Prices: Booking.com TWD, Wed 11 Nov 2026 / Sat 14 Nov.

"Owner" marks the owner's existing where-to-stay wording.

### 4.1 Grand Hyatt Taipei 台北君悅酒店
- **Address:** 2 Songshou Rd. Opened 1990. 850 rooms (the register says 866).
- **Getting there:**
  - R03 exit 5, 3–5 min per blogs. GM street routes gave 9 min from exit 4 and do not use the skybridge.
  - To 101: GM 4 min / 260 m.
  - Covered skybridge to the 101 mall (Upgraded Points, Jul 2026; blogs). There is no official Hyatt wording (site blocked).
- **Views:** the east wing faces 101 (Forbes). Kembel: only one side has the view.
- **Bathtubs:** vivianexplore says the base Grand room has no tub (unverified officially).
- **Pool and facilities:** 5F, outdoor, heated, all year, 06:00–22:30, with a 100 cm children's side. Gym 24h, spa and sauna.
- **Kids:** under-12s free on existing beds (vivianexplore). An OTA snippet claiming an under-16 pool ban conflicts and is not used.
- **Price:** 11,746 / 14,397. **Klook:** 425808-grand-hyatt-taipei ✔.

### 4.2 W Taipei 台北W飯店
- **Address:** 10 Zhongxiao E Rd Sec 5, on floors 8–31 above the City Hall bus station. 405 rooms.
- **Room refresh:** reported complete on 18 Feb 2025 (Yahoo).
- **Getting there:** City Hall exit 2, GM 1 min / 65 m. To 101: GM 12 min / 850 m.
- **Rooms:** 43 m²+. Tubs in all rooms (vivianexplore; the register mentions island tubs). 101 view only in Spectacular, Fantastic and Surprise categories.
- **Facilities:** WET pool, 10F, heated to 28 °C (hours conflict: 06:00–22:00 vs 24h). WOOBAR on the 10F lobby level. FIT gym and AWAY Spa on 12F. No club lounge.
- **Buffet:** Kitchen Table became Seasons by Olivier E. in Sep 2023.
- **Crowd:** young, likes to party (TPG, May 2024).
- **Kids:** free age conflicts (12 vs 9); not stated in the article.
- **Awards:** Forbes Four-Star.
- **Price:** 16,748 / 17,903, the most expensive in the guide. **Klook:** 142088-w-taipei ✔.

### 4.3 Le Méridien Taipei 台北寒舍艾美酒店
- **Address:** 38 Songren Rd. Opened Dec 2010. 160 rooms.
- **Getting there:** City Hall exit 3, GM 5 min / 350 m. To 101: GM 9 min.
- **Rooms:** Deluxe 38 m².
  - Tubs: "most room types" (register). The 101-facing Deluxe rooms had a shower only (lovetogo, Dec 2020 stay). vivianexplore says every room has one. The article says baths are "not universal".
  - "More than half the rooms face 101": vivianexplore only. SayDigi says half the room *types*. UNCONFIRMED; the article attributes it to one blogger.
- **Facilities:** indoor heated pool on 3F, 06:00–22:30 (official), plus a hot pool and saunas.
- **Kids:** 11 and under free in existing beds (vivianexplore 2026).
- **Price:** 13,860 / 14,669. **Klook:** 409169-le-meridien-taipei ✔.

### 4.4 Humble House Taipei, Curio Collection by Hilton 台北艾麗酒店
- **Address:** 18 Songgao Rd. Opened 27 Dec 2013. 235 rooms.
- **Rebrand:** renamed 1 Jul 2023; joined Curio on 18 Dec 2023.
- **Getting there:** City Hall exit 3, GM 4 min / 270 m. To 101: GM 10 min / 700 m.
- **Rooms:** Deluxe 26 m² (official). 101 views only in Landmark View rooms and some suites; ETtoday says about a third of rooms face 101.
- **Pool:** 7F, outdoor. Open Apr–Oct 06:00–22:00, **closed Nov–Mar** (official). No under-16s in the gym.
- **Dining:** The Terrace temporarily closed since 1 Jul 2026 (official).
- **Service:** "underwhelming" (Ranting Panda, Dec 2025).
- **Price:** 9,875 / sold out. **Klook:** 254548-humble-house-taipei-curio-collection-by-hilton ✔.

### 4.5 eslite hotel 誠品行旅
- **Address:** 98 Yanchang Rd (Xinyi district, Songshan Cultural Park). 104 rooms.
- **Getting there:** SYS Memorial Hall (BL17) exit 5, GM 9 min / 650 m. To 101: GM 22 min / 1.6 km.
- **Rooms:** balconies in every room except 3F (official). Room sizes are about 36–43 m² depending on the page's basis.
- **Facilities:** no pool or spa; 24h gym.
- **Views:** 101 only from higher front rooms (Kembel). ETtoday calls it one of the few hotels with balconies for the fireworks.
- **Awards:** Forbes Recommended.
- **Price:** 9,466 / suites only 15,693. **Klook:** 440618-eslite-hotel ✔.

### 4.6 Hanns House 瀚寓酒店
- **Address:** 206 Keelung Rd Sec 1. Opened about 2020 (not officially dated). 120 rooms.
- **Getting there:** City Hall exit 2, GM 4 min / 270 m. To 101: GM 11 min.
- **Rooms:** fridge and microwave in every room. 101 View rooms from 30 m², shower only; tubs in suites only. No pool. MICHELIN selection, no Key.
- **Price:** 8,845 / 10,433. **Klook:** 391766-hanns-house ✔.

### 4.7 Home Hotel Xinyi
- **Address:** 90 Songren Rd (not Songshou Rd). Opened 2011. 121 rooms.
- **Da-An branch:** closed Apr 2023. MICHELIN's "Home Hotel" page is that branch.
- **Getting there:** Xiangshan exit 1, GM 6 min / 400 m. To 101: GM 5 min.
- **Rooms:** Original about 27 m², shower only. Marvelous Suite has a freestanding tub.
- **Gym:** partner gym next door (Fitness Factory, NEO19 3F), free (rainieis Sep 2025; bobowin).
- **Design:** MIT concept, 100+ local brands (official).
- **Noise:** ATT 4 FUN at weekends (lovetogo, bigfang, guests).
- **Price:** 7,650 / 9,350. **Klook:** 570574-home-hotel ✔.

### 4.8 Pacific Business Hotel 太平洋商旅
- **Address:** 11F, 495 Guangfu S Rd, with rooms on scattered floors. 48 rooms.
- **Getting there:** R03 exit 1, GM 8 min / 500 m. The official directions use Xinyi Anhe exit 3 (about 500 m). To 101: GM 11 min.
- **Rooms:** Standard 26.2 m². Every room has floor-to-ceiling windows (official), which contradicts wkitty's "some windowless" (not on the current page). Business rooms have balconies; a walkerland reviewer saw 101 from one (May 2024). No tubs listed.
- **Family and extras:** family room for 4 adults; 11 and under free; free parking and lounge snacks.
- **Price:** 4,242 / sold out. **Klook:** 416969-pacific-business-hotel ✔.

### 4.9 Taipei 101 Sparkle Hotel 思泊客
- **Address:** B1, 16 Xinyi Rd Sec 5. 45 rooms, all in the basement.
- **Getting there:** R03 exit 2, GM 2 min / 120 m (the hotel's own figure is exit 3, 1 min). To 101: GM 3 min.
- **Rooms:**
  - Standard rooms, about 17 m², shower only, **no window**.
  - O2 rooms, about 26 m², with a floor-to-ceiling window onto a lightwell and a big tub. "O2" is a series name, not an oxygen system.
- **Noise:** quiet (mimigo).
- **Official site:** expired certificate, so it could not be read.
- **Price:** 3,710 / 7,700; O2 double 5,600 on Wed. **Klook:** 405692-taipei-101-sparkle-hotel ✔.

### 4.10 The Tango Taipei Xinyi 天閣酒店 台北信義
- **Address:** 297 Zhongxiao E Rd Sec 5. 105 rooms.
- **Getting there:** Yongchun exit 1, GM 2 min / 180 m. To 101: GM 21 min / 1.5 km.
- **Rooms:** Deluxe (12 ping, about 40 m²) and Majesty Suite are **windowless** "interior" rooms (official). Executive rooms have floor-to-ceiling windows. Jacuzzi tubs, free minibar and lounge snacks (panpanlife).
- **Kids:** no extra beds or cots (official FAQ 2026; contradicts a 2021 blog).
- **Times:** check-in 16:00, check-out 11:00. The car access is not "motel-style".
- **Price:** 3,700 / sold out. **Klook:** 434797-the-tango-taipei-xinyi ✔ (not 84212 Tango Motel).

### 4.11 Members Hotel at Taipei 101 慕居行旅
- **Address:** 5F, 22 Keelung Rd Sec 2.
- **Former name:** very probably ex-Good Hotel at Taipei 101 (Booking and Trip.com URLs, same address and phone), but there is no official statement.
- **Rooms:** 25 (register; OTAs say 26). The Basic Quadruple is windowless (Trip.com). Shower only. No cots or extra beds. 24h desk.
- **Getting there:** R03 exit 1/2, GM 6 min / 400 m. To 101: GM 10 min.
- **Noise:** from other floors (smlpoints, 2020).
- **Price:** 2,580 / 7,080 (5,280–5,380 on other Saturdays). **Klook:** 448663-members-hotel-at-taipei-101 ✔.

### 4.12 CHECK inn Taipei Xinyi 雀客旅館 台北信義
- **Address:** 3F, 468 Xinyi Rd Sec 4. Probably ex-晶璽商旅 AT Boutique (same address; Booking slug "at-boutique"; not officially confirmed).
- **Rooms (official):**
  - Windowless: Joyful Double, Superior Twin and Accessible Double, about 12–13 m².
  - 101-view rooms: 15–18 m².
  - Double Suite: about 26 m², the only room with a tub.
- **Breakfast:** Louisa Coffee voucher.
- **Getting there:** R03 exit 2, GM 4 min / 260 m. To 101: GM 8 min.
- **Price:** 2,420 / 6,577 (5,639–5,926 on other Saturdays). **Klook:** 423368-check-inn-taipei-xinyi ✔.

### 4.13 Just Inn Xin Yi 正旅館 信義
- **Address:** 182 Keelung Rd Sec 1. Register name 正是旅館: 18 rooms on 1F–7F.
- **Getting there:** City Hall exit 2, GM 4 min / 230 m. To 101: GM 16 min.
- **Rooms:** shower only. The lift stops at 7F (OTA reviews). Singles available.
- **Noise:** weak soundproofing; earplugs provided (bobbytravel, 22 Aug 2026).
- **Price:** 1,898 double, 1,753 single / 5,043. **Klook:** 576321-just-inn-taipei-xin-yi ✔.

### 4.14 Formosa 101 Hostel
- **Address:** 115 Keelung Rd Sec 2 (the floor conflicts: 5F per Hostelworld/Booking, 9F per a 2025 blog; not stated in the article). Opposite Linjiang night market.
- **Getting there:** R03 exit 1, GM 11 min / 800 m. To 101: GM 15 min / 1.1 km.
- **Rooms:** mixed and female dorms, and private rooms with and without a bathroom. The Basic Single (shared bath) is windowless (Booking). En-suite privates mostly have a 101 view (Kembel).
- **Facilities:** free breakfast (Yanshoto, Tara O'Reilly). 24h reception. Laundry NT$30.
- **Booking.com rules:** children not allowed; cash only.
- **Walls:** thin, per a reader Kembel quotes.
- **Price (1 adult):** dorm 482–550, single with bath 1,545 / dorm 1,101–1,238. **Klook:** 281421-formosa101--hostel ✔.

### 4.15 WORK INN 101 慕誠青年旅館
- **Address:** 48 Keelung Rd Sec 2 (Booking and Klook agree). 65 rooms (verify-C).
- **Getting there:** R03 exit 2, GM 7 min / 450 m. To 101: GM 11 min.
- **Rooms:** 20-bed mixed dorm (single or double bed), male and female dorms, and single rooms with shared bath.
- **Facilities:** kitchen, terrace, coin laundry.
- **Booking.com rules:** ages 18–80, no children; check-in 15:00–21:30, with late arrivals to be arranged.
- **Pods:** Girl on a Zebra's "pod beds" conflicts with a 2019 review describing bunks; not stated.
- **Price (1 adult):** 470–640 / 1,480–1,880. **Klook:** 46939-work-inn-101 ✔.

---

## 5. Discrepancies with the owner's text

**Where-to-stay page, #Xinyi** (not edited):

| Owner's text | Finding |
|---|---|
| Home Hotel "an on-site gym" | No in-house gym; free use of the partner gym next door |
| W "Woobar downstairs" | WOOBAR is on the 10F lobby level, beside the pool; the rooms are on 8F–31F |
| Humble House "outdoor pool overlooking Taipei 101" | True, but closed Nov–Mar |
| Humble House "a gallery of 600 original artworks" | MICHELIN: "a gallery and more than 600 original works of art" |
| Table: Grand Hyatt NT$8,000 | Nov weekday NT$11,746 (Sat 14,397) |
| Table: W NT$13,000 | NT$16,748 (Sat 17,903) |
| Table: Humble House NT$7,500 | NT$9,875 (Sat sold out) |
| Table: Home Hotel NT$5,500 | NT$7,650 (Sat 9,350) |
| Table: Home Hotel "5 mins (Red)" | Right line, but via Xiangshan exit 1 (GM 6 min), not Taipei 101 station |
| Grand Hyatt "walkway straight into Taipei 101" | Supported by blogs; it is a skybridge to the 101 mall. OK |

**Other posts:**
- `taipei-101`: "Xiangshan MRT station at the end of the red line" is out of date since 30 Aug 2026.
- `taipei-101-fireworks-new-years-eve`: "Le Méridien, where more than half the rooms face Taipei 101" rests on one blog (vivianexplore); unconfirmed.

---

## 6. Gaps

- **Prices** are single-source (Booking.com). Humble House, Pacific and The Tango were sold out on Sat 14 Nov, so their weekend jump is unknown.
- **Official Hyatt, Marriott and Hilton pages were blocked**:
  - Grand Hyatt: bathtubs by category, check-out time (11:00 vs 12:00) and the pool age rule.
  - W: pool hours and child free age.
  - Le Méridien: tub vs 101-view split, and pool age rules.
- **Grand Hyatt walk:** GM street routes (9 min) are longer than the blog 3–5 min, because GM doesn't route through the skybridge. The article uses the blog figure.
- **Opening years** for Hanns House, Pacific, Sparkle and The Tango are not officially dated.
- **Renames:** Members Hotel's former name and CHECK inn's previous identity are inferred from booking-site URLs.
- **Formosa 101:** floor (5F vs 9F) and dorm sizes. **Work Inn 101:** reception hours beyond the check-in window.
- **Sparkle:** its official site was unreadable; the mould and bar-noise reports are snippet-only and not used.
- **The Terrace at Humble House:** no reopening date.
- **Red line extension:** one news source plus TRTC data; the official Metro announcement page was not opened.
- **Linjiang and Raohe night market hours** were not checked.
- **Airport MRT door-to-door time** (60–70 min) is an estimate.
