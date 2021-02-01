import styled from 'styled-components'
import Image from 'next/image'

import { ServicePreview } from '../../cms/services'
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
  height: 8rem;
  position: absolute;
  right: 0;
  top: 0;
  width: 40%;
  border-bottom-left-radius: 6rem;
  overflow: hidden;
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
    width: 0.8em;
    height: 0.8em;
    border-radius: 50%;
    display: inline-block;
    margin-right: 0.5rem;
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
  color: ${(props) => props.theme.colours.white};
  display: block;
  display: flex;
  font-family: 'Catamaran', sans-serif;
  font-weight: bold;
  height: 2rem;
  border: 3px solid transparent;
  padding: 0.2rem 2rem;
  text-decoration: none;

  &:focus {
    outline: 2px dashed ${(props) => props.theme.colours.blue};
    outline-offset: 2px;
  }

  &:hover {
    transition: 0.3s;
    background-color: ${(props) => props.theme.colours.purple_light};
    color: ${(props) => props.theme.colours.purple};
  }
`

export const Card = ({
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

      <CategoryList>
        {categories?.map((cat) => {
          return <Category key={cat}>{cat}</Category>
        })}
        <Category key={'aaa'}>{'Fun'}</Category>
        <Category key={'bbb'}>{'Some long text category'}</Category>
      </CategoryList>

      <DetailContainer>
        <DetailArea>
          <p>Cost: {cost}</p>
          <p>Age Range: {age}</p>
        </DetailArea>
        <ButtonLink href="/">
          <VisuallyHidden>{`${title} `}</VisuallyHidden> <span>info</span>
        </ButtonLink>
      </DetailContainer>
    </CardContainer>
  )
}
