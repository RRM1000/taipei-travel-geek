import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const post = posts.find((p) => p.slug === "taiwan-easycard");
if (!post) { console.error("Post not found"); process.exit(1); }
let content = post.content;

const oldSection = `<h2 id="TPASS-Monthly-Pass">TPASS 1200 Regional Monthly Pass</h2>

<p>If you are staying in Northern Taiwan for a longer period (or traveling heavily), you can load the <strong>TPASS 1200</strong> onto your EasyCard for <strong>NT$1,200</strong>. This gives you 30 days of unlimited rides on the Taipei MRT, Taoyuan Airport MRT, TRA trains, city buses, and 30 minutes free on YouBikes across Taipei, New Taipei, Keelung, and Taoyuan!</p>`;

if (!content.includes(oldSection)) {
  console.error("Old TPASS section not found — aborting without changes.");
  process.exit(1);
}

const newSection = `<h2 id="TPASS-Monthly-Pass">TPASS 1200 Regional Monthly Pass</h2>

<p>If you are staying in Northern Taiwan for <strong>3 weeks or longer</strong>, the <strong>TPASS 1200</strong> regional monthly pass (also called the "Megacity Pass") is a great deal. For <strong>NT$1,200</strong>, you get 30 consecutive days of unlimited rides on the Taipei MRT, Taoyuan Airport MRT, TRA local trains, city buses across Taipei/New Taipei/Keelung/Taoyuan, plus 30 minutes free on YouBikes in the same region.</p>

<h3>Who Can Buy It?</h3>

<p>You can purchase TPASS using a standard or student EasyCard (regular full-fare cards only — not concession cards like senior or charity cards). Tourist travelers can buy TPASS on a standard EasyCard just like anyone else.</p>

<p>Important: Most regions (including the Northern/Taipei version) require your EasyCard to be registered (記名) to your name before you load the pass. If your EasyCard is anonymous/unregistered, you'll need to register it first — this takes 5 minutes at an MRT station service desk or online on the EasyCard website.</p>

<h3>How to Buy and Load It</h3>

<p>You have three main options:</p>

<ul><li><strong>EasyWallet App (Easiest)</strong> — If you have a phone that supports mobile NFC (most smartphones do), download the "EasyWallet" app, link your EasyCard, and purchase TPASS directly in the app anytime, anywhere. The app will deduct NT$1,200 from your card's balance and activate the pass instantly.</li><li><strong>FamilyMart FamiPort Kiosk</strong> — Go to any FamilyMart convenience store (there are thousands across Taiwan) and use the red FamiPort machine. Select "交通票證" (Transportation Tickets), then "TPASS通勤月票", then follow the on-screen prompts to select the Northern Taiwan region and pay.</li><li><strong>MRT Station Service Desk</strong> — Visit a Taipei Metro or Taoyuan Metro service window during opening hours, show them your EasyCard, and ask them to load TPASS 1200. Staff will charge your card and activate it on the spot.</li></ul>

<h3>Activation</h3>

<p>Once you've purchased it, you must activate the pass within 30 days by tapping your EasyCard on any MRT gate, bus validator, or station payment terminal. After that, it's live for the next 30 consecutive days.</p>

<h3>Is TPASS Worth It?</h3>

<p>TPASS makes sense if you're staying 3+ weeks and using public transit daily. For shorter trips or lighter transit use, an EasyCard with top-up credit is more flexible — you only pay for what you use and don't have to commit to 30 days upfront.</p>`;

content = content.replace(oldSection, newSection);
post.content = content;
post.modified = "2026-08-06 10:15:00";

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log("Expanded TPASS section on taiwan-easycard.");
