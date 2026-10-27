import heroImageSizes from "@/lib/hero-images.json";
import { HomeHeroCarousel, type HeroSlide } from "@/components/HomeHeroCarousel";

export type { HeroSlide };

const heroSizes = heroImageSizes as Record<string, { src: string; width: number; height: number }>;

/**
 * Server half of the home hero. It swaps each slide's image for the largest
 * suitable copy listed in lib/hero-images.json (scripts/generate-hero-images.mjs)
 * and adds its width and height, so that lookup table never ships to the
 * browser. The carousel itself is HomeHeroCarousel.
 */
export function HomeHero({ slides }: { slides: HeroSlide[] }) {
  const sized = slides.map((slide) => {
    const known = heroSizes[slide.image];
    return known ? { ...slide, image: known.src, width: known.width, height: known.height } : slide;
  });
  return <HomeHeroCarousel slides={sized} />;
}
