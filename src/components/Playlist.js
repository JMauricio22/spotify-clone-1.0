import React, { useId } from 'react';
import SongItem from './SongItem';

export default function Playlist({ items, header, columnContainer }) {
  const elementId = useId();

  return (
    <ul className='px-6 py-4 w-full h-auto overflow-y-auto bg-gradient-to-b from-[rgba(0,0,0,0.7)] to-black text-sm lg:text-lg'>
      {header}
      {items.map(({ columns, track }) => (
        <li key={`${elementId}-${track.id}`}>
          {columnContainer({
            item: <SongItem columns={columns} track={track} />,
            id: `${elementId}-${track.id}`,
            track,
          })}
        </li>
      ))}
    </ul>
  );
}
