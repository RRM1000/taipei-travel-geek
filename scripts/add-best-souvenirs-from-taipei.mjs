// New listicle: the best souvenirs to buy in Taipei, and where to buy them.
//
// WHY THIS PAGE. The street and park guides each mention a gift shop or a
// box of pineapple cakes, but nobody arriving with a shopping list for home
// has one page that says what is worth buying, which shop is the original,
// what it costs and what will get through customs at the other end.
//
// SOURCING. data/research/best-souvenirs-from-taipei.md, checked 28 Oct 2026.
// Shop addresses, hours and box prices come from the brands' own websites
// where they could be opened (SunnyHills, Chia Te, Sugar & Spice, Eslite, the
// Red House, Huashan, Songshan park). Taipei Leechi has no working website, so
// its address and hours rest on Taiwanese press (NOWnews 2024, Supertaste) and
// the copy hedges them; no Leechi pineapple cake price was found, so none is
// given. Customs figures are from gov.uk, the US federal regulation (19 CFR
// 148.33) and Australia's agriculture department, and the copy tells readers
// to check their own country's rules.
//
// PHOTOS. Six Wikimedia Commons files, copied to
// public/media/2026/10/best-souvenirs-from-taipei/, each credited in its
// figcaption (scratchpad/downloaded-photos/new-posts/credits.json), plus two
// of the owner's own photos. The pineapple cake and nougat photos have no
// stated location, so their captions name no shop or place. The Jiufen tea
// set photo flagged in credits.json is not used.
//
// LINKS IN. One new sentence each on /where-to-shop-in-taipei and
// /dihua-street-dadaocheng-guide, guarded so each match is unique and the page
// doesn't already link here.
//
// No FAQ block (FAQs are kept to the main guides) and no Perfect For box.
//
// POSTS_PATH=<file> writes to a copy instead of content/posts.json.

import fs from "fs";
import path from "path";

const SLUG = "best-souvenirs-from-taipei";
const LINK = `/${SLUG}`;
const TODAY = "2026-10-28 12:00:00";
const MEDIA = "/media/2026/10/best-souvenirs-from-taipei";

const cc = (licence, url) => `<a href="${url}" rel="nofollow noopener" target="_blank">${licence}</a>`;
const commons = (page) => `via <a href="${page}" rel="nofollow noopener" target="_blank">Wikimedia Commons</a>`;
const fig = (src, w, h, alt, caption) =>
  `<figure class="wp-block-image size-large"><img width="${w}" height="${h}" src="${src}" alt="${alt}"/><figcaption>${caption}</figcaption></figure>`;

const BY_SA_4 = "https://creativecommons.org/licenses/by-sa/4.0";
const BY_SA_2 = "https://creativecommons.org/licenses/by-sa/2.0";
const BY_3 = "https://creativecommons.org/licenses/by/3.0";
const CC0 = "http://creativecommons.org/publicdomain/zero/1.0/deed.en";

