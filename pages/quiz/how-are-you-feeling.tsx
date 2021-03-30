import React, { useContext } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Layout } from '../../src/Components/Layout'
import { HeaderComponent } from '../../src/Components/Header'
import { VerticalSpacing } from '../../src/Components/VerticalSpacing'
import { QuizContext } from '../../src/context/QuizContext'
import { LinkButton } from '../../src/Components/LinkButton'

interface ImageCheckboxesProps {
  id: string
  values: Array<{ title: string; image: string }>
  label: string
}

// Wraps the checkbox area of component
const CheckboxGroup = styled.div`
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

// Contains all the CheckboxItems
const CheckboxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -0.5rem;
`

// This is the visual representation of the checked status
const CheckedDisplay = styled.div`
  border-radius: 1rem;
  border-top-right-radius: 2rem;
  height: 100%;
  position: absolute;
  width: 100%;
`

// This is the text of the checkbox item
const Text = styled.div`
  align-items: center;
  display: flex;
  font-size: ${(props) => props.theme.fontSizes.extraSmall};
  font-weight: bold;
  justify-content: center;
  letter-spacing: 0.05em;
  margin: 0 0.5rem 0.5rem 0.5rem;
  z-index: 1;
`

// Contains label, input, image
const CheckboxItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 0 0 33%;
  padding: 0 0.5rem;
  margin: 0.5rem 0;

  label {
    border-radius: 1rem;
    border-top-right-radius: 2rem;
    box-shadow: 0 0 9px 2px ${(props) => props.theme.colours.shadow};
    cursor: pointer;
    display: flex;
    flex-direction: column;
    position: relative;
    text-align: center;
  }

  input {
    appearance: none;
    background: none;
    height: 1px;
    opacity: 0.00001;
    position: absolute;
    width: 100%;
    cursor: pointer;

    &:focus ~ ${CheckedDisplay} {
      outline: 3px dashed ${(props) => props.theme.colours.blue};
      outline-offset: 5px;
    }

    &:checked ~ ${CheckedDisplay} {
      background-color: ${(props) => props.theme.colours.aqua_light};
    }

    &:checked ~ ${Text} {
      color: ${(props) => props.theme.colours.purple};
    }

    &:checked ~ img {
      border-radius: 50%;
    }
  }

  img {
    border-radius: 1rem;
    border: 5px solid transparent;
    height: auto;
    margin: auto;
    margin-top: 5px;
    width: calc(100% - 10px);
    z-index: 1;
  }
`

export const ImageCheckboxes = ({
  id,
  values,
  label,
}: ImageCheckboxesProps): JSX.Element => {
  const { howAreFeelingGet, howAreFeelingToggle } = useContext(QuizContext)

  return (
    <>
      <CheckboxGroup>
        <fieldset>
          <legend>{label}</legend>
          <VerticalSpacing />
          <CheckboxContainer>
            {values.map((checkbox) => {
              return (
                <CheckboxItem key={checkbox.title}>
                  <label>
                    <input
                      type="checkbox"
                      name={id}
                      value={checkbox.title}
                      checked={howAreFeelingGet(checkbox.title)}
                      onChange={() => howAreFeelingToggle(checkbox.title)}
                    />
                    <img src={checkbox.image} alt="" />
                    <Text>{checkbox.title}</Text>
                    <CheckedDisplay />
                  </label>
                </CheckboxItem>
              )
            })}
          </CheckboxContainer>
        </fieldset>
      </CheckboxGroup>
      <VerticalSpacing />
    </>
  )
}

const Section = styled.section`
  align-items: center;
  display: flex;
  flex-direction: column;
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
  { title: 'unsure', image: '/img/unsure.svg' },
  { title: 'ok', image: '/img/ok.svg' },
  { title: 'calm', image: '/img/calm.svg' },
  { title: 'anxious', image: '/img/anxious.svg' },
  { title: 'hopeful', image: '/img/hopeful.svg' },
  { title: 'confused', image: '/img/confused.svg' },
  { title: 'angry', image: '/img/angry.svg' },
  { title: 'excited', image: '/img/excited.svg' },
  { title: 'enthusiastic', image: '/img/enthusiastic.svg' },
  { title: 'scared', image: '/img/scared.svg' },
  { title: 'unsafe', image: '/img/unsafe.svg' },
  { title: 'ignored', image: '/img/ignored.svg' },
]

export const HowAreYouFeelingPage = (): JSX.Element => {
  const router = useRouter()

  return (
    <Layout>
      <Section>
        <HeaderComponent title="Support in Lambeth" />
        <Navigation>
          <LinkButton
            textContent="back"
            arrow="left"
            onClick={() => router.push('whats-on-your-mind')}
          />
          <LinkButton
            textContent="skip"
            arrow="right"
            onClick={() => router.push('what-are-your-interests')}
          />
        </Navigation>
        <QuestionSection>
          <ImageCheckboxes
            id="feelings-checkboxes"
            values={feelings}
            label="How are you feeling?"
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
