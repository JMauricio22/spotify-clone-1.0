import React, { useEffect } from 'react';
import {
  fetchAlbumById,
  selectAlbum,
  selectAlbumArtistName,
  selectAlbumLError,
  selectAlbumLoadingState,
  selectAlbumReleaseDate,
  selectAlbumTotalTracks,
  selectAlbumTracks,
} from '../../features/selectedAlbum';
import Container from '../../components/Container';
import Error from '../../components/Error';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import { adaptAlbumToHeroComponent } from '../../utils/heroItemAdapter';
import useRandomColor from '../../hooks/useRandomColor';
import { adaptAlbumItemsToTrackItems } from '../../utils/trackItemAdapter';
import Hero from '../../components/Hero';
import AlbumPlaylist from '../../components/Playlist/AlbumPlaylist';
import useAuth from '../../hooks/useAuth';

export default function Album() {
  const { isAuthenticated } = useAuth();
  const { query } = useRouter();
  const dispatch = useDispatch();
  const album = useSelector(selectAlbum);
  const artistName = useSelector(selectAlbumArtistName);
  const totalTracks = useSelector(selectAlbumTotalTracks);
  const releaseDate = useSelector(selectAlbumReleaseDate);
  const tracks = useSelector(selectAlbumTracks);
  const loading = useSelector(selectAlbumLoadingState);
  const error = useSelector(selectAlbumLError);
  const randomColor = useRandomColor({
    generateRandomColor: !loading && !!album,
    seed: album?.id,
  });

  useEffect(() => {
    /* Fetch album */
    if (query.id && isAuthenticated) {
      dispatch(fetchAlbumById(query.id));
    }
  }, [isAuthenticated, query.id]);

  return (
    <Container>
      <>
        {loading && <Loader />}
        {!loading && !error && album && (
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
        {!loading && error && <Error message={`Error loading album with id: ${query.id}.`} />}
      </>
    </Container>
  );
}

Album.layout = true;
