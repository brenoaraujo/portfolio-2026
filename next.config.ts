import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // PostHog reverse proxy. The SDK sends to /relay on this domain and these
  // rewrites forward it to PostHog (US), so the browser never calls a
  // third-party analytics domain. Keep the neutral path name: blockers catch
  // /analytics, /posthog and /tracking. The static and array rules must stay
  // above the catch-all.
  async rewrites() {
    return [
      { source: "/relay/static/:path*", destination: "https://us-assets.i.posthog.com/static/:path*" },
      { source: "/relay/array/:path*", destination: "https://us-assets.i.posthog.com/array/:path*" },
      { source: "/relay/:path*", destination: "https://us.i.posthog.com/:path*" },
    ];
  },
  // PostHog API paths end in a slash; don't redirect them.
  skipTrailingSlashRedirect: true,
  experimental: {
    // The root layout is per language (app/[lang]/layout.tsx), so unmatched
    // URLs get app/global-not-found.tsx instead of a layout-based 404.
    globalNotFound: true,
  },
};

export default nextConfig;
