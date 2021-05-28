import { GetStaticProps } from 'next'
import Link from 'next/link'
import styled from 'styled-components'

import { Layout, Content } from '../src/Components/Layout'
import { VerticalSpacing } from '../src/Components/VerticalSpacing'
import { getServiceData, ServiceDetail } from '../cms/services'
import { MiniCard } from '../src/Components/MiniCard'
import { ButtonBase } from '../src/Components/ButtonBase'

interface HelplinePageProps {
  serviceData1: ServiceDetail
  serviceData2: ServiceDetail
}

const THE_MIX = 'the-mix-free-online-support-for-under-25s'
const CHILDLINE = 'childline-childline'

const Heading = styled.h2`
  font-family: 'Catamaran', sans-serif;
  font-size: ${(props) => props.theme.fontSizes.heading};
  margin: auto;
  margin-top: -50px;
  max-width: 15rem;
  text-align: center;
`

const EmergencyText = styled.p`
  font-family: 'Catamaran', sans-serif;
  font-size: ${(props) => props.theme.fontSizes.highlight};
  margin: 2rem auto;
  max-width: 30rem;
  text-align: center;
`
const Text = styled.p`
  font-family: 'Catamaran', sans-serif;
  font-size: ${(props) => props.theme.fontSizes.normal};
  margin: 2rem auto;
  max-width: 30rem;
  text-align: left;
`

const StyledLink = styled(ButtonBase)`
  margin: auto;
  justify-content: center;
  max-width: calc(100% - 2rem);
  width: 16rem;
`

const ImageContainer = styled.div`
  background-image: url('/img/hands_for_support_.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  padding-top: 50px;
  overflow: hidden;
`

const CardContainer = styled.div`
  margin: auto;
  max-width: 30rem;
  width: 100%;
`

export const IfYouNeedHelpPage = ({
  serviceData1,
  serviceData2,
}: HelplinePageProps): JSX.Element => {
  return (
    <Layout>
      <Content as="main">
        <ImageContainer as="main">
          <Heading>Do you need help?</Heading>
        </ImageContainer>

        <VerticalSpacing />

        <EmergencyText>If you are in immediate danger, call 999.</EmergencyText>
        <Text>
          If you are worried about something and need advice, it is ok to ask
          for support. You are not alone. You can use these links to get help.
        </Text>

        <VerticalSpacing />

        <CardContainer>
          <MiniCard
            id={serviceData1.id}
            image={serviceData1.image}
            organisation={serviceData1.organisation}
            shortDescription={serviceData1.shortDescription}
          />
          <MiniCard
            id={serviceData2.id}
            image={serviceData2.image}
            organisation={serviceData2.organisation}
            shortDescription={serviceData2.shortDescription}
          />
        </CardContainer>

        <Link href="/" passHref>
          <StyledLink>{'Go back'}</StyledLink>
        </Link>
        <VerticalSpacing />
      </Content>
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
