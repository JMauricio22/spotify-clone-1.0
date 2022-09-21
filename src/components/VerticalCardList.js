import React, { useRef } from 'react';
import useGridDynamicCols from '../hooks/useGridDynamicCols';

const DEFAULT_LIMIT_IN_MOBILE = 10;

export default function VerticalCardList({ items }) {
  const container = useRef(null);
  const { showContent, columnCount, isDesktop } = useGridDynamicCols({
    container: container,
    mobileLayoutCallback: (ul) => {
      ul.style.gridTemplateColumns = '1fr';
      ul.style.gridGap = `10px`;
    },
  });

  return (
    <ul ref={container} className='grid lg:overflow-hidden auto-rows-fr'>
      {showContent && items({ limit: isDesktop ? columnCount : DEFAULT_LIMIT_IN_MOBILE })}
    </ul>
  );
}
