import React, { FC } from 'react'
import Head from 'next/head'

import { APP_URL } from '@/lib/constants'

// import CartContext from '../Cart/CartContext'
// import Cart from '../Cart/Cart'
// import Footer from './Footer'
// import MenuBar from './MenuBar'

interface Props {
  children: any
}

const Layout: FC<Props> = ({ children }) => (
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
    <div className="w-full h-full bg-black">{children}</div>
    {/* <div className="antialiased text-gray-900">
        <div className="h-screen flex overflow-hidden">
          <div className="flex-1 flex-col relative z-0 overflow-y-auto">
            <MenuBar />
            <br />
            <br />
            <br />
            <br />
            {children}
            <Cart />
            <Footer />
          </div>
        </div>
      </div> */}
  </>
)

export default Layout
