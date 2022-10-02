import React from 'react';
import PlayIcon from '../assets/icons/play.svg';
import Image from 'next/image';
import { Transition } from '@headlessui/react';

export default function PlayButton({ show, className, playAllTracks }) {
  const onClick = (event) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    playAllTracks();
  };

  return (
    <Transition
      show={show}
      className={className}
      enter='transition-all duration-300 ease-in-out'
      enterFrom='opacity-0 translate-y-[25%]'
      enterTo='opacity-100 translate-y-0'
      leave='transition-all duration-300 ease-in-out'
      leaveFrom='opacity-100 translate-y-0'
      leaveTo='opacity-0 translate-y-[25%]'
    >
      <button
        onClick={onClick}
        className='hover:bg-[#37d084] outline-none bg-[#1ed760] text-black rounded-full w-12 h-12 flex items-center justify-center z-20 shadow-2xl shadow-black'
      >
        <Image src={PlayIcon} width={23} height={23} />
      </button>
    </Transition>
  );
}
