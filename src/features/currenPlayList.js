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
  return body;
});

const currentPlayListSlice = createSlice({
  name: 'currentPlayList',
  initialState,
  extraReducers(builder) {
    builder.addCase(fetchPlayListTracks.fulfilled, (_, { payload }) => ({ info: payload, loading: false, error: '' }));
    builder.addCase(fetchPlayListTracks.pending, () => ({ ...initialState, loading: true }));
    builder.addCase(fetchPlayListTracks.rejected, (_, { error }) => ({ ...initialState, error: error.message }));
  },
});

export const selectCurrentPlaylist = (state) => state.currentPlayList.info;
export const selecthasItems = (state) => !!(state.currentPlayList.info?.tracks?.items.length > 0);
export const selectLoading = (state) => state.currentPlayList.loading;
export const selectLPlaylistName = (state) => state.currentPlayList.info?.name;

export default currentPlayListSlice.reducer;
