import '../styles/globals.css';
import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import store from '../store';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <SessionProvider>
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  );
}

export default MyApp;
