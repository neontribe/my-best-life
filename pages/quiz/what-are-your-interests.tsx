import React, { useContext } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Layout } from '../../src/Components/Layout'
import { VerticalSpacing } from '../../src/Components/VerticalSpacing'
import { HeaderComponent } from '../../src/Components/Header'
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

const interests = [
  { title: 'Sports', image: '/img/sports.svg' },
  { title: 'Music', image: '/img/music.svg' },
  { title: 'Films and TV', image: '/img/films and tv.svg' },
  { title: 'Art and Design', image: '/img/art and design.svg' },
  { title: 'Drama', image: '/img/drama.svg' },
  { title: 'Reading', image: '/img/reading.svg' },
  { title: 'Writing', image: '/img/writing.svg' },
  { title: 'Cooking', image: '/img/cooking.svg' },
  { title: 'Volunteering', image: '/img/volunteering.svg' },
  { title: 'Outdoor Activities', image: '/img/outdoor activities.svg' },
  { title: 'Activism', image: '/img/activism.svg' },
  { title: 'Fashion and Beauty', image: '/img/fashion and beauty.svg' },
  { title: 'Gaming', image: '/img/gaming.svg' },
] as const

export type Interest = typeof interests[number]['title']

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
      </Navigation>

      <CheckboxGroup>
        <fieldset>
          <legend>What are your interests?</legend>
          <VerticalSpacing size={1} />

          <LinkButton
            textContent="skip this question"
            arrow="right"
            onClick={() => router.push('about-you')}
          />
          <VerticalSpacing />

          <ImageCheckboxes
            id="interests-checkboxes"
            values={interests}
            contextGet={interestsGet}
            contextToggle={interestsToggle}
          />
        </fieldset>
      </CheckboxGroup>
      <VerticalSpacing />

      <Link href="/quiz/about-you" passHref>
        <StyledLink>{'Ok'}</StyledLink>
      </Link>

      <VerticalSpacing />
      <StickyNavBar />
    </Layout>
  )
}

export default WhatAreYourInterestsPage
