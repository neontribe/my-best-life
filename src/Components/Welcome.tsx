import Link from 'next/link'
import Image from 'next/image'
import styled from 'styled-components'

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

const ButtonLink = styled.a`
  align-items: center;
  background-color: ${(props) => props.theme.colours.purple};
  border-radius: 5rem;
  border: 3px solid transparent;
  color: ${(props) => props.theme.colours.white};
  display: flex;
  font-family: 'Catamaran', sans-serif;
  font-weight: bold;
  padding: 0.5rem 1.2rem;
  width: 12rem;
  text-decoration: none;

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

const Slide = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`

const Text = styled.p`
  font-family: 'Catamaran', sans-serif;
  font-size: ${(props) => props.theme.fontSizes.heading};
  max-width: 20ch;
  text-align: center;
  margin: 2rem 0;
`

const ImageContainer = styled.div`
  border-bottom-left-radius: 6rem;
  height: 8rem;
  width: 40%;
`

const Placeholder2 = styled.div`
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colours.yellow};
  z-index: 2;
  margin: auto;
`

export const Welcome = (): JSX.Element => {
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

            <ImageContainer>
              <Image
                src="/img/welcome.png"
                alt=""
                layout="fill"
                objectFit="cover"
              />
            </ImageContainer>

            <ButtonLink>Ok, sounds good</ButtonLink>
            <div>controls</div>
          </Slide>

          {/* How it works */}
          <Slide>
            <Header2>
              <HeaderContents>
                <Title>How it Works</Title>
              </HeaderContents>
              <Placeholder2></Placeholder2>
            </Header2>
            <Text>
              Browse the organisations that provide support and activities in
              Lambeth
            </Text>
            <Text>Get in touch with any that interest you</Text>
            <Link href={`/`} passHref>
              <ButtonLink>Got it!</ButtonLink>
            </Link>
            <div>controls</div>
          </Slide>
        </ul>
      </div>
    </Layout>
  )
}

export default Welcome
