import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'

import { Arrow } from './Arrow'
import { Card } from './Card'
import { EmptyList } from './EmptyList'
import { ServicePreview } from '../../pages/index'
import { FilterContext } from '../context/FilterContext'
import { SaveContext } from '../context/SaveContext'
import { useRemember } from '../hooks/remember'
import { useScrollRemember } from '../hooks/scrollRemember'
import { MyBestLifeTheme } from '../../src/Theme'

const ITEMS_PER_PAGE = 20

interface CardListProps {
  services: Array<ServicePreview>
  listType: 'filtered' | 'saved'
}

const NavContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
  align-items: center;
  padding: 0 2rem;
`

const NavigationButton = styled.a`
  align-items: center;
  background-color: ${(props) => props.theme.colours.white};
  border-radius: 5px;
  border: 2px solid ${(props) => props.theme.colours.blue};
  color: ${(props) => props.theme.colours.blue};
  display: flex;
  font-family: 'Catamaran', sans-serif;
  font-weight: bold;
  min-height: 44px;
  min-width: 44px;
  text-decoration: none;

  &::visited {
    color: ${(props) => props.theme.colours.blue};
  }

  &:disabled {
    border: 2px solid ${(props) => props.theme.colours.grey};
    color: ${(props) => props.theme.colours.grey};
  }
`

const NavigationTextButton = styled(NavigationButton)`
  padding: 0 1rem;
`

interface NavigationProps {
  onForward(): void
  onBack(): void
  isFirstPage: boolean
  isLastPage: boolean
  page: number | null
  totalPages: number
  top?: boolean
}

const Navigation = ({
  onForward,
  onBack,
  isFirstPage,
  isLastPage,
  page,
  totalPages,
  top,
}: NavigationProps) => {
  if (totalPages < 2) {
    return null
  }

  return (
    <NavContainer>
      <NavigationButton
        disabled={isFirstPage}
        as="button"
        onClick={() => !isFirstPage && onBack()}
        aria-label="Previous page"
      >
        <Arrow
          direction={'left'}
          colour={
            isFirstPage
              ? MyBestLifeTheme.colours.grey
              : MyBestLifeTheme.colours.blue
          }
        />
      </NavigationButton>

      <div>{page !== null && `${page + 1} / ${totalPages}`}</div>

      <NavigationButton
        disabled={isLastPage}
        as="button"
        onClick={() => !isLastPage && onForward()}
        aria-label="Next page"
      >
        <Arrow
          direction={'right'}
          colour={
            isLastPage
              ? MyBestLifeTheme.colours.grey
              : MyBestLifeTheme.colours.blue
          }
        />
      </NavigationButton>

      {top && (
        <Link href={`/filter`} passHref>
          <NavigationTextButton>Filter</NavigationTextButton>
        </Link>
      )}
    </NavContainer>
  )
}

export const CardList = ({
  services,
  listType,
}: CardListProps): JSX.Element => {
  const { age, formats } = useContext(FilterContext)
  const { saved } = useContext(SaveContext)
  const [page, setPage] = useState<number | null>(null)

  // We use a reference to the last element in the card list so that we can
  // tell when the card list has rendered, and thus know when it is ok
  // to set the scroll position.
  const [loadedRef, setLoadedRef] = useState<HTMLLIElement | null>(null)

  const { resumePosition, resetPosition } = useScrollRemember()
  const { recall: recallPage } = useRemember({
    name: 'page',
    value: () => (page ? page.toString() : '0'),
  })

  useEffect(() => {
    // Reset the page as remembered on initial render
    setPage(parseInt(recallPage() || '0'))
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (loadedRef === null) return
    resumePosition()
    // eslint-disable-next-line
  }, [loadedRef])

  const pageChange = (direction: 1 | -1) => {
    setPage((last) => {
      if (last === null) return 0
      const newPage = last + direction
      resetPosition()
      return newPage
    })
  }

  function ageFilter(item: ServicePreview) {
    let ageNumber: number

    switch (age) {
      case '<15':
        ageNumber = 14
        break
      case '15':
        ageNumber = 15
        break
      case '16':
        ageNumber = 16
        break
      case '17':
        ageNumber = 17
        break
      case '18':
        ageNumber = 18
        break
      case '18+':
        ageNumber = 19
        break
      default:
        ageNumber = -1
    }

    // No age has been set, return all entries
    if (ageNumber === -1) return true

    // There is an age band
    if (item.age?.minAge && item.age?.maxAge) {
      if (item.age.minAge <= ageNumber && ageNumber <= item.age.maxAge) {
        return true
      }
      return false
    }

    // There is only a minimum age
    if (item.age?.minAge && item.age.minAge <= ageNumber) {
      return true
    }

    // There is only a maximum age
    if (item.age?.maxAge && item.age.maxAge >= ageNumber) {
      return true
    }
  }

  function formatFilter(item: ServicePreview) {
    if (formats.length === 0) {
      return true
    }

    if (item?.format && formats.includes(item?.format)) return true
  }

  let filteredServices: Array<ServicePreview>

  if (listType === 'saved') {
    filteredServices = services.filter((item) => saved.includes(item.id))
  } else {
    // (listType === 'filtered') -- silences typescript
    filteredServices = services.filter(ageFilter).filter(formatFilter)
  }

  const totalPages = Math.ceil(filteredServices.length / ITEMS_PER_PAGE)
  const isFirstPage = page === 0
  const isLastPage = page === totalPages - 1
  const toRender =
    page !== null
      ? filteredServices.slice(
          page * ITEMS_PER_PAGE,
          (page + 1) * ITEMS_PER_PAGE
        )
      : []

  return page !== null ? (
    <>
      {filteredServices && filteredServices.length > 0 ? (
        <>
          <Navigation
            onForward={() => pageChange(1)}
            onBack={() => pageChange(-1)}
            page={page}
            totalPages={totalPages}
            isFirstPage={isFirstPage}
            isLastPage={isLastPage}
            top
          />
          <ul>
            {page !== null &&
              toRender.map((service: ServicePreview, id: number) => (
                <Card
                  key={service.id}
                  id={service.id}
                  title={service.title}
                  shortDescription={service.shortDescription}
                  image={service.image}
                  costValue={service.costValue}
                  costQualifier={service.costQualifier}
                  age={service.age}
                  categories={service.categories}
                  format={service.format}
                  ref={
                    id === toRender.length - 1
                      ? (ref) => setLoadedRef(ref)
                      : null
                  }
                />
              ))}
          </ul>
          <Navigation
            onForward={() => pageChange(1)}
            onBack={() => pageChange(-1)}
            page={page}
            totalPages={totalPages}
            isFirstPage={isFirstPage}
            isLastPage={isLastPage}
          />
        </>
      ) : (
        <EmptyList listType={listType} />
      )}
    </>
  ) : (
    <></>
  )
}
