import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const post = posts.find((p) => p.slug === "best-day-trips-from-taipei");
if (!post) { console.error("Post not found"); process.exit(1); }
let content = post.content;

// --- 1. TOC: update both entries ---
const oldToc = `<li><a href="#Pingxi">Pingxi Shifen Half Day Guided Tour with Sky Lantern Experience</a></li><li><a href="#Heping">Heping Island, Shifen and Jiufen</a></li><li><a href="#Shiding">Thousand Island Lake and Pinglin Tea Plantation</a></li><li><a href="#Leofoo">Leofoo Village Theme Park</a></li>`;
const newToc = `<li><a href="#Jiufen-Night">Jiufen at Night, Shifen &amp; Sky Lanterns</a></li><li><a href="#Heping">Heping Island, Shifen and Jiufen</a></li><li><a href="#Shiding">Thousand Island Lake and Pinglin Tea Plantation</a></li><li><a href="#Sun-Moon-Lake">Sun Moon Lake Day Tour</a></li>`;
if (!content.includes(oldToc)) { console.error("TOC not found — aborting."); process.exit(1); }
content = content.replace(oldToc, newToc);

// --- 2. Replace the Pingxi section with Jiufen at Night, Shifen & Sky Lanterns ---
const oldPingxi = `<h2 id="Pingxi">Pingxi Shifen Half Day Guided Tour with Sky Lantern Experience</h2>



<figure class="wp-block-image size-full is-resized"><img src="/media/2022/11/Pingxi.jpg" alt="" class="wp-image-9355" width="838" height="479"/></figure>



<p>This excellent half-day guided tour will take you to Pingxi, a township just 50 minutes from Taipei that is famous it's sky lanterns. Make a wish and let your blessings&nbsp;sail up to the sky. Pingxi and Shifen Old Streets are filled with old shops and wooden houses built during the Japanese occupation era, and have a train track which runs right through the middle. You get to travel on the train, which takes you to Shifen Waterfall, one of the largest and most impressive waterfalls in Taiwan.</p>



<figure class="wp-block-table aligncenter"><table><tbody><tr><td class="has-text-align-center" data-align="center"><strong>Tour Length</strong></td><td class="has-text-align-center" data-align="center"><strong>Start Time</strong></td><td class="has-text-align-center" data-align="center"><strong>Price</strong></td></tr><tr><td class="has-text-align-center" data-align="center"><strong>4 hours</strong></td><td class="has-text-align-center" data-align="center"><strong>13:00</strong></td><td class="has-text-align-center" data-align="center"><strong>NT$1,500</strong></td></tr></tbody></table></figure>



<ins class="klk-aff-widget" data-adid="633479" data-lang="" data-currency="" data-cardh="126" data-padding="92" data-lgh="470" data-edgevalue="655" data-prod="static_widget" data-amount="1"><a href="//www.klook.com/">Klook.com</a></ins>`;

const newJiufenNight = `<h2 id="Jiufen-Night">Jiufen at Night, Shifen &amp; Sky Lanterns</h2>



<figure class="wp-block-image size-full is-resized"><img src="/media/2026/08/Jiufen-Village-Night-View-1024x766.jpg" alt="Jiufen village lit up at night" class="wp-image-jiufen-night" width="838" height="479"/></figure>



<p>This tour is best if you specifically want to see <strong>Jiufen lit up after dark</strong> rather than in daylight. It combines the lantern-lit Old Street at night with a sky lantern release and Shifen Waterfall. There's a 6-hour and an 8-hour version - the longer one lets you carry on into a night market afterwards instead of heading straight back to Taipei.</p>



<figure class="wp-block-table aligncenter"><table><tbody><tr><td class="has-text-align-center" data-align="center"><strong>Tour Length</strong></td><td class="has-text-align-center" data-align="center"><strong>Start Time</strong></td><td class="has-text-align-center" data-align="center"><strong>Price</strong></td></tr><tr><td class="has-text-align-center" data-align="center"><strong>6 - 8 hours</strong></td><td class="has-text-align-center" data-align="center"><strong>Afternoon</strong></td><td class="has-text-align-center" data-align="center"><strong>From NT$1,380</strong></td></tr></tbody></table></figure>



<ins class="klk-aff-widget" data-adid="633479" data-lang="" data-currency="" data-cardh="126" data-padding="92" data-lgh="470" data-edgevalue="655" data-prod="static_widget" data-amount="1"><a href="//www.klook.com/">Klook.com</a></ins>`;

