import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const post = posts.find((p) => p.slug === "the-best-guided-tours-in-taipei");
if (!post) { console.error("Post not found"); process.exit(1); }
let content = post.content;

const oldSection = `<h2 id="Free">Free Half-Day Tour</h2>



<figure class="wp-block-image size-large"><img src="/media/2019/10/Bopiliao-Historical-Block-3-1024x723.jpg" alt="Bopiliao Historical Block" class="wp-image-5705"/><figcaption>Bopiliao Historical Block</figcaption></figure>



<p>Occurring on Saturdays and Sundays only, this free guided tour will take you around some significant attractions in the Wanhua and Zhongzheng districts of the city. You'll begin at Longshan Temple, then on to the Bopiliao Historical Block, the Red House in Ximending, the beautiful Peace Park before finishing at the magnificent Chiang Kai-shek Memorial Hall where you can spend the remainder of the afternoon if you please. Although the tour is free, you'll be expected to tip the guide at least NT$100.</p>



<div class="wp-block-group">
<ul><li><a href="/longshan-temple">Longshan Temple</a></li><li><a href="/bopiliao-historical-block">Bopiliao Historical Block</a></li><li><a href="/the-red-house-ximending">The Red House</a></li><li><a href="/peace-park">2/28 Peace Park</a></li><li><a href="/chiang-kai-shek-memorial-hall">Chiang Kai-shek Memorial Hall</a> </li></ul>
</div>



<figure class="wp-block-table aligncenter"><table><tbody><tr><td class="has-text-align-center" data-align="center"><strong>Tour Length</strong></td><td class="has-text-align-center" data-align="center"><strong>Start Time</strong></td><td class="has-text-align-center" data-align="center"><strong>Price</strong></td></tr><tr><td class="has-text-align-center" data-align="center"><strong>3 hours</strong></td><td class="has-text-align-center" data-align="center"><strong>10:00</strong></td><td class="has-text-align-center" data-align="center"><strong>FREE</strong></td></tr></tbody></table></figure>



<ins class="klk-aff-widget"  data-adid="665393" data-lang="" data-currency="" data-cardH="126" data-padding="92" data-lgH="470" data-edgeValue="655" data-prod="static_widget" data-amount="1"><a href="//www.klook.com/">Klook.com</a></ins>`;

const newSection = `<h2 id="Free">Old Taipei City History Walking Tour</h2>



<figure class="wp-block-image size-large"><img src="/media/2019/10/Bopiliao-Historical-Block-3-1024x723.jpg" alt="Bopiliao Historical Block" class="wp-image-5705"/><figcaption>Bopiliao Historical Block</figcaption></figure>



<p>An English-guided walking tour giving a proper introduction to Taipei's old city history, meeting near NTU Hospital Station. Over 2 - 2.5 hours, a local guide walks you through the old city district covering the history behind it, with some Taiwanese food and culture worked in along the way - a good option if you'd rather have context for what you're looking at than just wander on your own. It's essentially a free/tip-based format - the small booking fee just reserves your spot.</p>



<figure class="wp-block-table aligncenter"><table><tbody><tr><td class="has-text-align-center" data-align="center"><strong>Tour Length</strong></td><td class="has-text-align-center" data-align="center"><strong>Meeting Point</strong></td><td class="has-text-align-center" data-align="center"><strong>Price</strong></td></tr><tr><td class="has-text-align-center" data-align="center"><strong>2 - 2.5 hours</strong></td><td class="has-text-align-center" data-align="center"><strong>NTU Hospital Station</strong></td><td class="has-text-align-center" data-align="center"><strong>From NT$90</strong></td></tr></tbody></table></figure>



<ins class="klk-aff-widget"  data-adid="665393" data-lang="" data-currency="" data-cardH="126" data-padding="92" data-lgH="470" data-edgeValue="655" data-prod="static_widget" data-amount="1"><a href="//www.klook.com/">Klook.com</a></ins>`;

if (!content.includes(oldSection)) { console.error("Old section not found — aborting."); process.exit(1); }
content = content.replace(oldSection, newSection);

// Update the TOC entry too, if it exists
content = content.replace(
  /<li><a href="#Free">Free Half-Day Tour<\/a><\/li>/,
  '<li><a href="#Free">Old Taipei City History Walking Tour</a></li>'
);

post.content = content;
post.modified = "2026-08-06 18:55:00";

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log("Updated the Free Half-Day Tour section to the Old Taipei City History Walking Tour.");
