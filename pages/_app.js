/* eslint-disable react-hooks/exhaustive-deps */
import '../styles/globals.css';
import { useStore } from '../redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistStore } from 'redux-persist';
import NextNProgress from 'nextjs-progressbar';
import { Loader } from '../components/base';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    router.events.on('routeChangeStart', () => setLoading(true));
    router.events.on('routeChangeComplete', () => setLoading(false));
    router.events.on('routeChangeError', () => setLoading(false));
  }, [router]);
  const store = useStore(pageProps.initialReduxState);
  const persistor = persistStore(store, {}, function () {
    persistor.persist();
  });
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NextNProgress color="#7E98DF" startPosition={0.3} stopDelayMs={200} height={4} showOnShallow={true} />
        <Loader show={loading} />
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
