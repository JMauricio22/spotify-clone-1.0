import { PlayIcon } from '@heroicons/react/solid';
import React, { useId } from 'react';
import { useSelector } from 'react-redux';
import { selectSearchItems } from '../features/search';
import { convertMsToMin } from '../utils/date';

export default function SearchMainContent() {
  const id = useId();
  const items = useSelector(selectSearchItems);

  return (
    <section className='mt-10 w-[95%] mx-auto pl-4 grid grid-rows-1 lg:grid-cols-2 grid-cols-1 gap-8'>
      <article>
        <h2 className='font-gothammedium text-xl mb-3'>Top result</h2>
        <div className='bg-[#181818] hover:bg-[#282828] rounded-md p-4'>
          <img
            className='w-28 h-28 rounded-full mb-4'
            src={items?.artists.items[0].images[0].url}
            alt={items?.artists.items[0].name}
          />
          <p className='font-gothambold text-2xl mb-2'>{items?.artists.items[0].name}</p>
          <span className='uppercase py-2 px-4 text-xs font-gothammedium bg-[#131313] rounded-full'>Artist</span>
        </div>
      </article>
      <article>
        <h2 className='font-gothammedium text-xl mb-3'>Songs</h2>
        <ul>
          {items?.tracks.items.slice(0, 4).map((track) => (
            <li
              key={`tracks-${id}-${track.id}`}
              className='px-2 py-1 group hover:bg-[#282828] rounded-md items-center cursor-pointer'
            >
              <div className='grid grid-rows-1 grid-cols-[70px_1fr_50px] place'>
                <div className='relative text-center'>
                  <PlayIcon className='hidden w-6 h-6 group-hover:inline-block absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2' />
                  <img src={track.album.images[0].url} alt={track.name} className='w-11 h-11 inline-block' />
                </div>
                <div>
                  <p className='text-white text-md font-gothammedium mb-0'>{track.name}</p>
                  <span className='text-gray-300 text-sm font-gothambook'>{track.artists[0].name}</span>
                </div>
                <div className='flex items-center'>
                  <span className='text-sm text-gray-400 font-gothammedium'>{convertMsToMin(track.duration_ms)}</span>
                </div>
              </div>
              <div></div>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
