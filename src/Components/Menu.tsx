import styled from 'styled-components'
import Link from 'next/link'

export const StyledMenu = styled.nav<{ open: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${(props) => props.theme.colours.aqua};
  padding: 1rem 2rem;
  position: fixed;
  top: 4rem;
  z-index: 10;
  width: 100%;

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
      <Link href="/">
        <a>About</a>
      </Link>
      <Link href="/helplines">
        <a>Urgent Help</a>
      </Link>
      <Link href="/privacy-policy" passHref>
        <a>Privacy Policy</a>
      </Link>
    </StyledMenu>
  )
}
