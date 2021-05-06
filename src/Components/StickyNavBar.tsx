import React, { useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import styled from 'styled-components'

import { QuizContext } from '../context/QuizContext'

const Footer = styled.nav`
  position: sticky;
  bottom: 0;
  width: 100%;
  padding: 0 var(--gutter-width);
  z-index: 2;
  background-color: ${(props) => props.theme.colours.white};
  box-shadow: 0px -15px 10px -10px ${(props) => props.theme.colours.shadow};
`

const FooterNavList = styled.ul`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 2rem;
  flex-direction: row;
  color: ${(props) => props.theme.colours.blue};
`

const FooterLink = styled.a<{ activePage: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Catamaran', sans-serif;
  font-size: ${(props) => props.theme.fontSizes.highlight};
  text-decoration: none;

  ${(props) =>
    props.activePage
      ? `color: ${props.theme.colours.purple};`
      : `color: ${props.theme.colours.blue}; `}

  &:hover {
    color: ${(props) => props.theme.colours.yellow};
  }

  &:focus {
    outline: 2px dashed ${(props) => props.theme.colours.blue};
    outline-offset: 2px;
  }

  svg {
    width: 30px;
  }
`

export const StickyNavBar = (): JSX.Element => {
  const { quizComplete } = useContext(QuizContext)
  const currentPage = useRouter().pathname

  return (
    <Footer>
      <FooterNavList>
        <li>
          <Link href={'/'} passHref>
            <FooterLink activePage={currentPage === '/' || currentPage === ''}>
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
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Home
            </FooterLink>
          </Link>
        </li>
        <li>
          <Link href={quizComplete ? '/quiz/results' : '/quiz'} passHref>
            <FooterLink activePage={currentPage.includes('quiz')}>
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
            </FooterLink>
          </Link>
        </li>
        <li>
          <Link href={'/saved'} passHref>
            <FooterLink activePage={currentPage === '/saved'}>
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
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
              Saved
            </FooterLink>
          </Link>
        </li>
      </FooterNavList>
    </Footer>
  )
}
