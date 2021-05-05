import styled from 'styled-components'

interface CheckboxProps {
  label: string | React.ReactNode
  checked: boolean
  onChange(): void
  // comments here
  single?: boolean
}

const CheckboxItem = styled.li`
  list-style: none;
  margin-bottom: 1rem;
  min-height: 44px;

  label {
    align-items: center;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  input {
    align-self: flex-start;
    flex-shrink: 0;
    height: 44px;
    width: 44px;
  }
`

export const Checkbox = ({
  label,
  checked,
  onChange,
  single,
}: CheckboxProps): JSX.Element => {
  return (
    <CheckboxItem as={single ? 'div' : 'li'}>
      <label>
        {label}
        <input type="checkbox" checked={checked} onChange={onChange}></input>
      </label>
    </CheckboxItem>
  )
}
