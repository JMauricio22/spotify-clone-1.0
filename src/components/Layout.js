import React from 'react';
import Aside from './Aside';
import Player from './Player/Player';
import HeaderBar from './HeaderBar';
import UserMenu from './UserMenu';
import NavigationButtons from './NavigationButtons';
import SearchInput from './SearchInput';
import { useSelector } from 'react-redux';
import { showSearchField } from '../features/headerState';

export default function ({ children }) {
  const showSearchInput = useSelector(showSearchField);

  return (
    <div className='w-screen h-screen overflow-hidden bg-[#1d1d1d] font-gothambook'>
      <main className='overflow-x-auto grid grid-areas-layout grid-cols-layout grid-rows-layout h-full scrollbar'>
        <Aside />
        <HeaderBar>
          <NavigationButtons>{showSearchInput && <SearchInput />}</NavigationButtons>
          <UserMenu />
        </HeaderBar>
        {children}
        <Player />
      </main>
    </div>
  );
}
