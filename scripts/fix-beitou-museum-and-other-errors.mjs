// Three factual fixes, checked against official sources on 27 October 2026:
// - the Beitou Hot Spring Museum closes for restoration from 9 November 2026
//   until about late October 2027 (hotspringmuseum.taipei, notice id=605), so
//   posts that still send readers inside now say so;
// - Jiufen is not stated as the model for Spirited Away, which Studio Ghibli
//   has denied;
// - Tamsui's museum buildings (Fort San Domingo, the consulate, the Little
//   White House, Hobe Fort) open every day except the first Monday of the
//   month (tshs.ntpc.gov.tw opening hours page), not "closed at weekends".
// The Klook Pingxi pass (activity 121840) really is redeemed at Ruifang, so
// lunar-new-year-taipei is unchanged.

import fs from "fs";
import path from "path";

const MODIFIED = "2026-10-28 12:00:00";
// [from, to, field] - field defaults to "content".
const EDITS = {
  "taipei-itinerary-3-5-days": [
    ['visit the <a href="/xinbeitou#hot-spring-museum">Beitou Hot Spring Museum</a> and <a href="/xinbeitou#thermal-valley">Thermal Valley</a> before or after a soak.',
     'walk up through Beitou Park to <a href="/xinbeitou#thermal-valley">Thermal Valley</a> before or after a soak. The <a href="/xinbeitou#hot-spring-museum">Beitou Hot Spring Museum</a> on the way is worth a look until 8 November 2026; after that it is shut until roughly October 2027, and the Ketagalan Culture Center on the same stretch of Zhongshan Road (closed Mondays) makes a good stand-in.'],
    ["If you'd rather see the lantern-lit streets that inspired part of Spirited Away,",
     "If you'd rather see the lantern-lit streets so often compared to Spirited Away (Studio Ghibli says Jiufen wasn't its model),"],
  ],
  "one-day-itineraries": [
    ['<a href="/xinbeitou#hot-spring-museum">Hot Spring Museum</a>, detailing the history',
     '<a href="/xinbeitou#hot-spring-museum">Hot Spring Museum</a> (closed for renovation between 9 November 2026 and October 2027), detailing the history'],
    ["(inspiration for the Studio Gibli film Spirited Away)",
     "(often likened to the town in Studio Ghibli's Spirited Away, though the studio says it wasn't the model)"],
  ],
  "best-day-trips-from-taipei": [
    ["You'll visit the hot spring museum, before moving on",
     "You'll visit the hot spring museum (if it's open: the building is closed for repairs from 9 November 2026 to around October 2027), before moving on"],
    ["and was actually the inspiration for the wonderful Japanese Studio Ghibli film Spirited Away.",
     "and is often said to have inspired the wonderful Japanese Studio Ghibli film Spirited Away, although Ghibli has said it didn't."],
  ],
  "maps": [
    ["&ndash; Nice hot spring museum</li>",
     "&ndash; Nice hot spring museum, but shut November 2026 to October 2027 for restoration</li>"],
  ],
  "best-districts-and-areas": [
    ["covering the area's history and its role in Taiwanese cinema,",
     "covering the area's history and its role in Taiwanese cinema (closed from 9 November 2026 for about a year),"],
  ],
  "best-buildings-in-taipei": [
    ["the museum and the striking wooden Beitou Library among them.</p>",
     "the museum and the striking wooden Beitou Library among them. The museum's interior is off limits from 9 November 2026 while restoration runs to about October 2027, but you can still admire the outside from the park.</p>"],
  ],
  "tamsui": [
    ["Locals pour in at weekends and on public holidays, and the historic buildings up by the fort are mostly closed at weekends anyway.",
     "Locals pour in at weekends and on public holidays. The historic buildings up by the fort open daily, except on the first Monday of the month."],
    ["Opening hours vary between them and most close at weekends, so read my full guide before you go.",
     "They open every day bar the first Monday of each month, but the college and church buildings next door keep their own hours, so read my full guide before you go."],
    ["Weekdays over weekends, both for the crowds and because the historic buildings shut at weekends.",
     "Weekdays over weekends for the crowds, and avoid the first Monday of each month, as the fort and its sister buildings close that day."],
  ],
  "fort-san-domingo": [
    ["One NT$80 ticket covers three sites - and midweek is the only day they're all open.",
     "One NT$80 ticket covers three sites, open every day except the first Monday of the month.",
     "excerpt"],
    ["<li><strong>Go Tuesday to Thursday.</strong> The buildings keep different hours and this is the only window when they're all open.</li>",
     "<li><strong>Skip the first Monday of the month</strong>, when the ticketed buildings close. Tuesday to Thursday is best if you also want Oxford College and the House of Maidens open.</li>"],
    ["<strong>Former Residence of Tada Eikichi</strong><br>09:30 - 17:00 (extended to 18:00 on weekends)</p>",
     "<strong>Former Residence of Tada Eikichi</strong><br>09:30 - 17:00 (extended to 18:00 on weekends)<br>Closed on the first Monday of the month</p>"],
    ["09:30 - 17:00 (extended to 18:00 on weekends) <br>Closed on Sunday</p>",
     "09:30 - 17:00 (extended to 18:00 on weekends) <br>Closed on the first Monday of the month</p>"],
    ["Broadly the same as Fort San Domingo, but worth checking with the museum on the day &ndash; it keeps its own hours and is the furthest to walk to.",
     "Same hours as Fort San Domingo; it is simply the furthest to walk to."],
    ["<p><strong>Tuesday to Thursday.</strong> Each building keeps its own hours &ndash; Oxford College closes Friday, Sunday and Monday; the House of Maidens closes at weekends; the Little White House closes Sunday. Midweek is the only reliable window for seeing everything.</p>",
     "<p><strong>Tuesday to Thursday</strong>, if you want to get inside everything. The fort, consulate, Little White House and Hobe Fort open daily apart from the first Monday of the month, but Oxford College closes Friday, Sunday and Monday, and the House of Maidens closes at weekends.</p>"],
  ],
};

const filePath = path.resolve(process.env.POSTS_PATH || "content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const fail = (m) => { console.error(`${m} - aborting, nothing written.`); process.exit(1); };
for (const [slug, edits] of Object.entries(EDITS)) {
  const post = posts.find((p) => p.slug === slug);
  if (!post) fail(`/${slug} not found`);
  for (const [from, to, field = "content"] of edits) {
    const n = post[field].split(from).length - 1;
    if (n !== 1) fail(`/${slug} ${field}: "${from.slice(0, 50)}..." matched ${n} times`);
    post[field] = post[field].replace(from, () => to);
  }
  post.modified = MODIFIED;
  console.log(`/${slug}: fixed`);
}
fs.writeFileSync(filePath, JSON.stringify(posts, null, 2) + "\n");
