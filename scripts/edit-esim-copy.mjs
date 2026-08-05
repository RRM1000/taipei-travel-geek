import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const idx = posts.findIndex((p) => p.slug === "taiwan-sim-cards");
const post = posts[idx];
let content = post.content;

const edits = [
  {
    label: "remove messaging-apps sentence",
    from: ` While you won't be able to make standard phone calls, you can use messaging apps like WhatsApp, LINE, Messenger, and FaceTime for calling.`,
    to: "",
  },
  {
    label: "remove 'rough guide' paragraph",
    from: `<p>As a rough guide: if you're mainly using maps, messaging apps and light browsing, 1&ndash;3GB per day comfortably covers a typical day of sightseeing. If you'll be streaming video, sharing your hotspot, or working remotely, go Unlimited.</p>\n\n`,
    to: "",
  },
  {
    label: "reword Chunghwa Telecom sentence",
    from: `<p>This eSIM runs on <strong>Chunghwa Telecom</strong> &ndash; the same network we recommend elsewhere on this page for having Taiwan's best coverage, including in more remote and mountainous regions, so you're not trading network quality for convenience.</p>`,
    to: `<p>This eSIM runs on <strong>Chunghwa Telecom</strong> &ndash; considered the best in Taiwan for speed and coverage, including in more remote and mountainous regions, so you're not trading network quality for convenience.</p>`,
  },
];

for (const edit of edits) {
  if (!content.includes(edit.from)) {
    console.error(`NOT FOUND: ${edit.label}`);
    process.exit(1);
  }
  content = content.replace(edit.from, edit.to);
  console.log(`OK: ${edit.label}`);
}

post.content = content;
post.modified = "2026-08-05 10:00:00";
fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log("Saved.");
