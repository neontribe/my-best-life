import React from 'react'
import styled from 'styled-components'

interface LinkButtonProps {
  onClick: (e: React.MouseEvent) => void
  textContent: string
  arrow?: 'back' | 'forward'
}

const StyledButton = styled.button<{
  arrow?: 'back' | 'forward'
}>`
  background-color: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  color: ${(props) => props.theme.colours.blue};
  font-family: 'Catamaran', sans-serif;
  text-decoration: none;

  ${(props) =>
    props.arrow === 'back' &&
    `
  &:before {
    content: '<';
    display: inline-block;
    margin-right: 0.5rem;
  }
  `}

  ${(props) =>
    props.arrow === 'forward' &&
    `
  &:after {
    content: '>';
    display: inline-block;
    margin-left: 0.5rem;
  }
  `}

  &:focus {
    outline: 2px dashed ${(props) => props.theme.colours.blue};
    outline-offset: 2px;
  }

  &:hover {
    border-bottom: 2px solid ${(props) => props.theme.colours.blue};
  }
`

export const LinkButton = ({
  textContent,
  onClick,
  arrow,
}: LinkButtonProps): JSX.Element => {
  return (
    <StyledButton onClick={onClick} arrow={arrow}>
      <span>{textContent}</span>
    </StyledButton>
  )
}

export default LinkButton
