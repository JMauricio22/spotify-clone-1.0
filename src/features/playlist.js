import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { spotifyApi } from '../utils/spotify';

export const fetchPlayUserPlaylist = createAsyncThunk('playList/fetchPlayUserPlaylist', async () => {
  const { body } = await spotifyApi.getUserPlaylists();
  return body.items;
});

const initialState = {
  items: [],
  loading: false,
  error: '',
};

const playListSlice = createSlice({
  name: 'playList',
  initialState,
  extraReducers(builder) {
    builder.addCase(fetchPlayUserPlaylist.fulfilled, (_, { payload }) => ({ ...initialState, items: payload }));
    builder.addCase(fetchPlayUserPlaylist.rejected, (_, { error }) => ({ ...initialState, error }));
  },
});

export const selectUserPlaylist = (state) => state.playList.items;

export default playListSlice.reducer;
