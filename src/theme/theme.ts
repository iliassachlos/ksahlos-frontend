import { createTheme } from "@mui/material/styles";

import { palette } from "./theme-palette";
import { typography } from "./typography";
import { components } from "./components";

export const createAppTheme = () =>
  createTheme({
    palette,
    typography,
    components,

    shape: {
      borderRadius: 3,
    },
  });
