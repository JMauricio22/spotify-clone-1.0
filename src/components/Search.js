import React, { useRef } from 'react';
import { SearchIcon } from '@heroicons/react/solid';
import Container from './Container';
import { searchItems } from '../features/search';
import { useDispatch, useSelector } from 'react-redux';
import ArtistCard from './ArtistCard';
import CardItemList from './CardItemList';
import { generateItemsWithArtisAdapter } from '../utils/cardItemAdapter';
import CardContainer from './CardContainer';
import ArtistMobileSearch from './ArtistMobileSearch';

const ItemList = CardItemList(CardContainer);

export default function Search() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.search.items);
  const filter = useSelector((state) => state.search.filter);
  const timeoutId = useRef(null);

  const search = ({ target }) => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    setTimeout(() => dispatch(searchItems({ query: target.value, filter })), 300);
  };

  return (
    <Container>
      <div className='bg-black h-[60px] flex justify-start items-center pl-8'>
        <div className='bg-gray-100 outline-none rounded-full w-80 text-black flex items-center'>
          <span className='px-3'>
            <SearchIcon className='w-5 h-5' />
          </span>
          <input
            onChange={search}
            className='bg-transparent placeholder:text-gray-400 py-2 pr-4 outline-none placeholder:font-gothambook placeholder:text-sm'
            placeholder='Artist or songs'
          />
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
