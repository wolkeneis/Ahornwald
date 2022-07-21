import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { v1 } from "moos-api";

interface ContentState {
  collections?: {
    [key: string]: v1.Collection[] | undefined;
  } | null;
  collection?: v1.Collection;
  seasons?: {
    [key: string]: v1.Season | undefined;
  } | null;
  season?: string;
}

const initialState: ContentState = {
  collections: {},
  collection: undefined,
  seasons: {},
  season: undefined
};

export const contentSlice: Slice = createSlice({
  name: "interface",
  initialState,
  reducers: {
    setCollections: (
      state: ContentState,
      action: PayloadAction<{ friendId: string; collections: v1.Collection[] | null }>
    ) => {
      state.collections = state.collections ?? {};
      if (action.payload.collections === null) {
        delete state.collections[action.payload.friendId];
      } else {
        state.collections[action.payload.friendId] = action.payload.collections;
      }
    },

    setCurrentCollection: (state: ContentState, action: PayloadAction<v1.Collection | undefined>) => {
      state.collection = action.payload;
    },

    setSeason: (state: ContentState, action: PayloadAction<v1.Season>) => {
      state.seasons = state.seasons ?? {};
      state.seasons[action.payload.id] = action.payload;
    },

    setCurrentSeason: (state: ContentState, action: PayloadAction<string | undefined>) => {
      state.season = action.payload;
    }
  }
});

export const { setCollections, setCurrentCollection, setSeason, setCurrentSeason } = contentSlice.actions;

export default contentSlice.reducer;
