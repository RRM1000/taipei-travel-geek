import fs from "fs";
import path from "path";

const filePath = path.resolve("content/posts.json");
const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));

const bannerPath = "/media/2026/08/taiwan-lucky-land-banner.png";

// 1. Update Lucky Land Post (featuredImage & content image)
const luckyPost = posts.find((p) => p.slug === "taiwan-lucky-land-giveaway");
if (luckyPost) {
  luckyPost.featuredImage = bannerPath;
  luckyPost.content = luckyPost.content.replace(
    /<figure class="wp-block-image aligncenter"><img src="\/media\/2019\/04\/easy-card\.jpg" alt="Taiwan Lucky Land EasyCard Prize" class="wp-image-191"\/>/g,
    `<figure class="wp-block-image aligncenter"><img src="${bannerPath}" alt="Taiwan the Lucky Land Official Campaign Banner" class="wp-image-191"/>`
  );
  luckyPost.modified = "2026-08-04 07:33:00";
  console.log("Updated featured image and content image on taiwan-lucky-land-giveaway!");
}

// 2. Update EasyCard Post (Lucky Land section image)
const easyPost = posts.find((p) => p.slug === "taiwan-easycard");
if (easyPost) {
  const luckySectionImageHTML = `<figure class="wp-block-image aligncenter"><img src="${bannerPath}" alt="Taiwan the Lucky Land Official Campaign Banner" class="wp-image-191"/><figcaption>Taiwan the Lucky Land Campaign (NT$5,000 Tourist Prize)</figcaption></figure>`;
  
  // Insert image right under the Lucky Land heading if not present
  if (!easyPost.content.includes(bannerPath)) {
    easyPost.content = easyPost.content.replace(
      `<h2 id="Lucky-Land-Promo">Taiwan Lucky Land NT$5,000 Tourist Campaign</h2>`,
      `<h2 id="Lucky-Land-Promo">Taiwan Lucky Land NT$5,000 Tourist Campaign</h2>\n${luckySectionImageHTML}`
    );
  }
  easyPost.modified = "2026-08-04 07:33:00";
  console.log("Updated Lucky Land image in taiwan-easycard!");
}

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log("Successfully saved updated posts.json with Lucky Land banner!");
