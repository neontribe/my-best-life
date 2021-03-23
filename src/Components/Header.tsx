import { useContext } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { useRouter } from 'next/router'

import { ButtonBase } from './ButtonBase'
import { VisuallyHidden } from './VisuallyHidden'
import { QuizContext } from '../context/QuizContext'

interface HeaderProps {
  filterButton?: boolean
  title: string
}

const Header = styled.header`
  background-color: ${(props) => props.theme.colours.aqua};
  clip-path: url(#wave);
  height: 10rem;
  padding: 0 2rem;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 2;
`

const HeaderContents = styled.div`
  align-items: center;
  display: flex;
  height: 5rem;
  justify-content: space-between;
`

const Title = styled.h1`
  font-family: 'Catamaran', sans-serif;
  font-size: ${(props) => props.theme.fontSizes.title};
`

const ButtonLinkText = styled(ButtonBase)`
  padding: 0.5rem 1rem;
  color: ${(props) => props.theme.colours.yellow};
`

const Nav = styled.nav`
  width: 100%;
`

const LinkList = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  li {
    flex: 0 1 30%;
  }
`

const NavPill = styled.a<{ activePage: boolean }>`
  border-radius: 1rem;
  display: block;
  font-family: 'Catamaran', sans-serif;
  font-weight: bold;
  padding: 4px;
  margin: auto;
  max-width: 8rem;
  text-align: center;
  text-decoration: none;
  ${(props) =>
    props.activePage
      ? `background-color: ${props.theme.colours.purple};
      color: ${props.theme.colours.white};`
      : `background-color: ${props.theme.colours.white};;
      color: ${props.theme.colours.purple}; `}

  svg {
    height: 1.2em;
    margin-right: 4px;
    vertical-align: sub;
    ${(props) =>
      props.activePage
        ? `stroke: ${props.theme.colours.white};`
        : `stroke: ${props.theme.colours.purple};`}
  }
`

export const HeaderComponent = ({
  filterButton,
  title,
}: HeaderProps): JSX.Element => {
  const currentPage = useRouter().pathname
  const { quizComplete } = useContext(QuizContext)

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
          <Title>{title}</Title>
          {filterButton && (
            <Link href={`/filter`} passHref>
              <ButtonLinkText>Filter</ButtonLinkText>
            </Link>
          )}
        </HeaderContents>
        <Nav>
          <LinkList>
            <li>
              <Link href={`/`} passHref>
                <NavPill activePage={currentPage === '/' || currentPage === ''}>
                  All
                </NavPill>
              </Link>
            </li>
            <li>
              <Link href={quizComplete ? '/quiz/results' : '/quiz'} passHref>
                <NavPill activePage={currentPage.includes('quiz')}>
                  Quiz
                </NavPill>
              </Link>
            </li>
            <li>
              <Link href={`/saved`} passHref>
                <NavPill activePage={currentPage === '/saved'}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                  Saved
                </NavPill>
              </Link>
            </li>
          </LinkList>
        </Nav>
      </Header>
    </>
  )
}

export default HeaderComponent
