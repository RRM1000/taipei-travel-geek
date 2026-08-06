import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const post = posts.find((p) => p.slug === "best-areas-and-hotels-to-stay");
let content = post.content;

const genericFallback = "https://www.klook.com/en-GB/hotels/searchresult/?city_id=19&stype=city&svalue=19&override=Taipei&title=Taipei&room_num=1&adult_num=2&child_num=0&aid=8733";

const fixes = [
  { slug: "jin-zhan-lu", url: "https://www.klook.com/en-GB/hotels/detail/47440-goldinn-hotel/?aid=8733" },
  { slug: "star-hostel-taipei-main-station", url: "https://www.klook.com/en-GB/hotels/detail/271049-star-hostel-taipei-main-station/?aid=8733" },
  { slug: "dan-ju-qing-nian-lu-guan", url: "https://www.klook.com/en-GB/hotels/detail/534581-dan-hostel/?aid=8733" },
];

for (const { slug, url } of fixes) {
  const genericHref = new RegExp(`href="${genericFallback.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`, "g");
  // Only replace occurrences that were the fallback; since all 3 used the exact
  // same fallback URL, replace them one at a time in document order isn't
  // possible with a shared regex, so instead find each occurrence anchored by
  // its preceding hotel name context.
  console.log(slug, "target url:", url);
}

// Replace by preceding hotel-name context instead, since all 3 currently share
// the identical generic fallback href.
const replacements = [
  {
    label: "Golden Inn -> Goldinn Hotel (rename + link)",
    from: /Golden Inn( <sup>\[<a href=")[^"]*(")/g,
    to: `Goldinn Hotel$1https://www.klook.com/en-GB/hotels/detail/47440-goldinn-hotel/?aid=8733$2`,
  },
  {
    label: "Star Hostel link",
    from: /(Star Hostel[^<]*<sup>\[<a href=")[^"]*(")/g,
    to: `$1https://www.klook.com/en-GB/hotels/detail/271049-star-hostel-taipei-main-station/?aid=8733$2`,
  },
  {
    label: "Dan Hostel link",
    from: /(Dan Hostel <sup>\[<a href=")[^"]*(")/g,
    to: `$1https://www.klook.com/en-GB/hotels/detail/534581-dan-hostel/?aid=8733$2`,
  },
];

for (const { label, from, to } of replacements) {
  const before = (content.match(from) || []).length;
  if (before === 0) {
    console.error(`NOT FOUND: ${label}`);
    process.exit(1);
  }
  content = content.replace(from, to);
  console.log(`OK: ${label} (${before} occurrence(s))`);
}

post.content = content;
post.modified = "2026-08-05 17:30:00";

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log("Remaining generic-fallback hrefs:", (content.match(new RegExp(genericFallback.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) || []).length);
