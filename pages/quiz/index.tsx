import styled from 'styled-components'
import Link from 'next/link'

import { Layout } from '../../src/Components/Layout'
import { VerticalSpacing } from '../../src/Components/VerticalSpacing'
import { HeaderComponent } from '../../src/Components/Header'

const Section = styled.section`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Text = styled.p`
  align-items: center;
  display: flex;
  flex: 1 1 20%;
  font-family: 'Catamaran', sans-serif;
  font-size: ${(props) => props.theme.fontSizes.heading};
  max-width: 20ch;
  text-align: center;
  margin-bottom: 1rem;
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

export const QuizWelcomePage = (): JSX.Element => {
  return (
    <Layout>
      <HeaderComponent title="Quiz" />
      <Section>
        <Text>Welcome!</Text>
        <Text>
          We can help you find available support, relevant to your needs and
          interests
        </Text>
        <Text>
          {
            "Let us know a bit about you and we'll show you what is available to you."
          }
        </Text>

        <VerticalSpacing />

        <Link href="/quiz/whats-on-your-mind" passHref>
          <StyledLink>{"Let's go"}</StyledLink>
        </Link>

        <VerticalSpacing />
      </Section>
    </Layout>
  )
}

export default QuizWelcomePage
