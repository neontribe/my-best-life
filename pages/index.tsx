import { NextPage, GetStaticProps } from 'next'

import { Service, getServices } from '../cms/services'
import { CardList } from '../src/Components/CardList'
import { Layout } from '../src/Components/Layout'
import { HeaderComponent } from '../src/Components/Header'

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
  return (
    <Layout>
      <HeaderComponent />
      <CardList services={services} />
    </Layout>
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
