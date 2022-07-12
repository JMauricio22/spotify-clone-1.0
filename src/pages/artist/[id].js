import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../components/Container';
import useSpotify from '../../hooks/useSpotify';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { fetchArtistWithTopTracks, selectArtist, selectArtistLoadingState } from '../../features/selectedArtist';
import Hero from '../../components/Hero';
import Image from 'next/image';
import VerifiedIcon from '../../assets/icons/verified.svg';
import PlaylistWith3Cols from '../../components/PlaylistWith3Cols';
import { convertTrackItemsToSongItems } from '../../utils/songItemAdapter';
import Loader from '../../components/Loader';

const Artistartist = () => {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const dispatch = useDispatch();
  const artist = useSelector(selectArtist);
  const loading = useSelector(selectArtistLoadingState);
  const { query } = useRouter();

  useEffect(() => {
    if (query.id && spotifyApi.getAccessToken()) {
      dispatch(fetchArtistWithTopTracks(query.id));
    }
  }, [session, query]);

  return (
    <Container>
      <>
        {loading && <Loader />}
        {!loading && artist && (
          <>
            <Hero
              imageUrl={artist.images[0].url}
              title={artist.name}
              style={{ background: 'linear-gradient(61deg, rgb(25 25 30) 0%, rgb(32 37 39  ) 70%)' }}
              beforeTitle={
                <p className='flex items-center mb-2'>
                  <Image src={VerifiedIcon} width={25} height={25} layout='fixed' />
                  <span className='ml-1 text-md'>Verified Artist</span>
                </p>
              }
              afterTitle={
                <div>
                  <p className='font-gothammedium text-md'>
                    Followers:{' '}
                    <span className='text-gray-300 text-sm'> {artist.followers.total.toLocaleString('es-US')} </span>{' '}
                  </p>
                </div>
              }
            />
            <PlaylistWith3Cols items={convertTrackItemsToSongItems(artist.tracks)} />
          </>
        )}
      </>
    </Container>
  );
};

Artistartist.layout = true;

export default Artistartist;
