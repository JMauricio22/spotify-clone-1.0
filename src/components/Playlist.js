import React, { useEffect, useId, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SongItem from './SongItem';
import Container from './Container';
import { fetchPlayListTracks } from '../features/currenPlayList';
import randomColor from 'randomcolor';
import { useRouter } from 'next/router';
import Header from './Header';

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
    if (playListInfo) {
      return {
        backgroundColor: randomColor({
          luminosity: 'dark',
          seed: playListInfo.name,
          format: 'rgba',
          alpha: 0.25,
        }),
      };
    }

    return {};
  }, [playListInfo, query]);

  return (
    <Container
      ref={containerRef}
      style={containerStyles}
      header={<Header container={containerRef.current} hero={heroRef.current} />}
    >
      {playListInfo && (
        <>
          <div ref={heroRef} className=' border-[1px] border-transparent min-h-[20rem] h-auto relative p-4'>
            <div className='lg:flex items-end lg:absolute bottom-6 left-8 mt-16 lg:mt-0'>
              <img className='w-56 h-52 mx-auto mb-4 lg:mb-0 lg:mr-4' src={playListInfo?.images[0]?.url} />
              <div>
                <p className='md:text-4xl lg:text-4xl font-bold mb-2 lg:mb-4'>{playListInfo?.name}</p>
                {playListInfo?.description && (
                  <p className='text-md font-medium text-neutral-300 hidden xl:block w-5/6'>
                    {playListInfo?.description}
                  </p>
                )}
                <p className='text-sm text-white font-medium'>
                  {playListInfo?.owner.display_name}
                  <span className='text-gray-200'> . {playListInfo?.tracks.items.length} songs</span>
                </p>
              </div>
            </div>
          </div>
          <ul className='px-6 py-4 w-full h-auto overflow-y-auto bg-gradient-to-b from-[rgba(0,0,0,0.5)] to-black text-sm md:text-sm md:text-md pb-[90px]'>
            {playListInfo?.tracks.items.map(({ track, added_at }, index) => (
              <SongItem key={`${id}-${track.id}`} track={track} added_at={added_at} index={index} />
            ))}
          </ul>
        </>
      )}
    </Container>
  );
}
