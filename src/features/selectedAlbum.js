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
export const selectAlbumLoadingState = (state) => state.selectedAlbum.loading;

export default selectedAlbum.reducer;
