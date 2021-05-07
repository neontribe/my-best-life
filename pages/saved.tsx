import { NextPage, GetStaticProps } from 'next'

import { Service, getServices } from '../cms/services'
import { CardList } from '../src/Components/CardList'
import { HeaderComponent } from '../src/Components/Header'
import { Layout } from '../src/Components/Layout'
import { ServicePreview } from './index'

interface ListPageProps {
  services: Array<ServicePreview>
}

export const SavedPage: NextPage<ListPageProps> = ({ services }) => {
  return (
    <>
      <Layout>
        <HeaderComponent title="Support in Lambeth" />
        <CardList services={services} listType="saved" />
      </Layout>
    </>
  )
}

export default SavedPage

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
        score: 0,
        promoted: service.promoted || false,
        saved: false,
        area: service.area || [],

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
