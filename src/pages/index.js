import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecommendations } from '../features/recommendations';
import useSpotify from '../hooks/useSpotify';
import Container from '../components/Container';
import { generateItemsWithRecommendationAdaptor, generateItemsWithArtisAdapter } from '../utils/cardItemAdapter';
import CardSection from '../components/CardSection';
import CardContainer from '../components/CardContainer';
import ArtistCard from '../components/ArtistCard';
import ArtistMobileCard from '../components/ArtistMobileCard';
import Loader from '../components/Loader';

const ItemList = CardSection(CardContainer);

const Home = () => {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.recommendations.loading);
  const recommendations = useSelector((state) => state.recommendations.items);
  const artists = useSelector((state) => state.myTopArtists.items);

  useEffect(() => {
    if (recommendations.length === 0 && spotifyApi.getAccessToken()) {
      dispatch(fetchRecommendations());
    }
  }, [session, spotifyApi]);

  return (
    <Container>
      <section className='pb-10'>
        {loading && <Loader />}
        {recommendations.length > 0 && (
          <ItemList
            title='Recommendations'
            items={generateItemsWithRecommendationAdaptor(recommendations)}
            card={(props) => <ArtistCard {...props} />}
            cardMobile={(props) => <ArtistMobileCard {...props} />}
          />
        )}
        {artists.length > 0 && (
          <ItemList
            title='Your favorite artists'
            items={generateItemsWithArtisAdapter(artists)}
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
