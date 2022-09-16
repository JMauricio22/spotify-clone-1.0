import React, { useRef } from 'react';
import useGridDynamicCols from '../hooks/useGridDynamicCols';

export default function ColumnsCardList({ items }) {
  const container = useRef(null);
  const { showContent, columnCount } = useGridDynamicCols({
    container,
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
    <ul ref={container} className='grid lg:grid-rows-1 lg:gap-5 lg:overflow-hidden grid-rows-1'>
      {showContent && items({ limit: columnCount })}
    </ul>
  );
}
