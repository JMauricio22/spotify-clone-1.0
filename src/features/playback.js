import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { spotifyApi } from '../utils/spotify';

export const PLAYER_NAME = 'Spotify Clone By M.L';

export const MAX_TRANSFER_PLAYBACK_TRIES = 3;
export const MAX_DEVICE_FETCH_TRIES = 3;

export const FETCH_DEVICES_ERROR = 'FETCH_DEVICES_ERROR';
export const TRANSFER_PLAYBACK_ERROR = 'TRANSFER_PLAYBACK_ERROR';

const initialState = {
  init: true,
  deviceId: '',
  transfer: false,
  error: '',
  transferTries: 0,
  devices: [],
  fetchDevices: false,
  devicesFetchTries: 0,
};

export const transferPlayback = createAsyncThunk('playback/transferPlayback', async (deviceId, { rejectWithValue }) => {
  try {
    await spotifyApi.transferMyPlayback([deviceId]);
    return deviceId;
  } catch (error) {
    return rejectWithValue(deviceId);
  }
});

export const fetchAvaliableDevices = createAsyncThunk('playback/fetchAvaliableDevices', async (_, { getState }) => {
  const deviceId = getState().playback.deviceId;
  const {
    body: { devices },
  } = await spotifyApi.getMyDevices();
  return deviceId
    ? devices.map((device) => {
        device.is_active = device.id === deviceId ? true : false;
        return device;
      })
    : devices;
});

const playbackSlice = createSlice({
  name: 'playback',
  initialState,
  reducers: {
    transferPlaybackPlayer: (_, { payload: deviceId }) => ({ ...initialState, deviceId, transfer: true }),
  },
  extraReducers(builder) {
    builder.addCase(transferPlayback.fulfilled, (state, { payload: deviceId }) => {
      state.error = '';
      state.transferTries = 0;
      state.transfer = false;
      state.fetchDevices = true;
    });
    builder.addCase(transferPlayback.rejected, (state, { payload: deviceId }) => {
      if (state.init && state.deviceId === deviceId) {
        state.transferTries += 1;
        if (state.transferTries === MAX_TRANSFER_PLAYBACK_TRIES) {
          state.fetchDevices = true;
        }
      }
      state.error = TRANSFER_PLAYBACK_ERROR;
    });
    builder.addCase(fetchAvaliableDevices.fulfilled, (state, { payload }) => {
      state.devices = payload;
      state.fetchDevices = false;
      state.devicesFetchTries = 0;
      state.init = false;
    });
    builder.addCase(fetchAvaliableDevices.rejected, (state) => {
      if (state.init) {
        state.devicesFetchTries += 1;
        if (state.devicesFetchTries === MAX_DEVICE_FETCH_TRIES) {
          state.init = false;
        }
      }
      state.error = FETCH_DEVICES_ERROR;
    });
  },
});

export const selectPlaybackInit = (state) => state.playback.init;
export const selectPlaybackDeviceId = (state) => state.playback.deviceId;
export const selectPlaybayTransfer = (state) => state.playback.transfer;
export const selectPlaybackError = (state) => state.playback.error;
export const selectPlaybackTransferTries = (state) => state.playback.transferTries;
export const selectDevices = (state) => state.playback.devices.filter((device) => !device.is_active);
export const selectActiveDevice = (state) => state.playback.devices.find((device) => device.is_active);
export const selectFetchDevices = (state) => state.playback.fetchDevices;
export const selectFetchDevicesFetchTries = (state) => state.playback.devicesFetchTries;

export const { transferPlaybackPlayer } = playbackSlice.actions;

export default playbackSlice.reducer;
