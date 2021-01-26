import { NextPage } from 'next'
import styled from 'styled-components'

const Title = styled.h1`
  font-size: 50px;
`

export const Home: NextPage = () => {
  return <Title>My Best Life</Title>
}

export default Home
