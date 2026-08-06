import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const post = posts.find((p) => p.slug === "taipei-public-transport");
if (!post) { console.error("Post not found"); process.exit(1); }
let content = post.content;

const oldSection = `<p>YouBikes are a great way to get around Taipei if you're feeling active.</p>



<figure class="wp-block-image aligncenter is-resized"><a href="/taipei-youbike"><img src="/media/2019/09/YouBike-Taipei-7-1024x728.jpg" alt="YouBike Taipei" class="wp-image-4797" width="512" height="364"/></a></figure>



<p>With hundreds of YouBike stations, and thousands of bikes available, this is a nice option if you want to explore the city at a more personal level. Bike lanes can be found on most major roads, and even extend all the up to Danshui in the north.</p>



<p>The first 30 minutes of rental are free, then NT$10 per 30 minutes for the next 4 hours. There are also discounts if you hire a bike within 60 minutes of using the MRT or city bus.</p>



<p>To rent a YouBike, you will need two things:</p>



<ul><li><a href="/taiwan-easycard">EasyCard</a></li><li><a href="/taiwan-sim-cards">Taiwanese SIM card</a></li></ul>



<p>For further details on how to rent these, please visit my post below.</p>`;

if (!content.includes(oldSection)) {
  console.error("Old YouBikes section not found — aborting without changes.");
  process.exit(1);
}

const newSection = `<p>YouBikes are a great way to get around Taipei if you're feeling active.</p>



<figure class="wp-block-image aligncenter is-resized"><a href="/taipei-youbike"><img src="/media/2019/09/YouBike-Taipei-7-1024x728.jpg" alt="YouBike Taipei" class="wp-image-4797" width="512" height="364"/></a></figure>



<p>With hundreds of YouBike stations, and thousands of bikes available, this is a nice option if you want to explore the city at a more personal level. Bike lanes can be found on most major roads, and even extend all the up to Danshui in the north.</p>



<p>You'll spot two types of bike at most stations: the standard yellow <strong>YouBike 2.0</strong>, and the orange <strong>YouBike 2.0E</strong>, which has electric pedal-assist to help you up the hills.</p>



<p>The first 30 minutes of rental are free, then it's <strong>NT$10 per 30 minutes</strong> for the next 4 hours on a standard bike (the electric 2.0E costs more - NT$20 per 30 minutes for the first 2 hours, then NT$40 per 30 minutes after that). You'll also get a <strong>NT$5 discount</strong> if you hire a bike within 60 minutes of tapping out of the MRT or a city bus.</p>



<p>Since <strong>January 2026</strong>, every rider - tourists included - has to register for free Public Bicycle Injury Insurance before their first ride. It only takes a couple of minutes in the YouBike app and you can use your passport number if you don't have a Taiwanese ID.</p>



<p>To rent a YouBike, you'll need one of the following:</p>



<ul><li>An <a href="/taiwan-easycard">EasyCard</a>, registered to a YouBike account via the app or website, or</li><li>The YouBike app itself, which now works with a foreign phone number, email address, or credit card - so a Taiwanese SIM card isn't essential anymore</li></ul>



<p>For further details on how to rent these, please visit my post below.</p>`;

content = content.replace(oldSection, newSection);
post.content = content;
post.modified = "2026-08-06 10:00:00";

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log("Updated YouBikes section on taipei-public-transport.");
