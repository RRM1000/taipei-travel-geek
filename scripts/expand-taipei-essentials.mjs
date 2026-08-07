import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const post = posts.find((p) => p.slug === "taipei-essentials-guide");
if (!post) { console.error("Post not found"); process.exit(1); }
let content = post.content;

const replacements = [
  {
    old: `<p>If you're only in Taipei for a few days, these are the places you visit must see, restaurants to dine in, and things you will need for your trip.</p>`,
    new: `<p>If you're only in Taipei for a few days, you'll want to make every one of them count. This checklist rounds up the places you really shouldn't miss, the restaurants worth planning a meal around, and the practical things worth sorting out early so the rest of your trip runs smoothly.</p>`,
  },
  {
    old: `<p>Taiwan's statement to the world that it's on the global stage, it's difficult to miss this statuesque building as it dominates the Taipei skyline. Seeing the view from near the top however, is another thing altogether. </p>`,
    new: `<p>Taiwan's statement to the world that it's on the global stage, it's difficult to miss this statuesque building as it dominates the Taipei skyline from almost anywhere in the city. Seeing the view from near the top, however, is another thing altogether - on a clear day you can see right across the Taipei basin to the surrounding mountains, and it's especially striking after dark when the city lights up below you.</p>`,
  },
  {
    old: `<p>A shrine to Generalissimo Chiang Kai-shek, this huge memorial hall is impressive in its own right, but with two huge concert halls, the Liberty Square Arch and some beautiful gardens also located in the square, it's an attraction not to be missed. </p>`,
    new: `<p>A shrine to Generalissimo Chiang Kai-shek, this huge memorial hall is impressive in its own right, but with two huge concert halls, the Liberty Square Arch and some beautiful gardens also located in the square, it's an attraction not to be missed. Try to time your visit around the hourly changing of the guard ceremony, and leave time to wander the grounds - the square is at its best in the early morning or evening, once the crowds thin out and the light hits the white marble.</p>`,
  },
  {
    old: `<p>The first thing you should buy when entering Taiwan is the increasingly useful Easycard. Accepted on most transportation types, it also offers a 20% discount for all MRT rides and can be used to purchase items in many stores. Alternatively, a Fun Pass includes an Easycard or gives you unlimited travel on public transport, plus it can be used to gain free entry to many top attractions.</p>`,
    new: `<p>The first thing you should buy when entering Taiwan is the increasingly useful EasyCard. Accepted on almost every form of transport in the city, it also offers a 20% discount on MRT rides and doubles up as a payment card in convenience stores, some restaurants, and even vending machines. Alternatively, if you're planning to pack a lot of sightseeing into a short trip, a Fun Pass includes an EasyCard and gives you unlimited travel on public transport, plus free or discounted entry to many of the city's top attractions - worth doing the maths on if your itinerary is a busy one.</p>`,
  },
  {
    old: `<p>A trip to Taiwan wouldn't be complete without visiting a night market. The biggest and most touristic of all these, Shilin offers something for everyone -  games, shops, massages, and of course many food and drink stalls. To avoid the crowds and queues, I would recommend starting early in the evening.</p>`,
    new: `<p>A trip to Taiwan wouldn't be complete without visiting a night market, and Shilin is the classic starting point. The biggest and most touristic of all of them, it offers something for everyone - games, shops, massages, and of course an overwhelming amount of food and drink stalls spread across a warren of alleys and an underground food court. To avoid the worst of the crowds and queues, I'd recommend starting early in the evening, before it fills right up.</p>`,
  },
  {
    old: `<p>With the largest collection of ancient Chinese artefacts in the world, the National Palace Museum is a must visit attraction for history buffs. With many pieces of art and antiquities on display, including the beautiful Jadeite Cabbage, you could spend countless hours here.</p>`,
    new: `<p>With the largest collection of ancient Chinese artefacts in the world, the National Palace Museum is a must-visit attraction for history buffs and casual visitors alike. With hundreds of thousands of pieces of art and antiquities on display, including the famously intricate Jadeite Cabbage, you could easily spend a full day here - though even a couple of hours will give you a good sense of just how vast the collection is.</p>`,
  },
  {
    old: `<p>The world famous Din Tai Fung restaurant, located around the world including the recent London branch, is best experienced in the country it originated from. There are many branches to choose from in Taipei, although getting a table can be tricky. Read my guide for tips on avoiding the queues.</p>`,
    new: `<p>The world-famous Din Tai Fung restaurant, with branches now scattered across the globe including a recent London opening, is best experienced in the country it originated from. There are many branches to choose from in Taipei, each turning out the same delicately pleated xiaolongbao the chain is famous for, although getting a table can be tricky at peak times. Read my guide for tips on avoiding the queues.</p>`,
  },
  {
    old: `<p>For seafood lovers, look no further than Addiction Aquatic Development. Taipei's largest fish market is surrounded by many seafood restaurants, an aquamarine and a great little supermarket. The char-grill restaurant has some nice covered outdoor seating and is one of the best places to dine in Taipei.</p>`,
    new: `<p>For seafood lovers, look no further than Addiction Aquatic Development. Taipei's largest fish market is surrounded by a cluster of seafood restaurants, an aquarium and a great little supermarket, making it easy to spend a couple of hours browsing even if you're not planning to eat. The char-grill restaurant has some nice covered outdoor seating and is genuinely one of the best places to dine in Taipei, especially if you like your seafood fresh and simply cooked.</p>`,
  },
  {
    old: `<p>Although it's not as popular as the Longshan Temple, the Confucius Temple is one of the most beautiful and serine temples in Taiwan. As an added attraction it's located right next to the Baoan Temple and Gardens.</p>`,
    new: `<p>Although it's not as popular as the Longshan Temple, the Confucius Temple is one of the most beautiful and serene temples in Taiwan, with a quiet, contemplative atmosphere that's quite different from the incense-filled bustle of the city's other major temples. As an added bonus, it's located right next to the equally striking Baoan Temple and its gardens, so it's easy to combine both into one peaceful stop.</p>`,
  },
  {
    old: `<p>One of the best zoos in Asia, Taipei Zoo not only has Pandas, but a huge variety of other exotic beasts from all over the globe, including an area devoted to Taiwan's native animals. The Maokong Gondola, which is a fantastic cable car ride that travels high into the mountains, has two stations right next to the zoo. Both these make a great day out, especially if you have kids.</p>`,
    new: `<p>One of the best zoos in Asia, Taipei Zoo doesn't just have pandas - it's home to a huge variety of exotic animals from all over the globe, including a dedicated area for Taiwan's own native wildlife. Right next door, the Maokong Gondola is a fantastic cable car ride that climbs high into the mountains above the city, ending at a hillside village known for its tea houses and views back over Taipei. Both make a great day out on their own, or combined into one, and are especially good options if you're travelling with kids.</p>`,
  },
  {
    old: `<p>Please read our guide to Taipei, for useful information and tips regarding your stay. </p>`,
    new: `<p>For everything else you'll need to know before and during your trip - from visas and SIM cards to weather, safety and general etiquette - it's worth reading our full guide to Taipei.</p>`,
  },
  {
    old: `<p>Please read our guide on public transportation in Taipei. How to travel from both airports, and the different options to travel within the city, or using the High Speed Rail to travel to other cities.</p>`,
    new: `<p>Getting around is one of the easiest parts of visiting Taipei, but it helps to know your options before you land. Our guide covers how to travel in from both airports, the different ways to get around within the city, and how to use the High Speed Rail if you're planning to head to other cities during your trip.</p>`,
  },
];

for (const { old, new: replacement } of replacements) {
  if (!content.includes(old)) { console.error("Anchor not found:", old.slice(0, 60)); process.exit(1); }
  content = content.replace(old, replacement);
}

post.content = content;
post.modified = "2026-08-07 13:30:00";

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log("Expanded taipei-essentials-guide with more comprehensive wording.");
