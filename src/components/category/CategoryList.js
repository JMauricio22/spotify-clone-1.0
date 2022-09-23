import React, { useRef } from 'react';
import { getCategories } from '../../features/categories';
import useGridDynamicCols from '../../hooks/useGridDynamicCols';
import CategoryItem from './CategoryItem';
import { useSelector } from 'react-redux';

const DEFAULT_GRID_GAG = 20;
const DESKTOP_MEDIA_QUERY = '(min-width: 1200px)';
const MAX_WIDTH = 300;
const MIN_COLS = 4;

export default function Categories() {
  const categories = useSelector(getCategories);
  const container = useRef(null);

  useGridDynamicCols({
    container,
    maxWidth: MAX_WIDTH,
    minCols: MIN_COLS,
    gap: DEFAULT_GRID_GAG,
    query: DESKTOP_MEDIA_QUERY,
    autoHeight: false,
    mobileLayoutCallback: (ul) => {
      const isSmallDevice = window?.matchMedia('(min-width: 640px)')?.matches;
      const cols = isSmallDevice ? 3 : 2;
      const size = (ul.clientWidth - Math.abs(cols - 1) * DEFAULT_GRID_GAG) / cols;
      ul.style.gridTemplateColumns = `repeat(${cols}, minmax(0, 1fr))`;
      ul.style.gridAutoRows = `${size}px`;
      ul.style.gridGap = `${DEFAULT_GRID_GAG}px`;
    },
  });

  return (
    <>
      <h1 className='font-gothambold text-xl mb-4'>Browse all</h1>
      <ul ref={container} className='grid lg:overflow-hidden'>
        {categories.map((category) => (
          <CategoryItem category={category} key={category.id} />
        ))}
      </ul>
    </>
  );
}
