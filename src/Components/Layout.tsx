import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { CookieBanner } from './CookieBanner'
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
  // Check cookies haven't already been selected and if so don't show banner
  const [showCookieBanner, setCookieBanner] = useState<boolean>()

  useEffect(() => {
    // Try and find cookie preference in local storage
    const stored = window.localStorage.getItem('hotjarCookiesAccepted')

    // If it is stored then setCookieBanner should be false, if it is not stored then we set true to show it
    stored ? setCookieBanner(false) : setCookieBanner(true)
  }, [showCookieBanner])

  return (
    <PageLayout hideNav={hideNav || false}>
      {!hideNav && <HeaderComponent />}
      {children}
      {!hideNav && <StickyNavBar />}
      {showCookieBanner ? <CookieBanner /> : <></>}
    </PageLayout>
  )
}
