import React from 'react';
import { PlayIcon, PauseIcon, FastForwardIcon, RewindIcon, VolumeOffIcon } from '@heroicons/react/solid';
import { VolumeUpIcon } from '@heroicons/react/outline';
import { useSelector } from 'react-redux';

export default function Player() {
  const track = useSelector((state) => state.player.track);

  return (
    <div className='w-screen h-[90px] bg-[#181818] fixed bottom-0 left-0 flex justify-between items-center px-4'>
      <div className='flex items-center space-x-2'>
        <img className='w-16 h-16' src={track.album.images[0].url} />
        <div>
          <p className='text-white font-medium text-sm'>{track.name}</p>
          <p className=' text-gray-300 font-normal text-xs'>{track.artists[0].name}</p>
        </div>
      </div>
      <div className='text-white flex space-x-4'>
        <button>
          <RewindIcon className='w-10 h-12 text-zinc-400 hover:text-white' />
        </button>
        <button>
          <PlayIcon className='w-12 h-12 hover:scale-110 transition-transform duration-200 ease-in-out' />
        </button>
        <button>
          <FastForwardIcon className='w-10 h-12 text-zinc-400 hover:text-white' />
        </button>
      </div>
      <div className='space-x-2 flex items-center'>
        <VolumeUpIcon className='w-6 h-6 text-gray-300' />
        <input className='text-white' type='range' min={0} max={100} />
      </div>
    </div>
  );
}
