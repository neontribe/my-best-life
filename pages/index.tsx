import React, { useState, useEffect } from 'react'
import { NextPage, GetStaticProps } from 'next'

import { Service, getServices } from '../cms/services'
import { CardList } from '../src/Components/CardList'
import { HeaderComponent } from '../src/Components/Header'
import { Layout } from '../src/Components/Layout'
import { Welcome } from '../src/Components/Welcome'

interface ListPageProps {
  services: Array<ServicePreview>
}

export type ServicePreview = Pick<
  Service,
  | 'id'
  | 'organisation'
  | 'title'
  | 'shortDescription'
  | 'image'
  | 'costValue'
  | 'costQualifier'
  | 'age'
  | 'categories'
  | 'interests'
  | 'feelings'
  | 'gender'
  | 'format'
  | 'score'
  | 'promoted'
>

export const ListPage: NextPage<ListPageProps> = ({ services }) => {
  // Default to showing the welcome screen
  const [showWelcome, setShowWelcome] = useState<boolean | undefined>()

  useEffect(() => {
    // Attempt to retrieve the showWelcome value from local storage
    const stored = window.localStorage.getItem('showWelcome')

    // If it's been correctly set to false, update state
    stored === 'false' ? setShowWelcome(false) : setShowWelcome(true)
  }, [showWelcome])

  if (showWelcome === undefined) {
    return <></>
  }

  return (
    <>
      {showWelcome ? (
        <Welcome />
      ) : (
        <Layout>
          <HeaderComponent title="Support in Lambeth" />
          <CardList services={services} listType="filtered" />
        </Layout>
      )}
    </>
  )
}

export default ListPage

export const getStaticProps: GetStaticProps = async () => {
  const allServices = getServices()

  const allServicePreviews: Array<ServicePreview> = allServices.map(
    (service: Service) => {
      const servicePreview = {
        id: service.id,
        organisation: service.organisation,
        title: service.title,
        shortDescription: service.shortDescription,
        costValue: service.costValue,
        interests: service.interests || [],
        feelings: service.feelings || [],
        gender: service.gender || [],
        score: 0,
        promoted: service.promoted || false,

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
