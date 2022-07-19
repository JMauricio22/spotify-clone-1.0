import React, { useRef } from 'react';
import useGridDynamicCols from '../hooks/useGridDynamicCols';

export default function HorizontalCardList({ items }) {
  const container = useRef(null);
  const { showContent, columnCount, isDesktop } = useGridDynamicCols({
    container: container,
    mobileLayoutCallback: (ul) => {
      ul.style.display = 'block';
    },
  });

  const itemParams = isDesktop ? { limit: columnCount } : {};

  return (
    <ul
      ref={container}
      className='lg:grid lg:grid-rows-1 lg:gap-5 block lg:overflow-hidden overflow-x-auto whitespace-nowrap'
    >
      {showContent && items(itemParams)}
    </ul>
  );
}
