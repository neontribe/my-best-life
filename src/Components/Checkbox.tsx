import React from 'react'
import styled from 'styled-components'

interface CheckboxProps {
  label: string
  checked: boolean
  onChange: any
}

const CheckboxItem = styled.li`
  list-style: none;
  margin-bottom: 0.5rem;

  label {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`

export const Checkbox = ({
  label,
  checked,
  onChange,
}: CheckboxProps): JSX.Element => {
  return (
    <CheckboxItem>
      <label>
        {label}
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onChange(label)}
        ></input>
      </label>
    </CheckboxItem>
  )
}
