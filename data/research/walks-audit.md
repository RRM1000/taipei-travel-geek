# Walks data audit

Generated 2026-10-27 from `content/posts.json` and `data/maps/*.json` (exports dated 2026-09-08). Read-only audit for the walk-component redesign. Machine-readable twin: `data/research/walks-audit.json`.

## Inventory

| Page | Title | Words | Map (mid) | Audited as |
|---|---|---|---|---|
| `daan-walking-route` | Daan Walking Route | 464 | `1AmROqVqlBufN153Jf_ME0clo-p4tgkFW` | walk |
| `zhongzheng-walking-route` | Zhongzheng Walking Route | 510 | `1d5RuUPsOM6MPTU13ODnRiMq3d6X6q4C0` | walk |
| `gongguan-walking-route` | Gongguan Walking Route | 581 | `13MSBymYL_OYhuNh0zzW_O66BMchnp8k` | walk |
| `datong-walking-route` | Datong Walking Route | 591 | `1d2NXfrxGHCP_xKV9kB6suSL8LwRKyi0i` | walk |
| `songshan-xinyi-walking-tour` | Songshan/Xinyi Walking Route | 511 | `1Qf26AeJpZUD8do8PdZ15eJGReKX6nT2w` | walk |
| `best-areas-for-walking` | If You Don't Fancy Hiking, Try These Walking Areas Instead | 532 | `1ANY9nbLlrCbHN5uo5UMJQR2DCvRHF_EZ` | area list (not a route) |
| `one-day-itineraries` | 24 Hours in Taipei: One-Day Itineraries | 2554 | none | not audited: MRT-hopping day plans in the Routes category; its two on-foot sections restate the Daan and Songshan/Xinyi walks and link to them |
| `the-best-guided-tours-in-taipei` | The Best Guided Tours in Taipei - On Coach, Foot or Bike | 731 | none | not audited: list of bookable tours (Routes category) |

Other pages tagged Walking (Yongkang Street, Dihua Street, Xinbeitou, Tamsui, Taipei Zoo "Planning Your Route", etc.) are area/sight guides, not stop-by-stop walks, and were not audited.

## Method and conventions

- Stops are taken from each post's "Step-By-Step" letters [A], [B]... in text order. Each text letter is matched to the waypoint on the map's directions/route layer (the layer the drawn line was built through), and to a human-named pin where one exists. `lat/lng` are the route-waypoint coordinates (so they sit on the drawn line); where a stop has no waypoint the named pin is used and `onRoute` is false.
- `slug` = the page the walk text links for that stop; `mapLinkSlug` = what `data/maps/links.json` links the pin to. `closed` = site-marked state of the linked page (`permanently-closed` from a title/"has permanently closed" notice, `temporarily-closed` from a Temporary Closure Notice / "Closed Until" title, `missing-page`).
- **Estimates:** distance = straight-line haversine legs between consecutive stops; walking time = distance x 1.3 detour / 4.5 km/h. "Drawn line" = length of the My Maps line(s). None include time spent at stops.
- Maps URLs use origin = first stop, destination = last stop, all others as waypoints (`|` encoded as `%7C`), travelmode=walking. Optional detours are excluded.
- Waypoints on the "Directions" layer are mostly reverse-geocoded street addresses, not place names - do not use the pin name as the stop label; use the text name.
- Line paths in data/maps are [lng, lat] (KML order); points are {lat, lng}.

## Headline findings

- 5 real walks (Datong has two sub-routes, so 6 routes), 47 route stops; every lettered text stop maps to a route waypoint in the same order as the text (3 extra sights named in the text - Zhongzheng's CKS Hall and Presidential Office, Datong's Rose Garden - are pinned but off-waypoint). No order differences between text and map.
- Only Songshan/Xinyi has a site-marked closure: Sun Yat-sen Memorial Hall ("Closed Until Late 2026"), while the walk still sends readers to the changing of the guard. No stop links to a missing page; no linked page is marked permanently closed.
- Datong map layer names are swapped (East/West). Daan stop D is pinned as Dongmen Market, not Yongkang Street. Zhongzheng's CKS Memorial Hall and Presidential Office are off-route pins. NTU Hospital is mislinked to /national-taiwan-university.
- Gongguan and Songshan/Xinyi waypoints are all street addresses (Songshan has zero named pins) - names must come from the text.
- Every walk map except Songshan has each stop pinned twice (attractions layer + directions layer) - dedupe.
- Every walk map has line geometry (Google directions polylines); best-areas-for-walking has polygons only.


## Daan Walking Route (`/daan-walking-route`)

