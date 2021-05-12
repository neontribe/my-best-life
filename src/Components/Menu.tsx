import styled from 'styled-components'

export const StyledMenu = styled.nav<{ open: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${(props) => props.theme.colours.aqua};
  height: 400px
  text-align: left;
  padding: 1rem 2rem 5rem 2rem;
  position: absolute;
  top: 5rem;
  left:0;
  z-index: 3;
  width: 100%;

  ${(props) =>
    !props.open &&
    `
  display: none;
  `}

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
      <a href="/">Privacy Policy</a>
    </StyledMenu>
  )
}
