import React, { useState } from 'react';
import PlayIcon from '../assets/icons/play.svg';
import Image from 'next/image';
import { Transition } from '@headlessui/react';
import Link from 'next/link';

export default function Card({ id, title, subtitle, image, roundedImage }) {
  const [showButton, setShowButton] = useState(false);

  return (
    <Link href={`/artist/${id}`}>
      <article
        className='lg:w-[100%] h-auto px-4 pt-5 pb-7 bg-[#101010] hover:bg-[#282828] rounded-md transition-colors duration-150 ease-out cursor-pointer lg:last:block last:hidden shadow-sm'
        onMouseEnter={() => setShowButton(true)}
        onMouseLeave={() => setShowButton(false)}
      >
        <div className='relative'>
          <Transition
            show={showButton}
            className='absolute bottom-2 right-1 z-30'
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
          <img
            className='xl:h-48 md:h-36 h-[260px] w-full'
            src={image}
            alt={title}
            style={{ borderRadius: roundedImage ? '50%' : '' }}
          />
        </div>
        <div className='mt-3'>
          <p className='font-gothambold lg:text-md text-sm text-white w-full truncate mb-1'>{title}</p>
          <p className='font-gothammedium text-zinc-400 lg:text-md text-xs w-full overflow-hidden leading-4 line-clamp-2'>
            {subtitle}
          </p>
        </div>
      </article>
    </Link>
  );
}
