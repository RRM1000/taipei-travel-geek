import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));

// --- taipei-guide edits ---
const guideIdx = posts.findIndex((p) => p.slug === "taipei-guide");
const guide = posts[guideIdx];
let gc = guide.content;

// 1. Title: add 2026 back.
const oldGuideTitle = "Discover Taipei: Your Ultimate Travel Guide";
if (guide.title !== oldGuideTitle) {
  console.error(`Guide title mismatch: "${guide.title}"`);
  process.exit(1);
}
guide.title = "Discover Taipei in 2026: Your Ultimate Travel Guide";
console.log("OK: guide title");

// 2. SIM section: lead with eSIM.
const oldSim = "Your best option is to purchase a pre-paid SIM card directly from either airport. There are deals in the city but they're generally not as good and harder to find.";
const newSim = "Your best option is getting an <strong>eSIM</strong> before you fly &ndash; it's usually the cheapest choice and you're connected the moment you land. Otherwise, you can pick up a pre-paid SIM card directly from either airport. There are deals in the city but they're generally not as good and harder to find.";
if (!gc.includes(oldSim)) {
  console.error("SIM paragraph not found");
  process.exit(1);
}
gc = gc.replace(oldSim, newSim);
console.log("OK: SIM section");

// 3. EasyCard paragraph: remove the rebate detail, keep it simple.
const oldEasycard = "It can be used on all types of public transportation, including the Airport Express, and frequent riders (11&ndash;15% monthly cash rebates on MRT travel.";
const oldEasycardActual = "It can be used on all types of public transportation, including the Airport Express, and frequent riders (11+ rides/month) can earn 5&ndash;15% monthly cash rebates on MRT travel.";
const newEasycard = "It can be used on all types of public transportation, including the Airport Express.";
if (!gc.includes(oldEasycardActual)) {
  console.error("EasyCard paragraph not found");
  process.exit(1);
}
gc = gc.replace(oldEasycardActual, newEasycard);
console.log("OK: EasyCard rebate detail removed");

// 4. Visa section: add a short paragraph on the arrival card process.
const visaAnchor = `<p>Because the eligible countries (and day allowances) change from time to time, I've moved the full breakdown, the online arrival card process, and what happens at immigration into its own dedicated guide, which I'll keep updated as the rules change.</p>`;
const arrivalCardParagraph = `<p>Since 1 October 2025, Taiwan no longer hands out paper arrival cards on the plane. Every visitor now submits a <strong>Taiwan Arrival Card (TWAC)</strong> online instead &ndash; ideally in the 7 days before you fly, though you can also do it at an airport kiosk or on your phone in the immigration queue if you forget. Filling it in beforehand means walking straight up to the desk instead of filling in a form on your phone in the arrivals hall.</p>



${visaAnchor}`;
if (!gc.includes(visaAnchor)) {
  console.error("Visa anchor paragraph not found");
  process.exit(1);
}
gc = gc.replace(visaAnchor, arrivalCardParagraph);
console.log("OK: arrival card paragraph added");

guide.content = gc;
guide.modified = "2026-08-05 13:00:00";

// --- taiwan-easycard edit ---
const easycardIdx = posts.findIndex((p) => p.slug === "taiwan-easycard");
const easycardPost = posts[easycardIdx];
const oldEasycardTitle = "EasyCard - Make it Your First Purchase in Taiwan";
if (easycardPost.title !== oldEasycardTitle) {
  console.error(`EasyCard title mismatch: "${easycardPost.title}"`);
  process.exit(1);
}
easycardPost.title = "EasyCard - Make it Your First Purchase in Taiwan (2026 Guide)";
easycardPost.modified = "2026-08-05 13:00:00";
console.log("OK: easycard title");

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log("Saved.");
