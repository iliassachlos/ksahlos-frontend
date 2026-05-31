import { createTheme } from "@mui/material/styles";
import type { PaletteMode } from "@mui/material";

const themeConfig = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: { main: "#000000" },
          secondary: { main: "#6b6b6b" },
          background: {
            default: "#ffffff",
            paper: "#f5f5f5",
          },
          text: {
            primary: "#000000",
            secondary: "#6b6b6b",
          },
          divider: "#e0e0e0",
        }
      : {
          primary: { main: "#ffffff" },
          secondary: { main: "#9e9e9e" },
          background: {
            default: "#0a0a0a",
            paper: "#141414",
          },
          text: {
            primary: "#f5f5f5",
            secondary: "#9e9e9e",
          },
          divider: "#2a2a2a",
        }),
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
  components: {
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
          borderColor: mode === "light" ? "#e0e0e0" : "#2a2a2a",
        },
      },
    },
  },
});

export const createAppTheme = (mode: PaletteMode) =>
  createTheme(themeConfig(mode));
