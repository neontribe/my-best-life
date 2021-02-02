import React from 'react'
import styled from 'styled-components'

import { Card } from './Card'
import { ServicePreview } from '../../pages/index'

const StyledCardList = styled.ul`
  margin: 8rem auto 0 auto;
  max-width: 600px;
`

interface CardListProps {
  services: Array<ServicePreview>
}

export const CardList = ({ services }: CardListProps): JSX.Element => {
  return (
    <StyledCardList>
      {services &&
        services.map((service: ServicePreview) => (
          <Card
            key={service.title}
            title={service.title}
            shortDescription={service.shortDescription}
            image={service.image}
            cost={service.cost}
            age={service.age}
            categories={service.categories}
          />
        ))}
    </StyledCardList>
  )
}
