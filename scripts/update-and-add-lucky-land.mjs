import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));

// 1. Update taiwan-easycard post
const easycardIndex = posts.findIndex((p) => p.slug === "taiwan-easycard");

if (easycardIndex === -1) {
  console.error("Post taiwan-easycard not found!");
  process.exit(1);
}

const updatedEasyCardContent = `<p>Whether you're visiting Taiwan for a short trip or choosing to move here, the versatile <strong>EasyCard</strong> (commonly referred to by locals as the <em>yoyo ka</em> 悠遊卡) is your single most important travel purchase.</p>

<details class="article-toc-block"><summary>On this page</summary><nav aria-label="On this page"><ul><li><a href="#Easycard-What">What is an EasyCard?</a></li><li><a href="#Easycard-vs-Supercard">Standard EasyCard vs SuperCard</a></li><li><a href="#Easycard-Used">Where Can an EasyCard be Used?</a></li><li><a href="#Apple-Pay-Contactless">Contactless Credit Cards &amp; Mobile Pay</a></li><li><a href="#Easycard-Purchased">Where to Buy an EasyCard</a></li><li><a href="#Easycard-Price">EasyCard Pricing &amp; TPASS 1200</a></li><li><a href="#Lucky-Land-Promo">Taiwan Lucky Land NT$5,000 Lottery</a></li><li><a href="#Easycard-Top-Up">How to Top Up</a></li><li><a href="#Easycard-Refund">Refunds &amp; Unused Credit</a></li><li><a href="#Fun-Pass">EasyCard vs TPASS vs Fun Pass</a></li></ul></nav></details>

<div style="height:20px" aria-hidden="true" class="wp-block-spacer"></div>

<h2 id="Easycard-What">What is an EasyCard?</h2>

<figure class="wp-block-image aligncenter"><img src="/media/2019/04/easy-card.jpg" alt="Taiwan EasyCard" class="wp-image-191"/><figcaption>Taiwan EasyCard</figcaption></figure>

<p>An EasyCard is a contactless smartcard that you load with credit. It provides seamless tap-and-go access to Taiwan’s transit network (MRT, buses, trains, YouBike) and can be used to pay for items at convenience stores, supermarkets, taxis, and attractions across the country.</p>

<hr class="wp-block-separator has-css-opacity"/>

<div style="height:36px" aria-hidden="true" class="wp-block-spacer"></div>

<h2 id="Easycard-vs-Supercard">Standard EasyCard vs EasyCard SuperCard</h2>

<p>When purchasing an EasyCard, you have two physical card options: the <strong>Standard EasyCard</strong> or the upgraded <strong>SuperCard (悠遊超級卡)</strong>.</p>

<table class="wp-block-table"><thead><tr><th>Feature</th><th>Standard EasyCard</th><th>EasyCard SuperCard</th></tr></thead><tbody><tr><td><strong>Card Cost</strong></td><td>NT$100 (non-refundable)</td><td>NT$150 (non-refundable)</td></tr><tr><td><strong>Top-Up Method</strong></td><td>Cash only (MRT machines &amp; 7-11)</td><td>Smartphone NFC via EasyWallet App (Credit Card) or Cash</td></tr><tr><td><strong>Single Purchase Limit</strong></td><td>NT$1,500</td><td>NT$10,000</td></tr><tr><td><strong>Daily Purchase Limit</strong></td><td>NT$3,000</td><td>NT$10,000</td></tr><tr><td><strong>Check Balance on Mobile</strong></td><td>Requires app scan</td><td>Instant NFC tap on back of phone</td></tr><tr><td><strong>Best For</strong></td><td>Casual tourists (1–7 days) paying cash</td><td>Credit card users, tech-savvy travelers &amp; long stays</td></tr></tbody></table>

<blockquote class="wp-block-quote"><p><strong>Our Recommendation:</strong> If you prefer paying with credit cards and don't want to carry cash or hunt for top-up machines, <strong>buy a SuperCard (NT$150)</strong>. The ability to reload your card directly from your iPhone or Android via the EasyWallet app is well worth the extra NT$50!</p></blockquote>

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

<p>While you can now tap directly into Taipei Metro gates with an Apple Pay device or contactless credit card, <strong>we still strongly recommend getting a physical EasyCard or SuperCard</strong> for your trip. Here is why:</p>

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
  <li><strong>Convenience Stores:</strong> 7-Eleven, FamilyMart, Hi-Life, and OK Mart keep a variety of fun, character-themed EasyCards and SuperCards near the cash register.</li>
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
  <li><strong>SuperCard Mobile Top-Up:</strong> If you have a SuperCard, tap it against your phone in the EasyWallet app to top up instantly with a credit card.</li>
</ul>

<blockquote class="wp-block-quote"><p><em>Note: Standard EasyCard cash top-ups cannot be done with credit cards at MRT machines. Use a SuperCard if you require credit card reloads.</em></p></blockquote>

<hr class="wp-block-separator has-css-opacity"/>

<div style="height:36px" aria-hidden="true" class="wp-block-spacer"></div>

<h2 id="Easycard-Refund">Refunds &amp; Unused Credit</h2>

<p>Any remaining cash balance on your EasyCard can be refunded at MRT Information Desks (a small NT$20 processing fee applies). However, the initial <strong>NT$100 card purchase fee is non-refundable</strong>.</p>

<p><strong>Pro Tip:</strong> Instead of paying a refund fee, simply spend down any remaining balance at a 7-Eleven or airport shop before flying home!</p>

<hr class="wp-block-separator has-css-opacity"/>

<div style="height:36px" aria-hidden="true" class="wp-block-spacer"></div>

<h2 id="Fun-Pass">EasyCard vs TPASS 1200 vs Taipei Fun Pass</h2>

<table class="wp-block-table"><thead><tr><th>Option</th><th>Cost</th><th>Best For</th><th>Key Benefit</th></tr></thead><tbody><tr><td><strong>Standard EasyCard</strong></td><td>NT$100 + pay-as-you-go</td><td>Most visitors (1–7 days)</td><td>Maximum flexibility; spend balance anywhere</td></tr><tr><td><strong>SuperCard EasyCard</strong></td><td>NT$150 + credit card top-up</td><td>Credit card lovers &amp; tech users</td><td>Reload on phone via EasyWallet app anytime</td></tr><tr><td><strong>TPASS 1200 Pass</strong></td><td>NT$1,200 / 30 days</td><td>Longer stays (10+ days) / Heavy commuters</td><td>Unlimited MRT, Airport MRT, TRA trains, buses &amp; YouBike</td></tr><tr><td><strong>Taipei Fun Pass</strong></td><td>From NT$1,500+</td><td>Packed sightseeing (1–3 days)</td><td>Includes free entry to Taipei 101, National Palace Museum &amp; transport</td></tr></tbody></table>`;

