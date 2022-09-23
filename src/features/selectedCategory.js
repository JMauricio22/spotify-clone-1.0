import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { spotifyApi } from '../utils/spotify';

const initialState = {
  loading: true,
  playlist: [],
  data: null,
  error: '',
};

export const fetchCategory = createAsyncThunk('category/fetchCategory', async (categoryId) => {
  const [categoryResponse, playlistResponse] = await Promise.all([
    spotifyApi.getCategory(categoryId),
    spotifyApi.getPlaylistsForCategory(categoryId),
  ]);
  const { body: category } = categoryResponse;
  const { body: playlistForCategory } = playlistResponse;
  return {
    category,
    playlist: playlistForCategory.playlists.items,
  };
});

const categorySlice = createSlice({
  name: 'selectedCategory',
  initialState,
  extraReducers(builder) {
    builder.addCase(fetchCategory.fulfilled, (_, { payload }) => ({
      ...initialState,
      loading: false,
      data: payload.category,
      playlist: payload.playlist,
    }));
    builder.addCase(fetchCategory.pending, () => ({ ...initialState, loading: true }));
    builder.addCase(fetchCategory.rejected, (_, { error }) => ({ ...initialState, loading: false, error }));
  },
});

export const selectCategory = (state) => state.selectedCategory.data;
export const selectLoadingState = (state) => state.selectedCategory.loading;
export const selectCategoryPlayList = (state) => state.selectedCategory.playlist;
export const selectCategoryPlayListError = (state) => state.selectedCategory.error;

export default categorySlice.reducer;
