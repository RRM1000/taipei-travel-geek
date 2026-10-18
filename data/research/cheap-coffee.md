# Research: Cheap Coffee in Taipei (refresh)

Checked 18 October 2026. This file is research, not article copy. Existing slug: `cheap-coffee` ("Cheap Coffee in Taipei: Louisa, 7-Eleven & More"), first published 30 Jan 2020, `modified` 11 Aug 2026 but with 2019–2020 prices. Venue pages on the site: `louisa`, `unicofa-coffee`, `yolos-cafe`, `ray-cafe`.

**Scope used**
- Cheap everyday coffee in Taipei City: Taiwanese budget chains, the four convenience-store chains, and a mid-price/premium comparison set (cama café, 85°C, Mr. Brown, Starbucks).
- Prices are **hot Americano and hot latte, medium (中杯) and large (大杯)**, list price before promotions. In Taiwan, convenience-store and Starbucks 中杯 are both 12 oz (about 355–360 ml) and 大杯 are 16 oz (about 473–480 ml), so medium and large compare like for like. Louisa, 85°C and cama cup sizes were **not** checked.

**How this was checked (read this first: this pass is incomplete)**
- **No page could be opened.** WebFetch failed with `getaddrinfo ENOTFOUND` for every host tried (nownews.com, louisacoffee.co, 7-11.com.tw, cashfeel.com.tw, en.wikipedia.org). Shell `curl` was refused by the session's network proxy (403 on CONNECT, even for example.com). **Every fact below is therefore from search-engine snippets and is marked (s).** Nothing has been confirmed on the live page. A search summariser can merge or misread table cells, so wherever a price comes from only one snippet it is flagged **single (s)**.
- **The search budget ran out partway through** (200 searches per turn, shared by all agents in the session). Tasks 1–3 and 5 are mostly done. **Task 4 (independent cheap specialty cafes) was not started**, and the Yolo's and Ray Cafe prices were never found. See §8, "Still to do".
- **Status checks.** Google Maps could not be opened (www.google.com was refused by the proxy), so no live "Permanently closed" or "Open" flags were read. Status comes from official websites, Facebook and Uber Eats listings and dated third-party listings, as they appeared in search snippets.
- **Prices.** Official menu pages where a snippet showed them (citycafe.com.tw, family.com.tw, starbucks.com.tw, mrbrown.com.tw, 85cafe.com, unicofacoffee.com). Official pages are cached and mostly undated, so each one was cross-checked against a dated 2026 news report or menu round-up where possible. Coupon and menu round-up sites (CashFeel, cpok.tw, baliman.tw, money101, dailydietitian, UpToGo) were used **only to corroborate prices**. They are not counted as publishers.
- **Publishers** (for later consensus work): booking sites, aggregators (Wanderlog, corner.inc, fooday, POPO筆記, MENU美食誌, OpenRice listing pages), delivery apps and unauthored coupon round-ups are excluded. One author across several sites counts once.
- **Images.** These come from `content/posts.json` (regex for `/media/...`) and were checked against `public/media/`.

---

## 1. Summary: what surprised us

