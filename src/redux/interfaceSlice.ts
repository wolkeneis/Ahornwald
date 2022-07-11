import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";

interface InterfaceState {
  theme: "dark-theme" | "light-theme";
}

const initialState: InterfaceState = {
  theme: "dark-theme"
};

export const interfaceSlice: Slice = createSlice({
  name: "interface",
  initialState,
  reducers: {
    selectTheme: (state, action: PayloadAction<"dark-theme" | "light-theme">) => {
      state.theme = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "dark-theme" ? "light-theme" : "dark-theme";
    }
  }
});

export const { selectTheme, toggleTheme } = interfaceSlice.actions;

export default interfaceSlice.reducer;
