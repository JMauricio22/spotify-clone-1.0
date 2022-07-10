import React, { useEffect, useRef, useState } from 'react';
import { SearchIcon, XIcon } from '@heroicons/react/solid';
import Container from './Container';
import { searchItems, clearSearch } from '../features/search';
import { useDispatch, useSelector } from 'react-redux';
import ArtistCard from './ArtistCard';
import CardItemList from './CardItemList';
import { generateItemsWithArtisAdapter } from '../utils/cardItemAdapter';
import CardContainer from './CardContainer';
import ArtistMobileSearch from './ArtistMobileSearch';
import { Transition } from '@headlessui/react';

const ItemList = CardItemList(CardContainer);

export default function Search() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.search.items);
  const filter = useSelector((state) => state.search.filter);
  const query = useSelector((state) => state.search.query);
  const [showCloseButton, setShowCloseButton] = useState(false);
  const [searchItemsPromise, setSearchItemsPromise] = useState(null);
  const timeoutId = useRef(null);
  const searchInput = useRef(null);

  const search = ({ target }) => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    setShowCloseButton(!!target.value);
    setTimeout(() => {
      const promise = dispatch(searchItems({ query: target.value, filter }));
      setSearchItemsPromise(promise);
    }, 300);
  };

  const cancelSearch = () => {
    if (searchItemsPromise) {
      searchItemsPromise.abort();
    }
    searchInput.current.value = '';
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
            ref={searchInput}
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
      {filter === 'artist' && items?.artists?.items?.length > 0 && (
        <ItemList
          title={`Results`}
          items={generateItemsWithArtisAdapter(items.artists.items)}
          card={(props) => <ArtistCard rounded {...props} />}
          cardMobile={(props) => <ArtistMobileSearch rounded {...props} />}
        />
      )}
    </Container>
  );
}
