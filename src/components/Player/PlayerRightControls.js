import React, { useEffect, useRef } from 'react';
import { VolumeOffIcon } from '@heroicons/react/solid';
import { VolumeUpIcon } from '@heroicons/react/outline';
import { setVolume, setMuted } from '../../features/player';
import AvaliableDevices from './AvaliableDevices';
import { useDispatch } from 'react-redux';

export default function PlayerRightControls({ player, volume, muted, track }) {
  const volumeControl = useRef(null);
  const timeoutId = useRef(null);
  const dispatch = useDispatch();

  const setNewVolume = async (newVolume) => {
    try {
      if (player) {
        await player.setVolume(newVolume / 100);
        dispatch(
          setVolume({
            volume: newVolume,
            muted: newVolume === 0,
          })
        );
      }
    } catch (error) {}
  };

  const onChangeVolume = ({ target }) => {
    const newVolume = Number(target.value);
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      setNewVolume(newVolume);
    }, 300);
  };

  const unmute = async () => {
    try {
      if (player) {
        await player.setVolume(volume / 100);
        dispatch(setMuted(false));
      }
    } catch (error) {}
  };

  const mute = async () => {
    try {
      if (player) {
        await player.setVolume(0);
        dispatch(setMuted(true));
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (volumeControl.current) {
      if (muted) {
        volumeControl.current.value = 0;
      } else {
        volumeControl.current.value = volume;
      }
    }
  }, [muted]);

  return (
    <div className='space-x-2 absolute right-0 flex top-1/2 -translate-y-1/2 items-center text-gray-300'>
      {/* <AvaliableDevices /> */}
      <button disabled={!track}>
        {muted ? (
          <VolumeOffIcon className='w-5 h-5' onClick={unmute} />
        ) : (
          <VolumeUpIcon className='w-5 h-5' onClick={mute} />
        )}
      </button>
      <input
        disabled={!track}
        ref={volumeControl}
        className='text-white'
        type='range'
        min={0}
        max={100}
        onChange={onChangeVolume}
        // value={0 }
      />
    </div>
  );
}
