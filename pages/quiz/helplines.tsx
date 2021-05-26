import styled from 'styled-components'
import { GetStaticProps } from 'next'
import Link from 'next/link'

import { getServiceData, ServiceDetail } from '../../cms/services'
import { Layout } from '../../src/Components/Layout'
import { VerticalSpacing } from '../../src/Components/VerticalSpacing'
import { MiniCard } from '../../src/Components/MiniCard'
import { useEffect, useState } from 'react'


interface HelplinePageProps {
  serviceData1: ServiceDetail
  serviceData2: ServiceDetail
}

const THE_MIX = 'the-mix-free-online-support-for-under-25s'
const CHILDLINE = 'childline-childline'

const MainText = styled.p`
  font-family: 'Catamaran', sans-serif;
  font-size: ${(props) => props.theme.fontSizes.highlight};
  margin: 2rem auto;
  max-width: 15rem;
  text-align: center;

  a {
    color: ${(props) => props.theme.colours.blue};
    text-decoration-color: ${(props) => props.theme.colours.aqua};
    box-sizing: border-box;
    height: 2px;
  }
`

const Text = styled.p`
  font-family: 'Catamaran', sans-serif;
  font-size: ${(props) => props.theme.fontSizes.normal}
  font-style: normal;
  max-width: 30rem;
  text-align: left;
`

const MainBody = styled.div`
  text-align: center;
  width: 100%;
  margin: 0;
  padding: 2rem;
`

const CopyBody = styled.div`
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

  p {
    max-width: 15rem;
    text-align: center;
    margin-top: -50px;
  }
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

const StyledHelpButton = styled.button`
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

  svg {
    height: 1.2em;
    margin-left: 4px;
    vertical-align: sub;
  }
`

export const StyledHelp = styled.div<{ open: boolean }>`
  display: inline-block;
  text-align: left;
  top: 5rem;
  width: 100%;
  max-width: 600px;

  ${(props) => !props.open && `display: none;`}
`

interface HelpButtonProps {
  open: boolean
  setOpen: (val: boolean) => void
}

export const HelpButton = ({ open, setOpen }: HelpButtonProps): JSX.Element => {
  return (
    <StyledHelpButton
      onClick={() => {
        setOpen(!open)
      }}
    >
      Need help now?{' '}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="white"
      >
        {open ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        )}
      </svg>
    </StyledHelpButton>
  )
}

interface OpenHelpProps {
  open: boolean
  serviceData1: ServiceDetail
  serviceData2: ServiceDetail
}

export const OpenHelp = ({
  open,
  serviceData1,
  serviceData2,
}: OpenHelpProps): JSX.Element => {
  return (
    <StyledHelp open={open} aria-expanded={open}>
      <Text id="help">
        If you are worried about something and need advice, it is ok to ask for
        support. You are not alone. You can use these links to get help.
      </Text>

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
    </StyledHelp>
  )
}

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

  const [openHelp, setOpenHelp] = useState(false)

  return (
    <Layout>

      <CopyBody>
        <MainText>{`You've selected that you feel ${makeFeelingsList(
          selectedTriggerFeelings
        )}`}</MainText>
      </CopyBody>
      <MainBody>
        <MainText>
          Do you need help now or you are just having a bad day?
        </MainText>
        <VerticalSpacing size={2} />
        <Link href="/quiz/what-are-your-interests" passHref>
          <StyledLink>{'A bad day, continue quiz'}</StyledLink>
        </Link>

        <HelpButton open={openHelp} setOpen={setOpenHelp} />
        <OpenHelp
          open={openHelp}
          serviceData1={serviceData1}
          serviceData2={serviceData2}
        />
      </MainBody>

      <VerticalSpacing size={4} />

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
