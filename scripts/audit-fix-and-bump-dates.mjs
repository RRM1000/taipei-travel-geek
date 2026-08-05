import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const now = "2026-08-05 14:00:00";

function apply(slug, edits) {
  const post = posts.find((p) => p.slug === slug);
  if (!post) {
    console.error(`NOT FOUND: ${slug}`);
    process.exit(1);
  }
  for (const { from, to, label } of edits) {
    if (!post.content.includes(from)) {
      console.error(`EDIT NOT FOUND on ${slug}: ${label}`);
      process.exit(1);
    }
    post.content = post.content.replace(from, to);
    console.log(`OK: ${slug} - ${label}`);
  }
  post.modified = now;
}

// Content fixes (the ones the audit actually found something wrong with)
apply("din-tai-fung", [
  {
    label: "stale set-menu price",
    from: "<p>There are two sets you can purchase, both costing NT$800 per person</p>",
    to: "<p>There are two sets you can purchase, both costing around NT$800&ndash;850 per person &ndash; Din Tai Fung raised prices by roughly 5% across the board in 2026, so expect the higher end of that.</p>",
  },
]);

apply("xinyi-shopping-district", [
  {
    label: "unverifiable 'most recent mall' claim",
    from: "<p>The most recent mall to open in December 2019, the <strong>Shin Kong A13</strong> also has a nice dining area on 3F.",
    to: "<p>The <strong>Shin Kong A13</strong>, which opened in December 2019, also has a nice dining area on 3F.",
  },
]);

apply("michelin-food-stands-at-night-markets", [
  {
    label: "stale 2022 Bib Gourmand count",
    from: "<p>As of 2022, there are a total of 24 food stands found at 8 night markets in Taipei that have been recognised as delivering high quality snacks for a reasonable price.</p>\n\n\n\n<p>Three of these night markets - Raohe, Linjiang Street and Nanjichang - have four Bib Gourmand food stands in each.</p>",
    to: "<p>Each year, a number of Taipei's night market food stands are recognised for delivering high quality snacks at a reasonable price &ndash; the exact list changes with every new edition of the guide, so I keep this page updated rather than quoting a fixed count that'll go stale.</p>",
  },
]);

apply("best-brunch-in-taipei", [
  {
    label: "dated 'relative newcomer' framing",
    from: "<p>Opened in 2018, the ACME Breakfast Club is a relative newcomer to the brunch scene, but it has",
    to: "<p>Opened in 2018, the ACME Breakfast Club has",
  },
]);

// Reviewed and confirmed accurate — no content change, just recording the review.
const reviewedOnly = [
  "chiang-kai-shek-memorial-hall",
  "ximending",
  "shilin-night-market",
  "national-palace-museum",
  "sun-yat-sen-memorial-hall",
  "songshan-cultural-and-creative-park",
  "best-famous-restaurants",
  "taipei-essentials-guide",
  "daan-forest-park",
  "national-taiwan-museum",
  "peace-park",
];
for (const slug of reviewedOnly) {
  const post = posts.find((p) => p.slug === slug);
  if (!post) {
    console.error(`NOT FOUND: ${slug}`);
    process.exit(1);
  }
  post.modified = now;
  console.log(`OK: ${slug} - reviewed, no change needed`);
}

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log("Saved.");
