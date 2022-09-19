import React from 'react';
import { useSelector } from 'react-redux';
import { getToastMessage, getToastState } from '../features/toastState';

export default function Toast() {
  const show = useSelector(getToastState);
  const message = useSelector(getToastMessage);

  if (show) {
    return (
      <div className='fixed bottom-24 rounded-md left-1/2 -translate-x-1/2 inline-block bg-blue-600 text-white w-auto h-auto py-3 px-8'>
        <span className='font-gothambold text-sm'>{message}</span>
      </div>
    );
  }

  return null;
}
