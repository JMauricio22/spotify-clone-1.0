import Layout from '../components/Layout';
import LeftMenu from '../components/LeftMenu';
import Home from '../components/Home';
import Player from '../components/Player';

const Index = () => {
  return (
    <Layout>
      <main className='w-full h-full flex items-stretch'>
        <LeftMenu />
        <Home />
        <Player />
      </main>
    </Layout>
  );
};

export default Index;
