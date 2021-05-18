import React, { useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import { QuizContext } from '../context/QuizContext'
import Bookmark from './Bookmark'

const Nav = styled.nav`
  // Mobile first, so hide by default
  display: none;
  flex-basis: 70%;

  ${(props) => props.theme.screenSizes.tabletLandscapePlus} {
    display: block;
  }
`

const NavList = styled.ul`
  align-items: center;
  display: flex;
  justify-content: space-evenly;

  li:nth-child(3) {
    margin-left: 5rem;
  }
`

const LinkItem = styled.a<{ activePage: boolean }>`
  font-family: 'Catamaran', sans-serif;
  font-size: ${(props) => props.theme.fontSizes.highlight};
  text-decoration: none;
  padding-right: 5px;
  padding-bottom: 2px;
  border: 3px solid transparent;

  ${(props) =>
    props.activePage && `border-bottom: 3px solid ${props.theme.colours.blue};`}

  &:hover {
    color: ${(props) => props.theme.colours.purple};
  }

  &:focus {
    outline: 2px dashed ${(props) => props.theme.colours.blue};
    outline-offset: 2px;
  }

  svg {
    width: 1.5rem;
    fill: white;
  }
`

const SmallLinkItem = styled(LinkItem)`
  font-size: ${(props) => props.theme.fontSizes.normal};
`

export const DesktopNav = (): JSX.Element => {
  const { quizComplete } = useContext(QuizContext)
  const currentPage = useRouter().pathname

  return (
    <Nav>
      <NavList>
        <li>
          <Link href={quizComplete ? '/quiz/results' : '/quiz'} passHref>
            <LinkItem activePage={currentPage.includes('quiz')}>
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
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Quiz
            </LinkItem>
          </Link>
        </li>
        <li>
          <Link href={'/saved'} passHref>
            <LinkItem activePage={currentPage === '/saved'}>
              <Bookmark />
              Saved
            </LinkItem>
          </Link>
        </li>
        <li>
          <Link href={'/about'} passHref>
            <SmallLinkItem activePage={currentPage === '/about'}>
              About
            </SmallLinkItem>
          </Link>
        </li>
        <li>
          <Link href={'/privacy-policy'} passHref>
            <SmallLinkItem activePage={currentPage === '/privacy-policy'}>
              Privacy Policy
            </SmallLinkItem>
          </Link>
        </li>
        <li>
          <Link href={'/helplines'} passHref>
            <LinkItem activePage={currentPage === '/helplines'}>
              Urgent Help
            </LinkItem>
          </Link>
        </li>
      </NavList>
    </Nav>
  )
}
