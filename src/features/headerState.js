import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: false,
  headerControls: null,
};

const headerStateSlice = createSlice({
  name: 'headerState',
  initialState,
  reducers: {
    showSearchInput: () => ({ ...initialState, search: true }),
    showHeaderControls: (_, { payload }) => ({ ...initialState, headerControls: payload }),
    hideSearchInput: () => ({ ...initialState, search: false }),
    hideHeaderControls: () => ({ ...initialState, headerControls: null }),
  },
});

export const { showSearchInput, hideSearchInput, showHeaderControls, hideHeaderControls } = headerStateSlice.actions;

export const showSearchField = (state) => state.headerState.search;
export const getHeaderControlState = (state) => state.headerState.headerControls;

export default headerStateSlice.reducer;
