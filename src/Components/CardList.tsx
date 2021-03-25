import { useContext, useEffect } from 'react'

import { Card } from './Card'
import { EmptyList } from './EmptyList'
import { ServicePreview } from '../../pages/index'
import { FilterContext } from '../context/FilterContext'
import { SaveContext } from '../context/SaveContext'
import { QuizContext } from '../context/QuizContext'
import { Interest, Gender } from '../../cms/services'

export type ListType = 'filtered' | 'saved' | 'quiz'
interface CardListProps {
  services: Array<ServicePreview>
  listType: ListType
  onLoad?(): void
}

export const CardList = ({
  services,
  listType,
  onLoad,
}: CardListProps): JSX.Element => {
  const { age, formats } = useContext(FilterContext)
  const { saved } = useContext(SaveContext)
  const { fullDataGet } = useContext(QuizContext)

  const quizAnswers = fullDataGet()
  // Define weight values to modify results later
  const categoryWeight = 1
  const interestWeight = 1
  const feelingWeight = 1

  useEffect(() => {
    onLoad && onLoad()
  }, [onLoad])

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

  let filteredServices

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
  }

  if (listType === 'filtered') {
    filteredServices = services
      .filter((item) => ageFilter(item, age))
      .filter(formatFilter)
  }

  return (
    <>
      {filteredServices && filteredServices.length > 0 ? (
        <ul>
          {filteredServices.map((service: ServicePreview) => (
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
            />
          ))}
        </ul>
      ) : (
        <EmptyList listType={listType} />
      )}
    </>
  )
}
