import { createSlice } from '@reduxjs/toolkit';

const playListSlice = createSlice({
  name: 'playList',
  initialState: {
    items: [],
    loading: false,
    error: '',
  },
  reducers: {
    setPlayList: (_, { payload }) => ({ items: payload, error: '' }),
    setPlayListError: (_, { payload }) => ({ items: [], error: payload }),
  },
});

export const { setPlayList, setPlayListError } = playListSlice.actions;

export const selectUserPlaylist = (state) => state.playList.items;

export default playListSlice.reducer;
