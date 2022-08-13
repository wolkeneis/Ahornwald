import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";

interface PlayerState {
  playing: boolean;
  time: number;
  timePercent: number;
  buffered: number;
  duration: number;
  volume: number;
  controls: boolean;
  muted: boolean;
}

const initialState: PlayerState = {
  playing: false,
  time: 0,
  timePercent: 0,
  buffered: 0,
  duration: 0,
  controls: true,
  volume: 0.5,
  muted: false
};

export const playerSlice: Slice = createSlice({
  name: "interface",
  initialState,
  reducers: {
    setPlaying(state: PlayerState, action: PayloadAction<boolean>) {
      state.playing = action.payload;
    },

    setTime(state: PlayerState, action: PayloadAction<number>) {
      state.time = action.payload;
    },

    setTimePercent(state: PlayerState, action: PayloadAction<number>) {
      state.timePercent = action.payload;
    },

    setBuffered(state: PlayerState, action: PayloadAction<number>) {
      state.buffered = action.payload;
    },

    setDuration(state: PlayerState, action: PayloadAction<number>) {
      state.duration = action.payload;
    },

    setControlsVisible(state: PlayerState, action: PayloadAction<boolean>) {
      state.controls = action.payload;
    },

    setVolume(state: PlayerState, action: PayloadAction<number>) {
      state.volume = action.payload;
    },

    setMuted(state: PlayerState, action: PayloadAction<boolean>) {
      state.muted = action.payload;
    }
  }
});

export const {
  setPlaying,
  setTime,
  setTimePercent,
  setBuffered,
  setDuration,
  setControlsVisible,
  setVolume,
  setMuted
} = playerSlice.actions;

export default playerSlice.reducer;
