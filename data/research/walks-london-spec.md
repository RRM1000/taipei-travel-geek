# London Travel Geek walk pages: design spec and Taipei parity checklist

Researched 2026-10-27 from the read-only clone at `/home/user/rrm1000/london-travel-geek` (Astro 7). Paths below are relative to that repo unless they start with `app/`, which means the Taipei repo. Line numbers are as of this date.

---

## 1. How a London walk page is built

London has no dedicated walk component or walk layout. A walk is an ordinary article. Four pieces make it a walk:

| Piece | File | What it does |
|---|---|---|
| Route data, one file per walk | `src/data/routes/<slug>.ts` (18 files) | An array of `RouteMapStop`: `stop` (a string such as "1", "5" or "+"), `name`, `note` (one short clause), `latitude`, `longitude`, `articleAnchor` (`#1-westminster-bridge`), `onRoute?`. |
| Registry | `src/data/routeMaps.ts:1-61` | Types, plus `routeMaps: Record<slug, RouteMapStop[]>`. `routeConnections` (lines 63-150) is defined but nothing imports it. The "Carry on walking" sections are written by hand. |
| Map markup | Hand-written HTML in each article's markdown, under `## The route` (for example `src/content/articles/westminster-walk.md:45-61`) | A `<details class="restaurant-map-shell" open>` holding the map div `data-route-map="<slug>"`, a legend and a `<noscript>`. |
| Map script and CSS | `src/layouts/ArticleLayout.astro`: script at 534-916 (route map at 812-916), CSS at 2366-2582 and 2643-2673 | Loads Leaflet from unpkg, draws numbered pins and a dashed polyline, and adds popups. |

Other pieces that are specific to walks:

- **Walk detection**: `ArticleLayout.astro:216-220`. A page counts as a walk when its tags include `walks`. That turns on the "One of N self-guided London walks" note at lines 343-348 (CSS at 1115-1121).
- **The "Open in Google Maps" link** is a markdown line written by hand straight after `</details>`. No script generates it, even though the skill says to generate it. I checked all 18 walks with a script: in 16 of them the URL points match the walk's `onRoute` stops in order. Banksy and Harry Potter are split into several links on purpose (some legs are by train), and their points also match.
- **Authoring rules**: `.claude/skills/walking-route/SKILL.md` covers the section order (line 146 on), the Maps URL format and the 11-point limit (125-144), anchors (111-123) and `smoothFactor: 0` (228-232).
- **Area-guide band**: in `src/components/AreaAtAGlance.astro:125-131,359-404`, the `walkingRoute` frontmatter adds a "Walking route → label · 11 stops · 3km · 2–3 hours" link band to the area guide.
- **No GeoJSON, GPX or routed street geometry.** The line on the map is straight dashed segments between stop coordinates. Coordinates come from Nominatim (SKILL.md section 2). No script generates route data. `scripts/preview-article.mjs` is the only script that touches routes.

### The three walks I traced

1. **`westminster-walk`** is the standard shape. It has 11 on-route stops plus one "+" detour (Westminster Cathedral, hollow pin, off the line) and one Maps link with 11 points: origin, 9 waypoints, destination.
2. **`city-of-london-walk`** shows how alternatives work. Three entries share `stop: "5"`: one is `onRoute`, and the other two are hollow and off the line. The legend's second key says "Alternatives — pick one" and shows a hollow **5**.
3. **`banksy-walk-london`** is a multi-modal walk. It has 8 stops and two "+" detours. Under the map is an italic note: *"The dashed line joins the stops in order. From 2 to 3 and from 7 to 8 you are on a train, so across those two legs it is a straight line rather than a street route."* Then come **four** Maps links: walking, `travelmode=transit`, walking, transit.

---

## 2. Page structure, in order

All of this comes from `ArticleLayout.astro:269-449` and `westminster-walk.md`.

