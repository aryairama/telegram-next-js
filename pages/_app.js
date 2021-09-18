import '../styles/globals.css';
import { useStore } from '../redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistStore } from 'redux-persist';
import NextNProgress from 'nextjs-progressbar';
import { Loader } from '../components/base';

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  const persistor = persistStore(store, {}, function () {
    persistor.persist();
  });
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NextNProgress color="#7E98DF" startPosition={0.3} stopDelayMs={200} height={4} showOnShallow={true} />
        <Loader />
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
