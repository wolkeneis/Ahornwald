import { configureStore, Store } from "@reduxjs/toolkit";
import interfaceReducer from "./interfaceSlice";
import sessionReducer from "./sessionSlice";
import contentReducer from "./contentSlice";

export const store: Store = configureStore({
  reducer: {
    interface: interfaceReducer,
    session: sessionReducer,
    content: contentReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
