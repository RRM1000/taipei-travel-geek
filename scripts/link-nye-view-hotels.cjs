// Guarded link insertions for the new NYE view-hotels page. Test-applies to a copy only.
const fs = require("fs");
const file = process.argv[2];
const raw = fs.readFileSync("content/posts.json", "utf8");
const posts = JSON.parse(fs.readFileSync(file, "utf8"));
const L = '<a href="/taipei-101-view-hotels-new-years-eve">';
const edits = [
  ["taipei-101-fireworks-new-years-eve",
   "Rooms facing the tower sell out months ahead. ",
   `Rooms facing the tower sell out months ahead; our page on ${L}Taipei 101 view hotels for New Year's Eve</a> compares the 2026/27 packages, minimum stays and cancellation terms. `],
  ["hotels-near-taipei-101",
   "has the viewing spots and the way home.</p>",
   `has the viewing spots and the way home, and our list of ${L}hotels with a Taipei 101 view for New Year's Eve</a> compares this year's room packages.</p>`],
  ["taipei-101",
   "the best spots to watch the NYE fireworks</a>.</li>",
   `the best spots to watch the NYE fireworks</a>, or the ${L}hotels with a 101 view for the night</a>.</li>`],
];
for (const [slug, find, rep] of edits) {
  const all = posts.reduce((n, p) => n + (p.content || "").split(find).length - 1, 0);
  const rawN = raw.split(JSON.stringify(find).slice(1, -1)).length - 1;
  const p = posts.find((x) => x.slug === slug);
  const inPage = p.content.split(find).length - 1;
  console.log(`${slug}: in page ${inPage}, across posts ${all}, raw file ${rawN}`);
  if (inPage !== 1 || all !== 1) throw new Error("not unique: " + find);
  p.content = p.content.replace(find, rep);
}
fs.writeFileSync(file, JSON.stringify(posts, null, 2) + "\n");
