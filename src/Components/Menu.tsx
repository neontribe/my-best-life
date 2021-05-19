import styled from 'styled-components'
import Link from 'next/link'

export const StyledMenu = styled.nav<{ open: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${(props) => props.theme.colours.aqua};
  height: 400px
  text-align: left;
  padding: 1rem 2rem;
  position: fixed;
  top: 5rem;
  z-index: 10;
  width: 100%;
  max-width: 600px;

  ${(props) => !props.open && `display: none;`}

  a {
    font-size: ${(props) => props.theme.fontSizes.normal};
    padding: 1rem;
    color: ${(props) => props.theme.colours.blue};
    transition: color 0.3s linear;
    font-family: 'Catamaran', sans-serif;
    text-decoration: none;

    &:hover {
      color: ${(props) => props.theme.colours.purple};
    }

    &:focus {
      background: ${(props) => props.theme.colours.blue_light};
    }
  }
`

interface MenuProps {
  open: boolean
}

export const Menu = ({ open }: MenuProps): JSX.Element => {
  return (
    <StyledMenu open={open} aria-expanded={open}>
      <a href="/">About</a>
      <a href="/helplines">Urgent Help</a>
      <a href="/privacy-policy">Privacy Policy</a>
      <a href="/cookies">Cookies</a>
    </StyledMenu>
  )
}
