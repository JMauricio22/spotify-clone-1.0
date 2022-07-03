import React, { useEffect, useId } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useSelector } from 'react-redux';
import SongItem from './SongItem';
import useSpotify from '../hooks/useSpotify';

export default function Center() {
  const id = useId();
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const tracks = useSelector((state) => state.currentPlayList.tracks);

  // /* Get all devices */
  // useEffect(() => {
  //   if (spotifyApi.getAccessToken()) {
  //     const getAllDevices = async () => {
  //       try {
  //         const devices = await spotifyApi.getMyDevices();
  //         console.log('devices', devices);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };

  //     getAllDevices();
  //   }
  // }, [spotifyApi]);

  return (
    <section className='h-screen max-h-screen overflow-y-auto flex-1 text-white bg-green-500'>
      <div className=' border-[1px] border-transparent h-80 relative'>
        {session?.user && (
          <button
            className='px-4 py-2 rounded-[50px] bg-black absolute right-5 top-5 text-gray-200 text-sm lg:text-md'
            onClick={() => signOut()}
          >
            {session.user.name}
          </button>
        )}
      </div>
      <ul className='px-6 py-4 w-full h-auto overflow-y-auto bg-gradient-to-b from-[rgba(0,0,0,0.8)] to-black text-sm md:text-sm md:text-md'>
        {tracks.map(({ track, added_at }, index) => (
          <SongItem key={`${id}-${track.id}`} track={track} added_at={added_at} index={index} />
        ))}
      </ul>
    </section>
  );
}
