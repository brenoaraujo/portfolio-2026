"use client";

import { useEffect, useRef, useState } from "react";
import { HOW_I_WORK } from "@/lib/site";

const pad = (n: number) => "0" + n;

/** "How I work" — 4 steps auto-advancing every 4.2s with progress bars. */
export function HowIWorkTile() {
  const [step, setStep] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  useEffect(() => {
    // Respect reduced-motion: no auto-advancing content (manual tabs still work).
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer.current = setInterval(() => setStep((s) => (s + 1) % HOW_I_WORK.length), 4200);
    return () => clearInterval(timer.current);
  }, []);

  const pick = (i: number) => {
    clearInterval(timer.current);
    setStep(i);
  };

  return (
    <section className="tile how-tile" data-span={2}>
      <span className="bento-node bento-node--tl" aria-hidden="true" />
      <div className="how-tile__head">
        <span>How I work</span>
        <span>{pad(step + 1)} / 04</span>
      </div>
      <p className="how-tile__text">{HOW_I_WORK[step].text}</p>
      <div className="how-tile__steps">
        {HOW_I_WORK.map((s, i) => (
          <button key={s.label} className="how-tile__step" onClick={() => pick(i)} aria-current={i === step}>
            <span className="how-tile__bar">
              {i < step ? (
                <span style={{ width: "100%" }} />
              ) : i === step ? (
                <span key={`b${step}`} className="is-active" />
              ) : null}
            </span>
            <span style={{ fontSize: 13, color: i === step ? "#161615" : "#77776f" }}>{s.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
