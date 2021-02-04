import { GetStaticProps, GetStaticPaths } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'

import {
  getAllServiceIds,
  getServiceData,
  ServiceDetail,
} from '../../cms/services'
import { Layout } from '../../src/Components/Layout'
import { VisuallyHidden } from '../../src/Components/VisuallyHidden'
import { MyBestLifeTheme } from '../../src/Theme'

interface ServicePageProps {
  serviceData: ServiceDetail
}

const Header = styled.header`
  background-color: ${(props) => props.theme.colours.aqua};
  padding: 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const BackLink = styled.a`
  color: ${(props) => props.theme.colours.blue};
  flex: 1 0 5rem;
  font-family: 'Catamaran', sans-serif;
  font-weight: bold;
  text-decoration: none;

  &:before {
    content: '<';
    display: inline-block;
    margin-right: 0.5rem;
  }

  &:focus {
    outline: 2px dashed ${(props) => props.theme.colours.blue};
    outline-offset: 2px;
  }

  &:hover {
    border-bottom: 2px solid ${(props) => props.theme.colours.blue};
    transition: 0.3s;
  }
`

const Category = styled.li`
  font-family: 'Catamaran', sans-serif;
  font-weight: bold;
  font-size: ${(props) => props.theme.fontSizes.small};
  display: inline;
  margin-left: 1rem;

  &:before {
    content: '';
    background: ${(props) => props.theme.colours.purple};
    border-radius: 50%;
    display: inline-block;
    height: 0.8em;
    margin-right: 0.5rem;
    width: 0.8em;
  }
`

const ImageContainer = styled.div`
  height: 15rem;
  clip-path: url(#imageWave);
  overflow: hidden;
  position: relative;
  width: 100%;
`

const Section = styled.section<{ divider: string }>`
  margin: 0 2rem;
  border-bottom: 1px solid ${(props) => props.divider};
  padding: 1.5rem 0;

  p {
    margin-bottom: 1rem;
  }
`

const Heading = styled.h1`
  color: ${(props) => props.theme.colours.purple};
  font-family: 'Catamaran', sans-serif;
  font-size: ${(props) => props.theme.fontSizes.heading};
`

const Organisation = styled.p`
  font-family: 'Catamaran', sans-serif;
  font-weight: bold;
  margin-bottom: 1.5rem;
`

const Footer = styled.footer`
  background-color: ${(props) => props.theme.colours.aqua};
  clip-path: url(#footerWave);
  height: 12rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`

const ButtonLink = styled.a`
  align-items: center;
  background-color: ${(props) => props.theme.colours.purple};
  border-radius: 5rem;
  border: 3px solid transparent;
  color: ${(props) => props.theme.colours.white};
  display: flex;
  font-family: 'Catamaran', sans-serif;
  font-weight: bold;
  margin-top: 5rem;
  padding: 0.5rem 1.2rem;
  text-decoration: none;

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

export const ServicePage = ({ serviceData }: ServicePageProps): JSX.Element => {
  const categories = [
    serviceData.categories?.category1 ? serviceData.categories?.category1 : '',
    serviceData.categories?.category2 ? serviceData.categories?.category2 : '',
  ].filter(Boolean)

  return (
    <Layout>
      <VisuallyHidden>
        <svg width="0" height="0">
          <defs>
            <clipPath id="imageWave" clipPathUnits="objectBoundingBox">
              <path d="M 0,1  L 0,0  L 1,0  L 1,0.9  C .75 1, .25 .7, 0 0.9 Z" />
            </clipPath>
          </defs>
        </svg>
        <svg width="0" height="0">
          <defs>
            <clipPath id="footerWave" clipPathUnits="objectBoundingBox">
              <path d="M 1,0  L 1,1  L 0,1  L 0,0.3  C .25 0, .75 0.5, 1 0.3 Z" />
            </clipPath>
          </defs>
        </svg>
      </VisuallyHidden>
      <Header>
        <Link href={'/'} passHref>
          <BackLink>
            <span>Back</span>
          </BackLink>
        </Link>
        {categories && (
          <ul>
            {categories?.map((cat) => {
              return <Category key={cat}>{cat}</Category>
            })}
          </ul>
        )}
      </Header>

      {serviceData.image?.image && (
        <ImageContainer>
          <Image
            src={`/${serviceData.image.image}`}
            alt={serviceData.image.imageAlt ? serviceData.image.imageAlt : ''}
            layout="fill"
            objectFit="cover"
          />
        </ImageContainer>
      )}

      <Section divider={MyBestLifeTheme.colours.yellow}>
        <Heading as="h1">{serviceData.title}</Heading>
        <Organisation>{`Run by ${serviceData.organisation}`}</Organisation>
        <p>{serviceData.description}</p>
      </Section>

      <Section divider={MyBestLifeTheme.colours.yellow}>
        {serviceData.costExplanation ? (
          <>
            <Heading as="h2">Cost:</Heading>
            <p>{serviceData.costExplanation}</p>
          </>
        ) : null}
        {serviceData.location ? (
          <>
            <Heading as="h2">Where is it?</Heading>
            <p>{serviceData.location}</p>
          </>
        ) : null}
        {serviceData.time ? (
          <>
            <Heading as="h2">Time info:</Heading>
            <p>{serviceData.time}</p>
          </>
        ) : null}
      </Section>

      {serviceData.access ? (
        <Section divider={MyBestLifeTheme.colours.aqua}>
          <Heading as="h2">How do I access it?</Heading>
          <p>{serviceData.access}</p>
        </Section>
      ) : null}

      <Footer>
        <Link href={`/`} passHref>
          <ButtonLink>
            <span>Back to Results</span>
          </ButtonLink>
        </Link>
      </Footer>
    </Layout>
  )
}

export default ServicePage

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const serviceData = getServiceData(params.id)

  return {
    props: {
      serviceData,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllServiceIds()
  return {
    paths,
    fallback: false,
  }
}
