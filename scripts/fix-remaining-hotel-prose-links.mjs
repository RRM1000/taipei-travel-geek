import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const post = posts.find((p) => p.slug === "best-areas-and-hotels-to-stay");
let content = post.content;

const fallback = "https://www.klook.com/en-GB/hotels/searchresult/?city_id=19&stype=city&svalue=19&override=Taipei&title=Taipei&room_num=1&adult_num=2&child_num=0&aid=8733";

const fixes = [
  {
    oldSuffix: `${fallback}" target="_blank" rel="noreferrer noopener"><strong>Dan Hostel`,
    newSuffix: `https://www.klook.com/en-GB/hotels/detail/534581-dan-hostel/?aid=8733" target="_blank" rel="noreferrer noopener"><strong>Dan Hostel`,
    label: "Dan Hostel prose link",
  },
  {
    oldSuffix: `${fallback}" target="_blank" rel="noreferrer noopener">Star Hostel`,
    newSuffix: `https://www.klook.com/en-GB/hotels/detail/271049-star-hostel-taipei-main-station/?aid=8733" target="_blank" rel="noreferrer noopener">Star Hostel`,
    label: "Star Hostel prose link",
  },
  {
    oldSuffix: `${fallback}" target="_blank" rel="noreferrer noopener"><strong>Golden Inn`,
    newSuffix: `https://www.klook.com/en-GB/hotels/detail/47440-goldinn-hotel/?aid=8733" target="_blank" rel="noreferrer noopener"><strong>Goldinn Hotel`,
    label: "Goldinn Hotel prose link + rename",
  },
];

for (const { oldSuffix, newSuffix, label } of fixes) {
  if (!content.includes(oldSuffix)) {
    console.error(`NOT FOUND: ${label}`);
    process.exit(1);
  }
  content = content.replace(oldSuffix, newSuffix);
  console.log(`OK: ${label}`);
}

post.content = content;
post.modified = "2026-08-05 17:45:00";

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));

const remainingFallback = content.split(fallback).length - 1;
const remainingGoldenInn = (content.match(/Golden Inn/g) || []).length;
console.log("Remaining fallback occurrences:", remainingFallback);
console.log("Remaining 'Golden Inn' text:", remainingGoldenInn);
