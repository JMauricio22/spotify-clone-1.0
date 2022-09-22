import { configureStore } from '@reduxjs/toolkit';
import playListReducer from './features/playlist';
import currenPlayListReducer from './features/currenPlayList';
import playerReducer from './features/player';
import recommendationReducer from './features/recommendations';
import artistReducer from './features/artists';
import selectedArtistReducer from './features/selectedArtist';
import searchReducer from './features/search';
import selectedAlbumReducer from './features/selectedAlbum';
import categoriesReducer from './features/categories';
import selectedCategoryReducer from './features/selectedCategory';
import toastStateReducer from './features/toastState';
import headerStateReducer from './features/headerState';

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
    categories: categoriesReducer,
    selectedCategory: selectedCategoryReducer,
    toastState: toastStateReducer,
    headerState: headerStateReducer,
  },
});
