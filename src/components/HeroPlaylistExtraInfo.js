import React from 'react';

export default function HeroPlaylistExtraInfo({ description, ownerDisplayName, totalTracks }) {
  return (
    <>
      {description && (
        <p className='text-md text-zinc-300 hidden font-gothambook mb-1 xl:line-clamp-3 truncate whitespace-pre-wrap'>
          {description}
        </p>
      )}
      <p className='text-xs text-white font-medium font-gothammedium'>
        {ownerDisplayName}
        <span className='text-gray-200 text-sm'> . {totalTracks} songs</span>
      </p>
    </>
  );
}
