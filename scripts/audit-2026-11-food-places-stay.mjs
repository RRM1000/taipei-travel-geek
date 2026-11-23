// Food, places and stay audit, checked on 23 November 2026.
//
// Michelin 2026 (Bib Gourmand list published 14 July 2026, 37 Taipei names):
//   https://www.businessweekly.com.tw/style/blog/3021953 (full Taipei list)
//   https://guide.michelin.com/tw/en/taipei-region/taipei/restaurants/bib-gourmand (55 incl. surroundings)
//   https://guide.michelin.com/tw/en/taipei-region/taipei/restaurants/3-stars-michelin (Le Palais, Taïrroir)
// - michelin-food-stands-at-night-markets: only Unnamed Clay Oven Roll, Chung Chia
//   Sheng Jian Bao, Da-Qiao-Tou Tube Rice Pudding, Hsiung Chi Scallion Pancake and
//   Hsiao Wang (now "Wang's Broth") are on the 2026 list; the other night market
//   stalls are relabelled "Former Bib Gourmand". Yuan Fang Guabao (17-2 Huaxi St)
//   added as a 2026 Bib in Huaxi
//   (https://guide.michelin.com/tw/zh_TW/taipei-region/taipei/restaurant/yuan-fang-guabao).
// - raohe-night-market-foody-heaven, shilin-night-market, taipei-food-guide: same list
//   (Fuzhou pepper bun, Chen Tung, Yu Pin Yuan, A-Cheng Goose not on 2026 list).
// - yongkang-street: Hao Kung Tao is not on the 2026 list.
// - fuhang-soy-milk: Fuhang is not on the 2026 list and its Michelin page
//   (guide.michelin.com/.../fu-hang-soy-milk) now returns 404, so link removed.
// - michelin-bib-gourmand-taiwanese-small-eats-taipei: 15 entries, not 16; Chinese
//   names corrected from Michelin pages: Ching Jiao 青嬌 (Jiangzhe-style, golden
//   chicken soup, Shanghai cabbage rice) .../restaurant/ching-jiao; Su Lai Chuan
//   蘇來傳 .../su-lai-chuan; Hsiao Cho Chih Chia 小酌之家 (founded 1995, abalone and
//   black-bone chicken soup, roast pork trotters) .../hsiao-cho-chih-chia; Inn's+
//   隱食家 .../inn-s; Wang's Broth is a Bib Gourmand, not Michelin-starred.
//
// Xinyi:
// - NEO19 closed as a mall on 1 January 2023 (https://www.nownews.com/news/6017068);
//   Uni-Ustyle Taipei, above City Hall Bus Station, still trading
//   (https://zh.wikipedia.org/wiki/統一時代百貨), so it takes NEO19's row.
// - A13 is Far Eastern Department Store Xinyi A13, 58 Songren Rd, open January 2020
//   after a 25 December 2019 trial (https://zh.wikipedia.org/wiki/遠東百貨), not Shin Kong.
// - Jamie's Italian Taipei closed in February 2020 (SCMP,
//   https://www.scmp.com/business/companies/article/3052464/jamies-italian-shut-restaurants-hong-kong-taipei-week).
//
// christmas-dinners: content dates from 2020-22 (pandemic wording, old prices) but
// claimed On Tap had "just released" a 2026 menu. No 2026 menus found online for
// On Tap, Brass Monkey, IKEA or amba Songshan on 23 Nov 2026 (web searches), so the
// page now says the details are from an earlier year.

import fs from "fs";
import path from "path";

const MODIFIED = "2026-11-23 12:00:00";
const badge = (name, label = "Bib Gourmand") =>
  [`<span class="bib-badge">${label}</span>${name}</p>`, `<span class="bib-badge">Former Bib Gourmand</span>${name}</p>`];

