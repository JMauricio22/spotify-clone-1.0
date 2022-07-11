import React from 'react';
import Layout from '../../components/Layout';
import LeftMenu from '../../components/LeftMenu';
import Player from '../../components/Player';
import ArtistProfile from '../../components/ArtistProfile';

export default function Artist() {
  return (
    <Layout>
      <main className='w-full h-full flex items-stretch'>
        <LeftMenu />
        <ArtistProfile />
        <Player />
      </main>
    </Layout>
  );
}
