import { GuideCarousel } from "@/components/GuideCarousel";
import { KlookAffiliate } from "@/components/KlookAffiliate";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { LatestArticlesCarousel } from "@/components/LatestArticlesCarousel";
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

const latestArticles = posts
  .filter((p) => p.type === "post" || !p.type)
  .slice(0, 6)
  .map((p) => ({
    slug: p.slug,
    title: p.title,
    featuredImage: p.featuredImage,
    category: p.categories[0]?.name || "Taipei Guide",
  }));

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main>
        <section className="hero">
          <img src="/images/taipei-skyline.jpg" alt="Taipei skyline with Taipei 101 at dusk" />
          <div className="hero-shade" />
          <div className="hero-content">
            <p className="eyebrow light">An independent guide to Taiwan’s capital</p>
            <h1>See Taipei<br />like you live here.</h1>
            <p className="hero-copy">Straightforward guides to the food, places and neighbourhoods that make this city unforgettable.</p>
            <a className="button" href="/taipei-guide">Start with the Taipei guide <span aria-hidden="true">→</span></a>
          </div>
        </section>

        <section className="sights-guides wrap">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Worth the trip</p>
              <h2>Sights &amp; Culture</h2>
            </div>
            <a href="/category/visit">Explore all guides <span aria-hidden="true">→</span></a>
          </div>
          <div className="more-guides-grid">
            {sightsGuides.map((guide) => (
              <article className="more-guide-card" key={guide.slug}>
                <a className="more-guide-image" href={`/${guide.slug}`}><img src={guide.featuredImage || "/images/taipei-skyline.jpg"} alt="" /></a>
                <div className="more-guide-copy">
                  <p>{guide.categories[0]?.name || "Taipei guide"}</p>
                  <h3><a href={`/${guide.slug}`}>{guide.title}</a></h3>
                </div>
                <a className="more-guide-arrow" href={`/${guide.slug}`} aria-label={`Read ${guide.title}`}>&rarr;</a>
              </article>
            ))}
          </div>
        </section>

        <LatestArticlesCarousel items={latestArticles} />

        <section className="featured wrap first-timers-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Good places to begin</p>
              <h2>First Timers</h2>
            </div>
            <a href="/taipei-guide">View the full guide <span aria-hidden="true">→</span></a>
          </div>
          <div className="first-timers-grid">
            {firstTimerGuides.map((guide) => (
              <a className="first-timer-card" href={`/${guide.slug}`} key={guide.slug}>
                <div className="first-timer-image-wrap">
                  <img src={guide.featuredImage || "/images/taipei-skyline.jpg"} alt="" />
                </div>
                <div className="first-timer-body">
                  <span className="first-timer-tag">{guide.categories[0]?.name || "Taipei Guide"}</span>
                  <h3>{guide.title}</h3>
                  <div className="first-timer-footer">
                    <span>Read Starter Guide</span>
                    <span className="first-timer-arrow">→</span>
                  </div>
                </div>
              </a>
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
          <div className="more-guides-grid">
            {moreGuides.map((guide) => (
              <article className="more-guide-card" key={guide.slug}>
                <a className="more-guide-image" href={`/${guide.slug}`}><img src={guide.featuredImage || "/images/taipei-skyline.jpg"} alt="" /></a>
                <div className="more-guide-copy">
                  <p>{guide.categories[0]?.name || "Taipei guide"}</p>
                  <h3><a href={`/${guide.slug}`}>{guide.title}</a></h3>
                </div>
                <a className="more-guide-arrow" href={`/${guide.slug}`} aria-label={`Read ${guide.title}`}>&rarr;</a>
              </article>
            ))}
          </div>
        </section>

        <section className="hotel-deals wrap">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Where to stay</p>
              <h2>Taipei hotel deals</h2>
            </div>
            <a href="/best-areas-and-hotels-to-stay">Read the full hotel guide <span aria-hidden="true">&rarr;</span></a>
          </div>
          <div className="hotel-deals-widget">
            <ins
              className="klk-aff-widget"
              data-aid="8733"
              data-city_id="19"
              data-country_id="1014"
              data-tag_id="0"
              data-currency=""
              data-lang=""
              data-label1=""
              data-label2=""
              data-label3=""
              data-prod="deals_widget"
              data-total="5"
            >
              <a href="//www.klook.com/">Klook.com</a>
            </ins>
          </div>
        </section>
      </main>

      <KlookAffiliate />
      <SiteFooter />
    </>
  );
}
