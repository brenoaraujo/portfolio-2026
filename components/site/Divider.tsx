import type { CSSProperties } from "react";

export interface DividerProps {
  style?: CSSProperties;
}

/** 0.5px hairline rule, rgb(212,212,212) — the only line treatment in the system. */
export function Divider({ style, ...rest }: DividerProps) {
  return (
    <div
      role="separator"
      style={{
        height: 0,
        width: "100%",
        flexGrow: 1,
        boxShadow:
          "inset 0 0 0 0.5px rgb(212,212,212), 0 0 0 0.5px rgb(212,212,212)",
        ...style,
      }}
      {...rest}
    />
  );
}
