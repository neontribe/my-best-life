import { useState, useRef } from 'react'
import styled from 'styled-components'
import useOnClickOutside from '../hooks/useOnClickOutside'

import { VisuallyHidden } from './VisuallyHidden'
import { Burger } from './Burger'
import { Menu } from './Menu'

interface HeaderProps {
  title: string
}

const Header = styled.header`
  background-color: ${(props) => props.theme.colours.aqua};
  clip-path: url(#wave);
  height: ${(props) => props.theme.headerHeight};
  padding: 0 var(--gutter-width);
  width: 100%;
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
  min-height: 4rem;
  justify-content: space-between;
`

const Title = styled.h1`
  font-family: 'Catamaran', sans-serif;
  font-size: ${(props) => props.theme.fontSizes.title};
  line-height: 1;
`

export const HeaderComponent = ({ title }: HeaderProps): JSX.Element => {
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
          <Title>{title}</Title>
          <Burger open={openMenu} setOpen={setOpenMenu} />
        </HeaderContents>
      </Header>
      <Menu open={openMenu} />
    </StickyContainer>
  )
}

export default HeaderComponent
