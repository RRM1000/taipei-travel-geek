import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const post = posts.find((p) => p.slug === "jiufen");
if (!post) { console.error("Post not found"); process.exit(1); }
let content = post.content;

// --- 1. Add TOC entry for Geopark ---
const oldToc = `<li><a href="#Yin-Yang-Sea">Yin Yang Sea &amp; Golden Waterfall</a></li><li><a href="#Combining">Combining with Shifen &amp; the Northeast Coast</a></li>`;
const newToc = `<li><a href="#Yin-Yang-Sea">Yin Yang Sea &amp; Golden Waterfall</a></li><li><a href="#Geopark">Yehliu Geopark</a></li><li><a href="#Combining">Combining with Shifen &amp; the Northeast Coast</a></li>`;
if (!content.includes(oldToc)) { console.error("TOC anchor not found"); process.exit(1); }
content = content.replace(oldToc, newToc);

// --- 2. Insert Yehliu Geopark section, after Yin Yang Sea / before Combining ---
const insertAfter = `<p>A short bus or taxi ride from Jiufen (or a stop on most guided tours) is the <strong>Yin Yang Sea</strong> (陰陽海), a bay where mineral deposits from the old Jinguashi mines turn part of the water a distinct yellow-brown against the deep blue of the open sea. Nearby is the <strong>Golden Waterfall</strong>, stained a similar yellow colour by the same mineral runoff. Both are free to view from the roadside and worth 20-30 minutes if you have your own transport or are on a tour that includes them.</p>



<hr class="wp-block-separator has-css-opacity"/>



<h2 id="Combining">Combining with Shifen &amp; the Northeast Coast</h2>`;

const geoparkSection = `<p>A short bus or taxi ride from Jiufen (or a stop on most guided tours) is the <strong>Yin Yang Sea</strong> (陰陽海), a bay where mineral deposits from the old Jinguashi mines turn part of the water a distinct yellow-brown against the deep blue of the open sea. Nearby is the <strong>Golden Waterfall</strong>, stained a similar yellow colour by the same mineral runoff. Both are free to view from the roadside and worth 20-30 minutes if you have your own transport or are on a tour that includes them.</p>



<hr class="wp-block-separator has-css-opacity"/>



<h2 id="Geopark">Yehliu Geopark</h2>



<p>A little further along the coast from Jiufen is <strong>Yehliu Geopark</strong> (野柳地質公園), a rocky cape shaped by decades of sea erosion, wind, and weathering into an otherworldly landscape of mushroom rocks, honeycomb rocks, and candlestick formations. The most famous of these is the <strong>Queen's Head</strong> (女王頭), a mushroom-shaped rock with a distinctive slender "neck" that's become one of Taiwan's most photographed natural landmarks - though be aware the neck is slowly eroding, and the rock is expected to eventually break at its current pace, so queues to photograph it can get long at peak times.</p>



<figure class="wp-block-image size-large"><img src="/media/2026/08/Jiufen-Geopark-1-1024x1365.jpg" alt="Mushroom rock formation at Yehliu Geopark shaped by centuries of sea erosion" class="wp-image-jiufen-geopark-1"/></figure>



<p>Beyond the headline formations, the wider park is worth the full walk - the coastal boardwalk winds past hundreds of smaller eroded rocks, tide pools, and sweeping views out over the Pacific, with the odd rock shapes becoming stranger the further out onto the cape you go.</p>



<figure class="wp-block-image size-large"><img src="/media/2026/08/Jiufen-Geopark-2-1024x649.jpg" alt="Wide view of the eroded rock formations and boardwalk at Yehliu Geopark on the Taiwan coast" class="wp-image-jiufen-geopark-2"/></figure>



<p>Admission is a modest <strong>NT$120 per person</strong>, and it's easily combined with Jiufen as part of the same day out - most of the guided tours below include it as a stop, since it sits roughly between Taipei and Jiufen along the coast road.</p>



<hr class="wp-block-separator has-css-opacity"/>



<h2 id="Combining">Combining with Shifen &amp; the Northeast Coast</h2>`;

if (!content.includes(insertAfter)) { console.error("Geopark insertion anchor not found"); process.exit(1); }
content = content.replace(insertAfter, geoparkSection);

// --- 3. Replace the entire Tours section ---
const oldToursStart = content.indexOf('<h2 id="Tours">');
if (oldToursStart === -1) { console.error("Tours section not found"); process.exit(1); }
const oldToursSection = content.slice(oldToursStart);

