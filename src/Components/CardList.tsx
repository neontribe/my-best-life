import { useContext } from 'react'

import { Card } from './Card'
import { ServicePreview } from '../../pages/index'
import { FilterContext } from '../context/FilterContext'

interface CardListProps {
  services: Array<ServicePreview>
}

export const CardList = ({ services }: CardListProps): JSX.Element => {
  const { age, categories, formats } = useContext(FilterContext)

  return (
    <>
      {services && services.length > 0 ? (
        <ul>
          {services
            .filter(function (item) {
              let ageNumber: number

              switch (age) {
                case '<15':
                  ageNumber = 14
                  break
                case '15':
                  ageNumber = 14
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
              if (
                item.age?.minAge &&
                item.age?.maxAge &&
                item.age.minAge <= ageNumber &&
                ageNumber <= item.age.maxAge
              )
                return true

              // There is only a minimum age
              if (item.age?.minAge && item.age.minAge <= ageNumber) return true

              // There is only a maximum age
              if (item.age?.maxAge && item.age.maxAge >= ageNumber) return true
            })
            .filter(function (item) {
              if (
                item?.categories?.category1 &&
                categories.includes(item?.categories?.category1)
              )
                return true
              if (
                item?.categories?.category2 &&
                categories.includes(item?.categories?.category2)
              )
                return true
            })
            .filter(function (item) {
              if (item?.format && formats.includes(item?.format)) return true
            })
            .map((service: ServicePreview) => (
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
      ) : null}
    </>
  )
}
