import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { v1 } from "moos-api";

interface ContentState {
  collections?: {
    [key: string]: v1.CollectionPreview[] | undefined;
  } | null;
  collection?: v1.Collection | null;
  season?: string;
  episode?: v1.Episode | null;
  source?: v1.Source | null;
  sourceUrl?: string | null;
  preferredLanguage: v1.Language | null;
}

const initialState: ContentState = {
  collections: {},
  collection: undefined,
  season: undefined,
  episode: undefined,
  source: undefined,
  sourceUrl: undefined,
  preferredLanguage: null
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
    },

    setCurrentEpisode: (state: ContentState, action: PayloadAction<v1.Episode | undefined | null>) => {
      state.episode = action.payload;
    },

    setCurrentSource: (state: ContentState, action: PayloadAction<v1.Source | undefined | null>) => {
      state.source = action.payload;
    },

    setSourceUrl: (state: ContentState, action: PayloadAction<string | undefined>) => {
      state.sourceUrl = action.payload;
    },

    setPreferredLanguage: (state: ContentState, action: PayloadAction<v1.Language | null>) => {
      state.preferredLanguage = action.payload;
    }
  }
});

export const {
  setCollections,
  setCurrentCollection,
  setCurrentSeason,
  setCurrentEpisode,
  setCurrentSource,
  setSourceUrl,
  setPreferredLanguage
} = contentSlice.actions;

export default contentSlice.reducer;
