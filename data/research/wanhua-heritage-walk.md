# Wanhua heritage walk: research notes

Researched 27 Oct 2026 for the new walk `wanhua-heritage-walk` (Ximen MRT → Red House → Lane 50 food alley → Bopiliao → Longshan Temple → Huaxi Street Night Market). All sources were accessed on 27 Oct 2026 unless a different date is shown. The draft post is in the scratchpad (`walks/wanhua-heritage-walk.json`) and the map input is `data/walks-input/wanhua-heritage-walk.json`.

## Sources

| # | Source | What it gave | Date of source |
|---|---|---|---|
| S1 | redhouse.taipei (official Red House site) | "週二至週日11:00-21:30，週五、週六延長至22:00 (週一休館)"; address 成都路10號; no closure or renovation notice | accessed 27 Oct 2026 |
| S2 | travel.taipei/en/attraction/details/487 (Taipei Dept of Information and Tourism, "Lungshan Temple") | Daily 06:00–22:00, "Last admission at 21:45", 211 Guangzhou St, wheelchair accessible | page updated 26 Oct 2026 |
| S3 | lungshan.org.tw (official temple site, home page) | No hours or chanting schedule published. Current events: 觀音菩薩出家紀念活動 20 Oct–1 Nov 2026; 藥師佛聖誕共修 7 Nov 2026; 契孫活動 moved from 24 Oct to 1 Nov | accessed 27 Oct 2026 |
| S4 | taiwanobsessed.com, CNN Travel, Travelking, Agoda, AAA (via search) | Longshan closing given variously as 21:30, 21:45, 22:00 and 22:20. Chanting 06:00–06:45 and 08:00–08:45 agreed; afternoon session given as 15:45–17:00, 16:00 or 17:00 | various, mostly 2024 or earlier |
| S5 | hcec.tp.edu.tw (Heritage and Culture Education Center of Taipei, home page) | "開放時間：週二至週日 9：00～17：00 休館：星期一固定休館". Notices: closed 23 Oct (Fri) and 24 Oct (Sat) for the typhoon work/school suspension | accessed 27 Oct 2026 |
| S6 | travel.taipei/en/attraction/details/506 ("Heritage and Culture Education Center of Taipei (The Historic Bopiliao Area)") | Tue–Sun 09:00–18:00, Monday off, free admission, No. 101 Guangzhou St | page updated 26 Oct 2026 |
| S7 | travel.yam.com/article/129107 (Bopiliao feature) | "街區｜9:00~21:00", "室內｜9:00~18:00", "休館｜固定週一" | last updated 18 Oct 2022 |
| S8 | bopiliao.taipei (official Bopiliao site) | **Unreachable**: connection reset over HTTPS, and HTTP redirects to HTTPS. Tried with WebFetch, curl and the browser | 27 Oct 2026 |
| S9 | travel.taipei/en/attraction/details/1687 ("Huaxi Street Tourist Night Market", via search result) | Daily 16:00–00:00; run by the Taipei City Market Administration Office. The browser tab could not open the page directly | accessed 27 Oct 2026 |
| S10 | NOWnews / TVBS Supertaste / Storm (search), plus OSM node 13108016702 | Yuan Fang Guabao (源芳刈包): 華西街17-2號, 11:30–20:00, closed Mondays; Bib Gourmand since 2020. OSM tags it `opening_hours=Tu-Su 11:30-20:00` | media undated or 2024–25; OSM current |
| S11 | uptogo.com.tw and atmosfy listing (search) | Ay Chung, 峨眉街8之1號: Mon–Sat 10:00–22:30, Sun 10:00–23:00; bowls NT$65 and NT$80 | undated |
| S12 | bella.tw (23 Aug 2026), marieclaire.com.tw, PTS and Taipei City Government press release reposted on 17 Oct 2026 (search) | Bangka (Monga) Park, opposite Longshan Temple, refurbished for over NT$200m and reopened at an "OPEN UP" ceremony on 17 Oct 2026. A new covered walkway links the MRT exits, buses and YouBike | Aug–Oct 2026 |
| S13 | uptogo.com.tw "西門町必逛必吃" (search) | 武昌街二段50巷 and Emei St are "the front line" of Ximending street food, including the torched beef cubes (火焰骰子牛); 雞排本色 at 50巷8號 | undated |
| S14 | OpenStreetMap: Nominatim search (1 req/s) and api.openstreetmap.org map calls for two small bounding boxes (Ximending; Longshan) | All coordinates below; way 222080619 (Lane 50); subway entrance nodes; temple entrance node 13421141925 (`opening_hours=06:00-22:00`) | OSM data as of 27 Oct 2026 |
| S15 | maps.app.goo.gl/SWhtssZtApDGF61M7 (the Google Maps link in the /ximending Lane 50 section) | Resolves to 25.043746, 121.506736, which is the south end of 武昌街二段50巷 | resolved 27 Oct 2026 |
| S16 | data/research/hotels-near-ximending.md (Taipei Metro station map 086.pdf, Jan 2026) | Ximen exits: 1 Red House, 2 Armed Forces Hero House, 3 Baoqing Rd, 4 Hengyang Rd, 5 Zhongshan Hall, 6 Pedestrian Area. Exit 1 25.04210,121.50762; exit 6 25.04253,121.50772 | Jan 2026 / 28 Sep 2026 |

