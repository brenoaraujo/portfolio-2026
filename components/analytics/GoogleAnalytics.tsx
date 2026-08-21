import Script from "next/script";

// GA4 measurement ID, read from the environment so it isn't hardcoded in
// source. It's a public identifier (it ships in the page) — set
// NEXT_PUBLIC_GA_ID in .env.local and in the Vercel project.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * Google Analytics 4 (gtag.js), loaded after the page is interactive so it
 * never blocks first paint. Runs alongside Amplitude — GA for audience/traffic,
 * Amplitude for product events. Mounted once in the root layout. Renders
 * nothing when the ID is unset (e.g. a preview without the env var).
 */
export function GoogleAnalytics() {
  if (!GA_ID) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
