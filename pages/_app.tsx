import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0';
import { Toaster } from 'react-hot-toast';

//hooks
import { resetStore } from 'hooks/useStore';
import Theme from 'components/global/Theme/theme';
import Head from 'next/head';
import { useEffect } from 'react';

declare global {
  interface Window {
    OneSignal: any;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  resetStore();

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>Next.js PWA Example</title>

        <link rel="manifest" href="/manifest.json" />
        <link
          href="/icons/icon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/icon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
      </Head>
      <UserProvider>
        <Theme>
          <Component {...pageProps} />
        </Theme>
      </UserProvider>
    </>
  );
}

export default MyApp;
