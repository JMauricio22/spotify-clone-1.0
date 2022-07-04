import React, { useEffect, useRef } from 'react';
import { PlayIcon, PauseIcon, FastForwardIcon, RewindIcon, VolumeOffIcon } from '@heroicons/react/solid';
import { VolumeUpIcon, MusicNoteIcon } from '@heroicons/react/outline';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlaybackState, playSong, pauseSong, setVolume } from '../features/player';
import useSpotify from '../hooks/useSpotify';
import { useSession } from 'next-auth/react';

export default function Player() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const track = useSelector((state) => state.player.track);
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const volume = useSelector((state) => state.player.volume);
  const dispatch = useDispatch();
  const timeoutId = useRef(null);

  useEffect(() => {
    /* Get layback state */
    if (spotifyApi.getAccessToken()) {
      dispatch(fetchPlaybackState());
    }
  }, [session, spotifyApi]);

  const changeVolume = ({ target }) => {
    /* Set volume */
    const newVolume = target.value;
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      dispatch(setVolume(newVolume));
    }, 300);
  };

  return (
    <div className='w-screen h-[90px] bg-[#181818] fixed bottom-0 left-0 flex justify-center items-center px-4'>
      <div className='flex items-center space-x-2 absolute left-4'>
        {track ? (
          <img className='w-16 h-16' src={track?.album.images[0].url} />
        ) : (
          <div className='w-16 h-16 bg-[#282828] flex items-center justify-center shadow-md'>
            <MusicNoteIcon className='w-6 h-6 text-gray-400' />
          </div>
        )}
        <div>
          {track && (
            <>
              <p className='text-white font-medium text-sm max-w-[200px] overflow-hidden whitespace-nowrap truncate'>
                <span>{track.name}</span>
              </p>
              <p className=' text-gray-300 font-normal text-xs'>{track.artists[0].name}</p>
            </>
          )}
        </div>
      </div>
      <div className='text-white flex space-x-4'>
        <button disabled={!track}>
          <RewindIcon className='w-10 h-12 text-zinc-400 hover:text-white' />
        </button>
        <button disabled={!track} onClick={() => (isPlaying ? dispatch(pauseSong()) : dispatch(playSong()))}>
          {isPlaying ? (
            <PauseIcon className='w-12 h-12 hover:scale-110 transition-transform duration-200 ease-in-out' />
          ) : (
            <PlayIcon className='w-12 h-12 hover:scale-110 transition-transform duration-200 ease-in-out' />
          )}
        </button>
        <button disabled={!track}>
          <FastForwardIcon className='w-10 h-12 text-zinc-400 hover:text-white' />
        </button>
      </div>
      <div className='space-x-2 flex items-center absolute right-4'>
        <VolumeUpIcon className='w-6 h-6 text-gray-300' />
        <input className='text-white' type='range' min={0} max={100} value={volume} onChange={changeVolume} />
      </div>
    </div>
  );
}
