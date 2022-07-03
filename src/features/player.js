import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { spotifyApi } from '../utils/spotify';

export const playSong = createAsyncThunk('player/playSong', async (track) => {
  await spotifyApi.play({
    uris: [track.uri],
  });
  return track;
});

const initialState = {
  track: null,
  error: '',
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(playSong.fulfilled, (_, { payload }) => ({ track: payload, error: '' }));
    builder.addCase(playSong.rejected, (_, { error }) => ({ ...initialState, error: error.message }));
  },
});

export default playerSlice.reducer;
