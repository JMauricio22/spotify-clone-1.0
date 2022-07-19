import { PlayIcon } from '@heroicons/react/solid';
import React, { useId, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSearchItems } from '../features/search';
import { convertMsToMin } from '../utils/date';
import PlayButton from './PlayButton';
import { playSong } from '../features/player';

export default function SearchMainContent() {
  const dispatch = useDispatch();
  const [showPlayButton, setShowPlayButton] = useState(false);
  const id = useId();
  const items = useSelector(selectSearchItems);

  return (
    <section className='mt-10 w-[95%] mx-auto pl-4 grid-rows-1 lg:grid-cols-2 grid-cols-1 xl:gap-8 max-w-[95%] lg:gap-4 md:grid hidden'>
      <article
        className='relative'
        onMouseEnter={() => setShowPlayButton(true)}
        onMouseLeave={() => setShowPlayButton(false)}
      >
        <h2 className='font-gothammedium text-xl mb-3'>Top result</h2>
        <div className='bg-[#181818] hover:bg-[#282828] rounded-md p-4 lg:w-full md:w-[450px]'>
          <img
            className='w-28 h-28 rounded-full mb-4'
            src={items?.artists.items[0].images[0].url}
            alt={items?.artists.items[0].name}
          />
          <p className='font-gothambold lg:text-2xl mb-2 lg:w-[90%] md:w-[380px] text-3xl truncate'>
            {items?.artists.items[0].name}
          </p>
          <span className='uppercase py-2 px-4 text-xs font-gothammedium bg-[#131313] rounded-full'>Artist</span>
        </div>
        <PlayButton show={showPlayButton} className='absolute bottom-6 right-6 z-30 hidden lg:block' />
      </article>
      <article className='md:block hidden'>
        <h2 className='font-gothammedium text-xl mb-3 lg:mt-0 mt-3'>Songs</h2>
        <ul>
          {items?.tracks.items.slice(0, 4).map((track) => (
            <li
              key={`tracks-${id}-${track.id}`}
              className='px-1 py-1 group hover:bg-[#282828] rounded-md cursor-pointer'
              onClick={() => dispatch(playSong(track))}
            >
              <div className='grid grid-rows-1 grid-cols-[60px_1fr_50px]'>
                <div className='relative text-center'>
                  <PlayIcon className='hidden w-6 h-6 group-hover:inline-block absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2' />
                  <img src={track.album.images[0].url} alt={track.name} className='w-11 h-11 inline-block' />
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
          ))}
        </ul>
      </article>
    </section>
  );
}
