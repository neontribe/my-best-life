import styled from 'styled-components'
import Link from 'next/link'

import { Layout } from '../../src/Components/Layout'
import { VerticalSpacing } from '../../src/Components/VerticalSpacing'

const Heading = styled.h2`
  display: inline-block;
  border-bottom: 1px solid ${(props) => props.theme.colours.yellow};
  font-family: 'Catamaran', sans-serif;
  font-size: ${(props) => props.theme.fontSizes.heading};
`

const Text = styled.p`
  font-family: 'Catamaran', sans-serif;
  font-size: ${(props) => props.theme.fontSizes.heading};
  margin: 2rem auto;
  max-width: 30rem;
  text-align: left;

  a {
    color: ${(props) => props.theme.colours.blue};
    text-decoration-color: ${(props) => props.theme.colours.aqua};
    box-sizing: border-box;
    height: 2px;
  }
`

const MainBody = styled.div`
  text-align: center;
  width: 100%;
  margin: 0;
  padding: 2rem;
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
  margin: 0 auto;
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
      <MainBody>
        <Heading>Do you need help?</Heading>
        <VerticalSpacing />
        <Text>If you are in immediate danger, call 999.</Text>
        <Text>
          If you are not in immediate danger but need to talk to someone, call
          The Mix helpline on <a href="tel:0808 808 4994">0808 808 4994</a>
          <br />
          or, <a href="sms:85258?body=THEMIX">text THEMIX to 85258</a>.
        </Text>
      </MainBody>

      <VerticalSpacing />

      <Link href="/quiz/what-are-your-interests" passHref>
        <StyledLink>{'Back to the quiz'}</StyledLink>
      </Link>

      <VerticalSpacing />
    </Layout>
  )
}

export default IfYouNeedHelpPage
