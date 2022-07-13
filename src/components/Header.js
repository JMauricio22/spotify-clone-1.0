import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import useHeaderTransition from '../hooks/useHeaderTransition';

export default function Header({ transition, ...props }) {
  const playListName = useSelector((state) => state.currentPlayList.info?.name);
  const headerRef = useRef(null);
  const [activateTransition, setActivateTransition] = useState(!!transition);

  useEffect(() => {
    transition ? setActivateTransition(true) : setActivateTransition(false);
  }, [transition]);

  useHeaderTransition({
    active: activateTransition,
    transition: {
      ...transition,
      header: headerRef.current,
    },
  });

  return (
    <div
      ref={headerRef}
      className='w-full flex-grow-0 sticky left-0 right-0 basis-[60px] shrink-0 top-0 z-30 flex items-center opacity-0 transition-opacity duration-150 ease-out'
      {...props}
    >
      {playListName && (
        <p className='w-3/6 truncate text-md md:text-2xl font-gothambold text-white pl-4'>{playListName}</p>
      )}
    </div>
  );
}
