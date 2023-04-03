import React, { useEffect } from 'react'
import styled from 'styled-components'

import { HeaderComponent } from './Header'
import { StickyNavBar } from './StickyNavBar'

interface LayoutProps {
  children: React.ReactNode
  hideNav?: boolean
}

const PageLayout = styled.div<{ hideNav: boolean }>`
  margin: auto;
  padding-bottom: ${(props) => props.theme.mobileNavHeight};

  ${(props) => props.theme.screenSizes.tabletLandscapePlus} {
    padding-bottom: 0;
  }

  ${(props) => props.hideNav && `padding-bottom: 0;`}
`

export const Content = styled.div`
  margin: auto;
  max-width: 1200px;
  padding: 0 var(--gutter-width);
`

export const Layout = ({ children, hideNav }: LayoutProps): JSX.Element => {
  useEffect(() => {
    // This site previously used Hotjar cookies, which we want to remove for any users now visiting the site
    document.cookie.split(';').forEach((entry) => {
      document.cookie = entry
        // strip out spaces
        .replace(/^ +/, '')
        // replace expiry date with now
        .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/')
    })

    // HotJar also sets data into local and session storage
    localStorage.removeItem('_hjUserAttributes')
    sessionStorage.removeItem('hjViewportId')
    sessionStorage.removeItem('_hjRecordingLastActivity')
    sessionStorage.removeItem('_hjRecordingEnabled')

    // Remove our local storage flag, if present
    localStorage.removeItem('hotjarCookiesAccepted')
  }, [])

  return (
    <PageLayout hideNav={hideNav || false}>
      {!hideNav && <HeaderComponent />}
      {children}
      {!hideNav && <StickyNavBar />}
    </PageLayout>
  )
}
