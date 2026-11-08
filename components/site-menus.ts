/**
 * The header's menus. Plain data, kept out of SiteHeaderClient so the server
 * half (SiteHeader) can add each card photo's srcset before it is sent.
 */
export type MegaCard = { slug: string; title: string; image: string; excerpt: string; imageSrcSet?: string };
export type MenuLink = { href: string; label: string };
export type MenuKey = "EatDrink" | "ThingsToDo" | "Stay" | "BestOf" | "Plan";
export type Menu = { key: MenuKey; label: string; href: string; blurb: string; viewAllHref: string; viewAllLabel: string; cards: MegaCard[]; links: MenuLink[] };

/**
 * Five menus, each opening one panel: four picture cards plus a column of
 * quick links. This replaced eight menus (Eat, Drink, Visit, Transport, Top
 * Picks, Lists, Explore, Info), a labelled search box and a "Plan your trip"
 * button in October 2026 - the bar had become too busy. Eat and Drink merged;
 * Visit and Explore became Things to Do; Top Picks and Lists became Best Of;
 * Transport, Info and the Plan button became Plan Your Trip; and the hotel
 * guides, the site's best earners, got a menu of their own.
 */
export const menus: Menu[] = [
  {
    key: "EatDrink",
    label: "Eat & Drink",
    href: "/category/eat",
    blurb: "Night markets, local favourites, coffee and cocktails.",
    viewAllHref: "/category/eat",
    viewAllLabel: "All food guides",
    cards: [
      { slug: "michelin-food-stands-at-night-markets", title: "Every Michelin Food Stand at Every Night Market", image: "/media/2022/12/Raohe-Night-Market-6-edited.jpg", excerpt: "Every Bib Gourmand stall, mapped by market." },
      { slug: "best-famous-restaurants", title: "Famous Local Restaurants Worth Queuing For", image: "/media/2019/08/Jin-Feng-Braised-Pork-Rice-12-1024x768.jpg", excerpt: "The best-known local spots, and when to beat the queue." },
      { slug: "best-cocktail-bars-in-taipei", title: "Taipei's Best Cocktail Bars", image: "/media/2026/08/Cocktail-Bar-Bartender-Pouring-6-1024x1365.jpg", excerpt: "Asia's 50 Best winners, speakeasies and rooftops." },
      { slug: "din-tai-fung", title: "How to Avoid the Queues at Din Tai Fung", image: "/media/2019/10/Din-Tai-Fung-7-1024x712.jpg", excerpt: "The world-famous xiaolongbao, without the wait." },
    ],
    links: [
      { href: "/category/restaurants", label: "Restaurants" },
      { href: "/category/markets", label: "Night & day markets" },
      { href: "/category/cafes", label: "Cafes" },
      { href: "/category/bars", label: "Bars" },
      { href: "/category/drink", label: "All drink guides" },
      { href: "/best-brunch-in-taipei", label: "Brunch" },
    ],
  },
  {
    key: "ThingsToDo",
    label: "Things to Do",
    href: "/category/visit",
    blurb: "Sights, day trips, walks and neighbourhoods worth your time.",
    viewAllHref: "/category/visit",
    viewAllLabel: "All things to do",
    cards: [
      { slug: "taipei-101", title: "Taipei 101: Tickets & Best Times to Visit", image: "/media/2020/12/Taipei-101-Fireworks-Mountain-1-1024x619.jpg", excerpt: "How to skip the queue and the crowds." },
      { slug: "best-day-trips-from-taipei", title: "The Best Day Trips from Taipei", image: "/media/2022/11/Jiufen2-1024x691.jpg", excerpt: "Jiufen, Shifen and the rest of the North Coast." },
      { slug: "best-districts-and-areas", title: "A Guide to Every District in Taipei", image: "/media/2023/01/Taipei-1024x678.jpg", excerpt: "All 12 districts, and what each is like." },
      { slug: "one-day-itineraries", title: "24 Hours in Taipei: Itineraries", image: "/media/2019/12/Chiang-Kai-Shek-Memorial-Hall-Flag-Ceremony3-1024x699.jpg", excerpt: "The best of Taipei, planned out for you." },
    ],
    links: [
      { href: "/category/routes", label: "Self-guided walks" },
      { href: "/category/areas", label: "Areas" },
      { href: "/category/culture", label: "Temples & culture" },
      { href: "/category/parks", label: "Parks" },
      { href: "/category/events", label: "Events & festivals" },
      { href: "/category/shop", label: "Shopping" },
    ],
  },
  {
    key: "Stay",
    label: "Where to Stay",
    href: "/best-areas-and-hotels-to-stay",
    blurb: "The best areas to stay, and hand-picked hotels in each.",
    viewAllHref: "/category/hotels",
    viewAllLabel: "All hotel guides",
    cards: [
      { slug: "best-areas-and-hotels-to-stay", title: "Where to Stay in Taipei: Best Areas & Hotels", image: "/media/2019/05/Taipei-Main-1024x717.jpg", excerpt: "Which district suits you, with hotels at every price." },
      { slug: "hotels-near-ximending", title: "Hotels Near Ximending", image: "/media/2019/05/Ximen-10-1024x738.jpg", excerpt: "Lively, central and good value." },
      { slug: "hotels-near-taipei-101", title: "Hotels Near Taipei 101", image: "/media/2020/12/Taipei-101-Fireworks-Mountain-1-1024x619.jpg", excerpt: "Xinyi's best, from hostels to five stars." },
      { slug: "beitou-hot-spring-hotels", title: "Beitou Hot Spring Hotels", image: "/media/2019/09/Thermal-Valley-Beitou-6-1024x768.jpg", excerpt: "Rooms with their own hot spring bath." },
    ],
    links: [
      { href: "/hotels-near-taipei-main-station", label: "Near Taipei Main Station" },
      { href: "/hotels-in-zhongshan", label: "Zhongshan" },
      { href: "/hotels-in-daan", label: "Daan" },
      { href: "/best-hostels-in-taipei", label: "Hostels" },
      { href: "/aparthotels-serviced-apartments-taipei", label: "Serviced apartments" },
      { href: "/taipei-hotels-with-pools", label: "Hotels with a pool" },
      { href: "/hotels-near-taoyuan-airport", label: "Near Taoyuan Airport" },
    ],
  },
  {
    key: "BestOf",
    label: "Best Of",
    href: "/tag/lists",
    blurb: "Our favourite places, and every 'best of' list on the site.",
    viewAllHref: "/tag/lists",
    viewAllLabel: "Every best-of list",
    cards: [
      { slug: "national-palace-museum", title: "National Palace Museum", image: "/media/2019/07/National-Palace-Museum-8-1024x694.jpg", excerpt: "The world's largest collection of Chinese artefacts." },
      { slug: "best-markets-in-taipei", title: "The Best Night and Day Markets", image: "/media/2019/08/Shilin-Night-Market-1024x725.jpg", excerpt: "Where Taipei eats after dark, and shops in the morning." },
      { slug: "best-museums-in-taipei", title: "The Best Museums in Taipei", image: "/media/2019/07/Miniatures-Museum-of-Taiwan-13-1024x725.jpg", excerpt: "From the Palace Museum to the new railway museum." },
      { slug: "quirky-cool-fun-things", title: "15 Quirky, Cool or Fun Things to Try", image: "/media/2023/04/Lin-Family-Mansion-9-edited-scaled.jpg", excerpt: "Unusual things worth making time for." },
    ],
    links: [
      { href: "/tag/top-pick", label: "Our top picks" },
      { href: "/tag/lists", label: "All best-of lists" },
      { href: "/where-to-go-when-raining", label: "Rainy-day ideas" },
      { href: "/best-places-to-keep-kids-amused", label: "With kids" },
      { href: "/taipei-on-a-budget", label: "On a budget" },
    ],
  },
  {
    key: "Plan",
    label: "Plan Your Trip",
    href: "/taipei-guide",
    blurb: "Getting there, getting around, and everything to sort before you go.",
    viewAllHref: "/taipei-guide",
    viewAllLabel: "Start with the Taipei guide",
    cards: [
      { slug: "taipei-guide", title: "The Taipei Guide: Everything to Know", image: "/media/2023/01/Taipei-1024x678.jpg", excerpt: "New here? Start with the essentials." },
      { slug: "taoyuan-airport-mrt", title: "Taoyuan Airport MRT", image: "/media/2019/08/Taipei-Airport-Express-2-1024x688.jpg", excerpt: "Airport to the city in 35 minutes." },
      { slug: "mrt", title: "Taipei MRT Map & Guide", image: "/media/2019/05/Taipei-Main-1024x717.jpg", excerpt: "Taiwan's fast, spotless underground network." },
      { slug: "taiwan-easycard", title: "Taiwan EasyCard", image: "/media/2019/04/easy-card.jpg", excerpt: "The single most useful card you'll own here." },
    ],
    links: [
      { href: "/taipei-public-transport", label: "Getting around" },
      { href: "/taiwan-sim-cards", label: "SIM cards & eSIMs" },
      { href: "/taipei-money-guide", label: "Money & costs" },
      { href: "/taiwan-visa-entry-requirements", label: "Visa & entry" },
      { href: "/taipei-fun-pass", label: "Taipei Fun Pass" },
      { href: "/taiwan-high-speed-rail-hsr-discounts-klook", label: "High speed rail" },
      { href: "/taiwan-tourist-tax-refund", label: "Tax refund" },
      { href: "/maps", label: "Maps" },
    ],
  },
];
