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

export const pauseSong = createAsyncThunk('player/pauseSong', async (track) => {
  await spotifyApi.pause();
  return {
    isPlaying: false,
  };
});

export const fetchPlaybackState = createAsyncThunk('player/fetchPlaybackState', async () => {
  const { body } = await spotifyApi.getMyCurrentPlaybackState();
  return {
    track: body.item,
    isPlaying: body.is_playing,
  };
});

const initialState = {
  track: null,
  isPlaying: false,
  error: '',
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(playSong.fulfilled, (state, { payload }) => {
      const { track, isPlaying } = payload;
      if (track) {
        state.track = track;
      }
      state.isPlaying = isPlaying;
    });
    builder.addCase(fetchPlaybackState.fulfilled, (_, { payload }) => ({
      ...initialState,
      track: payload.track,
      isPlaying: payload.isPlaying,
    }));
    builder.addCase(playSong.rejected, (_, { error }) => ({ ...initialState, error: error.message }));
    builder.addCase(fetchPlaybackState.rejected, (_, { error }) => ({ ...initialState, error: error.message }));
    builder.addCase(pauseSong.fulfilled, (state, { payload }) => {
      state.isPlaying = payload.isPlaying;
    });
  },
});

export default playerSlice.reducer;
