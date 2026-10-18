# Research: Best Salads in Taipei

Checked 18 October 2026. This file is research, not article copy. Slug: `best-salads-in-taipei` (existing page, "Best Salads in Taipei: 4 Places for a Fresh Salad", last modified 2 Apr 2023; GSC 14,014 impressions, 1 click, avg position 8.2). Companion file: `healthy-restaurants-that-taste-great.md` (same date). The two pages share Gonna and Miacucina. This file suggests which venues go on which page.

**Scope used**
- Places in Taipei City where the salad is the main thing you order: salad shops, build-your-own salad bars, warm-salad (溫沙拉) shops and salad-led cafés. Poke shops are left to `quick-and-healthy-meals` (which has `yu-poke` and `haloa-poke`) and get a cross-link. Grain-bowl, brunch and "clean eating" restaurants go to the healthy list.
- Every venue now on the page was re-checked (Hungry Pans, Miacucina, Gonna, TGI Fridays Songgao), branch by branch, using the 13 pins in the page's Google My Maps (`data/maps/1iqUw8ZlUJlIu3wueTxPXZ4CTgEDHrsY.json`, fetched 8 Sep 2026).

**How this was checked (and the limits this time)**
- **No page could be opened.** In this session WebFetch returned `getaddrinfo ENOTFOUND` for every host tried. That included Google Maps, Facebook, Instagram, Wikipedia, pixnet, ETtoday and the guessed official domains. Bash egress is blocked by the session proxy (403 on CONNECT, even to google.com). **So everything below comes from search-result snippets and is marked (s).** The search tool also returns a model-written summary. Where that summary could have mixed up which publisher said what, the claim is flagged "attribution unclear".
- **The search budget ran out partway through.** The 200-searches-per-turn limit is shared by every agent in the run, and it was used up after about 45 of this file's queries. Searches had not yet been run for Tamed Fox prices, Haloa Poke, Yu Poke, Miss Energy, Miss Green, Plants, BaganHood or Ooh Cha Cha. Nothing was searched for Woopen, Salad Den, 杉SHAN or Doris Salads beyond the list articles below. **The next pass needs to open these pages and run Google Maps checks before anything is published** (checklist in §6).
- **Consensus.** Independent editorial publishers in English and Traditional Chinese. **Excluded:** delivery and deal platforms (Uber Eats, GOMAJI blog), aggregators (Wanderlog, Yelp, TripAdvisor, ifoodie 愛食記 lists, Fonfood, FooTinder, menu-res, spinach.guide directory pages), forums (Dcard, PopDaily "forum" posts) and booking sites. Single-venue blog reviews are recorded separately from list articles, as "reviews". One author or brand across several sites counts once: JUKSY chill.juksy.com and juksy.com are one publisher.
- **Dates.** Where a snippet gave only "N days ago", the date was worked back from 18 Oct 2026, so it is approximate (≈).
- **MRT distances.** These are straight-line metres from the site's own map pins to approximate station coordinates. **Exits and walking minutes were not measured** (no Google Maps access). They are flagged for a Google Maps walking check.
- **Prices.** Uber Eats prices are noted where nothing else was found. In Taiwan they usually sit above dine-in prices, so treat them as upper bounds.

---

## 1. Summary: what surprised us

