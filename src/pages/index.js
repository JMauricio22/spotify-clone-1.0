import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchRecommendations,
  selectRecommendationItems,
  selectRecommendationLoading,
} from '../features/recommendations';
import useSpotify from '../hooks/useSpotify';
import Container from '../components/Container';
import { adaptRecommendationToCard, adaptArtistToCard } from '../utils/cardItemAdapter';
import CardSection from '../components/CardSection';
import CardContainer from '../components/CardContainer';
import ArtistCard from '../components/ArtistCard';
import ArtistMobileCard from '../components/ArtistMobileCard';
import Loader from '../components/Loader';
import { selectMyTopArtistItems } from '../features/artists';

const ItemList = CardSection(CardContainer);

const Home = () => {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const dispatch = useDispatch();
  const loading = useSelector(selectRecommendationLoading);
  const recommendations = useSelector(selectRecommendationItems);
  const artists = useSelector(selectMyTopArtistItems);

  useEffect(() => {
    if (recommendations.length === 0 && spotifyApi.getAccessToken()) {
      dispatch(fetchRecommendations());
    }
  }, [session, spotifyApi]);

  return (
    <Container>
      <section className='pb-10 w-full'>
        {loading && <Loader />}
        {recommendations.length > 0 && (
          <ItemList
            title='Recommendations'
            items={adaptRecommendationToCard(recommendations)}
            card={(props) => <ArtistCard {...props} />}
            cardMobile={(props) => <ArtistMobileCard {...props} />}
          />
        )}
        {artists.length > 0 && (
          <ItemList
            title='Your favorite artists'
            items={adaptArtistToCard(artists)}
            card={(props) => <ArtistCard rounded {...props} />}
            cardMobile={(props) => <ArtistMobileCard rounded {...props} />}
          />
        )}
      </section>
    </Container>
  );
};

Home.layout = true;

export default Home;
