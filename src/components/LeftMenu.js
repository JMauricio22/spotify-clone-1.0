import { useEffect, useId } from 'react';
import { useSession } from 'next-auth/react';
import useSpotify from '../hooks/useSpotify';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserPlaylist, setPlayList, setPlayListError } from '../features/playlist';
import { HomeIcon, SearchIcon, LibraryIcon } from '@heroicons/react/outline';
import Link from 'next/link';

export default function LeftMenu() {
  const id = useId();
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const playList = useSelector(selectUserPlaylist);
  const dispatch = useDispatch();

  const getUserPlayList = async () => {
    /* Get user playlist */
    try {
      const data = await spotifyApi.getUserPlaylists();
      dispatch(setPlayList(data.body.items));
    } catch (error) {
      dispatch(setPlayListError(error.message));
    }
  };

  useEffect(() => {
    /* Get user playlist when component is mounted */
    if (spotifyApi.getAccessToken()) {
      getUserPlayList();
    }
  }, [session, spotifyApi]);

  return (
    <aside className='h-screen max-h-screen hidden md:block overflow-y-auto w-56 bg-black text-gray-300 pl-4 pr-3 py-4 text-xs md:text-sm lg:text-md font-medium'>
      <ul>
        <li className='flex items-center mb-3 hover:text-white font-gothammedium'>
          <Link href='/'>
            <a className='flex items-center'>
              <HomeIcon className='w-6 h-6 mr-2' /> Home
            </a>
          </Link>
        </li>
        <li className='flex items-center mb-3 hover:text-white font-gothammedium'>
          <Link href='/search'>
            <a className='flex items-center'>
              <SearchIcon className='w-6 h-6 mr-2' /> search
            </a>
          </Link>
        </li>
        <li className='flex items-center mb-3 hover:text-white font-gothammedium'>
          <button className='flex items-center'>
            <LibraryIcon className='w-6 h-6 mr-2' /> Library
          </button>
        </li>
      </ul>
      <div className='h-[.1px] bg-gray-800 my-4' />
      <ul className='h-auto'>
        {playList.map((item) => (
          <li className='mb-2 hover:text-white text-left w-full truncate font-gothambook' key={`${id}-${item.id}`}>
            <Link href={`/playlist/${item.id}`}>
              <a>{item.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
