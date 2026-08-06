import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const post = posts.find((p) => p.slug === "taiwan-sim-cards");
let content = post.content;

const oldRequirements = `<h2 id="What-You-Need">SIM Card Requirements</h2>



<ul><li>You must be at least <strong>20 years old</strong> to purchase a Taiwan SIM Card</li><li>You will need to show them your <strong>passport</strong>. These deals are only available for non-Taiwanese passport holders.</li><li>Some operators will only accept <strong>cash</strong>, so make sure you've exchanged some beforehand.</li><li>You'll also need an <strong>unlocked phone</strong>.</li></ul>



<p>Sometimes you will be required to show them another form of identification (especially if you're getting a Taiwan SIM card from the city). These vary between operators but include Driver's Licence or Visa permit (if you need one for Taiwan).</p>`;

if (!content.includes(oldRequirements)) {
  console.error("Requirements section not found — aborting.");
  process.exit(1);
}

const newRequirements = `<h2 id="What-You-Need">SIM Card Requirements</h2>



<p>These requirements are for a <strong>physical</strong> tourist SIM card. If you're getting an <a href="#eSIM">eSIM</a> instead, none of this applies &ndash; there's no age limit, no passport check, and no cash needed, since it's bought and activated entirely online.</p>



<ul><li>You must be at least <strong>20 years old</strong> to purchase a Taiwan SIM Card</li><li>You will need to show them your <strong>passport</strong>. These deals are only available for non-Taiwanese passport holders.</li><li>Some operators will only accept <strong>cash</strong>, so make sure you've exchanged some beforehand.</li><li>You'll also need an <strong>unlocked phone</strong>.</li></ul>



<p>Sometimes you will be required to show them another form of identification (especially if you're getting a Taiwan SIM card from the city). These vary between operators but include Driver's Licence or Visa permit (if you need one for Taiwan).</p>`;

content = content.replace(oldRequirements, newRequirements);

const oldConclusion = `<h2 id="Conclusion">Conclusion</h2>



<p>Try to get a Taiwan SIM Card from the Airport when you arrive, or pre-order one from Klook before you arrive for further savings.</p>



<p>If you arrive when the booths are closed, it's still possible to get a SIM Card airport deal from the city. Your best option here is to visit <a href="#City-Locations-Chunghwa">one of the Chunghwa Telecom stores</a>.</p>`;

if (!content.includes(oldConclusion)) {
  console.error("Conclusion section not found — aborting.");
  process.exit(1);
}

const newConclusion = `<h2 id="Conclusion">Conclusion</h2>



<p>If your phone supports it, get an <a href="#eSIM">eSIM</a> before you fly &ndash; it's usually cheaper, avoids the age/passport/cash requirements above entirely, and you're connected the moment you land instead of queuing at a counter.</p>



<p>If you need a physical SIM (no eSIM support, or you want a local phone number), try to get one from the Airport when you arrive, or pre-order one from Klook before you arrive for further savings.</p>



<p>If you arrive when the booths are closed, it's still possible to get a SIM Card airport deal from the city. Your best option here is to visit <a href="#City-Locations-Chunghwa">one of the Chunghwa Telecom stores</a>.</p>`;

content = content.replace(oldConclusion, newConclusion);

post.content = content;
post.modified = "2026-08-05 23:00:00";

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log("Updated SIM Card Requirements and Conclusion sections to reflect eSIM info.");
