import React, { useRef, useState, useEffect } from 'react';
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
import { headerBarHeight } from '../../components/HeaderBar';
import { convertPlaylistItemsToSongItems } from '../../utils/songItemAdapter';
import Hero from '../../components/Hero';
import PlayListWith4Cols from '../../components/PlayListWith4Cols';
import Loader from '../../components/Loader';
import TrackListHeaderContent from '../../components/TrackListHeaderContent';
import useRandomColor from '../../hooks/useRandomColor';
import { adaptPlaylistToHeroComponent } from '../../utils/heroItemAdapter';
import HeroPlaylistExtraInfo from '../../components/HeroPlaylistExtraInfo';

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
          return Math.abs(heroClientHeight - headerBarHeight * 2);
        },
      });
    }
  }, [loading, hasItems]);

  return (
    <Container ref={containerRef} bgColor={randomColor}>
      <>
        {loading && <Loader />}
        {!loading && (
          <Hero
            ref={heroRef}
            bgColor={randomColor}
            item={adaptPlaylistToHeroComponent(playListInfo)}
            headerBarContent={!!playListName && <TrackListHeaderContent title={playListName} />}
            headerTransition={headerTransition}
            afterTitle={
              <HeroPlaylistExtraInfo
                description={playListInfo?.description}
                ownerDisplayName={playListInfo?.owner.display_name}
                totalTracks={playListInfo?.tracks.items.length}
              />
            }
          />
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
