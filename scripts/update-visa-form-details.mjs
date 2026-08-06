import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const post = posts.find((p) => p.slug === "taiwan-visa-entry-requirements");
let content = post.content;

const oldList = `<ul><li>Go directly to <strong>twac.immigration.gov.tw</strong> - this is the official National Immigration Agency site. The NIA has specifically <a href="https://www.immigration.gov.tw/5475/5478/141457/142068/401867/" target="_blank" rel="noreferrer noopener">warned about fraudulent copycat sites</a> that charge a fee for what is a completely free government service, so don't just search and click the first result.</li><li>You can submit it any time from <strong>7 days before your flight</strong> up until you land.</li><li>Have these ready before you start: your <strong>passport</strong>, <strong>flight number</strong> and arrival date, and the <strong>address of where you're staying</strong> in Taiwan (your hotel confirmation email has this).</li><li>The form asks for standard details - name, passport number, nationality, date of birth, occupation, purpose of visit - all matching your passport exactly.</li><li>Once submitted, you'll get a confirmation. You <strong>don't need to print anything</strong> - at immigration, the officer scans your passport and your TWAC submission is pulled up automatically. It's still worth keeping a screenshot as a backup in case of any system issue.</li></ul>



<blockquote class="wp-block-quote"><p>Fill it in for every traveller in your group individually, including children - each passport needs its own TWAC submission.</p></blockquote>`;

if (!content.includes(oldList)) {
  console.error("Old list not found — aborting without changes.");
  process.exit(1);
}

const newList = `<ul><li>Go directly to <strong>twac.immigration.gov.tw</strong> - this is the official National Immigration Agency site. The NIA has specifically <a href="https://www.immigration.gov.tw/5475/5478/141457/142068/401867/" target="_blank" rel="noreferrer noopener">warned about fraudulent copycat sites</a> that charge a fee for what is a completely free government service, so don't just search and click the first result.</li><li>You can submit it any time from <strong>7 days before your flight</strong> up until you land.</li><li>Have these ready before you start: your <strong>passport</strong>, <strong>flight number</strong> and arrival date, and the <strong>address of where you're staying</strong> in Taiwan (your hotel confirmation email has this).</li><li>You'll start by entering your <strong>email address</strong> and verifying it with a code sent to your inbox - do this first, the code expires after about 10 minutes.</li><li>Most of the form is standard passport details, but a few fields are easy to get wrong: your <strong>Date of Entry</strong> and <strong>Expected Departure Date</strong> for Taiwan specifically (not your home country), and your <strong>Visa Type</strong> - most tourists should select <strong>"Visa-Exempt (include TAC)"</strong> unless you've actually applied for a visa in advance.</li><li>You don't have to type your passport details manually - there's a <strong>"Retrieve Passport Data"</strong> option that lets you scan or upload a photo of your passport's biographical page, and it fills in your name, passport number, nationality and dates automatically.</li><li>Once submitted, you'll get a confirmation. You <strong>don't need to print anything</strong> - at immigration, the officer scans your passport and your TWAC submission is pulled up automatically. It's still worth keeping a screenshot as a backup in case of any system issue.</li></ul>



<blockquote class="wp-block-quote"><p>Travelling as a group? You don't need to fill in a separate form from scratch for each person - click <strong>"Add Travelers"</strong> to add more people to the same submission. If there are a lot of you (or you visit Taiwan often and want to keep the details on file), you can download the Excel <strong>template</strong>, fill in everyone's details offline, and use <strong>Import</strong> to add up to 16 people at once.</p></blockquote>`;

content = content.replace(oldList, newList);
post.content = content;
post.modified = "2026-08-05 21:00:00";

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log("Updated TWAC form-filling instructions on taiwan-visa-entry-requirements.");
