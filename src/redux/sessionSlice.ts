import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { type v1 } from "moos-api";

interface SessionState {
  profile?: v1.UserProfile | null;
  friends?: v1.Friend[] | null;
  collections?: {
    [key: string]: v1.Collection[] | undefined;
  } | null;
  csrfToken?: string;
}

const initialState: SessionState = {
  profile: undefined,
  friends: undefined,
  collections: {},
  csrfToken: undefined
};

export const sessionSlice: Slice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setProfile: (state: SessionState, action: PayloadAction<v1.UserProfile | null>) => {
      state.profile = action.payload;
    },

    setFriends: (state: SessionState, action: PayloadAction<v1.Friend[] | null>) => {
      state.friends = action.payload;
    },

    setCollection: (
      state: SessionState,
      action: PayloadAction<{ friendId: string; collections: v1.Collection[] | null }>
    ) => {
      state.collections = state.collections ?? {};
      if (action.payload.collections === null) {
        delete state.collections[action.payload.friendId];
      } else {
        state.collections[action.payload.friendId] = action.payload.collections;
      }
    },

    setCSRFToken: (state: SessionState, action: PayloadAction<string | undefined>) => {
      state.csrfToken = action.payload;
    }
  }
});

export const { setProfile, setFriends, setCollection, setCSRFToken } = sessionSlice.actions;

export default sessionSlice.reducer;
