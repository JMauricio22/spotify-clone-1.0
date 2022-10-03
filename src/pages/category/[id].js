import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  fetchCategory,
  selectCategory,
  selectLoadingState,
  selectCategoryPlayList,
  selectCategoryPlayListError,
} from '../../features/selectedCategory';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import Container from '../../components/Container';
import Error from '../../components/Error';
import CardSection from '../../components/CardSection';
import CardContainer from '../../components/CardContainer';
import { adaptPlaylistToCard } from '../../utils/cardItemAdapter';
import ArtistCard from '../../components/ArtistCard';
import ColumnsCardList from '../../components/ColumnsCardList';

const ItemList = CardSection(CardContainer);

const Category = () => {
  const { query } = useRouter();
  const dispatch = useDispatch();
  const category = useSelector(selectCategory);
  const isLoading = useSelector(selectLoadingState);
  const playlist = useSelector(selectCategoryPlayList);
  const error = useSelector(selectCategoryPlayListError);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    dispatch(fetchCategory(query.id));
  }, [query.id]);

  return (
    <Container>
      <div className='pb-10 w-full'>
        {isLoading && <Loader />}
        {!isLoading && !error && (
          <>
            <header className='h-56 w-full bg-playlist-gradient relative'>
              <span className='font-gothambold text-6xl w-3/4 truncate absolute bottom-12 left-6'>{category.name}</span>
            </header>
            {
              <ItemList
                title={`Popular ${category.name.toLowerCase()} list`}
                items={adaptPlaylistToCard(playlist)}
                card={(props) => <ArtistCard rounded {...props} />}
                layout={(items) => <ColumnsCardList items={items} minCols={2} />}
                showAll={showAll}
                element={
                  <button
                    className='font-gothammedium text-zinc-300 text-xs hover:underline'
                    onClick={() => setShowAll(!showAll)}
                  >
                    {showAll ? 'SEE LESS' : 'VIEW ALL'}
                  </button>
                }
              />
            }
          </>
        )}
        {!isLoading && error && <Error message={`An error ocurred searching playlist`} />}
      </div>
    </Container>
  );
};

Category.layout = true;

export default Category;
