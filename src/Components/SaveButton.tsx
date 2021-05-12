import styled from 'styled-components'
import React, { useContext } from 'react'

import { SaveContext } from '../context/SaveContext'
import { NotificationsContext } from '../context/NotificationsContext'

import Bookmark from './Bookmark'

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
    stroke: ${(props) =>
      props.saved ? props.theme.colours.yellow : props.theme.colours.grey};
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
      <Bookmark strokeWidth={1} />
    </RadioButtonItem>
  )
}
