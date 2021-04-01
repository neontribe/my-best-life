import React, { useContext } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Layout } from '../../src/Components/Layout'
import { VerticalSpacing } from '../../src/Components/VerticalSpacing'
import { HeaderComponent } from '../../src/Components/Header'
import { Checkbox } from '../../src/Components/Checkbox'
import { QuizContext } from '../../src/context/QuizContext'
import { LinkButton } from '../../src/Components/LinkButton'

import { Interest } from '../../cms/services'

const Navigation = styled.section`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  width: 100%;
`

const CheckboxGroup = styled.div`
  max-width: 50ch;
  margin: auto;
  padding: 1rem;
  width: 100%;

  legend {
    border-bottom: 1px solid ${(props) => props.theme.colours.yellow};
    font-family: 'Catamaran', sans-serif;
    font-size: ${(props) => props.theme.fontSizes.heading};
  }

  fieldset {
    border: none;
    padding: 0;
  }
`

const StyledLink = styled.a`
  align-items: center;
  background-color: ${(props) => props.theme.colours.purple};
  border-radius: 5rem;
  border: 3px solid transparent;
  color: ${(props) => props.theme.colours.white};
  display: flex;
  font-family: 'Catamaran', sans-serif;
  font-weight: bold;
  text-decoration: none;
  font-size: ${(props) => props.theme.fontSizes.highlight};
  padding: 0.5rem;
  width: 16rem;
  height: 3rem;
  justify-content: center;
  margin: auto;
  max-width: calc(100% - 2rem);

  &:focus {
    outline: 2px dashed ${(props) => props.theme.colours.blue};
    outline-offset: 2px;
  }

  &:hover {
    background-color: ${(props) => props.theme.colours.purple_light};
    color: ${(props) => props.theme.colours.purple};
    transition: 0.3s;
  }
`

const interests: Array<Interest> = [
  'Sports',
  'Music',
  'Films and TV',
  'Art and Design',
  'Drama',
  'Reading',
  'Writing',
  'Cooking',
  'Volunteering',
  'Outdoor Activities',
  'Activism',
  'Fashion and Beauty',
]

export const WhatAreYourInterestsPage = (): JSX.Element => {
  const { interestsGet, interestsToggle } = useContext(QuizContext)
  const router = useRouter()

  return (
    <Layout>
      <HeaderComponent title="Support in Lambeth" />
      <Navigation>
        <LinkButton
          textContent="back"
          arrow="left"
          onClick={() => router.push('how-are-you-feeling')}
        />
        <LinkButton
          textContent="skip"
          arrow="right"
          onClick={() => router.push('about-you')}
        />
      </Navigation>

      <CheckboxGroup>
        <fieldset>
          <legend>What are your interests?</legend>
          <VerticalSpacing />
          {interests.map((interest) => {
            return (
              <Checkbox
                key={interest}
                label={interest}
                checked={interestsGet(interest)}
                onChange={() => interestsToggle(interest)}
              />
            )
          })}
        </fieldset>
      </CheckboxGroup>

      <Link href="/quiz/about-you" passHref>
        <StyledLink>{'Ok'}</StyledLink>
      </Link>

      <VerticalSpacing />
    </Layout>
  )
}

export default WhatAreYourInterestsPage
