# Research: Hotels in Zhongshan

Checked 29 September 2026. This file is research, not article copy. Proposed slug: `hotels-in-zhongshan`.

**Scope used**
- Hotels nearest a Zhongshan-district MRT station: **Zhongshan** (R11/G14), **Shuanglian** (R12), **Songjiang Nanjing** (G15/O08), **Nanjing Fuxing** (G16/BR11), plus the Linsen North Road / Chifeng Street strip.
- **Zhongshan Elementary School** (O10) is included as the northern edge, because the owner's Goldinn pick (and Hotel Fun, Taipei Discover Hostel) are nearest to it.
- Kept north of Civic Boulevard. Nothing here is on the Main Station page (citizenM North Gate, Caesar Park, Cosmos, Palais de Chine, Resonance, Relax III, Meander 1948, OwlStay Flip Flop Garden are all on `hotels-near-taipei-main-station`; OwlStay Flip Flop Garden came up in Zhongshan round-ups but is excluded to avoid overlap).
- The owner's Hotel Indigo Taipei North (No. 200 Zhifu Rd, Dazhi) and The Grand Hotel (Yuanshan/Jiantan) are in Zhongshan **District** but nowhere near this area. They are not in the list (see section 9).

**How this was checked**
- **Consensus.** English and Traditional Chinese editorial pages were opened (WebFetch or browser), not read from snippets. Anything taken from a search snippet only is marked "(snippet)".
- **Excluded from counts:** booking engines and OTA content (Booking, Agoda, Trip.com, Klook, KKday, AsiaYo, ezTravel, easytravel blog, HotelsCombined blog, FunTime, Hostelworld listings, Wing On), TripAdvisor, Wanderlog, Oyster, forums, social media, press releases, and pure affiliate/AI lists. **taipeitourism.org was excluded**: it is a private affiliate site that puts Cosmos and Caesar Park (Main Station hotels) in Zhongshan. mstravelsolo was excluded: the author says she did not stay in Zhongshan.
- **Walking times.** Google Maps walking directions (GM), run live on 29 Sep 2026 from each exit's street entrance to the hotel address. Official figures are given alongside.
  - Exit coordinates are from OpenStreetMap (OSM API map call, 29 Sep 2026) and were checked against the official Zhongshan station map (G14R11-SW, dated 26.05).
  - Zhongshan exits: 2 = 25.05238,121.52114; 4 = 25.05286,121.52033 (GM names this point "中山站4號出口"); 5 = 25.05304,121.51941; 6 = 25.05262,121.51855. OSM tags a south-west node as "3", which contradicts the official map, so **exit 3 was taken as 25.05265,121.52135** (north-east corner of Nanjing W Rd / Zhongshan N Rd, the corner the official map and the Tango Nanshi and Okura pages describe). Exit 1 (south side, by Eslite Nanxi) was estimated at 25.05205,121.52055.
  - Shuanglian exit 2 = 25.05782,121.52060 (GM resolves it to Minsheng W Rd 47). Songjiang Nanjing exits 1–8, Zhongshan Elementary exits 1–4, Nanjing Fuxing exits and Xingtian Temple exit 1 are OSM nodes.
- **Prices.** Booking.com, TWD, **Wednesday 11 to Thursday 12 November 2026, 1 night, 2 adults** (1 adult for dorm beds), checked 29 Sep 2026. Saturday = **14 to 15 November**. Where a hotel was sold out, the nearest Wednesday (10 or 18 Nov) or Saturday (7 or 21 Nov) was tried and is labelled. Prices are a single-source snapshot, not editorial evidence.
- **Station and area facts.** Taipei Metro station map PDFs (Zhongshan G14R11-SW 26.05; Songjiang Nanjing G15O08-SW 24.06), the official fare matrix (臺北捷運系統票價表, printed 24 Aug 2026), TRTC open-data running and dwell times (effective 30 Aug 2026), zh.wikipedia station pages, the Airbus 1961 stop list (effective 1 Jan 2025), hotel transport pages, and the National Culture Memory Bank entry on 條通.
- **Working files** are in the session scratchpad `zhongshan/` (gm-*.json, exits, tt-utf8.csv, station PNGs, owner text dumps).

---

## 1. Summary: what surprised us

1. **Just Sleep Taipei Zhongshan (捷絲旅台北中山館) is brand new.** It opened on **17 June 2026** in **八條通 (Lane 135, Zhongshan N Rd Sec 1)**, the heart of the Tiaotong bar area. It has 50 rooms, all with windows, a free red and white wine hour 19:00–20:00, and **no extra beds or cots in any room type**. No blog review exists yet, only press.
2. **The owner's "four Tango hotels in Taipei" is wrong.** The Tango group site lists **seven** Tango Hotel properties in Taipei (Xinyi, Fuhsing, ChangAn, Linsen, Nanxi, Jiantan, Shilin), plus three TangoINN. **Three are in Zhongshan** (ChangAn, Linsen, Nanxi), so ChangAn is not "the Zhongshan one".
3. **The Tango ChangAn is on Linsen North Road (No. 80), not Chang'an Road.** Official directions: Zhongshan exit 2, **7–10 min**, or Shandao Temple exit 1, 7–10 min. GM gives 9 min. The owner's table says 6 min.
4. **Gloria Residence is 9–10 min from the MRT, not 5.** The official page says 10 min to Shuanglian exit 1 or Zhongshan Elementary exit 2. GM gives 9 min. Ningxia Night Market is **18 min / 1.2 km** on GM, not 14 min. It does give **one free parking space per room**.
5. **Humble Boutique Hotel (寒居酒店, opened 2022) takes a maximum of 2 adults per room, with no extra beds or cots.** It is 1–2 min from Songjiang Nanjing. It had **no November availability on Booking.com** (the first bookable Wednesday was 2 Dec).
6. **The Regent's B3 sauna is closed from 24 Sep to 30 Nov 2026** for maintenance. The rooftop heated pool and gym are unaffected.
7. **November luxury availability is tight.** The Okura was sold out on Booking for Wed 11 Nov and on Saturdays 7, 14 and 21 Nov. The Regent sold only Club rooms and suites on Booking. amba was sold out on all three Saturdays checked.
8. **Songshan Airport is NT$20 from Zhongshan**, the same as one stop to Main Station (fare matrix). Route: Green line 2 stops to Nanjing Fuxing, then Brown line 2 stops.
9. **For the Taoyuan Airport MRT, go via Beimen, not Taipei Main.** Green line 1 stop (about 2 min) to Beimen, which is linked underground to Airport MRT A1. The Okura's official directions say the same. The Brown line only reaches **Songshan** Airport, not Taoyuan.
10. **Airbus 1961 (Taoyuan Airport) stops in Zhongshan**: 晶華酒店 (Regent front plaza), 國賓飯店 (Ambassador, Zhongshan N Rd Sec 2) and 聚盛里 (Linsen N Rd 395, beside Gloria Residence and Goldinn).
11. **Chifeng Street is in Datong District**, not Zhongshan. Just Sleep's official page gives its address as 大同區民生西路47號. It is right outside Zhongshan exit 5.
12. **The Zhongshan Metro Mall is 815 m** (Taipei Main to Shuanglian), not the "2km" in the owner's rainy-day post.
13. **Goldinn's official website is "under construction"** (gold-inn.com.tw, checked 29 Sep 2026). OTA listings also sell 2–3 hour "rest" packages, which is typical on this stretch of Linsen N Rd (see section 4.11). No editorial review was found.
14. **Zhongshan hostels are thin on the ground.** Most "Zhongshan" hostels in English lists are really at Main Station or Beimen: Beimen WOW Poshtel, OwlStay Flip Flop Garden, 4Plus. Hostel Geeks' only Zhongshan pick (Uinn) has **closed**.

