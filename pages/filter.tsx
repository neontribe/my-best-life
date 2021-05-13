import React, { useContext } from 'react'
import { NextPage } from 'next'
import styled from 'styled-components'
import Link from 'next/link'

import { Layout } from '../src/Components/Layout'
import { Checkbox } from '../src/Components/Checkbox'
import { RadioButton } from '../src/Components/RadioButton'
import {
  FilterContext,
  allAges,
  allFormats,
  allAreas,
} from '../src/context/FilterContext'
import { ButtonBase } from '../src/Components/ButtonBase'
import { NotificationsContext } from '../src/context/NotificationsContext'
import { VerticalSpacing } from '../src/Components/VerticalSpacing'

const FilterLayout = styled.div`
  padding: 3rem;
`
const Top = styled.section`
  border-bottom: 1px solid ${(props) => props.theme.colours.yellow};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: auto;
  max-width: 50ch;
  width: 100%;

  div {
    display: flex;
    align-items: center;
    width: 100%;
  }

  h1 {
    font-family: 'Catamaran', sans-serif;
    font-size: ${(props) => props.theme.fontSizes.title};
    flex-basis: 100%;
    display: flex;
    align-items: center;
  }

  button {
    color: ${(props) => props.theme.colours.purple};
    background-color: transparent;
    border: none;
    border-bottom: 1px solid ${(props) => props.theme.colours.purple};
    font-size: ${(props) => props.theme.fontSizes.small};
    padding: 0;

    &:focus {
      outline: 2px dashed ${(props) => props.theme.colours.blue};
      outline-offset: 4px;
    }

    &:hover {
      background-color: ${(props) => props.theme.colours.purple_light};
      transition: 0.3s;
    }
  }

  svg {
    height: 1em;
    margin-left: 4px;
    vertical-align: sub;
  }
`

const FilterSection = styled.section<{ borderBottom?: boolean }>`
  ${(props) =>
    props.borderBottom &&
    `border-bottom: 1px solid ${props.theme.colours.yellow};`}

  max-width: 50ch;
  margin: auto;
  width: 100%;
  padding: 2rem 0;

  legend {
    font-family: 'Catamaran', sans-serif;
    font-size: ${(props) => props.theme.fontSizes.heading};
  }

  fieldset {
    border: none;
    padding: 0;
  }
`

const CheckboxGroup = styled.div`
  margin: 1rem 0;
`

const RadioGroup = styled.div`
  margin: 1rem 0;
`

const Footer = styled.div`
  padding: 1rem;
  background-color: #ffffff;
  position: sticky;
  bottom: 0;
  width: 100%;
  max-width: 50ch;
  margin: auto;
  border-top: 1px solid ${(props) => props.theme.colours.yellow};
`

const ButtonLink = styled(ButtonBase)`
  font-size: ${(props) => props.theme.fontSizes.highlight};
  padding: 0.5rem;
  width: 16rem;
  height: 3rem;
  justify-content: center;
  margin: auto;
  max-width: calc(100% - 2rem);
  margin-bottom: 1rem;
`

const CloseButton = styled.a`
  color: ${(props) => props.theme.colours.blue};
  text-decoration: none;
  display: flex;
  align-items: center;

  &:focus {
    outline: 2px dashed ${(props) => props.theme.colours.blue};
    outline-offset: 2px;
  }

  svg {
    height: 44px;
    width: 44px;
    margin-left: 0;
  }
`

export const FilterPage: NextPage = () => {
  const { notify } = useContext(NotificationsContext)
  const {
    age,
    ageUpdate,
    formats,
    formatUpdate,
    areas,
    areaUpdate,
    clearAll,
  } = useContext(FilterContext)

  const saveNotify = () => {
    notify({
      msg: 'Your settings have been saved',
      time: 5000,
    })
  }

  return (
    <Layout>
      <FilterLayout>
        <Top>
          <div>
            <h1>
              Filter
              <svg
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                  clipRule="evenodd"
                />
              </svg>
            </h1>
            <Link href={'/'} passHref>
              <CloseButton aria-label="back to card list">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </CloseButton>
            </Link>
          </div>
          <VerticalSpacing size={0.5} />
          <button onClick={() => clearAll()}>Clear All</button>
          <VerticalSpacing size={1} />
        </Top>
        <VerticalSpacing />
        <FilterSection borderBottom>
          <fieldset>
            <legend>Age</legend>
            <VerticalSpacing size={1} />
            <p>Select your age so we can tell you what you are eligible for</p>
            <RadioGroup>
              {allAges.map((item) => {
                return (
                  <RadioButton
                    key={item}
                    label={item}
                    name={'age'}
                    checked={item === age}
                    onChange={ageUpdate}
                  />
                )
              })}
            </RadioGroup>
          </fieldset>
        </FilterSection>
        {/* <FilterSection>
        <h3>Cost</h3>
      </FilterSection> */}
        <FilterSection borderBottom>
          <fieldset>
            <legend>Format of Support / Activity</legend>
            <CheckboxGroup>
              {allFormats.map((format) => {
                return (
                  <Checkbox
                    key={format}
                    label={format}
                    checked={formats.includes(format)}
                    onChange={() => formatUpdate(format)}
                  />
                )
              })}
            </CheckboxGroup>
          </fieldset>
        </FilterSection>
        <FilterSection>
          <fieldset>
            <legend>Area</legend>
            <CheckboxGroup>
              {allAreas.map((area) => {
                return (
                  <Checkbox
                    key={area}
                    label={area}
                    checked={areas.includes(area)}
                    onChange={() => areaUpdate(area)}
                  />
                )
              })}
            </CheckboxGroup>
          </fieldset>
        </FilterSection>
        <VerticalSpacing />
        <Footer>
          <Link href={`/`} passHref>
            <ButtonLink onClick={saveNotify}>Apply Filter</ButtonLink>
          </Link>
        </Footer>
      </FilterLayout>
    </Layout>
  )
}

export default FilterPage
