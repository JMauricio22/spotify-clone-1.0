import { configureStore } from '@reduxjs/toolkit';
import playListReducer from './features/playlist';
import currenPlayListReducer from './features/currenPlayList';
import playerReducer from './features/player';
import recommendationReducer from './features/recommendations';
import artistReducer from './features/artists';
import selectedArtistReducer from './features/selectedArtist';
import searchReducer from './features/search';
import selectedAlbumReducer from './features/selectedAlbum';

export default configureStore({
  reducer: {
    search: searchReducer,
    selectedArtist: selectedArtistReducer,
    selectedAlbum: selectedAlbumReducer,
    player: playerReducer,
    myTopArtists: artistReducer,
    currentPlayList: currenPlayListReducer,
    playList: playListReducer,
    recommendations: recommendationReducer,
  },
});
