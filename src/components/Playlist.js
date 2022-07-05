import React, { useEffect, useId, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SongItem from './SongItem';
import Container from './Container';
import { fetchPlayListTracks } from '../features/currenPlayList';
import randomColor from 'randomcolor';
import { useRouter } from 'next/router';
import Header from './Header';
import { MusicNoteIcon } from '@heroicons/react/outline';
import { ExclamationCircleIcon } from '@heroicons/react/solid';

export default function Center() {
  const id = useId();
  const playListInfo = useSelector((state) => state.currentPlayList.info);
  const dispatch = useDispatch();
  const { query } = useRouter();
  const containerRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    /* Get user´s playlist when component is mounted */
    dispatch(fetchPlayListTracks(query.id));
  }, [query]);

  const containerStyles = useMemo(() => {
    /* Generate random color for playlist */
    if (playListInfo && playListInfo?.tracks?.items?.length > 0) {
      return {
        backgroundColor: randomColor({
          luminosity: 'dark',
          seed: playListInfo.name,
        }),
      };
    }

    return {};
  }, [playListInfo, query]);

  return (
    <Container
      ref={containerRef}
      style={containerStyles}
      header={<Header container={containerRef.current} hero={heroRef.current} style={containerStyles} />}
    >
      {playListInfo && (
        <>
          <div
            ref={heroRef}
            className=' min-h-[20rem] h-auto relative p-4 before:block before:w-full before:h-full'
            style={Object.keys(containerStyles).length > 0 ? {} : { backgroundColor: 'rgb(86,86,86)' }}
          >
            <div className='lg:flex items-end lg:absolute bottom-6 mx-auto md:mx-0 left-8 mt-16 lg:mt-0 lg:w-[90%] w-[100%]'>
              {playListInfo && playListInfo?.images[0] ? (
                <img className='w-56 h-52 mb-4 mx-auto lg:mx-0 lg:mb-0 lg:mr-4' src={playListInfo?.images[0]?.url} />
              ) : (
                <div
                  className='w-56 h-52 mb-4 mx-auto lg:ml-0 lg:mb-0 lg:mr-4 bg-[#282828] flex items-center justify-center shadow-md'
                  src={playListInfo?.images[0]?.url}
                >
                  <MusicNoteIcon className='w-16 h-16 text-gray-400' />
                </div>
              )}
              <div>
                <p className='xl:text-3xl md:text-2xl font-bold mb-2 lg:mb-4 w-full pr-2 font-gothamblack'>
                  {playListInfo?.name}
                </p>
                {playListInfo?.description && (
                  <p className='text-md font-medium text-gray-200 hidden xl:block w-5/6 font-gothammedium'>
                    {playListInfo?.description}
                  </p>
                )}
                <p className='text-sm text-white font-medium font-gothambold'>
                  {playListInfo?.owner.display_name}
                  <span className='text-gray-200'> . {playListInfo?.tracks.items.length} songs</span>
                </p>
              </div>
            </div>
          </div>
          {playListInfo?.tracks?.items.length > 0 ? (
            <ul className='px-6 py-4 w-full h-auto overflow-y-auto bg-gradient-to-b from-[rgba(0,0,0,0.7)] to-black text-sm md:text-sm md:text-md pb-[90px]'>
              {playListInfo?.tracks.items.map(({ track, added_at }, index) => (
                <SongItem key={`${id}-${track.id}`} track={track} added_at={added_at} index={index} />
              ))}
            </ul>
          ) : (
            <div className='text-center mt-10 text-gray-100'>
              <ExclamationCircleIcon className='w-14 h-14 inline-block mb-1' />
              <p className='md:text-2xl text-xl text-center font-medium'>There are no tracks in your playlist.</p>
            </div>
          )}
        </>
      )}
    </Container>
  );
}