---

## 2. Consensus counts

Columns:
- **EN** = distinct English editorial publishers naming it for Zhongshan.
- **ZH round-ups** = Taiwanese multi-hotel lists opened.
- **ZH total** = distinct Traditional Chinese domains, including single-hotel reviews ((s) = seen as a search result title only, not opened).

| Hotel | EN | ZH round-ups | ZH total | In guide? |
|---|---|---|---|---|
| The Okura Prestige Taipei 台北大倉久和大飯店 | 6 (+Condé Nast Gold List, snippet) | 3 (yama, pandafishtrip, vivianexplore) | 5 (+ethnolab (s), christy0104 (s)) | Yes (owner) |
| Regent Taipei 台北晶華酒店 | 5 (+Condé Nast, snippet) | 2 (pandafishtrip, vivianexplore) | 2 | Yes (owner) |
| DoubleTree by Hilton Taipei Zhongshan 台北中山九昱希爾頓逸林酒店 | 2 | 4 (marksfootprint, woohotel, yama, mimigo) | 4 | Yes |
| The Tango Taipei Nanxi 天閣酒店南西館 | 2 | 1 (woohotel) | 3 (+shin.tw opened, tloveq (s)) | Yes |
| Humble Boutique Hotel 寒居酒店 | 1 (Travel Lemming) | 0 | 5 (mimigo review opened; damei17 (s), tsnio (s), maggieblog (s), paulyear (s)) | Yes |
| Parkview Taipei 美侖商旅 | 1 (Away to the City) | 2 (marksfootprint, mimigo) | 8 (+blake/blaketravel, nigi33, followmi, boniutravel, hx271, pa701009 – all (s)) | Yes |
| amba Taipei Zhongshan 台北中山意舍酒店 | 1 (Flying Fluskey, (s)) | 0 | 3 (damei17 (s), bigfang (s), minako (s)) | Yes |
| The Tango Taipei ChangAn 天閣酒店長安館 | 1 (Travel Lemming) | 0 | 1 (pbear (s)) | Yes (owner) |
| Gloria Residence 華泰瑞舍 | 1 (Tara O'Reilly) | 1 (yama) | 1 | Yes (owner) |
| Via Hotel Loft 丰居旅店雙連館 | 1 (Away to the City) | 0 | 1 (paulyear (s)) | Yes |
| Just Sleep Taipei Zhongshan 捷絲旅台北中山館 | 0 | 0 | 0 blogs; 6+ news items (ETtoday, udn ×2, Storm, Walkerland, to-go, SuperTaste, CTEE) | Yes (new, flagged as such) |
| Goldinn Hotel 錦棧旅店 | 0 | 0 | 0 | Yes (owner only) |
| Hotel Fun Linsen 趣旅館林森館 (hostel beds + private rooms) | 0 | 1 (bobbytravel) | 6 (+yanshoto (s), carriewu103 (s), shiningjenny (s), yatingteacher (s), pfse64289 (s)) | Yes |
| Taipei Discover Hostel 台北發現青旅 | 1 (The Broke Backpacker) | 0 | 0 | Yes (only EN-named dorm hostel in the area) |
| *Also named, not included* | | | | |
| Ambience Hotel 喜瑞飯店 | 1 (Travel Lemming) | 0 | 0 | No: 9 min from Songjiang Nanjing exit 3 and 17 min from Zhongshan (GM) |
| CityInn Plus Fuxing N Rd 新驛旅店復興北路店 | 0 | 3 | 3 | No: nearest is Zhongshan Junior High (Brown), outside the four stations |
| Green World Grand NanJing 洛碁大飯店南京館 | 1 (Eternal Arrival) | 0 | 0 | No: single source |
| JR East Hotel Metropolitan 台北JR東日本大飯店 | 0 | 1 (marksfootprint) | 1 | No: single source (in scope, Nanjing Fuxing) |
| San Want Residences 神旺商務酒店 | 0 | 1 (marksfootprint) | 1 | No |
| Emperor Hotel / Vagus Hotel / Brother Hotel | 1 each (Go Ask a Local) | 0 | 0 | No |
| Hub Hotel Zhongshan | 1 (Tara O'Reilly) | 0 | 0 | No |
| The Landis Taipei 亞都麗緻 | 0 | 1 (woohotel) | 1 | No: Minquan E Rd, edge of scope |
| Astar Hotel 亞士都精品酒店 | 0 | 1 (pandafishtrip) | 1 | No |
| Beimen WOW Poshtel | 1 (Taiwanderers) | 0 | 1 (vivianexplore hostels) | No: Beimen / Datong |
| OwlStay Flip Flop Hostel Garden | 0 | 1 (yama) | 2 | No: on the Main Station page |
| 4Plus Hostel | 1 (Eternal Arrival) | 0 | 0 | No: near Main Station |
| Uinn Travel Hostel | 1 (Hostel Geeks) | 0 | 0 | **No: closed** (Hostel Geeks, upd 15 May 2026) |
| CHECK inn Taipei Songjiang | 1 (Bobo and Chichi) | 1 (mimigo) | 1 | No: Xingtian Temple station |

**English publishers opened (with dates)**
- Taiwanderers (where-to-stay, 2 Aug 2026; Zhongshan guide, upd 23 Jun 2026): Okura, Regent, Tango Nanxi, Beimen WOW.
- Travel Lemming (Sky Ariella, upd 23 Mar 2026): Humble Boutique, Ambience, Okura, Tango ChangAn.
- Go Ask a Local (Jenna Lynn Cody, "June 15", year not shown): Regent, Okura, "The Tango … right next to MRT Zhongshan" (= Nanxi), Emperor, Vagus, Brother.
- Away to the City (21 Jun 2026): Via Loft, Parkview, Okura. First-hand ("our favourite luxury hotel").
- Travels with Ingrid (undated): Regent.
- Eating in Taipei (2026, undated): Okura, Regent.
- Tara O'Reilly (upd May 2026): Hub Hotel, Gloria Residence, Okura.
- Time Out Taipei (17 Sep 2024): DoubleTree Zhongshan (corner suites 46 m² with pull-out beds).
- The Broke Backpacker (upd 28 Jun 2026): Taipei Discover Hostel (and The Riviera, which is at Yuanshan and out of scope).
- Eternal Arrival (upd 14 Nov 2024): DoubleTree, Green World Grand NanJing, 4Plus.
- MICHELIN Guide hotel listing: Regent (no Key; Taipei's 2025 Keys went to Capella, Kimpton Da An and Mandarin Oriental).
- Checked, no Zhongshan picks: Nick Kembel (17 Sep 2026), Two by the World, P.S. I'm On My Way, Girl on a Zebra, Wandertooth, Deeva and Food, Taiwan Obsessed luxury and hostel lists, Nomadic Mick, Road Affair.

**Traditional Chinese round-ups opened**
- marksfootprint.tw (upd 7 Jan 2026), woohoteltw.com (31 Dec 2023), yama.tw (upd 3 Jan 2022, dated), pandafishtrip.tw (25 Sep 2026, borderline affiliate).
- mimigo.tw (31 Jul 2026; plus Humble review 26 May 2026), bobbytravel.tw (30 Jul 2026), vivianexplore.tw family hotels (upd 29 Sep 2026).
- Single reviews opened: shin.tw (Tango Nanxi), mimigo (Humble).

**Owner's picks.** All five Zhongshan picks are included: Okura, Regent, Gloria Residence, Tango ChangAn and Goldinn. Goldinn and Gloria have the weakest outside support.

---

## 3. Claim table: area and station facts

| # | Claim | Verdict | Fact / note | Source | Date |
|---|---|---|---|---|---|
| A1 | Zhongshan station is R11 (Red, Tamsui-Xinyi) and G14 (Green, Songshan-Xindian) | VERIFIED | | Station map G14R11-SW | May 2026 (26.05) |
| A2 | Zhongshan exits | VERIFIED | 1 Eslite Spectrum Nanxi; 2 Shin Kong Mitsukoshi Building 1; 3 Zhongshan N Rd Sec 2; 4 Shin Kong Mitsukoshi Building 3; 5 Chifeng St; 6 Chengde Rd Sec 1. **Lifts at 4, 5 and 6.** The Okura says exit 3 is **stairs only**. | Station map; zh.wikipedia; okurataipei.com.tw/location | May 2026; accessed 29 Sep 2026 |
| A3 | Zhongshan exit 1 reopened after rebuilding | VERIFIED | Reopened **31 May 2025** with new escalators | zh.wikipedia; udn 8778024 (snippet) | 2025 |
| A4 | Shuanglian R12 exits | VERIFIED | 1 = linear park (south side of Minsheng W Rd); 2 = Mackay Memorial Hospital (north side), with a lift | zh.wikipedia | accessed 29 Sep 2026 |
| A5 | Songjiang Nanjing G15/O08 has 8 exits | VERIFIED | Lifts at 1, 2 and 8. Exits 7 and 8 are on Songjiang Rd; 2 and 3 by Chang'an school | zh.wikipedia; station map G15O08-SW (24.06) | Jun 2024 |
| A6 | Nanjing Fuxing is G16 (Green) and BR11 (Brown) | VERIFIED | In-station transfer | zh.wikipedia | accessed 29 Sep 2026 |
| A7 | Zhongshan Elementary is O10 (Orange) | VERIFIED | 4 exits; lifts at 2 and 4 | zh.wikipedia | accessed 29 Sep 2026 |
| A8 | Zhongshan → Taipei Main: 1 stop, Red | VERIFIED | **About 1–2 min** (68 s running). **NT$20** | TRTC travel times; fare matrix | 30 Aug 2026; 24 Aug 2026 |
| A9 | Zhongshan → Ximen: 2 stops, Green, via Beimen | VERIFIED | **About 4 min** (116 + 35 + 86 s). **NT$20** | same | same |
| A10 | Zhongshan → Taipei 101/World Trade Center: Red line direct, no change | VERIFIED | 8 stops, **about 16 min** on board (the R03 → Taipei Main leg is about 14 min, plus about 1.5 min). **NT$25** | same; hotels-near-taipei-101 research | same |
| A11 | Songjiang Nanjing → Ximen: Green direct | VERIFIED | 4 stops, **about 6–7 min**. NT$20. → Taipei 101: NT$25, with a change (time not computed) | same | same |
| A12 | Songshan Airport from Zhongshan | VERIFIED | Green 2 stops to Nanjing Fuxing (**about 4 min**), change to Brown, 2 stops (**about 4–5 min**). **About 12–15 min** including the change. **NT$20.** The Okura quotes a taxi at about 15 min / NT$200. | TRTC; fare matrix; Okura location page | 2026 |
| A13 | "The Brown line links to the airport" | CORRECTED / clarify | The Brown (Wenhu) line serves **Songshan** Airport (TSA) only. For **Taoyuan**, use the Airport MRT from A1 Taipei Main Station | songshan-airport post; Okura; Gloria | 2026 |
| A14 | Taoyuan Airport MRT route | VERIFIED | Best: **Green 1 stop to Beimen** (about 2 min), then the underground link to A1 (about 200 m). Or Red 1 stop to Taipei Main and walk to A1 (10–15 min). Express **35 min to T1, 39 min to T2, NT$160**. The Okura's official directions use Beimen. The Gloria and Tango directions use Taipei Main + Red. | okurataipei.com.tw/location; Ximending research A9–A11 | 2026 |
| A15 | Airbus 1961 serves Zhongshan | VERIFIED | Towards the airport: 晶華酒店 (Regent front plaza, Zhongshan N Rd Sec 2 No. 41), 國賓飯店 (No. 61), 聚盛里 (Linsen N Rd 395). Towards Taipei: 台泥大樓 (Mackay), 國賓飯店 (No. 56). About 90–120 min. Fare not stated (conflicting sources, as in the Ximending research) | airbus.com.tw 1961 stop list PDF | effective 1 Jan 2025 |
| A16 | Taxi to Taoyuan about NT$1,400; Gloria's airport car from NT$1,800 | VERIFIED (hotel figures) | Okura page: NT$1,400 / about 40 min. Gloria transfer: Camry NT$1,800 (3 people); Songshan NT$1,000 | Okura; Gloria getting-here | accessed 29 Sep 2026 |
| A17 | Zhongshan Metro Mall links underground to Taipei Main | VERIFIED | **815 m**, from Taipei Main (R1) to Shuanglian (R12). The stretch under Zhongshan station is the "underground book street" | metro.taipei; zh.wikipedia (snippet) | accessed 29 Sep 2026 |
| A18 | Nanjing West Road shopping | VERIFIED | Eslite Spectrum Nanxi (exit 1), Shin Kong Mitsukoshi Nanxi Building 1 (exit 2) and Building 3 (exit 4), all at the station | Station map | May 2026 |
| A19 | Heart Zhongshan Linear Park 心中山線形公園 | VERIFIED | Runs over the Red line from Nanjing W Rd north to Minsheng W Rd (Zhongshan to Shuanglian). **About 500 m** (Wikipedia; one source says 800 m including the mall stretch). Reopened **2 Nov 2019**. Weekend craft markets (Taiwanderers) | zh.wikipedia (snippet); Taiwanderers | 2019; Jun 2026 |
| A20 | Chifeng Street | VERIFIED | Former hardware and car-parts "blacksmith street" (打鐵街), now indie cafés, bookshops and select shops. **In Datong District** (address 民生西路47號). Directly at Zhongshan exit 5. The Okura is 10 min / 700 m away (GM) | justsleephotels.com/zhongshan directions page; station map; GM | 2026 |
| A21 | Ningxia Night Market walking distance | VERIFIED (GM) | Zhongshan exit 5: **10 min / 700 m**. Shuanglian exit 2: 10 min / 700 m. Tango Nanxi 13 min / 900 m; Okura 16 min / 1.1 km; Via Loft 16 min; Gloria 18 min / 1.2 km; Regent 19 min / 1.3 km | GM | 29 Sep 2026 |
| A22 | Tiaotong 條通 / "Little Japan" | VERIFIED | Japanese-era Taishō-chō (大正町) officials' housing, in the grid between Zhongshan N Rd and Xinsheng N Rd, from Civic Blvd north to Nanjing E Rd. Lanes are numbered 一條通 to 九條通 off Linsen N Rd. US-military bars in the 1950s–70s; Japanese bars, izakaya and karaoke boomed in the 1980s. The Memory Bank also notes "special businesses" (特種行業) and hostess bars, and early lesbian "T-bars". **Tact:** hostess clubs and love hotels exist (the owner's `taipei-nightlife` post already says so); the main streets are busy and generally safe | tcmb.culture.tw 612789; udn time 6047890 (snippet); taipei-nightlife post | accessed 29 Sep 2026 |
| A23 | Time Out: 34th coolest neighbourhood in the world, 2023 | VERIFIED (snippet) | STV's reproduction of the list | news.stv.tv (snippet) | 2023 |
| A24 | Zhongshan Elementary to Linsen N Rd hotels | VERIFIED (GM) | Goldinn 4–5 min; Hotel Fun 5–6 min; Taipei Discover Hostel 3–4 min (exits 3/4) | GM | 29 Sep 2026 |
| A25 | "Zhongshan is walkable to Dadaocheng" | VERIFIED (not measured) | Dihua St is reached via Chifeng St / Nanjing W Rd. The owner's Dadaocheng post gives Beimen exit 3 (7 min) as the nearest MRT | dihua-street-dadaocheng-guide | Aug 2026 |

---

## 4. Per-hotel fact sheets

GM = Google Maps walk from the named exit, 29 Sep 2026. Prices are Booking.com TWD for 2 adults, Wed 11 Nov / Sat 14 Nov 2026 unless stated.

### 4.1 The Okura Prestige Taipei 台北大倉久和大飯店 (owner)
- **Address:** No. 9, Sec. 1, Nanjing E Rd (official).
- **Walk:** Zhongshan **exit 3, 3 min / 210 m** (GM); exit 2 4 min; exit 4 (lifts) 5 min / 350 m.
  - Official: 5–10 min. Exit 3 is **stairs only**; with luggage, use exit 4 (lift and escalators).
- **Rooms:** from **44 m²** (Prestige and Okura Prestige, floors 6–14); Premium Prestige and Executive (balcony) 56 m²; Junior Suite 75 m²; The Suite 82 m²; Royal Suite 228 m².
  - Rack rate from NT$15,000 + 15%. Room count 208 (tripexpert snippet; not used).
  - **All room types have a bathtub** (official FAQ). Twin-basin marble bathrooms. Nespresso machine.
- **Pool:** **rooftop outdoor heated pool (溫水) on 21F**, 06:00–22:00 (last entry 21:30). Children under 120 cm must be with an adult; closes in typhoons, heavy rain and thunder. Aqua Bar 10:00–20:00.
- **Gym:** 20F, Technogym, 06:00–24:00, **16+ only**. Sauna and spa massage also available.
- **Kids:** children **12 and under stay free without a bed** (no amenities or breakfast). Extra bed NT$2,300/night. Cots, baby baths and steriliser on request.
- **Check-in/out:** 15:00 / 11:00.
- **Dining:** Yamazato (Japanese), Toh-Ka-Lin (Cantonese), Continental Room (buffet), The Pearl bar, **The Nine** bakery on 1F (08:30–20:30).
- **Parking:** own underground car park.
- **Price:** **sold out on Wed 11 Nov**. Tue 10 and Wed 18 Nov: Deluxe King/Twin **NT$7,970**. No availability on Saturdays 7, 14 or 21 Nov.
- **Noise:** no specific complaints found. It sits on the Nanjing E Rd / Linsen Park corner at the northern edge of Tiaotong.
- **Klook:** `https://www.klook.com/en-GB/hotels/detail/279384-the-okura-prestige-taipei/?aid=8733` ✔ (9 Nanjing E. Rd., Sec. 1).
- **Accolades:** Condé Nast Gold List 2016–20 and Forbes Five-Star 2021 (tripexpert snippet; not verified).

### 4.2 Regent Taipei 台北晶華酒店 (owner)
- **Address:** No. 3, Lane 39, Sec. 2, Zhongshan N Rd.
- **Walk:** official "near Zhongshan exit 3, 5 min". GM from exit 3 is **8 min / 550 m** (the address is on the lane behind; the front plaza is on Zhongshan N Rd). From exit 4, 10 min.
- **Rooms:** **538** (478 rooms and 60 suites).
  - Superior 39 m² (walk-in shower, no tub mentioned); Deluxe 45 m² ("largest standard room of any international hotel in Taipei", official).
  - **Family Balcony Room 65 m² including terrace, 4 adults, 5F.**
  - Junior Suite 65 m² with a tub. Check-in 15:00 / out 11:00.
- **Pool:** **heated rooftop pool**, 07:00–22:00 (last entry 21:30). Children under 140 cm must be with an adult.
- **Gym:** 06:00–22:30, **16+**. Rooftop Wellspring Spa (World Spa Awards "Best Hotel Spa in Taiwan" 7 years in a row).
- **Sauna:** **B3 sauna closed 24 Sep – 30 Nov 2026** for maintenance (official).
- **Kids:** fairy-tale playroom on 5F, **Fri, Sat and holidays only**, 14:00–17:00 and 18:00–21:00. Lounge on 5F (15:00–21:00). Children 11 and under stay free without a bed (vivianexplore, Jul 2026; not on the official pages).
- **Dining:** 8 venues (Mihan Honke, Brasserie, azie, Robin's Grill, Robin's Teppanyaki, Gallery lounge, Silks House, Lan Ting), plus the basement luxury galleria.
- **Recognition:** MICHELIN Guide listed hotel (no Key).
- **Airport bus:** Airbus 1961 stops at the Regent's front plaza.
- **Price:** on Booking only Club rooms and suites were on sale: **Club King NT$16,781** (Wed 11); NT$17,727 (Wed 18). **No availability** on Saturdays 7, 14 or 21 Nov. The standard-room rate is unknown (gap).
- **Klook:** `https://www.klook.com/en-GB/hotels/detail/255449-regent-taipei/?aid=8733` ✔ (No.3, Ln.39, Sec.2 Zhongshan N. Rd.).

### 4.3 Humble Boutique Hotel 寒居酒店
- **Address:** 1F–9F, No. 116, Songjiang Rd. Register licence: Taipei hotel no. 752; **111 rooms**.
- **Group:** Humble House (寒舍) group; designed by AB Concept. **Opened 2022.** Not the same hotel as Humble House Taipei in Xinyi.
- **Walk:** Songjiang Nanjing **exit 2, 1 min / 50 m**; exit 8 (lift) 2 min / 120 m; exit 7 2 min / 110 m (GM). mimigo: exit 2.
- **Rooms:** 燁鴞 8 ping (about 26 m²); 鄰鴞 twin 10 ping (about 33 m²); 隅鴞 corner 11 ping (about 36 m²), windows on two sides; plus 2 suite types.
  - Every room has **floor-to-ceiling windows, a separate bathtub and a walk-in shower**.
- **Pool:** 10F heated pool, **by reservation**. 10F gym. Sauna (register).
- **Kids / occupancy:** **maximum 2 adults per room; no extra beds, no cots** (mimigo, May 2026). Not a family hotel.
- **Check-in/out:** 15:00 / 11:00 (mimigo); one listing says 12:00 check-out (snippet). Conflict.
- **Dining:** BeGood Mediterranean all-day restaurant (snippet).
- **Price:** **no availability on Booking for any November date tried** (10, 11 and 18 Nov). Wed 2 Dec: Standard Double **NT$5,775**, Deluxe NT$6,122, Corner King NT$6,468. Register rack range NT$15,000–38,000.
- **Klook:** `https://www.klook.com/en-GB/hotels/detail/750652-humble-boutique-hotel/?aid=8733` ✔ (No. 116, Songjiang Rd.).

### 4.4 DoubleTree by Hilton Taipei Zhongshan 台北中山九昱希爾頓逸林酒店
- **Address:** No. 123, Sec. 1, Zhongshan N Rd (at the mouth of 七條通 per yama).
- **Walk:** Zhongshan **exit 2, 4 min / 230 m** (GM); exit 1 about 5 min. Time Out: 5 min. marksfootprint: 3 min / 250 m.
- **Rooms:** about 106 rooms and suites (Hilton snippet). King/Twin Guest Rooms; Corner King with Balcony; corner suites 46 m² with pull-out beds (Time Out). Bathtubs, balconies and Nespresso (woohotel, Dec 2023).
- **Facilities:** fitness centre; **no pool**; **free self-parking** (official); cots available; **no connecting rooms**; no pets. All-day restaurant Alley; La Salle lobby bar.
- **Kids (official):** **under-18s stay free with existing bedding** on room-only rates. Meals free for 5 and under; 50% off for ages 6–11.
- **Check-in/out:** 15:00 / 12:00.
- **Price:** Wed 11 Nov only corner suites left, **NT$13,860**. Wed 18 Nov: **King Guest Room NT$8,432**. Sat 14 Nov: Corner King with Balcony NT$11,666.
- **Noise:** mimigo and marksfootprint say soundproofing is good.
- **Klook:** `https://www.klook.com/en-GB/hotels/detail/406783-doubletree-by-hilton-taipei-zhongshan/?aid=8733` ✔ (No. 123, Sec 1. Zhongshan N. Rd).

### 4.5 The Tango Taipei Nanxi 天閣酒店南西館
- **Address:** No. 3, Nanjing W Rd (on the corner right by the station). Klook calls it "Nanshi"; the official English is "Nanxi"/"NanShi".
- **Walk:** Zhongshan **exit 3, 1 min / 22 m** (GM; official "1 min"). Exit 4 (lifts) 2 min / 150 m.
- **Rooms (official):** Superior Studio, Executive Studio, Junior King, Premium King (street-view picture windows), Eagle Suite (balcony towards Yuanshan) and Tango Suite.
  - The **Superior Studio has no window** (Booking room name).
  - Junior King: jacuzzi tub and separate shower (shin.tw). Free minibar and microwave (shin.tw).
  - Renovated mid-2020 (shin.tw).
- **Facilities:** breakfast room on 1F; business centre. No gym (TripAdvisor snippet).
- **Price:** Superior Studio (no window) **NT$3,726**; Junior King NT$4,131; Premium King NT$4,536. **Sat 14 Nov: Junior King NT$6,399** (the only room left).
- **Noise:** not reported. It sits on the busy Nanjing W Rd junction.
- **Klook:** `https://www.klook.com/en-GB/hotels/detail/270997-the-tango-taipei-nanshi/?aid=8733` ✔ (3, Nanjing W. Rd.).

### 4.6 amba Taipei Zhongshan 台北中山意舍酒店
- **Address:** No. 57-1, Sec. 2, Zhongshan N Rd, on the tree-lined boulevard.
- **Walk:** official "about 5 min, exits 3–4 (escalators)". GM: exit 3 **8 min / 500 m**; exit 4 8 min / 550 m.
- **Rooms (official): 90.**
  - Smart 20 m²; Medium 24 m²; Corner 26 m²; Large 30 m² (1 extra bed possible); Balcony 31 m².
  - Rain showers (Ximending sister; Zhongshan not confirmed).
- **Kids (official):** in **Large and Balcony rooms only**, 1 child aged 12 or under stays free (no breakfast, no extra bed). Baby kit to borrow: cot, bath, steriliser, bottle warmer, play tent.
- **Facilities:** **free self-service laundry on 2F**; **no gym** (fitness kit to borrow); no parking (public car park 2 min away); Buttermilk restaurant and MUD bar (B1, DJ nights).
- **Check-in/out:** 15:00 / 12:00.
- **Noise:** guests mention thin soundproofing and laundry-room noise, and "tree view" rooms that look at offices (TripAdvisor summary, snippet; not used).
- **Price:** Wed 11 Nov only Large/Balcony left, **NT$6,006**. **Sold out** on Saturdays 7, 14 and 21 Nov.
- **Klook:** `https://www.klook.com/en-GB/hotels/detail/557374-amba-taipei-zhongshan/?aid=8733` ✔ (57-1 Section 2 Zhongshan North Road).

### 4.7 Parkview Taipei 美侖商旅
- **Address:** No. 49, Jilin Rd (the address resolves to 3F). Opened 2019 (nigi33, snippet). 70 rooms, rooms 29.7 m² (colatour, snippet).
- **Walk:** official **Songjiang Nanjing exit 8, then Songjiang Rd Lane 132, about 5 min**. GM: exit 5 5 min / 300 m; exit 1 6 min / 400 m; exit 2 7 min. marksfootprint says 3 min / 250 m (too short). From Zhongshan exit 3 it is 15 min / 1.0 km.
- **Rooms (official):** Deluxe (2F–6F) and Premier (7F–9F), Double or City View, plus **City View Triples** (no desk).
- **Facilities (official):** **Rooftop pool garden**, gym, Cafe49 restaurant and bar, "strolling lounge" courtyard. Free minibar (colatour snippet). Robot delivers takeaways to rooms (Away to the City).
- **Price:** Business Double **NT$6,200**; Premier Double NT$6,758. **Sat 14 Nov: Premier NT$8,990.**
- **Klook:** `https://www.klook.com/en-GB/hotels/detail/424671-parkview-taipei/?aid=8733` ✔ (No. 49, Jilin Road).

### 4.8 The Tango Taipei ChangAn 天閣酒店長安館 (owner)
- **Address:** **No. 80, Linsen N Rd** (official, Booking and Klook agree). It is in the Tiaotong grid despite the name.
- **Walk:** official Zhongshan **exit 2, 7–10 min**, or **Shandao Temple (Blue) exit 1, 7–10 min**. GM: Zhongshan exit 2 **9 min / 600 m**; exit 3 9 min; Shandao Temple exit 1 9 min / 600 m; Taipei Main 10 min / 650 m.
- **Rooms (official, 12 types):**
  - 天璽 rooms and twins come **with a washing machine and a back balcony**.
  - 天爵 / 天際 / 閣樓 rooms have balconies or terraces; 天泉 has a bathroom open to the room, with a 101 view.
  - Jacuzzis: "Premium rooms have Jacuzzi" (TripAdvisor snippet). Surround sound is not confirmed on the official page.
- **Facilities:** lounge, meeting room, gym (official). Free parking (Travel Lemming).
- **Noise / area:** a reviewer calls the area "a little iffy", and street noise is mentioned (TripAdvisor snippets; not used as fact).
- **Price:** Corner King **NT$3,713**; Majesty Suite NT$3,819. **Sat 14 Nov: only Eagle Suite, NT$7,161.** Sat 21: none.
- **Klook:** `https://www.klook.com/en-GB/hotels/detail/67944-the-tango-taipei-changan/?aid=8733` ✔ (No.80, Linsen N. Rd.). This is the owner's existing link.

### 4.9 Gloria Residence 華泰瑞舍 (owner)
- **Address:** No. 359, Linsen N Rd (at Minsheng E Rd). Register licence no. 435.
- **Building:** façade by Jun Aoki (Louis Vuitton's architect), with more than 2 million mosaic tiles; interiors by 陳瑞憲 (official).
- **Walk:** official **10 min to Shuanglian (exit 1)** or **Zhongshan Elementary (exit 2)**. GM: 9 min / 600–650 m from either.
- **Apartments (official):**

  | Type | Size | Sleeps |
  |---|---|---|
  | Abundance | 43 m² | 2 |
  | Infinity | 51 m² | 2 |
  | Royal B | 64 m² | 2 |
  | Royal A | 70 m² | 2 |
  | Oasis | 85 m² | 4 |
  | Luxury | 91 m² | 2 |
  | Glory | 158 m² | 4 |

  - Every unit: European kitchen with extractor, microwave-oven, dish dryer, coffee machine and full crockery.
  - **Washer-dryer (with detergent) on the balcony.**
  - Bathtub (Abundance, confirmed).
- **Facilities:** **heated indoor pool** with windows onto a garden; B1 "The Lounge", **open 24 hours**, with a games area; service centre.
- **Parking:** **1 free space per room** (official; car-tower size limits, entry 08:00–22:00; or a 24-hour car park 5 min away).
- **Airport:** Airbus 1961 stops at 聚盛里, next door. Paid airport cars.
- **Price:** Abundance **NT$7,440** (Wed); **Sat 14 Nov NT$7,840**; Sat 21 NT$7,440. That is **little weekend premium**.
- **Not confirmed:** "induction hob", "terrace" and "24-hour reception" (the lounge is 24h; reception hours are not stated).
- **Klook:** `https://www.klook.com/en-GB/hotels/detail/113738-gloria-residence/?aid=8733` ✔ (No.359 LinSen North Road).

### 4.10 Just Sleep Taipei Zhongshan 捷絲旅台北中山館 (new)
- **Address:** No. 39, Lane 135, Sec. 1, Zhongshan N Rd (**八條通**). Register licence 819-1. Silks (晶華) group, the Regent's owner.
- **Opened:** **17 June 2026.** First month: 82% occupancy, average rate about NT$2,500.
- **Walk:** official **Zhongshan exit 2, 5–8 min**. GM: exit 2 **7 min / 450 m**.
- **Rooms:** **50** (6 singles), 4–6 ping (about 13–20 m²). **All rooms have exterior windows.**
  - Room types: Standard Single, Standard Twin and Standard Queen; the Deluxe (雅緻) and Deluxe Balcony rooms have **bathtubs** and bidet toilets.
- **Kids:** **no extra beds or cots in any room type** (official).
- **Facilities:**
  - **Free red and white wine 19:00–20:00** nightly, the only Just Sleep that does this.
  - Self-service washers and dryers; 24-hour service desk.
  - Breakfast 07:00–09:30 in "Just Café" (retro diner / Shōwa kissaten style).
  - **No parking** (Linsen Park public car park).
- **Design:** based on the TV drama 華燈初上 (*Light the Night*), set in Tiaotong hostess bars.
- **Check-in/out:** 15:00 / 11:00.
- **Noise:** one guest review mentions hearing neighbours and corridor cleaning (search summary; unconfirmed, not used).
- **Price:** Single **NT$3,264**; Standard Twin NT$3,643; Deluxe with Balcony NT$4,023. **Sat 14 Nov: Standard Twin NT$5,541.**
- **Klook:** `https://www.klook.com/en-GB/hotels/detail/2254774-just-sleep-taipei-zhongshan/?aid=8733` ✔ (No. 39, Ln. 135, Sec. 1, Zhongshan N. Rd.).

### 4.11 Goldinn Hotel 錦棧旅店 (owner)
- **Address:** 2F, No. 413, Linsen N Rd (at Fujin St). Lobby on 2F; rooms reached by a separate lift (TripAdvisor snippet). Established 2015 (snippet).
- **Walk:** Zhongshan Elementary **exit 2, 4 min / 300 m**; exit 1 5 min / 300 m (GM). Owner "4 mins (Orange)" is right. Shuanglian exit 2 is 10 min.
- **Rooms (Booking):** Exquisite Double – **No Window** (cheapest), Standard Double, Deluxe Double and Twin, Triple, **Quadruple**.
- **Facilities:** small gym and self-service laundry (colatour listing; the official site is **under construction**). Free snacks and bar (OTA). 24-hour desk (OTA). Carrefour downstairs (snippet).
- **Short-stay packages:** OTAs (colatour, FunNow) sell **2–3 hour "rest" packages**, including a "Romantic GOIN Suite". This matters for the family/tone angle: say it plainly but tactfully, or don't recommend it for families.
- **Area:** a reviewer advised care when coming and going at night (TripAdvisor snippet).
- **Price:** Exquisite Double (no window) **NT$1,962**; Standard Double NT$2,052; Quad NT$3,222. **Sold out Sat 14 Nov**; Sat 21 Nov Standard Double NT$3,042.
- **Editorial support:** none found.
- **Klook:** `https://www.klook.com/en-GB/hotels/detail/47440-goldinn-hotel/?aid=8733` ✔ (2F.,No.413, Linsen N. Rd.).

### 4.12 Via Hotel Loft 丰居旅店雙連館
- **Address:** **2F, No. 42, Sec. 1, Minsheng E Rd** (official, Booking and Klook). It is not on Chang'an W Rd, as some aggregators imply.
- **Walk:** Shuanglian exit 2, **6 min / 400 m** (GM). Zhongshan Elementary 9–10 min.
- **Rooms:** Double, Twin, Triple and Quad (official). About 6 ping (snippet).
  - **Windowless options:** Economy Double (no window) and Deluxe Twin (no window) on Booking.
- **Facilities (official):** **free self-service laundry; 24-hour free light supper and drinks**. Away to the City: free evening snacks, drinks and cup noodles.
- **Noise:** "not soundproof" (Oyster/TripAdvisor snippet; not used).
- **Price:** Economy Double (no window) **NT$2,011**; Deluxe Double NT$2,301. **Sold out Sat 14 Nov**; Sat 21 Nov Standard Twin (no window) NT$4,621.
- **Klook:** `https://www.klook.com/en-GB/hotels/detail/453189-via-hotel-loft/?aid=8733` ✔ (2F, No. 42, Sec. 1, Minsheng East Road).

### 4.13 Hotel Fun Linsen 趣旅館林森館 (hostel beds + private rooms)
- **Address:** 1F, No. 487, Linsen N Rd. A Hostelling International (YH) member.
- **Walk:** Zhongshan Elementary **exit 2, 5 min / 400 m**; exit 1 6 min (GM). bobbytravel: 3 min.
- **Beds and rooms:**
  - Male, female and mixed dorms (4–10 beds) and capsules; beds 100 × 185 cm.
  - Private doubles (including a windowless Economic Double), triples, quads, and 4- and 6-person family rooms with a shared bathroom.
  - Capsules feel cramped (search summary).
- **Facilities:** free massage chairs, pool table, washer-dryers, computer desks and a simple buffet breakfast (bobbytravel, Jul 2026).
- **Reception:** **24 hours**. Check-in 15:00, check-out 12:00.
- **Age:** lead guest **18+**; **under-18s cannot stay alone** (YH page, snippet).
- **Noise:** "rooms small, soundproofing OK" (bobbytravel); "poor soundproofing" (another blog, snippet). Split.
- **Price (1 adult for dorms):** dorm bed **NT$824**; Economic Double (no window) NT$1,772; Standard Double NT$1,952. **Sat 14 Nov: dorm NT$941–1,058; Triple NT$4,471.**
- **Klook:** `https://www.klook.com/en-GB/hotels/detail/576293-hotel-fun--linsen-branch/?aid=8733` ✔ (No. 487, Linsen N. Road).

### 4.14 Taipei Discover Hostel 台北發現青旅
- **Address:** 5F, No. 21, Sec. 2, Minquan E Rd.
- **Walk:** Zhongshan Elementary **exit 3, 3 min / 210 m**; exit 4, 4 min / 240 m (GM). Xingtian Temple exit 1, 13 min.
- **Beds:** 76 capsule-style beds over 3 floors. Mixed and female dorms; an 8-bed mixed room. Reading lamps and sockets (Broke Backpacker).
- **Reception:** **10:00–22:00 Sun–Thu; 10:00–24:00 Fri–Sat**. There are late-arrival key procedures, although the same Hostelworld page also says "24-hour reception", which conflicts.
- **Age:** **16+**.
- **Rules:** no curfew, quiet after 22:00. No kitchen or laundry listed on Hostelworld; the Broke Backpacker mentions free breakfast (conflict).
- **Price (1 adult):** bunk **NT$750**; **Sat 14 Nov NT$1,200**.
- **Klook:** `https://www.klook.com/en-GB/hotels/detail/48299-taipei-discover-hostel/?aid=8733` ✔ (5F., NO.21, Sec.2, Mincyuan E. Rd.).

### 4.15 Prices at a glance (Wed 11 / Sat 14 Nov, cheapest room on sale)

| Hotel | Wed | Sat | Note |
|---|---|---|---|
| Regent | 16,781 (Club only) | none | Standard rooms not on Booking |
| DoubleTree | 13,860 (suites only); 8,432 on Wed 18 | 11,666 | |
| Okura | sold out; 7,970 on Wed 18 | none (7, 14, 21) | |
| Gloria Residence | 7,440 | 7,840 | 43 m² apartment |
| Parkview | 6,200 | 8,990 | |
| amba Zhongshan | 6,006 | sold out | |
| Humble Boutique | no Nov availability; 5,775 on Wed 2 Dec | – | |
| Tango Nanxi | 3,726 (no window) | 6,399 | |
| Tango ChangAn | 3,713 | 7,161 (suite only) | |
| Just Sleep Zhongshan | 3,264 single / 3,643 twin | 5,541 | |
| Via Loft | 2,011 (no window) | sold out | |
| Goldinn | 1,962 (no window) | sold out | |
| Hotel Fun Linsen | 1,772 double; 824 bed | 941 bed | |
| Taipei Discover | 750 bed | 1,200 bed | |

**Weekend pattern:** mid-range and budget rooms rise about 50–100%+ on Saturdays, and several sell out. The serviced apartment (Gloria) barely moves.

---

## 5. Claim table: owner's Zhongshan text (best-areas-and-hotels-to-stay #Zhongshan, #Long-Stay)

| # | Owner's claim | Verdict | Finding | Source | Date |
|---|---|---|---|---|---|
| O1 | Time Out 34th coolest neighbourhood, 2023 | VERIFIED (snippet) | | STV list | 2023 |
| O2 | Okura "2 mins (Red/Green)" | CORRECTED (minor) | 3 min from exit 3 (GM); official 5–10 | GM; Okura | 29 Sep 2026 |
| O3 | Okura heated rooftop pool; popular patisserie; all rooms large with tubs and sofas | VERIFIED | Heated rooftop pool (21F); The Nine bakery; all rooms have tubs; from 44 m². Sofas not checked | Okura official | 29 Sep 2026 |
| O4 | Regent "5 mins" | VERIFIED (official) / GM 8 | Official 5 min from exit 3; GM 8 min to the lane address | Regent; GM | same |
| O5 | Regent Michelin-listed; 8 dining options; heated rooftop pool and spa; afternoon tea | VERIFIED | Note the sauna closure, 24 Sep–30 Nov 2026 | Michelin; Regent | same |
| O6 | Regent photo caption "separate bathtub" | UNCONFIRMED for entry rooms | Superior has a walk-in shower; tub confirmed only for the Junior Suite | Regent | same |
| O7 | Gloria "5 mins (Red)" (in two tables) | CORRECTED | **10 min** official; 9 min GM | Gloria; GM | same |
| O8 | Gloria "about 14 minutes' walk to Ningxia" | CORRECTED | **18 min / 1.2 km** (GM) | GM | same |
| O9 | Gloria indoor pool, lounge, free parking, washer-dryer | VERIFIED | Pool heated; lounge 24h; 1 free space per room | Gloria | same |
| O10 | Gloria "induction hob", "terrace", "24-hour reception" | UNCONFIRMED | Not on the official pages | – | – |
| O11 | "There are four Tango hotels in Taipei; Tango Changan is the Zhongshan one" | CORRECTED | **Seven** Tango Hotels in Taipei; **three** in Zhongshan (ChangAn, Linsen, Nanxi) | tango-hotels.com | 29 Sep 2026 |
| O12 | Tango ChangAn "6 mins (Red/Green)" | CORRECTED | 7–10 official; **9 min** GM | Tango; GM | same |
| O13 | Tango ChangAn "jacuzzis and surround sound" | UNCONFIRMED | Official room list mentions washing machines, balconies and terraces, not jacuzzis | ca.tango-hotels.com | same |
| O14 | Goldinn "4 mins (Orange)" | VERIFIED | 4–5 min from Zhongshan Elementary | GM | same |
| O15 | Goldinn windowless options, small gym, laundry | VERIFIED (OTA-level) | Official site offline | Booking; colatour | same |
| O16 | Table prices (NT$9,000 / 13,500 / 5,000 / 4,000 / 2,000) | Partly outdated | Nov weekday: Okura 7,970; Regent Club 16,781 (standard not listed); Gloria 7,440; Tango ChangAn 3,713; Goldinn 1,962. The page says "checked August 2026" | Booking | 29 Sep 2026 |
| O17 | Map list "Golden Inn" | Naming | It is Goldinn / 錦棧. The label mirrors the Google My Map, so change both or neither. Gloria is missing from the map list | – | – |

---

## 6. Discrepancies as exact find/replace strings

Each find string was checked with a script against `content/posts.json` on 29 Sep 2026. **Each matches exactly once** in the named post. These are suggestions for the owner; nothing has been edited.

**Post `best-areas-and-hotels-to-stay`**

1. Tango count
   - Find: `There are four Tango hotels in Taipei; `
   - Replace: `There are seven Tango hotels in Taipei, three of them in Zhongshan; `
   - Also consider removing "is the Zhongshan one": find `is the Zhongshan one, with a wide spread of room types including some with jacuzzis and surround sound.` → replace `sits among the Tiaotong lanes off Linsen North Road, with a wide spread of room types including some with a washing machine and balcony.` (the jacuzzi claim is unconfirmed; see O13).
2. Gloria walk (Zhongshan table)
   - Find: `<td>NT$5,000</td><td>5 mins (Red)</td>`
   - Replace: `<td>NT$7,500</td><td>10 mins (Red/Orange)</td>`
3. Gloria walk (Long-Stay table)
   - Find: `<td>from NT$5,000</td><td>5 mins (Red)</td>`
   - Replace: `<td>from NT$7,500</td><td>10 mins (Red/Orange)</td>`
4. Tango ChangAn walk
   - Find: `<td>NT$4,000</td><td>6 mins (Red/Green)</td>`
   - Replace: `<td>NT$4,000</td><td>9 mins (Red/Green)</td>`
5. Okura (optional)
   - Find: `<td>NT$9,000</td><td>2 mins (Red/Green)</td>`
   - Replace: `<td>NT$8,000</td><td>3 mins (Red/Green)</td>`
6. Ningxia walk from Gloria
   - Find: `it's about 14 minutes' walk to Ningxia Night Market with Xingtian Temple nearby`
   - Replace: `it's about 18 minutes' walk to Ningxia Night Market`
   - (Xingtian Temple is about 1 km away, so "nearby" is loose.)
7. Gloria facilities (only if the owner can't confirm reception hours and a terrace)
   - Find: `There's an indoor pool, a terrace, a lounge, 24-hour reception and free parking`
   - Replace: `There's a heated indoor pool, a 24-hour lounge and a free parking space for each apartment`
8. Gloria kitchen (optional)
   - Find: `Every apartment has an induction hob, microwave, full cookware and a washer-dryer`
   - Replace: `Every apartment has a full kitchen with an extractor, microwave oven, cookware and a washer-dryer`

**Post `where-to-go-when-raining`**

9. Metro mall length
   - Find: `so you can walk the entire 2km length to the many malls located next to this MRT station`
   - Replace: `so you can walk its entire 815m length to the malls beside Zhongshan station`

**Left alone** (verified or trivial):
- `ningxia-night-market` "Shuanglian Station (red line - exit 1)": both Shuanglian exits are about 10 min.
- `best-districts-and-areas` "34th coolest neighbourhood in the world" and "including a lot of karaoke".
- `chinitas-cubano` says "Nanjing Fuxing (red line - exit 2)". Nanjing Fuxing is Green/Brown, not Red. It is outside this page's remit and was not checked further.
- `joseph-bistro` is marked permanently closed; don't link it.

---

## 7. Gaps

- **Prices are single-source (Booking.com).** Okura, Regent (standard rooms), Humble and amba had no or partial November availability, so their weekday figures come from other dates or room classes. Klook prices were not checked.
- **Humble Boutique:** November rates are unknown; check-out 11:00 vs 12:00; pool hours not found. Its official site did not resolve (humbleboutiquehotel.com has no DNS); the Facebook page exists.
- **Regent:** the standard-room price is unknown; the child free-age (11) is from a blog only; bathtubs in entry rooms are unconfirmed.
- **DoubleTree:** room count and sizes are from snippets (the Hilton rooms page wouldn't render); bathtubs come from woohotel (Dec 2023).
- **Tango Nanxi / ChangAn:** official room pages give no sizes; jacuzzi and surround-sound claims are unconfirmed.
- **Just Sleep Zhongshan:** no independent review yet (opened Jun 2026); noise near the Tiaotong bars is untested.
- **Goldinn:** no editorial review; the official site is offline; facilities come from OTA listings; the hourly packages are confirmed only via OTA listings.
- **Gloria:** reception hours and "terrace" unconfirmed.
- **Taipei Discover Hostel:** reception hours and breakfast conflict between sources.
- **Hotel Fun:** the age rule is from the YH page (snippet).
- **Exit 3 and exit 1 coordinates at Zhongshan** are estimated from the official map (OSM's "3" tag is misplaced). Walk times from those exits may be ±1 min.
- **Journey time Songjiang Nanjing → Taipei 101** was not computed (it needs a change).
- **Linsen North Road noise per hotel** is mostly undocumented; the only mentions are TripAdvisor snippets (Tango ChangAn, Goldinn).
- **Airbus 1961 fare** is not stated (conflicting, as in the Ximending research).

---

## 8. Internal slugs that exist (checked in content/posts.json)

**Hotel pages and area guides**
- `best-areas-and-hotels-to-stay` (#Zhongshan, #Long-Stay, #Other)
- `best-districts-and-areas` (#Zhongshan, #Datong)
- `hotels-near-taipei-main-station`, `hotels-near-ximending`, `hotels-near-taipei-101`

**Nearby sights and nightlife**
- `ningxia-night-market`, `dihua-street-dadaocheng-guide`, `datong-walking-route`
- `taipei-nightlife` (has the Linsen/Tiaotong hostess-bar note), `best-bars-in-taipei`, `best-cocktail-bars-in-taipei`, `best-places-to-drink-craft-beer-taipei`
- `hsing-tian-kong-temple`, `addiction-aquatic-development`, `museum-of-contemporary-art` (Zhongshan exit 6), `the-spot-cinemas` (SPOT Taipei, near Zhongshan MRT), `fine-arts-museum`, `the-grand-hotel`, `martyrs-shrine`

**Shopping and getting around**
- `where-to-shop-in-taipei`, `best-shopping-malls-in-taipei`, `where-to-go-when-raining`
- `songshan-airport`, `taoyuan-airport-mrt`, `mrt`, `taipei-public-transport`, `taiwan-easycard`, `taipei-youbike`, `taipei-sightseeing-bus` (stops at Zhongshan Station and the Regent)

**Food and practical**
- `michelin-food-stands-at-night-markets`, `michelin-bib-gourmand-taiwanese-small-eats-taipei`
- `best-places-to-keep-kids-amused`, `taipei-laundrettes`, `taipei-convenience-stores`

**Zhongshan venues**
- `smith-and-hsu` (Zhongshan exit 2), `miacucina` (Nanxi branch), `broccoli-beer` (Songjiang Nanjing), `brass-monkey` (Nanjing Fuxing)
- `joseph-bistro` is **permanently closed**; don't link it.

**Not found:** no posts exist for Chifeng Street, Linsen North Road / Tiaotong bars, or the linear park.

---

## 9. Photo keys (folder-style, to match data/hotel-photos.json)

**Existing keys** (under `best-areas-and-hotels-to-stay`; the files exist in `public/media/2026/09/hotels/`):
- `okura-prestige-taipei` (files -1, -2)
- `regent-taipei` (-1, -3)
- `gloria-residence-taipei` (-2, -3)
- `tango-hotel-taipei-changan` (-1, -2)
- `goldinn-hotel-taipei` (-1)
- Out-of-area owner picks, if the writer mentions them in passing: `hotel-indigo-taipei-north`, `the-grand-hotel-taipei`

**New keys proposed** (following the existing patterns, e.g. `tango-hotel-taipei-xinyi`, `just-sleep-ximending`, `amba-ximending`):
- `humble-boutique-hotel-taipei` (**not** `humble-house-taipei`, which is the Xinyi hotel)
- `doubletree-taipei-zhongshan`
- `tango-hotel-taipei-nanxi`
- `amba-zhongshan`
- `just-sleep-zhongshan`
- `parkview-taipei`
- `via-hotel-loft-taipei`
- `hotel-fun-linsen`
- `taipei-discover-hostel`

**Out of scope but in Zhongshan District** (owner's "Further Afield"):
- Hotel Indigo Taipei North: No. 200 Zhifu Rd, Dazhi, Brown line. Klook 345235 ✔.
- The Grand Hotel: No. 1, Sec. 4, Zhongshan N Rd, Jiantan, 15 min. Klook 409425 ✔.
- A one-line "elsewhere in Zhongshan District" pointer to `best-areas-and-hotels-to-stay#Other` is the tidy way to handle them.
