import React from "react";

/* The 0.5px rgb(212,212,212) hairline used in the header and to close
   every Experience / Writing row. */
export function Divider({ style, ...rest }) {
  return <div role="separator" style={{ height: 0, width: "100%", flexGrow: 1, boxShadow: "inset 0 0 0 0.5px rgb(212,212,212), 0 0 0 0.5px rgb(212,212,212)", ...style }} {...rest} />;
}
