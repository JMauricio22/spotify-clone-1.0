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
import devicesReducer from './features/devices';

export default configureStore({
  reducer: {
    init: initReducer,
    search: searchReducer,
    selectedArtist: selectedArtistReducer,
    selectedAlbum: selectedAlbumReducer,
    player: playerReducer,
    currentPlayList: currenPlayListReducer,
    playList: playListReducer,
    categories: categoriesReducer,
    selectedCategory: selectedCategoryReducer,
    toastState: toastStateReducer,
    headerState: headerStateReducer,
    avaliableDevices: devicesReducer,
  },
});
