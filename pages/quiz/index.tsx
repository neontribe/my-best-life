import styled from 'styled-components'
import Link from 'next/link'
import Image from 'next/image'

import { Layout } from '../../src/Components/Layout'
import { VerticalSpacing } from '../../src/Components/VerticalSpacing'

const Title = styled.h1`
  font-family: 'Catamaran', sans-serif;
  font-size: ${(props) => props.theme.fontSizes.title};
`

const Section = styled.section`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 30px;
`

const Text = styled.p`
  align-items: center;
  display: flex;
  flex: 1 1 20%;
  font-family: 'Catamaran', sans-serif;
  font-size: ${(props) => props.theme.fontSizes.normal};
  max-width: 30ch;
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
  margin-bottom: 30px;

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
      <Section as="main">
        <Title>Welcome!</Title>

        <Image
          src="/img/quiz_welcome_illustration.svg"
          alt="a person taking a quiz"
          width={240}
          height={240}
        />
        <Text>
          We can help you find available support, relevant to your needs and
          interests
        </Text>
        <Text>
          {
            "Let us know a bit about you and we'll show you what is available to you."
          }
        </Text>

        <VerticalSpacing size={1} />

        <Link href="/quiz/whats-on-your-mind" passHref>
          <StyledLink>{"Let's go"}</StyledLink>
        </Link>

        <VerticalSpacing />
      </Section>
    </Layout>
  )
}

export default QuizWelcomePage
