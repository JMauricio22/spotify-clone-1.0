import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectPlayerTrack,
  selectPlayerVolume,
  selectPlayerMuted,
  playerStateChange,
  selectPlayerPaused,
} from '../../features/player';
import { fetchAvaliableDevices } from '../../features/devices';
import useAuth from '../../hooks/useAuth';
import PlayerLeftControls from './PlayerLeftControls';
import PlayerRightControls from './PlayerRightControls';
import PlayerCenterControls from './PlayerCenterControls';

export default function Player() {
  const { isAuthenticated, accessToken } = useAuth();
  const volume = useSelector(selectPlayerVolume);
  const muted = useSelector(selectPlayerMuted);
  const track = useSelector(selectPlayerTrack);
  const paused = useSelector(selectPlayerPaused);
  const [player, setPlayer] = useState(null);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   /* Get playback state */
  //   if (isAuthenticated) {
  //     dispatch(fetchPlaybackState());
  //   }
  // }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      const script = document.createElement('script');
      script.src = 'https://sdk.scdn.co/spotify-player.js';
      script.async = true;

      document.body.appendChild(script);

      window.onSpotifyWebPlaybackSDKReady = () => {
        const spotifyPlayer = new window.Spotify.Player({
          name: 'Spotify Clone',
          getOAuthToken: (cb) => {
            cb(accessToken);
          },
          volume: volume / 100,
        });

        setPlayer(spotifyPlayer);

        spotifyPlayer.addListener('ready', ({ device_id }) => {
          console.log('Ready with Device ID', device_id);
          dispatch(fetchAvaliableDevices());
        });

        spotifyPlayer.addListener('not_ready', ({ device_id }) => {
          console.log('Device ID has gone offline', device_id);
        });

        spotifyPlayer.addListener('player_state_changed', (state) => {
          console.log(state);
          dispatch(
            playerStateChange({
              track: state.track_window.current_track,
              paused: state.paused,
            })
          );
        });

        spotifyPlayer.connect();
      };
    }
  }, [isAuthenticated]);

  // useEffect(() => {
  //   /* Set the volume control to zero */
  //   if (volumeControl.current && mute) {
  //     volumeControl.current.value = 0;
  //   }
  //   /* If the volume is not zero and not muted, set the current volume */
  //   if (volumeControl.current && Number.parseInt(volumeControl.current.value) === 0 && !mute && volume > 0) {
  //     volumeControl.current.value = volume;
  //   }
  // }, [mute, volume, volumeControl]);

  return (
    <div className='grid-in-player w-full h-[90px] bg-[#181818] justify-between items-center px-4 flex z-30'>
      <PlayerLeftControls player={player} track={track} />
      <PlayerCenterControls player={player} paused={paused} track={track} />
      <PlayerRightControls player={player} volume={volume} muted={muted} />
    </div>
  );
}
