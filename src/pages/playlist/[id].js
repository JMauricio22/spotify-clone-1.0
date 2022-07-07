import Layout from '../../components/Layout';
import LeftMenu from '../../components/LeftMenu';
import Player from '../../components/Player';
import PlaylistInfo from '../../components/PlaylistInfo';

const Home = () => {
  return (
    <Layout>
      <main className='w-full h-full flex items-center'>
        <LeftMenu />
        <PlaylistInfo />
        <Player />
      </main>
    </Layout>
  );
};

export default Home;
