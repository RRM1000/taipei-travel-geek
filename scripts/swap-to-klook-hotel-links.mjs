import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const post = posts.find((p) => p.slug === "best-areas-and-hotels-to-stay");

// Maps the existing booking.com slug (from href="https://www.booking.com/hotel/tw/<slug>.en.html")
// to the matching, verified Klook hotel detail page.
const klookMatches = {
  "grand-hyatt-taipei-taipei50": "https://www.klook.com/en-GB/hotels/detail/425808-grand-hyatt-taipei/",
  "w-taipei": "https://www.klook.com/en-GB/hotels/detail/142088-w-taipei/",
  "papa-whale": "https://www.klook.com/en-GB/hotels/detail/251905-hotel-papa-whale/",
  "humble-house-taipei": "https://www.klook.com/en-GB/hotels/detail/254548-humble-house-taipei-curio-collection-by-hilton/",
  "home": "https://www.klook.com/en-GB/hotels/detail/570574-home-hotel/",
  "madison-taipei": "https://www.klook.com/en-GB/hotels/detail/432606-madison-taipei-a-tribute-portfolio-hotel/",
  "eclat-taipei": "https://www.klook.com/en-GB/hotels/detail/409080-hotel-eclat-taipei/",
  "kimpton-da-an": "https://www.klook.com/en-GB/hotels/detail/451655-kimpton-da-an-hotel/",
  "chez-nous": "https://www.klook.com/en-GB/hotels/detail/280671-chez-nous-hotel-taipei/",
  "neng-liang-lu-dian": "https://www.klook.com/en-GB/hotels/detail/296386-energy-inn/",
  "meander-hotel-taipei": "https://www.klook.com/en-GB/hotels/detail/233515-meander-taipei/",
  "cho-hotel": "https://www.klook.com/en-GB/hotels/detail/269163-cho-hotel/",
  "cho-3": "https://www.klook.com/en-GB/hotels/detail/269163-cho-hotel/",
  "lu-tu-xing-lu-roaders": "https://www.klook.com/en-GB/hotels/detail/760314-roaders-plus-hotel-taipei-station/",
  "cityinn-1": "https://www.klook.com/en-GB/hotels/detail/267240-cityinn-hotel-taipei-station-branch-i/",
  "cityinn-2": "https://www.klook.com/en-GB/hotels/detail/422703-cityinn-hotel-taipei-station-branch-ii/",
  "cityinn-3": "https://www.klook.com/en-GB/hotels/detail/269372-cityinn-hotel-taipei-station-branch-iii/",
  "tai-wan-qing-lu": "https://www.klook.com/en-GB/hotels/detail/576278-taiwan-youth-hostel--capsule-hostel/",
  "the-okura-prestige-taipei": "https://www.klook.com/en-GB/hotels/detail/279384-the-okura-prestige-taipei/",
  "the-regent-taipei": "https://www.klook.com/en-GB/hotels/detail/255449-regent-taipei/",
  "the-tango-taipei-changan": "https://www.klook.com/en-GB/hotels/detail/67944-the-tango-taipei-changan/",
  "mandarin-oriental-taipei": "https://www.klook.com/en-GB/hotels/detail/434580-mandarin-oriental-taipei/",
  "eslite-hotel-taipei": "https://www.klook.com/en-GB/hotels/detail/440618-eslite-hotel/",
  "the-tango-taipei-fuhsing": "https://www.klook.com/en-GB/hotels/detail/424144-the-tango-taipei-fuhsing/",
  "artree-international": "https://www.klook.com/en-GB/hotels/detail/83968-artree-hotel/",
  "indigo-taipei-north": "https://www.klook.com/en-GB/hotels/detail/345235-hotel-indigo-taipei-north/",
  "grand-hotel-taipei": "https://www.klook.com/en-GB/hotels/detail/409425-the-grand-hotel/",
  "cham-cham-taipei": "https://www.klook.com/en-GB/hotels/detail/428356-hotel-cham-cham--taipei/",
  "volandourai": "https://www.klook.com/en-GB/hotels/detail/576326-volando-urai-spring-spa-and-resort/",
};

// No confident Klook match found for these - get the generic fallback link instead.
const unmatched = ["dan-ju-qing-nian-lu-guan", "star-hostel-taipei-main-station", "jin-zhan-lu"];
const genericFallback = "https://www.klook.com/en-GB/hotels/searchresult/?city_id=19&stype=city&svalue=19&override=Taipei&title=Taipei&room_num=1&adult_num=2&child_num=0";

let content = post.content;
let replacedCount = 0;
let fallbackCount = 0;

for (const [slug, klookUrl] of Object.entries(klookMatches)) {
  const pattern = new RegExp(
    `href="https://www\\.booking\\.com/hotel/tw/${slug}\\.en\\.html[^"]*"`,
    "gi"
  );
  const withAid = `${klookUrl}?aid=8733`;
  const before = (content.match(pattern) || []).length;
  content = content.replace(pattern, `href="${withAid}"`);
  replacedCount += before;
  if (before === 0) console.error(`WARNING: no match found for slug ${slug}`);
}

for (const slug of unmatched) {
  const pattern = new RegExp(
    `href="https://www\\.booking\\.com/hotel/tw/${slug}\\.en\\.html[^"]*"`,
    "gi"
  );
  const before = (content.match(pattern) || []).length;
  content = content.replace(pattern, `href="${genericFallback}&aid=8733"`);
  fallbackCount += before;
  if (before === 0) console.error(`WARNING: no match found for unmatched slug ${slug}`);
}

// Relabel anchor text that just says "Booking.com" to "Klook" for accuracy.
// Leave "One"/"Two"/"Three" branch labels alone - still accurate.
content = content.replace(/(<a href="https:\/\/www\.klook\.com\/[^"]*">)Booking\.com(<\/a>)/gi, "$1Klook$2");

post.content = content;
post.modified = "2026-08-05 17:00:00";

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log(`Replaced ${replacedCount} matched links, ${fallbackCount} fallback links.`);
console.log("Remaining booking.com refs:", (content.match(/booking\.com/gi) || []).length);
