# Research: Aparthotels and Serviced Apartments in Taipei

Checked 29 September 2026. This file is research, not article copy. Proposed slug: `aparthotels-serviced-apartments-taipei`.

**Scope used**
- Places in **Taipei City** where you get **your own kitchen or kitchenette**, and ideally a washing machine, for families, longer stays and remote workers.
- Two groups, because the law splits them (see section 5):
  - **Licensed aparthotels you can book by the night.** Each holds a Taipei City hotel registration (旅館業登記證). This is the main list.
  - **Monthly-only serviced apartments.** These are rental businesses. They take **30 nights or more** (some need a year), so they are a separate "for stays of a month or longer" section.
- Also covered: branded serviced residences that **don't exist in Taipei** (yet), one closure, one rename, and two openings due in 2027.
- **Not included:** Airbnb and other flats in ordinary residential buildings. Most short lets in Taipei are illegal (section 5). Also left out: hostels with shared kitchens, and hotels with only one kitchen suite (Guide Hotel Fuxing North; Grace Hotel Dunbei). Lininn Zhongshan is listed as an "aparthotel" on Booking but has **no kitchens**.

**How this was checked**
- **Consensus.** English and Traditional Chinese editorial pages were searched for; key pages were opened with WebFetch or the browser. Anything seen only in a search snippet is marked "(s)".
- **Excluded from counts:**
  - Booking sites and OTAs: Booking, Agoda, Trip.com, Klook, Expedia, Hotels.com, Trivago, Kayak, ezTravel, Wing On, AsiaYo, Gomaji, settour and colatour.
  - TripAdvisor and forums (Dcard, PTT, Mobile01, Forumosa).
  - Airbnb and VRBO.
  - Aggregator and clone sites: cozycozy, besthotels-taipei, taipeihotelinfo, myaparthotel, aparthotelshq, `*.tw-taiwan.com` and moveandstay.
  - **trip101.com**: an Airbnb/Booking listing tool (its own text: "Superhost status… image galleries get refreshed").
  - **Mr. Host (mrhost.com.tw)**: a short-let and monthly-rental **booking platform** writing about properties it sells, with affiliate links (e.g. "2026【大台北酒店式公寓】20間推薦", first published 23 Jul 2022). Its picks are used **as leads only**, never as votes.
- **English editorial is almost empty.** Nick Kembel's where-to-stay guide (upd 19 Feb 2026), Travel Lemming (Sky Ariella, upd 23 Mar 2026) and Go Ask a Local (Jenna Lynn Cody) were opened in full. **None names a serviced apartment or aparthotel.** Travel Lemming only points readers to "Airbnbs" in every district, which the page should not do (section 5). The only English editorial pick found is **Gloria Residence** (Tara O'Reilly, via the Zhongshan research).
- **Walking times.** Google Maps walking directions (GM), run live on 29 Sep 2026. Exit coordinates are reused from the Zhongshan and Daan research (OSM `railway=subway_entrance` nodes). For Taipei Main Station the TRA/HSR station building (25.0478, 121.5170) was used as the origin, so those are **street-level** walks.
- **Prices.** Booking.com, TWD, **Wednesday 11 to Thursday 12 November 2026, 1 night, 2 adults**, checked 29 Sep 2026. Saturday = **14 to 15 November**. Where Saturday was unavailable, 7 and 21 November were tried and are labelled. Figures are the lowest displayed price for each room type. Gloria was also checked on its **official booking engine** and for a **7-night stay**. CH Service Apartment was checked for a **30-night stay**. Prices are a single-source snapshot, not editorial evidence.
- **Licence numbers** come from each official site's footer, the Booking.com "License number" field, or the Tourism Administration's legal-lodging site (taiwanstay.net.tw).
- **Working files** are in the session scratchpad folder `aparthotels/`: `longstay.txt` (owner text), `gm.cjs` (walk batches) and `check-finds.cjs` (find/replace checks).

---

## 1. Summary: what surprised us

1. **Almost none of the big serviced-apartment brands are in Taipei.**
   - **No** Fraser Place/Fraser Suites, **no** Shama, **no** Citadines or Somerset, **no** Oakwood, and **no** Grand Hyatt Residence. Shama's own location list is China, Hong Kong, Johor Bahru and Bangkok only.
   - Two brands are **coming in 2027**:
     - **Fraser Residence Taipei** in **Beitou** (near Tianmu and Shipai MRT), with 200+ suites of 1–3 bedrooms, a heated pool and a gym. It was announced on 20 Jun 2024, with Hung Tai Group.
     - **Ascott Nangang Taipei**: 185 units in Nangang Software Park, with a footbridge to Taipei Nangang Exhibition Center station and LaLaport. **Due to open 1Q 2027**; the partner is The GAIA Hotel.
2. **The Sherwood Taipei closed on 15 Feb 2022** (Taipei Times, 1 Jan 2022; Business Next) for redevelopment. No "Sherwood Residence" exists.
3. **京站國際酒店式公寓 (I.T Service Apartment, Q Square) closed in October 2020** (niny.tw, 2020 post, updated note). Agoda still has a live-looking "2026 offers" page for it. **Don't list it.** The licensed operator in the same Q Square/bus-station complex is **AJ Residence Taipei** (licence 757), which is a different business.
4. **The Astar Hotel on Linsen North Road has reopened as an apartment-style hotel.**
   - It is now **亞士都精品酒店 EverStar Hotel**, reopened on **29 May 2026** after a five-year rebuild (udn, 29 May 2026). The owner, 九昱建設, also owns Jolley.
   - Every room has a **kitchenette, a household fridge and a microwave**; suites add a **washer-dryer and a dish dryer**. Rooms are 8–11 ping.
   - **Booking still lists it as "亞士都酒店"**, and **Klook's page (255592 "Astar Hotel Taipei") still shows the old hotel** (794 reviews, old room types).
5. **Legal risk is the big story for this page.**
   - Since the **2 April 2025 amendment to the Development of Tourism Act (發展觀光條例)**, running unlicensed lodging costs **NT$100,000–2,000,000**, up from a NT$500,000 ceiling. Illegal advertising can cost up to **NT$1.5 million**, and **platforms that list illegal lets can be fined NT$60,000–2,000,000 per listing**.
   - Taipei City has only a **handful of possible legal minsu (民宿)**. They are allowed only in Yangmingshan National Park, leisure farms and listed heritage buildings.
   - So a nightly "apartment" in an ordinary Taipei block is almost certainly illegal.
