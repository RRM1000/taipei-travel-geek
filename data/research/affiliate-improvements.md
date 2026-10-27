# Affiliate improvements: why sales are low and what to change

Research only. No code or content was changed. Written 27 October 2026.

**Sources:**
- A fresh GA4 and Search Console pull covering **27 Sep to 24 Oct 2026**. It was run with the unchanged `scripts/pull-analytics.mjs` from a scratch directory, so `data/analytics/latest.json` in the repo was not overwritten.
- `content/posts.json` (318 entries), `lib/content.ts`, `app/[slug]/page.tsx`, `app/page.tsx` and `components/*`.
- A mobile (375 px) walk-through on the dev server of the top pages by traffic.
- The London Travel Geek and City Break Geek affiliate code, read only.
- Public programme terms, listed in the sources at the end. Where third-party sources disagree, the report says so.

---

## 1. The short version

1. **Most of the traffic is on very cheap products.** The five biggest pages are about the Airport MRT, EasyCard, the MRT, SIM cards and Ximending. On Klook those products cost about **US$3–5** (EasyCard US$3.00, Airport MRT ticket US$4.79). At a Klook rate of roughly 5%, a booking pays **US$0.15–0.25**. Even a perfect zoo-style conversion rate (7 bookings from 8 clicks) earns pennies on these pages. Clicks on them will not fix revenue. Moving the reader to a **higher-value product** will: an airport transfer, an eSIM, a Fun Pass, a day tour or, above all, a **hotel**.
2. **The money is in hotels, and the hotel links are weak.**
   - The 101 view hotels for New Year's Eve page is the site's best affiliate page: **53 of 137 tracked clicks** from 107 views.
   - The Grand Hyatt's NYE view rooms start at NT$18,000 a night with a 2-night minimum. At 4–5%, one booking pays about **NT$1,500 (~£35)**, the same as roughly 35 Klook attraction bookings.
   - The hotel guides link through Klook hotels. Klook's hotel cookie is reportedly **7 days**, its hotel inventory is thin, and the links are bare hotel names with no button.
3. **Nothing is above the fold, and the point of intent is left unlinked.**
   - On mobile the first affiliate link is **4,500–8,500 px down** the top pages: 5 to 10 screens.
   - Each page's "Quick Verdict" box, about 1,000–1,500 px down, is where the reader decides. On several pages it names the purchase without linking it. EasyCard says "pre-order online for instant pickup". The SIM page says "Buy a data-only eSIM online before you fly". The fireworks page says "Anything bookable sells out. Hotel view rooms…".
4. **Most of the units on the site are generic.** About 130 articles get the same three automatic units:
   - a "Browse Taipei Tours & Activities on Klook" search button
   - a 5-card "Klook deals" iframe (adid 1371607)
   - a Wise button

   They appear whatever the page is about, including restaurant reviews. This is the same pattern that failed with the end-of-post hotel deals widget: 6,206 impressions, 7 clicks, 0 bookings. London removed its generic GetYourGuide city widget for the same reason.
5. **The single most urgent opportunity is time-limited: New Year's Eve.**
   - `/taipei-101-fireworks-new-years-eve/` had **447 views and 0 affiliate clicks** in the window, with 6,033 impressions and position 6.4.
   - It will peak through December.
   - Its link to the NYE hotels page sits at **17,800 px** on mobile, near the bottom.

---

## 2. The data

### 2.1 GA4 affiliate_click events, 27 Sep to 24 Oct 2026

The `affiliate_click` event went live in October 2026 (see the comment in `scripts/pull-analytics.mjs`), so this window is **partial**. Klook iframe widgets are cross-origin, so **their clicks are not in GA4**; they appear only in the Klook dashboard.

**Totals:** 137 `affiliate_click` events from 54 users, against 11,722 page views from 7,713 users. That is **1.2 clicks per 100 views**.

**London benchmark:** 271 clicks per 13,507 views (26 Sep to 23 Oct), or **2.0 per 100**.

| Page | Views (28d) | Affiliate clicks | Users |
|---|---:|---:|---:|
| /taipei-101-view-hotels-new-years-eve/ | 107 | **53** | 9 |
| /aparthotels-serviced-apartments-taipei/ | 101 | 14 | 4 |
| /taiwan-sim-cards/ | 305 | 13 | 8 |
| /hotels-near-taoyuan-airport/ | 62 | 11 | 6 |
| /best-areas-and-hotels-to-stay/ | 51 | 8 | 5 |
| /hotels-in-daan/ | 23 | 7 | 3 |
| /hotels-near-taipei-main-station/ | 66 | 5 | 3 |
| /taiwan-easycard/ | 765 | 4 | 4 |
| /beitou-hot-spring-hotels/ | 39 | 3 | 2 |
| /taiwan-high-speed-rail-hsr-discounts-klook/ | 129 | 3 | 2 |
| /taoyuan-airport-mrt/ | 817 | 3 | 3 |
| /best-hostels-in-taipei/ | 45 | 2 | 2 |
| /hotels-near-taipei-101/ | 46 | 2 | 1 |
| /hotels-near-ximending/ | 73 | 2 | 1 |
| /taipei-101/ | 76 | 2 | 2 |
| 5 others | | 1 each | |

**What the clicks say:**
- **Hotel pages produce 105 of 137 tracked clicks (77%) from about 3% of page views.** Their click rate is around 20 per 100 views, against under 1 per 100 on the practical guides.
- The NYE hotel page's 53 clicks come from 9 users, about 6 each. That is either readers comparing several hotels or the owner testing; it is worth checking.
- The practical guides, which carry about 40% of all views, produce almost no text-link clicks. **EasyCard: 765 views, 4 clicks. Airport MRT: 817 views, 3 clicks. MRT: 530 views, 0 clicks.**
- GA4 cannot yet say *which* link or placement was clicked. The `partner`, `placement`, `hotel` and `link_url` parameters are sent, but they are **not registered as custom dimensions**, so the pull only counts per page. City Break Geek's `scripts/affiliate-clicks.mjs` already reads `customEvent:placement` and the outbound `click` event's `linkUrl`. Taipei needs the same.

### 2.2 Top pages, with what monetises them

