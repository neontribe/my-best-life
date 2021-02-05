import Image from 'next/image'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'

import { Layout } from './Layout'
import { VisuallyHidden } from './VisuallyHidden'

const Header = styled.header`
  background-color: ${(props) => props.theme.colours.aqua};
  clip-path: url(#wave);
  height: 8rem;
  padding: 0 1rem;
  top: 0;
  width: 100%;
  z-index: 1;
`

const HeaderWithImage = styled.header`
  background-color: ${(props) => props.theme.colours.aqua};
  clip-path: url(#wave);
  height: 18rem;
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

const Slide = styled.section`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
`

const Text = styled.p`
  font-family: 'Catamaran', sans-serif;
  font-size: ${(props) => props.theme.fontSizes.heading};
  max-width: 20ch;
  text-align: center;
`

const WelcomeImageContainer = styled.div`
  height: 70vw;
  position: relative;
  width: 80vw;
  max-height: 350px;
  max-width: 400px;
`

const ImageContainer = styled.div`
  border-radius: 50%;
  height: 8rem;
  margin: auto;
  overflow: hidden;
  position: relative;
  width: 8rem;
`

const ControlArea = styled.div`
  flex: 0 0 10rem;
`

const StyledButton = styled.button`
  align-items: center;
  background-color: ${(props) => props.theme.colours.purple};
  border-radius: 5rem;
  border: 3px solid transparent;
  color: ${(props) => props.theme.colours.white};
  display: flex;
  font-family: 'Catamaran', sans-serif;
  font-weight: bold;
  font-size: ${(props) => props.theme.fontSizes.highlight};
  padding: 0.5rem;
  width: 20rem;
  height: 4rem;
  justify-content: center;

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

const ProgressIndicator = styled.div`
  align-items: center;
  display: flex;
  height: 6rem;
  justify-content: space-between;
  margin: auto;
  width: 3.5rem;
`

const ProgressStep = styled.div<{ currentStep?: boolean }>`
  border-radius: 50%;
  border: 1px solid ${(props) => props.theme.colours.blue};
  height: 1rem;
  width: 1rem;
  ${(props) =>
    props.currentStep ? `background-color: ${props.theme.colours.blue}` : null};
`

export const Welcome = (): JSX.Element => {
  const router = useRouter()
  const [showWelcome, setShowWelcome] = useState('')
  const [current, setCurrent] = useState(1)

  const changeSlide = (step: number) => {
    setCurrent(step)
  }

  const closeWelcome = () => {
    setShowWelcome('false')
    router.reload()
  }

  useEffect(() => {
    if (showWelcome === 'false') {
      window.localStorage.setItem('showWelcome', 'false')
    }
  }, [showWelcome])

  return (
    <Layout>
      <VisuallyHidden>
        <svg width="0" height="0">
          <defs>
            <clipPath id="wave" clipPathUnits="objectBoundingBox">
              <path d="M 0,1  L 0,0  L 1,0  L 1,0.7  C .75 1.3, .25 .5, 0 1 Z" />
            </clipPath>
          </defs>
        </svg>
      </VisuallyHidden>
      <div aria-live="polite">
        {/* My Best Life */}
        {current === 1 ? (
          <Slide>
            <Header>
              <HeaderContents>
                <Title>My Best Life</Title>
              </HeaderContents>
            </Header>

            <Text>We help you find support and things to do near you</Text>

            <WelcomeImageContainer>
              <Image
                src="/img/welcome.png"
                alt=""
                layout="fill"
                objectFit="cover"
              />
            </WelcomeImageContainer>

            <ControlArea>
              <StyledButton onClick={() => changeSlide(2)}>
                Ok, sounds good
              </StyledButton>
              <ProgressIndicator>
                <VisuallyHidden>Step 1 of 2</VisuallyHidden>
                <ProgressStep currentStep />
                <ProgressStep />
              </ProgressIndicator>
            </ControlArea>
          </Slide>
        ) : null}

        {/* How it works */}
        {current === 2 ? (
          <Slide>
            <HeaderWithImage>
              <HeaderContents>
                <Title>How it Works</Title>
              </HeaderContents>
              <ImageContainer>
                <Image
                  src="/img/how-it-works.png"
                  alt=""
                  layout="fill"
                  objectFit="cover"
                />
              </ImageContainer>
            </HeaderWithImage>
            <Text>
              Browse the organisations that provide support and activities in
              Lambeth
            </Text>
            <Text>Get in touch with any that interest you</Text>

            <ControlArea>
              <StyledButton onClick={closeWelcome}>
                <div>Got it!</div>
              </StyledButton>
              <ProgressIndicator>
                <VisuallyHidden>Step 2 of 2</VisuallyHidden>
                <ProgressStep />
                <ProgressStep currentStep />
              </ProgressIndicator>
            </ControlArea>
          </Slide>
        ) : null}
      </div>
    </Layout>
  )
}

export default Welcome
