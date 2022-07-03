import { configureStore } from '@reduxjs/toolkit';
import playListReducer from './features/playlist';

export default configureStore({
  reducer: {
    playList: playListReducer,
  },
});
