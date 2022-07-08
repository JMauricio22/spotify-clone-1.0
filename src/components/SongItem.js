import React, { useId } from 'react';
import { PlayIcon } from '@heroicons/react/solid';
import { spotifyDateFormat, convertMsToMin } from '../utils/date';
import SongItemWith4Cols from './PlayListWith4Cols';

const cellItems = {
  information: {
    component: ({ position, url, trackName, artistName }) => {
      return (
        <>
          <div className='text-gray-300 md:flex items-center justify-center hidden'>
            <PlayIcon className='group-hover:block hidden w-8 h-10' />
            <span className='group-hover:hidden inline-block font-gothammedium'>{position}</span>
          </div>
          <div className='flex items-center mr-4 md:mr-0'>
            <img src={url} className='w-14 h-14 md:w-10 md:h-10' />
          </div>
          <div className='flex flex-col flex-nowrap overflow-x-hidden max-w-[90%] justify-center'>
            <span className='text-white font-medium truncate font-gothammedium'>{trackName}</span>
            <span className='text-gray-300 truncate font-medium'>{artistName}</span>
          </div>
        </>
      );
    },
    className: 'grid md:grid-rows-1 grid-cols-[60px_1fr] md:grid-cols-[40px_60px_1fr] max-w-full',
  },
  album: {
    component: ({ albumName }) => {
      return <span className='md:w-[95%] truncate text-zinc-300 font-gothammedium'>{albumName}</span>;
    },
    className: 'lg:flex items-center hidden text-xs',
  },
  added_at: {
    component: ({ added_at }) => {
      return <span>{spotifyDateFormat(added_at)}</span>;
    },
    className: 'hidden align-middle xl:flex items-center text-zinc-300 font-gothammedium text-xs',
  },
  time: {
    component: ({ duration_ms }) => {
      return <span>{convertMsToMin(duration_ms)}</span>;
    },
    className: 'flex items-center text-zinc-300 font-gothammedium text-xs',
  },
};

export default function SongItem({ columns }) {
  const id = useId();

  const getColumns = () => (
    <>
      {Object.keys(columns).map((key, index) => (
        <div className={cellItems[key].className} key={`${id}-${index}`}>
          {cellItems[key].component(columns[key])}
        </div>
      ))}
    </>
  );

  return <>{getColumns()}</>;
}
