import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { spotifyApi } from '../utils/spotify';

const initialState = {
  info: null,
  loading: true,
  error: '',
  follow: false,
};

export const fetchPlayListTracks = createAsyncThunk(
  'currentPlayList/fetchPlayListTracks',
  async ({ playListId, username }) => {
    const [playlistResp, followingResp] = await Promise.all([
      spotifyApi.getPlaylist(playListId),
      spotifyApi.areFollowingPlaylist(null, playListId, [username]),
    ]);
    return {
      playlist: playlistResp.body,
      follow: followingResp.body[0],
    };
  }
);

export const followPlaylist = createAsyncThunk('currentPlayList/followPlaylist', async (playListId) => {
  await spotifyApi.followPlaylist(playListId);
  return true;
});

export const unfollowPlaylist = createAsyncThunk('currentPlayList/unfollowPlaylist', async (playListId) => {
  await spotifyApi.unfollowPlaylist(playListId);
  return false;
});

const currentPlayListSlice = createSlice({
  name: 'currentPlayList',
  initialState,
  extraReducers(builder) {
    builder.addCase(fetchPlayListTracks.fulfilled, (_, { payload: { playlist, follow } }) => ({
      info: playlist,
      loading: false,
      error: '',
      follow,
    }));
    builder.addCase(fetchPlayListTracks.pending, () => ({ ...initialState, loading: true }));
    builder.addCase(fetchPlayListTracks.rejected, (_, { error }) => ({ ...initialState, error: error.message }));
    builder.addCase(followPlaylist.fulfilled, (state, { payload }) => ({
      ...state,
      follow: payload,
    }));
    builder.addCase(unfollowPlaylist.fulfilled, (state, { payload }) => ({
      ...state,
      follow: payload,
    }));
  },
});

export const selectCurrentPlaylist = (state) => state.currentPlayList.info;
export const selecthasItems = (state) => !!(state.currentPlayList.info?.tracks?.items.length > 0);
export const selectLoading = (state) => state.currentPlayList.loading;
export const selectLPlaylistName = (state) => state.currentPlayList.info?.name;
export const selectLPlaylistId = (state) => state.currentPlayList.info?.id;
export const selectFollow = (state) => state.currentPlayList.follow;

export default currentPlayListSlice.reducer;
