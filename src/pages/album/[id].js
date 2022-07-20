import React, { useEffect } from 'react';
import {
  fetchAlbumById,
  selectAlbum,
  selectAlbumArtistName,
  selectAlbumLoadingState,
  selectAlbumReleaseDate,
  selectAlbumTotalTracks,
  selectAlbumTracks,
} from '../../features/selectedAlbum';
import Container from '../../components/Container';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {} from '../../hooks/useSpotify';
import { useSession } from 'next-auth/react';
import useSpotify from '../../hooks/useSpotify';
import Loader from '../../components/Loader';
import { adaptAlbumToHeroComponent } from '../../utils/heroItemAdapter';
import useRandomColor from '../../hooks/useRandomColor';
import { adaptAlbumItemsToTrackItems } from '../../utils/trackItemAdapter';
import Hero from '../../components/Hero';
import AlbumPlaylist from '../../components/Playlist/AlbumPlaylist';

/* 
  Album id: 2nWSJnbDqmXFX88nV4IIj6
*/

export default function Album() {
  const { data: session } = useSession();
  const { query } = useRouter();
  const dispatch = useDispatch();
  const spotifyApi = useSpotify();
  const album = useSelector(selectAlbum);
  const artistName = useSelector(selectAlbumArtistName);
  const totalTracks = useSelector(selectAlbumTotalTracks);
  const releaseDate = useSelector(selectAlbumReleaseDate);
  const tracks = useSelector(selectAlbumTracks);
  const loading = useSelector(selectAlbumLoadingState);
  const randomColor = useRandomColor({
    generateRandomColor: !loading && !!album,
    seed: album?.id,
  });

  useEffect(() => {
    /* Fetch album */
    if (query.id && spotifyApi.getAccessToken()) {
      dispatch(fetchAlbumById(query.id));
    }
  }, [session, query.id]);

  return (
    <Container>
      <>
        {loading && <Loader />}
        {!loading && album && (
          <>
            <Hero
              // ref={heroRef}
              item={adaptAlbumToHeroComponent(album)}
              bgColor={randomColor}
              // headerTransition={headerTransition}
              // headerBarContent={!!artist && <TrackListHeaderContent title={artist.name} />}
              // beforeTitle={
              //   <p className='flex items-center mb-2'>
              //     <Image src={VerifiedIcon} width={25} height={25} layout='fixed' />
              //     <span className='ml-1 text-md'>Verified Artist</span>
              //   </p>
              // }
              afterTitle={
                <p className='font-gothammedium text-sm'>
                  <span className='font-gothambold'>{artistName}</span> .{' '}
                  <span className='text-gray-100'>{new Date(releaseDate).getFullYear()}</span> .{' '}
                  <span className='font-gothammedium text-gray-100'>{totalTracks} songs</span>
                </p>
              }
            />
            <AlbumPlaylist items={adaptAlbumItemsToTrackItems(tracks)} />
          </>
        )}
      </>
    </Container>
  );
}

Album.layout = true;
