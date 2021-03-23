import { useContext } from 'react'

import { Card } from './Card'
import { EmptyList } from './EmptyList'
import { ServicePreview } from '../../pages/index'
import { FilterContext } from '../context/FilterContext'
import { SaveContext } from '../context/SaveContext'

interface CardListProps {
  services: Array<ServicePreview>
  listType: 'filtered' | 'saved'
}

export const CardList = ({
  services,
  listType,
}: CardListProps): JSX.Element => {
  const { age, formats } = useContext(FilterContext)
  const { saved } = useContext(SaveContext)

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

  let filteredServices

  if (listType === 'saved') {
    filteredServices = services.filter((item) => saved.includes(item.id))
  }

  if (listType === 'filtered') {
    filteredServices = services.filter(ageFilter).filter(formatFilter)
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
              categories={service.categories}
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
