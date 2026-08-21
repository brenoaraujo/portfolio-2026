import type { Metadata } from "next";
import { Noto_Serif, DM_Sans, DM_Mono } from "next/font/google";
import { AnalyticsOptOut } from "@/components/analytics/AnalyticsOptOut";
import { Amplitude } from "@/components/analytics/Amplitude";
import { Smartlook } from "@/components/analytics/Smartlook";
import { TrackClicks } from "@/components/analytics/TrackClicks";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION } from "@/lib/config";
import "./globals.css";

// Noto Serif carries voice; DM Sans carries information; DM Mono is present in
// the source file but unused inside the Handoff frames.
const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s — Breno Araujo",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  icons: {
    icon: [
      { url: "/assets/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/assets/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/favicon-48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [{ url: "/assets/favicon-180.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${notoSerif.variable} ${dmSans.variable} ${dmMono.variable} h-full`}
    >
      <body className="min-h-full">
        <AnalyticsOptOut />
        <Amplitude />
        <Smartlook />
        <GoogleAnalytics />
        <TrackClicks />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
