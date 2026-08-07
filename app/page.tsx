import { GuideCarousel } from "@/components/GuideCarousel";
import { KlookAffiliate } from "@/components/KlookAffiliate";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { LatestArticlesCarousel } from "@/components/LatestArticlesCarousel";
import { posts } from "@/lib/content";

const categories = [
  ["Eat", "Night markets, local favourites and the city’s best tables"],
  ["Visit", "Landmarks, hidden corners and memorable day trips"],
  ["Areas", "Neighbourhood guides for exploring Taipei properly"],
  ["Culture", "Museums, temples, festivals and creative spaces"],
];

const categoryImages = [
  "/images/raohe-night-market.jpg",
  "/media/2023/01/Taipei-1024x678.jpg",
  "/images/xinyi-shopping.jpg",
  "/images/huashan-creative-park.jpg",
];

// Kept distinct from the navbar's mega menus (Eat/Drink/Visit/Transport/Best of Taipei) so the
// same guide isn't featured in both places. taipei-essentials-guide is a deliberate exception -
// it stays here and was removed from the Best of Taipei navbar menu instead.
const firstTimerSlugs = [
  "best-areas-and-hotels-to-stay",
  "the-best-guided-tours-in-taipei",
  "taipei-essentials-guide",
  "best-museums-in-taipei",
  "taipei-itinerary-3-5-days",
  "best-districts-and-areas",
];
const firstTimerGuides = firstTimerSlugs.map((slug) => posts.find((post) => post.slug === slug)).filter((post) => post !== undefined);

const moreGuideSlugs = [
  "where-to-have-lunch",
  "cheap-breakfast-taipei",
  "cheap-coffee",
  "best-vegetarian-restaurants-in-taipei",
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

        <section className="intro wrap">
          <p className="eyebrow">Find your Taipei</p>
          <div className="intro-grid">
            <h2>We do the research so you don&apos;t have to.</h2>
            <p>Taipei Travel Geek guides you through all the main sights and hidden gems, with practical advice and local insight to make your trip smoother and more memorable.</p>
          </div>
        </section>

        <section className="category-strip wrap" aria-label="Browse by interest">
          {categories.map(([name, description], index) => (
            <a className="category-card" href={`/category/${name.toLowerCase()}`} key={name}>
              <img src={categoryImages[index]} alt="" />
              <span>0{index + 1}</span>
              <h3>{name}</h3>
              <p>{description}</p>
              <b aria-hidden="true">↗</b>
            </a>
          ))}
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
