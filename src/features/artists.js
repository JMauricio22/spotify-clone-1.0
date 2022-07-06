import { createSlice } from '@reduxjs/toolkit';
import { fetchRecommendations } from './recommendations';

const initialState = {
  items: [],
};

const artistSlice = createSlice({
  name: 'myTopArtists',
  initialState,
  extraReducers(builder) {
    builder.addCase(fetchRecommendations.fulfilled, (_, { payload: { artists } }) => ({ items: artists }));
  },
});

export default artistSlice.reducer;
