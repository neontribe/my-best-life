import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'

import { ServicePreview } from '../../pages/index'
import { VisuallyHidden } from './VisuallyHidden'
import { ButtonBase } from './ButtonBase'

const CardContainer = styled.li`
  border-radius: 2rem;
  box-shadow: 0 0 9px 2px ${(props) => props.theme.colours.shadow};
  margin: 1.5rem 2rem;
  overflow: hidden;
  padding: 1rem;
  position: relative;
`

const ServiceName = styled.p`
  font-size: ${(props) => props.theme.fontSizes.small};
  margin-bottom: 1rem;
`

const Description = styled.h2`
  align-items: center;
  color: ${(props) => props.theme.colours.purple};
  display: flex;
  font-size: ${(props) => props.theme.fontSizes.heading};
  margin-bottom: 1rem;
  min-height: 4rem;
  text-transform: capitalize;
`

const TitleContainer = styled.div`
  font-family: 'Catamaran', sans-serif;
  font-weight: bold;
  display: flex;
  flex-direction: column-reverse;
  width: calc(60% - 1rem);
`

const ImageContainer = styled.div`
  border-bottom-left-radius: 6rem;
  height: 8rem;
  overflow: hidden;
  position: absolute;
  right: 0;
  top: 0;
  width: 40%;
`

const CategoryList = styled.ul`
  margin-bottom: 1rem;
`

const Category = styled.li`
  font-family: 'Catamaran', sans-serif;
  font-weight: bold;
  font-size: ${(props) => props.theme.fontSizes.small};
  display: inline;
  margin-right: 1rem;

  &:before {
    content: '';
    background: ${(props) => props.theme.colours.yellow};
    border-radius: 50%;
    display: inline-block;
    height: 0.8em;
    margin-right: 0.5rem;
    width: 0.8em;
  }
`

const DetailContainer = styled.div`
  align-items: flex-end;
  display: flex;
  justify-content: space-between;
`

const DetailArea = styled.div`
  flex: 1 0 60%;
  font-family: 'Lato', sans-serif;
  font-size: ${(props) => props.theme.fontSizes.small};
`

const ButtonLink = styled(ButtonBase)`
  height: 2rem;
  padding: 0.2rem 2rem;
  text-decoration: none;
`

export const Card = ({
  id,
  title,
  shortDescription,
  image,
  costValue,
  costQualifier,
  age,
  categories,
}: ServicePreview): JSX.Element => {
  const theCats = [
    categories?.category1 ? categories?.category1 : '',
    categories?.category2 ? categories?.category2 : '',
  ].filter(Boolean)

  const theAge = age ? formatAgeDisplay(age.minAge, age.maxAge) : null

  const theCost =
    costValue || costValue === 0 || costQualifier
      ? formatCostDisplay(costValue, costQualifier)
      : null

  return (
    <CardContainer>
      <ImageContainer>
        {image?.image && (
          <Image
            src={`/${image.image}`}
            alt={image.imageAlt ? image.imageAlt : ''}
            layout="fill"
            objectFit="cover"
          />
        )}
      </ImageContainer>

      <TitleContainer>
        <Description>{shortDescription}</Description>
        <ServiceName>{title}</ServiceName>
      </TitleContainer>

      {theCats && (
        <CategoryList>
          {theCats.map((cat) => {
            return <Category key={cat}>{cat}</Category>
          })}
        </CategoryList>
      )}

      <DetailContainer>
        <DetailArea>
          {theCost && <p>Cost: {theCost}</p>}
          {theAge && <p>Age Range: {theAge}</p>}
        </DetailArea>
        <Link href={`/service/${id}`} passHref>
          <ButtonLink>
            <VisuallyHidden>{`${title} `}</VisuallyHidden> <span>info</span>
          </ButtonLink>
        </Link>
      </DetailContainer>
    </CardContainer>
  )
}

export function formatAgeDisplay(
  min: number | undefined,
  max: number | undefined
): string {
  // There is only a minimum age
  if (!max) {
    return `${min}+`
  }
  // There is only a maximum age
  else if (!min) {
    return `under ${max}`
  }
  // There is an age range
  else {
    if (min === max) {
      return `${min}`
    } else {
      return `${min}-${max}`
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
