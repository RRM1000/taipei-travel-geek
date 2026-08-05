import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const idx = posts.findIndex((p) => p.slug === "taiwan-sim-cards");
if (idx === -1) {
  console.error("taiwan-sim-cards not found");
  process.exit(1);
}
const post = posts[idx];

const oldParagraph = `<p>As a rough guide: if you're mainly using maps, messaging apps and light browsing, 1&ndash;3GB per day comfortably covers a typical day of sightseeing. If you'll be streaming video, sharing your hotspot, or working remotely, go Unlimited. Because the exact price changes with every combination of validity and data, use Klook's own selector to see the live price for your dates rather than a fixed table here &ndash; it'll always be more accurate than a price we've hardcoded on this page.</p>`;

if (!post.content.includes(oldParagraph)) {
  console.error("Could not find the paragraph to extend — aborting.");
  process.exit(1);
}

const newParagraph = `<p>As a rough guide: if you're mainly using maps, messaging apps and light browsing, 1&ndash;3GB per day comfortably covers a typical day of sightseeing. If you'll be streaming video, sharing your hotspot, or working remotely, go Unlimited.</p>

<p>This eSIM runs on <strong>Chunghwa Telecom</strong> &ndash; the same network we recommend elsewhere on this page for having Taiwan's best coverage, including in more remote and mountainous regions, so you're not trading network quality for convenience.</p>

<p>It's also genuinely flexible: unlike the fixed 3/5/7/15/30-day tiers physical SIM cards are sold in, you can pick your <strong>exact validity in single-day increments from 1 to 30 days</strong>, and choose between a capped data package (500MB up to 50GB) or go fully <strong>Unlimited</strong>.</p>

<p><strong>How the eSIM compares to a physical SIM</strong> (Data per day, Unlimited data &ndash; prices correct as of August 2026, always confirm the live price on Klook before booking):</p>

<table class="wp-block-table">
  <thead>
    <tr>
      <th>Validity</th>
      <th>eSIM (Unlimited, per day)</th>
      <th>Cheapest physical SIM</th>
      <th>Cheaper option</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>1 day</td><td>NT$51</td><td>&ndash;</td><td>eSIM</td></tr>
    <tr><td>2 days</td><td>NT$100</td><td>&ndash;</td><td>eSIM</td></tr>
    <tr><td>3 days</td><td>NT$148</td><td>NT$270</td><td>eSIM</td></tr>
    <tr><td>4 days</td><td>NT$194</td><td>&ndash;</td><td>eSIM</td></tr>
    <tr><td>5 days</td><td>NT$241</td><td>NT$270</td><td>eSIM</td></tr>
    <tr><td>6 days</td><td>NT$289</td><td>&ndash;</td><td>eSIM</td></tr>
    <tr><td>7 days</td><td>NT$331</td><td>NT$405</td><td>eSIM</td></tr>
    <tr><td>8 days</td><td>NT$371</td><td>NT$450</td><td>eSIM</td></tr>
    <tr><td>9 days</td><td>NT$454</td><td>&ndash;</td><td>eSIM</td></tr>
    <tr><td>15 days</td><td>NT$668</td><td>NT$700</td><td>eSIM</td></tr>
    <tr><td>30 days</td><td>NT$1,309</td><td>NT$1,000</td><td><strong>Physical SIM</strong></td></tr>
  </tbody>
</table>

<p>The pattern is clear: the eSIM beats the physical SIM at every length of stay <strong>except 30 days</strong>, where the per-day pricing works against it and a physical SIM becomes the cheaper choice. If you're travelling for a month or longer, it's worth comparing both before you book.</p>`;

post.content = post.content.replace(oldParagraph, newParagraph);
post.modified = "2026-08-05 09:30:00";

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log("eSIM pricing table added.");
