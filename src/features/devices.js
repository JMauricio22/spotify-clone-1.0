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
  console.log({
    devices: body,
  });
  const devices = body.devices;
  return devices;
});

export const transferPlayback = createAsyncThunk('avaliableDevices/transferPlayback', async (deviceId) => {
  const { body } = await spotifyApi.transferMyPlayback([deviceId]);
  return body;
});

const avaliableDevices = createSlice({
  name: 'avaliableDevices',
  initialState,
  reducers: {
    changeActiveDevice: (state, { payload }) => {
      const deviceId = payload;
      const currentActiveDevice = state.devices.filter(({ is_active }) => is_active);
      if (currentActiveDevice.length !== 0) {
        currentActiveDevice[0].is_active = false;
      }

      state.devices = state.devices.map((device) => (device.id === deviceId ? { ...device, is_active: true } : device));
    },
  },
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

export const { changeActiveDevice } = avaliableDevices.actions;

export default avaliableDevices.reducer;
