import styled from 'styled-components'

const StyledBurger = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 3rem;
  height: 3rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  margin-left: auto;

  &:focus > div {
    background: ${(props) => props.theme.colours.purple};
  }

  div {
    width: 100%;
    height: 4px;
    background: ${(props) => props.theme.colours.blue};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;
  }

  ${(props) => props.theme.screenSizes.tabletLandscapePlus} {
    display: none;
  }
`

interface BurgerProps {
  open: boolean
  setOpen: (val: boolean) => void
}

export const Burger = ({ open, setOpen }: BurgerProps): JSX.Element => {
  return (
    <StyledBurger onClick={() => setOpen(!open)} aria-label="Menu">
      <div />
      <div />
      <div />
    </StyledBurger>
  )
}
