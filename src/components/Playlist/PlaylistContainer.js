import React, { useId } from 'react';
import TrackItem from '../TrackItem';

export default function PlaylistContainer({ items, header, columnContainer }) {
  const elementId = useId();

  return (
    <ul className='block flex-grow px-6 py-4 w-full h-auto bg-playlist-gradient text-sm lg:text-lg'>
      {header}
      {items.map(({ columns, track }, index) => (
        <li key={`${elementId}-${track.id}-${index}`}>
          {columnContainer({
            item: <TrackItem columns={columns} track={track} />,
            track,
          })}
        </li>
      ))}
    </ul>
  );
}
