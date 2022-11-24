import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0';

//hooks
import { resetStore } from 'hooks/useStore';
import Theme from 'components/global/Theme/theme';

function MyApp({ Component, pageProps }: AppProps) {
  resetStore();

  return (
    <UserProvider>
      <Theme>
        <Component {...pageProps} />
      </Theme>
    </UserProvider>
  );
}

export default MyApp;
