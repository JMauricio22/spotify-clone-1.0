import React, { useRef } from 'react';
import useGridDynamicCols from '../hooks/useGridDynamicCols';

const DESKTOP_MAX_CARD_WIDTH = 210;
const DESKTOP_MIN_COLS = 4;

export default function VerticalCardList({ items }) {
  const container = useRef(null);
  const { showContent } = useGridDynamicCols({
    container: container,
    minCols: DESKTOP_MIN_COLS,
    maxWidth: DESKTOP_MAX_CARD_WIDTH,
    mobileLayoutCallback: (ul) => {
      ul.style.gridTemplateColumns = '1fr';
    },
  });

  return (
    <ul ref={container} className='grid lg:gap-4 lg:overflow-hidden grid-rows-1 grid-cols-1'>
      {showContent && items}
    </ul>
  );
}
