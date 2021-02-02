import { NextPage, GetStaticProps } from 'next'
import styled from 'styled-components'

import { Service, getServices } from '../cms/services'
import { CardList } from '../src/Components/CardList'
import { VisuallyHidden } from '../src/Components/VisuallyHidden'

interface PageProps {
  services: Array<ServicePreview>
}

export interface ServicePreview {
  title: string
  shortDescription: string
  image?: { image: string; imageAlt: string }
  cost?: string
  age?: string
  categories?: Array<string>
}

const Header = styled.header`
  background-color: ${(props) => props.theme.colours.aqua};
  clip-path: url(#wave);
  height: 8rem;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
`

const HeaderContents = styled.div`
  align-items: center;
  display: flex;
  height: 6rem;
  justify-content: space-around;
  margin-bottom: 2rem;
  margin: auto;
  max-width: 600px;
`

const Title = styled.h1`
  font-family: 'Catamaran', sans-serif;
  font-size: ${(props) => props.theme.fontSizes.title};
`

const ButtonLink = styled.div`
  background-color: ${(props) => props.theme.colours.purple};
  border-radius: 2rem;
  height: 2.5rem;
  width: 2.5rem;
`

export const Home: NextPage<PageProps> = ({ services }) => {
  return (
    <>
      <VisuallyHidden>
        <svg width="0" height="0">
          <defs>
            <clipPath id="wave" clipPathUnits="objectBoundingBox">
              <path d="M 0,1  L 0,0  L 1,0  L 1,0.6  C .75 1.5, .25 .3, 0 1 Z" />
            </clipPath>
          </defs>
        </svg>
      </VisuallyHidden>
      <Header>
        <HeaderContents>
          <ButtonLink />
          <Title>Support in Lambeth</Title>
          <ButtonLink />
        </HeaderContents>
      </Header>
      <CardList services={services} />
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const allServices = getServices()

  const allServicePreviews: Array<ServicePreview> = allServices.map(
    (service: Service) => {
      const servicePreview = {
        title: service.title,
        shortDescription: service.shortDescription,

        ...(service.image?.image && {
          image: {
            image: service.image.image,
            imageAlt: service.image.imageAlt,
          },
        }),

        categories: [
          service.categories?.category1 ? service.categories?.category1 : '',
          service.categories?.category2 ? service.categories?.category2 : '',
        ].filter(Boolean),

        ...((service.age?.maxAge || service.age?.minAge) && {
          age: formatAgeDisplay(service.age.minAge, service.age.maxAge),
        }),

        ...((service.cost?.costValue ||
          service.cost?.costValue === 0 ||
          service.cost?.costQualifier) && {
          cost: formatCostDisplay(
            service.cost.costValue,
            service.cost.costQualifier
          ),
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

function formatAgeDisplay(min: number, max: number): string {
  // There is only a minimum age
  if (!max) {
    return `${min}+`
  }
  // There is only a maximum age
  else if (!min) {
    return `under ${max}`
  }
  // There is an age range
  else {
    if (min === max) {
      return `${min}`
    } else {
      return `${min}-${max}`
    }
  }
}

function formatCostDisplay(cost: number, qualifier: string): string {
  if (qualifier) {
    return qualifier
  } else if (cost === 0) {
    return 'Free'
  } else {
    return `£${String(cost)}`
  }
}
