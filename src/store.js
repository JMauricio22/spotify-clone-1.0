import { configureStore } from '@reduxjs/toolkit';
import playListReducer from './features/playlist';
import currenPlayListReducer from './features/currenPlayList';

export default configureStore({
  reducer: {
    currentPlayList: currenPlayListReducer,
    playList: playListReducer,
  },
});
