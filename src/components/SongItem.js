import React from 'react';
import { PlayIcon } from '@heroicons/react/solid';
import { spotifyDateFormat, convertMsToMin } from '../utils/date';
import { playSong } from '../features/player';
import { useDispatch } from 'react-redux';

const cellItems = {
  information: ({ position, url, trackName, artistName }) => {
    return (
      <div className='flex items-center md:grid md:grid-rows-1 md:grid-cols-[40px_60px_1fr]'>
        <div className='text-gray-300 md:flex items-center justify-center hidden'>
          <PlayIcon className='group-hover:block hidden w-8 h-10' />
          <span className='group-hover:hidden inline-block font-gothammedium'>{position}</span>
        </div>
        <div className='flex items-center mr-4 md:mr-0'>
          <img src={url} className='w-14 h-14 md:w-10 md:h-10' />
        </div>
        <div className='flex flex-col flex-nowrap overflow-hidden max-w-[90%]'>
          <span className='text-white font-medium truncate font-gothammedium'>{trackName}</span>
          <span className='text-gray-300 truncate font-medium'>{artistName}</span>
        </div>
      </div>
    );
  },
  album: ({ albumName }) => {
    return (
      <div className='lg:flex items-center hidden text-xs'>
        <span className='md:w-[95%] truncate text-zinc-300 font-gothammedium'>{albumName}</span>
      </div>
    );
  },
  added_at: ({ added_at }) => {
    return (
      <div className='hidden align-middle xl:flex items-center text-zinc-300 font-gothammedium text-xs'>
        {spotifyDateFormat(added_at)}
      </div>
    );
  },
  time: ({ duration_ms }) => {
    return (
      <div className='flex items-center text-zinc-300 font-gothammedium text-xs'>{convertMsToMin(duration_ms)}</div>
    );
  },
};

export default function SongItem(columns) {
  const dispatch = useDispatch();

  const getColumns = () => (
    <>
      {Object.keys(columns).map((key) => (
        <>{cellItems[key](columns[key].data)}</>
      ))}
    </>
  );

  return (
    <li
      onDoubleClick={() => dispatch(playSong(track))}
      className='grid cursor-pointer grid-cols-[1fr_50px] group grid-rows-1 md:grid-cols-[1fr_50px] lg:grid-cols-[350px_1fr_100px] xl:grid-cols-[1fr_repeat(2,200px)_100px] gap-4 py-3 hover:bg-[hsla(0,0%,100%,.1)] pl-4 pr-2 rounded-md'
    >
      {getColumns()}
    </li>
  );
}
