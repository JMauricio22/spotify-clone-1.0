import React from 'react';

function Error({ message = 'An error has occurred' }) {
  return (
    <p className='py-3 px-3 w-full italic lg:text-lg md:text-base text-sm whitespace-pre-wrap line-clamp-2 font-gothambold text-gray-100'>
      {message}
    </p>
  );
}

Error.Highlight = (props) => (
  <div className='rounded-md bg-red-400'>
    <Error {...props} />
  </div>
);

export default Error;
