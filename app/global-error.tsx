"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

export default function GlobalError({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  useEffect(() => {
    // GA4's standard exception event; description is truncated by GA to 100 chars.
    track("exception", { description: error.message, fatal: true, digest: error.digest });
  }, [error]);

  return (
    <html lang="en">
      <body>
        <main>
          <h1>Something went wrong</h1>
          <p>Please try again.</p>
          <button type="button" onClick={reset}>
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
