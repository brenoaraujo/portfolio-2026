"use client";

import { useState } from "react";
import { PROTOTYPE_IN } from "@/lib/site";

/** "Prototype in" — Figma / Code / AI segmented control with a snippet. */
export function PrototypeTile() {
  const [tool, setTool] = useState(0);
  return (
    <section className="tile tile--fill proto-tile">
      <span className="bento-node bento-node--tl" aria-hidden="true" />
      <span style={{ fontFamily: "var(--font-serif)", fontSize: 12, color: "var(--rd-muted)" }}>Prototype in</span>
      <div className="proto-tile__seg" role="tablist" aria-label="Prototype in">
        {PROTOTYPE_IN.map((t, i) => (
          <button
            key={t.label}
            role="tab"
            aria-selected={i === tool}
            className={i === tool ? "is-active" : undefined}
            onClick={() => setTool(i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="proto-tile__snippet">{PROTOTYPE_IN[tool].snippet}</div>
    </section>
  );
}
