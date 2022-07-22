import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import React, { useContext, useRef } from 'react'

import { SaveButton } from './SaveButton'
import { ServicePreview } from '../../pages/index'
import { SaveContext } from '../../src/context/SaveContext'

export type CardDisplay = Pick<
  ServicePreview,
  | 'id'
  | 'title'
  | 'shortDescription'
  | 'image'
  | 'costValue'
  | 'costQualifier'
  | 'age'
  | 'gender'
  | 'format'
  | 'provider'
>

const CardContainer = styled.li`
  border-radius: 1rem;
  border-top-right-radius: 3rem;
  box-shadow: 0 0 9px 2px ${(props) => props.theme.colours.shadow};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  margin: 1.5rem 0;
  overflow: hidden;
  position: relative;
  width: 100%;

  ${(props) => props.theme.screenSizes.tabletLandscapePlus} {
    width: calc(50% - 1rem);
  }

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

const ImageText = styled(ServiceName)`
  font-family: 'Catamaran', sans-serif;
  font-size: 28px;
  line-height: 100%;
  position: absolute;
  left: 1rem;
  top: 1.5rem;
  z-index: 1;

  ${(props) => props.theme.screenSizes.smallPhoneOnly} {
    font-size: 22px;
    top: 2.5rem;
  }
`

const Description = styled.h2`
  align-items: center;
  color: ${(props) => props.theme.colours.purple};
  display: flex;
  font-family: 'Catamaran', sans-serif;
  font-size: ${(props) => props.theme.fontSizes.heading};
  font-weight: bold;
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
  flex-wrap: wrap;
  font-family: 'Lato', sans-serif;
  font-size: ${(props) => props.theme.fontSizes.small};
  margin: 0 1rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
  order: 4;
`

const LabelButton = styled.div`
  background-color: ${(props) => props.theme.colours.aqua_light};
  border-radius: 1.5rem;
  padding: 0.25rem 0.5rem;
  margin-right: 1rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
`

const LabelButton2 = styled(LabelButton)`
  background-color: ${(props) => props.theme.colours.yellow_light};
`

const SaveButtonContainer = styled.div`
  position: absolute;
  right: 1rem;
  top: 1rem;
`

// Name the function Card so it shows up in DevTools
export const Card = React.forwardRef(function Card(
  {
    id,
    title,
    shortDescription,
    image,
    costValue,
    costQualifier,
    age,
    provider,
  }: CardDisplay,
  ref: React.Ref<HTMLLIElement>
): JSX.Element {
  const { saved } = useContext(SaveContext)

  const ageDisplay = age ? formatAgeDisplay(age.minAge, age.maxAge) : null

  const costDisplay =
    costValue || costValue === 0 || costQualifier
      ? formatCostDisplay(costValue, costQualifier)
      : null

  const cardLink = useRef<HTMLAnchorElement | null>(null)

  return (
    <CardContainer ref={ref} onClick={() => cardLink.current?.click()}>
      <Description>
        <Link href={`/service/${id}`} passHref>
          <a ref={cardLink}>{shortDescription}</a>
        </Link>
      </Description>

      <ImageContainer>
        {image?.image.includes('fidfallback_') && (
          <ImageText>
            Summer of food <br></br> and fun
          </ImageText>
        )}
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
        {costDisplay && <LabelButton>{costDisplay}</LabelButton>}
        {ageDisplay && <LabelButton>{ageDisplay}</LabelButton>}
        {provider && <LabelButton2>this month</LabelButton2>}
      </InfoContainer>

      <SaveButtonContainer>
        <SaveButton
          id={id}
          saved={saved.includes(id)}
          label={shortDescription}
        />
      </SaveButtonContainer>
    </CardContainer>
  )
})

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