Overpass API mirrors refused queries (406 / timeout), so the OSM street data came from the main OSM API `map` call instead.

## What the "Lane 50 food alley" is

It exists, and the site's existing description of it is right. It is **Lane 50, Section 2, Wuchang Street (武昌街二段50巷)**: a short pedestrian lane (OSM way 222080619, `highway=pedestrian`, `name:en` "Lane 50, Section 2, Wuchang Street") that runs north–south for about 130 m. Its south end is on Emei Street at 25.043564, 121.506707 and its north end is on Wuchang Street Sec. 2 at 25.044683, 121.507056, about 120 m north of Ximen exit 6. The /ximending Google Maps pin (S15) points at its south end, and S13 confirms the street-food stalls there.

- OSM's Chinese name is mistyped as 武昌**路**二段50巷; the English name is correct. This could be fixed on OSM; nothing on the site needs to change.
- It is **not** Lane 50 of Xining South Road (西寧南路50巷, OSM ways 60787479/600941755). That is a different service lane a block to the west, at about 25.0444, 121.5052–121.5064, and it is where Modern Toilet is (No. 7, 2F). The /ximending page names both lanes correctly, but they are easy to mix up, so the new post explains the difference.
- There is also a Lane 50 of Hanzhong Street (漢中街50巷, way 227827176), which is not the food alley.
- Not confirmed: the /ximending text calls it a "covered alley". OSM has no `covered` tag on the way, and none of the sources mention a roof. The new post avoids the word.

## Coordinates (OSM, 6 dp)

| # | Stop | lat | lng | OSM basis |
|---|---|---|---|---|
| 1 | Ximen MRT exit 1 | 25.042100 | 121.507620 | exit node, as recorded in hotels-near-ximending.md |
| 2 | The Red House | 25.042138 | 121.506282 | way 222080307 (西門紅樓), centroid; about 140 m west of exit 1 |
| 3 | Lane 50 food alley | 25.044119 | 121.506868 | way 222080619, middle node |
| 4 | Bopiliao Historical Block | 25.036846 | 121.502268 | relation 207840, centre; it lies on 康定路173巷 (way 198724103, 25.03695,121.50153 → 25.03658,121.50274) |
| 5 | Longshan Temple | 25.036782 | 121.499911 | entrance node 13421141925 on Guangzhou St (the temple building is way 198401479 at 25.037276,121.499881) |
| 6 | Huaxi Street Night Market | 25.036720 | 121.498280 | south gateway: the junction of 華西街 (way 311087011, covered) and 廣州街 |

Extras (pins named in the post): Ay Chung 25.043318,121.507686 (node 2572568042); Modern Toilet 25.044451,121.505756 (node on 西寧南路50巷 7); Yi Jia Zi 25.040378,121.502190 (node 10156051671, 康定路79); Herb Lane 25.036953,121.500438 (way 375486271); Yuan Fang Guabao 25.039192,121.498560 (node 13108016702); Longshan Temple MRT exit 1 25.035481,121.499652 (node 2075746454).

