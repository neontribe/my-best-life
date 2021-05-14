import styled from 'styled-components'

interface CheckboxProps {
  label: string | React.ReactElement
  checked: boolean
  onChange(): void
  singleCheckbox?: boolean
}

const CheckboxItem = styled.li<{ checked: boolean }>`
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

    &:focus ~ span {
      outline: 2px dashed ${(props) => props.theme.colours.blue};
      outline-offset: 4px;
    }
  }

  span {
    align-self: flex-start;
    flex-shrink: 0;
    height: 44px;
    width: 44px;
    border: 2px solid ${(props) => props.theme.colours.purple};

    ${(props) =>
      props.checked
        ? `background: ${props.theme.colours.purple}`
        : `background: ${props.theme.colours.white}`}
  }

  svg {
    color: ${(props) => props.theme.colours.white};
  }
`

export const Checkbox = ({
  label,
  checked,
  onChange,
  singleCheckbox,
}: CheckboxProps): JSX.Element => {
  return (
    <CheckboxItem as={singleCheckbox ? 'div' : 'li'} checked={checked}>
      <label>
        {label}
        <input type="checkbox" checked={checked} onChange={onChange}></input>
        <span>
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
        </span>
      </label>
    </CheckboxItem>
  )
}
