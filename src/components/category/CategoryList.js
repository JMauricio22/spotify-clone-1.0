import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, fetchCategories } from '../../features/categories';
import CategoryItem from './CategoryItem';
import ColumnsCardList from '../ColumnsCardList';

export default function Categories() {
  const categories = useSelector(getCategories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <div className='px-5 py-4 pb-8'>
      <h1 className='font-gothambold text-xl mb-4'>Browse all</h1>
      <ColumnsCardList
        items={() => categories.map((category) => <CategoryItem category={category} key={category.id} />)}
      />
    </div>
  );
}
