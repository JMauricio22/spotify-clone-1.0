import React from 'react';
import PlayIcon from '../assets/icons/play.svg';
import Image from 'next/image';
import { Transition } from '@headlessui/react';
import Card from './CardContainer';
import CardItemList from './CardItemList';

function ArtistCard(Component) {
  return function ({ id, title, subtitle, image, roundedImage }) {
    return (
      <Component
        id={id}
        cardContent={(showButton) => (
          <>
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
              <img
                className='xl:h-48 lg:h-36 w-full h-36'
                src={image}
                alt={title}
                style={{ borderRadius: roundedImage ? '50%' : '' }}
              />
            </div>
            <div className='mt-3'>
              <p className='lg:font-gothambold lg:text-md text-xs lg:text-left text-white lg:w-full lg:mx-0 w-[65%] font-gothammedium mx-auto mb-1 text-center truncate'>
                {title}
              </p>
              <p className='font-gothammedium text-zinc-400 lg:text-md text-xs w-full overflow-hidden leading-4 lg:line-clamp-2 hidden'>
                {subtitle}
              </p>
            </div>
          </>
        )}
      ></Component>
    );
  };
}

export default CardItemList(ArtistCard(Card));
