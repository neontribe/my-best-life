import styled from 'styled-components'
import Link from 'next/link'

import { Layout } from '../../src/Components/Layout'
import { VisuallyHidden } from '../../src/Components/VisuallyHidden'
import { VerticalSpacing } from '../../src/Components/VerticalSpacing'

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
            <Title>Do you need help?</Title>
          </HeaderContents>
        </Header>
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
