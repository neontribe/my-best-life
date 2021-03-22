import React, { useContext } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Layout } from '../../src/Components/Layout'
import { HeaderComponent } from '../../src/Components/Header'
import { VerticalSpacing } from '../../src/Components/VerticalSpacing'
import { Checkbox } from '../../src/Components/Checkbox'
import { LinkButton } from '../../src/Components/LinkButton'

import { QuizContext } from '../../src/context/QuizContext'

const Section = styled.section`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Navigation = styled.section`
  padding: 1rem;
  width: 100%;
  text-align: right;
`

const QuestionSection = styled.section`
  margin: 1rem;

  h2 {
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

const categories = [
  'My money',
  'School and college',
  'Sex and relationships',
  "How I'm feeling",
  'Keeping safe',
  'Job stuff',
  "Where I'm living",
  'Friends',
  'Family',
  'Drink and drugs',
  'My body',
  'My rights and the law',
]

export const WhatsOnYourMindPage = (): JSX.Element => {
  const { whatsOnMindGet, whatsOnMindToggle } = useContext(QuizContext)
  const router = useRouter()

  return (
    <Layout>
      <Section>
        <HeaderComponent title="What's on your mind today?" />
        <Navigation>
          <LinkButton
            textContent="skip"
            arrow="forward"
            onClick={() => router.push('/quiz/how-are-you-feeling')}
          />
        </Navigation>
        <QuestionSection>
          <h2>Choose as many as you like</h2>
          <VerticalSpacing />

          <CheckboxGroup>
            {categories.map((category) => {
              return (
                <Checkbox
                  key={category}
                  label={category}
                  checked={whatsOnMindGet(category)}
                  onChange={() => whatsOnMindToggle(category)}
                />
              )
            })}
          </CheckboxGroup>
        </QuestionSection>

        <Link href="/quiz/how-are-you-feeling" passHref>
          <StyledLink>{'Ok'}</StyledLink>
        </Link>

        <VerticalSpacing />
      </Section>
    </Layout>
  )
}

export default WhatsOnYourMindPage