const FIG = {
  pineapple: fig(
    `${MEDIA}/taiwanese-pineapple-cake.jpg`, 2400, 1594,
    "Two golden Taiwanese pineapple cakes, one cut to show the fruit filling",
    `Taiwanese pineapple cakes, one cut open to show the filling. Photo by Ocdp, ${cc("CC0", CC0)}, ${commons("https://commons.wikimedia.org/wiki/File:Taiwanese_Pineapple_Cake_001.jpg")}.`
  ),
  oolong: fig(
    `${MEDIA}/jin-xuan-oolong-alishan.jpg`, 2400, 2400,
    "A small pile of rolled Jin Xuan oolong tea leaves from Alishan",
    `Rolled Jin Xuan oolong from Alishan. Photo by Difference engine, ${cc("CC BY-SA 4.0", BY_SA_4)}, ${commons("https://commons.wikimedia.org/wiki/File:Jin_Xuan_oolong_tea.jpg")}.`
  ),
  nougat: fig(
    `${MEDIA}/taiwan-nougat-cracker.jpg`, 2400, 1807,
    "A Taiwanese nougat cracker sandwich showing the nougat filling",
    `A Taiwanese nougat cracker. Photo by Syced, ${cc("CC0", CC0)}, ${commons("https://commons.wikimedia.org/wiki/File:Rren_nougat,_from_Taiwan.jpg")}.`
  ),
  driedFruit: fig(
    "/media/2026/08/dihua/20200116_154442.jpg", 1600, 1200,
    "Colourful dried fruit and vegetable chips piled high at a Dihua Street stall",
    "Dried fruit and vegetable crisps on sale on Dihua Street."
  ),
  eslite: fig(
    `${MEDIA}/eslite-spectrum-songyan-shops.jpg`, 2100, 1383,
    "Shoppers browsing food and design stalls inside Eslite Spectrum Songyan",
    `Food and design counters inside Eslite Spectrum Songyan, 2015. Photo by Wpcpey, ${cc("CC BY 3.0", BY_3)}, ${commons("https://commons.wikimedia.org/wiki/File:Eslite_Spectrum_Songyan_Store_20150704.jpg")}.`
  ),
  linHuaTai: fig(
    `${MEDIA}/linhuatai-tea-shop-dihua.jpg`, 2400, 1598,
    "The wooden counter of Lin Hua Tai, a historic Taipei tea shop, with customers buying tea",
    `Buying loose tea at the counter of Lin Hua Tai in Dadaocheng. Photo by Tbatb, ${cc("CC BY-SA 4.0", BY_SA_4)}, ${commons("https://commons.wikimedia.org/wiki/File:Buying_Tea_Leaves_in_Linhuatai_Tea_Shop,_Taipei.jpg")}.`
  ),
  yongkang: fig(
    `${MEDIA}/yongkang-street-shoppers.jpg`, 2400, 1800,
    "Crowds of shoppers walking along Yongkang Street in Taipei",
    `A weekend crowd on Yongkang Street. Photo by David Baron, ${cc("CC BY-SA 2.0", BY_SA_2)}, ${commons("https://commons.wikimedia.org/wiki/File:People_visit_Yongkang_shopping_street_in_Taipei.jpg")}.`
  ),
  laiHao: fig(
    "/media/2020/01/Yongkang-Street-13-1024x754.jpg", 1024, 754,
    "Lai Hao gift shop on Yongkang Street with neon pineapple and Taipei signs",
    "Lai Hao, the best-known gift shop around Yongkang Street."
  ),
};

