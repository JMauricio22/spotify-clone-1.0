import React from 'react';
import { spotifyDateFormat } from '../../utils/date';

export default function TrackAddedAt({ added_at }) {
  return (
    <span className='hidden align-middle xl:flex lg:text-md items-center text-zinc-300 font-gothammedium text-xs'>
      {spotifyDateFormat(added_at)}
    </span>
  );
}
