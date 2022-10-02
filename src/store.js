import { configureStore } from '@reduxjs/toolkit';
import playListReducer from './features/playlist';
import currenPlayListReducer from './features/currenPlayList';
import playerReducer from './features/player';
import initReducer from './features/init';
import selectedArtistReducer from './features/selectedArtist';
import searchReducer from './features/search';
import selectedAlbumReducer from './features/selectedAlbum';
import categoriesReducer from './features/categories';
import selectedCategoryReducer from './features/selectedCategory';
import toastStateReducer from './features/toastState';
import headerStateReducer from './features/headerState';
import playbackReducer from './features/playback';

export default configureStore({
  reducer: {
    init: initReducer,
    playback: playbackReducer,
    player: playerReducer,
    search: searchReducer,
    selectedArtist: selectedArtistReducer,
    selectedAlbum: selectedAlbumReducer,
    currentPlayList: currenPlayListReducer,
    playList: playListReducer,
    categories: categoriesReducer,
    selectedCategory: selectedCategoryReducer,
    toastState: toastStateReducer,
    headerState: headerStateReducer,
  },
});
