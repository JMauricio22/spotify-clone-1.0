import React, { useEffect, useRef, useState } from 'react';
import { SearchIcon, XIcon } from '@heroicons/react/solid';
import Container from '../components/Container';
import { searchItems, clearSearch, setFilter, setQuery } from '../features/search';
import { useDispatch, useSelector } from 'react-redux';
import ArtistCard from '../components/ArtistCard';
import CardItemList from '../components/CardSection';
import { generateItemsWithArtisAdapter, generateItemsWithPlaylistAdapter } from '../utils/cardItemAdapter';
import CardContainer from '../components/CardContainer';
import ArtistMobileCard from '../components/ArtistMobileCard';
import ArtistMobileSearch from '../components/ArtistMobileSearch';
import VerticalCardList from '../components/VerticalCardList';
import ColumnsCardList from '../components/ColumnsCardList';
import { Transition } from '@headlessui/react';
import Loader from '../components/Loader';

const filters = ['All', 'Artist', 'Playlist'];

const ItemList = CardItemList(CardContainer);

const Search = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.search.items);
  const loading = useSelector((state) => state.search.loading);
  const currentFilter = useSelector((state) => state.search.filter);
  const query = useSelector((state) => state.search.query);
  const [showCloseButton, setShowCloseButton] = useState(false);
  const [searchItemsPromise, setSearchItemsPromise] = useState(null);
  const timeoutId = useRef(null);

  /* When the component is unmounted, cancel the current request and reset the search state */
  useEffect(() => {
    return () => {
      if (searchItemsPromise) {
        searchItemsPromise.abort();
      }
      dispatch(clearSearch());
    };
  }, []);

  const search = ({ target }) => {
    /* If timeoutId exists then stop with clearTimeout */
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    /* Show close button */
    setShowCloseButton(!!target.value);
    /* Set query */
    dispatch(setQuery(target.value));
    /* Delay Search 300ms*/
    setTimeout(() => {
      const promise = dispatch(searchItems({ query: target.value }));
      setSearchItemsPromise(promise);
    }, 300);
  };

  const cancelSearch = () => {
    /* If search promise exists then cancel current request */
    if (searchItemsPromise) {
      searchItemsPromise.abort();
    }
    /* Hidden close button */
    setShowCloseButton(false);
    /* Reset state to initial state */
    dispatch(clearSearch());
  };

  return (
    <Container>
      <div className='bg-black h-[60px] flex justify-start items-center pl-8'>
        <div className='bg-gray-100 outline-none px-3 rounded-full text-black flex items-center space-x-3'>
          <span>
            <SearchIcon className='w-5 h-5' />
          </span>
          <input
            value={query}
            onChange={search}
            className='bg-transparent w-48 placeholder:text-gray-400 py-2 pr-4 outline-none placeholder:font-gothambook placeholder:text-sm'
            placeholder='Artist or songs'
          />
          <button className='w-5 h-5' disabled={!query} onClick={cancelSearch}>
            <Transition appear={true} show={showCloseButton}>
              <XIcon className='w-full h-full' />
            </Transition>
          </button>
        </div>
      </div>
      {loading && <Loader />}
      {!!(!loading && items) && (
        <div className='mt-4 pl-10 space-x-2'>
          {filters.map((filter) => (
            <span
              className={`inline-block px-5 py-2 text-sm rounded-full font-gothammedium cursor-pointer ${
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
      {!loading && (currentFilter === 'all' || currentFilter === 'artist') && items?.artists?.items?.length > 0 && (
        <ItemList
          title='Artists'
          layout={(items) => <VerticalCardList items={items} />}
          items={generateItemsWithArtisAdapter(items.artists.items)}
          card={(props) => <ArtistCard rounded {...props} />}
          cardMobile={(props) => <ArtistMobileSearch rounded {...props} />}
        />
      )}
      {!loading && (currentFilter === 'all' || currentFilter === 'playlist') && items?.playlists?.items?.length > 0 && (
        <ItemList
          title='Playlist'
          layout={(items) => <ColumnsCardList items={items} />}
          items={generateItemsWithPlaylistAdapter(items.playlists.items)}
          card={(props) => <ArtistCard {...props} />}
          cardMobile={(props) => <ArtistMobileCard {...props} />}
        />
      )}
    </Container>
  );
};

Search.layout = true;

export default Search;
