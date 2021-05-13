import styled from 'styled-components'

interface RadioButtonProps {
  label: string
  name: string
  checked: boolean
  onChange: any
}

const RadioButtonItem = styled.li<{ checked: boolean }>`
  list-style: none;
  margin-bottom: 1rem;
  height: 44px;

  label {
    display: flex;
    align-items: center;
    width: 100%;
    display: flex;
    justify-content: space-between;
    width: 100%;
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

export const RadioButton = ({
  label,
  name,
  checked,
  onChange,
}: RadioButtonProps): JSX.Element => {
  return (
    <RadioButtonItem checked={checked}>
      <label>
        {label}
        <input
          type="radio"
          checked={checked}
          name={name}
          onChange={() => onChange(label)}
        ></input>
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
    </RadioButtonItem>
  )
}
