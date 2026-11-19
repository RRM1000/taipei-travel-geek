// Replaces the 2019 WordPress privacy policy (comments, logins, Gravatar:
// none of which the site has any more) with one that describes what the site
// does now, including Mediavine's required programmatic advertising wording,
// verbatim with its heading and version number
// (https://help.mediavine.com/privacy-policy-language), as on London Travel Geek.
import fs from "fs";
import path from "path";

const filePath = path.resolve(process.env.POSTS_PATH || "content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const post = posts.find((p) => p.slug === "privacy-policy");
if (!post) { console.error("privacy-policy post not found; nothing written."); process.exit(1); }
if (!post.content.includes("Gravatar")) { console.error("Policy is not the 2019 version; nothing written."); process.exit(1); }

const ext = 'target="_blank" rel="noreferrer noopener nofollow"';

const mediavine = `<h3>Mediavine Programmatic Advertising (Ver 1.1)</h3><p>The Website works with Mediavine to manage third-party interest-based advertising appearing on the Website. Mediavine serves content and advertisements when you visit the Website, which may use first and third-party cookies. A cookie is a small text file which is sent to your computer or mobile device (referred to in this policy as a “device”) by the web server so that a website can remember some information about your browsing activity on the Website.</p><p>First party cookies are created by the website that you are visiting. A third-party cookie is frequently used in behavioral advertising and analytics and is created by a domain other than the website you are visiting. Third-party cookies, tags, pixels, beacons and other similar technologies (collectively, “Tags”) may be placed on the Website to monitor interaction with advertising content and to target and optimize advertising. Each internet browser has functionality so that you can block both first and third-party cookies and clear your browser’s cache. The "help" feature of the menu bar on most browsers will tell you how to stop accepting new cookies, how to receive notification of new cookies, how to disable existing cookies and how to clear your browser’s cache. For more information about cookies and how to disable them, you can consult the information at <a href="https://www.allaboutcookies.org/manage-cookies/" ${ext}>All About Cookies</a>.</p><p>Without cookies you may not be able to take full advantage of the Website content and features. Please note that rejecting cookies does not mean that you will no longer see ads when you visit our Site. In the event you opt-out, you will still see non-personalized advertisements on the Website.</p><p>The Website collects the following data using a cookie when serving personalized ads:</p><ul><li>IP Address</li><li>Operating System type</li><li>Operating System version</li><li>Device Type</li><li>Language of the website</li><li>Web browser type</li><li>Email (in hashed form)</li></ul><p>Mediavine Partners (companies listed below with whom Mediavine shares data) may also use this data to link to other end user information the partner has independently collected to deliver targeted advertisements. Mediavine Partners may also separately collect data about end users from other sources, such as advertising IDs or pixels, and link that data to data collected from Mediavine publishers in order to provide interest-based advertising across your online experience, including devices, browsers and apps. This data includes usage data, cookie information, device information, information about interactions between users and advertisements and websites, geolocation data, traffic data, and information about a visitor’s referral source to a particular website. Mediavine Partners may also create unique IDs to create audience segments, which are used to provide targeted advertising.</p><p>If you would like more information about this practice and to know your choices to opt-in or opt-out of this data collection, please visit <a href="https://thenai.org/opt-out/" ${ext}>National Advertising Initiative opt out page</a>. You may also visit <a href="http://optout.aboutads.info/#/" ${ext}>Digital Advertising Alliance website</a> and <a href="http://optout.networkadvertising.org/#" ${ext}>Network Advertising Initiative website</a> to learn more information about interest-based advertising. You may download the AppChoices app at <a href="https://youradchoices.com/appchoices" ${ext}>Digital Advertising Alliance’s AppChoices app</a> to opt out in connection with mobile apps, or use the platform controls on your mobile device to opt out.</p><p>For specific information about Mediavine Partners, the data each collects and their data collection and privacy policies, please visit <a href="https://www.mediavine.com/ad-partners/" ${ext}>Mediavine Partners</a>.</p>`;

post.content = `<p><em>Last updated: 19 November 2026</em></p>
<h2>Who we are</h2>
<p>Taipei Travel Geek is an independent travel guide to Taipei. Our website address is <a href="https://www.taipeitravelgeek.com">https://www.taipeitravelgeek.com</a>. If you have any questions about this policy, email <a href="mailto:taipeitravelgeek@gmail.com">taipeitravelgeek@gmail.com</a>.</p>
<h2>What we collect directly</h2>
<p>The site has no user accounts, comments or email signup form, so we do not ask you for your name, email address or any other personal details. If you email us, we keep your message and email address only for as long as we need to reply.</p>
<h2>Advertising</h2>
<p>We show ads to help pay for the site. Those ads are managed by Mediavine (through its Journey programme), which may use cookies and similar technologies as described below.</p>
${mediavine}
<h2>Analytics</h2>
<p>We use Google Analytics 4 to understand which pages people read, how they arrive and which links they click, including clicks on our affiliate links. Google Analytics sets cookies and processes information such as your device, browser, approximate location and the pages you visit. We see this only as totals and trends, not as named individuals. You can read <a href="https://policies.google.com/privacy" ${ext}>Google’s privacy policy</a> or install the <a href="https://tools.google.com/dlpage/gaoptout" ${ext}>Google Analytics opt-out add-on</a>.</p>
<h2>Affiliate links</h2>
<p>Some links on the site, for example to Klook, KKday, Wise and hotel booking sites, are affiliate links. If you click one and make a booking, we may earn a commission at no extra cost to you. When you follow one of these links, the company you visit may set its own cookies to record that you came from us. Some pages also show booking widgets loaded from Klook. Their own privacy policies apply to that data.</p>
<h2>Embedded content from other websites</h2>
<p>Articles include embedded maps from Google Maps and OpenStreetMap, and occasionally a YouTube video. Embedded content behaves in the same way as if you had visited the other website: those websites may collect data about you, use cookies and track your interaction with the embedded content, particularly if you are signed in to them.</p>
<h2>Hosting and technical logs</h2>
<p>The site is hosted on Cloudflare. Like any web host, Cloudflare processes standard technical information, such as IP addresses, browser details and request logs, to deliver the site and protect it from abuse. Cloudflare’s own privacy terms apply to that processing.</p>
<h2>Your choices and rights</h2>
<p>You can block or delete cookies in your browser settings, and use the opt-out links above for personalised advertising and Google Analytics. Depending on where you live, you may have the right to ask what personal data we hold about you and to ask us to delete it. Because we collect very little directly, most requests are best made to the services named above, but you are welcome to email us and we will help where we can.</p>
<h2>Changes to this policy</h2>
<p>We will update this page when the services we use change. The date at the top shows when it was last revised.</p>`;

post.modified = "2026-11-19 12:00:00";
fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log("Privacy policy updated:", post.content.length, "chars");
