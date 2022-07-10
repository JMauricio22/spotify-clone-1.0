import React from 'react';

export default function Loader() {
  return (
    <div className='w-16 text-center mt-48 mx-auto space-x-1'>
      <div className='w-4 h-4 inline-block bg-green-600 rounded-full animate-spinner-bounce-delay-1'></div>
      <div className='w-4 h-4 inline-block bg-green-600 rounded-full animate-spinner-bounce-delay-2'></div>
      <div className='w-4 h-4 inline-block bg-green-600 rounded-full animate-spinner-bounce'></div>
    </div>
  );
}
