import styled from 'styled-components'

export const StyledMenu = styled.nav<{ open: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${(props) => props.theme.colours.white};
  box-shadow: 0 0 9px 2px ${(props) => props.theme.colours.shadow};
  height: 400px
  text-align: left;
  padding: 0.5rem;
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 3;
  width: 150px;

  ${(props) =>
    !props.open &&
    `
  display: none;
  `}

  a {
    font-size: ${(props) => props.theme.fontSizes.small};
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
    <StyledMenu open={open}>
      <a href="/">About</a>
      <a href="/">Privacy</a>
      <a href="/helplines">Urgent help</a>
    </StyledMenu>
  )
}
