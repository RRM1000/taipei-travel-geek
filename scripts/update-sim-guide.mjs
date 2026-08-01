import fs from "node:fs";
import path from "node:path";

const file = path.join(process.cwd(), "content", "posts.json");
const posts = JSON.parse(fs.readFileSync(file, "utf8"));
const guide = posts.find((post) => post.slug === "taiwan-sim-cards");
if (!guide) throw new Error("Taiwan SIM guide not found.");

const table = `<table class="wp-block-table"><thead><tr><th>Length</th><th>Chunghwa Telecom<br/>4G airport price</th><th>Taiwan Mobile<br/>4G reservation price</th><th>Far EasTone<br/>4G airport price</th></tr></thead><tbody><tr><td>3 days</td><td>NT$300</td><td>NT$270</td><td>NT$300</td></tr><tr><td>5 days</td><td>NT$300</td><td>NT$270</td><td>NT$300</td></tr><tr><td>7 days</td><td>NT$500</td><td>NT$405</td><td>NT$450</td></tr><tr><td>8 days</td><td>–</td><td>–</td><td>NT$450</td></tr><tr><td>10 days</td><td>NT$500</td><td>NT$450</td><td>NT$500</td></tr><tr><td>15 days</td><td>NT$700</td><td>–</td><td>NT$700</td></tr><tr><td>30 days</td><td>NT$1,000</td><td>–</td><td>NT$1,000</td></tr></tbody></table>`;
const firstTableStart = guide.content.indexOf("<table");
const firstTableEnd = guide.content.indexOf("</table>", firstTableStart) + "</table>".length;
const updateNote = `<p><strong>Updated August 2026:</strong> current 4G tourist SIM prices at Taoyuan Airport. Taiwan Mobile’s figures require free online reservation and payment on collection. T Star is no longer listed separately following its merger with Taiwan Mobile.</p>`;
const klookSimUrl = "https://www.klook.com/en-GB/activity/95592-4g-5g-sim-taiwan/?aid=8733";
const klookSimCta = `<p class="article-klook-cta"><a href="${klookSimUrl}" target="_blank" rel="sponsored noopener noreferrer">Browse Taiwan SIM cards on Klook <span aria-hidden="true">→</span></a></p>`;
const noteStart = guide.content.lastIndexOf("<p>", firstTableStart);
guide.content = guide.content.slice(0, noteStart) + updateNote + table + guide.content.slice(firstTableEnd);
guide.content = guide.content
  .replace(/Last Updated April 2023/gi, "Last Updated August 2026")
  .replace(/<ins\b[^>]*\bclass="[^"]*klookaff[^"]*"[^>]*>[\s\S]*?<\/ins>/gi, klookSimCta)
  .replace(/https:\/\/www\.klook\.com\/en-GB\/activity\/17268-4g-sim-card-taiwan\/\?aid=8733/gi, klookSimUrl)
  .replace(/https:\/\/www\.klook\.com\/en-GB\/city\/19-taipei\/\?aid=8733/gi, klookSimUrl)
  .replace(/<cite>Currently Unavailable from Klook<\/cite>/gi, "")
  .replace(/;\s*<strong>T-Star<\/strong>\s*=\s*T-Star/g, "")
  .replace(/<li><a href="#T-Star"[\s\S]*?<\/ul><\/li>/, "")
  .replace(/<p>If you are staying in Taiwan for <strong>60 days or more<\/strong>, then <strong>T-Star<\/strong> has the only long term SIMs available\.<\/p>/, "<p>For stays longer than 30 days, check Taiwan Mobile’s current long-term prepaid options before travelling.</p>")
  .replace(/<h3 id="T-Star">[\s\S]*?(?=<h3 id="FarEasTone">)/, "");
guide.title = "Taiwan SIM Cards - 2026 Price Comparison & Deals";
guide.modified = "2026-08-01 09:00:00";
fs.writeFileSync(file, `${JSON.stringify(posts, null, 2)}\n`);
console.log("Updated Taiwan SIM guide.");
