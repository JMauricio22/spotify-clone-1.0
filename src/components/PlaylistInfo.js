import React, { useEffect, useId, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from './Container';
import Playlist from './Playlist';
import { fetchPlayListTracks } from '../features/currenPlayList';
import randomColor from 'randomcolor';
import { useRouter } from 'next/router';
import Header from './Header';
import { ExclamationCircleIcon } from '@heroicons/react/solid';
import { convertPlaylistItemsToSongItems } from '../utils/songItemAdapter';
import Hero from './Hero';

export default function PlaylistInfo() {
  const playListInfo = useSelector((state) => state.currentPlayList.info);
  const dispatch = useDispatch();
  const { query } = useRouter();
  const containerRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    /* Get user´s playlist when component is mounted */
    dispatch(fetchPlayListTracks(query.id));
  }, [query]);

  const containerStyles = useMemo(() => {
    /* Generate random color for playlist */
    if (playListInfo && playListInfo?.tracks?.items?.length > 0) {
      return {
        backgroundColor: randomColor({
          luminosity: 'dark',
          seed: playListInfo.name,
        }),
      };
    }

    return {};
  }, [playListInfo, query]);

  return (
    <Container
      ref={containerRef}
      style={containerStyles}
      header={<Header container={containerRef.current} hero={heroRef.current} style={containerStyles} />}
    >
      {playListInfo && (
        <>
          <Hero
            ref={heroRef}
            imageUrl={playListInfo?.images[0]?.url}
            title={playListInfo?.name}
            style={Object.keys(containerStyles).length > 0 ? {} : { backgroundColor: 'rgb(86,86,86)' }}
            afterTitle={
              <>
                {playListInfo?.description && (
                  <p className='text-md text-gray-200 hidden font-gothammedium xl:line-clamp-3 truncate whitespace-pre-wrap'>
                    {playListInfo?.description}
                  </p>
                )}
                <p className='text-sm text-white font-medium font-gothambold'>
                  {playListInfo?.owner.display_name}
                  <span className='text-gray-200'> . {playListInfo?.tracks.items.length} songs</span>
                </p>
              </>
            }
          />
          {playListInfo?.tracks?.items.length > 0 ? (
            <Playlist items={convertPlaylistItemsToSongItems(playListInfo.tracks.items)} />
          ) : (
            <div className='text-center mt-10 text-gray-100'>
              <ExclamationCircleIcon className='w-14 h-14 inline-block mb-1' />
              <p className='md:text-2xl text-xl text-center font-medium'>There are no tracks in your playlist.</p>
            </div>
          )}
        </>
      )}
    </Container>
  );
}
