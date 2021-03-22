import { useState, useRef, useContext } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import {
  getAllServiceIds,
  getServiceData,
  ServiceDetail,
} from '../../cms/services'
import { Layout } from '../../src/Components/Layout'
import { VisuallyHidden } from '../../src/Components/VisuallyHidden'
import { MyBestLifeTheme } from '../../src/Theme'
import { formatAgeDisplay } from '../../src/Components/Card'
import { MapLink } from '../../src/Components/MapLink'
import { SaveButton } from '../../src/Components/SaveButton'
import { SaveContext } from '../../src/context/SaveContext'
import { FiveStar } from '../../src/Components/FiveStar'
import { Checkbox } from '../../src/Components/Checkbox'
import { ButtonBase } from '../../src/Components/ButtonBase'

import { NotificationsContext } from '../../src/context/NotificationsContext'

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

const BackLink = styled.button`
  background-color: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  color: ${(props) => props.theme.colours.blue};
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
  }
`

const ImageContainer = styled.div`
  height: 15rem;
  clip-path: url(#imageWave);
  overflow: hidden;
  position: relative;
  width: 100%;
`

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    flex-shrink: 0;
    margin-left: 1rem;
  }
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

const Quotation = styled.div`
  margin-top: 1rem;
  display: flex;
  width: 100%;
`

const QuoteMark = styled.div<{ side: string }>`
  flex: 1 0 2rem;
  color: ${(props) => props.theme.colours.aqua};
  font-size: 50px;
  text-align: center;
  line-height: 1;
  ${(props) => (props.side === 'left' ? 'margin-left: -1rem' : null)};
  ${(props) => (props.side === 'right' ? 'margin-right: -1rem' : null)};
`

const Footer = styled.footer`
  background-color: ${(props) => props.theme.colours.aqua};
  clip-path: url(#footerWave);
  height: 12rem;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ButtonLink = styled(ButtonBase)`
  margin-top: 5rem;
`

const ContactList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 0.5rem;
`

const EmailListItem = styled.li`
  flex: 1 0 100%;

  span {
    color: ${(props) => props.theme.colours.purple};
    font-weight: bold;
  }
`

const ContactListItem = styled.li`
  flex: 1 0 25%;
  margin-right: 0.5rem;

  &:last-of-type {
    margin-right: 0;
  }
`

const ContactLink = styled.a`
  align-items: center;
  border-radius: 5rem;
  border: 1px solid ${(props) => props.theme.colours.blue};
  color: ${(props) => props.theme.colours.blue};
  display: flex;
  font-family: 'Catamaran', sans-serif;
  font-weight: bold;
  justify-content: center;
  margin-top: 1rem;
  padding: 0.75rem;
  text-decoration: none;

  &:focus {
    outline: 2px dashed ${(props) => props.theme.colours.blue};
    outline-offset: 2px;
  }

  &:hover {
    background-color: ${(props) => props.theme.colours.blue};
    color: ${(props) => props.theme.colours.white};
    transition: 0.3s;
  }
`

const TextInput = styled.textarea`
  width: 100%;
  height: 7rem;
  padding: 0.5rem;
`

const SubmitButtonContainer = styled.div`
  width: 100%;
  text-align: right;
`

const SubmitButton = styled(ButtonBase)`
  display: inline-block;
`

interface ReviewState {
  rating: number | undefined
  hasUsedService: boolean
  comment: string | undefined
}

