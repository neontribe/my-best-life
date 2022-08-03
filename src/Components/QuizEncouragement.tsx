import Link from 'next/link'
import styled from 'styled-components'

import { VerticalSpacing } from './VerticalSpacing'

const QuizCard = styled.a`
  background-color: ${(props) => props.theme.colours.blue_light};
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  margin: 1.5rem auto;
  overflow: hidden;
  box-shadow: 0 0 9px 2px ${(props) => props.theme.colours.shadow};
  text-decoration: none;
  cursor: pointer;

  &:focus {
    outline: 2px dashed ${(props) => props.theme.colours.blue};
    outline-offset: 2px;
  }

  &:hover {
    box-shadow: 0 0 15px 7px ${(props) => props.theme.colours.shadow};
  }

  h2 {
    font-family: 'Catamaran', sans-serif;
    font-size: ${(props) => props.theme.fontSizes.highlight};
    font-weight: bold;
    width: 90%;
    color: ${(props) => props.theme.colours.blue};
    margin-bottom: 2rem;

    ${(props) => props.theme.screenSizes.tabletLandscapePlus} {
      font-size: 26px;
    }
  }
`

const ImageContainer = styled.div`
  width: 40%;
  height: 7rem;
  position: absolute;
  right: 1rem;
  bottom: 0;

  ${(props) => props.theme.screenSizes.tabletLandscapePlus} {
    height: 8rem;
  }

  img {
    position: absolute;
  }

  img:nth-of-type(1) {
    width: 100px;
    height: auto;
    right: 0;
    bottom: 0;

    ${(props) => props.theme.screenSizes.smallPhoneOnly} {
    }

    ${(props) => props.theme.screenSizes.tabletPortraitPlus} {
      width: 140px;
      right: 4rem;
    }

    ${(props) => props.theme.screenSizes.tabletLandscapePlus} {
      width: 200px;
      right: 0;
    }
  }

  img:nth-of-type(2) {
    width: 30px;
    right: 0rem;
    top: 1rem;

    ${(props) => props.theme.screenSizes.smallPhoneOnly} {
    }

    ${(props) => props.theme.screenSizes.tabletPortraitPlus} {
      width: 35px;
      right: 1.5rem;
      top: 0;
    }

    ${(props) => props.theme.screenSizes.tabletLandscapePlus} {
      width: 42px;
      right: 2.8rem;
      top: -1.2rem;
    }
  }

  img:nth-of-type(3) {
    width: 23px;
    right: 2.5rem;
    top: 2rem;

    ${(props) => props.theme.screenSizes.smallPhoneOnly} {
    }

    ${(props) => props.theme.screenSizes.tabletPortraitPlus} {
      width: 25px;
      right: 6.5rem;
      top: 0.5rem;
    }

    ${(props) => props.theme.screenSizes.tabletLandscapePlus} {
      width: 34px;
      right: 11.5rem;
      top: 0.5rem;
    }
  }
`
const Content = styled.div`
  position: relative;
  width: 270px;
  height: 100%;
  padding: 1rem;
  margin: auto;

  ${(props) => props.theme.screenSizes.tabletPortraitPlus} {
    width: 500px;
    padding: 2rem;
  }

  ${(props) => props.theme.screenSizes.tabletLandscapePlus} {
    width: 550px;
  }
`

const QuizButton = styled.div`
  align-items: center;
  border-radius: 5rem;
  border: 3px solid transparent;
  color: ${(props) => props.theme.colours.white};
  font-family: 'Catamaran', sans-serif;
  font-weight: bold;
  text-decoration: none;
  padding: 0.5rem 1.2rem;

  align-self: flex-start;
  background-color: ${(props) => props.theme.colours.blue};
  display: inline-block;

  ${(props) => props.theme.screenSizes.tabletPortraitPlus} {
    padding: 0.5rem 3.2rem;
  }
`

export const QuizEncouragement = (): JSX.Element => {
  return (
    <Link href={`/summer-activities`} passHref>
      <QuizCard>
        <Content>
          <h2>Summer Activities</h2>
          <VerticalSpacing size={1} />
          <QuizButton>See what&apos;s on</QuizButton>
          <ImageContainer>
            <img src="/img/summer_activities_mask.png" alt="" />
            <img src="/img/summer_activities_racket.png" alt="" />
            <img src="/img/summer_activities_watermelon.png" alt="" />
          </ImageContainer>
        </Content>
      </QuizCard>
    </Link>
  )
}
