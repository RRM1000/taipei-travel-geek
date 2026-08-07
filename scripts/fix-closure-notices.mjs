import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));

const closedSlugs = [
  "redpoint-brewing-co-taproom", "hive-restaurant", "ice-monster", "pizzeria-oggi",
  "taebak", "craft-beer-cafe", "continue-gaming-bar", "herban-kitchen-bar",
  "joseph-bistro", "woo-taipei", "flourish", "flavor-of-india", "urbn-culture",
  "give-happiness", "un-petit-pas-bistro", "big-table-taipei",
];

// The `date` (original publish date) for these 4 got mistakenly bumped to
// today alongside `modified` when the closure notice was added, which is
// what pushed them to the front of the "Latest Guides & Stories" carousel
// (it sorts by `date`). Restoring their real original publish dates.
const originalDates = {
  "redpoint-brewing-co-taproom": "2019-05-02 01:34:19",
  "craft-beer-cafe": "2019-07-01 05:35:48",
  "continue-gaming-bar": "2019-05-17 03:32:00",
  "woo-taipei": "2019-05-02 04:28:39",
};

let titlesFixed = 0;
let datesFixed = 0;

for (const slug of closedSlugs) {
  const post = posts.find((p) => p.slug === slug);
  if (!post) { console.error(`NOT FOUND: ${slug}`); continue; }

  if (!/permanently closed/i.test(post.title)) {
    post.title = `${post.title} (Permanently Closed)`;
    titlesFixed++;
  }

  if (originalDates[slug] && post.date !== originalDates[slug]) {
    post.date = originalDates[slug];
    datesFixed++;
  }
}

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log(`Fixed ${titlesFixed} titles, restored ${datesFixed} original publish dates.`);
