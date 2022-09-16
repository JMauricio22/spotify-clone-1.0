import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchCategory, getCategory, getLoadingState, getCategoryPlayList } from '../../features/selectedCategory';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../components/Container';
import Loader from '../../components/Loader';
import CardSection from '../../components/CardSection';
import CardContainer from '../../components/CardContainer';
import { adaptPlaylistToCard } from '../../utils/cardItemAdapter';
import ArtistCard from '../../components/ArtistCard';
import ArtistMobileSearch from '../../components/ArtistMobileSearch';

const ItemList = CardSection(CardContainer);

const Category = () => {
  const { query } = useRouter();
  const dispatch = useDispatch();
  const category = useSelector(getCategory);
  const isLoading = useSelector(getLoadingState);
  const playlist = useSelector(getCategoryPlayList);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    dispatch(fetchCategory(query.id));
  }, [query.id]);

  return (
    <Container>
      <section className='pb-10 w-full'>
        {isLoading && <Loader />}
        {!isLoading && (
          <>
            <header className='h-56 w-full bg-playlist-gradient relative'>
              <span className='font-gothambold text-6xl w-3/4 truncate absolute bottom-12 left-6'>{category.name}</span>
            </header>
            {
              <ItemList
                title={`Popular ${category.name.toLowerCase()} list`}
                items={adaptPlaylistToCard(playlist)}
                card={(props) => <ArtistCard rounded {...props} />}
                showAll={showAll}
                element={
                  <button
                    className='font-gothammedium text-zinc-300 text-xs hover:underline'
                    onClick={() => setShowAll(!showAll)}
                  >
                    {showAll ? 'SEE LESS' : 'VIEW ALL'}
                  </button>
                }
                cardMobile={(props) => <ArtistMobileSearch rounded {...props} />}
              />
            }
          </>
        )}
      </section>
    </Container>
  );
};

Category.layout = true;

export default Category;
