// Actions 5 and 6 of data/research/existing-posts-improvement-plan.md.
//
// /ximending/
//   "ximending walking district" earns 1,097 impressions a month at position 9,
//   but the page only ever said "pedestrian". Adds the phrase to the intro, a
//   short orientation section on the walking district and its two useful MRT
//   exits, and swaps one "pedestrian zone" in the FAQ. Adds two Klook links
//   (a Wanhua food tour and a guided Lungshan Temple and Bopiliao tour), both
//   checked live on Klook on 27 Oct 2026. Links /hotels-near-ximending and
//   /wanhua-heritage-walk from the FAQ answers they belong to. Title, excerpt
//   and Perfect For are untouched.
//
// /taiwan-tourist-tax-refund/
//   The queries ask "how much", and the page contradicted itself: "full 5%"
//   in the intro, "about 4%" in the notes, with a worked example that took 5%
//   of the receipt total. The official formula (Ministry of Finance e-VAT
//   refund service, taxrefund.net.tw) is receipt / 1.05 x 0.05, rounded, less
//   a 20% administration charge, rounded down - so about 3.8% of the receipt.
//   Adds a "How Much Will You Get Back?" section with worked examples, fixes
//   the intro, Quick Verdict and Useful Information, corrects the on-site and
//   in-town limits (Taxation Administration press release and taxrefund.net.tw),
//   and adds a FAQ. The page had none. Title and excerpt are untouched.
//
// Every find must match exactly once, or nothing is written.
// Usage: node scripts/update-ximending-and-tax-refund.mjs
//        POSTS_PATH=/path/to/copy.json node scripts/update-ximending-and-tax-refund.mjs

import fs from "fs";
import path from "path";

const filePath = path.resolve(process.env.POSTS_PATH || "content/posts.json");
const MODIFIED = "2026-10-28 12:00:00";
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));

const klook = (slug) => `https://www.klook.com/en-GB/activity/${slug}/?aid=8733`;
const ext = 'target="_blank" rel="noopener noreferrer sponsored"';
const officialFormula =
  "https://www.taxrefund.net.tw/ttr/info/8a8c512c53c2138e0153c216df0f000a?lang=en_US";

