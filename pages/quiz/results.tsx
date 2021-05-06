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
import { ButtonBase } from '../../src/Components/ButtonBase'
import { StickyNavBar } from '../../src/Components/StickyNavBar'

interface QuizListPageProps {
  services: Array<ServicePreview>
}

const StyledButton = styled(ButtonBase)`
  font-size: ${(props) => props.theme.fontSizes.highlight};
  padding: 0.5rem;
  width: 16rem;
  height: 3rem;
  justify-content: center;
  margin: auto;
  max-width: calc(100% - 2rem);
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
      <StyledButton as="button" onClick={onReset}>
        Reset Quiz
      </StyledButton>
      <CardList services={services} listType="quiz" />
      <StickyNavBar />
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
