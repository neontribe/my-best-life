import { useContext } from 'react'
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
} from '../src/context/FilterContext'
import { ButtonBase } from '../src/Components/ButtonBase'
import { NotificationsContext } from '../src/context/NotificationsContext'
import { VerticalSpacing } from '../src/Components/VerticalSpacing'

const Top = styled.section`
  border-bottom: 1px solid ${(props) => props.theme.colours.yellow};
  display: flex;
  justify-content: space-between;
  margin: auto;
  max-width: 50ch;
  padding: 1rem;
  width: 100%;

  h2 {
    font-family: 'Catamaran', sans-serif;
    font-size: ${(props) => props.theme.fontSizes.title};
  }

  button {
    color: ${(props) => props.theme.colours.purple};
    background-color: transparent;
    border: none;
    border-bottom: 1px solid ${(props) => props.theme.colours.purple};

    &:focus {
      outline: 2px dashed ${(props) => props.theme.colours.blue};
      outline-offset: 4px;
    }

    &:hover {
      background-color: ${(props) => props.theme.colours.purple_light};
      transition: 0.3s;
    }
  }
`

const FilterSection = styled.section`
  border-bottom: 1px solid ${(props) => props.theme.colours.yellow};
  max-width: 50ch;
  margin: auto;
  padding: 1rem;
  width: 100%;

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

const HorizontalGroup = styled.div`
  margin: 1rem 0;
  display: flex;
  justify-content: space-between;
`

const ButtonLink = styled(ButtonBase)`
  font-size: ${(props) => props.theme.fontSizes.highlight};
  padding: 0.5rem;
  width: 16rem;
  height: 3rem;
  justify-content: center;
  margin: auto;
  max-width: calc(100% - 2rem);
  margin-bottom: 2em;
`

export const FilterPage: NextPage = () => {
  const { notify } = useContext(NotificationsContext)
  const { age, ageUpdate, formats, formatUpdate, clearAll } = useContext(
    FilterContext
  )

  const saveNotify = () => {
    notify({
      msg: 'Your settings have been saved',
      time: 5000,
    })
  }

  return (
    <Layout>
      <Top>
        <h2>Filter</h2>
        <button onClick={() => clearAll()}>Clear All</button>
      </Top>
      <VerticalSpacing />
      <FilterSection>
        <fieldset>
          <legend>Age</legend>
          <HorizontalGroup>
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
          </HorizontalGroup>
          <p>Select your age so we can tell you what you are eligible for</p>
        </fieldset>
      </FilterSection>
      {/* <FilterSection>
        <h3>Cost</h3>
      </FilterSection> */}
      <FilterSection>
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
      <VerticalSpacing />
      <Link href={`/`} passHref>
        <ButtonLink onClick={saveNotify}>Apply Filter</ButtonLink>
      </Link>
    </Layout>
  )
}

export default FilterPage
