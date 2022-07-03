import Center from '../components/Center';
import Layout from '../components/Layout';
import LeftMenu from '../components/LeftMenu';

const Home = () => {
  return (
    <Layout>
      <main className='w-full h-full flex items-center'>
        <LeftMenu />
        <Center />
      </main>
    </Layout>
  );
};

export default Home;
