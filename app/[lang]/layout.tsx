import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Noto_Serif, DM_Sans } from "next/font/google";
import { AnalyticsOptOut } from "@/components/analytics/AnalyticsOptOut";
import { TrackClicks } from "@/components/analytics/TrackClicks";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { SITE_URL, SITE_NAME } from "@/lib/config";
import {
  LOCALES,
  HTML_LANG,
  OG_LOCALE,
  isLocale,
  localePath,
  languageAlternates,
  getDictionary,
} from "@/lib/i18n";
import "../globals.css";

// Noto Serif carries voice (serif accents); DM Sans carries everything else.
// The latin subset covers Portuguese accents (ã, ç, õ, é…).
const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// 700 carries the poster display word ("PRODUCT DESIGNER") and the red section
// numbers; 400/500 remain for body, nav and section titles.
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// Every page is prerendered once per locale. English is served at the
// unprefixed URLs by proxy.ts; anything outside LOCALES is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang).meta;
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t.title,
      template: "%s — Breno Araujo",
    },
    description: t.description,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME }],
    // The home page of each language. Case studies and /for pages override
    // this with their own canonical (see their page.tsx).
    alternates: {
      canonical: localePath(lang, "/"),
      languages: languageAlternates("/"),
    },
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
      title: t.title,
      description: t.description,
      url: localePath(lang, "/"),
      locale: OG_LOCALE[lang],
      alternateLocale: LOCALES.filter((l) => l !== lang).map((l) => OG_LOCALE[l]),
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.description,
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <html
      lang={HTML_LANG[lang]}
      className={`${notoSerif.variable} ${dmSans.variable} h-full`}
      // The home page's pre-paint script adds `hero-anim` to <html> (see
      // HomeRedesign), so the server and client class lists differ on purpose.
      suppressHydrationWarning
    >
      <body className="min-h-full">
        <AnalyticsOptOut />
        <GoogleAnalytics />
        <TrackClicks />
        <a href="#main" className="skip-link">
          {t.common.skipToContent}
        </a>
        {children}
      </body>
    </html>
  );
}
