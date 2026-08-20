import Script from "next/script";

// GA4 measurement ID — public by design (it ships in the page). Move to an env
// var (NEXT_PUBLIC_GA_ID) when you set up environments, alongside the Amplitude
// key.
const GA_ID = "G-73H44MV8MC";

/**
 * Google Analytics 4 (gtag.js), loaded after the page is interactive so it
 * never blocks first paint. Runs alongside Amplitude — GA for audience/traffic,
 * Amplitude for product events. Mounted once in the root layout.
 */
export function GoogleAnalytics() {
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
