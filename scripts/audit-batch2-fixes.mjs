import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const now = "2026-08-05 15:00:00";

function apply(slug, edits) {
  const post = posts.find((p) => p.slug === slug);
  if (!post) { console.error(`NOT FOUND: ${slug}`); process.exit(1); }
  for (const { from, to, label } of edits) {
    if (!post.content.includes(from)) { console.error(`EDIT NOT FOUND on ${slug}: ${label}`); process.exit(1); }
    post.content = post.content.replace(from, to);
    console.log(`OK: ${slug} - ${label}`);
  }
  post.modified = now;
}

apply("best-art-exhibitions-taipei", [
  {
    label: "Taipei DangDai stale 2020 date/price",
    from: "<p>2020 dates are&nbsp;<strong>17th – 20th January</strong></p>",
    to: "<p>Exact dates are announced a few months ahead each year on the official site &ndash; expect mid-to-late January.</p>",
  },
  {
    label: "Taipei DangDai stale price framing",
    from: "<p>Ticket prices for 2020 not confirmed, but prices last year were between NT$600 and NT$800.</p>",
    to: "<p>Recent years have priced tickets in the NT$600&ndash;800 range, though check the official site for the current year's exact price.</p>",
  },
  {
    label: "Art Taipei stale 2019-dated official link",
    from: '<a rel="noreferrer noopener" aria-label="Art Taipe (opens in a new tab)" href="https://2019.art-taipei.com/taipei/en/" target="_blank">Art Taipei</a>',
    to: '<a rel="noreferrer noopener" aria-label="Art Taipei (opens in a new tab)" href="https://2026.art-taipei.com/taipei/en/" target="_blank">Art Taipei</a>',
  },
  {
    label: "Art Taipei verified 2026 dates",
    from: "<p>2019 dates are <strong>18th - 21th October</strong></p>",
    to: "<p>2026 dates are <strong>30th October - 2nd November</strong></p>",
  },
  {
    label: "Art Taipei verified 2026 daily hours",
    from: "<p>18th 14:00-19:00<br>19th/20th: 11:00-19:00<br>21st 11:00-18:00</p>",
    to: "<p>30th 14:00-19:00<br>31st/1st: 11:00-19:00<br>2nd 11:00-18:00</p>",
  },
  {
    label: "Taipei Illustration Fair verified 2026 dates",
    from: "<p>2019 dates are <strong>19th - 22nd December</strong></p>",
    to: "<p>2026 dates are <strong>11th - 13th December</strong></p>",
  },
]);

apply("taiwan-world-music-festival", [
  {
    label: "stale 2019 line-up blockquote",
    from: '<blockquote class="wp-block-quote"><p><a rel="noreferrer noopener" aria-label="Line-up for 2019 (opens in a new tab)" href="http://wmftaiwan.com/2019/?page_id=1510&amp;lang=en" target="_blank"><strong><em>Line-up for 2019</em></strong></a></p></blockquote>',
    to: '<blockquote class="wp-block-quote"><p><a rel="noreferrer noopener" aria-label="Official Taiwan World Music Festival site (opens in a new tab)" href="http://wmftaiwan.com/" target="_blank"><strong><em>Check the official site for this year&rsquo;s line-up</em></strong></a></p></blockquote>',
  },
  {
    label: "stale 2020-directed aside",
    from: 'Message to Redpoint: "Get yourselves up here for the 2020 festival!"',
    to: "Redpoint Brewing has been a regular presence at past festivals, so it's worth checking if they're pouring at this year's.",
  },
]);

apply("taipei-astronomical-museum", [
  {
    label: "stale 'as of writing' specific film claim",
    from: "<p>The <strong>3D theatre</strong>, as of writing, swaps between showing an animation about Leonardo Dan Vinci and a wildlife documentary about Africa.",
    to: "<p>The <strong>3D theatre</strong> rotates its programme every few months, so check the museum's website for what's currently showing.",
  },
]);

apply("yongkang-street", [
  {
    label: "soften 'recently opened' Din Tai Fung branch claim",
    from: "Din Tai Fung have recently opened another larger branch just over the road,",
    to: "Din Tai Fung also has a larger branch just over the road,",
  },
]);

apply("best-places-to-keep-kids-amused", [
  {
    label: "soften 'recently opened' Yu Kids Island claim",
    from: "this famous Japanese indoor children's playground has recently opened up a new branch, found on the fifth floor of Shin Kong Mitsukoshi A8 mall in Xinyi.",
    to: "this famous Japanese indoor children's playground has a branch found on the fifth floor of Shin Kong Mitsukoshi A8 mall in Xinyi.",
  },
]);

// Reviewed, no confirmed issue found - venue-specific prices (Klook tour
// prices, happy hour drink prices, food court meal prices) were spot-checked
// but not independently verified against a current source; the rest of the
// content held up.
for (const slug of ["best-day-trips-from-taipei", "huashan-1914-creative-park", "best-bars-in-taipei", "where-to-have-lunch", "datong-walking-route"]) {
  const post = posts.find((p) => p.slug === slug);
  if (!post) { console.error(`NOT FOUND: ${slug}`); process.exit(1); }
  post.modified = now;
  console.log(`OK: ${slug} - reviewed, no confirmed issue`);
}

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log("Saved.");
