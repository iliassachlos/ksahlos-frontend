import type { ThemeOptions } from "@mui/material/styles";

export const typography: ThemeOptions["typography"] = {
  fontFamily:
    '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',

  h1: {
    fontWeight: 200,
    fontSize: "96px", 
    lineHeight: 1.02,
    letterSpacing: "-0.02em",
  },
  h2: {
    fontWeight: 200,
    fontSize: "52px", 
    lineHeight: 1.05,
    letterSpacing: "-0.02em",
  },
  h3: {
    fontWeight: 200,
    fontSize: "36px", 
    lineHeight: 1.1,
    letterSpacing: "-0.02em",
  },
  h4: {
    fontWeight: 300,
    fontSize: "28px", 
    lineHeight: 1.2,
    letterSpacing: "-0.01em",
  },
  h5: { fontWeight: 400, fontSize: "22px", lineHeight: 1.25 }, 
  h6: { fontWeight: 500, fontSize: "18px", lineHeight: 1.3 }, 

  subtitle1: { fontWeight: 300, fontSize: "21px", lineHeight: 1.4 }, 
  subtitle2: { fontWeight: 500, fontSize: "13px", letterSpacing: "0.04em" }, 

  body1: { fontWeight: 400, fontSize: "17px", lineHeight: 1.65 },
  body2: { fontWeight: 400, fontSize: "15px", lineHeight: 1.6 }, 

  button: {
    fontWeight: 500,
    fontSize: "13px", 
    letterSpacing: "0.04em",
    textTransform: "none",
  },
  caption: {
    fontWeight: 400,
    fontSize: "12px", 
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    lineHeight: 1.4,
  },
  overline: {
    fontWeight: 500,
    fontSize: "12px", 
    letterSpacing: "0.32em",
    textTransform: "uppercase",
    lineHeight: 1,
  },
};
