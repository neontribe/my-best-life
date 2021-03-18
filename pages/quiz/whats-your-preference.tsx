import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

import { Layout } from '../../src/Components/Layout'
import { VisuallyHidden } from '../../src/Components/VisuallyHidden'
import { VerticalSpacing } from '../../src/Components/VerticalSpacing'
import { Checkbox } from '../../src/Components/Checkbox'

const Header = styled.header`
  background-color: ${(props) => props.theme.colours.aqua};
  clip-path: url(#wave);
  height: 8rem;
  padding: 0 1rem;
  top: 0;
  width: 100%;
  z-index: 1;
`

const HeaderContents = styled.div`
  align-items: center;
  display: flex;
  height: 6rem;
`

const Title = styled.h1`
  font-family: 'Catamaran', sans-serif;
  font-size: ${(props) => props.theme.fontSizes.title};
`

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

const preferences = [
  "Don't mind, skip",
  'I like one to one chats',
  'Meeting a group of people',
  'Online',
  'Over the phone',
  'With people my own age',
  "I don't want my friends/family to know",
  'Something to read',
]

export const WhatsYourPreferencePage = (): JSX.Element => {
  const [checked, setChecked] = React.useState(true)

  return (
    <Layout>
      <Section>
        <VisuallyHidden>
          <svg width="0" height="0">
            <defs>
              <clipPath id="wave" clipPathUnits="objectBoundingBox">
                <path d="M 0,1  L 0,0  L 1,0  L 1,0.7  C .75 1.3, .25 .5, 0 1 Z" />
              </clipPath>
            </defs>
          </svg>
        </VisuallyHidden>
        <Header>
          <HeaderContents>
            <Title>{"What's your preference?"}</Title>
          </HeaderContents>
        </Header>
        <QuestionSection>
          <h3>
            Let us know what you like so we can show you the most relevant
            support available to you
          </h3>
          <VerticalSpacing />
          <p>Choose as many as you like</p>
          <VerticalSpacing />

          <CheckboxGroup>
            {preferences.map((preference) => {
              return (
                <Checkbox
                  key={preference}
                  label={preference}
                  checked={checked}
                  // basic change handler placeholder
                  onChange={() => setChecked(checked ? false : true)}
                />
              )
            })}
          </CheckboxGroup>
        </QuestionSection>

        <Link href="/quiz/how-long-will-you-wait" passHref>
          <StyledLink>{'Ok'}</StyledLink>
        </Link>

        <VerticalSpacing />
      </Section>
    </Layout>
  )
}

export default WhatsYourPreferencePage
