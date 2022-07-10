import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { spotifyApi } from '../utils/spotify';

const filters = ['artist', 'playlist'];

export const searchItems = createAsyncThunk('search/searchItems', async ({ query }, { signal, dispatch }) => {
  const resp = await fetch(
    'https://api.spotify.com/v1/search?' + new URLSearchParams({ q: `${query}`, type: filters.join(',') }),
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
    clearSearch: () => ({ ...initialState }),
    setFilter: (state, { payload }) => ({ ...state, filter: payload }),
    setQuery: (state, { payload }) => ({ ...state, query: payload }),
  },
  extraReducers(builder) {
    builder.addCase(searchItems.fulfilled, (state, { payload }) => {
      const { query, items } = payload;
      state.items = items;
      state.query = query;
    });
    builder.addCase(searchItems.rejected, (_, { error }) => ({ item: [], error: error.message }));
  },
});

export const { clearSearch, setFilter, setQuery } = searchSlice.actions;

export default searchSlice.reducer;
