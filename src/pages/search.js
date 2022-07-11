import React from 'react';
import Container from '../components/Container';
import Layout from '../components/Layout';
import Search from '../components/Search';
import LeftMenu from '../components/LeftMenu';
import Player from '../components/Player';

export default function SearchPage() {
  return (
    <Layout>
      <main className='w-full h-full flex items-stretch'>
        <LeftMenu />
        <Search />
        <Player />
      </main>
    </Layout>
  );
}
