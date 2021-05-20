import { NextPage, GetStaticProps } from 'next'
import remark from 'remark'
import html from 'remark-html'
import styled from 'styled-components'

import { getAbout } from '../cms/about'
import { Layout, Content } from '../src/Components/Layout'
import { VerticalSpacing } from '../src/Components/VerticalSpacing'

interface AboutProps {
  content: string
}

const About = styled.article`
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

export const AboutPage: NextPage<AboutProps> = ({ content }) => {
  return (
    <Layout>
      <Content>
        <VerticalSpacing />
        <About dangerouslySetInnerHTML={{ __html: content }} />
        <VerticalSpacing />
      </Content>
    </Layout>
  )
}

export default AboutPage

export const getStaticProps: GetStaticProps = async () => {
  const about = getAbout()

  const markup = await remark().use(html).process(about.content)
  const result = markup.toString()

  return {
    props: {
      content: result,
    },
  }
}
