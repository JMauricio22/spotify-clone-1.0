import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectLPlaylistName } from '../features/currenPlayList';
import useHeaderTransition from '../hooks/useHeaderTransition';

export default function HeaderBar({ transition, showContent, bgColor = 'rgb(86,86,86)' }) {
  const playListName = useSelector(selectLPlaylistName);
  const headerRef = useRef(null);
  const [activateTransition, setActivateTransition] = useState(false);

  useEffect(() => {
    transition && headerRef.current ? setActivateTransition(true) : setActivateTransition(false);
  }, [transition]);

  useHeaderTransition({
    active: activateTransition,
    transition: {
      ...transition,
      header: headerRef.current,
    },
  });

  return (
    <header
      ref={headerRef}
      className='w-full flex-grow-0 sticky left-0 right-0 basis-[60px] shrink-0 top-0 z-30 flex items-center transition-opacity duration-150 ease-out'
      style={{ backgroundColor: bgColor, opacity: showContent ? 0 : 1 }}
    >
      {showContent && playListName && (
        <p className='w-3/6 truncate text-md md:text-2xl font-gothambold text-white pl-4'>{playListName}</p>
      )}
    </header>
  );
}
