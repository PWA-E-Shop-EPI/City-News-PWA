import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0';
import { Toaster } from 'react-hot-toast';

import Layout from '../components/Layout';

import '@fortawesome/fontawesome-svg-core/styles.css';
import initFontAwesome from '../utils/initFontAwesome';
import '../styles/globals.css';
import Head from 'next/head';

initFontAwesome();

export default function App({ Component, pageProps }) {
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
        <meta name="theme-color" content="#317EFB" />
      </Head>
      <UserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </>
  );
}
