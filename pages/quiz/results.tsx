import React, { useContext } from 'react'
import styled from 'styled-components'
import { NextPage, GetStaticProps } from 'next'
import { Service, getServices } from '../../cms/services'
import { CardList } from '../../src/Components/CardList'
import { HeaderComponent } from '../../src/Components/Header'
import { Layout } from '../../src/Components/Layout'
import { VerticalSpacing } from '../../src/Components/VerticalSpacing'
import { QuizContext } from '../../src/context/QuizContext'
import { useRouter } from 'next/router'
import { ServicePreview } from '../index'

interface QuizListPageProps {
  services: Array<ServicePreview>
}

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
  width: 16rem;
  height: 3rem;
  justify-content: center;
  margin: auto;
  max-width: calc(100% - 2rem);

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

export const QuizListPage: NextPage<QuizListPageProps> = ({ services }) => {
  const { clearProgress } = useContext(QuizContext)
  const router = useRouter()

  const onReset = () => {
    clearProgress()
    router.push('/quiz')
  }

  return (
    <Layout>
      <HeaderComponent title="Results" />
      <VerticalSpacing />
      <StyledButton onClick={onReset}>Reset Quiz</StyledButton>
      <CardList services={services} listType="quiz" />
    </Layout>
  )
}

export default QuizListPage

export const getStaticProps: GetStaticProps = async () => {
  const allServices = getServices()

  const allServicePreviews: Array<ServicePreview> = allServices.map(
    (service: Service) => {
      const servicePreview = {
        id: service.id,
        title: service.title,
        shortDescription: service.shortDescription,
        costValue: service.costValue,
        interests: service.interests || [],
        feelings: service.feelings || [],
        gender: service.gender || [],
        score: 0,

        ...(service.image?.image && {
          image: {
            image: service.image.image,
            imageAlt: service.image?.imageAlt || '',
          },
        }),

        ...(service.categories && { categories: service.categories }),

        ...(service.age && {
          age: service.age,
        }),

        ...(service.costQualifier && {
          costQualifier: service.costQualifier,
        }),

        ...(service.format && {
          format: service.format,
        }),
      }
      return servicePreview
    }
  )

  return {
    props: {
      services: allServicePreviews,
    },
  }
}
