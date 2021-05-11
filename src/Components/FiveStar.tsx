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
    : MyBestLifeTheme.colours.white

  const strokeColor = highlight
    ? MyBestLifeTheme.colours.purple
    : MyBestLifeTheme.colours.grey

  return (
    <StarContainer onMouseEnter={() => onHover()}>
      <input
        aria-label={`Rate ${value} out of 5`}
        type="radio"
        name="starRating"
        onChange={() => onSelect()}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={fill}
        viewBox="0 0 24 24"
        stroke={strokeColor}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    </StarContainer>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
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
