import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { spotifyApi } from '../utils/spotify';

const initialState = {
  loading: false,
  items: [],
  error: '',
};

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const { body } = await spotifyApi.getCategories({
    limit: 50,
  });
  const categories = body.categories.items;
  return categories;
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  extraReducers(builder) {
    builder.addCase(fetchCategories.fulfilled, (_, { payload }) => ({ ...initialState, items: payload }));
  },
});

export const getCategories = (state) => state.categories.items;

export default categoriesSlice.reducer;
