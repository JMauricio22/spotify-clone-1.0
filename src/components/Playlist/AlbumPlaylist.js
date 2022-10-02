import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { playSong } from '../../features/player';
import { selectAlbumUri } from '../../features/selectedAlbum';
import PlaylistContainer from './PlaylistContainer';
import PlaylistOptions from './PlaylistOptions';
import { ClockIcon } from '@heroicons/react/solid';

function AlbumPlaylist(Component) {
  return function WrapperComponent(props) {
    const dispatch = useDispatch();
    const albumUri = useSelector(selectAlbumUri);

    return (
      <Component
        {...props}
        options={<PlaylistOptions uri={albumUri} />}
        header={
          <li className='grid grid-cols-[1fr_50px] lg:grid-cols-[1fr_100px] xl:grid-cols-[1fr_100px] grid-rows-1 gap-4 py-3 lg:pl-4 pl-0 pr-0 lg:pr-2 items-center text-xs font-gothammedium border-b-[0.1px] border-gray-200 text-slate-300'>
            <span className='grid md:grid-rows-1 grid-cols-[60px_1fr] md:grid-cols-[40px_60px_1fr] max-w-full'>
              <div className='text-gray-300 md:flex items-center justify-center hidden'>
                <span className='group-hover:hidden inline-block lg:text-lg text-sm font-gothammedium'>#</span>
              </div>
              <div className='flex items-center mr-4 md:mr-0'>TITLE</div>
            </span>
            <span className='lg:pr-0 lg:text-left text-right pr-4'>
              <ClockIcon className='w-5 h-5 inline-block' />
            </span>
          </li>
        }
        columnContainer={({ item, track }) => (
          <span
            onDoubleClick={() => dispatch(playSong(track))}
            className='grid grid-cols-[1fr_50px] lg:grid-cols-[1fr_100px] cursor-pointer group grid-rows-1 gap-4 py-3 hover:bg-[hsla(0,0%,100%,.1)] lg:pl-4 pl-0 pr-0 lg:pr-2 rounded-md'
          >
            {item}
          </span>
        )}
      />
    );
  };
}

export default AlbumPlaylist(PlaylistContainer);
