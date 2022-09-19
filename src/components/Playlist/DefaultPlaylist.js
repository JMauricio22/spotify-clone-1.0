import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClockIcon, HeartIcon } from '@heroicons/react/outline';
import { PlayIcon, SearchIcon, HeartIcon as HeartIconSolid } from '@heroicons/react/solid';
import { playSong } from '../../features/player';
import PlaylistContainer from './PlaylistContainer';
import { selectFollow, selectLPlaylistId, followPlaylist, unfollowPlaylist } from '../../features/currenPlayList';
import { fetchPlayUserPlaylist } from '../../features/playlist';
import { showNotificationWithTimeout } from '../../features/toastState';

function DefaultPlaylist(Component) {
  return function WrapperComponent(props) {
    const dispatch = useDispatch();
    const playlistId = useSelector(selectLPlaylistId);
    const follow = useSelector(selectFollow);

    const onFollowPlaylist = async () => {
      try {
        await dispatch(followPlaylist(playlistId)).unwrap();
        dispatch(fetchPlayUserPlaylist());
        showNotificationWithTimeout(dispatch, 'Saved in your library');
      } catch (error) {}
    };

    const onUnfollowPlaylist = async () => {
      try {
        await dispatch(unfollowPlaylist(playlistId)).unwrap();
        dispatch(fetchPlayUserPlaylist());
        showNotificationWithTimeout(dispatch, 'Removed from your library');
      } catch (error) {}
    };

    return (
      <Component
        {...props}
        options={
          <div className='flex justify-between'>
            <div>
              <PlayIcon className='w-16 h-16 inline-block mr-5 text-green-600' />
              <span>
                {follow ? (
                  <HeartIconSolid onClick={onUnfollowPlaylist} className='w-8 h-8 inline-block text-green-600' />
                ) : (
                  <HeartIcon
                    onClick={onFollowPlaylist}
                    className='w-8 h-8 inline-block text-gray-400 hover:text-white'
                  />
                )}
              </span>
            </div>
            <div className='grid place-content-center'>
              <button className='hover:bg-gray-300/30 w-8 h-8 rounded-full'>
                <SearchIcon className='w-8 h-6 inline-block' />
              </button>
            </div>
          </div>
        }
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
        columnContainer={({ item, track }) => (
          <span
            onDoubleClick={() => dispatch(playSong(track))}
            className='grid grid-cols-[1fr_50px] lg:grid-cols-[1fr_200px_100px] xl:grid-cols-[1fr_200px_200px_100px] cursor-pointer group grid-rows-1 gap-4 py-3 hover:bg-[hsla(0,0%,100%,.1)] lg:pl-4 pl-0 pr-0 lg:pr-2 rounded-md'
          >
            {item}
          </span>
        )}
      />
    );
  };
}

export default DefaultPlaylist(PlaylistContainer);
