import type { ThemeOptions } from "@mui/material";

export const components: ThemeOptions["components"] = {
  MuiButton: {
    styleOverrides: {
      root: {
        boxShadow: "none",
        "&:hover": { boxShadow: "none" },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        boxShadow: "none",
        border: "1px solid",
        borderColor: "#e5e6ea",
      },
    },
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: {
        textTransform: "none",
        letterSpacing: "normal",
        fontSize: "13px",
      },
    },
  },
};
