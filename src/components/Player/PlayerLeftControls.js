import React, { useMemo } from 'react';
import { MusicNoteIcon } from '@heroicons/react/outline';
import Link from 'next/link';

export default function PlayerLeftControls({ track }) {
  const uri = track?.album?.uri ?? '';

  const albumId = useMemo(() => (uri ? /spotify:album:(?<id>.*)/.exec(uri).groups.id : ''), [uri]);

  return (
    <div className='absolute flex items-center space-x-2 left-3 top-1/2 -translate-y-1/2'>
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
              {albumId ? (
                <Link href={`/album/${albumId}`}>
                  <a className='hover:underline'>{track.name}</a>
                </Link>
              ) : (
                <span>{track.name}</span>
              )}
            </p>
            <p className=' text-zinc-300 text-xs'>{track.artists[0].name}</p>
          </>
        )}
      </div>
    </div>
  );
}
