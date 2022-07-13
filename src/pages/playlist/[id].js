import React, { useMemo, useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../components/Container';
import {
  fetchPlayListTracks,
  selectCurrentPlaylist,
  selectLoading,
  selecthasItems,
} from '../../features/currenPlayList';
import randomColor from 'randomcolor';
import { useRouter } from 'next/router';
import HeaderBar from '../../components/HeaderBar';
import { convertPlaylistItemsToSongItems } from '../../utils/songItemAdapter';
import Hero from '../../components/Hero';
import PlayListWith4Cols from '../../components/PlayListWith4Cols';
import Loader from '../../components/Loader';

const PlaylistInfo = () => {
  const playListInfo = useSelector(selectCurrentPlaylist);
  const hasItems = useSelector(selecthasItems);
  const loading = useSelector(selectLoading);
  const [headerTransition, setHeaderTransition] = useState(null);
  const dispatch = useDispatch();
  const { query } = useRouter();
  const containerRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    /* Get user´s playlist when component is mounted */
    dispatch(fetchPlayListTracks(query.id));
    /* Set transition state in null */
    setHeaderTransition(null);
  }, [query.id]);

  const bgRandomColor = useMemo(() => {
    /* If loading it´s loading then set then background transparent */
    if (loading) {
      return undefined;
    }
    /* Generate random color for playlist */
    if (hasItems && hasItems) {
      return randomColor({
        luminosity: 'dark',
        format: 'hsl',
        seed: playListInfo.id,
      });
    }

    return undefined;
  }, [hasItems, query.id, loading]);

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
    <Container ref={containerRef} bgColor={bgRandomColor}>
      <>
        {loading && <Loader />}
        {!loading && (
          <>
            <HeaderBar transition={headerTransition} bgColor={bgRandomColor} showContent={hasItems} />
            <Hero
              ref={heroRef}
              bgColor={bgRandomColor}
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
