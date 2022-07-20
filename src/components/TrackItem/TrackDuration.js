import React from 'react';
import { convertMsToMin } from '../../utils/date';

export default function TrackDuration({ duration_ms }) {
  return (
    <span className='flex items-center text-zinc-300 lg:text-md font-gothammedium text-xs'>
      {convertMsToMin(duration_ms)}
    </span>
  );
}
