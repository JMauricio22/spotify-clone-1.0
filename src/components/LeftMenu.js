import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import useSpotify from '../hooks/useSpotify';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayList } from '../features/playlist';
import { HomeIcon, SearchIcon, LibraryIcon } from '@heroicons/react/outline';

export default function LeftMenu() {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const playList = useSelector((state) => state.playList);
  const dispatch = useDispatch();

  const getUserPlayList = async () => {
    try {
      const data = await spotifyApi.getUserPlaylists();
      dispatch(setPlayList(data.body.items));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      getUserPlayList();
    }
  }, [session, spotifyApi]);

  return (
    <div className='h-screen max-h-screen overflow-y-auto w-56 bg-black text-gray-300 pl-4 pr-3 py-4 text-xs md:text-sm lg:text-md font-medium'>
      <ul>
        <li className='flex items-center mb-3'>
          <button className='flex items-center'>
            <HomeIcon className='w-6 h-6 mr-2' /> Home
          </button>
        </li>
        <li className='flex items-center mb-3'>
          <button className='flex items-center'>
            <SearchIcon className='w-6 h-6 mr-2' /> Search
          </button>
        </li>
        <li className='flex items-center mb-3'>
          <button className='flex items-center'>
            <LibraryIcon className='w-6 h-6 mr-2' /> Library
          </button>
        </li>
      </ul>
      <div className='h-[.1px] bg-gray-800 my-4' />
      <ul className='h-auto'>
        {playList.map((item) => (
          <li className='mb-2'>
            <button>{item.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
