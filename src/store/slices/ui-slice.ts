import { createSlice } from "@reduxjs/toolkit";
import type { PaletteMode } from "@mui/material";

interface UiState {
  colorMode: PaletteMode;
}

const initialState: UiState = {
  colorMode: (localStorage.getItem("colorMode") as PaletteMode) ?? "light",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleColorMode: (state) => {
      state.colorMode = state.colorMode === "light" ? "dark" : "light";
      localStorage.setItem("colorMode", state.colorMode);
    },
  },
});

export const { toggleColorMode } = uiSlice.actions;
export default uiSlice.reducer;
