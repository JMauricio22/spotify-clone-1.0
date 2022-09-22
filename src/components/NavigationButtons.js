import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

export default function NavigationButtons({ children }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {}, [router.asPath]);

  useEffect(() => {
    window.addEventListener('popstate', (state) => {
      console.log({ state });
    });
  }, []);

  const goBack = () => router.back();
  const goForward = () => window.history.forward();

  return (
    <div className='flex justify-start items-center pl-4'>
      <div className='flex'>
        <button onClick={goBack} className='w-[40px] h-[40px] bg-black/80 rounded-full grid place-content-center mr-3'>
          <ChevronLeftIcon className='w-[30px] h-[30px] text-slate-200' />
        </button>
        <button
          onClick={goForward}
          className='w-[40px] h-[40px] bg-black/80 rounded-full grid place-content-center mr-3'
        >
          <ChevronRightIcon className='w-[30px] h-[30px] text-slate-200' />
        </button>
        {children}
      </div>
    </div>
  );
}
