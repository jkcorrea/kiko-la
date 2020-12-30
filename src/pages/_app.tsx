import React, { FC } from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { AppProps } from 'next/app'
// pick a theme of your choice
import original from 'react95/dist/themes/original'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

import Layout from '@/components/Layout'
import { CartProvider } from '@/hooks/useCart'
import client from '@/lib/client'

import 'tailwindcss/tailwind.css'

const GlobalStyle = createGlobalStyle`
  body {
    overscroll-behavior: none;
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
