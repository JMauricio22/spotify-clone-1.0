import { configureStore } from '@reduxjs/toolkit';
import playListReducer from './features/playlist';
import currenPlayListReducer from './features/currenPlayList';
import playerReducer from './features/player';
import recommendationReducer from './features/recommendations';
import artistReducer from './features/artists';
import selectedArtistReducer from './features/selectedArtist';

export default configureStore({
  reducer: {
    selectedArtist: selectedArtistReducer,
    player: playerReducer,
    myTopArtists: artistReducer,
    currentPlayList: currenPlayListReducer,
    playList: playListReducer,
    recommendations: recommendationReducer,
  },
});
