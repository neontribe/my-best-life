import { MyBestLifeTheme } from '../../src/Theme'

interface ArrowProps {
  direction: 'left' | 'right'
  colour?: string
}

export const Arrow = ({ direction, colour }: ArrowProps): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke={colour || MyBestLifeTheme.colours.blue}
    >
      {direction === 'left' ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 19l-7-7 7-7"
        ></path>
      ) : (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 5l7 7-7 7"
        ></path>
      )}
    </svg>
  )
}
