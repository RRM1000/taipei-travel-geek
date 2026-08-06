import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const post = posts.find((p) => p.slug === "where-to-have-lunch");
if (!post) { console.error("Post not found"); process.exit(1); }
let content = post.content;

const oldGap = `<p>Vouchers for these can be purchased on Klook for either weekdays or weekends (which cost slightly more) with dining hours between 11:30-14:00.</p>



<hr class="wp-block-separator has-css-opacity"/>




<hr class="wp-block-separator has-css-opacity"/>`;

const newGap = `<p>Vouchers for these can be purchased on Klook for either weekdays or weekends (which cost slightly more) with dining hours between 11:30-14:00.</p>



<hr class="wp-block-separator has-css-opacity"/>



<ins class="klk-aff-widget" data-adid="644571" data-lang="" data-currency="" data-cardh="126" data-padding="92" data-lgh="470" data-edgevalue="655" data-prod="static_widget" data-amount="1"><a href="//www.klook.com/">Klook.com</a></ins>




<hr class="wp-block-separator has-css-opacity"/>`;

if (!content.includes(oldGap)) { console.error("Anchor not found — aborting."); process.exit(1); }
content = content.replace(oldGap, newGap);

post.content = content;
post.modified = "2026-08-06 18:40:00";

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log("Re-added the 644571 widget to where-to-have-lunch.");
