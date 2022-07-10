import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { spotifyApi } from '../utils/spotify';

const initialState = {
  info: null,
  loading: false,
  error: '',
};

export const fetchPlayListTracks = createAsyncThunk('currentPlayList/fetchPlayListTracks', async (playListId) => {
  const { body } = await spotifyApi.getPlaylist(playListId);
  return {
    info: body,
    error: '',
  };
});

const currentPlayListSlice = createSlice({
  name: 'currentPlayList',
  initialState,
  extraReducers(builder) {
    builder.addCase(fetchPlayListTracks.fulfilled, (_, { payload }) => ({ ...payload, loading: false, error: '' }));
    builder.addCase(fetchPlayListTracks.pending, (state) => ({ ...state, loading: true }));
    builder.addCase(fetchPlayListTracks.rejected, (_, { error }) => ({ ...initialState, error: error.message }));
  },
});

export default currentPlayListSlice.reducer;
