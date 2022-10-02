import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { spotifyApi } from '../utils/spotify';

const initialState = {
  data: null,
  loading: false,
  error: '',
  follow: false,
};

export const fetchArtistWithTopTracks = createAsyncThunk(
  'selectedArtist/fetchArtistWithTopTracks',
  async (artistId) => {
    const { body: artist } = await spotifyApi.getArtist(artistId);
    const { body: topTracks } = await spotifyApi.getArtistTopTracks(artist.id, 'GB');
    const { body: isFollowing } = await spotifyApi.isFollowingArtists([artist.id]);

    artist.tracks = topTracks.tracks;
    const [follow] = isFollowing;

    return { artist, follow };
  }
);

export const followArtist = createAsyncThunk('selectedArtist/followArtist', async (artistId) => {
  const { body } = await spotifyApi.followArtists([artistId]);
  return true;
});

export const unfollowArtist = createAsyncThunk('selectedArtist/unfollowArtist', async (artistId) => {
  const { body } = await spotifyApi.unfollowArtists([artistId]);
  return false;
});

const selectedArtistSlice = createSlice({
  name: 'selectedArtist',
  initialState,
  extraReducers(builder) {
    builder.addCase(fetchArtistWithTopTracks.fulfilled, (_, { payload: { artist, follow } }) => ({
      data: artist,
      loading: false,
      follow,
      error: '',
    }));
    builder.addCase(fetchArtistWithTopTracks.pending, (state) => ({ ...state, loading: true }));
    builder.addCase(fetchArtistWithTopTracks.rejected, (_, { error }) => ({ ...initialState, error: error.message }));
    builder.addCase(followArtist.fulfilled, (state) => ({ ...state, follow: true }));
    builder.addCase(unfollowArtist.fulfilled, (state) => ({ ...state, follow: false }));
  },
});

export const selectArtist = (state) => state.selectedArtist.data;
export const selectArtistLoadingState = (state) => state.selectedArtist.loading;
export const selectArtistError = (state) => state.selectedArtist.error;
export const selectArtistId = (state) => state.selectedArtist.data.id;
export const selectArtistUri = (state) => state.selectedArtist.data.uri;
export const selectArtistFollow = (state) => state.selectedArtist.follow;

export default selectedArtistSlice.reducer;
