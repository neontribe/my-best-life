import styled from 'styled-components'

import { Content } from './Layout'

const CookieBannerContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 6;
  background-color: ${(props) => props.theme.colours.blue};

  h2 {
    padding-top: 1em;
    color: ${(props) => props.theme.colours.white};
    font-size: ${(props) => props.theme.fontSizes.highlight};
  }

  p {
    color: ${(props) => props.theme.colours.white};
    display: flex;
    justify-content: flex-start;
    padding-top: 1em;
    padding-bottom: 0.5em;
  }
`
const CookieButton = styled.button`
  align-items: center;
  background-color: ${(props) => props.theme.colours.aqua};
  border-radius: 5rem;
  border: 3px solid transparent;
  color: ${(props) => props.theme.colours.blue};
  cursor: pointer;
  display: flex;
  font-family: 'Catamaran', sans-serif;
  font-size: ${(props) => props.theme.fontSizes.highlight};
  font-weight: bold;
  justify-content: center;
  margin-bottom: 1em;
  margin-top: 0.5em;
  max-width: 180px;
  padding: 0.5rem 1.2rem;
  padding: 0.5rem;
  position: relative;
  text-decoration: none;
  z-index: 5;

  &:hover {
    background-color: ${(props) => props.theme.colours.yellow_light};
    transition: 0.3s background-color, 0.3s color;
  }

  &:focus {
    outline: 2px dashed ${(props) => props.theme.colours.white};
    outline-offset: 2px;
  }
`

export const CookieBanner = (): JSX.Element => {
  const onAccept = () => {
    // set cookie in local storage
    localStorage.setItem('hotjarCookiesAccepted', 'true')
    window.location.reload()
  }

  const onReject = () => {
    // set cookie in local storage
    localStorage.setItem('hotjarCookiesAccepted', 'false')
    window.location.reload()
  }
  return (
    <CookieBannerContainer>
      <Content>
        <h2>Can we use cookies to help improve this site?</h2>
        <p>
          We would like to use Hotjar cookies to collect information on how
          people use the site. For more information please see our privacy
          policy page.
        </p>
        <CookieButton onClick={onAccept}>Accept cookies</CookieButton>
        <CookieButton onClick={onReject}>Reject cookies</CookieButton>
      </Content>
    </CookieBannerContainer>
  )
}