- Words: 464 | last modified 2026-09-30 12:00:00 | map `1AmROqVqlBufN153Jf_ME0clo-p4tgkFW`
- Layers: "Untitled layer" (5 pts, 0 lines); "Directions from No. 65, Section 3, Ren'ai Road, Da’an District, Taipei" (6 pts, 1 line)

Weekend walk: Jianguo Flower Market -> Artists Corner -> Daan Forest Park -> Yongkang Street -> Chiang Kai-shek Memorial Hall -> CKS MRT. Text letters A-F match the Directions layer one-to-one and in order.

| # | Letter | Stop (text) | Matched pin | Lat | Lng | Slug | On route | Closed |
|---|---|---|---|---|---|---|---|---|
| 1 | A | Jianguo Flower Market (north entrance) | Jian Guo Weekend Flower Market | 25.038275 | 121.537869 | `jianguo-flower-market` | yes | - |
| 2 | B | Artists Corner market | Jian Guo Weekend Artist's Corner | 25.033414 | 121.537817 | - | yes | - |
| 3 | C | Daan Forest Park | Daan Forest Park | 25.032428 | 121.534912 | `daan-forest-park` | yes | - |
| 4 | D | Yongkang Street | Dongmen Market | 25.034439 | 121.526648 | `yongkang-street` | yes | - |
| 5 | E | Chiang Kai-shek Memorial Hall | National Chiang Kai-shek Memorial Hall | 25.034777 | 121.521518 | `chiang-kai-shek-memorial-hall` | yes | - |
| 6 | F | Chiang Kai-shek Memorial Hall MRT station | *(address)* 100, Taiwan, Taipei City, Zhongzheng District, 台9線31號 | 25.032741 | 121.518382 | - | yes | - |
- Stop 4: Text stop is Yongkang Street but the pin/waypoint is "Dongmen Market" (~501 m NW of the Yongkang Street pin on the site-wide map, 25.0307657,121.5295298).
- Stop 6: Waypoint is a reverse-geocoded address, not a named pin.

**Estimates:** straight-line 2.62 km (legs: 0.541, 0.313, 0.862, 0.518, 0.389 km) -> ~45 min walking at 4.5 km/h x 1.3. Drawn My Maps line: 6.02 km (~80 min at 4.5 km/h, 1 line).

