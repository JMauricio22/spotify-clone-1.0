import { createSlice } from '@reduxjs/toolkit';

const playListSlice = createSlice({
  name: 'playList',
  initialState: [],
  reducers: {
    setPlayList: (_, { payload }) => payload,
  },
});

export const { setPlayList } = playListSlice.actions;

export default playListSlice.reducer;
