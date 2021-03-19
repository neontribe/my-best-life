import React from 'react'
import styled from 'styled-components'

interface LayoutProps {
  children: React.ReactNode
}

const StyledDiv = styled.div`
  margin: auto;
  max-width: 600px;
`

export const Layout = ({ children }: LayoutProps): JSX.Element => {
  return <StyledDiv>{children}</StyledDiv>
}
