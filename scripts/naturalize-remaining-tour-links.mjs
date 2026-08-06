import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const post = posts.find((p) => p.slug === "the-best-guided-tours-in-taipei");
if (!post) { console.error("Post not found"); process.exit(1); }
let content = post.content;

// --- City tour ---
const oldCity = `<p>A great tour for first-time visitors to Taipei who are keen to see many of the city's most beautiful buildings. This fully guided-tour will take you to the Presidential Palace, the stunning Chiang Kai-shek Memorial Hall, Martyrs' Shrine, the National Palace Museum, the Grand Hotel and Xingtian Temple, all from the comfort of a coach. You'll also witness the change of guard at both the Chiang Kai-shek Memorial Hall and Martyrs' Shrine, and get a special pass to see the Presidential Palace which is usually only open to the public a few days each years.</p>



<figure class="wp-block-table aligncenter"><table><tbody><tr><td class="has-text-align-center" data-align="center"><strong>Tour Length</strong></td><td class="has-text-align-center" data-align="center"><strong>Start Time</strong></td><td class="has-text-align-center" data-align="center"><strong>Price</strong></td></tr><tr><td class="has-text-align-center" data-align="center"><strong>4 hours</strong></td><td class="has-text-align-center" data-align="center"><strong>08:00</strong></td><td class="has-text-align-center" data-align="center"><strong>NT$1,500</strong></td></tr></tbody></table></figure>



<blockquote class="wp-block-quote"><p><a href="/presidential-office-building">Click here to read more about the Presidential Palace</a><br><a href="/chiang-kai-shek-memorial-hall">Click here to read more about the Chiang Kai-shek Memorial Hall</a><br><a href="/martyrs-shrine">Click here to read more about Martyrs' Shrine</a><br><a href="/national-palace-museum">Click here to read more about the National Palace Museum</a><br><a href="/the-grand-hotel">Click here to read more about the Grand Hotel</a><br><a href="/hsing-tian-kong-temple">Click here to read more about Xingtian Temple</a></p></blockquote>`;

const newCity = `<p>A great tour for first-time visitors to Taipei who are keen to see many of the city's most beautiful buildings. This fully guided-tour will take you to the <a href="/presidential-office-building">Presidential Palace</a>, the stunning <a href="/chiang-kai-shek-memorial-hall">Chiang Kai-shek Memorial Hall</a>, <a href="/martyrs-shrine">Martyrs' Shrine</a>, the <a href="/national-palace-museum">National Palace Museum</a>, the <a href="/the-grand-hotel">Grand Hotel</a> and <a href="/hsing-tian-kong-temple">Xingtian Temple</a>, all from the comfort of a coach. You'll also witness the change of guard at both the Chiang Kai-shek Memorial Hall and Martyrs' Shrine, and get a special pass to see the Presidential Palace which is usually only open to the public a few days each years.</p>



<figure class="wp-block-table aligncenter"><table><tbody><tr><td class="has-text-align-center" data-align="center"><strong>Tour Length</strong></td><td class="has-text-align-center" data-align="center"><strong>Start Time</strong></td><td class="has-text-align-center" data-align="center"><strong>Price</strong></td></tr><tr><td class="has-text-align-center" data-align="center"><strong>4 hours</strong></td><td class="has-text-align-center" data-align="center"><strong>08:00</strong></td><td class="has-text-align-center" data-align="center"><strong>NT$1,500</strong></td></tr></tbody></table></figure>`;

if (!content.includes(oldCity)) { console.error("City tour block not found — aborting."); process.exit(1); }
content = content.replace(oldCity, newCity);

// --- Night tour ---
const oldNight = `<p>This is a great tour for foodies who are keen to sample some of the best food Taiwan has to offer. You'll first get to sample some of Din Tai Fung's sumptuous dishes, including their famous Xiaolongbao. Most importantly, you'll also avoid the long queues there, which often exceed an hour. You'll then be taken to Raohe Night Market, arguably the best in Taipei for food (including some found in the Michelin Guide). Finally, you'll be taken the to famous Rainbow Bridge, then to Songshan Ciyou Temple.</p>



<figure class="wp-block-table aligncenter"><table><tbody><tr><td class="has-text-align-center" data-align="center"><strong>Tour Length</strong></td><td class="has-text-align-center" data-align="center"><strong>Start Time</strong></td><td class="has-text-align-center" data-align="center"><strong>Price</strong></td></tr><tr><td class="has-text-align-center" data-align="center"><strong>4 hours</strong></td><td class="has-text-align-center" data-align="center"><strong>18:00</strong></td><td class="has-text-align-center" data-align="center"><strong>NT$1,500</strong></td></tr></tbody></table></figure>



<blockquote class="wp-block-quote"><p><a href="/raohe-night-market-foody-heaven">Click here to read more about Raohe Night Market</a><br><a href="/din-tai-fung">Click here to read more about Din Tai Fung</a></p></blockquote>`;

