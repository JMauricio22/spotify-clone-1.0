import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { spotifyApi } from '../utils/spotify';

const initialState = {
  data: null,
  loading: false,
  error: '',
};

export const fetchAlbumById = createAsyncThunk('selectedAlbum/fetchAlbumById', async (albumId) => {
  const { body: album } = await spotifyApi.getAlbum(albumId);
  return album;
});

const selectedAlbum = createSlice({
  name: 'selectedAlbum',
  initialState,
  extraReducers(builder) {
    builder.addCase(fetchAlbumById.fulfilled, (_, { payload }) => ({
      data: payload,
      loading: false,
      error: '',
    }));
    builder.addCase(fetchAlbumById.pending, (state) => ({ ...state, loading: true }));
    builder.addCase(fetchAlbumById.rejected, (_, { error }) => ({ ...initialState, error: error.message }));
  },
});

export const selectAlbum = (state) => state.selectedAlbum.data;
export const selectAlbumArtistName = (state) => state.selectedAlbum.data?.artists[0].name;
export const selectAlbumTotalTracks = (state) => state.selectedAlbum.data?.total_tracks;
export const selectAlbumReleaseDate = (state) => state.selectedAlbum.data?.release_date;
export const selectAlbumTracks = (state) => state.selectedAlbum.data?.tracks.items;
export const selectAlbumLoadingState = (state) => state.selectedAlbum?.loading;
export const selectAlbumLError = (state) => state.selectedAlbum?.error;

export default selectedAlbum.reducer;
