import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useSelector } from 'react-redux';

export default function Center() {
  const { data: session } = useSession();
  const tracks = useSelector((state) => state.currentPlayList.tracks);

  console.log(tracks);

  return (
    <section className='h-screen max-h-screen overflow-y-auto flex-1 text-white'>
      <div className='bg-green-500 border-[1px] border-transparent h-80 relative'>
        {session?.user && (
          <button
            className='px-4 py-2 rounded-[50px] bg-black absolute right-5 top-5 text-gray-200 text-sm lg:text-md'
            onClick={() => signOut()}
          >
            {session.user.name}
          </button>
        )}
      </div>
      <ul className='px-4 py-4'>
        {tracks.map((track) => (
          <li>{track.track.name}</li>
        ))}
      </ul>
    </section>
  );
}
