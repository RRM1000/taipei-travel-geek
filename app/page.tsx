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

const guides = [
  {
    category: "Eat",
    title: "Where to Find Every Michelin Food Stand at Taipei’s Night Markets",
    description: "A practical guide to the city’s celebrated street food, market by market.",
    image: "/images/raohe-night-market.jpg",
    href: "/michelin-food-stands-at-night-markets",
  },
  {
    category: "Visit",
    title: "18 Quirky, Cool or Fun Things to Try in Taipei",
    description: "Creative parks, curious museums and experiences beyond the usual checklist.",
    image: "/images/huashan-creative-park.jpg",
    href: "/quirky-cool-fun-things",
  },
  {
    category: "Shop",
    title: "The Best Shopping Areas for Wandering and Browsing",
    description: "From polished Xinyi malls to characterful streets and local markets.",
    image: "/images/xinyi-shopping.jpg",
    href: "/where-to-shop-in-taipei",
  },
];

const moreGuideSlugs = [
  "where-to-have-lunch",
  "best-vegetarian-restaurants-in-taipei",
  "one-day-itineraries",
  "best-brunch-in-taipei",
  "healthy-restaurants-that-taste-great",
  "taipei-annual-events",
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
              <h2>Essential Taipei guides</h2>
            </div>
            <a href="/category/visit">View all guides <span aria-hidden="true">→</span></a>
          </div>
          <div className="guide-grid">
            {guides.map((guide) => (
              <article className="guide-card" key={guide.title}>
                <a className="guide-image" href={guide.href}>
                  <img src={guide.image} alt="" />
                  <span>{guide.category}</span>
                </a>
                <div>
                  <h3><a href={guide.href}>{guide.title}</a></h3>
                  <p>{guide.description}</p>
                  <a className="text-link" href={guide.href}>Read the guide <span aria-hidden="true">→</span></a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <GuideCarousel />

        <section className="more-guides wrap">
          <div className="section-heading">
            <div>
              <p className="eyebrow">More to discover</p>
              <h2>Fresh ideas for Taipei</h2>
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

        <section className="planning">
          <div className="wrap planning-grid">
            <div>
              <p className="eyebrow light">The practical stuff</p>
              <h2>Plan the details.<br />Enjoy the city.</h2>
            </div>
            <div className="planning-links">
              <a href="/taipei-public-transport"><span>Getting around Taipei</span><b>→</b></a>
              <a href="/taiwan-easycard"><span>Using an EasyCard</span><b>→</b></a>
              <a href="/taiwan-sim-cards"><span>SIM cards and connectivity</span><b>→</b></a>
              <a href="/best-areas-and-hotels-to-stay"><span>Where to stay</span><b>→</b></a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