1. **The 7-Eleven "same beans as Starbucks" line is wrong. Drop it.** Both brands belong to the Uni-President group (President Chain Store runs 7-Eleven and holds Starbucks Taiwan with Uni-President), which is how the rumour started. **Starbucks Taiwan publicly denied it in Feb 2017** (CNA, 22 Feb 2017, "星巴克與小七同款咖啡豆？業者鄭重闢謠"; also LTN and China Times). It said it may only use beans and ingredients imported from Starbucks' US headquarters. 7-Eleven describes City Café as its own blend, bought green and roasted fresh in Taiwan (recent blends name Brazilian estates Fazenda Bau and Veloso). The same claim also appears on `taipei-convenience-stores` ("made with the same beans as Starbucks"), which needs the same fix. That page is outside this brief and was not edited.
2. **Convenience-store coffee has barely risen since 2019, while Louisa has gone up about 23%.** City Café and FamilyMart Let's Café are both **NT$35 for a medium Americano and NT$45 for a medium latte** (NT$45 and NT$55 large). The old page listed the 7-Eleven latte as small 35 / medium 45 / large 55 / XL 65, so only the extra-large has moved (to NT$70). Louisa's medium latte went from NT$65 (old page) to **NT$80** after the **6 Jan 2026** rise.
3. **Louisa's latte now costs the same as a Unicofa or Yolo's latte did in 2019 plus NT$15.** After the Jan 2026 rise (about 90 items, mostly +NT$5), a Louisa medium Americano is **NT$60** and a medium latte **NT$80**. Round-ups give large as NT$75 and NT$100. The page's "Medium NT$65 / Large NT$85" is out of date.
4. **Unicofa's official menu is still the cheapest sit-down chain menu found**: Americano **NT$45 (M) / NT$60 (L)**, latte **NT$65 (M) / NT$85 (L)**. However, the page is undated, and the chain's public footprint looks to have shrunk. Its website now lists mainly a Neihu (BenQ) shop, workplace-only shops in Taoyuan and Hsinchu, and a Shilin roastery. Two Taipei branches are unavailable on Uber Eats, and a third stopped on Uber Eats in Sept 2022. **Its status needs a Google Maps check before it stays on the page.**
5. **Yolo's has lost at least two branches.** The official store list (yoloscafetw.com, 2025 version in the snippet) names only 通安創始店, 忠孝敦化店, 南京敦北店 (Hung Kuo Building) and 芝山店. The site's "Zhongshan" (Zhongshan Junior High exit 1) and "Datong" (Minquan W Rd exit 1) branches are not on it, and a blogger reports the 民權撫順 branch closed. Prices were not found.
6. **Ray Cafe looks open.** A listing updated **17 Feb 2026** gives weekdays 08:30–17:30 and weekends 10:00–18:00. The site says weekdays 08:00–18:00, so its hours are out of date. Reviews describe drinks as "about NT$100 or under". The exact latte price was not found.
7. **The cheapest coffee in Taipei now comes through apps, not the counter.** Hi-Life's app offered **buy 30 get 30** on large Americanos (about **NT$23 a cup**, Apr 2026). OK Mart's app 寄杯 deals came to **under NT$25 a cup** (Apr 2026). The National Day weekend (9–11 Oct 2026, to 13 Oct at Hi-Life) brought buy-one-get-one on large and XL at Hi-Life (about NT$28 a cup). FamilyMart runs a standing **2nd cup 21% off** (79折) on classic large and up (money101, updated 26 Aug 2026). The old page's "must be redeemed at the same store" rule described the old paper 寄杯 system. App 寄杯 rules were **not** verified this session (§6).
8. **Starbucks Taiwan is about three times convenience-store prices** (medium latte NT$125 against NT$45). It raised espresso drinks by NT$5 on **12 Feb 2025**. On **12 Oct 2026** it started charging NT$15 for milk or drink top-ups on less-ice or no-ice orders, and NT$20 for oat or almond milk, which caused a backlash (China Times, ETtoday, Next Apple, CommonWealth, 12–13 Oct 2026). Worth one line in the comparison.
9. **Other site claims to update:** `best-coffee-shops-in-taipei` says everyday chains cost "NT$35–90". After the Louisa rise, the realistic range is **NT$35 (7-Eleven M Americano) to NT$100 (Louisa L latte)**. Not edited.

---

## 2. Sources

### 2a. Official menus and brand pages (all (s); none opened)

| Brand | Official source (as seen in snippet) | What it gave | Date confidence |
|---|---|---|---|
| 7-Eleven City Café | citycafe.com.tw/price.aspx; /event/cityprima/; /event/25special/; /event/24reservecafe/ | Classic, 濃萃, 特選, CITY PRIMA and 不可思議 prices; cup sizes; NT$5 off with your own cup | Price page cached and undated (snippet said "about 1,292 days" old). Matches CashFeel (upd 28 Jul 2026) and baliman 2026 |
| FamilyMart Let's Café | nevent.family.com.tw/2018_letscafe/product/ (and event.family.com.tw mirror) | Classic Americano and latte, S/M/L/XL, hot and iced; NT$5 off with your own cup | Undated. Matches dailydietitian, UpToGo and pixnet (Dec 2024) |
| Louisa | louisacoffee.co (unreachable) | none | Prices from CNA, NOWnews, UDN, TVBS, ETtoday, Taipei Times, Focus Taiwan (5–7 Jan 2026) |
| Unicofa 歐克法 | unicofacoffee.com/expresso.html, /contact.html, home page | Americano, latte and other prices; store list | Undated |
| Starbucks Taiwan | starbucks.com.tw product pages id=692 (latte), id=693 (Americano) | S/M/L/XL prices | Matches the NOWnews report of the 12 Feb 2025 rise |
| Mr. Brown 伯朗咖啡館 | mrbrown.com.tw/CafeStore/Detail.aspx?ID=15 (Americano), ID=51 (latte) | M/L prices | Undated |
| 85°C | 85cafe.com/Product.php?datatid=9; /little8.php | Americano S/M/L; 鉑金 (premium-bean) Americano | Undated. Snippet mixed several items, so the price-to-item mapping is uncertain |
| cama café | camacafe.com (not in any snippet) | none | Only CashFeel (upd 20 Mar 2026) |
| Hi-Life, OK Mart | not found | none | Promotion reports only |
| Yolo's | yoloscafetw.com "門市據點" | Store list | 2025 version |
| Ray Cafe | Facebook raycafe.roasters (not checked) | none | Third-party listing dated 17 Feb 2026 |

### 2b. News and editorial sources used (all (s))