const edits = {
  ximending: [
    // 1. The phrase in the intro
    {
      find: "more bubble tea shops per square metre than anywhere else in Taiwan. It's also one of",
      replace:
        "more bubble tea shops per square metre than anywhere else in Taiwan. Most of that is packed into the Ximending walking district, a grid of car-free streets you step straight into from Ximen MRT. It's also one of",
    },
    // 2. Short orientation section, before "When to Go"
    {
      find: '<h3 id="Before-You-Go">When to Go and How Long to Spend</h3>',
      replace: `<h3 id="Walking-District">Finding Your Way Round the Ximending Walking District</h3>

<p>Ximending, usually shortened to Ximen, has a car-free core of pedestrianised streets, and that core is what people mean by the walking district.</p>

<p>Ximen MRT has six exits, but two do nearly all the work. Both come up on Hanzhong Street where it meets Chengdu Road, on the west side of Zhonghua Road, only about 50 metres apart. <strong>Exit 6</strong> is the one signed for the Ximen Pedestrian Area, so use it for the food, shops and street art. <strong>Exit 1</strong> is the Red House exit, the quicker one for the Red House and the open-air bars behind it. Exits 2 to 5 are across Zhonghua Road on the east side.</p>

<div style="height:36px" aria-hidden="true" class="wp-block-spacer"></div>

<h3 id="Before-You-Go">When to Go and How Long to Spend</h3>`,
    },
    // 3. Klook food tour, under the street food intro
    {
      find: "almost all of it is within a few minutes of exit 6. These are the ones worth queuing for.</p>",
      replace: `almost all of it is within a few minutes of exit 6. These are the ones worth queuing for.</p>

<p>If you would rather eat with a guide, this <a href="${klook("6362-night-market-tour-taipei")}" ${ext}>two-hour Taipei food tour on Klook</a> meets at Longshan Temple, one MRT stop south, and works through eight Taiwanese dishes in Wanhua, Michelin-listed street food among them.</p>`,
    },
    // 4. Klook guided tour, beside the Wanhua heritage walk link
    {
      find: 'see our <a href="/wanhua-heritage-walk">Wanhua heritage walk</a>.</p>',
      replace: `see our <a href="/wanhua-heritage-walk">Wanhua heritage walk</a>.</p>

<p>Prefer someone to explain it as you go? The <a href="${klook("83882-longshan-temple-walking-tour")}" ${ext}>Lungshan Temple half-day guided tour</a> on Klook takes two hours, takes in Bopiliao as well, and has English-speaking morning and evening departures.</p>`,
    },
    // 5. FAQ wording
    {
      find: "exit 6 puts you in the middle of the pedestrian zone.",
      replace: "exit 6 puts you at the edge of the walking district.",
    },
    // 6. Hotels link in the staying answer
    {
      find: "it stays lively late, so ask for a room away from the street.</p>",
      replace:
        'it stays lively late, so ask for a room away from the street. Our shortlist is in <a href="/hotels-near-ximending">hotels near Ximending</a>.</p>',
    },
    // 7. Wanhua walk link in the nearby answer
    {
      find: "is close by &ndash; enough for a full day in Wanhua.</p>",
      replace:
        'is close by &ndash; enough for a full day in Wanhua. The <a href="/wanhua-heritage-walk">Wanhua heritage walk</a> strings them together on foot.</p>',
    },
  ],

  "taiwan-tourist-tax-refund": [
    // 1. Intro: the "full 5%" claim
    {
      find: "<p>Tourists spending over <strong>NT$2,000</strong> at designated stores are entitled to a full <strong>VAT rebate of 5%</strong>.</p>",
      replace:
        '<p>Once your receipts from a single tax-free shop reach <strong>NT$2,000</strong> in a day, you can claim back the <strong>5% VAT</strong> built into the price. After the 20% handling fee, what you actually receive is <strong>about 3.8%</strong> of what you paid &ndash; the <a href="#How-Much">worked examples</a> below show the sums.</p>',
    },
    // 2. Quick Verdict
    {
      find: "You can often claim your 5% back immediately, no need to wait for the airport.",
      replace: "You can often get the refund there and then, with no need to wait for the airport.",
    },
    // 3. New "How much" section, near the top
    {
      find: '<h2 id="Requirements">Tax Refund Requirements</h2>',
      replace: `<h2 id="How-Much">How Much Will You Get Back?</h2>

<p>Less than the headline 5%. Taiwan's VAT rate is 5%, but it is already included in the price on your receipt, so the tax inside a purchase is the total divided by 1.05, times 0.05 &ndash; about 4.76% of what you spent. The refund operator then keeps a <strong>20% handling fee</strong> out of that tax, which leaves roughly <strong>3.8% of the receipt total</strong> for you.</p>

<p>This is the formula published by the <a href="${officialFormula}" target="_blank" rel="noopener noreferrer">Ministry of Finance's e-VAT refund service</a>:</p>

<ul>
 <li><strong>VAT refund</strong> = receipt total &divide; 1.05 &times; 0.05, rounded to the nearest dollar</li>
 <li><strong>Net refund</strong> = VAT refund minus 20%, rounded down</li>
</ul>

<figure class="wp-block-table"><table><tbody><tr><td><strong>Spent in one store, same day</strong></td><td><strong>VAT in the price</strong></td><td><strong>Handling fee</strong></td><td><strong>You get back</strong></td></tr><tr><td>NT$1,999</td><td>-</td><td>-</td><td>Nothing (below the minimum)</td></tr><tr><td>NT$2,000</td><td>NT$95</td><td>NT$19</td><td><strong>NT$76</strong></td></tr><tr><td>NT$5,000</td><td>NT$238</td><td>NT$48</td><td><strong>NT$190</strong></td></tr><tr><td>NT$10,000</td><td>NT$476</td><td>NT$96</td><td><strong>NT$380</strong></td></tr><tr><td>NT$48,000</td><td>NT$2,286</td><td>NT$458</td><td><strong>NT$1,828</strong></td></tr></tbody></table></figure>

<p>The <strong>NT$2,000 minimum</strong> counts per store and per day. Two receipts from the same shop on the same day can be added together, but NT$1,500 in one shop and NT$1,500 in the shop next door can't. Hotel bills, restaurant meals and duty-free goods don't qualify at all.</p>

<h2 id="Requirements">Tax Refund Requirements</h2>`,
    },
    // 4. 183-day wording, to match the official rule
    {
      find: "You must stay in Taiwan for <strong>less than 183 days</strong> from your arrival date",
      replace: "You must stay in Taiwan for <strong>no more than 183 days</strong> from your arrival date",
    },
    // 5. On-site limit: add the trip and annual caps
    {
      find: "You can claim an immediate cash refund in the store for purchases <strong>under NT$48,000</strong> (tax-inclusive) on the same day.</li>",
      replace:
        "You can claim an immediate cash refund in the store for purchases <strong>under NT$48,000</strong> (tax-inclusive) at that store on the same day. This option closes once your on-site claims pass <strong>NT$120,000 in one trip</strong> or <strong>NT$240,000 in a year</strong>; after that, claim at the airport.</li>",
    },
    // 6. In-town counters: the old text had the NT$48,000 rule backwards
    {
      find: "<li><strong>In-Town Refund Counters (Malls & Taipei Main Station):</strong> For purchases <strong>over NT$48,000</strong>, you can claim your refund at designated mall service counters or Taipei Main Station. You must provide a <strong>credit card pre-authorization guarantee</strong> (deposit) which is automatically released once customs verifies your export of the goods at airport customs.</li>",
      replace: `<li><strong>Designated In-Town Counters:</strong> No upper limit, but you can only claim within <strong>20 days of departure</strong>, and you must leave a <strong>credit card deposit of 7%</strong> of the purchase total. Before you fly, check in at the airport refund counter or an E-VAT kiosk so the deposit is cancelled; skip that step and the deposit is kept.</li>
 <li><strong>Taipei Main Station (Airport MRT A1):</strong> If you are flying from Taoyuan that day and your purchases for the trip total <strong>under NT$48,000</strong>, you can claim here rather than at the airport.</li>`,
    },
    // 7. Useful Information: the wrong worked example
    {
      find: "<li>A <strong>handling fee of 20%</strong> is deducted from your calculated VAT rebate, making the net return approximately <strong>4%</strong> of the total purchase price. For example, a purchase of NT$10,000 earns a 5% VAT (NT$500) minus the 20% fee (NT$100), giving you a net refund of <strong>NT$400</strong>.</li>",
      replace:
        '<li>The <strong>20% handling fee</strong> comes off the VAT, not off the purchase price, which is why a refund lands at roughly 3.8% of the receipt rather than 5% (see <a href="#How-Much">How Much Will You Get Back?</a>).</li>',
    },
    // 8. FAQ (the page had none)
    {
      find: "allowfullscreen></iframe></div></figure>",
      replace: `allowfullscreen></iframe></div></figure>

<div style="height:40px" aria-hidden="true" class="wp-block-spacer"></div>

<h2 id="FAQ">Common Questions</h2>

<h3>What is the tax refund rate in Taiwan?</h3>

<p>The scheme refunds Taiwan's 5% VAT. Because that tax is already inside the shelf price, and a 20% handling fee is taken from it, the cash you receive comes to about 3.8% of what you spent.</p>

<h3>How much is the tax refund in Taiwan on NT$10,000?</h3>

<p>NT$380. A NT$10,000 receipt contains NT$476 of VAT, and the handling fee takes NT$96 of it. At the NT$2,000 minimum, the refund is NT$76.</p>

<h3>Is there a handling fee?</h3>

<p>Yes. The official charge is 20% of the VAT being refunded, deducted by the private refund operator before you are paid. It is not refunded if you later return the goods.</p>

<h3>What is the minimum spend?</h3>

<p>NT$2,000, VAT included, in a single participating store on one day. Several receipts from that store on that day can be combined; purchases from different stores can't.</p>

<h3>Is there a maximum I can claim?</h3>

<p>Not overall. Instant refunds in the shop are limited to purchases under NT$48,000 per store per day, and stop once you have claimed on NT$120,000 in one trip or NT$240,000 in a year. Above those amounts, use a designated in-town counter or the airport, where there is no cap.</p>

<h3>How long do I have to take the goods out of Taiwan?</h3>

<p>90 days from the purchase date. Your stay must also be no longer than 183 days from arrival, and the goods need to leave with you rather than being shipped separately.</p>`,
    },
  ],
};

// --- Guard: every find must match exactly once in its post ---------------
const errors = [];
const updated = {};
for (const [slug, list] of Object.entries(edits)) {
  const post = posts.find((p) => p.slug === slug);
  if (!post) {
    errors.push(`${slug}: post not found`);
    continue;
  }
  let content = post.content;
  for (const [i, { find, replace }] of list.entries()) {
    const count = content.split(find).length - 1;
    if (count !== 1) {
      errors.push(`${slug} edit ${i + 1}: expected 1 match, found ${count} -> ${find.slice(0, 70)}`);
      continue;
    }
    content = content.replace(find, () => replace);
  }
  updated[slug] = content;
}

if (errors.length) {
  console.error("Nothing written.\n" + errors.join("\n"));
  process.exit(1);
}

for (const [slug, content] of Object.entries(updated)) {
  const post = posts.find((p) => p.slug === slug);
  post.content = content;
  post.modified = MODIFIED;
  console.log(`${slug}: ${edits[slug].length} edits applied`);
}

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2) + "\n");
console.log(`Wrote ${filePath}`);
