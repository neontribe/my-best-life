import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'

import { Card } from './Card'
import { EmptyList } from './EmptyList'
import { ServicePreview } from '../../pages/index'
import { FilterContext } from '../context/FilterContext'
import { SaveContext } from '../context/SaveContext'
import { useRemember } from '../hooks/remember'
import { useScrollRemember } from '../hooks/scrollRemember'
import { ButtonBase } from './ButtonBase'

const ITEMS_PER_PAGE = 20

interface CardListProps {
  services: Array<ServicePreview>
  listType: 'filtered' | 'saved'
}

const NavContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
  align-items: center;
`

const NavigationButton = styled(ButtonBase)`
  display: inline-block;

  &:disabled {
    opacity: 0;
  }
`

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

  return (
    <>
      {filteredServices && filteredServices.length > 0 ? (
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
                  id === toRender.length - 1 ? (ref) => setLoadedRef(ref) : null
                }
              />
            ))}
          <NavContainer>
            {
              <NavigationButton
                disabled={isFirstPage}
                as="button"
                onClick={() => !isFirstPage && pageChange(-1)}
              >
                Back
              </NavigationButton>
            }
            {<div>{page !== null && `${page + 1} / ${totalPages}`}</div>}
            {
              <NavigationButton
                disabled={isLastPage}
                as="button"
                onClick={() => !isLastPage && pageChange(1)}
              >
                Next
              </NavigationButton>
            }
          </NavContainer>
        </ul>
      ) : (
        <EmptyList listType={listType} />
      )}
    </>
  )
}