// [from, to, field] - field defaults to "content".
const EDITS = {
  "michelin-food-stands-at-night-markets": [
    ["Locations of every Michelin Guide Bib Gourmand awarded food stand at every night market in Taipei",
     "Where to find the night market food stands on the 2026 Michelin Bib Gourmand list in Taipei, plus the former Bib Gourmand stalls you'll still see recommended online",
     "excerpt"],
    ["<p>Each year, a handful of Taipei's night market food stands earn a Bib Gourmand for serving up serious flavour at street-food prices.</p>",
     "<p>Each year, a handful of Taipei's night market food stands earn a Bib Gourmand for serving up serious flavour at street-food prices. The list is reissued every summer, and the 2026 edition is far shorter on night market stalls than the early ones: only five of the stands below are on it, plus a gua bao stall in Huaxi. I've kept the others, labelled as former Bib Gourmands, so you can tell which ones the current guide still backs.</p>"],
    badge("A Kuo Lu Wei"),
    badge("Beef Noodles and Beef Entrails Soup"),
    badge("Chen Tung Pork Ribs Medicinal Herbs Soup"),
    badge("Fuzhou Black Pepper Bun"),
    badge("Liang Chi Lu Wei"),
    badge("Lo Chi Hsiao Chao"),
    badge("Tien Hsiang Stinky Tofu"),
    badge("Yu Pin Yuan Iced and Hot Tangyuan"),
    badge("A Nan Sesame Oil Chicken"),
    badge("Stinky Tofu Boss"),
    badge("Sung Ching Taiwanese Burrito"),
    badge("Good Friend Cold Noodles"),
    badge("Hai Yu Pork Ribs"),
    badge("Fang Chia Shredded Chicken on the Rice"),
    badge("Liu Yu Zi"),
    badge("Rong's Pork Liver"),
    badge("Cabbage Rice and Pork Rib Soup"),
    badge("Shih Chia Big Rice Ball"),
    badge("Lan Chia Guabao", "Bib Gourmand 2019"),
    ["<p class=\"stand-desc\">Minced pork and preserved pickles served in a clear broth served with meatballs</p>",
     "<p class=\"stand-desc\">Minced pork and preserved pickles served in a clear broth served with meatballs. Michelin now lists it as Wang's Broth. A few stalls along at No. 17-2, Yuan Fang Guabao (源芳刈包) also made the 2026 list with its gua bao and four-herb soup</p>"],
  ],
  "raohe-night-market-foody-heaven": [
    ["What follows is where each of these stood in recent editions.</p>",
     "What follows is where each of these stood in recent editions. None of them made the 2026 Bib Gourmand list, which has no Raohe stalls at all.</p>"],
    ["<span class=\"bib-badge\">Bib Gourmand</span>Fuzhou Shizu Black Pepper Bun",
     "<span class=\"bib-badge\">Former Bib Gourmand</span>Fuzhou Shizu Black Pepper Bun"],
    ["<span class=\"bib-badge\">Bib Gourmand</span>Chen Tung Pork Ribs in Medicinal Herbs",
     "<span class=\"bib-badge\">Former Bib Gourmand</span>Chen Tung Pork Ribs in Medicinal Herbs"],
  ],
  "shilin-night-market": [
    ["<p>Five stalls here are listed in the Michelin Guide, which is the shortcut past forty near-identical shopfronts.",
     "<p>Five stalls here have been listed in the Michelin Guide, which is the shortcut past forty near-identical shopfronts, though Chung Chia is the only one still holding a Bib Gourmand in the 2026 edition."],
  ],
  "taipei-food-guide": [
    ["in Zhongshan, another Michelin Bib Gourmand, serves it poached or smoked over rice.",
     "in Zhongshan, a long-time Bib Gourmand that is missing from the 2026 list, serves it poached or smoked over rice."],
    ["</strong>, the Bib Gourmand stall serving hot sesame tangyuan over shaved ice.",
     "</strong>, the former Bib Gourmand stall serving hot sesame tangyuan over shaved ice."],
    ["maps every Bib Gourmand stall by market so you can queue with intent.",
     "maps the current and former Bib Gourmand stalls by market so you can queue with intent."],
  ],
  "yongkang-street": [
    ["<p>A <strong>Michelin Bib Gourmand</strong> dumpling house on the street itself, which is remarkable for somewhere this unassuming.",
     "<p>A dumpling house on the street itself that earned a <strong>Michelin Bib Gourmand</strong>, which is remarkable for somewhere this unassuming, although it isn't on the 2026 list."],
    ["Xiaolongbao at Hao Kung Tao &ndash; a Bib Gourmand a few doors from Din Tai Fung",
     "Xiaolongbao at Hao Kung Tao &ndash; a former Bib Gourmand a few doors from Din Tai Fung"],
  ],
  "fuhang-soy-milk": [
    ["They have also been <a rel=\"noreferrer noopener\" aria-label=\"represented in the Michelin Guide\" href=\"https://guide.michelin.com/tw/en/taipei-region/taipei/restaurant/fu-hang-soy-milk\" target=\"_blank\">represented in the Michelin Guide</a> for the last few years, including this one. </p>",
     "They have also been recognised in the Michelin Guide in past years, though they aren't on the 2026 Bib Gourmand list. </p>"],
  ],
  "michelin-bib-gourmand-taiwanese-small-eats-taipei": [
    ["all <strong>16 Michelin Bib Gourmand", "all <strong>15 Michelin Bib Gourmand"],
    ["5. Ching Jiao (晴郊)</h2>", "5. Ching Jiao (青嬌)</h2>"],
    ["<strong>Ching Jiao (晴郊)</strong> offers", "<strong>Ching Jiao (青嬌)</strong> offers"],
    ["<td><strong>Ching Jiao (晴郊)</strong></td>", "<td><strong>Ching Jiao (青嬌)</strong></td>"],
    ["the menu revolves around slow-simmered, nourishing chicken broths and artisan Taiwanese small eats. Highlight dishes include their <strong>signature chicken soup</strong>, <strong>savory rice cakes</strong>, and <strong>marinated braised sides</strong>, offering comforting home-style cooking with exceptional depth.",
     "the menu is built around chicken broth and Jiangzhe-style small eats made with local produce. The star is the <strong>golden chicken soup</strong>, a corn-fed hen cooked for six hours with Jinhua ham and bamboo shoots until the broth turns rich and gelatinous, and the <strong>Shanghai cabbage rice</strong> is the rustic partner to order with it."],
    ["Taiwanese (Nourishing Chicken Broths &amp; Small Eats)", "Jiangzhe-style Small Eats (Chicken Broths &amp; Cabbage Rice)"],
    ["15. Su Lai Chuan (素來川)</h2>", "15. Su Lai Chuan (蘇來傳)</h2>"],
    ["<strong>Su Lai Chuan (素來川)</strong> is", "<strong>Su Lai Chuan (蘇來傳)</strong> is"],
    ["<td><strong>Su Lai Chuan (素來川)</strong></td>", "<td><strong>Su Lai Chuan (蘇來傳)</strong></td>"],
    ["9. Hsiao Cho Chih Chia (小焯之家)</h2>", "9. Hsiao Cho Chih Chia (小酌之家)</h2>"],
    ["Founded in 1995 and boasting over 40 years of culinary mastery, <strong>Hsiao Cho Chih Chia (小焯之家)</strong>",
     "Founded in 1995, <strong>Hsiao Cho Chih Chia (小酌之家)</strong>"],
    ["Signature dishes include <strong>steamed fish with tree seeds</strong>, <strong>seasoned pork intestine</strong>, and <strong>stir-fried squid</strong>, delivering",
     "Signature dishes include <strong>abalone and black-bone chicken soup</strong>, simmered with Chinese herbs for about two hours, and <strong>roast pork trotters</strong> from Taiwanese black pigs that take two days to prepare, alongside line-caught seafood, delivering"],
    ["<td><strong>Hsiao Cho Chih Chia (小焯之家)</strong></td>", "<td><strong>Hsiao Cho Chih Chia (小酌之家)</strong></td>"],
    ["11. Inn's+ (英斯 雙城街)</h2>", "11. Inn's+ (隱食家 雙城街)</h2>"],
    ["<strong>Inn’s+ (英斯)</strong>", "<strong>Inn’s+ (隱食家)</strong>"],
    ["<td><strong>Inn's+ (英斯 雙城街)</strong></td>", "<td><strong>Inn's+ (隱食家 雙城街)</strong></td>"],
    ["has evolved from a humble street stall into a Michelin-starred favorite.",
     "has evolved from a humble street stall into a Bib Gourmand favourite."],
  ],
  "xinyi-shopping-district": [
    ["<li>Neo 19</li>", "<li>Neo 19 (closed as a mall in January 2023)</li>"],
    ["target=\"_blank\">NEO 19</a></td><td>5</td><td>-</td><td>Nightclubs<br>Cigar Bar</td><td>Sports</td></tr>",
     "target=\"_blank\">Uni-Ustyle</a></td><td>-</td><td>-</td><td>Above City Hall Bus Station<br>Replaced NEO 19, closed 2023</td><td>Mixture</td></tr>"],
    ["target=\"_blank\">Shin Kong A13</a></td>", "target=\"_blank\">Far Eastern A13</a></td>"],
    ["<p>The <strong>Shin Kong A13</strong>, which opened in December 2019, also has a nice dining area on 3F.</p>",
     "<p>The <strong>Far Eastern A13</strong> department store, which began trading at Christmas 2019 and officially opened in January 2020, also has a nice dining area on 3F.</p>"],
    ["the other 2 located inside the Shin Kong Mitsukoshi A4 &amp; A13 malls.",
     "the other 2 inside Shin Kong Mitsukoshi A4 and Far Eastern A13."],
    ["Many restaurant chains can be found here, including Jamie's Italian, <a href=\"/miacucina\">",
     "Many restaurant chains can be found here, including <a href=\"/miacucina\">"],
  ],
  "christmas-dinners": [
    ["<p>With many expats staying put this Christmas, and the growing popularity of celebrating the holiday in Taiwan, many restaurants",
     "<p>With Christmas ever more popular in Taiwan, many restaurants"],
    ["<p><em>Watch this space for continual updates as more information becomes available.</em></p>",
     "<p><em>Check before you book: the menus, prices and dates below come from an earlier Christmas. When we looked in late November 2026, none of these five had put its 2026 Christmas menu online yet, so call or message ahead to confirm what's on and what it costs.</em></p>"],
    ["and this year they’re offering a complete dinner set for Christmas.",
     "and in past years has offered a complete dinner set for Christmas."],
    ["<p>On Tap have just released their Christmas Menu details for 2026. For only 4 days, they will be serving authentic Christmas meals.</p>",
     "<p>On Tap usually serves a proper Christmas dinner for just a few days over the holiday. The last menu we saw looked like this.</p>"],
    ["<p>From Thursday December 24th to Sunday December 27th inclusive.</p>",
     "<p>That menu ran for four days, 24 to 27 December inclusive; check this year's dates with the pub.</p>"],
  ],
};

const filePath = path.resolve(process.env.POSTS_PATH || "content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const fail = (m) => { console.error(`${m} - aborting, nothing written.`); process.exit(1); };
for (const [slug, edits] of Object.entries(EDITS)) {
  const post = posts.find((p) => p.slug === slug);
  if (!post) fail(`/${slug} not found`);
  for (const [from, to, field = "content"] of edits) {
    const n = post[field].split(from).length - 1;
    if (n !== 1) fail(`/${slug} ${field}: "${from.slice(0, 50)}..." matched ${n} times`);
    post[field] = post[field].replace(from, () => to);
  }
  post.modified = MODIFIED;
  console.log(`/${slug}: fixed`);
}
fs.writeFileSync(filePath, JSON.stringify(posts, null, 2) + "\n");
