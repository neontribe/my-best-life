import React from 'react'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'

import { FilterProvider } from '../src/context/FilterContext'
import { MyBestLifeTheme, GlobalStyle } from '../src/Theme'
import { NotificationsProvider } from '../src/context/NotificationsContext'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>My Best Life</title>
      </Head>
      <ThemeProvider theme={MyBestLifeTheme}>
        <NotificationsProvider>
          <FilterProvider>
            <GlobalStyle />
            <Component {...pageProps} />
          </FilterProvider>
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
