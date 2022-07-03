import { configureStore } from '@reduxjs/toolkit';
import playListReducer from './features/playlist';
import currenPlayListReducer from './features/currenPlayList';
import playerReducer from './features/player';

export default configureStore({
  reducer: {
    player: playerReducer,
    currentPlayList: currenPlayListReducer,
    playList: playListReducer,
  },
});
