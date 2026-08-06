import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const post = posts.find((p) => p.slug === "the-best-guided-tours-in-taipei");
if (!post) { console.error("Post not found"); process.exit(1); }
let content = post.content;

// --- 1. Classic One-Day Tour: weave the two routes into prose, don't link every single stop ---
const oldClassic = `<p>This full-day guided tour has a choice of 2 routes that will take you around many of the top attractions and areas in Taipei. Both routes are equally excellent, taking you to some historic buildings and vibrant areas. Click the individual links below to find out more about each.</p>



<div class="wp-block-group">
<ul><li><a href="/longshan-temple">Lungshan Temple</a>, Herb Lane, <a href="/bopiliao-historical-block">Bopiliao Historical Block</a></li><li><a href="/the-grand-hotel">Grand Hotel</a></li><li><a href="/chiang-kai-shek-shilin-residence">Chiang Kai-Shek Shilin Residence</a></li><li><a href="/national-palace-museum">National Palace Museum</a></li><li><a href="/martyrs-shrine">Martyrs' Shrine</a></li><li><a href="/shilin-night-market">Shilin Night Market</a></li></ul>



<ul><li>Four Four South Village</li><li><a href="/taipei-101-fireworks-new-years-eve">Taipei 101</a></li><li><a href="/yongkang-street">Yongkang Street</a></li><li><a href="/chiang-kai-shek-memorial-hall">Chiang Kai-shek Memorial Hall</a> </li><li><a href="/presidential-office-building">Presidential Office Building</a></li><li>Dadaocheng</li><li><a href="/ximending">Ximending</a></li></ul>
</div>`;

const newClassic = `<p>This full-day guided tour has a choice of two routes, and both are excellent. The first winds through Wanhua's old town - <a href="/longshan-temple">Lungshan Temple</a>, Herb Lane and the <a href="/bopiliao-historical-block">Bopiliao Historical Block</a> - before taking in the <a href="/the-grand-hotel">Grand Hotel</a>, <a href="/chiang-kai-shek-shilin-residence">Chiang Kai-Shek Shilin Residence</a> and the <a href="/national-palace-museum">National Palace Museum</a>, finishing up at <a href="/shilin-night-market">Shilin Night Market</a> via the Martyrs' Shrine. The second covers Four Four South Village, <a href="/taipei-101-fireworks-new-years-eve">Taipei 101</a> and <a href="/yongkang-street">Yongkang Street</a>, then the <a href="/chiang-kai-shek-memorial-hall">Chiang Kai-shek Memorial Hall</a> and <a href="/presidential-office-building">Presidential Office Building</a>, before wrapping up in Dadaocheng and <a href="/ximending">Ximending</a>.</p>`;

if (!content.includes(oldClassic)) { console.error("Classic One-Day Tour block not found — aborting."); process.exit(1); }
content = content.replace(oldClassic, newClassic);

// --- 2. Old Taipei City History Walking Tour: weave the short stop list into the description ---
const oldWalking = `<p>An English-guided walking tour giving a proper introduction to Taipei's old city history, meeting near NTU Hospital Station. Over 2 - 2.5 hours, a local guide walks you through the old city district covering the history behind it, with some Taiwanese food and culture worked in along the way - a good option if you'd rather have context for what you're looking at than just wander on your own. It's essentially a free/tip-based format - the small booking fee just reserves your spot.</p>



<div class="wp-block-group">
<ul><li><a href="/peace-park">228 Peace Memorial Park</a></li><li><a href="/presidential-office-building">Presidential Office Building</a></li><li>Inner City Market</li><li>Zhongshan Hall</li><li><a href="/the-red-house-ximending">Red House Theater</a></li><li><a href="/ximending">Ximending</a></li></ul>
</div>`;

const newWalking = `<p>An English-guided walking tour giving a proper introduction to Taipei's old city history, meeting near NTU Hospital Station. Over 2 - 2.5 hours, a local guide walks you through the old city district - from the <a href="/peace-park">228 Peace Memorial Park</a> and <a href="/presidential-office-building">Presidential Office Building</a> to the Inner City Market and Zhongshan Hall, finishing at the <a href="/the-red-house-ximending">Red House Theater</a> in <a href="/ximending">Ximending</a> - with some Taiwanese food and culture worked in along the way. It's essentially a free/tip-based format - the small booking fee just reserves your spot.</p>`;

if (!content.includes(oldWalking)) { console.error("Old Taipei City History Walking Tour block not found — aborting."); process.exit(1); }
content = content.replace(oldWalking, newWalking);

post.content = content;
post.modified = "2026-08-06 19:20:00";

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log("Naturalized the link lists into prose for both tour sections.");
