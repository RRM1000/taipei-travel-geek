import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const idx = posts.findIndex((p) => p.slug === "taipei-guide");
const post = posts[idx];

const oldSection = `<h2 id="Visa">Visa Requirements &amp; Quarantine</h2>



<p>Taiwan has no COVID-related entry requirements, quarantine measures, or vaccination requirements in place.</p>



<p>These rules may be different for people travelling from Mainland China however.</p>



<p>The following countries will get <strong>90 days</strong> stay in Taiwan visa free.</p>



<figure class="wp-block-table"><table><tbody><tr><td>Andorra</td><td>Australia</td><td>Canada</td><td>Chile</td></tr><tr><td>Eswatini</td><td>Guatemala</td><td>Haiti</td><td>Honduras</td></tr><tr><td>Iceland</td><td>Israel</td><td>Japan</td><td>Liechtenstein</td></tr><tr><td>Marshall Islands</td><td>Monaco</td><td>New Zealand</td><td>Nicaragua</td></tr><tr><td>North Macedonia</td><td>Norway</td><td>Palau</td><td>Paraguay</td></tr><tr><td>San Marino</td><td>South Korea</td><td>Switzerland</td><td>Tuvalu</td></tr><tr><td>United Kingdom</td><td>United States</td><td>Vatican City</td><td></td></tr></tbody></table></figure>



<p>The following countries will get <strong>30 days</strong> stay in Taiwan visa free.</p>



<figure class="wp-block-table"><table><tbody><tr><td>Belize</td><td>Dominican Republic</td><td>Malaysia</td><td>Nauru</td></tr><tr><td>Saint Kitts and Nevis</td><td>Saint Lucia</td><td>Saint Vincent and the Grenadines</td><td>Singapore</td></tr></tbody></table></figure>



<p>Holders of normal passports issued by the following countries do not need a visa to visit Taiwan for less than <strong>14 days</strong>. They must hold proof of funds and hotel reservation or contact information in Taiwan.</p>



<figure class="wp-block-table"><table><tbody><tr><td>Brunei</td><td>Philippines</td><td>Thailand</td></tr></tbody></table></figure>



<p>For other countries, visit the <a aria-label="Wikipedia Visa page for Taiwan (opens in a new tab)" href="https://en.wikipedia.org/wiki/Visa_policy_of_Taiwan" target="_blank" rel="noreferrer noopener">Wikipedia Visa page for Taiwan</a>.</p>



<p>You'll need to complete an <strong>arrival form</strong> before you go through the security check. You should be given one during your incoming flight but forms are available at the airport.</p>



<p>If you leave and re-enter Taiwan, your visa will start again from scratch, so you'll get 90/30/14 more days if coming from the above countries.</p>



<p>Just like with most countries, your passport must have at least 6 months before it expires, and you will need proof of an outbound flight from Taiwan.</p>`;

if (!post.content.includes(oldSection)) {
  console.error("Old visa section not found — aborting without changes.");
  process.exit(1);
}

const newSection = `<h2 id="Visa">Visa Requirements &amp; Entry</h2>



<p>Most visitors don't need a visa at all &ndash; passport holders from a large number of countries, including the US, UK, most of the EU, Canada, Australia, New Zealand, Japan and South Korea, can currently enter visa-free for up to 90 days. A smaller number of nationalities get shorter visa-free stays (commonly 14 or 30 days), and everyone now completes an online arrival card before flying rather than a paper form on the plane.</p>



<p>Because the eligible countries (and day allowances) change from time to time, I've moved the full breakdown, the online arrival card process, and what happens at immigration into its own dedicated guide, which I'll keep updated as the rules change.</p>



<blockquote class="wp-block-quote"><p><a href="/taiwan-visa-entry-requirements">Click here to read my full Taiwan Visa &amp; Entry Requirements guide</a></p></blockquote>`;

post.content = post.content.replace(oldSection, newSection);
post.modified = "2026-08-05 12:15:00";

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log("Visa section simplified and linked to taiwan-visa-entry-requirements.");
