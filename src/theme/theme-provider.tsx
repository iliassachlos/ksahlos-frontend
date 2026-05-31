import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { useAppSelector } from "../store/store";
import { createAppTheme } from "./theme";

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const mode = useAppSelector((state) => state.ui.colorMode);
  const theme = createAppTheme(mode);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
