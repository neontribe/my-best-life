import { NextPage, GetStaticProps } from 'next'
import remark from 'remark'
import html from 'remark-html'
import styled from 'styled-components'

import { getPrivacy } from '../cms/privacy'
import { Layout, Content } from '../src/Components/Layout'
import { VerticalSpacing } from '../src/Components/VerticalSpacing'

interface PrivacyPageProps {
  content: string
}

const Policy = styled.article`
  h2 {
    border-bottom: 1px solid ${(props) => props.theme.colours.yellow};
    display: inline-block;
    font-family: 'Catamaran', sans-serif;
    font-size: ${(props) => props.theme.fontSizes.heading};
    margin-bottom: 1rem;
  }

  h3 {
    border-bottom: 1px solid ${(props) => props.theme.colours.yellow};
    display: inline-block;
    font-family: 'Catamaran', sans-serif;
    font-size: ${(props) => props.theme.fontSizes.highlight};
    margin: 0.5rem 0;
  }

  p {
    margin-bottom: 1rem;
  }

  ul {
    list-style: disc;

    li {
      margin-left: 1rem;
    }
  }
`

const SubHeading = styled.h3`
  border-bottom: 1px solid ${(props) => props.theme.colours.yellow};
  display: inline-block;
  font-family: 'Catamaran', sans-serif;
  font-size: ${(props) => props.theme.fontSizes.highlight};
  margin-bottom: 1rem;
`

const Text = styled.p`
  font-size: ${(props) => props.theme.fontSizes.normal};
  margin-bottom: 1rem;
  max-width: 40rem;
  text-align: left;
`

const CookieButton = styled.a`
  align-items: center;
  background-color: ${(props) => props.theme.colours.blue};
  border-radius: 5rem;
  border: 3px solid transparent;
  color: ${(props) => props.theme.colours.white};
  cursor: pointer;
  display: flex;
  font-family: 'Catamaran', sans-serif;
  font-size: ${(props) => props.theme.fontSizes.highlight};
  font-weight: bold;
  justify-content: center;
  margin-bottom: 1em;
  margin-top: 0.5em;
  max-width: 300px;
  padding: 0.5rem 1.2rem;
  padding: 0.5rem;
  position: relative;
  text-decoration: none;

  &:hover {
    background-color: ${(props) => props.theme.colours.purple};
    transition: 0.3s background-color, 0.3s color;
  }

  &:focus {
    outline: 2px dashed ${(props) => props.theme.colours.blue};
    outline-offset: 2px;
  }
`

export const PrivacyPage: NextPage<PrivacyPageProps> = ({ content }) => {
  return (
    <Layout>
      <Content as="main">
        <VerticalSpacing />
        <Policy dangerouslySetInnerHTML={{ __html: content }} />
        <VerticalSpacing />
        <SubHeading>Cookies</SubHeading>
        <Text>
          Cookies are files saved on your phone, tablet or computer when you
          visit a website.
        </Text>
        <CookieButton href="/cookies">
          Manage my cookie preferences
        </CookieButton>
      </Content>
    </Layout>
  )
}

export default PrivacyPage

export const getStaticProps: GetStaticProps = async () => {
  const policy = getPrivacy()

  const markup = await remark().use(html).process(policy.content)
  const result = markup.toString()

  return {
    props: {
      content: result,
    },
  }
}
