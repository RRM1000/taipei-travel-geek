import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const idx = posts.findIndex((p) => p.slug === "taipei-guide");
if (idx === -1) {
  console.error("taipei-guide not found");
  process.exit(1);
}
const post = posts[idx];
let content = post.content;

// 1. Title: drop the stale year rather than swap to a new one that'll just go
//    stale again next year.
const oldTitle = "Discover Taipei in 2023: Your Ultimate Travel Guide";
const newTitle = "Discover Taipei: Your Ultimate Travel Guide";
if (post.title !== oldTitle) {
  console.error(`Title mismatch, expected "${oldTitle}", got "${post.title}"`);
  process.exit(1);
}
post.title = newTitle;
console.log("OK: title");

const edits = [
  {
    label: "EasyCard discount claim",
    from: "It can be used on all types of public transportation, including the Airport Express, and offers a 20% discount on all MRT travel.",
    to: "It can be used on all types of public transportation, including the Airport Express, and frequent riders (11+ rides/month) can earn 5&ndash;15% monthly cash rebates on MRT travel.",
  },
  {
    label: "network operator count + typo",
    from: "Taiwan has four network operators, with Chungwha Telecom having the best coverage in more rural areas, although all networks are fine for Taipei.",
    to: "Taiwan has three network operators &ndash; Chunghwa Telecom, Taiwan Mobile and FarEasTone (T Star has since merged into Taiwan Mobile) &ndash; with Chunghwa Telecom having the best coverage in more rural areas, although all networks are fine for Taipei.",
  },
  {
    label: "COVID-era quarantine line",
    from: "As of October 2022, Taiwan ended mandatory quarantines, although you will be required to self-monitor for 7 days. You also do not need to be vaccinated to enter the country.",
    to: "Taiwan has no COVID-related entry requirements, quarantine measures, or vaccination requirements in place.",
  },
];

for (const edit of edits) {
  if (!content.includes(edit.from)) {
    console.error(`NOT FOUND: ${edit.label}`);
    process.exit(1);
  }
  content = content.replace(edit.from, edit.to);
  console.log(`OK: ${edit.label}`);
}

post.content = content;
post.modified = "2026-08-05 12:00:00";

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log("Saved.");
