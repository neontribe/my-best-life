import Link from 'next/link'
import Image from 'next/image'
import styled from 'styled-components'

import { VisuallyHidden } from './VisuallyHidden'
import { ButtonBase } from './ButtonBase'

interface HeaderProps {
  homeButton?: boolean
  filterButton?: boolean
  title: string
}

const Header = styled.header`
  background-color: ${(props) => props.theme.colours.aqua};
  clip-path: url(#wave);
  height: 8rem;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 2;
`

const HeaderContents = styled.div`
  align-items: center;
  display: flex;
  height: 6rem;
  justify-content: space-around;
  margin-bottom: 2rem;
`

const Title = styled.h1`
  font-family: 'Catamaran', sans-serif;
  font-size: ${(props) => props.theme.fontSizes.title};
`

const ButtonLink = styled(ButtonBase)`
  height: 44px;
  width: 44px;
  padding: 4px;
`

const ButtonLinkText = styled(ButtonBase)`
  padding: 0.5rem 1rem;
  color: ${(props) => props.theme.colours.yellow};
`

export const HeaderComponent = ({
  homeButton,
  filterButton,
  title,
}: HeaderProps): JSX.Element => {
  return (
    <>
      <VisuallyHidden>
        <svg width="0" height="0">
          <defs>
            <clipPath id="wave" clipPathUnits="objectBoundingBox">
              <path d="M 0,1  L 0,0  L 1,0  L 1,0.6  C .75 1.5, .25 .3, 0 1 Z" />
            </clipPath>
          </defs>
        </svg>
      </VisuallyHidden>
      <Header>
        <HeaderContents>
          {homeButton && (
            <Link href={`/`} passHref>
              <ButtonLink>
                <Image
                  src="/img/home-icon.png"
                  alt="Home"
                  height={44}
                  width={44}
                />
              </ButtonLink>
            </Link>
          )}
          <Title>{title}</Title>
          {filterButton && (
            <Link href={`/filter`} passHref>
              <ButtonLinkText>Filter</ButtonLinkText>
            </Link>
          )}
        </HeaderContents>
      </Header>
    </>
  )
}

export default HeaderComponent
