import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import React, { useRef } from 'react'

import { ServicePreview } from '../../pages/index'
import { VisuallyHidden } from './VisuallyHidden'

export type MiniCard = Pick<
  ServicePreview,
  'id' | 'image' | 'shortDescription' | 'organisation'
>

const CardContainer = styled.div`
  border-radius: 1rem;
  border-top-right-radius: 3rem;
  box-shadow: 0 0 9px 2px ${(props) => props.theme.colours.shadow};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  margin: 1.5rem 0;
  overflow: hidden;
  position: relative;

  &:hover {
    box-shadow: 0 0 15px 7px ${(props) => props.theme.colours.shadow};
  }
`

const Organisation = styled.p`
  font-family: 'Catamaran', sans-serif;
  font-size: ${(props) => props.theme.fontSizes.highlight};
  font-weight: bold;
  margin-bottom: 0.5rem;
  order: 2;
  padding: 0 1rem;
  text-align: left;
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

export const MiniCard = ({
  id,
  image,
  shortDescription,
  organisation,
}: MiniCard): JSX.Element => {
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

      <Organisation>{organisation}</Organisation>
    </CardContainer>
  )
}
