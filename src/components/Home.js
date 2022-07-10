import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecommendations } from '../features/recommendations';
import useSpotify from '../hooks/useSpotify';
import Container from './Container';
import { generateItemsWithRecommendationAdaptor, generateItemsWithArtisAdapter } from '../utils/cardItemAdapter';
import CardSection from './CardSection';
import CardContainer from './CardContainer';
import ArtistCard from './ArtistCard';
import ArtistMobileCard from './ArtistMobileCard';

const ItemList = CardSection(CardContainer);

export default function Home() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const dispatch = useDispatch();
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
        {recommendations.length > 0 && (
          <ItemList
            title='Recommendations'
            items={generateItemsWithRecommendationAdaptor(recommendations)}
            card={(props) => <ArtistCard {...props} />}
            cardMobile={(props) => <ArtistMobileCard {...props} />}
            horizontalLayout
          />
        )}
        {artists.length > 0 && (
          <ItemList
            title='Your favorite artists'
            items={generateItemsWithArtisAdapter(artists)}
            card={(props) => <ArtistCard rounded {...props} />}
            cardMobile={(props) => <ArtistMobileCard rounded {...props} />}
            horizontalLayout
          />
        )}
      </section>
    </Container>
  );
}