The table is from GA4, 27 Sep to 24 Oct. "First link" is the vertical position on a 375×812 mobile screen; the fold is at 812 px.

| # | Page | Views | Search impressions / position | Product-specific units | First affiliate link (mobile) | Clicks |
|---|---|---:|---|---|---|---:|
| 1 | /taoyuan-airport-mrt/ | 817 | 27,312 / 6.4 | MRT ticket widget 625566 ×2, Kuo-Kuang bus widget 636562, 2 text links | 4,511 px | 3 (+ widget clicks not seen) |
| 2 | /taiwan-easycard/ | 765 | 16,423 / 6.1 | 1 text link (EasyCard pickup) | 6,177 px | 4 |
| 3 | / (home) | 541 | — | generic Klook *hotel deals* widget, 5 cards (`app/page.tsx`) | — | 0 |
| 4 | /mrt/ | 530 | — | **none** | 4,480 px (generic search CTA) | 0 |
| 5 | /taipei-101-fireworks-new-years-eve/ | 447 | 6,033 / 6.4 | 1 Klook *search* link ("Taipei 101 New Year") | 3,865 px (generic) | **0** |
| 6 | /taiwan-sim-cards/ | 305 | 3,195 / 14.3 | 4 widgets (638410 ×3, 625042) and 9 product links | 8,500 px | 13 |
| 7 | /ximending/ | 291 | 5,127 imp for "ximending" alone / 10.5 | **none** (internal link to the Ximending hotels guide at 2,104 px) | 8,233 px (generic) | 0 |
| 8 | /taiwan-tourist-tax-refund/ | 280 | 7,969 / 6.1 | none, and little natural fit | 3,889 px (generic) | 0 |
| 9 | /best-districts-and-areas/ | 230 | 3,473 / 6.4 | widget 665385 | — | 1 |
| 10 | /din-tai-fung/ | 230 | — | widget 625152 (Taipei 101) at 19,356 px | 7,738 px (generic) | 0 |
| 11 | /taiwan-visa-entry-requirements/ | 171 | 1,209 / 15.5 | **none** (an insurance fit) | generic only | 0 |
| 12 | /taipei-money-guide/ | 163 | 3,194 / 5.7 | **none in content**, only the auto Wise CTA | generic only | 0 |
| 13 | /taipei-zoo/ | 151 | 7,304 / 8.4 ("taipei zoo" 2,985 imp at pos 10.1) | zoo ticket widget 625213 ×2, the proven converter | 6,599 px | widget only |
| 14 | /maokong-gondola/ | 151 | 3,997 / 8.5 | gondola widget 625211 ×2 | 5,177 px | widget only |

**Decay since the previous window:**
- /mrt/ fell 50% (1,053 to 530 views; position 2.7 to 4.9).
- /taipei-zoo/ fell 36% (237 to 151; position 7.2 to 8.4).

The zoo's drop matters because the zoo widget is the one unit with a proven conversion rate.

### 2.3 Search intents with demand and no product link (GSC, same window)

| Intent | Queries (impressions, position) | Page | Product link today |
|---|---|---|---|
| Airport transfer | "airport line express taipei" 181 (4.5), "…price" 156 (2.6), "taipei airport express" 125, "taipei main station to taoyuan airport fare" 58; plus the page's 27k impressions | /taoyuan-airport-mrt/ | MRT ticket and bus only. **No private transfer**, although the Quick Verdict quotes a NT$1,200–1,900 taxi |
| EasyCard | "easy card" 826 (5.7), "where to buy easycard in taoyuan airport" 89, "where to buy easy card taiwan" 93 | /taiwan-easycard/ | one link at 6,177 px; the Quick Verdict's "pre-order online" is unlinked |
| Taipei 101 tickets | "din tai fung taipei 101" 555, "taipei 101 bar" 39; /taipei-101/ 2,340 imp at position 9 | /taipei-101/, /din-tai-fung/ | yes on /taipei-101/ (widgets 658097, 625152); low traffic |
| NYE | "taipei 101 fireworks" 178, "…2026" 108, "where to watch taipei 101 fireworks" 78 (12 clicks) | fireworks page | search link only |
| Maokong gondola | "maokong gondola map" 118 (1.3) and 7 other map/route queries | /maokong-gondola/ | widget at 5,177 px; the Quick Verdict's day-pass advice is unlinked |
| Zoo | "taipei zoo" 2,986 (10.1), "taipei zoo map" 511 (2.1) | /taipei-zoo/ | widget at 6,599 px; the Quick Verdict mentions the Fun Pass, unlinked |
| THSR | "jadwal kereta thsr taiwan" 251 (2.6); HSR page 6,204 imp at 12.4 | HSR page | 6 widgets, already well covered |
| Day tours (Jiufen/Shifen) | /jiufen/ 188 imp at 16.2; /best-day-trips-from-taipei/ 183 at 19 | | covered, but pages barely rank: an SEO problem, not a link problem |
| Hot spring day passes | /taipei-hot-springs/ 25 views; /xinbeitou/ 31; the Xinbeitou walk 0 | | thin traffic; low priority |

---

## 3. Inventory of every affiliate surface

