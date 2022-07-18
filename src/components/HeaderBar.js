import React, { useEffect, useRef, useState } from 'react';
import useHeaderTransition from '../hooks/useHeaderTransition';

export default function HeaderBar({ children, transition, showContent, bgColor = 'rgb(86,86,86)' }) {
  const headerRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    transition && headerRef.current ? setIsMounted(true) : setIsMounted(false);
  }, [transition]);

  useHeaderTransition({
    active: isMounted,
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
      {children}
    </header>
  );
}
