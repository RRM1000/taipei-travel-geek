// Rework the operating-hours section of the MRT guide.
//
// WHY. Search Console shows a cluster of about a dozen near-identical
// queries - "taipei mrt operating hours", "mrt taipei hours", "taipei mrt
// closing time", "taipei mrt time" - sitting at position 4 to 9 with almost
// no clicks, on a page that otherwise ranks 1-2 for map queries it cannot
// convert. The hours cluster is the winnable demand on this page.
//
// The section already existed. It gave one sentence of hours and then handed
// the reader to the operator's own station-by-station lookup, which is
// precisely why the operator outranks us: we were a worse route to their
// data. What a guide can do instead is explain the thing their timetable
// never says - that "midnight" is when trains leave the ends of the lines,
// not when the system stops - and say what to do when you have missed it.
//
// NO PER-STATION TIMES. 131 stations of first/last departures would be a
// maintenance burden on volatile data that the official lookup already
// serves better and live. The heading is also renamed Times -> Hours to
// match how the queries are actually phrased.

import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const post = posts.find((p) => p.slug === "mrt");

if (!post) {
  console.error("Post mrt not found!");
  process.exit(1);
}

let content = post.content;
const before = content;

// --- 1. Rename the heading to match the query language -------------------
const oldHeading = '<h2 id="MRT-Times">MRT Operating Times &amp; Frequency</h2>';
const newHeading = '<h2 id="MRT-Times">MRT Operating Hours &amp; Frequency</h2>';
if (!content.includes(oldHeading)) {
  console.error("Operating-times heading not found - aborting.");
  process.exit(1);
}
content = content.replace(oldHeading, newHeading);

// --- 2. Replace the bare official-lookup link with the real answer --------
const oldBlock = `<blockquote class="wp-block-quote"><p><a href="https://english.metro.taipei/cp.aspx?n=4ADE532CBC330460" target="_blank" rel="noreferrer noopener">Click here to find the first and last train departures from each station</a></p><cite>Select the station name from the drop-down menu</cite></blockquote>`;

const newBlock = `<h3 id="Last-Train">What time is the last train?</h3>



<p>Midnight is when the last trains leave the <em>ends</em> of each line, not when the system shuts down. If you are boarding somewhere in the middle &ndash; Taipei Main, Ximen, Zhongxiao Fuxing &ndash; the last train through is later than that, usually by 15 to 45 minutes and at some stations closer to an hour. If you are already out near a terminus, it is earlier.</p>



<p>That is why there is no single answer to &quot;what time does the last MRT go&quot;, and why the round number is worth checking against your actual station before you rely on it. It takes about ten seconds.</p>



<blockquote class="wp-block-quote"><p><a href="https://english.metro.taipei/cp.aspx?n=4ADE532CBC330460" target="_blank" rel="noreferrer noopener">Check the first and last train departures for your station</a></p><cite>Select your station from the drop-down menu</cite></blockquote>



<h3 id="Missed-Last-Train">If you miss the last train</h3>



<p>Taxis are the answer, and it is a much smaller problem here than it would be at home. They are everywhere, metered, and cheap by most visitors' standards &ndash; a cross-city fare late at night costs less than the equivalent in almost any other capital. Uber operates in Taipei too, and both are covered in <a href="/taipei-public-transport#Taxis">taxis and Uber</a> in our transport guide.</p>



<p>Buses keep running on some routes after the MRT has stopped, but they are harder to use without Mandarin and the stops are less obvious &ndash; see <a href="/taipei-public-transport#Buses">city buses</a> if you would rather not pay for a cab.</p>`;

if (!content.includes(oldBlock)) {
  console.error("Official-lookup blockquote not found - aborting.");
  process.exit(1);
}
content = content.replace(oldBlock, newBlock);

// --- 3. Let the FAQ answer carry the "last train" wording too -------------
const oldFaq =
  "<p><strong>06:00 to midnight</strong> every day, though some stations see departures up to an hour after midnight. Trains come every 2&ndash;4 minutes at peak, and roughly every 8&ndash;12 minutes late at night.</p>";
const newFaq =
  '<p><strong>06:00 to midnight</strong> every day &ndash; but midnight is when the last trains leave the ends of the lines, so at a central station the last train through is 15 to 45 minutes later than that. See <a href="#Last-Train">what time is the last train</a> for how to check your own stop. Trains come every 2&ndash;4 minutes at peak, and roughly every 8&ndash;12 minutes late at night.</p>';

if (!content.includes(oldFaq)) {
  console.error("FAQ answer not found - aborting.");
  process.exit(1);
}
content = content.replace(oldFaq, newFaq);

if (content === before) {
  console.error("Nothing changed - aborting.");
  process.exit(1);
}

post.content = content;
post.modified = "2026-09-07 10:00:00";

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2) + "\n");

console.log("MRT guide updated:");
console.log('  ~ Heading renamed "Operating Times" -> "Operating Hours"');
console.log("  + Section: What time is the last train?");
console.log("  + Section: If you miss the last train");
console.log('  ~ FAQ "What time does the MRT run?" now explains the midnight boundary');
console.log(`  content ${before.length} -> ${content.length} chars`);
