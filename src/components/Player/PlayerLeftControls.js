import React from 'react';
import { MusicNoteIcon } from '@heroicons/react/outline';

export default function PlayerLeftControls({ track }) {
  return (
    <div className='flex items-center space-x-2'>
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
            <p className='text-white font-gothammedium text-sm max-w-[200px] overflow-hidden whitespace-nowrap truncate'>
              <span>{track.name}</span>
            </p>
            <p className=' text-zinc-300 text-xs'>{track.artists[0].name}</p>
          </>
        )}
      </div>
    </div>
  );
}