if (!content.includes(oldPingxi)) { console.error("Pingxi section not found — aborting."); process.exit(1); }
content = content.replace(oldPingxi, newJiufenNight);

// --- 3. Replace the Leofoo section with Sun Moon Lake Day Tour ---
const oldLeofoo = `<h2 id="Leofoo">Leofoo Village Theme Park</h2>



<figure class="wp-block-image size-full is-resized"><img src="/media/2022/11/Leofoo-Village-Theme-Park.jpg" alt="" class="wp-image-9380" width="837" height="514"/></figure>



<p>If you have children, the Leofoo Village Theme Park is a 2 hour coach ride from Taipei and features dozens of thrill-seeking rides including 3 rollercoasters, water rides and many rides more suited to younger children. There are several themed areas, from South Pacific to the Wild West, while the African Safari&nbsp;area has many wild beasts including tigers and baboons. The price includes round-trip coach travel and entry ticket.</p>



<figure class="wp-block-table aligncenter"><table><tbody><tr><td class="has-text-align-center" data-align="center"><strong>Tour Length</strong></td><td class="has-text-align-center" data-align="center"><strong>Start Time</strong></td><td class="has-text-align-center" data-align="center"><strong>Price</strong></td></tr><tr><td class="has-text-align-center" data-align="center"><strong>8 hours</strong></td><td class="has-text-align-center" data-align="center"><strong>08:30</strong></td><td class="has-text-align-center" data-align="center"><strong>NT$1,080</strong></td></tr></tbody></table></figure>



<ins class="klk-aff-widget" data-adid="634804" data-lang="" data-currency="" data-cardh="126" data-padding="92" data-lgh="470" data-edgevalue="655" data-prod="static_widget" data-amount="1"><a href="//www.klook.com/">Klook.com</a></ins>`;

const newSunMoonLake = `<h2 id="Sun-Moon-Lake">Sun Moon Lake Day Tour</h2>



<p>A full day out to <strong>Sun Moon Lake</strong> - Taiwan's largest lake, and one of its most photographed spots - departing from Taipei Main Station or MRT Ximen Station. The tour covers Xuanguang Temple, the lakeside village of Ita Thao, and the striking Xiangshan Visitor Center, with the scenery experienced from a mix of a lake boat ride, walking, and an optional bike ride. It's a long day (round trip from Taipei and back takes most of it), but a good option if you want to see Sun Moon Lake without renting a car.</p>



<figure class="wp-block-table aligncenter"><table><tbody><tr><td class="has-text-align-center" data-align="center"><strong>Tour Length</strong></td><td class="has-text-align-center" data-align="center"><strong>Departs From</strong></td><td class="has-text-align-center" data-align="center"><strong>Price</strong></td></tr><tr><td class="has-text-align-center" data-align="center"><strong>12 hours</strong></td><td class="has-text-align-center" data-align="center"><strong>Taipei Main Station / Ximen</strong></td><td class="has-text-align-center" data-align="center"><strong>From NT$1,530</strong></td></tr></tbody></table></figure>



<ins class="klk-aff-widget" data-adid="634804" data-lang="" data-currency="" data-cardh="126" data-padding="92" data-lgh="470" data-edgevalue="655" data-prod="static_widget" data-amount="1"><a href="//www.klook.com/">Klook.com</a></ins>`;

if (!content.includes(oldLeofoo)) { console.error("Leofoo section not found — aborting."); process.exit(1); }
content = content.replace(oldLeofoo, newSunMoonLake);

post.content = content;
post.modified = "2026-08-06 17:00:00";

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log("Updated best-day-trips-from-taipei: Pingxi -> Jiufen at Night, Leofoo -> Sun Moon Lake.");
