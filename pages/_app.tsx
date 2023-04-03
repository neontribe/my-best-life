import React from 'react'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'

import { FilterProvider } from '../src/context/FilterContext'
import { SaveProvider } from '../src/context/SaveContext'
import { MyBestLifeTheme, GlobalStyle } from '../src/Theme'
import { NotificationsProvider } from '../src/context/NotificationsContext'
import { QuizProvider } from '../src/context/QuizContext'

const metaData = {
  name: 'My Best Life',
  description:
    'We help you find support and things to do near you. Browse the organisations that provide support and activities in Lambeth.',
  image: 'http://www.mybestlife.app/img/meta-image.png',
  url: 'https://www.mybestlife.app',
}

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>My Best Life</title>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8BE2D8" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/img/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-status-bar" content="#8BE2D8" />

        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/img/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/img/favicon-16x16.png"
        />
        <meta name="description" content={metaData.description} />

        {/* Google / Search Engine Tags */}
        <meta itemProp="name" content={metaData.name}></meta>
        <meta itemProp="description" content={metaData.description} />
        <meta itemProp="image" content={metaData.image} />

        {/* Facebook Meta Tags */}
        <meta property="og:url" content={metaData.url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metaData.name} />
        <meta property="og:description" content={metaData.description} />
        <meta property="og:image" content={metaData.image} />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaData.name} />
        <meta name="twitter:description" content={metaData.description} />
        <meta name="twitter:image" content={metaData.image}></meta>
      </Head>
      <ThemeProvider theme={MyBestLifeTheme}>
        <NotificationsProvider>
          <QuizProvider>
            <FilterProvider>
              <SaveProvider>
                <GlobalStyle />
                <Component {...pageProps} />
              </SaveProvider>
            </FilterProvider>
          </QuizProvider>
        </NotificationsProvider>
      </ThemeProvider>
    </>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp
