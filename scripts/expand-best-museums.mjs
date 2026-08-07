import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
const post = posts.find((p) => p.slug === "best-museums-in-taipei");
if (!post) { console.error("Post not found"); process.exit(1); }
let content = post.content;

const replacements = [
  {
    old: `<p>Taipei has museums that can be enjoyed by both adults and children. Whether you prefer to delve into the ancient past, look at the history of this small island, or prefer something more niche and original, here are some of the best museums in Taipei.</p>`,
    new: `<p>Taipei has museums that can be enjoyed by both adults and children, and there's more variety here than you might expect from such a compact city. Whether you want to delve into the ancient past, get to grips with the more turbulent chapters of this small island's history, or fancy something a little more niche and original, here are some of the best museums Taipei has to offer.</p>`,
  },
  {
    old: `<p>The largest collection of ancient Chinese artefacts in the world, you could spend hours this huge museum. The star of the show is the beautiful Jadeite Cabbage, but there are four floors packed with many impressive artefacts. The palace museum building and surrounding area are equally as impressive.</p>`,
    new: `<p>The largest collection of ancient Chinese artefacts in the world, you could easily spend hours in this huge museum without seeing everything on offer. The star of the show is the famously intricate Jadeite Cabbage, but there are four floors packed with impressive bronzes, ceramics, calligraphy and jade carvings spanning thousands of years of history. The palace museum building itself, along with the surrounding gardens and grounds, is equally impressive and well worth setting aside extra time for.</p>`,
  },
  {
    old: `<p>With two buildings right next to the 228 Peace Park, the National Taiwan Museum features permanent and temporary exhibitions, many of which are child-friendly. These include a large dinosaur exhibition and lots of interactive and fun displays.</p>`,
    new: `<p>With two buildings right next to the 228 Peace Park, the National Taiwan Museum features permanent and temporary exhibitions covering Taiwan's natural history, indigenous cultures and colonial past, many of which are genuinely child-friendly. These include a large dinosaur exhibition and plenty of interactive, hands-on displays, making it a solid option if you're travelling with kids who might otherwise find a museum a hard sell.</p>`,
  },
  {
    old: `<p>The best museum to visit with kids, the Astronomical Museum has 3 floors featuring many interactive exhibits, while it also has an IMAX and 3D theatre showing science related films and documentaries. Also found on the site is a Cosmic Adventure experience and a telescope that's open to the public.</p>`,
    new: `<p>Arguably the best museum in Taipei to visit with kids, the Astronomical Museum has three floors packed with interactive exhibits covering space, gravity and the solar system, alongside an IMAX and 3D theatre showing science-related films and documentaries throughout the day. The site also has a Cosmic Adventure motion-simulator experience and a public telescope, so it's worth checking ahead if you want to catch a clear-night viewing session.</p>`,
  },
  {
    old: `<p>Found within the beautiful 228 Peace Park, this small but important museum documents the troubled events during one of Taiwan's darkest periods. The 228 Incident, also known as the February 28 incident, marked the start of White Terror, where martial law ruled for over 40 years. The incident actually took place at the site of the museum, which was subsequently built to help reflect and educate.</p>`,
    new: `<p>Found within the beautiful 228 Peace Park, this small but genuinely important museum documents one of the darkest periods in Taiwan's history. The 228 Incident, also known as the February 28 Incident, marked the start of the White Terror era, during which martial law ruled the island for close to 40 years. The incident actually took place at this site, and the museum was later built here specifically to help visitors reflect on and understand what happened - it's a sobering but worthwhile stop, and useful context for understanding modern Taiwan.</p>`,
  },
  {
    old: `<p>Although found on the outskirts of New Taipei City within the Danshui region, Fort San Domingo is one of the oldest and most significant buildings in Taiwan. Originally build by the Spanish in 1628, it was subsequently rebuilt by the Dutch and was used as a British consulate for many years. The site also features several other buildings and museums, and is located close to the beautiful Danshui river.</p>`,
    new: `<p>Although it's out on the edge of New Taipei City in the Danshui area, Fort San Domingo is one of the oldest and most historically significant buildings in Taiwan. Originally built by the Spanish in 1628, it was later rebuilt by the Dutch and went on to serve as a British consulate for many years, giving it a genuinely layered, multinational history that's rare to find in one place. The wider site also features several other historic buildings and small museums, and sits close to the beautiful Danshui river, making it easy to combine with a riverside walk or sunset afterwards.</p>`,
  },
  {
    old: `<p>Featuring many finely detailed models from all over the world, the Miniatures Museum of Taiwan has over 100 miniature scenes mainly at a scale of 1:12, and is a great place to visit for both adults and children. One of the finest miniature collections anywhere in the world.</p>`,
    new: `<p>Featuring finely detailed models from all over the world, the Miniatures Museum of Taiwan has over 100 miniature scenes, mostly built at a 1:12 scale, and is a genuinely great place to visit for both adults and children. The level of craftsmanship on display is extraordinary - some of the finest details are only visible with the magnifying glasses provided - and it's widely considered one of the best miniature collections anywhere in the world.</p>`,
  },
  {
    old: `<p>Taiwan's largest university campus has over half-a-dozen museums to explore, including one on anthropology, physics and an insect museum. Click on the link to find out about all the museums located within the NTU campus.</p>`,
    new: `<p>Taiwan's largest university campus is home to more than half a dozen small, specialist museums, covering everything from anthropology and physics to an entire museum dedicated to insects. Most are free to enter and make a nice change of pace from the city's bigger, more polished attractions - click through to find out about all the museums located within the NTU campus.</p>`,
  },
];

for (const { old, new: replacement } of replacements) {
  if (!content.includes(old)) { console.error("Anchor not found:", old.slice(0, 60)); process.exit(1); }
  content = content.replace(old, replacement);
}

post.content = content;
post.modified = "2026-08-07 13:40:00";

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log("Expanded best-museums-in-taipei with more comprehensive wording.");