1. **Hero banner** (lines 271-312). A full-width photo (Astro `<Image>`, widths 720/1080/1440/1920, `sizes="100vw"`, `loading="eager"`) under a navy gradient overlay: `rgb(14 27 44 / .55)` at 0%, `.7` at 55%, `.94` at 100% (992-1001). On top of it: breadcrumbs, an eyebrow showing the category link in `--highlight` amber, the H1 (`clamp(2.4rem, 6.5vw, 4.8rem)`, line-height 1.1, white with a text-shadow), and the description (1.25rem, white at 92%). The photo credit and licence go in the bottom line (0.74rem, white at 65%). Hero padding is `clamp(3.5rem,8vw,6rem) 0 3rem`, and `2rem 1.75rem` at ≤48rem (1004-1014).
2. **Sub-hero meta**: "Updated X · First published Y", plus tag pills (radius 999px, 0.76rem).
3. **Two-column grid** (1151-1157): `minmax(0, 44rem)` for the body and `minmax(14rem, 20rem)` for a sticky sidebar holding the table of contents and a tours or hotels card. Gap 3.5rem. Collapses to one column at ≤52rem (2643-2646).
4. **Walks note** (343-348): "**One of {N} self-guided London walks on this site.** See every walk, from the South Bank to Hampstead Heath." It has a 3px left border in `--accent`, a white background, `0.7rem 1rem` padding, 0.95rem text and a 2.25rem bottom margin.
5. **Mobile table of contents** (≤52rem only).
6. **Opening prose**: what most people get wrong, with **distance and time in bold inside a paragraph** ("about **4km, two to three hours** with stops"), then a link to the area guide.
7. **"The Short Version" callout**: a `> 💡 **The Short Version:** …` blockquote (CSS 1247-1259: 0.3rem left border in `--accent`, `--surface-strong` background, display font at 1.2rem).
   - **There is no structured summary box** with distance, time, start and end fields on London walk pages. Distance and time are in the opening prose. Start and finish appear as "**Start:** … **Finish:** …" under `## Getting there and back`. The only structured version is the area-guide band in `AreaAtAGlance`. If Taipei adds a summary box, that is an addition beyond London, not parity.
8. **`## The route`**, which contains:
   1. the map `<details>` (section 3 below)
   2. an optional italic note about the line (Banksy only)
   3. the **Google Maps link paragraph** (section 4 below)
   4. a **stops table**: `| # | Stop | Cost | Open |`, with numbers in bold (`**1**`) and `**+**` for detours. Banksy uses `# | Stop | Banksys | Cost | Getting there`.
   5. `---` (an `hr`: 3rem margin-block and a 1px `--line` top border).
9. **One `## N. Stop name` section per stop.** These are always h2, and the slug becomes the popup anchor (`#1-westminster-bridge`). Inside each:
   - an optional photo with descriptive alt text, then an italic caption line (`*Westminster Bridge, looking back at Parliament. Photo: [credit](src), [licence](url).*`), which CSS shrinks to 0.88rem in `--muted` (1189-1204)
   - a bold lead sentence, then prose
   - `> 💡` tip and `> ⚠️` warning callouts
   - GetYourGuide widgets and `<div data-stay-strip>` placed automatically.

   Detours get their own `## The detour: …` section.
10. `## Where to eat`, then `## The best day to go` (a day table, then what closes and what does not), then `## Getting there and back` (**Start:** / **Finish:** with stations and lines, step-free notes, reversing the route), then `## Carry on walking` (links to walks that start nearby), then `## What to do with the rest of the day`.
11. **FAQ** from frontmatter `faq:` (5-6 entries), rendered by `src/components/ArticleFaq.astro` with `FAQPage` JSON-LD.
12. **Related guides** (three cards).

---

## 3. The map

### Markup (copied exactly in every walk; `westminster-walk.md:47-61`)

```html
<details class="restaurant-map-shell" open>
  <summary>
    <span>Map of the walk, numbered in walking order</span>
  </summary>
  <div class="restaurant-map" data-route-map="westminster-walk" role="region"
       aria-label="Numbered map of the Westminster walking route from Westminster Bridge to Trafalgar Square">
    <p>Loading the map…</p>
  </div>
  <div class="restaurant-map-legend" aria-label="Map key">
    <span><i class="route-map-marker" aria-hidden="true">1</i> On the route, in walking order</span>
    <span><i class="route-map-marker route-map-marker--alt" aria-hidden="true">+</i> Optional detour</span>
  </div>
  <noscript>
    <p>The map needs JavaScript. Every stop below is numbered in walking order with its nearest station.</p>
  </noscript>
</details>
```

