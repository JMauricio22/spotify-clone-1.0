import React, { useRef } from 'react';
import useGridDynamicCols from '../hooks/useGridDynamicCols';

export default function ColumnsCardList({ items, minCols = 4 }) {
  const container = useRef(null);
  const { showContent, columnCount } = useGridDynamicCols({
    container,
    minCols,
  });

  return (
    <ul ref={container} className='grid lg:overflow-hidden'>
      {showContent && items({ limit: columnCount })}
    </ul>
  );
}
