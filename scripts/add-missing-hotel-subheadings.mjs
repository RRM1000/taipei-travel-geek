import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const post = posts.find((p) => p.slug === "best-areas-and-hotels-to-stay");
let content = post.content;

const areas = [
  { id: "Wanhua", name: "Wanhua", nextId: "Zhongzheng" },
  { id: "Zhongzheng", name: "Zhongzheng", nextId: "Zhongshan" },
  { id: "Zhongshan", name: "Zhongshan", nextId: "Songshan" },
  { id: "Songshan", name: "Songshan", nextId: "Best" },
];

for (const { id, name, nextId } of areas) {
  const startMarker = `<h2 id="${id}">`;
  const endMarker = `<h2 id="${nextId}">`;
  const startIdx = content.indexOf(startMarker);
  const endIdx = content.indexOf(endMarker);
  if (startIdx === -1 || endIdx === -1 || endIdx < startIdx) {
    console.error(`Could not locate section bounds for ${name}`);
    process.exit(1);
  }

  const section = content.slice(startIdx, endIdx);
  if (section.includes("Best Hotels in")) {
    console.log(`SKIP: ${name} already has a subheading`);
    continue;
  }

  const tableMarker = '<figure class="wp-block-table">';
  const tableIdxInSection = section.indexOf(tableMarker);
  if (tableIdxInSection === -1) {
    console.error(`Could not find hotel table in ${name} section`);
    process.exit(1);
  }

  const newSection =
    section.slice(0, tableIdxInSection) +
    `<h3>Best Hotels in ${name}</h3>



` +
    section.slice(tableIdxInSection);

  content = content.slice(0, startIdx) + newSection + content.slice(endIdx);
  console.log(`OK: added "Best Hotels in ${name}" subheading`);
}

post.content = content;
post.modified = "2026-08-05 19:00:00";

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log("Saved.");