| # | Surface (file) | Where / how many pages | What it is | Click data | Fits page intent? |
|---|---|---|---|---|---|
| 1 | **Left rail "Klook deals"** (`components/LeftSidebar.tsx`, `KlookSidebarWidget` adid **1371607**, 5 cards) | every article and page via `app/[slug]/page.tsx`, ~318 URLs, **desktop only** | Klook static iframe: Taipei 101, EasyCard, Yehliu/Jiufen tour, Maokong, Fun Pass | iframe, so none in GA4; check adid 1371607 in Klook | Generic. Same cards on a burger review as on the zoo page. On mobile the rail is hidden, **but the iframe still loads** (seen at h=0 on /maokong-gondola/), costing weight for nothing |
| 2 | **Left rail Wise card** (`components/WiseAffiliate.tsx`) | same ~318 pages, desktop | Wise **personal invite** link (`wise.com/invite/ecac/...`) | placement `sidebar`; no per-partner breakdown yet | Weak. Money pages only |
| 3 | `components/ArticleSidebar.tsx` (Klook 1371607 ×6 and Wise) | **unused**: not imported anywhere | | | dead code |
| 4 | **Mobile in-post Klook widget** (`enhanceMobileKlookWidget`, `lib/content.ts:1268`, adid 1371607 ×3) | **132 posts** (those with ≥3 H2s), at about the H2 one-third of the way down; hidden by CSS on desktop | same generic 5-card iframe, 756 px tall on mobile | iframe | Generic. On product pages it competes with the real product widget: on the SIM page it sits 600 px below the eSIM widget and shows a zoo ticket |
| 5 | **Inline generic Klook CTA** (`enhanceInlineAffiliateCTAs`, `INLINE_KLOOK_CTA`) | **128 posts** (≥2 H2s and no hand-placed `article-klook-cta`), before the 2nd H2 | red offset-shadow button "Browse Taipei Tours & Activities on Klook" linking to `klook.com/search?query=Taipei` | placement `inline_cta`; per-link unknown until dimensions are registered | Generic search. On /din-tai-fung/, /ximending/ and /taiwan-tourist-tax-refund/ it reads as an ad break |
| 6 | **Inline Wise CTA** (`INLINE_WISE_CTA`) | **123 posts** (≥4 H2s, no wise.com in content), about 65% down | button "Get the Real Exchange Rate with Wise" | placement `inline_cta` | Fits the money guide, tax refund and SIM pages. Noise on restaurants and attractions |
| 7 | **Hand-placed Klook product widgets** (`<ins class="klk-aff-widget" data-adid=…>` in posts.json) | **37 posts, 75 widgets, 51 distinct adids**. Main ones: airport MRT 625566/636562, SIM 638410/625042, HSR 626293/642077-9/635741, zoo 625213, Maokong 625211, Taipei 101 658097/625152, Fun Pass 628081/625237, day trips 6334xx, Jiufen 1372054 | product-specific iframes | iframe; the zoo's 625213 gave 8 clicks and 7 bookings (from the brief) | **Yes**, the right format, but always well below the fold |
| 8 | **Klook product text links in the body** | 59 posts, 596 links (390 of them hotel links) | deep links with `aid=8733` | placement `body`, `heading` or `table` | Mostly yes |
| 9 | **Hotel guide links** (`data-hotel="<key>"`) | **11 posts, 390 tagged links**: Main Station, Ximending, 101, Beitou, Zhongshan, Taoyuan airport, Daan, aparthotels, hostels, NYE 101 view, pools | Klook `hotels/detail/<id>` links on the **hotel name** (H3 heading and table cell). No "check price" button | **105 of 137 tracked clicks** | Yes, the strongest intent on the site |
| 10 | **`/best-areas-and-hotels-to-stay/`** | 1 post, **75 Klook hotel links with no `data-hotel` attribute**, anchor text "Klook", "One", "Two", "Three" | | 8 clicks | Fits, but **these 75 links will be missed by the planned Agoda switch** |
| 11 | **Quick Verdict boxes** (`.quick-verdict`, tracked as placement `quick_verdict`) | most rewritten guides | editorial summary about 1,000–1,500 px down on mobile | the hotel guides link hotel names here | The best placement on the site, and **unlinked on the practical guides** |
| 12 | **Homepage "Taipei hotel deals"** (`app/page.tsx:223`) | home, 541 views, 3.5 s engaged per session | Klook `deals_widget`, `data-total="5"`: the **same generic hotel format that was removed from posts for 0 bookings** | iframe | No. The main page-weight source flagged in the visual-polish report |
| 13 | `renderHotelDealsWidget()` (`lib/content.ts:540`) | not called (removed Sept 2026) | | 6,206 impressions, 7 clicks, 0 bookings | — |
| 14 | `enhanceKlookDealsWidget` (`[KlookDealsWidget]` placeholder) | **0 posts use it**; still runs on every request | hand-built 3-card Klook grid | — | dead code |
| 15 | `AffiliateDisclosure` | every post with an affiliate host | text above the body | — | Good; keep |
| 16 | `KlookAffiliate.tsx` | every article and the home page | client script: adds `aid=8733`, loads Klook's `fetch-iframe-init.js` | — | infrastructure |
| 17 | **Walk pages** (8 walks, `lib/walks.ts`, `WalkRouteMap`) | 8 posts | **no affiliate content of their own**, only the auto units | 0 | correct, since walks are free; the Xinbeitou walk could carry a hot-spring day pass |
| 18 | Tracking (`app/layout.tsx:69`, `lib/affiliates.ts`) | site-wide | `affiliate_click` with partner, placement, hotel, link_text, link_url | parameters **not registered** in GA4 | — |

`AFFILIATE_HOSTS` includes `kkday.com`, `agoda.com`, `booking.com`, `trip.com` and `getyourguide.com`, but **no content links to any of them yet**. The four `trip.com` hits in posts are `taiwantrip.com.tw` bus timetables, which are not affiliate links. There is also **no CJ host** (`anrdoezrs.net` and others) or **Stay22 host** in `AFFILIATE_HOSTS`. Clicks on those links would not be tracked or tagged `sponsored` when they are added.

---

## 4. The reader's-eye walk-through (mobile, 375 px)

**Common to every page:**
- The hero image, tags, disclosure and contents box push the first H2 down to **2,560–3,990 px**.
- The Quick Verdict sits at about 1,000–1,500 px, and it is the only decision point a typical reader reaches. By engaged time (24–71 s per session) most readers see the hero, the verdict and perhaps one section.
- **No affiliate link sits above the fold on any of the pages checked.**

**Page by page:**

