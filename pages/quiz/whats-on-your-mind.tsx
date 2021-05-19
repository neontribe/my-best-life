import React, { useContext } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Layout } from '../../src/Components/Layout'
import { VerticalSpacing } from '../../src/Components/VerticalSpacing'
import { LinkButton } from '../../src/Components/LinkButton'

import { QuizContext } from '../../src/context/QuizContext'
import ImageCheckboxes from '../../src/Components/ImageCheckboxes'

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
const onMind = [
  { title: 'Money', image: '/img/money.svg' },
  { title: 'School and college', image: '/img/school and college.svg' },
  { title: 'Sex and Relationships', image: '/img/sex and relationships.svg' },
  { title: 'Mental Health', image: '/img/mental health.svg' },
  { title: 'Keeping Safe', image: '/img/keeping safe.svg' },
  { title: 'Job Stuff', image: '/img/job stuff.svg' },
  { title: 'Housing', image: '/img/housing.svg' },
  { title: 'Friends', image: '/img/friends.svg' },
  { title: 'Family', image: '/img/family.svg' },
  { title: 'Drink and Drugs', image: '/img/drink and drugs.svg' },
  { title: 'Physical Health', image: '/img/physical health.svg' },
  { title: 'My Rights and the Law', image: '/img/rights and the law.svg' },
] as const

export type OnMind = typeof onMind[number]['title']

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
          <VerticalSpacing />
          <ImageCheckboxes
            id="on-mind-checkboxes"
            values={onMind}
            contextGet={whatsOnMindGet}
            contextToggle={whatsOnMindToggle}
          />
        </fieldset>
      </CheckboxGroup>
      <VerticalSpacing />

      <Link href="/quiz/how-are-you-feeling" passHref>
        <StyledLink>{'Ok'}</StyledLink>
      </Link>

      <VerticalSpacing />
    </Layout>
  )
}

export default WhatsOnYourMindPage
