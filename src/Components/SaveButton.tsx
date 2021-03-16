import styled from 'styled-components'
import { useContext } from 'react'

import { FilterContext } from '../context/FilterContext'

interface SaveButtonProps {
  id: string
  saved: boolean
}

const RadioButtonItem = styled.button<{ saved: boolean }>`
  align-items: center;
  background-color: ${(props) =>
    props.saved ? props.theme.colours.purple : props.theme.colours.white};
  border-radius: 5rem;
  border: 3px solid transparent;
  color: ${(props) => props.theme.colours.white};
  display: flex;
  padding: 4px;
  text-decoration: none;

  position: absolute;
  width: 50px;
  height: 50px;
  top: 1rem;
  right: 1rem;

  &:focus {
    border: 3px solid
      ${(props) =>
        props.saved ? props.theme.colours.yellow : props.theme.colours.purple};
    outline: none;
  }

  &:hover {
    background-color: ${(props) => props.theme.colours.purple_light};
    color: ${(props) => props.theme.colours.purple};
  }

  svg {
    fill: ${(props) => (props.saved ? props.theme.colours.yellow : 'none')};
    stroke: ${(props) => (props.saved ? props.theme.colours.yellow : 'grey')};
  }
`

export const SaveButton = ({ id, saved }: SaveButtonProps): JSX.Element => {
  const { savedUpdate } = useContext(FilterContext)

  return (
    <RadioButtonItem
      saved={saved}
      onClick={(e) => {
        e.stopPropagation()

        savedUpdate(id)
      }}
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
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    </RadioButtonItem>
  )
}
