import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { spotifyApi } from '../utils/spotify';

const initialState = {
  data: null,
  error: '',
};

export const fetchArtistWithTopTracks = createAsyncThunk(
  'selectedArtist/fetchArtistWithTopTracks',
  async (artistId) => {
    const { body: artist } = await spotifyApi.getArtist(artistId);
    const { body } = await spotifyApi.getArtistTopTracks(artist.id, 'GB');

    artist.tracks = body.tracks;

    return artist;
  }
);

const selectedArtistSlice = createSlice({
  name: 'selectedArtist',
  initialState,
  extraReducers(builder) {
    builder.addCase(fetchArtistWithTopTracks.fulfilled, (_, { payload }) => ({ data: payload, error: '' }));
    builder.addCase(fetchArtistWithTopTracks.rejected, (_, { error }) => ({ ...initialState, error: error.message }));
  },
});

export default selectedArtistSlice.reducer;