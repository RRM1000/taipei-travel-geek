import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const post = posts.find((p) => p.slug === "taipei-guide");
if (!post) { console.error("Post not found"); process.exit(1); }
let content = post.content;

// 1. Typhoon frequency - most sources (CWA/OCAC, Taipei Times) put it at 3-5
// typhoons affecting Taiwan per year, not 5-6.
const oldTyphoon = `There's also a risk of <strong>typhoons</strong>, with generally 5 or 6 each year. The eye of the storm will pass in a few hours, but during this time you'll be stranded in your hotel, and most places will close down for a day or sometimes two days.`;
const newTyphoon = `There's also a risk of <strong>typhoons</strong>, with generally 3 to 5 affecting Taiwan each year (though usually only 1 or 2 make direct landfall). The eye of the storm will pass in a few hours, but during this time you'll be stranded in your hotel, and most places will close down for a day or sometimes two days.`;

if (!content.includes(oldTyphoon)) { console.error("Typhoon paragraph not found — aborting."); process.exit(1); }
content = content.replace(oldTyphoon, newTyphoon);

// 2. Add a TOC entry for the new 3-5 day itinerary section, right after "1 Day Itineraries"
const oldToc = `<li><a href="#Itineraries">1 Day Itineraries</a></li>`;
const newToc = `<li><a href="#Itineraries">1 Day Itineraries</a></li><li><a href="#Multi-Day-Itineraries">3-5 Day Itineraries</a></li>`;
if (!content.includes(oldToc)) { console.error("TOC entry not found — aborting."); process.exit(1); }
content = content.replace(oldToc, newToc);

// 3. Add the new section right after the existing "1 Day Itineraries" section
const anchor = `<li>KIDS: Visit the Astronomical Museum, Science Education Center, Amusement Park and Shilin Night Market, all located in the same vicinity</li></ul>



<hr class="wp-block-separator has-alpha-channel-opacity"/>



<div style="height:42px" aria-hidden="true" class="wp-block-spacer"></div>`;

const replacement = `<li>KIDS: Visit the Astronomical Museum, Science Education Center, Amusement Park and Shilin Night Market, all located in the same vicinity</li></ul>



<hr class="wp-block-separator has-alpha-channel-opacity"/>



<div style="height:42px" aria-hidden="true" class="wp-block-spacer"></div>



<h2 id="Multi-Day-Itineraries">3-5 Day Itineraries</h2>



<p>If you're staying longer, it's worth planning day-by-day rather than winging it - Taipei's attractions cluster naturally by district, so a bit of grouping saves you from criss-crossing the city.</p>



<blockquote class="wp-block-quote"><p><a href="/taipei-itinerary-3-5-days">Click here for my full 3-5 day Taipei itinerary</a></p></blockquote>



<hr class="wp-block-separator has-alpha-channel-opacity"/>



<div style="height:42px" aria-hidden="true" class="wp-block-spacer"></div>`;

if (!content.includes(anchor)) { console.error("Section insertion anchor not found — aborting."); process.exit(1); }
content = content.replace(anchor, replacement);

post.content = content;
post.modified = "2026-08-06 14:00:00";

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log("Updated taipei-guide: fixed typhoon figure, added 3-5 Day Itineraries section.");
