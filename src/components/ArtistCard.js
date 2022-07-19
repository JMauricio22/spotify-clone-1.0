import React, { useState } from 'react';
import PlayIcon from '../assets/icons/play.svg';
import Image from 'next/image';
import { Transition } from '@headlessui/react';
import clsx from 'clsx';
import PlayButton from './PlayButton';

export default function ArtistCard({ title, subtitle, image, rounded }) {
  const [showButton, setShowButton] = useState(false);

  return (
    <article
      className='lg:w-full h-auto lg:px-4 lg:pt-5 lg:pb-7 py-2 px-3 lg:bg-[#181818] lg:hover:bg-[#282828] rounded-md transition-colors duration-150 ease-out cursor-pointer lg:last:block last:hidden lg:block hidden'
      onMouseEnter={() => setShowButton(true)}
      onMouseLeave={() => setShowButton(false)}
    >
      <div className='relative'>
        <PlayButton show={showButton} className='absolute bottom-2 right-1 z-30 hidden lg:block' />
        <img className={clsx('xl:h-48 lg:h-36 w-full h-36', rounded && 'rounded-full')} src={image} alt={title} />
      </div>
      <div className='mt-3'>
        <p className='inline-block font-gothambold xl:w-44 lg:w-32 truncate text-sm'>{title}</p>
        <p className='font-gothammedium text-zinc-400 lg:text-md text-xs w-44 overflow-hidden leading-4 truncate'>
          {subtitle}
        </p>
      </div>
    </article>
  );
}
