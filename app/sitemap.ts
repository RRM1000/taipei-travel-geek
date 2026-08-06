import type { MetadataRoute } from "next";
import { categories, posts } from "@/lib/content";

const BASE_URL = "https://www.taipeitravelgeek.com";

export default function sitemap(): MetadataRoute.Sitemap {
  // Note: unlisted posts (see `unlistedSlugs` in lib/content.ts) are
  // deliberately still included here. Sitemap presence doesn't promote a
  // page to visitors - it's just a crawl hint - so keeping it in preserves
  // whatever search ranking it already has while it's hidden from on-site
  // navigation, pending a content refresh.
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/${post.slug}`,
    lastModified: new Date(post.modified || post.date),
    changeFrequency: "weekly",
    priority: post.type === "page" ? 0.8 : 0.7,
  }));

  const categoryEntries: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${BASE_URL}/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/taipei-guide`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  return [...staticPages, ...categoryEntries, ...postEntries];
}