The `<details>` is **open by default**, and the user can collapse it.

### Script (`ArticleLayout.astro:812-899`)

```js
const map = L.map(element, { scrollWheelZoom: false });
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);
// for each stop:
const icon = L.divIcon({
  className: "route-map-marker-wrap",
  html: `<span class="route-map-marker${stop.onRoute ? "" : " route-map-marker--alt"}">${stop.stop}</span>`,
  iconSize: [28, 28], iconAnchor: [14, 14], popupAnchor: [0, -16],
});
L.marker(position, { icon, title: stop.name, alt: stop.name }).addTo(map).bindPopup(content);
// line through onRoute stops only, in array order:
L.polyline(line, { color: "#c2410c", weight: 3, opacity: 0.7, dashArray: "6 6", smoothFactor: 0 }).addTo(map);
map.fitBounds(L.latLngBounds(positions), { padding: [30, 30], maxZoom: 16 });
```

| Setting | London value |
|---|---|
| Library | **Leaflet 1.9.4**, CSS and JS from `https://unpkg.com/leaflet@1.9.4/dist/leaflet.{css,js}`. Injected at runtime and deduplicated with `data-leaflet-styles` and `data-leaflet-script` (578-615). No SRI hash. |
| Tiles | Standard OSM, `https://tile.openstreetmap.org/{z}/{x}/{y}.png`, `maxZoom: 19` |
| Attribution | `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`, in Leaflet's default bottom-right control |
| Markers | Round `divIcon`, 28×28, anchored at the centre, showing the stop number. On-route pins are filled `#c2410c` with a 2px white border and a white numeral. Alternatives and detours (no `onRoute`) are hollow: white fill, `#c2410c` border and numeral. |
| Numbering | The `stop` string from the data, shown as written. Duplicates ("5" three times) and "+" are allowed. |
| Line | `#c2410c`, weight 3, opacity 0.7, dash `"6 6"`, `smoothFactor: 0` so no stop vertex gets simplified away. Only `onRoute` stops, in array order. Straight segments, not street routing. |
| Fit | `fitBounds` over **all** stops, detours included, padding `[30,30]`, `maxZoom: 16` |
| Zoom controls | Leaflet default (+/− at top left). Not customised. |
| Scroll wheel | `scrollWheelZoom: false`. Dragging and touch keep Leaflet defaults, so one-finger pan works on mobile and there is no gesture lock. |
| Popup | `.restaurant-map-popup`: `<strong>N. Name</strong>`, `<span>note</span>`, and a "Read about this stop" link to `articleAnchor`. **No per-stop Google Maps link in route popups.** Restaurant and area popups do have one. |
| Height | `min-height: 32rem` (512px) on desktop and **25rem (400px) at ≤52rem** (2395-2411, 2670-2672). Width 100%. |
| Stacking | `position: relative; z-index: 0` on `.restaurant-map`, so Leaflet panes (z 200-700) stay under the sticky header (z 90). See the comment at 2400-2408. |
| Lazy-load | Leaflet is fetched only when a `[data-route-map]` is in an open `<details>`, or on the first `toggle` to open (901-916). Walk maps are open, so on walk pages Leaflet loads straight after the page script runs. There is no IntersectionObserver. Pages without a map never fetch Leaflet. |
| Resize | `map.invalidateSize()` in a `setTimeout(0)` on every reopen (890-893) |
| Error fallback | The map div is replaced with "The map could not load. The stops are numbered in walking order in the guide below, each with its nearest station." and `mapReady` is cleared so the next open retries (894-898). |

A known London inefficiency: `import { routeMaps } from "../data/routeMaps"` at line 536 bundles the data for all 18 routes into the client script on **every** article page. Taipei should ship only the current walk's stops, for example as a JSON data island like `AreaMap.astro:86` uses.

---

## 4. The "Open in Google Maps" link

- **Placement**: the first paragraph after `</details>`, before the stops table.
- **Markup**: `**[Open the whole route in Google Maps →](URL)** — all eleven stops in walking order, set to walking directions, which is the version to put on your phone.`
  - The label is exactly "Open the whole route in Google Maps →", in bold, with the arrow inside the link.
  - The trailing explanation after an em dash is plain text.
