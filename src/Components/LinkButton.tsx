import React from 'react'
import styled from 'styled-components'

import { Arrow } from './Arrow'

interface LinkButtonProps {
  onClick: (e: React.MouseEvent) => void
  textContent: string
  arrow?: 'left' | 'right'
}

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  color: ${(props) => props.theme.colours.blue};
  font-family: 'Catamaran', sans-serif;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  align-items: center;

  &:focus {
    outline: 2px dashed ${(props) => props.theme.colours.blue};
    outline-offset: 2px;
  }

  &:hover {
    border-bottom: 2px solid ${(props) => props.theme.colours.blue};
  }

  svg {
    height: 18px;
    width: 18px;
    margin: 0 0.5rem;
  }
`

export const LinkButton = ({
  textContent,
  onClick,
  arrow,
}: LinkButtonProps): JSX.Element => {
  return (
    <StyledButton onClick={onClick}>
      {arrow === 'left' && <Arrow direction={arrow} />}
      <span>{textContent}</span>
      {arrow === 'right' && <Arrow direction={arrow} />}
    </StyledButton>
  )
}

export default LinkButton
