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
 * The four-up credits block under the hero: label + value pairs, closed by a
 * hairline. Pulled up 32px so it sits tight beneath the hero plate.
 */
export function Credits({ role, team, madeWith, shipped }: CreditsData) {
  const entries = Object.entries({ role, team, madeWith, shipped }).filter(
    ([, v]) => Boolean(v),
  ) as [keyof CreditsData, string][];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        alignSelf: "stretch",
        marginTop: -32,
      }}
    >
      <div className="credits-grid">
        {entries.map(([key, value]) => (
          <div key={key} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
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
                fontWeight: 700,
                fontSize: "var(--type-title-size)",
                lineHeight: "23px",
                color: "var(--text-primary)",
              }}
            >
              {value}
            </span>
          </div>
        ))}
      </div>
      <div className="hairline" />
    </div>
  );
}
