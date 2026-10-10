"use client";

import { useRef } from "react";
import { OFF_THE_CLOCK, OFF_TITLE } from "@/lib/site";

/** "Off the clock" — horizontal scroll-snap photo carousel with ←/→ buttons. */
export function OffTheClockTile() {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8 });
  };
  return (
    <section id="off" className="tile off-tile" data-span={3}>
      <span className="bento-node bento-node--tl" aria-hidden="true" />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 16, flexWrap: "wrap", paddingTop: 42 }}>
        <h3>{OFF_TITLE}</h3>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, minWidth: 0 }}>
        <div className="off-tile__track" ref={track}>
          {OFF_THE_CLOCK.map((l, i) => (
            <figure className="off-tile__fig" key={l.img}>
              <div className="off-tile__photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={l.img} alt={l.label} loading="lazy" />
              </div>
              <figcaption className="off-tile__cap">
                {String(i + 1).padStart(2, "0")} — {l.label}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="off-tile__nav">
          <button aria-label="Previous" onClick={() => scroll(-1)}>
            ←
          </button>
          <button aria-label="Next" onClick={() => scroll(1)}>
            →
          </button>
        </div>
      </div>
    </section>
  );
}
