import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecommendations } from '../features/recommendations';
import useSpotify from '../hooks/useSpotify';
import Container from './Container';
import CardItemList from './CardItemList';
import { generateItemsWithRecommendationAdaptor, generateItemsWithArtisAdapter } from '../utils/cardItemAdapter';
import RecommendationCard from './RecommendationCard';
import ArtistCard from './ArtistCard';

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
          <RecommendationCard title='Recommendations' items={generateItemsWithRecommendationAdaptor(recommendations)} />
        )}
        {artists.length > 0 && (
          <ArtistCard title='your favorite artists' items={generateItemsWithArtisAdapter(artists)} />
        )}
      </section>
    </Container>
  );
}
