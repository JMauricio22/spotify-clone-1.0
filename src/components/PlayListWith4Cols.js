import React from 'react';
import { useDispatch } from 'react-redux';
import { ClockIcon } from '@heroicons/react/outline';
import { playSong } from '../features/player';
import Playlist from './Playlist';

function PlayListWith4Cols(Component) {
  return function WrapperComponent(props) {
    const dispatch = useDispatch();

    return (
      <>
        <Component
          {...props}
          header={
            <li className='grid grid-cols-[1fr_50px] lg:grid-cols-[1fr_200px_100px] xl:grid-cols-[1fr_200px_200px_100px] grid-rows-1 gap-4 py-3 lg:pl-4 pl-0 pr-0 lg:pr-2 items-center text-xs font-gothammedium border-b-[0.1px] border-gray-200 text-slate-300'>
              <span className='grid md:grid-rows-1 grid-cols-[60px_1fr] md:grid-cols-[40px_60px_1fr] max-w-full'>
                <div className='text-gray-300 md:flex items-center justify-center hidden'>
                  <span className='group-hover:hidden inline-block lg:text-lg text-sm font-gothammedium'>#</span>
                </div>
                <div className='flex items-center mr-4 md:mr-0'>TITLE</div>
              </span>
              <span className='lg:inline-block hidden'>ALBUM</span>
              <span className='xl:inline-block hidden'>DATE ADDED</span>
              <span className='lg:pr-0 lg:text-left text-right pr-4'>
                <ClockIcon className='w-5 h-5 inline-block' />
              </span>
            </li>
          }
          columnContainer={({ item, id, track }) => (
            <span
              key={id}
              onDoubleClick={() => dispatch(playSong(track))}
              className='grid grid-cols-[1fr_50px] lg:grid-cols-[1fr_200px_100px] xl:grid-cols-[1fr_200px_200px_100px] cursor-pointer group grid-rows-1 gap-4 py-3 hover:bg-[hsla(0,0%,100%,.1)] lg:pl-4 pl-0 pr-0 lg:pr-2 rounded-md'
            >
              {item}
            </span>
          )}
        />
      </>
    );
  };
}

export default PlayListWith4Cols(Playlist);
