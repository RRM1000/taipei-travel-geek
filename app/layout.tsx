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
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;0,6..72,700;1,6..72,400;1,6..72,600&display=swap"
          rel="stylesheet"
        />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-79MKLEGNPH" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-79MKLEGNPH');`}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}