- **URL format**:
  ```
  https://www.google.com/maps/dir/?api=1&origin=LAT,LNG&destination=LAT,LNG&waypoints=LAT,LNG%7CLAT,LNG…&travelmode=walking
  ```
  - Coordinates go in raw, with 6 decimals and no place names.
  - `|` is encoded as `%7C`.
  - Only `onRoute` stops go in, in order: origin is the first, destination the last, and waypoints the rest.
  - **The hard limit is 11 points** (origin + 9 waypoints + destination). Longer or multi-modal routes are split into several bulleted links per leg, each with its own `travelmode` (Banksy).
- **Styling**: none of its own. It inherits `.article__body a` (1221-1224): `color: var(--accent)` `#d6392f`, `font-weight: 700`, plus the base underline from `global.css:187-197` (0.07em thick, 0.2em offset, accent colour at 55% opacity, full accent on hover). It opens in the **same tab**: no `target` or `rel`, because markdown links get none.

---

## 5. CSS reference (London `ArticleLayout.astro`)

| Element | Rule (line) |
|---|---|
| `.restaurant-map-shell` | `margin-block: 1.5rem 2.25rem; overflow: hidden; border: 1px solid var(--line) /*#e2dbcf*/; border-radius: var(--card-radius) /*1rem*/; background: var(--surface) /*#fff*/; box-shadow: var(--shadow)`. `--shadow` is **undefined** in London, so in practice there is no shadow (2366-2373). |
| `summary` | `display:flex; align-items:center; justify-content:space-between; gap:1rem; padding:1rem 1.15rem; background: var(--surface-strong) /*#f0ebe2*/; color: var(--ink) /*#0e1b2c*/; font-family: var(--display) /*Fraunces*/; font-weight:800; cursor:pointer` (2375-2386). At ≤52rem it becomes a column with gap .2rem (2664-2668). Because it is `display:flex`, the native disclosure triangle is hidden. |
| `.restaurant-map` | `width:100%; min-height:32rem; background: var(--surface-strong); font-size:.9rem; position:relative; z-index:0` (2395-2411). 25rem at ≤52rem. |
| `.restaurant-map > p` (placeholder) | `padding:2rem; text-align:center` (2413-2416) |
| `.restaurant-map-legend` | `display:flex; flex-wrap:wrap; gap:.75rem 1.25rem; padding:.85rem 1.15rem 1rem; color: var(--muted) /*#5a6a7d*/; font-size:.78rem; font-weight:750` (2418-2426). Each span is `inline-flex; align-items:center; gap:.45rem` (2428-2432). |
| `.route-map-marker-wrap` | `border:0; background:transparent` (2533-2536). This removes Leaflet's white divIcon box. |
| `.route-map-marker` | `display:grid; place-items:center; width:1.75rem; height:1.75rem; border:2px solid white; border-radius:50%; background:#c2410c; box-shadow:0 .2rem .65rem rgb(0 0 0/.35); color:white; font-family:var(--display); font-size:.85rem; line-height:1` (2538-2551). The legend reuses the same class on `<i>`. |
| `.route-map-marker--alt` | `background:white; border-color:#c2410c; color:#c2410c` (2555-2559) |
| `.restaurant-map-popup` | `display:grid; gap:.35rem; min-width:12rem; font-family:var(--body); line-height:1.35`. `strong` uses the display font at 1rem, `> span` is flex-wrap with gap `.25rem .75rem`, and `a` is .8rem (2561-2582). |
| Body | `.article__body` font-size 1.08rem (1159-1162). h2 is `margin:3.25rem 0 1rem; font-size:clamp(1.8rem,4vw,2.65rem); scroll-margin-top:2rem` (1206-1210). |
| Table | 1px `--line` border, radius 1rem, `box-shadow:0 .5rem 1.5rem rgb(15 39 54/.06)`, .9rem, tabular numbers (1306-1319). `th` is `--ink` background, white, display font .78rem, uppercase, .04em tracking (1530-1537). Even rows are `--bg`, hover is `--surface-strong`, cells are padded `.75rem .8rem` (1515-1557). |
| Focus | `global.css:199-205`: `a, button, input, summary:focus-visible { outline: 3px solid var(--highlight) /*#f2a93b*/; outline-offset: 3px; border-radius: 2px }` |
| Breakpoints | 52rem (832px) for the grid collapse and the map height; 48rem (768px) for hero padding and the at-a-glance band; 40rem for photo rows |

