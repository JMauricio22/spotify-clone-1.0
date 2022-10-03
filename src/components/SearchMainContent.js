import React, { useId, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { play } from '../features/player';
import { selectSearchItems } from '../features/search';
import PlayButton from './PlayButton';
import SongSmallItem from './SongSmallItem';

export default function SearchMainContent() {
  const dispatch = useDispatch();
  const [showPlayButton, setShowPlayButton] = useState(false);
  const id = useId();
  const items = useSelector(selectSearchItems);

  const uri = items?.artists.items[0].uri;

  const playAllTracks = () => dispatch(play(uri));

  return (
    <section className='mt-10 w-[95%] mx-auto pl-4 grid-rows-1 4lg:grid-cols-[450px_1fr] lg:grid-cols-2 grid-cols-1 xl:gap-8 max-w-[95%] lg:gap-4 md:grid hidden'>
      <article
        className='relative'
        onMouseEnter={() => setShowPlayButton(true)}
        onMouseLeave={() => setShowPlayButton(false)}
      >
        <h2 className='font-gothammedium text-xl mb-3'>Top result</h2>
        <div className='bg-[#181818] hover:bg-[#282828] rounded-md p-4 w-full'>
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
        <PlayButton
          show={showPlayButton}
          playAllTracks={playAllTracks}
          className='absolute bottom-6 right-6 z-30 hidden lg:block'
        />
      </article>
      <article className='lg:block hidden'>
        <h2 className='font-gothammedium text-xl mb-3 lg:mt-0 mt-3'>Songs</h2>
        <ul>
          {items?.tracks.items.slice(0, 4).map((track) => (
            <SongSmallItem key={`tracks-${id}-${track.id}`} track={track} />
          ))}
        </ul>
      </article>
    </section>
  );
}
