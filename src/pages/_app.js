import '../styles/globals.css';
import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import store from '../store';
import Layout from '../components/Layout';
import Toast from '../components/Toast';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <SessionProvider>
        {Component.layout ? (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        ) : (
          <Component {...pageProps} />
        )}
        <Toast />
      </SessionProvider>
    </Provider>
  );
}

export default MyApp;
