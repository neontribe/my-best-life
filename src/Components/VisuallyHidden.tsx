import React from 'react'
import styled from 'styled-components'

interface VisuallyHiddenProps {
  children: React.ReactNode
}

const StyledContainer = styled.span`
  border: 0;
  clip: rect(1px, 1px, 1px, 1px);
  height: 1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`

export const VisuallyHidden = ({
  children,
}: VisuallyHiddenProps): JSX.Element => {
  return <StyledContainer>{children}</StyledContainer>
}
