import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const postIndex = posts.findIndex((p) => p.slug === "taiwan-easycard");

if (postIndex === -1) {
  console.error("Post taiwan-easycard not found!");
  process.exit(1);
}

const updatedContent = `<p>Whether you're visiting Taiwan for a short trip or choosing to move here, the versatile <strong>EasyCard</strong> (commonly referred to by locals as the <em>yoyo ka</em> 悠遊卡) is your single most important travel purchase.</p>

<details class="article-toc-block"><summary>On this page</summary><nav aria-label="On this page"><ul><li><a href="#Easycard-What">What is an EasyCard?</a></li><li><a href="#Easycard-vs-Supercard">Standard EasyCard vs SuperCard</a></li><li><a href="#Easycard-Used">Where Can an EasyCard be Used?</a></li><li><a href="#Apple-Pay-Contactless">Contactless Credit Cards &amp; Mobile Pay</a></li><li><a href="#Easycard-Purchased">Where to Buy an EasyCard</a></li><li><a href="#Easycard-Price">EasyCard Pricing &amp; TPASS 1200</a></li><li><a href="#Lucky-Land-Promo">Taiwan Lucky Land NT$5,000 Lottery</a></li><li><a href="#Easycard-Top-Up">How to Top Up</a></li><li><a href="#Easycard-Refund">Refunds &amp; Unused Credit</a></li><li><a href="#Fun-Pass">EasyCard vs TPASS vs Fun Pass</a></li></ul></nav></details>

<div style="height:20px" aria-hidden="true" class="wp-block-spacer"></div>

<h2 id="Easycard-What">What is an EasyCard?</h2>

<figure class="wp-block-image aligncenter"><img src="/media/2019/04/easy-card.jpg" alt="Taiwan EasyCard" class="wp-image-191"/><figcaption>Taiwan EasyCard</figcaption></figure>

<p>An EasyCard is a contactless smartcard that you load with credit. It provides seamless tap-and-go access to Taiwan’s transit network (MRT, buses, trains, YouBike) and can be used to pay for items at convenience stores, supermarkets, taxis, and attractions across the country.</p>

<hr class="wp-block-separator has-css-opacity"/>

<div style="height:36px" aria-hidden="true" class="wp-block-spacer"></div>

<h2 id="Easycard-vs-Supercard">Standard EasyCard vs EasyCard SuperCard</h2>

<p>When purchasing an EasyCard, you may see both the <strong>Standard EasyCard</strong> and the <strong>SuperCard (悠遊超級卡)</strong> on display.</p>

<table class="wp-block-table"><thead><tr><th>Feature</th><th>Standard EasyCard</th><th>EasyCard SuperCard</th></tr></thead><tbody><tr><td><strong>Card Cost</strong></td><td>NT$100 (non-refundable)</td><td>NT$150 (non-refundable)</td></tr><tr><td><strong>App / Registration Needed?</strong></td><td><strong>No App Required</strong> (100% Standalone)</td><td>Requires EasyWallet App (Taiwanese ID/ARC required)</td></tr><tr><td><strong>Top-Up Method</strong></td><td>Cash only (MRT machines &amp; 7-11)</td><td>Mobile NFC via EasyWallet App or Cash</td></tr><tr><td><strong>Checking Balance</strong></td><td>Displayed at MRT gates &amp; 7-11 registers</td><td>App scan or MRT gates &amp; 7-11 registers</td></tr><tr><td><strong>Single Purchase Limit</strong></td><td>NT$1,500</td><td>NT$10,000</td></tr><tr><td><strong>Best For</strong></td><td><strong>All Tourists &amp; Visitors</strong></td><td>Taiwan residents &amp; ARC holders</td></tr></tbody></table>

<blockquote class="wp-block-quote"><p><strong>Tourist Recommendation: Buy the Standard EasyCard (NT$100).</strong> It is 100% standalone and requires zero apps, accounts, or registration. SuperCard features like mobile credit card reloading require registering an EasyWallet account with a Taiwanese ID/ARC, making the Standard EasyCard the hassle-free choice for foreign travelers.</p></blockquote>

<hr class="wp-block-separator has-css-opacity"/>

<div style="height:36px" aria-hidden="true" class="wp-block-spacer"></div>

<h2 id="Easycard-Used">Where Can an EasyCard be Used?</h2>

<h3>Transportation in Taipei &amp; Northern Taiwan</h3>

<table class="wp-block-table"><thead><tr><th>Transport Type</th><th>Notes &amp; Discount Info</th></tr></thead><tbody><tr><td><strong><a href="/mrt">Taipei MRT</a></strong></td><td>Tap at turnstiles. Frequent riders (11+ rides/month) earn 5%–15% monthly cash rebates.</td></tr><tr><td><strong><a href="/taoyuan-airport-mrt">Taoyuan Airport MRT</a></strong></td><td>Accepted for both Express and Commuter trains.</td></tr><tr><td><strong><a href="/taipei-public-transport#Buses">City &amp; Regional Buses</a></strong></td><td>Tap upon boarding and exiting. Interchanging between MRT &amp; bus within 1 hour earns an NT$8 transfer discount.</td></tr><tr><td><strong><a href="/taipei-youbike">YouBike Public Bicycles</a></strong></td><td>Essential for unlocking bikes (requires linking with a valid phone number at kiosk or app).</td></tr><tr><td><strong><a href="/maokong-gondola">Maokong Gondola</a></strong></td><td>Weekday fare discount when tapping with EasyCard.</td></tr></tbody></table>

<h3>Transportation Across Taiwan</h3>

<table class="wp-block-table"><thead><tr><th>Transit / Location</th><th>Notes</th></tr></thead><tbody><tr><td><strong>Taiwan Railways (TRA)</strong></td><td>Accepted on local and fast trains across Taiwan (10% discount for journeys under 70km). Not valid on reserved seats (Taroko/Puyuma/EMU3000).</td></tr><tr><td><strong><a href="/taiwan-high-speed-rail-hsr-discounts-klook">Taiwan High Speed Rail (THSR)</a></strong></td><td>Co-branded bank EasyCards only (non-reserved seats). Standard tourist EasyCards are not accepted on THSR.</td></tr><tr><td><strong>Kaohsiung MRT &amp; Light Rail</strong></td><td>15% discount on Kaohsiung MRT.</td></tr><tr><td><strong>Taichung Metro (Green Line)</strong></td><td>Full tap-and-go access on Taichung MRT gates.</td></tr><tr><td><strong>Convenience Stores &amp; Retail</strong></td><td>7-Eleven, FamilyMart, Hi-Life, OK Mart, Carrefour, PX Mart, Starbucks, and 10,000+ shops.</td></tr><tr><td><strong>Sightseeing &amp; Amenities</strong></td><td>Museums, Taipei Zoo, MRT station lockers, vending machines, and car parks.</td></tr></tbody></table>

<hr class="wp-block-separator has-css-opacity"/>

<h2 id="Apple-Pay-Contactless">Contactless Credit Cards &amp; Mobile Pay at MRT Gates</h2>

<blockquote class="wp-block-quote"><p><strong>New Feature:</strong> Taipei Metro (MRT) gates now support direct contactless payment using <strong>Visa, Mastercard, Apple Pay, Google Pay, and Samsung Pay</strong>.</p></blockquote>

<p>While you can now tap directly into Taipei Metro gates with an Apple Pay device or contactless credit card, <strong>we still strongly recommend getting a physical EasyCard</strong> for your trip. Here is why:</p>

<ul>
  <li><strong>YouBike Rentals:</strong> YouBike 2.0 stations require a physical EasyCard/iPASS linked to your account. Credit cards are not supported at standard YouBike docks.</li>
  <li><strong>Buses &amp; Convenience Stores:</strong> Physical EasyCards work universally on all city buses, intercity coaches, and small shops.</li>
  <li><strong>TPASS Monthly Pass:</strong> If you buy a TPASS commuter pass, it must be loaded onto a physical EasyCard.</li>
</ul>

<hr class="wp-block-separator has-css-opacity"/>

<div style="height:36px" aria-hidden="true" class="wp-block-spacer"></div>

<h2 id="Easycard-Purchased">Where to Buy an EasyCard</h2>

<p>You can purchase an EasyCard at:</p>

<ul>
  <li><strong>Airport MRT Service Desks &amp; Kiosks:</strong> Available immediately upon arrival at Taoyuan Airport (Terminal 1 &amp; Terminal 2) or Songshan Airport.</li>
  <li><strong>MRT Information Counters &amp; Ticket Machines:</strong> Every MRT station in Taipei, Kaohsiung, and Taichung sells cards.</li>
  <li><strong>Convenience Stores:</strong> 7-Eleven, FamilyMart, Hi-Life, and OK Mart keep a variety of fun, character-themed EasyCards near the cash register.</li>
</ul>

<hr class="wp-block-separator has-css-opacity"/>

<div style="height:36px" aria-hidden="true" class="wp-block-spacer"></div>

<h2 id="Easycard-Price">EasyCard Price &amp; TPASS 1200 Pass</h2>

<p>A standard physical EasyCard costs <strong>NT$100</strong> (card purchase fee, non-refundable). You will need to top it up with cash credit before riding.</p>

<blockquote class="wp-block-quote"><p><strong>TPASS 1200 Monthly Pass:</strong> If you are staying in Northern Taiwan for a longer period (or traveling heavily), you can load the <strong>TPASS 1200</strong> onto your EasyCard for <strong>NT$1,200</strong>. This gives you 30 days of unlimited rides on the Taipei MRT, Taoyuan Airport MRT, TRA trains, city buses, and 30 minutes free on YouBikes across Taipei, New Taipei, Keelung, and Taoyuan!</p></blockquote>

<hr class="wp-block-separator has-css-opacity"/>

<h2 id="Lucky-Land-Promo">Taiwan Lucky Land NT$5,000 Tourist Campaign</h2>

<blockquote class="wp-block-quote"><p><strong>Did you know?</strong> Taiwan's Tourism Administration offers a <strong>NT$5,000 Tourist Lottery</strong> for international arrivals. Winners can choose to receive their NT$5,000 prize pre-loaded directly onto an EasyCard!</p><p>👉 <strong><a href="/taiwan-lucky-land">Read our complete guide to Taiwan Lucky Land – How to Register, Win &amp; Claim NT$5,000</a></strong></p></blockquote>

<hr class="wp-block-separator has-css-opacity"/>

<div style="height:36px" aria-hidden="true" class="wp-block-spacer"></div>

<h2 id="Easycard-Top-Up">How to Top Up</h2>

<p>You can top up your EasyCard with cash at:</p>
<ul>
  <li><strong>MRT Top-Up Machines &amp; Information Counters:</strong> Insert notes or coins at any station.</li>
  <li><strong>Convenience Stores:</strong> Hand your card and cash to the cashier at any 7-Eleven, FamilyMart, Hi-Life, or OK Mart.</li>
</ul>

<blockquote class="wp-block-quote"><p><em>Note: EasyCard top-ups must be made with cash (NTD notes/coins). Credit cards are not accepted for reloading standard tourist EasyCard balances.</em></p></blockquote>

<hr class="wp-block-separator has-css-opacity"/>

<div style="height:36px" aria-hidden="true" class="wp-block-spacer"></div>

<h2 id="Easycard-Refund">Refunds &amp; Unused Credit</h2>

<p>Any remaining cash balance on your EasyCard can be refunded at MRT Information Desks (a small NT$20 processing fee applies). However, the initial <strong>NT$100 card purchase fee is non-refundable</strong>.</p>

<p><strong>Pro Tip:</strong> Instead of paying a refund fee, simply spend down any remaining balance at a 7-Eleven or airport shop before flying home!</p>

<hr class="wp-block-separator has-css-opacity"/>

<div style="height:36px" aria-hidden="true" class="wp-block-spacer"></div>

<h2 id="Fun-Pass">EasyCard vs TPASS 1200 vs Taipei Fun Pass</h2>

<table class="wp-block-table"><thead><tr><th>Option</th><th>Cost</th><th>Best For</th><th>Key Benefit</th></tr></thead><tbody><tr><td><strong>Standard EasyCard</strong></td><td>NT$100 + pay-as-you-go</td><td>Most visitors (1–7 days)</td><td>100% Standalone; no apps; spend balance anywhere</td></tr><tr><td><strong>TPASS 1200 Pass</strong></td><td>NT$1,200 / 30 days</td><td>Longer stays (10+ days) / Heavy commuters</td><td>Unlimited MRT, Airport MRT, TRA trains, buses &amp; YouBike</td></tr><tr><td><strong>Taipei Fun Pass</strong></td><td>From NT$1,500+</td><td>Packed sightseeing (1–3 days)</td><td>Includes free entry to Taipei 101, National Palace Museum &amp; transport</td></tr></tbody></table>`;

posts[postIndex].content = updatedContent;
posts[postIndex].modified = "2026-08-04 07:25:00";

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log("Successfully updated taiwan-easycard standalone clarification!");
