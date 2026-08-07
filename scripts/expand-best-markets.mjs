import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const post = posts.find((p) => p.slug === "best-markets-in-taipei");
if (!post) { console.error("Post not found"); process.exit(1); }
let content = post.content;

const replacements = [
  {
    old: `<p>Night markets are the main attractions in Taipei, but there are some great daytime markets here also. These are some of the best day and night markets you should check out during your visit to Taipei.</p>`,
    new: `<p>Night markets are practically a national pastime in Taipei - a nightly ritual of grilled skewers, bubbling hot pots, claw machines and neon signage that's as much about the atmosphere as the food itself. But the city's market scene doesn't stop when the sun goes down: on weekends, entire streets transform into daytime markets selling everything from fresh-cut flowers to jade jewellery and produce trucked in from farms across Taiwan. Whether you're chasing down Michelin-listed street food, hunting for a bargain, or just want to wander somewhere with genuine local energy, these are the best day and night markets to check out during your visit to Taipei.</p>`,
  },
  {
    old: `<p>The biggest and most touristic of all the night markets, Shilin Night Market offers something for everyone - if you can bear the crowds and queues. Shilin has the widest variety of stalls, including many games and even shrimp fishing.</p>`,
    new: `<p>The biggest and most touristic of all the night markets, Shilin Night Market offers something for everyone - if you can bear the crowds and queues. Split across a warren of narrow alleys above ground and a sprawling food court below, Shilin has the widest variety of stalls of any market in the city, from classic street food like oyster omelettes and stinky tofu to arcade games, clothing stalls and even shrimp fishing. It's not the place to go if you're after a quiet, local experience, but for sheer scale and variety, nothing else in Taipei comes close.</p>`,
  },
  {
    old: `<p>Only on <strong>weekends</strong>, the Farmer's Market at the Expo Park is a daytime market that offers most things night markets do, plus they have many stands selling local produce sourced from all over Taiwan. </p>`,
    new: `<p>Only on <strong>weekends</strong>, the Farmer's Market at Expo Park is a refreshing change of pace from the night market crush - a relaxed, open-air daytime market set among the park's greenery. Alongside most of the food you'd expect from any Taipei market, it's packed with stands selling fresh produce sourced from farms all over Taiwan, making it a good spot to pick up fruit, tea or local snacks to take home with you. It's an easy one to combine with a wander around the wider Expo Park area if you fancy some fresh air along with your market browsing.</p>`,
  },
  {
    old: `<p>While it cannot compete in terms of size with Shilin Night Market, Raohe is arguably the best night market to visit for food, and includes no less than five stalls that can be found in the official Michelin guide.</p>`,
    new: `<p>While it cannot compete in terms of size with Shilin Night Market, Raohe is arguably the best night market to visit for food, and includes no less than five stalls that can be found in the official Michelin guide. It runs as a single, atmospheric street between a historic temple gate at one end and Raohe Street's glowing entrance arch at the other, making it far easier to navigate than Shilin's maze of alleys. Expect a queue or two for the famous pepper buns and braised pork rice, but the compact layout means you can realistically cover the whole market - and try a lot of food - in a single evening.</p>`,
  },
  {
    old: `<p>Occurring only during the daytime on <strong>weekends</strong>, the Jianguo Flower &amp; Jade Markets are located adjacent to each other in the Daan district. Both are huge warehouses, one being devoted to flowers and all things flora, while the other sells crafts of all types, including many made of the precious jade.</p>`,
    new: `<p>Occurring only during the daytime on <strong>weekends</strong>, the Jianguo Flower &amp; Jade Markets are located adjacent to each other in the Daan district, tucked beneath the elevated highway. Both are huge covered warehouses - one devoted entirely to flowers, plants, bonsai and gardening supplies, the other filled with stalls selling jewellery, antiques and crafts of all types, including many made of the precious jade Taiwan is known for. It's a fascinating spot for browsing even if you have no intention of buying anything, and a nice way to see a side of local life quite different from the night market scene.</p>`,
  },
  {
    old: `<p>If you find the prospect of visiting the busy Shilin Night Market too much, Tonghua Night Market market is a good alternative - many locals rate Tonghua (aka Linjiang Street) as their favourite night market. There are some stalls here found on the Michelin Guide (click post for locations). </p>`,
    new: `<p>If you find the prospect of visiting the busy Shilin Night Market too much, Tonghua Night Market is a good alternative - many locals rate Tonghua (aka Linjiang Street) as their favourite night market, precisely because it still feels like a local, lived-in market rather than a tourist attraction. It's smaller and far more manageable than Shilin, with a solid concentration of food stalls (including some found on the Michelin Guide - click through to the post for locations) packed into a few streets near Taipei 101, making it an easy add-on if you're already in the Xinyi area for the evening.</p>`,
  },
];

for (const { old, new: replacement } of replacements) {
  if (!content.includes(old)) { console.error("Anchor not found:", old.slice(0, 60)); process.exit(1); }
  content = content.replace(old, replacement);
}

post.content = content;
post.modified = "2026-08-07 13:15:00";

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log("Expanded best-markets-in-taipei with more comprehensive wording.");
