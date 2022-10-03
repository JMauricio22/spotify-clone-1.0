import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchRecommendations,
  selectInitLoadingState,
  selectInitRecommendations,
  selectInitArtists,
} from '../features/init';
import Container from '../components/Container';
import { adaptRecommendationToCard, adaptArtistToCard } from '../utils/cardItemAdapter';
import CardSection from '../components/CardSection';
import CardContainer from '../components/CardContainer';
import ArtistCard from '../components/ArtistCard';
import ArtistMobileCard from '../components/ArtistMobileCard';
import Loader from '../components/Loader';
import useAuth from '../hooks/useAuth';

const ItemList = CardSection(CardContainer);

const Home = () => {
  const { isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const loading = useSelector(selectInitLoadingState);
  const recommendations = useSelector(selectInitRecommendations);
  const artists = useSelector(selectInitArtists);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchRecommendations());
    }
  }, [isAuthenticated]);

  return (
    <Container>
      <div className='pb-10 w-full'>
        {loading && <Loader />}
        {!loading && recommendations.length > 0 && (
          <ItemList
            title='Recommendations'
            items={adaptRecommendationToCard(recommendations)}
            card={(props) => <ArtistCard.Hidde {...props} />}
            cardMobile={(props) => <ArtistMobileCard {...props} />}
          />
        )}
        {!loading && artists.length > 0 && (
          <ItemList
            title='Your favorite artists'
            items={adaptArtistToCard(artists)}
            card={(props) => <ArtistCard.Hidde rounded {...props} />}
            cardMobile={(props) => <ArtistMobileCard rounded {...props} />}
          />
        )}
      </div>
    </Container>
  );
};

Home.layout = true;

export default Home;
