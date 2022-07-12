import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { spotifyApi } from '../utils/spotify';

const filters = ['artist', 'playlist'];

export const searchItems = createAsyncThunk('search/searchItems', async ({ query }, { signal, rejectWithValue }) => {
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

  if (data.error) {
    return rejectWithValue({
      error: {
        status: data.error.status,
        message: data.error.message,
      },
    });
  }

  return data;
});

const initialState = {
  query: '',
  filter: 'all',
  items: null,
  loading: false,
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
    builder.addCase(searchItems.fulfilled, (state, { payload }) => ({
      ...state,
      items: payload,
      loading: false,
      error: '',
    }));
    builder.addCase(searchItems.pending, (state) => ({ ...state, items: null, loading: true }));
    builder.addCase(searchItems.rejected, (state, { error }) => ({
      ...state,
      item: null,
      error: error.message,
      loading: false,
    }));
  },
});

export const { clearSearch, setFilter, setQuery } = searchSlice.actions;

export const selectSearchItems = (state) => state.search.items;
export const selectSearchLoadidngState = (state) => state.search.loading;
export const selectSearchFilter = (state) => state.search.filter;
export const selectSearchQuery = (state) => state.search.query;

export default searchSlice.reducer;
