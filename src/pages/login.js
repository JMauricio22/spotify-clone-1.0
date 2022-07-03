import React from 'react';
import { getProviders, signIn } from 'next-auth/react';
import SpotifyIcon from '../assets/images/spotify-svgrepo-com.svg';
import Layout from '../components/Layout';
import Image from 'next/image';

export default function login({ providers }) {
  return (
    <Layout>
      <div className='flex justify-center items-center w-full h-full'>
        <div className='px-2'>
          <div className='text-center mb-4'>
            <Image src={SpotifyIcon} width={150} height={150} />
          </div>
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className='px-4 py-2 border-[#1db954] border-2 text-[#1db954] hover:bg-[#1db954] hover:text-white rounded-sm text-md font-medium'
                onClick={() =>
                  signIn(provider.id, {
                    callbackUrl: 'http://localhost:3000',
                  })
                }
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