| # | Source (date) | Used for |
|---|---|---|
| N1 | **CNA** 中央社 202601050285 (5 Jan 2026); **Focus Taiwan / Taipei Times** biz 2026/01/06; **TaiwanPlus** (7 Jan 2026); **World Coffee Portal** | Louisa price rise: about 90 items, average 5%. Americano 55→60, 莊園 Americano M 65→70, 莊園 latte 85→90, frappés and floats +15. Start date given as 6 Jan (CNA, NOWnews) or 7 Jan (Taipei Times, TaiwanPlus) |
| N2 | **NOWnews** 6772411 and 6772529 (5–6 Jan 2026); **UDN** 9246708; **TVBS** 3092379; **ETtoday** 3095956 | Louisa: 美式 55→60, 咖啡拿鐵 75→80. 寄杯 85% off for 5 cups (6–9 Jan). NT$5 off 9 drinks before 11:00. TVBS says medium and small 莊園 Americano and latte were **not** raised, which conflicts with CNA's 65→70 (unresolved) |
| N3 | **CNA** 201702220377 (22 Feb 2017); **LTN** 1983494; **China Times** 20170222005347 | Starbucks denies sharing beans with City Café |
| N4 | 7-Eleven / foodnext (2019 blend upgrade, via snippet) | City Café blend from Brazilian estates, roasted in Taiwan |
| N5 | **NOWnews** 6645085 | Starbucks +NT$5 on Americano and latte from 12 Feb 2025 |
| N6 | **China Times** 20261012001155 / 001691 / 001839; **ETtoday** 20261013/3253644; **Next Apple** 20261013; **CommonWealth 天下** 5143266 | Starbucks customisation charges from 12 Oct 2026 |
| N7 | **CNA** 202202250030 (25 Feb 2022) | cama raised black coffee NT$10 (26 Feb 2022) |
| N8 | **n.yam.com** 20260425291030 (25 Apr 2026) | Hi-Life: buy 30 get 30 on large Americano in the app (about NT$23 a cup), buy 30 get 25 on large latte. 特濃 large Americano NT$55 and latte NT$65 at buy-one-get-one |
| N9 | **applealmond.com** 328076 (Oct 2026) | National Day 2026 convenience-store coffee deals (Hi-Life large and XL buy-one-get-one to 13 Oct) |
| N10 | **travel.udn.com** 9785266 (Oct 2026) | 1 Oct International Coffee Day round-up: convenience-store buy-one-get-one and "add NT$10 for another cup"; Mr. Brown large buy-one-get-one, 1 Oct only |
| N11 | **money101.com.tw** (upd 26 Aug 2026) | FamilyMart: 2nd cup 79折 on classic large and up and on single-origin |
| N12 | **TVBS 食尚玩家** offers 12741 / 13887 and others | OK Mart OKCAFE: buy 2 get 2 on large 莊園 (2 Jan 2026); XL buy 2 get 1 promotions |
| N13 | **taiwannews.com.tw** 6329013; **ctee** 20260327700534 (27 Mar 2026) | Louisa group bought Jack Brothers Steak (2026). Shows it is expanding, not shrinking |

### 2c. Independent publishers on the venues (all (s), snippet only)

| # | Publisher (author, date) | Venue | Note |
|---|---|---|---|
| P1 | **beri.tw/ray-cafe** (undated in snippet) | Ray Cafe | "東區不限時平價咖啡・比利時鬆餅・外帶咖啡" |
| P2 | **maggieblog.tw** post-36107896 (undated) | Ray Cafe | "百元就可以享有" (under NT$100). Next to Ming Yao department store; no time limit |
| P3 | **OpenRice review by 男子的日常生活** (undated) | Ray Cafe | "台北東區平價咖啡店" |
| P4 | **tenjo.tw** (周花花) | Yolo's 合江店 | 合江街182號. Xingtian Temple / Zhongshan Junior High MRT. Probably the site's "Zhongshan branch"; not on the official 2025 list |
| P5 | **vocus.cc** (YC talk about life) | Yolo's (Da'an) | General review |
| P6 | **xyz989.pixnet** | Yolo's 通安總店 | Marked "邀約" (hosted visit), so flag it |
| P7 | **smoony.pixnet** | Yolo's 民權撫順店 | **Reports it closed** |
| P8 | **maiimage.com/2021-tsca** | Unicofa | Confirms Unicofa in the "2021 TSCA 日日金杯" promotion, which supports the Golden Cup line on `unicofa-coffee` |

