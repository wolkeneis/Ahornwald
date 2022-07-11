import { configureStore, Store } from "@reduxjs/toolkit";
import interfaceReducer from "./interfaceSlice";

export const store: Store = configureStore({
  reducer: {
    interface: interfaceReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
