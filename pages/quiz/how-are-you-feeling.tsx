import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

import { Layout } from '../../src/Components/Layout'
import { HeaderComponent } from '../../src/Components/Header'
import { VerticalSpacing } from '../../src/Components/VerticalSpacing'
import { ImageCheckboxes } from '../../src/Components/ImageCheckboxes'

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

const feelings = [
  { title: 'happy', image: '/img/happy.svg' },
  { title: 'sad', image: '/img/sad.svg' },
]

export const HowAreYouFeelingPage = (): JSX.Element => {
  return (
    <Layout>
      <Section>
        <HeaderComponent
          title="How are you feeling?"
          homeButton={false}
          filterButton={false}
        />
        <QuestionSection>
          <p>Choose as many as you like</p>
          <ImageCheckboxes
            id="feelings-checkboxes"
            values={feelings}
            label="how are you feeling?"
          />
        </QuestionSection>

        <Link href="/quiz/what-are-your-interests" passHref>
          <StyledLink>{'Ok'}</StyledLink>
        </Link>

        <VerticalSpacing />
      </Section>
    </Layout>
  )
}

export default HowAreYouFeelingPage
