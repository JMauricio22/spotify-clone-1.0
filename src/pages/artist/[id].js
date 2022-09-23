import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../components/Container';
import Error from '../../components/Error';
import useSpotify from '../../hooks/useSpotify';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import {
  fetchArtistWithTopTracks,
  selectArtist,
  selectArtistError,
  selectArtistLoadingState,
} from '../../features/selectedArtist';
import Hero from '../../components/Hero';
import { headerBarHeight } from '../../components/HeaderBar';
import TrackListHeaderContent from '../../components/TrackListHeaderContent';
import Image from 'next/image';
import VerifiedIcon from '../../assets/icons/verified.svg';
import ArtistPlaylist from '../../components/Playlist/ArtistPlaylist';
import { adaptArtistItemsToTrackItems } from '../../utils/trackItemAdapter';
import Loader from '../../components/Loader';
import useRandomColor from '../../hooks/useRandomColor';
import { adaptArtistToHeroComponent } from '../../utils/heroItemAdapter';

const Artistartist = () => {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const dispatch = useDispatch();
  const artist = useSelector(selectArtist);
  const loading = useSelector(selectArtistLoadingState);
  const error = useSelector(selectArtistError);
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
          return Math.abs(heroClientHeight - headerBarHeight * 2);
        },
      });
    }
  }, [loading, artist]);

  return (
    <Container ref={containerRef} bgColor={randomColor}>
      <>
        {loading && <Loader />}
        {!loading && !error && artist && (
          <>
            <Hero
              ref={heroRef}
              item={adaptArtistToHeroComponent(artist)}
              bgColor={randomColor}
              headerTransition={headerTransition}
              headerBarContent={!!artist && <TrackListHeaderContent title={artist.name} />}
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
            <ArtistPlaylist items={adaptArtistItemsToTrackItems(artist.tracks)} />
          </>
        )}
        {!loading && error && <Error message={`Error loading artist with id: ${query.id}.`} />}
      </>
    </Container>
  );
};

Artistartist.layout = true;

export default Artistartist;
