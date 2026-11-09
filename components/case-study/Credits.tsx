export interface CreditsData {
  role?: string;
  team?: string;
  madeWith?: string;
  shipped?: string;
}

const LABELS: Record<keyof CreditsData, string> = {
  role: "Role",
  team: "Team",
  madeWith: "Made with",
  shipped: "Shipped",
};

/**
 * The four-up credits block: label + value pairs on the same light plate as
 * the results strip (<Metrics>), as wide as the hero. Sits in the page header
 * by default; a case study can place it in its body instead with <Credits />
 * in the MDX (see app/work/[slug]/page.tsx).
 *
 * variant "row" (header): four across, as wide as the hero.
 * variant "grid" (body): 2×2 at the prose measure, no fill, outlined with
 * hairlines between cells (same 1px line as the testimonial cards).
 */
export function Credits({
  role,
  team,
  madeWith,
  shipped,
  variant = "row",
}: CreditsData & { variant?: "row" | "grid" }) {
  const entries = Object.entries({ role, team, madeWith, shipped }).filter(
    ([, v]) => Boolean(v),
  ) as [keyof CreditsData, string][];

  const grid = variant === "grid";

  return (
    <div
      style={{
        width: "100%",
        ...(grid
          ? {
              maxWidth: "var(--measure-prose)",
              alignSelf: "center",
              overflow: "hidden",
              border: "1px solid rgb(212,212,212)",
            }
          : { alignSelf: "stretch", padding: 24, background: "var(--color-overlay-05)" }),
        borderRadius: 12,
      }}
    >
      <div className={grid ? "credits-2x2" : "credits-grid"}>
        {entries.map(([key, value]) => (
          <div
            key={key}
            style={{ display: "flex", flexDirection: "column", gap: 8, ...(grid ? { padding: "20px 24px" } : null) }}
          >
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                lineHeight: 1,
                letterSpacing: "-0.05em",
                color: "var(--text-muted)",
              }}
            >
              {LABELS[key]}
            </span>
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 400,
                fontSize: 16,
                lineHeight: "22px",
                color: "var(--text-primary)",
              }}
            >
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
