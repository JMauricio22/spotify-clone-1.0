import React from 'react';
import Container from '../components/Container';
import {
  setFilter,
  selectSearchItems,
  selectSearchLoadidngState,
  selectSearchFilter,
  selectSearchQuery,
} from '../features/search';
import { useDispatch, useSelector } from 'react-redux';
import ArtistCard from '../components/ArtistCard';
import CardItemList from '../components/CardSection';
import { adaptArtistToCard, adaptPlaylistToCard, adaptAlbumToCard } from '../utils/cardItemAdapter';
import CardContainer from '../components/CardContainer';
import ColumnsCardList from '../components/ColumnsCardList';
import Loader from '../components/Loader';
import SearchInput from '../components/SearchInput';
import SearchMainContent from '../components/SearchMainContent';
import CategoryList from '../components/category/CategoryList';

const filters = ['All', 'Artist', 'Playlist', 'Album'];

const Items = CardItemList(CardContainer);

const Search = () => {
  const dispatch = useDispatch();
  const query = useSelector(selectSearchQuery);
  const items = useSelector(selectSearchItems);
  const loading = useSelector(selectSearchLoadidngState);
  const currentFilter = useSelector(selectSearchFilter);
  const isAll = currentFilter === 'all';
  const isArtists = currentFilter === 'artist';
  const isPlaylist = currentFilter === 'playlist';
  const isAlbum = currentFilter === 'album';

  return (
    <Container headerElement={<SearchInput />}>
      {loading && <Loader />}
      {!loading && !query && <CategoryList />}
      {!!(!loading && items) && (
        <div className='mt-4 pl-10 space-x-2'>
          {filters.map((filter) => (
            <span
              className={`inline-block px-4 py-2 text-sm rounded-full font-gothammedium cursor-pointer ${
                filter.toLowerCase() === currentFilter ? 'bg-slate-100 text-[#121212]' : 'text-slate-100 bg-[#121212] '
              }`}
              key={`filter-item-${filter}`}
              onClick={() => dispatch(setFilter(filter.toLowerCase()))}
            >
              {filter}
            </span>
          ))}
        </div>
      )}
      {!loading && isAll && items?.artists?.items?.length > 0 && items?.tracks?.items?.length > 0 && (
        <SearchMainContent />
      )}
      {!loading && (isAll || isArtists) && items?.artists?.items?.length > 0 && (
        <Items
          title='Artists'
          layout={(items) => <ColumnsCardList items={items} minCols={2} />}
          items={adaptArtistToCard(items.artists.items)}
          card={(props) => <ArtistCard rounded {...props} />}
          showAll={!isAll}
        />
      )}
      {!loading && (isAll || isPlaylist) && items?.playlists?.items?.length > 0 && (
        <Items
          title='Playlist'
          layout={
            isAll
              ? (items) => <ColumnsCardList items={items} minCols={2} />
              : (items) => <ColumnsCardList items={items} minCols={2} />
          }
          items={adaptPlaylistToCard(items.playlists.items)}
          card={(props) => <ArtistCard {...props} />}
          showAll={!isAll}
        />
      )}
      {!loading && (isAll || isAlbum) && items?.albums?.items?.length > 0 && (
        <Items
          title='Albums'
          items={adaptAlbumToCard(items.albums.items)}
          layout={
            isAll
              ? (items) => <ColumnsCardList items={items} minCols={2} />
              : (items) => <ColumnsCardList items={items} minCols={2} />
          }
          card={(props) => <ArtistCard {...props} />}
          showAll={!isAll}
        />
      )}
    </Container>
  );
};

Search.layout = true;

export default Search;
