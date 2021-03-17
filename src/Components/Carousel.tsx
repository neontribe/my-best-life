import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'

interface CarouselProps {
  children: React.ReactNode
}

const CarouselContainer = styled.div`
  display: grid;
`

const Selector = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin-top: 1rem;
`

const Movement = styled.button`
  background: none;
  border: none;
  color: black;
  margin: 0 0.5rem;
  padding: 0.5rem;
  min-width: 5rem;
  color: ${(props) => props.theme.colours.purple};
  font-weight: bold;
  font-size: ${(props) => props.theme.fontSizes.small};
  cursor: pointer;
  font-family: 'Catamaran', sans-serif;

  &:focus {
    outline: 2px dashed ${(props) => props.theme.colours.blue};
    outline-offset: 2px;
  }
`

const ChildContainer = styled.div`
  grid-column: 1;
  grid-row: 1;
`

const Show = styled(ChildContainer)`
  opacity: 1;
  z-index: 0;
`

const Hide = styled(ChildContainer)`
  opacity: 0;
  z-index: -1;
`

export const Carousel = ({ children }: CarouselProps): JSX.Element => {
  const [currentIdx, setCurrentIdx] = useState(0)
  const childCount = React.Children.count(children)

  const moveBack = () => {
    setCurrentIdx((i) => {
      if (i === 0) return childCount - 1
      return i - 1
    })
  }

  return (
    <CarouselContainer>
      {children &&
        React.Children.map(children, (child, i) => {
          if (i === currentIdx) {
            return <Show>{child}</Show>
          }
          return <Hide aria-hidden={true}>{child}</Hide>
        })}
      {childCount > 1 && (
        <Selector>
          <Movement onClick={() => moveBack()}>Previous</Movement>
          <Movement onClick={() => setCurrentIdx((i) => (i + 1) % childCount)}>
            Next
          </Movement>
        </Selector>
      )}
    </CarouselContainer>
  )
}
