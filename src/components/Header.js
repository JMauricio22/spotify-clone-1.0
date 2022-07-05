import React, { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import { useSelector } from 'react-redux';

export default function Header({ container, hero, ...props }) {
  const [showHeader, setShowHeader] = useState(false);
  const playListName = useSelector((state) => state.currentPlayList.info?.name);

  useEffect(() => {
    function scrollDown() {
      const currentScroll = container.scrollTop;
      if (currentScroll > hero.clientHeight) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }
    }
    if (container && hero) {
      container.addEventListener('scroll', scrollDown);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', scrollDown);
      }
    };
  }, [container, hero]);

  return (
    <Transition
      as='div'
      show={showHeader}
      enter='transition-all origin-[0%_0%] duration-150 ease-out'
      enterFrom='opacity-0 scale-y-0'
      enterTo='opacity-100 scale-y-100'
      leave='transition-all origin-[0%_0%] duration-150 ease-out'
      leaveFrom='opacity-100 scale-y-100'
      leaveTo='opacity-0 scale-y-0'
      className='sticky left-0 right-0 h-[60px] top-0 z-30 flex items-center before:block before:w-full before:h-full before:bg-[rgba(0,0,0,.6)] before:inset-0 before:absolute before:z-10'
      {...props}
    >
      {playListName && (
        <p className='w-3/6 truncate text-md md:text-2xl font-medium text-white pl-4 absolute z-20'>{playListName}</p>
      )}
    </Transition>
  );
}
