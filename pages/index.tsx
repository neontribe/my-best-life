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
  | 'title'
  | 'shortDescription'
  | 'image'
  | 'costValue'
  | 'costQualifier'
  | 'age'
  | 'categories'
  | 'format'
>

export const ListPage: NextPage<ListPageProps> = ({ services }) => {
  // Default to showing the welcome screen
  const [showWelcome, setShowWelcome] = useState<boolean>(true)

  useEffect(() => {
    // Attempt to retrieve the showWelcome value from local storage
    const stored = window.localStorage.getItem('showWelcome')

    // If it's been correctly set to false, update state
    stored === 'false' ? setShowWelcome(false) : setShowWelcome(true)
  }, [showWelcome])

  return (
    <>
      {showWelcome ? (
        <Welcome />
      ) : (
        <Layout>
          <HeaderComponent />
          <CardList services={services} />
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
        title: service.title,
        shortDescription: service.shortDescription,
        costValue: service.costValue,

        ...(service.image?.image && {
          image: {
            image: service.image.image,
            imageAlt: service.image.imageAlt,
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
