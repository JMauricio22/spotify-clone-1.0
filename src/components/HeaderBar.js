import React, { useEffect, useRef, useState } from 'react';
import useHeaderTransition from '../hooks/useHeaderTransition';

export const headerBarHeight = 60;

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
    <div
      ref={headerRef}
      className='lg:w-[calc(100%-12rem)] w-full fixed h-[60px] right-0 top-0 z-30 hidden items-center transition-opacity duration-150 ease-out'
      style={{ backgroundColor: bgColor, opacity: showContent ? 0 : 1 }}
    >
      {children}
    </div>
  );
}
