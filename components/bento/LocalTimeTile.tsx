"use client";

import { useEffect, useState } from "react";
import { CLOCKS } from "@/lib/site";
import { Globe } from "@/components/bento/Globe";

const fmt = (tz: string) =>
  new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: tz });

// Empty on the server (SSG would bake build time); filled on mount.
function useClock(tz: string) {
  const [t, setT] = useState("");
  useEffect(() => {
    const up = () => setT(fmt(tz));
    up();
    const id = setInterval(up, 15000);
    return () => clearInterval(id);
  }, [tz]);
  return t;
}

/**
 * "Local time" — Maple Ridge (large) + Belo Horizonte (small), with the line
 * globe top-right. Hovering a city rotates the globe to it (handled in Globe).
 */
export function LocalTimeTile() {
  const here = useClock(CLOCKS.here.tz);
  const home = useClock(CLOCKS.home.tz);
  const [city, setCity] = useState<"here" | "home">("here");
  const [bump, setBump] = useState(0);

  return (
    <section className="tile local-tile" data-span={1}>
      <span className="bento-node bento-node--tl" aria-hidden="true" />
      <span style={{ fontFamily: "var(--font-serif)", fontSize: 12, color: "var(--rd-muted)" }}>Local time</span>
      <div className="local-tile__globe">
        <Globe city={city} spinBump={bump} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div
          style={{ display: "flex", flexDirection: "column", gap: 2, cursor: "default" }}
          onMouseEnter={() => {
            setBump((b) => b + 1);
            setCity("here");
          }}
        >
          <span className="local-tile__time" suppressHydrationWarning>
            {here || "—"}
          </span>
          <span style={{ fontSize: 13, color: city === "here" ? "var(--rd-accent)" : "var(--rd-secondary)" }}>
            {CLOCKS.here.label}
          </span>
        </div>
        <div
          className="local-tile__row"
          style={{ cursor: "default" }}
          onMouseEnter={() => setCity("home")}
          onMouseLeave={() => setCity("here")}
        >
          <span style={{ fontSize: 13, color: city === "home" ? "var(--rd-accent)" : "var(--rd-secondary)" }}>
            {CLOCKS.home.label}
          </span>
          <span style={{ fontFamily: "var(--font-serif)", fontSize: 13 }} suppressHydrationWarning>
            {home || "—"}
          </span>
        </div>
      </div>
    </section>
  );
}
