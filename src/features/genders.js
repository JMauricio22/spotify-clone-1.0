import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const genderSlice = createSlice({
  name: 'genders',
  initialState,
  extraReducers(builder) {},
});

export default genderSlice.reducer;
