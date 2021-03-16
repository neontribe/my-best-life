import styled from 'styled-components'

// Base component to provide styles for a simple button. No size is set, so
// this must component must be extended, e.g.:
//
//     const MyButton = styled(ButtonBase)`
//       height: 3rem;
//     `
export const ButtonBase = styled.a`
  align-items: center;
  background-color: ${(props) => props.theme.colours.purple};
  border-radius: 5rem;
  border: 3px solid transparent;
  color: ${(props) => props.theme.colours.white};
  display: flex;
  font-family: 'Catamaran', sans-serif;
  font-weight: bold;
  text-decoration: none;

  &:focus {
    outline: 2px dashed ${(props) => props.theme.colours.blue};
    outline-offset: 2px;
  }

  &:hover {
    background-color: ${(props) => props.theme.colours.purple_light};
    color: ${(props) => props.theme.colours.purple};
    transition: 0.3s background-color, 0.3s color;
  }
`
