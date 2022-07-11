import Layout from '../../components/Layout';
import LeftMenu from '../../components/LeftMenu';
import Player from '../../components/Player';
import PlaylistContainer from '../../components/PlaylistContainer';

const Home = () => {
  return (
    <Layout>
      <main className='w-full h-full flex items-stretch'>
        <LeftMenu />
        <PlaylistContainer />
        <Player />
      </main>
    </Layout>
  );
};

export default Home;
