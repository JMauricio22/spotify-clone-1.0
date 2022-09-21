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
import { adaptPlaylistItemsToTrackItems } from '../../utils/trackItemAdapter';
import Hero from '../../components/Hero';
import DefaultPlaylist from '../../components/Playlist/DefaultPlaylist';
import Loader from '../../components/Loader';
import TrackListHeaderContent from '../../components/TrackListHeaderContent';
import useRandomColor from '../../hooks/useRandomColor';
import { adaptPlaylistToHeroComponent } from '../../utils/heroItemAdapter';
import HeroPlaylistExtraInfo from '../../components/HeroPlaylistExtraInfo';
import { useSession } from 'next-auth/react';

const PlaylistInfo = () => {
  const { data: session } = useSession();
  const [showPlaylistHeader, setShowPlaylistHeader] = useState(false);
  const playListInfo = useSelector(selectCurrentPlaylist);
  const hasItems = useSelector(selecthasItems);
  const loading = useSelector(selectLoading);
  const playListName = useSelector(selectLPlaylistName);
  const [headerTransition, setHeaderTransition] = useState(null);
  const dispatch = useDispatch();
  const { query } = useRouter();
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  let randomColor = useRandomColor({
    generateRandomColor: !loading && hasItems,
    seed: playListInfo?.id,
  });

  const username = session?.user ? session.user.name : '';

  useEffect(() => {
    /* Get user´s playlist when component is mounted */
    if (username) {
      dispatch(
        fetchPlayListTracks({
          playListId: query.id,
          username: session.user.name,
        })
      );
    }
    /* Set transition state in null */
    setHeaderTransition(null);
  }, [query.id, username]);

  useEffect(() => {
    /* When hero componente is rendered then set transition state  */
    if (!loading && hasItems) {
      const heroClientHeight = heroRef.current.clientHeight;
      setHeaderTransition({
        container: containerRef.current,
        fromScrollY: () => {
          return Math.abs(heroClientHeight - headerBarHeight);
        },
        onVisible: () => setShowPlaylistHeader(true),
        onTransparent: () => setShowPlaylistHeader(false),
      });
    }
  }, [loading, hasItems]);

  return (
    <Container
      ref={containerRef}
      bgColor={randomColor}
      headerTransition={headerTransition}
      headerElement={!!showPlaylistHeader && <TrackListHeaderContent title={playListName} />}
    >
      <>
        {loading && <Loader />}
        {!loading && (
          <>
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
          </>
        )}
        {!loading && hasItems && (
          <>
            {playListInfo?.tracks?.items.length > 0 && (
              <DefaultPlaylist items={adaptPlaylistItemsToTrackItems(playListInfo.tracks.items)} />
            )}
          </>
        )}
      </>
    </Container>
  );
};

PlaylistInfo.layout = true;

export default PlaylistInfo;
