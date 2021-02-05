import Image from 'next/image'
import styled from 'styled-components'
import { useRouter } from 'next/router'

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

const Header2 = styled.header`
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

const Slide = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
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
  height: 8rem;
  position: relative;
  width: 8rem;
  border-radius: 50%;
  overflow: hidden;
  margin: auto;
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
  display: flex;
  height: 6rem;
  align-items: center;
  width: 3.5rem;
  justify-content: space-between;
  margin: auto;
`

const ProgressStep = styled.div<{ currentStep?: boolean }>`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  ${(props) =>
    props.currentStep ? `background-color: ${props.theme.colours.blue}` : null};
  border: 1px solid ${(props) => props.theme.colours.blue}; ;
`

export const Welcome = (): JSX.Element => {
  const router = useRouter()

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
      <div>
        <ul>
          {/* My Best Life */}
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
              <StyledButton>Ok, sounds good</StyledButton>
              <ProgressIndicator>
                <VisuallyHidden>Step 1 of 2</VisuallyHidden>
                <ProgressStep currentStep />
                <ProgressStep />
              </ProgressIndicator>
            </ControlArea>
          </Slide>

          {/* How it works */}
          <Slide>
            <Header2>
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
            </Header2>
            <Text>
              Browse the organisations that provide support and activities in
              Lambeth
            </Text>
            <Text>Get in touch with any that interest you</Text>

            <ControlArea>
              <StyledButton
                onClick={() => {
                  window.localStorage.setItem('showWelcome', 'false')
                  router.reload()
                }}
              >
                <div>Got it!</div>
              </StyledButton>
              <ProgressIndicator>
                <VisuallyHidden>Step 2 of 2</VisuallyHidden>
                <ProgressStep />
                <ProgressStep currentStep />
              </ProgressIndicator>
            </ControlArea>
          </Slide>
        </ul>
      </div>
    </Layout>
  )
}

export default Welcome
