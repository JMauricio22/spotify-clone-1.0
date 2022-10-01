import React, { useEffect, useRef, useState } from 'react';
import PlayButton from './PlayButton';
import { play } from '../features/player';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';

function ArtistCard({ title, subtitle, image, rounded, uri }) {
  const [showButton, setShowButton] = useState(false);
  const [size, setSize] = useState(-1);
  const imageContainerRef = useRef();
  const imageRef = useRef();
  const [mounted, setMounted] = useState(false);
  const dispatch = useDispatch();
  const resizeObserverRef = useRef();

  useEffect(() => {
    if (mounted && imageContainerRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const width = Number(entry.contentRect.width.toFixed(0));
          setSize(width);
        }
      });
      resizeObserver.observe(imageContainerRef.current);
      resizeObserverRef.current = resizeObserver;
    }

    return () => {
      if (resizeObserverRef.current && imageContainerRef.current) {
        resizeObserverRef.current.unobserve(imageContainerRef.current);
      }
    };
  }, [mounted]);

  const playAllTracks = async () => {
    try {
      await dispatch(play(uri));
    } catch (error) {}
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <article
      className='w-full h-auto px-4 pt-5 pb-7 py-2  bg-[#181818] hover:bg-[#282828] rounded-md transition-colors duration-150 ease-out cursor-pointer'
      onMouseEnter={() => setShowButton(true)}
      onMouseLeave={() => setShowButton(false)}
    >
      <div className='relative' ref={imageContainerRef}>
        <PlayButton playAllTracks={playAllTracks} show={showButton} className='absolute bottom-2 right-1 z-30' />
        {size !== -1 && (
          <img
            ref={imageRef}
            className={clsx('inline-block', rounded && 'rounded-full')}
            src={image}
            alt={title}
            style={{ width: `${size}px`, height: `${size}px` }}
          />
        )}
      </div>
      <div className='mt-3'>
        <p className='inline-block font-gothambold xl:w-44 w-32 truncate text-sm'>{title}</p>
        <p className='font-gothammedium text-zinc-400 text-md text-xs w-44 overflow-hidden leading-4 truncate'>
          {subtitle}
        </p>
      </div>
    </article>
  );
}

ArtistCard.Hidde = (props) => (
  <div className='lg:block hidden'>
    <ArtistCard {...props} />
  </div>
);

export default ArtistCard;
