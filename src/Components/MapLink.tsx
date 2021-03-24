import React from 'react'
import styled from 'styled-components'

interface MapLinkProps {
  location: string
}

// Link with no text decoration and custom focus style
const InvisibleLink = styled.a`
  text-decoration: none;

  &:focus {
    outline: none;
  }

  &:focus > div {
    outline: 2px dashed ${(props) => props.theme.colours.blue};
    outline-offset: 2px;
  }
`

const MapLinkContainer = styled.div`
  display: flex;
  color: ${(props) => props.theme.colours.purple};
  font-weight: bold;
  margin-bottom: 1rem;

  div {
    line-height: 1.8rem;
  }
`

const MapPin = styled.div`
  background-image: url('/assets/map_pin.svg');
  background-size: contain;
  background-repeat: no-repeat;
  height: 1.8rem;
  width: 2rem;
`

// Given a location, returns the link for a search for it on Google Maps
const formMapLink = (location: string): string =>
  `https://www.google.com/maps/search/${encodeURIComponent(location)}`

const excludePattern = /(?:multiple locations)|(?:online)/i

export const MapLink = ({ location }: MapLinkProps): JSX.Element => {
  if (excludePattern.test(location)) return <></>

  return (
    <InvisibleLink href={formMapLink(location)} target="_blank" rel="noopener">
      <MapLinkContainer>
        <MapPin />
        <div>view on Google Maps</div>
      </MapLinkContainer>
    </InvisibleLink>
  )
}
