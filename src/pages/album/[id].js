import React, { useEffect } from 'react';
import { fetchAlbumById, selectAlbum, selectAlbumLoadingState } from '../../features/selectedAlbum';
import Container from '../../components/Container';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {} from '../../hooks/useSpotify';
import { useSession } from 'next-auth/react';
import useSpotify from '../../hooks/useSpotify';
import Loader from '../../components/Loader';

/* 
  Album id: 2nWSJnbDqmXFX88nV4IIj6
*/

export default function Album() {
  const { data: session } = useSession();
  const { query } = useRouter();
  const dispatch = useDispatch();
  const spotifyApi = useSpotify();
  const album = useSelector(selectAlbum);
  const loading = useSelector(selectAlbumLoadingState);

  useEffect(() => {
    if (query.id && spotifyApi.getAccessToken()) {
      dispatch(fetchAlbumById(query.id));
    }
  }, [session, query.id]);

  return (
    <Container>
      <>
        {loading && <Loader />}
        {!loading && album && JSON.stringify(album, null, 2)}
      </>
    </Container>
  );
}

Album.layout = true;
