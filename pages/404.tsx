import styled from 'styled-components'

import { Layout, Content } from '../src/Components/Layout'
import { VerticalSpacing } from '../src/Components/VerticalSpacing'

const Heading = styled.h2`
  border-bottom: 1px solid ${(props) => props.theme.colours.yellow};
  display: inline-block;
  font-family: 'Catamaran', sans-serif;
  font-size: ${(props) => props.theme.fontSizes.heading};
  margin-bottom: 1rem;
`

const SubHeading = styled.h3`
  display: inline-block;
  font-family: 'Catamaran', sans-serif;
  font-size: ${(props) => props.theme.fontSizes.highlight};
  margin-bottom: 1rem;
`

const Text = styled.p`
  font-size: ${(props) => props.theme.fontSizes.normal};
  margin-bottom: 1rem;
  text-align: left;

  a {
    color: ${(props) => props.theme.colours.blue};
    text-decoration-color: ${(props) => props.theme.colours.aqua};
    box-sizing: border-box;
    height: 2px;
  }
`

const MainBody = styled.div`
  div {
    display: flex;
    flex-direction: column;
  }

  label {
    margin-bottom: 1rem;
  }
`

const BackButton = styled.a`
  align-items: center;
  background-color: ${(props) => props.theme.colours.purple};
  border-radius: 5rem;
  border: 3px solid transparent;
  color: ${(props) => props.theme.colours.white};
  display: flex;
  font-family: 'Catamaran', sans-serif;
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

export const NotFound = (): JSX.Element => {
  return (
    <Layout>
      <Content as="main">
        <MainBody>
          <div>
            <VerticalSpacing size={2} />
            <Heading>
              Sorry we can&apos;t seem to find the page you are looking for.
            </Heading>
            <SubHeading>Code error: 404</SubHeading>
            <Text>
              Check out all the services and activities to find what you are
              looking for.
            </Text>
            <VerticalSpacing size={1} />
            <BackButton role="button" href="/">
              Back to services
            </BackButton>
          </div>
        </MainBody>
      </Content>
    </Layout>
  )
}

export default NotFound
