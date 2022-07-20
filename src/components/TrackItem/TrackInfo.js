import React from 'react';
import { PlayIcon } from '@heroicons/react/solid';
import clsx from 'clsx';

export default function TrackInfo({ position, url, trackName, artistName, showImage = true }) {
  return (
    <span
      className={clsx(
        'grid max-w-full md:grid-rows-1',
        showImage ? 'grid-cols-[60px_1fr] md:grid-cols-[40px_60px_1fr]' : 'grid-cols-[60px_1fr] md:grid-cols-[40px_1fr]'
      )}
    >
      <div className='text-gray-300 md:flex items-center justify-center hidden'>
        <PlayIcon className='group-hover:block hidden w-8 h-10' />
        <span className='group-hover:hidden inline-block lg:text-lg text-sm font-gothammedium'>{position}</span>
      </div>
      {showImage && (
        <div className='flex items-center mr-4 md:mr-0'>
          <img src={url} className='w-14 h-14 md:w-10 md:h-10' />
        </div>
      )}
      <div className='flex flex-col flex-nowrap overflow-x-hidden max-w-[90%] justify-center'>
        <span className='text-white font-medium truncate font-gothammedium lg:text-lg text-md'>{trackName}</span>
        <span className='text-gray-300 truncate font-medium lg:text-md text-sm'>{artistName}</span>
      </div>
    </span>
  );
}
