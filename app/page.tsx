import Link from "next/link";
import { Card } from "@/components/Card";
import { GuideCarousel } from "@/components/GuideCarousel";
import { HomeHero, type HeroSlide } from "@/components/HomeHero";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { LatestArticlesCarousel } from "@/components/LatestArticlesCarousel";
import { UpcomingEvents } from "@/components/UpcomingEvents";
import { WeatherStrip } from "@/components/WeatherStrip";
import { posts } from "@/lib/content";

// Replaces the old "category-strip" (Eat/Visit/Areas/Culture tiles). Those
// four cards were a pure link menu - no titles, no images of actual guides -
// and every one of them already exists one hover away in the header's mega
// menu, which shows real curated previews instead of a one-line blurb. This
// section does the header's job worse while adding nothing of its own, so
// it's replaced rather than kept: real guide cards for the one homepage gap
// that opens up once it's gone (sightseeing/culture - Eat is covered by
// "Food & Drink" below, orientation by "First Timers", logistics by
// "Before you go").
const sightsSlugs = [
  "taipei-101",
  "taipei-zoo",
  "taroko-national-park",
  "best-hikes-in-taipei",
  "dihua-street-dadaocheng-guide",
  "shilin-night-market",
];
const sightsGuides = sightsSlugs.map((slug) => posts.find((post) => post.slug === slug)).filter((post) => post !== undefined);

// Kept distinct from the navbar's mega menus (Eat/Drink/Visit/Transport/Best of Taipei) so the
// same guide isn't featured in both places. taipei-essentials-guide is a deliberate exception -
// it stays here and was removed from the Best of Taipei navbar menu instead.
// Ordered to follow the decisions a first-timer actually makes, in sequence:
// when to come, which part of the city, where to sleep, what to see, how to
// string it together, and how to do it cheaply. Practical logistics (EasyCard,
// SIM, transport, Fun Pass) deliberately live in the "Before you go" carousel
// instead, so nothing appears twice on the homepage.
const firstTimerSlugs = [
  "best-time-to-visit-taipei",
  "best-districts-and-areas",
  "best-areas-and-hotels-to-stay",
  "taipei-essentials-guide",
  "taipei-itinerary-3-5-days",
  "taipei-on-a-budget",
];
const firstTimerGuides = firstTimerSlugs.map((slug) => posts.find((post) => post.slug === slug)).filter((post) => post !== undefined);

const moreGuideSlugs = [
  "where-to-have-lunch",
  "cheap-breakfast-taipei",
  "cheap-coffee",
  "michelin-bib-gourmand-taiwanese-small-eats-taipei",
  "best-outdoor-drinking",
  "addiction-aquatic-development",
];
const moreGuides = moreGuideSlugs.map((slug) => posts.find((post) => post.slug === slug)).filter((post) => post !== undefined);

// Plain links to the hotel guides, in place of the Klook "deals_widget" that
// sat here. That widget was the same generic 5-hotel box that was taken off
// the posts for converting nothing (6,206 impressions, 0 bookings), and it was
// the heaviest thing on the homepage: an iframe 1,776px tall pulling in
// Klook's app bundle, trackers and full-size hotel photos. Every hotel guide
// now has a "Check prices" button under each hotel, which is the better route
// to a booking. best-areas-and-hotels-to-stay is left out because First
// Timers already features it, and nothing appears twice on the homepage.
const hotelGuideLinks = [
  { href: "/taipei-101-view-hotels-new-years-eve", label: "New Year's Eve view rooms" },
  { href: "/hotels-near-taipei-main-station", label: "Near Taipei Main Station" },
  { href: "/hotels-near-ximending", label: "Near Ximending" },
  { href: "/hotels-near-taipei-101", label: "Near Taipei 101" },
  { href: "/beitou-hot-spring-hotels", label: "Beitou hot spring hotels" },
  { href: "/best-hostels-in-taipei", label: "Hostels" },
];

const latestArticles = posts
  .filter((p) => p.type === "post" || !p.type)
  .slice(0, 6)
  .map((p) => ({
    slug: p.slug,
    title: p.title,
    featuredImage: p.featuredImage,
    category: p.categories[0]?.name || "Taipei Guide",
  }));

