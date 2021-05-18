import { useState, useRef } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'

import useOnClickOutside from '../hooks/useOnClickOutside'
import { VisuallyHidden } from './VisuallyHidden'
import { Burger } from './Burger'
import { DesktopNav } from './DesktopNav'
import { Menu } from './Menu'

const Header = styled.header`
  background-color: ${(props) => props.theme.colours.aqua};
  clip-path: url(#wave);
  height: ${(props) => props.theme.headerHeight};
  padding: 1rem 0;
  width: 100%;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: ${(props) => props.theme.colours.blue};

    &:focus {
      outline: 2px dashed ${(props) => props.theme.colours.blue};
      outline-offset: 4px;
    }
  }
`

const StickyContainer = styled.div<{ open: boolean }>`
  position: sticky;
  top: 0;
  // Change z-index to cover sticky button when menu is open
  z-index: ${(props) => (props.open ? 5 : 2)};
`

const HeaderContents = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: auto;
  padding: 0 var(--gutter-width);
`

const Title = styled.h1`
  font-family: 'Catamaran', sans-serif;
  font-size: ${(props) => props.theme.fontSizes.title};
  line-height: 1;
  margin-left: 1rem;
`

export const HeaderComponent = (): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null)
  useOnClickOutside(ref, () => setOpenMenu(false))

  const [openMenu, setOpenMenu] = useState(false)

  return (
    <StickyContainer ref={ref} open={openMenu}>
      <Header>
        <VisuallyHidden>
          <svg width="0" height="0">
            <defs>
              <clipPath id="wave" clipPathUnits="objectBoundingBox">
                <path d="M 0,1  L 0,0  L 1,0  L 1,0.9  C .75 1.2, .25 .7, 0 1 Z" />
              </clipPath>
            </defs>
          </svg>
        </VisuallyHidden>
        <HeaderContents>
          <Link href="/" passHref>
            <a>
              <Image
                src="/site/my_best_life.svg"
                alt={''}
                width="48"
                height="48"
              />
              <Title>my best life</Title>
            </a>
          </Link>
          <DesktopNav />
          <Burger open={openMenu} setOpen={setOpenMenu} />
        </HeaderContents>
      </Header>
      <Menu open={openMenu} />
    </StickyContainer>
  )
}

export default HeaderComponent
