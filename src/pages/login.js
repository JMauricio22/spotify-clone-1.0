import React from 'react';
import { getProviders, signIn } from 'next-auth/react';
import { Transition } from '@headlessui/react';

export default function login({ providers }) {
  const provider = Object.values(providers)[0];

  return (
    <div className='w-screen h-screen overflow-hidden bg-[#1d1d1d] font-gothambook'>
      <main className='flex justify-center items-center w-full h-full'>
        <div className='px-2 text-center'>
          <div className='text-center mb-4 w-auto h-auto relative overflow-hidden p-2'>
            <h1 className='text-8xl font-gothamblack text-gray-100 tracking-wider'>Spotify</h1>
            <Transition
              appear={true}
              show={true}
              as='div'
              enter='transition-transform origin-top-right duration-500 ease-out'
              enterFrom='scale-x-100'
              enterTo='scale-x-0'
              className='bg-[#1d1d1d] absolute inset-0'
            ></Transition>
          </div>
          <button
            className='px-4 py-2 hover:border-[#1db954] border-transparent outline-none border-[1.5px] rounded-full hover:bg-transparent hover:text-[#1db954] bg-[#1db954] text-white text-sm font-gothambook'
            onClick={() =>
              signIn(provider.id, {
                callbackUrl: process.env.NEXT_PUBLIC_APP_URL,
              })
            }
          >
            Sign in with {provider.name}
          </button>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