6. **The difference between "aparthotel" and "serviced apartment" is legal, not marketing.** Anything let **by the day or the week** is lodging and needs a hotel licence (旅館業管理規則 Art. 2: "以日或週之住宿"). **Monthly lets are ordinary tenancies.** That is why Park259, KT, CH, REDIN, The Corner House and Jasper Villa all insist on **30 days or more** (Jasper Villa: a year).
7. **Weekly discounts are real but modest.** Gloria Residence on Booking costs **NT$7,440 for one Wednesday night**, but **NT$47,920 for 11–18 Nov, which is NT$6,846 a night (about 8% less)**. Its official site was cheaper again for one night (**NT$7,068**). Jolley advertises a **7+ night "Taipei Extended Stay" offer**. Nobody publishes a weekly rate card.
8. **Saturdays sell out.** Leofoo and Jolley had **no Booking availability on Sat 14 or Sat 21 Nov**, and AJ Residence had none on any date tried. Gloria barely moves at weekends (NT$7,440 → 7,840).
9. **Gloria's owner text is mostly right, and one earlier doubt is now resolved.** Its English site says "**24-hour service center**", which supports the owner's "24-hour reception".
   - Still unconfirmed: "**induction hob**" (the official list says "European-style kitchen equipment with extractor hood" and a "microwave oven") and "**terrace**".
   - The pool is **closed every Monday** and has set sessions (section 4.1).
10. **Jolley's breakfast is no longer free.** Older blogs (yama) say breakfast is included. The official facilities page now says **NT$420 per guest**. The 2F lounge (10:00–22:00) is free for guests.
11. **The best-value family pick is Urban Abode**, a licensed apartment hotel on the 24th floor of No. 50 Zhongxiao W Rd, opposite Taipei Main Station.
   - Its 34 m² studios **sleep four, with a kitchenette and a Taipei 101 view**, for **NT$3,306 (2 people) / NT$3,973 (4 people)** on Wed 11 Nov.
   - It has **no editorial coverage**, so the page should present it as "our find", not consensus.

---

## 2. Consensus counts

Columns:
- **EN** = distinct English editorial publishers naming it as a serviced apartment or aparthotel.
- **ZH** = distinct Traditional Chinese editorial domains (reviews and round-ups). (s) = seen in a search snippet only.
- **Leads** = excluded sources, shown for information.

