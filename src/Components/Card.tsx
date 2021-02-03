import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'

import { ServicePreview } from '../../pages/index'
import { VisuallyHidden } from './VisuallyHidden'

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

const ButtonLink = styled.a`
  align-items: center;
  background-color: ${(props) => props.theme.colours.purple};
  border-radius: 5rem;
  border: 3px solid transparent;
  color: ${(props) => props.theme.colours.white};
  display: flex;
  font-family: 'Catamaran', sans-serif;
  font-weight: bold;
  height: 2rem;
  padding: 0.2rem 2rem;
  text-decoration: none;

  &:focus {
    outline: 2px dashed ${(props) => props.theme.colours.blue};
    outline-offset: 2px;
  }

  &:hover {
    background-color: ${(props) => props.theme.colours.purple_light};
    color: ${(props) => props.theme.colours.purple};
    transition: 0.3s;
  }
`

export const Card = ({
  id,
  title,
  shortDescription,
  image,
  cost,
  age,
  categories,
}: ServicePreview): JSX.Element => {
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

      {categories && (
        <CategoryList>
          {categories?.map((cat) => {
            return <Category key={cat}>{cat}</Category>
          })}
        </CategoryList>
      )}

      <DetailContainer>
        <DetailArea>
          <p>Cost: {cost}</p>
          <p>Age Range: {age}</p>
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
