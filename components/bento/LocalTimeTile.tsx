"use client";

import { useEffect, useState } from "react";
import { CLOCKS } from "@/lib/site";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import { Globe } from "@/components/bento/Globe";

// "9:41 AM" in English, "09:41" in Portuguese.
const fmt = (tz: string, intlLocale: string) =>
  new Date().toLocaleTimeString(intlLocale, { hour: "numeric", minute: "2-digit", timeZone: tz });

// Empty on the server (SSG would bake build time); filled on mount.
function useClock(tz: string, intlLocale: string) {
  const [t, setT] = useState("");
  useEffect(() => {
    const up = () => setT(fmt(tz, intlLocale));
    up();
    const id = setInterval(up, 15000);
    return () => clearInterval(id);
  }, [tz, intlLocale]);
  return t;
}

/**
 * "Local time" — Maple Ridge (large) + Belo Horizonte (small), with the line
 * globe top-right. Hovering a city rotates the globe to it (handled in Globe).
 */
export function LocalTimeTile({ t, intlLocale }: { t: Dictionary["localTime"]; intlLocale: string }) {
  const here = useClock(CLOCKS.here.tz, intlLocale);
  const home = useClock(CLOCKS.home.tz, intlLocale);
  const [city, setCity] = useState<"here" | "home">("here");
  const [bump, setBump] = useState(0);

  return (
    <section className="tile local-tile" data-span={1}>
      <span className="bento-node bento-node--tl" aria-hidden="true" />
      <span style={{ fontFamily: "var(--font-serif)", fontSize: 12, color: "var(--rd-muted)" }}>{t.title}</span>
      {/* Hovering the globe (or the "born" row) peeks at Belo Horizonte. */}
      <div
        className="local-tile__globe"
        onMouseEnter={() => setCity("home")}
        onMouseLeave={() => setCity("here")}
        title={t.globeHint}
      >
        <Globe city={city} spinBump={bump} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div
          style={{ display: "flex", flexDirection: "column", gap: 2, cursor: "pointer" }}
          onMouseEnter={() => {
            setBump((b) => b + 1);
            setCity("here");
          }}
        >
          <span className="local-tile__time" suppressHydrationWarning>
            {here || "—"}
          </span>
          <span style={{ fontSize: 13, color: city === "here" ? "var(--rd-accent)" : "var(--rd-secondary)" }}>
            {t.here}
          </span>
        </div>
        <div
          className="local-tile__row"
          style={{ cursor: "pointer" }}
          onMouseEnter={() => setCity("home")}
          onMouseLeave={() => setCity("here")}
        >
          <span style={{ fontSize: 13, color: city === "home" ? "var(--rd-accent)" : "var(--rd-secondary)" }}>
            {t.home}
          </span>
          <span style={{ fontFamily: "var(--font-serif)", fontSize: 13 }} suppressHydrationWarning>
            {home || "—"}
          </span>
        </div>
      </div>
    </section>
  );
}
