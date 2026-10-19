// Brings ten venue and list pages into line with the October 2026 research
// (data/research/*.md) behind the refreshed cafes, cheap-coffee, salads and
// healthy lists. Each venue page gets a dated update box at the top, so the
// original first-hand review stays as written, plus the specific fixes:
// prices, branches, nearest stations and hours. The research was
// snippet-only, so closures that rest on one source are worded "reported".
//
// Usage: node scripts/update-venue-pages-oct-2026.mjs [--write]
import fs from "node:fs";

const FILE = "content/posts.json";
const MODIFIED = "2026-10-19 12:00:00";
const write = process.argv.includes("--write");
const posts = JSON.parse(fs.readFileSync(FILE, "utf8"));

const notice = (text) =>
  `<div class="update-notice" style="background-color: #e8f5e9; border-left: 4px solid #43a047; padding: 12px 16px; margin-bottom: 20px; border-radius: 4px;">
 <p style="margin: 0; color: #1b5e20; font-weight: bold;">Updated October 2026</p>
 <p style="margin: 4px 0 0 0; color: #1b5e20;">${text}</p>
</div>

`;

const maps = (query) =>
  `https://www.google.com/maps/search/?api=1&amp;query=${encodeURIComponent(query).replace(/%20/g, "%20")}`;

