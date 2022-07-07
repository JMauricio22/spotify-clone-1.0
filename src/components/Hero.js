import React from 'react';
import { MusicNoteIcon } from '@heroicons/react/outline';

export default React.forwardRef(({ title, imageUrl, beforeTitle, afterTitle, ...props }, ref) => {
  return (
    <div ref={ref} className=' min-h-[20rem] h-auto relative p-4 before:block before:w-full before:h-full' {...props}>
      <div className='lg:flex items-end lg:absolute bottom-6 mx-auto md:mx-0 left-8 mt-16 lg:mt-0 lg:w-[90%] w-[100%]'>
        {imageUrl ? (
          <img className='w-56 h-52 mb-4 mx-auto lg:mx-0 lg:mb-0 lg:mr-4' src={imageUrl} />
        ) : (
          <div className='w-56 h-52 mb-4 mx-auto lg:ml-0 lg:mb-0 lg:mr-4 bg-[#282828] flex items-center justify-center shadow-md'>
            <MusicNoteIcon className='w-16 h-16 text-gray-400' />
          </div>
        )}
        <div>
          {beforeTitle}
          <p className='xl:text-4xl md:text-2xl font-bold mb-2 lg:mb-3 w-full pr-2 font-gothamblack'>{title}</p>
          {afterTitle}
        </div>
      </div>
    </div>
  );
});
