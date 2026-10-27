// Bring the five original walks up to the standard of the three new ones
// (scripts/add-new-walks.mjs): every fact re-checked live on 27 Oct 2026, and
// the same sections - The Route, Step-By-Step, Where to Eat, Best Time to Go,
// Getting There and Back, Common Questions, Carry On Walking. The owner's own
// observations and all the original photos are kept; "Perfect For" goes.
//
// The rewritten bodies are in data/walks-posts/<slug>.json, and the sources
// and claim tables in data/research/<slug>-refresh.md. Notable changes:
// Sun Yat-sen Memorial Hall now due to reopen in 2027; the Taipei 101 ticket
// desk has moved; the Indigenous Cultural Centre on the Datong walk was
// demolished; the original Din Tai Fung is takeaway only; the Taipei Guest
// House opens on selected Saturdays; the Water Park and Treasure Hill hours.
//
// Checks before writing: each post still has its map marker, the walk-stop
// markers match the map data one for one, and every internal link, #anchor
// and image resolves.

import fs from "fs";
import path from "path";

const DATE = "2026-10-27 12:00:00";
const SLUGS = ["daan-walking-route", "zhongzheng-walking-route", "gongguan-walking-route", "datong-walking-route", "songshan-xinyi-walking-tour"];

const filePath = path.resolve(process.env.POSTS_PATH || "content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const bySlug = new Map(posts.map((p) => [p.slug, p]));
const fail = (m) => { console.error(`${m} - aborting, nothing written.`); process.exit(1); };
const exists = (url) => fs.existsSync(path.resolve("public" + decodeURI(url.split("#")[0])));

const updates = [];
for (const slug of SLUGS) {
  const post = bySlug.get(slug);
  if (!post) fail(`/${slug} not found`);
  const draft = JSON.parse(fs.readFileSync(path.resolve(`data/walks-posts/${slug}.json`), "utf8"));
  if (draft.slug !== slug) fail(`${slug}: draft slug is ${draft.slug}`);
  if (draft.title.length > 60) fail(`${slug}: title is ${draft.title.length} chars`);
  const c = draft.content;
  if (!c.includes(`<div data-walk-route="${slug}"></div>`)) fail(`${slug}: map marker missing`);

  // Stop markers must match the map: stop-N for one route, <id>-stop-N for two.
  const walk = JSON.parse(fs.readFileSync(path.resolve(`data/walks/${slug}.json`), "utf8"));
  for (const route of walk.routes) {
    for (const stop of route.stops) {
      const id = walk.routes.length > 1 ? `${route.id}-stop-${stop.number}` : `stop-${stop.number}`;
      if (!c.includes(`id="${id}"`)) fail(`${slug}: no marker for ${id}`);
    }
  }

  for (const [, src] of c.matchAll(/<img [^>]*src="([^"]+)"/g)) if (src.startsWith("/") && !exists(src)) fail(`${slug}: image ${src} missing`);
  for (const [, href] of c.matchAll(/href="(\/[^"]*)"/g)) {
    if (href.startsWith("/media/")) { if (!exists(href)) fail(`${slug}: ${href} missing`); continue; }
    const [pathPart, anchor] = href.split("#");
    const target = pathPart.replace(/^\/|\/$/g, "");
    if (target.startsWith("category/") || target === "") continue;
    const page = bySlug.get(target);
    if (!page) fail(`${slug}: link to ${href} - no such page`);
    if (anchor && target !== slug && !page.content.includes(`id="${anchor}"`)) fail(`${slug}: link to ${href} - no #${anchor} there`);
  }
  updates.push([post, draft]);
}

for (const [post, draft] of updates) {
  post.title = draft.title;
  post.excerpt = draft.excerpt;
  post.content = draft.content.trimEnd() + "\n";
  post.modified = DATE;
  console.log(`/${post.slug}: ${post.title}`);
}
fs.writeFileSync(filePath, JSON.stringify(posts, null, 2) + "\n");
