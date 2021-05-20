import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'

import { VerticalSpacing } from './VerticalSpacing'

const QuizCard = styled.a`
  background-color: ${(props) => props.theme.colours.yellow_light};
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
    font-size: ${(props) => props.theme.fontSizes.heading};
    font-weight: bold;
    width: 90%;
    color: ${(props) => props.theme.colours.blue};
  }
`

const ImageContainer = styled.div`
  bottom: -1rem;
  height: 7rem;
  position: absolute;
  right: 0;
  width: 35%;
`
const Content = styled.div`
  position: relative;
  max-width: 400px;
  height: 100%;
  margin: auto;
  padding: 1rem;
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
`

export const QuizEncouragement = (): JSX.Element => {
  return (
    <Link href={`/quiz`} passHref>
      <QuizCard>
        <Content>
          <h2>Want more personalised results?</h2>
          <VerticalSpacing size={1} />
          <QuizButton>Take our quiz</QuizButton>
          <ImageContainer>
            <Image
              src="/img/try-quiz.png"
              alt={''}
              layout="fill"
              objectFit="contain"
            />
          </ImageContainer>
        </Content>
      </QuizCard>
    </Link>
  )
}
