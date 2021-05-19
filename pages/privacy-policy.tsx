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

export const PrivacyPage: NextPage<PrivacyPageProps> = ({ content }) => {
  return (
    <Layout>
      <Content>
        <VerticalSpacing />
        <Policy dangerouslySetInnerHTML={{ __html: content }} />
        <VerticalSpacing />
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
