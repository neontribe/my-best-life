import styled from 'styled-components'
import Link from 'next/link'
import { ButtonBase } from './ButtonBase'

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin: 1rem 0;
  align-items: center;
`

const ButtonLink = styled(ButtonBase)`
  font-size: ${(props) => props.theme.fontSizes.highlight};
  padding: 0.5rem;
  width: 7rem;
  height: 3rem;
  justify-content: center;
  max-width: calc(100% - 2rem);
  svg {
    height: 1.2em;
    margin-right: 4px;
    vertical-align: sub;
  }
`

export const FilterButton = (): JSX.Element => {
  return (
    <ButtonContainer>
      <Link href={`/filter`} passHref>
        <ButtonLink>
          <svg
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          Filter
        </ButtonLink>
      </Link>
    </ButtonContainer>
  )
}
