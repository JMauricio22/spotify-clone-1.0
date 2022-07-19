import React, { useRef } from 'react';
import useGridDynamicCols from '../hooks/useGridDynamicCols';

export default function VerticalCardList({ items }) {
  const container = useRef(null);
  const { showContent, columnCount } = useGridDynamicCols({
    container: container,
    mobileLayoutCallback: (ul) => {
      ul.style.gridTemplateColumns = '1fr';
    },
  });

  return (
    <ul ref={container} className='grid lg:gap-5 lg:overflow-hidden grid-rows-1 grid-cols-1'>
      {showContent && items({ limit: columnCount })}
    </ul>
  );
}
