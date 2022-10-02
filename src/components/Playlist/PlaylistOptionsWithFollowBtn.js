import React from 'react';
import { HeartIcon } from '@heroicons/react/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid';
import PlaylistOptions from './PlaylistOptions';
import { showNotificationWithTimeout } from '../../features/toastState';
import { useDispatch } from 'react-redux';

function PlaylistOptionsWithFollowBtn(WrappedComponent) {
  return function ({ follow, unfollow, isFollowing, ...props }) {
    const dispatch = useDispatch();

    const addFollow = async () => {
      try {
        await follow(dispatch);
        showNotificationWithTimeout(dispatch, 'Saved in your library');
      } catch (error) {}
    };

    const removeFollow = async () => {
      try {
        await unfollow(dispatch);
        showNotificationWithTimeout(dispatch, 'Removed from your library');
      } catch (error) {}
    };

    const followButton = (
      <span>
        {isFollowing ? (
          <HeartIconSolid onClick={removeFollow} className='w-8 h-8 inline-block text-green-600' />
        ) : (
          <HeartIcon onClick={addFollow} className='w-8 h-8 inline-block text-gray-400 hover:text-white' />
        )}
      </span>
    );

    return <WrappedComponent {...props} followButton={followButton} />;
  };
}

export default PlaylistOptionsWithFollowBtn(PlaylistOptions);