1. **There is no strong consensus on "best salad in Taipei".** No salad shop was named by more than four independent publishers in the snippets seen. The most-named is **Gonna / gonnaEAT 共樂遊** (4 salad-specific publishers + 1 healthy list). After it come **Woopen 木盆** and **Salad Den** (2 each, both 2023–2026). That leaves room for the site's own first-hand view, but the page should say it is a mix of our picks and what others recommend.
2. **Chinese-language coverage has moved to warm salads (溫沙拉) and "健康餐盒" lunch boxes.** POP Daily's May 2026 list is built entirely around warm salads. The shops it, REME and JUKSY name (Woopen, Salad Den, 杉SHAN, Doris Salads, 旭牧, Daylight 光合箱子) never appear in English guides. The page is missing a whole category.
3. **Two salad places already on the site have closed, and Chinese guides still recommend one of them.** **牧牧沙拉 MoooSalad** is on JUKSY's warm-salad list (≈Aug 2021) and in a Dcard thread. The site's own `mooo-salad` page says "Permanently Closed". Herban Kitchen, Aone Eatery and Amavie are also marked closed on the site.
4. **Hungry Pans has quietly lost its Xinyi branch.** Our page lists a branch in **B1 of Shin Kong Mitsukoshi A4** ("Branch 1, City Hall exit 3"). The brand's own undated Instagram branch list (s) names only 北醫 (Zhuangjing Rd), 寧波 (Ningbo W St), 公館 (Siyuan St) and 景平 (Zhonghe, New Taipei). A4 is missing. No 2025–2026 source confirmed any branch was trading.
5. **Hungry Pans' best-known branch isn't on our page at all.** The 寧波店 by Chiang Kai-shek Memorial Hall is on the page's map, but the venue page lists only A4 and 北醫. The taipeixcity blog (s) calls its strong point "木碗沙拉, cheap and huge portions".
6. **Miacucina's Neihu branch, the one our copy calls "one of the nicest places we've dined in Taipei", is reported closed.** A jjtheday.com post is titled "2026（已歇業）… Miacucina 內湖店" (s). This is a single source and still unconfirmed. The other branches (Fuxing, Xinyi A11, Nanxi, Tianmu) appear current. A New Taipei branch at 裕隆城 Yulon City (Xindian) opened in Sept 2023 (s).
7. **Our Miacucina page sends readers to the wrong station for Tianmu.** It says "Shilin Branch (Mingde MRT – exit 1)". The map pin for Miacucina Tianmu (德行西路48號, by Tianmu SOGO) is ~200 m from **Zhishan** and ~880 m from Mingde.
8. **TGI Fridays Songgao is still open, but it isn't a salad destination.** Breeze's own store page (s) lists hours of Sun–Wed 11:00–21:30 and Thu–Sat 11:00–22:00. Not one salad publisher names it. Taiwan has about 18 Fridays branches; the Taichung Shizheng branch closed on 1 Jan 2026 (NOWnews, s).
9. **Gonna is now a 9-store brand with a cheaper "EXPRESS" format.** Lion Travel's 欣食旅 runs 6 gonnaEAT, 2 gonnaEXPRESS and 1 gonna+ (udn/ctee, Aug 2025, s). It plans 12 more stores in three years. The page's "three branches" is out of date. EXPRESS salads start around NT$259; gonnaEAT salads are NT$400–495.
10. **Prices have doubled since our reviews.** Hungry Pans' salads were NT$110/140/160 in 2019. Saladay's build-your-own base was NT$118 in 2017. Gonna's salads and grain bowls are now NT$350–536. Miacucina's Buddha bowls are NT$473–495 on Uber Eats.

---

## 2. Sources and counts

### 2a. English publishers (snippet only)

| # | Publisher (author, date) | Salad places named |
|---|---|---|
| E1 | **Eating in Taipei** – eatingintaipei.com/gonnaeat-taipei (≈22 May 2025) (s) | gonnaEAT ("favorite salad in the city"; Avocado & Beef Kale Salad); also has a MiaCucina page (eatingintaipei.com/staging/5148/…) (s) |
| E2 | **Tricky Taipei** – western-food-taipei (25 Jan 2020) (s) | Gonna "near the Renai roundabout for clean salads" |
| E3 | **Tricky Taipei** – best-vegetarian-vegan-taipei (≈Feb 2022) (s) – same publisher as E2, counted once | MissGreen (salads), Flourish (closed), Herbivore (Miacucina team, Shin Kong A4), Yuli Your Home |
| E4 | **a hungry girl's guide to taipei** – hungryintaipei.blogspot.com, "salads" label (undated, looks 2014–2016) (s) | Mia Cucina (big salad menu), Toasteria (Yongkang), Sprout |
| E5 | **My Guide Taipei** – myguidetaipei.com/restaurants/dressed-salad-bar (undated) (s) | Dressed (build-your-own, 70+ ingredients, 24 sauces, Daan + Xinyi). **Status unknown; nothing recent found** |
| E6 | **Taipei Travel Geek** (this site) – not counted | Hungry Pans, Miacucina, Gonna, TGI Fridays |

