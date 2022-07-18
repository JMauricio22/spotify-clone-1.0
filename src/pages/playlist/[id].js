import React, { useMemo, useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../components/Container';
import {
  fetchPlayListTracks,
  selectCurrentPlaylist,
  selectLoading,
  selecthasItems,
  selectLPlaylistName,
} from '../../features/currenPlayList';
import { useRouter } from 'next/router';
import HeaderBar from '../../components/HeaderBar';
import { convertPlaylistItemsToSongItems } from '../../utils/songItemAdapter';
import Hero from '../../components/Hero';
import PlayListWith4Cols from '../../components/PlayListWith4Cols';
import Loader from '../../components/Loader';
import TrackListHeaderContent from '../../components/TrackListHeaderContent';
import useRandomColor from '../../hooks/useRandomColor';

const PlaylistInfo = () => {
  const playListInfo = useSelector(selectCurrentPlaylist);
  const hasItems = useSelector(selecthasItems);
  const loading = useSelector(selectLoading);
  const playListName = useSelector(selectLPlaylistName);
  const [headerTransition, setHeaderTransition] = useState(null);
  const dispatch = useDispatch();
  const { query } = useRouter();
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const randomColor = useRandomColor({
    generateRandomColor: !loading && hasItems,
    seed: playListInfo?.id,
  });

  useEffect(() => {
    /* Get user´s playlist when component is mounted */
    dispatch(fetchPlayListTracks(query.id));
    /* Set transition state in null */
    setHeaderTransition(null);
  }, [query.id]);

  useEffect(() => {
    /* When hero componente is rendered then set transition state  */
    if (!loading && hasItems) {
      const heroClientHeight = heroRef.current.clientHeight;
      setHeaderTransition({
        container: containerRef.current,
        fromScrollY: (header) => {
          return Math.abs(heroClientHeight - header.clientHeight);
        },
      });
    }
  }, [loading, hasItems]);

  return (
    <Container ref={containerRef} bgColor={randomColor}>
      <>
        {loading && <Loader />}
        {!loading && (
          <>
            <HeaderBar transition={headerTransition} bgColor={randomColor} showContent={hasItems}>
              <>{hasItems && playListName && <TrackListHeaderContent title={playListName} />}</>
            </HeaderBar>
            <Hero
              ref={heroRef}
              bgColor={randomColor}
              imageUrl={playListInfo?.images[0]?.url}
              title={playListInfo?.name}
              beforeTitle={<p className='font-gothammedium text-xs mb-1'>PLAYLIST</p>}
              afterTitle={
                <>
                  {playListInfo?.description && (
                    <p className='text-md text-zinc-300 hidden font-gothambook mb-1 xl:line-clamp-3 truncate whitespace-pre-wrap'>
                      {playListInfo?.description}
                    </p>
                  )}
                  <p className='text-xs text-white font-medium font-gothammedium'>
                    {playListInfo?.owner.display_name}
                    <span className='text-gray-200 text-sm'> . {playListInfo?.tracks.items.length} songs</span>
                  </p>
                </>
              }
            />
          </>
        )}
        {!loading && hasItems && (
          <>
            {playListInfo?.tracks?.items.length > 0 && (
              <PlayListWith4Cols items={convertPlaylistItemsToSongItems(playListInfo.tracks.items)} />
            )}
          </>
        )}
      </>
    </Container>
  );
};

PlaylistInfo.layout = true;

export default PlaylistInfo;
