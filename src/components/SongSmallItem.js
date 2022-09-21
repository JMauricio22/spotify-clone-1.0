import React from 'react';
import { useDispatch } from 'react-redux';
import { PlayIcon } from '@heroicons/react/solid';
import { convertMsToMin } from '../utils/date';
import { playSong } from '../features/player';

export default function SongSmallItem({ title, track }) {
  const dispatch = useDispatch();

  return (
    <li
      className='px-1 py-1 group hover:bg-[#282828] rounded-md cursor-pointer'
      onClick={() => dispatch(playSong(track))}
    >
      <div className='grid grid-rows-1 grid-cols-[60px_1fr_50px]'>
        <div className='relative text-center'>
          <PlayIcon className='hidden w-6 h-6 group-hover:inline-block absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2' />
          <img src={track.album.images[0].url} alt={title} className='w-11 h-11 inline-block' />
        </div>
        <div>
          <p className='text-white text-md font-gothammedium mb-0 xl:w-56 lg:w-36 md:w-[380px] w-72 truncate'>
            {track.name}
          </p>
          <span className='text-gray-300 text-sm font-gothambook xl:w-56 lg:w-36 md:w-[380px] w-72 truncate'>
            {track.artists[0].name}
          </span>
        </div>
        <div className='flex items-center'>
          <span className='text-xs text-gray-400 font-gothammedium'>{convertMsToMin(track.duration_ms)}</span>
        </div>
      </div>
    </li>
  );
}
