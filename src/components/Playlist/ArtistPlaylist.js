import React from 'react';
import { useDispatch } from 'react-redux';
import { playSong } from '../../features/player';
import PlaylistContainer from './PlaylistContainer';

function ArtistPlaylist(Component) {
  return function WrapperComponent(props) {
    const dispatch = useDispatch();

    return (
      <Component
        {...props}
        header={
          <li className='md:mb-2 md:mt-0 mt-2 mb-4'>
            <span className='lg:text-xl text-xl font-gothambold'>Popular</span>
          </li>
        }
        columnContainer={({ item, id, track }) => (
          <span
            key={id}
            onDoubleClick={() => dispatch(playSong(track))}
            className='grid grid-cols-[1fr_50px] lg:grid-cols-[1fr_300px_100px] cursor-pointer group grid-rows-1 gap-4 py-3 hover:bg-[hsla(0,0%,100%,.1)] lg:pl-4 pl-0 pr-0 lg:pr-2 rounded-md'
          >
            {item}
          </span>
        )}
      />
    );
  };
}

export default ArtistPlaylist(PlaylistContainer);
