import React, { useRef } from 'react';
import useGridDynamicCols from '../hooks/useGridDynamicCols';

const DESKTOP_MAX_CARD_WIDTH = 210;
const DESKTOP_MIN_COLS = 4;

export default function ColumnsCardList({ items }) {
  const container = useRef(null);
  const { showContent } = useGridDynamicCols({
    container: container,
    minCols: DESKTOP_MIN_COLS,
    maxWidth: DESKTOP_MAX_CARD_WIDTH,
    mobileLayoutCallback: (ul) => {
      const isSmallDevice = window?.matchMedia('(min-width: 640px)')?.matches;
      if (isSmallDevice) {
        ul.style.gridTemplateColumns = 'repeat(3, minmax(0, 1fr))';
      } else {
        ul.style.gridTemplateColumns = 'repeat(2, minmax(0, 1fr))';
      }
    },
  });

  return (
    <ul ref={container} className='grid lg:grid-rows-1 lg:gap-3 lg:overflow-hidden grid-rows-1'>
      {showContent && items}
    </ul>
  );
}
