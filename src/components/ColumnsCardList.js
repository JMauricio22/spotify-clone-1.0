import React, { useRef } from 'react';
import useGridDynamicCols from '../hooks/useGridDynamicCols';

export default function ColumnsCardList({ items }) {
  const container = useRef(null);
  const { showContent, columnCount } = useGridDynamicCols({
    container,
    mobileLayoutCallback: (ul) => {
      const isSmallDevice = window?.matchMedia('(min-width: 640px)')?.matches;
      const cols = isSmallDevice ? 3 : 2;
      ul.style.gridTemplateColumns = `repeat(${cols}, minmax(0, 1fr))`;
      ul.style.gridGap = `20px`;
    },
  });

  return (
    <ul ref={container} className='grid lg:overflow-hidden'>
      {showContent && items({ limit: columnCount })}
    </ul>
  );
}
