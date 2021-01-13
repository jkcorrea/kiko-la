import React, { FC } from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { AppProps } from 'next/app'
import Head from 'next/head'
// pick a theme of your choice
import original from 'react95/dist/themes/original'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

import Layout from '@/components/Layout'
import { CartProvider } from '@/hooks/useCart'
import client from '@/lib/client'
import { APP_URL } from '@/lib/constants'

import 'tailwindcss/tailwind.css'

const GlobalStyle = createGlobalStyle`
  body {
    overscroll-behavior: none;
    background: black;
  }

  @font-face {
    font-family: 'ms_sans_serif';
    src: url('/fonts/ms_sans_serif.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'ms_sans_serif';
    src: url('/fonts/ms_sans_serif_bold.woff2') format('woff2');
    font-weight: bold;
    font-style: normal;
  }
`
const App: FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <title key="title">Kiko L.A.</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
      />
      <meta charSet="utf-8" />
      <meta name="theme-color" content="#d655c0" />
      <meta
        key="description"
        property="description"
        content="Kiko L.A. - Let's get weird ;)"
      />

      {/* OpenGraph tags */}
      <meta key="og:url" property="og:url" content={APP_URL} />
      <meta key="og:title" property="og:title" content="Kiko L.A." />
      <meta
        key="og:description"
        property="og:description"
        content="Kiko L.A. - Let's get weird ;)"
      />
      <meta
        key="og:image"
        property="og:image"
        content={`${APP_URL}/images/kiko-la-meme.jpg`}
      />
      <meta key="og:type" property="og:type" content="website" />
      <meta key="twitter:card" property="twitter:card" content="summary" />

      {/* Favicons */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#292522" />
    </Head>

    <GlobalStyle />
    <ApolloProvider client={client}>
      <CartProvider>
        <ThemeProvider theme={original}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </CartProvider>
    </ApolloProvider>
  </>
)

export default App
