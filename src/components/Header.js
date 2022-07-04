import React, { useEffect, useState } from 'react';

export default function Header({ container, hero }) {
  const [showHeader, setShowHeader] = useState(false);

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

  if (showHeader) {
    return <div className='sticky bg-red-500 left-0 right-0 top-0 h-[60px] z-30'></div>;
  }
  return null;
}
