import React, { useContext, useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'

import { ButtonBase } from './ButtonBase'
import { Card } from './Card'
import { Content } from './Layout'
import { EmptyList } from './EmptyList'
import { FilterButton } from './FilterButton'
import { SummerActivitiesEncouragement } from './SummerActivitiesEncouragement'
import { VerticalSpacing } from './VerticalSpacing'
import { VisuallyHidden } from './VisuallyHidden'
import { ServicePreview } from '../../pages/index'
import { FilterContext } from '../context/FilterContext'
import { SaveContext } from '../context/SaveContext'
import { QuizContext } from '../context/QuizContext'
import { Gender } from '../../cms/services'
import { useRemember } from '../hooks/remember'
import { useScrollRemember } from '../hooks/scrollRemember'

const ITEMS_PER_PAGE = 20
const DEFAULT_SERVICE_ID = 'the-mix-free-online-support-for-under-25s'

export type ListType = 'filtered' | 'saved' | 'quiz'
interface CardListProps {
  services: Array<ServicePreview>
  listType: ListType
  onLoad?(): void
}

const List = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`

const LoadMore = styled(ButtonBase).attrs({
  as: 'button',
})`
  background-color: ${(props) => props.theme.colours.blue};
  margin: auto;
  padding: 0.5rem 2rem;
`

export const CardList = ({
  services,
  listType,
}: CardListProps): JSX.Element => {
  const { age, formats, areas, provider } = useContext(FilterContext)
  const { saved } = useContext(SaveContext)
  const { fullDataGet } = useContext(QuizContext)

  const quizAnswers = fullDataGet()
  // Define weight values to modify results later
  const categoryWeight = 1
  const interestWeight = 1
  const feelingWeight = 1

  const [loadedServices, setLoadedServices] = useState<number>(0)
  const [loadMoreClicked, setLoadMoreClicked] = useState<boolean>(false)

  const [filteredServices, setFilteredServices] =
    useState<Array<ServicePreview> | null>(null)

  const toRender =
    loadedServices !== null && filteredServices
      ? filteredServices.slice(0, loadedServices)
      : []

  // We use a reference to the last element in the card list so that we can
  // tell when the card list has rendered, and thus know when it is ok
  // to set the scroll position.
  const [loadedRef, setLoadedRef] = useState<HTMLLIElement | null>(null)

  const { resumePosition, resetPosition } = useScrollRemember()
  const { recall: recallNum } = useRemember({
    name: 'servicesLoaded',
    value: () => (loadedServices ? loadedServices.toString() : '0'),
  })

  // Slightly hacky way of checking if we have changed the stuff that's in the card list
  // by changing filter settings or other means.
  const { recall: recallNumItems } = useRemember({
    name: 'numItems',
    value: () => (filteredServices ? filteredServices.length.toString() : '0'),
  })

  useEffect(() => {
    if (filteredServices === null) {
      return
    }

    // Recall pagination position, but make sure the number of items
    // hasn't changed since we were last here, and if it has, reset to
    // the start of the list.
    if (parseInt(recallNumItems() || '0') !== filteredServices.length) {
      setLoadedServices(ITEMS_PER_PAGE)
      resetPosition()
    } else {
      setLoadedServices(parseInt(recallNum() || '0'))
    }

    // We only want to run this once, once the filtered services list has been loaded
    // eslint-disable-next-line
  }, [filteredServices === null])

  useEffect(() => {
    if (loadedRef === null) return

    // if the loadedRef has changed because we added more results, don't resume position
    if (loadMoreClicked) {
      setLoadMoreClicked(false)
      return
    }

    resumePosition()
    // eslint-disable-next-line
  }, [loadedRef])

  const totalServicesAvailable = filteredServices?.length

  const loadMore = () => {
    setLoadMoreClicked(true)
    setLoadedServices(loadedServices + ITEMS_PER_PAGE)
  }

  const ageFilter = useCallback(
    (item: ServicePreview, ageInput: string | undefined) => {
      let ageNumber: number

      switch (ageInput) {
        case 'under 15':
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
        case 'over 18':
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
    },
    []
  )

  const formatFilter = useCallback(
    (item: ServicePreview) => {
      if (formats.length === 0) {
        return true
      }

      if (item?.format && formats.includes(item?.format)) return true
    },
    [formats]
  )

  const areaFilter = useCallback(
    (item: ServicePreview) => {
      if (areas.length === 0 || item?.area?.length === 0) {
        return true
      }

      const areaIntersection = item.area?.filter((value) =>
        areas.includes(value)
      )

      if (areaIntersection?.length) return true
    },
    [areas]
  )

  const genderFilter = useCallback(
    (item: ServicePreview, genderInput?: Array<Gender>) => {
      // If no preference is set for user or service, return everything
      if (genderInput?.length === 0 || item?.gender?.length === 0) {
        return true
      }

      genderInput?.filter((gender) => {
        if (!item?.gender?.includes(gender)) {
          return false
        } else {
          return true
        }
      })
    },
    []
  )

  const providerFilter = useCallback(
    (item: ServicePreview, providerInput: string | undefined) => {
      if (providerInput === undefined) {
        return true
      }

      if (item.provider === providerInput) {
        return true
      }
    },
    []
  )

  const assignQuizScore = useCallback(
    (item: ServicePreview) => {
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

      const interestMatches = quizAnswers?.interests?.filter((interest) => {
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
    },
    [quizAnswers]
  )

  useEffect(() => {
    let filtered: Array<ServicePreview>

    if (listType === 'saved') {
      filtered = services.filter((item) => saved.includes(item.id))
    } else if (listType === 'quiz') {
      filtered = services
        .filter(assignQuizScore)
        .filter((item) => ageFilter(item, quizAnswers?.age))
        .filter((item) => genderFilter(item, quizAnswers?.gender))
        .sort((a, b) => {
          return b.score - a.score
        })
    } else {
      filtered = services
        .filter((item) => ageFilter(item, age))
        .filter(formatFilter)
        .filter(areaFilter)
        .filter((item) => providerFilter(item, provider))
        .sort((a, b) => {
          if (a.promoted && !b.promoted) return -1
          if (b.promoted && !a.promoted) return 1
          return 0
        })
    }

    setFilteredServices(filtered)
  }, [
    quizAnswers,
    saved,
    age,
    provider,
    services,
    listType,
    ageFilter,
    genderFilter,
    formatFilter,
    areaFilter,
    providerFilter,
    assignQuizScore,
  ])

  if (filteredServices === null) return <></>

  return filteredServices && filteredServices.length > 0 ? (
    <Content as="main">
      {listType === 'filtered' ? <SummerActivitiesEncouragement /> : null}
      {listType === 'filtered' ? <FilterButton /> : null}
      <VisuallyHidden>
        <svg width="0" height="0">
          <defs>
            <clipPath id="cardWave" clipPathUnits="objectBoundingBox">
              <path d="M 0,1  L 0,0  L 1,0  L 1,0.95  C .75 1.05, .25 .7, 0 0.8 Z" />
            </clipPath>
          </defs>
        </svg>
      </VisuallyHidden>
      <List>
        {toRender.map((service: ServicePreview, id: number) => (
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
            ref={id === toRender.length - 1 ? (ref) => setLoadedRef(ref) : null}
          />
        ))}
      </List>
      {totalServicesAvailable &&
      loadedServices &&
      totalServicesAvailable > loadedServices ? (
        <div>
          <VerticalSpacing />
          <LoadMore onClick={() => loadMore()}>Load more</LoadMore>
        </div>
      ) : null}
      <VerticalSpacing />
    </Content>
  ) : (
    <EmptyList
      defaultService={services.find((el) => el.id === DEFAULT_SERVICE_ID)}
      listType={listType}
    />
  )
}