const newToursSection = `<h2 id="Tours">Guided Day Trip Tour Options</h2>



<p>There are a few different guided day trips that cover Jiufen, depending on how much else you want to pack in. Here are the three worth considering:</p>



<h3 id="Tour-Full-Day">Yehliu Geopark &amp; Jiufen Old Street Full-Day Tour</h3>



<p>The most complete standard option, combining the two headline stops - <a href="https://www.klook.com/en-GB/activity/84355-yeliou-jinguashih-juifen-shihfen-carpool-day-tour/?aid=8733" target="_blank" rel="noreferrer noopener"><strong>Yehliu Geopark and Jiufen Old Street</strong></a> - into a single full day, with hotel pick-up included so you don't need to get yourself to a departure point. It's a Klook's Choice pick, rated 4.6/5 from over 1,100 reviews and booked more than 20,000 times.</p>



<figure class="wp-block-table aligncenter"><table><tbody><tr><td class="has-text-align-center" data-align="center"><strong>Tour Length</strong></td><td class="has-text-align-center" data-align="center"><strong>Start Time</strong></td><td class="has-text-align-center" data-align="center"><strong>Price</strong></td></tr><tr><td class="has-text-align-center" data-align="center"><strong>~10 hours</strong></td><td class="has-text-align-center" data-align="center"><strong>08:00</strong></td><td class="has-text-align-center" data-align="center"><strong>From NT$900</strong></td></tr></tbody></table></figure>



<p><a href="https://www.klook.com/en-GB/activity/84355-yeliou-jinguashih-juifen-shihfen-carpool-day-tour/?aid=8733" target="_blank" rel="noreferrer noopener"><strong>Check availability and book on Klook</strong></a></p>



<div style="height:40px" aria-hidden="true" class="wp-block-spacer"></div>



<h3 id="Tour-Night">Jiufen at Night, Shifen (Sky Lanterns) &amp; Shifen Waterfall Tour</h3>



<p>Best if you specifically want to see <strong>Jiufen lit up after dark</strong> rather than in daylight. This <a href="https://www.klook.com/en-GB/activity/98800-nighttime-jiufen-shifen/?aid=8733" target="_blank" rel="noreferrer noopener"><strong>Jiufen at Night, Shifen and Shifen Waterfall tour</strong></a> combines the lantern-lit Old Street at night with a sky lantern release and the waterfall at Shifen. There's a 6-hour and an 8-hour version - the longer one lets you carry on into a night market afterwards instead of heading straight back.</p>



<figure class="wp-block-table aligncenter"><table><tbody><tr><td class="has-text-align-center" data-align="center"><strong>Tour Length</strong></td><td class="has-text-align-center" data-align="center"><strong>Start Time</strong></td><td class="has-text-align-center" data-align="center"><strong>Price</strong></td></tr><tr><td class="has-text-align-center" data-align="center"><strong>6 - 8 hours</strong></td><td class="has-text-align-center" data-align="center"><strong>Afternoon</strong></td><td class="has-text-align-center" data-align="center"><strong>From NT$1,380</strong></td></tr></tbody></table></figure>



<p><a href="https://www.klook.com/en-GB/activity/98800-nighttime-jiufen-shifen/?aid=8733" target="_blank" rel="noreferrer noopener"><strong>Check availability and book on Klook</strong></a></p>



<div style="height:40px" aria-hidden="true" class="wp-block-spacer"></div>



<h3 id="Tour-Value">Yehliu Geopark, Jiufen, Shifen &amp; Golden Waterfall Day Tour</h3>



<p>The best-value option if you want to see everything in one trip, and by far the most popular of the three - this <a href="https://www.klook.com/en-GB/activity/76306-yehliu-jiufen-shifen-golden-waterfall-day-tour/?aid=8733" target="_blank" rel="noreferrer noopener"><strong>Yehliu Geopark, Jiufen, Shifen &amp; Golden Waterfall tour</strong></a> is rated 4.9/5 from over 45,000 reviews and has been booked more than 600,000 times. It covers the Queen's Head at Yehliu, both Jiufen and Shifen Old Streets, a sky lantern release, and the Golden Waterfall, with a professional guide and round-trip transfer from central Taipei - all for less than either of the other two options above.</p>



<figure class="wp-block-table aligncenter"><table><tbody><tr><td class="has-text-align-center" data-align="center"><strong>Tour Length</strong></td><td class="has-text-align-center" data-align="center"><strong>Meeting Point</strong></td><td class="has-text-align-center" data-align="center"><strong>Price</strong></td></tr><tr><td class="has-text-align-center" data-align="center"><strong>7h15 - 9h45</strong></td><td class="has-text-align-center" data-align="center"><strong>Taipei East Gate 3</strong></td><td class="has-text-align-center" data-align="center"><strong>From NT$605</strong></td></tr></tbody></table></figure>



<p><a href="https://www.klook.com/en-GB/activity/76306-yehliu-jiufen-shifen-golden-waterfall-day-tour/?aid=8733" target="_blank" rel="noreferrer noopener"><strong>Check availability and book on Klook</strong></a></p>



<div style="height:40px" aria-hidden="true" class="wp-block-spacer"></div>



<ins class="klk-aff-widget" data-adid="1372054" data-lang="" data-currency="" data-cardh="126" data-padding="92" data-lgh="470" data-edgevalue="655" data-prod="static_widget" data-amount="3"><a href="//www.klook.com/">Klook.com</a></ins>



<div style="height:30px" aria-hidden="true" class="wp-block-spacer"></div>`;

content = content.slice(0, oldToursStart) + newToursSection;

post.content = content;
post.modified = "2026-08-06 12:00:00";

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log("Updated jiufen post: added Geopark section, rebuilt Tours section.");
console.log("Old Tours section length:", oldToursSection.length, "New:", newToursSection.length);
