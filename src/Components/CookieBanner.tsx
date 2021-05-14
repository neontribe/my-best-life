import styled from 'styled-components'

import { ButtonBase } from './ButtonBase'

const CookieBannerContainer = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 600px;
  padding: 0 var(--gutter-width);
  z-index: 6;
  background-color: ${(props) => props.theme.colours.blue};

  p {
    color: ${(props) => props.theme.colours.white};
    display: flex;
    justify-content: flex-start;
    padding-top: 1em;
    padding-bottom: 0.5em;
  }
`
const CookieButton = styled(ButtonBase)`
  font-size: ${(props) => props.theme.fontSizes.highlight};
  background-color: ${(props) => props.theme.colours.aqua};
  color: ${(props) => props.theme.colours.blue};
  justify-content: center;
  padding: 0.5rem;
  margin-top: 0.5em;
  margin-bottom: 1em;
  position: relative;
  z-index: 5;
  max-width: 180px;
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
      <p>
        <b>Can we use cookies to help improve this site?</b>
      </p>
      <p>
        We would like to use Hotjar cookies to collect information on how people
        use the site. For more information please see our privacy policy page.
      </p>
      <CookieButton onClick={onAccept}>Accept cookies</CookieButton>
      <CookieButton onClick={onReject}>Reject cookies</CookieButton>
    </CookieBannerContainer>
  )
}
