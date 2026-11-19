import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // Old WordPress image URLs (/wp-content/uploads/...) are still indexed by
  // Google Images and old backlinks. The files themselves survived the
  // migration under /media/... with the same year/month/filename structure -
  // only the prefix changed. Without this, every one of those old links
  // 404s to the custom not-found page, which still fires a GA pageview for
  // the dead image URL (that's why they show up in Realtime > Pages).
  async rewrites() {
    return [
      {
        source: "/wp-content/uploads/:path*",
        destination: "/media/:path*",
      },
    ];
  },

  // "nice-convenience-stores" was merged into "taipei-convenience-stores" (its
  // five stores now live in that post's "Themed" section) - redirect the old
  // URL rather than let indexed links and backlinks 404.
  async redirects() {
    return [
      // Journey by Mediavine keeps the full ads.txt current at its own
      // address (the ID is the one in the Journey tag in app/layout.tsx).
      {
        source: "/ads.txt",
        destination: "https://adstxt.journeymv.com/sites/befe1e9e-43fc-4b40-b611-9d7c139224cb/ads.txt",
        permanent: true,
      },
      {
        source: "/nice-convenience-stores",
        destination: "/taipei-convenience-stores#Themed",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
