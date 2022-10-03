import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PLAYER_NAME, transferPlaybackPlayer } from '../features/playback';
import { playerStateChange } from '../features/player';
import { selectPlayerVolume } from '../features/player';
import useAuth from './useAuth';

export default function () {
  const { isAuthenticated, accessToken } = useAuth();
  const [player, setPlayer] = useState(null);
  const [scriptReady, setScritReady] = useState(false);
  const volume = useSelector(selectPlayerVolume);

  const dispatch = useDispatch();

  const playerReady = !!player;

  useEffect(() => {
    /* Create script to spotify player */
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => setScritReady(true);

    return () => document.body.removeChild(script);
  }, []);

  useEffect(() => {
    if (!playerReady && scriptReady && isAuthenticated) {
      /* Create player from SDK */
      const spotifyPlayer = new window.Spotify.Player({
        name: PLAYER_NAME,
        getOAuthToken: (cb) => {
          cb(accessToken);
        },
        volume: volume / 100,
      });

      setPlayer(spotifyPlayer);

      spotifyPlayer.addListener('ready', ({ device_id }) => {
        dispatch(transferPlaybackPlayer(device_id));
      });

      spotifyPlayer.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      spotifyPlayer.addListener('player_state_changed', (state) => {
        const track_window = state?.track_window;
        if (track_window?.current_track) {
          dispatch(
            playerStateChange({
              track: state.track_window.current_track,
              paused: state.paused,
            })
          );
        }
      });

      spotifyPlayer.connect();
    }
  }, [isAuthenticated, scriptReady, accessToken, playerReady]);

  useEffect(() => {
    return () => {
      if (playerReady) {
        player.disconnect();
      }
    };
  }, [playerReady]);

  return {
    player,
  };
}