Cross-check of MRT exits against OSM:
- Longshan Temple station exit 1 is at 25.035481,121.499652 (north side of Heping W Rd, at Bangka Park), about 150 m south of the temple entrance and about 200 m from the Huaxi gateway.
- Exit 2 is at 25.034984,121.499993 (south side, Heping W Rd No. 120).
- Exit 3 is at 25.035357,121.501603 (east, near Kangding Rd), about 170 m from Bopiliao's Kangding Rd entrance.

## Distance and duration

Estimated along OSM street geometry (sum of straight segments between junctions, so slightly short):

| Leg | Route | m |
|---|---|---|
| 1→2 | exit 1 → Red House | ~160 |
| 2→3 | Xining S Rd north, Wuchang St east to the lane's north end | ~360 |
| 3 | through the lane to Emei St | ~130 |
| 3→4 | Emei St west, Kangding Rd south to Bopiliao | ~1,430 |
| 4→5 | through Bopiliao to Guangzhou St, west to the temple gate | ~420 |
| 5→6 | Guangzhou St west to the Huaxi gateway | ~170 |
| 6 | the length of Huaxi St to Guiyang St | ~370 |
| | **Total to the north end of Huaxi St** | **~3.0 km** |
| | Back to Longshan Temple MRT exit 1 | +~600 |

Allow about 45 minutes of walking plus stops, so 3 to 4 hours in total. That fits the brief's duration, and the site's own advice is 30–45 minutes at Longshan.

## Claim table

| Claim (as used in the new post) | Status | Evidence |
|---|---|---|
| Red House open Tue–Sun 11:00–21:30, Fri–Sat to 22:00, closed Mondays | VERIFIED | S1 |
| Red House free to enter | VERIFIED (by absence) | S1 lists no ticket. The site page says free |
| Red House has no closure or renovation | VERIFIED | S1 shows no notice |
| Red House built 1908 | VERIFIED | hotels-near-ximending.md A16 (redhouse.taipei) |
| Ximen exit 1 is the Red House exit | VERIFIED | S16 |
| Lane 50 food alley = Lane 50, Sec. 2, Wuchang St, between Wuchang St and Emei St | VERIFIED | S14, S15, S13 |
| Lane 50 stalls open from early afternoon | UNCONFIRMED | Site claim only. S13 says street snacks usually trade from afternoon until about 22:00 |
| Bopiliao street Tue–Sun 09:00–21:00 | UNCONFIRMED (secondary sources agree) | S7 (2022) and search results. The official site (S8) was unreachable |
| Bopiliao indoor exhibition rooms close 18:00 | VERIFIED (secondary + official tourism) | S6 gives 09:00–18:00; S7 gives "室內 9:00~18:00" |
| Heritage and Culture Education Center Tue–Sun 09:00–17:00 | VERIFIED, but sources conflict | S5 (its own site) says 17:00; S6 (travel.taipei) says 18:00. The post uses S5 |
| Bopiliao closed Mondays, free | VERIFIED | S5, S6, S7 |
| Longshan Temple 06:00–22:00 daily, last entry 21:45, free | VERIFIED | S2; OSM entrance tag agrees |
| Longshan chanting 06:00 and 08:00 | VERIFIED (secondary; official site publishes none) | S4 |
| Longshan late-afternoon chanting time | UNCONFIRMED | S4 gives 15:45–17:00, 16:00 or 17:00. The post says times vary |
| No visitor incense at Longshan | VERIFIED (already on the site) | Not re-checked on the official site, which has no visitor page |
| Bangka Park reopened 17 Oct 2026 | VERIFIED | S12 |
| Huaxi Street Night Market 16:00–00:00 daily | VERIFIED (official tourism listing) | S9 |
| Huaxi Street mostly covered | VERIFIED | OSM ways 311087009/311087011 are `covered=yes` |
| Yuan Fang Guabao 11:30–20:00, closed Mondays | CORRECTED (the site says 12:00–22:00) | S10 |
| Yuan Fang Guabao address No. 17-2 Huaxi St | VERIFIED (media) | S10. OSM's second node gives "161", which looks like a tagging error |
| Ay Chung hours | UNCONFIRMED | S11 gives 10:00–22:30, Sun to 23:00. The /ximending "until about 10.30pm" fits; /ay-chung "Opens until 23:00" is right for Sundays only. Not used in the post |
| Ay Chung prices NT$60/75 (site) vs NT$65/80 | UNCONFIRMED | One secondary source (S11). Not used in the post |
| Yi Jia Zi at No. 79 Kangding Rd | VERIFIED | OSM node 10156051671; matches /michelin-bib-gourmand-taiwanese-small-eats-taipei |
| Best day: Tue–Sun; start about 14:00 | Derived | From the hours above. On Mondays the Red House, Bopiliao, the HCEC and Yuan Fang are all closed |
| Typhoon closures 23–24 Oct 2026 | VERIFIED | S5 |

