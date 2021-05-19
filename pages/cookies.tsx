import styled from 'styled-components'

import { Layout } from '../src/Components/Layout'
import { HeaderComponent } from '../src/Components/Header'
import { useState, useEffect } from 'react'

const Heading = styled.h2`
  border-bottom: 1px solid ${(props) => props.theme.colours.yellow};
  display: inline-block;
  font-family: 'Catamaran', sans-serif;
  font-size: ${(props) => props.theme.fontSizes.heading};
  margin-bottom: 1rem;
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
  width: 100%;
  margin: 0;
  padding: 2rem;

  ul {
    list-style: disc;
    margin-bottom: 1rem;

    li {
      margin-left: 1rem;
    }
  }

  div {
    display: flex;
    flex-direction: column;
  }

  label {
    margin-bottom: 1rem;
  }
`

const SubmitButton = styled.button`
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

export const Cookies = (): JSX.Element => {
  const [cookiesAccepted, setCookiesAccepted] = useState<boolean>()
  useEffect(() => {
    setCookiesAccepted(
      JSON.parse(localStorage.getItem('hotjarCookiesAccepted') || 'false')
    )
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setCookiesAccepted(JSON.parse(value))
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    localStorage.setItem(
      'hotjarCookiesAccepted',
      JSON.stringify(cookiesAccepted)
    )
  }

  return (
    <Layout>
      <HeaderComponent title="Support in Lambeth" />
      <MainBody>
        <Heading>Cookies</Heading>
        <Text>
          Cookies are files saved on your phone, tablet or computer when you
          visit a website.
        </Text>
        <Text>
          We use cookies to store information about how you use this site, such
          as the pages you visit.
        </Text>
        <Heading>Cookie Settings</Heading>
        <Text>
          We use 2 types of cookies. You can choose which cookies you are happy
          for us to use.
        </Text>
        <SubHeading>
          Hotjar cookies that measure website use and collect feedback
        </SubHeading>
        <Text>
          We use Hotjar Analytics to measure how you use the website to collect
          feedback from you about our website so we can improve it based on user
          needs.
        </Text>
        <Text>
          Hotjar sets cookies that store anonymised information about:
        </Text>
        <ul>
          <li>how you got to the site</li>
          <li>the pages you visit on and how long you spend on each page</li>
          <li>what you click on while you are visiting the site</li>
          <li>whether you have already visited the site</li>
        </ul>
        <Text>
          For further details please see the about Hotjar section of{' '}
          <a href="https://help.hotjar.com/hc/en-us/categories/115001323967-About-Hotjar">
            Hotjar support site
          </a>
          .
        </Text>
        <form id="hotjarCookies" onSubmit={handleSubmit}>
          <div>
            <label>
              <input
                onChange={handleChange}
                type="radio"
                id="hotjarCookiesAccept"
                name="hotjarCookiesAccepted"
                value="true"
                checked={cookiesAccepted}
              />
              Use Hotjar cookies
            </label>
            <label>
              <input
                onChange={handleChange}
                type="radio"
                id="hotjarCookiesReject"
                name="hotjarCookiesAccepted"
                value="false"
                checked={!cookiesAccepted}
              />
              Do not use Hotjar cookies
            </label>
          </div>
          <SubHeading>Strictly necessary cookies</SubHeading>
          <Text>
            We use essential cookies to remember your cookie preferences and to
            remember your quiz answers.
          </Text>
          <Text>They always need to be on.</Text>
          <SubmitButton type="submit">Save changes</SubmitButton>
        </form>
      </MainBody>
    </Layout>
  )
}

export default Cookies
