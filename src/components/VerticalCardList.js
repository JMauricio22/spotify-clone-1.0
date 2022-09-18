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
    <ul ref={container} className='grid lg:overflow-hidden auto-rows-fr'>
      {showContent && items({ limit: columnCount })}
    </ul>
  );
}
