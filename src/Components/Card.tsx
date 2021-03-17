import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import { useContext, useRef } from 'react'

import { SaveButton } from './SaveButton'
import { ServicePreview } from '../../pages/index'
import { VisuallyHidden } from './VisuallyHidden'
import { SaveContext } from '../../src/context/SaveContext'

const CardContainer = styled.li`
  border-radius: 1rem;
  border-top-right-radius: 3rem;
  box-shadow: 0 0 9px 2px ${(props) => props.theme.colours.shadow};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  margin: 1.5rem 2rem;
  overflow: hidden;
  position: relative;

  &:hover {
    box-shadow: 0 0 15px 7px ${(props) => props.theme.colours.shadow};
  }
`

const ServiceName = styled.p`
  font-family: 'Catamaran', sans-serif;
  font-size: ${(props) => props.theme.fontSizes.small};
  font-weight: bold;
  margin-bottom: 0.5rem;
  order: 2;
  padding: 0 1rem;
`

const Description = styled.h2`
  align-items: center;
  color: ${(props) => props.theme.colours.purple};
  display: flex;
  font-family: 'Catamaran', sans-serif;
  font-size: ${(props) => props.theme.fontSizes.heading};
  font-weight: bold;
  margin-bottom: 1rem;
  order: 3;
  padding: 0 1rem;
  text-transform: capitalize;

  a {
    color: inherit;
    text-decoration: none;

    &:focus {
      outline: 2px dashed ${(props) => props.theme.colours.blue};
      outline-offset: 2px;
    }
  }
`

const ImageContainer = styled.div`
  order: 1;
  position: relative;
  overflow: hidden;
  height: 10rem;
  width: 100%;
  clip-path: url(#cardWave);
`

const InfoContainer = styled.div`
  display: flex;
  font-family: 'Lato', sans-serif;
  font-size: ${(props) => props.theme.fontSizes.small};
  margin: 0 1rem;
  margin-bottom: 1rem;
  order: 4;

  div {
    background-color: #edf7f6;
    border-radius: 0.5rem;
    padding: 0.25rem 0.5rem;
    margin-right: 1rem;
  }
`

const SaveButtonContainer = styled.div`
  position: absolute;
  right: 1rem;
  top: 1rem;
`

export const Card = ({
  id,
  title,
  shortDescription,
  image,
  costValue,
  costQualifier,
  age,
}: ServicePreview): JSX.Element => {
  const { saved } = useContext(SaveContext)

  const ageDisplay = age ? formatAgeDisplay(age.minAge, age.maxAge) : null

  const costDisplay =
    costValue || costValue === 0 || costQualifier
      ? formatCostDisplay(costValue, costQualifier)
      : null

  const cardLink = useRef<HTMLAnchorElement | null>(null)

  return (
    <CardContainer onClick={() => cardLink.current?.click()}>
      <Description>
        <Link href={`/service/${id}`} passHref>
          <a ref={cardLink}>{shortDescription}</a>
        </Link>
      </Description>

      <ImageContainer>
        <VisuallyHidden>
          <svg width="0" height="0">
            <defs>
              <clipPath id="cardWave" clipPathUnits="objectBoundingBox">
                <path d="M 0,1  L 0,0  L 1,0  L 1,0.95  C .75 1.05, .25 .7, 0 0.8 Z" />
              </clipPath>
            </defs>
          </svg>
        </VisuallyHidden>
        {image?.image && (
          <Image
            src={`/${image.image}`}
            alt={image.imageAlt ? image.imageAlt : ''}
            layout="fill"
            objectFit="cover"
          />
        )}
      </ImageContainer>

      <ServiceName>{title}</ServiceName>

      <InfoContainer>
        {costDisplay && <div>{costDisplay}</div>}
        {ageDisplay && <div>{ageDisplay}</div>}
      </InfoContainer>

      <SaveButtonContainer>
        <SaveButton id={id} saved={saved.includes(id)} />
      </SaveButtonContainer>
    </CardContainer>
  )
}

export function formatAgeDisplay(
  min: number | undefined,
  max: number | undefined
): string {
  // There is only a minimum age
  if (!max) {
    return `From age ${min}+`
  }
  // There is only a maximum age
  else if (!min) {
    return `Under ${max}s`
  }
  // There is an age range
  else {
    if (min === max) {
      return `Age ${min}`
    } else {
      return `Ages ${min}-${max}`
    }
  }
}

function formatCostDisplay(
  cost: number,
  qualifier: string | undefined
): string {
  if (qualifier) {
    return qualifier
  } else if (cost === 0) {
    return 'Free'
  } else {
    return `£${String(cost)}`
  }
}
