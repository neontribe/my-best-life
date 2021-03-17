import { useState } from 'react'
import styled from 'styled-components'
import { MyBestLifeTheme } from '../../src/Theme'

interface FiveStarProps {
  currentRating?: number
  onChange(value: number): void
}

interface StarInterface {
  highlight?: boolean
  onHover(): void
  onSelect(): void
  value: number
}

const StarContainer = styled.div`
  padding: 0 0.3rem;
  position: relative;

  input {
    width: 3rem;
    height: 3rem;
    position: absolute;
    appearance: none;
    cursor: pointer;
    margin: 0;
  }

  input:focus {
    outline: 2px dashed ${(props) => props.theme.colours.blue};
  }

  svg {
    z-index: 0;
    width: 3rem;
  }
`

const Star = ({ highlight, onHover, onSelect, value }: StarInterface) => {
  const fill = highlight
    ? MyBestLifeTheme.colours.yellow
    : MyBestLifeTheme.colours.blue_light

  return (
    <StarContainer onMouseEnter={() => onHover()}>
      <input
        aria-label={`Rate ${value} out of 5`}
        type="radio"
        name="starRating"
        onChange={() => onSelect()}
      />
      <svg version="1.1" viewBox="0 0 226.75 215.81">
        <g transform="translate(237.35 107.06)">
          <path
            d="m-10.601-24.957-69.036 51.368 26.048 82.013-70.187-49.783-69.95 50.117 25.658-82.136-69.279-51.039 86.045-0.97944 27.133-81.661 27.521 81.531z"
            fill={fill}
          />
        </g>
      </svg>
    </StarContainer>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 2rem 0;
  justify-content: center;
`

const InnerContainer = styled.div`
  display: flex;
`

export const FiveStar = ({
  currentRating,
  onChange,
}: FiveStarProps): JSX.Element => {
  const starCount = 5
  const [currentHover, setCurrentHover] = useState<number>(0)

  const onStarHover = (value: number) => setCurrentHover(value)
  const onRemoveHover = () => setCurrentHover(0)

  const getStars = (): Array<JSX.Element> => {
    const out = []
    const doHighlight = (i: number) =>
      (currentHover === 0 && (currentRating || 0) >= i) || currentHover >= i

    for (let i = 1; i <= starCount; ++i) {
      out.push(
        <Star
          value={i}
          highlight={doHighlight(i)}
          key={i}
          onHover={() => onStarHover(i)}
          onSelect={() => onChange(i)}
        />
      )
    }
    return out
  }

  return (
    <Container>
      <InnerContainer onMouseLeave={onRemoveHover}>{getStars()}</InnerContainer>
    </Container>
  )
}
