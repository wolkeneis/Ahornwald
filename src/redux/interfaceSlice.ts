import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";

interface InterfaceState {
  theme: "dark-theme" | "light-theme";
  mobile: boolean;
  drawerOpen: boolean;
  drawerWidth: number;
  loginRequiredVisible: boolean;
  friendErrorVisible: boolean;
}

const initialState: InterfaceState = {
  theme: "dark-theme",
  mobile: false,
  drawerOpen: false,
  drawerWidth: 240,
  loginRequiredVisible: false,
  friendErrorVisible: false
};

export const interfaceSlice: Slice = createSlice({
  name: "interface",
  initialState,
  reducers: {
    selectTheme: (state: InterfaceState, action: PayloadAction<"dark-theme" | "light-theme">) => {
      state.theme = action.payload;
    },
    toggleTheme: (state: InterfaceState) => {
      state.theme = state.theme === "dark-theme" ? "light-theme" : "dark-theme";
    },

    setMobile: (state: InterfaceState, action: PayloadAction<boolean>) => {
      state.mobile = action.payload;
    },

    setDrawerOpen: (state: InterfaceState, action: PayloadAction<boolean>) => {
      state.drawerOpen = action.payload;
    },
    toggleDrawer: (state: InterfaceState) => {
      state.drawerOpen = !state.drawerOpen;
    },
    setDrawerWidth: (state: InterfaceState, action: PayloadAction<number>) => {
      state.drawerWidth = action.payload;
    },

    setLoginRequiredVisible(state: InterfaceState, action: PayloadAction<boolean>) {
      state.loginRequiredVisible = action.payload;
    },

    setFriendErrorVisible(state: InterfaceState, action: PayloadAction<boolean>) {
      state.friendErrorVisible = action.payload;
    }
  }
});

export const { selectTheme, toggleTheme } = interfaceSlice.actions;
export const { setMobile } = interfaceSlice.actions;
export const { setDrawerOpen, toggleDrawer, setDrawerWidth } = interfaceSlice.actions;
export const { setLoginRequiredVisible, setFriendErrorVisible } = interfaceSlice.actions;

export default interfaceSlice.reducer;
