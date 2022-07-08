import React from 'react';
import { SearchIcon } from '@heroicons/react/solid';
import Container from './Container';

export default function Search() {
  return (
    <Container>
      <div className='bg-black h-[60px] flex justify-start items-center pl-8'>
        <div className='bg-gray-100 outline-none rounded-full w-80 text-black flex items-center'>
          <span className='px-3'>
            <SearchIcon className='w-5 h-5' />
          </span>
          <input
            className='bg-transparent placeholder:text-gray-400 py-2 pr-4 outline-none placeholder:font-gothambook placeholder:text-sm'
            placeholder='Artist or songs'
          />
        </div>
      </div>
    </Container>
  );
}
