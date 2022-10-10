import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { store } from '../app/store';

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <GoogleOAuthProvider clientId="150015760926-er543t6sb0qntsg4ij89jjvguqsgdlje.apps.googleusercontent.com">
      <SessionProvider session={pageProps.session}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </SessionProvider>
    </GoogleOAuthProvider>
  );
}

export default MyApp;
