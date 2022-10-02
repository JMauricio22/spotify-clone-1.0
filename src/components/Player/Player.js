import React from 'react';
import { useSelector } from 'react-redux';
import PlayerLeftControls from './PlayerLeftControls';
import PlayerRightControls from './PlayerRightControls';
import PlayerCenterControls from './PlayerCenterControls';
import useTransferPlayback from '../../hooks/useTransferPlayback';
import useSpotifyPlayer from '../../hooks/useSpotifyPlayer';
import { selectPlayerTrack, selectPlayerVolume, selectPlayerMuted, selectPlayerPaused } from '../../features/player';

export default function Player() {
  const volume = useSelector(selectPlayerVolume);
  const muted = useSelector(selectPlayerMuted);
  const track = useSelector(selectPlayerTrack);
  const paused = useSelector(selectPlayerPaused);

  const { player } = useSpotifyPlayer();

  /* Transfert playback  */
  useTransferPlayback();

  return (
    <div className='grid-in-player w-full h-[90px] bg-[#181818] items-center px-4 justify-center flex relative'>
      <PlayerLeftControls player={player} track={track} />
      <PlayerCenterControls player={player} paused={paused} track={track} />
      <PlayerRightControls player={player} track={track} volume={volume} muted={muted} />
    </div>
  );
}