// The hero cross-fades through a few guides, each with its own photo, line and
// button, so the front page shows what the site covers rather than one view
// of the skyline. Photos are the site's own, at least 1600px wide.
const heroSlides: HeroSlide[] = [
  {
    label: "Taipei",
    image: "/images/taipei-skyline.webp",
    alt: "Taipei skyline with Taipei 101 at dusk",
    eyebrow: "An independent guide to Taiwan’s capital",
    title: <>See Taipei<br />like you live here.</>,
    text: "Straightforward guides to the food, places and neighbourhoods that make this city unforgettable.",
    cta: { href: "/taipei-guide", label: "Start with the Taipei guide" },
  },
  {
    label: "Night markets",
    image: "/media/2019/08/Shilin-Night-Market.jpg",
    alt: "",
    position: "60% 40%",
    eyebrow: "Eat",
    title: "Taipei's night markets.",
    text: "From Shilin's maze of stalls to Raohe's Michelin-listed snacks, the markets worth an evening.",
    cta: { href: "/best-markets-in-taipei", label: "Pick a market" },
  },
  {
    label: "Chiang Kai-shek Memorial Hall",
    image: "/media/2019/08/Chiang-Kai-Shek-8.jpg",
    alt: "",
    position: "50% 30%",
    eyebrow: "Visit",
    title: "Chiang Kai-shek Memorial Hall.",
    text: "When to catch the changing of the guard, and what else to see around Liberty Square.",
    cta: { href: "/chiang-kai-shek-memorial-hall", label: "Plan your visit" },
  },
  {
    label: "Xinyi malls",
    image: "/media/2023/02/Xinyi-Shopping-District-2-edited.jpg",
    alt: "",
    eyebrow: "Shop",
    title: "The malls of Xinyi.",
    text: "The shopping district around Taipei 101, linked by walkways, and which malls are worth your time.",
    cta: { href: "/xinyi-shopping-district", label: "Compare the malls" },
  },
  {
    label: "Dihua Street",
    image: "/media/2026/08/dihua/20200116_152209.webp",
    alt: "",
    eyebrow: "Explore",
    title: "Dihua Street and Dadaocheng.",
    text: "Tea merchants, fabric markets and some of the oldest shopfronts in the city, close to the river.",
    cta: { href: "/dihua-street-dadaocheng-guide", label: "Walk the old streets" },
  },
  {
    label: "Beitou hot springs",
    image: "/media/2023/02/Xinbeitou-1-edited-scaled.jpg",
    alt: "",
    eyebrow: "Relax",
    title: "Hot springs in Beitou.",
    text: "Public baths, private rooms and hot spring hotels, a short MRT ride from the city centre.",
    cta: { href: "/taipei-hot-springs", label: "Find a hot spring" },
  },
  {
    label: "Din Tai Fung",
    image: "/media/2019/04/din-tai-fung.jpg",
    alt: "",
    eyebrow: "Eat",
    title: "Din Tai Fung, without the queue.",
    text: "Queue times for every Taipei branch, what to order, and when to go.",
    cta: { href: "/din-tai-fung", label: "Beat the queue" },
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main>
        <HomeHero slides={heroSlides} />
        <div className="home-now wrap"><WeatherStrip withTime /></div>

        <section className="sights-guides wrap">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Worth the trip</p>
              <h2>Sights &amp; Culture</h2>
            </div>
            <a href="/category/visit">Explore all guides <span aria-hidden="true">→</span></a>
          </div>
          <div className="card-grid">
            {sightsGuides.map((guide) => (
              <Card
                key={guide.slug}
                href={`/${guide.slug}`}
                title={guide.title}
                image={guide.featuredImage}
                eyebrow={guide.categories[0]?.name || "Taipei guide"}
              />
            ))}
          </div>
        </section>

        <LatestArticlesCarousel items={latestArticles} />

        <UpcomingEvents />

        <section className="featured wrap first-timers-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Good places to begin</p>
              <h2>First Timers</h2>
            </div>
            <a href="/taipei-guide">View the full guide <span aria-hidden="true">→</span></a>
          </div>
          <div className="card-grid">
            {firstTimerGuides.map((guide) => (
              <Card
                key={guide.slug}
                href={`/${guide.slug}`}
                title={guide.title}
                image={guide.featuredImage}
                eyebrow={guide.categories[0]?.name || "Taipei guide"}
                more="Read starter guide"
              />
            ))}
          </div>
        </section>

        <GuideCarousel />

        <section className="more-guides wrap">
          <div className="section-heading">
            <div>
              <p className="eyebrow">More to discover</p>
              <h2>Food &amp; Drink</h2>
            </div>
            <a href="/category/eat">Explore all guides <span aria-hidden="true">&rarr;</span></a>
          </div>
          <div className="card-grid card-grid--list">
            {moreGuides.map((guide) => (
              <Card
                key={guide.slug}
                variant="list"
                href={`/${guide.slug}`}
                title={guide.title}
                image={guide.featuredImage}
                eyebrow={guide.categories[0]?.name || "Taipei guide"}
              />
            ))}
          </div>
        </section>

        <section className="hotel-guides wrap" aria-labelledby="hotel-guides-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Where to stay</p>
              <h2 id="hotel-guides-heading">Taipei hotel guides</h2>
            </div>
            <Link href="/category/hotels">All hotel guides <span aria-hidden="true">&rarr;</span></Link>
          </div>
          <div className="sidebar-tags hotel-guide-links">
            <div className="sidebar-tag-wrap">
              {hotelGuideLinks.map((link) => (
                <a key={link.href} href={link.href}>{link.label}</a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
