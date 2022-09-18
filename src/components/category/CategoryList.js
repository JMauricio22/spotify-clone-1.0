import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, fetchCategories } from '../../features/categories';
import CategoryItem from './CategoryItem';
// import ColumnsCardList from '../ColumnsCardList';
import useGridDynamicCols from '../../hooks/useGridDynamicCols';

const DEFAULT_GRID_GAG = 20;
const DESKTOP_MEDIA_QUERY = '(min-width: 1200px)';

export default function Categories() {
  const categories = useSelector(getCategories);
  const dispatch = useDispatch();
  const container = useRef(null);
  const [cardMaxSize, setCardMaxSize] = useState(300);
  const [minCols, setMinCols] = useState(4);

  const { showContent, columnCount } = useGridDynamicCols({
    container,
    maxWidth: cardMaxSize,
    minCols,
    gap: DEFAULT_GRID_GAG,
    query: DESKTOP_MEDIA_QUERY,
    mobileLayoutCallback: (ul) => {
      const isSmallDevice = window?.matchMedia('(min-width: 640px)')?.matches;
      const cols = isSmallDevice ? 3 : 2;
      const size = (ul.clientWidth - Math.abs(cols - 1) * DEFAULT_GRID_GAG) / cols;
      ul.style.gridTemplateColumns = `repeat(${cols}, minmax(0, 1fr))`;
      ul.style.gridAutoRows = `${size}px`;
      ul.style.gridGap = `${DEFAULT_GRID_GAG}px`;
    },
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <div className='px-5 py-4 pb-8'>
      <h1 className='font-gothambold text-xl mb-4'>Browse all</h1>
      <ul ref={container} className='grid lg:overflow-hidden'>
        {categories.map((category) => (
          <CategoryItem category={category} key={category.id} />
        ))}
      </ul>
    </div>
  );
}