**Google Maps (walking):** [open](https://www.google.com/maps/dir/?api=1&origin=25.038275,121.537869&destination=25.032741,121.518382&waypoints=25.033414,121.537817%7C25.032428,121.534912%7C25.034439,121.526648%7C25.034777,121.521518&travelmode=walking)

```
https://www.google.com/maps/dir/?api=1&origin=25.038275,121.537869&destination=25.032741,121.518382&waypoints=25.033414,121.537817%7C25.032428,121.534912%7C25.034439,121.526648%7C25.034777,121.521518&travelmode=walking
```
4 waypoints - within the 9-waypoint limit. Google documents only 3 waypoints in mobile browsers, so on phones extra stops may be dropped; if that matters, split into legs of origin + 3 waypoints + destination, each leg starting at the previous leg's destination.

**Optional / mentioned, not route stops:** Louisa cafe (Daan Park) (`louisa`); Original Din Tai Fung (`din-tai-fung`); Tian Jin Onion Pancake (`tian-jin-onion-pancake`); Toasteria (`toasteria`); Yaboo Cafe (`yaboo-cafe`); Smoothie House (no page); Jin Feng Braised Pork Rice (optional extra) (`jin-feng-braised-pork-rice`)

### Issues

- Stop D: text says Yongkang Street, map pin/waypoint is "Dongmen Market" (~501 m from the Yongkang Street pin on the site-wide map at 25.0307657,121.5295298). Decide which to show; the text's food stops (Din Tai Fung, Toasteria, Yaboo) are on Yongkang St.
- Every named stop is pinned twice (Untitled layer + Directions layer, 1-32 m apart) - dedupe; prefer the Directions-layer copy, which the line passes through.
- Start (A) and finish (F) waypoints are addresses ("No. 65, Section 3, Ren'ai Road..." / "...台9線31號"), not names.
- Jianguo Flower Market and Artist's Corner pins are unlinked in links.json; the text links /jianguo-flower-market.
- Optional food stops (Louisa, Din Tai Fung, Tian Jin Onion Pancake, Toasteria, Yaboo Cafe, Smoothie House, Jin Feng) have no pins. "Smoothie House" has no page.
- Drawn line is 6.0 km vs 2.6 km straight-line - the directions line covers more ground than the stop-to-stop hops (e.g. routing along the market and through the park); text "4-6 hours" is dwell time, not walking time.

## Zhongzheng Walking Route (`/zhongzheng-walking-route`)

- Words: 510 | last modified 2026-08-17 02:30:00 | map `1d5RuUPsOM6MPTU13ODnRiMq3d6X6q4C0`
- Layers: "Attractions" (14 pts, 0 lines); "Walking Directions" (9 pts, 1 line)

Architecture/history walk from CKS Memorial Hall MRT past the East Gate, NTU Hospital, Guest House, MOFA, Presidential Office, City God Temple, Land Bank, National Taiwan Museum to 228 Peace Park. Text letters A-I match the Walking Directions layer one-to-one and in order; two named sights (CKS Hall, Presidential Office) are off-waypoint.

| # | Letter | Stop (text) | Matched pin | Lat | Lng | Slug | On route | Closed |
|---|---|---|---|---|---|---|---|---|
| 1 | A | Chiang Kai-Shek Memorial Hall Station (exit 5) | *(address)* 100, Taiwan, Taipei City, Zhongzheng District, Section 1, Roosevelt Rd, 8之1號之 Chiang Kai-Shek Memorial Hall Station | 25.03267 | 121.518192 | - | yes | - |
| 2 | A | Chiang Kai-Shek Memorial Hall / Liberty Square | National Chiang Kai-shek Memorial Hall | 25.034612 | 121.521781 | `chiang-kai-shek-memorial-hall` | no | - |
| 3 | B | East Gate | The East Gate | 25.039056 | 121.518125 | - | yes | - |
| 4 | C | National Taiwan University Hospital | National Taiwan University Hospital | 25.040751 | 121.518707 | - | yes | - |
| 5 | D | Taipei Guest House (optional, if open) | Taipei Guest House | 25.040953 | 121.516983 | `taipei-guest-house` | yes | - |
| 6 | E | Ministry of Foreign Affairs | Ministry of Foreign Affairs, Republic of China (Taiwan) | 25.03849 | 121.516148 | - | yes | - |
| 7 | E | Jieshou Park / Presidential Office Building | Presidential Office Building | 25.040083 | 121.511955 | `presidential-office-building` | no | - |
| 8 | F | Taiwan Provincial City God Temple | Taiwan Provincial City God Temple | 25.044043 | 121.512709 | - | yes | - |
| 9 | G | Land Bank Exhibition Hall (National Taiwan Museum) | *(address)* Land Bank Exhibition Hall of National Taiwan Museum, Xiangyang Road, Zhongzheng District, Taipei City | 25.043475 | 121.514359 | `national-taiwan-museum` | yes | - |
| 10 | H | National Taiwan Museum | National Taiwan Museum | 25.043015 | 121.515018 | `national-taiwan-museum` | yes | - |
| 11 | I | 228 Peace Memorial Park | 2/28 Peace Park | 25.04189 | 121.514996 | `peace-park` | yes | - |
- Stop 2: The main sight of stop A is pinned only on the Attractions layer; it is not a waypoint, though the drawn line passes within ~32 m of it between the station and the East Gate.
- Stop 4: links.json links this pin to /national-taiwan-university (the campus page, 2.5 km away) - a wrong link; the hospital has no page.
- Stop 7: Named in stop E text; pinned on the Attractions layer only, not a route waypoint.
- Stop 11: Pin "2/28 Peace Park" is not linked in links.json for this map (the site-wide map links the same name to /peace-park).

**Estimates:** straight-line 2.99 km (legs: 0.421, 0.616, 0.197, 0.175, 0.287, 0.458, 0.447, 0.178, 0.084, 0.125 km) -> ~52 min walking at 4.5 km/h x 1.3. Drawn My Maps line: 5.08 km (~68 min at 4.5 km/h, 1 line).

**Google Maps (walking):** [open](https://www.google.com/maps/dir/?api=1&origin=25.032670,121.518192&destination=25.041890,121.514996&waypoints=25.034612,121.521781%7C25.039056,121.518125%7C25.040751,121.518707%7C25.040953,121.516983%7C25.038490,121.516148%7C25.040083,121.511955%7C25.044043,121.512709%7C25.043475,121.514359%7C25.043015,121.515018&travelmode=walking)

```
https://www.google.com/maps/dir/?api=1&origin=25.032670,121.518192&destination=25.041890,121.514996&waypoints=25.034612,121.521781%7C25.039056,121.518125%7C25.040751,121.518707%7C25.040953,121.516983%7C25.038490,121.516148%7C25.040083,121.511955%7C25.044043,121.512709%7C25.043475,121.514359%7C25.043015,121.515018&travelmode=walking
```
9 waypoints - within the 9-waypoint limit. Google documents only 3 waypoints in mobile browsers, so on phones extra stops may be dropped; if that matters, split into legs of origin + 3 waypoints + destination, each leg starting at the previous leg's destination.

**Optional / mentioned, not route stops:** Chun Shui Tang (`chun-shui-tang`); 228 Museum (`peace-park`); Jin Feng Braised Pork Rice (`jin-feng-braised-pork-rice`); NTU Hospital MRT (finish) (no page)

### Issues

- Stop A's main sight, Chiang Kai-shek Memorial Hall, is not a route waypoint: the line starts at CKS Memorial Hall MRT and goes straight to the East Gate (hall pin ~370 m from the station, 32 m from the nearest line point only where it passes Liberty Square).
- Presidential Office Building (named in stop E) is on the Attractions layer only, ~97 m off the drawn line.
- NTU Hospital pin is linked in links.json to /national-taiwan-university (the campus page) - wrong link; the hospital has no page.
- 2/28 Peace Park pin is unlinked on this map (text links /peace-park).
- Pins not in the text: National Concert Hall, Liberty Square Arch, "國家兩廳院" (Chinese-only name; part of the Liberty Square complex the text calls "performance halls"), Chun Shui Tang and Jin Feng (text optional/after-walk).
- Duplicates: East Gate (47 m apart), NTU Hospital, Taipei Guest House (92 m apart), MOFA, City God Temple, National Taiwan Museum, 2/28 Peace Park appear on both layers.
- Text is stale: "due to the COVID-19 pandemic, visits to both these buildings have temporarily been suspended" (Presidential Office / Guest House); the Presidential Office page now gives normal opening hours.
- Finish (NTU Hospital MRT) has no pin. 11 stops = exactly 9 waypoints, the Maps URL limit.

## Gongguan Walking Route (`/gongguan-walking-route`)

- Words: 581 | last modified 2023-03-26 15:09:42 | map `13MSBymYL_OYhuNh0zzW_O66BMchnp8k`
- Layers: "Untitled layer" (8 pts, 0 lines); "Directions from No. 214, Section 2, Fuxing S Rd, Da’an District, Taipe" (9 pts, 1 line)

Technology Building MRT -> NTU campus (Drunken Moon Lake, Fu Bell, Memorial Park) -> Gongguan lunch -> Water Park / Drinking Water Museum -> Treasure Hill -> Gongguan Night Market. 9 address waypoints map one-to-one to text letters A-I.

| # | Letter | Stop (text) | Matched pin | Lat | Lng | Slug | On route | Closed |
|---|---|---|---|---|---|---|---|---|
| 1 | A | Technology Building MRT Station | *(address)* No. 214, Section 2, Fuxing S Rd, Da’an District, Taipei City, Taiwan 106 | 25.026154 | 121.543333 | - | yes | - |
| 2 | B | NTU campus - Drunken Moon Lake | *(address)* Unnamed Road, Da’an District, Taipei City, Taiwan 106 | 25.020376 | 121.537312 | `national-taiwan-university` | yes | - |
| 3 | C | NTU main campus buildings / Fu Bell | *(address)* No. 1號, Section 4, Roosevelt Rd, Da’an District, Taipei City, Taiwan 106 | 25.017312 | 121.536761 | `national-taiwan-university` | yes | - |
| 4 | D | NTU Memorial Park | *(address)* No. 1號, Section 4, Roosevelt Rd, Zhongzheng District, Taipei City, Taiwan 100 | 25.01639 | 121.533511 | `national-taiwan-university` | yes | - |
| 5 | E | Gongguan (lunch) | *(address)* No. 14, Alley 8, Ln. 316, Section 3, Roosevelt Rd, Zhongzheng District, Taipei City, Taiwan 100 | 25.015338 | 121.532607 | - | yes | - |
| 6 | F | Taipei Water Park - Drinking Water Museum | Museum of Drinking Water | 25.013337 | 121.530348 | `see-the-drinking-water-museum-at-taipei-water-park` | yes | - |
| 7 | G | Water Park paths / reservoir viewpoint | *(address)* No. 6-3, Alley 37, Lane 230, Section 3, Tingzhou Rd, Zhongzheng District, Taipei City, Taiwan 100 | 25.011877 | 121.532397 | - | yes | - |
| 8 | H | Treasure Hill Art Village | Treasure Hill Artist Village | 25.010818 | 121.532534 | `treasure-hill` | yes | - |
| 9 | I | Gongguan Night Market | *(address)* No. 4, Alley 2, Lane 78, Section 4, Luosifu Rd, Zhongzheng District, Taipei City, Taiwan 100 | 25.013674 | 121.534599 | `gongguan-night-market` | yes | - |
- Stop 5: Lunch pins YU POKÉ, Madame Jill's, Lan Jia sit within ~60 m of this waypoint.
- Stop 7: Text says do NOT follow the Google route from G to H - walk directly; the drawn line here is a road detour.
- Stop 9: Text does not link /gongguan-night-market (page exists; slug taken from the site-wide map pin 20 m away). Site-wide map pin "Gongguan Night Market" is 23 m away.

**Estimates:** straight-line 2.8 km (legs: 0.884, 0.345, 0.343, 0.148, 0.318, 0.263, 0.119, 0.38 km) -> ~49 min walking at 4.5 km/h x 1.3. Drawn My Maps line: 7.03 km (~94 min at 4.5 km/h, 1 line).

**Google Maps (walking):** [open](https://www.google.com/maps/dir/?api=1&origin=25.026154,121.543333&destination=25.013674,121.534599&waypoints=25.020376,121.537312%7C25.017312,121.536761%7C25.016390,121.533511%7C25.015338,121.532607%7C25.013337,121.530348%7C25.011877,121.532397%7C25.010818,121.532534&travelmode=walking)

```
https://www.google.com/maps/dir/?api=1&origin=25.026154,121.543333&destination=25.013674,121.534599&waypoints=25.020376,121.537312%7C25.017312,121.536761%7C25.016390,121.533511%7C25.015338,121.532607%7C25.013337,121.530348%7C25.011877,121.532397%7C25.010818,121.532534&travelmode=walking
```
7 waypoints - within the 9-waypoint limit. Google documents only 3 waypoints in mobile browsers, so on phones extra stops may be dropped; if that matters, split into legs of origin + 3 waypoints + destination, each leg starting at the previous leg's destination.

**Optional / mentioned, not route stops:** Yong He Soy Milk King (breakfast) (`yong-he-soy-milk-king`); The Diner (breakfast) (`the-diner`); Lan Jia Traditional Taiwanese Snack (`lan-jia-traditional-taiwanese-snack`); Michelin stands (`michelin-food-stands-at-night-markets`)

### Issues

- All 9 route waypoints are street addresses; only F (Museum of Drinking Water) and H (Treasure Hill Artist Village) have a named pin to match (96 m and 29 m away). B, C, D (NTU campus points) and G have no named pin - matched by order only.
- Stop I (Gongguan Night Market) has no pin on this map and the text does not link /gongguan-night-market (page exists; site-wide map pin 23 m from the waypoint).
- Text says not to follow the Google route from G to H (walk directly) - the drawn line there is a road detour; the line (7.0 km) overstates the walk.
- Pins not in the text: YU POKÉ, Madame Jill's Vietnamese Cuisine, El Sabroso Mexican Food (the text says "I've marked a few on the map"); Madame Jill's and El Sabroso have no pages. Lan Jia pin named "Lan Jia Gua Bao..." sits in the lunch cluster though the text mentions it at stop I.
- Breakfast pins (Yong He Soy Milk King, The Diner) are off-route options before A.
- Post last modified 2023-03-26 - oldest of the walks.

## Datong Walking Route (`/datong-walking-route`)

- Words: 591 | last modified 2026-08-05 15:00:00 | map `1d2NXfrxGHCP_xKV9kB6suSL8LwRKyi0i`
- Layers: "Attractions" (13 pts, 0 lines); "West Walk - Temples and Night Market" (8 pts, 1 line); "East Walk - Parks, Museum and Ancestral Houses" (6 pts, 1 line)

Two walks from Yuanshan MRT: East Route (Expo Farmer's Market, Story House, Fine Arts Museum, Indigenous Centre, Xinsheng Park, Lin An Tai, Botanical Garden, Maze) and a short West Route temple loop (Baoan, Confucius, Dalong St Night Market). Both match their map layers in order - but the layer names are swapped.

### East Route (the text's "East Route"; map layer is named "West Walk - Temples and Night Market")

| # | Letter | Stop (text) | Matched pin | Lat | Lng | Slug | On route | Closed |
|---|---|---|---|---|---|---|---|---|
| 1 | A | Yuanshan MRT (exit 1) | *(address)* Yuanshan Station, No. 9之1號, Jiuquan Street, Datong District, Taipei City, Taiwan 103 | 25.071395 | 121.519987 | - | yes | - |
| 2 | B | Expo Farmer's Market | Taipei Expo Farmer's Market | 25.070654 | 121.521264 | `expo-farmers-market` | yes | - |
| 3 | C | Taipei Story House | Taipei Story House | 25.073201 | 121.524738 | `taipei-story-house` | yes | - |
| 4 | D | Fine Arts Museum | Taipei Fine Arts Museum | 25.072679 | 121.525133 | `fine-arts-museum` | yes | - |
| 5 | E | Indigenous Cultural Centre | Indigenous Cultural Centre | 25.070767 | 121.524513 | - | yes | - |
| 6 | - | Xinsheng Park - Rose Garden | Taipei Rose Garden | 25.070452 | 121.528808 | `xinsheng-park` | no | - |
| 7 | F | Lin An Tai Ancestral House | Lin An Tai Ancestral House | 25.071724 | 121.530292 | `lin-an-tai-ancestral-house` | yes | - |
| 8 | G | Taipei Collective Botanical Garden | Taipei Collective Botanical Garden | 25.071441 | 121.531682 | `collective-botanical-garden` | yes | - |
| 9 | H | The maze (Xinsheng Park) | Garden Maze | 25.069545 | 121.529982 | `xinsheng-park` | yes | - |
- Stop 6: Unlettered in the text and not a route waypoint; Attractions-layer pin only.

**Estimates:** straight-line 1.95 km (legs: 0.153, 0.45, 0.07, 0.222, 0.434, 0.206, 0.143, 0.272 km) -> ~34 min walking at 4.5 km/h x 1.3. Drawn My Maps line: 3.07 km (~41 min at 4.5 km/h, 1 line).

**Google Maps (walking):** [open](https://www.google.com/maps/dir/?api=1&origin=25.071395,121.519987&destination=25.069545,121.529982&waypoints=25.070654,121.521264%7C25.073201,121.524738%7C25.072679,121.525133%7C25.070767,121.524513%7C25.070452,121.528808%7C25.071724,121.530292%7C25.071441,121.531682&travelmode=walking)

```
https://www.google.com/maps/dir/?api=1&origin=25.071395,121.519987&destination=25.069545,121.529982&waypoints=25.070654,121.521264%7C25.073201,121.524738%7C25.072679,121.525133%7C25.070767,121.524513%7C25.070452,121.528808%7C25.071724,121.530292%7C25.071441,121.531682&travelmode=walking
```
7 waypoints - within the 9-waypoint limit. Google documents only 3 waypoints in mobile browsers, so on phones extra stops may be dropped; if that matters, split into legs of origin + 3 waypoints + destination, each leg starting at the previous leg's destination.


### West Route - temples and night market (map layer named "East Walk - Parks, Museum and Ancestral Houses")

| # | Letter | Stop (text) | Matched pin | Lat | Lng | Slug | On route | Closed |
|---|---|---|---|---|---|---|---|---|
| 1 | A | Yuanshan MRT | *(address)* Yuanshan Station, No. 9之1號, Jiuquan Street, Datong District, Taipei City, Taiwan 103 | 25.071456 | 121.519997 | - | yes | - |
| 2 | B-D | Baoan Temple garden | Baoan Temple Garden | 25.072753 | 121.515871 | `dalongdong-baoan-temple-and-gardens` | yes | - |
| 3 | B-D | Baoan Temple | Dalongdong Baoan Temple | 25.073222 | 121.515592 | `dalongdong-baoan-temple-and-gardens` | yes | - |
| 4 | B-D | Confucius Temple | Taipei Confucius Temple | 25.073177 | 121.516306 | `confucius-temple` | yes | - |
| 5 | E | Dalong Street Night Market | Dalong Street Night Market | 25.071499 | 121.515999 | - | yes | - |
| 6 | F | Yuanshan MRT | *(address)* Yuanshan Station, No. 9之1號, Jiuquan Street, Datong District, Taipei City, Taiwan 103 | 25.071456 | 121.519997 | - | yes | - |
- Stop 2: Waypoint is an address ("Dalong Street 275"); matched by position to the "Baoan Temple Garden" pin 12 m away.
- Stop 4: Waypoint is an address ("Hami Street 70"); matched by position to the Confucius Temple pin ~40 m away.

**Estimates:** straight-line 1.16 km (legs: 0.44, 0.059, 0.072, 0.189, 0.403 km) -> ~20 min walking at 4.5 km/h x 1.3. Drawn My Maps line: 1.58 km (~21 min at 4.5 km/h, 1 line).

**Google Maps (walking):** [open](https://www.google.com/maps/dir/?api=1&origin=25.071456,121.519997&destination=25.071456,121.519997&waypoints=25.072753,121.515871%7C25.073222,121.515592%7C25.073177,121.516306%7C25.071499,121.515999&travelmode=walking)

```
https://www.google.com/maps/dir/?api=1&origin=25.071456,121.519997&destination=25.071456,121.519997&waypoints=25.072753,121.515871%7C25.073222,121.515592%7C25.073177,121.516306%7C25.071499,121.515999&travelmode=walking
```
4 waypoints - within the 9-waypoint limit. Google documents only 3 waypoints in mobile browsers, so on phones extra stops may be dropped; if that matters, split into legs of origin + 3 waypoints + destination, each leg starting at the previous leg's destination.

**Optional / mentioned, not route stops:** MAJI Square (`maji-square`); Grand Hotel (view only) (`the-grand-hotel`)

### Issues

- MAP LAYER NAMES ARE SWAPPED: the layer named "West Walk - Temples and Night Market" holds the East Route (Expo, Story House, Fine Arts, Indigenous Centre, Lin An Tai, Botanical Garden, Maze); the layer named "East Walk - Parks, Museum and Ancestral Houses" holds the temples loop. The page's map-places block prints these wrong headings.
- Text contradicts itself: intro says "The East route is best taken during the evening"; the West Route section says it is the one best taken in the evening (after 18:00).
- Two separate walks from Yuanshan MRT, so modelled as the East Route (top-level stops) plus variants.west. The West Route is a loop (origin = destination = Yuanshan).
- West Route letters [B][C][D] are "visit as you wish"; map order is Baoan Temple Garden -> Baoan Temple -> Confucius Temple; two of those waypoints are addresses (Dalong St 275, Hami St 70) matched by position to named pins 12 m and 39 m away.
- Xinsheng Park / Rose Garden (unlettered in text, links /xinsheng-park) is not a route waypoint; Attractions-layer pin "Taipei Rose Garden" only. MAJI Square (optional) likewise.
- No pages for Indigenous Cultural Centre or Dalong Street Night Market; Garden Maze / Rose Garden / Baoan Garden / Dalong St NM pins are unlinked in links.json. Grand Hotel (text) has no pin.
- Every attraction is pinned twice (Attractions layer + route layer, 0-44 m apart).

## Songshan/Xinyi Walking Route (`/songshan-xinyi-walking-tour`)

- Words: 511 | last modified 2026-09-30 12:00:00 | map `1Qf26AeJpZUD8do8PdZ15eJGReKX6nT2w`
- Layers: "Walking Route" (6 pts, 1 line)

Sun Yat-sen Memorial Hall MRT -> Sun Yat-sen Memorial Hall -> Songshan Cultural Park -> Xinyi Shopping District -> Breeze Nan Shan -> Taipei 101. Text A-F match the 6 waypoints in order; none is a named pin.

| # | Letter | Stop (text) | Matched pin | Lat | Lng | Slug | On route | Closed |
|---|---|---|---|---|---|---|---|---|
| 1 | A | Sun Yat-sen Memorial Hall MRT (exit 3) / Zhongshan Park | *(address)* Sun Yat-Sen Memorial Hall Station, No. 400, Section 4, Zhongxiao East Road, Xinyi District, Taipei City, Taiwan 11072 | 25.041448 | 121.557526 | - | yes | - |
| 2 | B | Sun Yat-sen Memorial Hall | *(address)* No. 505, Section 4, Ren'ai Road, Xinyi District, Taipei City, Taiwan 110 | 25.039515 | 121.560208 | `sun-yat-sen-memorial-hall` | yes | temporarily-closed |
| 3 | C | Songshan Cultural and Creative Park | *(address)* No. 88號, Yanchang Road, Xinyi District, Taipei City, Taiwan 110 | 25.044508 | 121.561624 | `songshan-cultural-and-creative-park` | yes | - |
| 4 | D | Xinyi Shopping District | *(address)* No. 6821, Xingya Road, Xinyi District, Taipei City, Taiwan 110 | 25.040089 | 121.567126 | `xinyi-shopping-district` | yes | - |
| 5 | E | Breeze Nan Shan mall (text: "Breeze Nanshi") | *(address)* No. 12, Songshou Road, Xinyi District, Taipei City, Taiwan 110 | 25.034844 | 121.566206 | - | yes | - |
| 6 | F | Taipei 101 | *(address)* No. 8, Songzhi Road, Xinyi District, Taipei City, Taiwan 110 | 25.03445 | 121.564471 | `taipei-101` | yes | - |
- Stop 2: Site-wide map pin "National Dr. Sun Yat-Sen Memorial Hall" is 57 m away.
- Stop 3: Site-wide map pin "Songshan Cultural and Creative Park No 1. Warehouse" is 213 m away.
- Stop 5: Waypoint geocodes to No. 12 Songshou Rd (the ATT 4 FUN address, just north of Breeze Nan Shan). No page for Breeze Nan Shan.
- Stop 6: Site-wide map pin "Taipei 101" is 54 m away.

**Estimates:** straight-line 2.43 km (legs: 0.345, 0.573, 0.741, 0.591, 0.18 km) -> ~42 min walking at 4.5 km/h x 1.3. Drawn My Maps line: 4.24 km (~57 min at 4.5 km/h, 1 line).

**Google Maps (walking):** [open](https://www.google.com/maps/dir/?api=1&origin=25.041448,121.557526&destination=25.034450,121.564471&waypoints=25.039515,121.560208%7C25.044508,121.561624%7C25.040089,121.567126%7C25.034844,121.566206&travelmode=walking)

```
https://www.google.com/maps/dir/?api=1&origin=25.041448,121.557526&destination=25.034450,121.564471&waypoints=25.039515,121.560208%7C25.044508,121.561624%7C25.040089,121.567126%7C25.034844,121.566206&travelmode=walking
```
4 waypoints - within the 9-waypoint limit. Google documents only 3 waypoints in mobile browsers, so on phones extra stops may be dropped; if that matters, split into legs of origin + 3 waypoints + destination, each leg starting at the previous leg's destination.

**Optional / mentioned, not route stops:** i-Ride Taipei (`i-ride-taipei`); ATT 4 FUN (no page); Eslite Spectrum (no page)

### Issues

- SITE-MARKED CLOSURE: stop B Sun Yat-sen Memorial Hall - its page is titled "Closed Until Late 2026" with a Temporary Closure Notice (main hall, galleries closed; changing of the guard suspended; gardens open). The walk text still tells readers to watch the changing of the guard and visit the exhibition rooms.
- The map has no named pins at all - only 6 address waypoints on one layer; links.json has no links for it. Stop names/slugs come from the text; coordinates checked against the site-wide map (Sun Yat-sen Hall 57 m, Taipei 101 54 m, Songshan Park No.1 Warehouse 213 m from the waypoints).
- Stop E text says "Breeze Nanshi Mall" (should be Breeze Nan Shan); the waypoint geocodes to No. 12 Songshou Rd (ATT 4 FUN). No page for Breeze Nan Shan. Typo "Songhsan" in intro.
- The page's map-places block lists raw addresses as "Every place on this map".

## If You Don't Fancy Hiking, Try These Walking Areas Instead (`/best-areas-for-walking`)

- Words: 532 | last modified 2023-04-15 09:20:02 | map `1ANY9nbLlrCbHN5uo5UMJQR2DCvRHF_EZ`

List of six walking areas with an area map; included for completeness, not a route.

| # | Area (text order) | Pin | Lat | Lng | Slug | Closed |
|---|---|---|---|---|---|---|
| 1 | National Taiwan University | National Taiwan University | 25.01734 | 121.539752 | `national-taiwan-university` | - |
| 2 | Treasure Hill | Treasure Hill | 25.010732 | 121.532254 | `treasure-hill` | - |
| 3 | Water Park | Taipei Water Park | 25.013284 | 121.530321 | `see-the-drinking-water-museum-at-taipei-water-park` | - |
| 4 | Danshui (Tamsui) | Danshui | 25.171142 | 121.438616 | `best-day-trips-from-taipei` | - |
| 5 | Daan Forest Park | Daan Forest Park | 25.032435 | 121.534905 | `daan-forest-park` | - |
| 6 | Xinyi Shopping District | Xinyi Shopping District | 25.037247 | 121.566985 | `xinyi-shopping-district` | - |
| 7 | Xinbeitou | Xinbeitou | 25.136305 | 121.506283 | `xinbeitou` | - |

Polygons: Xinyi Shopping District, Daan Forest Park, Treasure Hill + Water Park, Xinbeitou, Danshui, NTU. Straight-line spread 55.32 km - no walking estimate or Maps link given.

### Issues

- NOT A WALK: an area list (NTU, Treasure Hill + Water Park, Danshui, Daan Forest Park, Xinyi, Xinbeitou) spanning ~55 km; map is 7 area pins + 6 polygons, no line. Do not render as a route or give a Maps walking link; render pins/polygons only.
- Danshui links to /best-day-trips-from-taipei rather than /tamsui; Danshui pin is unlinked.
- Treasure Hill and Water Park are two pins for one text section.
- Last modified 2023-04-15.
