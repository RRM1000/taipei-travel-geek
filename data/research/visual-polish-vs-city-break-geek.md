# Visual polish: Taipei Travel Geek vs City Break Geek

Research only. No code was changed. Researched 27 October 2026 against the TTG dev server (http://localhost:3100, branch `claude/ugc-site-monetization-q0kvvv`) and live City Break Geek (https://www.citybreakgeek.com, repo `C:\Users\rober\Projects\europe-travel-geek`).

Screenshots are in `C:\Users\rober\AppData\Local\Temp\claude\C--Users-rober-Projects-taipei-travel-geek\62735dd6-aa30-4f42-814e-476f7e3c7fd9\scratchpad\visual\` and are referred to by filename below.

---

## Executive summary

City Break Geek looks more professional because it is **one system applied everywhere**: one tokens file (`src/styles/tokens.css`), one spacing scale (`--space-1` to `--space-7`), one radius scale, one shadow scale, one display font and one body font, a two-column article layout with a 704px reading column, and no legacy markup. Every heading, card, table and callout is built from the same few values.

Taipei Travel Geek has good pieces: the hero carousel, the category archive cards, the quick verdict box and the sticky contents card. The problems come from **drift and leftovers**:

1. **There is no type scale.** `app/globals.css` uses 29 different px font sizes, including 10.5, 11.5, 12.5, 13.5 and 15.5. Homepage section headings switch between Inter and Newsreader at the same 64px size, because the serif is applied by a class allow-list (`.intro h2, .featured h2, .planning h2`) rather than to all headings (`ttg-home-desktop-3-events-heading.jpg`).
2. **The reading column is squeezed.** The three-column article layout (280 / content / 300) leaves the body only **541px wide at 1280px**, against CBG's 704px. Every photo, map and table is cramped, and the two-up hotel galleries collapse to one image per row (`ttg-stay-desktop-3-gallery-stacked.jpg`).
3. **Legacy WordPress markup is still in the content.** 205 of 315 posts contain `wp-block-gallery` (786 instances), and there are 1,968 inline `style=""` attributes and 2,477 `wp-block-image` figures. The new hotel galleries were written with inline grid, height and caption styles, which global CSS then half-overrides.
4. **The mobile header is broken.** At 375px the hamburger button covers the wordmark, so the logo reads "TAIPEI TRAVEL GEE" (`ttg-stay-mobile-1-header-clipped-hero.jpg`).
5. **Images are not responsive.** No image on the site has a `srcset`. Article heroes are 1024px JPEGs stretched across a full-bleed 1280px+ hero, so they look soft on retina. 21 of 43 content images on /ximending have no width or height. The August Lighthouse run measured the homepage at 12 to 15 MB with a mobile LCP of 10 to 20 seconds, mostly from third-party Klook widget images (one 9.4 MB hotel photo).
6. **Accessibility details are missing.** White on `--red` (#ef3f3a) is 3.86:1, and `--red-dark` text on paper is 4.37:1. Both fail AA for the small uppercase labels and buttons that use them. Only one `:focus-visible` rule exists in 3,182 lines of CSS.

Most of the gap can be closed without a redesign: tokens and a type scale, a wider reading column, a content migration script for galleries, a fixed mobile header, and responsive images. Only the header, footer and the right rail are worth a larger redesign.

---

## Side-by-side

| Area | Taipei Travel Geek | City Break Geek | Gap |
|---|---|---|---|
| **Token system** | 11 custom properties in `:root` (`app/globals.css` lines 3–26); 73 distinct hex colours in the file; no spacing, radius or shadow tokens | `tokens.css`: 19 colour tokens with documented roles, `--card-radius: 1rem`, `--shadow-sm/md/lg`; `global.css`: `--space-1..7`, `--radius-sm/md/lg`, `--page-width: 76rem`, `--reading-width: 44rem`, `--transition` | High |
| **Fonts** | Newsreader (serif) + Inter, loaded from Google Fonts CSS (external, render-blocking request); 8 static weights; Arial hard-coded in the weather strip and the Klook/Wise CTAs | Fraunces Variable + Hanken Grotesk Variable, self-hosted via `@fontsource-variable`; `font-variation-settings` for weight and optical size | Medium |
| **Type scale** | 29 px sizes. h1 52–88px (line-height .96), article h2 34px fixed, h3 25px, body 17px/1.75. Homepage h2s are Inter 64px, Newsreader 64px and Newsreader 36px on one page | h1 `clamp(2.4rem, 6.5vw, 4.8rem)`/1.1; article h2 `clamp(1.8rem, 4vw, 2.65rem)`; h3 `clamp(1.25rem, 3vw, 1.6rem)`; body 1.08rem/1.7; every heading in the display face with `text-wrap: balance` | High |
| **Max widths** | `.wrap` 1560px; article grid `280px 1fr 300px`, gap 40px; main column capped at 820px but **541px at a 1280 viewport** | `.container` `min(100% - 2.5rem, 76rem)`; article grid `minmax(0, 44rem) minmax(14rem, 20rem)`; **704px body at 1280** | High |
| **Header** | Two rows: an 80px white brand row (32px serif wordmark, weather, 320px search pill) over a 46px navy nav bar with 8 uppercase menus and a red gradient CTA. 126px sticky. On mobile the wordmark is clipped by the menu button | One 4.4rem dark `--chrome` bar: logo, "Cities" mega-menu, outline "Plan your trip" pill, compact search. Hides on scroll down and returns on scroll up. Mobile: logo and an outlined menu button that fit (`cbg-stay-mobile-1-header-hero.jpg`) | High (mobile) |
| **Hero (article)** | Full-bleed photo, `min-height: clamp(500px, 62vw, 760px)`, left-heavy scrim. Image is a 1024px JPEG with no width/height, srcset or fetchpriority. Meta row reads "AREAS — TRAVEL GUIDE — 19 MIN READ" as three styles; it wraps badly on mobile | Full-bleed `astro:assets` `<Image>` (1400×788 WebP, srcset, `sizes="100vw"`, eager), vertical scrim, breadcrumb, one eyebrow, h1, dek and a photo credit. Date line sits *below* the hero with a hairline (`.article__sub-hero`) | Medium |
| **Breadcrumbs** | Uppercase, salmon on dark, `›` separators; the current page is truncated with an ellipsis and wraps on mobile | 0.82rem, sentence case, `/` separators in `--line`, current page in full | Low |
| **Contents** | Sticky right-rail card, 13px links, red rule. **Shows raw entities** ("Zhongzheng (Taipei Main Station) &ndash; Best for…") and lists every "Every place on this map" sub-heading (`ttg-stay-desktop-2-3col-toc-ndash.jpg`) | `<details>` card, `--shadow-sm`, 0.84rem links, active entry marked with an accent left bar; separate mobile variant inline in the body | Medium |
| **Callouts** | Blockquote: 4px red left border, pink-to-grey gradient, 6px radius. Quick verdict: #eef1f4 fill, 6px red border. Affiliate note: beige with a grey border. Perfect For: pink, red border, pills. That is four different boxes stacked before the first paragraph (`ttg-stay-mobile-2-preamble.jpg`) | One blockquote style (0.3rem accent border, `--surface-strong`, display font 1.2rem) used for "The Short Version"; walks note uses the same border on `--surface` | Medium |
| **Buttons** | Four styles: square `.button` (red, 17×22 padding, uppercase); Klook CTA (square, Arial, `box-shadow: 5px 5px 0 var(--ink)` brutalist offset); red gradient pills in the nav and search; hero CTA square | One `.button` pill: `min-height: 2.9rem`, `border-radius: 999px`, accent fill, `translate: 0 -2px` lift on hover, plus `--secondary` and `--ghost-dark` variants | High |
| **Cards** | Archive cards 3:2 with 0 radius (`ttg-category-visit-desktop-2-cards.jpg`); "more guides" 92×76 thumbnails in 10px-radius rows; First Timers cards 12px radius; carousel cards. 4–6 card designs | One `.article-card`: 16:9 image, `--card-radius` 1rem, eyebrow, 1.25rem title, 4-line clamped description, tag chips, "Read article →"; lift and image zoom on hover (`cbg-lisbon-hub-desktop-cards.jpg`) | Medium |
| **Images in body** | `max-height: 480px; object-fit: cover; border-radius: 8px`, inside figures with a 12px radius, border and shadow, so images get two radii. Galleries use inline `height: 260px` and `minmax(280px,1fr)` grids, which go to one column at 541px | `width:100%; height:auto; border-radius: var(--card-radius)`; `.photo-row` 2-up grid at `repeat(2, minmax(0,1fr))`, one column under 40rem; captions as a muted 0.88rem paragraph directly under the photo | High |
| **Captions** | Global `figcaption`: centred italic 13px on a surface strip with a border. Inline caption styles (`color:#666`, `0.875rem`) are in the content and partly overridden | Small muted text pulled up under the image; no box | Low |
| **Tables** | Navy header, 13.5px, `min-width: 520px`, so even 2-column tables scroll sideways on a phone (`ttg-stay-mobile-3-table-scroll-gap.jpg`) | Ink header in the display face, tabular numbers, `table-layout: auto`; on mobile `.table--stack` turns each row into a card with labels (`cbg-stay-mobile-2-stacked-table.jpg`) | Medium |
| **Affiliate widgets** | Left rail of Klook deal tiles (5 tiles, prices, discounts) on every article; inline Klook iframes; square CTAs with offset shadows; full-width Klook block after the article | Right-rail dark "Book in Lisbon" GetYourGuide card plus a "Hotels in Lisbon" card with "AD" chips; inline GYG availability widget; `.stay-strip` date picker. Fewer, calmer, labelled | Medium |
| **Walk pages** | Hero is the legacy `/media/2019/07/Daan-Route.png` Google-style map with A–E letter markers, which contradicts the numbered 1–6 stops below (`ttg-walk-daan-desktop-1-hero-legacy-map.jpg`). Leaflet map 539×512 in the narrow column (`ttg-walk-daan-desktop-3-route-map.jpg`) | Photo hero; 704px-wide Leaflet route map in a `<details>` shell; stops table with entry prices and opening hours; GYG widget; one h2 per stop (`cbg-walk-alfama-desktop-2-map-table.jpg`) | Medium |
| **Related content** | Desktop: none after the article except the author box. Right-rail tag cloud with counts. `PostFooterNav` is mobile only | "Keep planning / More on Lisbon": three `ArticleCard`s, full width, after every article (`cbg-stay-desktop-3-related.jpg`). Note: on live CBG this row sits flush against the left edge with no gutter at 1280px, so do not copy that bug | Medium |
| **Footer** | `#0d0e0d` near-black (not the navy brand colour), small white-box logo, 8 links in 2 columns, 11px bottom bar (`ttg-footer-desktop.jpg`) | `--chrome` deep teal, the same as the header; brand blurb; 5 to 8 link groups; currency selector; affiliate statement; `--space-7` top padding (`cbg-footer-desktop.jpg`) | Medium |
| **Focus states** | One `:focus-visible` rule (hero steps). Everything else uses the browser default | `a, button, input, summary:focus-visible { outline: 3px solid var(--highlight); outline-offset: 3px }` | Medium |
| **Contrast** | White on #ef3f3a = 3.86 (fail); #d92e2a on paper = 4.37 and on pink = 4.33 (fail at 10–12px). Lighthouse a11y 0.90 with `color-contrast` failing | Accent on bg 5.27, white on accent 5.59, muted on bg 5.29 | Medium |
| **Images / perf** | 0 `srcset`; 3 WebP among 3,288 media files; 56 files over 500 KB; `public/media` 541 MB. Lighthouse (Aug, mobile homepage): 12–15 MB, LCP 10.4–19.9 s, 10.7 MB of it third-party (Klook) | 95 of 118 images on the Alfama walk use srcset; 106 of 118 have width and height; WebP generated at build | High |
| **Layout shift** | CLS 0.000 measured on /ximending (dev, warm cache), and 0.013 in Lighthouse. Fine, but 21 of 43 body images have no dimensions, so it depends on the cache | CLS 0.036 on the Alfama walk | Low |

---

## Prioritised improvements

The list is ordered by impact per unit of effort. File paths are TTG unless stated. CBG paths are relative to `C:\Users\rober\Projects\europe-travel-geek\`.

### Quick wins (about a day in total)

#### 1. Fix the clipped mobile wordmark
- **Impact:** high (it is the first thing every phone visitor sees). **Effort:** S
- **TTG files:** `app/globals.css` (`.brand` line 67, mobile block around line 2041), `components/SiteHeader.tsx`
- **CBG reference:** `src/components/SiteHeader.astro` and `SiteLogo.astro`. The logo is a mark plus a sans wordmark at about 1.1rem; the menu button is an outlined 2.75rem square
- **Sketch:** under 480px set `.brand { font-size: 19px; gap: 8px }` and `.brand img { width: 36px; height: 36px }`, and give `.header-brand-row` `gap: 12px` with `min-width: 0` on `.brand`. Or hide the word "Travel" under 360px. Restyle the black hamburger square as a 44px outlined button (`border: 1.5px solid var(--line); border-radius: 10px; background: transparent; color: var(--navy)`). Check at 320, 360 and 375px.

#### 2. Make every heading use one family, and set a type scale
- **Impact:** high. **Effort:** S
- **TTG files:** `app/globals.css` lines 337 and 359 (`.hero h1, .intro h2, .featured h2, .planning h2` and `.section-heading h2`), plus line 433 (`.carousel-heading h2`)
- **CBG reference:** `src/styles/global.css` `@layer base` h1–h4 rules
- **Sketch:** add tokens in `:root`:
  ```css
  --fs-h1: clamp(2.5rem, 6.5vw, 4.75rem);
  --fs-h2: clamp(1.75rem, 3.6vw, 2.75rem);
  --fs-h3: clamp(1.2rem, 2vw, 1.55rem);
  --fs-body: 1.0625rem; --fs-small: .875rem; --fs-label: .75rem;
  ```
  Add a base rule `h1, h2, h3 { font-family: var(--font-serif); text-wrap: balance; }` and make `.section-heading h2` use `var(--fs-h2)`. This fixes the Inter/Newsreader mix on the homepage. Then replace the 10.5, 11.5, 12.5, 13.5 and 15.5px sizes with the nearest token.

#### 3. Decode all HTML entities in contents headings and drop map sub-headings from the contents
- **Impact:** medium (literal `&ndash;` looks broken). **Effort:** S
- **TTG files:** `lib/content.ts` `decodeHtmlEntities()` (line 793), `enhanceContentHeadings()` (around line 809), `components/TableOfContents.tsx` / `StickyContentsGuide.tsx`
- **CBG reference:** none needed (Markdown source)
- **Sketch:** add `&ndash;` → "–", `&mdash;` → "—", `&rsquo;` → "’", `&lsquo;`, `&ldquo;`, `&rdquo;`, `&hellip;`, plus a numeric `&#(\d+);` / `&#x([0-9a-f]+);` decoder. In heading extraction, skip headings inside `.map-places` (the "Every place on this map" h3s).

#### 4. Accessible red, and focus rings
- **Impact:** medium. **Effort:** S
- **TTG files:** `app/globals.css` `:root`, `.eyebrow` (335), `.button` (340), `.desktop-nav .nav-cta`, `.article-klook-cta a` (816), the pink chip rules
- **CBG reference:** `src/styles/global.css` `a:focus-visible, button:focus-visible, input:focus-visible, summary:focus-visible { outline: 3px solid var(--highlight); outline-offset: 3px; border-radius: 2px }`
- **Sketch:** add `--red-text: #c62a26` (5.08:1 on paper, 5.03 on pink, 5.58 with white on it). Use it for small red text and as the fill behind white button text. Keep #ef3f3a for large display marks, rules and the logo. Add the focus rule with a TTG highlight colour, for example `--focus: #f0b84b` or navy on light ground.

#### 5. Stop small tables scrolling sideways on phones
- **Impact:** medium. **Effort:** S
- **TTG files:** `app/globals.css` `.article-content table` (`min-width: 520px`, around line 1103); `enhanceTables()` in `lib/content.ts`
- **CBG reference:** `src/layouts/ArticleLayout.astro` `.table--stack` rules (in the `max-width: 48rem` block) and the plugin `rehype-table-responsive.mjs` that adds `data-label`
- **Sketch:** only apply `min-width: 520px` to tables with four or more columns (`table:has(th:nth-child(4))`). In `enhanceTables()`, add `data-label` to each `td` from its `th`, and add `.table--stack` for tables with three or fewer columns. Then copy CBG's stacked-card CSS.

#### 6. One callout family for the preamble
- **Impact:** medium. **Effort:** S
- **TTG files:** `app/globals.css` `.affiliate-disclosure` (1071), `.quick-verdict` (1024), `blockquote` (958), Perfect For rules (1626)
- **CBG reference:** `ArticleLayout.astro` `blockquote` (`border-left: .3rem solid var(--accent); background: var(--surface-strong)`) and `.article__walks-note`
- **Sketch:** give all callouts the same radius (`--radius-md`), the same left-border width (4px) and the same padding (`var(--space-4)`). Change the quick verdict fill from cool grey #eef1f4 to a warm surface token so it matches the paper. Make the affiliate disclosure a single muted 13px line with no box, and move it under the article meta like CBG's sub-hero line. Perfect For stays where it is used (it is deliberate), with the same radius and border as the other callouts.

#### 7. Hero image dimensions and priority
- **Impact:** medium (LCP and sharpness). **Effort:** S
- **TTG files:** `app/[slug]/page.tsx` line 286; `components/HomeHero.tsx`
- **CBG reference:** `ArticleLayout.astro` `<Image … loading="eager">` with `widths` and `sizes="100vw"`
- **Sketch:** add `width`/`height` from `lib/content.ts`'s dimension lookup, `fetchPriority="high"`, `decoding="async"`, and use the largest available source rather than the `-1024x725` WordPress size. Many originals exist without the size suffix. Cap the hero at `min-height: clamp(420px, 48vw, 600px)` so the dek and the start of the article show on a laptop screen.

### Medium (a few days each)

#### 8. Two-column article layout with a 44rem reading column
- **Impact:** high. **Effort:** M
- **TTG files:** `app/[slug]/page.tsx` (layout around line 307), `components/LeftSidebar.tsx`, `components/RightSidebar.tsx`, `app/globals.css` `.article-3col-layout` (469–515)
- **CBG reference:** `ArticleLayout.astro` `.article__grid { grid-template-columns: minmax(0, var(--reading-width)) minmax(14rem, 20rem); justify-content: space-between; gap: var(--space-6) }` with `--reading-width: 44rem`
- **Sketch:** drop the left rail. Move the Klook deals into the right rail *below* the contents card, as one compact dark "Book in Taipei" card like CBG's `SidebarActivities.astro` (2 to 3 items, not 5), and move the tag cloud to after the article. Set `.wrap` for articles to `min(100% - 2.5rem, 76rem)`. The body goes from 541px to about 704px, which fixes the stacked galleries, small maps and cramped tables in one change. Keep the monetised left rail's revenue in mind and check GA4 `affiliate_click` placement=sidebar before and after.

#### 9. Migrate legacy WordPress galleries and inline styles
- **Impact:** high (205 posts). **Effort:** M
- **TTG files:** `content/posts.json` (via a new `scripts/migrate-galleries.mjs`), `app/globals.css` (`.wp-block-columns` 1425, `figure` 1440, `.wp-block-gallery figure` 1452, `figcaption`), `lib/content.ts` (the inline-style image builder around line 1134)
- **CBG reference:** `ArticleLayout.astro` `.photo-row` (2-up grid, `minmax(0,1fr)`, `object-fit: cover`, one column under 40rem) and the caption-paragraph rule under it
- **Sketch:** a one-off script that rewrites `<div class="wp-block-gallery columns-N" style="…">` into `<div class="photo-row">`, strips `style` from child `figure`, `img` and `figcaption`, and keeps `width`, `height`, `alt` and `loading`. Add CSS: `.photo-row { display:grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: .75rem }`, `.photo-row img { aspect-ratio: 4/3; height:auto; object-fit:cover; border-radius: var(--radius-md) }`, and a left-aligned muted 13px caption with no box. Do the same for `wp-block-columns` (164). Remove the double box (figure radius, border and shadow around an image that has its own radius) so images get **one** radius and no frame. Spot-check the 25 hotel galleries on /best-areas-and-hotels-to-stay. Also fix the hotel-gallery generator (`scripts/` that writes them) so it emits `.photo-row`.

#### 10. Responsive images
- **Impact:** high (weight, LCP, sharpness). **Effort:** M
- **TTG files:** `lib/content.ts` (image pass around line 953 that adds `loading` and `decoding`), `worker/index.ts`, `next.config.ts`, a new `scripts/make-image-variants.mjs`
- **CBG reference:** `ArticleCard.astro` `widths={[480, 720, 960]} sizes="(max-width: 48rem) 100vw, 33vw"`; build-time WebP via `astro:assets`
- **Sketch:** either enable Cloudflare Image Resizing and emit `srcset` with `/cdn-cgi/image/width=480,format=auto/…` URLs, or pre-generate 480/960/1600 WebP variants with `sharp` at build. Then add `srcset`/`sizes` to body, card and hero images in the content pass. Fill in `width`/`height` for the 21 of 43 unsized images on pages like /ximending. Separately, lazy-load or click-to-load the Klook iframes below the fold: the August Lighthouse run attributes 10.7 MB of the homepage's 15 MB to third parties, including a single 9.4 MB hotel photo inside the Klook widget.

#### 11. One card component and one button component
- **Impact:** medium. **Effort:** M
- **TTG files:** `app/globals.css` (`.archive-card*` 1880–1950, `.more-guide-card`, `.guide-card`, `.carousel-card`, `.first-timers-grid`, `.button` 340, `.article-klook-cta a` 816, `.article-wise-cta a` 827, `.nav-cta`), `components/CategoryArchive.tsx`, `components/LatestArticlesCarousel.tsx`, `app/page.tsx`
- **CBG reference:** `src/components/ArticleCard.astro` (whole `<style>`), `src/styles/global.css` `.button`, `.button--secondary`, `.button--ghost-dark`
- **Sketch:** one `.card` with `aspect-ratio: 3/2` (TTG's photos average 1.52:1, so keep 3:2 rather than CBG's 16:9), `border-radius: var(--radius-md)`, a 1px `--line-soft` border, `--shadow-sm`, and a hover lift with image `scale: 1.035`. One `.btn` pill with `min-height: 2.9rem` and `--red-text` fill, plus `.btn--secondary` and `.btn--on-dark`. Retire the offset-shadow Klook and Wise buttons and the Arial font stack. Drop the "VISIT" chip on cards inside the Visit category.

#### 12. Related guides after every article (desktop too)
- **Impact:** medium (polish and pages per session). **Effort:** S–M
- **TTG files:** `components/PostFooterNav.tsx` (currently mobile only), `app/[slug]/page.tsx`, `app/globals.css`
- **CBG reference:** `src/components/RelatedGuides.astro` ("Keep planning" eyebrow, `clamp(1.8rem,4vw,2.5rem)` heading, a `.grid--3` of `ArticleCard`)
- **Sketch:** pick three posts from the same primary category or tag (excluding the current one), render them with the unified card in a full-width band below the article, with `.wrap` gutters (CBG's live version has none at 1280px, so do not copy that).

#### 13. Walk pages: replace the legacy route-image hero
- **Impact:** medium. **Effort:** S per walk
- **TTG files:** `content/posts.json` (`featuredImage` for daan-walking-route and the other four walks), `app/[slug]/page.tsx` (hero), `components/WalkRouteMap.tsx`, `app/globals.css` `.walk-map-shell` (3042)
- **CBG reference:** `ArticleLayout.astro` `.restaurant-map-shell`, `.route-map-marker` (round, `--route-line` fill, white number) and the stops table pattern in `src/content/articles/lisbon/alfama-walk.md`
- **Sketch:** use a street photo from the walk as the hero, so the 2019 A–E lettered map no longer contradicts the 1–6 numbered stops. After item 8 the Leaflet map gets 704px. Add a `--route-line` token so the map markers, the stops table numbers and the step list share one colour. Stop the outbound-link icon appearing on the Leaflet attribution links (`.leaflet-control-attribution a::after { content: none }`).

### Larger redesign

#### 14. Single-row header that hides on scroll
- **Impact:** high (126px of every laptop screen is chrome). **Effort:** L
- **TTG files:** `components/SiteHeader.tsx`, `components/SiteSearch.tsx`, `components/WeatherStrip.tsx`, `app/globals.css` lines 44–300
- **CBG reference:** `src/components/SiteHeader.astro` (one 4.4rem `--chrome` bar, slide-away on scroll down, `--header-height` measured into a CSS variable so sticky rails follow it; see the `--sticky-top` notes in `src/styles/global.css`)
- **Sketch:** one navy bar holding the logo (white wordmark with red "Travel"), 4 to 5 top-level menus (merging Eat and Drink, and moving Information into the footer), a compact search, and an outlined "Plan your trip" pill. Move the weather to the homepage hero or the Plan page. Replace the hard-coded `top: 145px` and `translateY(-80px)` sticky offsets with `--sticky-top`.

#### 15. Footer as part of the brand
- **Impact:** medium. **Effort:** M
- **TTG files:** `components/SiteFooter.tsx`, `app/globals.css` 419–429 and 2068
- **CBG reference:** `src/components/SiteFooter.astro` (`background: var(--chrome)`, `padding-block: var(--space-7) var(--space-5)`, eyebrow-styled group labels, affiliate statement in the bottom bar)
- **Sketch:** use `--navy-dark` (#0c1722) rather than #0d0e0d so the footer matches the nav, and use the full-size logo. Add link groups for Eat, Visit, Areas, Transport, Lists and Plan (about 20 links in total), the affiliate statement, and "Updated regularly". Raise link size from 13px to 15px and the bottom bar from 11px to 13px.

#### 16. Full token layer and CSS clean-up
- **Impact:** medium (stops future drift). **Effort:** L
- **TTG files:** `app/globals.css` (3,182 lines, 30 `!important`, 73 hex values, 10 radius values)
- **CBG reference:** `src/styles/tokens.css` (documented token roles) and the `@layer reset, tokens, base, components, utilities` order in `global.css`
- **Sketch:** move colours to a documented `tokens` block (`--bg`, `--surface`, `--surface-strong`, `--ink`, `--ink-soft`, `--muted`, `--accent`, `--accent-text`, `--line`, `--line-strong`, `--chrome`, `--chrome-text`, `--highlight`, `--route-line`). Add `--space-1..7`, `--radius-sm/md/lg` (8/12/20px) and `--shadow-sm/md/lg`. Wrap the existing rules in `@layer` so the `!important`s can go. Optionally split the file by area (header, article, cards, widgets). Self-host Newsreader and Inter variable files with `@fontsource-variable/newsreader` and `@fontsource-variable/inter` to remove the Google Fonts round trip, and replace the Arial references with `var(--font-sans)`.

---

## Decisions for the owner

1. **Fonts.** Keep Newsreader + Inter (recommended: they are TTG's identity and read well) but self-host them as variable fonts. The alternative, Fraunces + Hanken Grotesk, would make TTG look like a CBG sister site.
2. **Brand red.** Accept a darker working red (#c62a26 proposed) for small text and button fills, keeping #ef3f3a only for the logo and large accents.
3. **Footer and header colour.** Use navy for both header and footer (recommended), or keep the white brand row.
4. **Left rail of Klook deals.** Dropping it is what buys the wider reading column (item 8). Check affiliate clicks by placement in GA4 first.
5. **Card image ratio.** 3:2 (TTG photos, recommended) or CBG's 16:9.
6. **Hero height.** Shorter article heroes (about 600px max) put the article on the first screen; the current 760px is more magazine-like.
7. **Gallery migration.** It rewrites 205 posts' HTML in `content/posts.json`. It needs a reviewed diff and a spot-check list before committing.

## Screenshot index

| File | Shows |
|---|---|
| `ttg-home-desktop-1.jpg` / `cbg-home-desktop-1.jpg` | Homepage heroes and headers |
| `ttg-home-desktop-2-sights.jpg`, `ttg-home-desktop-3-events-heading.jpg`, `ttg-home-desktop-4-first-timers.jpg` | Mixed Inter/Newsreader section headings |
| `cbg-home-desktop-2-city-cards.jpg` | CBG unified cards |
| `ttg-home-mobile-1-hero.jpg`, `ttg-home-mobile-2-cards.jpg` | Clipped mobile wordmark |
| `ttg-stay-desktop-1-hero.jpg` / `cbg-stay-desktop-1-hero.jpg` | Article heroes |
| `ttg-stay-desktop-2-3col-toc-ndash.jpg` / `cbg-stay-desktop-2-body-sidebar.jpg` | Three-column vs two-column; `&ndash;` in contents |
| `ttg-stay-desktop-3-gallery-stacked.jpg` | Two-up hotel gallery collapsed to one column |
| `ttg-stay-mobile-1-header-clipped-hero.jpg` / `cbg-stay-mobile-1-header-hero.jpg` | Mobile header and hero |
| `ttg-stay-mobile-2-preamble.jpg` | Four stacked boxes before the first paragraph |
| `ttg-stay-mobile-3-table-scroll-gap.jpg` / `cbg-stay-mobile-2-stacked-table.jpg` | Scrolling table vs stacked cards; empty gap and offset-shadow CTA |
| `ttg-stay-mobile-4-gallery-stacked.jpg` | 682px of photos per hotel on a phone |
| `ttg-ximending-desktop-body.jpg` | 541px body between two rails |
| `ttg-category-visit-desktop-1.jpg`, `ttg-category-visit-desktop-2-cards.jpg` / `cbg-lisbon-hub-desktop-cards.jpg` | Listing pages |
| `ttg-walk-daan-desktop-1-hero-legacy-map.jpg`, `-2-stops-table.jpg`, `-3-route-map.jpg` | TTG walk |
| `cbg-walk-alfama-desktop-1-hero.jpg`, `-2-map-table.jpg`, `-3-stop-gyg.jpg` | CBG walk |
| `cbg-stay-desktop-3-related.jpg` | CBG related guides (note the missing left gutter) |
| `ttg-footer-desktop.jpg` / `cbg-footer-desktop.jpg` | Footers |