### Suggested London → Taipei token mapping (`app/globals.css:3-26`)

| London token (value) | Used on walks for | Taipei token (value) | Note |
|---|---|---|---|
| `--bg` `#faf7f2` | page, even table rows | `--paper` `#f7f4ed` | |
| `--surface` `#ffffff` | map shell, walks note | `--white` `#ffffff` | |
| `--surface-strong` `#f0ebe2` | summary band, map placeholder, callouts | `--surface-alt` `#f4f1ea` | |
| `--ink` `#0e1b2c` (navy) | summary text, `th` background, strong | `--navy` `#132230` for headings, summary and `th`; `--ink` `#171817` for strong | Taipei already uses `--navy` for h2 and `th` |
| `--ink-soft` `#22344a` | body copy | `--ink-body` `#2d312e` | |
| `--muted` `#5a6a7d` | legend, captions | `--muted` `#686b67` | 5.09:1 on `--surface`, 4.79:1 on `--surface-alt` (passes AA) |
| `--accent` `#d6392f` | links, walks-note border, callout border | `--red-dark` `#d92e2a` for link text (Taipei's `.article-content a` already uses it, `app/globals.css:926`); `--red` `#ef3f3a` for borders and decoration | |
| `--accent-deep` `#b02c24` | hover | none. Taipei hovers to `--red` | |
| `--highlight` `#f2a93b` | focus ring, hero eyebrow | **no equivalent.** Taipei has almost no `:focus-visible` rules (only `.hero-step`, line 326) | Add a focus style for `summary` and map links |
| `--line` `#e2dbcf` | shell border, table rules | `--line-soft` `#e7e3d9` for hairlines, or `--line` `#d8d5cd` for the shell border to match Taipei tables | |
| `--display` Fraunces | summary, markers, popup title | `--font-serif` Newsreader | |
| `--body` Hanken Grotesk | popup, legend | `--font-sans` Inter | |
| `--card-radius` `1rem` | shell, tables | `12px` (Taipei table radius, line 1110), or 16px for exact parity | Pick one and use it on both shell and table |
| route `#c2410c` (literal, not a token) | pins and line | new `--route` token. Either keep `#c2410c` (white text 5.18:1) or use `--red-dark` `#d92e2a` (4.8:1) | **Do not use `--red` `#ef3f3a` behind white numerals: 3.86:1 fails AA for 13.6px text** |

---

## 6. Accessibility and performance

What London does:

- The map container has `role="region"` and a specific `aria-label` ("Numbered map of the X walking route from A to B").
- The legend has `aria-label="Map key"`, and its sample pins are `aria-hidden="true"`.
- Markers set `title: stop.name` and `alt: stop.name`. With a `divIcon`, Leaflet ignores `alt` (it applies only to image icons), so `title` is the hover label. Leaflet 1.9 makes markers focusable (`tabindex=0`, `role=button`). Enter opens the popup, and the map pans with the arrow keys and zooms with +/− when focused. These are Leaflet defaults, not London code.
- The popup is built with `textContent`, not innerHTML, so data cannot inject markup. Its "Read about this stop" link goes to the in-page h2 anchor, and h2s have `scroll-margin-top`.
- Every page photo has descriptive alt text (frontmatter `heroImageAlt` and markdown `![...]`). Captions carry credit and licence.
- `summary:focus-visible` gets a 3px amber outline.
- **No-JS fallback** has four parts:
  - a `<noscript>` explanation
  - the stops table, which works without JS
  - the Google Maps link, which is a plain link
  - the numbered h2 per stop.

  A gap to note: without JS, "Loading the map…" stays in the map div. Taipei could do better, for example by hiding the empty map area with `<noscript>` CSS or by not writing the placeholder.
- **Reduced motion**: nothing specific to the map. The global rule at `global.css:421-430` clamps all transitions to 0.01ms, which also shortens Leaflet's CSS zoom animation. Leaflet's JS pan animation is untouched. To do better, Taipei could pass `zoomAnimation: false` / `fadeAnimation: false` when `matchMedia('(prefers-reduced-motion: reduce)')` matches.
- **Attribution**: the OSM credit is always visible in Leaflet's control. Only the standard OSM tile server is used, under its usage policy.
- **Performance**:
  - Leaflet is never in the main bundle. It is injected from unpkg only when a map is open or opened, and only once per page, deduplicated by data attributes.
  - Maps sit inside a container with a fixed `min-height`, which avoids layout shift.
  - `scrollWheelZoom: false` stops the map trapping page scroll.
  - Gaps:
    - all routes' data ships on every article page
    - there is no `preconnect` to unpkg or the tile host
    - there is no SRI
    - open maps load immediately, even below the fold.
- **Error handling**: a readable fallback message when Leaflet fails, with a retry on the next open.

---

## 7. Review checklist for the Taipei implementation

Mark each item **PASS** or **FAIL**. Items marked *(improvement)* go beyond London and are optional for parity.

### A. Data
- [ ] A1. Each walk's stops live in one data file or record per walk (number, name, short note, lat, lng, anchor, onRoute), not scattered through the HTML.
- [ ] A2. The stop numbers on the map, in the stops table and in the stop h2s all agree.
- [ ] A3. Every `articleAnchor` resolves to a real `id` on the rendered page. Check the built DOM, not the source.
- [ ] A4. Alternatives and detours (no `onRoute`) are supported. They render hollow, sit off the line, and are still included in `fitBounds`.
- [ ] A5. Coordinates are correct for Taipei. Spot-check 3 per walk against OSM. Watch the lat/lng order: Taipei's `data/maps/*.json` stores `lng`/`lat` separately, and a `path` is stored `[lng, lat]`, while Leaflet takes `[lat, lng]`.

### B. Page structure
- [ ] B1. Hero with photo, gradient overlay, breadcrumbs, H1, description and photo credit, in that order.
- [ ] B2. A walks note near the top ("One of N self-guided Taipei walks… See every walk") linking to the walks tag or hub page, with N worked out at build time.
- [ ] B3. Opening prose states the distance and time. A "Short Version" callout comes before the route section.
- [ ] B4. The `The route` h2 is followed in order by: map block, any line note, Google Maps link, stops table (`# | Stop | Cost | Open`), and a rule.
- [ ] B5. One h2 per stop, `N. Name`, each with an optional photo, alt text and an italic caption.
- [ ] B6. The tail sections exist in order: Where to eat, The best day to go, Getting there and back (with **Start:** and **Finish:** stations), Carry on walking, What to do with the rest of the day, then the FAQ with FAQPage JSON-LD.
- [ ] B7. *(improvement)* If a distance/time/start/end summary box is added, its values match the prose and the Getting there section.

### C. Map
- [ ] C1. Leaflet 1.9.4, or a deliberate newer version that is pinned to an exact version.
- [ ] C2. Tiles are `https://tile.openstreetmap.org/{z}/{x}/{y}.png`, maxZoom 19.
- [ ] C3. The attribution reads exactly "© OpenStreetMap contributors", links to `https://www.openstreetmap.org/copyright`, and is visible.
- [ ] C4. Pins are round, 28px (1.75rem), with a 2px white border, a white serif numeral at 0.85rem and the shadow `0 .2rem .65rem rgb(0 0 0/.35)`. The Leaflet divIcon white box is removed.
- [ ] C5. Alternative pins are a white fill with the route colour for border and numeral.
- [ ] C6. The line is the route colour, weight 3, opacity 0.7, dash "6 6", `smoothFactor: 0`, through **every** onRoute stop in order and through no detours. Check visually that no vertex is skipped.
- [ ] C7. `fitBounds` covers all stops with padding 30px and maxZoom 16.
- [ ] C8. `scrollWheelZoom: false`. Default +/− zoom control is present. Page scroll is not trapped on desktop or mobile.
- [ ] C9. Height is min 512px on desktop and 400px at ≤832px. There is no layout shift when the map loads.
- [ ] C10. The map sits below the sticky header when scrolling: it has its own stacking context, and no pins or popups paint over the nav.
- [ ] C11. The popup shows "N. Name", the note, and a "Read about this stop" link that jumps to the right h2 and is not hidden under the sticky header (Taipei uses `scroll-margin-top: 140px`).
- [ ] C12. The map is wrapped in an **open** `<details>` with the summary "Map of the walk, numbered in walking order". After collapsing and reopening, the map redraws correctly (`invalidateSize`).
- [ ] C13. The legend appears under the map with sample pins: "1: On the route, in walking order" and "+: Optional detour", or "N: Alternatives — pick one".
- [ ] C14. If Leaflet fails to load (block unpkg in devtools), a readable fallback message appears.
- [ ] C15. *(improvement)* If the stored My Maps street path is drawn instead of straight segments, it still passes through every numbered stop, and the dashed style stays the same.

### D. Google Maps link
- [ ] D1. Placed directly under the map block, before the stops table.
- [ ] D2. The label is exactly **"Open the whole route in Google Maps →"**, bold, followed by "— all N stops in walking order, set to walking directions…".
- [ ] D3. The URL is `https://www.google.com/maps/dir/?api=1&origin=…&destination=…&waypoints=…%7C…&travelmode=walking`, with raw `lat,lng`.
- [ ] D4. Its points equal the onRoute stops exactly, in order. Ideally the URL is generated from the same data file so the two cannot drift apart.
- [ ] D5. No more than 11 points per link. Longer or multi-modal walks are split into per-leg links.
- [ ] D6. It is styled as an article link (Taipei `.article-content a`, `--red-dark`, weight 600-700, underlined). Taipei adds an external-link icon to `a[href^="http"]`. That is acceptable, but check it does not wrap awkwardly after the →.
- [ ] D7. Tested on a phone: the link opens Google Maps with walking directions and all stops.

### E. Styles and tokens
- [ ] E1. Colours use Taipei tokens as mapped in section 5. The route colour has its own token, and white numerals on it reach ≥4.5:1, so not `--red` `#ef3f3a`.
- [ ] E2. Map shell: 1px border, a 12px or 16px radius matching Taipei tables, a white background, and overflow hidden.
- [ ] E3. Summary band: `--surface-alt` background, `--navy` text, serif bold, padding `1rem 1.15rem`. It stacks to a column at ≤832px.
- [ ] E4. Legend: `--muted`, 0.78rem (about 12.5px), bold, padding `.85rem 1.15rem 1rem`, gap `.75rem 1.25rem`, wrapping.
- [ ] E5. Popup: grid with gap .35rem, min-width 12rem (192px), serif 1rem title, 0.8rem links.
- [ ] E6. Stops table uses Taipei's existing table style: navy header, uppercase, 12px radius.
- [ ] E7. No horizontal page scroll at 360px width. The table scrolls inside its own wrapper.

### F. Accessibility
- [ ] F1. The map container has `role="region"` and a specific `aria-label` naming the walk, its start and its end.
- [ ] F2. The legend has `aria-label="Map key"`, with its sample pins `aria-hidden`.
- [ ] F3. Markers have `title` set to the stop name. They are reachable with Tab, and Enter opens the popup.
- [ ] F4. Popup content is built with textContent or escaped. No raw HTML from data.
- [ ] F5. The `summary` and the map links have a visible `:focus-visible` outline. Taipei currently has none for these.
- [ ] F6. Every photo has meaningful alt text, and the hero alt is not empty.
- [ ] F7. No-JS: there is a `<noscript>` message, and the stops table, stop sections and Google Maps link all work without JS.
- [ ] F8. Reduced motion: no new animations are added without a `prefers-reduced-motion` override. *(improvement)* Leaflet animations are turned off under reduced motion.

### G. Performance
- [ ] G1. Leaflet JS and CSS load **only** on walk pages, and only when the map's `<details>` is open or opened. Check the network tab on a non-walk article.
- [ ] G2. Leaflet loads once per page even with several maps, and is deduplicated.
- [ ] G3. Only the current walk's stop data reaches the client, not every walk's (London's gap).
- [ ] G4. Leaflet is not in the shared JS bundle for every page. It is a dynamic import or a runtime script tag.
- [ ] G5. The Google My Maps `<iframe>` it replaces is removed from walk pages, with no double maps.
- [ ] G6. *(improvement)* A preconnect to the Leaflet host and the tile host on walk pages only, or an SRI hash on the CDN script.
