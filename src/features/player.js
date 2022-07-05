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
    volume: body.device.volume_percent,
    isPlaying: body.is_playing,
    mute: Number.parseInt(body.device.volume_percent) === 0,
  };
});

export const setVolume = createAsyncThunk('player/setVolume', async (volume) => {
  const payload = {};
  await spotifyApi.setVolume(volume);
  if (Number.parseInt(volume) !== 0) {
    payload.volume = volume;
  }
  return {
    ...payload,
    mute: Number.parseInt(volume) === 0,
  };
});

const initialState = {
  track: null,
  isPlaying: false,
  volume: 50,
  mute: false,
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
      ...payload,
    }));
    builder.addCase(playSong.rejected, (_, { error }) => ({ ...initialState, error: error.message }));
    builder.addCase(fetchPlaybackState.rejected, (_, { error }) => ({ ...initialState, error: error.message }));
    builder.addCase(pauseSong.fulfilled, (state, { payload }) => {
      state.isPlaying = payload.isPlaying;
    });
    builder.addCase(setVolume.fulfilled, (state, { payload }) => ({ ...state, ...payload }));
  },
});

export default playerSlice.reducer;
