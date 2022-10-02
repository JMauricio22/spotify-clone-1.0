import React from 'react';
import { PlayIcon, SearchIcon } from '@heroicons/react/solid';
import { useDispatch } from 'react-redux';
import { play } from '../../features/player';

export default function PlaylistOptions({ uri, followButton }) {
  const dispatch = useDispatch();

  const playAllTracks = async () => dispatch(play(uri));

  return (
    <div className='flex justify-between mb-2'>
      <div>
        <button onClick={playAllTracks}>
          <PlayIcon className='w-16 h-16 inline-block mr-5 text-green-600 hover:scale-110 transition-transform hover:text-green-500' />
        </button>
        {followButton}
      </div>
      <div className='grid place-content-center'>
        <button className='hover:bg-gray-300/30 w-8 h-8 rounded-full'>
          <SearchIcon className='w-8 h-6 inline-block' />
        </button>
      </div>
    </div>
  );
}