const CONTENT = `
<p>Most people fly home from Taipei with at least one box of pineapple cakes, and that is a fine place to start. But the city does better souvenirs than that: loose oolong weighed out by tea merchants who have traded from the same street for well over a century, nougat in flavours you won't see elsewhere, Taiwan's own single malt, and a good deal of clever design work by young Taiwanese brands. This guide lists what to buy, the shops worth going to for each, rough prices from the shops' own websites, and the rules that decide whether your haul makes it through customs at the other end.</p>

<div class="quick-verdict"><p class="quick-verdict-title">💡 The Quick Verdict: Taipei Souvenirs</p><ul><li><strong>The classic:</strong> pineapple cakes. Chia Te is the cheapest of the famous names at about NT$38 a cake; SunnyHills costs a little more.</li>
<li><strong>For tea drinkers:</strong> high-mountain oolong bought loose from one of the old merchants around Dihua Street.</li>
<li><strong>One stop for everything:</strong> Eslite Spectrum Songyan, with design shops, food gifts, a wine shop and a bookshop that never closes.</li>
<li><strong>Left it too late:</strong> SunnyHills sells at all three terminals at Taoyuan Airport.</li>
<li><strong>Leave on the shelf:</strong> jerky, pork paper and other meat snacks, which many countries won't let you bring in.</li></ul></div>



<h2 id="What-to-Buy">What to Buy</h2>

<h3 id="Pineapple-Cakes">1. Pineapple Cakes</h3>

${FIG.pineapple}

<p>A square of short, buttery pastry around a sticky pineapple filling, pineapple cake is Taiwan's default gift and is sold everywhere from bakeries to the airport. The big names are worth seeking out because they are not much more expensive than the supermarket boxes:</p>

<ul>
<li><strong>Chia Te (佳德):</strong> the bakery at No. 88, Section 5, Nanjing East Road, a short walk from Nanjing Sanmin station on the Green line, has been going since 1975 and draws queues for its original cake. Its website lists 6 for NT$228, 12 for NT$456 and 20 for NT$760, and the shop is open 08:30 to 20:30. The plain cake keeps for 40 days; the cranberry and egg-yolk versions only 15, which matters if you are buying early in a trip.</li>
<li><strong>SunnyHills (微熱山丘):</strong> the Taipei shop sits in a converted house on a corner of Minsheng Park (Lane 36, Alley 4, No. 1, Section 5, Minsheng East Road), open 10:00 to 18:00. The brand describes it as a place to sit with a cup of tea and a cake, and guides report that visitors are offered both free. Its online shop prices are NT$345 for 6 and NT$550 for 10. The shop is not near a station: the brand's directions suggest a bus to the Jieshou Junior High School stop, or about a 13-minute walk from Songshan Airport station.</li>
<li><strong>Taipei Leechi (台北犁記):</strong> a bakery name that dates back to 1894, best known for mung bean cakes and egg-yolk pastries but also selling pineapple cakes. The Taipei shop is at No. 67, Section 2, Chang'an East Road; press reports give the hours as roughly 08:00 or 09:00 to 21:00, and it gets very busy before Lunar New Year and the Mid-Autumn Festival. We could not find a current pineapple cake price.</li>
<li><strong>Lee Tin Hsiang (李亭香):</strong> a Dihua Street bakery founded in 1895, at No. 309, Section 1. Pineapple cakes are on the shelves, but the house speciality is ping xi bing, a flaky cake filled with white bean paste (a box of four was NT$220 in a recent Taiwanese food review).</li>
</ul>

<h3 id="Tea">2. Oolong and High-Mountain Tea</h3>

${FIG.oolong}

<p>Taiwan's oolong is the souvenir that tea drinkers rate most highly, and it is light to carry. The prized kind is high-mountain tea (高山茶), grown on the slopes of places such as Alishan and Lishan, which has a floral, buttery taste. Closer to Taipei, Muzha below <a href="/maokong-gondola">Maokong</a> is known for its roasted Tieguanyin. Tea is sold loose by weight, traditionally by the jin (600 g), and the better shops will let you taste before you buy. Prices vary hugely with the grade and the altitude: one Taiwanese tea writer puts wholesale Lishan at NT$2,500 to NT$10,000 a jin, so expect to pay well over a thousand dollars for a decent 150 g bag of high-mountain leaf.</p>

<p>The best places to buy are the old tea merchants of Dadaocheng, around Dihua Street, which grew rich on the oolong trade in the 19th century. <strong>Lin Hua Tai (林華泰茶行)</strong>, at No. 193, Section 2, Chongqing North Road, is widely said to date from 1883 and still sells loose tea over a long wooden counter. <strong>Wang's Tea (有記名茶)</strong>, at No. 26, Lane 64 of the same road, was founded in Xiamen in 1890 and has had a tea factory in Dadaocheng since 1907.</p>

<h3 id="Nougat">3. Nougat and Nougat Crackers</h3>

${FIG.nougat}

<p>Soft milk nougat packed with nuts is a Taiwanese favourite, and the brand most visitors head for is <strong>Sugar &amp; Spice (糖村)</strong>. As well as the classic French nougat it does sesame, matcha, cranberry and a red oolong flavour made with tea from Luye. Its own list of Taipei shops includes the original branch at No. 158, Section 1, Dunhua South Road, one at No. 5, Section 2, Wuchang Street in Ximending and one in the basement of Taipei 101.</p>

<p>The other thing to try is the nougat cracker (牛軋餅): two salty soda crackers stuck together with nougat, often with spring onion in the biscuit. Sugar &amp; Spice sells a spring onion and salt version, and the small gift shops on <a href="/yongkang-street#Shops">Yongkang Street</a> sell boxes too.</p>

<h3 id="Dried-Fruit">4. Dried Fruit, Nuts and Dihua Street Goods</h3>

${FIG.driedFruit}

<p>Dihua Street's dried goods merchants sell thick slices of dried mango and guava, pineapple rings, taro and vegetable crisps, and sacks of roasted nuts and seeds, usually by weight and often with samples. In the weeks before Lunar New Year the street becomes a market for festive snacks and gets extremely crowded. Our <a href="/dihua-street-dadaocheng-guide#food-specialties">Dihua Street guide</a> lists the specialities. Dried fruit travels well, but leave the dried seafood and meat behind; see the customs notes below.</p>

<h3 id="Beer">5. Taiwan Beer</h3>

<p>Taiwan Beer, made by the state-owned Taiwan Tobacco and Liquor Corporation, is in every fridge in the country. The lager is the one locals drink, but the fruit beers are the more unusual gift: mango, pineapple, lychee and others, light and sweet (the mango and pineapple versions are 2.8%). The cheapest place to buy is a convenience store or supermarket, and cans and bottles need to go in your checked luggage. For something more serious, our <a href="/best-places-to-drink-craft-beer-taipei">craft beer guide</a> lists bars that sell Taiwanese bottles.</p>

<h3 id="Whisky">6. Kavalan Whisky</h3>

<p>Kavalan is Taiwan's best-known single malt and a surprise to many visitors who don't expect whisky from a subtropical island. The distillery, run by the King Car group in Yilan County on the east coast, produced its first spirit in 2006 and released its first bottles at the end of 2008. In Taipei there is a Kavalan bar and shop in Taipei 101, which opened in 2021, and the bottles are also sold in supermarkets. Eslite's wine shop at Songyan (open 11:00 to 22:00) is another place to look for Taiwanese spirits. If you want to see where it is made, the distillery charges NT$200 admission from March 2026.</p>

<h3 id="Design">7. Design Goods</h3>

${FIG.eslite}

<p>Taiwan has a lively design scene, and the best souvenirs for people who don't want food are often the stationery, textiles, prints and homeware made by small local brands. Four places in Taipei bring a lot of them together:</p>

<ul>
<li><strong>Eslite Spectrum Songyan (誠品生活松菸)</strong>, the building at the edge of <a href="/songshan-cultural-and-creative-park#Eslite">Songshan Cultural and Creative Park</a>, has floors of Taiwanese craft and design counters (11:00 to 22:00) and a third-floor bookshop that is open 24 hours.</li>
<li><strong>Eslite Spectrum Nanxi (誠品生活南西)</strong>, at No. 14, Nanjing West Road by Zhongshan station, has a stationery floor and stays open until 22:30 on Fridays and Saturdays. Note that the old Eslite Xinyi store, which some older guides still recommend, closed at the end of 2023.</li>
<li><strong><a href="/huashan-1914-creative-park#Shops">Huashan 1914 Creative Park</a></strong> fills its old wine factory buildings with design shops and pop-ups. The outdoor areas never close; the shops keep their own hours, mostly from 11:00 to 19:00 or 21:00.</li>
<li><strong><a href="/yongkang-street#Shops">Yongkang Street</a></strong> and the lanes around it have gift shops, of which Lai Hao (來好) is the best known.</li>
</ul>

<h3 id="Ceramics">8. Ceramics and Tea Ware</h3>

<p>A small clay teapot or a set of cups goes well with a bag of oolong. The tea merchants and the craft shops at Huashan and Eslite sell them in town, but the place for serious pottery shopping is Yingge, a ceramics town in New Taipei 20 to 30 minutes by train from Taipei Main Station. Its old street, Jianshanpu Road, is lined with pottery shops and studios, and some offer have-a-go pottery sessions. Not everything sold there is made locally, so look for the maker's name if that matters to you. Pack anything fragile in your hand luggage, wrapped in clothes.</p>

<h3 id="Convenience-Store-Snacks">9. Convenience-Store Snacks</h3>

<p>For cheap presents and things for the office, the shelves of 7-Eleven and FamilyMart are hard to beat. Look for I-Mei's milk puffs, which come in milk, chocolate and strawberry, and Kuai Kuai (乖乖) corn puffs, whose green coconut packets Taiwanese engineers famously leave on servers and machines in the hope that they will "behave". Our <a href="/taipei-convenience-stores#What-You-Can-Buy">convenience store guide</a> covers what else is on sale.</p>



<h2 id="Where-to-Buy">Where to Buy</h2>

<h3 id="Dihua-Street">Dihua Street and Dadaocheng</h3>

${FIG.linHuaTai}

<p>The best single area for food and tea gifts: dried fruit, nuts, traditional bakeries and the old tea merchants sit close together, and the restored shophouses also hold craft and textile shops. Start at the southern end near Beimen station and work north. The <a href="/dihua-street-dadaocheng-guide#boutiques-tea-houses">boutique and tea house section of our Dihua guide</a> lists the design shops.</p>

<h3 id="Yongkang-Street">Yongkang Street</h3>

${FIG.yongkang}

<p>Near Dongmen station, Yongkang Street mixes famous restaurants with small gift and craft shops, and it is the easiest place to buy nougat crackers, pineapple cakes and Taiwan-themed gifts in one go. Lai Hao is reported to stay open until 21:30, so you can shop after dinner. See our <a href="/yongkang-street">Yongkang Street guide</a> for the full list.</p>

${FIG.laiHao}

<h3 id="Eslite">The Eslite Stores</h3>

<p>Eslite is a chain of bookshops that grew into lifestyle malls. Songyan and Nanxi (see above) are the two with the most Taiwanese design and food brands. The Eslite stores at Ximen (No. 52, Emei Street) and Wuchang (No. 77, Section 2, Wuchang Street) in Ximending are open 11:30 to 22:00.</p>

<h3 id="Ximending">Ximending</h3>

<p>The youth shopping district has branches of the gift brands, including Sugar &amp; Spice and two Eslite stores, and the <a href="/the-red-house-ximending">Red House</a>, whose 16 Workshop area is home to small studios selling their own design work. It is busiest at weekends. Our <a href="/ximending">Ximending guide</a> and our round-up of <a href="/where-to-shop-in-taipei#Ximending">the best shopping areas</a> cover the rest.</p>

<h3 id="Airport">Taoyuan Airport</h3>

<p>If you run out of time, the airport has you covered for the basics. SunnyHills lists counters in Terminals 1, 2 and 3 at Taoyuan, as well as one in the Taipei 101 mall, and the duty-free shops sell pineapple cakes, tea and other gifts. The choice is narrower than in town, so buy the things you care about before you leave for the airport.</p>



<h2 id="Tips">Practical Tips</h2>

<h3 id="Tax-Refund">Claim the Tax Back</h3>

<p>Foreign visitors who spend at least NT$2,000 in one shop in a single day can reclaim VAT, as long as the shop shows the refund logo and you show your passport when you pay. After fees you get back just under 4% of what you spent. That is worth having on a box of whisky or a big tea order, but few small food shops take part. Our <a href="/taiwan-tourist-tax-refund">tax refund guide</a> explains how to claim, in town or at the airport.</p>

<h3 id="Packing">Packing Food for the Flight</h3>

<ul>
<li><strong>Liquids go in the hold.</strong> Taoyuan applies the usual limit of 100 ml per container in one clear bag of up to a litre, so beer, whisky, honey, sauces and jams must go in checked luggage unless you buy them airside.</li>
<li><strong>Carry the fragile things.</strong> Pineapple cakes crush easily and teapots break, so keep them in your hand luggage.</li>
<li><strong>Check the dates.</strong> Bakery cakes don't last forever; Chia Te's flavoured cakes, for example, keep for 15 days. Buy them near the end of your trip.</li>
<li><strong>Keep things sealed.</strong> Factory-sealed tea, nougat and snacks with an ingredients list are much easier to get through customs than food bought loose.</li>
</ul>

<h3 id="Customs">Customs at Home</h3>

<p>Rules depend on where you are flying to, and they change, so check your own country's customs and biosecurity website before you fly. As a guide:</p>

<ul>
<li><strong>Meat is the main problem.</strong> Jerky, pork paper, pork floss and anything containing meat are restricted by many countries, including the UK, the US and Australia. Dried seafood and fresh fruit often are too.</li>
<li><strong>Great Britain</strong> lets in biscuits, cakes without fresh cream, chocolate and confectionery from any country. Duty-free allowances include 4 litres of spirits, 42 litres of beer and £390 of other goods.</li>
<li><strong>The United States</strong> gives returning residents an $800 exemption, of which only one litre can be alcohol, and you must declare everything you bought abroad.</li>
<li><strong>Australia</strong> requires you to declare all food, even sealed snacks. Declared items may be taken, but you won't be fined for declaring them; failing to declare can bring a heavy fine.</li>
</ul>
`;

