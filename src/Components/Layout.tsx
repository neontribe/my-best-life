import React from 'react'
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
  return (
    <PageLayout hideNav={hideNav || false}>
      {!hideNav && <HeaderComponent />}
      {children}
      {!hideNav && <StickyNavBar />}
    </PageLayout>
  )
}
