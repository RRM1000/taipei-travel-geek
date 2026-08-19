/**
 * Checks every external link in one post (or all posts) and reports what is
 * dead, redirected or slow.
 *
 *   node scripts/check-links.mjs best-cinemas-in-taipei
 *   node scripts/check-links.mjs --all
 *
 * HEAD first because it is cheap; falls back to GET since plenty of sites
 * reject HEAD. Runs a few at a time so we don't hammer any one host.
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const posts = JSON.parse(fs.readFileSync(path.join(root, "content", "posts.json"), "utf8"));

const arg = process.argv[2];
if (!arg) {
  console.error("usage: node scripts/check-links.mjs <slug|--all>");
  process.exit(1);
}

const targets = arg === "--all" ? posts : posts.filter((p) => p.slug === arg);
if (!targets.length) {
  console.error(`no post with slug "${arg}"`);
  process.exit(1);
}

const UA = "Mozilla/5.0 (compatible; taipeitravelgeek link check)";
const TIMEOUT = 20000;

async function probe(url) {
  const attempt = async (method) => {
    const res = await fetch(url, {
      method,
      redirect: "follow",
      headers: { "User-Agent": UA },
      signal: AbortSignal.timeout(TIMEOUT),
    });
    return res;
  };
  const started = Date.now();
  try {
    let res = await attempt("HEAD");
    // Many sites answer HEAD with 403/405 but serve GET fine.
    if (res.status === 403 || res.status === 405 || res.status === 501) res = await attempt("GET");
    return { status: res.status, finalUrl: res.url, ms: Date.now() - started };
  } catch (error) {
    try {
      const res = await attempt("GET");
      return { status: res.status, finalUrl: res.url, ms: Date.now() - started };
    } catch (error2) {
      return { status: 0, error: String(error2.name || error2), ms: Date.now() - started };
    }
  }
}

const norm = (u) => u.replace(/\/$/, "").replace(/^https?:\/\//, "");

/**
 * The trap: plenty of sites answer a dead URL with 200 and quietly land you
 * on an error page or their homepage. Four Vieshow showtime links on the
 * cinemas post did exactly that. A status code alone calls them healthy, so
 * also treat a redirect into an obvious error page - or from a deep link to
 * a bare homepage - as broken.
 */
const looksBroken = (from, to) => {
  if (!to || norm(to) === norm(from)) return false;
  if (/error|404|not.?found|page-?not/i.test(to)) return true;
  try {
    const target = new URL(to);
    const source = new URL(from);
    const wasDeepLink = source.pathname.replace(/\/$/, "").length > 1;
    const landedAtRoot = target.pathname.replace(/\/$/, "").length <= 1 && !target.search;
    return wasDeepLink && landedAtRoot;
  } catch {
    return false;
  }
};

for (const post of targets) {
  const urls = [...new Set([...(post.content || "").matchAll(/href="(https?:\/\/[^"]+)"/g)].map((m) => m[1]))]
    .map((u) => u.replace(/&amp;/g, "&"))
    // Google Maps place links and affiliate links are checked too, but skip
    // the embed iframes, which are not user-facing links.
    .filter((u) => !u.includes("/maps/embed"));

  if (!urls.length) continue;
  console.log(`\n=== ${post.slug} — ${urls.length} external links ===`);

  const problems = [];
  const BATCH = 4;
  for (let i = 0; i < urls.length; i += BATCH) {
    const slice = urls.slice(i, i + BATCH);
    const results = await Promise.all(slice.map(async (u) => [u, await probe(u)]));
    for (const [url, r] of results) {
      const redirected = r.finalUrl && norm(r.finalUrl) !== norm(url);
      const softDead = looksBroken(url, r.finalUrl);
      let flag = "  ok  ";
      if (r.status === 0) flag = " DEAD ";
      else if (r.status >= 400) flag = ` ${r.status}  `;
      else if (softDead) flag = " BROKEN";
      else if (redirected) flag = " ->   ";
      if (flag.trim() !== "ok" && flag.trim() !== "->") problems.push({ url, ...r, redirected, softDead });
      console.log(`${flag} ${String(r.status).padStart(3)} ${String(r.ms).padStart(5)}ms  ${url.slice(0, 95)}`);
      if (redirected && r.status < 400) console.log(`         redirects to: ${r.finalUrl.slice(0, 95)}`);
    }
  }

  console.log(`\n  ${problems.length} of ${urls.length} need attention`);
}
