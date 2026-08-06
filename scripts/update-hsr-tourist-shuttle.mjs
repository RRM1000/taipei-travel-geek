import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const post = posts.find((p) => p.slug === "taiwan-high-speed-rail-hsr-discounts-klook");
if (!post) { console.error("Post not found"); process.exit(1); }
let content = post.content;

// 1. Remove the dead 640965 widget entirely
const oldWidget640965 = `<ins class="klk-aff-widget" data-adid="640965" data-lang="" data-currency="" data-cardh="126" data-padding="92" data-lgh="470" data-edgevalue="655" data-prod="static_widget" data-amount="1"><a href="//www.klook.com/">Klook.com</a></ins>

`;
if (!content.includes(oldWidget640965)) { console.error("640965 widget not found — aborting."); process.exit(1); }
content = content.replace(oldWidget640965, "");

// 2. Add a paragraph explaining the Taiwan PASS (HSR Edition) / Tourist Shuttle combo,
// right after the existing bullet list that already name-checks it.
const anchor = `<ul>
  <li>One-way ticket between any two THSR stations</li>
  <li>2 or 3 day tourist passes</li>
  <li>Taiwan PASS (HSR Edition)</li>
</ul>

<p>Klook frequently runs promotional campaigns like <strong>buy-one-get-one-free (BOGO)</strong> for one-way tickets (especially for travel to central and southern stations). Since these promotions are seasonal and run for limited periods, check the active deals page to see what campaigns are running today!</p>`;

const replacement = `<ul>
  <li>One-way ticket between any two THSR stations</li>
  <li>2 or 3 day tourist passes</li>
  <li>Taiwan PASS (HSR Edition)</li>
</ul>

<p>The <strong>Taiwan PASS (HSR Edition)</strong> is worth a look if you're planning to combine the high speed rail with day trips outside the main stations - it bundles a <strong>3-day HSR pass</strong> with <strong>MRT</strong> access and the <strong>Taiwan Tourist Shuttle</strong> (the bus network that connects HSR stations to nearby attractions like Sun Moon Lake, Alishan and other scenic spots that the railway itself doesn't reach). It's activated and used through the Taiwan PASS app, is valid for 7 days from activation, and is limited to short-term foreign visitors. If your itinerary includes stops that need a connecting shuttle bus anyway, it can work out more convenient than buying HSR and shuttle tickets separately.</p>

<p>Klook frequently runs promotional campaigns like <strong>buy-one-get-one-free (BOGO)</strong> for one-way tickets (especially for travel to central and southern stations). Since these promotions are seasonal and run for limited periods, check the active deals page to see what campaigns are running today!</p>`;

if (!content.includes(anchor)) { console.error("Bullet list anchor not found — aborting."); process.exit(1); }
content = content.replace(anchor, replacement);

post.content = content;
post.modified = "2026-08-06 17:40:00";

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log("Removed 640965 widget and added Taiwan PASS / Tourist Shuttle explanation.");
