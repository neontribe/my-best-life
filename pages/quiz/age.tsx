import React, { useContext } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Layout, Content } from '../../src/Components/Layout'
import { VerticalSpacing } from '../../src/Components/VerticalSpacing'
import { RadioButton } from '../../src/Components/RadioButton'
import { QuizContext } from '../../src/context/QuizContext'
import { LinkButton } from '../../src/Components/LinkButton'

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

const RadioGroup = styled.ul``

const allAges = ['under 15', '15', '16', '17', '18', 'over 18']

export const AgePage = (): JSX.Element => {
  const router = useRouter()

  const { ageGet, ageSet } = useContext(QuizContext)

  return (
    <Layout>
      <Content>
        <Navigation>
          <LinkButton
            textContent="back"
            arrow="left"
            onClick={() => router.push('what-are-your-interests')}
          />
        </Navigation>

        <VerticalSpacing />

        <QuestionSection>
          <fieldset>
            <legend>How old are you?</legend>
            <VerticalSpacing size={1} />
            <LinkButton
              textContent="skip this question"
              arrow="right"
              onClick={() => router.push('gender')}
            />
            <VerticalSpacing size={1} />
            <RadioGroup>
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
            </RadioGroup>
          </fieldset>
        </QuestionSection>

        <VerticalSpacing />

        <Link href="/quiz/gender" passHref>
          <StyledLink>{'Ok'}</StyledLink>
        </Link>

        <VerticalSpacing />
      </Content>
    </Layout>
  )
}

export default AgePage
