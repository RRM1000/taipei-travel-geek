# Research: Best Indian Restaurants in Taipei

Checked 18 October 2026. This file is research, not article copy. Existing slug: `best-indian-restaurants` ("Best Indian Restaurants in Taipei: 6 Worth Trying", about 400 words, around 4,000 Search Console impressions a month at position ~9.6, almost no clicks). The site has its own pages for two of the six: `oye-punjabi` and `saffron-fine-indian-cuisine`. The other four (Balle Balle, Mayur, Moksha, Nataraj) get Google Maps search links only.

**Scope used**
- Indian (plus one Nepali/Himalayan-adjacent check) restaurants in Taipei City. New Taipei places that publishers name (Masala in Banqiao, Burans in Yonghe) are noted but left out.
- Closed restaurants that already have site pages (`joseph-bistro`, `flavor-of-india`, both titled "(Permanently Closed)") were checked because the list page still leans on them (see §1.3).

**How this was checked (read this first: weaker than the hostels file)**
- **WebFetch did not work in this session.** Every fetch failed with `getaddrinfo ENOTFOUND`, including guide.michelin.com, en.wikipedia.org, margaret.tw and pbear.tw. `curl` through the agent proxy got `403 connect_rejected` for guide.michelin.com, google.com, taiwannews.com.tw, pbear.tw and margaret.tw. So **no page was opened directly**, and **Google Maps could not be queried**, for status, walking times or anything else.
- Everything below comes from **WebSearch result snippets and the search tool's summaries of them**, so **every source counts as snippet-only "(s)"** under the house rule. Where a summary named a source's list only in part, the count uses only the names that were actually visible.
- **The session hit its shared WebSearch limit** (200 calls per turn across agents) before Moksha's current status and Saffron 46 could be checked. Those are marked **unconfirmed**. A follow-up session with working WebFetch, or a manual check, should close the gaps in §8 before anything is published.
- **Excluded from counts:** aggregators and booking/deal sites (Tripadvisor, Yelp, Wanderlog, ifoodie 愛食記, OpenRice, OpenTable, GOMAJI blog, FunNow blog, Uber Eats, foodpanda, autoreserve, top-rated.online, footinder, fonfood, enprimeurclub, joinpearl); restaurant-owned content (**indianfoodtaiwan.com is Mayur Indian Kitchen's own site**, mik3taiwan.com, ammakitchentaipei.com); directories (India Taipei Association india.org.tw, HappyCow, myguidetaipei); forums (Forumosa, PTT); **miadaily.tw** (generic text naming restaurants that can't be found anywhere else, so it looks machine-written). **Taiwan News**: the only Indian-restaurant content found is a Holi festival sponsor list (Thali, Flavour of India, Spice Shop, Moksha, Amma's; Mayur as host). That is not a recommendation, so it isn't counted.
- **Syndication:** ETtoday (8 May 2022), LTN 玩咖Playing and findlife.com.tw / uniopen (25 Apr 2022) carry the same "雙北6間" list with identical names and order, so they **count as one publisher** (Z8). Out of India and 3 Idiots share an owner (Taipei Expats, (s)); publishers that name both count once for each restaurant, which is normal, but the owner link is noted.
- **Single-restaurant blog posts** (pixnet, vocus, udn blogs, WalkerLand articles) were used for facts (prices, moves, hours) but **not counted** toward consensus; only guide-style lists, plus Taipei Times reviews and the Michelin Guide, were counted.
- **Dating:** vocus.cc article IDs start with a hex Unix timestamp. That dates `69df1777…` to Apr 2026, `69420b39…` to Dec 2025, `671a001c…` to Oct 2024 and `65794404…` to Dec 2023. Search "N days ago" figures were converted to approximate months.

---

## 1. Summary: what surprised us

1. **Saffron's Michelin claim checks out, but the sentence around it is wrong.** Michelin's own Saffron page (snippet) calls it "a Bib Gourmand: good quality, good value cooking restaurant in the **2026 MICHELIN Guide Taiwan**", and Michelin's "Taipei Indian MICHELIN Restaurants" filter page shows **only Saffron**. So **Saffron Fine Indian Cuisine (番紅花印度美饌) is the only Indian restaurant in Taipei in the 2026 guide: Bib Gourmand, no stars, no Selected (plate) listings.** It has been a Bib since the first Taipei guide in 2018 (Bella 2020 says "2018, 2019"; one blog headline says "六連霸", six in a row) (s).
2. **Taj (泰姬印度餐廳) lost its Bib Gourmand in 2025.** It was a Bib from 2020 to 2024 and appears on the August 2025 list of nine Taipei drop-outs (WalkerLand / NOWnews 12 Aug 2025, (s); pbear.tw "2020入選、2025移除", (s)). Many 2025–2026 blogs and supertaste (May 2026) still call it "必比登", so publishers will keep repeating that.
3. **The list page's Michelin wording comes from a closed restaurant.** "*Another* Indian restaurant that has earned a place in the Michelin Guide" made sense when Joseph Bistro (once a two-year Bib, per 鄉民食堂) sat above it. Joseph Bistro is now titled "(Permanently Closed)" on our own site, and **the list page's `featuredImage` is still `/media/2019/05/Joseph-Bistro-5-1024x679.png`**.
4. **Nataraj has moved, and the page links to the old address.** Nataraj Indian Cuisine (納達吉印度料理) left 75 Nanjing E Rd Sec 5 (Songshan) when its lease ran out. It is now at **1F, No. 127, Sec 1, Keelung Rd, Xinyi (台北市信義區基隆路一段127號1樓)**, about 6 min from **Taipei City Hall MRT Exit 1**. The company registry address changed in **July 2024**, and a blogger says it reopened in early September (s). Our Google Maps link still searches "75 Section 5 Nanjing East Road, Songshan", and the copy still says "in Songshan".
5. **Moksha's Shilin story is out of date and its status is unconfirmed.** The original Tianmu shop (138 Zhongshan N Rd Sec 6, opposite SOGO) is marked **已歇業 (closed)** on ifoodie and in a jeremyfoodie post title, and it **stopped trading on Uber Eats on 25 Mar 2025** (s). A Zhishan address (70 Dexing W Rd, Zhishan Exit 2, 3 min) appears in one ~May 2025 blog. "Moksha 67" in Da'an (67 Dongfeng St) has reviews only up to 2024. **No 2025–2026 evidence was found that either surviving branch is open.** Don't keep Moksha until someone checks it.
6. **No dated, independent list since 2023 includes Nataraj.** The page calls it "the highest-rated of the bunch on local review sites", and that rests on a 4.8 Tripadvisor score from a small number of reviews. It appears only in single-restaurant blog posts and aggregators.
7. **Out of India (印渡風情, Shida) has as much support as the page's own picks** (7 publishers: 3 EN, 4 ZH), and it isn't on the page. Its owner also runs the pure-vegetarian **3 Idiots Toast & Curry (三個傻瓜印度蔬食)**, which has 4 publishers and is the clearest vegan pick now that Flavour of India is closed.
8. **Mayur Indian Kitchen is still growing.** A Jan 2026 article (s) gives 13 branches across Taiwan. The vegetarian/vegan branch on Jinan Road (MIK-3) is confirmed operating in an **Apr 2026** vocus review near Zhongxiao Xinsheng (s). The Dazhi branch (MIK-5) has a Yelp listing updated **May 2026**. The page's description ("dedicated vegetarian/vegan location on Jinan Road") is still right.
9. **Balle Balle is still trading.** It has a Jan 2026 Google review quoted on Wanderlog, a Yelp listing updated Aug 2026, and supertaste included it in May 2026. Owner Gurvind Singh Kant ("GV") (India Taipei Association, (s)). But **the page's "meal for two typically runs NT$600–800" looks low.** Blogs put spend at **NT$500–600 per person**, butter chicken at NT$380 dine-in / NT$430 delivery, and its delivery "set for 2" at NT$1,600.
10. **Oye Punjabi now has two shops on Yanji Street.** The original is at 121 Yanji St, and 二店 (the second shop) is at 18, Lane 137, Yanji St, both in Da'an. The `oye-punjabi` post gives "Zhongxiao Dunhua (exit 2)", but several blogs place it nearer **Sun Yat-sen Memorial Hall (Exit 1, ~5 min)**. Check in Google Maps.
11. **South Indian is the gap.** Tricky Taipei's Indian respondents (2020) and Lao Ren Cha both say most places are North Indian. The South Indian names are **Amma's Kitchen (清奈媽媽印度廚房, Chennai home cooking; dosa, podi idli, pongal by request)**, which has moved to 2, Lane 357, Heping E Rd Sec 2, plus Mayur's dosa, Nataraj's mixed menu and **Yogi Dosa (南港, vegetarian, South Indian)**. Each has 0–1 independent list mentions.
12. **There are no current English roundups by a named author.** No Taiwan News, Nick Kembel/Taiwan Obsessed or Taipei Times list of Indian restaurants was found. The English evidence is older blogs (Tricky Taipei 2020, Lao Ren Cha, hungryintaipei, Eating in Taipei, Taipei Expats) plus one Taipei Times review (Three Wishes, Nov 2024). That matches the page's weak position: the SERP is mostly Tripadvisor/Yelp/Wanderlog lists, and our page is the only authored English list that ranks.

---

## 2. Sources and counts

### 2a. English publishers (8, all "(s)")

| # | Publisher (author, date) | Restaurants named |
|---|---|---|
| E1 | **Taipei Times** restaurant reviews (Hollie Younger, Three Wishes, 7 Nov 2024; Balle Balle, 13 Mar 2014; Tandoor, 6 Apr 2007) (s) | Three Wishes 神燈搓一下 ("possibly the city's best Indian curry"; Indian/Middle-Eastern/Mexican mix), Balle Balle (2014, dated), Tandoor 坦都 (2007, dated) |
| E2 | **Tricky Taipei**, "Where Indians Eat Indian Food in Taipei" (28 Aug 2020, dated) (s) | Masala Art, Ali Baba's Indian Kitchen, Mayur (MIK-8), Balle Balle, Oye Punjabi, Moksha, Out of India (Shida), Tibet Kitchen |
| E3 | **Lao Ren Cha 老人茶** blog page "Indian Food in Taipei" (ranking updated Jun 2015; notes to 2023) (s) | Mayur ("the best"), Balle Balle (Punjabi classics: lamb rara, butter chicken), Ali Baba, Moksha (South Indian menu, "crispy paper-thin dosas"), Amma's (South Indian tiffin; moved), Out of India (qualified: "fake garlic-butter" naan), 3 Idiots (qualified) |
| E4 | **Eating in Taipei** (eatingintaipei.com; posts ~Jul 2024–Sep 2025) (s) | Namaste Taiwan (Shida Night Market; mutton curry, aloo mutter), 3 Idiots Toast & Curry (samosas, lassi). MIK-2 scored a mixed 6/10 (main NT$325), so it's **not counted** as a recommendation. Burans (Yonghe, New Taipei) out of scope |
| E5 | **Taipei Expats** (taipeiexpats.com; Out of India ~Jul 2025; 3 Idiots post) (s) | Out of India ("one of the most popular suggestions from the Indian members"), 3 Idiots Toast & Curry ("one of the most authentic Indian restaurants we've ever been to"). Same owner |
| E6 | **a hungry girl's guide to taipei** (hungryintaipei.blogspot; 2012, 2014, 2018 – dated) (s) | Mayur ("I still strongly recommend", 2018), Balle Balle (2014) |
| E7 | **Vegan Taiwan** blog, "Indian Vegetarian Restaurants in Taipei" (undated) (s) | Flavour of India ("far and away" the best; **now closed**, our own `flavor-of-india` page agrees) |
| E8 | **MICHELIN Guide Taiwan 2026** (official; snippet only, site blocked) (s) | Saffron Fine Indian Cuisine (Bib Gourmand). No other Indian restaurant in Taipei |

Not counted: Tripadvisor ("10 best", MIK-1 4.7 from ~1,419 reviews; Balle Balle 4.6; Nataraj 4.8 from few reviews), Yelp (Aug 2026 list topped by Balle Balle), Wanderlog ("47 best"), Forumosa thread, CNN insider guide (Kembel; only mentions Carnegie's pub), indianfoodtaiwan.com (Mayur's own "best Indian restaurants" posts), Taiwan News Holi articles.

### 2b. Traditional Chinese publishers (8, all "(s)")

| # | Publisher (author, date) | Restaurants named |
|---|---|---|
| Z1 | **食尚玩家 supertaste** pack/358705 "台北印度料理推薦！10間" (~late May 2026) | 番紅花 Saffron, TAJ 泰姬, 三個傻瓜 3 Idiots, 馬友友 Mayur, 巴雷巴雷 Balle Balle, 哦耶！旁遮普 Oye Punjabi, 維傑 Veer Jee's, 吉阿亞努 (not identified), 莫夏 Moksha, 阿巴得 Abad. Groups "2 Bib Gourmand picks" (Saffron + Taj, so it's out of date on Taj) |
| Z2 | **熱血台中 taiwan17go.com/tpindiancuisine** "13間" (undated; partial) | Saffron 46 (Breeze Nan Shan 46F), 印渡風情 Out of India 師大, 維傑 Veer Jee's, 哦耶！旁遮普 Oye Punjabi (+ others not visible) |
| Z3 | **WalkerLand 窩客島** subject/332596 "17間「台北印度料理」" (undated; partial; covers 雙北, Taipei plus New Taipei) | 番紅花 Saffron, 奪愛 Dazzle (仁愛路三段84號, since 1990), 印渡風情 Out of India (+ others not visible) |
| Z4 | **鄉民食堂 goodeat.tw** "台北最好吃的印度料理懶人包" (8; ~2021–22, dated: includes Joseph Bistro) | Joseph Bistro 想想廚房 (closed), 巴雷巴雷 Balle Balle, 印渡風情 Out of India, TAJ, 馬友友 Mayur, 番紅花 Saffron, 奪愛 Dazzle, 阿里巴巴的廚房 Ali Baba's |
| Z5 | **三八旅客 sambaltraveller** "2023精選7家" (2023; partial) | 馬友友 Mayur (#1), 番紅花 Saffron, TAJ (+4 not visible) |
| Z6 | **Bella儂儂** article 27142 "台北「印度料理」吃這5間" (Dec 2020, dated; partial) | 番紅花 Saffron (saffron curry, phirni), TAJ; mentions Saffron 46 as the same owner's sky-view branch |
| Z7 | **造咖 cava.tw** 249058 "台北4家印度料理" (~2023) | Saffron 46 (saffron tandoori chicken, mutton biryani, pani puri), TAJ (halal), 巴雷巴雷 Balle Balle, 夏花餐室 (not clearly Indian) |
| Z8 | **"雙北6間" syndicated list**: findlife.com.tw/uniopen (25 Apr 2022), ETtoday (8 May 2022), LTN 玩咖Playing 19742 (one publisher) | 番紅花 Saffron, TAJ, 馬友友 Mayur (Dazhi; 13 naan types, lamb chops), 瑪莎拉 Masala (Banqiao, New Taipei), 印渡風情 Out of India 師大 (set for two, tandoori chicken), 三個傻瓜 3 Idiots 南京店 |

Not counted: GOMAJI blog (deal site), FunNow blog (booking), ifoodie lists (aggregator), miadaily.tw, Doddle Meal (repeats Z8), single-restaurant posts (gurunews Balle Balle and Calcutta 加爾各答 in Ximending's Wannian Building, mymarcy Family Indian 亞瑟蘭 in Tianmu, WalkerLand/vocus/udn Nataraj, lordcat Taj/Veer Jee's/3 Idiots, Yuki's Taj/Balle Balle/Mayur, maggieblog Ali Baba's buffet).

### 2c. Consensus table (16 publishers: 8 EN + 8 ZH; all snippet-level)

| Restaurant | EN | ZH | Total | Recency | On page now? |
|---|---|---|---|---|---|
| **Saffron Fine Indian Cuisine** 番紅花印度美饌 (Tianmu) | 1 (E8 Michelin) | 6 (Z1, Z3, Z4, Z5, Z6, Z8) | **7** | 2026 (Michelin, supertaste) | Yes (keeper) |
| **Balle Balle** 巴雷巴雷印度餐廳 | 4 (E1, E2, E3, E6) | 3 (Z1, Z4, Z7) | **7** | 2026 (supertaste) | Yes (brief) |
| **Mayur Indian Kitchen** 馬友友印度廚房 | 3 (E2, E3, E6) | 4 (Z1, Z4, Z5, Z8) | **7** | 2026 (supertaste) | Yes (brief) |
| **Out of India** 印渡風情 (Shida) | 3 (E2, E3*, E5) | 4 (Z2, Z3, Z4, Z8) | **7** | ~Jul 2025 (Taipei Expats) | **No** |
| **TAJ** 泰姬印度餐廳 | 0 | 6 (Z1, Z4, Z5, Z6, Z7, Z8) | **6** | 2026 (supertaste) | **No** |
| **3 Idiots Toast & Curry** 三個傻瓜印度蔬食 (vegetarian) | 2 (E4, E5) (+E3 qualified) | 2 (Z1, Z8) | **4** | 2025–2026 | **No** |
| **Oye Punjabi** 哦耶！旁遮普 | 1 (E2) | 2 (Z1, Z2) | **3** | 2026 (supertaste) | Yes (keeper) |
| **Moksha** 莫夏印度餐廳 | 2 (E2, E3) | 1 (Z1) | **3** | 2026 (supertaste) but **status unconfirmed** | Yes (brief) |
| Ali Baba's Indian Kitchen 阿里巴巴的廚房 | 2 (E2, E3) | 1 (Z4) | 3 | 2020–22 | No (not checked further) |
| Veer Jee's 維傑印度餐廳 | 0 | 2 (Z1, Z2) | 2 | 2026 | No (optional) |
| Saffron 46 番紅花46 (Breeze Nan Shan 46F) | 0 | 2 (Z2, Z7) | 2 | ~2023 | No: **status not checked** |
| Dazzle 奪愛印度料理 (since 1990) | 0 | 2 (Z3, Z4) | 2 | dated | No |
| Masala / Masala Art (Banqiao) | 1 (E2) | 1 (Z8) | 2 | dated | No (New Taipei) |
| **Nataraj** 納達吉印度料理 | 0 | 0 | **0** | single-venue posts Oct 2024 | Yes (brief): **moved** |
| Amma's Kitchen 清奈媽媽印度廚房 (South Indian) | 1 (E3) | 0 | 1 | 2023 | No (South Indian option) |
| Three Wishes 神燈搓一下 | 1 (E1, Nov 2024) | 0 | 1 | 2024 | No (fusion, not purely Indian) |
| Namaste Taiwan (Shida NM) | 1 (E4) | 0 | 1 | 2024–25 | No |
| Abad 阿巴得 / 吉阿亞努 / Tandoor 坦都 | 0–1 | 1 | 1 | | No |
| Joseph Bistro / Flavour of India | – | 1 / 1 | | | **Closed** (site pages say so) |

\* E3 is lukewarm on Out of India's naan.

---

## 3. Michelin status (2026 MICHELIN Guide Taiwan, Taipei)

guide.michelin.com was **blocked from this session**, so this section rests on search snippets of Michelin's own pages plus press coverage. It needs one direct look at `https://guide.michelin.com/tw/en/taipei-region/taipei/restaurants/indian` before publishing.

- **Saffron Fine Indian Cuisine (番紅花印度美饌): Bib Gourmand, 2026.** Michelin restaurant page snippet: "Saffron Fine Indian Cuisine – a Bib Gourmand: good quality, good value cooking restaurant in the 2026 MICHELIN Guide Taiwan." Michelin's Taipei "Indian" filter shows it as the only entry, price "moderate". Michelin's own text singles out **murgh Nawabi** (chicken curry) and **gosht Lahori** (mutton curry), "with meats charred in the tandoor". The 2026 Bib list was announced **14 Jul 2026**: 146 Bibs across Taiwan, 37 in Taipei (storm.mg / udn, (s)).
- **No Indian restaurant in Taipei has a star or a "Selected" listing** in 2026 (Indian filter snippet shows Saffron only) (s).
- **TAJ 泰姬印度餐廳: not listed.** Bib Gourmand 2020–2024 (2020 new-entry list: "TAJ 泰姬印度餐廳, 台北市大安區市民大道四段48巷1號"). **Removed in the 2025 guide** (12 Aug 2025): it is one of the nine Taipei drop-outs WalkerLand/NOWnews name alongside 都一處, 麵鋪, 昶鴻麵點 and others (s). One promotional site (enprimeurclub) claims Bib "2024 and 2025", which conflicts with the drop-out list. Treat **2020–2024** as the record.
- **Joseph Bistro 想想廚房**: a former Bib (two years, per 鄉民食堂). **Closed** (our `joseph-bistro` page).
- **Saffron 46**: cava.tw (~2023) says "連續三年獲得米其林肯定" (Michelin recognition three years running), probably a Selected/plate listing in an earlier guide. It doesn't show on the 2026 Indian filter (s), so **don't call it Michelin**.
- For the page, say: "Saffron Fine Indian Cuisine is the only Indian restaurant in Taipei in the 2026 MICHELIN Guide (Bib Gourmand)." Drop "Another…" (see §1.3). Taj can be called "a Bib Gourmand from 2020 to 2024".

---

## 4. Restaurants: keepers and recommended additions

Format: status → address → MRT → hours → prices → cuisine → diet → booking → link → most-praised dishes → site images. "(s)" applies throughout. MRT exits and walking minutes come from blogs; **none were checked in Google Maps** (blocked).

### 4.1 Saffron Fine Indian Cuisine 番紅花印度美饌 (keeper)
- **Status:** Open. It is in the 2026 Michelin Guide (Bib Gourmand), and a blog from ~Jul 2026 (icecreamcat.tw) gives current hours. Yelp listing updated Dec 2025.
- **Address:** No. 38-6, Tianmu E Rd, Shilin District / 台北市士林區天母東路38之6號 (in the lane beside the Shin Kong Mitsukoshi Tianmu building, per one blog). Tel 02-2871-4842.
- **MRT:** Our post says "Mingde (red line)" and calls it "a fair way from any MRT station". Mingde and Zhishan are both roughly 1.5–2 km away. **Walking time not verified.** Bus or taxi from Zhishan is realistic; check in GM.
- **Hours:** Bella (Dec 2020): Tue–Sun 11:30–14:00 and 17:30–21:30, **Monday dinner only**. The ~Jul 2026 blog agrees on Monday dinner only, with lunch Sun–Fri and longer Saturday/holiday hours. Yelp shows lunch and dinner daily (conflict; Monday-dinner-only is the better-supported pattern).
- **Prices:** mango lassi NT$210 (~Jul 2026 blog). Plain naan NT$120 and saffron paratha NT$160 are from older posts. 10% service charge (older review). Michelin price band "moderate". **No 2026 curry price found.**
- **Cuisine:** North Indian (Mughlai/Punjabi-leaning; "lahori", "nawabi").
- **Diet:** Vegetarian dishes available (icecreamcat title "素食可", vegetarian OK). Halal: not claimed.
- **Booking:** OpenTable (profile 186764; rated 4.5). Booking recommended.
- **Official link:** none found. OpenTable is the usable booking link. Michelin page: `guide.michelin.com/tw/en/taipei-region/taipei/restaurant/saffron` (not opened).
- **Most-praised dishes:** saffron curry 紅番花咖哩 (Z6, Z8), murgh Nawabi and gosht Lahori (Michelin), phirni 費爾尼布丁 (Z6, Z8), samosa (WalkerLand). Our post: naan.
- **Same owner:** Saffron 46 (Breeze Nan Shan 46F, Xinyi; Forumosa and Bella say so) (s).
- **Site images:** `/media/2019/05/Saffron-Fine-Indian-Cuisine-1-e1556873289918-768x1024.jpg`, `/media/2019/05/Saffron-Fine-Indian-Cuisine-2-1024x768.jpg`, `/media/2019/05/Saffron-Fine-Indian-Cuisine-3-1024x768.jpg`, `/media/2019/05/Saffron-Fine-Indian-Cuisine-4-1024x768.jpg` (also the post's featuredImage and the list image).

### 4.2 Oye Punjabi 哦耶！旁遮普印度餐廳 (keeper)
- **Status:** Open. Facebook page facebook.com/oyepunjabitaipei. Listings on OpenRice, Wanderlog and Uber Eats. supertaste and taiwan17go list it (2026). Blog reviews from 2024–2025. **No 2026-dated review found.**
- **Address:** Original: 1F, No. 121, Yanji St, Da'an / 台北市大安區延吉街121號1樓, tel 02-2775-2065. **Second shop (二店):** No. 18, Lane 137, Yanji St / 延吉街137巷18號 (WalkerLand article; OpenRice lists it in Songshan by mistake).
- **MRT:** Blogs: **Sun Yat-sen Memorial Hall Exit 1, ~5 min**. Our `oye-punjabi` post: Zhongxiao Dunhua Exit 2. **Check in GM and pick one.**
- **Hours:** 11:30–14:30 and 17:30–21:30, **closed Monday** (original; OpenRice/Wanderlog/Uber Eats). The 2nd shop is listed as open daily with the same windows (OpenRice).
- **Prices:** Our Nov 2019 visit: mains NT$310–380, two samosas NT$180. **No 2026 menu found.**
- **Cuisine:** Punjabi / North Indian; Indian owners and chefs.
- **Diet:** Vegetarian curries (spinach-potato, dal). Halal not claimed. Pet-friendly (WalkerLand headline: 寵物友善).
- **Booking:** Small room (our post: ~20 seats; blogs: few seats, bar stools), so phone ahead.
- **Most-praised dishes:** butter naan 奶油烤餅 ("thick and chewy") and white-sauce tandoor chicken 白醬窯烤嫩雞腿 (malai) (blogs). Our post: garlic naan, dal tadka, samosas. Samosa chaat (EN snippet).
- **Site images:** `/media/2019/11/Oye-Punjabi-1024x713.jpg` (featured + list), `/media/2019/11/Oye-Punjabi-1-1024x710.jpg`, `-4-1024x659.jpg`, `-5-1024x707.jpg`, `-7-773x1024.jpg`, `-8-842x1024.jpg`, `-10-1024x706.jpg`, `-11-1024x745.jpg`, `-13-1024x734.jpg`, `-14-1024x719.jpg` (all `/media/2019/11/Oye-Punjabi-…`), plus `/media/2020/01/Oye-Punjabi-3-1024x727.jpg`, `/media/2020/01/Oye-Punjabi-9-808x1024.jpg`.

### 4.3 Balle Balle Indian Restaurant & Bar 巴雷巴雷印度餐廳 (upgrade from brief mention)
- **Status:** Open. Google review Jan 2026 (via Wanderlog), Yelp updated Aug 2026, supertaste May 2026.
- **Address:** No. 12, Guangfu N Rd, Songshan / 台北市松山區光復北路12號 (near Bade Rd). Tel 02-2570-7265.
- **MRT:** One blog headline says "捷運南京復興站". **Not verified.** On a map, Sun Yat-sen Memorial Hall (Bannan line) or Taipei Arena/Nanjing Sanmin look closer. Check in GM.
- **Hours:** 11:30–14:30 and 17:30–21:45, **closed Monday** (blog). Yelp shows daily to 22:00, and Wanderlog has last seating 21:45 (21:30 Mon). **Conflict on Monday.**
- **Prices (blogs, 2021–2025):** naan NT$70–80 (plain/butter/garlic), aloo paratha NT$130 (delivery), butter chicken NT$380 (NT$430 delivery), baingan bharta 炭烤茄子泥 NT$310 (NT$345 delivery), murgh malai tikka 白醬窯烤嫩雞塊 NT$440, tandoori chicken NT$380 (2 pcs) to NT$590 (4 pcs), delivery set for 2 NT$1,600. Spend about **NT$500–600 per person**. The page's "meal for two NT$600–800" is too low.
- **Cuisine:** Punjabi / North Indian. Owner Gurvind Singh Kant ("GV"); Indian staff and kitchen (cava).
- **Diet:** Vegetarian dishes (Yuki's: "可素食", vegetarian OK). Halal not claimed.
- **Booking:** Recommended (busy; 2014 advice, still repeated).
- **Official link:** none found. Facebook not confirmed.
- **Most-praised dishes:** butter chicken and lamb rara (E3), baingan bharta (several blogs), murgh malai kebab, tandoori chicken, naan with mint yoghurt.
- **Site images:** none.

### 4.4 Mayur Indian Kitchen 馬友友印度廚房 (MIK; upgrade from brief mention)
- **Status:** Open. Several Taipei branches with 2026 activity: **MIK-3 vegetarian** reviewed Apr 2026 (vocus), **Dazhi** Yelp updated May 2026, MIK-2/MIK-6 reviews May 2026 (Tripadvisor). 13 branches across Taiwan (Jan 2026 article). Founder/chef Mayur Srivastava (Taiwan News 2020, (s)).
- **Taipei branches (official site home/contact page, (s)):**
  - **MIK-1 (flagship, à la carte):** No. 350-5, Sec 1, Keelung Rd, Xinyi / 台北市信義區基隆路一段350之5號 (at Ren'ai Rd). Tel 02-2720-0011.
  - **MIK-2 ("fine dining"):** No. 103, Sec 3, Minsheng E Rd, Songshan / 民生東路三段103號.
  - **MIK-3 Vegetarian/Vegan:** No. 64-2, Sec 2, Jinan Rd, Zhongzheng / 台北市中正區濟南路二段64-2號. Tel 02-2321-2261. Near **Zhongxiao Xinsheng** (vocus). An older page says closed Tuesday. Own site mik3taiwan.com. Converted to vegetarian/vegan Apr 2018.
  - **Dazhi (MIK-5):** No. 8, Lane 630, Bei'an Rd, Zhongshan / 北安路630巷8號.
  - **MIK-6 Live House:** 1-1 Songjiang Rd, Zhongshan (restaurant, bar, live music, hookah).
- **Hours/prices:** **No 2026 menu or hours found** (Eating in Taipei saw a MIK-2 main at NT$325, ~2024).
- **Cuisine:** North Indian plus South Indian dishes (masala dosa with sambar). **Halal** (yukigo "清真餐廳"; xtra.tw Muslim guide).
- **Booking:** Eating in Taipei complained about reservation handling at MIK-2. Book by phone.
- **Official link:** indianfoodtaiwan.com (`/home-mik`, `/contact-us-1`). Found in search; **not opened**.
- **Most-praised dishes:** chicken tikka masala, palak paneer, masala dosa, the naan range (13 kinds at Dazhi), spiced lamb chops 碳烤香料羊排 (Z8).
- **Site images:** none.

### 4.5 TAJ Indian Restaurant 泰姬印度餐廳 (new)
- **Status:** Open (Yelp updated Jun 2025; blogs into 2025–26; supertaste May 2026; Instagram @tajtaiwan). **Not 2026-confirmed by a dated review.**
- **Address:** No. 1, Lane 48, Sec 4, Civic Blvd, Da'an / 台北市大安區市民大道四段48巷1號. Tel 02-8773-0175.
- **MRT:** Zhongxiao Fuxing (lordcat headline "台北忠孝復興站美食"). Exit and minutes not verified.
- **Hours:** 12:00–14:30 and 17:30–22:00 (Yelp). The closed day conflicts (Tue in one source, Thu in another).
- **Prices (recent blogs):** deluxe thali NT$390 (+NT$50 drink), chicken curry NT$350, garlic naan NT$80, average ~NT$400, 10% service charge. The **weekend buffet is disputed**: older posts give NT$450 Sat/Sun lunch, several blogs say it stopped after COVID, and a Dec 2025 vocus post still advertises "吃到飽" (all-you-can-eat). Leave it out until checked.
- **Cuisine:** North Indian (Mughlai/Punjabi).
- **Diet:** **Halal-certified** (one of Taiwan's few; Instagram bio "Halal清真認證"). Vegetarian dishes.
- **Michelin:** Bib Gourmand 2020–2024, **dropped 2025** (§3).
- **Most-praised dishes:** tandoori chicken 火紅乳酸碳烤雞 (Z6, Z7, Z8), dal makhani 黑扁豆咖哩, whole-wheat roti, mutton biryani, palak paneer (cava).
- **Official link:** Instagram instagram.com/tajtaiwan (found, not opened).
- **Site images:** none.

### 4.6 Out of India 印渡風情 (Shida branch) (new)
- **Status:** Probably open. Taipei Expats (~Jul 2025) and taiwan17go are recent. **No 2026-dated review found.**
- **Address:** No. 26, Lane 13, Pucheng St, Da'an / 台北市大安區浦城街13巷26號 (near Shida/NTNU, off Heping E Rd).
- **MRT:** Guting or Taipower Building (Shida area). **Exit/minutes not verified.**
- **Hours:** not found.
- **Prices:** pani puri 芒果酸子酥球 NT$200 for 8 (blog). The set for two is called good value (Z8).
- **Cuisine:** North Indian. Indian chef-owner, who also owns 3 Idiots (Taipei Expats).
- **Most-praised dishes:** pani puri (WalkerLand, blogs), tandoori chicken and set for two (Z8), curries (Taipei Expats). Lao Ren Cha dislikes its "fake garlic-butter" naan.
- **Official link:** not found.
- **Site images:** none.

### 4.7 3 Idiots Toast & Curry 三個傻瓜印度蔬食 (new: vegetarian/vegan pick)
- **Status:** Probably open. supertaste May 2026, and the travel.yam / lordcat / janice.life posts are recent. **Not 2026-confirmed by a dated review.**
- **Address:** **Nanjing branch on Changchun Rd, Zhongshan (中山區長春路)**, near **Nanjing Fuxing MRT** (exact number not captured). There is also a **Da'an branch** (anise.tw). Get exact addresses before writing.
- **Hours/prices:** not found.
- **Cuisine:** North Indian vegetarian, plus "spiced toast" and a Middle-Eastern pita platter.
- **Diet:** **Pure vegan**: no egg or dairy, no five pungent roots (去五辛), per lordcat ("全台唯一全素印度蔬食餐廳", the only fully vegan Indian restaurant in Taiwan). That suits Buddhist vegetarians.
- **Most-praised dishes:** samosas and lassi (Eating in Taipei; the lassi presumably plant-based), cheese naan (supertaste; vegan "cheese"), pita platter (yam).
- **Site images:** none.

### 4.8 Nataraj Indian Cuisine 納達吉印度料理 (keep only if moved address is fixed; weakest support)
- **Status:** Open at its new address since ~Sep 2024 (registry change Jul 2024; Oct 2024 vocus/udn posts; WalkerLand "捷運市政府美食" post; OpenTable now lists it in 信義區, Xinyi).
- **Address:** 1F, No. 127, Sec 1, Keelung Rd, Xinyi / 台北市信義區基隆路一段127號1樓 (diagonally opposite Songshan Senior High School). Tel 02-2748-5777. **Old address (75 Nanjing E Rd Sec 5) is gone. Fix the Maps link.**
- **MRT:** **Taipei City Hall, Exit 1, ~6 min** (blog; one says 5).
- **Hours:** 11:30–14:30 and 17:30–21:30, **closed Monday**.
- **Payment:** **cash or JKOPay only, no cards** (OpenTable notice) (s).
- **Cuisine:** North and South Indian (the page's "some kitchen staff from South India" line is from older material and unverified). The large room (~50–60 ping, with AV) takes private parties.
- **Most-praised dishes:** tandoori red-spiced chicken leg, lamb shank curry, sea bass curry, masala cola, pani puri, rice pudding (blogs).
- **Booking:** OpenTable profile 180902.
- **Site images:** none.

### 4.9 Amma's Kitchen 清奈媽媽印度廚房 (optional: the South Indian pick)
- **Status:** Open per its own site. **Opening days are limited and conflicting**: Wanderlog lists Wed and Sat, Atly says "generally weekends only". Moved from the Roosevelt Rd/Zhongzheng address that Tripadvisor still shows.
- **Address:** No. 2, Lane 357, Sec 2, Heping E Rd, Da'an / 台北市大安區和平東路二段357巷2號. Tel 02-2700-2760. Near **Technology Building MRT** (Lao Ren Cha) (minutes not verified).
- **Cuisine:** South Indian (Chennai home cooking; tiffin).
- **Most-praised dishes:** masala dosa, onion uttapam (Tripadvisor review text), podi idli, pongal (call ahead) (Lao Ren Cha).
- **Official link:** ammakitchentaipei.com (found, not opened).
- **Site images:** none.

---

## 5. Restaurants on the page that need action

### 5.1 Moksha Indian Restaurant 莫夏印度餐廳: **unconfirmed; recommend holding or dropping**
- **Tianmu (original), 138 Zhongshan N Rd Sec 6 (opposite SOGO Tianmu): closed.** ifoodie "已歇業", jeremyfoodie post titled "天母店 (已歇業)", Uber Eats "stopped from 25 Mar 2025".
- **Zhishan, No. 70 Dexing W Rd, Shilin (德行西路70號), tel 02-2832-3699, Zhishan Exit 2, 3 min**, from one pixnet post of ~May 2025. Whether this is a relocation of the Tianmu shop, and whether it still trades, is **unconfirmed**.
- **Da'an "Moksha 67", No. 67 Dongfeng St (東豐街67號), tel 02-2706-9878**, average ~NT$830, 11:30–14:30 and 17:30–22:00, closed Monday. Reviews 2019–2024 only. MapQuest gives a different address (14, Lane 48, Ren'ai Rd Sec 4). **Unconfirmed.**
- The page says "two branches – Da'an, and Shilin near Zhishan MRT", with Zhishan Garden/Traditional Theatre Centre links, and the Maps link points to "67 Dongfeng Street". Recommendation: **check Google Maps and Facebook for both before keeping.** If either is closed, cut Moksha and remove those internal links. Supertaste (May 2026) still lists 莫夏 but doesn't say which branch. Praise when it was open: South Indian dosas (Lao Ren Cha), dahi puchka, tandoori stuffed mushrooms, samosa, lychee-stuffed curry (Moksha 67); Tue–Fri set lunch NT$450 (Shilin, older).
- Site images: none.

### 5.2 Nataraj: fix the address, district and Maps link (§4.8). The "highest-rated" claim is Tripadvisor-only. Say so or drop it.

### 5.3 Saffron paragraph: replace "Another Indian restaurant that has earned a place in the Michelin Guide" (§3). It is "a little out of the way in Tianmu", which is true.

### 5.4 Featured image of `best-indian-restaurants` is `/media/2019/05/Joseph-Bistro-5-1024x679.png`, which shows a **closed** restaurant. Swap it for `/media/2019/11/Oye-Punjabi-1024x713.jpg` or `/media/2019/05/Saffron-Fine-Indian-Cuisine-4-1024x768.jpg`.

### 5.5 Closed (don't add back): Joseph Bistro, Flavour of India (both have "(Permanently Closed)" pages here; Flavour of India still tops the Vegan Taiwan blog and a 2023-era Taiwan News Holi sponsor list), Moksha Tianmu.

---

## 6. Other names checked (not recommended for the line-up)

- **Saffron 46 番紅花46** (Breeze Nan Shan 46F, 17 Songzhi Rd, Xinyi): same owner as Saffron, view dining, 2 ZH publishers (~2023). **Status and current Michelin standing not checked** (search budget ran out). Possible "special occasion / view" add-on after verification. Not a 2026 Michelin listing.
- **Veer Jee's 維傑印度餐廳** (Punjabi; Zhongshan Junior High School MRT area per lordcat, a Yanji St address per another snippet, so the addresses conflict): 2 ZH publishers including supertaste 2026. Reasonable reserve.
- **Ali Baba's Indian Kitchen 阿里巴巴的廚房** (Nanjing E Rd at Jilin Rd): 3 publishers, all 2020–22. Weekend lunch buffet NT$699 (maggieblog). Not verified for 2026.
- **Dazzle 奪愛** (84 Ren'ai Rd Sec 3, since 1990; NT$200 business lunch per WalkerLand): 2 ZH, dated.
- **Tandoor 坦都** (Hejiang St, ~35 years): Taipei Times 2007 + vocus Dec 2023.
- **Three Wishes 神燈搓一下** (28, Lane 283, Roosevelt Rd Sec 3; Taipower Building): Taipei Times Nov 2024 (Goa fish curry, lamb vindaloo). The menu mixes Indian, Middle Eastern and Mexican, so it's a footnote at most.
- **Namaste Taiwan** (Shida Night Market) and **Calcutta 加爾各答** (Wannian Building B1, Ximending): cheap one-publisher or blog-only picks. Possible "cheap eats" line if verified.
- **Family Indian 亞瑟蘭** (Tianmu/Zhishan, since 2007) and **Yogi Dosa** (Nangang, vegan South Indian, Uber Eats only seen): blog-only.

---

## 7. Site media by restaurant (from content/posts.json)

| Restaurant | Paths |
|---|---|
| Oye Punjabi | `/media/2019/11/Oye-Punjabi-1024x713.jpg`, `/media/2019/11/Oye-Punjabi-1-1024x710.jpg`, `/media/2019/11/Oye-Punjabi-4-1024x659.jpg`, `/media/2019/11/Oye-Punjabi-5-1024x707.jpg`, `/media/2019/11/Oye-Punjabi-7-773x1024.jpg`, `/media/2019/11/Oye-Punjabi-8-842x1024.jpg`, `/media/2019/11/Oye-Punjabi-10-1024x706.jpg`, `/media/2019/11/Oye-Punjabi-11-1024x745.jpg`, `/media/2019/11/Oye-Punjabi-13-1024x734.jpg`, `/media/2019/11/Oye-Punjabi-14-1024x719.jpg`, `/media/2020/01/Oye-Punjabi-3-1024x727.jpg`, `/media/2020/01/Oye-Punjabi-9-808x1024.jpg` |
| Saffron Fine Indian Cuisine | `/media/2019/05/Saffron-Fine-Indian-Cuisine-1-e1556873289918-768x1024.jpg`, `/media/2019/05/Saffron-Fine-Indian-Cuisine-2-1024x768.jpg`, `/media/2019/05/Saffron-Fine-Indian-Cuisine-3-1024x768.jpg`, `/media/2019/05/Saffron-Fine-Indian-Cuisine-4-1024x768.jpg` |
| Balle Balle, Mayur, Taj, Out of India, 3 Idiots, Nataraj, Amma's, Moksha | **none** |
| (closed) Joseph Bistro | `/media/2019/05/Joseph-Bistro-1-1024x768.jpg` … `-6-1024x770.jpg`, `/media/2019/05/Joseph-Bistro-5-1024x679.png` (**currently the list's featuredImage**) |
| (closed) Flavor of India | `/media/2019/12/Flavor-of-India-*.jpg` (9 files) |

Internal links that point here: `where-to-have-lunch` ("best Indian restaurants") and `taipei-food-guide` ("Indian"). `taipei-east-district-dongqu` links Oye Punjabi. `maps` lists Saffron.

---

## 8. Still to verify before writing (could not be done this session)

1. Open guide.michelin.com's Taipei Indian filter and confirm Saffron is the only entry (expected: yes).
2. Google Maps status, plus walking minutes from a named exit, for: Saffron (Mingde vs Zhishan), Oye Punjabi (Sun Yat-sen Memorial Hall Exit 1 vs Zhongxiao Dunhua Exit 2), Balle Balle, MIK-1, MIK-3, Taj (Zhongxiao Fuxing), Out of India, 3 Idiots Nanjing, Nataraj (City Hall Exit 1), Amma's (Technology Building).
3. **Moksha**: Da'an (67 Dongfeng St) and Zhishan (70 Dexing W Rd). Open or closed?
4. 2026 menus with prices: Saffron (curry, naan, set lunch), Oye Punjabi, Mayur, Taj (and whether the weekend buffet still runs), Out of India, 3 Idiots.
5. Official links: open indianfoodtaiwan.com, mik3taiwan.com, ammakitchentaipei.com, facebook.com/oyepunjabitaipei, instagram.com/tajtaiwan, plus Facebook pages for Balle Balle, Nataraj, Out of India and 3 Idiots.
6. Saffron 46 status, if a "view" pick is wanted.

---

## 9. Recommended line-up

| Slot | Restaurant | Why (one line) |
|---|---|---|
| **Best overall / Michelin** | **Saffron Fine Indian Cuisine** (Tianmu) | The only Indian restaurant in Taipei's 2026 Michelin Guide (Bib Gourmand), 7 publishers, and our own visit. Worth the trip for the tandoor-charred murgh Nawabi and gosht Lahori. |
| **Best in the centre / Punjabi home cooking** | **Oye Punjabi** (Yanji St, Da'an, 2 shops) | Our own visit (naan, dal tadka). Small, Indian-run, near the East District, and now with a second shop. |
| **Long-running Punjabi favourite** | **Balle Balle** (Songshan) | Ties for the most publishers (7, both languages, 2014–2026). Owner-run since before 2014. Baingan bharta and butter chicken. |
| **Halal / ex-Bib Gourmand** | **TAJ** (Da'an, Zhongxiao Fuxing) | Halal-certified and a Bib Gourmand 2020–24. 6 Chinese-language publishers, and the tandoori chicken is the dish most singled out. |
| **Most choice / dosa / late or near you** | **Mayur Indian Kitchen** (MIK-1 Xinyi flagship; MIK-3 veg) | 7 publishers and the biggest chain (13 branches). Halal, with masala dosa as well as North Indian, so a branch is likely nearby. |
| **Vegetarian & vegan** | **3 Idiots Toast & Curry** (Nanjing Fuxing; Da'an) and **Mayur MIK-3** (Jinan Rd) | 3 Idiots is fully vegan with no five pungents (4 publishers). MIK-3 is the all-vegetarian/vegan branch the page already mentions. |
| **Cheap & casual / student area** | **Out of India** (Shida) | 7 publishers, recommended by Indian residents (Tricky Taipei, Taipei Expats). Pani puri and the set for two are good value. |
| **South Indian** | **Amma's Kitchen** (Heping E Rd), with **Nataraj** as the everyday-hours alternative | Amma's is the only true South Indian tiffin kitchen named by a publisher (dosa, podi idli, pongal), but it opens limited days. Nataraj (moved to Keelung Rd by City Hall) has a mixed North/South menu and normal hours. |
| **Hold** | Moksha | Tianmu closed in 2025. Da'an and Zhishan unconfirmed. Re-add only after a status check. |

Suggested title once verified: "Best Indian Restaurants in Taipei (2026): 8 Worth Trying". Lead with the fact that Saffron is the only Michelin-listed Indian restaurant, and put halal, vegan and South Indian in subheads, since those are likely search intents.
