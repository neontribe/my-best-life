import React from 'react'

import { Card } from './Card'
import { ServicePreview } from '../../pages/index'

interface CardListProps {
  services: Array<ServicePreview>
}

export const CardList = ({ services }: CardListProps): JSX.Element => {
  return (
    <>
      {services && services.length > 0 ? (
        <ul>
          {services.map((service: ServicePreview) => (
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
            />
          ))}
        </ul>
      ) : null}
    </>
  )
}
