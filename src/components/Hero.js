import React from 'react';
import { MusicNoteIcon } from '@heroicons/react/outline';
import HeaderBar from './HeaderBar';
import TrackListHeaderContent from './TrackListHeaderContent';

export default React.forwardRef(
  ({ item, beforeTitle, afterTitle, headerBarContent, bgColor = 'rgb(86,86,86)', headerTransition }, ref) => {
    const beforeTitleComponent = item.type ? (
      <p className='font-gothammedium text-xs mb-1 uppercase'> {item.type} </p>
    ) : (
      beforeTitle
    );

    const heroImageComponent = item.imageUrl ? (
      <img className='w-56 h-52 mb-4 mx-auto lg:mx-0 lg:mb-0 lg:mr-4 lg:inline-block hidden' src={item.imageUrl} />
    ) : (
      <div className='w-56 h-52 mb-4 mx-auto lg:ml-0 lg:mb-0 lg:mr-4 bg-[#282828] lg:flex items-center justify-center shadow-md hidden'>
        <MusicNoteIcon className='w-16 h-16 text-gray-400' />
      </div>
    );

    return (
      <header
        ref={ref}
        className='w-full flex-grow-0 basis-[350px] shrink-0 relative overflow-x-hidden px-4 pb-4 pt-4'
        style={{ backgroundColor: bgColor }}
      >
        <HeaderBar transition={headerTransition} bgColor={bgColor} showContent={true}>
          {headerBarContent}
        </HeaderBar>
        <div className='lg:flex items-end absolute bottom-6 mx-auto md:mx-0 left-8 lg:w-[90%] w-[100%]'>
          {heroImageComponent}
          <div>
            {beforeTitleComponent}
            <p className='xl:text-4xl md:text-2xl text-3xl mb-2 lg:mb-2 w-full pr-2 whitespace-pre-wrap font-gothamblack line-clamp-3 truncate'>
              {item.title}
            </p>
            {afterTitle}
          </div>
        </div>
      </header>
    );
  }
);
