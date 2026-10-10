"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import type { WorkTileMeta } from "@/lib/site";
import { EVENTS } from "@/lib/analytics-events";

// Lazy, client-only — each animation is its own chunk, loaded when the tile
// nears the viewport.
const THUMBS = {
  changeit: dynamic(() => import("@/components/bento/thumbs/ChangeItThumb").then((m) => m.ChangeItThumb), { ssr: false }),
  ticket: dynamic(() => import("@/components/bento/thumbs/TicketThumb").then((m) => m.TicketThumb), { ssr: false }),
  raffle: dynamic(() => import("@/components/bento/thumbs/RaffleThumb").then((m) => m.RaffleThumb), { ssr: false }),
  onboarding: dynamic(() => import("@/components/bento/thumbs/OnboardingThumb").then((m) => m.OnboardingThumb), { ssr: false }),
} as const;

const TEX: Record<string, { bg: string; inner: CSSProperties }> = {
  invoice: {
    bg: "url('/assets/bg.webp') repeat, radial-gradient(120% 90% at 0% 0%, #f1e6d6 0%, rgba(241,230,214,0) 55%), radial-gradient(110% 100% at 100% 100%, #c9d3e3 0%, rgba(201,211,227,0) 60%), linear-gradient(135deg, #e9e4dc 0%, #d9dbe0 100%)",
    inner: { left: "calc(14px + 12%)", top: "calc(14px + 12%)", right: -40, bottom: -40, borderRadius: "10px 0 0 0" },
  },
  commission: {
    bg: "url('/assets/bg.webp') repeat, radial-gradient(120% 90% at 100% 100%, #f1e6d6 0%, rgba(241,230,214,0) 55%), radial-gradient(110% 100% at 0% 0%, #c9d3e3 0%, rgba(201,211,227,0) 60%), linear-gradient(315deg, #e9e4dc 0%, #d9dbe0 100%)",
    inner: { left: "calc(14px + 9%)", right: "calc(14px + 9%)", top: "calc(14px + 10%)", bottom: -40, borderRadius: "10px 10px 0 0" },
  },
};

/**
 * A Selected-Work tile: cursor parallax (`--px/--py/--s`) on the image, a label
 * card that springs up on hover, and a bottom gradient. Textured tiles (invoice,
 * commission) render a gradient+screenshot plate instead of a cover image; the
 * four animated kinds get their rAF thumbnail layered over the poster in M3.
 */
export function WorkTile({ tile, href }: { tile: WorkTileMeta; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [nearView, setNearView] = useState(false);
  const Thumb = tile.kind in THUMBS ? THUMBS[tile.kind as keyof typeof THUMBS] : null;

  useEffect(() => {
    if (!Thumb || !ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNearView(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [Thumb]);

  const move = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const b = el.getBoundingClientRect();
    const x = (e.clientX - b.left) / b.width;
    const y = (e.clientY - b.top) / b.height;
    el.style.setProperty("--px", `${(0.5 - x) * 18}px`);
    el.style.setProperty("--py", `${(0.5 - y) * 18}px`);
  };
  const enter = (e: MouseEvent) => {
    ref.current?.style.setProperty("--s", "1");
    move(e);
  };
  const leave = () => {
    const el = ref.current;
    if (!el) return;
    ["--s", "--px", "--py"].forEach((k) => el.style.removeProperty(k));
  };

  const tex = TEX[tile.kind];

  return (
    <a
      ref={ref}
      href={href}
      className="work-tile tile"
      data-span={tile.span}
      data-rows={tile.rows === 2 ? "2" : undefined}
      data-track={EVENTS.WORK_CARD_CLICK}
      data-track-slug={tile.slug}
      data-track-title={tile.title}
      style={{ "--ar": tile.aspect, "--mh": tile.minH } as CSSProperties}
      onMouseMove={move}
      onMouseEnter={enter}
      onMouseLeave={leave}
    >
      <span className="bento-node bento-node--tl" aria-hidden="true" />
      <div className="work-tile__frame">
        {tex ? (
          <div
            className="work-tile__img"
            style={{ background: tex.bg, backgroundBlendMode: "multiply, normal, normal, normal" }}
          >
            <div
              style={{
                position: "absolute",
                overflow: "hidden",
                background: "#f8f9fa",
                boxShadow: "0 0 0 1px rgba(0,0,0,.06), 0 24px 48px -22px rgba(40,34,26,.45)",
                ...tex.inner,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={tile.img} alt="" style={{ width: "100%", display: "block" }} />
            </div>
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="work-tile__img" src={tile.img} alt={tile.title} loading="lazy" />
        )}
        {Thumb && nearView ? (
          <div className="work-tile__anim">
            <Thumb />
          </div>
        ) : null}
        <div className="work-tile__overlay">
          <div className="work-tile__label">
            <span className="work-tile__tag">{tile.tag}</span>
            <span className="work-tile__title">{tile.title}</span>
          </div>
        </div>
      </div>
    </a>
  );
}
