import React from 'react';

export default function TrackListHeaderContent({ title }) {
  return (
    <p className='w-[150px] md:w-[300px] lg:w-[350px] xl:[450px] truncate text-md md:text-xl font-gothambold text-white flex items-center'>
      {title}
    </p>
  );
}
