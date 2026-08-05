import { GuideCarousel } from "@/components/GuideCarousel";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
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

const firstTimerSlugs = [
  "best-areas-and-hotels-to-stay",
  "best-districts-and-areas",
  "taipei-essentials-guide",
  "best-day-trips-from-taipei",
  "best-places-to-keep-kids-amused",
  "where-to-shop-in-taipei",
];
const firstTimerGuides = firstTimerSlugs.map((slug) => posts.find((post) => post.slug === slug)).filter((post) => post !== undefined);

const moreGuideSlugs = [
  "michelin-food-stands-at-night-markets",
  "best-brunch-in-taipei",
  "best-bars-in-taipei",
  "best-famous-restaurants",
  "where-to-have-lunch",
  "cheap-coffee",
];
const moreGuides = moreGuideSlugs.map((slug) => posts.find((post) => post.slug === slug)).filter((post) => post !== undefined);

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

        <section className="featured wrap">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Good places to begin</p>
              <h2>First Timers</h2>
            </div>
            <a href="/taipei-guide">View the full guide <span aria-hidden="true">→</span></a>
          </div>
          <div className="more-guides-grid">
            {firstTimerGuides.map((guide) => (
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
      </main>

      <SiteFooter />
    </>
  );
}
