import { createSlice } from '@reduxjs/toolkit';

const DEFAULT_TIMEOUT = 1500;

const initialState = {
  show: false,
  message: '',
};

const toastSlice = createSlice({
  name: 'toastState',
  initialState,
  reducers: {
    showNotification: (_, { payload }) => ({ show: true, message: payload }),
    hideNotification: () => ({ show: false, message: '' }),
  },
});

export const getToastState = (state) => state.toastState.show;
export const getToastMessage = (state) => state.toastState.message;

const { showNotification, hideNotification } = toastSlice.actions;

const showNotificationWithTimeout = (dispatch, message) => {
  dispatch(showNotification(message));

  setTimeout(() => dispatch(hideNotification(message)), DEFAULT_TIMEOUT);
};

export { showNotificationWithTimeout };

export default toastSlice.reducer;
