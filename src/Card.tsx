import styled from 'styled-components'
import Image from 'next/image'

import { ServicePreview } from '../cms/services'

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
`

const Description = styled.h2`
  align-items: center;
  color: ${(props) => props.theme.colours.purple};
  display: flex;
  font-size: ${(props) => props.theme.fontSizes.heading};
  margin: 0.5rem 0;
  min-height: 6rem;
  text-transform: capitalize;
`

const TitleContainer = styled.div`
  font-family: 'Catamaran', sans-serif;
  font-weight: bold;
  width: calc(60% - 1rem);
`

const ImageContainer = styled.div`
  height: 8rem;
  position: absolute;
  right: 0;
  top: 0;
  width: 40%;
  border-bottom-left-radius: 6rem;
  overflow: hidden;
`

const Category = styled.li``

const CardFooter = styled.div`
  align-items: flex-end;
  display: flex;
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
  color: ${(props) => props.theme.colours.white};
  display: block;
  display: flex;
  font-family: 'Catamaran', sans-serif;
  font-weight: bold;
  height: 2rem;
  padding: 0.2rem 2.5rem;
  text-decoration: none;
`

export const Card = ({
  title,
  shortDescription,
  imagePath,
  imageAlt,
  cost,
  age,
  categories,
}: ServicePreview): JSX.Element => {
  return (
    <CardContainer>
      <ImageContainer>
        <Image
          src={imagePath ? imagePath : 'https://placeimg.com/640/480/nature'}
          alt={imageAlt}
          layout="fill"
          objectFit="cover"
        />
      </ImageContainer>

      <TitleContainer>
        <ServiceName>{title}</ServiceName>
        <Description>{shortDescription}</Description>
      </TitleContainer>

      <ul>
        {categories?.map((cat) => {
          return <Category key={cat}>{cat}</Category>
        })}
      </ul>
      <CardFooter>
        <DetailArea>
          <p>Cost: {cost}</p>

          <p>Age Range: {age}</p>
        </DetailArea>
        <ButtonLink href="/">
          <span>info</span>
        </ButtonLink>
      </CardFooter>
    </CardContainer>
  )
}
