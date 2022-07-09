import React from 'react';
import clsx from 'clsx';

export default function ArtistMobileCard({ title, image, rounded }) {
  return (
    <article className='lg:hidden inline-block p-2 w-40 mr-2 overflow-hidden'>
      <div>
        <img className={clsx('lg:hidden w-full h-32', rounded && 'rounded-full')} src={image} alt={title} />
      </div>
      <div className='mt-3'>
        <p
          className={clsx(
            'text-md text-xs text-white w-[90%] lg:mx-0 font-gothammedium mb-1 truncate',
            rounded && 'text-center'
          )}
        >
          {title}
        </p>
      </div>
    </article>
  );
}
