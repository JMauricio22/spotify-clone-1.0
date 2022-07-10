import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { spotifyApi } from '../utils/spotify';

export const searchItems = createAsyncThunk('search/searchItems', async ({ query, filter }, { signal }) => {
  const resp = await fetch(
    'https://api.spotify.com/v1/search?' + new URLSearchParams({ q: `${query}`, type: filter }),
    {
      headers: {
        Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
        'Content-Type': 'appplication/json',
      },
      signal,
      method: 'GET',
    }
  );

  const data = await resp.json();

  return {
    items: data,
    query,
  };
});

const initialState = {
  query: '',
  filter: 'artist',
  items: [],
  error: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.query = '';
      state.items = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(searchItems.fulfilled, (_, { payload }) => ({ ...initialState, ...payload }));
    builder.addCase(searchItems.rejected, (_, { error }) => ({ item: [], error: error.message }));
  },
});

export const { clearSearch } = searchSlice.actions;

export default searchSlice.reducer;
