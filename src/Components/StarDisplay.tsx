import styled from 'styled-components'
import { MyBestLifeTheme } from '../../src/Theme'

interface StarDisplayProps {
  value: number
  outOf: number
}

const StarContainer = styled.div`
  display: inline-block;
`

const Star = styled.div`
  display: inline-block;
  padding: 0 0.1rem;

  svg {
    width: 1.2rem;
  }
`

export const StarDisplay = ({
  value,
  outOf,
}: StarDisplayProps): JSX.Element => {
  const out = []
  for (let i = 1; i <= outOf; ++i) {
    const fill =
      i <= value
        ? MyBestLifeTheme.colours.yellow
        : MyBestLifeTheme.colours.blue_light

    out.push(
      <Star key={i}>
        <svg version="1.1" viewBox="0 0 226.75 215.81">
          <g transform="translate(237.35 107.06)">
            <path
              d="m-10.601-24.957-69.036 51.368 26.048 82.013-70.187-49.783-69.95 50.117 25.658-82.136-69.279-51.039 86.045-0.97944 27.133-81.661 27.521 81.531z"
              fill={fill}
            />
          </g>
        </svg>
      </Star>
    )
  }

  return <StarContainer>{out}</StarContainer>
}
