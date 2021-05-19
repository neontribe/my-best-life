import React, { useContext } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'

import { Layout } from '../../src/Components/Layout'
import { HeaderComponent } from '../../src/Components/Header'
import { VerticalSpacing } from '../../src/Components/VerticalSpacing'
import { QuizContext } from '../../src/context/QuizContext'
import { LinkButton } from '../../src/Components/LinkButton'
import { StickyNavBar } from '../../src/Components/StickyNavBar'
import ImageCheckboxes from '../../src/Components/ImageCheckboxes'

const Navigation = styled.section`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 1rem 0 1rem 0;
  width: 100%;
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

const feelings = [
  { title: 'unsure', image: '/img/unsure.svg' },
  { title: 'hopeful', image: '/img/hopeful.svg' },
  { title: 'scared', image: '/img/scared.svg' },
  { title: 'excited', image: '/img/excited.svg' },
  { title: 'ignored', image: '/img/ignored.svg' },
  { title: 'calm', image: '/img/calm.svg' },
  { title: 'anxious', image: '/img/anxious.svg' },
  { title: 'confused', image: '/img/confused.svg' },
  { title: 'angry', image: '/img/angry.svg' },
  { title: 'sad', image: '/img/sad.svg' },
  { title: 'unsafe', image: '/img/unsafe.svg' },
  { title: 'ok', image: '/img/ok.svg' },
] as const

export type Feeling = typeof feelings[number]['title']

export const HowAreYouFeelingPage = (): JSX.Element => {
  const router = useRouter()
  const { howAreFeelingGet, howAreFeelingToggle } = useContext(QuizContext)

  const nextPage = () => {
    const triggerFeelings: Array<Feeling> = [
      'scared',
      'unsafe',
      'angry',
      'ignored',
      'sad',
    ]

    const mustShowHelp =
      triggerFeelings.filter((x) => howAreFeelingGet(x)).length > 0
    if (mustShowHelp) {
      router.push('helplines')
    } else {
      router.push('what-are-your-interests')
    }
  }

  return (
    <Layout>
      <HeaderComponent title="Support in Lambeth" />
      <Navigation>
        <LinkButton
          textContent="back"
          arrow="left"
          onClick={() => router.push('whats-on-your-mind')}
        />
      </Navigation>

      <CheckboxGroup>
        <fieldset>
          <legend>How are you feeling?</legend>
          <VerticalSpacing size={1} />

          <LinkButton
            textContent="skip this question"
            arrow="right"
            onClick={() => router.push('what-are-your-interests')}
          />
          <VerticalSpacing />

          <ImageCheckboxes
            id="feelings-checkboxes"
            values={feelings}
            contextGet={howAreFeelingGet}
            contextToggle={howAreFeelingToggle}
          />
        </fieldset>
      </CheckboxGroup>
      <VerticalSpacing />

      <StyledLink as="button" onClick={nextPage}>
        {'Ok'}
      </StyledLink>
      <VerticalSpacing />
      <StickyNavBar />
    </Layout>
  )
}

export default HowAreYouFeelingPage