**Publisher count: 8 snippet-only (3 Ray, 4 Yolo's, 1 Unicofa). No independent cheap specialty cafes were found (Task 4 not done).** That is well short of the 8–12 target for the "add" section.

---

## 3. Status of every current venue

| Venue (site slug) | Status | Evidence (all (s)) | Confidence |
|---|---|---|---|
| **Louisa** (`louisa`) | **Open**, chain expanding | Jan 2026 price rise reported by every major outlet. Acquired Jack Brothers Steak (Mar 2026). Store count not found | High |
| **Unicofa 歐克法咖啡** (`unicofa-coffee`) | **Unconfirmed; may be much reduced** | Official home lists 臺北明基門市 (No. 18 Jihu Rd, Neihu; probably inside BenQ, may be staff-only), workplace-only shops in Taoyuan and Hsinchu, and a Shilin roastery. Facebook and Uber Eats pages exist for **辛亥店** (Ln 171, Xinhai Rd Sec 2, Da'an; "unavailable" on Uber Eats), **八德店** (No. 371 Bade Rd Sec 2, Songshan; Facebook hours Mon–Fri 08:00–17:30, Sat 10:00–17:00, closed Sun; "unavailable" on Uber Eats), **安敦店** (No. 29 Anhe Rd Sec 1, Da'an) and **石牌店** (No. 82 Shipai Rd Sec 1, Beitou; off Uber Eats since 18 Sep 2022). Instagram @unicofa_coffee_ exists; recent posts not seen | Low |
| **Yolo's Cafe** (`yolos-cafe`) | **Open (chain); 2 of the site's 3 branches probably gone** | Official list (2025): 通安創始店 (Tong'an St, Xinyi; near Xinyi Anhe), **忠孝敦化店** (No. 15, Aly 40, Ln 181, Zhongxiao E Rd Sec 4; matches the site's "Dunhua Branch, Zhongxiao Dunhua exit 7"), 南京敦北店 (No. 167 Dunhua N Rd, Hung Kuo Building, Songshan), 芝山店. The site's Zhongshan and Datong branches are not on the list. 民權撫順 reported closed (P7). Facebook: facebook.com/yolos.cafe.dn (Zhongxiao Dunhua). The site still links facebook.com/yoloscafe2015 | Medium |
| **Ray Cafe** (`ray-cafe`) | **Probably open** | corner.inc listing updated 17 Feb 2026: No. 22, Aly 5, Ln 170, Zhongxiao E Rd Sec 4, Da'an. Tel 02-2771-1616. Weekdays 08:30–17:30, weekends 10:00–18:00. Wanderlog about 4.3★ from about 591 ratings. Zhongxiao Dunhua exit 3 (matches the site) | Medium |
| **7-Eleven City Café** | Open | Current official price pages; 2026 promotions | High |

---

## 4. Venue and chain sections

### 4.1 Louisa Coffee 路易莎 — KEEP, reprice

- **Prices, 2026 (s):** 美式 Americano **M NT$60** (was 55) / **L NT$75**; 咖啡拿鐵 latte **M NT$80** (was 75) / **L NT$100**. Medium prices: CNA, NOWnews and others (5–6 Jan 2026). Large prices: CashFeel 2026 menu (upd 20 Mar 2026) and other round-ups; no news report gave large prices. 莊園級 (estate) Americano M NT$70, 莊園 latte M NT$90 (CNA). Flavoured lattes M90 / L110 (round-ups).
- **Conflict:** TVBS says medium and small 莊園 Americano and latte were not raised; CNA and Focus Taiwan say 莊園 Americano 65→70. Check the in-store menu or the app.
- **Deals:** Louisa app or member 寄杯 (prepaid cups). The 2026 launch offer was 15% off for 5 cups of the same drink (6–9 Jan). Before 11:00, NT$5 off 9 best-sellers (Jan 2026; not confirmed as standing). "Black card" membership discounts exist (details not checked).
- **Old page:** "Medium NT$65 / Large NT$85". The `louisa` post says a large latte is "NT$80" and "upwards of NT$150 elsewhere". All out of date.
- **Images on site:** `/media/2019/07/Louisa-8-1024x768.jpg` (used on cheap-coffee), `/media/2019/06/Louisa-1-859x1024.jpg`, `/media/2019/06/Louisa-3-1024x768.jpg`, `/media/2019/06/Louisa-4-1024x768.jpg` (also on best-cafes-to-work), `/media/2019/06/Louisa-5-1024x762.jpg`, `/media/2019/08/Louisa-6-983x1024.jpg`, `/media/2019/12/Louisa-9-786x1024.jpg`, `/media/2019/12/Louisa-Wrappini-1024x688.jpg`, `/media/2019/12/Louisa-Wrappini-2-1024x714.jpg` (also on cheap-breakfast-taipei). All exist in `public/media`.

### 4.2 Unicofa 歐克法咖啡 — KEEP ONLY IF A BRANCH IS CONFIRMED OPEN

- **Prices (official expresso.html, undated, (s)):** Americano (美式黑咖啡) **M NT$45 / L NT$60**; latte **M NT$65 / L NT$85**; flavoured lattes M70 / L90; cappuccino M65 / L85; mocha and caramel macchiato M70 / L90; espresso NT$40. Another official page (私房 range) gives latte NT$60 and flavoured NT$65 in one size. The old page said "Medium only – NT$65", and the `unicofa-coffee` post says "just one size for NT$60–65". Both are now wrong if the expresso page is current.
- **Branches vs the site:** the site lists Daan (Technology Building exit 1), Dunhua (Zhongxiao Dunhua exit 5), Dunhua 2 (Sun Yat-sen Memorial Hall exit 2) and Fuxing (Nanjing Fuxing exit 5). The likely matches are 辛亥店 (Daan), 安敦店 (Dunhua) and 八德店 (Fuxing or Bade). There is no obvious match for "Dunhua Branch 2" (g.page/unicofa), which may be closed. **Not verified.**
- **To do:** open each Google Maps link in `unicofa-coffee`, and check Facebook unicofacoffee (辛亥) and Instagram @unicofa_coffee_ for posts from 2026.
- **Images on site:** `/media/2020/01/Unicofa-Coffee-1-1024x710.jpg` (used on cheap-coffee), `-2-1024x714`, `-3-1024x671`, `-4-733x1024` and `-4.jpg` (the menu), `-5-816x1024`, `-6-1024x691`, `-7-1024x718`, `-8-828x1024` (cheap-coffee's featuredImage). All under `/media/2020/01/`.

### 4.3 Yolo's Cafe — KEEP, cut to confirmed branches

- **Branches (official list, 2025):** 通安創始店, 忠孝敦化店, 南京敦北店, 芝山店. Drop the "Zhongshan" and "Datong" branch lines from `yolos-cafe` unless Google Maps shows them open.
- **Prices:** **not found** (search budget ran out). The old page's "Medium NT$65 / Large NT$85" must not be reused. Check the in-store menu, foodpanda "YOLO's Cafe (台北總店)" or Facebook.
- **Images on site:** `/media/2019/05/Yolos-Cafe-8-1024x768.jpg` (used on cheap-coffee), `/media/2019/05/Yolos-Cafe-2-e1558953773542-1024x768.jpg` (featured), `/media/2019/05/Yolos-Cafe-3-1024x768.jpg`, `/media/2019/05/Yolos-Cafe-4-1024x768.jpg`, `/media/2019/05/Yolos-Cafe-14-e1558953744476-768x1024.jpg`, `/media/2019/07/Yolos-Cafe-1-1024x768.jpg`, `/media/2019/07/Yolos-Cafe-5-e1561945728567-768x1024.jpg`.

### 4.4 Ray Cafe (RAY CAFE hand Arabica roast coffee / 阿拉比卡手烘咖啡) — KEEP

- **Address:** No. 22, Aly 5, Ln 170, Zhongxiao E Rd Sec 4, Da'an. Zhongxiao Dunhua MRT exit 3 (a short walk, beside Ming Yao department store). Tel 02-2771-1616.
- **Hours (17 Feb 2026 listing, (s)):** Mon–Fri 08:30–17:30, Sat–Sun 10:00–18:00. **The site says weekdays 08:00–18:00.** Fix after checking Google Maps or Facebook.
- **Prices:** reviews say most drinks cost "under NT$100" (P2). The exact latte and Americano prices were not found. The old page said "Small NT$60 / Large NT$80", and `/media/2019/05/Ray-Cafe-Menu.jpg` is the 2019 menu; do not reuse either.
- **Other:** no time limit; indoor and outdoor seats; no toilet (matches the site). Payment (cash, Line Pay, JKoPay) is per the site, not re-checked.
- **Images on site:** `/media/2019/05/Ray-Cafe-4-1024x768.jpg` (used on cheap-coffee and best-coffee-shops-in-taipei), `-1-1024x768`, `-2-1024x768`, `-3-e1558074168664-768x1024`, `Ray-Cafe-Menu.jpg`.

### 4.5 7-Eleven City Café — PROMOTE from honourable mention to a full convenience-store section

- **Classic (official price page, (s); matches CashFeel upd 28 Jul 2026 and baliman 2026):** Americano **M NT$35 / L NT$45 / XL NT$60**; latte **M NT$45 / L NT$55 / XL NT$70**. Hot and iced cost the same. Sizes: M 12 oz (360 ml), L 16 oz (480 ml), XL 22 oz (655 ml); the 8 oz small appears on the size list but no small price was seen.
- **Tiers:**
  - **濃萃 (stronger):** Americano L NT$50 / XL NT$65; latte L NT$60 / XL NT$75.
  - **特選 (Special, selected stores, launched Jun 2025):** Americano L NT$65; latte L NT$80.
  - **CITY PRIMA 精品 (specialty, selected stores; official cityprima page):** Americano S NT$60 / M NT$80 / L NT$100; latte S NT$70 / M NT$90 / L NT$110. CashFeel gives a conflicting PRIMA Americano M NT$60 / L NT$80, so check in store.
  - **不可思議咖啡 (reserve line, 2024):** Americano M NT$70, latte M NT$85. Separate product line.
  - **"CITY PEARL"** seems to be 7-Eleven's bubble-tea or pearl line (citycafe.com.tw/event/17zhenzhu, "我們的珍珠"), **not a coffee tier**. Not verified; leave it out of the coffee table.
- **Own cup:** NT$5 off.
- **Bean claim:** see §1.1. Replace it with something like "a house blend roasted in Taiwan". Do not mention Starbucks except to note the rumour is false.
- **Images on site:** `/media/2019/05/Taipei-Convenience-Stores-2-1024x806.jpg` (used on cheap-coffee and taipei-on-a-budget). On `taipei-convenience-stores`: `/media/2019/05/Taipei-Convenience-Stores-4-1024x706.jpg`, `-6-1024x768.jpg`, plus the 2020 7-Eleven store shots (`/media/2020/03/7-11-Ximen*.jpg`, `7-11-X-*.jpg`, `7-11-Dominos-*.jpg`). None shows a City Café cup or machine (not viewed; inferred from filenames).

### 4.6 FamilyMart Let's Café 全家 — ADD (inside the convenience-store section)

- **Classic (official price page, (s)):** Americano S NT$25 (hot only) / **M NT$35 / L NT$45** / XL NT$60; latte S NT$35 / **M NT$45 / L NT$55** / XL NT$70. NT$5 off with your own cup. **Same prices as 7-Eleven.**
- **Single-origin (單品) range:** cpok.tw lists 單品 Americano M NT$80 / L NT$100 and latte M NT$90 / L NT$110. That looks high and may be Let's Café PLUS pricing. **Single (s); do not publish without checking.**
- **Deals:** standing 2nd cup 79折 on classic large and up and on single-origin (money101, 26 Aug 2026). App 寄杯 bundles (for example, 6 large Americanos for NT$366, early 2026).
- **Images on site:** `/media/2026/08/FamilyMart-Storefront-KitKat-1.jpg` (featured on `taipei-convenience-stores`) and `/media/2020/03/Family-Mart-Daan-*.jpg` / `Family-Mart-Songshan-*.jpg`.

### 4.7 Hi-Life Hi café 萊爾富 and OK Mart OKCAFE — ADD as one line each

- **Hi-Life:** large Americano NT$45 and large latte NT$55 list price (from a Jan 2026 promotion report); 特濃 large Americano NT$55 and latte NT$65 (Apr 2026). **Medium price not found.** The app (Hi-Life VIP, 整買零取) offered buy 30 get 30 on large Americanos, about **NT$23 a cup** (n.yam, 25 Apr 2026).
- **OK Mart:** large 莊園級 Americano NT$45 and latte NT$55 (a **Nov 2022** report; dated). **Medium not found.** 2026 promotions: buy 2 get 2 on large (2 Jan 2026), app 寄杯 under NT$25 a cup (Apr 2026).
- **Images:** none on the site.

### 4.8 Comparison chains (for the price table only)

- **cama café:** 金獎 Americano M NT$65 / L NT$80 / XL NT$95; 金獎 latte M NT$85 / L NT$105 / XL NT$125 (CashFeel, upd 20 Mar 2026; **single (s)**). Delivery-app prices are higher (NT$100–130). Raised black coffee by NT$10 in Feb 2022 (CNA). No image on the site.
- **85°C:** Americano S NT$45 / **M NT$65 / L NT$75** (85cafe.com; the item mapping in the snippet is uncertain); latte **M NT$85 / L NT$100** (baliman 2026, **single (s)**); 鉑金 premium Americano 70 / 90 / 110. No image on the site.
- **Mr. Brown Café 伯朗咖啡館:** Americano **M NT$100 / L NT$115**; latte **M NT$120 / L NT$135** (mrbrown.com.tw, undated). Uber Eats (建國 branch) shows large latte NT$145, so the official pages may be old. The `/media/2019/05/Mr-Brownie-*` images are a different business (`mr-brownie`), so do not use them.
- **Starbucks Taiwan (for comparison):** Americano S NT$85 / **M (Tall) NT$100 / L (Grande) NT$115** / XL (Venti) NT$130; latte S NT$115 / **M NT$125 / L NT$140** / XL NT$155 (starbucks.com.tw product pages; matches the +NT$5 rise of 12 Feb 2025). Customisation charges since 12 Oct 2026. No image on the site.

---

## 5. Claim table (old page vs 2026)

| Claim on `cheap-coffee` | 2026 finding | Action |
|---|---|---|
| Louisa latte M NT$65 / L NT$85 | M NT$80 / L NT$100 (from 6 Jan 2026) | Update |
| Unicofa latte "Medium only NT$65" | Official page: M NT$65 / L NT$85; branches unconfirmed | Update if kept |
| Yolo's latte M NT$65 / L NT$85; "several cafes" | Prices not found; 4 official branches | Re-price on a visit or from the menu; cut branches |
| Ray Cafe latte S NT$60 / L NT$80 | "Under about NT$100"; exact price unknown | Re-price |
| 7-Eleven "uses the same coffee beans as Starbucks" | **False**: Starbucks denial (CNA, 22 Feb 2017); City Café uses its own blend roasted in Taiwan | **Remove** |
| 7-Eleven latte S 35 / M 45 / L 55 / XL 65 | M 45 / L 55 / XL 70 (Americano M35 / L45 / XL60) | Update |
| "Other convenience stores sell coffees for the same price" | True for FamilyMart (identical); Hi-Life and OK large prices also NT$45 / 55 | Keep, with numbers |
| "Buy-one-get-second-half-price deals… must be from the same store you purchased" | Now mostly app 寄杯 (prepaid cups); rules not verified this session | Rewrite after checking §6 |
| "7-Eleven sell probably the cheapest in Taipei" | Tied with FamilyMart at list price; Hi-Life and OK app bundles go cheaper (about NT$23–25 a cup) | Rewrite |

---

## 6. Convenience-store deals: how 寄杯 and promotions work (partly verified)

**Found (s):**
- **寄杯 (prepaid cups)** means buying a bundle of drinks now and collecting them one at a time later. In 2026 it is sold through each chain's app: 7-Eleven **OPEN POINT**, FamilyMart **全家便利商店 app** (My FamiPort / 隨買跨店取), Hi-Life **Hi-Life VIP** (整買零取), the **OK Mart app**, Louisa's app and the 85°C app (85°C "好友日" 寄杯; 2025 promotion 2nd cup 35折, about NT$47 a large on average).
- **Promotion types in 2026:**
  - 買一送一 (buy one get one): Hi-Life National Day, to 13 Oct 2026.
  - 第二杯X折 (2nd cup X% off): FamilyMart 79折, standing.
  - 買N送N bundles: Hi-Life buy 30 get 30; OK Mart buy 2 get 2.
  - 7-Eleven points: CITY CAFE, 30 Sep–10 Nov 2026, 1 OPEN POINT per large and 2 per XL (cpok, (s)).
  - Coffee Day, 1 Oct: buy-one-get-one or "+NT$10 for a second cup" (travel.udn).
- **Own cup:** NT$5 off at 7-Eleven and FamilyMart (official).

**NOT verified this session (search budget exhausted). Needs a follow-up before publishing:**
- Whether the 7-Eleven OPEN POINT and FamilyMart apps can be registered **without a Taiwanese mobile number** (SMS verification). From memory, both have normally required a +886 number, which would shut most tourists out of app 寄杯. **Treat that as unconfirmed.**
- Whether app 寄杯 cups can be collected **at any branch** (believed yes for app 寄杯, unlike the old paper vouchers the page describes). Expiry rules too.
- **EasyCard:** the site's own `taipei-convenience-stores` says you can pay with EasyCard at convenience stores. This was not re-checked for coffee specifically, though EasyCard is widely accepted at all four chains. Whether EasyCard works at Louisa, Unicofa, Yolo's and Ray was not checked. `best-coffee-shops-in-taipei` says EasyCard "works at the big chains but rarely at the specialty ones".
- What a tourist **without** the apps can still get: counter promotions (buy-one-get-one days and 2nd-cup discounts on the in-store poster) usually apply at the till with no app. **Unverified.**

---

## 7. Independent cheap-but-good specialty cafes (Task 4): NOT DONE

No searches were run for this task before the budget ran out. The aim was 3–5 cafes in central Taipei with good coffee for about NT$50–100, each named by at least two independent publishers, with address, MRT and exit, hours, prices and official link.

**Suggested queries for the follow-up:** `平價咖啡 台北 推薦 2026`, `台北 外帶咖啡 美式 50元`, `台北 銅板價 精品咖啡`, `cheap specialty coffee Taipei takeaway`, `台北 咖啡 外帶窗口 平價 拿鐵 80元`, plus checking Nick Kembel (taiwanobsessed), Taiwanderers, Girl on a Zebra, vivianexplore, kuolife and mimigo, the same publisher pool as the hostels research.

**Already on the site and possibly cheap enough** (prices not checked): Ray Cafe (above); `coffee-alley`, `campus-cafe`, `yaboo-cafe`, `coffee-lovers-planet` (now in a mall, probably not cheap). Their images exist (see `content/posts.json`).

---

## 8. Still to do (in priority order)

1. **Task 4**: find and verify 3–5 independent cheap specialty cafes (§7).
2. **Tourist app access** for OPEN POINT and FamilyMart (Taiwan phone number?) and 寄杯 redemption rules (§6).
3. **Unicofa:** Google Maps status for each of the site's 4 links and for 辛亥, 八德 and 安敦. If none is open to the public, drop it from the list (keep the post but mark it, or redirect).
4. **Yolo's and Ray Cafe prices** (in-store menu, Facebook or foodpanda).
5. **Open the official pages** (citycafe.com.tw/price.aspx, family.com.tw Let's Café price page, starbucks.com.tw, mrbrown.com.tw, 85cafe.com, camacafe.com, unicofacoffee.com/expresso.html) to replace the (s) marks, and get Hi-Life and OK Mart **medium** list prices.
6. Louisa large sizes from an official or in-store menu, and settle the TVBS vs CNA conflict on 莊園 prices.

---

## 9. Recommended line-up (draft)

| Order | Venue | Keep / drop / add | One line |
|---|---|---|---|
| 1 | **Convenience stores: 7-Eleven City Café and FamilyMart Let's Café** (one section, with Hi-Life and OK Mart as a line) | **Add / promote** from honourable mention | Cheapest decent coffee in the city: NT$35 medium Americano, NT$45 latte, with app bundles down to about NT$23 a cup. Remove the Starbucks-beans claim |
| 2 | **Louisa** | Keep | The default cheap sit-down chain: NT$60 Americano and NT$80 latte (medium) after Jan 2026, with toasties and seats |
| 3 | **Ray Cafe** | Keep (confirm hours and price) | Hand-roasted single-origin coffee by Zhongxiao Dunhua for around NT$100 or less; best quality per dollar on the list |
| 4 | **Unicofa** | Keep **only if** a public branch is confirmed | Golden Cup–winning espresso blend; official menu NT$45 Americano and NT$65 latte, the cheapest chain menu found |
| 5 | **Yolo's Cafe** | Keep (cut to the 4 official branches, re-price) | Cheap and cheerful, with plugs and wifi; Zhongxiao Dunhua and Tong'an branches |
| 6 | 2–3 independent specialty cafes | **Add after Task 4** | Not yet researched |
| – | cama café, 85°C, Mr. Brown, Starbucks | Table only | For comparison: what you save by going cheap |

**Suggested title (if kept):** "Cheap Coffee in Taipei (2026): Convenience Stores, Louisa & More". **Excerpt** must drop "from NT$65" (Louisa's medium latte is now NT$80; the cheapest coffee is NT$35).

---

## 10. Draft price table (hot, list price, NT$, Oct 2026; all (s))

| Chain | Americano M | Americano L | Latte M | Latte L | Source and date | Confidence |
|---|---|---|---|---|---|---|
| 7-Eleven City Café (classic) | 35 | 45 | 45 | 55 | citycafe.com.tw price page (undated); CashFeel upd 28 Jul 2026 | Medium-high |
| FamilyMart Let's Café (classic) | 35 | 45 | 45 | 55 | family.com.tw Let's Café price page (undated); dailydietitian 2026 | Medium-high |
| Hi-Life Hi café | ? | 45 | ? | 55 | Promotion "list price", Jan 2026 report | Low |
| OK Mart OKCAFE (莊園級) | ? | 45 | ? | 55 | TVBS 食尚玩家, Nov 2022 (dated) | Low |
| 7-Eleven CITY PRIMA (selected stores) | 80 | 100 | 90 | 110 | citycafe.com.tw/event/cityprima (CashFeel conflicts) | Medium |
| Unicofa | 45 | 60 | 65 | 85 | unicofacoffee.com/expresso.html (undated) | Low (status unknown) |
| Louisa | 60 | 75 | 80 | 100 | CNA, NOWnews 5–6 Jan 2026 (M); CashFeel 2026 (L) | High (M), medium (L) |
| Ray Cafe | ? | – | ? | ? | "Under about NT$100" (maggieblog) | Low |
| Yolo's Cafe | ? | ? | ? | ? | not found | – |
| 85°C | 65 | 75 | 85 | 100 | 85cafe.com (Americano); baliman 2026 (latte) | Low-medium |
| cama café (金獎) | 65 | 80 | 85 | 105 | CashFeel upd 20 Mar 2026 | Low (single) |
| Mr. Brown Café | 100 | 115 | 120 | 135 | mrbrown.com.tw product pages (undated) | Low-medium |
| Starbucks Taiwan | 100 | 115 | 125 | 140 | starbucks.com.tw product pages; +NT$5 from 12 Feb 2025 (NOWnews) | Medium-high |

Hot and iced are the same price at 7-Eleven and FamilyMart (iced starts at M). Bring your own cup for NT$5 off at both. All prices exclude app or 寄杯 promotions.

---

## 11. Images already on the site, by venue (quick list)

- **Louisa:** /media/2019/07/Louisa-8-1024x768.jpg; /media/2019/06/Louisa-1-859x1024.jpg; /media/2019/06/Louisa-3-1024x768.jpg; /media/2019/06/Louisa-4-1024x768.jpg; /media/2019/06/Louisa-5-1024x762.jpg; /media/2019/08/Louisa-6-983x1024.jpg; /media/2019/12/Louisa-9-786x1024.jpg; /media/2019/12/Louisa-Wrappini-1024x688.jpg; /media/2019/12/Louisa-Wrappini-2-1024x714.jpg
- **Unicofa:** /media/2020/01/Unicofa-Coffee-1-1024x710.jpg; -2-1024x714; -3-1024x671; -4-733x1024; -4.jpg; -5-816x1024; -6-1024x691; -7-1024x718; -8-828x1024
- **Yolo's:** /media/2019/05/Yolos-Cafe-2-e1558953773542-1024x768.jpg; /media/2019/05/Yolos-Cafe-3-1024x768.jpg; /media/2019/05/Yolos-Cafe-4-1024x768.jpg; /media/2019/05/Yolos-Cafe-8-1024x768.jpg; /media/2019/05/Yolos-Cafe-14-e1558953744476-768x1024.jpg; /media/2019/07/Yolos-Cafe-1-1024x768.jpg; /media/2019/07/Yolos-Cafe-5-e1561945728567-768x1024.jpg
- **Ray Cafe:** /media/2019/05/Ray-Cafe-1-1024x768.jpg; -2-1024x768; -3-e1558074168664-768x1024; -4-1024x768; /media/2019/05/Ray-Cafe-Menu.jpg (2019 prices)
- **Convenience stores:** /media/2019/05/Taipei-Convenience-Stores-2-1024x806.jpg (on cheap-coffee); -4-1024x706; -6-1024x768; /media/2026/08/FamilyMart-Storefront-KitKat-1.jpg; /media/2020/03/Family-Mart-Daan-1..4*.jpg; /media/2020/03/Family-Mart-Songshan-1,3,4*.jpg; /media/2020/03/7-11-Ximen*.jpg, 7-11-X-2/3/5*.jpg, 7-11-Dominos-2/4/5/7*.jpg
- **cama, 85°C, Mr. Brown Café, Starbucks, Hi-Life, OK Mart:** none.
