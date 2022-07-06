import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecommendations } from '../features/recommendations';
import useSpotify from '../hooks/useSpotify';
import Container from './Container';
import ItemList from './ItemList';
import { getRecomendationAdapter, getArtistsAdapter } from '../utils/itemsAdapter';

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
            items={recommendations.map((recommendation) => getRecomendationAdapter(recommendation))}
            limit={4}
          />
        )}
        {artists.length > 0 && (
          <ItemList
            title='your favorite artists'
            items={artists.map((artist) => getArtistsAdapter(artist))}
            limit={4}
          />
        )}
      </section>
    </Container>
  );
}
