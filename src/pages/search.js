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
import ArtistMobileCard from '../components/ArtistMobileCard';
import ArtistMobileSearch from '../components/ArtistMobileSearch';
import VerticalCardList from '../components/VerticalCardList';
import ColumnsCardList from '../components/ColumnsCardList';
import Loader from '../components/Loader';
import SearchInput from '../components/SearchInput';
import SearchMainContent from '../components/SearchMainContent';
import { useMediaQuery } from 'react-responsive';
import CategoryList from '../components/category/CategoryList';

const filters = ['All', 'Artist', 'Playlist', 'Album'];

const ItemList = CardItemList(CardContainer);

const Search = () => {
  const dispatch = useDispatch();
  const query = useSelector(selectSearchQuery);
  const items = useSelector(selectSearchItems);
  const loading = useSelector(selectSearchLoadidngState);
  const currentFilter = useSelector(selectSearchFilter);
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' });

  return (
    <Container>
      <SearchInput />
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
      {!loading && currentFilter === 'all' && items?.artists?.items?.length > 0 && items?.tracks?.items?.length > 0 && (
        <SearchMainContent />
      )}
      {!loading && (currentFilter === 'all' || currentFilter === 'artist') && items?.artists?.items?.length > 0 && (
        <ItemList
          title='Artists'
          layout={(items) => <VerticalCardList items={items} />}
          items={adaptArtistToCard(items.artists.items)}
          card={(props) => <ArtistCard rounded {...props} />}
          showAll={isDesktop && currentFilter === 'artist'}
          cardMobile={(props) => <ArtistMobileSearch rounded {...props} />}
        />
      )}
      {!loading && (currentFilter === 'all' || currentFilter === 'playlist') && items?.playlists?.items?.length > 0 && (
        <ItemList
          title='Playlist'
          layout={(items) => <ColumnsCardList items={items} />}
          items={adaptPlaylistToCard(items.playlists.items)}
          card={(props) => <ArtistCard {...props} />}
          showAll={isDesktop && currentFilter === 'playlist'}
          cardMobile={(props) => <ArtistMobileCard {...props} />}
        />
      )}
      {!loading && (currentFilter === 'all' || currentFilter === 'album') && items?.albums?.items?.length > 0 && (
        <ItemList
          title='Albums'
          layout={(items) => <ColumnsCardList items={items} />}
          items={adaptAlbumToCard(items.albums.items)}
          card={(props) => <ArtistCard {...props} />}
          showAll={isDesktop && currentFilter === 'album'}
          cardMobile={(props) => <ArtistMobileCard {...props} />}
        />
      )}
    </Container>
  );
};

Search.layout = true;

export default Search;
