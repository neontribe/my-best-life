import styled from 'styled-components'
import React, { useContext } from 'react'

import { SaveContext } from '../context/SaveContext'
import { NotificationsContext } from '../context/NotificationsContext'

interface SaveButtonProps {
  id: string
  label: string
  saved: boolean
}

const RadioButtonItem = styled.button<{ saved: boolean }>`
  background-color: ${(props) =>
    props.saved ? props.theme.colours.purple : props.theme.colours.white};
  border-radius: 50%;
  border: 3px solid transparent;
  color: ${(props) => props.theme.colours.white};
  height: 50px;
  padding: 0.25rem;
  width: 50px;

  &:focus {
    border: 3px solid
      ${(props) =>
        props.saved ? props.theme.colours.yellow : props.theme.colours.purple};
    outline: none;
  }

  &:hover {
    border: 3px solid
      ${(props) =>
        props.saved ? props.theme.colours.yellow : props.theme.colours.purple};
  }

  svg {
    fill: ${(props) => (props.saved ? props.theme.colours.yellow : 'none')};
    stroke: ${(props) => (props.saved ? props.theme.colours.yellow : 'grey')};
  }
`

export const SaveButton = ({
  id,
  label,
  saved,
}: SaveButtonProps): JSX.Element => {
  const { savedUpdate } = useContext(SaveContext)
  const { notify } = useContext(NotificationsContext)

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    const isSaved = savedUpdate(id)
    notify({
      msg: isSaved ? 'Added to saved list' : 'Removed from saved list',
      time: 2000,
    })
  }

  return (
    <RadioButtonItem
      aria-label={`Add ${label} to saved list`}
      aria-pressed={saved}
      saved={saved}
      onClick={handleClick}
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
          strokeWidth="1"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    </RadioButtonItem>
  )
}
