import React from 'react';
import LeftMenu from './LeftMenu';
import Player from './Player';

export default function ({ children }) {
  return (
    <div className='w-screen h-screen overflow-hidden bg-[#1d1d1d] font-gothambook'>
      <main className='w-full h-full flex items-stretch'>
        <LeftMenu />
        {children}
        <Player />
      </main>
    </div>
  );
}
