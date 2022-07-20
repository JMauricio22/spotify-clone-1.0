import React from 'react';

export default function TrackAlbum({ albumName }) {
  return (
    <span className='lg:flex items-center hidden lg:text-md text-xs w-[90%] truncate'>
      <span className='w'>{albumName}</span>
    </span>
  );
}
