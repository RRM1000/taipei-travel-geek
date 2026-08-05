import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));

const fixes = [
  {
    slug: "taipei-fun-pass",
    from: "https://www.klook.com/en-US/activity/21808-fun-pass-taipei/?aid=8733",
    to: "https://www.klook.com/en-GB/activity/26547-taipei-exploring-fun-pass/?aid=8733",
    note: "dead product (redirected to Klook homepage) -> live Taipei Exploring Fun Pass",
  },
  {
    slug: "taipei-sightseeing-bus",
    from: "https://www.klook.com/en-US/activity/20042-taipei-double-decker-sightseeing-bus-ticket/?aid=8733",
    to: "https://www.klook.com/en-GB/activity/2921-double-decker-bus-tour-taipei/?aid=8733",
    note: "dead product (silently reassigned to a Manila, Philippines resort pass) -> live current sightseeing bus listing",
  },
  {
    slug: "taipei-annual-events",
    from: "https://www.klook.com/en-GB/event-detail/101014861-2023-cats-musical-taipei/",
    to: "https://www.klook.com/en-GB/search/result/?query=Taipei%20events&aid=8733",
    note: "stale 2023 one-off event page -> durable, self-updating Taipei events search",
    replaceAll: true,
  },
  {
    slug: "taipei-annual-events",
    from: "https://www.klook.com/en-GB/event-detail/101014030-2023-creamfields-taiwan/?aid=8733",
    to: "https://www.klook.com/en-GB/search/result/?query=Taipei%20events&aid=8733",
    note: "stale 2023 one-off event page -> durable, self-updating Taipei events search",
  },
  {
    slug: "taipei-101-fireworks-new-years-eve",
    from: "https://www.klook.com/activity/7906-taipei-101-new-years-eve-observatory-party-tickets/?aid=8733",
    to: "https://www.klook.com/en-GB/search/result/?query=Taipei%20101%20New%20Year&aid=8733",
    note: "stale 2022 one-off event page -> durable search (surfaces the seasonal NYE ticket when Klook lists it, falls back to the Taipei 101 Observatory ticket otherwise)",
  },
];

for (const fix of fixes) {
  const idx = posts.findIndex((p) => p.slug === fix.slug);
  if (idx === -1) {
    console.error(`Post not found: ${fix.slug}`);
    process.exit(1);
  }
  const post = posts[idx];
  const before = post.content.split(fix.from).length - 1;
  if (before === 0) {
    console.error(`Pattern not found in ${fix.slug}: ${fix.from}`);
    process.exit(1);
  }
  post.content = fix.replaceAll
    ? post.content.split(fix.from).join(fix.to)
    : post.content.replace(fix.from, fix.to);
  const after = post.content.split(fix.from).length - 1;
  console.log(`${fix.slug}: replaced ${before - after} occurrence(s) — ${fix.note}`);
  post.modified = "2026-08-05 06:00:00";
}

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log("Done.");
