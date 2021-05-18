import React, { useContext } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Layout } from '../../src/Components/Layout'
import { VerticalSpacing } from '../../src/Components/VerticalSpacing'
import { Checkbox } from '../../src/Components/Checkbox'
import { LinkButton } from '../../src/Components/LinkButton'

import { QuizContext } from '../../src/context/QuizContext'
import { Category } from '../../cms/services'

const CheckboxGroup = styled.div`
  max-width: 50ch;
  margin: auto;
  padding: 1rem var(--gutter-width);
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

const categories: Array<Category> = [
  'Money',
  'School and College',
  'Sex and Relationships',
  'Mental Health',
  'Keeping Safe',
  'Job Stuff',
  'Housing',
  'Friends',
  'Family',
  'Drink and Drugs',
  'Physical Health',
  'My Rights and the Law',
]

export type OnMind = typeof categories[number]

export const WhatsOnYourMindPage = (): JSX.Element => {
  const { whatsOnMindGet, whatsOnMindToggle } = useContext(QuizContext)
  const router = useRouter()

  return (
    <Layout>
      <VerticalSpacing size={3} />
      <CheckboxGroup>
        <fieldset>
          <legend>What&apos;s on your mind today?</legend>
          <VerticalSpacing size={1} />

          <LinkButton
            textContent="skip this question"
            arrow="right"
            onClick={() => router.push('how-are-you-feeling')}
          />
          <VerticalSpacing size={1} />
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
        </fieldset>
      </CheckboxGroup>

      <Link href="/quiz/how-are-you-feeling" passHref>
        <StyledLink>{'Ok'}</StyledLink>
      </Link>

      <VerticalSpacing />
    </Layout>
  )
}

export default WhatsOnYourMindPage
