# Research: Hotels in Daan

Checked 29 September 2026. This file is research, not article copy. Proposed slug: `hotels-in-daan`.

**Scope used**
- Hotels in **Da'an District** nearest these stations: **Zhongxiao Fuxing** (BL15/BR10), **Zhongxiao Dunhua** (BL16), **Daan** (R05/BR09), **Xinyi Anhe** (R04, for the Dunhua South Road hotels), **Daan Park** (R06), **Dongmen** (R07/O06, Yongkang Street side), **Technology Building** (BR08) and **Liuzhangli** (BR07, for the Shangri-La). **Zhongxiao Xinsheng** (BL14/O07) is included as the western edge, because MGH Mitsui Garden (No. 30, Zhongxiao E Rd Sec 3) is in Da'an District and is a strong consensus pick.
- **Kept out of Xinyi.** Nothing here is on `hotels-near-taipei-101`. That page's research explicitly left "Shangri-La Far Eastern, Proverbs, Kimpton, Episode, United, Eastin" out as Da'an, so they are free to use. United Hotel (Go Ask a Local's East District pick) is by the Taipei Dome in Xinyi and is excluded. Eslite Hotel, HOME HOTEL Xinyi, Hanns House and Humble House are on the 101 page and are excluded.
- **Kept out of Zhongzheng.** Chaiin Hotel Dongmen (No. 163, Xinyi Rd Sec 2) and ARK Hotel (No. 255) are on the north side of Xinyi Road, which is **Zhongzheng District** (Booking and the blog listing both say so). Dongmen 3 Hostel (No. 110, south side) is in Da'an. Hotel Gracery and Tian Cheng Huashan (Zhongxiao Xinsheng) are in Zhongzheng.
- **Gongguan / NTU / Guting** (Just Sleep NTU, GoodMore, Fuhua Education Center) came up in several round-ups but are outside the brief's station list. They are in section 9 only.

**How this was checked**
- **Consensus.** English and Traditional Chinese editorial pages were opened (WebFetch or browser), not read from snippets. Anything taken from a search snippet only is marked "(s)".
- **Excluded from counts:** booking sites and OTA content (Booking, Agoda, Trip.com, Klook, Expedia, Hotels.com, Trivago, Kayak, HotelsCombined incl. its hotelscombined.com.tw "news" article, FunTime, AsiaYo, ezTravel, Wing On), TripAdvisor, Wanderlog, Oyster, "gettaipeihotels"/"tw-taiwan.com" style clone sites, forums, press releases, and **pure affiliate lists with no author or date**: **lifeinpocket.com** (no author/date, Agoda/Klook links) and **boo2k.com** (affiliate list, Aug 2023). Their picks are shown in brackets for information only. **pandafishtrip.tw** is borderline affiliate (as in the Zhongshan research) and is counted but flagged. Nick Kembel's own site and Taiwan Obsessed (also Nick Kembel) count once. vivianjourney.tw now redirects to vivianexplore.tw (same author, counted once).
- **Walking times.** Google Maps walking directions (GM), run live on 29 Sep 2026 from each exit's street entrance (OpenStreetMap `railway=subway_entrance` nodes, pulled from the Overpass API on 29 Sep 2026) to the hotel. Official figures are given alongside. Exit coordinates used are in section 3.
- **Prices.** Booking.com, TWD, **Wednesday 11 to Thursday 12 November 2026, 1 night, 2 adults** (1 adult for hostel beds), checked 29 Sep 2026. Saturday = **14 to 15 November**. Where sold out, Saturdays 7 and 21 Nov were tried and are labelled. Figures are the lowest price shown for each room type (Booking's displayed price). Prices are a single-source snapshot, not editorial evidence.
- **Station and area facts.** TRTC running-time open data (effective 30 Aug 2026, reused from the Taipei 101 research files), the Airbus 1960 stop list and fares (from the Taipei 101 research, sourced from airbus.com.tw), zh.wikipedia station pages, official hotel pages and news reports (SOGO Dunhua closure).
- **Working files** are in the session scratchpad `daan/` (exits.json/exits.txt, tt-utf8.csv, fare.txt, owner text dumps, check-finds.cjs).

---

## 1. Summary: what surprised us

1. **SOGO Dunhua has closed.** Far Eastern SOGO's Taipei Dunhua store (敦化館) **closed on 14 December 2025** after 31 years (udn, ETtoday). Only **SOGO Zhongxiao** (opened 1987) and **SOGO Fuxing** (2006) remain in the East District. Four owner posts still say "three SOGO malls" or list the Dunhua store (see section 6).
2. **Coffee Lover's Planet has left the East District.** It was in the SOGO Dunhua basement. It reopened at **Far Eastern Garden City (Taipei Dome, Xinyi)** in mid-September 2026 (Mirror Media, 17 Sep 2026). The owner's `coffee-lovers-planet`, `best-coffee-shops-in-taipei` and `taipei-east-district-dongqu` posts still place it in a SOGO basement in the East District.
3. **HOME HOTEL Da-An is now EPISODE Daan Taipei, JdV by Hyatt** (台北大安伊普索凱悅尚選酒店). It was rebranded and reopened on **24 May 2024** (Hyatt newsroom), at the same address, No. 219-2, Fuxing S Rd Sec 1. Older round-ups (e.g. yama.tw) still call it HOME Hotel Da-An. HOME HOTEL **Xinyi** still exists (on the 101 page).
4. **The Howard Plaza is mid-renovation.** Its official facilities page says the **gym has moved into guest room 836 (from 1 Mar 2026) without the sauna or steam room**, the **kids' room is closed until works finish**, and the **underground car park and EV chargers are suspended**. A search snippet says the **outdoor pool is closed for all of 2026**. It was named by two English publishers but is **left out** of the recommended list for now.
5. **Kimpton Da An is the only Daan hotel with a MICHELIN Key.** It got One Key in **2025 and again in the 2026 selection** (Michelin, 18 Sep 2026). The 2026 Taiwan Keys are Capella (2 Keys), plus Kimpton Da An, Mandarin Oriental, Villa 32 and four hotels outside Taipei. Madison, Eclat and Proverbs are **listed** on the Michelin hotel site but have **no Key**.
6. **Kimpton is now the priciest mid-week pick in Daan on Booking**: from **NT$11,000** on Wed 11 Nov (owner's table says NT$8,000). On Sat 14 Nov only Premium rooms were left, from **NT$18,134**.
7. **Hotel Eclat was the cheapest of the owner's luxury picks**: **NT$5,033** on Wed 11 Nov and NT$5,368 on Sat 14 Nov (owner's table says NT$8,000). Its weekend premium is small.
8. **The Shangri-La is further from the Brown line than the owner says.** GM: **Liuzhangli 9 min / 600 m**, Technology Building exit 1 11 min / 800 m, Xinyi Anhe 12 min, Daan 17 min. The owner's table says 6 mins (Brown). Its **43F rooftop pool was shut for maintenance from 31 Aug to 30 Sep 2026** and reopens on **1 Oct**. The 7F outdoor pool is a summer-only pool.
9. **Airbus 1960 (Taoyuan Airport) runs through Daan.** Towards the airport it stops at **遠東國際飯店 (Shangri-La, Dunhua S Rd)** and **福華飯店 (Howard Plaza)**. From the airport it also stops at **Zhongxiao Fuxing MRT** and **Technology Building MRT**. The fare from Far Eastern / Howard is **NT$175** (from Dec 2024).
10. **Weekend jumps are steep for the mid-range.** Park Taipei goes from NT$9,900 to NT$16,000 (+62%), Episode from NT$7,161 to NT$12,243 (+71%), and Dandy from NT$4,619 to NT$7,519. Green World ZhongXiao, Eastin, Dongmen 3 and Star Hostel East were **sold out on all three November Saturdays** checked.
11. **Star Hostel Taipei East had no Booking availability** for Wed 11, Wed 18, Sat 14 or Sat 21 Nov. Its official site says dorm beds start at NT$700 and private rooms at NT$2,000.
12. **Hotel UKETAMO (嵨開安旅)** is a new wellness hotel (Fortune Hotel Group's own brand) at No. 191, Fuxing S Rd Sec 1, 3 min from Zhongxiao Fuxing. It opened in 2025. So far it appears in only one round-up (pandafishtrip). It is in section 9.

---

## 2. Consensus counts

Columns:
- **EN** = distinct English editorial publishers naming it for Da'an / the East District ((s) = seen in a search summary only).
- **ZH round-ups** = Traditional Chinese multi-hotel lists opened.
- **Other** = single-hotel reviews (s), Michelin listing, and excluded affiliate lists [in brackets].

| Hotel | EN | ZH round-ups | Other | In guide? |
|---|---|---|---|---|
| Kimpton Da An 金普頓大安酒店 | 3 (Away to the City, Time Out, Eating in Taipei) +1 (s) Travel Lemming | 3 (yama, vivianexplore, mimigo) | **MICHELIN One Key 2025 & 2026**; Condé Nast Hot List 2020 (s); nigi33, kuolife, clairelin, vivianexplore reviews (s); [boo2k] | Yes (owner) |
| Shangri-La Far Eastern 台北遠東香格里拉 | 4 (Go Ask a Local, Travel Lemming, Eating in Taipei, Tara O'Reilly) | 0 | Condé Nast Readers' Choice (s); [lifeinpocket] | Yes (owner) |
| MGH Mitsui Garden Taipei Zhongxiao 和苑三井花園飯店 台北忠孝 | 2 (Away to the City, Travel Lemming) | 4 (yama, vivianexplore, pandafishtrip, mimigo) | rainieis, alinalife, mimigo reviews (s) | Yes |
| Park Taipei Hotel 台北美侖大飯店 | 3 (Go Ask a Local, Eating in Taipei, Tara O'Reilly) | 1 (mimigo) | [hotelscombined] | Yes |
| Hotel Proverbs 賦樂旅居 | 3 (Go Ask a Local, Taiwanderers, Time Out) | 0 | Michelin-listed (no Key) | Yes |
| EPISODE Daan (JdV by Hyatt) 台北大安伊普索凱悅尚選酒店 | 0 (+ Away to the City widget (s)) | 3 (yama as "HOME Hotel 大安", vivianexplore, pandafishtrip) | difenytravel, verse, marieclaire, flyformiles reviews (s) | Yes |
| Dandy Hotel Daan Park 丹迪旅店大安森林公園店 | 2 (Away to the City, Nick Kembel) +1 (s) Travel Lemming | 0 | niny, tutufoodaholic, posh, lambhut reviews (s) | Yes |
| Chez Nous 司旅 | 2 (Travel Lemming, Nick Kembel) | 0 | | Yes (owner) |
| Madison Taipei 台北慕軒 | 0 | 1 (pandafishtrip) | Michelin-listed; Michelin-recommended hotel 2018–20 (official awards page); shin.tw, rainieis, tsnio, ajtravel, tiffany0118 reviews (s) | Yes (owner) |
| Hotel Eclat 台北怡亨酒店 | 1 (Go Ask a Local) | 0 | Michelin-listed; SLH member; itravelblog review (opened, upd 29 Sep 2026); bring-you (s) | Yes (owner) |
| Green World ZhongXiao 洛碁大飯店忠孝館 | 0 | 1 (mimigo MRT list) | [boo2k] | Yes (budget) |
| Eastin Taipei 怡品商旅 | 0 | 1 (mimigo MRT list) | | Yes (budget) |
| Taipei Fullerton – Fuxing South 台北馥敦飯店復南館 | 1 (Go Ask a Local) | 0 | [lifeinpocket], [hotelscombined] | Yes (budget/mid) |
| Star Hostel Taipei East 合星青年旅館 | 3 (Go Ask a Local, Hostel Geeks, The Broke Backpacker*) | 1 (mimigo MRT list) | On the owner's Daan map | Yes (hostel) |
| DONGMEN 3 Hostel 東門3號青年旅店 | 2 (Nick Kembel / Taiwan Obsessed, Taiwanderers) | 0 | | Yes (hostel) |
| *Also named, not included* | | | | |
| The Howard Plaza 台北福華大飯店 | 2 (Go Ask a Local, Nick Kembel) | 0 | [boo2k] | **No: mid-renovation** (see §1.4) |
| Swiio Hotel Daan 二十輪旅店大安館 | 0 | 1 (vivianexplore) | [boo2k] | No: thin support (Daan Rd Sec 1 No. 185; Wed NT$6,740 / Sat NT$10,210) |
| Hotel UKETAMO 嵨開安旅 | 0 | 1 (pandafishtrip) | SuperTaste news (s) | No: new (2025), single source (Wed NT$7,623 / Sat NT$9,125) |
| Rido Hotel 麗都飯店 | 1 (Go Ask a Local) | 0 | | No: single source (No. 11, Xinyi Rd Sec 3, facing the park; Wed NT$4,290 / Sat NT$5,039) |
| Fullon Hotel Taipei 福容大飯店台北一館 | 1 (Nick Kembel) | 0 | | No: single source |
| Royal Rose Hotel | 1 (Tara O'Reilly) | 0 | | No: single source |
| Deja Vu Hotel | 1 (Go Ask a Local) | 0 | | No: single source |
| Hotelpoispois 泡泡飯店 | 0 | 1 (yama, 2021) | | No |
| United Hotel | 1 (Go Ask a Local) | 0 | | No: Xinyi (Taipei Dome) |
| Chaiin Hotel Dongmen | 1 (Taiwanderers) | 0 | | No: **Zhongzheng District** |
| Just Sleep NTU / GoodMore / Fuhua | 2 / 1 / 0 | 0 | [lifeinpocket] | No: Gongguan / Guting, outside the station list |

\* The Broke Backpacker gives Star Hostel East the Main Station branch's address ("4F, No. 50, Huayin Street, Datong District"), which is wrong. It is counted, but don't rely on it for facts.

**English publishers opened (with dates)**
- Away to the City (Viola & Sebastian, 21 Jun 2026): Dandy Daan Park, MGH Mitsui Garden ("our favourite stay in Taipei", first-hand), Kimpton ("second-favourite", first-hand).
- Travel Lemming (Sky Ariella, upd 23 Mar 2026): MGH Mitsui Garden (business), Shangri-La (families; deluxe family rooms), Chez Nous. The summary also mentioned Dandy and Kimpton (s).
- Nick Kembel (nickkembel.com, upd 19 Feb 2026): Dongmen 3 (first-hand), Dandy (researched for CNN; free strollers), Chez Nous (reader recommendation), Fullon, Howard Plaza. Same author as Taiwan Obsessed hostels (15 Jan 2026: Dongmen 3, exit 3, under a minute).
- Go Ask a Local (Jenna Lynn Cody, "June 15", year not shown): Da'an Park section – Shangri-La, Eclat, Park Taipei, Howard Plaza, Fullerton, Rido. East District section – Proverbs, United, Star Hostel East, Deja Vu.
- Taiwanderers (upd 2 Aug 2026): Dongmen – Dongmen 3, Chaiin Dongmen. East District – Proverbs. Gongguan – GoodMore, Just Sleep NTU.
- Eating in Taipei (2023): Shangri-La, Kimpton, Park Taipei, Just Sleep NTU.
- Tara O'Reilly (upd May 2026): Royal Rose, Park Taipei, Shangri-La.
- Time Out Taipei (Ken Chao, 17 Sep 2024): Kimpton, Proverbs.
- Hostel Geeks (upd 15 May 2026): Star Hostel Taipei East.
- The Broke Backpacker: Star Hostel Taipei East ("best party hostel").
- MICHELIN Guide: Kimpton One Key (2025, 2026 selection published 18 Sep 2026). Madison, Proverbs and Eclat are listed hotels.

**Traditional Chinese round-ups opened**
- yama.tw East District (金大佛, 31 Aug 2020, upd 13 Dec 2021 – dated): MGH, Tian Cheng Huashan (Zhongzheng), Gracery, HOME Hotel 大安 (now Episode), Hotelpoispois, Kimpton.
- vivianexplore.tw (upd 22 Sep 2026): MGH, Gracery, Episode, Kimpton, Humble Boutique (Zhongshan), Swiio Daan.
- pandafishtrip.tw (25–26 Sep 2026, borderline affiliate): UKETAMO, Episode, Madison, MGH.
- mimigo.tw (taipei-hotels, 31 Jul 2026): Kimpton, Eslite (Xinyi), Park Taipei, MGH. mimigo.tw (MRT hotels, 13 Sep 2026): Star Hostel East, Green World ZhongXiao, Eastin. Counted as one publisher.
- Checked, no Daan picks: bobbytravel.tw (30 Jul 2026).
- Excluded (affiliate, shown in brackets above): lifeinpocket.com, boo2k.com. Excluded aggregator: hotelscombined.com.tw.

**Owner's picks.** All five text picks (Madison, Eclat, Kimpton, Shangri-La, Chez Nous) are included, plus Star Hostel Taipei East from the owner's Daan map list. Madison and Eclat have the weakest outside editorial support, but both are Michelin-listed.

---

## 3. Claim table: area and station facts

**Exit coordinates used (OSM, 29 Sep 2026)**
- Zhongxiao Fuxing: 1 = 25.04179,121.54313; 2 = 25.04120,121.54348; 3 = 25.04145,121.54511; 4 = 25.04176,121.54504; 5 = 25.04201,121.54395.
- Zhongxiao Dunhua: 3 = 25.04131,121.55168; 5 = 25.04135,121.54976; 6 = 25.04109,121.54918; 7 = 25.04166,121.54990; 8 = 25.04193,121.54919.
- Daan: 1 = 25.03364,121.54200; 4 = 25.03306,121.54399; 5 = 25.03290,121.54387; 6 = 25.03418,121.54378.
- Xinyi Anhe: 1 = 25.03362,121.55258; 2 = 25.03307,121.55208; 4 = 25.03304,121.55345 (unlabelled OSM nodes; numbering by the ref tag).
- Daan Park: 1 = 25.03378,121.53444; 6 = 25.03385,121.53602.
- Dongmen: 3 = 25.03374,121.52783; 5 = 25.03365,121.52949.
- Technology Building: 1 = 25.02602,121.54370; 2 = 25.02587,121.54314. Liuzhangli: one node, 25.02382,121.55274 (owner posts call it exit 1).
- Zhongxiao Xinsheng: 1 = 25.04274,121.53186; 3 = 25.04174,121.53368; 4 = 25.04246,121.53320.
- Taipower Building: 3 = 25.02121,121.52789.

| # | Claim | Verdict | Fact / note | Source | Date |
|---|---|---|---|---|---|
| A1 | Zhongxiao Fuxing is Blue (BL15) + Brown (BR10) | VERIFIED | Interchange. Proverbs' official page: "junction of MRT Wenhu (Brown) Line and Bannan (Blue) Line" | hotel-proverbs.com FAQ | accessed 29 Sep 2026 |
| A2 | Daan station is Red (R05) + Brown (BR09) | VERIFIED | Madison official: "搭乘捷運紅線或棕線，在大安站下車" | madison.cathayhotel.com.tw/location | same |
| A3 | Daan Park station (R06) | VERIFIED | Opened **24 Nov 2013**. 6 exits; **lifts at 4, 5 and 6**. Exit 6 is by the Jianguo Holiday Flower Market. Has a sunken garden courtyard with a water wall | zh.wikipedia 大安森林公園站 | accessed 29 Sep 2026 |
| A4 | Taipower Building (G08) is in Daan | PARTLY | It is **on the Zhongzheng/Da'an border**. Exits 3 and 4 are at the Shida Rd end, nearest Shida Night Market | zh.wikipedia 台電大樓站 | same |
| A5 | Zhongxiao Fuxing → Taipei Main | VERIFIED (computed) | Blue, 3 stops, **about 5 min** (90+40+81+25+66 s = 302 s running + dwell) | TRTC running/dwell times | effective 30 Aug 2026 |
| A6 | Zhongxiao Fuxing → Ximen | VERIFIED (computed) | Blue direct, 4 stops, **about 8 min** (302 + 42 + 120 s) | same | same |
| A7 | Zhongxiao Dunhua → Taipei Main / Ximen | VERIFIED (computed) | Blue direct: 4 stops, **about 7 min**; 5 stops, **about 9–10 min** | same | same |
| A8 | Daan → Taipei 101/WTC | VERIFIED (computed) | Red, 2 stops, **about 3–4 min** (90 + 30 + 83 s) | same | same |
| A9 | Daan Park / Dongmen → Taipei 101 | VERIFIED (computed) | Daan Park 3 stops, **about 5 min**; Dongmen 4 stops, **about 7 min** | same | same |
| A10 | Dongmen / Daan Park / Daan → Taipei Main | VERIFIED (computed) | Red direct: Dongmen 3 stops **about 7 min**; Daan Park 4 stops **about 8–9 min**; Daan 5 stops **about 10 min** | same (reverse-direction dwell assumed equal) | same |
| A11 | Zhongxiao Fuxing → Taipei 101 | ESTIMATE | No direct line. **Brown 1 stop to Daan (67 s), change, Red 2 stops (about 3.5 min)**: about **8–10 min** with the change. Or Blue 2 stops to City Hall (about 4.5 min) and walk | same | same |
| A12 | Zhongxiao Dunhua → Taipei 101 | ESTIMATE | Blue 2 stops to City Hall (about 3 min), then walk (not measured) | same | same |
| A13 | Fares | ESTIMATE | Most Daan → Main Station / Ximen / 101 / Songshan Airport trips are in the **NT$20–25** bands (fare matrix bands: under 5 km NT$20, 5–8 km NT$25). Individual station pairs were not read off the matrix (the PDF text layer has no station names). The Zhongshan research found NT$25 for 8 stops on the Red line | 臺北捷運系統票價表 (printed 24 Aug 2026) | 2026 |
| A14 | The Brown line and Songshan Airport | VERIFIED (computed) | Brown (Wenhu) line: Zhongxiao Fuxing → Songshan Airport is **3 stops, about 6 min** (86 + 30 + 66 + 30 + 162 s). From Daan add 1 stop (about 1.5–2 min); from Technology Building add 2. The Brown line is **elevated above Fuxing South Road** through Daan (Daan, Technology Building, Liuzhangli), which matters for street-facing rooms at Park Taipei, Episode, Fullerton South and UKETAMO. The Brown line serves **Songshan** Airport only, not Taoyuan | TRTC data; songshan-airport post | 2026 |
| A15 | Taoyuan Airport by MRT | VERIFIED (route) | Blue line to **Taipei Main** (about 5 min from Zhongxiao Fuxing, 7 from Zhongxiao Dunhua) or Red line from Daan/Dongmen, then walk to **A1** (allow 5–10 min). Express **35 min to T1, 39 min to T2, NT$160**. Door to door about 60–70 min (estimate) | tymetro.com.tw via the 101/Ximending research | 2026 |
| A16 | Airbus 1960 serves Daan | VERIFIED | **To the airport:** 市府轉運站 → 君悅 → **遠東國際飯店 (Shangri-La, Dunhua S Rd)** → **福華飯店 (Howard Plaza, Ren'ai Rd)** → T2 → T1. **To Taipei:** T2 → T1 → 建國錦州街口 → **捷運忠孝復興站** → 福華 → **捷運科技大樓站** → 遠東 → 君悅 → 市府轉運站. Fare from Far Eastern / Howard **NT$175** (half NT$85) from 1 Dec 2024. 15 departures a day each way since Jul 2025. Madison's official page also directs guests to the 遠東國際飯店 stop | airbus.com.tw stop list PDF (24 Jun 2025) and news id=205; madison.cathayhotel.com.tw/location | 2025–26 |
| A17 | Taxi fares | VERIFIED (101 research) | NT$85 for the first 1.25 km, NT$5 per 200 m, NT$20 surcharge 23:00–06:00. (Madison's page still shows the old NT$70 flag fall) | pto.gov.taipei (26 Nov 2024) | 2024 |
| A18 | Daan Forest Park | VERIFIED | Opened **1994**; **25.94 ha** ("almost 26 hectares" in the owner's post is right). Bounded by Xinyi Rd, Xinsheng S Rd, Jianguo S Rd and Heping E Rd. Open-air music stage seats about 900. Own station (Daan Park, Red) | zh.wikipedia 大安森林公園 (snippet); daan-forest-park post | accessed 29 Sep 2026 |
| A19 | Yongkang Street | VERIFIED (GM) | Starts at **Dongmen exit 5** (Din Tai Fung Xinyi flagship corner). From Dandy (Daan Park) it is **13 min / 850 m** on foot | GM; yongkang-street post | 29 Sep 2026 |
| A20 | Shida Night Market | VERIFIED (GM) / snippet | **Taipower Building exit 3 → 7 min / 450 m** (GM). Hours about 16:00–23:00, to 24:00 at weekends (snippet). After residents' complaints, the city enforced zoning from 2012 and many food stalls gave way to clothing and beauty shops; it is now more a shopping-and-snacks district than a classic night market (udn, snippet). **No owner post exists for Shida** | GM; udn story 7678709 (s); shin.tw (s) | 29 Sep 2026 |
| A21 | Tonghua / Linjiang Street Night Market | VERIFIED (GM) | **Xinyi Anhe exit 4 → 6 min / 450 m**; from Madison **14 min / 950 m**. It is in Da'an District | GM; tonghua-night-market post | 29 Sep 2026 |
| A22 | East District shopping and SOGO | CORRECTED | **SOGO Dunhua closed 14 Dec 2025**. SOGO Zhongxiao (1987; now "affordable luxury and lifestyle") and SOGO Fuxing (2006; top-end luxury) remain; some Dunhua brands moved to Fuxing and to the new **Far Eastern Garden City** at the Taipei Dome (Xinyi). The **East Metro Mall** (東區地下街) runs under Zhongxiao E Rd between Zhongxiao Fuxing and Zhongxiao Dunhua | udn 9200228 / 9202783; FEG news 12131; ETtoday; OSM (東區地下街出入口) | Dec 2025 |
| A23 | Where the East District is | VERIFIED | Owner: shops "north and south of Zhongxiao East Road between the Zhongxiao Fuxing and Sun Yat-Sen Memorial Hall Stations". Sun Yat-sen Memorial Hall station itself is in Xinyi (BL17) | 101 research A-table | 2026 |

---

## 4. Per-hotel fact sheets

GM = Google Maps walk from the named exit, 29 Sep 2026. Prices are Booking.com TWD, 2 adults, Wed 11 Nov / Sat 14 Nov 2026 unless stated.

### 4.1 Kimpton Da An 金普頓大安酒店 (owner)
- **Address:** No. 25, Lane 27, Sec. 4, Ren'ai Rd (on a quiet lane, one block south of Zhongxiao E Rd).
- **Walk:** Zhongxiao Fuxing **exit 3, 2 min / 120 m** (GM). mimigo: exit 3, 2 min. IHG: "only steps away from Zhongxiao Fuxing".
- **Rooms:** **129** (Time Out; mimigo). Essential/"Cool" rooms 9.7 ping (about 32 m²); Premium/"Deluxe" 11.5 ping (about 38 m²), some with balconies; suites 17.5 ping (about 58 m²) (mimigo, Jun 2026).
  - Tubs: suites have tubs (mimigo), and Booking sells a "Premium King Room with **Separate Bath and Walk-In Shower**". Entry rooms are shower-only.
  - All rooms have windows (mimigo).
  - No single-use toiletries (government rule; IHG notice).
- **Facilities:** gym; **no pool listed**; on-site parking; **The Tavernist** (12F, with terrace; IHG calls it "MICHELIN plated"); **evening social hour 17:30–18:30 daily**, free wine and snacks (mimigo; hotelscombined).
- **Pets:** free, **any size, 2 per room** (IHG).
- **Kids (Booking):** cots free (0–2); children **7+ charged as adults**; extra bed NT$1,848. Minimum check-in age **20 on Booking, 18 on IHG** (conflict).
- **Check-in/out:** 15:00 / 12:00 (Booking).
- **Accolades:** **MICHELIN One Key 2025 and 2026**; Tripadvisor "2026 Best of the Best Taiwan No. 1 Hotel" (IHG page).
- **Price:** Essential Room **NT$11,000**; Premium King NT$14,003. **Sat 14 Nov: Essential sold out; Premium Twin NT$18,134.**
- **Klook:** `https://www.klook.com/en-GB/hotels/detail/451655-kimpton-da-an-hotel/?aid=8733` ✔ (No. 25, Lane 27, Sec 4, Ren'ai Rd). Owner's existing link.

### 4.2 Shangri-La Far Eastern 台北遠東香格里拉 (owner)
- **Address:** No. 201, Sec. 2, Dunhua S Rd (Far Eastern Plaza tower). 43 floors; pool on the roof (43F).
- **Walk:** **Liuzhangli (Brown) 9 min / 600 m**; Technology Building exit 1 11 min / 800 m, exit 2 13 min; Xinyi Anhe exit 2 12 min / 900 m; Daan exit 5 17 min / 1.2 km (all GM). Owner table: "6 mins (Brown)".
- **Rooms (official): 420** (incl. 37 suites, Taiwan News snippet).
  - Superior 36 m² (**marble bathroom with bathtub and separate glass shower**; king 180×200 or twins 105×200); Deluxe 40 m²; Deluxe Taipei 101 View 40 m²; **Grand Deluxe Family Room 56 m²**; Premier 60 m²; Horizon Club rooms 36–58 m²; Plaza Suite 72 m².
  - **Connecting options**: Two Deluxe Rooms Inter-Connecting (80 m²); Plaza Suite + Superior Twin (108 m²).
- **Pools:**
  - **43F rooftop heated pool 06:00–21:00, to 22:00 Fri, Sat and holiday eves.**
  - **Closed for annual maintenance 31 Aug – 30 Sep 2026; fully reopens 1 Oct.**
  - 7F outdoor pool opens in summer only.
  - Children under 12 must be with an adult.
- **Health Club:** gym 06:00–22:00; sauna and steam 06:00–22:15; indoor and 43F outdoor whirlpools; Valmont spa.
- **Dining:** 5 restaurants and 3 bars (Shang Palace, Marco Polo Lounge, ibuki, Café etc.).
- **Kids (official):** ages 0–6 eat free at the buffet (first two children, member booking); 7–11 half price. Booking: children 12+ as adults; extra bed NT$2,079; cots free. Babysitting listed (official). Min check-in age 18.
- **Check-in/out:** 15:00 / 12:00.
- **Airport bus:** Airbus 1960 stops at 遠東國際飯店 (NT$175).
- **Price:** Superior Twin **NT$8,940**; Deluxe King NT$9,436; Deluxe 101 View NT$9,933. **Sat 14 Nov: Superior Twin NT$14,208.**
- **Klook:** `https://www.klook.com/en-GB/hotels/detail/254139-shangri-la-far-eastern-taipei/?aid=8733` ✔ (201 Tun Hwa South Road, Section 2). Owner's existing link.

### 4.3 Hotel Proverbs 賦樂旅居 HOTEL PROVERBS Taipei
- **Address:** No. 56, Sec. 1, Daan Rd. Gloria Hotel Group (華泰, which also runs Gloria Residence). Design Hotels member; takes Marriott Bonvoy. Registration no. 509.
- **Walk:** official **Zhongxiao Fuxing exit 4, about 5 min**. GM: **exit 4, 4 min / 260 m**; exit 3, 4 min / 270 m.
- **Rooms:** **42** (Michelin; Time Out), designed by Ray Chen.
  - Urban 33 m², Classic 37 m², Deluxe 38 m², Premium 41 m², Proverbs 49 m² (official).
  - **All room types have a separate bathtub** (official FAQ Q7), except 1 accessible Urban Room.
  - Free minibar, Nespresso, TOTO washlet, Yamaha sound bar in some rooms.
- **Pool:** **outdoor rooftop pool, 06:30–21:00, hotel guests only** (official FAQ). Pool 15 m × 2.7 m, 125 cm deep (uniqhotels snippet).
- **Dining:** L'IDIOT GRILL & PASTA (1F; breakfast 07:00–10:00); **EAST END** bar ("the only hotel bar in Taiwan" on Asia's 50 Best Bars, official).
- **Kids:** baby cots, baby baths and bottle sterilisers on request (official). Booking: **no extra beds**; cots free (0–2); **minimum check-in age 20**.
- **Parking:** underground, semi-mechanical, by reservation (2 m height limit).
- **Check-in/out:** 15:00 / 12:00 (Booking).
- **Price:** Urban Double **NT$13,259**; Premium NT$15,939. **Sat 14 Nov: Deluxe NT$15,015** (only type left).
- **Klook:** `https://www.klook.com/en-GB/hotels/detail/281397-hotel-proverbs-taipei/?aid=8733` ✔ (No. 56, Sec. 1, Da An Road).

### 4.4 Madison Taipei, a Tribute Portfolio Hotel 台北慕軒 (owner)
- **Address:** No. 331, Sec. 1, Dunhua S Rd, on the tree-lined boulevard. Cathay Hospitality (國泰); Marriott Tribute Portfolio.
- **Walk:**
  - Official: 5–8 min to three stations – **Daan exit 4 about 5 min**, **Xinyi Anhe exit 1 about 5 min**, Zhongxiao Dunhua exit 6 about 8 min.
  - GM: **Xinyi Anhe exit 1, 7 min / 450 m**; Daan exit 4 10 min / 650 m; Zhongxiao Dunhua exit 6 13 min / 850 m.
  - Owner table: "5 mins (Red)".
- **Rooms:** **124** (official).
  - Classic 9 ping (about 30 m², floors 3–11), marble **shower only**. The official Classic page lists a shower, and a blog says Classic is the only type without a tub.
  - Deluxe and Oasis ("綠景") 10 ping; Madison Room 11 ping; Skyline Suite about 16 ping; Madison Suite 50 ping.
  - Booking: "All rooms have windows". Pillow menu of 10.
- **Facilities:** gym 3F (**06:00–22:00** per the FAQ, **06:00–23:00** per the facilities page: conflict). **No pool** (official FAQ). GUSTOSO Italian; URBAN331 whisky bar (live music at weekends).
- **Kids (official FAQ):**
  - **No extra beds in Classic or Madison rooms**; NT$1,200 in other types.
  - Extra person without a bed: ages 6–11 NT$300 (NT$600 with breakfast); 12+ NT$500.
  - Free cots, baby baths and sterilisers on request. Under-18s cannot stay alone. No pets except guide dogs.
- **Check-in/out:** 15:00 / 11:00. Room service 06:00–22:30.
- **Parking:** on site; 1.8 m height limit.
- **Recognition:** "台北米其林指南推薦旅館" 2018, 2019, 2020 (official awards page); Michelin-listed now, no Key; World Luxury Hotel Awards.
- **Price:** Classic **NT$8,085**; Deluxe NT$9,009. **Sat 14 Nov: Classic NT$10,973.**
- **Klook:** `https://www.klook.com/en-GB/hotels/detail/432606-madison-taipei-a-tribute-portfolio-hotel/?aid=8733` ✔ (No. 331, Sec 1, Dunhua S. Rd.). Owner's existing link.

### 4.5 Hotel Eclat Taipei 台北怡亨酒店 (owner)
- **Address:** No. 370, Sec. 1, Dunhua S Rd (across the boulevard from Madison).
- **Walk:** GM **Xinyi Anhe exit 1, 7 min / 450 m**; Daan exit 4, 8 min / 550 m; Zhongxiao Dunhua exit 6, 14 min. Owner table: "6 mins (Red)".
- **Rooms:** **60**, 12 floors (Michelin; itravelblog).
  - Deluxe 24.8 m², Grand Deluxe 26.5 m², Premier 31.5 m², **Premier 9 33 m² (private jacuzzi)**, **Éclat Suite 64 m² (jacuzzi)** (official).
  - Standard rooms have **no bathtub**; Booking sells "Premier King Room with Bath" and "Suite with Spa Bath".
  - **B&O speakers, Nespresso, free minibar, Guerlain amenities, Dyson hairdryers** (itravelblog, upd 29 Sep 2026). The owner's "Bang & Olufsen speakers and Nespresso machines" is confirmed.
- **Other:** art collection in public areas (Dalí and others); Éclat Lounge afternoon tea 14:30–17:30; SLH member. Gym and pool: none found.
- **Kids (Booking):** children 6+ charged as adults; one child 0–12 on existing bedding (search summary of the official policy); extra bed (adult) NT$2,079; cots free. Minimum check-in age 20.
- **Check-in/out:** 15:00 / 11:00.
- **Recognition:** Michelin-listed (no Key).
- **Price:** Deluxe King **NT$5,033**; Premier with Bath NT$7,046; Suite with Spa Bath NT$13,421. **Sat 14 Nov: Deluxe King NT$5,368.**
- **Not confirmed:** "Taiwanese-owned" (owner's text). No source found either way.
- **Klook:** `https://www.klook.com/en-GB/hotels/detail/409080-hotel-eclat-taipei/?aid=8733` ✔ (No 370, Section 1, Dunhua South Road). Owner's existing link.

### 4.6 EPISODE Daan Taipei, JdV by Hyatt 台北大安伊普索凱悅尚選酒店 (formerly HOME HOTEL Da-An)
- **Address:** No. 219-2, Sec. 1, Fuxing S Rd. Riant Hotels (麗昇); the brand's second in Taiwan after EPISODE Hsinchu.
- **Opened as Episode:** **24 May 2024** (Hyatt newsroom). Previously HOME HOTEL Da-An.
- **Walk:** Zhongxiao Fuxing **exit 2, 4 min / 300 m** (GM); exit 3, 6 min. vivianexplore: 3 min.
- **Rooms:** **136**, 9 floors. Retro-music theme with **CD/vinyl players** and a curated CD selection.
  - Scenic rooms face Xinyi / Taipei 101.
  - **Premium rooms have private balconies and bathtubs** (Klook description).
  - Booking types include "Double Room with **Two Double Beds**" and "Deluxe **Corner King with Sofa Bed**" (family options).
- **Facilities:** gym; ground-floor **Texas Roadhouse** (breakfast plated set, 07:30–10:00 weekdays, 07:30–10:30 weekends); **SOCIAL by Lay Low** bar with jazz/DJ nights (Klook description); **happy hour 17:30–18:30** (pandafishtrip); pets on request.
- **Kids (Booking):** cots free (0–3). Extra-bed wording is contradictory (NT$1,100, but also "no extra beds available"). Children 18+ charged as adults. **Minimum check-in age 20.**
- **Check-in/out:** 15:00 / 12:00.
- **Noise:** it faces Fuxing S Rd, beside the elevated Brown line (not reported; flag only).
- **Price:** Twin/King **NT$7,161**; City View NT$7,623; Two Double Beds / Balcony / Corner NT$8,085. **Sat 14 Nov: Twin City View NT$12,243.**
- **Klook:** `https://www.klook.com/en-GB/hotels/detail/1411891-episode-daan-taipei-jdv-by-hyatt/?aid=8733` ✔ (No. 219-2, Section 1, Fuxing S Rd).

### 4.7 Park Taipei Hotel 台北美侖大飯店
- **Address:** No. 317, Sec. 1, Fuxing S Rd.
- **Walk:** **Daan exit 6, 1 min / 10 m** (GM). mimigo: "捷運大安站出來就是".
- **Rooms:** 143, 15 floors (Klook description).
  - Standard 30 m²; Superior King/Twin 32 m²; Deluxe King/Queen/Triple 34 m²; 101 View 32 m²; **Balcony Room** 32 m²; Executive 34 m²; Park Suite 68 m² (official).
  - **All rooms have a separate shower and bathtub** (official).
- **Occupancy (official):** max **2 adults + 1 child under 6** (Triple: 3 + 1). Booking: **no cots or extra beds**; children 7+ as adults.
- **Facilities:** gym; terrace; **no pool**; parking. Breakfast 07:30–11:00, paid (Klook).
- **Check-in/out:** 15:00 / 11:00. No minimum age (Booking).
- **Noise:** the Brown line viaduct runs past on Fuxing S Rd. Rooms with balconies "overlooking trains", but "excellent soundproofing" (hotelscombined article, an excluded source; flag only).
- **Price:** Superior King/Twin **NT$9,900**; 101 View NT$11,700; Deluxe Triple NT$14,850. **Sat 14 Nov: Standard Queen NT$16,000.**
- **Klook:** `https://www.klook.com/en-GB/hotels/detail/99379-park-taipei-hotel/?aid=8733` ✔ (No.317, Sec. 1, Fu-Xing S. Rd.).

### 4.8 MGH Mitsui Garden Hotel Taipei Zhongxiao 和苑三井花園飯店 台北忠孝
- **Address:** No. 30, Sec. 3, Zhongxiao E Rd (Da'an District; Zhongxiao Xinsheng).
- **Opened:** pre-opening **18 Aug 2020**. The first Mitsui Garden Hotel outside Japan (Mitsui Fudosan).
- **Walk:** **Zhongxiao Xinsheng exit 3, 1 min / 110 m** (GM); exit 4 3 min; exit 1 5 min. The exit has a lift (Klook reviews).
- **Rooms:** **297**, 17 floors.
  - 15 types from about 6.4 ping (21 m²) to 10.7 ping (35 m²); small suite 18.3 ping.
  - **Triple rooms** available. Some terrace rooms.
  - Three themed concept rooms (sweets, Jiufen, hometown) **bookable only on the official site**.
- **Public bath (official):** **17F, gender-separated, free; 15:00–24:00 and 06:00–10:00; closed 18:30–19:00 for cleaning.** The men's side has city views; the women's side has a sky garden.
- **Other (official):**
  - 2F guest lounge 06:00–24:00 (coffee, tea, water, ice).
  - **24-hour coin laundry**; massage by reservation.
  - **Free parking** for staying guests.
  - JAPOLI restaurant (breakfast 06:30–10:30).
  - No gym mentioned.
- **Kids (Booking):** **no extra beds**; cots 0–1 free; children 6+ as adults. Min age 18.
- **Check-in/out:** 15:00 / 12:00.
- **Price:** Standard Queen Corner **NT$8,600**; Deluxe NT$9,500; Deluxe Triple NT$11,100. **Sat 14 Nov: Superior Twin NT$10,800.**
- **Klook:** `https://www.klook.com/en-GB/hotels/detail/588082-mgh-mitsui-garden-hotel-taipei-zhongxiao/?aid=8733` ✔ (No. 30, Section 3, Zhongxiao E Rd).

### 4.9 Dandy Hotel – Daan Park Branch 丹迪旅店大安森林公園店
- **Address:** 3F–10F, No. 33, Sec. 3, Xinyi Rd, facing Daan Forest Park.
- **Walk:** **Daan Park exit 1, 1 min / 56 m** (GM). Yongkang Street 13 min / 850 m (GM).
- **Rooms:** **73**, opened May 2008 (Klook description).
  - **Windowless rooms:** Economy Double (no window), Deluxe Twin and Deluxe King (no window).
  - Park-view rooms (Elite / Deluxe with Park View); Japanese room with city view; **Deluxe Family Triple**.
- **Facilities:**
  - Free breakfast 07:00–10:00.
  - **Free snacks, drinks and self-service laundry** (Away to the City; Klook review summary).
  - **Free strollers** for families (Nick Kembel).
  - Free parking (Klook).
- **Kids (Booking):** cots free; extra bed NT$1,500. No age limit.
- **Check-in/out:** 15:00–23:30 / 12:00.
- **Price:** Economy Double (no window) **NT$4,619**; Standard Double NT$5,263; Family Triple NT$6,337. **Sat 14 Nov: Economy (no window) NT$7,519; Standard NT$7,948.**
- **Klook:** `https://www.klook.com/en-GB/hotels/detail/422778-dandy-hotel-daan-park-branch/?aid=8733` ✔ (No.33, Sec. 3, Xinyi Road).

### 4.10 Chez Nous 司旅 (owner)
- **Address:** No. 18, Lane 147, Sec. 3, Xinyi Rd (in a lane between Daan Park and Daan station).
- **Walk:** **Daan exit 1, 4 min / 300 m** (GM). Booking: 5 min from Daan. Daan Park exit 6 is 13 min, so it is not the nearest. Owner: "5 mins (Red)". Daan station is Red + Brown.
- **Rooms:** 28 rooms, opened 2016 (search snippets).
  - Small Double about 15 m²; Classic 25 m²; Grande 38 m²; Penthouse Suite 80 m² (snippets).
  - The official site lists four types (標準 / 經典 / 大方 / 私房).
  - Sizes vary a lot, as the owner says.
- **Facilities:** **rooftop bar/patio** (Nick Kembel); 24-hour front desk; laundry (Booking). Exercise bike in some rooms (owner's photo caption).
- **Kids (Booking):** cots free (0–2); children 7+ as adults; extra bed NT$1,500 per stay. No age limit.
- **Check-in/out:** 15:00–00:00 / 11:00.
- **Price:** Small Double **NT$4,255**; Classic City View NT$5,060; Grande NT$7,590; Penthouse NT$15,000. **Sat 14 Nov: only Grande, NT$9,000.**
- **Klook:** `https://www.klook.com/en-GB/hotels/detail/280671-chez-nous-hotel-taipei/?aid=8733` ✔ (No. 18, Lane 147, Section 3 Xinyi Road). Owner's existing link.

### 4.11 Green World ZhongXiao 洛碁大飯店忠孝館
- **Address:** No. 180, Sec. 4, Zhongxiao E Rd (beside Ming Yao department store).
- **Walk:** **Zhongxiao Dunhua exit 3, 1 min / 110 m** (GM).
- **Rooms:** 150, 14 floors, opened 2016 (Klook description).
  - **Windowless:** Standard King (no window) and Standard Family Room (no window).
  - Classic and Executive rooms have windows.
  - **Bathtub with separate shower** (mimigo, Sep 2026).
- **Kids:** mimigo says **2 children under 12 stay free** in family rooms. Booking says children 6+ are charged as adults (**conflict**). No extra beds; cots free (0–2). Min age 18.
- **Facilities:** free parking (mimigo); breakfast about NT$300 (07:00–10:00); 24-hour desk; laundry; 24-hour Carrefour nearby (Klook).
- **Check-in/out:** 15:00 / 11:00.
- **Price:** Standard King (no window) **NT$3,190**; Classic King/Twin NT$3,630; Family (no window) NT$5,390. **Sold out on Sat 7, 14 and 21 Nov.**
- **Klook:** `https://www.klook.com/en-GB/hotels/detail/449002-green-world-zhongxiao/?aid=8733` ✔ (No.180, Section 4, Zhongxiao East Road).

### 4.12 Eastin Taipei Hotel 怡品商旅
- **Address:** **14F**, No. 87, Sec. 4, Zhongxiao E Rd. The hotel is on the upper floors of an office building (lobby on 14F). Renovated 2018; 81 rooms (Klook description).
- **Walk:** **Zhongxiao Dunhua exit 6, 4 min / 200 m**; Zhongxiao Fuxing exit 3, 5 min / 280 m (GM). Booking: 4 min to Zhongxiao Fuxing.
- **Rooms:**
  - **Male and female single rooms with shared bathroom** (NT$1,360).
  - Standard Double **(no window)**; Standard Double/Twin; Deluxe Quadruple.
  - The official site lists 101-view "環景" rooms.
- **Facilities:** **observation terrace with Taipei 101 view**; gym; laundry; business centre; free coffee (official; Klook reviews). **No parking** (official).
- **Kids (Booking):** children 7+ as adults; extra bed NT$800 for ages 0–6; cots free. Min age 18.
- **Check-in/out:** 15:00 / 12:00.
- **Price:** single with shared bath **NT$1,360**; Standard Double (no window) **NT$2,560**; Standard Double/Twin NT$2,800; Quad NT$4,000. **Sold out on Sat 7, 14 and 21 Nov.**
- **Klook:** `https://www.klook.com/en-GB/hotels/detail/408981-eastin-taipei-hotel/?aid=8733` ✔ (14F, No. 87, Section 4, Zhongxiao East Road).

### 4.13 Taipei Fullerton Hotel – Fuxing South 台北馥敦飯店復南館
- **Address:** No. 41, Sec. 2, Fuxing S Rd (at Xinyi Rd).
- **Walk:** **Daan exit 4, 3 min / 220 m** (GM). Official: 2 min to Daan.
- **Rooms:** 95, 13 floors, fully renovated June 2019 (Klook description).
  - Business 23 m²; Fullerton Room 30 m²; Deluxe Twin 33 m²; VIP Suite 34 m²; Deluxe Triple (Klook, snippet).
  - Rack rates from NT$8,000 + 10% (official).
- **Facilities:**
  - A **split-hours sauna with an indoor hot pool, outdoor cold pool, steam room and dry sauna** (hotelscombined; lifeinpocket – both excluded sources; **not confirmed on the official site**).
  - Gym.
  - Free lobby coffee, tea and biscuits (Klook reviews).
- **Kids (official):** extra bed NT$1,200 with breakfast; children over 7 sharing a bed NT$700.
- **Price:** Superior Double **NT$3,960**; Deluxe Triple NT$5,808. **Sat 14 and 21 Nov sold out; Sat 7 Nov Fullerton Room NT$5,553.**
- **Klook:** `https://www.klook.com/en-GB/hotels/detail/272825-taipei-fullerton-hotelfuxing-south/?aid=8733` ✔ (No. 41, Section 2, Fuxing South Road).

### 4.14 Star Hostel Taipei East 合星青年旅館 (on owner's map)
- **Address:** 3F, No. 5, Lane 147, Sec. 4, Zhongxiao E Rd. It is the eastern sister of the owner's favourite, Star Hostel Taipei Main Station.
- **Walk:** official **Zhongxiao Dunhua exit 7**: turn right at the PUMA store into Lane 147, about 1 min. GM: **exit 7, 1 min / 71 m**.
- **Beds and rooms:**
  - Dorms, including an **8-bed female-only dorm on a female-only floor** (snippet).
  - Queen Room with Balcony; Double; Twin with Bathroom; Quadruple (Booking room names).
  - Converted from an old house; eco materials; ground-floor common area with kitchen (Booking).
- **Reception:** **07:00–23:00** (Hostelworld house rules). Check-in **15:00–22:00**; tell them if arriving after 23:00. Check-out 11:00.
- **Age:** **under-18s are not recommended in dorms**; children must be with an adult in private rooms (Hostelworld). Booking: min check-in age 18.
- **Other rules:** no curfew; quiet after 22:00; visitors until 22:00; **cash on arrival** (cards only over NT$3,000). **Breakfast 08:00–10:00 included.** No extra beds.
- **Price:** official site: **dorms from NT$700, private rooms from NT$2,000**. **Booking: no availability** for Wed 11, Wed 18, Sat 14 or Sat 21 Nov (1 or 2 adults).
- **Klook:** `https://www.klook.com/en-GB/hotels/detail/266667-star-hostel-taipei-east/?aid=8733` ✔ (3F., No. 5, Lane 147, Section 4, Zhongxiao East Road).
- **Don't confuse it with** the photo key `star-hostel`, which is the Main Station branch.

### 4.15 DONGMEN 3 Hostel 東門3號青年旅店 (DONGMEN 3 Capsule Inn)
- **Address:** No. 110, Sec. 2, Xinyi Rd (south side = **Da'an District**; TripAdvisor mislabels it as Zhongzheng).
- **Walk:** **Dongmen exit 3, 1 min / 30 m** (GM). Nick Kembel: "less than a minute from the exit". Yongkang Street is about 3 min.
- **Beds:**
  - Capsule beds and bunks in mixed and female dorms, with shared bathrooms.
  - "Double Bed" dorm capsules; a 4-bed mixed room.
  - Capsules on LV2/LV3 have a reading lamp, desk, locker, socket and curtain.
- **Facilities:** ground-floor café; free breakfast; free coffee, tea and water 24/7; rooftop terrace; guest kitchen; TV lounge; laundry (Klook / Nick Kembel).
- **Reception:** **15:00–23:00** with 24-hour security (Hostelworld, snippet). Check-in 15:00 to midnight; check-out 11:00.
- **Age:** **minimum check-in age 18**; children over 8 welcome (Booking). No extra beds or cots.
- **Price (1 adult):** single capsule **NT$627** (mixed or female); double capsule NT$964–1,023; 4-bed room NT$1,734. **Sold out on Sat 7, 14 and 21 Nov.**
- **Klook:** `https://www.klook.com/en-GB/hotels/detail/258441-dongmen-3-capsule-inn--hostel/?aid=8733` ✔ (No. 110, Section 2, Xinyi Road).

### 4.16 Prices at a glance (Wed 11 / Sat 14 Nov, cheapest room on sale, Booking.com)

| Hotel | Wed | Sat | Note |
|---|---|---|---|
| Proverbs | 13,259 | 15,015 | |
| Kimpton | 11,000 | 18,134 (Premium only) | |
| Park Taipei | 9,900 | 16,000 | +62% |
| Shangri-La | 8,940 | 14,208 | |
| MGH Mitsui Garden | 8,600 | 10,800 | |
| Madison | 8,085 | 10,973 | |
| Episode Daan | 7,161 | 12,243 | +71% |
| Hotel Eclat | 5,033 | 5,368 | smallest weekend rise |
| Dandy Daan Park | 4,619 (no window) / 5,263 | 7,519 / 7,948 | |
| Chez Nous | 4,255 (15 m²) | 9,000 (Grande only) | |
| Fullerton South | 3,960 | sold out (5,553 on Sat 7) | |
| Green World ZhongXiao | 3,190 (no window) | sold out ×3 | |
| Eastin | 2,560 (no window); 1,360 shared-bath single | sold out ×3 | |
| Dongmen 3 | 627 bed | sold out ×3 | |
| Star Hostel East | no availability | no availability | official from NT$700 bed / NT$2,000 room |

**Weekend pattern:** most mid-range rooms rise 35–70% on Saturdays, and the budget end sells out. Eclat barely moves.

---

## 5. Claim table: owner's Daan text (best-areas-and-hotels-to-stay #Daan and related posts)

| # | Owner's claim | Verdict | Finding | Source | Date |
|---|---|---|---|---|---|
| O1 | Madison "5 mins (Red)" | CORRECTED (minor) | Official 5 min (Daan exit 4 or Xinyi Anhe exit 1); **GM 7 min** from Xinyi Anhe exit 1, 10 min from Daan exit 4 | Madison official; GM | 29 Sep 2026 |
| O2 | Madison "Michelin-recognised" | VERIFIED (qualify) | Michelin-recommended hotel 2018–20 (official awards); listed on the Michelin hotel site now, **no Key** | madison.cathayhotel.com.tw; guide.michelin.com | same |
| O3 | Madison "floor-to-ceiling windows and rainfall showers" | UNCONFIRMED | Official Classic room: marble shower (type not stated); Booking: "All rooms have windows". Neither phrase found | official room page | same |
| O4 | Eclat "across the road" from Madison | VERIFIED | No. 370 vs No. 331 Dunhua S Rd Sec 1 | official addresses | same |
| O5 | Eclat "6 mins (Red)" | CORRECTED (minor) | **7 min** from Xinyi Anhe exit 1 (GM) | GM | same |
| O6 | Eclat Michelin-recognised; B&O speakers; Nespresso | VERIFIED | Michelin-listed (no Key); B&O, Nespresso, free minibar (itravelblog 2026) | Michelin; itravelblog | same |
| O7 | Eclat "Taiwanese-owned" | UNCONFIRMED | No source found | – | – |
| O8 | Kimpton "2 mins (Blue)" | VERIFIED | 2 min / 120 m from Zhongxiao Fuxing exit 3. The station is Blue **and Brown** | GM | same |
| O9 | Kimpton: large rooms, rooftop terrace, The Tavernist | VERIFIED | 32–38 m² standard rooms; Tavernist on 12F with terrace. Add: **MICHELIN One Key 2025 & 2026** | mimigo; IHG; Michelin | same |
| O10 | Shangri-La "6 mins (Brown)" | CORRECTED | **9 min** from Liuzhangli; 11 min from Technology Building exit 1 (GM) | GM | same |
| O11 | Shangri-La: upper floors of a tower on Dunhua S Rd; rooftop pool | VERIFIED | 43F rooftop pool; closed 31 Aug–30 Sep 2026 for maintenance, reopens 1 Oct | Shangri-La official | same |
| O12 | Chez Nous "5 mins (Red)" | VERIFIED | 4 min / 300 m from Daan exit 1 (Red/Brown) | GM | same |
| O13 | Chez Nous: rooms vary a lot in size | VERIFIED | About 15 m² to 38 m², plus an 80 m² penthouse | snippets; Booking | same |
| O14 | Table prices (Madison 6,500; Eclat 8,000; Kimpton 8,000; Shangri-La 6,700; Chez Nous 4,000) | Partly outdated | Nov weekday: Madison 8,085; **Eclat 5,033**; **Kimpton 11,000**; Shangri-La 8,940; Chez Nous 4,255 | Booking | 29 Sep 2026 |
| O15 | Map list "Star Hostel Taipei East" | VERIFIED | Operating; 1 min from Zhongxiao Dunhua exit 7 | official; GM | same |
| O16 | East District post: "three large SOGO malls" | CORRECTED | **Two** since 14 Dec 2025 (Dunhua closed) | udn; FEG | Dec 2025 |
| O17 | East District post lists Coffee Lover's Planet | OUTDATED | **Moved to Far Eastern Garden City (Taipei Dome, Xinyi)**, Sep 2026 | Mirror Media 17 Sep 2026 | 2026 |
| O18 | best-districts-and-areas: Daan "MRT Lines Red, Blue, Brown, Orange" | OPTIONAL | The Green line's Taipower Building station is on the Da'an/Zhongzheng border (for Shida). The Orange line stations (Dongmen, Zhongxiao Xinsheng) are also border stations. Leaving it as is is defensible | zh.wikipedia | – |
| O19 | daan-forest-park: "almost 26 hectares", "opened in 1994" | VERIFIED | 25.94 ha; 1994 | zh.wikipedia (snippet) | – |

---

## 6. Discrepancies as exact find/replace strings

Each find string was checked with a script (`scratchpad/daan/check-finds.cjs`) against `content/posts.json` on 29 Sep 2026. **Each matches exactly once in its post and once site-wide.** These are suggestions for the owner; nothing has been edited.

**Post `best-areas-and-hotels-to-stay`** (Daan table)

1. Shangri-La walk and price
   - Find: `<td>NT$6,700</td><td>6 mins (Brown)</td>`
   - Replace: `<td>NT$9,000</td><td>9 mins (Brown)</td>`
2. Madison walk and price
   - Find: `<td>NT$6,500</td><td>5 mins (Red)</td>`
   - Replace: `<td>NT$8,000</td><td>7 mins (Red)</td>`
3. Eclat walk and price
   - Find: `<td>NT$8,000</td><td>6 mins (Red)</td>`
   - Replace: `<td>NT$5,000</td><td>7 mins (Red)</td>`
4. Kimpton price and lines
   - Find: `<td>NT$8,000</td><td>2 mins (Blue)</td>`
   - Replace: `<td>NT$11,000</td><td>2 mins (Blue/Brown)</td>`
5. Chez Nous (optional; walk verified, price close)
   - Find: `<td>NT$4,000</td><td>5 mins (Red)</td>`
   - Replace: `<td>NT$4,300</td><td>4 mins (Red/Brown)</td>`
6. Madison description (only if the owner can't confirm the windows and showers)
   - Find: `is Michelin-recognised, with floor-to-ceiling windows and rainfall showers.`
   - Replace: `is Michelin-listed, with large, quiet rooms on the leafy Dunhua South Road boulevard.`
7. Eclat description (only if the owner can't confirm the ownership)
   - Find: `is another Michelin-recognised boutique, Taiwanese-owned, with an opulent lobby`
   - Replace: `is another Michelin-listed boutique, with an opulent lobby`

**Post `taipei-east-district-dongqu`**

8. SOGO count
   - Find: `There are also three large SOGO malls in the district if you prefer something more high-end.`
   - Replace: `There are also two large SOGO malls in the district, Zhongxiao and Fuxing, if you prefer something more high-end (the Dunhua store closed in December 2025).`
9. Coffee Lover's Planet (moved to Xinyi)
   - Find: `<li><strong><a href="/coffee-lovers-planet">Coffee Lover's Planet</a></strong> – serious single-origin coffee and gourmet sandwiches.</li>`
   - Replace: *(delete the line)*

**Post `where-to-shop-in-taipei`**

10. SOGO count
    - Find: `The district also has 3 SOGO malls and an underground mall`
    - Replace: `The district also has 2 SOGO malls and an underground mall`

**Post `taiwan-tourist-tax-refund`**

11. Closed store row
    - Find: `<tr><td>SOGO</td><td>Dunhua</td><td>4</td></tr>`
    - Replace: *(delete the row)*

**Post `coffee-lovers-planet`** (outside this page's scope; flagged for the owner)

12. Location
    - Find: `Set in the basement of one of the SOGO shopping malls in Taipei's East District, it's also`
    - Replace: `Now at the Far Eastern Garden City mall by the Taipei Dome (it moved from SOGO Dunhua in 2026), it's also`
13. MRT line
    - Find: `Closest MRT: Zhongxiao Dunhua (blue line - exit 10)`
    - Replace: needs a site check of the Garden City entrance. Sun Yat-sen Memorial Hall (Blue) is the likely nearest station. **Not verified.**

**Post `best-coffee-shops-in-taipei`**

14. Location
    - Find: `Serious single-origin coffee tucked into the basement of a SOGO shopping mall - an unglamorous location`
    - Replace: `Serious single-origin coffee, now in the Far Eastern Garden City mall by the Taipei Dome`. The rest of the sentence ("for a genuinely serious cup…") then needs a light edit, because "unglamorous location" no longer fits.

**Post `best-districts-and-areas`** (optional, low priority; see O18)

15. Find: `<td>Restaurants, bars, Yongkang Street, the big park</td><td>Red, Blue, Brown, Orange</td>` → Replace: `<td>Restaurants, bars, Yongkang Street, the big park</td><td>Red, Blue, Brown, Orange, Green</td>`
16. Find: `<td><strong>MRT Lines</strong></td><td>Red, Blue, Brown, Orange</td>` → Replace: `<td><strong>MRT Lines</strong></td><td>Red, Blue, Brown, Orange, Green</td>`

**Left alone** (verified or trivial):
- `daan-forest-park` "26 hectares … opened in 1994" is correct.
- `yongkang-street` "exit 4 or 5" is correct; Dongmen exit 5 is at the Din Tai Fung corner.
- `tonghua-night-market` "Xinyi Anhe exits 3 or 4": exit 4 is 6 min / 450 m (GM).

---

## 7. Gaps

- **Prices are single-source (Booking.com).** Star Hostel East had no Booking availability in November, so its price comes from the official "from" figures. Klook prices were not checked.
- **Fullerton South's sauna and pools** (hot/cold pool, steam room) come only from excluded sources; the official English page doesn't mention them.
- **Howard Plaza:** "outdoor pool closed all of 2026" is from a search snippet. The official page confirms the gym move, the kids' room closure and the car park suspension, but a pool notice was not seen directly.
- **Kimpton:** bathtub availability by room type (only suites and one Premium type are confirmed). Minimum check-in age: 18 (IHG) vs 20 (Booking).
- **Madison:** gym hours conflict (06:00–22:00 vs 06:00–23:00); "rainfall showers" and "floor-to-ceiling windows" unconfirmed.
- **Eclat:** ownership and gym not found.
- **Episode Daan:** the extra-bed policy is contradictory on Booking; no independent noise report for Brown-line-facing rooms.
- **Green World ZhongXiao:** child policy conflicts (mimigo "2 under-12s free" vs Booking "6+ as adults").
- **Chez Nous:** room count, sizes and opening year are from snippets only; the official site doesn't list them.
- **Dongmen 3:** reception hours (15:00–23:00) are from a snippet of Hostelworld.
- **Star Hostel East:** the female-only floor detail is from a snippet.
- **MRT fares** for individual Daan station pairs were not read off the matrix (estimates in A13).
- **Zhongxiao Dunhua → Taipei 101** total journey time (with the City Hall walk) was not measured.
- **Xinyi Anhe exit numbering** relies on OSM `ref` tags on unnamed nodes; ±1 min possible.
- **Coffee Lover's Planet's new nearest MRT exit** was not checked.
- **No owner post exists for Shida Night Market.**

---

## 8. Internal slugs that exist (checked in content/posts.json)

**Hotel pages and area guides**
- `best-areas-and-hotels-to-stay` (#Daan, #Xinyi, #Long-Stay, #Other)
- `best-districts-and-areas` (#Daan, #Xinyi)
- `hotels-near-taipei-101`, `hotels-in-zhongshan`, `hotels-near-taipei-main-station`, `hotels-near-ximending`, `beitou-hot-spring-hotels`

**Daan sights and walks**
- `daan-forest-park`, `yongkang-street`, `taipei-east-district-dongqu`, `daan-walking-route`
- `tonghua-night-market` (Linjiang), `jianguo-flower-market`, `best-parks-in-taipei`
- `taipei-jazz-festival` (Daan Park), `national-taiwan-university`, `gongguan`, `gongguan-night-market`
- Next door: `xinyi-shopping-district`, `taipei-101`, `sun-yat-sen-memorial-hall`, `huashan-1914-creative-park` (Zhongxiao Xinsheng exit 1), `chiang-kai-shek-memorial-hall`

**Getting around**
- `songshan-airport`, `taoyuan-airport-mrt`, `mrt`, `taipei-public-transport`, `taiwan-easycard`, `taipei-youbike`

**Shopping**
- `where-to-shop-in-taipei`, `best-shopping-malls-in-taipei`, `taiwan-tourist-tax-refund`, `where-to-go-when-raining`

**Daan food and drink (with the owner's stated MRT)**
- Yongkang / Dongmen: `din-tai-fung` (Xinyi original), `yong-kang-beef-noodles`, `tian-jin-onion-pancake`, `youmoutoohana-coffee`, `yaboo-cafe`, `wu-liu-shou`, `toasteria`
- Zhongxiao Fuxing: `kobayashi-noodle-restaurant`, `little-creatures`, `taihu-craft-beer-tasting-room`, `craft-beer-cafe`, `yuppy-bookstore-cafe`, `amavie`, `un-petit-pas-bistro`
- Zhongxiao Dunhua: `eastern-ice-store`, `cafe-costumice`, `oye-punjabi`, `ray-cafe`, `wengu-cafe`, `herban-kitchen-bar`, `flourish`, `cronutt`, `woo-taipei`
- Daan / Xinyi Anhe: `home-izakaya`, `jimmys-hot-dog`, `sisters-kitchen`, `crush`, `yong-he-soy-milk-king`, `big-table-taipei`, `plants`, `jie-genge`, `liquid-bread-company`, `avenue-fast-casual-eatery`, `miss-green`, `sugar-pea-cafe`, `tajine-moroccan`, `tamed-fox`, `sappho-live-jazz`
- Technology Building / Liuzhangli: `messypot`, `flavor-of-india`, `give-happiness`, `urbn-culture`, `redpoint-brewing-co-taproom`
- Zhongxiao Xinsheng: `ducky-restaurant`, `legacy-taipei`, `the-spot-cinemas`, `continue-gaming-bar`, `taipei-technology-district`
- Taipower Building: `apple-museum-cafe`, `23-public`
- Round-ups: `best-cocktail-bars-in-taipei`, `best-bars-in-taipei`, `taipei-nightlife`, `michelin-bib-gourmand-taiwanese-small-eats-taipei`, `michelin-food-stands-at-night-markets`, `best-brunch-in-taipei`, `best-coffee-shops-in-taipei`

**Caution**
- `coffee-lovers-planet` has **moved to Xinyi**; don't link it as an East District café.
- `a-train-b-line-c-park-d-town` and `brass-monkey` give Nanjing Fuxing as the closest MRT (Zhongshan/Songshan), not Daan.

**Not found:** no posts for Shida Night Market, SOGO, or the East Metro Mall.

---

## 9. Photo keys (folder-style, to match data/hotel-photos.json)

**Existing keys** (under `best-areas-and-hotels-to-stay`; files in `public/media/2026/09/hotels/`):
- `kimpton-da-an-hotel` (files -1, -3)
- `shangri-la-far-eastern-taipei` (-1, -2)
- `chez-nous-hotel-taipei` (-1)
- **Not** `star-hostel` (-1, -3): those are the **Main Station** branch. Don't use them for Star Hostel Taipei East.
- There are **no existing photos or keys for Madison or Eclat**. `madison-taipei` and `hotel-eclat-taipei` would be new keys.

**New keys proposed** (following existing patterns such as `tango-hotel-taipei-xinyi`, `just-sleep-ximending`):
- `madison-taipei`
- `hotel-eclat-taipei`
- `hotel-proverbs-taipei`
- `episode-daan-taipei`
- `park-taipei-hotel`
- `mgh-mitsui-garden-taipei-zhongxiao`
- `dandy-hotel-daan-park`
- `green-world-zhongxiao`
- `eastin-taipei-hotel`
- `taipei-fullerton-south`
- `star-hostel-taipei-east`
- `dongmen-3-hostel`

**Also named, not included** (for a one-line "also consider" if wanted):
- Hotel UKETAMO: No. 191, Fuxing S Rd Sec 1; Booking slug `uketamo`. Klook not checked.
- Swiio Hotel Daan: No. 185, Daan Rd Sec 1; Booking `swiiohoteldaan`. Klook not checked.
- Rido Hotel: No. 11, Xinyi Rd Sec 3, facing the park; Booking `rido`. Klook not checked.
- The Howard Plaza: No. 160, Ren'ai Rd Sec 3; Booking `the-howard-plaza-taipei`; mid-renovation. Klook not checked.
