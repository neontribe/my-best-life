import styled from 'styled-components'
import { GetStaticProps } from 'next'
import Link from 'next/link'

import { getServiceData, ServiceDetail } from '../../cms/services'
import { Layout } from '../../src/Components/Layout'
import { HeaderComponent } from '../../src/Components/Header'
import { VerticalSpacing } from '../../src/Components/VerticalSpacing'
import { StickyNavBar } from '../../src/Components/StickyNavBar'
import { MiniCard } from '../../src/Components/MiniCard'
import { useEffect, useState } from 'react'

interface HelplinePageProps {
  serviceData1: ServiceDetail
  serviceData2: ServiceDetail
}

const THE_MIX = 'the-mix-free-online-support-for-under-25s'
const CHILDLINE = 'childline-childline'

const Heading = styled.h2`
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.colours.yellow};
  font-family: 'Catamaran', sans-serif;
  font-size: ${(props) => props.theme.fontSizes.heading};
  top-margin: 2rem;
`

const MainText = styled.p`
  font-family: 'Catamaran', sans-serif;
  font-size: ${(props) => props.theme.fontSizes.highlight};
  margin: 2rem auto;
  max-width: 30rem;
  text-align: left;

  a {
    color: ${(props) => props.theme.colours.blue};
    text-decoration-color: ${(props) => props.theme.colours.aqua};
    box-sizing: border-box;
    height: 2px;
  }
`

const Text = styled.p`
  font-family: 'Catamaran', sans-serif;
  font-size: ${(props) => props.theme.fontSizes.normal};
  margin: 2rem auto;
  max-width: 30rem;
  text-align: left;

  a {
    color: ${(props) => props.theme.colours.blue};
    text-decoration-color: ${(props) => props.theme.colours.aqua};
    box-sizing: border-box;
    height: 2px;
  }
`

const MainBody = styled.div`
  text-align: center;
  width: 100%;
  margin: 0;
  padding: 2rem;
`

const StyledLink = styled.a`
  align-items: center;
  background-color: ${(props) => props.theme.colours.purple};
  border-radius: 5rem;
  border: 3px solid transparent;
  color: ${(props) => props.theme.colours.white};
  display: flex;
  font-family: 'Catamaran', sans-serif;
  font-weight: bold;
  text-decoration: none;
  font-size: ${(props) => props.theme.fontSizes.highlight};
  padding: 1rem;
  width: 20rem;
  height: 3rem;
  justify-content: center;
  margin: 0 auto;
  margin-bottom: 2em;
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

export const IfYouNeedHelpPage = ({
  serviceData1,
  serviceData2,
}: HelplinePageProps): JSX.Element => {
  const [selectedTriggerFeelings, setSelectedTriggerFeelings] = useState<
    Array<string>
  >([])

  useEffect(() => {
    const feelings = JSON.parse(
      localStorage.getItem('quiz/howAreFeeling') || ''
    )

    const triggerFeelings = ['scared', 'unsafe', 'angry', 'ignored', 'sad']
    const newTriggerFeelings = []

    for (let i = 0; i < feelings.length; i++) {
      if (triggerFeelings.find((element) => element === feelings[i])) {
        newTriggerFeelings.push(feelings[i])
        setSelectedTriggerFeelings(newTriggerFeelings)
      }
    }
  }, [])

  const makeFeelingsList = (array: string[]) => {
    if (array.length === 1) return array[0]
    const firstFeelings = array.slice(0, array.length - 1)
    const lastFeeling = array[array.length - 1]
    return firstFeelings.join(', ') + ' and ' + lastFeeling + '.'
  }

  return (
    <Layout>
      <HeaderComponent title="Support in Lambeth" />
      <MainBody>
        <MainText>{`You've selected that you feel ${makeFeelingsList(
          selectedTriggerFeelings
        )}`}</MainText>
        <VerticalSpacing size={2} />
        <MainText>
          Do you need help now or you are just having a bad day?
        </MainText>
        <VerticalSpacing size={2} />
        <Link href="/quiz/what-are-your-interests" passHref>
          <StyledLink>{'A bad day, carry on with the quiz'}</StyledLink>
        </Link>

        <VerticalSpacing size={4} />

        <Heading>Need help now?</Heading>

        <Text>
          If you are worried about something and need advice, it is ok to ask
          for support. You are not alone. You can use these links to get help.
        </Text>

        <MiniCard
          id={serviceData1.id}
          image={serviceData1.image}
          organisation={serviceData1.organisation}
          shortDescription={serviceData1.shortDescription}
        />
        <VerticalSpacing size={4} />
        <MiniCard
          id={serviceData2.id}
          image={serviceData2.image}
          organisation={serviceData2.organisation}
          shortDescription={serviceData2.shortDescription}
        />
      </MainBody>

      <VerticalSpacing size={4} />

      <VerticalSpacing />
      <StickyNavBar />
    </Layout>
  )
}

export default IfYouNeedHelpPage

export const getStaticProps: GetStaticProps = async () => {
  const serviceData1 = getServiceData(THE_MIX)
  const serviceData2 = getServiceData(CHILDLINE)
  return {
    props: {
      serviceData1,
      serviceData2,
    },
  }
}
