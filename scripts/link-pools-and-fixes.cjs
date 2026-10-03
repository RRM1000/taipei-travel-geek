// Prepared (not applied) edits. Usage: node edits.cjs <posts.json> [--write]
const fs = require("fs");
const [file, write] = process.argv.slice(2);
const posts = JSON.parse(fs.readFileSync(file, "utf8"));
const E = [
  ["best-areas-and-hotels-to-stay",
   `see <a href="/best-places-to-keep-kids-amused">where to keep kids amused in Taipei</a>.</p>`,
   `see <a href="/best-places-to-keep-kids-amused">where to keep kids amused in Taipei</a>. If a pool matters, our guide to <a href="/taipei-hotels-with-pools">Taipei hotels with a pool</a> lists which ones stay open in winter and each hotel's rules for children.</p>`],
  ["best-places-to-keep-kids-amused",
   `lists places with a kitchen and room to spread out.</p>`,
   `lists places with a kitchen and room to spread out. For somewhere to swim at the end of the day, see our guide to <a href="/taipei-hotels-with-pools">Taipei hotels with a pool</a>, including the shallow children's pools at the Grand Hotel and in Beitou.</p>`],
  ["hotels-near-taipei-101",
   `<h2 id="Luxury">Luxury Hotels</h2>\n`,
   `<h2 id="Luxury">Luxury Hotels</h2>\n\n<p>Four of the hotels below have a pool: the Grand Hyatt, the W, Humble House (shut from November to March) and Le Méridien, whose indoor pool is the better bet in winter. Our guide to <a href="/taipei-hotels-with-pools">Taipei hotels with a pool</a> compares them with pools across the rest of the city.</p>\n`],
  ["hotels-in-daan",
   `whose 43rd-floor rooftop pool reopens on 1 October 2026 after its annual maintenance closure.`,
   `whose heated 43rd-floor rooftop pool reopened in October after its annual maintenance closure and is open all year apart from that month.`],
  ["hotels-in-daan",
   `Its heated rooftop pool on the 43rd floor has been closed for annual maintenance since 31 August and reopens on 1 October 2026`,
   `Its heated rooftop pool on the 43rd floor is open all year (06:00–21:00, to 22:00 on Fridays, Saturdays and holiday eves) apart from a month of maintenance, which ran from 31 August to 30 September in 2026; it reopened in October`],
];
let ok = true;
for (const [slug, find, rep] of E) {
  const p = posts.find((x) => x.slug === slug);
  const n = p.content.split(find).length - 1;
  console.log(`${slug}: ${n} match(es)`);
  if (n !== 1) { ok = false; continue; }
  p.content = p.content.replace(find, () => rep);
}
if (!ok) { console.error("not every find matched exactly once - nothing written"); process.exit(1); }
if (write) fs.writeFileSync(file, JSON.stringify(posts, null, 2) + "\n");