// One inbound link per page, each a single new sentence.
const LINK_EDITS = [
  [
    "where-to-shop-in-taipei",
    "technology goods, fashion and more?</p>",
    `technology goods, fashion and more?</p>\n\n<p>Shopping for presents to take home? Our guide to the <a href="${LINK}">best souvenirs from Taipei</a> covers what to buy and the shops that sell it.</p>`,
  ],
  [
    "dihua-street-dadaocheng-guide",
    `<h2 id="boutiques-tea-houses">`,
    `<p>Dihua Street is one of the best places in the city for edible gifts; our <a href="${LINK}">Taipei souvenir guide</a> covers the rest, from pineapple cakes to whisky.</p>\n\n<h2 id="boutiques-tea-houses">`,
  ],
];

const filePath = path.resolve(process.env.POSTS_PATH || "content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const fail = (m) => { console.error(`${m} - aborting, nothing written.`); process.exit(1); };

if (posts.some((p) => p.slug === SLUG)) fail(`/${SLUG} already exists`);

// Every internal link must point at an existing post, and every #anchor at an id on it.
const bySlug = new Map(posts.map((p) => [p.slug, p]));
const checkLinks = (html, where) => {
  for (const [, s, a] of html.matchAll(/href="\/([^"#?]+)(?:#([^"]+))?"/g)) {
    if (s === SLUG) continue;
    const target = bySlug.get(s);
    if (!target) fail(`${where}: internal link /${s} has no post`);
    if (a && !target.content.includes(`id="${a}"`)) fail(`${where}: /${s}#${a} has no such anchor`);
  }
};
checkLinks(CONTENT, `/${SLUG}`);

// Every Klook link must carry the affiliate id (there are none at present).
for (const [, u] of CONTENT.matchAll(/href="(https:\/\/www\.klook\.com[^"]+)"/g)) {
  if (!/[?&]aid=8733(&|$)/.test(u)) fail(`Klook link without aid: ${u}`);
}

// Every image needs width and height, and must exist under public/.
const publicDir = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..", "public");
for (const [img] of CONTENT.matchAll(/<img [^>]+>/g)) {
  if (!/ width="\d+"/.test(img) || !/ height="\d+"/.test(img)) fail(`image without width/height: ${img}`);
  const src = img.match(/src="([^"]+)"/)[1];
  if (!fs.existsSync(path.join(publicDir, src))) fail(`missing image file public${src}`);
}

