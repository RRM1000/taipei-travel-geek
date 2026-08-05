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

const oldSection = post.content.slice(
  post.content.indexOf('<h2 id="eSIM">'),
  post.content.indexOf('<h2 id="Mobile-Operators">')
);

if (!oldSection.startsWith('<h2 id="eSIM">')) {
  console.error("Could not locate eSIM section boundaries.");
  process.exit(1);
}

const newSection = `<h2 id="eSIM">eSIM Options for Taiwan</h2>



<p>If you have a modern, unlocked phone that supports eSIM technology, getting an <strong>eSIM</strong> is by far the most convenient and hassle-free option. It allows you to download a digital profile and connect to Taiwan's mobile networks instantly upon arrival, without having to swap physical SIM cards or wait in line at airport booths.</p>



<h3>Who Can Get an eSIM?</h3>
<ul>
  <li><strong>Unlocked Device:</strong> Your mobile phone must be carrier-unlocked, and not jailbroken (iOS) or rooted (Android).</li>
  <li><strong>eSIM Compatible:</strong> Most iPhone XS or newer, Google Pixel 3 or newer, and Samsung Galaxy S20 or newer support eSIM. New models are added all the time, so <a href="https://www.klook.com/faq/category-142-question-14357/?aid=8733" target="_blank" rel="noopener noreferrer">check Klook's full compatible device list</a> before you buy.</li>
  <li><strong>No Age Restrictions:</strong> Unlike physical tourist SIM cards, which require you to be 20 years old and register your passport at the counter, eSIMs can be purchased and activated online by anyone in advance.</li>
</ul>



<h3>Data-Only vs. Voice</h3>
<p>Most tourist eSIMs sold online are <strong>data-only</strong>. They do not come with a local Taiwanese phone number or voice call/SMS credit. While you won't be able to make standard phone calls, you can use messaging apps like WhatsApp, LINE, Messenger, and FaceTime for calling. If you need a local phone number (for example, to register for certain local apps), you should purchase a physical tourist SIM at the airport instead.</p>



<h3>Choosing Your Plan</h3>

<p>Klook's Taiwan eSIM isn't a handful of fixed bundles &ndash; you build the plan around your own trip. When you order, you'll choose:</p>

<table class="wp-block-table">
  <thead>
    <tr>
      <th>Option</th>
      <th>Choices</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Package type</strong></td>
      <td>Data per day (a fresh allowance every day) or Data in total (one shared pool for your whole trip)</td>
    </tr>
    <tr>
      <td><strong>SIM validity</strong></td>
      <td>1 to 30 days</td>
    </tr>
    <tr>
      <td><strong>Data package</strong></td>
      <td>500MB, 1GB, 3GB, 5GB, 10GB, 20GB, 50GB, or Unlimited</td>
    </tr>
    <tr>
      <td><strong>Service type</strong></td>
      <td>Data only (no local phone number or voice minutes)</td>
    </tr>
  </tbody>
</table>

<p>As a rough guide: if you're mainly using maps, messaging apps and light browsing, 1&ndash;3GB per day comfortably covers a typical day of sightseeing. If you'll be streaming video, sharing your hotspot, or working remotely, go Unlimited. Because the exact price changes with every combination of validity and data, use Klook's own selector to see the live price for your dates rather than a fixed table here &ndash; it'll always be more accurate than a price we've hardcoded on this page.</p>



<div class="article-klook-cta">
  <a href="https://www.klook.com/en-US/activity/132311-esim-taiwan-with-high-speed-and-stable-internet-connection/?aid=8733" target="_blank" rel="noopener noreferrer" aria-label="Build your Taiwan eSIM plan on Klook">📶 Build Your Taiwan eSIM Plan on Klook</a>
</div>



<h3>How to Activate Your eSIM</h3>

<p>Setup takes about five minutes, and you can do it from home before you fly &ndash; your data and validity period won't start until the eSIM actually connects to a Taiwanese network, so there's no downside to installing it early.</p>

<ol>
  <li><strong>Buy your eSIM on Klook.</strong> You'll get a QR code (plus the manual activation details as a backup) in the Klook app or by email.</li>
  <li><strong>Install the eSIM profile.</strong> Easiest way: open the Klook app, go to your booking and tap <strong>Add eSIM to device</strong> &ndash; installation happens automatically. Or manually, go to your phone's <strong>Settings &gt; Cellular/Mobile Data &gt; Add eSIM</strong> and scan the QR code.</li>
  <li><strong>Leave it alone until you land.</strong> The plan stays dormant until it detects a Taiwanese network, so installing it days in advance costs you nothing.</li>
  <li><strong>Turn on data roaming for the eSIM once you land.</strong> In Settings, switch on <strong>Data Roaming</strong> for the new eSIM line (keep your home SIM active for calls/texts if you're running dual-SIM) &ndash; you should be connected within a minute or two.</li>
</ol>

<p>Having trouble? You can reach Klook's support straight from the app: <strong>Account &gt; Bookings &gt; your eSIM booking &gt; Contact merchant</strong>.</p>



`;

post.content = post.content.replace(oldSection, newSection);
post.modified = "2026-08-05 09:00:00";

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log("eSIM section rewritten. New length:", newSection.length, "(was", oldSection.length, ")");
