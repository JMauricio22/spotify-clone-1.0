import React from 'react';
import { PlayIcon, PauseIcon, FastForwardIcon, RewindIcon } from '@heroicons/react/solid';
import { useDispatch } from 'react-redux';
import { resumeTrack, pauseTrack } from '../../features/player';

export default function PlayerCenterControls({ player, paused, track }) {
  const dispatch = useDispatch();

  const pause = async () => {
    try {
      if (player) {
        await player.pause();
        dispatch(pauseTrack());
      }
    } catch (error) {}
  };

  const resume = async () => {
    try {
      if (player) {
        await player.resume();
        dispatch(resumeTrack());
      }
    } catch (error) {}
  };

  const next = async () => {
    try {
      if (player) {
        await player.nextTrack();
      }
    } catch (error) {}
  };

  const previous = async () => {
    try {
      if (player) {
        await player.previousTrack();
      }
    } catch (error) {}
  };

  const onClick = () => (paused ? resume() : pause());

  return (
    <div className='text-white flex space-x-3'>
      <button disabled={!track} onClick={previous}>
        <RewindIcon className='w-7 h-8 text-zinc-400 hover:text-white' />
      </button>
      <button disabled={!track} onClick={onClick}>
        {paused ? (
          <PlayIcon className='w-10 h-10 hover:scale-110 transition-transform duration-200 ease-in-out' />
        ) : (
          <PauseIcon className='w-10 h-10 hover:scale-110 transition-transform duration-200 ease-in-out' />
        )}
      </button>
      <button disabled={!track} onClick={next}>
        <FastForwardIcon className='w-7 h-8 text-zinc-400 hover:text-white' />
      </button>
    </div>
  );
}