- **/taoyuan-airport-mrt/** (817 views)
  - The Quick Verdict compares the express train, commuter train, Kuo-Kuang bus and taxi. None is linked.
  - The first link is a text link and the ticket widget at 4,511 px. The widget is good: it shows the MRT ticket at US$4.79 with 22,725 reviews, and an EasyCard.
  - **There is no private-transfer or taxi product**, though it is the highest-value option and the verdict names it.
- **/taiwan-easycard/** (765 views)
  - The verdict says "or pre-order online for instant pickup" with no link.
  - The only product link is at 6,177 px.
  - The comparison table (EasyCard vs TPASS vs Fun Pass) links nothing, although the Fun Pass at about US$35 is the one higher-value product on the page.
- **/mrt/** (530 views)
  - No product link at all. The verdict recommends an EasyCard and points readers with bigger plans to "Get a physical EasyCard", unlinked.
  - It is a natural home for the Metro day pass, EasyCard and Fun Pass.
- **/taipei-101-fireworks-new-years-eve/** (447 views, rising into December)
  - The verdict says "Anything bookable sells out. Hotel view rooms… bar tickets from October". Neither is linked.
  - The only product link is a **Klook search** ("Taipei 101 New Year") at 12,987 px.
  - The NYE view hotels guide, the best page on the site for clicks, is linked at **17,825 px**.
- **/taiwan-sim-cards/** (305 views)
  - The verdict says "Buy a data-only eSIM online before you fly", unlinked.
  - The first product link is at 8,500 px.
  - The page is 43,000 px tall with four Klook widgets and the generic deals widget.
  - The product links are good: "Data-Only eSIM – Cheapest" and Chunghwa.
- **/ximending/** (291 views): no products. The hotel guide link high on the page is the right move. Food and night tours (Klook or KKday) would fit.
- **/taipei-zoo/**: the proven zoo widget is first at 6,599 px. The verdict mentions "Free with the Taipei Fun Pass" without a link.
- **/maokong-gondola/**: the widget is at 5,177 px. The verdict's "NT$300 day pass" advice is unlinked.
- **/din-tai-fung/**: the relevant product, the Taipei 101 widget (Din Tai Fung's best-known branch is in Taipei 101), is at 19,356 px. Above it are a generic Klook button and the generic 5-card widget.
- **Hotel guides** (e.g. NYE view hotels):
  - Each hotel is an H3 whose title is the link, followed by a paragraph and a 2-image gallery.
  - There is **no visible "Check rates" button**. A reader has to guess that the heading is a booking link.
  - London's `ListHotels` and `AreaHotels` cards and City Break Geek's `data-stay-strip` both use an explicit labelled button with an "ad" tag.

**Trust and appearance:**
- The Klook iframes look like Klook: orange "29% OFF" tags, USD prices and review counts. They read as ads, but credible ones with ratings and prices.
- The site's own CTAs (red offset-shadow, uppercase, "BROWSE TAIPEI TOURS & ACTIVITIES ON KLOOK") look like banner ads and lead to a generic search page, so they are the most ignorable unit on the page.

**Broken or slow:**
- No empty iframes or broken widgets were found on the pages checked. All `ins` elements rendered an iframe.
- On the dev server the iframes took **5–7 seconds** to appear.
- Every mobile article loads at least one hidden Klook iframe: the left rail's 1371607 at height 0.
- The homepage loads the 5-card hotel deals widget, which is the main page-weight cost noted in `visual-polish-vs-city-break-geek.md`.

---

## 5. What's working and what isn't

**Working:**
- **Product-specific widgets beside a specific intent.** The zoo ticket got 8 clicks and 7 bookings. On the airport MRT page, the MRT ticket widget is a clean, credible unit.
- **Hotel pages.** 77% of tracked clicks. The NYE hotel guide earns despite having no buttons.
- **The SIM page**, which produces about 40% of Klook clicks. eSIMs are reportedly one of Klook's highest-commission categories: Involve Asia lists Klook eSIM at **20%**. Verify this in the Klook dashboard.
- **Tracking groundwork:** `affiliate_click` with placement and hotel parameters, and `data-hotel` keys ready for a network switch.

**Not working:**
- **Generic units:** left rail 1371607, mobile in-post 1371607, the generic Klook search CTA, and the homepage hotel deals widget. They take most of the affiliate space on 120–318 pages each, and the one generic unit with measured results converted at 0%.
- **Product value.** The top traffic sits on US$3–5 tickets. Without a higher-value product beside them, these pages cannot earn meaningfully.
- **Placement.** Everything is 5–10 mobile screens down, after the reader has got their answer.
- **Hotel programme.**
  - Klook hotels has a reported 7-day hotel cookie and less inventory and brand trust for Western readers than Booking or Agoda.
  - The links are bare names, and `best-areas-and-hotels-to-stay` (75 links) lacks `data-hotel`.
  - Hotel guides rank poorly (hotels near 101 at position 35, Main Station at 29, Ximending at 21), so they need traffic from the big pages, which currently barely link to them.
- **Measurement.** Without the GA4 custom dimensions and Klook's per-adid report, the click total cannot be split by placement or link.

---

## 6. Programme fit by content type

Rates are from public listings. Third-party sources disagree, so confirm each in the network dashboard before relying on it.

| Content type | Best fit now | Why | Public terms |
|---|---|---|---|
| **Attraction tickets** (zoo, Maokong, 101, Fun Pass, museums) | **Klook**, keep. Add **KKday** as a price check | Klook and KKday dominate Taiwan inventory. GetYourGuide's Taipei catalogue is thinner, and many listings are resold Klook/KKday products | Klook: about 2–5% base on attractions (Ecomobi), 5% attractions / 6.5% tours (Involve Asia); **30-day cookie**. KKday: about 3.2–5%, 30-day cookie; **Taiwan-originated conversions can pay only 3.5%** (Involve Asia) |
| **Day tours** (Jiufen/Shifen/Yehliu, Taroko, Sun Moon Lake) | **Klook**, plus **KKday** where cheaper. **GetYourGuide** as a second option for Western readers | Highest order value on the site (US$20–60 a head, often 2+ people). GYG pays the most | GYG: **8%** base, 30–31-day cookie (no commission on app bookings). Klook tours about 5–6.5% |
| **Hotels** | **Stay22 now** (Booking.com and Agoda in one link). Then **Agoda direct** once approved. Hotels.com via CJ as a fallback | Agoda is the strongest OTA in Asia. Booking is the most trusted by Western readers. Stay22 gives both today without waiting for approval | Stay22 shares about 30–44% of the OTA commission, with a 24-hour cookie on Booking (blog reports). Agoda: about 4–7%, **session-based cookie** (reports conflict). Hotels.com/CJ: up to 4% base, 7-day cookie (Affilimate). Klook hotels: ~5%, **7-day cookie** |
| **SIM / eSIM** | **Klook eSIM**, if the 20% rate is confirmed for this account. Otherwise add **Airalo** as the "global eSIM" alternative | The site already ranks for this intent and the page converts | Airalo: about 8–12%, 30-day cookie |
| **Airport transfer** | **Klook private transfer** (TPE to the city), or KKday | About 10× the value of an MRT ticket. The page already discusses taxis | Klook transport ~5% |
| **Transport passes / THSR** | **Klook**: THSR discount tickets, EasyCard pickup, Fun Pass, Metro pass | Already in place on the HSR page; extend to MRT and EasyCard | as Klook |
| **Insurance** | **SafetyWing** | Fits the visa, essentials and money pages; long cookie | SafetyWing (official page): about **10% of premium**, **364-day** window, recurring for monthly policies |
| **Money** | **Wise**. Consider moving from the personal invite link to the **Wise affiliate programme (Partnerize)** | The invite link pays a capped referral reward. Partnerize pays a CPA per new customer with **no cookie limit** | Wise: about £10 per qualifying user on the in-app referral (30-day window); Partnerize rate set in the dashboard |
| **Food / restaurant reviews** | **Nothing**, or a food tour only where the article is about a night market | London and City Break Geek's rule is "only link where there is a ticket to sell", and it holds here | — |

---

## 6a. Is GetYourGuide worth adding?

**Recommendation: yes, but narrowly.** Use GYG as a second programme for **guided day tours, private-car tours, food tours and cooking classes**, where its listings are credible and its 8% on US$40–230 orders pays well. **Don't** use it for tickets, passes, transport or SIMs: the zoo, Maokong, Taipei 101, EasyCard, the Airport MRT and eSIMs. For those, Klook is the same price or cheaper and has 20–40 times the reviews. Klook stays the default.

### Inventory: a sample taken on 27 October 2026

The sample uses GYG's Taipei City page (`/taipei-city-l190/`, **255 activities**) and Klook prices as shown in the site's own Klook widgets on the dev server. KKday prices come from its listings via search. Prices are "from" prices in USD.

| Product the traffic wants | GetYourGuide | Klook | KKday | Verdict |
|---|---|---|---|---|
| Yehliu + Jiufen + Shifen shared day tour | from **$39–45** (top listing 4.6★, 2,627 reviews); $80 with sky lantern (1,041) | from **$19.50** (4.9★, **50,339 reviews**, 51% off tag) | from about **$21–27** (4.7★, ~15,700 reviews) | **Klook/KKday.** GYG is about twice the price for the same bus tour |
| Private-car Jiufen/northern Taiwan day | $111–231 per group (4.9–5★, 244–470 reviews) | available (not sampled) | about $84–108 per car (one charter at 4.77★, 7,000+ reviews) | **GYG is competitive** for Western readers who want an English-speaking guide |
| Taipei 101 observatory | $18 (1,039 reviews); priority pass $48; Skyline 460 $92 | **$17.75 (41,814 reviews)** | similar | **Klook** |
| Maokong gondola | about $12–16 for a day pass; zoo + gondola combo listed | **$9.25** (11,804 reviews) | similar | **Klook** |
| Taipei Zoo | entrance ticket listed (about $4–20 by snapshot) | widget 625213 (**7 bookings from 8 clicks**) | listed | **Klook.** The ticket is NT$100 (about $3) at the gate either way |
| Hot springs | Beitou Hot Spring Museum (a free museum) from about $6; Beitou day tours from about $81 | day passes and spa packages | strong | Klook/KKday; GYG only for guided tours |
| Food tours / cooking classes | **strong**: Top 10 food tour $45 (718 reviews); night market tour $55 (4.9★, 238); first-day food tour $70; cooking class $82–90 | some | some | **GYG**: good English-language small-group inventory |
| Sun Moon Lake | 12-hour day tour from Taipei, $90 (237 reviews); private from $350 per group | cheaper shared coaches | cheaper shared coaches | Klook/KKday for budget readers, GYG for private |
| Taroko | private tour from Taipei **$185** (4.9★, 100 reviews); from Hualien $165–300 | shared tours, cheaper | shared tours | GYG for private tours |
| Airport transfer | TPE private transfer **$45 per group of up to 3** (4.6★, 199 reviews) | private transfers | private transfers | price check needed. GYG is a credible option here |
| eSIM | one new listing from $6 | strong (and possibly 20% commission) | strong | **Klook** |

**GYG's search fails on Taipei.** A search for `getyourguide.com/s/?q=Taipei` returned **Crete** results. This is the same failure London found: in `london-travel-geek/scripts/lib/affiliate.mjs`, GYG search "NEVER returns nothing". **Only link GYG product pages (`/activity/-t<id>`), never searches.**

### Commission, cookie and payout terms (public, unverified)

- **8% base** on completed experiences. Some markets are listed at 7%, and top affiliates negotiate 10–12%.
- **30–31-day cookie.**
- **No commission on bookings made in the GYG mobile app.**
- Paid monthly. PayPal has no threshold; bank transfer needs $50 or more.
- Commission is earned after the activity takes place, so cancellations do not pay.

Compare Klook: about 5% on attractions and 5–6.5% on tours, 30-day cookie (7 days on hotels). **Per booking, GYG pays more**: 8% × $45 = $3.60, against 5% × $19.50 = $0.98 on Klook's equivalent tour. But a price-aware reader is less likely to book the dearer listing. **Per click**, the gap closes or reverses on commodity tours.

### Audience

**The analytics cannot answer this yet.** The pull (`scripts/pull-analytics.mjs`) records no country dimension, and there is no GA4 geography export in `data/analytics/`.

What can be said:
- 99% of the top-300 query impressions are in English. That covers the US, UK, Europe and Australia, but also Singapore, Malaysia, the Philippines, India and Hong Kong.
- The one large non-English query is Indonesian ("jadwal kereta thsr taiwan", 251 impressions).
- Taipei's practical, budget-transport traffic (MRT, EasyCard, SIM, tax refund) suggests a sizeable Asian audience, and that is Klook and KKday territory. GYG converts best with European and North American bookers.

**Owner check (2 minutes):** GA4 > Reports > User attributes > Demographic details > Country, for the last 28 days.
- If **Europe plus North America plus Oceania is more than about 50% of users**, GYG on the tour pages is clearly worth it.
- If it is under about 30%, keep GYG to the food and private tours only.

### How the owner already uses GYG

- **One partner ID, `WWP7I0R`, is already used on two sites.** It is hard-coded in `london-travel-geek/scripts/lib/affiliate.mjs` (`GYG_PARTNER_ID`) and set as `gygPartnerId` in `europe-travel-geek/site.config.mjs`.
- **Links are separated by campaign rather than by ID.** `gygTourUrl()` adds `&cmp=<guide>-activity`, so each sale appears as its own row in GYG's Campaigns report.
- London's rule, documented in its `affiliate.mjs`, is "only link where there is a ticket to sell" and "a verified product page beats a search". Hand-verified tour IDs live in `data/gyg-tours.json` (London) and `data/cities/<city>/gyg-tours.json` (City Break Geek).
- City Break Geek's `scripts/balance-gyg-widgets.mjs` caps inline widgets per page. London replaced GYG's generic city iframe with its own `SidebarActivities` card: the iframe was generic, cropped, and GYG's script strips `rel="sponsored"`, which London restores with a MutationObserver in `BaseLayout.astro`.
- **Reuse:** the same `WWP7I0R` and the same `-t<id>?partner_id=…&cmp=…` link format work for Taipei. `getyourguide.com` is already in Taipei's `AFFILIATE_HOSTS`, so the links would get `rel="sponsored"` and `affiliate_click` tracking with no code change. **Use plain links or a site-built card, not GYG's iframe widget**, which brings back both the iframe weight and the `rel` stripping.

### Pages and placements that suit GYG

| Page | Views (28d) | Placement | GYG product |
|---|---:|---|---|
| `/the-best-guided-tours-in-taipei/` | 7 (ranks at 19.5) | add one GYG line beside the Klook widgets | food tour (Top 10 Taiwan Food), Old Town walking tour |
| `/best-day-trips-from-taipei/`, `/jiufen/` | 32, 25 | in each tour section, a "Prefer a private car?" line | private northern Taiwan car tour ($111), private Jiufen/Pingxi ($119) |
| `/taroko-national-park/` | 36 | where the page discusses getting there from Taipei | Taroko private tour ($185) |
| `/sun-moon-lake/` | 9 | as for Taroko | Sun Moon Lake day tour ($90) |
| `/michelin-food-stands-at-night-markets/`, `/shilin-night-market/`, `/raohe-night-market-foody-heaven/`, `/taipei-food-guide/` | 119, 37, 39, 38 | one line near the top: "Want a guide? Night market food tour" | night market food tour ($55), cooking class ($82–90) |
| `/taipei-nightlife/`, `/best-bars-in-taipei/` | 40, 90 | one line | pub crawl ($30) |
| `/taoyuan-airport-mrt/` | 817 | **only if** a price check shows GYG's $45 transfer is cheaper than Klook's | TPE private transfer |

That is about 300 views a month of well-matched pages today. **GYG is a small earner until the tour pages rank better.** This is why it ranks below the NYE, Quick Verdict and hotel work in the action list.

### The risk of too many programmes

- **Reader trust:** two "book" links side by side for the same tour at $19.50 and $45 make the site look careless. Rule: **one programme per product.** Choose the cheapest credible listing, and use GYG only where it is the better product (private, food, English-guided).
- **Diluted volume:** Klook and KKday tiers and bonuses reward volume. Splitting tour clicks three ways can cost a tier on Klook. At today's volume (tens of bookings a month) that is not a real concern, but it argues against moving *existing* Klook tour links to GYG.
- **Maintenance:** each programme adds a link format, a dashboard, a payout threshold and dead-product checks. Keep it manageable with **one product map per page** (slug to `{network, productId}`, the London `gyg-tours.json` pattern extended with a `network` field). This is the same map recommended in B2.
- **Suggested limit:** Klook (default), Stay22 then Agoda (hotels), and GYG (private, food and English-guided tours only), plus single-purpose links for Wise, SafetyWing and possibly Airalo. **Defer KKday** unless a price check shows it beating Klook on the airport transfer or the hot spring passes. Its Taiwan-origin rate may be only 3.5%, and its catalogue overlaps Klook's.

### Owner steps for GYG

1. **Reuse the existing partner ID `WWP7I0R`.** In the GYG Partner Portal, add **taipeitravelgeek.com** as a website or property on the same account, so the traffic source is declared. GYG's terms usually require each promoting site to be listed. Check the portal; if it insists on a separate partner per site, create one and use that ID.
2. **Check the audience split** in GA4 (Country report, above).
3. **Pick and verify about 8–10 product IDs**: 2 food tours, 1 cooking class, 2 private northern-Taiwan tours, Taroko private, Sun Moon Lake, the pub crawl, and possibly the TPE transfer. Record them in a Taipei `gyg-tours.json`-style map.
4. **Tag every link with `cmp=taipei-<page>`** so GYG's Campaigns report splits Taipei from London and City Break Geek under the same ID.
5. **Don't use GYG search links or the GYG city iframe widget** on this site.
6. Review after 60 days. If GYG's campaign report shows fewer than about 5 bookings, drop it and keep Klook only.

---

## 7. Prioritised actions

Impact is a rough guide to the extra commission per month, assuming current traffic and today's numbers (Klook ≈ £1 a booking).

### Quick wins (days, mostly content)

| # | Action | Expected impact | Effort | Pages / files | Owner, outside the code |
|---|---|---|---|---|---|
| **Q1** | **NYE push, now through 31 Dec.** On the fireworks page, put a link to `/taipei-101-view-hotels-new-years-eve/` and a specific NYE product into the **Quick Verdict** ("Anything bookable sells out…"). The product could be Klook's CE LA VI NYE party (activity 133103, already used on the hotel page) or the 101 NYE packages. Replace the `query=Taipei 101 New Year` search link with product links | **High and seasonal.** The page takes 447 views a month now and will rise in December. One extra view-hotel booking (~£35) equals the site's normal monthly Klook take | 1 hr | `content/posts.json`: `taipei-101-fireworks-new-years-eve`, `taipei-101-view-hotels-new-years-eve` | Check in Klook and KKday which NYE bar, party and dinner products are live for 2026/27 |
| **Q2** | **Link the Quick Verdict on the six biggest guides**, with one product-specific link each, placement `quick_verdict`: EasyCard ("pre-order online" to EasyCard pickup, plus the Fun Pass); SIM ("buy a data-only eSIM" to the Klook eSIM); Airport MRT (MRT ticket **and a private transfer** on the taxi line); MRT (Metro day pass, Fun Pass); zoo ("Free with the Fun Pass" to the Fun Pass, plus the zoo ticket); Maokong (gondola ticket) | **Medium-high.** Moves the first link from 4,500–8,500 px to about 1,200 px on pages with 2,900 views a month | 2–3 hrs | posts.json: `taiwan-easycard`, `taiwan-sim-cards`, `taoyuan-airport-mrt`, `mrt`, `taipei-zoo`, `maokong-gondola` | Create Klook deep links for the transfer and Fun Pass products. Optionally make **single-product widgets** like the zoo's 625213 for the eSIM, airport transfer and Fun Pass |
| **Q3** | **Register the GA4 custom dimensions** `partner`, `placement`, `hotel` and `link_url` (event-scoped), then extend the pull to report by placement and link, as City Break Geek's `scripts/affiliate-clicks.mjs` does | Measurement for every later decision | 15 min (owner) plus a small script change | GA4 Admin > Custom definitions; `scripts/pull-analytics.mjs` | **Owner:** register the dimensions. **Also export Klook's report by adid** for Sept–Oct, especially **1371607**, so the generic widget's real results are known |
| **Q4** | **Remove the homepage hotel deals widget** (`deals_widget`, 5 cards). Replace it with plain links to the hotel guides ("Where to stay: by area / near the MRT / NYE view rooms") | Low revenue cost (same format: 0 bookings). Cuts the biggest homepage weight; better hotel-guide traffic | 30 min | `app/page.tsx:223-249` | — |
| **Q5** | **Add an explicit button under each hotel in the 13 hotel guides**, e.g. "Check prices and availability →" plus a small "ad" tag, to the same `data-hotel` URL. Keep the name links | **Medium-high.** These pages already take 77% of clicks; a visible CTA usually lifts hotel-list click-through substantially | 2–4 hrs (script over the `add-*.mjs` generators or posts.json) | `scripts/add-hotels-*.mjs`, `add-*-hotels*.mjs`, posts.json | — |
| **Q6** | **Tag the 75 hotel links on `/best-areas-and-hotels-to-stay/` with `data-hotel`** and replace the anchor text "One / Two / Three / Klook" with hotel names | Protects the Agoda switch; better click-through | 1–2 hrs | posts.json `best-areas-and-hotels-to-stay` | — |
| **Q7** | **Add a hotel-guide cross-link high on the big area and transport pages**: airport MRT to hotels near Main Station and Taoyuan airport; MRT and EasyCard to the "where to stay" hub; fireworks to the NYE hotels page (Q1); Ximending already does this | Medium. Feeds the high-converting hotel pages, which rank poorly on their own | 1 hr | posts.json | — |

### Bigger changes (weeks, code and programmes)

| # | Action | Expected impact | Effort | Pages / files | Owner, outside the code |
|---|---|---|---|---|---|
| **B1** | **Move the hotel guides to Stay22 now, then to Agoda direct when approved.** Build a `data-hotel` to URL map (like London's `HOTEL_PROGRAMMES` / `hotelAffiliate()` in `london-travel-geek/scripts/lib/affiliate.mjs`), so one switch re-points all 390+75 links. Add the Stay22 and CJ hosts to `AFFILIATE_HOSTS` | **Highest long-term.** Hotels are the only large commissions available. Booking/Agoda inventory and trust should convert better than Klook hotels with their 7-day cookie | 1–2 days | new `lib/hotels.ts` (map), `lib/affiliates.ts`, `enhanceAffiliateLinks` in `lib/content.ts`, the 13 hotel posts | **Decide:** Stay22 now, or wait for Agoda. Chase the Agoda approval. Get the Stay22 Allez/deep-link format and partner id. Optionally test a **Stay22 map** on the area guides |
| **B2** | **Replace the generic auto-units with page-specific ones.** Swap `INLINE_KLOOK_CTA` and `IN_POST_KLOOK_WIDGET` for a slug-to-product map (the London `gyg-tours.json` pattern): show a page's own product, or **nothing**. Keep the 1371607 "deals" set only on "things to do" and itinerary pages. Limit the Wise CTA to money, SIM, tax-refund, essentials and arrival pages. Stop rendering the left-rail iframe below 880 px | Medium. Removes noise that teaches readers to ignore the red buttons, makes room for real products, and cuts a hidden iframe from every mobile article | 1–2 days | `lib/content.ts` (`enhanceInlineAffiliateCTAs`, `enhanceMobileKlookWidget`), `components/LeftSidebar.tsx`, `KlookSidebarWidget.tsx`; delete the dead `ArticleSidebar.tsx` and `enhanceKlookDealsWidget` | Check the Klook adid report (Q3) first, so the cut is evidence-based |
| **B3** | **KKday price check first, and apply only if it wins** (see the programme-count note in §6a). Compare prices on airport transfers, Jiufen/Shifen/Yehliu tours, THSR and the hot-spring day passes. Link whichever is cheaper or better-rated per product | Medium on tours and transfers; also a reader-trust win | half a day (owner) plus links | `the-best-guided-tours-in-taipei`, `best-day-trips-from-taipei`, `jiufen`, `taroko-national-park`, `taipei-hot-springs`, `taoyuan-airport-mrt` | **Apply to KKday** (via Involve Asia, FlexOffers or direct). Note the possible 3.5% rate for Taiwan-originated conversions |
| **B4** | **eSIM programme check.** Confirm Klook's eSIM rate for aid 8733. If it is the reported 20%, keep Klook and make the eSIM the page's first recommendation. If it is about 5%, add **Airalo** (about 10%) as a named alternative | Medium. The SIM page is the busiest product page | 2 hrs | `taiwan-sim-cards`; also a short "get an eSIM" line in `taoyuan-airport-mrt` and `taipei-guide` | Check the Klook rate card; **apply to Airalo** if needed |
| **B5** | **Insurance.** Add one SafetyWing line where it is a natural fit: the visa page (171 views), essentials and the first-time guide | Low to medium; long 364-day cookie and recurring payments | 1 hr | `taiwan-visa-entry-requirements`, `taipei-essentials-guide`, `taipei-guide` | **Apply to SafetyWing** (Ambassador) |
| **B6** | **Wise.** Move from the personal invite link (`components/WiseAffiliate.tsx`, `INLINE_WISE_CTA`) to the Wise affiliate programme on Partnerize | Low to medium; no cookie limit | 30 min after approval | the two files above | **Apply to the Wise affiliate programme** (Partnerize) |
| **B7** | **Win back the zoo ranking.** "taipei zoo" gets 2,986 impressions at position 10.1, and the page fell 36%. It carries the only proven-converting widget, so a move to the top 5 would multiply real bookings | Medium; a content and SEO task | 1 day | `taipei-zoo` | — |
| **B8** | **GetYourGuide, narrow use** (see §6a): verified product links only, for food tours, cooking classes, private northern-Taiwan, Taroko and Sun Moon Lake tours, and the pub crawl. No tickets, passes, transport or search links | Low to medium (about 300 well-matched views a month today; 8% on $45–230 orders) | half a day | day-trip, tour, night-market and nightlife pages listed in §6a | Add taipeitravelgeek.com to the existing **`WWP7I0R`** account; pick 8–10 product IDs; tag links with `cmp=taipei-<page>`; check the GA4 country split |

### What not to do
- Don't add affiliate units to restaurant reviews, walks or free sights. This is the London and City Break Geek "only link where there is a ticket to sell" rule.
- Don't bring back the generic end-of-post hotel deals widget or any city-wide "deals" box. The data already shows 0 bookings.
- Don't add more widgets to the HSR or SIM pages. They have plenty; what they lack is a link at the point of decision.

---

## 8. Decisions and sign-ups for the owner

1. **Hotels:** go live with **Stay22** for the 13 hotel guides now, or keep waiting for **Agoda**? The recommendation is Stay22 now, because NYE bookings are happening this month. Hotels.com via CJ is the fallback.
2. **KKday: check prices before applying.** It is strong in Taiwan, but its catalogue overlaps Klook's and Taiwan-origin sales may pay only 3.5%. Apply only if it clearly beats Klook on the airport transfer, tours or hot-spring passes.
3. **Check Klook's eSIM rate** for this account. If it is low, **apply to Airalo**.
4. **Apply to SafetyWing** (insurance) and the **Wise affiliate programme** on Partnerize, replacing the personal invite link.
5. **In the Klook portal:**
   - export clicks and bookings **by adid** for Sept–Oct, especially the generic **1371607**
   - create deep links or single-product widgets for: TPE private airport transfer, Klook eSIM, Taipei Fun Pass, Taipei Metro pass, and the 2026/27 NYE party/dinner products
6. **In GA4:** register `partner`, `placement`, `hotel` and `link_url` as event-scoped custom dimensions.
7. **Check the NYE hotel page's 53 clicks from 9 users.** If they were the owner testing, filter internal traffic in GA4.
8. **GetYourGuide: yes, but narrowly** (§6a).
   - Add taipeitravelgeek.com to the existing `WWP7I0R` partner account.
   - Use GYG only for food, private and English-guided tours.
   - Check the GA4 country split first.
   - Defer KKday unless a price check shows it wins on the airport transfer or hot-spring passes.

---

## Sources (programme terms)

- Klook: [Involve Asia](https://involve.asia/?p=36792), [Ecomobi](https://ecomobi.com/klook-affiliate-program-review), [UpPromote](https://uppromote.com/affiliate-directory/klook/), [Lasso](https://getlasso.co/affiliate/klook/)
- KKday: [Involve Asia](https://involve.asia/blog/kkday-affiliate-program/), [FlexOffers](https://www.flexoffers.com/affiliate-programs/kkday-affiliate-program), [Lasso](https://getlasso.co/affiliate/kkday/)
- GetYourGuide inventory: [Taipei City page (255 activities)](https://www.getyourguide.com/taipei-city-l190/), [Yehliu/Jiufen/Shifen tour](https://www.getyourguide.com/taipei-city-l190/yehliu-jiufen-shifen-guided-tour-from-taipei-t496437/), [Zoo ticket](https://www.getyourguide.com/taipei-city-l190/taipei-zoo-entrance-ticket-t457879/), [Maokong Gondola](https://www.getyourguide.com/maokong-gondola-l106267/), [Taroko private tour](https://getyourguide.com/taipei-city-l190/from-taipei-taroko-gorge-full-day-tour-t405965). KKday: [Jiufen, Yehliu & Shifen day tour](https://www.kkday.com/en/product/2287-jiufen-yehliu-shifen-pingxi-day-tour-night-tour-from-taipei)
- GetYourGuide terms: [Travelpayouts](https://www.travelpayouts.com/blog/earn-with-getyourguide/amp/), [Affilimate](https://affilimate.io/programs/getyourguide-affiliate-program/), [Lasso](https://getlasso.co/affiliate/get-your-guide/)
- Airalo: [Affililist](https://www.affililist.com/affiliate/airalo), [FlexOffers](https://www.flexoffers.com/affiliate-programs/airalo-affiliate-program/)
- Stay22 and Agoda: [Sunshine Seeker](https://www.sunshineseeker.com/blogging/stay22-review/), [Explorer Tom](https://explorertom.com/en/stay22-review/), [Dream Big Travel Far](https://dreambigtravelfarblog.com/blog/stay22-review), [UpPromote Agoda](https://uppromote.com/affiliate-program-directory/agoda)
- Hotels.com / CJ: [Affilimate](https://affilimate.io/programs/hotels-com-affiliate-program/), [Referly](https://www.referly.so/affiliate-programs/hotelscom)
- Trip.com: [Cuelinks](https://www.cuelinks.com/campaigns/trip-affiliate-program), [UpPromote](https://uppromote.com/affiliate-directory/trip-com/)
- SafetyWing: [official Ambassador page](https://hello.safetywing.com/ambassador-page)
- Wise: [Partner onboarding guide](https://wise.com/gb/blog/partner-onboarding-guide), [Affiliate onboarding guide](https://wise.com/gb/blog/affiliate-onboarding-guide)
