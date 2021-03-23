import styled from 'styled-components'
import Link from 'next/link'

import { Layout } from '../../src/Components/Layout'
import { HeaderComponent } from '../../src/Components/Header'
import { VerticalSpacing } from '../../src/Components/VerticalSpacing'

const Section = styled.section`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
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

export const IfYouNeedHelpPage = (): JSX.Element => {
  return (
    <Layout>
      <Section>
        <HeaderComponent title="Do you need help?" />
        <Text>If you are in immediate danger, call 999.</Text>
        <Text>
          If you are not in immediate danger but need to talk to someone. Speak
          to helpline - the mix helpline: 0808 808 4994/Crisis Text: Text THEMIX
          to 85258
        </Text>

        <VerticalSpacing />

        <Link href="/quiz/what-are-your-interests" passHref>
          <StyledLink>{'Back to the quiz'}</StyledLink>
        </Link>

        <VerticalSpacing />
      </Section>
    </Layout>
  )
}

export default IfYouNeedHelpPage
