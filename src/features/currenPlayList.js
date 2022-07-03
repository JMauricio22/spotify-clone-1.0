import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { spotifyApi } from '../utils/spotify';

const initialState = {
  name: '',
  images: [],
  tracks: [],
  error: '',
};

export const fetchPlayListTracks = createAsyncThunk('currentPlayList/fetchPlayListTracks', async (playListId) => {
  const { body } = await spotifyApi.getPlaylist(playListId);
  const { name, images, tracks } = body;
  return {
    name,
    images,
    tracks: tracks.items,
  };
});

const currentPlayListSlice = createSlice({
  name: 'currentPlayList',
  initialState,
  extraReducers(builder) {
    builder.addCase(fetchPlayListTracks.fulfilled, (_, { payload }) => ({ ...payload, error: '' }));
    builder.addCase(fetchPlayListTracks.rejected, (_, { error }) => ({ ...initialState, error: error.message }));
  },
});

export default currentPlayListSlice.reducer;