posts[easycardIndex].content = updatedEasyCardContent;
posts[easycardIndex].modified = "2026-08-04 07:15:00";

// 2. Add new dedicated post: taiwan-lucky-land
const luckyLandSlug = "taiwan-lucky-land";
let luckyLandPost = posts.find((p) => p.slug === luckyLandSlug);

const luckyLandContent = `<p>Visiting Taiwan soon? The Taiwan Tourism Administration offers an exciting official tourist incentive scheme called <strong>"Taiwan the Lucky Land" (遊台灣金福氣)</strong>, giving international travelers a chance to win <strong>NT$5,000</strong> (approx. USD $160 / GBP £125) upon arrival!</p>

<details class="article-toc-block"><summary>On this page</summary><nav aria-label="On this page"><ul><li><a href="#What-Is-Lucky-Land">What is Taiwan Lucky Land?</a></li><li><a href="#Eligibility">Who is Eligible?</a></li><li><a href="#How-To-Register">Step 1: How to Pre-Register</a></li><li><a href="#Airport-Lottery">Step 2: How to Play at the Airport</a></li><li><a href="#Prize-Options">Step 3: Choosing Your Prize</a></li><li><a href="#Easycard-Prize-Rules">EasyCard Prize Rules &amp; Limits</a></li><li><a href="#Pro-Tips">Pro Tips for Winning &amp; Claiming</a></li></ul></nav></details>

<div style="height:20px" aria-hidden="true" class="wp-block-spacer"></div>

<h2 id="What-Is-Lucky-Land">What is Taiwan Lucky Land?</h2>

<p>Taiwan Lucky Land is an official tourist campaign created by Taiwan’s Ministry of Transportation and Communications. To encourage international visitors to explore Taiwan, the government created a digital lucky draw campaign offering 500,000 prizes worth NT$5,000 each.</p>

<figure class="wp-block-image aligncenter"><img src="/media/2019/04/easy-card.jpg" alt="Taiwan Lucky Land EasyCard Prize" class="wp-image-191"/><figcaption>Winners can choose an NT$5,000 EasyCard pre-loaded with credit</figcaption></figure>

<hr class="wp-block-separator has-css-opacity"/>

<div style="height:36px" aria-hidden="true" class="wp-block-spacer"></div>

<h2 id="Eligibility">Who is Eligible to Enter?</h2>

<p>You are eligible to participate in the Taiwan Lucky Land lottery if you meet all 4 of the following criteria:</p>

<ul>
  <li><strong>Foreign Passport Holder:</strong> You hold a non-Taiwanese (R.O.C.) passport.</li>
  <li><strong>Independent Traveler:</strong> You are traveling independently (FIT - Foreign Independent Traveler) and are not part of a tour group or subsidized travel group.</li>
  <li><strong>Length of Stay:</strong> Your trip to Taiwan is between <strong>3 days and 90 days</strong>.</li>
  <li><strong>Entry Purpose:</strong> Sightseeing, holiday, or general tourism.</li>
</ul>

<hr class="wp-block-separator has-css-opacity"/>

<div style="height:36px" aria-hidden="true" class="wp-block-spacer"></div>

<h2 id="How-To-Register">Step 1: How to Pre-Register Online</h2>

<blockquote class="wp-block-quote"><p><strong>Crucial Rule:</strong> You MUST register online <strong>between 1 and 7 days before your scheduled flight arrival time</strong> in Taiwan. You cannot register after landing!</p></blockquote>

<ol>
  <li>Go to the official campaign portal: <strong><a href="https://5000.taiwan.net.tw/" target="_blank" rel="noreferrer noopener">5000.taiwan.net.tw</a></strong></li>
  <li>Fill in your flight details: Full name, passport number, nationality, arrival airport, arrival date/time, departure flight details, and email address.</li>
  <li>Choose your preferred prize option: Select either <strong>E-ticket (EasyCard / iPASS)</strong> or <strong>Accommodation Vouchers</strong>.</li>
  <li>Check your email: Upon submitting the form, you will receive an official confirmation email containing your personal <strong>QR Code</strong>. Save a screenshot of this QR code to your phone!</li>
</ol>

<hr class="wp-block-separator has-css-opacity"/>

<div style="height:36px" aria-hidden="true" class="wp-block-spacer"></div>

<h2 id="Airport-Lottery">Step 2: How to Claim &amp; Play at the Airport</h2>

<p>When you land in Taiwan and clear immigration and customs, proceed immediately to the designated <strong>Taiwan Lucky Land Event Area</strong> in the airport arrival hall.</p>

<h3>Participating Airport Counters</h3>
<table class="wp-block-table"><thead><tr><th>Airport &amp; Terminal</th><th>Location</th></tr></thead><tbody><tr><td><strong>Taoyuan Airport Terminal 1</strong></td><td>Arrivals Hall (after exiting customs)</td></tr><tr><td><strong>Taoyuan Airport Terminal 2</strong></td><td>Arrivals Hall (after exiting customs)</td></tr><tr><td><strong>Taipei Songshan Airport</strong></td><td>Arrivals Hall</td></tr><tr><td><strong>Taichung Airport</strong></td><td>Arrivals Hall</td></tr><tr><td><strong>Kaohsiung International Airport</strong></td><td>Arrivals Hall</td></tr></tbody></table>

<p>Simply approach one of the tablet kiosks, scan your email <strong>QR Code</strong>, and play the quick touchscreen game (coins falling from the sky). The screen will instantly display whether you have won!</p>

<hr class="wp-block-separator has-css-opacity"/>

<div style="height:36px" aria-hidden="true" class="wp-block-spacer"></div>

<h2 id="Prize-Options">Step 3: Choosing Your NT$5,000 Prize</h2>

<p>If you win, head directly to the prize collection counter adjacent to the kiosks and present your <strong>Passport</strong>, <strong>Boarding Pass</strong>, and <strong>Winning QR Code</strong>. You can choose between two main prize options:</p>

<h3>Option A: NT$5,000 E-Ticket Card (EasyCard or iPASS) — Highly Recommended!</h3>
<p>You will be handed a physical EasyCard (or iPASS) pre-loaded with NT$5,000. This is the most popular choice because you can spend it on transit, convenience stores, and daily meals!</p>

<h3>Option B: NT$5,000 Accommodation Vouchers</h3>
<p>You receive five NT$1,000 vouchers valid for paying for hotel rooms at participating partner hotels across Taiwan.</p>

<hr class="wp-block-separator has-css-opacity"/>

<div style="height:36px" aria-hidden="true" class="wp-block-spacer"></div>

<h2 id="Easycard-Prize-Rules">EasyCard Prize Spending Rules &amp; Limits</h2>

<p>If you choose the NT$5,000 EasyCard prize, the following official spending rules apply:</p>

<table class="wp-block-table"><thead><tr><th>Rule</th><th>Limit / Detail</th></tr></thead><tbody><tr><td><strong>Single Purchase Limit</strong></td><td>Maximum <strong>NT$1,500</strong> per single transaction</td></tr><tr><td><strong>Daily Spending Limit</strong></td><td>Maximum <strong>NT$3,000</strong> per 24-hour day</td></tr><tr><td><strong>Prize Validity Period</strong></td><td>Valid for <strong>90 days</strong> from the date of collection</td></tr><tr><td><strong>Refundability</strong></td><td>Non-refundable and cannot be exchanged for cash</td></tr></tbody></table>

<blockquote class="wp-block-quote"><p><strong>Where to Spend Your NT$5,000 EasyCard Prize:</strong><br/>• <strong>Transportation:</strong> Taipei Metro (MRT), Taoyuan Airport MRT, Kaohsiung MRT, TRA trains, city buses &amp; YouBike.<br/>• <strong>Convenience Stores:</strong> 7-Eleven, FamilyMart, Hi-Life, OK Mart.<br/>• <strong>Retail &amp; Supermarkets:</strong> Carrefour, PX Mart, Watsons, Cosmed, Starbucks, department store food courts &amp; bakeries.</p></blockquote>

<hr class="wp-block-separator has-css-opacity"/>

<div style="height:36px" aria-hidden="true" class="wp-block-spacer"></div>

<h2 id="Pro-Tips">Pro Tips for Winning &amp; Claiming</h2>

<ul>
  <li><strong>Set a Reminder:</strong> Mark your calendar to register 3–5 days before your flight so you don't forget the 1–7 day window!</li>
  <li><strong>Keep Boarding Passes:</strong> The prize desk agent MUST inspect your physical plane boarding pass and passport before handing over the EasyCard. Do not throw your boarding pass away!</li>
  <li><strong>Check Airport Counter Hours:</strong> Lucky Land counters at Taoyuan T1/T2 are open for all scheduled flight arrivals. If your flight is delayed, the staff will remain on duty to service arriving passengers.</li>
  <li><strong>Combine with <a href="/taiwan-easycard">Standard EasyCard</a> Info:</strong> If you don't win, don't worry—you can purchase a standard EasyCard for NT$100 or a SuperCard for NT$150 at the airport MRT station!</li>
</ul>`;

if (luckyLandPost) {
  luckyLandPost.content = luckyLandContent;
  luckyLandPost.modified = "2026-08-04 07:15:00";
} else {
  const maxId = Math.max(...posts.map((p) => p.id || 0));
  posts.push({
    id: maxId + 1,
    authorId: 2,
    date: "2026-08-04 07:15:00",
    modified: "2026-08-04 07:15:00",
    slug: luckyLandSlug,
    title: "Taiwan Lucky Land – How to Win & Claim the NT$5,000 Tourist Prize",
    excerpt: "Complete guide to Taiwan’s NT$5,000 tourist lottery: eligibility, registration steps, airport lucky draw counters, and EasyCard prize rules.",
    type: "post",
    parentId: 0,
    categories: [{ name: "Visit", slug: "visit" }],
    tags: [{ name: "Travel Tips", slug: "travel-tips" }],
    featuredImage: "/media/2019/04/easy-card.jpg",
    content: luckyLandContent,
  });
}

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log("Successfully updated taiwan-easycard and added taiwan-lucky-land post!");
