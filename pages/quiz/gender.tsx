import React, { useContext } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Layout, Content } from '../../src/Components/Layout'
import { VerticalSpacing } from '../../src/Components/VerticalSpacing'
import { Checkbox } from '../../src/Components/Checkbox'
import { QuizContext } from '../../src/context/QuizContext'
import { LinkButton } from '../../src/Components/LinkButton'

import { Gender } from '../../cms/services'

const Navigation = styled.section`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 1rem 0 1rem 0;
  width: 100%;
`

const QuestionSection = styled.section`
  margin: auto;
  max-width: 50ch;

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
  margin-bottom: 100px;

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

const CheckboxGroup = styled.ul``

const categories: Array<Gender> = [
  'male',
  'female',
  'non-binary / non-conforming',
  'transgender',
]

export const GenderPage = (): JSX.Element => {
  const router = useRouter()

  const { genderGet, genderToggle, setQuizComplete } = useContext(QuizContext)

  const skipQuestionAndSeeResults = () => {
    setQuizComplete(true)
    router.push('results')
  }

  return (
    <Layout>
      <Content as="main">
        <Navigation>
          <LinkButton
            textContent="back"
            arrow="left"
            onClick={() => router.push('age')}
          />
        </Navigation>
        <QuestionSection>
          <fieldset>
            <legend>What is your gender identity?</legend>
            <VerticalSpacing size={1} />
            <LinkButton
              textContent="skip this question"
              arrow="right"
              onClick={() => skipQuestionAndSeeResults()}
            />
            <VerticalSpacing size={1} />

            <p>
              Some support and activities in your area are gender specific. To
              find something right for you, you can let us know which gender you
              identify with (if you would like to).
            </p>

            <VerticalSpacing size={1} />
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
          </fieldset>
        </QuestionSection>

        <VerticalSpacing />

        <Link href="/quiz/results" passHref>
          <StyledLink onClick={() => setQuizComplete(true)}>{'Ok'}</StyledLink>
        </Link>

        <VerticalSpacing />
      </Content>
    </Layout>
  )
}

export default GenderPage