## Errors found on existing stop pages (find/replace for content/posts.json)

Each `find` string was checked to occur **exactly once** in content/posts.json, using `grep -o -F … | wc -l` = 1.

1. **/the-red-house-ximending: wrong MRT exit.** Exit 2 is on Zhonghua Rd, east of the station (Armed Forces Hero House). Exit 1 is the Red House exit (S16; OSM puts it about 140 m from the building).
   - find: `Closest MRT: Ximen Station (blue/green lines - exit 2)`
   - replace: `Closest MRT: Ximen Station (blue/green lines - exit 1)`

2. **/huaxi-street-night-market: Yuan Fang Guabao hours.** It is open 11:30–20:00 and closed on Mondays, not 12:00–22:00 (S10, OSM).
   - find: `You'll find it at No. 17-2 Huaxi Street, open from 12:00 to 22:00.`
   - replace: `You'll find it at No. 17-2 Huaxi Street, open from 11:30 to 20:00 and closed on Mondays.`

3. **/huaxi-street-night-market: nearest exit (recommended).** On OSM, exit 2 is on the south side of Heping W Rd. Exit 1 is on the park side and about 60 m closer to the market's Guangzhou St gateway. The /longshan-temple and /shaved-ice-huaxi pages already use exit 1.
   - find: `Closest MRT: Longshan Temple Station (blue line - exit 2)`
   - replace: `Closest MRT: Longshan Temple Station (blue line - exit 1)`

## Flagged, not corrected

- **/huaxi-street-night-market**: "The whole market was awarded a Michelin Guide Bib Gourmand in 2019". The Michelin Guide gives Bib Gourmands to individual eateries, not to a whole market, and I found no source for a market-wide award. It most likely means several stalls were listed in 2019. Suggested find `The whole market was awarded a Michelin Guide Bib Gourmand in 2019, and one stall` → replace `Several of its stalls have appeared in the Michelin Guide's Bib Gourmand list, and one` (that find string occurs once). Left for the owner to decide.
- **/ximending**: Lane 50 is described as "covered". This is unconfirmed (see above).
- **/the-red-house-ximending** "most well preserved class III building in Taiwan" was not checked.
- **/bopiliao-historical-block** street hours 09:00–21:00 could not be checked against the official site (S8 was down). The secondary sources agree.
- **/bopiliao-historical-block** "Museum: 09:00 - 17:00" matches the HCEC's own site (S5). Note that travel.taipei (S6) says 18:00.
- **/longshan-temple** "until around 21:45": the official tourism listing says open to 22:00, last admission 21:45. The current hedged wording is acceptable.
- **/ay-chung-flour-rice-noodles** "Opens until 23:00" is true only on Sundays (S11, secondary). No change proposed without a better source.

## Overlap check

`node <scratchpad>/check-overlap.cjs <scratchpad>/posts-test.json wanhua-heritage-walk` against all 315 posts gave 0 shared 8-word phrases. Before rewording, there were matches with longshan-temple, best-temples-in-taipei, best-buildings-in-taipei (the "founded in 1738 by settlers from Fujian" sentence), huaxi-street-night-market ("one of the oldest shaved ice shops"), ximen-outdoor-drinking and taipei-hotels-with-pools. All have been reworded.
