import { useContext } from 'react'
import styled from 'styled-components'
import Link from 'next/link'

import { ButtonBase } from './ButtonBase'
import { FilterContext } from '../context/FilterContext'
import { VisuallyHidden } from './VisuallyHidden'

const ButtonContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  margin: 1rem 0;
  position: sticky;
  top: calc(${(props) => props.theme.headerHeight} - 1.5rem);
  width: 100%;
  z-index: 5;
`

const ButtonLink = styled(ButtonBase)`
  font-size: ${(props) => props.theme.fontSizes.highlight};
  height: 3rem;
  justify-content: center;
  padding: 0.5rem;
  position: relative;
  width: 7rem;

  svg {
    height: 1.2em;
    margin-right: 4px;
    vertical-align: sub;
  }
`

const ActiveFilters = styled.div`
  align-items: center;
  background-color: ${(props) => props.theme.colours.white};
  border-radius: 5rem;
  border: 2px solid ${(props) => props.theme.colours.purple};
  color: ${(props) => props.theme.colours.purple};
  display: flex;
  font-weight: bold;
  justify-content: center;
  min-height: 1.8rem;
  min-width: 1.8rem;
  position: relative;
  right: -7.8rem;
  top: -1.3rem;
  z-index: 6;
`

export const FilterButton = (): JSX.Element => {
  const { age, formats, areas } = useContext(FilterContext)

  const ageValue = age?.length ? 1 : 0
  const activeFilterItems = formats.length + areas.length + ageValue

  return (
    <ButtonContainer>
      {activeFilterItems > 0 ? (
        <ActiveFilters>
          {activeFilterItems}
          <VisuallyHidden>filters applied.</VisuallyHidden>
        </ActiveFilters>
      ) : null}
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
