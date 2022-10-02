import { createAsyncThunk } from '@reduxjs/toolkit';
import { spotifyApi } from '../utils/spotify';

export const transferPlayback = createAsyncThunk('commons/transferPlayback', async (deviceId, { rejectWithValue }) => {
  try {
    await spotifyApi.transferMyPlayback([deviceId]);
    return deviceId;
  } catch (error) {
    return rejectWithValue(deviceId);
  }
});
