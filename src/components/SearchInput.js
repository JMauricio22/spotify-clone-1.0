import React, { useRef, useState, useEffect } from 'react';
import { SearchIcon, XIcon } from '@heroicons/react/solid';
import { searchItems, clearSearch, setQuery, selectSearchQuery } from '../features/search';
import { useDispatch, useSelector } from 'react-redux';
import { Transition } from '@headlessui/react';

export default function SearchInput() {
  const dispatch = useDispatch();
  const query = useSelector(selectSearchQuery);
  const [showCloseButton, setShowCloseButton] = useState(false);
  const timeoutId = useRef(null);
  const [searchItemsPromise, setSearchItemsPromise] = useState(null);

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
    <div className='bg-black basis-[60px] flex-shrink-0 flex-grow-0 flex justify-start items-center pl-8'>
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
  );
}
