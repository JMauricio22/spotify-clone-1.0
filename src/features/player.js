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

export const fetchPlaybackState = createAsyncThunk('player/fetchPlaybackState', async () => {
  const { body } = await spotifyApi.getMyCurrentPlaybackState();
  return {
    track: body.item,
    volume: body.device.volume_percent,
    paused: body.is_playing,
    muted: Number.parseInt(body.device.volume_percent) === 0,
  };
});

// export const setVolume = createAsyncThunk('player/setVolume', async (volume) => {
//   const payload = {};
//   await spotifyApi.setVolume(volume);
//   if (Number.parseInt(volume) !== 0) {
//     payload.volume = volume;
//   }
//   return {
//     ...payload,
//     muted: Number.parseInt(volume) === 0,
//   };
// });

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
    playerStateChange: (_, { payload: { track, paused } }) => ({ ...initialState, track, paused: paused }),
    resumeTrack: (state) => ({ ...state, paused: false }),
    pauseTrack: (state) => ({ ...state, paused: true }),
    setVolume: (state, { payload: { volume, muted } }) => ({ ...state, volume, muted }),
  },
  extraReducers(builder) {
    builder.addCase(fetchPlaybackState.fulfilled, (_, { payload }) => ({
      ...initialState,
      ...payload,
    }));
    builder.addCase(fetchPlaybackState.rejected, (_, { error }) => ({ ...initialState, error: error.message }));
    // builder.addCase(setVolume.fulfilled, (state, { payload }) => ({ ...state, ...payload }));
  },
});

export const selectPlayerTrack = (state) => state.player.track;
export const selectPlayerPaused = (state) => state.player.paused;
export const selectPlayerVolume = (state) => state.player.volume;
export const selectPlayerMuted = (state) => state.player.muted;

export const { playerStateChange, resumeTrack, pauseTrack, setVolume } = playerSlice.actions;

export default playerSlice.reducer;
