import React, { useId } from 'react';
import SongItem from './SongItem';

export default function Playlist({ items, header, columnContainer }) {
  const elementId = useId();

  return (
    <ul className='block flex-grow px-6 py-4 w-full h-auto bg-playlist-gradient text-sm lg:text-lg'>
      {header}
      {items.map(({ columns, track }, index) => (
        <li key={`${elementId}-${track.id}-${index}`}>
          {columnContainer({
            item: <SongItem columns={columns} track={track} />,
            track,
          })}
        </li>
      ))}
    </ul>
  );
}
