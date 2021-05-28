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
  padding: 4px;
  margin-left: auto;
  margin-top: 1rem;

  &:focus {
    outline: 2px dashed ${(props) => props.theme.colours.blue};
    outline-offset: 2px;
  }

  svg {
    height: 40px;
    width: 40px;
    stroke: ${(props) => props.theme.colours.purple};
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
    <StyledBurger
      type="button"
      onClick={() => setOpen(!open)}
      aria-label="Menu"
      aria-expanded={open}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </StyledBurger>
  )
}
