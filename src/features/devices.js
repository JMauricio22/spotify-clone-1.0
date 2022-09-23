import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { spotifyApi } from '../utils/spotify';

const initialState = {
  loading: false,
  devices: [],
  error: '',
};

export const fetchAvaliableDevices = createAsyncThunk('avaliableDevices/fetchAvaliableDevices', async () => {
  const { body } = await spotifyApi.getMyDevices();
  const devices = body.devices;
  return devices;
});

const avaliableDevices = createSlice({
  name: 'avaliableDevices',
  initialState,
  extraReducers(builder) {
    builder.addCase(fetchAvaliableDevices.fulfilled, (_, { payload }) => ({ ...initialState, devices: payload }));
    builder.addCase(fetchAvaliableDevices.pending, () => ({ ...initialState, loading: true }));
    builder.addCase(fetchAvaliableDevices.rejected, (_, { error }) => ({ ...initialState, error }));
  },
});

export const selectDevicesLoading = (state) => state.avaliableDevices.loading;
export const selectDevicesError = (state) => state.avaliableDevices.error;
export const selectAllDevices = (state) => state.avaliableDevices.devices.filter(({ is_active }) => !is_active);
export const selectActiveDevice = (state) => {
  let device = state.avaliableDevices.devices.filter(({ is_active }) => is_active);
  device = device.length !== 0 ? device[0] : null;
  return device;
};

export default avaliableDevices.reducer;
