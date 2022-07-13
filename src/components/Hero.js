import React, { useEffect } from 'react';
import { MusicNoteIcon } from '@heroicons/react/outline';
import { useMediaQuery } from 'react-responsive';

function setBackgroudImage(isDesktop, element, imageUrl) {
  if (!isDesktop) {
    element.style.backgroundImage = `url(${imageUrl})`;
    element.style.backgroundPosition = '180px top';
    element.style.backgroundSize = 'calc(100% - 187px) 400px';
    element.style.backgroundRepeat = 'no-repeat';
    element.style.backgroundAttachment = 'fixed';
  } else {
    element.style.background = 'none';
  }
}

export default React.forwardRef(({ title, imageUrl, beforeTitle, afterTitle, bgColor = 'rgb(86,86,86)' }, ref) => {
  // const isDesktop = useMediaQuery({
  //   query: '(min-width: 1024px)',
  // });

  // useEffect(() => {
  //   const { current } = ref;
  //   if (current) {
  //     setBackgroudImage(isDesktop, current, imageUrl);
  //   }
  // }, [isDesktop, ref]);

  return (
    <div
      ref={ref}
      className='w-full h-72 flex-grow-0 basis-[300px] shrink-0 relative overflow-x-hidden p-4'
      style={{ backgroundColor: bgColor }}
    >
      <div className='lg:flex items-end absolute bottom-6 mx-auto md:mx-0 left-8 lg:w-[90%] w-[100%]'>
        {imageUrl ? (
          <img className='w-56 h-52 mb-4 mx-auto lg:mx-0 lg:mb-0 lg:mr-4 lg:inline-block hidden' src={imageUrl} />
        ) : (
          <div className='w-56 h-52 mb-4 mx-auto lg:ml-0 lg:mb-0 lg:mr-4 bg-[#282828] lg:flex items-center justify-center shadow-md hidden'>
            <MusicNoteIcon className='w-16 h-16 text-gray-400' />
          </div>
        )}
        <div>
          {beforeTitle}
          <p className='xl:text-4xl md:text-2xl text-3xl mb-2 lg:mb-2 w-full pr-2 whitespace-pre-wrap font-gothamblack line-clamp-3 truncate'>
            {title}
          </p>
          {afterTitle}
        </div>
      </div>
    </div>
  );
});
