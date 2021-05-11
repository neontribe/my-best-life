import styled from 'styled-components'

import { VisuallyHidden } from './VisuallyHidden'
import { VerticalSpacing } from './VerticalSpacing'

interface HeaderProps {
  title: string
}

const Header = styled.header`
  background-color: ${(props) => props.theme.colours.aqua};
  clip-path: url(#wave);
  height: 5rem;
  padding: 0 var(--gutter-width);
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 2;
`

const HeaderContents = styled.div`
  align-items: center;
  display: flex;
  min-height: 4rem;
  justify-content: space-between;
`

const Title = styled.h1`
  align-self: center;
  font-family: 'Catamaran', sans-serif;
  font-size: ${(props) => props.theme.fontSizes.title};
`
export const HeaderComponent = ({ title }: HeaderProps): JSX.Element => {
  return (
    <>
      <VisuallyHidden>
        <svg width="0" height="0">
          <defs>
            <clipPath id="wave" clipPathUnits="objectBoundingBox">
              <path d="M 0,1  L 0,0  L 1,0  L 1,0.9  C .75 1.2, .25 .7, 0 1 Z" />
            </clipPath>
          </defs>
        </svg>
      </VisuallyHidden>
      <Header>
        <HeaderContents>
          <Title>{title}</Title>
        </HeaderContents>
        <VerticalSpacing size={1} />
      </Header>
    </>
  )
}

export default HeaderComponent
