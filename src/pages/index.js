import Center from '../components/Center';
import Layout from '../components/Layout';
import LeftMenu from '../components/LeftMenu';
import Player from '../components/Player';

const Home = () => {
  return (
    <Layout>
      <main className='w-full h-full flex items-center'>
        <LeftMenu />
        <Center />
        <Player />
      </main>
    </Layout>
  );
};

export default Home;
