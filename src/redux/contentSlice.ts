import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { v1 } from "moos-api";

interface ContentState {
  collections?: {
    [key: string]: v1.CollectionPreview[] | undefined;
  } | null;
  collection?: v1.Collection | null;
  season?: string;
}

const initialState: ContentState = {
  collections: {},
  collection: undefined,
  season: undefined
};

export const contentSlice: Slice = createSlice({
  name: "interface",
  initialState,
  reducers: {
    setCollections: (
      state: ContentState,
      action: PayloadAction<{ friendId: string; collections: v1.CollectionPreview[] | null }>
    ) => {
      state.collections = state.collections ?? {};
      if (action.payload.collections === null) {
        delete state.collections[action.payload.friendId];
      } else {
        state.collections[action.payload.friendId] = action.payload.collections;
      }
    },

    setCurrentCollection: (state: ContentState, action: PayloadAction<v1.Collection | undefined | null>) => {
      state.collection = action.payload;
    },

    setCurrentSeason: (state: ContentState, action: PayloadAction<string | undefined>) => {
      state.season = action.payload;
    }
  }
});

export const { setCollections, setCurrentCollection, setCurrentSeason } = contentSlice.actions;

export default contentSlice.reducer;
