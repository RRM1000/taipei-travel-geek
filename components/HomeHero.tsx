import heroImageSizes from "@/lib/hero-images.json";
import { HomeHeroCarousel, type HeroSlide } from "@/components/HomeHeroCarousel";
import { IMAGE_SIZES, responsiveSrcSet } from "@/lib/responsive-images";

export type { HeroSlide };

const heroSizes = heroImageSizes as Record<string, { src: string; width: number; height: number }>;

/**
 * Server half of the home hero. It swaps each slide's image for the largest
 * suitable copy listed in lib/hero-images.json (scripts/generate-hero-images.mjs)
 * and adds its width and height and its srcset (lib/responsive-images.ts), so
 * those lookup tables never ship to the browser. The carousel itself is
 * HomeHeroCarousel.
 */
export function HomeHero({ slides }: { slides: HeroSlide[] }) {
  const sized = slides.map((slide) => {
    const known = heroSizes[slide.image];
    const withSize = known ? { ...slide, image: known.src, width: known.width, height: known.height } : slide;
    const srcSet = responsiveSrcSet(withSize.image, withSize.width, withSize.height);
    return { ...withSize, srcSet, sizes: srcSet ? IMAGE_SIZES.hero : undefined };
  });
  return <HomeHeroCarousel slides={sized} />;
}
