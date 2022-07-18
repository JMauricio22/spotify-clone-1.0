import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../components/Container';
import useSpotify from '../../hooks/useSpotify';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { fetchArtistWithTopTracks, selectArtist, selectArtistLoadingState } from '../../features/selectedArtist';
import Hero from '../../components/Hero';
import HeaderBar from '../../components/HeaderBar';
import TrackListHeaderContent from '../../components/TrackListHeaderContent';
import Image from 'next/image';
import VerifiedIcon from '../../assets/icons/verified.svg';
import PlaylistWith3Cols from '../../components/PlaylistWith3Cols';
import { convertTrackItemsToSongItems } from '../../utils/songItemAdapter';
import Loader from '../../components/Loader';
import useRandomColor from '../../hooks/useRandomColor';

const Artistartist = () => {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const dispatch = useDispatch();
  const artist = useSelector(selectArtist);
  const loading = useSelector(selectArtistLoadingState);
  const [headerTransition, setHeaderTransition] = useState(null);
  const { query } = useRouter();
  const heroRef = useRef(null);
  const containerRef = useRef(null);
  const randomColor = useRandomColor({
    generateRandomColor: !loading && !!artist,
    seed: artist?.id,
  });

  useEffect(() => {
    /* Fetch Artis */
    if (query.id && spotifyApi.getAccessToken()) {
      dispatch(fetchArtistWithTopTracks(query.id));
    }
  }, [session, query.id]);

  useEffect(() => {
    /* When hero componente is rendered then set transition state  */
    if (!loading && !!artist) {
      const heroClientHeight = heroRef.current.clientHeight;
      setHeaderTransition({
        container: containerRef.current,
        fromScrollY: (header) => {
          return Math.abs(heroClientHeight - header.clientHeight);
        },
      });
    }
  }, [loading, artist]);

  return (
    <Container ref={containerRef} bgColor={randomColor}>
      <>
        {loading && <Loader />}
        {!loading && artist && (
          <>
            <HeaderBar transition={headerTransition} bgColor={randomColor} showContent={!!artist}>
              <>{!!artist && <TrackListHeaderContent title={artist.name} />}</>
            </HeaderBar>
            <Hero
              ref={heroRef}
              imageUrl={artist.images[0].url}
              title={artist.name}
              bgColor={randomColor}
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
