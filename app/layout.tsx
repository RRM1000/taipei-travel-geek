import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import "./styles/components.css";
import "./styles/layout.css";
import "./styles/media.css";
import { AFFILIATE_HOSTS } from "@/lib/affiliates";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.taipeitravelgeek.com"),
  title: {
    default: "Taipei Travel Geek | Independent Taipei Travel Guides",
    template: "%s | Taipei Travel Geek",
  },
  description: "First-hand guides to Taipei’s food, sights, culture and neighbourhoods.",
  // Google reads the favicon from the home page and prefers a square icon
  // whose size is a multiple of 48px. The .ico is listed first and also sits
  // at the site root, which is where crawlers look when they ignore the tag.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48 96x96", type: "image/x-icon" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    // Home-screen icon: red mark on the header navy (scripts/build-icons.mjs).
    apple: { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  },
  openGraph: {
    type: "website",
    siteName: "Taipei Travel Geek",
    title: "Taipei Travel Geek | Independent Taipei Travel Guides",
    description: "First-hand guides to Taipei’s food, sights, culture and neighbourhoods.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Taipei Travel Geek" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Taipei Travel Geek | Independent Taipei Travel Guides",
    description: "First-hand guides to Taipei’s food, sights, culture and neighbourhoods.",
    images: ["/og.png"],
  },
};

const GA_MEASUREMENT_ID = "G-79MKLEGNPH";

/**
 * Analytics is production-only. Without this gate the dev server loads
 * gtag.js and fires a page_view against the live property on every local
 * page load, so a day's development shows up in the reports as real
 * traffic from http://localhost/.
 *
 * NODE_ENV is "development" under `next dev` and "production" in a build,
 * so this evaluates at render time in the server component and the tags
 * simply never reach the HTML in development.
 */
const analyticsEnabled = process.env.NODE_ENV === "production";

/**
 * Sends an affiliate_click event to GA4 for every click on a link to a host
 * we earn commission from, so the analytics pull can show which pages and
 * placements make money rather than only which ones get read. One delegated
 * listener covers links in post bodies, inline CTAs and the sidebar, including
 * ones added after hydration. auxclick catches middle-click "open in new tab".
 *
 * Parameters: partner (klook, booking...), placement (where on the page;
 * an explicit data-placement on the link or a parent wins, e.g. the hotel
 * guides' "hotel-button"),
 * hotel (the data-hotel id on hotel guide links), link_text and link_url. To
 * report on partner, placement or hotel in GA4, register each as an
 * event-scoped custom dimension under Admin > Custom definitions.
 *
 * Klook's iframe widgets are cross-origin, so clicks inside them never reach
 * this page; those stay in Klook's own dashboard.
 */
const affiliateClickScript = `(function () {
  var hosts = ${JSON.stringify(AFFILIATE_HOSTS)};
  function partnerFor(hostname) {
    var host = hostname.replace(/^www\\./, "");
    for (var i = 0; i < hosts.length; i++) {
      var h = hosts[i];
      if (host === h || host.slice(-h.length - 1) === "." + h) return h.split(".")[0];
    }
    return null;
  }
  function placementFor(a) {
    var tagged = a.closest("[data-placement]");
    if (tagged) return tagged.getAttribute("data-placement");
    if (a.closest(".article-sidebar, .sidebar-section")) return "sidebar";
    if (a.closest(".article-inline-cta")) return "inline_cta";
    if (a.closest(".quick-verdict")) return "quick_verdict";
    if (a.closest("table")) return "table";
    if (a.closest("h2, h3, h4")) return "heading";
    if (a.closest(".article-content")) return "body";
    return "other";
  }
  function track(e) {
    if (e.type === "auxclick" && e.button !== 1) return;
    var a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
    if (!a || typeof gtag !== "function") return;
    var partner = partnerFor(a.hostname || "");
    if (!partner) return;
    gtag("event", "affiliate_click", {
      partner: partner,
      placement: placementFor(a),
      hotel: a.getAttribute("data-hotel") || "(none)",
      link_text: (a.textContent || "").trim().slice(0, 100),
      link_url: a.href.slice(0, 500)
    });
  }
  document.addEventListener("click", track, true);
  document.addEventListener("auxclick", track, true);
})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta name="impact-site-verification" content="595d839b-bb52-4ac2-8be9-c3a805ae5097" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;0,6..72,700;1,6..72,400;1,6..72,600&display=swap"
          rel="stylesheet"
        />
        {analyticsEnabled && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
            </Script>
            <Script id="affiliate-click-tracking" strategy="afterInteractive">
              {affiliateClickScript}
            </Script>
          </>
        )}
      </head>
      <body>{children}</body>
    </html>
  );
}