export const ServicePage = ({ serviceData }: ServicePageProps): JSX.Element => {
  const { saved } = useContext(SaveContext)
  const { notify } = useContext(NotificationsContext)
  const router = useRouter()

  const initialReviewState = {
    rating: undefined,
    hasUsedService: false,
    comment: undefined,
  }

  const [reviewState, setReviewState] = useState<ReviewState>(
    initialReviewState
  )

  const commentInputRef = useRef<HTMLTextAreaElement | null>(null)

  const onRatingChange = (v: number) =>
    setReviewState((s: ReviewState) => ({ ...s, rating: v }))

  const onUsedServiceChange = () =>
    setReviewState((s: ReviewState) => ({
      ...s,
      hasUsedService: !s.hasUsedService,
    }))

  const onCommentChange = (v: string) =>
    setReviewState((s: ReviewState) => ({ ...s, comment: v }))

  const clearForm = () => {
    setReviewState(initialReviewState)
    if (commentInputRef.current) commentInputRef.current.value = ''
  }

  const submitReview = () => {
    // TODO
    // eslint-disable-next-line
    console.log('Review submitted: ', reviewState)
    clearForm()
    notify({
      msg: 'Thank you for submitting your review!',
      time: 5000,
    })
  }

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
        <BackLink onClick={() => router.back()}>
          <span>Back</span>
        </BackLink>
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

      {/* Service intro */}
      <Section divider={MyBestLifeTheme.colours.yellow}>
        <TitleContainer>
          <div>
            <Heading as="h1">{serviceData.title}</Heading>
            <Organisation>{`Run by ${serviceData.organisation}`}</Organisation>
          </div>
          <SaveButton
            id={serviceData.id}
            saved={saved.includes(serviceData.id)}
          />
        </TitleContainer>
        <p>{serviceData.description}</p>
      </Section>

      {/* Service details */}
      <Section divider={MyBestLifeTheme.colours.yellow}>
        {serviceData.eligibility || serviceData.age ? (
          <>
            <Heading as="h2">Who is Eligible?</Heading>
            <p>
              {/* Display an eligibility string if we have one, and if not default to the age */}
              {serviceData.eligibility
                ? serviceData.eligibility
                : formatAgeDisplay(
                    serviceData.age?.minAge,
                    serviceData.age?.maxAge
                  )}
            </p>
          </>
        ) : null}
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
            <MapLink location={serviceData.location}></MapLink>
          </>
        ) : null}
        {serviceData.time ? (
          <>
            <Heading as="h2">Time info:</Heading>
            <p>{serviceData.time}</p>
          </>
        ) : null}
      </Section>

      {/* Young person quotation */}
      {serviceData.quotation ? (
        <Section divider={MyBestLifeTheme.colours.aqua}>
          <Heading as="h2">What do other young people say?</Heading>
          <Quotation>
            <QuoteMark side={'left'}>&ldquo;</QuoteMark>
            <blockquote>{serviceData.quotation}</blockquote>
            <QuoteMark side={'right'}>&rdquo;</QuoteMark>
          </Quotation>
        </Section>
      ) : null}

      {/* Expectation info */}
      {serviceData.expectation ? (
        <Section divider={MyBestLifeTheme.colours.aqua}>
          <Heading as="h2">What can I expect?</Heading>
          <p>{serviceData.expectation}</p>
        </Section>
      ) : null}

      {/* Contact information */}
      <Section divider={MyBestLifeTheme.colours.yellow}>
        {serviceData.contactExplanation ? (
          <>
            <Heading as="h2">How to get in touch</Heading>
            <p>{serviceData.contactExplanation}</p>
          </>
        ) : null}

        <Heading as="h3">Contact Details</Heading>
        <ContactList>
          {serviceData.email ? (
            <>
              <EmailListItem>
                <span>Email: </span>
                {serviceData.email}
              </EmailListItem>
            </>
          ) : null}
          {serviceData.form ? (
            <>
              <ContactListItem>
                <ContactLink href={`${serviceData.form}`}>
                  <span>Form</span>
                </ContactLink>
              </ContactListItem>
            </>
          ) : null}
          {serviceData.phone ? (
            <>
              <ContactListItem>
                <ContactLink href={`tel:${serviceData.phone}`}>
                  <span>Phone</span>
                </ContactLink>
              </ContactListItem>
            </>
          ) : null}
          {serviceData.website ? (
            <>
              <ContactListItem>
                <ContactLink href={`${serviceData.website}`}>
                  <span>Website</span>
                </ContactLink>
              </ContactListItem>
            </>
          ) : null}
        </ContactList>
      </Section>

      <Section divider={'transparent'}>
        <Heading as="h3">Review</Heading>
        <FiveStar
          currentRating={reviewState.rating}
          onChange={onRatingChange}
        />
        <Checkbox
          label={'I have attended this service'}
          checked={reviewState.hasUsedService}
          onChange={onUsedServiceChange}
        />
        <span>Leave a review</span>
        <TextInput
          onChange={(e) => onCommentChange(e.target.value)}
          ref={commentInputRef}
        />
        <SubmitButtonContainer>
          <SubmitButton as="button" onClick={submitReview}>
            <span>Post review</span>
          </SubmitButton>
        </SubmitButtonContainer>
      </Section>

      <Footer>
        <ButtonLink as="button" onClick={() => router.back()} type="button">
          <span>Back to Results</span>
        </ButtonLink>
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
