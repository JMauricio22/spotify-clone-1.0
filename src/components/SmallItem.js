import React from 'react';

export default function SongSmallItem({ title, type, image }) {
  return (
    <li className='px-1 py-1 lg:hidden hover:bg-[#282828] rounded-md cursor-pointer'>
      <div className='grid grid-rows-1 grid-cols-[60px_1fr_50px]'>
        <div className='relative text-center'>
          <img src={image} alt={title} className='w-11 h-11 inline-block' />
        </div>
        <div>
          <p className='text-white text-md font-gothammedium mb-0 xl:w-56 lg:w-36 md:w-[380px] w-72 truncate'>
            {title}
          </p>
          <span className='text-gray-300 text-sm font-gothambook xl:w-56 lg:w-36 md:w-[380px] w-72 truncate'>
            {type}
          </span>
        </div>
      </div>
    </li>
  );
}
