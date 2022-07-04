import React from 'react';
import { PlayIcon } from '@heroicons/react/solid';
import { spotifyDateFormat, convertMsToMin } from '../utils/date';
import { playSong } from '../features/player';
import { useDispatch } from 'react-redux';

export default function SongItem({ track, added_at, index }) {
  const dispatch = useDispatch();

  return (
    <li
      onDoubleClick={() => dispatch(playSong(track))}
      className='grid cursor-pointer grid-cols-[1fr_50px] group grid-rows-1 md:grid-cols-[1fr_50px] lg:grid-cols-[350px_1fr_100px] xl:grid-cols-[350px_repeat(2,1fr)_100px] gap-4 py-3 hover:bg-[hsla(0,0%,100%,.1)] pl-4 pr-2 rounded-md'
    >
      <div className='flex items-center md:grid md:grid-rows-1 md:grid-cols-[40px_60px_1fr]'>
        <div className='text-gray-300 md:flex items-center justify-center hidden'>
          <PlayIcon className='group-hover:block hidden w-8 h-10' />
          <span className='group-hover:hidden inline-block'>{index + 1}</span>
        </div>
        <div className='flex items-center mr-4 md:mr-0'>
          <img src={track.album.images[0].url} className='w-14 h-14 md:w-10 md:h-10' />
        </div>
        <div className='flex flex-col flex-nowrap'>
          <span className='w-44 md:w-56 text-white font-medium truncate'>{track.name}</span>
          <span className='text-gray-300 font-medium'>{track.album.artists[0].name}</span>
        </div>
      </div>
      <div className='lg:flex items-center hidden'>
        <span className='md:w-52 truncate text-gray-300 font-normal'>{track.album.name}</span>
      </div>
      <div className='hidden align-middle xl:flex items-center text-gray-300 font-normal'>
        {spotifyDateFormat(added_at)}
      </div>
      <div className='flex items-center text-gray-300 font-normal'>{convertMsToMin(track.duration_ms)}</div>
    </li>
  );
}
