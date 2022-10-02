import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { spotifyApi } from '../utils/spotify';

export const playSong = createAsyncThunk('player/playSong', async (track) => {
  if (track) {
    await spotifyApi.play({
      uris: [track.uri],
    });
  } else {
    await spotifyApi.play();
  }

  return {
    track,
    isPlaying: true,
  };
});

export const play = createAsyncThunk('player/play', async (uri) => {
  await spotifyApi.play({
    context_uri: uri,
  });
  return true;
});

const initialState = {
  track: null,
  paused: false,
  volume: 50,
  muted: false,
  error: '',
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    playerStateChange: (state, { payload: { track, paused } }) => ({
      ...initialState,
      ...state,
      track,
      paused: paused,
    }),
    resumeTrack: (state) => ({ ...state, paused: false }),
    pauseTrack: (state) => ({ ...state, paused: true }),
    setVolume: (state, { payload: { volume, muted } }) => ({ ...state, volume, muted }),
    setMuted: (state, { payload }) => ({ ...state, muted: payload }),
  },
});

export const selectPlayerTrack = (state) => state.player.track;
export const selectPlayerPaused = (state) => state.player.paused;
export const selectPlayerVolume = (state) => state.player.volume;
export const selectPlayerMuted = (state) => state.player.muted;

export const { playerStateChange, resumeTrack, pauseTrack, setVolume, setMuted } = playerSlice.actions;

export default playerSlice.reducer;
