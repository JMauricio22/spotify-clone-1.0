import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { spotifyApi } from '../utils/spotify';

export const fetchRecommendations = createAsyncThunk('init/fetchRecommendations', async () => {
  const resp = await fetch('https://api.spotify.com/v1/me/top/artists?' + new URLSearchParams({ limit: 10 }), {
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
    limit: 10,
  });

  return {
    recommendations: body.tracks,
    artists,
  };
});

const initialState = {
  recommendations: [],
  artists: [],
  error: '',
  loading: true,
};

const recommendationSlice = createSlice({
  name: 'init',
  initialState,
  extraReducers(builder) {
    builder.addCase(fetchRecommendations.fulfilled, (_, { payload: { recommendations, artists } }) => ({
      recommendations,
      artists,
      error: '',
      loading: false,
    }));
    builder.addCase(fetchRecommendations.rejected, (_, { error }) => ({ ...initialState, error: error.message }));
    builder.addCase(fetchRecommendations.pending, (state) => ({ ...state, loading: true }));
  },
});

export const selectInitLoadingState = (state) => state.init.loading;
export const selectInitRecommendations = (state) => state.init.recommendations;
export const selectInitArtists = (state) => state.init.artists;

export default recommendationSlice.reducer;
