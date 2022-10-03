import React, { useEffect } from 'react';
import { fetchCategories, getCategoriesError, isLoadingCategories } from '../../features/categories';
import CategoryList from './CategoryList';
import Loader from '../Loader';
import Error from '../Error';
import { useDispatch, useSelector } from 'react-redux';

export default function Categories() {
  const loading = useSelector(isLoadingCategories);
  const error = useSelector(getCategoriesError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <div className='px-5 pt-4'>
      {loading && <Loader />}
      {!loading && !error && <CategoryList />}
      {!loading && error && <Error.Highlight message={`Error loading categories.`} />}
    </div>
  );
}
