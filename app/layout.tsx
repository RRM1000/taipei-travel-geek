import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

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
    apple: "/icon-192.png",
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
          </>
        )}
      </head>
      <body>{children}</body>
    </html>
  );
}

