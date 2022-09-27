import React, { useRef } from 'react';
import { VolumeOffIcon } from '@heroicons/react/solid';
import { VolumeUpIcon } from '@heroicons/react/outline';
import { setVolume } from '../../features/player';
import AvaliableDevices from './AvaliableDevices';
import { useDispatch } from 'react-redux';

export default function PlayerRightControls({ player, volume, muted }) {
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
    const newVolume = target.value;
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      setNewVolume(newVolume);
    }, 300);
  };

  const unmute = async () => {
    setNewVolume(volume || 50);
  };

  const mute = async () => {
    setNewVolume(0);
  };

  return (
    <div className='space-x-2 flex items-center text-gray-300'>
      <AvaliableDevices />
      {muted ? (
        <VolumeOffIcon className='w-5 h-5' onClick={unmute} />
      ) : (
        <VolumeUpIcon className='w-5 h-5' onClick={mute} />
      )}
      <input ref={volumeControl} className='text-white' type='range' min={0} max={100} onChange={onChangeVolume} />
    </div>
  );
}
