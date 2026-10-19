// Rewrites five old "best of" lists from the October 2026 research files in
// data/research/ (best-cafes-to-work, cheap-coffee, best-indian-restaurants,
// best-salads-in-taipei, healthy-restaurants-that-taste-great). The new
// bodies live in scripts/refresh-old-lists/<slug>.html.
//
// The research was snippet-only (page fetches were blocked), so the lists
// keep only venues with recent evidence; each research file's "still to
// check" section lists what to confirm on a visit or in Google Maps.
//
// The old Google My Maps embeds are dropped: they pinned venues that are now
// closed or off the lists (Campus Cafe branches, Hungry Pans A4, TGI Fridays).
//
// Also removes the false "7-Eleven uses the same beans as Starbucks" line from
// taipei-convenience-stores, and updates the chain price range quoted on
// best-coffee-shops-in-taipei.
//
// Usage: node scripts/refresh-old-lists.mjs [--write]
import fs from "node:fs";
import path from "node:path";

const FILE = "content/posts.json";
const BODIES = "scripts/refresh-old-lists";
const MODIFIED = "2026-10-19 12:00:00";
const write = process.argv.includes("--write");
const posts = JSON.parse(fs.readFileSync(FILE, "utf8"));

const PAGES = {
  "best-cafes-to-work": {
    title: "Best Cafes to Work From in Taipei: WiFi, Plugs & Seats",
    excerpt:
      "Taipei cafes with no time limit, plugs and WiFi for working or studying, from Block & Cafe by Main Station to Homey's and Dreamers, with each cafe's current rules.",
    featuredImage: "/media/2019/08/Youmoutoohana-Coffee-10-e1565062321582-1024x768.jpg",
  },
  "cheap-coffee": {
    title: "Cheap Coffee in Taipei (2026): 7-Eleven, Louisa & More",
    excerpt:
      "Where to get cheap coffee in Taipei: NT$35 Americanos at 7-Eleven and FamilyMart, Louisa after its 2026 price rise, Ray Cafe, and what the chains charge.",
    featuredImage: "/media/2019/07/Louisa-8-1024x768.jpg",
  },
  "best-indian-restaurants": {
    title: "Best Indian Restaurants in Taipei (2026): 8 Worth Trying",
    excerpt:
      "Saffron, Taipei's only Michelin-listed Indian restaurant, plus Punjabi favourites, halal TAJ, vegan 3 Idiots and where to find dosas, with prices and closing days.",
    featuredImage: "/media/2019/05/Saffron-Fine-Indian-Cuisine-4-1024x768.jpg",
  },
  "best-salads-in-taipei": {
    title: "Best Salads in Taipei: 4 Places for a Fresh Salad",
    excerpt:
      "Where to get a good salad in Taipei: Gonna's kale salads, Woopen's warm salad bowls, build-your-own at Salad Den and SHAN's salad boxes, with prices.",
    featuredImage: "/media/2019/08/Gonna-3-1024x768.jpg",
  },
  "healthy-restaurants-that-taste-great": {
    title: "Healthy Restaurants in Taipei That Still Taste Great",
    excerpt:
      "Healthy places to eat in Taipei that don't skimp on flavour: Sugar Pea's seasonal bowls, Tamed Fox's dietitian-designed brunch, Miacucina and vegan Ooh Cha Cha.",
    featuredImage: "/media/2019/07/Sugar-Pea-Cafe-8-1024x768.jpg",
  },
};

// [slug, find, replace] - must match exactly once.
const EDITS = [
  [
    "taipei-convenience-stores",
    "7-Eleven's is particularly good value, made with the same beans as Starbucks &ndash; see our full",
    "A medium Americano is NT$35 and a latte NT$45 at both 7-Eleven and FamilyMart &ndash; see our full",
  ],
  [
    "best-coffee-shops-in-taipei",
    "<strong>NT$35&ndash;90</strong> at the everyday chains covered above.",
    "<strong>NT$35&ndash;100</strong> at the everyday chains covered above.",
  ],
];

let ok = true;
const bySlug = (slug) => posts.find((p) => p.slug === slug);

for (const [slug, meta] of Object.entries(PAGES)) {
  const post = bySlug(slug);
  if (!post) { console.error(`${slug}: no such post`); ok = false; continue; }
  const body = fs.readFileSync(path.join(BODIES, `${slug}.html`), "utf8");
  if (meta.title.length > 60) { console.error(`${slug}: title ${meta.title.length} chars`); ok = false; }
  if (meta.excerpt.length > 165) { console.error(`${slug}: excerpt ${meta.excerpt.length} chars`); ok = false; }
  const image = path.join("public", meta.featuredImage);
  if (!fs.existsSync(image)) { console.error(`${slug}: missing ${image}`); ok = false; }
  for (const src of body.matchAll(/src="(\/media\/[^"]+)"/g)) {
    if (!fs.existsSync(path.join("public", src[1]))) { console.error(`${slug}: missing image ${src[1]}`); ok = false; }
  }
  for (const href of body.matchAll(/href="\/([a-z0-9-]+)(?:#[^"]*)?"/g)) {
    const target = href[1];
    if (!bySlug(target) && !["tag", "category"].includes(target)) { console.error(`${slug}: broken link /${target}`); ok = false; }
  }
  const words = body.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  console.log(`${slug}: ${words} words (was ${post.content.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length})`);
  Object.assign(post, meta, { content: body, modified: MODIFIED });
}

for (const [slug, find, rep] of EDITS) {
  const post = bySlug(slug);
  const n = post.content.split(find).length - 1;
  console.log(`${slug}: ${n} match(es)`);
  if (n !== 1) { ok = false; continue; }
  post.content = post.content.replace(find, () => rep);
}

if (!ok) { console.error("checks failed - nothing written"); process.exit(1); }
if (write) fs.writeFileSync(FILE, JSON.stringify(posts, null, 2) + "\n");
