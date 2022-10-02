import React from 'react';
import { PlayIcon, PauseIcon, FastForwardIcon, RewindIcon } from '@heroicons/react/solid';
import { useDispatch } from 'react-redux';
import { resumeTrack, pauseTrack } from '../../features/player';
import clsx from 'clsx';

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
        <RewindIcon className={clsx('w-7 h-8 text-zinc-400', track && 'hover:text-white')} />
      </button>
      <button disabled={!track} onClick={onClick}>
        {paused ? (
          <PlayIcon
            className={clsx('w-10 h-10 transition-transform duration-200 ease-in-out', track && 'hover:scale-110 ')}
          />
        ) : (
          <PauseIcon
            className={clsx('w-10 h-10 transition-transform duration-200 ease-in-out', track && 'hover:scale-110 ')}
          />
        )}
      </button>
      <button disabled={!track} onClick={next}>
        <FastForwardIcon className={clsx('w-7 h-8 text-zinc-400', track && 'hover:text-white')} />
      </button>
    </div>
  );
}
