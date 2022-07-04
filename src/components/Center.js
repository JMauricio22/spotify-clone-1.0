import React, { useEffect, useId } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useSelector } from 'react-redux';
import SongItem from './SongItem';
import useSpotify from '../hooks/useSpotify';
import randomColor from 'randomcolor';
// import Image from 'next/image';

export default function Center() {
  const id = useId();
  const { data: session } = useSession();
  const playListInfo = useSelector((state) => state.currentPlayList.info);

  return (
    <section
      className='h-screen max-h-screen overflow-y-auto flex-1 text-white bg-zinc-900'
      style={{
        backgroundColor: randomColor({
          luminosity: 'dark',
          seed: playListInfo.name,
          format: 'rgba',
          alpha: 0.25,
        }),
      }}
    >
      <div className=' border-[1px] border-transparent min-h-[20rem] h-auto relative p-4'>
        {session?.user && (
          <button
            className='px-4 py-2 rounded-[50px] bg-black absolute right-5 top-5 text-gray-200 text-sm lg:text-md'
            onClick={() => signOut()}
          >
            {session.user.name}
          </button>
        )}
        <div className='lg:flex items-end lg:absolute bottom-6 left-8 mt-16 lg:mt-0'>
          <img className='w-56 h-52 mx-auto mb-4 lg:mb-0 lg:mr-4' src={playListInfo?.images[0]?.url} />
          <div>
            <p className='md:text-4xl lg:text-4xl font-bold mb-2 lg:mb-4'>{playListInfo?.name}</p>
            {playListInfo?.description && (
              <p className='text-md font-medium text-neutral-300 hidden xl:block w-5/6'>{playListInfo?.description}</p>
            )}
            <p className='text-sm text-white font-medium'>
              {playListInfo?.owner.display_name}
              <span className='text-gray-200'> . {playListInfo?.tracks.items.length} songs</span>
            </p>
          </div>
        </div>
      </div>
      <ul className='px-6 py-4 w-full h-auto overflow-y-auto bg-gradient-to-b from-[rgba(0,0,0,0.8)] to-black text-sm md:text-sm md:text-md pb-[90px]'>
        {playListInfo?.tracks.items.map(({ track, added_at }, index) => (
          <SongItem key={`${id}-${track.id}`} track={track} added_at={added_at} index={index} />
        ))}
      </ul>
    </section>
  );
}
