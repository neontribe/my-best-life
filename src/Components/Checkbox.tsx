import styled from 'styled-components'

interface CheckboxProps {
  label: string | React.ReactElement
  checked: boolean
  onChange(): void
  singleCheckbox?: boolean
}

const CheckboxBackground = styled.div`
  align-self: flex-start;
  background: ${(props) => props.theme.colours.white};
  border: 2px solid ${(props) => props.theme.colours.purple};
  cursor: pointer;
  flex-shrink: 0;
  height: 44px;
  margin-left: 0.5rem;
  width: 44px;
`

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
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap; /* added line */
    border: 0;

    &:focus ~ ${CheckboxBackground} {
      outline: 2px dashed ${(props) => props.theme.colours.blue};
      outline-offset: 4px;
    }

    &:checked ~ ${CheckboxBackground} {
      background: ${(props) => props.theme.colours.purple};
      transition: 0.3s;
    }
  }

  svg {
    color: ${(props) => props.theme.colours.white};
  }
`

export const Checkbox = ({
  label,
  onChange,
  singleCheckbox,
}: CheckboxProps): JSX.Element => {
  return (
    <CheckboxItem as={singleCheckbox ? 'div' : 'li'}>
      <label>
        {label}
        <input type="checkbox" onChange={onChange}></input>
        <CheckboxBackground>
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
              d="M5 13l4 4L19 7"
            />
          </svg>
        </CheckboxBackground>
      </label>
    </CheckboxItem>
  )
}