Excluded: Wanderlog "49 best spots for salad in Taipei" (aggregator; names Yang Shin Vegetarian, Toasteria, The Green Room), Yelp "Salads in Taipei" (aggregator; Saladay, Just Fresh 新鮮樂, Doris Salad), TripAdvisor, spinach.guide (vegan directory; Cha Lounge at Grand Hyatt, Salad Den), FooTinder (Salad Den 4.5 ★, about 900 reviews).

### 2b. Traditional Chinese publishers (snippet only)

| # | Publisher (author, date) | Salad places named |
|---|---|---|
| Z1 | **POP Daily 波波黛莉** – popdaily.com.tw/food/1643436 "台北溫沙拉推薦TOP6" (≈8 May 2026) (s) | PRO健康餐桌 (Zhongzheng), **Salad Den** (Songshan; customisable, high-protein), Borges Place 波赫士領地 (Datong), **gonna共樂遊** (Neihu; 蔓越莓酒醋雞肉溫沙拉), 午葉 Leaves Cafe & Dining (Xinyi), **Woopen木盆** (Songjiang Chang'an) |
| Z2 | **REME 旅覓** – remetw.com/salad-taipei (2023–2025; snippet says "1–3 years") (s) | **Woopen木盆**, **Salad Den** (near Taipei Arena; beetroot, chickpea, kale; warm salads), **杉SHAN** (low-oil low-salt French-style boxes), **gonnaEAT** (Neihu, Ren'ai, Q Square; 穀物能量碗), 旭牧高纖沙拉輕食 (酒泉 and 天水 branches; 9 sauces), Daylight 光合箱子 (Zhongshan, Huashan, Xinyi, Dongmen), **CAMPUS CAFE** (wooden-bowl Caesar) |
| Z3 | **JUKSY 街星** – chill.juksy.com/article/104221 "秋冬必吃 3 家「溫沙拉」專賣店" (≈Aug 2021, dated) (s) | **Doris Salads 多的是沙拉** (Daan; Niçoise; 櫻桃鴨 and 雪花牛 warm salads; 11:00–19:00, closed Sun), 牧牧沙拉 MoooSalad (**closed**, per site's `mooo-salad`), 滷意思 (Daan) |
| Z4 | **ETtoday 旅遊雲** – travel.ettoday.net/article/1047447 "台北「沙拉專賣店」新鮮生菜自己搭配" (≈2017, dated) (s) | **Saladay** (南京東路4段168號 + SOGO Zhongxiao B1; mix and match from NT$118). **2026 status unknown** |
| Z5 | **TVBS 食尚玩家** – supertaste.tvbs.com.tw/hot/316115 "飽食系沙拉" feature (date unknown) (s) | Names not visible in snippet; not counted |
| Z6 | **Ruby的沙龍 (vocus)** – vocus.cc/article/64ec6612… "台北｜輕食沙拉推薦" (28 Aug 2023 from post id) (s) | Names not visible in snippet; not counted |

Single-venue reviews (counted in the "Reviews" column, not as list publishers): 大胃米粒 dm0520.com (杉SHAN), Darren蘋果樹 appletrees.tw (杉SHAN, "南京三民站美食"), ccll9cc.pixnet (Doris Salads, with menu), walkerland 367689 / udn woman 7381310 (莎拉Sa拉, Ximen warm salads; the udn piece is a reprint, so one publisher), jetpeter.pixnet (莎拉Sa拉, "CP值最高健康餐盒", hand rolls about NT$59), taipeixcity.pixnet (Hungry Pans 寧波, "強項應該是木碗沙拉"), rlaidiary.com (Hungry Pans 寧波, 2020), yuzhenblog.com (Hungry Pans 景平, New Taipei, 2024).

Excluded: GOMAJI blog "台北輕食沙拉推薦 9選" (deal platform), ifoodie 愛食記 lists, Uber Eats "台北 10 家最佳沙拉外送", Dcard f/food 238064004 "四間私藏的台北沙拉餐廳" (forum; names 牧牧沙拉 and 光合箱子).

### 2c. Consensus table (salad-specific: 5 EN + 4 ZH counted list publishers)

| Venue | EN lists | ZH lists | Total | Reviews | Most recent | On site? |
|---|---|---|---|---|---|---|
| **Gonna / gonnaEAT 共樂遊** | 2 (E1, E2) | 2 (Z1, Z2) | **4** | many (tenjo, leafyeh ×2, maggieblog, pickyeaterr, upssmile, misshoki…) | May 2026 | Yes (`gonna`) |
| **Woopen 木盆** | 0 | 2 (Z1, Z2) | **2** | hoolee.tw (Kaohsiung branch) | May 2026 | No |
| **Salad Den** | 0 | 2 (Z1, Z2) | **2** | (FooTinder/spinach: aggregators) | May 2026 | No |
| **杉SHAN Balanced Box** | 0 | 1 (Z2) (+ JUKSY/TVBS health-box mention, attribution unclear) | 1–2 | 2 (dm0520, appletrees) | 2023–2025 | No |
| **Miacucina** | 2 (E1 page, E4 dated) | 0 salad-specific | 2 | n/a | 2025 | Yes |
| **Doris Salads 多的是沙拉** | 0 | 1 (Z3, 2021) | 1 | 1 (ccll9cc) | 2021 | No: **status unverified** |
| **Saladay** | 0 | 1 (Z4, 2017) | 1 | – | 2017 | No: **status unverified** |
| **Hungry Pans 夯堡** | 0 | 0 | **0** | 3 (taipeixcity, rlaidiary, yuzhenblog) + Dcard thread | 2024 | Yes |
| CAMPUS CAFE | 0 | 1 (Z2) | 1 | – | | Yes (`campus-cafe`) |
| 旭牧高纖沙拉輕食 / Daylight 光合箱子 / PRO健康餐桌 / 波赫士領地 / 午葉 | 0 | 1 each | 1 | | 2023–2026 | No |
| 莎拉Sa拉 (Ximen) | 0 | 0 | 0 | 2 (walkerland/udn, jetpeter) | 2023–2025 | No |
| MissGreen | 1 (E3) | 0 | 1 | | 2022 | Yes (`miss-green`) |
| Dressed (salad bar) | 1 (E5, undated) | 0 | 1 | | ? | No: **status unknown** |
| **TGI Fridays Songgao** | 0 | 0 | **0** | – | – | Yes |
| 牧牧沙拉 MoooSalad | 0 | 1 (Z3) | 1 | Dcard | 2021 | Yes, marked **closed** |

**Not reached (search budget):** Taiwan News, Taipei Times, Guide to Taipei, Culture Trip, Nick Kembel (salad-specific), beauty321/Marie Claire salad lists, kuolife/vivianexplore salad lists. **The target of 8–12 publishers was not met.**

---

## 3. Status of the venues on the current page

| Venue / branch | Status | Evidence (all snippet) | Date of evidence |
|---|---|---|---|
| Hungry Pans 北醫店 莊敬路379號1樓 | **Probably open, unconfirmed** | Brand IG branch list (undated); Wanderlog place page | undated |
| Hungry Pans 寧波店 寧波西街24號1樓 | **Probably open, unconfirmed** | Brand IG list; ifoodie/Fonfood (08:00–21:00, 02-2356-7220) | 2020–2024 |
| Hungry Pans 公館店 思源街8號1樓 | **Probably open, unconfirmed** | Brand IG list | undated |
| Hungry Pans, Shin Kong Mitsukoshi A4 B1 | **Probably closed** | Missing from brand IG list; nothing else found | – |
| Hungry Pans 景平店 (Zhonghe, New Taipei) | Open 2024 | yuzhenblog.com review | 2024 |
| Miacucina 復興店 復興南路一段107巷11號 | **Open** | Uber Eats store (綠巨人佛陀碗 NT$495); OpenTable profile; renovated 2023 | 2023–2026 |
| Miacucina 信義A11店 (SKM A11 2F) | **Open** | SKM brand page; Uber Eats; OpenTable | 2024–2026 |
| Miacucina 南西店 (SKM Nanxi main bldg 2F, 南京西路12號) | **Open** | Uber Eats; SKM | 2025–2026 |
| Miacucina 天母店 德行西路48號 | **Open** | OpenTable (review dated Jun 2026) | Jun 2026 |
| Miacucina 內湖店 瑞光路601號 | **Reported closed, one source** | jjtheday.com title "2026（已歇業）"; omega.taipei and alinalife describe a renovation (older) | 2026 |
| gonnaEAT 仁愛概念店 仁愛路四段109號 | **Open** | Uber Eats; maggieblog dine-in visit dated 18 Aug 2025 | Aug 2025 |
| gonnaEAT 京站店 承德路一段1號 (Q Square 1F) | **Probably open** | achingfoodie "2026" brand round-up | 2026 |
| gonnaEXPRESS (map pin at SOGO Zhongxiao) | **Open** | Uber Eats "gonnaEXPRESS共樂遊 SOGO百貨忠孝店" | 2025–2026 |
| TGI Fridays 松高 (Breeze Songgao 3F) | **Open** | Breeze store page (hours, 02-2722-7126); OpenTable; Uber Eats | 2026 |

---

## 4. Venues

### 4.1 Gonna / gonnaEAT 共樂遊 (keep: the salad anchor)
- **What it is:** Lion Travel's (雄獅/欣食旅) Mediterranean "whole food" chain. Salads, grain bowls (穀物能量碗), burgers, pasta and brunch.
- **Taipei branches (s):** gonnaEAT **仁愛概念店**, No. 109, Sec. 4, Ren'ai Rd, Da'an (台北市大安區仁愛路四段109號), 02-2772-5755; **京站店**, Q Square 1F, No. 1, Sec. 1, Chengde Rd, Datong (台北市大同區承德路一段1號), 02-2558-7968; **內湖旗艦店**, No. 145, Shitan Rd, Neihu (石潭路145號; no MRT nearby, per leafyeh); **南港店**, No. 186-1, Jingmao 2nd Rd (經貿二路186-1號); gonnaEXPRESS at **SOGO Zhongxiao** and **Dream Plaza** (Xinyi, July 2025). Brand total (Aug 2025): 9 gonna stores, some outside Taipei (Zhubei, Taoyuan).
- **MRT:** Ren'ai: site pin ~380 m from **Zhongxiao Dunhua** (exit not checked). Q Square: ~170 m from **Taipei Main Station** (Q Square connects underground). EXPRESS SOGO: ~90 m from **Zhongxiao Fuxing**.
- **Hours (s, conflicting):** Ren'ai 08:00–21:00 (achingfoodie) or Mon–Wed 08:00–21:30, Thu–Sun to 22:00 (maggieblog). Q Square 10:00–21:00 or 11:00–20:30. **Verify.**
- **Prices:** Uber Eats, Ren'ai (undated, s): 超級食物羽衣甘藍沙拉 Superfood Kale Salad **NT$428**, 蛋白質多多穀物能量碗 **NT$402**. Neihu Uber Eats: 超營養農家沙拉 NT$351, 酪梨雞肉羽衣甘藍沙拉 NT$495, grain bowls NT$402–536. Dine-in (maggieblog, 18 Aug 2025): 墨西哥酪梨雞肉沙拉 **NT$450**. EXPRESS SOGO (Uber Eats): 大豐收烤蔬菜沙拉 NT$259, 野菇酪梨羽衣甘藍沙拉 NT$279.
- **Veg/vegan:** Vegetarian salads on the menu (roast veg, halloumi). Vegan not confirmed.
- **Official link:** not verified (gonnaeat.com does not resolve). Brand FB/IG to find.
- **Dishes publishers single out:** Avocado & Beef Kale Salad (Eating in Taipei); 蔓越莓酒醋雞肉溫沙拉 and 超營養農家沙拉 (POP Daily); 穀物能量碗 for muscle gain (REME); our own Fattoush with grilled halloumi and Chicken Caesar (`gonna`).
- **Site images:** `/media/2019/08/Gonna-1-860x1024.jpg`, `/media/2019/08/Gonna-2-1-1024x738.jpg`, `/media/2019/08/Gonna-2-1024x768.jpg`, `/media/2019/08/Gonna-3-1024x768.jpg` (current hero of both list pages), `/media/2019/11/Gonna-3-817x1024.jpg`, `/media/2019/11/Gonna-4-1024x688.jpg`, `/media/2019/11/Gonna-16-1024x743.jpg`, `/media/2019/11/Gonna-17-887x1024.jpg`, `/media/2019/11/Gonna-18-1024x750.jpg`, `/media/2019/11/Gonna-19-1024x723.jpg` (venue-page featured), `/media/2019/11/Gonna-20-1024x733.jpg`, `/media/2019/11/Gonna-21-1024x724.jpg`.
- **Fix on `gonna`:** "three city branches" is out of date. The map embed shows a single pin.

### 4.2 Hungry Pans 夯堡 (keep as the budget pick, but verify first)
- **What it is:** Subs, pizza, panini and wooden-bowl salads (木碗沙拉), assembled from a counter of 25+ ingredients. Average spend about NT$150 (aggregator, s).
- **Branches (brand IG, undated, s):** **北醫店**, 1F, No. 379, Zhuangjing Rd, Xinyi (台北市信義區莊敬路379號1樓); **寧波店**, 1F, No. 24, Ningbo W St, Zhongzheng (台北市中正區寧波西街24號1樓), 02-2356-7220, 08:00–21:00 (ifoodie/Fonfood); **公館店**, 1F, No. 8, Siyuan St, Zhongzheng (台北市中正區思源街8號1樓); 景平店, Zhonghe, New Taipei. **3 Taipei City branches.** The Shin Kong A4 branch on our page looks closed.
- **MRT:** 寧波: ~180 m from **Chiang Kai-shek Memorial Hall** (taipeixcity calls it "中正紀念堂站美食"). 北醫: ~610 m from **Taipei 101/World Trade Center** (the site's "exit 3" is plausible; check). 公館: ~250 m from **Gongguan**.
- **Prices:** No current menu found. Last known: NT$110 / 140 / 160 for three salad tiers, dressing included (our review, 2019). **Needs a 2026 price.**
- **Veg:** garden salads; no vegan statement found.
- **Official link:** Instagram `@hungrypans.tw` and Facebook page (both found in search; neither could be opened).
- **Publishers:** none in list articles. Reviews: "強項應該是木碗沙拉，便宜份量又超大" (taipeixcity), "口味多元的潛艇堡、健康美味又份量十足的沙拉" (RLai Diary, 2020).
- **Site images:** `/media/2019/10/Hungry-Pans-1-1-1024x734.jpg`, `-2-1-1024x700`, `-3-1-1024x722`, `-4-1-1024x768`, `-5-1-854x1024`, `-6-1-1024x697`, `-7-1-1024x749` (current list image and featured), `-8-1-1024x709`, `-8-1.jpg`, `-10-1-1024x744`, `-11-1-879x1024`, `-12-1-1024x808` (used on `taipei-guide`), `-13-1-1024x688`, `-14-1024x729`, `-15-1024x726` (all `/media/2019/10/Hungry-Pans-…`).
- **Fixes on `hungry-pans`:** remove or confirm the A4 branch; add 寧波 and 公館; the map pin for "Branch 2" is 北醫, not a Taipei 101 mall branch.

### 4.3 Woopen 木盆 (add: verify)
- **What it is:** A warm-salad chain served in wooden bowls. Branches in Taipei, Hsinchu, Tainan, Kaohsiung and Pingtung (s).
- **Taipei branches seen (s):** Neihu, No. 621, Sec. 1, Neihu Rd (內湖區內湖路一段621號); "松江長安門市" (Songjiang/Chang'an, Zhongshan). Full Taipei count not found.
- **MRT, hours, price:** **not found.** Songjiang Chang'an points to Songjiang Nanjing station; check.
- **Dishes:** 北海道鹽烤鮭魚沙拉 Hokkaido salt-grilled salmon salad (search summary); roast chicken warm salad (POP Daily); "big portions, lots of meat, five dips" (REME).
- **Site images:** none.

### 4.4 Salad Den (add: verify; likely the vegetarian salad pick)
- **What it is:** A customisable salad shop in Songshan on Nanjing E Rd near Taipei Arena (POP Daily, REME). Beetroot, chickpea and kale; warm salads available.
- **Veg:** a reviewer says there are "no meat options" (FooTinder, aggregator). REME calls it "適合蔬食者". **Possibly all-vegetarian; confirm.**
- **Address, MRT, hours, price, official link:** **not found** (Taipei Arena or Nanjing Fuxing likely; check).
- **Dish:** "the salad with 4 choices", hard to finish (FooTinder reviewer).
- **Site images:** none.

### 4.5 杉SHAN Balanced Box 杉沙拉健康盒 (add: verify)
- **What it is:** Started in Taichung (nicknamed "沙拉界的愛馬仕"). Low-oil, low-salt French-style salad boxes: 10+ mains, 20+ sides, 9 sauces. Small-farm produce; a vegetarian series is offered.
- **Address (s):** 1F, No. 11-1, Lane 250, Sec. 5, Nanjing E Rd, Songshan (台北市松山區南京東路五段250巷11號之1). appletrees titles it "南京三民站美食" → **Nanjing Sanmin** (exit and walk not checked).
- **Hours, price, official link:** not found.
- **Site images:** none.

### 4.6 Doris Salads 多的是沙拉 (add only if confirmed open)
- **What it is:** A tiny salad-only shop run by a couple, in a lane off Andong St, Da'an (ccll9cc). Known for Niçoise and for warm salads with cherry duck (櫻桃鴨) and snow-flake beef (雪花牛) (JUKSY 2021).
- **MRT:** near Zhongxiao Fuxing (search summary, s). **Hours (2021):** 11:00–19:00, closed Sunday.
- **Status:** only 2021-era coverage seen. **Unconfirmed.**
- **Site images:** none.

### 4.7 Miacucina (move to the healthy list)
- Salad coverage is old (hungry girl's guide, ≈2015). Recent coverage is about Buddha bowls and vegetarian Italian. Full details are in the healthy file, §4.3. **Drop from this page** to cut overlap; Miacucina is already on `best-vegetarian-restaurants-in-taipei` too.
- **Site images used on this page:** `/media/2019/06/Miacucina-12-1024x675.jpg`.

### 4.8 TGI Fridays Songgao (drop)
- **Status:** open. Breeze Songgao 3F (微風松高). Sun–Wed 11:00–21:30, Thu–Sat 11:00–22:00, 02-2722-7126 (Breeze store page, s). 135 seats; opened July 2019 as Taiwan's first "90s retro" Fridays (LINE Today/Marie Claire, s). Site pin ~370 m from **City Hall**.
- **Why drop:** no salad publisher names it, and the copy ("Cajun fried chicken salad… more indulgent") works against the page's intent. Taiwan's Fridays are run by 開展餐飲 (about 18 branches, late 2025).
- **Site images used on this page:** `/media/2019/05/TGI-Fridays-2-1024x644.jpg`. Venue page also has `/media/2019/10/TGI-Fridays-Songgao-1024x725.jpg`.

### 4.9 Also considered
- **Saladay** (Songshan, Nanjing E Rd Sec 4 No. 168 + SOGO Zhongxiao B1, ETtoday 2017; Yelp lists it). The best "build your own" fit, but there is **no recent evidence it still trades**. Check first.
- **CAMPUS CAFE** (wooden-bowl Caesar, REME). The site has `campus-cafe`, but it is an American diner, not a salad place. Optional "also" line at most. **Toasteria** (hungry girl's guide) is not a fit: the site's own `toasteria` page lists "Salads are nothing special" as a con.
- **MissGreen** (vegan salads; Tricky Taipei). The site has `miss-green`. It is already on `best-vegetarian-restaurants-in-taipei`. Optional "also" line, if confirmed open.
- **Dressed** (build-your-own salad bar, My Guide Taipei). Status unknown; nothing recent found.
- **莎拉Sa拉** (Ximen, cheap warm salads and hand rolls, in ifoodie's 2025 list). Single-venue reviews only.
- **Daylight 光合箱子 / 旭牧 / PRO健康餐桌**: one list each; mostly lunch-box (餐盒) shops.
- **Poke (Haloa, Yu Poke, Fancy Poké, PokéPoké, Poke.Go 波奇走走):** belongs on `quick-and-healthy-meals`. Cross-link only. Status of `haloa-poke` / `yu-poke` was **not checked** (search budget). A Dcard post comparing HALOA POKE (NT$230 bowl) and POKE.GO (NT$213) suggests Haloa is still trading (s, date unknown).

---

## 5. Site pages to cross-link

| Page | Why | Status note |
|---|---|---|
| `quick-and-healthy-meals` | poke and lunch boxes (Haloa Poke, Yu Poke, Miss Energy) | Its three venues were not re-checked this time. `haloa-poke` and `miss-energy` were last modified 2020/2019 |
| `yu-poke`, `haloa-poke` | "prefer poke? see…" | Status unverified |
| `healthy-restaurants-that-taste-great` | grain bowls, Buddha bowls, brunch | Companion refresh |
| `best-vegetarian-restaurants-in-taipei` | Miss Green, Plants, Miacucina, BaganHood | Miacucina Neihu copy needs fixing there too |
| `miss-green`, `campus-cafe`, `toasteria` | optional "also" lines | Not re-checked |
| `mooo-salad`, `herban-kitchen-bar`, `aone-eatery`, `amavie` | already marked closed; don't link from the list | – |

The page is linked from only one place (`acme-breakfast-club`). Consider a link from `taipei-food-guide` / `taipei-guide`.

---

## 6. Must check before publishing (could not be done this session)

1. Google Maps status, hours and walking time from the nearest exit for: Hungry Pans ×3, Woopen (Taipei branches), Salad Den, 杉SHAN, Doris Salads, Saladay, gonnaEAT Ren'ai and Q Square.
2. Open the official IG/FB for Hungry Pans (`@hungrypans.tw`) and check the date of the latest post and the branch list. Same for Woopen, Salad Den, 杉SHAN and Doris.
3. A dine-in menu price for one salad at each recommended venue (2026).
4. Confirm Miacucina Neihu is closed (jjtheday title only).
5. Re-run consensus with pages opened: POP Daily 1643436, REME salad-taipei, JUKSY 104221, TVBS 316115, vocus Ruby, Eating in Taipei, plus English searches not reached (Taiwan News, Guide to Taipei, Nick Kembel).

---

## 7. Recommended line-up

Order is a mix of how often publishers name each place and how well it suits a visitor. All entries depend on the §6 checks.

1. **Gonna / gonnaEAT**: **KEEP, #1.** Most-named salad place (4); the Q Square branch is the easy one for visitors. Remove it from the healthy page.
2. **Woopen 木盆**: **ADD.** Warm-salad chain named by POP Daily (2026) and REME; bowls with plenty of meat.
3. **Salad Den**: **ADD.** Build-your-own, probably all-vegetarian, named by POP Daily (2026) and REME.
4. **杉SHAN Balanced Box**: **ADD.** Big build-a-box choice near Nanjing Sanmin; REME plus two dedicated reviews.
5. **Hungry Pans 夯堡**: **KEEP (budget pick), if a branch is confirmed open.** Wooden-bowl salads for well under NT$200 at the 寧波 (CKS Memorial Hall) branch. Fix the branches.
6. **Doris Salads 多的是沙拉**: **ADD if open.** A salad-only shop with Niçoise and warm duck/beef salads.
7. *(optional)* **Saladay**: **ADD only if open.** The classic build-your-own counter (2017 coverage only).
8. **Miacucina**: **MOVE** to the healthy page (Buddha bowls). It is already on the vegetarian page.
9. **TGI Fridays Songgao**: **DROP.** Open, but no one recommends it for salads.
10. Cross-link box: poke → `quick-and-healthy-meals` / `yu-poke` / `haloa-poke`; vegan salads → `best-vegetarian-restaurants-in-taipei` / `miss-green`.
