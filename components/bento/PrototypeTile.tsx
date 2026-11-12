"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

/** "Prototype in" — Figma / Code / AI segmented control with a snippet. */
export function PrototypeTile({ t }: { t: Dictionary["prototype"] }) {
  const [tool, setTool] = useState(0);
  return (
    <section className="tile tile--fill proto-tile">
      <span className="bento-node bento-node--tl" aria-hidden="true" />
      <span style={{ fontFamily: "var(--font-serif)", fontSize: 12, color: "var(--rd-muted)" }}>{t.title}</span>
      <div className="proto-tile__seg" role="tablist" aria-label={t.title}>
        {t.tools.map((tl, i) => (
          <button
            key={tl.label}
            role="tab"
            aria-selected={i === tool}
            className={i === tool ? "is-active" : undefined}
            onClick={() => setTool(i)}
          >
            {tl.label}
          </button>
        ))}
      </div>
      <div className="proto-tile__snippet">{t.tools[tool].snippet}</div>
    </section>
  );
}
