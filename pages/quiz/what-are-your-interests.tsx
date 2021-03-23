import React, { useContext } from 'react'
import styled from 'styled-components'
import Link from 'next/link'

import { Layout } from '../../src/Components/Layout'
import { VerticalSpacing } from '../../src/Components/VerticalSpacing'
import { HeaderComponent } from '../../src/Components/Header'
import { Checkbox } from '../../src/Components/Checkbox'
import { QuizContext } from '../../src/context/QuizContext'

const Section = styled.section`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const QuestionSection = styled.section`
  margin: 1rem;
  padding: 1rem 0;

  h3 {
    font-size: ${(props) => props.theme.fontSizes.heading};
  }
`

const CheckboxGroup = styled.div`
  margin: 1rem 0;
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

const interests = [
  "Don't mind, skip",
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

  return (
    <Layout>
      <Section>
        <HeaderComponent
          title="What are your interests?"
          homeButton={false}
          filterButton={false}
        />
        <QuestionSection>
          <h2>Choose as many as you like</h2>
          <VerticalSpacing />

          <CheckboxGroup>
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
          </CheckboxGroup>
        </QuestionSection>

        <Link href="/quiz/about-you" passHref>
          <StyledLink>{'Ok'}</StyledLink>
        </Link>

        <VerticalSpacing />
      </Section>
    </Layout>
  )
}

export default WhatAreYourInterestsPage
