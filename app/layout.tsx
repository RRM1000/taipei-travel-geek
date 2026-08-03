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
    images: [{ url: "/og.png", width: 1536, height: 864, alt: "Taipei Travel Geek" }],
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
