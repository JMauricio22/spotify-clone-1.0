import React, { useState } from 'react';
import PlayIcon from '../assets/icons/play.svg';
import Image from 'next/image';
import { Transition } from '@headlessui/react';
import clsx from 'clsx';

export default function ArtistCard({ title, subtitle, image, rounded }) {
  const [showButton, setShowButton] = useState(false);

  return (
    <article
      className='lg:w-full h-auto lg:px-4 lg:pt-5 lg:pb-7 py-2 px-3 lg:bg-[#101010] lg:hover:bg-[#282828] rounded-md transition-colors duration-150 ease-out cursor-pointer lg:last:block last:hidden lg:block hidden'
      onMouseEnter={() => setShowButton(true)}
      onMouseLeave={() => setShowButton(false)}
    >
      <div className='relative'>
        <Transition
          show={showButton}
          className='absolute bottom-2 right-1 z-30 hidden lg:block'
          enter='transition-all duration-300 ease-in-out'
          enterFrom='opacity-0 translate-y-[25%]'
          enterTo='opacity-100 translate-y-0'
          leave='transition-all duration-300 ease-in-out'
          leaveFrom='opacity-100 translate-y-0'
          leaveTo='opacity-0 translate-y-[25%]'
        >
          <button className='hover:bg-[#37d084] bg-[#1ed760] text-black rounded-full w-12 h-12 flex items-center justify-center'>
            <Image src={PlayIcon} width={23} height={23} />
          </button>
        </Transition>
        <img className={clsx('xl:h-48 lg:h-36 w-full h-36', rounded && 'rounded-full')} src={image} alt={title} />
      </div>
      <div className='mt-3'>
        <p className='lg:font-gothambold lg:text-md text-xs text-white lg:w-full lg:mx-0 font-gothammedium mb-1 truncate'>
          {title}
        </p>
        <p className='font-gothammedium text-zinc-400 lg:text-md text-xs w-full overflow-hidden leading-4 lg:line-clamp-2'>
          {subtitle}
        </p>
      </div>
    </article>
  );
}
