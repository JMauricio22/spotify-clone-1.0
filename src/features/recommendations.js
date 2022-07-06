import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { spotifyApi } from '../utils/spotify';

export const fetchRecommendations = createAsyncThunk('recommendations/fetchRecommendations', async () => {
  const resp = await fetch('https://api.spotify.com/v1/me/top/artists?' + new URLSearchParams({ limit: 5 }), {
    headers: {
      Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });

  const { items: artists = [] } = await resp.json();
  if (!artists || artists.length === 0) {
    throw new Error('No artists found');
  }
  const { body } = await spotifyApi.getRecommendations({
    min_energy: 0.4,
    seed_artists: artists.slice(0, 5).map((artist) => artist.id),
    min_popularity: 50,
    limit: 5,
  });

  return {
    recommendations: body.tracks,
    artists,
  };
});

const initialState = {
  items: [],
  error: '',
};

const recommendationSlice = createSlice({
  name: 'recommendations',
  initialState,
  extraReducers(builder) {
    builder.addCase(fetchRecommendations.fulfilled, (_, { payload }) => ({
      items: payload.recommendations,
      error: '',
    }));
    builder.addCase(fetchRecommendations.rejected, (_, { error }) => ({ ...initialState, error: error.message }));
  },
});

export default recommendationSlice.reducer;
