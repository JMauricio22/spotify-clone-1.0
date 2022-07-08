import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { spotifyApi } from '../utils/spotify';

const initialState = {
  query: '',
  filter: '',
  items: [],
  error: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  extraReducers(builder) {},
});

export default searchSlice.reducer;
