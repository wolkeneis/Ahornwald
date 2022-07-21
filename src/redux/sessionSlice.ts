import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { type v1 } from "moos-api";

interface SessionState {
  profile?: v1.UserProfile | null;
  friends?: v1.Friend[] | null;
  csrfToken?: string;
}

const initialState: SessionState = {
  profile: undefined,
  friends: undefined,
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

    setCSRFToken: (state: SessionState, action: PayloadAction<string | undefined>) => {
      state.csrfToken = action.payload;
    }
  }
});

export const { setProfile, setFriends, setCSRFToken } = sessionSlice.actions;

export default sessionSlice.reducer;