// House rules: no FAQ section, no Perfect For block on a listicle.
if (/id="FAQ"|Common Questions|perfect-for/i.test(CONTENT)) fail("FAQ or Perfect For block found");

const title = "Best Souvenirs from Taipei: What to Buy & Where (2026)";
if (title.length > 60) fail(`title is ${title.length} chars`);

const featuredImage = `${MEDIA}/linhuatai-tea-shop-dihua.jpg`;
if (!fs.existsSync(path.join(publicDir, featuredImage))) fail(`missing featured image public${featuredImage}`);

// Inbound links: each match must be unique and the page must not already link here.
const apply = (post, from, to) => {
  const n = post.content.split(from).length - 1;
  if (n !== 1) fail(`/${post.slug}: "${from.slice(0, 60)}..." matched ${n} times`);
  post.content = post.content.replace(from, () => to);
};
for (const [slug, from, to] of LINK_EDITS) {
  const post = bySlug.get(slug);
  if (!post) fail(`/${slug} not found`);
  if (post.content.includes(`href="${LINK}"`)) fail(`/${slug} already links /${SLUG}`);
  apply(post, from, to);
  checkLinks(to, `/${slug}`);
}

posts.push({
  id: Math.max(...posts.map((p) => p.id || 0)) + 1,
  authorId: 2,
  date: TODAY,
  modified: TODAY,
  slug: SLUG,
  title,
  excerpt:
    "What to bring home from Taipei and where to buy it: pineapple cakes, oolong tea, nougat, Kavalan whisky and design goods, with shop addresses, prices, the tax refund and customs tips.",
  type: "post",
  parentId: 0,
  content: CONTENT,
  categories: [{ name: "Shop", slug: "shop" }],
  tags: [{ name: "Lists", slug: "lists" }],
  featuredImage,
});

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2) + "\n");

console.log(`Added /${SLUG} to ${filePath}`);
console.log(`  title: ${title} (${title.length})`);
console.log(`  ${CONTENT.length} chars, ${(CONTENT.match(/<img /g) || []).length} images`);
console.log(`  inbound links added from: ${LINK_EDITS.map(([s]) => "/" + s).join(", ")}`);