const newNight = `<p>This is a great tour for foodies who are keen to sample some of the best food Taiwan has to offer. You'll first get to sample some of <a href="/din-tai-fung">Din Tai Fung</a>'s sumptuous dishes, including their famous Xiaolongbao - and avoid the long queues there, which often exceed an hour. You'll then be taken to <a href="/raohe-night-market-foody-heaven">Raohe Night Market</a>, arguably the best in Taipei for food (including some found in the Michelin Guide), before finishing at the famous Rainbow Bridge and Songshan Ciyou Temple.</p>



<figure class="wp-block-table aligncenter"><table><tbody><tr><td class="has-text-align-center" data-align="center"><strong>Tour Length</strong></td><td class="has-text-align-center" data-align="center"><strong>Start Time</strong></td><td class="has-text-align-center" data-align="center"><strong>Price</strong></td></tr><tr><td class="has-text-align-center" data-align="center"><strong>4 hours</strong></td><td class="has-text-align-center" data-align="center"><strong>18:00</strong></td><td class="has-text-align-center" data-align="center"><strong>NT$1,500</strong></td></tr></tbody></table></figure>`;

if (!content.includes(oldNight)) { console.error("Night tour block not found — aborting."); process.exit(1); }
content = content.replace(oldNight, newNight);

// --- Bike tour ---
const oldBike = `<p>For those feeling more energetic, this 3-in-1 bike, metro, and walking guided-tour will take you around some of Taipei's most beautiful spots. Starting at the huge Daan Forest Park, you'll then cycle to the magnificent Chiang Kai-Shek Memorial Hall before taking lunch at Yong Kang street, famed for its many local eateries. After a 45 minute metro ride, you'll take a hike up Elephant Mountain to get some stunning views of Taipei 101. The tour will end up at Songshan Cultural and Creative Park where you can visit some of it's unique design spaces.</p>



<figure class="wp-block-table aligncenter"><table><tbody><tr><td class="has-text-align-center" data-align="center"><strong>Tour Length</strong></td><td class="has-text-align-center" data-align="center"><strong>Start Time</strong></td><td class="has-text-align-center" data-align="center"><strong>Price</strong></td></tr><tr><td class="has-text-align-center" data-align="center"><strong>5.5 hours</strong></td><td class="has-text-align-center" data-align="center"><strong>09:30</strong></td><td class="has-text-align-center" data-align="center"><strong>NT$1,350</strong></td></tr></tbody></table></figure>



<blockquote class="wp-block-quote"><p><a href="/daan-forest-park">Click here to read more about Daan Forest Park</a><br><a href="/chiang-kai-shek-memorial-hall">Click here to read more about the Chiang Kai-shek Memorial Hall</a><br><a href="/yongkang-street">Click here to read more about Yong Kang street</a><br><a href="/songshan-cultural-and-creative-park">Click here to read more about Songshan Cultural and Creative Park</a></p></blockquote>`;

const newBike = `<p>For those feeling more energetic, this 3-in-1 bike, metro, and walking guided-tour will take you around some of Taipei's most beautiful spots. Starting at the huge <a href="/daan-forest-park">Daan Forest Park</a>, you'll then cycle to the magnificent <a href="/chiang-kai-shek-memorial-hall">Chiang Kai-Shek Memorial Hall</a> before taking lunch at <a href="/yongkang-street">Yong Kang street</a>, famed for its many local eateries. After a 45 minute metro ride, you'll take a hike up Elephant Mountain to get some stunning views of Taipei 101. The tour will end up at <a href="/songshan-cultural-and-creative-park">Songshan Cultural and Creative Park</a> where you can visit some of it's unique design spaces.</p>



<figure class="wp-block-table aligncenter"><table><tbody><tr><td class="has-text-align-center" data-align="center"><strong>Tour Length</strong></td><td class="has-text-align-center" data-align="center"><strong>Start Time</strong></td><td class="has-text-align-center" data-align="center"><strong>Price</strong></td></tr><tr><td class="has-text-align-center" data-align="center"><strong>5.5 hours</strong></td><td class="has-text-align-center" data-align="center"><strong>09:30</strong></td><td class="has-text-align-center" data-align="center"><strong>NT$1,350</strong></td></tr></tbody></table></figure>`;

if (!content.includes(oldBike)) { console.error("Bike tour block not found — aborting."); process.exit(1); }
content = content.replace(oldBike, newBike);

post.content = content;
post.modified = "2026-08-06 19:30:00";

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log("Naturalized links for City, Night, and Bike tour sections.");
