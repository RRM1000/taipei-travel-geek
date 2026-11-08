import { SiteHeaderClient } from "@/components/SiteHeaderClient";
import { menus } from "@/components/site-menus";
import { cardSrcSet } from "@/lib/responsive-images";

// Worked out once per server instance: the menus are the same on every page.
const menusWithSrcSets = menus.map((menu) => ({
  ...menu,
  cards: menu.cards.map((card) => ({ ...card, imageSrcSet: cardSrcSet(card.image) })),
}));

/**
 * Server half of the site header: adds each mega-menu card photo's srcset
 * (lib/responsive-images.ts, which is too large to send to the browser) and
 * renders the interactive header, SiteHeaderClient.
 */
export function SiteHeader() {
  return <SiteHeaderClient menus={menusWithSrcSets} />;
}
