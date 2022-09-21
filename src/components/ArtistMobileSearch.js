import Image from 'next/image';
import React from 'react';
import verifiedIcon from '../assets/icons/verified.svg';

export default function ArtistMobileSearch({ title, image }) {
  return (
    <div className='flex space-x-4 items-center lg:hidden'>
      <img className='w-14 h-14 rounded-full' src={image} alt={title} />
      <p className='font-gothammedium sm:text-sm text-xs space-x-2'>
        <span className='inline-block truncate max-w-[300px]'>{title}</span>
        <span className='relative'>
          <Image src={verifiedIcon} width={17} height={17} />
        </span>
      </p>
    </div>
  );
}
