import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'

import { ButtonBase } from './ButtonBase'
import { VerticalSpacing } from './VerticalSpacing'

const QuizListItem = styled.li`
  background-color: ${(props) => props.theme.colours.yellow_light};
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  margin: 1.5rem auto;
  overflow: hidden;

  h2 {
    font-family: 'Catamaran', sans-serif;
    font-size: ${(props) => props.theme.fontSizes.heading};
    font-weight: bold;
    width: 90%;
  }
`

const ImageContainer = styled.div`
  bottom: -1rem;
  height: 10rem;
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

const QuizButton = styled(ButtonBase)`
  align-self: flex-start;
  background-color: ${(props) => props.theme.colours.blue};
  display: inline-block;
  /* margin: 0 1rem 1.5rem 1rem; */

  &:hover {
    background-color: ${(props) => props.theme.colours.blue_light};
    color: ${(props) => props.theme.colours.blue};
  }
`

export const QuizEncouragement = (): JSX.Element => {
  return (
    <QuizListItem>
      <Content>
        <h2>Want more personalised results?</h2>
        <VerticalSpacing size={1} />
        <Link href={`/quiz`} passHref>
          <QuizButton>Take our quiz</QuizButton>
        </Link>
        <ImageContainer>
          <Image
            src="/img/try-quiz.png"
            alt={''}
            layout="fill"
            objectFit="contain"
          />
        </ImageContainer>
      </Content>
    </QuizListItem>
  )
}
