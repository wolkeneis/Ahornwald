import { configureStore, Store } from "@reduxjs/toolkit";
import contentReducer from "./contentSlice";
import interfaceReducer from "./interfaceSlice";
import playerReducer from "./playerSlice";
import sessionReducer from "./sessionSlice";

export const store: Store = configureStore({
  reducer: {
    interface: interfaceReducer,
    session: sessionReducer,
    content: contentReducer,
    player: playerReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
