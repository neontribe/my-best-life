import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'

import { Card } from './Card'
import { EmptyList } from './EmptyList'
import { ServicePreview } from '../../pages/index'
import { FilterContext } from '../context/FilterContext'
import { SaveContext } from '../context/SaveContext'
import { QuizContext } from '../context/QuizContext'
import { Interest, Gender } from '../../cms/services'
import { useRemember } from '../hooks/remember'
import { useScrollRemember } from '../hooks/scrollRemember'
import { ButtonBase } from './ButtonBase'

const ITEMS_PER_PAGE = 20

export type ListType = 'filtered' | 'saved' | 'quiz'
interface CardListProps {
  services: Array<ServicePreview>
  listType: ListType
  onLoad?(): void
}

const NavContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin: 1rem 0;
  align-items: center;
`

const NavigationButton = styled(ButtonBase)`
  display: inline-block;

  &:disabled {
    opacity: 0;
    cursor: normal;
  }
`

interface NavigationProps {
  onForward(): void
  onBack(): void
  isFirstPage: boolean
  isLastPage: boolean
  page: number | null
  totalPages: number
}

const Navigation = ({
  onForward,
  onBack,
  isFirstPage,
  isLastPage,
  page,
  totalPages,
}: NavigationProps) => {
  if (totalPages < 2) {
    return null
  }

  return (
    <NavContainer>
      {
        <NavigationButton
          disabled={isFirstPage}
          as="button"
          onClick={() => !isFirstPage && onBack()}
          aria-label="Previous page"
        >
          Back
        </NavigationButton>
      }
      {<div>{page !== null && `${page + 1} / ${totalPages}`}</div>}
      {
        <NavigationButton
          disabled={isLastPage}
          as="button"
          onClick={() => !isLastPage && onForward()}
          aria-label="Next page"
        >
          Next
        </NavigationButton>
      }
    </NavContainer>
  )
}

export const CardList = ({
  services,
  listType,
}: CardListProps): JSX.Element => {
  const { age, formats } = useContext(FilterContext)
  const { saved } = useContext(SaveContext)
  const { fullDataGet } = useContext(QuizContext)

  const quizAnswers = fullDataGet()
  // Define weight values to modify results later
  const categoryWeight = 1
  const interestWeight = 1
  const feelingWeight = 1
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

  function ageFilter(item: ServicePreview, ageInput: string | undefined) {
    let ageNumber: number

    switch (ageInput) {
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

  function genderFilter(
    item: ServicePreview,
    genderInput: Array<string> | undefined
  ) {
    // If no preference is set for user or service, return everything
    if (genderInput?.length === 0 || item?.gender?.length === 0) {
      return true
    }

    genderInput?.filter((gen) => {
      const gender = gen as Gender
      if (!item?.gender?.includes(gender)) {
        return false
      } else {
        return true
      }
    })
  }

  function assignQuizScore(item: ServicePreview) {
    item.score = 0

    // Make sure we won't have any casing inconsistency for matching categories
    const quizCategories = quizAnswers?.whatsOnMind.map((item) => {
      return item.toLowerCase()
    })

    // Category matching
    if (
      item.categories?.category1 &&
      quizCategories?.includes(item.categories?.category1.toLowerCase())
    ) {
      item.score += categoryWeight
    }

    if (
      item.categories?.category2 &&
      quizCategories?.includes(item.categories?.category2.toLowerCase())
    ) {
      item.score += categoryWeight
    }

    const interestMatches = quizAnswers?.interests?.filter((value) => {
      const interest = value as Interest
      if (item?.interests.includes(interest)) return true
    })

    item.score += (interestMatches?.length || 0) * interestWeight

    // Feeling matching
    const feelingMatches = quizAnswers?.howAreFeeling?.filter((value) => {
      if (item?.feelings.includes(value)) return true
    })

    item.score += (feelingMatches?.length || 0) * feelingWeight

    // filter this list by only services that receive a score and are eligible
    if (item.score > 0) {
      return true
    }
  }

  let filteredServices: Array<ServicePreview>

  if (listType === 'saved') {
    filteredServices = services.filter((item) => saved.includes(item.id))
  }

  if (listType === 'quiz') {
    filteredServices = services
      .filter(assignQuizScore)
      .filter((item) => ageFilter(item, quizAnswers?.age))
      .filter((item) => genderFilter(item, quizAnswers?.gender))
      .sort((a, b) => {
        return b.score - a.score
      })
  } else {
    filteredServices = services
      .filter((item) => ageFilter(item, age))
      .filter(formatFilter)
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