// slug -> { notice?: html text, edits?: [find, replace][] }
const UPDATES = {
  louisa: {
    notice:
      "Louisa raised its prices in January 2026: a medium Americano is now NT$60 and a medium latte NT$80 (about NT$100 for a large). There's still no company-wide time limit, but some branches ask you to re-order if you leave your seat for 20&ndash;30 minutes, and there's no reliable Louisa WiFi network. See our guide to <a href=\"/cheap-coffee\">cheap coffee in Taipei</a> for how it compares.",
    edits: [
      [
        "here they only cost <strong>NT$80</strong> and are pretty good too.",
        "here a large is about <strong>NT$100</strong> (NT$80 for a medium) and pretty good too.",
      ],
    ],
  },
  "yaboo-cafe": {
    notice:
      "Yaboo now asks people to leave after three hours when it's full, takes cash only and doesn't take bookings, so arrive before 2pm at weekends. It opens from 12:00 on weekdays and 11:00 at weekends, until midnight. It's on our list of the best <a href=\"/best-cafes-to-work\">cafes to work from in Taipei</a>.",
    edits: [
      [
        "If it's too busy here, their sister cafe <strong>YABOO II</strong> is a few minutes' walk away on Lishui Street &ndash; a brighter, more work-friendly space, though I've not been myself.",
        "If it's too busy here, their sister cafe <strong>YABOO II</strong> is a few minutes' walk away at 10-1, Alley 9, Lishui Street &ndash; a brighter, more work-friendly space with no time limit, open from 2pm and closed on Thursdays, though I've not been myself.",
      ],
    ],
  },
  "campus-cafe": {
    notice:
      "Campus Café's own website now lists only two branches: Nanjing (Songshan) and Taipei Dome. The Neihu branch is reported closed, and we couldn't confirm that the Daan (Zhongxiao) or Zhongzheng branches are still open, so check Google Maps before you go.",
  },
  "hungry-pans": {
    notice:
      "Hungry Pans' own branch list now names three Taipei branches: by Taipei Medical University on Zhuangjing Road, on Ningbo West Street near Chiang Kai-shek Memorial Hall, and on Siyuan Street in Gongguan. The Shin Kong Mitsukoshi A4 branch no longer appears. We couldn't confirm 2026 opening hours for any of them, so check Google Maps first. Prices have also gone up since this review.",
    edits: [
      [
        `<p class="location-line">📍 <strong>Branch 1</strong><br>Closest MRT: <br>City Hall (blue line - exit 3)<br>Not yet of Google Maps but it's in B1 of Shin Kong A4</p>`,
        `<p class="location-line">📍 <a href="${maps("Hungry Pans 寧波西街24號")}" target="_blank" rel="noreferrer noopener">Ningbo Branch</a>, 24 Ningbo West Street (closest MRT: Chiang Kai-shek Memorial Hall)<br><a href="${maps("Hungry Pans 思源街8號")}" target="_blank" rel="noreferrer noopener">Gongguan Branch</a>, 8 Siyuan Street (closest MRT: Gongguan)</p>`,
      ],
      [
        `<p class="location-line">📍 <strong>Branch 2</strong><br>Closest MRT: <br>Taipei 101 (red line - exit 3)</p>`,
        `<p class="location-line">📍 <a href="${maps("Hungry Pans 莊敬路379號")}" target="_blank" rel="noreferrer noopener">Taipei Medical University Branch</a>, 379 Zhuangjing Road (closest MRT: Taipei 101/World Trade Center)</p>`,
      ],
    ],
  },
  "unicofa-coffee": {
    notice:
      "Unicofa appears to have closed most of its public cafes. Its website now lists mainly a shop in Neihu (which may be inside an office building and open to staff only) and its roastery, and we couldn't confirm that any branch below is still open to the public. Check Google Maps before making a trip, or see our guide to <a href=\"/cheap-coffee\">cheap coffee in Taipei</a> for alternatives.",
  },
  "tamed-fox": {
    notice:
      "Tamed Fox now has a second, larger branch at B1, 91 Songren Road in Xinyi, with an outdoor courtyard. Both branches open from 09:00 to 17:30. The original, reviewed here, is at 5, Lane 76, Siwei Road, about five minutes from Daan station.",
    edits: [
      [
        `<p class="location-line">📍 Closest MRT: Xinyi Anhe (red line)</p>`,
        `<p class="location-line">📍 Closest MRT: Daan (red/brown lines)</p>`,
      ],
    ],
  },
  miacucina: {
    notice:
      "The Neihu branch, our favourite, has been reported closed. Miacucina's four other Taipei branches (Fuxing, Xinyi A11, Nanxi and Tianmu) are open, and the Super Protein Buddha Bowl is now around NT$470. At busy times, tables are limited to 90 minutes at Fuxing and two hours at the mall branches.",
    edits: [
      [
        "Their Neihu branch especially, is one of the nicest places we've dined in Taipei.",
        "Their Neihu branch was one of the nicest places we've dined in Taipei, though it has since been reported closed.",
      ],
      [
        "<p>The nicest branch we've been to so far is the Neihu one</p>",
        "<p>Book or arrive early at weekends: at busy times, tables are limited to 90 minutes at Fuxing and two hours at the mall branches.</p>",
      ],
      [
        `<a rel="noreferrer noopener" aria-label="Shilin Branch" href="https://goo.gl/maps/JP1y2MDZfsGCCs8m9" target="_blank">Shilin Branch</a> (Mingde MRT - exit 1) <br><a rel="noreferrer noopener" aria-label="Neihu Branch" href="https://goo.gl/maps/P7yJ7UkUeyJepGfX6" target="_blank">Neihu Branch</a> (Jiannan Road MRT - exit 3) </p>`,
        `<a rel="noreferrer noopener" aria-label="Tianmu Branch" href="https://goo.gl/maps/JP1y2MDZfsGCCs8m9" target="_blank">Tianmu Branch</a> (Zhishan MRT) </p>`,
      ],
    ],
  },
  "best-vegetarian-restaurants-in-taipei": {
    edits: [
      [
        "Miacucina have five branches around Taipei (Fuxing, Xinyi, Nanxi, Shilin and Neihu)",
        "Miacucina have four branches around Taipei (Fuxing, Xinyi, Nanxi and Tianmu)",
      ],
      [
        "Their Budda Bowls especially, are a knockout, and the Neihu branch is one of the nicest places we've dined in Taipei.</p>",
        "Their Budda Bowls especially, are a knockout.</p>",
      ],
    ],
  },
  "ray-cafe": {
    edits: [
      [
        "Open Monday to Friday 08:00&ndash;18:00, and weekends 10:00&ndash;18:00.",
        "Open Monday to Friday 08:30&ndash;17:30, and weekends 10:00&ndash;18:00.",
      ],
    ],
  },
  "yolos-cafe": {
    notice:
      "Yolo's official branch list now names four cafes: Tong'an Street near Xinyi Anhe, Zhongxiao East Road near Zhongxiao Dunhua, the Hung Kuo Building on Dunhua North Road, and Zhishan. The Zhongshan and Datong branches we listed are no longer on it.",
    edits: [
      [
        ` <br><a rel="noreferrer noopener" aria-label="Zhongshan Branch" href="https://goo.gl/maps/gFmK8t3BaFyffRHX7" target="_blank">Zhongshan Branch</a> (Zhongshan Junior High School MRT - exit 1) <br><a rel="noreferrer noopener" aria-label="Datong Branch" href="https://goo.gl/maps/KxcSPQQMWeKH9pDh6" target="_blank">Datong Branch</a> (Minquan W. Rd. MRT - exit 1) </p>`,
        ` <br><a href="${maps("Yolo's Cafe 通安")}" target="_blank" rel="noreferrer noopener">Tong'an Branch</a> (Xinyi Anhe MRT) <br><a href="${maps("Yolo's Cafe 南京敦北")}" target="_blank" rel="noreferrer noopener">Nanjing Dunbei Branch</a>, Hung Kuo Building, 167 Dunhua North Road (Nanjing Fuxing MRT) <br><a href="${maps("Yolo's Cafe 芝山")}" target="_blank" rel="noreferrer noopener">Zhishan Branch</a> (Zhishan MRT) </p>`,
      ],
    ],
  },
};

let ok = true;
for (const [slug, u] of Object.entries(UPDATES)) {
  const post = posts.find((p) => p.slug === slug);
  if (!post) { console.error(`${slug}: no such post`); ok = false; continue; }
  if (post.content.includes("Updated October 2026")) { console.error(`${slug}: already updated`); ok = false; continue; }
  for (const [find, rep] of u.edits ?? []) {
    const n = post.content.split(find).length - 1;
    if (n !== 1) { console.error(`${slug}: ${n} matches for ${find.slice(0, 60)}`); ok = false; continue; }
    post.content = post.content.replace(find, () => rep);
  }
  if (u.notice) post.content = notice(u.notice) + post.content.replace(/^\s+/, "");
  post.modified = MODIFIED;
  console.log(`${slug}: ${u.notice ? "notice + " : ""}${(u.edits ?? []).length} edit(s)`);
}
if (!ok) { console.error("checks failed - nothing written"); process.exit(1); }
if (write) fs.writeFileSync(FILE, JSON.stringify(posts, null, 2) + "\n");
