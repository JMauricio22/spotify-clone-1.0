import React, { useId } from 'react';
import SongItem from './SongItem';

export default function Playlist({ items }) {
  const id = useId();

  return (
    <ul className='px-6 py-4 w-full h-auto overflow-y-auto bg-gradient-to-b from-[rgba(0,0,0,0.7)] to-black text-sm md:text-sm md:text-md'>
      {items.map((item, index) => (
        <SongItem key={`${id}-${index}`} {...item} />
      ))}
    </ul>
  );
}
