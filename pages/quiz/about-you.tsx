import React, { useContext } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Layout } from '../../src/Components/Layout'
import { HeaderComponent } from '../../src/Components/Header'
import { VerticalSpacing } from '../../src/Components/VerticalSpacing'
import { Checkbox } from '../../src/Components/Checkbox'
import { RadioButton } from '../../src/Components/RadioButton'
import { QuizContext } from '../../src/context/QuizContext'
import { LinkButton } from '../../src/Components/LinkButton'

const Section = styled.section`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const Navigation = styled.section`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  width: 100%;
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

const HorizontalGroup = styled.div`
  margin: 1rem 0;
  display: flex;
  justify-content: space-between;
`

const categories = [
  'men',
  'women',
  'non-binary',
  'transgender',
  'intersex',
  'gender non-conforming',
  'genderqueer',
  'agender',
]

const allAges = ['<15', '15', '16', '17', '18', '18+']

export const AboutYouPage = (): JSX.Element => {
  const router = useRouter()

  const {
    ageGet,
    ageSet,
    genderGet,
    genderToggle,
    setQuizComplete,
  } = useContext(QuizContext)

  return (
    <Layout>
      <Section>
        <HeaderComponent
          title="About you"
          homeButton={false}
          filterButton={false}
        />
        <Navigation>
          <LinkButton
            textContent="back"
            arrow="back"
            onClick={() => router.back()}
          />
        </Navigation>
        <QuestionSection>
          <h2>How old are you?</h2>
          <VerticalSpacing />
          <HorizontalGroup>
            {allAges.map((item) => {
              return (
                <RadioButton
                  key={item}
                  label={item}
                  name={'age'}
                  checked={ageGet() === item}
                  onChange={() => ageSet(item)}
                />
              )
            })}
          </HorizontalGroup>
          <VerticalSpacing />
          <p>
            Some support and activities in your area are gender specific. To
            find something right for you, are you interested in services that
            are:
          </p>

          <CheckboxGroup>
            {categories.map((category) => {
              return (
                <Checkbox
                  key={category}
                  label={category}
                  checked={genderGet(category)}
                  onChange={() => genderToggle(category)}
                />
              )
            })}
          </CheckboxGroup>
        </QuestionSection>
        <VerticalSpacing />

        <Link href="/quiz/results" passHref>
          <StyledLink onClick={() => setQuizComplete(true)}>{'Ok'}</StyledLink>
        </Link>

        <VerticalSpacing />
      </Section>
    </Layout>
  )
}

export default AboutYouPage
