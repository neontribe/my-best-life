import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { CookieBanner } from '../Components/CookieBanner'

interface LayoutProps {
  children: React.ReactNode
}

const StyledDiv = styled.div`
  margin: auto;
  max-width: 600px;
`

export const Layout = ({ children }: LayoutProps): JSX.Element => {
  // Check cookies haven't already been selected and if so don't show banner
  const [showCookieBanner, setCookieBanner] = useState<boolean>()

  useEffect(() => {
    // Try and find cookie preference in local storage
    const stored = window.localStorage.getItem('hotjarCookiesAccepted')

    // If it is stored then setCookieBanner should be false, if it is not stored then we set true to show it
    stored ? setCookieBanner(false) : setCookieBanner(true)
  }, [showCookieBanner])
  return (
    <StyledDiv>
      {children}
      {showCookieBanner ? <CookieBanner /> : <></>}
    </StyledDiv>
  )
}