| Property | Type | EN | ZH | Leads [excluded] | In guide? |
|---|---|---|---|---|---|
| Gloria Residence 華泰瑞舍 | Licensed aparthotel (nightly) | 1 (Tara O'Reilly) | 4: yama.tw (opened; 2020, upd 2021), blake.com.tw (s), christy0104.pixnet (s), annalovestravel (2014, s) | [mrhost], [trip101], [cozycozy] | **Yes (owner)** |
| Jolley Hotel 晴美公寓酒店 | Licensed aparthotel | 0 | 7: yama.tw (opened), daisyyohoho (s), saytainan (2019, s), yeh0410 (s), angelala (s), bigfang (s), biteamap (s) | [mrhost] | **Yes** |
| Leofoo Residences 六福居公寓式酒店 | Licensed aparthotel | 0 | 3: bigfang (s), biteamap (s), followmii (s) | [mrhost], [dcard] | **Yes** |
| Hanns House 瀚寓酒店 | Licensed hotel, some rooms with kitchens | 5 (as a hotel; see the 101 research) | 7 (as a hotel) + ericgo ("apartment-style", s) | | **Yes** (kitchen rooms only; also on the 101 page) |
| EverStar Hotel 亞士都精品酒店 | Licensed, kitchenettes (new May 2026) | 0 | 3 news/features: udn (opened, 29 May 2026), bella.tw (s), nextapple (17 Jul 2026, s) | | **Yes (new)** |
| Urban Abode Apartment 1 所在行旅1館 | Licensed apartment hotel | 0 | 0 (afterthirtytravel's Main Station list could not be opened) | [cozycozy] | **Yes (our find)** |
| AJ Residence Taipei 台北安捷公寓酒店 | Licensed apartment hotel, 1–3 bed | 0 | 0 for AJ itself (the niny and shhjusttellyou reviews are of the **closed** 京站國際) | [mrhost lists AJ group] | **Yes (families)**, with a caveat on availability |
| Tianmu Star Urban Living 天母之星商務會館 | Licensed, some kitchenette rooms | 0 | 0 | | Optional (the only Shipai/Tianmu option) |
| *Monthly only (30+ nights)* | | | | | |
| Park259 (Jean Residence) 新美齊酒店式公寓 | Monthly serviced apartments | 0 | 6: flyblog (opened), tiyama (s), viviyu (s), boniutravel (s), ber925 (s), luluyelife (2020, s) | [mrhost] | **Yes (monthly)** |
| The Corner House 安居台北 | Monthly serviced apartments | 0 | 3: wendy0520 xuite (s), carjaswong (2017, s), misskitb (2017, s) | [mrhost] | **Yes (monthly)** |
| KT-Star / KT-Boutique 基泰酒店式公寓 | Monthly | 0 | 0 | [mrhost ×3], mobile01 | Yes (one line) |
| CH Service Apartment 謙匯國際酒店式公寓 | Monthly (30+ nights) | 0 | 0 | [mrhost] | Yes (one line) |
| REDIN Residences 紅典酒店式公寓 | Monthly (luxury) | 0 | 1 news item (China Times, 30 Jan 2019) | [mrhost] | Yes (one line) |
| Shin Kong Jasper Villa Xinyi 新光信義傑仕堡 | Luxury rental, **1-year minimum** | 0 | news (udn money, ETtoday house) | | Mention only |
| *Coming / not in Taipei / closed* | | | | | |
| Ascott Nangang Taipei | Serviced residence | — | — | Ascott press release (Feb 2026) | "Coming 1Q 2027" |
| Fraser Residence Taipei (Beitou) | Serviced residence | — | — | Frasers newsroom (20 Jun 2024) | "Coming 2027" |
| Fraser Place/Suites, Shama, Oakwood, Citadines, Somerset, Grand Hyatt Residence | — | — | — | brand sites / searches | **None in Taipei** |
| The Sherwood Taipei | — | — | — | Taipei Times | **Closed 15 Feb 2022** |
| 京站國際酒店式公寓 I.T Service Apartment | — | — | niny.tw | [Agoda still live] | **Closed Oct 2020** |
| *Other leads not verified* (from mrhost or the Chinese search) | | | | | |
| The Denizen 真寓 (Daan), Hi-Lai Residence 漢來酒店式公寓 (Songshan), sáv Residence 台北逸居 (Xinyi, No. 46 Jingyun St), Lamaison 宜家宜居 (Songshan), Readdaan 閱讀大安, Istaytion / AJ monthly apartments (8 buildings), Mandarin Oriental Residences (26 units; terms not stated) | Mostly monthly | 0 | 0 | [mrhost] | No: unverified. At most a one-line "also" |

**English publishers opened (with dates)**
- Tara O'Reilly (upd May 2026, via the Zhongshan research): Gloria Residence.
- Nick Kembel (nickkembel.com, upd 19 Feb 2026): no apartments. It mentions free laundry at amba Ximending and Comma Boutique only.
- Travel Lemming (Sky Ariella, upd 23 Mar 2026): no apartments. It links to "Airbnbs" in every area.
- Go Ask a Local (Jenna Lynn Cody, "June 15"): no apartments, kitchens or Airbnb.

**Traditional Chinese pages opened**
- yama.tw, Gloria Residence (12 Sep 2020, upd 11 Jan 2021): Abundance 13 ping/43 m²; "complete Western-style kitchen" with **oven**, dishwasher, coffee maker and rice cooker; three-in-one washer-dryer on the balcony; indoor pool; 10 min from Shuanglian exit 1 or Zhongshan Elementary exit 2. In-article links recommend Jolley.
- yama.tw, Jolley: 3 min from Zhongshan Elementary exit 1; IH hob **and oven**; some balconies have a washer, and there are free shared machines on 2F; opened 2018.
- flyblog.cc, Park259: 3 min from Dongmen / Daan Park; from NT$55,000/month; cleaning twice a week; gym on 2F; IH, microwave-oven and washer-dryer.
- bobbytravel.tw family hotels (upd 25 Jul 2026): **no apartment-style picks**, only self-service laundry at Roaders Plus and Hua Shan Din.
- udn (29 May 2026): EverStar reopening.

---

## 3. Claim table: area, law and category facts

| # | Claim | Verdict | Fact / note | Source | Date |
|---|---|---|---|---|---|
| C1 | Short lets need a licence | VERIFIED | 旅館業 = providing lodging "以日或週" (by the day or week) for a fee to non-specified people (旅館業管理規則 Art. 2). A 2000 Tourism Bureau ruling (觀賓字第0990014797號) treats "日租屋" as hotel or minsu business | law.moj.gov.tw K0110014 (amended 27 Jun 2025); tpedoit FAQ via search | 2025 |
| C2 | Monthly lets are tenancies | VERIFIED (interpretation) | Lets **by the month or year with no lodging services** are ordinary residential leases. Lets for under a month on a daily or weekly basis are lodging. This is why monthly serviced apartments set a 30-day minimum | tpedoit FAQ "什麼是日租套房" (s); legis-pedia | – |
| C3 | Fines | VERIFIED | Tourism Development Act amendment **promulgated 2 Apr 2025** (Arts 4, 54–55-1, 57, 70-2). Unlicensed hotel operation: **NT$100,000–2,000,000** (was 100k–500k). Illegal advertising: **up to NT$1.5m** (was 300k). **Online platforms** listing illegal lets: **NT$60,000–2,000,000**, repeatable | lawbank / merit-times summaries (s); Taipei Tourism press release 2 May 2025 (opened) | 2025 |
| C4 | Taipei's "3 steps" to spot a legal stay | VERIFIED | (1) check whether the address is a residential block; (2) look it up on **taiwanstay.net.tw** (交通部觀光署旅宿網, "合法旅宿查詢"); (3) check for the **licence certificate and official mark** on site. Informants get **15% of the fine** | tpedoit.gov.taipei press release | 2 May 2025 |
| C5 | Official lodging mark | VERIFIED | Hotels must display the **旅館業專用標識** (hotel mark) in a conspicuous place, with the registration number (Art. 15). **Every advert, website included, must show the registration number** (Art. 18-1). Minsu have their own 民宿專用標識 | 旅館業管理規則 | 27 Jun 2025 |
| C6 | Legal minsu in Taipei | VERIFIED | Minsu are allowed only in **Yangmingshan National Park, licensed leisure farms / farm areas, and designated heritage buildings** (plus areas of cultural or historic character). Mirror Media (2017) found **only one** legal minsu in the whole city then; the current count is not stated | tpedoit.gov.taipei FAQ (upd 31 Jul 2025); Mirror Media 24 Jul 2017 (s) | 2025 |
| C7 | Enforcement | VERIFIED (s) | Taipei fined illegal operators a record NT$23.4m in 2022 (Taipei Times, 12 Feb 2023). China Times (9 Jul 2025): "北市今年已罰千萬" | Taipei Times; wantrich (s) | 2023–25 |
| C8 | Single-use toiletries | VERIFIED | Taipei hotels stopped giving out single-use toiletries by default from **1 Jan 2025** (Leofoo notice). Gloria says **from 1 Jan 2026** (its own notice). Bring your own or ask | leofooresidences.com.tw; gloriaresidence.com | 2025–26 |
| C9 | Typical minimum stays | VERIFIED | Licensed aparthotels: **1 night**. Monthly apartments: **1 month** (KT, Park259, CH "30 days", Corner House "Monthly-Serviced Apartment"). Jasper Villa Xinyi: **1 year** | official sites; Booking; PTT ad (10 Apr 2024) | 2024–26 |
| C10 | Brands not in Taipei | VERIFIED (by search) | Shama: official location list has no Taiwan. Oakwood, Citadines/Somerset: no Taipei property found (Ascott's first Taipei signing is Ascott Nangang). Fraser: first Taiwan property is Fraser Residence Taipei (2027). Grand Hyatt: no residence found | shama.com; Ascott / Frasers releases | 2024–26 |
| C11 | Taiwanstay search | NOTE | taiwanstay.net.tw has an English interface and a "合法旅宿查詢" search. Its name search could not be scripted, so licence numbers here come from official sites and Booking | – | – |

---

## 4. Per-property fact sheets

GM = Google Maps walk, 29 Sep 2026. Prices are Booking.com TWD, 2 adults, Wed 11 Nov / Sat 14 Nov 2026, unless stated.

### A. Licensed aparthotels you can book by the night

### 4.1 Gloria Residence 華泰瑞舍 (owner's pick)
- **Area / address:** Zhongshan. No. 359, Linsen N Rd, at Minsheng E Rd. **Licence: 旅館業營業登記證第435號** (official footer). Gloria Hotel Group, which also runs Hotel Proverbs.
- **Walk:** official **10 min to Shuanglian (exit 1) or Zhongshan Elementary School (exit 2)**. GM **9 min / 600–650 m** from either (Zhongshan research). Ningxia Night Market: 18 min / 1.2 km (GM).
- **Apartments (official):**

  | Type | Size | Sleeps | Notes |
  |---|---|---|---|
  | Abundance | 43 m² | 2 (booking engine: "sleeps 3") | bathtub |
  | Infinity | 51 m² | 2 (engine: 3) | |
  | Royal B | 64 m² | 2 (engine: 3) | king |
  | Royal A | 70 m² | 2 | |
  | **Oasis** | **85 m² (25.8 ping)** | **4** | **2 bedrooms, 2 bathrooms (one with a tub)**, separate living room |
  | Luxury | 91 m² | 2 | |
  | Glory | 158 m² | 4 | |

- **Kitchen (official amenities page):** "歐式廚房設備及抽油煙機" (European-style kitchen with an extractor hood), **微波烤箱 (combination microwave oven)**, dish dryer, full crockery, coffee machine and kettle.
  - The **hob type is not stated officially.** Third-party sources: yama mentions an oven; mrhost says "Heller cooktop" [excluded].
  - yama (2020) also lists a dishwasher and rice cooker.
- **Laundry:** **洗脫烘三合一洗衣機 (washer-dryer) with detergent, on each balcony**, plus a drying rail.
- **Pool (official):** heated indoor pool, 18 m × 4.6 m × 1.2 m, open all year, **closed every Monday** for cleaning.
  - Sessions: weekdays **07:00–10:00, 14:00–17:00, 18:00–21:00**; weekends **08:00–11:00, 14:00–17:00, 18:00–21:00**.
  - Residents only. Under-12s must be with a parent. Swim caps required.
- **Other facilities:**
  - B1 "The Lounge", open 24 hours, with a games area.
  - **24-hour service center** (EN site).
  - **Free loan of dehumidifiers and baby equipment.**
  - Paid laundry/dry cleaning, airport car and massage booking.
  - **No gym** (none listed; mrhost says "no fitness center").
- **Parking:** 1 free space per room (Zhongshan research).
- **House rules (official, 1 Dec 2025):** no parties; **max 4 visitors per room, 09:00–22:00 only**.
- **Cleaning:** daily by default. The official engine sells a cheaper-or-equal "**Eco-friendly (no daily cleaning)**" rate (sold out for Wed 11 Nov).
- **Kids (Booking):** cots free (0–2); extra bed NT$1,000 (6+); children 12+ charged as adults.
- **Price:**
  - Booking: Abundance **NT$7,440** (Wed) / **NT$7,840** (Sat); Infinity NT$8,000 / 8,400.
  - **Official engine, Wed:** Abundance **NT$7,068**; Infinity NT$7,600. Abundance Twin, Royal B and **Oasis unavailable** that night.
  - **7 nights, 11–18 Nov (Booking):** Abundance **NT$47,920 = NT$6,846/night**. 30 nights (11 Nov–11 Dec): no availability.
  - Oasis (family) price: **not found** for these dates.
- **Klook:** `https://www.klook.com/en-GB/hotels/detail/113738-gloria-residence/?aid=8733` ✔ (No.359 LinSen North Road). Owner's existing link.

### 4.2 Jolley Hotel 晴美公寓酒店
- **Area / address:** Zhongshan (north end of Linsen N Rd, by the Qingguang market area). **2F–13F, No. 568, Linsen N Rd.**
  - **Licence: 臺北市旅館668號** (taiwanstay, as "九昱晴美").
  - 62 rooms, including 1 accessible room. Opened **2018**. Owner: 九昱建設 (also owns EverStar).
  - Starbucks on the ground floor (bigfang/biteamap, s).
- **Walk:** **Zhongshan Elementary School exit 1, 3 min / 220 m (GM)**; exit 2, 3 min / 230 m. yama: 3 min from exit 1. Minquan W Rd (Red/Orange) is further.
- **Rooms (official):** Superior, **Deluxe 50 m²** (king or twin), Mini Suite, Corner Suite, **Family Suite 56 m²** (queen + single), Sunshine Suite, Jolley Suite, Barrier-free.
  - Booking types: Deluxe Double with Balcony (49 m²), Standard Triple Studio (53 m², max 3), Suite with Terrace (57 m², max 3).
- **Kitchen (official, Deluxe and Family Suite lists):** **induction hob**, **130-litre fridge**, kitchenware and kettle. yama and daisyyohoho also mention an **oven**; Booking calls it a "private kitchenette".
- **Laundry:**
  - Official room lists include a **washer-dryer**. yama says only some balconies have one.
  - **Free washers, dryers and detergent** on the 2F balcony for all guests (official).
- **Other (official):**
  - 24-hour front desk.
  - Jolley Café 2F: **breakfast 07:00–09:30, NT$420 per guest** (older blogs say it's free, which is outdated). **Lounge 10:00–22:00 with free drinks and snacks for guests.**
  - Baby kit on loan (bottle warmer, steriliser); sofa bed for a fee.
  - No gym or pool. Mechanical parking, limited (yama).
- **Long stays (official):** "**TAIPEI EXTENDED STAY – stay 7+ nights, exclusive long-stay benefits**"; 30+ night rates (official homepage summary). No rates published.
- **Kids (Booking):** **no cots**; extra bed NT$1,500 (6+); children 18+ charged as adults.
- **Price:** Deluxe Double with Balcony **NT$5,304**; Triple Studio NT$6,899–7,773; Suite with Terrace NT$9,750. **Sat 14 and Sat 21 Nov: no availability.** 7 nights (11–18 Nov): no availability.
- **Klook:** `https://www.klook.com/en-GB/hotels/detail/410611-jolley-hotel/?aid=8733` ⚠ Klook gives the address as "**No.566**, Linsen N. Rd." against the official **No. 568**. Same property name; adjacent number (probably the same building's ground-floor number). **Owner to confirm before linking.**

### 4.3 Leofoo Residences 六福居公寓式酒店
- **Area / address:** Zhongshan. **No. 38, Sec. 1, Nanjing E Rd**, facing Linsen Park. **Licence: Taipei City Hotel No. 399** (official). Leofoo Development Co.
- **Walk:** official "5 minutes' walk from Zhongshan MRT". **GM: Zhongshan exit 3, 5 min / 300 m; exit 2, 6 min / 350 m.** Booking: 400 yd.
- **Suites (official):** only **two types**, both one-bedroom with a separate living room:
  - **City View Suite King**: with a hot tub; 18 ping, about 60 m² (bigfang, s).
  - **Park View Suite King**: 25 ping, about 83 m²; Booking 893 ft²; balcony/terrace.
- **Kitchen (official facilities):** "Fully equipped designer kitchen with **double induction cooker**", fridge, microwave and kettle. A blog says pans and crockery for two are provided, but **no knives or chopping board** (s).
- **Laundry:** **in-unit washer-dryer with detergent pods** (official).
- **Other (official):**
  - **Free parking** for guests (mechanical, max 1.90 m high).
  - Rooftop bar 18:00–23:00; happy hour 14:00–20:00 (alcohol 18:00–20:00); reading lounge 24/7; 24-hour front desk.
  - **No gym or pool.**
  - Daily cleaning (TripAdvisor review summary; not official).
- **Kids (Booking):** cot free (0–1); extra bed NT$1,430; children 12+ charged as adults. Minimum check-in age 18. Check-in 15:00–23:30, check-out 12:00.
- **Reviews:** some recent complaints about maintenance (mould, worn cords; TripAdvisor snippets, not used as fact).
- **Price:** King Suite Park View **NT$7,700** (Wed; the only type on sale). **Sat 14 and Sat 21 Nov: no availability; Sat 7 Nov NT$7,700.** 7 nights (11–18 Nov): no availability.
- **Klook:** `https://www.klook.com/en-GB/hotels/detail/436171-leofoo-residences/?aid=8733` ✔ (No.38 Section 1 of Nanjing East Road).

### 4.4 Urban Abode Apartment 1 所在行旅1館-小所在
- **Area / address:** Zhongzheng, opposite Taipei Main Station. **24F-6, No. 50, Sec. 1, Zhongxiao W Rd** (Google resolves the address to the Mayer Inn building). **Licence: 台北市旅館724號** (Booking). A second branch, Urban Abode 2 "DUGU", is also listed on Booking (not checked).
- **Walk:** **GM 6 min / 350 m from the TRA/HSR station building**. The underground mall exits are closer (not measured).
- **Units (Booking):** 101-view studios, **34 m² (366 ft²)**, with a **private kitchenette** (fridge, microwave, hob, crockery; reviews mention a "cooking plate"). One studio type has a bathtub. Also a **101 View Two-Bedroom Apartment**.
  - **Family studios sleep up to 4.**
  - Washing machine listed (Booking description).
- **Kids (Booking):** **cots free (0–3)**; extra bed NT$1,200. Check-in 15:00–22:00; **check-out 09:00–11:00**.
- **Price:** studio **NT$3,306** (2 people) / **NT$3,973** (4 people) / NT$4,639 (bathtub studio, 4). **Sat 14 Nov: only the 2-bedroom apartment, NT$13,557.**
- **Editorial:** none found. Booking 8.5; one review says it "easily accommodates four people" (s).
- **Klook:** `https://www.klook.com/en-GB/hotels/detail/588350-urban-abode-apartment-1/?aid=8733` ✔ (No 50 Sec 1 Zhongxiao W Rd).

### 4.5 AJ Residence Taipei 台北安捷公寓酒店
- **Area / address:** Datong, on top of the **Taipei Bus Station / Q Square** complex. **5F-8, No. 203, Sec. 1, Civic Blvd (市民大道一段203號)** (official); Booking says No. 201. **Licence: 台北市旅館字第757號** (official and Booking). Part of AJ Hotel Management Group (安捷), which also runs 8 monthly-rental buildings (apt.ajghotel.com).
- **Walk:**
  - Official: from the MRT, follow signs for 市民大道 through the Zhongshan Metro Mall and Q Square, **about 3 min**. From TRA/HSR via exit R1 or Y3, about 5 min. From **Airport MRT A1** via Y3, about 5 min.
  - **GM (street level) from the station building: 7 min / 500 m.**
- **Units (official):**

  | Type | Size | Sleeps | Layout |
  |---|---|---|---|
  | Deluxe Business Suite | 83 m² (25 ping) | 2 | 1 bed, 1 living, 1 bath |
  | Classic Business 2BR | 83–92 m² | 2–3 | 2 bed, 1 living, 1 bath |
  | Warm Family 2BR | 132 m² (40 ping) | 2–3 | 2 bed, 2 living, 2 bath |
  | **Warm Family 3BR** | **132–145 m²** | **4–5** | 3 bed, 1 living, 2 bath |

  All units have furniture, kitchenware, heated toilet seats, balconies and appliances. Booking adds a **kitchenette and washing machine**.
- **Stays:** nightly (licensed) plus **weekly and monthly** options (official). Reviews say there is **no daily towel change or bottled water** (s).
- **Kids (Booking):** **no cots or extra beds**; children 13+ charged as adults; minimum age 18; cash only (Booking).
- **Price:** **no Booking availability on Wed 11, Sat 14 or Wed 18 Nov.** The official site shows no rates (booking by member login or 0800-777-980).
- **Klook:** **not found** (searches for "AJ Residence", "安捷" and "Istaytion" returned nothing). Use no link, or Booking.

### 4.6 EverStar Hotel 亞士都精品酒店 (formerly Astar Hotel, reopened May 2026)
- **Area / address:** Zhongshan. **2F, No. 98, Linsen N Rd**, where Linsen N Rd meets Tiaotong lane 6 (六條通): the izakaya and bar lanes (see `taipei-nightlife`).
  - **Licence: 臺北市旅館816號** (Booking).
  - The original Astar Hotel dates from **1964**. Reopened **29 May 2026** after 5 years of rebuilding (udn). Fourth Zhongshan hotel of 九昱建設 (Jolley's owner).
- **Walk:** udn about 550 m to Zhongshan station. **GM: Zhongshan exit 2, 8 min / 550 m; exit 3, 9 min / 550 m.**
- **Rooms (udn):**
  - Two types: 花見客房 (rooms) and 花悅套房 (suites), **8–11 ping (about 26–36 m²)**.
  - All have a **household fridge, microwave and simple kitchen**. **Suites add a washer-dryer and a dish dryer.** Slumberland beds, bidet toilets, separate wet and dry bathrooms.
  - Booking: Double 26 m², Twin 30 m², **One-Bedroom Suite 37 m²**, all with kitchenette and balcony. Daily housekeeping.
- **Kids (Booking):** cots free (0–2); **no extra beds**. Check-in 15:00–23:00, check-out 12:00.
- **Price:** Double **NT$4,700** (Wed); One-Bedroom Suite NT$5,800. **Sat 14 Nov: Double NT$6,100, Suite NT$7,200.** udn gives the average rate as about NT$5,000. Opening offer: buy one weekday night, get one free, until 31 Aug 2026 (now expired).
- **Noise:** the Tiaotong bar quarter is next door (flag; not reported).
- **Klook:** ⚠ `255592-astar-hotel-taipei` has the right address ("98, Lin-Shen N. Rd") but **still shows the pre-renovation Astar Hotel** (794 reviews, 3.9/5, old room types). **Don't link until Klook updates it**; recheck later.

### 4.7 Hanns House 瀚寓酒店 (kitchen rooms only; also on `hotels-near-taipei-101`)
- **Area / address:** Xinyi. No. 206, Sec. 1, Keelung Rd. **Licence: 台北市旅館706** (Booking). 120 rooms.
- **Walk:** **City Hall exit 2, 4 min / 270 m (GM)**; Taipei 101 11 min (101 research).
- **Kitchens:** every room has a **fridge and microwave** (101 research). **Only some types have a real kitchen** (Booking "Private kitchen"):
  - **Superior King Room, 33 m² (355 ft²)**
  - **Premier Suite, 46 m²**
  - **Superior Suite, 48 m²**
  - ericgo: "部分房型更提供烹煮設備". Self-service coin laundry for long-stay guests (s).
- **Kids (Booking):** **no cots or extra beds**; children 12+ charged as adults.
- **Other:** no pool; Michelin-listed hotel (101 research).
- **Price:** Superior King (with kitchen) **NT$9,299 / Sat NT$10,886**; Premier Suite NT$12,837 / 14,424; Superior Suite NT$14,651 / 16,239. Cheapest room overall (no kitchen) NT$8,845 / 10,433.
- **Klook:** `https://www.klook.com/en-GB/hotels/detail/391766-hanns-house/?aid=8733` ✔ (reused from the 101 research).

### 4.8 Tianmu Star Urban Living 天母之星商務會館 (optional)
- **Area / address:** Beitou, Shipai, on the edge of Tianmu, which is Taipei's expat and international-school area. **No. 46, Lane 166, Sec. 1, Shipai Rd.** **Licence: Taipei City Hotel 768-1** (Booking).
- **Walk:** **Shipai station, 4 min / 260 m (GM)**. Booking says 3 min. Shipai Night Market is 5 min (Booking).
- **Rooms (Booking):** "**Warm**" Double and Twin, **30 m², with a private kitchenette**. Other room types have none. Triple 50 m² (no kitchen). A washing machine is not confirmed.
- **Price:** Warm Double/Twin **NT$4,485 / Sat NT$5,520**.
- **Editorial:** none. It is the only licensed kitchenette option found near Tianmu until Fraser Residence opens in 2027.
- **Klook:** `https://www.klook.com/en-GB/hotels/detail/657372-tianmu-star-hotel/?aid=8733` ✔ (No. 46, Lane 166, Section 1, Shipai Rd, Beitou District).

### B. Monthly serviced apartments (30 nights or more)

### 4.9 Park259 新美齊酒店式公寓 (Jean Residence)
- **Area / address:** **No. 259, Sec. 2, Xinyi Rd** (Zhongzheng District, north side of Xinyi Rd; the phone number ends 2259). Near Yongkang Street and Daan Park. Developer 新美齊 (listed company 2442).
- **Walk:** **Dongmen exit 5, 4 min / 240 m (GM)**; Daan Park exit 1, 5 min / 300 m (GM). flyblog: under 3 min.
- **Minimum stay:** **1 month** (PTT ad, 10 Apr 2024). Longer contracts (6 months, 1 year, 2 years) are discounted. **One month's deposit.**
- **Rent:** **from NT$55,000/month** (about NT$1,800/day; flyblog). Rent includes water, electricity, internet, cable, management fee, tax and **cleaning twice a week**.
- **Units:** full kitchen with **IH hob and combination microwave-oven**, wine fridge, **washer-dryer**, bathtub plus walk-in shower, and an Illy coffee machine (flyblog). Gym on 2F, rooftop garden, business centre.
- **Klook:** not applicable (monthly). Official site: jeanresidence.com/park259.

### 4.10 The Corner House 安居台北
- **Area / address:** Da'an. **No. 10, Lane 157, Sec. 1, Xinsheng S Rd.** Official EN: "**The Corner House Taipei (Monthly-Serviced Apartment)**", 7 storeys.
- **Walk:** official "neighbouring exits 1 and 6 of Da'an Park station". **GM from Daan Park exit 6: 2 min / 170 m; exit 1: 4 min / 300 m** (Google snapped the address to No. 21-10 in the same lane, so ±1 min).
- **Units (official):** Superior 27 m²; Business 34 m²; Deluxe Suite 44 m²; Executive Suite 54 m²; **Residence Suite 60 m², two bedrooms**. Each unit has a living area and a simple kitchen (IH and microwave, per blogs, s).
- **Facilities (official):** 24-hour lobby; **free breakfast**; drinks all day; business centre; **B1 gym**; **guest laundry room** (shared, not in-unit).
- **Rent:** mrhost [excluded] quoted NT$79,200+/month (2022). Not confirmed.
- **Note:** its website's HTTPS certificate belongs to leofooresort.com.tw, which **suggests Leofoo group involvement**. Not confirmed.
- **Klook:** it has two listings (`536030-the-corner--house`, `666758-the-corner-house`) with the matching address. Because it markets itself as monthly-only, **don't link it for nightly stays** unless the owner confirms Klook bookings are honoured.

### 4.11 KT-Star (Zhongshan) / KT-Boutique (Xinyi) 基泰酒店式公寓
- **Minimum stay:** **1 month; no daily or weekly lets** (mrhost, s). Leases up to 1 year.
- **Zhongshan branch** (Minquan W Rd station, about 7 min):
  - Monthly rates (mrhost, s): **NT$53,000** (精緻套房), NT$60,000, NT$73,000, **NT$89,000 (family room)**, NT$120,000 (two-bedroom).
  - Kitchenette and in-room washer; rooftop pool (mrhost).
- **Xinyi branch** (**Liuzhangli, about 6 min**): from **NT$98,000/month**.
- Official site ktapartment.com. Low detail; one line only.

### 4.12 CH Service Apartment 謙匯國際酒店式公寓
- **Address:** No. 6, Nong'an St, Zhongshan, between Minquan W Rd and Zhongshan Elementary School stations (about 10 min).
- **Minimum stay:** **30 days** ("specialise in monthly rental… minimum stay of 30 days"; a rental agreement is signed at check-in; Booking).
- **Rent includes** management, cleaning, Wi-Fi, cable and water.
- **Units:** IH hob, dish dryer, microwave, **own washing machine**; outdoor pool and gym (Booking/mrhost).
- **Price:** Booking, **30 nights 11 Nov–11 Dec: Deluxe Classic Apartment NT$102,000** (about NT$3,400/night).
- The same group runs Place X 謙匯普樂室 in Xinyi (101 research: a basement hotel with weak reviews).

### 4.13 REDIN Residences 紅典酒店式公寓
- **Address:** No. 569, Sec. 4, Zhongxiao E Rd, Xinyi, about 320 m from **Taipei City Hall** station.
- **Opened** after Lunar New Year 2019 (China Times, 30 Jan 2019).
- **Units:** **59 units of 16–48 ping** (about 53–159 m²), with living room, dining room, bedroom(s) and kitchen. Gym, lounge, reading area and sky garden.
- **Rent:** **NT$98,000–220,000/month** (2019 figures). Monthly.

### 4.14 Shin Kong Jasper Villa Xinyi 新光信義傑仕堡 (mention only)
- Luxury rental towers in the Xinyi Planning District, **managed by the Regent (晶華) group**. 18–150 ping.
- **Lease at least one year**, about NT$3,200 per ping per month; NT$117,500–236,200/month (2022). Topped a 2025 list of Taipei luxury rentals at **NT$780,000/month** (udn money).
- **Not a short-stay option.** The Banqiao sister (New Taipei) sells short-stay packages.

### C. Coming soon (for a "watch this space" box)
- **Ascott Nangang Taipei**: 185 units, **1Q 2027**, Nangang Software Park. Footbridge to Taipei Nangang Exhibition Center MRT (Blue/Brown) and LaLaport; HSR Nangang is walkable. Partner: The GAIA Hotel (Ascott release, Feb 2026).
- **Fraser Residence Taipei**: **2027**, Beitou, near Tianmu and Shipai MRT. 200+ one- to three-bedroom suites; restaurant, heated pool, gym, yoga studio. Partner: Hung Tai Group (Frasers, 20 Jun 2024).

### 4.15 Prices at a glance (Booking.com; Wed 11 / Sat 14 Nov; cheapest unit with a kitchen)

| Property | Unit | Wed | Sat | Note |
|---|---|---|---|---|
| Hanns House | Superior King with kitchen, 33 m² | 9,299 | 10,886 | kitchen in some types only |
| Leofoo Residences | Park View Suite, about 83 m² | 7,700 | no availability (Sat 7: 7,700) | |
| Gloria Residence | Abundance, 43 m² | 7,440 (official 7,068) | 7,840 | 7 nights = 6,846/night |
| Jolley Hotel | Deluxe with balcony, 49–50 m² | 5,304 | no availability ×2 | Triple Studio 6,899 |
| EverStar Hotel | Double, 26 m² | 4,700 | 6,100 | new May 2026 |
| Tianmu Star | Warm Double, 30 m² | 4,485 | 5,520 | Shipai |
| Urban Abode | Studio, 34 m², sleeps 4 | 3,306 (2 people) / 3,973 (4 people) | only 2BR, 13,557 | |
| AJ Residence | 1–3 bedroom, 83–145 m² | no availability | no availability | also none on Wed 18 |
| CH Service Apartment | Deluxe Classic | — | — | **30 nights: 102,000** |
| Park259 | studio | — | — | **from 55,000/month** |
| KT-Star Zhongshan | studio → 2-bed | — | — | **53,000–120,000/month** (mrhost) |
| REDIN | 16–48 ping | — | — | **98,000–220,000/month** (2019) |

**Pattern:** nightly aparthotels cost NT$3,300–9,300 midweek, and the most popular sell out at weekends. For 30 nights, a monthly apartment (CH NT$102,000; Park259 from NT$55,000) works out far cheaper per night than any aparthotel.

---

## 5. Legal context (for a "Why not just Airbnb?" section)

- **The rule.** In Taiwan, renting a room or flat to travellers **by the day or the week** is "旅館業" (hotel business) and needs a hotel or minsu licence (旅館業管理規則 Art. 2; Tourism Bureau ruling 觀賓字第0990014797號). Leases **by the month or longer**, with no hotel services, are ordinary tenancies. That is why serviced apartments ask for 30 days.
- **Airbnb in Taipei.** Most whole-flat listings in Taipei are in ordinary residential blocks, and the city allows **minsu only in Yangmingshan National Park, licensed leisure farms and designated heritage buildings** (Taipei Tourism FAQ, upd 31 Jul 2025). So a nightly flat in a city block is almost certainly illegal. Licensed hotels also list on Airbnb; those are fine.
- **Penalties (Tourism Development Act, amended 2 Apr 2025):**
  - Unlicensed operation: **NT$100,000–2,000,000** and closure.
  - Illegal adverts: up to **NT$1.5m**.
  - Platforms: **NT$60,000–2,000,000 per illegal listing**, repeatable.
  - Taipei pays informants **15%** of the fine (press release, 2 May 2025).
  - Fines fall on operators, not guests. The risks to guests are **cancellation, eviction after a neighbour's complaint, no fire-safety inspection, and no insurance**.
- **How to check a place is legal (Taipei's "3 steps"):**
  1. Search the address. Is it a residential building?
  2. Look it up on **taiwanstay.net.tw** (Tourism Administration "Taiwan Stay"; has an English interface; "合法旅宿查詢" = legal lodging search).
  3. On arrival, look for the **licence certificate** and the **official mark**: the **旅館業專用標識** for hotels, or the **民宿專用標識** for homestays. Every legal hotel's website and adverts must show its **registration number** (Art. 18-1), e.g. "臺北市旅館○○○號".
- **Every nightly property in this guide shows its number:**

  | Property | Registration |
  |---|---|
  | Gloria Residence | 435 |
  | Leofoo Residences | 399 |
  | Jolley Hotel | 668 |
  | AJ Residence | 757 |
  | Urban Abode | 724 |
  | EverStar Hotel | 816 |
  | Hanns House | 706 |
  | Tianmu Star | 768-1 |

- **Typical minimum stays:** licensed aparthotels, 1 night. Serviced apartments, 1 month (KT, Park259, CH, The Corner House). Luxury rentals such as Jasper Villa Xinyi, 1 year. Expect a **one-month deposit** and a signed lease for monthly lets (Park259, CH).

---

## 6. Discrepancies with the owner's #Long-Stay text (best-areas-and-hotels-to-stay)

Each find string was checked with `scratchpad/aparthotels/check-finds.cjs` against `content/posts.json` on 29 Sep 2026. **Each matches exactly once site-wide, in `best-areas-and-hotels-to-stay`.** These are suggestions; nothing has been edited.

**Already fine (leave alone):**
- `<td>from NT$7,500</td><td>10 mins (Red/Orange)</td>`: Booking Wed NT$7,440 (official NT$7,068); 9–10 min. Correct.
- `and it's about 18 minutes' walk to Ningxia Night Market`: GM 18 min. Correct.
- The intro's "rates drop further on weekly and monthly bookings" and the FAQ's "the per-night rate usually drops on weekly bookings". Gloria's 7-night rate is about 8% less per night, and Jolley has a 7+ night offer. Defensible, but the drop is small.

**Suggested edits**

1. Gloria kitchen (optional: the hob type isn't confirmed officially)
   - Find: `Every apartment has an induction hob, microwave, full cookware and a washer-dryer`
   - Replace: `Every apartment has a European-style kitchen with an extractor hood, a combination microwave oven, full cookware and a washer-dryer`
2. Gloria facilities (the pool closes on Mondays; "terrace" is unconfirmed; "24-hour reception" is now supported by the EN site's "24-hour service center")
   - Find: `There's an indoor pool, a terrace, a lounge, 24-hour reception and free parking`
   - Replace: `There's a heated indoor pool (closed on Mondays), a 24-hour lounge, a 24-hour service desk and a free parking space for each apartment`
3. Family apartments (make it concrete; no Oasis price was found to support "at a similar rate")
   - Find: `the family apartments are larger than most Taipei hotel suites at a similar rate`
   - Replace: `the two-bedroom Oasis apartment (85&nbsp;m², two bathrooms, sleeps four) is larger than most Taipei hotel suites`
4. Kids FAQ (same point)
   - Find: `the family apartments are often larger than hotel suites at a similar rate`
   - Replace: `the family apartments are often larger than hotel suites`
5. Once the new page is live, the #Long-Stay section and the "Hotel or serviced apartment?" FAQ should link to it. Suggested find (matches once):
   - Find: `Worth comparing against a week in a boutique hotel; it usually wins.`
   - Replace: `Worth comparing against a week in a boutique hotel; it usually wins. For more options, from budget studios by Taipei Main Station to monthly apartments, see our guide to <a href="/aparthotels-serviced-apartments-taipei">aparthotels and serviced apartments in Taipei</a>.`

**Also consistent:** `hotels-in-zhongshan` (published) says the Oasis and Glory sleep four and the Abundance is 43 m². That agrees with the official site; no change needed.

---

## 7. Gaps

- **Editorial consensus is thin.**
  - Only **one English publisher** (Tara O'Reilly, Gloria) recommends any Taipei aparthotel. The mainstream English guides ignore the category.
  - Chinese support is mostly single-property blog reviews, many seen as snippets only (marked (s)).
  - Urban Abode, AJ Residence and Tianmu Star have **no editorial support**.
- **Prices are single-source (Booking.com)**, plus the Gloria official engine.
  - Leofoo and Jolley had no Saturday availability; AJ had none on any date.
  - Family units (Gloria Oasis, Jolley Family Suite, AJ 3BR) have **no November price**.
- **Weekly and monthly rates:** only Gloria (7-night Booking total), CH (30 nights on Booking), Park259, KT and REDIN (published or third-party monthly figures). Jolley's and AJ's long-stay rates are not published.
- **Gloria:** hob type (induction?) and "terrace" unconfirmed; Oasis/Glory availability and price unknown.
- **Jolley:** whether every room type has an in-room washer-dryer (official lists say yes for Deluxe and Family; yama says only some). Klook address No. 566 vs No. 568.
- **Leofoo:** room count and maximum occupancy not published; cleaning frequency from reviews only.
- **EverStar:** room count not published; noise from the Tiaotong bars untested; Klook listing out of date.
- **AJ Residence:** the address differs (official No. 203 5F-8 vs Booking No. 201); no rates; no Klook listing.
- **The Corner House:** current monthly rent and in-unit kitchen details are from old blogs; Leofoo ownership unconfirmed; whether nightly bookings are still honoured (Klook lists it).
- **KT, CH, REDIN:** facilities and rents mostly from mrhost (excluded source) or 2019 news.
- **The number of legal minsu in Taipei today** is not published (only the 2017 figure of one).
- **The taiwanstay.net.tw name search** could not be automated, so licence numbers were not cross-checked there, except Jolley's.
- **Oakwood/Citadines/Somerset absence** rests on searches and Ascott's "entry into Taipei" wording, not a full brand-locator check.

---

## 8. Internal slugs worth linking (checked in content/posts.json)

**Hotel guides**
- `best-areas-and-hotels-to-stay` (#Long-Stay, FAQ "Hotel or serviced apartment?", "Where should I stay in Taipei with kids?")
- `hotels-in-zhongshan` (Gloria's full write-up; Linsen N Rd / Tiaotong context for Jolley, Leofoo and EverStar)
- `hotels-near-taipei-main-station` (Urban Abode, AJ Residence)
- `hotels-near-taipei-101` (Hanns House)
- `hotels-in-daan` (The Corner House, Park259 area)
- `hotels-near-ximending`, `beitou-hot-spring-hotels` (for Fraser 2027 / Tianmu Star context), `hotels-near-taoyuan-airport`

**Living-like-a-local practicalities**
- `taipei-laundrettes`, `taipei-convenience-stores`, `best-supermarkets-and-delis-with-western-produce`, `best-markets-in-taipei`, `ikea-food-hall`
- `best-places-to-keep-kids-amused` (families)
- `best-cafes-to-work` (remote workers)
- `taipei-on-a-budget`, `taipei-money-guide`, `taiwan-sim-cards`, `taiwan-easycard`, `taiwan-visa-entry-requirements` (long stays)
- `cheap-breakfast-taipei`

**Getting around**
- `mrt`, `taoyuan-airport-mrt`, `songshan-airport`

**Nearby sights**
- `ningxia-night-market` (Gloria, 18 min), `taipei-nightlife` (Tiaotong, for EverStar)
- `daan-forest-park`, `yongkang-street` (Corner House, Park259)
- `shilin-night-market`, `xinbeitou` (Tianmu Star / Fraser)

**Not found:** no posts on Airbnb, renting a flat, digital nomads or moving to Taipei.

---

## 9. Photo keys (folder-style, to match data/hotel-photos.json)

**Existing keys (reuse):**
- `gloria-residence-taipei`: files `-2` (indoor pool), `-3` (fitted kitchen with hob, microwave and fridge; under best-areas) and `-3b` (apartment living area and bedroom; under hotels-in-zhongshan). **Suggest `-3` (kitchen) + `-3b` (apartment), or `-3` + `-2` (pool).**
- `hanns-house-taipei` (under hotels-near-taipei-101): files `-1` (corner room with 101 view) and `-3` (bathroom). **Neither shows a kitchen**, so a new kitchen-room photo would be better.

**New keys proposed:**
- `jolley-hotel-taipei`
- `leofoo-residences-taipei`
- `urban-abode-taipei`
- `aj-residence-taipei`
- `everstar-hotel-taipei`
- `tianmu-star-urban-living`
- `the-corner-house-taipei`
- `park259-jean-residence`

No existing photo files were found for any of the new properties in `public/media/2026/09/hotels/`.
