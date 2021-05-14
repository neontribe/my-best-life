import styled from 'styled-components'

import { Interest } from '../../cms/services'
import { Feeling } from '../../pages/quiz/how-are-you-feeling'
import { OnMind } from '../../pages/quiz/whats-on-your-mind'

// Contains all the CheckboxItems
const CheckboxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -0.5rem;
`

// This is the visual representation of the checked status
const CheckedDisplay = styled.div`
  border-radius: 1rem;
  height: 100%;
  position: absolute;
  width: 100%;
`

// This is the text of the checkbox item
const Text = styled.div`
  align-items: center;
  display: flex;
  font-size: ${(props) => props.theme.fontSizes.extraSmall};
  font-weight: bold;
  justify-content: center;
  letter-spacing: 0.05em;
  margin: 0 0.5rem 0.5rem 0.5rem;
  z-index: 1;
`

// Contains label, input, image
const CheckboxItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 0 0 33%;
  padding: 0 0.5rem;
  margin: 0.5rem 0;

  label {
    border-radius: 1rem;
    box-shadow: 0 0 9px 2px ${(props) => props.theme.colours.shadow};
    cursor: pointer;
    display: flex;
    flex-direction: column;
    position: relative;
    text-align: center;
  }

  input {
    appearance: none;
    background: none;
    height: 1px;
    opacity: 0.00001;
    position: absolute;
    width: 100%;
    cursor: pointer;

    &:focus ~ ${CheckedDisplay} {
      outline: 3px dashed ${(props) => props.theme.colours.blue};
      outline-offset: 5px;
    }

    &:checked ~ ${CheckedDisplay} {
      background-color: ${(props) => props.theme.colours.aqua_light};
    }

    &:checked ~ ${Text} {
      color: ${(props) => props.theme.colours.purple};
    }

    &:checked ~ img {
      border-radius: 50%;
    }
  }

  img {
    border-radius: 1rem;
    border: 5px solid transparent;
    height: auto;
    margin: auto;
    margin-top: 5px;
    width: calc(100% - 10px);
    z-index: 1;
  }
`

interface ImageCheckboxesProps {
  id: string
  values: readonly { title: Feeling | Interest | OnMind; image: string }[]
  contextGet(key: Feeling | Interest | OnMind): boolean
  contextToggle(key: Feeling | Interest | OnMind): void
}

const ImageCheckboxes = ({
  id,
  values,
  contextGet,
  contextToggle,
}: ImageCheckboxesProps): JSX.Element => {
  return (
    <>
      <CheckboxContainer>
        {values.map((checkbox) => {
          return (
            <CheckboxItem key={checkbox.title}>
              <label>
                <input
                  type="checkbox"
                  name={id}
                  value={checkbox.title}
                  checked={contextGet(checkbox.title)}
                  onChange={() => contextToggle(checkbox.title)}
                />
                <img src={checkbox.image} alt="" />
                <Text>{checkbox.title}</Text>
                <CheckedDisplay />
              </label>
            </CheckboxItem>
          )
        })}
      </CheckboxContainer>
    </>
  )
}

export default ImageCheckboxes
