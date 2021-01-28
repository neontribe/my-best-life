import { NextPage } from 'next'
import styled from 'styled-components'
import { GetStaticProps } from 'next'
import { ServicePreview, getServicePreviews } from '../cms/services'

const Title = styled.h1`
  font-size: 50px;
`

const Card = styled.li`
  list-style: none;
  border: 1px solid black;
  margin: 1rem;
`

interface PageProps {
  services: Array<ServicePreview>
}

export const Home: NextPage<PageProps> = ({ services }) => {
  return (
    <>
      <Title>My Best Life</Title>
      <ul>
        {services.map((service) => (
          <Card key={service.organisation}>
            <h2>{service.organisation}</h2>
            <p>{service.shortDescription}</p>
            <p>{service.age}</p>
            <p>{service.cost}</p>
          </Card>
        ))}
      </ul>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const services = getServicePreviews()

  return {
    props: {
      services,
    },
  }
}

export default Home
