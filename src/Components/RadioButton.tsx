import styled from 'styled-components'

interface RadioButtonProps {
  label: string
  name: string
  checked: boolean
  onChange: any
}

const RadioButtonItem = styled.li`
  list-style: none;
  margin-bottom: 1rem;
  height: 44px;

  label {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    width: 100%;
    display: flex;
    justify-content: space-between;
    width: 44px;
    height: 50px;
  }
`

export const RadioButton = ({
  label,
  name,
  checked,
  onChange,
}: RadioButtonProps): JSX.Element => {
  return (
    <RadioButtonItem>
      <label>
        {label}
        <input
          type="radio"
          checked={checked}
          name={name}
          onChange={() => onChange(label)}
        ></input>
      </label>
    </RadioButtonItem>
  )
}
