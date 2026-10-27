# Research: Taipei events calendar extended through 2027

Checked 27 October 2026. This file is research, not article copy. It covers `content/events.json` (homepage "Upcoming Taipei Events" widget) and the `taipei-annual-events` post.

**How this was checked**
- WebFetch and direct page fetches were blocked, so **every fact below comes from search-engine snippets (s)**. Nothing was confirmed on a live official page. 15 web searches were used.
- Lunar dates were computed from new-moon times (Meeus algorithm, Taipei time). They match the 2026 entries already on the site, the snippet dates for Lunar New Year, Dragon Boat and Mid-Autumn 2027, and the fixed 2026 lunar dates.

## What changed

**events.json: 62 → 124 entries.** All 60 recurring 2026 events now have a 2027 entry. Kodaline and Shrek the Musical were one-off shows, so they weren't carried over. Two new 2027 events were added: Taipei Game Show and the WBSC Premier12 Taipei rounds. Lunar New Year 2027 is a new "Year of the Goat" entry. The file is still sorted by start date, then name. Same-name events never overlap, so the widget's `key={event.name}` stays unique.

**taipei-annual-events post.** Title is now "Taipei Annual Events Calendar 2026–2027" and the excerpt mentions both years. `modified` is 2026-10-27 12:00:00. The January–July headings now say "2026", and their ids are unchanged so old anchors still work. A full "Taipei Events Calendar 2027" section was added after December 2026: an intro, a second month grid and twelve `Month-2027` sections, covering every 2027 event in events.json plus the page-only items (Presidential open days, spring hiking, outdoor concerts). Edit script: `scripts/extend-events-2027.mjs`.

## 2026 entries corrected (in both files)
| Event | Was | Now | Source |
|---|---|---|---|
| Taipei International Book Exhibition | 3–8 March 2026 | 3–8 February 2026 | Taiwan News / CNA (s): 34th TIBE, 3–8 Feb, TWTC Hall 1 |
| Standard Chartered Taipei Marathon | 8 November 2026 | Renamed Standard Chartered Taipei Charity Marathon; 11 January 2026 | udn / China Times (s): the 2027 race "is a day earlier than 2026's on 11 January" |
| COMPUTEX | 2–6 June | 2–5 June 2026 | Wikipedia (s) |
| Ghost Month | ends 11 Sept | ends 10 Sept 2026 | Computed: the 8th lunar month starts 11 Sept 2026 |
| Taipei Lantern Festival | late Feb – 8 March | 25 Feb – 15 March 2026 | Snippet summarising PTS/CNA: "預計2月25日開幕…至3月15日" (expected dates). **Medium confidence.** The old dates may have been New Taipei's Sanchong lantern show (20 Feb – 8 Mar) |
| Taiwan LPGA Championship | old Swinging Skirts name | Taiwan Foxconn Ladies Golf Tournament, 12–15 March 2026, Orient G&CC, Taoyuan (JLPGA event) | Kyodo / PR Newswire / Focus Taiwan (s) |
| NYE fireworks url | `/taipei-101` | `/taipei-101-fireworks-new-years-eve` | (more specific guide) |

## 2027: confirmed (as seen in snippets)
- **Public holidays** (DGPA 2027 calendar, reported by bnext, udn, 104, CW): Lunar New Year holiday 4–10 Feb (eve 5 Feb, New Year's Day 6 Feb). Qingming 5 Apr, with a holiday 3–6 Apr. Dragon Boat 9 Jun (Wed). Mid-Autumn 15 Sep (Wed). Double Ten long weekend 9–11 Oct. 31 Dec 2027 (Fri) is a holiday because 1 Jan 2028 is a Saturday.
- **Lunar dates** (computed): Lantern Festival 20 Feb. Baosheng Emperor's birthday 21 Apr. Qixi 8 Aug. Ghost Month 2–31 Aug, with the main day on 16 Aug.
- **Taiwan Lantern Festival**: Miaoli County, **20 Feb – 7 Mar 2027 (provisional)**. Source: CNA and udn (s), with the venue at the Miaoli HSR station special district. The when text says "provisional".
- **Taipei Game Show**: 21–24 Jan 2027, Nangang Hall 1. Source: Game Developer press release, Back2Gaming (s).
- **Standard Chartered Taipei Charity Marathon**: 10 Jan 2027, with full, half, 12km and 3km courses. Source: udn / China Times / NOWnews (s), announced 26 Aug 2026.
- **COMPUTEX**: 1–4 Jun 2027. Source: Wikipedia and several trade-fair listings (s). One listing (Vdura) says TAITRA hasn't confirmed this. **Recheck on computextaipei.com.tw.**
- **WBSC Premier12, Taipei rounds**: Taipei Dome, Group A opening round 8–12 Nov and second round 13–15 Nov 2027. The Super Round and final are in Tokyo, 18–21 Nov. Source: Focus Taiwan / Taipei Times / Taiwan News (s), Aug 2026.
- **Fixed-date events**: Teachers' Day 28 Sep, Double Ten 10 Oct and NYE 31 Dec.

## 2027: estimated (when text says "Usually …" / "TBC")
Every other 2027 entry uses its usual timing, based on the 2026 pattern. The start and end dates are a best-guess window, and the `when` text says TBC. Points to note:
- **Pingxi Sky Lantern Festival**: set to 17–21 Feb, around the Lantern Festival. Sources disagree: one says the MOI religious culture map lists **17 Feb**, and another guide says **21 Feb**.
- **Taipei Lantern Festival**: mid-Feb to early Mar (13 Feb – 7 Mar). No 2027 announcement found.
- **TIBE**: wide window, 25 Jan – 28 Feb. It fell before Lunar New Year in 2026 and after it in 2025, so it could go either way in 2027.
- **Dihua Street New Year market**: 21 Jan – 4 Feb, the usual fortnight before New Year's Eve.
- **Baosheng Emperor festival**: moves into April (10 Apr – 9 May) because the lunar birthday is 21 Apr. In 2026 it was 1 May.
- **Foxconn Ladies golf**: 11–14 Mar, based only on 2026 being 12–15 Mar. No 2027 date was found.
- **Pride**: last Saturday of October, 30 Oct. **Taipei Marathon**: third Sunday of December, 19 Dec (2025 and 2026 followed this pattern). **Christmasland 2027** runs to 2 Jan 2028.
- **Nuit Blanche, Ultra Taiwan**: the text says "Early/Mid-November in 2026 (2027 TBC)" because one year isn't a pattern.

## Still needs checking
1. Official 2027 dates, as they're announced: Taipei Lantern Festival, Pingxi (17 vs 21 Feb), TIBE, Dihua Street market, CPBL opening day, Foxconn Ladies, Taipei Film Festival, Dadaocheng fireworks, Creative Expo, Taipei Arts Festival, Fringe, Golden Horse, Nuit Blanche, Christmasland, Taipei Marathon.
2. Whether Ultra Taiwan, Jam Jam Asia, Trendy Taipei, Herbal Party and the Burger Carnival are really annual. The 2026 entries were the only evidence.
3. The 2026 Taipei Lantern Festival correction (medium confidence), and whether the 2026 Golden Horse awards really fall on 21 Nov.
4. **Not changed (out of scope)**: `components/UpcomingEvents.tsx` still labels the homepage link "Full 2026 calendar". It should probably become "Full events calendar" or "2026–27 calendar".
