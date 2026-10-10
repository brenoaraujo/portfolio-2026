"use client";

import { useState, type CSSProperties } from "react";
import { EXPERIENCE_ROWS, CONTACT } from "@/lib/site";
import { EVENTS } from "@/lib/analytics-events";

/** Experience accordion — one row open at a time, Ascend (index 0) by default. */
export function ExperienceTile() {
  const [open, setOpen] = useState(0);
  return (
    <section
      id="experience"
      className="tile"
      data-span={2}
      style={{ display: "flex", flexDirection: "column", padding: "72px 24px", scrollMarginTop: 20 } as CSSProperties}
    >
      <span className="bento-node bento-node--tl" aria-hidden="true" />
      <div className="rows-head">
        <span className="rows-head__title">Experience</span>
        <a
          href={CONTACT.linkedin}
          target="_blank"
          rel="noreferrer"
          data-track={EVENTS.CTA_CLICK}
          data-track-label="LinkedIn"
          data-track-location="experience"
        >
          LinkedIn ↗
        </a>
      </div>
      <div className="rows-list">
        {EXPERIENCE_ROWS.map((e, i) => {
          const isOpen = open === i;
          return (
            <div className="exp-row" key={e.co}>
              <button className="exp-row__btn" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : i)}>
                <span style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap", minWidth: 0 }}>
                  <span className="exp-row__co">{e.co}</span>
                  <span className="exp-row__role">{e.role}</span>
                </span>
                <span className="exp-row__meta">
                  <span>{e.years}</span>
                  <span className="exp-row__icon" aria-hidden="true">
                    {isOpen ? "−" : "+"}
                  </span>
                </span>
              </button>
              {isOpen ? <p className="exp-row__desc">{e.desc}</p> : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
